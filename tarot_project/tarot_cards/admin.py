from django.contrib import admin
from .models import Card, MeaningType, MeaningValue,CardImage, GeneralAttribute, CardGeneralAttribute, Deck, DeckCard,Suit, Spread, SpreadPosition

class CardAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'suit') # Add 'id' here

class CardImageAdmin(admin.ModelAdmin):
    list_display = ('id', 'image_path') # Add 'id' here

class SuitAdmin(admin.ModelAdmin):
    list_display = ('id', 'name') # Add 'id' here

class SpreadAdmin(admin.ModelAdmin):
    list_display = ('id', 'name') # Add 'id' here

admin.site.register(Card, CardAdmin)
# admin.site.register(CardMeaning)
admin.site.register(CardImage)
admin.site.register(GeneralAttribute)
admin.site.register(CardGeneralAttribute)
admin.site.register(Deck)
admin.site.register(DeckCard)
admin.site.register(Suit)
admin.site.register(MeaningValue)
admin.site.register(MeaningType)
admin.site.register(Spread, SpreadAdmin)
admin.site.register(SpreadPosition)