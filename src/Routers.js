import DEVPage from "Pages/DEVPage";
import HomePage from "Pages/HomePage";
import RaffleConfirmPage from "Pages/RaffleConfirmPage";
import RaffleDBPage from "Pages/RaffleDBPage";
import RaffleInputPage from "Pages/RaffleInputPage";
import SetListPage from "Pages/SetListPage";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { navigationPath } from "util/navigationPath";

const Routers = () => {
  const basename = process.env.PUBLIC_URL;
  const routes = [
    {
      path: navigationPath.HOME_PAGE,
      element: <HomePage />
    },
    {
      path: navigationPath.DEV_PAGE,
      element: <DEVPage />
    },
    {
      path: navigationPath.RAFFLE_DB_PAGE,
      element: <RaffleDBPage />
    },
    {
      path: navigationPath.RAFFLE_INPUT_PAGE,
      element: <RaffleInputPage />
    },
    {
      path: navigationPath.RAFFLE_CONFIRM_PAGE,
      element: <RaffleConfirmPage />
    },
    {
      path: navigationPath.SET_LIST_PAGE,
      element: <SetListPage />
    },
  ]
  
  const router = createBrowserRouter(routes, {basename: basename});

  return (
      <RouterProvider router={router}/>
  );
};

export default Routers;
