import { Route, Routes } from "react-router-dom"
import DEVPage from "./routes/DEV"
import Detail from "./routes/Detail"
import Home from "./routes/Home"
import Manage from "./routes/Manage"
import Raffle from "./routes/Raffle"
import RaffleTicket from "./routes/RaffleTicket"
import SetList from "./routes/SetList"

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/detail" element={<Detail />} />
      <Route path="/manage" element={<Manage />} />
      <Route path="/raffle" element={<Raffle />} />
      <Route path="/raffleticket" element={<RaffleTicket />} />
      <Route path="/setlist" element={<SetList />} />
      <Route path="/DEV" element={<DEVPage />} />
    </Routes>
    )
}

export default Router