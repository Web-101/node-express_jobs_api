import * as validator from "express-validator";

export const registerSchema = validator.checkSchema({
  name: {
    isString: true,
    exists: true,
    isLength: {
      options: { min: 3, max: 30 },
    },
  },

  email: {
    isString: true,
    exists: true,
    isLength: {
      options: { max: 40 },
    },
    isEmail: true,
  },

  password: {
    isString: true,
    exists: true,
    isLength: {
      options: { min: 6, max: 30 },
    },
  },

  passwordConfirmation: {
    isString: { errorMessage: "Password confirmation must be a string" },
    exists: { errorMessage: "Password confirmation is required" },
    isLength: {
      options: { min: 6, max: 30 },
      errorMessage: "Password confirmation must be at least 6 characters long",
    },
    custom: {
      options: function (value: string, { req }: any) {
        if (value !== req.body.password) {
          throw Error("Password confirmation must match password");
        }

        return value === req.body.password;
      },
    },
  },
});

export const loginSchema = validator.checkSchema({
  email: {
    isString: true,
    exists: true,
    isLength: {
      options: { max: 40 },
    },
    isEmail: true,
  },

  password: {
    isString: true,
    exists: true,
    isLength: {
      options: { min: 6, max: 30 },
    },
  },
});
