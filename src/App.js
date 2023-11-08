import Footer from "Components/Footer";
import Header from "Components/Header";
import Routers from "Routers";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter basename="/qrfret">
      <Header/>
      <div className="flex justify-center align-center font-['NanumSquare']">
        <div className="flex flex-1 flex-col max-w-lg justify-center w-96 lg:px-8">
          <Routers />
        </div>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
