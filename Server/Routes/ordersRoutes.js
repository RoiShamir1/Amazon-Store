import express from "express";
import expressAsyncHandler from "express-async-handler";

import Order from "../Models/OrderModel.js";
import  {isAuth}  from "../utils.js";

export const orderRouter = express.Router();

orderRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const order = await Order.findById(id);
    if (order) {
      return res.send(order);
    }
    //res.status(400).send({ message: "notfound" });
    res.status(404);
  })
);

orderRouter.post(
  "/",
  isAuth,
  expressAsyncHandler(async (req, res, next) => {
    const newOrder = new Order({
      orderItems: req.body.orderItems.map((item) => ({
        product: item._id,
        // name: item.name,
        // qty: parseInt(item.qty),
        // price: parseFloat(item.price),
        // image: item.image
      })),
      shippingAddress: req.body.shippingAddress,
      paymentMethod: req.body.paymentMethod,
      itemsPrice: req.body.itemsPrice,
      shippingPrice: req.body.shippingPrice,
      taxPrice: req.body.taxPrice,
      totalPrice: req.body.totalPrice,
      user: req.user._id,
    });
    try {
      const order = await newOrder.save();
      res.status(201).send({ message: "new order created", order });
    } catch (error) {
      res.sendStatus(500);
    }
  })
);

export default orderRouter;
