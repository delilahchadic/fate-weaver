from rest_framework import serializers
from .models import Card, Deck, DeckCard, GeneralAttribute, CardGeneralAttribute, CardImage, MeaningType, MeaningValue,Suit, Spread, SpreadPosition 

class CardSerializer(serializers.ModelSerializer):
    image_path = serializers.SerializerMethodField()

    def get_image_path(self, obj):
        try:
            card_image = CardImage.objects.get(card=obj)
            return card_image.image_path
        except CardImage.DoesNotExist:
            return None

    class Meta:
        model = Card
        fields = '__all__'

class DeckSerializer(serializers.ModelSerializer):
    class Meta:
        model = Deck
        fields = '__all__'

class DeckCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = DeckCard
        fields = '__all__'

class GeneralAttributeSerializer(serializers.ModelSerializer):
    class Meta:
        model = GeneralAttribute
        fields = '__all__'

class CardGeneralAttributeSerializer(serializers.ModelSerializer):
    class Meta:
        model = CardGeneralAttribute
        fields = '__all__'

class CardImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = CardImage
        fields = ['id', 'image_path', 'description', 'display_order']

# New serializers for MeaningType and MeaningValue
# from rest_framework import serializers
# from .models import MeaningValue, MeaningType


class MeaningTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = MeaningType
        fields = ('id', 'name')

class MeaningValueSerializer(serializers.ModelSerializer):
    meaning_type = MeaningTypeSerializer() # Use the MeaningTypeSerializer

    class Meta:
        model = MeaningValue
        fields = ('id', 'value', 'meaning_type') # Include 'meaning_type'

class SuitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Suit
        fields = ['id', 'name']  # Include any other fields from the Suit model that you want to include.

class SpreadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Spread
        fields = '__all__'

class SpreadPositionSerializer(serializers.ModelSerializer):
    class Meta:
        model = SpreadPosition
        fields = '__all__'