import * as React from "react";

export const PostPageContext = React.createContext(<any>null);

export const authContext = React.createContext({
  authenticated: false,
  setAuthenticated: (auth: boolean) => {},
});

export const pageParam = React.createContext({
  page: 0,
  setPage: (page: number) => {},
});


export const chatContext = React.createContext({
  chatId: "",
  setChatId: (chatId: string) => {},
  socket: <null|WebSocket>null
});
