import Login from "./Login";
import Header from "./Header";
import { createBrowserRouter,Outlet } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "../Components/Home";
import Footer from "./Footer";
import Leaderboard from "./Leaderboard";
import Problems from "./Problems";
import Error from "./Error";
import { Signup } from "./Signup";
 function App() {
  return (
    <div>
      <Header />
      <Outlet/>
      <Footer/>
    </div>
  );
}

 const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement:<Error/>,
    children:[
      {
        path:"/",
        element:<Home />
      },
      {
        path:"/login",
        element:<Login />,
      },
      {
        path:"/leaderboard",
        element:<Leaderboard/>
      },
      {
        path:"/problems",
        element:<Problems/>
      },{
        path:"/signup",
        element:<Signup/>
      }

    ]
  },
]);
export default routes;

