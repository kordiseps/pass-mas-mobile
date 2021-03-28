import {
  postData,
  updateData,
  deleteData,
  getToken,
  downloadData,
} from "./api-connector";
import {
  deletePassword,
  getPasswordsToSync,
  insertApiIdPassword,
  markPasswordSynchronized,
  savePasswordForRestore,
} from "../contexts/db-context";

export async function synchronize() {
  let key = await getToken();
  const passwords = await getPasswordsToSync();
  for (let index = 0; index < passwords.length; index++) {
    const element = passwords[index];

    if (element.state === 0) {
      const res = await postData(element, key);
      console.log(res);
      if (res.isSuccess === true) {
        await insertApiIdPassword(element.id, res.message);
        await markPasswordSynchronized(element.id);
      } else {
        console.log("apiye data gönderilemedi");
      }
    } else if (element.state === 1) {
      const res = await updateData(element, key);
      if (res.isSuccess === true) {
        await markPasswordSynchronized(element.id);
        console.log("güncellendi ", element);
      } else {
        console.log("apiye data gönderilemedi");
      }
    } else if (element.state === 2) {
      const res = await deleteData(element, key);
      if (res.isSuccess === true) {
        await deletePassword(element.id);
        console.log("silindi ", element);
      } else {
        console.log("apiye istek gönderilemedi");
      }
    } else if (element.state === 3) {
      console.log("güncel ", element);
    }
  }
}

export async function downloadDataAndSave(key) {
  try {
    var datasFromServer = await downloadData(key);
    console.log(datasFromServer)
    datasFromServer.data.forEach(async (item) => {
      await savePasswordForRestore(item.app, item.username, item.password, item.color,item._id);
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
