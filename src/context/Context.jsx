import { createContext, useReducer, useState } from "react";
import {
  boardReducer,
  listReducer,
  userReducer,
  roleReducer,
  userRoleReducer,
  loginReducer,
  dragReducer
} from "./Reducers";

export const Trello = createContext();

const Context = ({ children }) => {
  const [boardState, boardDispatch] = useReducer(boardReducer, {
    loading: false,
    board: [],
    error: null
  });

  const [listState, listDispatch] = useReducer(listReducer, {
    loading: false,
    list: {},
    error: null
  });

  const [userState, userDispatch] = useReducer(userReducer, {
    loading: false,
    user: [],
    error: null
  });

  const [roleState, roleDispatch] = useReducer(roleReducer, {
    loading: false,
    role: [],
    error: null
  });

  const [roleuserState, roleuserDispatch] = useReducer(userRoleReducer, {
    loading: false,
    role: {},
    error: null
  });

  const [login, loginDispatch] = useReducer(loginReducer, {
    status: false,
    login : {},
    error : null
  })


  const [draged, dragDispatch] = useReducer(dragReducer, {
    status: false,
    data: null
  });

  return (
    <Trello.Provider
      value={{
        boardState,
        boardDispatch,
        listState,
        listDispatch,
        userState,
        userDispatch,
        roleState,
        roleDispatch,
        roleuserState,
        roleuserDispatch,
        login, 
        loginDispatch,
        draged,
        dragDispatch
      }}
    >
      {children}
    </Trello.Provider>
  );
};

export default Context;
