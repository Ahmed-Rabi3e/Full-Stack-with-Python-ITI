from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    is_patient = models.BooleanField(default=False)
    is_doctor = models.BooleanField(default=False)


class PatientProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    age = models.PositiveIntegerField()
    gender = models.CharField(max_length=10)
    medical_history = models.TextField(blank=True)


class DoctorProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    specialization = models.CharField(max_length=100)
    license_number = models.CharField(max_length=100)
    clinic_address = models.CharField(max_length=255)


ROLE_CHOICES = (
    ('admin', 'Admin'),
    ('doctor', 'Doctor'),
    ('patient', 'Patient'),
)


class CustomUser(AbstractUser):
    role = models.CharField(max_length=10, choices=ROLE_CHOICES)
