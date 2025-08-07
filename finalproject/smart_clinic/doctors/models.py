from django.db import models
from accounts.models import CustomUser


class Doctor(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    specialization = models.CharField(max_length=100)
    clinic = models.CharField(max_length=100)
    license_number = models.CharField(max_length=50)
    available_times = models.TextField(help_text="JSON with available time slots")

    def __str__(self):
        return self.user.username
