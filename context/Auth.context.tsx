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

export const AuthContext = createContext({});

function AuthContextProvider({ children }: ChildProp) {
  const testing = () => {
    console.log('testing auth context');
  };

  return (
    <AuthContext.Provider value={{ testing }}>{children}</AuthContext.Provider>
  );
}

export default AuthContextProvider;
