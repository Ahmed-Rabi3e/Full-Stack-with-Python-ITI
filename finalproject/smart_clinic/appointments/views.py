from django.shortcuts import render, redirect, get_object_or_404
from .models import Appointment
from .forms import AppointmentForm
from doctors.models import Doctor
from django.contrib.auth.decorators import login_required


@login_required
def book_appointment(request, doctor_id):
    doctor = get_object_or_404(Doctor, id=doctor_id)
    if request.method == 'POST':
        form = AppointmentForm(request.POST)
        if form.is_valid():
            appointment = form.save(commit=False)
            appointment.patient = request.user.patient
            appointment.doctor = doctor
            appointment.save()
            return redirect('appointment_success')
    else:
        form = AppointmentForm()
    return render(request, 'appointments/book.html', {'form': form, 'doctor': doctor})


def appointment_success(request):
    return render(request, 'appointments/success.html')
