const form = document.getElementById('profileForm');
const messageDiv = document.getElementById('message');
const profileDisplay = document.getElementById('profileDisplay');

window.addEventListener('DOMContentLoaded', showSavedProfile);

form.addEventListener('submit', function (e) {
    e.preventDefault();
    clearMessage();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const bio = document.getElementById('bio').value.trim();

    if (!validateName(name)) {
        displayMessage("Name must be at least 2 characters.", "error");
        return;
    }

    if (!validateEmail(email)) {
        displayMessage("Invalid email format.", "error");
        return;
    }

    if (!validateBio(bio)) {
        displayMessage("Bio must be between 4 and 200 characters.", "error");
        return;
    }

    const profile = { name, email, bio };
    localStorage.setItem('userProfile', JSON.stringify(profile));

    displayMessage("Profile saved successfully!", "success");
    form.reset();
    showSavedProfile();
});

function validateName(name) {
    return name.length >= 2;
}

function validateEmail(email) {
    const pattern = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
    return pattern.test(email);
}

function validateBio(bio) {
    return bio.length >= 4 && bio.length <= 200;
}

function displayMessage(text, type) {
    messageDiv.textContent = text;
    messageDiv.className = `message ${type}`;
}

function clearMessage() {
    messageDiv.textContent = '';
    messageDiv.className = 'message';
}

function showSavedProfile() {
    const saved = localStorage.getItem('userProfile');

    if (!saved) {
        profileDisplay.innerHTML = "<p><em>No profile saved yet.</em></p>";
        return;
    }

    const profile = JSON.parse(saved);
    profileDisplay.innerHTML = `
    <p><strong>Name:</strong> ${profile.name}</p>
    <p><strong>Email:</strong> ${profile.email}</p>
    <p><strong>Bio:</strong> ${profile.bio}</p>
  `;
}
