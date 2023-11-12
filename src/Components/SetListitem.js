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
  return (
    <li
      className="flex justify-between gap-x-6 py-5 w-full"
    >
      <div className="flex min-w-0 gap-x-5 w-full">
        <div className="min-w-0 w-full flex-col gap-3">
          <p className="font-bold flex items-center text-lg justify-center">
            {item.number}
          </p>
          <span
            className="font-bold leading-6 mb-2 text-xl flex justify-center flex-wrap gap-1"
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
          {item.lyric !== undefined && <Lyric lyric={item.lyric} />}
        </div>
      </div>
    </li>
  );
};

const Lyric = ({ lyric }) => {
  const [isOpen, setIsOpen] = useState(false)
  const LYRIC_HEIGHT = (lyric.match(/\n/g).filter(item => item !== '').length) * 1.25;

  const lyricFormatter = (lyric) => {
    const lyricFormatted = []
    const tmp = lyric.split('{')
    for (const e in tmp) {
      let splited = tmp[e].split('}\n');
      if (splited.length < 2) splited = tmp[e].split('}')
      if (splited.length === 2) {
        lyricFormatted.push(
          <p key={`ly-${e}`} className="font-bold whitespace-pre-line">{splited[0]}</p>, splited[1]
        );
      } else {
        lyricFormatted.push(
          splited[0]
        )
      }
    }
    return lyricFormatted
  }

  const onClickOpen = () => {
    setIsOpen(true)
  }

  const onClickClose = () => {
    setIsOpen(false)
  }

  return (
    <div className="text-center text-sm mt-2 whitespace-pre-line">
      {isOpen ?
        <div style={{height: `${LYRIC_HEIGHT + 1.25}rem`}} className={`transition-all duration-200`}>
          {lyricFormatter(lyric)}
          <div onClick={onClickClose}>
            ▲
          </div>
        </div>
        :
        <div className={"h-3 transition-all duration-200"}>
          <div onClick={onClickOpen}>
            ▼
          </div>
        </div>
      }
    </div>
  );
};

export default SetListItem;