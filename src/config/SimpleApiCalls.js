import axios from 'axios';

export const getResource = (URL, TOKEN, HEADERS) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${URL}`, {
        headers: {
          Authorization: TOKEN,
          'Content-Type': 'application/json',
          Accept: 'application/json',
          ...HEADERS,
        },
      })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const createResource = (URL, DATA, TOKEN, HEADERS) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${URL}`, DATA, {
        headers: {
          Authorization: TOKEN,
          'Content-Type': 'application/json',
          Accept: 'application/json',
          ...HEADERS,
        },
      })
      .then((response) => {
        console.log(response);
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const updateResource = (URL, ID, DATA, TOKEN, HEADERS) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`${URL}/${ID}`, DATA, {
        headers: {
          Authorization: TOKEN,
          'Content-Type': 'application/json',
          Accept: 'application/json',
          ...HEADERS,
        },
      })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const deleteResource = (URL, ID, TOKEN, HEADERS) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${URL}/${ID}`, {
        headers: {
          Authorization: TOKEN,
          'Content-Type': 'application/json',
          Accept: 'application/json',
          ...HEADERS,
        },
      })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getResourceById = (URL, ID, TOKEN, HEADERS) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${URL}/${ID}`, {
        headers: {
          Authorization: TOKEN,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        ...HEADERS,
      })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
