import { useState } from "react";

const Session = ({ session, member }) => {
  const value = {
    vocal: "VOCAL",
    guitar: "GUITAR",
    keyboard: "KEYBOARD",
    bass: "BASS",
    drum: "DRUM",
  };
  if (member === undefined || member === null || member.length === 0)
    return <></>;
  return (
    <div className="flex items-end gap-1 text-BLUE_2">
      <p className="text-BLUE_3 text-sm">{`${value[session]}. `}</p>
      <p>{member.join(", ")}</p>
    </div>
  );
};

const SetListItem = ({ item, index }) => {
  const [isOpenLyric, setIsOpenLyric] = useState(false);

  const onClickItem = () => {
    if (item.songArtist.trim() === "자작곡") {
      setIsOpenLyric((prev) => !prev);
    }
  };

  return (
    <li
      key={`setlist-${index}`}
      className="flex justify-between gap-x-6 py-5 w-full"
    >
      <div className="flex min-w-0 gap-x-5 w-full">
        <div className="min-w-0 w-full flex-col gap-3">
          <p className="font-bold flex items-center text-lg justify-center">
            {item.number}
          </p>
          <span
            className="font-bold leading-6 mb-2 text-xl flex justify-center flex-wrap gap-1"
            onClick={onClickItem}
          >
            <div>{`${item.songName}`}</div>
            <div>-</div>
            <div>{`${item.songArtist}`}</div>
          </span>
          <div className="justify-center text-base font-medium text-gray-800 w-full flex gap-x-2 gap-y-1 flex-wrap">
            <Session session={"vocal"} member={item.vocal} />
            <Session session={"guitar"} member={item.guitar} />
            <Session session={"keyboard"} member={item.keyboard} />
            <Session session={"bass"} member={item.bass} />
            <Session session={"drum"} member={item.drum} />
          </div>
          {isOpenLyric && <Lyric song={item.songName} />}
        </div>
      </div>
    </li>
  );
};

const Lyric = ({ song }) => {
  if (song === "권예찬") {
    return (
      <div className="bg-red text-center flex-col gap-1 text-sm mt-2">
        <p>안녕하세요 쟤 이름을 소개할게요 쟤 이름은 권예찬</p>
        <p>한 달만에 알바 네 번을 짤리고 꼬라지가 좀 난 상태에요</p>
        <p>.</p>
        <p>여자친구 만들려고 미팅 나갔다가 퇴짜맞은 권예찬</p>
        <p>술자리에 안주 대신 이 얘길 들으면 그 날은 집에 못가죠</p>
        <p>.</p>
        <p className="font-bold">(권예찬)</p>
        <p>선배 말은 귓등으로 들어</p>
        <p className="font-bold">(권예찬)</p>
        <p>메트로놈 연습 갖다버려</p>
        <p className="font-bold">(권예찬)</p>
        <p>술에 꼴아 길바닥에 누워</p>
        <p className="font-bold">(권예찬)</p>
        <p>선배 말은 귓등으로 들어</p>
        <p className="font-bold">(권예찬)</p>
        <p>메트로놈 연습 갖다버려</p>
        <p className="font-bold">(권예찬)</p>
        <p>술에 꼴아 길바닥에 누워</p>
        <p className="font-bold">x3</p>
      </div>
    );
  } else {
    return (
      <div className="bg-red text-center flex-col gap-1 text-sm mt-2">
        가사 준비 중...
      </div>
    );
  }
};

export default SetListItem;
