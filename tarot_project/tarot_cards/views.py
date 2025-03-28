from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Card, Deck, DeckCard, GeneralAttribute, CardGeneralAttribute, CardImage, MeaningType, MeaningValue
from .serializers import CardSerializer, DeckSerializer, DeckCardSerializer, GeneralAttributeSerializer, CardGeneralAttributeSerializer, CardImageSerializer, MeaningTypeSerializer, MeaningValueSerializer,SuitSerializer
import random

# Existing CRUD views...

class CardList(generics.ListCreateAPIView):
    queryset = Card.objects.all()
    serializer_class = CardSerializer

class CardDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Card.objects.all()
    serializer_class = CardSerializer

class DeckList(generics.ListCreateAPIView):
    queryset = Deck.objects.all()
    serializer_class = DeckSerializer

class DeckDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Deck.objects.all()
    serializer_class = DeckSerializer

class DeckCardList(generics.ListCreateAPIView):
    queryset = DeckCard.objects.all()
    serializer_class = DeckCardSerializer

class DeckCardDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = DeckCard.objects.all()
    serializer_class = DeckCardSerializer

class GeneralAttributeList(generics.ListCreateAPIView):
    queryset = GeneralAttribute.objects.all()
    serializer_class = GeneralAttributeSerializer

class GeneralAttributeDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = GeneralAttribute.objects.all()
    serializer_class = GeneralAttributeSerializer

class CardGeneralAttributeList(generics.ListCreateAPIView):
    queryset = CardGeneralAttribute.objects.all()
    serializer_class = CardGeneralAttributeSerializer

class CardGeneralAttributeDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = CardGeneralAttribute.objects.all()
    serializer_class = CardGeneralAttributeSerializer

class CardImageList(generics.ListCreateAPIView):
    queryset = CardImage.objects.all()
    serializer_class = CardImageSerializer

class CardImageDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = CardImage.objects.all()
    serializer_class = CardImageSerializer

# New views for MeaningType and MeaningValue
class MeaningTypeList(generics.ListCreateAPIView):
    queryset = MeaningType.objects.all()
    serializer_class = MeaningTypeSerializer

class MeaningTypeDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = MeaningType.objects.all()
    serializer_class = MeaningTypeSerializer

class MeaningValueList(generics.ListCreateAPIView):
    queryset = MeaningValue.objects.all()
    serializer_class = MeaningValueSerializer

class MeaningValueDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = MeaningValue.objects.all()
    serializer_class = MeaningValueSerializer

@api_view(['GET'])
def get_deck(request, deck_id):
    try:
        deck = Deck.objects.get(pk=deck_id)
        deck_cards = DeckCard.objects.filter(deck=deck)

        result = []
        for deck_card in deck_cards:
            card = deck_card.card
            card_serializer = CardSerializer(deck_card.card)
            image_serializer = None
            try:
                card_image = CardImage.objects.get(card=deck_card.card)
                image_serializer = CardImageSerializer(card_image).data
            except CardImage.DoesNotExist:
                image_serializer = None

            suit_data = None
            if card.suit:
                suit_data = SuitSerializer(card.suit).data

            result.append({
                'deck_card': DeckCardSerializer(deck_card).data,
                'card': card_serializer.data,
                'suit': suit_data,
                'image': image_serializer,
            })

        return Response(result)

    except Deck.DoesNotExist:
        return Response({'error': 'Deck not found'}, status=404)

@api_view(['GET'])
def get_card_meanings(request, card_id):
    """
    Retrieves all meanings associated with a specific card.
    """
    try:
        card = Card.objects.get(pk=card_id)
        meanings = MeaningValue.objects.filter(card=card)
        serializer = MeaningValueSerializer(meanings, many=True)
        return Response(serializer.data)
    except Card.DoesNotExist:
        return Response({'error': 'Card not found'}, status=404)
    
