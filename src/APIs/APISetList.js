import { child, get } from "firebase/database"
import { dbref } from "../firebase"

// response
// {
//   "setList" : [
//     {
//       "number" : "",
//       "songName" : "",
//       "songArtist" : "",
//       "vocal" : [
//         ""
//       ],
//       "guitar" : [
//         ""
//       ],
//       "base" : [
//         ""
//       ],
//       "drum" : [
//         ""
//       ],
//       "keyboard" : [
//         ""
//       ]
//     }, ...
//   ]
// }

export const getSetList = async () => {
  const res = await get(child(dbref, "setlist"))
  try {
    return res.val()
  } catch (err) {
    throw err
  }
}

export const resetSetList = async () => {

}