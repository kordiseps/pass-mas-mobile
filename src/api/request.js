
export async function makeRequest(uri, method, data) {
    console.log("makeRequest bg")
    return fetch(uri, {
      method,
      headers: {
        "Accept": "application/json",
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
        "Accept": "application/json",
        "Content-Type": "application/json",
        "User-Agent": "Mobile App",
        "auth-key": key
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
  