import * as React from 'react';

export const PostPageContext = React.createContext(<any>null);


export const authContext = React.createContext({
  authenticated: false,
  setAuthenticated: (auth: boolean) => {}
});

