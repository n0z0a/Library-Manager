import styled from "styled-components";
import Header from "../components/Header";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh; 
`;

const Title = styled.h1`
  font-size: 3rem;
  color: #333;
  text-align: center;
  margin-bottom: 2rem;
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: #666;
  text-align: center;
  max-width: 600px;
`;

const Button = styled.button`
  background-color: lightblue;
  color: white;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.2rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 2rem;

  &:hover {
    background-color: #007bff;
  }
`;

function HomePage() {
  return (
    <Container>
      <Title>Welcome to The Library!</Title>
      <Description>
        Explore our vast collection of books and resources to satisfy your
        curiosity and expand your knowledge.
      </Description>
    </Container>
  );
}

export default HomePage;
