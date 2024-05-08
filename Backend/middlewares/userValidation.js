const { z } = require("zod");

const signupSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name must be at least 1 characters long" })
    .max(30, { message: "Name cannot exceed 30 characters" }),
  uname: z.string().email({ message: "Invalid email address" }),
  pass: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),

  profilePic: z
    .string()
    .optional()
    .or(
      z
        .string()
        .refine(
          (value) =>
            value === "" || /^https?:\/\/.*\.(png|jpg|jpeg|gif)$/i.test(value),
          {
            message:
              "Profile picture URL must be a valid URL ending with .png, .jpg, .jpeg, or .gif",
          }
        )
    ),
});

const loginSchema = z.object({
  username: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

const signupIpValidation = (req, res, next) => {
  try {
    const data = signupSchema.parse(req.body);
    next();
  } catch (error) {
    throw error;
  }
};

const loginIpValidation = (req, res, next) => {
  try {
    const data = loginSchema.parse(req.body);
    next();
  } catch (error) {
    console.log(error instanceof z.ZodError);
    throw error;
  }
};

module.exports = {
  signupIpValidation,
  loginIpValidation,
};
