import Tail from 'images/image-tail.svg';

const GuestBookItem = ({ index, nickname, comment, date }) => {
  const customDate = (arg) => {
    const date = new Date(arg);
    const dueDate = new Date("2023-11-18");
    const hour = (date.getHours()).toString().padStart(2, '0');
    const minute = date.getMinutes().toString().padStart(2, '0');
    return `${hour}:${minute}`
  }

  return (
    <li className="flex flex-col gap-x-6 py-5 w-full gap-2">
      <div className="text-white text-xs ml-7 mb-[-0.5rem]">
        {nickname}
      </div>
      <div className="relative z-[-1] w-full flex items-end pl-5">
        <img src={Tail} className="absolute left-[0.75rem] bottom-[-0.35rem] w-[1.5rem]" alt="tail" />
        <div className="p-2 bg-white w-[82%] h-auto text-sm rounded-2xl">
          {comment}
        </div>
        <div className="text-white text-xs mb-[-0.3rem]">
          {customDate(date)}
        </div>
      </div>
    </li>
  );
}

export default GuestBookItem