const productsContainer = document.getElementById("productsContainer");
const searchInput = document.getElementById("searchInput");
const categoryNav = document.getElementById("categoryNav");
const modal = document.getElementById("singleProductModal");
const modalContent = document.getElementById("singleProduct");
const closeModal = document.getElementById("closeModal");

let allProducts = [];
let currentCategory = "all";

async function fetchProducts() {
    try {
        const res = await fetch("https://dummyjson.com/products?limit=100");
        const data = await res.json();
        allProducts = data.products;
        displayProducts(allProducts);
    } catch (error) {
        console.error("Error fetching products:", error);
        productsContainer.innerHTML =
            "<p>Failed to load products. Please try again later.</p>";
    }
}

async function fetchCategories() {
    try {
        const res = await fetch("https://dummyjson.com/products/categories");
        const categories = await res.json();
        displayCategories(categories);
    } catch (error) {
        console.error("Error fetching categories:", error);
    }
}

function displayCategories(categories) {
    categoryNav.innerHTML = `
              <button class="${currentCategory === "all" ? "active" : ""}" 
                      onclick="setActiveCategory('all')">All</button>
          `;

    categories.forEach((cat) => {
        const btn = document.createElement("button");
        btn.textContent = cat;
        btn.className = currentCategory === cat ? "active" : "";
        btn.onclick = () => setActiveCategory(cat);
        categoryNav.appendChild(btn);
    });
}

function setActiveCategory(category) {
    currentCategory = category;
    const buttons = categoryNav.querySelectorAll("button");
    buttons.forEach((btn) => {
        btn.classList.remove("active");
        if (
            (category === "all" && btn.textContent === "All") ||
            btn.textContent === category
        ) {
            btn.classList.add("active");
        }
    });

    if (category === "all") {
        displayProducts(allProducts);
    } else {
        const filtered = allProducts.filter((p) => p.category === category);
        displayProducts(filtered);
    }
}

function displayProducts(products) {
    productsContainer.innerHTML = "";
    if (products.length === 0) {
        productsContainer.innerHTML = `
                  <div style="grid-column: 1/-1; text-align: center; padding: 40px;">
                      <i class="fas fa-box-open" style="font-size: 50px; color: #ccc; margin-bottom: 20px;"></i>
                      <p style="font-size: 18px; color: #666;">No products found. Try a different search.</p>
                  </div>
              `;
        return;
    }

    products.forEach((p, index) => {
        const card = document.createElement("div");
        card.className = "product-card fade-in";
        card.style.animationDelay = `${index * 0.05}s`;
        card.innerHTML = `
                <img src="${p.thumbnail}" alt="${p.title}" loading="lazy" />
                <h3>${p.title}</h3>
                <p>$${p.price} ${p.discountPercentage
                ? `<span style="color: #4CAF50; font-size: 14px;">${p.discountPercentage}% off</span>`
                : ""
            }</p>
              `;
        card.addEventListener("click", () => showSingleProduct(p.id));
        productsContainer.appendChild(card);
    });
}

searchInput.addEventListener("input", (e) => {
    const keyword = e.target.value.toLowerCase();
    if (keyword === '') {
        if (currentCategory === 'all') {
            displayProducts(allProducts);
        } else {
            const filtered = allProducts.filter(p => p.category === currentCategory);
            displayProducts(filtered);
        }
    } else {
        // Search all fields
        const filtered = allProducts.filter(p =>
            p.title.toLowerCase().includes(keyword) ||
            p.description.toLowerCase().includes(keyword) ||
            (p.brand && p.brand.toLowerCase().includes(keyword)) ||
            p.category.toLowerCase().includes(keyword)
        );
        displayProducts(filtered);
    }
});

async function showSingleProduct(id) {
    try {
        modal.classList.add('visible');
        document.body.style.overflow = 'hidden';

        modalContent.innerHTML = `
            <div style="text-align: center; padding: 20px;">
                <i class="fas fa-spinner fa-spin" style="font-size: 30px; color: #ff4747;"></i>
                <p>Loading product details...</p>
            </div>
        `;

        const res = await fetch(`https://dummyjson.com/products/${id}`);
        const product = await res.json();

        const galleryImages = product.images.slice(0, 3).map(img =>
            `<img src="${img}" style="width: 80px; height: 80px; object-fit: cover; border-radius: 5px; cursor: pointer;" 
                  onclick="this.parentElement.parentElement.querySelector('img').src = '${img}'">`
        ).join('');

        modalContent.innerHTML = `
            <div class="product-gallery">
                <img src="${product.thumbnail}" alt="${product.title}" style="width: 100%; max-height: 350px; object-fit: contain; border-radius: 10px;"/>
                <div style="display: flex; gap: 10px; margin-top: 10px;">
                    ${galleryImages}
                </div>
            </div>
            <div class="product-info">
                <h2>${product.title}</h2>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span class="price">$${product.price}</span>
                    <div class="rating">
                        <span>${product.rating}</span>
                        <i class="fas fa-star"></i>
                    </div>
                </div>
                ${product.discountPercentage ?
                `<p style="color: #4CAF50; font-weight: bold;">${product.discountPercentage}% discount!</p>` : ''}
                <p><strong>Brand:</strong> ${product.brand || 'Unknown'}</p>
                <p><strong>Category:</strong> ${product.category}</p>
                <p><strong>Stock:</strong> ${product.stock} available</p>
                <p><strong>Description:</strong> ${product.description}</p>
                <button style="margin-top: 20px; padding: 12px 25px; background-color: #ff4747; 
                              color: white; border: none; border-radius: 5px; cursor: pointer; 
                              font-size: 16px; transition: background-color 0.3s;"
                        onmouseover="this.style.backgroundColor='#e03e3e'" 
                        onmouseout="this.style.backgroundColor='#ff4747'">
                    <i class="fas fa-shopping-cart"></i> Add to Cart
                </button>
            </div>
        `;
    } catch (error) {
        console.error("Error loading product:", error);
        modalContent.innerHTML = `
            <div style="text-align: center; padding: 20px;">
                <i class="fas fa-exclamation-triangle" style="font-size: 30px; color: #ff4747;"></i>
                <p>Failed to load product details. Please try again.</p>
            </div>
        `;
    }
}

closeModal.onclick = () => {
    modal.classList.remove("visible");
    document.body.style.overflow = "auto";
};

window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.classList.remove("visible");
        document.body.style.overflow = "auto";
    }
});

fetchProducts();
fetchCategories();