import csv
from django.core.management.base import BaseCommand
from tarot_cards.models import Card, Suit, CardImage, Deck, DeckCard

class Command(BaseCommand):
    help = 'Populates the database with Tarot card data from a CSV file'

    def add_arguments(self, parser):
        parser.add_argument('csv_file', type=str, help='Path to the CSV file')
        parser.add_argument('deck_name', type=str, help='deck name')
        parser.add_argument(
            '--flush',
            action='store_true',
            help='Delete existing data before importing'
        )

    def handle(self, *args, **options):
        self.stdout.write(self.style.SUCCESS('Generating Tarot card data from CSV...'))
        generate_tarot_data_from_csv(options['csv_file'], options['deck_name'], options['flush'])
        self.stdout.write(self.style.SUCCESS('Tarot card data generated successfully.'))

def generate_tarot_data_from_csv(csv_file_path, deck_name, flush=False):
    """Generates Tarot card data from a CSV file."""

    if flush:
        # Clear existing data only if --flush is specified
        Card.objects.all().delete()
        Suit.objects.all().delete()
        CardImage.objects.all().delete()
        DeckCard.objects.all().delete()
        print("Existing data deleted")

    # Create Suits
    suits = {
        "arcana": Suit.objects.get_or_create(name="Arcana")[0],
        "cups": Suit.objects.get_or_create(name="Cups")[0],
        "pentacles": Suit.objects.get_or_create(name="Pentacles")[0],
        "swords": Suit.objects.get_or_create(name="Swords")[0],
        "batons": Suit.objects.get_or_create(name="Batons")[0],
        "wands": Suit.objects.get_or_create(name="Wands")[0],
    }

    deck = Deck.objects.get_or_create(name=deck_name)[0]
    with open(csv_file_path, 'r', encoding='utf-8') as file:
        reader = csv.reader(file)
        # No header in your example, so we don't skip a row.
        for row in reader:
            name, value, suit_name, image_path = row
            suit = suits.get(suit_name, suits["arcana"]) # Default to Arcana if suit not found.

            # Check if card already exists
            card, created = Card.objects.get_or_create(
                name=name,suit=suit
            )

            if created:
                print(f"Added card: {name}")
            else:
                print(f"Card already exists: {name}")

            # Check if DeckCard already exists, if not, create it
            if not DeckCard.objects.filter(deck=deck, card=card).exists():
                DeckCard.objects.create(
                    deck=deck,
                    card=card,
                    image_path=f"images/{image_path}",
                    description=f"Image for {card.name}" # Add a default image description
                )
                print(f"Added DeckCard for {name}")
            else:
                print(f"DeckCard for {name} already exists.")

    print("Tarot card data processed from CSV.")