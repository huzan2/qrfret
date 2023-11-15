import IconWindow from 'images/icon-window-02.png';

const Header = () => {

  return (
    <div className="justify-center w-full flex py-3 bg-BLUE_4 text-2xl font-['ddag'] text-white top-0 left-0 fixed z-10 flex-col items-center gap-2">
      <img
        className="mx-auto h-24 w-auto"
        src={IconWindow}
        alt="Your Company"
      />
      <StickyArea />
    </div>
  );
};

const StickyArea = () => {
  return(
    <div>
      FLY WITH 14FRET
    </div>
  )
}

export default Header;
