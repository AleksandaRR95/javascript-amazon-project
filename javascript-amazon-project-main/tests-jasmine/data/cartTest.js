import { addToCart, cart, loadFromStorage, addProductToCart, removeFromCart, updateDeliveryOption } from "../../data/cart.js";
import { deliveryOptions } from "../../data/deliveryOptions.js";

  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';
  const productId3= '83d4ca15-0f35-48f5-b7a3-1ea210004f2e';

describe('test suite: addProductToCart', () => {
  beforeEach(() => {
    spyOn(localStorage, 'setItem');
  });
  it('adds an existing product to the cart', () => {
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1'
      }]);
    });
    loadFromStorage();
    addProductToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 1);
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(2);
  });

  it('adds new product to a cart', () => {
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([]);
    });
    loadFromStorage();
    
    addProductToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 1);
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(1);
  });

  
});

describe('test suite: removes product from cart', () => {
  
  beforeEach(() => {
    spyOn(localStorage, 'setItem');
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([
        {
          productId: productId1,
          quantity: 2,
          deliveryOptionId: '1'
        },{
          productId: productId2,
          quantity: 1,
          deliveryOptionId: '2'
        }
      ])
    });
    loadFromStorage();
  });

    it('removes product that is in cart', () => {
    removeFromCart(productId1);
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual(productId2);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  })
  it('removes product that is not in cart', () => {
    removeFromCart(productId3);
    expect(cart.length).toEqual(2);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  });
});

describe('test suite: update delivery options', () => {
  beforeEach(() => {
    spyOn(localStorage, 'setItem');
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([
        {
          productId: productId1,
          quantity: 2,
          deliveryOptionId: '1'
        },{
          productId: productId2,
          quantity: 1,
          deliveryOptionId: '2'
        }
      ])
    });
    loadFromStorage();
  });
 
  
  it('updates product delivery option', () => {
    updateDeliveryOption(productId1, '3');
    updateDeliveryOption(productId2, '3');
    updateDeliveryOption(productId3, '2');
    expect(cart[0].deliveryOptionId).toEqual('3');
    expect(cart[1].deliveryOptionId).toEqual('3');
    expect(cart[2]).toEqual(undefined);
    expect(localStorage.setItem).toHaveBeenCalledTimes(2);
  });
  it('does nothing if delivery option does not exist', () => {
    updateDeliveryOption(productId1, '4');
    expect(cart[0].deliveryOptionId).toEqual('1');
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
  });
});