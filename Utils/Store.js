import Cookies from 'js-cookie';
import { createContext, useReducer } from 'react';
export const Store = createContext();


const initialState = {
  userInfo: Cookies.get('userInfo')
  ? JSON.parse(Cookies.get('userInfo'))
  : null,
};

function reducer(state, action) {
  let num = 2
  let time=new Date(new Date().getTime() + num *60*60*1000);

  switch (action.type) {
    case 'USER_LOGIN':
      Cookies.set('userInfo', JSON.stringify(action.payload), {expires: time});
      return { ...state, userInfo: action.payload };
    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
