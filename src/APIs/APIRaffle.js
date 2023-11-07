import { child, get, ref, set, update } from "firebase/database";
import { db, dbref } from "../firebase";

/*
DB 구조
count
  ㄴ num: 2 << 마지막 번호 저장공간
number
  ㄴ 01012345678 << uid
    ㄴ num: 1 << 추첨번호, auto increment
    ㄴ phoneNumber: "01012345678" << 전화번호
    ㄴ uuid: "01012345678"
  ㄴ 01012341234
    ㄴ num: 2
    ㄴ phoneNumber: "01012341234"
    ㄴ uuid: "01012341234"
*/

export const DEV_ResetRaffle = async () => {
  await set(ref(db, "count"), {
    num: 0,
  });
  await set(ref(db, "number"), {});
};

export const getCount = async () => {
  const res = await get(child(dbref, "count"));
  try {
    return res.val().num;
  } catch (err) {
    throw err;
  }
};

export const setCount = async (value) => {
  const res = await update(ref(db, "count"), {
    num: value,
  });
};

export const postPhoneNumber = async (phoneNumber, count) => {
  if (phoneNumber === undefined) return;
  console.log("POSTPHONENUMBER", phoneNumber, count);
  const uuid = phoneNumber;
  const num = count;
  set(ref(db, "/number/" + uuid), {
    phoneNumber,
    num,
    uuid,
  });
};

export const getIsExistPhoneNumber = async (phoneNumber) => {
  if (phoneNumber === undefined) return 0;
  const res = await get(child(dbref, "/number"));
  if (
    res &&
    res.val() !== null &&
    res.val()[phoneNumber] &&
    res.val()[phoneNumber] !== undefined
  ) {
    return res.val()[phoneNumber];
  }
  return 0;
};

export const getNumberList = async () => {
  const res = await get(child(dbref, "number"));
  try {
    return res.val();
  } catch (err) {
    throw err;
  }
};
