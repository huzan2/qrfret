
const GuestBookItem = ({ index, nickname, comment, date }) => {
  const customDate = (arg) => {
    const date = new Date(arg);
    const dueDate = new Date("2023-11-18");
    const dateText = () => {
      const timeDiff = dueDate.getTime() - date.getTime()
      if(timeDiff > 0){
        return `공연 ${dueDate.getDate() - date.getDate()}일 전!`
      }
    }
    return(
      <div className="text-sm text-BLUE_2">
        {`${dateText()} ${(date.getHours()).toString().padStart(2,'0')}시 ${(date.getMinutes()).toString().padStart(2,'0')}분 ${(date.getSeconds()).toString().padStart(2,'0')}초`}
      </div>
    )
  }
  return (
    <li
      className="flex flex-col gap-x-6 py-5 w-full gap-2"
    >
      <div className="w-full flex justify-center font-bold text-BLUE_3">
        {nickname} 님
      </div>
      <div className="w-full flex justify-center">
        {comment}
      </div>
      <div className="w-full flex justify-center">
        {customDate(date)}
      </div>
    </li>
  )
}

export default GuestBookItem