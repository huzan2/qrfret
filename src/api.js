import { db } from "firebase";
import { child, get, ref, set, update } from "firebase/database";

const ifExist = (number) => {
  return new Promise((resolve, reject) => {
    const dbRef = ref(db);
    get(child(dbRef, `/number`)).then((snapshot) => {
      if (snapshot.exists()) {
        const DBjson = snapshot.toJSON();
        if (DBjson.hasOwnProperty(number)) {
          console.log(`${number} is exist on DB`);
        } else {
          console.log("not exist");
        }
      } else {
        console.log(`error searching number`);
      }
    });
  });
};

const getLastNumber = () => {
  const dbRef = ref(db);
  get(child(dbRef, `/count`)).then((snapshot) => {
    if (snapshot.exists()) {
      return snapshot.val().num + 1;
    } else {
      return -1;
    }
  });
};

const createData = (phoneNumber, num) => {
  set(ref(db, `/number/` + phoneNumber), {
    phoneNumber: phoneNumber,
    num: num,
  });
  update(ref(db, `/count`), {
    num: num,
  });
};

export { createData, getLastNumber, ifExist };

