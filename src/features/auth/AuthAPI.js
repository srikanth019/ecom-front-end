export function createUser (userData) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/users', {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: { 'content-type': 'application/json' },
    });
    const data = await response.json();
    // TODO: on server it will only return some info of user (not password)
    resolve({ data });
  });
}

export function checkUser (loginInfo) {
  return new Promise(async (resolve, reject) => {
    try {
      const email = loginInfo.email;
      const password = loginInfo.password;
      const response = await fetch('http://localhost:8080/users?email=' + email);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      if (data.length) {
        if (password === data[0].password) {
          resolve({ data: data[0] });
        } else {
          reject(new Error('wrong credentials'));
        }
      } else {
        reject(new Error('user not found'));
      }
    } catch (error) {
      reject(new Error('Network error or invalid JSON'));
    }
  });
}
