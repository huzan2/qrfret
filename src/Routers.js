import { RouterProvider, createBrowserRouter } from "react-router-dom";
import DB from "routes/DB";
import DBsearch from "routes/DBsearch";
import DEVPage from "routes/DEV";
import Home from "routes/Home";
import Raffle from "routes/Raffle";
import RaffleTicket from "routes/RaffleTicket";
import SetList from "routes/SetList";

const Routers = () => {
  const basename = process.env.PUBLIC_URL;
  const routes = [
    {
      path: '/',
      element: <Home />
    },
    {
      path: '/raffle',
      element: <Raffle />
    },
    {
      path: '/raffleticket',
      element: <RaffleTicket />
    },
    {
      path: '/setlist',
      element: <SetList />
    },
    {
      path: '/DEV',
      element: <DEVPage />
    },
    {
      path: '/DB',
      element: <DB />
    },
    {
      path: '/DBsearch',
      element: <DBsearch />
    },
  ]
  
  const router = createBrowserRouter(routes, {basename: basename});

  return (
      <RouterProvider router={router}/>
  );
};

export default Routers;
