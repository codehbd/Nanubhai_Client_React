import zod from "zod";
export const cartItemSchema = zod.object({
  productId: zod.string().trim().nonempty("Product ID is required"),
  qty: zod.number().int().min(1, "Quantity must be at least 1"),
  price: zod.number().positive("Price must be positive"),
  image: zod
    .string("Image must be string!")
    .trim()
    .nonempty("Image is required!"),
});
export const addToCartSchema = zod
  .object({
    userId: zod.string("User id must be string!").trim().optional(),
    guestId: zod.string("Guest id must be string!").trim().optional(),
    productId: zod
      .string("Product id must be string!")
      .trim()
      .nonempty("Product id is required!"),
    varientId: zod.string("Varient id must be string!").trim().optional(),
    quantity: zod.coerce
      .number("Quantity must be number!")
      .min(1, "User id is required!"),
  })
  .refine((data) => data.userId || data.guestId, {
    message: "Either userId or guestId must be provided",
    path: ["userId"], // can point to userId or guestId
  });

export const changeCartQuantitySchema = zod.object({
  type: zod.enum(["INC", "DEC"], "Invalid type"),
});

export const mergeGuestCartSchema = zod.object({
  userId: zod.string("User id must be string!").trim(),
  guestId: zod.string("Guest id must be string!").trim(),
});
export const applyCartCouponSchema = zod.object({
  couponCode: zod
    .string("Coupon code must be string!")
    .trim()
    .nonempty("Coupon code is required!"),
});
