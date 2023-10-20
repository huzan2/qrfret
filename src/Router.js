import { Route, Routes } from "react-router-dom"
import Detail from "./routes/Detail"
import Home from "./routes/Home"
import Manage from "./routes/Manage"
import Raffle from "./routes/Raffle"
import SetList from "./routes/SetList"

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/detail" element={<Detail />} />
      <Route path="/manage" element={<Manage />} />
      <Route path="/raffle" element={<Raffle />} />
      <Route path="/setlist" element={<SetList />} />
    </Routes>
    )
}

export default Router