class CartItem {
  constructor(quantity, productPrice, productTitle, imageUrl, sum) {
    // eslint-disable-next-line prettier/prettier
    (this.quantity = quantity),
      // eslint-disable-next-line prettier/prettier
      (this.productPrice = productPrice),
      // eslint-disable-next-line prettier/prettier
      (this.productTitle = productTitle),
      (this.imageUrl = imageUrl),
      // eslint-disable-next-line prettier/prettier
      // eslint-disable-next-line prettier/prettier
      (this.sum = sum);
  }
}

export default CartItem;
