import { makeRequestWithKey } from "./request";

export async function postData(data, key) {
    console.log( "postData bg")
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
  