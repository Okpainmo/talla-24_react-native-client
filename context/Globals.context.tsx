import React, { createContext, useState, useEffect, useContext } from 'react';
import {
  doc,
  collection,
  addDoc,
  getDocs,
  updateDoc,
  setDoc,
  deleteDoc,
} from 'firebase/firestore';
// import { db } from '../firebaseConfig';

export const GlobalsContext = createContext({});

function GlobalsContextProvider({ children }: ChildProp) {
  const testing = () => {
    console.log('testing user context');
  };

  return (
    <GlobalsContext.Provider value={{ testing }}>
      {children}
    </GlobalsContext.Provider>
  );
}

export default GlobalsContextProvider;
