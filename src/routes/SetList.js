import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSetList } from "../APIs/APISetList";
import CustomButton from "../Components/CustomButton";
import PageTitle from "./../Components/PageTitle";

const SetList = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [setList, setSetList] = useState([]);

  const onClickBackButton = () => {
    navigate("/");
  };

  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>FOR DEBUG>>>>>>>>>>>>>>>
  useEffect(() => {
    if (isLoading) {
      console.log("[Home Page] LOADING...");
    } else {
      console.log("[Home Page] LOADING COMPLETE!");
    }
  }, [isLoading]);
  //<<<<<<<<<<<<<<<<<<<<<<<<<<<<FOR DEBUG<<<<<<<<<<<<<<<

  useEffect(() => {
    setIsLoading(true);
    getSetList().then((res) => {
      console.log(res);
      if (res.setList)
        setSetList(res.setList.sort((a, b) => a.number - b.number));
    });
    setIsLoading(false);
  }, []);
  return (
    <div>
      <PageTitle title={"셋리스트 조회"} />
      {isLoading ? null : (
        <div>
          <ul role="list" className="divide-y divide-gray-100">
            {setList && setList.length > 0
              ? setList.map((ele, idx) => {
                  return (
                    <li
                      key={`setlist-${idx}`}
                      className="flex justify-between gap-x-6 py-5"
                    >
                      <div className="flex min-w-0 gap-x-4">
                        <p className="text-sm font-semibold mt-4">
                          {ele.number}
                        </p>
                        <div className="min-w-0 flex-auto">
                          <p className="text-sm font-bold leading-6 text-gray-900">
                            {`${ele.songName} - ${ele.songArtist}`}
                          </p>
                          <p className="text-sm font-medium text-gray-800">
                            {ele.vocal
                              ? "V." + ele.vocal.join(", ") + " / "
                              : ""}
                            {ele.guitar
                              ? "G." + ele.guitar.join(", ") + " / "
                              : ""}
                            {ele.keybord
                              ? "K." + ele.keybord.join(", ") + " / "
                              : ""}
                            {ele.base ? "B." + ele.base.join(", ") + " / " : ""}
                            {ele.drum ? "D." + ele.drum.join(", ") : ""}
                          </p>
                        </div>
                      </div>
                    </li>
                    // <div key={`setlist-${idx}`} className="mt-5">
                    //   {ele.number + ". " ?? ""}
                    //   {ele.songName + " / " ?? ""}
                    //   {ele.songArtist + " / " ?? ""}
                    //   {ele.vocal ? "보컬: " + ele.vocal.join(", ") + " / " : ""}
                    //   {ele.guitar ? "기타: " + ele.guitar.join(", ") + " / " : ""}
                    //   {ele.keyboard
                    //     ? "키보드: " + ele.keyboard.join(", ") + " / "
                    //     : ""}
                    //   {ele.base ? "베이스: " + ele.base.join(", ") + " / " : ""}
                    //   {ele.drum ? "드럼: " + ele.drum.join(", ") : ""}
                    // </div>
                  );
                })
              : null}
          </ul>
        </div>
      )}
      <CustomButton title={"뒤로가기"} onClick={onClickBackButton} />
    </div>
  );
};

export default SetList;
