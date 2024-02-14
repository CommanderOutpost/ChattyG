from django.urls import path
from . import views

urlpatterns = [
    path('', views.sentiment_analysis_view, name='sentiment_analysis_view'),
]