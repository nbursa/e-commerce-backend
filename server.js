const mongoose = require("mongoose");
const app = require("app");

mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => {
    console.log("MongoDB Connected");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log("Server listening on port ${PORT}");
    });
  })
  .catch((err) => {
    console.log("MongoDB connection error:", err);
  });
