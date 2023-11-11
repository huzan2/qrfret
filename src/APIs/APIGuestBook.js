import { child, get } from "firebase/database";
import { dbref } from "../firebase";

export const getGuestBook = async () => {
  const res = await get(child(dbref, "guestBook"))
  try {
    return res.val()
  } catch (err) {
    throw err
  }
}