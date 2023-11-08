import { getSetList } from "APIs/APISetList";
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
      {isLoading ? null : (
        <div>
          <ul className="divide-y divide-gray-600 px-6">
            {setList && setList.length > 0
              ? setList.map((item, index) => {
                  return (
                    <SetListItem
                      key={`item-${index}`}
                      item={item}
                      index={index}
                    />
                  );
                })
              : null}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SetList;
