import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";

export const deliveryOptions = [{
  id: '1',
  deliveryDays: 7,
  priceCents: 0
},{
  id: '2',
  deliveryDays: 3,
  priceCents: 499
},{
  id: '3',
  deliveryDays: 1, 
  priceCents: 999
}];

export function getDeliveryOption(deliveryOptionId){
  let deliveryOption;

    deliveryOptions.forEach((option) => {
      if (deliveryOptionId === option.id) {
        deliveryOption = option;
      }
    });
    return deliveryOption || deliveryOptions[0];
}

export function calculateDeliveryDate(deliveryOption) {
  let date = dayjs();
  let remainingDays = deliveryOption.deliveryDays;

  while (remainingDays > 0) {
    date = date.add(1, 'day');
    const day = date.day(); // 0 = Sunday, 6 = Saturday
    if (day !== 0 && day !== 6) {
      remainingDays--;
    }
  }

  const formatted = date.format('dddd, MMMM D');
  return formatted;
}
