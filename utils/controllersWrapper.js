const wrapper = (cb) => {
  return async (req, res, next) => {
    try {
      const results = await cb(req);
      console.log("controller response: ", results);
      res.send(results);
    } catch (error) {
      next(error);
    }
  };
};

module.exports = wrapper;
