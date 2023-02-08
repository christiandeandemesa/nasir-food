import { Router } from "express";
import asyncHandler from "express-async-handler";
import { OrderModel } from "../models/order.model";
import auth from "../middlewares/auth.mid";
import { OrderStatusEnum } from "../constants/order_status";

const router = Router();
router.use(auth);

// Deletes the previous order, then creates a new order.
router.post(
  "/create",
  asyncHandler(async (req: any, res: any) => {
    const requestOrder = req.body;

    if (requestOrder.items.length <= 0) {
      res.status(401).send("Cart Is Empty!");
      return;
    }

    await OrderModel.deleteOne({
      user: req.user.id,
      status: OrderStatusEnum.NEW,
    });

    const newOrder = new OrderModel({ ...requestOrder, user: req.user.id });
    await newOrder.save();
    res.send(newOrder);
  })
);

export default router;
