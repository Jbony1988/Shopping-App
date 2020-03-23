class CartItem {
  constructor(quantity, productPrice, productTitle, sum) {
    // eslint-disable-next-line prettier/prettier
    (this.quantity = quantity),
      // eslint-disable-next-line prettier/prettier
      (this.productPrice = productPrice),
      // eslint-disable-next-line prettier/prettier
      (this.productTitle = productTitle),
      // eslint-disable-next-line prettier/prettier
      (this.sum = sum);
  }
}

export default CartItem;
