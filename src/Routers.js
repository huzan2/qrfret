import { Route, Routes } from "react-router-dom";
import DB from "routes/DB";
import DEVPage from "routes/DEV";
import Home from "routes/Home";
import Raffle from "routes/Raffle";
import RaffleTicket from "routes/RaffleTicket";
import SetList from "routes/SetList";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/raffle" element={<Raffle />} />
      <Route path="/raffleticket" element={<RaffleTicket />} />
      <Route path="/setlist" element={<SetList />} />
      <Route path="/DEV" element={<DEVPage />} />
      <Route path="/DB" element={<DB />} />
    </Routes>
  );
};

export default Routers;
