import zod from "zod";

export const createShippingAddressSchema = zod.object({
  street: zod
    .string("Street must be string")
    .trim()
    .nonempty("Street is required!"),
  city: zod.string("City must be string").trim().nonempty("City is required!"),
  postCode: zod.coerce
    .number("Post code must be number")
    .positive()
    .min(1, "Post code is required!"),
  country: zod
    .string("Country must be string")
    .trim()
    .nonempty("Country is required!"),
});

export const updateShippingAddressSchema = zod.object({
  street: zod.string("Street must be string").trim().optional(),
  city: zod.string("City must be string").trim().optional(),
  postCode: zod.coerce.number("Post code be number").positive().optional(),
  country: zod.string("Country must be string").trim().optional(),
});
