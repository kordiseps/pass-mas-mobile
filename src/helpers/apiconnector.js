import { DataUrl, LoginUrl, RegisterUrl } from "../constants/apiUrls";

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
      console.log(responseJson);
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
  console.log("postData bg");
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

export async function submitRegisterForm(userMail, pinCode) {
  try {
    // console.log("RegisterUrl", RegisterUrl);
    // console.log("RegisterUrl","https://pass-mas-api.herokuapp.com/users/register");
    return await makeRequest(
      RegisterUrl,
      "POST",
      {
        userMail: userMail,
        pinCode: pinCode,
      }
    );
  } catch (err) {
    console.log(err);
    return {
      errors: err,
    };
  }
}
