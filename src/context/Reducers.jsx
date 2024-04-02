export const boardReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_BOARD_REQUEST":
      return { ...state, loading: true };

    case "FETCH_BOARD_SUCCESS":
      return { ...state, loading: false, board: action.payload, error: null };

    case "FETCH_BOARD_FAILURE":
      return { ...state, loading: false, error: action.payload };

    case "CREATE BOARD":
      return {
        ...state,
        board: [...state.board, action.payload],
      };

    case "DELETE BOARD":
      return {
        ...state,
        board: state.board.filter((item) => item.id !== action.payload),
      };

    case "UPDATE BOARD":
      return {
        ...state,
        board: state.board.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
      };

    default:
      return state;
  }
};

export const boardUsers = (state,action) => {
  switch (action.type) {
    case "FETCH_USERS_PROJECT_REQUEST":
      return {...state, loading: true};
    case "FETCH_USERS_PROJECT_SUCCESS":
      return { ...state, loading: false, board: action.payload, error: null };
    
  }
}

export const listReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_LIST_REQUEST":
      return { ...state, loading: true };

    case "FETCH_LIST_SUCCESS":
      return {
        ...state,
        loading: false,
        list: action.payload.reduce((acc, el) => {
          const cardObj =
            Array.isArray(el.card) && el.card.length > 0
              ? el.card.reduce(
                  (cardAcc, ele) => ({ ...cardAcc, [ele.id]: ele }),
                  {}
                )
              : {};
          return { ...acc, [el.id]: { ...el, card: cardObj } };
        }, {}),
        error: null,
      };

    case "FETCH_LIST_FAILURE":
      return { ...state, loading: false, error: action.payload };

    case "CREATE_LIST":
      return {
        ...state,
        list: {
          ...state.list,
          ...{ [action.payload.id]: { ...action.payload, card: {} } },
        },
      };

    case "CREATE_CARD":
      return {
        ...state,
        list: {
          ...state.list,
          [action.payload.listId]: {
            ...state.list[action.payload.listId],
            card: {
              ...(state.list[action.payload.listId]?.card ?? {}),
              [action.payload.id]: action.payload,
            },
          },
        },
      };

    case "UPDATE_CARD":
      const card = action.payload;
      console.log(card);
      const updatedList = { ...state.list };

      if (
        updatedList[card.listId] &&
        updatedList[card.listId].card &&
        updatedList[card.listId].card[card.id]
      ) {
        updatedList[card.listId].card[card.id] = {
          ...updatedList[card.listId].card[card.id],
          ...card,
        };
      }

      return {
        ...state,
        list: updatedList,
      };

    case "DELETE_CARD":
      const { listId, id } = action.payload;
      const updateListByDeletingCard = { ...state.list };
      if (
        updateListByDeletingCard[listId] &&
        updateListByDeletingCard[listId].card &&
        updateListByDeletingCard[listId].card[id]
      ) {
        const updatedCardList = { ...updateListByDeletingCard[listId].card };
        delete updatedCardList[id];
        updateListByDeletingCard[listId] = {
          ...updateListByDeletingCard[listId],
          card: updatedCardList,
        };
      }
      return {
        ...state,
        list: updateListByDeletingCard,
      };

    default:
      return state;
  }
};

export const roleReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_ROLE_REQUEST":
      return { ...state, loading: true };

    case "FETCH_ROLE_SUCCESS":
      return { ...state, loading: false, role: action.payload, error: null };

    case "FETCH_ROLE_FAILURE":
      return { ...state, loading: false, error: action.payload };

    case "CREATE_ROLE":
      return {
        ...state,
        role: [...state.role, { ...action.payload, users: [] }],
      };

    case "DELETE_ROLE":
      return {
        ...state,
        role: state.role.filter((item) => item.id !== action.payload),
      };

    case "UPDATE_ROLE":
      return {
        ...state,
        role: state.role.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
      };

    default:
      return state;
  }
};

export const userReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_USER_REQUEST":
      return { ...state, loading: true };

    case "FETCH_USER_SUCCESS":
      return { ...state, loading: false, user: action.payload, error: null };

    case "FETCH_USER_FAILURE":
      return { ...state, loading: false, error: action.payload };

    case "CREATE_USER":
      return {
        ...state,
        user: [...state.user, action.payload],
      };

    case "DELETE_USER":
      return {
        ...state,
        user: state.user.filter((item) => item.id !== action.payload),
      };

    case "UPDATE_USER":
      return {
        ...state,
        user: state.user.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
      };

    default:
      return state;
  }
};

export const userRoleReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_USER_ROLE_REQUEST":
      return { ...state, loading: true };

    case "FETCH_USER_ROLE_SUCCESS":
      return {
        ...state,
        loading: false,
        role: action.payload.reduce((acc, el) => {
          const userObj =
            Array.isArray(el.users) && el.users.length > 0
              ? el.users.reduce(
                  (usersAcc, ele) => ({ ...usersAcc, [ele.id]: ele }),
                  {}
                )
              : {};
          return { ...acc, [el.id]: { ...el, users: userObj } };
        }, {}),
        error: null,
      };

    case "FETCH_USER_ROLE_FAILURE":
      return { ...state, loading: false, error: action.payload };

    case "CREATE_ROLE":
      return {
        ...state,
        role: {
          ...state.role,
          ...{ [action.payload.id]: { ...action.payload, users: {} } },
        },
      };

    case "CREATE_USER":
      return {
        ...state,
        role: {
          ...state.role,
          [action.payload.roleId]: {
            ...state.role[action.payload.roleId],
            users: {
              ...(state.role[action.payload.roleId]?.users ?? {}),
              [action.payload.id]: action.payload,
            },
          },
        },
      };

    case "UPDATE_USER":
      const users = action.payload;
      const updatedRole = { ...state.role };

      if (
        updatedRole[users.roleId] &&
        updatedRole[users.roleId].users &&
        updatedRole[users.roleId].users[users.id]
      ) {
        updatedRole[users.roleId].users[users.id] = {
          ...updatedRole[users.roleId].users[users.id],
          ...users,
        };
      }

      return {
        ...state,
        role: updatedRole,
      };

    case "DELETE_USER":
      const { roleId, id } = action.payload;
      const updateRoleByDeletingUser = { ...state.role };
      if (
        updateRoleByDeletingUser[roleId] &&
        updateRoleByDeletingUser[roleId].users &&
        updateRoleByDeletingUser[roleId].users[id]
      ) {
        const updateUserList = { ...updateRoleByDeletingUser[roleId].users };
        delete updateUserList[id];
        updateRoleByDeletingUser[roleId] = {
          ...updateRoleByDeletingUser[roleId],
          users: updateUserList,
        };
      }
      return {
        ...state,
        role: updateRoleByDeletingUser,
      };

    default:
      return state;
  }
};

export const loginReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_USER":
      localStorage?.setItem("token", JSON.stringify(action.payload.token));
      localStorage?.setItem("user", JSON.stringify(action.payload.user))
      return { ...state, status: true, login: action.payload };

    case "LOGIN_ERROR":
      return { ...state, status: false, login: {}, error: action.payload };

    case "LOGOUT_USER":
      localStorage?.removeItem("token");
      localStorage?.removeItem("user");
      return { ...state, status: false, login: {}, error: null};
  }
};


export const dragReducer = (state,action) => {
  switch(action.payload) {
    case "DRAGGING_START":
      return {
        ...state, status: false, data: action.payload
      }
    case "DRAGGING_DONE":
      return {
        ...state, state: true
      }
  }
}









/*

// list: action.payload.reduce((acc, el) => ({ ...acc, [el.id]: el }), {}),


case "FETCH_LIST_SUCCESS":
  {
    1 : {
      df : err
      cards : {
        1 : {},
        2 : {}
      }
    }
  }
      let obj = {};
      for (let el of action.payload) {
        obj[el.id] = el;
        let cardObj = {};
        if (Array.isArray(el.card) && el?.card?.length > 0) {
          for (let ele of el.card) {
            cardObj[ele.id] = ele;
          }
        }
        obj[el.id] = { ...obj[el.id], card: cardObj };
      }
  }
  return { ...state, loading: false, list: obj, error: null };

 case "CREATE_LIST":
       let object = {};
       let data = action.payload;
       let id = data["id"];
       object[id] = data;
       object[id]['card'] = {}
       return { ...state, list: { ...state.list, ...object } };

 case "CREATE_CARD":
      let list = state.list;
      let listId = action.payload.listId;
      if (list[listId]?.card) {
        list[listId]["card"].push(action.payload);
      } else {
        list[listId].card = [];
        list[listId]["card"].push(action.payload);
      }


      return { ...state, list };


*/
