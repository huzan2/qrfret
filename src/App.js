import Footer from "Components/Footer";
import Header from "Components/Header";
import Routers from "Routers";

function App() {
  return (
    <div>
      <Header/>
      <div className="flex justify-center align-center font-['NanumSquare']">
        <div className="flex flex-1 flex-col max-w-lg justify-center w-96 lg:px-8 mt-14 mb-20">
          <Routers />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
