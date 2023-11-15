import CustomModal from "Components/CustomModal";
import Routers from "Routers";
import { useRecoilValue } from "recoil";
import { atomIsOpenModal } from "util/atom";

function App() {
  const isModalOpen = useRecoilValue(atomIsOpenModal);
  return (
    <div className="font-['NanumSquare'] select-none">
      <div className="flex justify-center align-center">
        <div className="flex flex-1 flex-col justify-center">
          <Routers />
        </div>
      </div>
      {isModalOpen ? <CustomModal /> : null}
    </div>
  );
}

export default App;
