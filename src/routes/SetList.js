import { useNavigate } from "react-router-dom";
import CustomButton from "../Components/CustomButton";

const SetList = () => {
  const navigate = useNavigate();
  
  const onClickBackButton = () => {
    navigate("/")
  }

  return (
    <div>
      <CustomButton
        title={"뒤로가기"}
        onClick={onClickBackButton}
      />
    </div>
  )
}

export default SetList;