import RootLayout from "./layouts/RootLayout";
import HomePage from "./components/HomePage";
import CheckIn from "./components/Checkin";
import CheckOut from "./components/Checkout";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<HomePage />} />
      <Route path="checkin" element={<CheckIn />} />
      <Route path="checkout" element={<CheckOut />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
