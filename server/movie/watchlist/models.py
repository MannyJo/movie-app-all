from django.db import models
from django.conf import settings
from django.contrib.auth.models import User

# Create your models here.
class Watchlist(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    movie_id = models.CharField(max_length=100)
    create_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user.username + ' - ' + self.movie_id