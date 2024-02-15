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

function CheckIn() {
  const [unavailBooks, setUnavailBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [checkInName, setCheckInName] = useState("");
  const [checkInSuccess, setCheckInSuccess] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/books/false")
      .then((response) => response.json())
      .then((data) => setUnavailBooks(data))
      .catch((error) =>
        console.error("Error Fetching Unavailable Books", error)
      );
  }, []);

  const handleBookClick = async (book) => {
    try {
      const response = await fetch(
        `http://localhost:3000/books/title/${book.title}`
      );
      const data = await response.json();
      setSelectedBook(data);
      setShowForm(true);
    } catch (error) {
      console.error("Error Fetching Book Details", error);
    }
  };

  const handleCheckIn = async () => {
    try {
      if (checkInName !== selectedBook.checkedOutBy) {
        setCheckInSuccess(false);
        return;
      }
      const response = await fetch(
        `http://localhost:3000/books/${selectedBook.title}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: true,
            checkedOutBy: null,
            dueDate: null,
          }),
        }
      );
      if (response.ok) {
        setCheckInSuccess(true);
        handleBookClick(selectedBook);
      } else {
        console.error("Error Checking in the Book - Response:", response);
        setCheckInSuccess(false);
      }
      console.log("Book checked in successfully");
      window.location.reload();
    } catch (error) {
      console.error("Error Checking in the Book", error);
      setCheckInSuccess(false);
    }
  };

  return (
    <PageContainer>
      <Title>This is the Check-in page</Title>
      <Subtitle>Unavailable Books For Check-in:</Subtitle>
      <BookList>
        {unavailBooks.map((book) => (
          <BookItem key={book.id} onClick={() => handleBookClick(book)}>
            {book.title}
          </BookItem>
        ))}
      </BookList>
      {selectedBook && (
        <BookDetails>
          <Subtitle>Selected Book Details</Subtitle>
          <p>Title: {selectedBook.title}</p>
          <p>Author: {selectedBook.author}</p>
          <p>Publisher: {selectedBook.publisher}</p>
          <p>ISBN: {selectedBook.ISBN}</p>
          {showForm && (
            <div>
              <Label>
                Enter Your Name:
                <Input
                  type="text"
                  value={checkInName}
                  onChange={(e) => setCheckInName(e.target.value)}
                />
              </Label>
              <Button onClick={handleCheckIn}>Submit</Button>
            </div>
          )}
          {checkInSuccess === true && (
            <p>Book checked in successfully!</p>
          )}
          {checkInSuccess === false && (
            <p>Error checking in the book. Please try again.</p>
          )}
        </BookDetails>
      )}
    </PageContainer>
  );
}

export default CheckIn;