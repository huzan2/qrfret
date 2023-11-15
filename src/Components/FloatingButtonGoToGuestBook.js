import { PiPencilLine } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { navigationPath } from "util/navigationPath";


const FloatingButtonGoToGuestBook = ({page}) => {
  const navigate = useNavigate();
  const onClick = () => {
    navigate(navigationPath.GUEST_BOOK_PAGE, { state : page })
  }

  return <div onClick={onClick} className="fixed right-3 bottom-10 mb-6 bg-BLUE_4 p-2 rounded-full flex justify-center items-center text-sm">
    <PiPencilLine size={30} color="white"/>
  </div>
}

export default FloatingButtonGoToGuestBook