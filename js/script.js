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
document.addEventListener("click", (e) => {
  if (!content.contains(e.target) && !btn.contains(e.target)) {
    content.style.display = "none";
    
  }
});


// Add to cart 
const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

let cart = [];

addToCartButtons.forEach(button => {
    button.addEventListener('click', (e)=> {
        e.preventDefault();
        const productElement = this.closest('#product');
        const productId = productElement.getAttribute('data-id');
        const productName = productElement.getAttribute('data-name');
        const productPrice = productElement.getAttribute('data-price');
        const productImage = productElement.getAttribute('data-image');

        const existing = cart.find(item => item.id === productId)
        if (existing) {
            existing.quantity += 1;
        }
        else{
            cart.push({
                id: productId,
                name: productName,
                price: productPrice,
                image: productImage,
                quantity: 1
            });
        }
        localStorage.setItem('cart', JSON.stringify(cart))
        // alert(`${productName} has been added to the cart.`);

    });
});

// 2nd
const cartProductPart = document.getElementById('cart-product-part');
const store = JSON.parse(localStorage.getItem('cart'));
const subtotal = document.getElementById('subtotal');

if (store.length === 0){
    cartProductPart.innerHTML = "<p>Your cart is empty.</p>";
}
else{
    store.forEach(item => {
        cartProductPart.innerHTML += `
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
                    <span class="quantity">${item.quantity}</span>
                    <i class="fa-solid fa-xmark"></i>
                    <span class="price">Rs. ${item.price}</span>
                  </div>
                </div>
                <div class="cross">
                  <i class="fa-solid fa-circle-xmark"></i>
                </div>
              </div>
        `;
        // subtotal.innerHTML += `<span> ${item.price * item.quantity}</span>`;

    });
}

