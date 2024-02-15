import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

const Main = styled.main`
  padding: 2rem;
`;

function RootLayout() {
  return (
    <>
      <Header />
      <Main>
        <Outlet />
      </Main>
    </>
  );
}

export default RootLayout;