import { getGuestBook } from "APIs/APIGuestBook";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const GuestBookPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [guestBookList, setGuestBookList] = useState([]);
  const [guestBookCount, setGuestBookCount] = useState(0);
  const navigate = useNavigate();

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
  useEffect(() => {
    setIsLoading(true);
    getGuestBook().then(
      (res) => {
        setGuestBookCount(res.count)
        setGuestBookList(res.guestBook)
      })
    setIsLoading(false);
  }, []);

  /**
   * 다음 두 방법 중 하나로 pagenation할 생각.
   * 1. Pagenation Bar로 인덱싱
   * 2. 세로로 무한스크롤 pagenation
   * 위 두 방법 중 어떤 방법으로 하더라도 API에 pageNo, pageSize 같이 넣어줘서 받아오는 메소드 작성해야 함
   */

  return (
    <>
      {
        isLoading ?
          null :
          <div>
            {guestBookList.map((e, index) => {
              return (
                <div key={`guest-${index}`}>
                  {index + 1}. {e.nickname}: {e.comment}
                </div>
              )
            })}
          </div>
      }
    </>
  )
}

export default GuestBookPage;