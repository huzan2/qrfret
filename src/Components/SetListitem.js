const Session = ({ session, member }) => {
  const value = {
    vocal: "VOCAL",
    guitar: "GUITAR",
    keyboard: "KEYBOARD",
    base: "BASE",
    drum: "DRUM",
  };
  if(member === undefined || member === null || member.length === 0) return(<></>)
  return (
    <div className="flex items-end gap-1">
      <p className="text-gray-500 text-xs">{`${value[session]}. `}</p>
      <p>{member.join(", ")}</p>
    </div>
  );
};

const SetListItem = ({ item, index }) => {
  return (
    <li
      key={`setlist-${index}`}
      className="flex justify-between gap-x-6 py-5 w-full"
    >
      <div className="flex min-w-0 gap-x-5 w-full">
        <p className="font-semibold flex items-center">{item.number}</p>
        <div className="min-w-0 w-full flex-col gap-3">
          <p className="font-bold leading-6 text-gray-900 mb-2">
            {`${item.songName} - ${item.songArtist}`}
          </p>
          <p className="text-sm font-medium text-gray-800 w-full flex gap-x-2 gap-y-1 flex-wrap">
            <Session session={"vocal"} member={item.vocal} />
            <Session session={"guitar"} member={item.guitar} />
            <Session session={"keyboard"} member={item.keyboard} />
            <Session session={"base"} member={item.base} />
            <Session session={"drum"} member={item.drum} />
          </p>
        </div>
      </div>
    </li>
  );
};

export default SetListItem;
