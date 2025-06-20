import { renderPaymentSummary } from "../scripts/checkout/paymentSummary.js";

export let cart;

loadFromStorage();

export function loadFromStorage(){
  cart = JSON.parse(localStorage.getItem('cart')) ;  

if(!cart){
  cart = [{
  productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
  quantity: 2,
  deliveryOptionId: '1'
},{
  productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
  quantity: 1,
  deliveryOptionId: '2'
}];
}
}

//function for updating product quantity
export function updateQuantity(productId, newQuantity){
  cart.forEach((cartItem) => {
    if(cartItem.productId === productId){
      cartItem.quantity = newQuantity;
    }
  });
  saveToStorage();
}

function saveToStorage(){
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart (button){

  const productId = button.dataset.productId; 

   
   let selectElement = document.querySelector(`.js-quantity-selector-${productId}`);
   let quantity = Number(selectElement.value);

   addProductToCart(productId, quantity);
    
   saveToStorage();
}

export function addProductToCart(productId, quantity){
  let matchingItem;

  cart.forEach((cartItem) => {
      if(productId === cartItem.productId){
        matchingItem = cartItem;
      } 
    });
    if(matchingItem){
      matchingItem.quantity += quantity;
    }else{
      cart.push({
        //productId: productId,
        //quantity: quantity
        productId, 
        quantity,
        deliveryOptionId: '1'
      });
    }
}
export function removeFromCart(productId){
  const newCart = [];

  cart.forEach((cartItem) => {
    if(cartItem.productId != productId){
      newCart.push(cartItem);
    }
  });

  cart = newCart;
  saveToStorage();
}
export function calculateCartQuantity(){
  let cartQuantity = 0;
cart.forEach((cartItem) => {
  cartQuantity += cartItem.quantity;
});
return cartQuantity;
}

export function updateDeliveryOption(productId, deliveryOptionId){
  let matchingItem;

  const validDeliveryOptionIds = ['1', '2', '3'];
  
  cart.forEach((cartItem) => {
    if(productId === cartItem.productId){
      matchingItem = cartItem;
    }
  });
  if(!matchingItem){
    return;
  }
  if (!validDeliveryOptionIds.includes(deliveryOptionId)) {
    return;
  }
  matchingItem.deliveryOptionId = deliveryOptionId;
  saveToStorage();
}
export function updateCartQuantity() {
    const quantity = calculateCartQuantity();
    document.querySelector(
      ".js-return-to-home-link"
    ).innerHTML = `${quantity} items`;
    renderPaymentSummary();
  }

  export function loadCart(fun) {
  const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', () => {
      console.log(xhr.response);  
      fun();
      });
        xhr.open('GET', 'https://supersimplebackend.dev/cart');
        xhr.send();
      }