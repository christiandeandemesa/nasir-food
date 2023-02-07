import { Router } from "express";
import asyncHandler from "express-async-handler";
import { sample_foods } from "../data";
import { FoodModel } from "../models/food.model";

const router = Router();

// Adds all the food objects from data to database.
router.get(
  "/seed",
  asyncHandler(async (req, res) => {
    const foodCount = await FoodModel.countDocuments();
    if (foodCount > 0) {
      res.send("Seed is already done");
      return;
    }

    await FoodModel.create(sample_foods);
    res.send("Seed is done");
  })
);

// Gets all the food objects in the array.
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const foods = await FoodModel.find();
    res.send(foods);
  })
);

// Gets some of the food objects depending on the search term.
router.get(
  "/search/:searchTerm",
  asyncHandler(async (req, res) => {
    // searchRegex takes the search term and makes it case insensitive using "i".
    const searchRegex = new RegExp(req.params.searchTerm, "i");

    const foods = await FoodModel.find({ name: { $regex: searchRegex } });

    res.send(foods);
  })
);

// Gets all the tag objects in the array.
router.get(
  "/tags",
  asyncHandler(async (req, res) => {
    const tags = await FoodModel.aggregate([
      // $unwind destructures an array field (e.g. "$tags"), then creates a seperate output document for each item (e.g. If I had a Pizza document with 3 different tags, it would create 3 Pizza output documents each with a different tag).
      { $unwind: "$tags" },
      // $group seperates documents by a group key (e.g. "$tags")
      {
        $group: {
          _id: "$tags",
          // $sum aggregates a value of 1 for each document, thus count is the total number of documents in the group.
          count: { $sum: 1 },
        },
      },
      // $project passes the object of grouped documents with its name (e.g. "$_id" is "$tags" from the above $group) and count, while also suppressing its _id (e.g. _id: 0).
      {
        $project: {
          _id: 0,
          name: "$_id",
          count: "$count",
        },
      },
    ]).sort({ count: -1 });

    // Creates the All tag.
    const all = {
      name: "All",
      count: await FoodModel.countDocuments(),
    };

    tags.unshift(all);
    res.send(tags);
  })
);

// Gets some of the food objects depending on the tag.
router.get(
  "/tag/:tagName",
  asyncHandler(async (req, res) => {
    const foods = await FoodModel.find({ tags: req.params.tagName });
    res.send(foods);
  })
);

// Gets one food object depending on the foodId.
router.get(
  "/:foodId",
  asyncHandler(async (req, res) => {
    const food = await FoodModel.findById(req.params.foodId);
    res.send(food);
  })
);

export default router;
