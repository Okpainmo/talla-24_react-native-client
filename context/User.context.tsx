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
  userDocumentId?: string;
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
  getUserDocumentId: () => Promise<void>;
  storeUserDocumentId: (value: string) => Promise<void>;
  fetchUser: () => Promise<void>;
  firestoreUser: any | null;
  setFirestoreUser: Dispatch<SetStateAction<any | null>>;
  firestoreUserDocumentId: string | null;
  setFirestoreUserDocumentId: Dispatch<SetStateAction<string | null>>;
}

// Create the context with the default values being undefined
export const UserContext = createContext<UserContextExports | undefined>(
  undefined
);

function UserContextProvider({ children }: ChildProp) {
  const [isUpdating, setIsUpdating] = useState<string | null>(null); // State for loading
  const [error, setError] = useState<string | null>(null); // State for error
  const [users, setUsers] = useState<any>(null); //
  const [firestoreUser, setFirestoreUser] = useState<any | null>(null);
  const [firestoreUserDocumentId, setFirestoreUserDocumentId] = useState<
    string | null
  >(null);

  const globalsContext = useContext(GlobalsContext);

  const auth = getAuth();
  const user = auth.currentUser;
  console.log('user', user);

  const usersCollection = collection(db, 'users');

  // Ensure context is not undefined
  if (!globalsContext) {
    throw new Error('error: context error');
  }

  const { showModal, hideModal } = globalsContext;

  // to local storage
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

  // from local storage
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
  // to local storage
  const storeUserDocumentId = async (value: string) => {
    try {
      await AsyncStorage.setItem('userDocumentId', value);
    } catch (error: any) {
      if (error == typeof Error) {
        throw new Error(error.message);
      }
      console.log(error);
      throw new Error('async storage error');
    }
  };

  // also from local storage - not really necessary as the value is being set inside handleCreateUser
  const getUserDocumentId = async () => {
    try {
      const value = await AsyncStorage.getItem('userDocumentId');
      if (value !== null) {
        // value previously stored

        setFirestoreUserDocumentId(value);
        console.log(value);
        // return value;
      }
    } catch (error: any) {
      if (error == typeof Error) {
        throw new Error(error.message);
      }
      console.log(error);
      throw new Error('async storage error');
    }
  };

  async function fetchUser() {
    try {
      const user = auth.currentUser;
      if (!user || !user.email) {
        console.log('No authenticated user found');
        return;
      }

      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('email', '==', user.email));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.log('No user found in Firestore');
        return;
      }

      const userDoc = querySnapshot.docs[0];
      const userData = userDoc.data();

      console.log(userData);

      if (userData) {
        storeUserData({
          userName: userData.fullName,
          id: userData.uid,
          email: userData?.email,
        });

        setFirestoreUser(userData);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }

  const fetchUsers = async () => {
    try {
      setIsUpdating('fetchUsers');
      const querySnapshot = await getDocs(usersCollection);

      const usersList = querySnapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<UserSpecs, 'id'>),
        }))
        .sort((a, b) => {
          return Number(b.createdAt) - Number(a.createdAt);
        });
      setUsers(usersList);

      // setIsUpdating(null);
      hideModal();
      return usersList;
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('An error occurred while fetching users');
      // setIsUpdating(null);
      showModal('error', 'Failed to fetch users. Please try again.', null);
      return null;
    }
  };

  // Function to handle creating user data in Firestore
  const handleCreateUser = async (userData: UserSpecs) => {
    try {
      const docRef = await addDoc(usersCollection, userData);
      const newUser: UserSpecs = { userDocumentId: docRef.id, ...userData };

      console.log('addDoc passed successfully');

      if (newUser && newUser.userDocumentId) {
        storeUserDocumentId(newUser.userDocumentId);
        // setUserDocumentId(newUser.userDocumentId);
      }
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

      await fetchUser();

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
    getUserDocumentId,
    storeUserDocumentId,
    fetchUser,
    firestoreUser,
    setFirestoreUser,
    firestoreUserDocumentId,
    setFirestoreUserDocumentId,
  };

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
}

export default UserContextProvider;
