import { model, Schema, Types } from "mongoose";
import { OrderStatusEnum } from "../constants/order_status";
import { Food, FoodSchema } from "./food.model";

export interface LatLng {
  lat: string;
  lng: string;
}

export const LatLngSchema = new Schema<LatLng>({
  lat: { type: String, required: true },
  lng: { type: String, required: true },
});

export interface OrderItem {
  food: Food;
  price: number;
  quantity: number;
}

export const OrderItemSchema = new Schema<OrderItem>({
  food: { type: FoodSchema, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

export interface Order {
  id: number;
  items: OrderItem[];
  totalPrice: number;
  name: string;
  address: string;
  addressLatLng: LatLng;
  paymentId: string;
  status: OrderStatusEnum;
  user: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const orderSchema = new Schema<Order>(
  {
    items: { type: [OrderItemSchema], required: true },
    totalPrice: { type: Number, required: true },
    name: { type: String, required: true },
    address: { type: String, required: true },
    addressLatLng: { type: LatLngSchema, required: true },
    paymentId: { type: String },
    status: { type: String, default: OrderStatusEnum.NEW },
    user: { type: Schema.Types.ObjectId, required: true },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

export const OrderModel = model("order", orderSchema);
