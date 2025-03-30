from django.urls import path
from . import views

urlpatterns = [
    path('cards/', views.CardList.as_view()),
    path('cards/<int:pk>/', views.CardDetail.as_view()),
    path('decks/', views.DeckList.as_view()),
    # path('decks/<int:pk>/', views.DeckDetail.as_view()),
    path('deckcards/', views.DeckCardList.as_view()),
    path('deckcards/<int:pk>/', views.DeckCardDetail.as_view()),
    path('generalattributes/', views.GeneralAttributeList.as_view()),
    path('generalattributes/<int:pk>/', views.GeneralAttributeDetail.as_view()),
    path('cardgeneralattributes/', views.CardGeneralAttributeList.as_view()),
    path('cardgeneralattributes/<int:pk>/', views.CardGeneralAttributeDetail.as_view()),
    path('cardimages/', views.CardImageList.as_view()),
    path('cardimages/<int:pk>/', views.CardImageDetail.as_view()),
    # path('cardmeanings/', views.CardMeaningList.as_view()),
    # path('cardmeanings/<int:pk>/', views.CardMeaningDetail.as_view()),
    path('decks/<int:deck_id>/', views.get_deck, name='get_deck'),
    path('cards/<int:deck_card_id>/meanings/', views.get_card_meanings, name='card-meanings'),
    path('spread/<int:spread_id>/', views.get_spread, name='spread'),
]