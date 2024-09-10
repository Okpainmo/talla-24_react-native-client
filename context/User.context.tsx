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

export const UserContext = createContext({});

function UserContextProvider({ children }: ChildProp) {
  const testing = () => {
    console.log('testing user context');
  };

  return (
    <UserContext.Provider value={{ testing }}>{children}</UserContext.Provider>
  );
}

export default UserContextProvider;
