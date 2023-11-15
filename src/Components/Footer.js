import IconInstagram from 'images/icon-instagram.svg';
import IconKakaotalk from 'images/icon-kakaotalk.svg';
import IconYoutube from 'images/icon-youtube.svg';
import { BsPeopleFill } from "react-icons/bs";
import { useSetRecoilState } from 'recoil';
import { atomIsOpenModal } from 'util/atom';

const Footer = () => {
  const INSTAGRAM_LINK = 'https://www.instagram.com/14fre_t/'
  const KAKAOTALK_LINK = 'https://open.kakao.com/o/snCC9gRf'
  const YOUTUBE_LINK = 'https://www.youtube.com/@14fret27'
  const GITHUB_LINK = 'https://github.com/huzan2/qrfret'

  const onClickInsta = () => {
    window.open(INSTAGRAM_LINK)
  }

  const onClickKakao = () => {
    window.open(KAKAOTALK_LINK)
  }

  const onClickYoutube = () => {
    window.open(YOUTUBE_LINK)
  }

  const setIsModalOpen = useSetRecoilState(atomIsOpenModal)

  const onClickExpend = () => {
    setIsModalOpen(true);
  }

  return (
    <div className="flex justify-center w-full gap-4 border-gray-400 py-2 bg-BLUE_4 bottom-0 right-0 fixed z-10">
      <img onClick={onClickInsta} src={IconInstagram} alt="instagram" className="h-auto w-8"/>
      <img onClick={onClickYoutube} src={IconYoutube} alt="youtube" className="h-auto w-8"/>
      <img onClick={onClickKakao} src={IconKakaotalk} alt="kakaotalk" className="h-auto w-8"/>
      <BsPeopleFill onClick={onClickExpend} color="white" size={30}/>
    </div>
  )
}

export default Footer;