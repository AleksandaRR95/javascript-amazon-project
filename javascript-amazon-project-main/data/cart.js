export const cart = [];

export function addToCart (button){

  const productId = button.dataset.productId; 

   let matchingItem;
   let selectElement = document.querySelector(`.js-quantity-selector-${productId}`);
   let quantity = Number(selectElement.value);

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
        quantity
      });
    }
}