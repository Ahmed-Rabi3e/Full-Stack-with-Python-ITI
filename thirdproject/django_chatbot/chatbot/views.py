from django.shortcuts import render, redirect
from django.http import JsonResponse
import openai
from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from django.contrib import auth
from django.contrib.auth.models import User
from .models import Chat
from openai import OpenAI
from openai.types.chat import ChatCompletionMessageParam
# from openai.types import APIError, RateLimitError, AuthenticationError
from django.utils import timezone

# from openai import RateLimitError, AuthenticationError, OpenAIError

# openai_api_key = ''

client = OpenAI(api_key=openai_api_key)


def ask_openai(message):
    try:
        messages: list[ChatCompletionMessageParam] = [
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": message},
        ]

        response = client.chat.completions.create(
            model="gpt-4o",
            messages=messages,
        )
        return response.choices[0].message.content.strip()

    except Exception as e:
        error_message = str(e)

        if "Rate limit" in error_message:
            return "⚠️ Rate limit exceeded. Please try again later."
        elif "Insufficient Balance" in error_message:
            return "❗ Your current plan has insufficient balance. Please upgrade your OpenAI plan."
        elif "Invalid API key" in error_message or "authentication" in error_message.lower():
            return "❌ Invalid or expired OpenAI API key."
        elif "You tried to access openai.ChatCompletion" in error_message:
            return "❗ This project uses an outdated OpenAI method. Please migrate using `openai migrate`."
        else:
            # You can log the full error for debugging (optional)
            print("OpenAI Exception:", error_message)
            return "❗ Unexpected error occurred while communicating with OpenAI."


@login_required(login_url='login')
def chatbot(request):
    chats = Chat.objects.filter(user=request.user)

    if request.method == 'POST':
        message = request.POST.get('message', '').strip()
        if message:
            response = ask_openai(message)
            Chat.objects.create(user=request.user, message=message, response=response, created_at=timezone.now())
            return JsonResponse({'message': message, 'response': response})
        return JsonResponse({'error': 'Empty message'}, status=400)

    return render(request, 'chatbot.html', {'chats': chats})


def login(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')

        user = auth.authenticate(request, username=username, password=password)
        if user is not None:
            auth.login(request, user)
            return redirect('chatbot')
        else:
            return render(request, 'login.html', {'error_message': 'Invalid username or password'})

    return render(request, 'login.html')


def register(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        email = request.POST.get('email')
        password1 = request.POST.get('password1')
        password2 = request.POST.get('password2')

        if password1 != password2:
            return render(request, 'register.html', {'error_message': 'Passwords do not match'})

        try:
            user = User.objects.create_user(username=username, email=email, password=password1)
            user.save()
            auth.login(request, user)
            return redirect('chatbot')
        except Exception:
            return render(request, 'register.html', {'error_message': 'Error creating account'})

    return render(request, 'register.html')


def logout(request):
    auth.logout(request)
    return redirect('login')
