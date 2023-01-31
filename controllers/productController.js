const productService = require("../services/product.service");
const userService = require("../services/user.service");
const serverError = require("../errorHandler/serverError");

const addToCart = async req => {
    const productId = req.params.id;

    const user = await userService.getUser({ _id: "62b1c8a26b23a3af0db68c77" });
    if (!user) {
      throw new serverError("User not found", 404);
    }

    const product = await productService.getProduct(productId);
    if (!product) {
        throw new serverError("Product not found", 404);
    }

    const existingProduct = user.cart.find(cartProductRef => cartProductRef._id.toString() === productId);
    if(existingProduct){
        existingProduct.quantity++;
    }else{
        user.cart.push({quantity:1, _id:productId});
    }

    await updateUser(user._id, {cart: user.cart});
    return user.cart;
}

const removeFromCart = async req => {
    const productId = req.params.id;

    const user = await userService.getUser({ _id: "62b1c8a26b23a3af0db68c77" });
    if (!user) {
      throw new serverError("User not found", 404);
    }

    const existingProduct = user.cart.find(cartProductRef => cartProductRef._id.toString() === productId);
    if (!existingProduct) {
        throw new serverError("Product not found in the cart", 404);
    }

    if(existingProduct.quantity > 1){
        existingProduct.quantity--;
    }else{
        user.cart.filter(cartProductRef => cartProductRef._id.toString() !== productId);
    }
    
    await updateUser(user._id, {cart: user.cart});
    return user.cart;

}

module.exports = {
    addToCart,
    removeFromCart
};