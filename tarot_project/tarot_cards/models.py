from django.db import models

class Suit(models.Model):
    name = models.CharField(max_length=20, unique=True)

    def __str__(self):
        return self.name

class Card(models.Model):
    name = models.CharField(max_length=255, unique=True)
    value = models.CharField(max_length=50, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    suit = models.ForeignKey(Suit, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return self.name

class MeaningType(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name

class MeaningValue(models.Model):
    card = models.ForeignKey(Card, on_delete=models.CASCADE)
    meaning_type = models.ForeignKey(MeaningType, on_delete=models.CASCADE)
    value = models.TextField()

    def __str__(self):
        return f"{self.card.name} - {self.meaning_type.name}: {self.value[:50]}"

class CardImage(models.Model):
    card = models.ForeignKey(Card, on_delete=models.CASCADE)
    image_path = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    display_order = models.IntegerField(default=0)

    class Meta:
        unique_together = ('card', 'image_path')

class GeneralAttribute(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name

class CardGeneralAttribute(models.Model):
    card = models.ForeignKey(Card, on_delete=models.CASCADE)
    attribute = models.ForeignKey(GeneralAttribute, on_delete=models.CASCADE)
    value = models.CharField(max_length=255)

    class Meta:
        unique_together = ('card', 'attribute')

class Deck(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name

class DeckCard(models.Model):
    deck = models.ForeignKey(Deck, on_delete=models.CASCADE)
    card = models.ForeignKey(Card, on_delete=models.CASCADE)
    position = models.IntegerField()

    class Meta:
        unique_together = ('deck', 'card')