import { postData, login, makeRequestWithKey } from "./api-connector";
import { RemoveAccountUrl } from "../constants/api-urls";
import {
  getPasswords,
  getUserMail,
  getUserPinCode,
  insertApiIdPassword,
} from "../contexts/db-context";

export async function synchronize() {
  console.log("synchronize bg");
  const UserMail = await getUserMail();
  const UserPinCode = await getUserPinCode();
  let key = "";
  try {
    const msg = await login(UserMail, UserPinCode);
    console.log(msg);
    key = await msg.token;
  } catch (error) {
    console.log("login", err);
    return err;
  }

  const passwords = await getPasswords();

  for (let index = 0; index < passwords.length; index++) {
    const element = passwords[index];

    if (element.state === 0) {
      console.log("eklenecek ", element);
      const res = await postData(element, key);
      console.log("api post data sonucu", res);
      if (res.isSuccess === true) {
        insertApiIdPassword(element.id, res.message);
        //mark updated
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

export async function removeDataAndAccountFromDevice() {
  
}
export async function removeDataAndAccountFromServer() {
  const UserMail = await getUserMail();
  const UserPinCode = await getUserPinCode();
  let key = "";
  try {
    const msg = await login(UserMail, UserPinCode);
    key = await msg.token;
  } catch (error) {
    console.log("login", err);
    return err;
  }
  const result = await makeRequestWithKey(RemoveAccountUrl, "POST", {}, key);
  return result;
}
