const productRouter = require("./product");
const aBidRouter = require("./autobid");
const notifyRouter = require("./notification");

module.exports = (app) => {
  app.get("/", (req, res) => {
    res.status(200).send({
      message: "Welcome to Auction Test API",
    });
  });

  app.use("/product", productRouter);
  app.use("/autobid", aBidRouter);
  app.use("/notify", notifyRouter);
};
