// cart_Sidebar

const btn = document.getElementById("btn");
const btnC = document.getElementById("btnC");
const content = document.getElementById("cart-sidebar");

btn.addEventListener("click", () => {
  if (content.style.display === "none" || content.style.display === "") {
    content.style.display = "block"; // show
  }
});

btnC.addEventListener("click", () => {
  content.style.display = "none"; // show
});
content.addEventListener("click", (e) => {
  e.stopPropagation();
});
document.addEventListener("click", (e) => {
  if (!content.contains(e.target) && !btn.contains(e.target)) {
    content.style.display = "none";
  }
});

// product part

document.addEventListener("DOMContentLoaded", () => {
  // 1. Select the product containers (assuming '#product' is the main repeatable card ID,
  // it's still best to use a class, but we will target it by ID for now since it wraps the logic).
  const productContainers = document.querySelectorAll("#product");

  productContainers.forEach((container) => {
    // 2. Query elements specific to this container only
    const optionsBtn = container.querySelector("#optionsBtn");
    const overly = container.querySelector(".overly"); // Assuming you fix the ID to class in HTML

    // Ensure both elements exist before trying to attach listeners
    if (!optionsBtn || !overly) {
      return;
    }

    // --- Logic to open the overly ---
    optionsBtn.addEventListener("click", (event) => {
      event.stopPropagation(); // Prevents click from bubbling up and immediately closing the overly

      if (overly.style.display === "none" || overly.style.display === "") {
        overly.style.display = "block";
        optionsBtn.classList.add("d-none");
      }
    });

    // --- Logic to close the overly when clicking anywhere else ---
    document.addEventListener("click", (e) => {
      // Check if the click target is outside the specific overly AND outside the specific optionsBtn
      // AND the overly is currently visible
      if (
        overly.style.display === "block" &&
        !overly.contains(e.target) &&
        !optionsBtn.contains(e.target)
      ) {
        overly.style.display = "none";
        optionsBtn.classList.remove("d-none");
      }
    });
  });
});

// Add to cart
const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

addToCartButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const productId = button.dataset.id;
    const productName = button.dataset.name;
    const productPrice = parseFloat(button.dataset.price.replace(/\./g, ""));
    const productImage = button.dataset.image;

    const existing = cart.find((item) => item.id === productId);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({
        id: productId,
        name: productName,
        price: productPrice,
        image: productImage,
        quantity: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
    // alert(`${productName} has been added to the cart.`);
  });
});
// console.log(cart);

// Cart Rendering

function renderCart() {
  const store = JSON.parse(localStorage.getItem("cart")) || [];
  const cartProduct = document.getElementById("cart-product");
  const cartSidebarProduct = document.getElementById("cart-sidebar-product");
  const cartSubtotal = document.querySelectorAll(".cart-subtotal");
  const cartTotal = document.querySelectorAll(".cart-total");


  cartProduct.innerHTML = "";
   if (!cartSidebarProduct) return; // exit if sidebar is not on the page
  cartSidebarProduct.innerHTML = "";

  if (store.length === 0) {
    cartProduct.innerHTML = "<p>Your cart is empty.</p>";
    cartSidebarProduct.innerHTML = "<p>Your cart is empty.</p>"

    cartSubtotal.forEach((el) => {
      el.textContent = "Rp 0.00";
    });

    cartTotal.forEach((el) => {
      el.textContent = "Rp 0.00";
    });

    return; // VERY IMPORTANT
  } else {
    let grandTotal = 0;

    store.forEach((item) => {
      let subtotal = item.price * item.quantity;
      grandTotal += subtotal;

      // Cart Page Rendering
      cartProduct.innerHTML += `
      <div>
        <ul>
          <li class="d-none d-md-block">
            <img 
              src="${item.image}" 
              alt="${item.name}" 
              class="img-fluid" 
            />
          </li>
          <li>${item.name}</li>
          <li>Rp ${item.price}</li>
          <li>
            <input 
              type="number" 
              value="${item.quantity}" 
              min="1" 
              class="quantity" 
              data-id="${item.id}" 
            />
          </li>
          <li class="price">Rp ${subtotal}</li>
          <li >
            <i class="fa-solid fa-trash delete-btn" data-id="${item.id}" role="button"></i>
          </li>
        </ul>
      </div>
    `;

      // Cart Sidebar Rendering
     if (cartSidebarProduct) {
       cartSidebarProduct.innerHTML += `
                <div
          class="product d-flex align-items-center justify-content-between py-2"
        >
          <div class="img">
            <img
              src="${item.image}"
              alt="${item.name}" 
              class="w-100 img-fluid"
            />
          </div>
          <div class="details">
            <h3 class="title">${item.name}</h3>
            <div class="d-flex align-items-center column-gap-3 pt-2">
              <span class="quantity"  data-id="${item.id}">${item.quantity}</span>
              <i class="fa-solid fa-xmark"></i>
              <span class="price">Rp ${item.price}</span>
            </div>
          </div>
          <div class="cross ">
            <i class="fa-solid fa-circle-xmark delete-btn" data-id="${item.id}" role="button"></i>
          </div>
        </div>
  `;
      
     }
    });

    // cartSubtotal.textContent = `Rs. ${grandTotal.toLocaleString()}`;
    // cartTotal.textContent = `Rs. ${grandTotal.toLocaleString()}`;
    cartSubtotal.forEach((el) => {
      el.textContent = `Rp ${grandTotal.toLocaleString()}`;
    });

    cartTotal.forEach((el) => {
      el.textContent = `Rp ${grandTotal.toLocaleString()}`;
    });
    attachCartEvents();
  }
}

function attachCartEvents() {
  const store = JSON.parse(localStorage.getItem("cart")) || [];

  // Quantity change event
  document.querySelectorAll(".quantity").forEach((input) => {
    input.addEventListener("change", (e) => {
      const id = e.target.dataset.id;
      const newQty = parseInt(e.target.value);

      const item = store.find((x) => x.id === id);
      if (item) {
        item.quantity = newQty;
      }

      localStorage.setItem("cart", JSON.stringify(store));
      renderCart();
    });
  });

  // Delete item event
  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;

      const updatedStore = store.filter((x) => x.id !== id);
      localStorage.setItem("cart", JSON.stringify(updatedStore));

      renderCart();
    });
  });
}

window.onload = function () {
  renderCart();
};

// Checkout Page

// Elements in the checkout page
const orderSummary = document.getElementById("order-summary");
// const checkoutBtn = document.querySelectorAll(".checkout-btn");

// Totals
const subtotalElement = orderSummary.querySelector(".sub-price"); // first subtotal element
const totalElement = orderSummary.querySelector(".total-price");

// Function to render order summary
function renderCheckoutCart() {
  if (cart.length === 0) {
    orderSummary.innerHTML = `<p>Your cart is empty.</p>`;

    return;
  } else {

    // Clear existing products
    const productSummary = orderSummary.querySelector(".product-summary");
    productSummary.innerHTML = "";

    let grandTotal = 0;

    // Loop through cart items and render each
    cart.forEach((item) => {
      let subtotal = item.price * item.quantity;
      grandTotal += subtotal;

      productSummary.innerHTML += `
                    <div
                  class="d-flex align-items-center justify-content-between py-3"
                >
                  <span class="product d-flex align-items-center column-gap-2"
                    >${item.name} <i class="fa-solid fa-xmark"></i
                    ><span class="quantity">${item.quantity}</span></span
                  >
                  <span class="price">Rp  ${subtotal.toLocaleString()}</span>
                </div>
    `;
    });
    // Update subtotal and total
    subtotalElement.textContent = `Rp ${grandTotal.toLocaleString()}`;
    totalElement.textContent = `Rp ${grandTotal.toLocaleString()}`;
  }
}

// Call the function on page load
window.addEventListener("DOMContentLoaded", renderCheckoutCart);
