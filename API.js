import axios from "axios";

let id;
// if(localStorage?.getItem("user")){
//   id = JSON.parse(localStorage?.getItem("user")).id;
// }
let boardAPI = "http://localhost:3002/board";
let API = "http://localhost:3002";

export const getAllBoards = async () => {
  const token = JSON.parse(localStorage?.getItem("token"));
  let options = {
    method: "GET",
    url: `${API}/board`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    let response = await axios.request(options);
    return { status: true, data: response.data };
  } catch (error) {
    return { status: false, data: error.response.statusText };
  }
};

export const createList = async (boardId, name, userId) => {
  const token = JSON.parse(localStorage?.getItem("token"));
  let options = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${API}/lists`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: JSON.stringify({
      name: name,
      boardId: +boardId,
    }),
  };
  try {
    let response = await axios.request(options);
    return { status: true, data: response.data };
  } catch (error) {
    return { status: false, data: error.message };
  }
};

export const createBoard = async (formData) => {
  const token = JSON.parse(localStorage?.getItem("token"));
  try {
    const { data } = await axios.post(boardAPI, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return { status: true, data };
  } catch (error) {
    return { status: false, data: error.message };
  }
};

export const createCard = async (formData) => {
  const token = JSON.parse(localStorage?.getItem("token"));
  try {
    const { data } = await axios.post(`${API}/card`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return { status: true, data };
  } catch (error) {
    return { status: false, data: error.message };
  }
};

export const updateCard = async (id, formData) => {
  const token = JSON.parse(localStorage?.getItem("token"));
  try {
    const { data } = await axios.put(`${API}/card/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return { status: true, data };
  } catch (error) {
    return { status: false, data: error.message };
  }
};

//updateCard(32, {"listId" : 13}).then(res => console.log(res))

export const deleteCard = async (id) => {
  try {
    const { data } = await axios.delete(`${API}/card/${id}`);
    return { status: true, data };
  } catch (error) {
    return { status: false, data: error.message };
  }
};

export const getBoardById = async (id) => {
  let options = {
    method: "GET",
    url: `${boardAPI}/${id}`,
  };
  try {
    let response = await axios.request(options);
    return { status: true, data: response.data };
  } catch (error) {
    return { status: false, data: error.message };
  }
};

export const updateBoardById = async (id, formData) => {
  let options = {
    method: "GET",
    url: `${boardAPI}/${id}`,
    formData: formData,
  };
  try {
    let response = await axios.request(options);
    return { status: true, data: response.data };
  } catch (error) {
    return { status: false, data: error.message };
  }
};

export const deleteBoardById = async (id) => {
  let options = {
    method: "DELETE",
    url: `${boardAPI}/${id}`,
  };
  try {
    let response = await axios.request(options);
    return { status: true, data: response.data };
  } catch (error) {
    return { status: false, data: error.message };
  }
};

export const getLists = async (boardId) => {
  const token = JSON.parse(localStorage?.getItem("token"));
  let options = {
    method: "GET",
    url: `${API}/lists/board/${boardId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    let response = await axios.request(options);
    return { status: true, data: response.data };
  } catch (error) {
    return { status: false, data: error.message };
  }
};

export const getCards = async (listId) => {
  let options = {
    method: "GET",
    url: `${API}/card/list/${listId}`,
  };
  try {
    let response = await axios.request(options);
    return response.data.card;
  } catch (error) {
    return { status: false, data: error.message };
  }
};

export const listCards = async (boardId) => {
  let options = {
    method: "GET",
    url: `http://localhost:3002/board/cards/${boardId}`,
  };
  try {
    let response = await axios.request(options);
    return { status: true, data: response.data };
  } catch (error) {
    return { status: false, data: error.message };
  }
};

export const addCard = async (listId, card) => {
  let data = JSON.stringify({
    name: card,
    listId: +listId,
  });
  let options = {
    method: "post",
    maxBodyLength: Infinity,
    url: `http://localhost:3002/card`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };
  try {
    let response = await axios.request(options);
    return { status: true, data: response.data };
  } catch (error) {
    return { status: false, data: error.message };
  }
};

///////////////////////////////////////////////////////////////////////////////////////////////////

export const createUser = async (formData) => {
  const token = JSON.parse(localStorage?.getItem('token'))
  try {
    const { data } = await axios.post(`${API}/user`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`,
      },
    });
    return { status: true, data };
  } catch (error) {
    return { status: false, data: error.message };
  }
};

export const getUsers = async () => {
  let config = {
    method: "get",
    url: `${API}/user`,
  };
  try {
    let response = await axios.request(config);
    return { status: true, data: response.data };
  } catch (error) {
    return { status: false, data: error.message };
  }
};

export const updateUser = async (id, formData) => {
  try {
    const { data } = await axios.put(`${API}/user/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return { status: true, data };
  } catch (error) {
    return { status: false, data: error.message };
  }
};

export const deleteUser = async (id) => {
  let options = {
    method: "delete",
    url: `${API}/user/${id}`,
  };
  try {
    let response = await axios.request(options);
    return { status: true, data: response.data };
  } catch (error) {
    return { status: false, data: error.message };
  }
};

/* ROLE */

export const createRole = async (data) => {
  data = JSON.stringify(data);
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${API}/role`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };
  try {
    let response = await axios.request(config);
    return { status: true, data: response.data };
  } catch (error) {
    return { status: false, data: error.message };
  }
};

export const getRoles = async () => {
  let config = {
    method: "get",
    url: `${API}/role`,
  };
  try {
    let response = await axios.request(config);
    return { status: true, data: response.data };
  } catch (error) {
    return { status: false, data: error.message };
  }
};

export const editRoles = async (id, data) => {
  data = JSON.stringify(data);
  let config = {
    method: "put",
    maxBodyLength: Infinity,
    url: `${API}/role/${id}`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };
  try {
    let response = await axios.request(config);
    return { status: true, data: response.data };
  } catch (error) {
    return { status: false, data: error.message };
  }
};

export const deleteRole = async (id) => {
  let options = {
    method: "delete",
    url: `${API}/role/${id}`,
  };
  try {
    let response = await axios.request(options);
    return { status: true, data: response.data };
  } catch (error) {
    return { status: false, data: error.message };
  }
};

/* LOGIN */

export const loginUser = async (data) => {
  let options = {
    method: "post",
    url: `${API}/auth/login`,
    maxBodyLength: Infinity,
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify(data),
  };
  try {
    let response = await axios.request(options);
    return { status: true, data: response.data };
  } catch (error) {
    return { status: false, data: JSON.stringify(error) };
  }
};

export const UserForBoard = async (id) => {
  let options = {
    method: "get",
    url: `${API}/board/${id}`,
  };
  try {
    let response = await axios.request(options);
    return { status: true, data: response.data };
  } catch (error) {
    return { status: false, data: JSON.stringify(error) };
  }
};

export const UserForBoardUpdate = async (id, arr) => {
  let options = {
    method: "put",
    url: `${API}/board/${id}`,
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify({ userIds: arr }),
  };
  try {
    let response = await axios.request(options);
    console.log(response.data);
    return { status: true, data: response.data };
  } catch (error) {
    return { status: false, data: JSON.stringify(error) };
  }
};

export const BoardForUser = async (id) => {
  let options = {
    method: "get",
    url: `${API}/user/${id}`,
  };
  try {
    let response = await axios.request(options);
    return { status: true, data: response.data };
  } catch (error) {
    return { status: false, data: JSON.stringify(error) };
  }
};

export const BoardForUserUpdate = async (id, arr) => {
  let options = {
    method: "post",
    url: `${API}/user/${id}`,
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify({ projects: arr }),
  };
  console.log(options);
  try {
    let response = await axios.request(options);
    console.log(response.data);
    return { status: true, data: response.data };
  } catch (error) {
    return { status: false, data: JSON.stringify(error) };
  }
};
