document.addEventListener("DOMContentLoaded", () => {
  // --- CONFIGURATION ---
  const CART_STORAGE_KEY = "furniro_cart"; // Unique key to avoid conflicts
  
  // --- DOM ELEMENTS ---
  const cartSidebar = document.getElementById("cart-sidebar");
  const cartSidebarBody = document.getElementById("cart-sidebar-product");
  const cartPageBody = document.getElementById("cart-product");
  const subtotalElements = document.querySelectorAll("#subtotal, .subtotal");
  const totalElements = document.querySelectorAll(".total");
  
  // --- STATE ---
  let cart = JSON.parse(localStorage.getItem(CART_STORAGE_KEY)) || [];

  // --- INITIAL RENDER ---
  renderCart();

  // --- GLOBAL EVENT LISTENER (THE FIX) ---
  // This handles ALL clicks on the page. It works even for elements added dynamically.
  document.body.addEventListener("click", (e) => {
    
    // 1. OPEN SIDEBAR
    if (e.target.closest("#btn")) {
      if(cartSidebar) cartSidebar.classList.add("active");
    }

    // 2. CLOSE SIDEBAR
    if (e.target.closest("#btnC")) {
      if(cartSidebar) cartSidebar.classList.remove("active");
    }

    // 3. ADD TO CART
    if (e.target.classList.contains("add-to-cart-btn")) {
      e.preventDefault();
      addToCart(e.target);
    }

    // 4. DELETE ITEM (TRASH ICON OR X ICON)
    // We check if the clicked element OR its parent has the class 'delete-btn'
    const deleteBtn = e.target.closest(".delete-btn");
    if (deleteBtn) {
      const id = deleteBtn.dataset.id;
      removeFromCart(id);
    }
  });

  // Close sidebar if clicking outside of it
  document.addEventListener("click", (e) => {
    const openBtn = document.getElementById("btn");
    if (cartSidebar && openBtn) {
      if (!cartSidebar.contains(e.target) && !openBtn.contains(e.target) && cartSidebar.classList.contains("active")) {
        cartSidebar.classList.remove("active");
      }
    }
  });

  // --- CORE FUNCTIONS ---

  function addToCart(button) {
    // Find the product card by looking up the tree. 
    // We look for the class 'col-lg-3' instead of id='product' to avoid ID conflicts.
    const card = button.closest(".col-lg-3"); 

    if (!card) {
      console.error("Error: Could not find product card data.");
      return;
    }

    const product = {
      id: card.dataset.id,
      name: card.dataset.name,
      // Remove dots/commas and convert to integer
      price: parseInt(card.dataset.price.replace(/\./g, "").replace(/,/g, "")), 
      image: card.dataset.image,
      quantity: 1
    };

    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      cart.push(product);
    }

    saveAndRender();
    
    // Open sidebar to show success
    if(cartSidebar) cartSidebar.classList.add("active");
  }

  function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    saveAndRender();
  }

  function saveAndRender() {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    renderCart();
  }

  function renderCart() {
    let total = 0;
    
    // 1. HTML Generators
    let sidebarHTML = "";
    let cartPageHTML = "";

    if (cart.length === 0) {
      sidebarHTML = '<p class="text-center mt-4">Cart is empty</p>';
      cartPageHTML = '<p class="text-center mt-5">Cart is empty</p>';
    } else {
      cart.forEach(item => {
        total += item.price * item.quantity;
        const displayPrice = item.price.toLocaleString('id-ID');
        const displaySubtotal = (item.price * item.quantity).toLocaleString('id-ID');

        // Sidebar Item
        sidebarHTML += `
        <div class="product d-flex align-items-center justify-content-between py-2">
            <div class="img" style="width: 60px;">
                <img src="${item.image}" class="w-100 img-fluid" alt="${item.name}">
            </div>
            <div class="details">
                <h6 class="m-0">${item.name}</h6>
                <div class="d-flex align-items-center column-gap-2">
                    <span>${item.quantity}</span> x 
                    <span class="text-warning">Rs. ${displayPrice}</span>
                </div>
            </div>
            <div class="cross">
                <i class="fa-solid fa-circle-xmark delete-btn" data-id="${item.id}" style="cursor: pointer;"></i>
            </div>
        </div>`;

        // Cart Page
        cartPageHTML += `
        <div class="d-flex align-items-center justify-content-between py-3 border-bottom text-center">
            <div style="width: 15%"><img src="${item.image}" class="img-fluid" style="max-width: 80px;"></div>
            <div style="width: 20%">${item.name}</div>
            <div style="width: 20%">Rs. ${displayPrice}</div>
            <div style="width: 15%"><span class="border px-3 py-1">${item.quantity}</span></div>
            <div style="width: 20%">Rs. ${displaySubtotal}</div>
            <div style="width: 10%">
                <i class="fa-solid fa-trash text-danger delete-btn" data-id="${item.id}" style="cursor: pointer;"></i>
            </div>
        </div>`;
      });
    }

    // 2. Inject HTML
    if (cartSidebarBody) cartSidebarBody.innerHTML = sidebarHTML;
    if (cartPageBody) cartPageBody.innerHTML = cartPageHTML;

    // 3. Update Totals
    const formattedTotal = "Rs. " + total.toLocaleString('id-ID');
    subtotalElements.forEach(el => el.innerText = formattedTotal);
    totalElements.forEach(el => el.innerText = formattedTotal);
  }
});