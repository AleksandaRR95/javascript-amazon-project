
import { cart, addToCart, calculateCartQuantity } from "../data/cart.js";
import {products} from "../data/products.js"
import { formatCurrency } from "./utils/money.js";
let productsHTML = '';
updateCartQuantity();
products.forEach((product) => {
  productsHTML += `
    <div class="product-container">
          <div class="product-image-container">
            <img class="product-image" src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="${product.getStarsUrl()}">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            ${product.getPrice()}
          </div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          ${product.extraInfoHTML()}

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-cart-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart"
          data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>
  `;
  //data-set atribut
  // koristimo ga da prenesemo neki podatak preko HTML
  // ovde prenosimo product.id
  //kljuc se konvertuje iz kebab u camel case product-id => productId
});

function updateCartQuantity(){
  const cartQuantity = calculateCartQuantity();  
    
  document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
}
function addToCartTextShowing(button){
  const productId = button.dataset.productId; 
   //showing text added to cart
    const addedElement = document.querySelector(`.js-added-to-cart-${productId}`);
    // dodajemo klasu da se prikaze "Added"
    addedElement.classList.add('add-to-cart-visible');
    // za previousTimeoutId postavljamo productId: ?
    const previuosTimeoutId = addedMessageTimeouts[productId];
    //proveravamo da li postoji neki stari timeoutId
    //ako postoji brisemo ga
    if(previuosTimeoutId){
      clearTimeout(previuosTimeoutId);
    }
    //brisemo klasu za div sa tekstom
    const timeoutId = setTimeout(() => {
      addedElement.classList.remove('add-to-cart-visible');
    }, 2000);
    //dodajemo u objekat timeoutId pod kljucem productId
    //e.g.. id12847e9-5323-403f-b7cf-57fde044a955 : 25
    addedMessageTimeouts[productId] = timeoutId;
}

document.querySelector('.js-products-grid').innerHTML = productsHTML;
//cuvamo id-jeve timeout-a za svako dugme u objekat
const  addedMessageTimeouts = {};
document.querySelectorAll('.js-add-to-cart')
.forEach((button) => {
  button.addEventListener('click', () => {
   addToCart(button);
   updateCartQuantity();
   addToCartTextShowing(button);
  });
});