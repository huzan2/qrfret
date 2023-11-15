const CustomButton = ({ type = "button", title, onClick }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="flex w-full mt-5 justify-center rounded-md bg-BLUE_4 px-3 py-1.5 text-base leading-6 text-white shadow-sm hover:bg-BLUE_5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-BLUE_4 sm:mx-auto sm:w-full sm:max-w-sm"
    >
      {title}
    </button>
  );
};

export default CustomButton;
