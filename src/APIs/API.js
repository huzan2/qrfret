import { child, get, ref, set, update } from "firebase/database";
import { db, dbref } from "../firebase";

/*
DB 구조
count
  ㄴ last
    ㄴ num: 2 << 마지막 번호 저장공간
    ㄴ uuid: "last"
number
  ㄴ 01012345678 << uid
    ㄴ num: 1 << 추첨번호
    ㄴ phoneNumber: "01012345678" << 전화번호
    ㄴ uuid: "01012345678"
  ㄴ 01012341234
    ㄴ num: 2
    ㄴ phoneNumber: "01012341234"
    ㄴ uuid: "01012341234"
*/

export const DEV_initDB = async() => {
  await set(ref(db, 'count'), {
    num: 0
  })
  await set(ref(db, 'number'), {

  })
}

export const getCount = async () => {
  const res = await get(child(dbref, "count"))
  try {
    return res.val().num
  } catch (err) {
    throw err
  }
}

export const setCount = async (value) => {
  const res = await update(ref(db, "count"), {
    num: value
  })
}

export const postPhoneNumber = async () => {

}

export const getIsExistPhoneNumber = async () => {
  return false
}