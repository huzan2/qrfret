import { BrowserRouter } from "react-router-dom";
import Logo from "./Components/Logo";
import Router from "./Router";

function App() {
  return (
    <BrowserRouter basename="/qrfret">
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <Logo />
        <Router />
      </div>
    </BrowserRouter>
  );
}

export default App;
