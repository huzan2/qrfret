import FloatingButtonGoToGuestBook from "Components/FloatingButtonGoToGuestBook";
import SetListItem from "Components/SetListitem";
import { useEffect, useState } from "react";
import { setList } from 'setList';
import { navigationPath } from "util/navigationPath";

const SetListPage = () => {
  const [isLoading, setIsLoading] = useState(true);

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
    setIsLoading(false);
  }, []);

  return (
    <div>
      <FloatingButtonGoToGuestBook page={navigationPath.SET_LIST_PAGE}/>
      {isLoading ? null : (
        <div>
          <ul className="divide-y divide-gray-600 px-6">
            {setList["setList"].map((item, index) => {
                  return (
                    <SetListItem
                      key={`item-${index}`}
                      item={item}
                      index={index}
                    />
                  );
                })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SetListPage;
