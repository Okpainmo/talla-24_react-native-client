import React, { useEffect, useContext } from 'react';
import { Link, router } from 'expo-router';
import { getAuth } from 'firebase/auth';
import { View, ActivityIndicator } from 'react-native';
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
import { UserContext } from '@/context/User.context';
import { db } from '../../firebaseConfig';

const AccessVerifier = ({ children }: ChildProp) => {
  const userContext = useContext(UserContext);
  // const [showLogOutModal, setShowLogOutModal] = useState(false);

  // Ensure context is not undefined
  if (!userContext) {
    throw new Error('error: context error');
  }

  const { getUserDataFromDB } = userContext;

  const auth = getAuth();

  //   const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const checkAccess = async () => {
      const user = auth.currentUser;

      if (user && user.email) {
        const userData = await getUserDataFromDB(user.email);

        if (userData) {
        //   console.log(userData);

          if (userData.accessRequestStatus.status !== 'Approved') {
            router.navigate('/');
          } else {
            router.navigate('/home');
          }
        }
      }
    };

    checkAccess();
  }, []);

  return <>{children}</>;
};

export default AccessVerifier;
