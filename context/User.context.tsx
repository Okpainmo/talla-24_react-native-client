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

type ContextExports = {
  testing: () => void;
};

export const UserContext = createContext<ContextExports | undefined>(undefined);

function UserContextProvider({ children }: ChildProp) {
  const testing = () => {
    console.log('testing user context');
  };

  return (
    <UserContext.Provider value={{ testing }}>{children}</UserContext.Provider>
  );
}

export default UserContextProvider;
