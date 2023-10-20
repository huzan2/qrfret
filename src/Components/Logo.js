import logofret from "../logofret.jpeg";

const Logo = () => {
  const onClickLogo = () => {

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