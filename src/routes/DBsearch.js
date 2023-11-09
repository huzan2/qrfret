import PageTitle from "Components/PageTitle";
import CustomButton from "Components/CustomButton";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const DBsearch = () => {
  const navigate = useNavigate();
  const onClickBackToDB = () => {
    navigate("/DB");
  };
  const { state } = useLocation();
  return (
    <div>
      <div className="flex min-h-full items-center flex-1 flex-col justify-center">
        <PageTitle title={"추첨번호 DB 열람"} />
        <div className="mt-4 w-full sm:mx-auto sm:max-w-sm">
          <CustomButton title={"돌아가기"} onClick={onClickBackToDB} />
          <ul className="divide-y divide-gray-600 mt-5">
            {state.map((ele, idx) => (
              <li key={ele.key} className="flex justify-between py-2">
                <div className="flex min-w-0 gap-x-4">
                  <div className="min-w-0 flex-auto">
                    <p className="text-base font-semibold leading-6 text-gray-900">
                      {ele.value.num}
                    </p>
                  </div>
                </div>
                <div className="sm:flex sm:flex-col sm:items-end">
                  <p className="text-base leading-6 text-gray-900">
                    {ele.value.phoneNumber}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DBsearch;
