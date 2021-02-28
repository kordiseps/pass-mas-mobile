import { postData, login } from "./apiconnector";
import {
  getPasswords,
  getSetting,
  insertApiIdPassword,
} from "../contexts/dbContext";
import { GetUserMail, GetUserPinCode } from "../constants/sqlScripts";

export async function synchronize() {
  console.log("synchronize bg");
  const UserMail = await getUserMail();
  const UserPinCode = await getUserPinCode();

  const key = await login(UserMail, UserPinCode)
    .then((msg) => msg.token)
    .catch((err) => {
      console.log("login", err);
      return err;
    });

  const passwords = await getPasswords();

  for (let index = 0; index < passwords.length; index++) {
    const element = passwords[index];

    if (element.state === 0) {
      console.log("eklenecek ", element);
      const res = await postData(element, key);
      console.log("api post data sonucu",res)
      if (res.isSuccess === true) {
        insertApiIdPassword(element.id, res.message);
      } else {
        console.log("apiye data gönderilemedi");
      }
      //console.log(res);
    } else if (element.state === 1) {
      console.log("güncellenecek ", element);
    } else if (element.state === 2) {
      console.log("silinecek ", element);
    } else if (element.state === 3) {
      console.log("güncel ", element);
    }
  }
}

function getUserMail() {
  return getSetting(GetUserMail);
}

function getUserPinCode() {
  return getSetting(GetUserPinCode);
}
