import logofret from "images/image-logo-removebg.png";
import { useNavigate } from "react-router-dom";

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
        className="mx-auto h-28 w-auto"
        src={logofret}
        alt="logo"
        onClick={onClickLogo}
      />
    </div>
  )
}

export default Logo