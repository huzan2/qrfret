import { child, get, push, ref, update } from "firebase/database";
import { db, dbref } from "../firebase";

const APIGuestBook = {
  getGuestBook: async () => {
    const res = await get(child(dbref, "guestBook"))
    try {
      return res.val()
    } catch (err) {
      throw err
    }
  },
  
  getCount: async () => {
    const res = await get(child(dbref, "guestBook/count"));
    try {
      return res.val();
    } catch (err) {
      throw err;
    }
  },
  
  setCount: async (value) => {
    const res = await update(ref(db, "guestBook"), {
      count: value,
    });
    return res
  },
  
  postGuestBook: async (nickname, comment) => {
    const count = await APIGuestBook.getCount();
    APIGuestBook.setCount(count + 1);
    const inputData = {
      nickname,
      comment,
      created_at: (new Date()).toISOString()
    }
    const res = await push(ref(db, "guestBook/guestBook"),inputData)
    return res
  },

  resetGuestBook: async () => {
    const res = await update(ref(db, "guestBook"), {
      count: 0,
      guestBook: ""
    })
    return res;
  }
}

export default APIGuestBook