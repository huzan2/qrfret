import { useNavigate } from "react-router-dom";
import { navigationPath } from "util/navigationPath";

const FloatingButtonGoToGuestBook = ({page}) => {
  const navigate = useNavigate();
  const onClick = () => {
    navigate(navigationPath.GUEST_BOOK_PAGE, { state : page })
  }

  return <div onClick={onClick} className="fixed w-16 h-16 right-3 bottom-10 mb-6 bg-BLUE_2 rounded-full flex justify-center items-center text-sm">
    방명록
  </div>
}

export default FloatingButtonGoToGuestBook