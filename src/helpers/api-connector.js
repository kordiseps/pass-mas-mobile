import {
  ChangePasswordUrl,
  DataUrl,
  LoginUrl,
  RegisterUrl,
  RemoveAccountUrl,
} from "../constants/api-urls";
import { getUserMail, getUserPinCode } from "../contexts/db-context";

export async function makeRequest(uri, method, data) {
  //console.log("makeRequest bg", uri, method, JSON.stringify(data));
  return new Promise(async (resolve, _) => {
    try {
      var response = await fetch(uri, {
        method,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "User-Agent": "Mobile App",
        },
        body: JSON.stringify(data),
      });
      var responseJson = await response.json();
      resolve(responseJson);
    } catch (error) {
      console.log("makeRequest error :", error);
      resolve(error);
    }
  });
}

export async function makeRequestWithKey(uri, method, data, key) {
  return fetch(uri, {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "User-Agent": "Mobile App",
      "auth-key": key,
    },
    body: JSON.stringify(data),
  }).then((response) => {
    if (!response.ok) {
      return response
        .json()
        .catch(() => {
          throw new Error(response.text());
        })
        .then((resposeData) => {
          return resposeData;
        });
    }
    return response.json();
  });
}

export async function makeRequestWithKeyWithoutBody(uri, method, key) {
  return fetch(uri, {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "User-Agent": "Mobile App",
      "auth-key": key,
    },
  }).then((response) => {
    if (!response.ok) {
      return response
        .json()
        .catch(() => {
          throw new Error(response.text());
        })
        .then((resposeData) => {
          return resposeData;
        });
    }
    return response.json();
  });
}

export async function login(userMail, pinCode) {
  console.log("login bg");
  try {
    return await makeRequest(LoginUrl, "POST", {
      userMail: userMail,
      pinCode: pinCode,
    });
  } catch (err) {
    console.log(err);
    return {
      errors: err,
    };
  }
}

export async function postData(data, key) { 
  try {
    return await makeRequestWithKey(
      DataUrl,
      "POST",
      {
        app: data.app,
        username: data.username,
        password: data.password,
        color: data.color,
      },
      key
    );
  } catch (err) {
    console.log(err);
    return {
      errors: err,
    };
  }
}

export async function updateData(data, key) {
  try {
    return await makeRequestWithKey(
      `${DataUrl}/${data.apiId}`,
      "PATCH",
      {
        app: data.app,
        username: data.username,
        password: data.password,
        color: data.color,
      },
      key
    );
  } catch (err) {
    console.log(err);
    return {
      errors: err,
    };
  }
}

export async function deleteData(data, key) {
  try {
    return await makeRequestWithKey(
      `${DataUrl}/${data.apiId}`,
      "DELETE",
      {},
      key
    );
  } catch (err) {
    console.log(err);
    return {
      errors: err,
    };
  }
}

export async function submitRegisterForm(userMail, pinCode) {
  try {
    return await makeRequest(RegisterUrl, "POST", {
      userMail: userMail,
      pinCode: pinCode,
    });
  } catch (err) {
    console.log(err);
    return {
      errors: err,
    };
  }
}

export async function DropAccountFromServer() {
  let key = await getToken();
  try {
    var response = await makeRequestWithKey(RemoveAccountUrl, "POST", {}, key);
    return response.isSuccess;
  } catch (err) {
    console.log(err);
    return false;
  }
}

export async function UpdateLoginPinCodeFromServer(newPinCode) {
  let key = await getToken();
  try {
    var response = await makeRequestWithKey(
      ChangePasswordUrl,
      "POST",
      { pinCode: newPinCode },
      key
    );
    console.log(response);
    return response.isSuccess;
  } catch (err) {
    console.log("UpdateLoginPinCodeFromServer err", err);
    return false;
  }
}
export async function getToken() {
  const UserMail = await getUserMail();
  const UserPinCode = await getUserPinCode();
  const msg = await login(UserMail, UserPinCode);
  const key = await msg.token;
  return key;
} 
export async function downloadData(key) {
  return await makeRequestWithKeyWithoutBody(
    `${DataUrl}`,
    "GET",
    key
  );
}
