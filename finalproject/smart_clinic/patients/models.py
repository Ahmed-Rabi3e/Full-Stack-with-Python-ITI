from django.db import models
from accounts.models import CustomUser


class Patient(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    age = models.IntegerField()
    gender = models.CharField(max_length=10)
    medical_history = models.TextField()

    def __str__(self):
        return self.user.username
