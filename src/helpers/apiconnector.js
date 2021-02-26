export async function makeRequest(uri, method, data) {
  console.log("makeRequest bg");
  return fetch(uri, {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "User-Agent": "Mobile App",
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
    return await makeRequest(
      "https://pass-mas-api.herokuapp.com/users/login",
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

export async function postData(data, key) {
  console.log("postData bg");
  try {
    return await makeRequestWithKey(
      "https://pass-mas-api.herokuapp.com/datas",
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
      `https://pass-mas-api.herokuapp.com/datas/${data.apiId}`,
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
