import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "../Components/CustomButton";
import PageTitle from "../Components/PageTitle";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>FOR DEBUG>>>>>>>>>>>>>>>
  const TEST = async () => {

  }

  useEffect(() => {
    if (isLoading) {
      console.log("LOADING...")
    } else {
      console.log("LOADING COMPLETE!")
    }
  }, [isLoading])
  //<<<<<<<<<<<<<<<<<<<<<<<<<<<<FOR DEBUG<<<<<<<<<<<<<<<

  /**
   * FOR INITIALIZE
   */
  useEffect(() => {
    const init = async () => {
      setIsLoading(true)
      setIsLoading(false)
    }
    init()
  }, [])

  const onClickSetListButton = () => {
    navigate("/setlist")
  }

  const onClickRaffleButton = () => {
    navigate("/raffle")
  }

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center">
        {
          isLoading ?
            null :
            <div>
              <PageTitle title={"2023 14fret 정기공연"} />
              <CustomButton
                title={"셋리스트 조회"}
                onClick={onClickSetListButton}
              />
              <CustomButton
                title={"추첨권 등록 및 조회"}
                onClick={onClickRaffleButton}
              />
            </div>
        }
      </div>
    </>
  );
}
