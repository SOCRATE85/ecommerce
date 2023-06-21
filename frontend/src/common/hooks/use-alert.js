import React, { createContext, useReducer, useContext } from 'react';
import { createPortal } from 'react-dom';
import Alert from '../components/Alert';

export const AlertContext = createContext();

const initialState = [];

export const ADD = 'ADD';
export const REMOVE = 'REMOVE';
export const REMOVE_ALL = 'REMOVE_ALL';

export const alertReducer = (state, action) => {
  switch (action.type) {
    case ADD:
      return [
        ...state,
        {
          id: +new Date(),
          content: action.payload.content,
          type: action.payload.type
        }
      ];
    case REMOVE:
      return state.filter(t => t.id !== action.payload.id);
    case REMOVE_ALL:
      return initialState;
    default:
      return state;
  }
};

export const AlertProvider = props => {
  const [message, alertDispatch] = useReducer(alertReducer, initialState);
  const clearAlert = () => {
    setTimeout(()=>{
      alertDispatch({ type: REMOVE_ALL})
    }, 2000);
  }
  const error = (errorText) => {
    alertDispatch({
      type: ADD,
      payload: {
        type: 'error',
        content: errorText
      } 
    });
    clearAlert();
  }
  const success = (successText) => {
    alertDispatch({
      type: "ADD",
      payload: {
        type: 'success',
        content: successText
      }
    });
    clearAlert();
  }
  const warning = (warningText) => {
    alertDispatch({
      type: "ADD",
      payload: {
        type: 'warning',
        content: warningText
      }
    });
    clearAlert();
  }
  const alertData = { message, alertDispatch, error, success, clearAlert, warning };
  return (
    <AlertContext.Provider value={alertData}>
      {props.children}
      {createPortal(<Alert messages={message} />, document.body)}
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  return useContext(AlertContext);
};
