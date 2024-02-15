import { Link } from "react-router-dom";
import styled from "styled-components";

const NavContainer = styled.nav`
  background-color: lightblue;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center; 
  gap: 2rem;
  font-size: 20px;
  list-style: none;
  padding: 0 20px; 
`;

const NavLi = styled.li`
  color: inherit;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0.5rem 0.75rem; 
  border-radius: 5px; 
  transition: background-color 0.3s ease; 
  &:hover {
    background-color: rgba(255, 255, 255, 0.3); 
  }
  & > a {
    text-decoration: none;
    color: inherit;
  }
`;

function Header() {
  return (
    <NavContainer>
      <NavLi>
        <Link to="/">Home</Link>
      </NavLi>
      <NavLi>
        <Link to="/checkin">CheckIn</Link>
      </NavLi>
      <NavLi>
        <Link to="/checkout">CheckOut</Link>
      </NavLi>
    </NavContainer>
  );
}

export default Header;