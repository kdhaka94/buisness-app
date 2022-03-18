import Joi from "joi";

export const signUpSchema_1 = Joi.object({
  mobileNumber: Joi.string().min(10).required().label("Mobile Number"),
  password: Joi.string().required().label("Password"),
  tradeName: Joi.string().label("Trade Name"),
  email: Joi.string().required().email().label("Email"),
  designation: Joi.string().label("Designation"),
});

export const signUpSchema_2 = Joi.object({
  gstNumber: Joi.string().required().label("GST Number"),
  panNumber: Joi.string().required().label("PAN Number"),
  typeOfBuisness: Joi.string().label("Type Of Buisness"),
  startYear: Joi.string().required().label("Start Year"),
  addressBuisness: Joi.string().required().label("Address Of Buisness"),
});
