import React, { useState, useEffect } from "react";
import styled from "styled-components";

const PageContainer = styled.div`
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const Subtitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const BookList = styled.ul`
  list-style: none;
  padding: 0;
`;

const BookItem = styled.li`
  cursor: pointer;
  color: blue;
  text-decoration: underline;
  margin-bottom: 0.5rem;
`;

const BookDetails = styled.div`
  margin-top: 2rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  font-size: 1rem;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 100%;
  margin-bottom: 1rem;
`;

const Button = styled.button`
  background-color: lightblue;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;
`;

function CheckOut() {
  const [availableBooks, setAvailableBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [checkoutName, setCheckoutName] = useState("");
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/books/true")
      .then((response) => response.json())
      .then((data) => setAvailableBooks(data))
      .catch((error) => console.error("Error Fetching Available Books", error));
  }, []);

  const handleBookClick = async (book) => {
    try {
      const response = await fetch(
        `http://localhost:3000/books/title/${book.title}`
      );
      const data = await response.json();
      setSelectedBook(data);
      setShowCheckoutForm(false); // Hide the checkout form when a new book is selected
    } catch (error) {
      console.error("Error Fetching Book Details", error);
    }
  };

  const handleCheckoutClick = () => {
    setShowCheckoutForm(true);
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3000/books/${selectedBook.title}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: false,
            checkedOutBy: checkoutName,
            dueDate: "2023-12-31",
          }),
        }
      );
      const responseData = await response.json();

      if (response.ok) {
        handleBookClick(selectedBook);
        window.location.reload();
      } else {
        console.error("Error Checking out the book:", responseData);
      }
    } catch (error) {
      console.error(
        "An unexpected error occurred while updating the book",
        error
      );
    } finally {
      window.location.reload();
    }
  };

  return (
    <PageContainer>
      <Title>This is the Checkout Page</Title>
      <Subtitle>Available Books For Checkout:</Subtitle>
      <p>Click on Book for more details</p>
      <BookList>
        {availableBooks.map((book) => (
          <BookItem key={book.id} onClick={() => handleBookClick(book)}>
            {book.title}
          </BookItem>
        ))}
      </BookList>
      {selectedBook && (
        <BookDetails>
          <Subtitle>Selected Book Details:</Subtitle>
          <p>Title: {selectedBook.title}</p>
          <p>Author: {selectedBook.author}</p>
          <p>Publisher: {selectedBook.publisher}</p>
          <p>ISBN: {selectedBook.ISBN}</p>
          {selectedBook.status && (
            <div>
              <p>Status: Available</p>
              {!showCheckoutForm && (
                <Button onClick={handleCheckoutClick}>
                  Click to Check Book Out
                </Button>
              )}
              {showCheckoutForm && (
                <form onSubmit={handleCheckout}>
                  <Label>
                    Name:
                    <Input
                      type="text"
                      value={checkoutName}
                      onChange={(e) => setCheckoutName(e.target.value)}
                    />
                  </Label>
                  <Button type="submit">Submit</Button>
                  <p>Just put in your Name and Submit All Books due: 12/31/23!</p>
                </form>
              )}
            </div>
          )}
        </BookDetails>
      )}
    </PageContainer>
  );
}

export default CheckOut;