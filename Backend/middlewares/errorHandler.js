const { z } = require("zod");

const errorHandler = (err, req, res, next) => {
  if (err instanceof z.ZodError) {
    // Zod validation error
    const errorMessage = err.errors.map((error) => ({
      field: error.path[0],
      message: error.message,
    }));

    res.status(400).json({ error: errorMessage }); // Use err.errors[0].message to access the error message
  } else if (err.message.includes("Signup failed")) {
    // Signup failure error
    res.status(400).json({ error: err.message });
  } else if (err.message.includes("Invalid email or password")) {
    // Login failure error
    res.status(401).json({ error: err.message });
  } else if (err.message.includes("User already exists")) {
    res.status(401).json({ error: err.message });
  } else if (err.message.includes("header") || err.message.includes("token")) {
    res.status(401).json({ error: err.message });
  } else {
    // Other types of errors
    console.error("Internal server error:", err);
    res.status(500).json({ error: err });
  }
};

const invalidUrl = (req, res) => {
  res.status(404).json({ error: "Invalid URL" });
};

module.exports = { errorHandler, invalidUrl };
