const categoryNav = document.getElementById("categoryNav");
const productsContainer = document.getElementById("productsContainer");
const searchInput = document.getElementById("searchInput");
const productModal = document.getElementById("productModal");
const modalContent = document.getElementById("modalContent");
const modalClose = document.getElementById("modalClose");

const categories = [
    "smartphones",
    "laptops",
    "beauty",
    "fragrances",
    "groceries",
    "furniture",
    "tops",
    "womens-shoes",
    "mens-shirts",
    "mens-shoes",
    "mens-watches",
    "womens-watches",
    "womens-bags",
    "sunglasses",
];
let allProducts = [];

function createCategoryButtons() {
    const allBtn = document.createElement("button");
    allBtn.textContent = "All";
    allBtn.classList.add("active");
    allBtn.onclick = () => {
        setActiveButton(allBtn);
        displayProducts(allProducts);
    };
    categoryNav.appendChild(allBtn);

    categories.forEach((category) => {
        const btn = document.createElement("button");
        btn.textContent = category;
        btn.onclick = () => {
            setActiveButton(btn);
            fetchCategoryProducts(category);
        };
        categoryNav.appendChild(btn);
    });
}

function setActiveButton(activeBtn) {
    const buttons = categoryNav.querySelectorAll("button");
    buttons.forEach((btn) => btn.classList.remove("active"));
    activeBtn.classList.add("active");
}

async function fetchAllProducts() {
    try {
        const res = await fetch("https://dummyjson.com/products");
        const data = await res.json();
        allProducts = data.products;
        displayProducts(allProducts);
    } catch (err) {
        console.error(err);
    }
}

async function fetchCategoryProducts(category) {
    try {
        const res = await fetch(
            `https://dummyjson.com/products/category/${category}`
        );
        const data = await res.json();
        displayProducts(data.products);
    } catch (err) {
        console.error(err);
    }
}

function displayProducts(products) {
    productsContainer.innerHTML = "";
    if (products.length === 0) {
        productsContainer.innerHTML = "<p>No products found.</p>";
        return;
    }
    products.forEach((product) => {
        const card = document.createElement("div");
        card.className = "product-card";
        card.innerHTML = `
          <img src="${product.thumbnail}" alt="${product.title}" />
          <h3>${product.title}</h3>
          <p>$${product.price}</p>
        `;
        card.onclick = () => showSingleProduct(product.id);
        productsContainer.appendChild(card);
    });
}

async function showSingleProduct(id) {
    productModal.classList.add("visible");
    modalContent.innerHTML = `<p>Loading product...</p>`;
    try {
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        const product = await res.json();
        modalContent.innerHTML = `
          <img src="${product.thumbnail}" alt="${product.title}">
          <h2>${product.title}</h2>
          <p><strong>Price:</strong> $${product.price}</p>
          <p><strong>Brand:</strong> ${product.brand}</p>
          <p><strong>Category:</strong> ${product.category}</p>
          <p><strong>Description:</strong> ${product.description}</p>
        `;
    } catch (err) {
        modalContent.innerHTML = "<p>Error loading product details.</p>";
    }
}

modalClose.onclick = () => {
    productModal.classList.remove("visible");
};

window.onclick = (e) => {
    if (e.target === productModal) {
        productModal.classList.remove("visible");
    }
};

searchInput.addEventListener("input", async (e) => {
    const query = e.target.value.trim().toLowerCase();
    if (!query) {
        const active = categoryNav.querySelector(".active");
        if (active && active.textContent !== "All") {
            fetchCategoryProducts(active.textContent);
        } else {
            displayProducts(allProducts);
        }
        return;
    }

    try {
        const res = await fetch(
            `https://dummyjson.com/products/search?q=${query}`
        );
        const data = await res.json();
        displayProducts(data.products);
    } catch (err) {
        console.error(err);
    }
});

createCategoryButtons();
fetchAllProducts();