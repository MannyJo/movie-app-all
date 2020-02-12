from django.urls import path
from .views import (
    add_movie,
    check_watchlist_by_id,
    get_watchlist,
    remove_movie,
)

app_name = 'watchlist'

urlpatterns = [
    path('', get_watchlist, name='get_movie'),
    path('add/', add_movie, name='add_movie'),
    path('remove/<id>/', remove_movie, name='remove_movie'),
    path('<id>/', check_watchlist_by_id, name='get_movie'),
]