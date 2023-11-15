import APIGuestBook from "APIs/APIGuestBook";
import GuestBookItem from "Components/GuestBookItem";
import IconArrowLeft from "images/icon-arrow-left-white.svg";
import IconArrowRight from "images/icon-arrow-right-gray.svg";
import IconArrowUp from "images/icon-arrow-up-gray.svg";
import IconNotice from "images/icon-notice.svg";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { navigationPath } from "util/navigationPath";

const GuestBookPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [guestBookList, setGuestBookList] = useState([]);
  const [guestBookCount, setGuestBookCount] = useState(0);
  const navigate = useNavigate();
  const { state } = useLocation();
  const [inputNickname, setInputNickname] = useState('')
  const [inputComment, setInputComment] = useState('')
  const lastDivRef = useRef(null);
  const [isExpanded, setIsExpanded] = useState(false);

  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>FOR DEBUG>>>>>>>>>>>>>>>
  const TEST = async () => { };

  useEffect(() => {
    if (isLoading) {
      console.log("[GuestBookPage] LOADING...");
    } else {
      console.log("[GuestBookPage] LOADING COMPLETE!");
    }
  }, [isLoading]);
  //<<<<<<<<<<<<<<<<<<<<<<<<<<<<FOR DEBUG<<<<<<<<<<<<<<<

  /**
   * FOR INITIALIZE
   */

  const refresh = async () => {
    setIsLoading(true);
    setInputComment('');
    setInputNickname('');
    APIGuestBook.getGuestBook().then(
      (res) => {
        if (res.guestBook === undefined) return;
        const guestBookList = Object.values(res.guestBook).sort((a, b) => {
          const dateA = new Date(a.created_at);
          const dateB = new Date(b.created_at);
          return dateA.getTime() - dateB.getTime();
        })
        setGuestBookCount(res.count)
        setGuestBookList(guestBookList)
      })
    setIsLoading(false);
  }

  useEffect(() => {
    refresh();
  }, []);

  /**
   * events
   */
  const onClickBackButton = () => {
    if (state === null) navigate(navigationPath.SET_LIST_PAGE)
    if (state !== undefined) navigate(state)
  }

  const onChangeInput = (event, setState) => {
    setState(event.target.value);
  }

  const inputHandler = (event) => {

  }

  const onClickSubmit = async () => {
    if (inputComment === '' || inputNickname === '') return;
    APIGuestBook.postGuestBook(inputNickname, inputComment)
      .then((res) => {
        refresh();
      })
  }

  const onClickExpand = () => {
    setIsExpanded(true)
  }

  const onClickShrink = () => {
    setIsExpanded(false)
  }

  useEffect(() => {
    if(lastDivRef.current !== null){
      lastDivRef.current.scrollIntoView();
    }
  }, [])

  return (
    <div className="">
      <div className="fixed z-[-1] left-0 top-0 w-screen h-screen bg-BLUE_4" />
      <div className="fixed left-0 top-0 z-1 flex-col w-full">
        <div className="h-[3.5rem] bg-[rgba(110,148,175,0.7)] w-full flex justify-between items-center">
          <img
            className="ml-3 h-[1.5rem]"
            alt="leftarrow"
            src={IconArrowLeft}
            onClick={onClickBackButton}
          />
          <div className="text-white font-bold">14fret 정기공연 방명록</div>
          <div />
        </div>
        {isExpanded ? (
          <div className="bg-[#FBF9FC] rounded-lg w-auto flex justify-between mx-5 p-2 pr-3">
            <img className="h-[2.5rem]" alt="notice" src={IconNotice} />
            <div className="w-[75%]">
              저희 14FRET이 한 학기동안 열심히 준비한 공연입니다! 따뜻한 말과
              응원 한 마디 부탁드립니다. 사소한 말이 공연 멤버들에게 상처가 될
              수 있으므로 악플은 삼가해주시기 바랍니다.
            </div>
            <img
              className="mt-1 h-[1.5rem]"
              alt="downarrow"
              src={IconArrowUp}
              onClick={onClickShrink}
            />
          </div>
        ) : (
          <div className="h-[3.5rem] bg-[#FBF9FC] rounded-lg w-auto flex justify-between mx-5 p-2 pr-3">
            <img className="h-[2.5rem]" alt="notice" src={IconNotice} />
            <div className="w-[75%] flex flex-start">저희 14FRET이 한 학기동안 열심… </div>
            <img
              className="mt-1 h-[1.5rem]"
              alt="rightarrow"
              src={IconArrowRight}
              onClick={onClickExpand}
            />
          </div>
        )}
      </div>
      <div className="mt-[7rem] mb-[144px]">
        {isLoading ? null : (
          <div>
            {guestBookList.map((e, index) => {
              return (
                <div
                  key={`guestbook-${index}`}
                  ref={index === guestBookList.length - 1 ? lastDivRef : null}
                >
                  <GuestBookItem
                    key={`guestbook-${index}`}
                    index={index + 1}
                    nickname={e.nickname}
                    comment={e.comment}
                    date={e.created_at}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div className="flex gap-3 flex-col fixed bottom-0 right-0 w-full bg-white p-4">
        <input
          type="text"
          maxLength={10}
          placeholder="nickname"
          onChange={(event) => onChangeInput(event, setInputNickname)}
          onInput={inputHandler}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-base sm:leading-6"
          value={inputNickname}
        />
        <div className="flex gap-4">
          <textarea
            type="text"
            maxLength={100}
            placeholder="comment"
            onChange={(event) => onChangeInput(event, setInputComment)}
            onInput={inputHandler}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-base sm:leading-6"
            value={inputComment}
          />
          <button
            onClick={onClickSubmit}
            className="flex w-[4rem] h-[4rem] items-center justify-center rounded-md bg-BLUE_4 px-3 py-1.5  text-white shadow-sm"
          >
            게시
          </button>
        </div>
      </div>
    </div>
  );
}

export default GuestBookPage;