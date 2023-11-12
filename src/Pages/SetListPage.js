import APISetList from 'APIs/APISetList';
import FloatingButtonGoToGuestBook from "Components/FloatingButtonGoToGuestBook";
import SetListItem from "Components/SetListitem";
import { useEffect, useState } from "react";
import { navigationPath } from "util/navigationPath";

const SetListPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [setList, setSetList] = useState([]);

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
    APISetList.getSetList().then((res) => {
      console.log(res);
      if (res.setList)
        setSetList(res.setList.sort((a, b) => a.number - b.number));
    });
    setIsLoading(false);
  }, []);
  return (
    <div>
      <FloatingButtonGoToGuestBook page={navigationPath.SET_LIST_PAGE}/>
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

export default SetListPage;
