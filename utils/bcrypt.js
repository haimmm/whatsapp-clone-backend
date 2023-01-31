const bcrypt = require('bcrypt');
const saltRounds = 10;

const encrypt = value => bcrypt.hashSync(value, saltRounds);
const compare = (value, encryptedValue) => bcrypt.compareSync(value,encryptedValue);

module.exports = {
    encrypt,
    compare
}
