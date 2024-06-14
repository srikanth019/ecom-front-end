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
      const response = await fetch('http://localhost:8080/api/v1/auth/login', {
        method: 'POST',
        body: JSON.stringify(loginInfo),
        headers: { 'content-type': 'application/json' },
      });

      const data = await response.json();
      if (data.success) {
        resolve({ data: data.data });
      } else {
        reject(new Error('wrong credentials'));
      }

    } catch (error) {
      reject(new Error('Network error or invalid JSON'));
    }
  });
}


export function signOut () {
  return new Promise(async (resolve) => {
    // TODO: on server we will remove user session info
    resolve({ data: 'success' });
  });
}

