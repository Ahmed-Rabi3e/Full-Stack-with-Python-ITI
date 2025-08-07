from django.db import models
from doctors.models import Doctor
from patients.models import Patient


class Appointment(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    appointment_date = models.DateTimeField()
    reason_for_visit = models.TextField()

    def __str__(self):
        return f"{self.patient.user.username} with {self.doctor.user.username} on {self.appointment_date}"
