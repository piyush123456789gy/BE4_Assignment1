const express = require("express");
const app = express();
const { initialiseDatabse } = require("./db/db.connect");
const Books = require("./models/books.models");

app.use(express.json());

initialiseDatabse();

async function createBook(newBook) {
  try {
    const book = new Books(newBook);
    const saveBook = await book.save();
    return saveBook;
  } catch (error) {
    throw error;
  }
}

app.post("/books", async (req, res) => {
  try {
    const savedBook = await createBook(req.body);
    res
      .status(201)
      .json({ message: "Book added successfully.", book: savedBook });
  } catch (error) {
    res.status(500).json({ error: "Failed to add the book." });
  }
});

async function getAllBooks() {
  try {
    const books = await Books.find();
    return books;
  } catch (error) {
    throw error;
  }
}

app.get("/books", async (req, res) => {
  try {
    const books = await getAllBooks();
    if (books.length != 0) {
      res.status(200).json({ message: "All the books", book: books });
    } else {
      res.status(404).json({ error: "No books found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch the books" });
  }
});

async function getBookByTitle(bookTitle) {
  try {
    const foundBook = await Books.findOne({ title: bookTitle });
    return foundBook;
  } catch (error) {
    throw error;
  }
}

app.get("/books/category/:bookTitle", async (req, res) => {
  try {
    const bookByTitle = await getBookByTitle(req.params.bookTitle);
    if (bookByTitle != 0) {
      res.json(bookByTitle);
    } else {
      res.status(404).json("No Books Found");
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch the books" });
  }
});

async function getBookByAuthor(bookAuthor) {
  try {
    const book = await Books.find({ author: bookAuthor });
    return book;
  } catch (error) {
    throw error;
    // res.status(500).json({json: "Failed to fetch the book with the author"})
  }
}

app.get("/books/authors/:authorName", async (req, res) => {
  try {
    const foundBook = await getBookByAuthor(req.params.authorName);
    if (foundBook.length != 0) {
      res.json(foundBook);
    } else {
      res.status(404).json("No Book Found");
    }
  } catch (error) {
    res.status(500).json({ json: "Failed to fetch the book with the author" });
  }
});

async function getBookOfBusiness(genres) {
  try {
    const book = await Books.find({ genre: genres });
    return book;
  } catch (error) {
    throw error;
  }
}

app.get("/books/genres/:genreName", async (req, res) => {
  try {
    const foundBook = await getBookOfBusiness(req.params.genreName);
    if (foundBook.length != 0) {
      res.json(foundBook);
    } else {
      res.status(404).json("No Books Found");
    }
  } catch (error) {
    res.status(500).json({ json: "Failed to fetch the data of books" });
  }
});

async function getBooksByReleaseYear(releaseYear) {
  try {
    const book = await Books.find({ publishedYear: releaseYear });
    return book;
  } catch (error) {
    throw error;
  }
}

app.get("/books/releases/:releaseYear", async (req, res) => {
  try {
    const book = await getBooksByReleaseYear(req.params.releaseYear);
    if (book.length != 0) {
      res.json(book);
    } else {
      res.status(404).json("No Books Found");
    }
  } catch (error) {
    res
      .status(500)
      .json({ json: "Failed to fetch the book thorugh release year" });
  }
});

async function updateBook(bookId, dataToUpdate) {
  try {
    const updatedBook = await Books.findByIdAndUpdate(bookId, dataToUpdate, {
      new: true,
    });
    return updatedBook;
  } catch (error) {
    console.log("Error in updating the book", error);
  }
}

app.post("/books/:bookID", async (req, res) => {
  try {
    const updatedBook = await updateBook(req.params.bookID, req.body);
    if (updateBook) {
      res.status(200).json({
        message: "Book updated successfully.",
        updatedBoook: updatedBook,
      });
    } else {
      res.status(404).json({ error: "Book not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update the book" });
  }
});

async function updateBookThroughTitle(bookTitle, dataToUpdate) {
  try {
    const updatedBook = await Books.findOneAndUpdate(
      { title: bookTitle },
      dataToUpdate,
      {
        new: true,
      }
    );
    return updatedBook;
  } catch (error) {
    console.log("Error in updating the book", error);
  }
}

app.post("/bookAuthor/:bookTitle", async (req, res) => {
  try {
    const book = await updateBookThroughTitle(req.params.bookTitle, req.body);
    if (book) {
      res
        .status(200)
        .json({ message: "Book updated successfully.", bookUpdates: book });
    } else {
      res.status(404).json({ error: "Book not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch the books" });
  }
});

async function deleteBook(bookId) {
  try {
    const deletedBook = await Books.findByIdAndDelete(bookId);
    return deletedBook;
  } catch (error) {
    console.log("Error while deleting the book", error);
  }
}

app.delete("/books/:bookId", async (req, res) => {
  try {
    const deletedBook = await deleteBook(req.params.bookId);
    res.status(200).json({ message: "Book deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete the book through ID." });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
