const calculateTotalPrice = (cart) => {
  cart.totalPrice = cart.items.reduce(
    (acc, item) =>
      (acc +=
        item.orders.reduce((a, order) => order.amount + a, 0) * item.itemInCart.price),
    0
  );
  cart.totalPriceWithSale = cart.items.reduce(
    (acc, item) =>
      (acc +=
        item.orders.reduce((a, order) => order.amount + a, 0) *
        item.itemInCart.priceWithSale),
    0
  );
};

module.exports = {
  calculateTotalPrice,
};
