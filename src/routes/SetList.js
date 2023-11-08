import { getSetList } from "APIs/APISetList";
import CustomButton from "Components/CustomButton";
import PageTitle from "Components/PageTitle";
import SetListItem from "Components/SetListitem";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
          <ul className="divide-y divide-gray-100">
            {setList && setList.length > 0
              ? setList.map((item, index) => {
                  return (
                    <SetListItem item={item} index={index} />
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
