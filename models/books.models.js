const { default: mongoose } = require("mongoose");

const BooksSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    publishedYear: {
      type: Number, // Corrected to match the field in your data
      required: true,
    },
    genre: [
      {
        type: String, // Added genre field
      },
    ],
    language: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      default: "United States",
    },
    rating: {
      type: Number,
      min: 0,
      max: 10,
      default: 0,
    },
    summary: {
      type: String,
    },
    coverImageUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Books = mongoose.model("Books", BooksSchema);

module.exports = Books;
