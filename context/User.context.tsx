import React, {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  useContext,
} from 'react';
import { GlobalsContext } from '@/context/Globals.context';
import { db } from '../firebaseConfig';
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import { db } from '../firebaseConfig'; // Make sure to import your Firestore config

type UserSpecs = {
  id: string;
  userName: string;
  email: string;
  createdAt: string;
  accessRequestStatus: {
    status: 'Pending' | 'Approved' | 'Rejected';
    approvedBy: string | null; // ISO date format as string
  };
};

// Define the types for the context
interface UserContextExports {
  storeUserData: (userData: {
    userName: string;
    id: string;
    email: string;
  }) => void;
  getUserData: () => Promise<UserSpecs | null>;
  fetchUsers: () => any;
  handleUpdateUser: (
    userId: string,
    itemToUpdate: string,
    newData: any
  ) => void; // Function to handle updating user data
  handleCreateUser: (userData: UserSpecs) => void; // Function to handle updating user data
  isUpdating: string | null; // Loading state
  error: string | null; // Error state
  setIsUpdating: Dispatch<SetStateAction<string | null>>; // Dispatch function to set loading
  setError: Dispatch<SetStateAction<string | null>>; // Dispatch function to set error
  users: any;
}

// Create the context with the default values being undefined
export const UserContext = createContext<UserContextExports | undefined>(
  undefined
);

function UserContextProvider({ children }: ChildProp) {
  const [isUpdating, setIsUpdating] = useState<string | null>(null); // State for loading
  const [error, setError] = useState<string | null>(null); // State for error
  const [users, setUsers] = useState<any>(null); //

  const globalsContext = useContext(GlobalsContext);

  const auth = getAuth();
  const user = auth.currentUser;

  const usersCollection = collection(db, 'users');

  // Ensure context is not undefined
  if (!globalsContext) {
    throw new Error('error: context error');
  }

  const { showModal, hideModal } = globalsContext;

  const storeUserData = async (userData: {
    userName: string;
    id: string;
    email: string;
  }) => {
    try {
      const jsonValue = JSON.stringify(userData);
      await AsyncStorage.setItem('user', jsonValue);
    } catch (error: any) {
      // saving error
      console.log(error);

      if (error == typeof Error) {
        throw new Error(error.message);
      }

      throw new Error('async storage error');
    }
  };

  const getUserData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error: any) {
      // fetching error
      console.log(error);

      if (error == typeof Error) {
        throw new Error(error.message);
      }

      throw new Error('async storage error');
    }
  };

  const fetchUsers = async () => {
    if (user) {
      const querySnapshot = await getDocs(collection(db, 'users'));
      // querySnapshot.forEach((doc) => {
      //   // doc.data() is never undefined for query doc snapshots

      //   console.log(doc.data());
      //   // return doc.id, ' => ', doc.data();

      //   // setUsers(doc.id, ' => ', doc.data())
      // });

      setUsers(querySnapshot);

      hideModal();
    } else {
      console.log('No user logged in');
    }
  };

  // Function to handle creating user data in Firestore
  const handleCreateUser = async (userData: UserSpecs) => {
    try {
      await addDoc(usersCollection, userData);

      console.log('addDoc passed successfully');
    } catch (error) {
      showModal('dialog', undefined, {
        title: 'Auth Error!',
        message: 'An error occurred while creating user.',
        buttonText: 'Try again!',
      });
      setError('An error occurred while creating user in firestore DB'); // Set error if something goes wrong
      console.error('Error updating user:', error);
    }
  };

  const handleUpdateUser = async (
    userId: string,
    itemToUpdate: string,
    newData: { userName: string; email: string }
  ) => {
    try {
      setIsUpdating(itemToUpdate); // Set loading to true when the update starts
      showModal('caution', `updating ${itemToUpdate}...`, null);

      console.log(newData);

      const userDoc = doc(db, 'users', userId);

      if (itemToUpdate === 'userName') {
        await updateDoc(userDoc, { userName: newData.userName });
        // fetchTodos();
      }

      if (itemToUpdate === 'email') {
        await updateDoc(userDoc, { userName: newData.email });
        // fetchTodos();
      }

      showModal('success', `${itemToUpdate} updated successfully`, null);

      setTimeout(() => {
        hideModal();
      }, 2000);

      console.log(`${itemToUpdate} updated successfully`, userId);

      setTimeout(() => {
        setIsUpdating(null); // Set loading to false when the update is complete
      }, 3000);
    } catch (error) {
      showModal('error', `something went wrong, please try again`, null);

      setTimeout(() => {
        hideModal();
      }, 2000);

      setError(`An error occurred while updating ${itemToUpdate}`); // Set error if something goes wrong
      setIsUpdating(null); // Set loading to false when an error occurs
      console.error('Error updating user:', error);
    }
  };

  // Values to be provided to the context consumers
  const values: UserContextExports = {
    storeUserData,
    getUserData,
    fetchUsers,
    handleCreateUser, // The function to handle user creation in Firestore
    handleUpdateUser, // The function to handle user update
    isUpdating, // Loading state
    error, // Error state
    setIsUpdating, // Setter for loading state
    setError, // Setter for error state
    users,
  };

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
}

export default UserContextProvider;
