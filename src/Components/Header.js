import IconWindow from 'images/icon-window.svg';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate()
  let count = 0
  const [isSticky, setIsSticky] = useState(false);

  const handleScroll = useCallback(() => {
    if (window.scrollY > 120) {
      setIsSticky(true);
    }
    if (window.scrollY <= 120) {
      setIsSticky(false);
    }
  }, [])

  const onClickLogo = () => {
    count = count + 1
    setTimeout(() => {
      count = 0
    }, 2000)
    if(count === 7) navigate('/DEV')
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <div className="justify-center w-full flex pt-3 text-2xl font-['ddag'] text-white flex-col items-center gap-2 select-none bg-BLUE_4">
      <img
        className="mx-auto h-28 w-auto"
        src={IconWindow}
        alt="window"
        onClick={onClickLogo}
      />
      <div className={`${isSticky ? 'fixed top-0 left-0' : ''} w-full bg-BLUE_4`}>
        <StickyArea />
      </div>
      {isSticky ? <div className="h-[54px]" /> : null}
    </div>
  );
};

const StickyArea = () => {
  return (
    <div className='w-full flex items-center justify-center py-2'>
      FLY WITH 14FRET
    </div>
  )
}

export default Header;
