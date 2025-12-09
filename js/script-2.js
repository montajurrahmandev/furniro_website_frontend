document.addEventListener("DOMContentLoaded", () => {
  // --- 1. SIDEBAR TOGGLE LOGIC ---
  const btn = document.getElementById("btn"); // Cart Icon
  const btnC = document.getElementById("btnC"); // Close Icon
  const cartSidebar = document.getElementById("cart-sidebar");

  cartSidebar.classList.remove("active")
  if (btn && cartSidebar) {
    btn.addEventListener("click", () => {
      cartSidebar.classList.add("active"); // Use class instead of display for animation support
      // OR: cartSidebar.style.display = "block"; 
    });
  }

  if (btnC && cartSidebar) {
    btnC.addEventListener("click", () => {
      cartSidebar.classList.remove("active");
      // OR: cartSidebar.style.display = "none";
    });
  }

  // Close sidebar when clicking outside
  document.addEventListener("click", (e) => {
    if (cartSidebar && btn) {
      if (!cartSidebar.contains(e.target) && !btn.contains(e.target)) {
        cartSidebar.classList.remove("active");
        // OR: cartSidebar.style.display = "none";
      }
    }
  });

  // --- 2. ADD TO CART LOGIC ---
  const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
  
  // Get cart from storage or empty array
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  addToCartButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault(); // Stop link navigation
      
      // Find the product card
      const productElement = e.target.closest("#product") || e.target.closest(".col-lg-3");
      
      if (!productElement) return; 

      const productId = productElement.dataset.id;
      const productName = productElement.dataset.name;
      const productImage = productElement.dataset.image;
      
      // FIX: Clean the price string (remove dots) and convert to Number
      let rawPrice = productElement.dataset.price;
      // Remove dots (and commas if any) to get a clean number like 2500000
      const productPrice = Number(rawPrice.replace(/\./g, "").replace(/,/g, ""));

      const existing = cart.find((item) => item.id === productId);
      
      if (existing) {
        existing.quantity += 1;
      } else {
        cart.push({
          id: productId,
          name: productName,
          price: productPrice, // Store as Number
          image: productImage,
          quantity: 1,
        });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
      
      // Optional: Open sidebar automatically
      if(cartSidebar) cartSidebar.classList.add("active");
      // alert(`${productName} has been added to the cart.`);
    });
  });

  // --- 3. RENDER CART LOGIC ---
  function renderCart() {
    const store = JSON.parse(localStorage.getItem("cart")) || [];

    const cartSidebarProduct = document.getElementById("cart-sidebar-product");
    const cartProduct = document.getElementById("cart-product"); // Only exists on Cart Page
    const subtotalElements = document.querySelectorAll(".subtotal-display"); // Use class for multiple subtotals
    const sidebarSubtotal = document.getElementById("subtotal"); // Specific ID from your HTML

    // Clear previous HTML
    if (cartSidebarProduct) cartSidebarProduct.innerHTML = "";
    if (cartProduct) cartProduct.innerHTML = "";

    let grandTotal = 0;

    // Case: Empty Cart
    if (store.length === 0) {
      if (cartSidebarProduct) cartSidebarProduct.innerHTML = "<p class='text-center mt-3'>Your cart is empty.</p>";
      if (cartProduct) cartProduct.innerHTML = "<tr><td colspan='6' class='text-center'>Your cart is empty.</td></tr>";
      if (sidebarSubtotal) sidebarSubtotal.innerText = "Rs. 0";
      return;
    }

    // Case: Items exist
    store.forEach((item) => {
      // Calculation
      const itemTotal = item.price * item.quantity;
      grandTotal += itemTotal;

      // FIX: Render Sidebar (Only if element exists)
      if (cartSidebarProduct) {
        cartSidebarProduct.innerHTML += `
          <div class="product d-flex align-items-center justify-content-between py-2">
            <div class="img" style="width: 50px;">
              <img src="${item.image}" alt="product" class="w-100 img-fluid" />
            </div>
            <div class="details">
              <h3 class="title" style="font-size: 14px;">${item.name}</h3>
              <div class="d-flex align-items-center column-gap-3 pt-2">
                <span class="quantity">${item.quantity} x </span>
                <span class="price text-warning">Rs. ${item.price.toLocaleString('id-ID')}</span>
              </div>
            </div>
            <div class="cross">
              <i class="fa-solid fa-circle-xmark delete-btn" data-id="${item.id}" style="cursor: pointer;"></i>
            </div>
          </div>
        `;
      }

      // FIX: Render Main Cart Page (Only if element exists)
      if (cartProduct) {
        // Note: Adjusted structure to match standard table or flex list
        cartProduct.innerHTML += `
           <ul class="d-flex align-items-center justify-content-between list-unstyled border-bottom py-3">
              <li style="width: 15%" class="d-none d-md-block"><img src="${item.image}" class="img-fluid" style="width: 70px; border-radius: 5px;"></li>
              <li style="width: 20%">${item.name}</li>
              <li style="width: 15%">Rs. ${item.price.toLocaleString('id-ID')}</li>
              <li style="width: 15%"><span class="border px-3 py-1">${item.quantity}</span></li>
              <li style="width: 20%">Rs. ${itemTotal.toLocaleString('id-ID')}</li>
              <li style="width: 10%"><i class="fa-solid fa-trash text-danger delete-btn" data-id="${item.id}" style="cursor: pointer;"></i></li>
           </ul>
        `;
      }
    });

    // Update Subtotal Text
    if (sidebarSubtotal) sidebarSubtotal.innerText = `Rs. ${grandTotal.toLocaleString('id-ID')}`;
    
    // Helper to update specific cart page totals if they exist
    const cartPageSubtotal = document.querySelector('.cart-card .subtotal');
    const cartPageTotal = document.querySelector('.cart-card .total');
    
    if(cartPageSubtotal) cartPageSubtotal.innerText = `Rs. ${grandTotal.toLocaleString('id-ID')}`;
    if(cartPageTotal) cartPageTotal.innerText = `Rs. ${grandTotal.toLocaleString('id-ID')}`;

    // --- 4. RE-ATTACH DELETE LISTENERS ---
    // We must do this HERE because the HTML was just created
    attachDeleteListeners();
  }

  function attachDeleteListeners() {
    const deleteButtons = document.querySelectorAll(".delete-btn");
    deleteButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            const id = e.target.dataset.id;
            removeFromCart(id);
        });
    });
  }
function removeFromCart(id) {
    // ADD THIS LINE — refresh cart from localStorage
    cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart = cart.filter(item => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart(); // Re-render to show changes
}
  // Initial Render on Page Load
  renderCart();
});