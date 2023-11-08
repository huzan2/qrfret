import Footer from "Components/Footer";
import Logo from "Components/Logo";
import Routers from "Routers";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter basename="/qrfret">
      <div className="flex justify-center align-center">
        <div className="flex flex-1 flex-col max-w-lg justify-center w-96 px-6 py-12 lg:px-8">
          <Logo />
          <Routers />
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
