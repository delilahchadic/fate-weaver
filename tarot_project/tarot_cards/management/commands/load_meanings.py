import csv
from django.core.management.base import BaseCommand, CommandError
from tarot_cards.models import Card, MeaningType, MeaningValue, Deck, DeckCard

class Command(BaseCommand):
    help = 'Loads tarot card meanings from a CSV file into the database'

    def add_arguments(self, parser):
        parser.add_argument('csv_file', type=str, help='Path to the CSV file')
        parser.add_argument('deck_name', type=str, help='DeckName')
        parser.add_argument(
            '--flush',
            action='store_true',
            help='Clear existing meanings and meaning types before loading from CSV',
        )

    def handle(self, *args, **options):
        csv_file = options['csv_file']
        flush = options['flush']
        deck_name = options['deck_name']
        deck = Deck.objects.get(name=deck_name)

        if flush:
            self.stdout.write(self.style.WARNING('Clearing existing meanings and meaning types...'))
            MeaningValue.objects.all().delete()
            MeaningType.objects.all().delete() # Add this line to clear MeaningType records
            self.stdout.write(self.style.SUCCESS('Existing meanings and meaning types cleared.'))

        try:
            with open(csv_file, 'r') as file:
                reader = csv.DictReader(file)
                for row in reader:
                    card_name = row['card']
                    meaning_value = row['meaning']
                    meaning_type_name = row['type']

                    try:
                        card = Card.objects.get(name=card_name)
                    except Card.DoesNotExist:
                        self.stdout.write(self.style.WARNING(f'Card "{card_name}" not found. Skipping.'))
                        continue
                    try:
                        deck_card = DeckCard.objects.get(card_id=card.id, deck_id= deck.id)
                    except DeckCard.DoesNotExist:
                        self.stdout.write(self.style.WARNING(f'DEck Card "{card_name}" not found. Skipping.'))
                        continue



                    meaning_type, created = MeaningType.objects.get_or_create(name=meaning_type_name)

                    MeaningValue.objects.create(deck_card_id=deck_card.id, meaning_type=meaning_type, value=meaning_value)

                self.stdout.write(self.style.SUCCESS('Meanings loaded successfully.'))

        except FileNotFoundError:
            self.stdout.write(self.style.ERROR(f'File "{csv_file}" not found.'))