import Login from "./Login";
import Header from "./Header";
import { createBrowserRouter,Outlet } from "react-router-dom";

import Home from "../Components/Home";
import Footer from "./Footer";
import Leaderboard from "./Leaderboard";
import Error from "./Error";
import { Signup } from "./Signup";
import PostProblems from "./PostProblems";


import { lazy, Suspense } from "react";
import { Provider } from "react-redux";
import appStore from "../../utils/Store/appStore";

const Problems=lazy(()=>import("./Problems"));

const GetProblem=lazy(()=>import("./GetProblem"));
const UpdateProblem=lazy(()=>import("./UpdateProblem"));
 function App() {
  return (
    <div className="w-full">
      <Provider store={appStore}>
      <Header />
      <Outlet/>
        <Footer/>
        </Provider>
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

        element:(
          <Suspense fallback={<h1>Loading...</h1>}>
           <Problems/>
        </Suspense>)
      },
      {
        path:"/problem/:problemId",
        element:(
        <Suspense fallback={<h1>Loading...</h1>}>
         <GetProblem/>
       
        </Suspense>
        )
      },{
        path:"/update/:problemId",
        element:(
          <Suspense fallback={<h1>Loading...</h1>}>
            <UpdateProblem/>
          </Suspense>
        )
      }
      ,{
        path:"/signup",
        element:<Signup/>
      },{
        path:"/addproblem",
        element:<PostProblems/>
      }

    ]
  },
]);
export default routes;

