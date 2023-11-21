const calculateTotalPrice = (cart) => {
  cart.totalPrice = cart.items.reduce((acc, item) => acc += item.amount * item.itemInCart.price, 0);
  cart.totalPriceWithSale = cart.items.reduce((acc, item) => acc += (item.itemInCart.priceWithSale || item.itemInCart.price) * item.amount, 0);
};

module.exports = {
  calculateTotalPrice,
};
