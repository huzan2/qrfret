import { useNavigate } from "react-router-dom";
import logofret from "../logofret.jpeg";

const Logo = () => {
  const navigate = useNavigate()
  let count = 0

  const onClickLogo = () => {
    count = count + 1
    setTimeout(() => {
      count = 0
    }, 2000)
    if(count === 7) navigate('/DEV')
  }

  return (
    <div>
      <img
        className="mx-auto h-20 w-auto"
        src={logofret}
        alt="Your Company"
        onClick={onClickLogo}
      />
    </div>
  )
}

export default Logo