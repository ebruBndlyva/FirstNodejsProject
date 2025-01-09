import { createBrowserRouter } from "react-router-dom";

import Detail from "../page/Detail";
import Home from "../page/Home";

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "/detail/:id",
        element: <Detail />,
      },
    ],
  },
]);

export default Routes;
