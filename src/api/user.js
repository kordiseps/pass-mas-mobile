import { makeRequest } from "./request";

export async function login(userMail,pinCode) {
    console.log("login bg")
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