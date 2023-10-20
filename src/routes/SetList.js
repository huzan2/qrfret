import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSetList } from "../APIs/APISetList";
import CustomButton from "../Components/CustomButton";
import PageTitle from './../Components/PageTitle';

const SetList = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true)
  const [setList, setSetList] = useState([]);

  const onClickBackButton = () => {
    navigate("/")
  }

  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>FOR DEBUG>>>>>>>>>>>>>>>
  useEffect(() => {
    if (isLoading) {
      console.log("[Home Papge] LOADING...")
    } else {
      console.log("[Home Papge] LOADING COMPLETE!")
    }
  }, [isLoading])
  //<<<<<<<<<<<<<<<<<<<<<<<<<<<<FOR DEBUG<<<<<<<<<<<<<<<

  useEffect(() => {
    setIsLoading(true);
    getSetList()
      .then((res) => {
        console.log(res)
        if (res.setList) setSetList(res.setList)
      })
    setIsLoading(false);
  }, [])
  return (
    <div>
      <PageTitle title={"셋리스트 조회"} />
      {
        isLoading ?
          null :
          <div>
            {
              setList && setList.length > 0 ?
                setList.map((ele, idx) => {
                  return (
                    <div key={`setlist-${idx}`} className="mt-5">
                      {ele.number + ". " ?? ""}
                      {ele.songName + " / " ?? ""}
                      {ele.songArtist + " / " ?? ""}
                      {
                        ele.vocal ?
                        "보컬: " + ele.vocal.join(', ') + " / "
                        : ""
                      }
                      {
                        ele.guitar ?
                        "기타: " + ele.guitar.join(', ') + " / "
                        : ""
                      }
                      {
                        ele.keyboard ?
                        "키보드: " + ele.keyboard.join(', ') + " / "
                        : ""
                      }
                      {
                        ele.base ?
                        "베이스: " + ele.base.join(', ') + " / "
                        : ""
                      }
                      {
                        ele.drum ?
                        "드럼: " + ele.drum.join(', ')
                        : ""
                      }
                    </div>
                  )
                })
                : null
            }
          </div>
      }
      <CustomButton
        title={"뒤로가기"}
        onClick={onClickBackButton}
      />
    </div>
  )
}

export default SetList;