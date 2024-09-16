import React, {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  useContext,
} from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { GlobalsContext } from '@/context/Globals.context';
// import { db } from '../firebaseConfig'; // Make sure to import your Firestore config

// Define the types for the context
interface UserContextExports {
  handleUpdateUser: (
    userId: string,
    itemToUpdate: string,
    newData: any
  ) => void; // Function to handle updating user data
  isUpdating: string | null; // Loading state
  error: string | null; // Error state
  setIsUpdating: Dispatch<SetStateAction<string | null>>; // Dispatch function to set loading
  setError: Dispatch<SetStateAction<string | null>>; // Dispatch function to set error
}

// Create the context with the default values being undefined
export const UserContext = createContext<UserContextExports | undefined>(
  undefined
);

function UserContextProvider({ children }: ChildProp) {
  const [isUpdating, setIsUpdating] = useState<string | null>(null); // State for loading
  const [error, setError] = useState<string | null>(null); // State for error

  const globalsContext = useContext(GlobalsContext);

  // Ensure context is not undefined
  if (!globalsContext) {
    throw new Error('error: context error');
  }

  const { showModal, hideModal } = globalsContext;

  // Function to handle updating user data in Firestore
  const handleUpdateUser = async (
    userId: string,
    itemToUpdate: string,
    newData: any
  ) => {
    try {
      setIsUpdating(itemToUpdate); // Set loading to true when the update starts
      showModal('error', `updating ${itemToUpdate}...`, undefined);

      console.log(newData);

      // const userRef = doc(db, 'users', userId); // Reference to the user document in Firestore
      // await updateDoc(userRef, newData); // Update the user data with the new information

      console.log('User data updated successfully for user ID:', userId);
      setTimeout(() => {
        console.log('access request approval completed successfully');
        setIsUpdating(null); // Set loading to false when the update is complete
      }, 3000);
    } catch (error) {
      setError('An error occurred while updating user data.'); // Set error if something goes wrong
      setIsUpdating(null); // Set loading to false when an error occurs
      console.error('Error updating user:', error);
    }
  };

  // Values to be provided to the context consumers
  const values: UserContextExports = {
    handleUpdateUser, // The function to handle user update
    isUpdating, // Loading state
    error, // Error state
    setIsUpdating, // Setter for loading state
    setError, // Setter for error state
  };

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
}

export default UserContextProvider;
