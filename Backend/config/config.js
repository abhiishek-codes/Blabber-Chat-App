if (process.env.NODE_ENV === "Production") {
  console.log = function () {};
  console.error = function () {};
}
