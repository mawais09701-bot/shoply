import Cart from "./cart/Cart.jsx";
import Home from "./home/Home.jsx";
import Shop from "./shop/Shop.jsx";
import App from "../App.jsx";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },

      {
        path: "shop",
        element: <Shop />,
      },

      {
        path: "cart",
        element: <Cart />,
      },
    ],
  },
];

export default routes;
