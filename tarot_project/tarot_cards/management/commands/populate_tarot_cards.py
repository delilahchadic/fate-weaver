import csv
from django.core.management.base import BaseCommand
from tarot_cards.models import Card, Suit, CardImage, Deck, DeckCard

class Command(BaseCommand):
    help = 'Populates the database with Tarot card data from a CSV file'

    def add_arguments(self, parser):
        parser.add_argument('csv_file', type=str, help='Path to the CSV file')

    def handle(self, *args, **options):
        self.stdout.write(self.style.SUCCESS('Generating Tarot card data from CSV...'))
        generate_tarot_data_from_csv(options['csv_file'])
        self.stdout.write(self.style.SUCCESS('Tarot card data generated successfully.'))

def generate_tarot_data_from_csv(csv_file_path):
    """Generates Tarot card data from a CSV file."""

    # Clear existing data
    Card.objects.all().delete()
    Suit.objects.all().delete()
    CardImage.objects.all().delete()
    DeckCard.objects.all().delete()

    # Create Suits
    suits = {
        "arcana": Suit.objects.get_or_create(name="Arcana")[0],
        "cups": Suit.objects.get_or_create(name="Cups")[0],
        "pentacles": Suit.objects.get_or_create(name="Pentacles")[0],
        "swords": Suit.objects.get_or_create(name="Swords")[0],
        "wands": Suit.objects.get_or_create(name="Wands")[0],
    }

    cards = []

    with open(csv_file_path, 'r', encoding='utf-8') as file:
        reader = csv.reader(file)
        # No header in your example, so we don't skip a row.
        for row in reader:
            name, value, suit_name, image_path = row
            suit = suits.get(suit_name, suits["arcana"]) # Default to Arcana if suit not found.

            card = Card.objects.create(
                name=name,
                value=value,
                suit=suit,
                description=f"Description for {name}" # Add a default description
            )
            cards.append(card)

            CardImage.objects.create(
                card=card,
                image_path=f"images/{image_path}",
                description=f"Image for {name}" # Add a default image description
            )

    # Add all cards to a "Default Deck"
    default_deck = Deck.objects.get_or_create(name="default")[0]

    for index, card in enumerate(cards):
        DeckCard.objects.create(deck=default_deck, card=card, position=index + 1)

    print("Tarot card data generated from CSV.")