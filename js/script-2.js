// ---------------------- CART SYSTEM -------------------------

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Format number (2.500.000)
function formatPrice(num) {
    return "Rp " + num.toLocaleString("id-ID");
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Add to Cart
document.querySelectorAll(".add-to-cart-btn").forEach(btn => {
    btn.addEventListener("click", function () {
        let product = this.closest(".product");
        let id = product.dataset.id;
        let name = product.dataset.name;
        let price = Number(product.dataset.price.replace(/\./g, ""));
        let image = product.dataset.image;

        let existing = cart.find(item => item.id === id);

        if (existing) {
            existing.quantity++;
        } else {
            cart.push({
                id,
                name,
                price,
                quantity: 1,
                image
            });
        }

        saveCart();
        loadCartUI();
    });
});

// Load Cart to Cart Page
function loadCartUI() {
    let cartArea = document.getElementById("cart-product");
    if (!cartArea) return;

    cartArea.innerHTML = "";

    cart.forEach(item => {
        let subtotal = item.quantity * item.price;

        cartArea.innerHTML += `
            <div class="single-row d-flex align-items-center justify-content-between py-3 border-bottom" data-id="${item.id}">
                <div class="image">
                    <img src="${item.image}" width="80">
                </div>

                <div class="name">${item.name}</div>

                <div class="price">${formatPrice(item.price)}</div>

                <div class="qty">
                    <button class="qty-dec">-</button>
                    <span class="qty-number">${item.quantity}</span>
                    <button class="qty-inc">+</button>
                </div>

                <div class="subtotal">${formatPrice(subtotal)}</div>

                <div class="delete-item" role="button">
                    <i class="fa-solid fa-trash"></i>
                </div>
            </div>
        `;
    });

    updateTotals();
    enableCartButtons();
}

// Update Totals
function updateTotals() {
    let subtotal = cart.reduce((sum, item) => sum + (item.quantity * item.price), 0);

    document.querySelector(".subtotal").innerHTML = formatPrice(subtotal);
    document.querySelector(".total").innerHTML = formatPrice(subtotal);
}

// Enable quantity & delete buttons
function enableCartButtons() {
    // Increase Quantity
    document.querySelectorAll(".qty-inc").forEach(btn => {
        btn.addEventListener("click", function () {
            let id = this.closest(".single-row").dataset.id;
            let item = cart.find(i => i.id === id);
            item.quantity++;
            saveCart();
            loadCartUI();
        });
    });

    // Decrease Quantity
    document.querySelectorAll(".qty-dec").forEach(btn => {
        btn.addEventListener("click", function () {
            let id = this.closest(".single-row").dataset.id;
            let item = cart.find(i => i.id === id);

            if (item.quantity > 1) {
                item.quantity--;
            } else {
                cart = cart.filter(i => i.id !== id);
            }

            saveCart();
            loadCartUI();
        });
    });

    // DELETE ITEM
    document.querySelectorAll(".delete-item").forEach(btn => {
        btn.addEventListener("click", function () {
            let id = this.closest(".single-row").dataset.id;
            cart = cart.filter(item => item.id !== id);
            saveCart();
            loadCartUI();
        });
    });
    
}

// On Page Load
document.addEventListener("DOMContentLoaded", loadCartUI);

          







                <div
                class="product d-flex align-items-center justify-content-between py-2"
              >
                <div class="img">
                  <img
                    src="img/Group 146.png"
                    alt="Group 146.png"
                    class="w-100 img-fluid"
                  />
                </div>
                <div class="details">
                  <h3 class="title">Asgaard sofa</h3>
                  <div class="d-flex align-items-center column-gap-3 pt-2">
                    <span class="quantity">1</span>
                    <i class="fa-solid fa-xmark"></i>
                    <span class="price">Rs. 250,000.00</span>
                  </div>
                </div>
                <div class="cross">
                  <i class="fa-solid fa-circle-xmark"></i>
                </div>
              </div>