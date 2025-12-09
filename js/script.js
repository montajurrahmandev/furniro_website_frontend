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


// product part 
let optionsBtn = document.getElementById("optionsBtn")
let overly = document.getElementById("overly")



if(overly.style.display === "none" || overly.style.display === ""){
optionsBtn.addEventListener("click", ()=>{

    overly.style.display = "block"
    optionsBtn.classList.add("d-none")
  })
}
else{
  optionsBtn.classList.remove("d-none")
}


  

// Add to cart
// const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");

// let cart = JSON.parse(localStorage.getItem("cart")) || [];

// addToCartButtons.forEach((button) => {
//   button.addEventListener("click", (e) => {
//     e.preventDefault();
//     const productElement = e.target.closest("#product");
//     const productId = productElement.dataset.id;
//     const productName = productElement.dataset.name;
//     const productPrice = Number(productElement.dataset.price.replace(/\./g, ""));
//     const productImage = productElement.dataset.image;

//     const existing = cart.find((item) => item.id === productId);
//     if (existing) {
//       existing.quantity += 1;
//     } else {
//       cart.push({
//         id: productId,
//         name: productName,
//         price: productPrice,
//         image: productImage,
//         quantity: 1,
//       });
//     }
//     localStorage.setItem("cart", JSON.stringify(cart));
//     renderCart();
//     alert(`${productName} has been added to the cart.`);
//   });
// });


// // Cart Rendering

// function renderCart() {
//   const store = JSON.parse(localStorage.getItem("cart")) || [];

//   const cartSidebarProduct = document.getElementById("cart-sidebar-product");
//   const cartProduct = document.getElementById("cart-product");


 


//   cartSidebarProduct.innerHTML = "";
//   cartProduct.innerHTML = "";

//   if (store.length === 0) {
//     cartSidebarProduct.innerHTML = "<p>Your cart is empty.</p>";
//     cartProduct.innerHTML = "<p>Your cart is empty.</p>";

//   } else {
//     // let grandTotal = 0;

//     store.forEach((item) => {
//   const price = parseFloat(item.price.replace(/[^\d.-]/g, '')); // Remove non-numeric characters like commas

//       console.log(item);
      
//       // Cart Sidebar Rendering
//       cartSidebarProduct.innerHTML += `
//                       <div
//                 class="product d-flex align-items-center justify-content-between py-2"
//               >
//                 <div class="img">
//                   <img
//                     src="${item.image}"
//                     alt="product image"
//                     class="w-100 img-fluid"
//                   />
//                 </div>
//                 <div class="details">
//                   <h3 class="title">${item.name}</h3>
//                   <div class="d-flex align-items-center column-gap-3 pt-2">
//                     <span class="quantity">${item.quantity}</span>
//                     <i class="fa-solid fa-xmark"></i>
//                     <span class="price">Rs. ${price.toLocaleString()}</span>
//                   </div>
//                 </div>
//                 <div class="cross">
//                   <i class="fa-solid fa-circle-xmark"></i>
//                 </div>
//               </div>
//         `;
// // Cart Page Rendering
//       cartProduct.innerHTML += `
//       <div>
//         <ul>
//           <li class="d-none d-md-block">
//             <img 
//               src="${item.image}" 
//               alt="${item.name}" 
//               class="img-fluid" 
//             />
//           </li>
//           <li>${item.name}</li>
//           <li>Rs. ${price.toLocaleString()}</li>
//           <li>
//             <input 
//               type="number" 
//               value="${item.quantity}" 
//               min="1" 
//               class="quantity" 
//               data-id="${item.id}" 
//             />
//           </li>
//           <li class="price">Rs.</li>
//           <li class="delete" data-id="${item.id}">
//             <i class="fa-solid fa-trash"></i>
//           </li>
//         </ul>
//       </div>
//     `;


//     });

//   }
// }

// window.onload = function() {
//   renderCart();
// };


