import APIGuestBook from "APIs/APIGuestBook";
import CustomButton from "Components/CustomButton";
import GuestBookItem from "Components/GuestBookItem";
import Logo from "Components/Logo";
import PageTitle from "Components/PageTitle";
import { useEffect, useState } from "react";
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
          return dateB.getTime() - dateA.getTime();
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

  return (
    <div className="mx-3">
      <Logo />
      <PageTitle title="방명록" />
      {
        isLoading ?
          null :
          <div>
            <input
              type="text"
              maxLength={10}
              placeholder="nickname"
              onChange={(event) => onChangeInput(event, setInputNickname)}
              onInput={inputHandler}
              className="block w-full rounded-md border-0 py-1.5 mt-7 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-base sm:leading-6"
              value={inputNickname}
            />
            <textarea
              type="text"
              maxLength={100}
              placeholder="comment"
              onChange={(event) => onChangeInput(event, setInputComment)}
              onInput={inputHandler}
              className="block w-full rounded-md border-0 py-1.5 mt-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-base sm:leading-6"
              value={inputComment}
            />
            <CustomButton
              type="submit"
              onClick={onClickSubmit}
              title="게시"
            />
            <ul className="divide-y divide-gray-600 py-6">
              {guestBookList.map((e, index) => {
                return <GuestBookItem
                  key={`guestbook-${index}`}
                  index={index + 1}
                  nickname={e.nickname}
                  comment={e.comment}
                  date={e.created_at}
                />
              })}
            </ul>
          </div>
      }
      <CustomButton title={"뒤로가기"} onClick={onClickBackButton} />
    </div>
  )
}

export default GuestBookPage;