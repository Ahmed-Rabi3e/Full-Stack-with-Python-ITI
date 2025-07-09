function changeCardColor() {
    const card = document.querySelector(".card");
    const randomColor =
        "#" + Math.floor(Math.random() * 16777215).toString(16);
    card.style.backgroundColor = randomColor;
}

function toggleFunFact() {
    const funFact = document.getElementById("funFact");
    if (funFact.style.display === "none") {
        funFact.style.display = "block";
    } else {
        funFact.style.display = "none";
    }
}

function toggleTheme() {
    document.body.classList.toggle("dark-theme");
}