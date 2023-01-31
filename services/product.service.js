const { find, add, update } = require("./mongodb.service");

const getProduct = async (query) => {
    const product = await find("product", query);
    return product[0];
  };



module.exports = {
    getProduct
};