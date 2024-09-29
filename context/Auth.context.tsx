import React, {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  useContext,
} from 'react';
import { Link, router } from 'expo-router';
import { GlobalsContext } from './Globals.context';
// import { MailContext } from './Mail.context';
import { UserContext, UserSpecs } from './User.context';
import { db } from '../firebaseConfig';

import { auth } from '../firebaseConfig';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
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

export const AuthContext = createContext<AuthContextExports | undefined>(
  undefined
);
interface AuthContextExports {
  signUpForm: {
    fullName: string;
    email: string;
    password: string;
    confirmedPassword: string;
  };

  setSignUpForm: Dispatch<
    SetStateAction<{
      fullName: string;
      email: string;
      password: string;
      confirmedPassword: string;
    }>
  >;
  loginForm: {
    email: string;
    password: string;
  };
  setLoginForm: Dispatch<
    SetStateAction<{
      email: string;
      password: string;
    }>
  >;
  handleLogin: (email: string, password: string, name: string) => void;
  handleLogout: () => void;
  handleSignUp: (
    fullName: string,
    email: string,
    password: string,
    confirmedPassword: string
  ) => void;
  handleResetPassword: (email: string) => void;
  handleApproveAccessRequest: (userData: UserSpecs, process: "approving access" | "revoking access" | "declining access" | "revoking admin privilege" | "approving admin privilege") => void;
  handleDeclineAccessRequest: (userData: UserSpecs, process: "approving access" | "revoking access" | "declining access" | "revoking admin privilege" | "approving admin privilege") => void;
  handleRevokeAccessRequest: (userData: UserSpecs, process: "approving access" | "revoking access" | "declining access" | "revoking admin privilege" | "approving admin privilege") => void;
  handleMakeAdmin: (userData: UserSpecs, process: "approving access" | "revoking access" | "declining access" | "revoking admin privilege" | "approving admin privilege") => void;
  handleRemoveAdmin: (userData: UserSpecs, process: "approving access" | "revoking access" | "declining access" | "revoking admin privilege" | "approving admin privilege") => void;
  loading: boolean;
  // isDeclining: string | null;
  isProcessing: {process: string, userDocumentId: string} | null;
  error: string | null;
  setError: Dispatch<SetStateAction<string | null>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setIsProcessing: Dispatch<SetStateAction<{process: string, userDocumentId: string} | null>>;
}

function AuthContextProvider({ children }: ChildProp) {
  const userContext = useContext(UserContext);
  const globalsContext = useContext(GlobalsContext);
  // const mailContext = useContext(MailContext);

  // Ensure context is not undefined
  if (!globalsContext) {
    throw new Error('error: globals context error');
  }

  if (!userContext) {
    throw new Error('error: user context error');
  }

  // if(!mailContext) {
  //   throw new Error('error: mail context error');
  // }

  const [signUpForm, setSignUpForm] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmedPassword: '',
  });

  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });

  // Now it's safe to access values after the type check
  const { showModal, hideModal } = globalsContext;
  const {
    storeUserData,
    getUserData,
    getUserDataFromDB,
    handleCreateUser,
    fetchUsers,
  } = userContext;
  // const {
  //   sendApprovalEmail,
  //   sendRejectionEmail,
  //   sendRevocationEmail,
  // } = mailContext;
  // const [isDeclining, setIsProcessing] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<{process: string, userDocumentId: string} | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Extended special characters regex
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]{8,}$/;

  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const handleSignUp = async (
    fullName: string,
    email: string,
    password: string,
    confirmedPassword: string
  ) => {
    try {
      if (
        fullName == '' ||
        email == '' ||
        password == '' ||
        confirmedPassword == ''
      ) {
        showModal('dialog', undefined, {
          title: 'Error!',
          message: 'Please fill all form fields.',
          buttonText: 'Got it, thanks!',
        });

        return;
      }

      // Validate email using regex
      if (!emailRegex.test(email)) {
        showModal('dialog', undefined, {
          title: 'Error!',
          message: 'Please provide a valid email address.',
          buttonText: 'Got it, thanks!',
        });

        return;
      }

      if (password !== confirmedPassword) {
        showModal('dialog', undefined, {
          title: 'Error!',
          message: `Password and Repeat Password must match.`,
          buttonText: 'Got it, thanks!',
        });

        return;
      }

      // Validate password using regex
      if (!passwordRegex.test(password)) {
        showModal('dialog', undefined, {
          title: 'Error!',
          message: `Password must meet the following conditions:\n
\n1. Be at least 8 characters long.\n
2. Contain one uppercase letter.\n
3. Contain one lowercase letter.\n
4. Contain one number.\n
5. Contain one special character.`,
          buttonText: 'Got it, thanks!',
        });

        return;
      }

      setLoading(true);

      // const auth = getAuth();

      await createUserWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          // Signed up
          const user = userCredential.user;

          // console.log(user);

          const currentTimeInMilliseconds = Date.now();

          if (user && user.email) {
            /* see the handleCreateUser function to see where/how the userDocumentID was
            stored with AsyncStorage */

            handleCreateUser({
              userName: fullName,
              email: user.email,
              id: user.uid,
              accessRequestStatus: {
                status: 'Pending',
                approvedBy: '',
                approvedAt: '',
                declinedBy: '',
                declinedAt: '',
                revokedAt: '',
                revokedBy: '',
                madeAdminBy: '',
                madeAdminAt: '',
                adminRevokedBy: '',
                adminRevokedAt: '',
              },
              createdAt: `${currentTimeInMilliseconds}`,
              isAdmin: false,
              userDocumentId: '',
              profileImage: '',
            });

            storeUserData({
              userName: fullName,
              id: user.uid,
              email: user?.email,
            });
            // console.log('Sign-up completed successfully');

            // setLoading(false);
          }
        }
      );

      const user = auth.currentUser;

      if (user && user.email) {
        // console.log('my user', user);
        const userData = await getUserDataFromDB(user.email);

        if (userData) {
          // console.log("user data", userData);

          if (userData.accessRequestStatus.status !== 'Approved') {
            setLoading(false);

            // console.log("access not granted")
            showModal('dialog', undefined, {
              title: 'Access Is Restricted!',
              message:
                "Your sign-up was successful, but access to the app is currently restricted. You will be notified via email if your request is approved or rejected. Remember to check your spam folder if you don't get a response quickly enough.",
              buttonText: 'Got it, thanks!',
            });
          } else {
            setLoading(false);

            router.navigate('/home');
          }
        }
      }

      setLoading(false);

      setSignUpForm({
        fullName: '',
        email: '',
        password: '',
        confirmedPassword: '',
      });

      return;

      // setLoading(false);

      // Simulate login process
      // setTimeout(() => {
      // console.log('signUp process completed successfully');

      // }, 3000);
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        showModal('dialog', undefined, {
          title: 'Auth Error!',
          message: 'An account already exists with this email address.',
          buttonText: 'Got it, thanks!',
        });

        setLoading(false);
      }

      setLoading(false);

      setSignUpForm({
        fullName: '',
        email: '',
        password: '',
        confirmedPassword: '',
      });

      // console.error('error:', error);
    }
  };

  const handleLogin = async (
    email: string,
    password: string,
    fullName: string
  ) => {
    try {
      if (email == '' && password == '') {
        showModal('dialog', undefined, {
          title: 'Error!',
          message: 'Please fill all form fields.',
          buttonText: 'Got it, thanks!',
        });

        return;
      }

      // Validate email using regex
      if (!emailRegex.test(email)) {
        showModal('dialog', undefined, {
          title: 'Error!',
          message: 'Please provide a valid email address.',
          buttonText: 'Got it, thanks!',
        });

        return;
      }

      // Validate password using regex
      if (!passwordRegex.test(password)) {
        showModal('dialog', undefined, {
          title: 'Invalid Password!',
          message: `Your correct 8 digit password meets the following conditions:\n
1. Contains one uppercase letter.\n
2. Contains one lowercase letter.\n
3. Contains one number.\n
4. Contains one special character.`,
          buttonText: 'Got it, thanks!',
        });

        return;
      }

      setLoading(true);

      await signInWithEmailAndPassword(auth, email, password)

      const user = auth.currentUser;

      if (user && user.email) {
        const userData = await getUserDataFromDB(user.email);

        if (userData) {
          // console.log('user data:', userData);
          // console.log(userData.userName);

          storeUserData({
            userName: userData.userName,
            id: userData.id,
            email: userData.email,
          });

          if (userData.accessRequestStatus.status !== 'Approved') {
            // console.log("access not granted")
            showModal('dialog', undefined, {
              title: 'Access Not Granted!',
              message:
                'You will be able to log into the app when your access request is approved. Kindly check your email to see if your initial access request was declined, so you can re-apply.',
              buttonText: 'Got it, thanks!',
            });

            setLoading(false);

            return;
            // router.navigate('/');
          } else {
            router.navigate('/home');
          }
        }
      }

      setLoading(false);

      setLoginForm({
        email: '',
        password: '',
      });

      console.log('Log-in completed successfully');

      return;
    } catch (error: any) {
      // const errorCode = error.code;
      // const errorMessage = error.message;

      if (error.code === 'auth/too-many-requests') {
        showModal('dialog', undefined, {
          title: 'Auth Error!',
          message:
            'Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.',
          buttonText: 'Try again!',
        });

        setLoading(false);

        return;
      }

      if (error.code === 'auth/invalid-credential') {
        showModal('dialog', undefined, {
          title: 'Auth Error!',
          message: 'Invalid credentials provided',
          buttonText: 'Try again!',
        });

        setLoading(false);

        return;
      }

      showModal('dialog', undefined, {
        title: 'Auth Error!',
        message: error.message,
        buttonText: 'Try again!',
      });

      // console.error('errorCode:', error.code);
      // console.error('errorMessage:', error.message);

      // ..
      setLoading(false);

      setLoginForm({
        email: '',
        password: '',
      });
    }
  };

  const handleLogout = async () => {
    try {
      setLoading(true);

      await auth.signOut();

      setLoading(false);
      // router.push('/log-in');

      console.log('Log-out completed successfully');

      return;
    } catch (error: any) {
      showModal('dialog', undefined, {
        title: 'Error!',
        message: 'An error occurred while logging out.',
        buttonText: 'Got it, thanks!',
      });
      setLoading(false);

      console.error('errorCode:', error.code);
      console.error('errorMessage:', error.message);

      return;
    }
  };

  const handleResetPassword = (email: string) => {
    try {
      // Validate email using regex
      if (!emailRegex.test(email)) {
        showModal('dialog', undefined, {
          title: 'Error!',
          message: 'Please provide a valid email address.',
          buttonText: 'Got it, thanks!',
        });

        return;
      }

      setLoading(true);
      console.log(
        `Attempting to reset password for user with email: '${email}'.`
      );

      // Simulate login process
      setTimeout(() => {
        console.log('password reset process completed');
        setLoading(false);
      }, 3000);
    } catch (error) {
      setError('An error occurred while attempting to reset user password.');
      setLoading(false);
      console.error('error:', error);
    }
  };

  const handleApproveAccessRequest = async (
    userData: UserSpecs,
    process: string
  ) => {
    try {
      if (userData && userData.userDocumentId) {
        setIsProcessing({process: process, userDocumentId: userData.userDocumentId});
        // console.log(
        //   `Attempting to approve access request for user with email: '${userData.email}'.`
        // );
  
        showModal('loading', `approving access for ${userData.email}...`, null);
  
        // Retrieve the current user's name from local storage
        const localStorageUser = await getUserData();
  
        if (!localStorageUser) {
          throw new Error('user not found in local storage');
        }
  
        const currentUserName = localStorageUser.userName;
  
        // Reference to the Firestore document
        const userDocRef = doc(db, 'users', userData.userDocumentId);

        // console.log('userDocRef inside handleApproveAccessRequest', userDocRef);
  
        // Update the Firestore document
        await updateDoc(userDocRef, {
          accessRequestStatus: {
           ...userData.accessRequestStatus,
            approvedBy: currentUserName,
            approvedAt: Date.now(),
            status: 'Approved',
          },
        });

        // await sendApprovalEmail(userData.email, userData.userName);
        setIsProcessing(null);
  
        showModal('success', `access request approved successfully`, null);
        fetchUsers();
  
  
        setTimeout(() => {
          // console.log(
          //   'access request approval completed successfully: waiting for time-out'
          // );
  
          hideModal();
        }, 2000);
       }
    } catch (error) {
      setError(
        'An error occurred while attempting to approve user access request.'
      );
      console.error('errors:', error);
      setIsProcessing(null);

      hideModal();
    }
  };

  const handleRevokeAccessRequest = async (
    userData: UserSpecs,
    process: string
  ) => {
    try {
      if (userData && userData.userDocumentId) {
        setIsProcessing({ process: process, userDocumentId: userData.userDocumentId });
        // console.log(
        //   `Attempting to revoke access request for user with email: '${userData.email}'.`
        // );

        showModal('loading', `revoking access for ${userData.email}...`, null);

        // Retrieve the current user's name from local storage
        const localStorageUser = await getUserData();

        if (!localStorageUser) {
          throw new Error('user not found in local storage');
        }

        const currentUserName = localStorageUser.userName;

        // Reference to the Firestore document
        const userDocRef = doc(db, 'users', userData.userDocumentId);

        // console.log('userDocRef', userDocRef);

        // Update the Firestore document
        await updateDoc(userDocRef, {
          isAdmin: false,
          accessRequestStatus: {
            ...userData.accessRequestStatus,
            revokedBy: currentUserName,
            revokedAt: Date.now(),
            status: 'Rejected',
          },
        });

        setIsProcessing(null);

        showModal('success', `access request revoked successfully`, null);

        setTimeout(() => {
          // console.log(
          //   'access request revoked successfully: waiting for time-out'
          // );

          fetchUsers();
          hideModal();
        }, 2000);
      }
    } catch (error) {
      setError(
        'An error occurred while attempting to revoke user access request.'
      );
      console.error('errors:', error);
      setIsProcessing(null);

      hideModal();
    }
  };

  const handleDeclineAccessRequest = async (
    userData: UserSpecs,
    process: string
  ) => {
    try {
      if (userData && userData.userDocumentId) {
        setIsProcessing({process: process, userDocumentId: userData.userDocumentId});
      // console.log(
      //   `Attempting to decline access request for user with email: '${userData.email}'.`
      // );

      showModal('loading', `declining access for ${userData.email}...`, null);

      // Retrieve the current user's name from local storage
      const localStorageUser = await getUserData();

      if (!localStorageUser) {
        throw new Error('user not found in local storage');
      }

      const currentUserName = localStorageUser.userName;

      // Reference to the Firestore document
      const userDocRef = doc(db, 'users', userData.userDocumentId);
      // console.log('userDocRef inside handleDeclineAccessRequest', userDocRef);

      // Update the Firestore document
        await updateDoc(userDocRef, {
        isAdmin: false,
        accessRequestStatus: {
          ...userData.accessRequestStatus,  
          declinedBy: currentUserName,
          declinedAt: Date.now(),
          status: 'Rejected',
          },
        });

        setIsProcessing(null);

      showModal('success', `access request declined successfully`, null);

      setTimeout(() => {
        // console.log(
        //   'access request declined successfully: waiting for time-out'
        // );

        fetchUsers();
        hideModal();
      }, 2000);
    }
    } catch (error) {
      setError(
        'An error occurred while attempting to decline user access request.'
      );
      console.error('errors:', error);
      setIsProcessing(null);

      hideModal();
    }
  };

  const handleMakeAdmin = async (userData: UserSpecs, process: string) => {
    try {
      if (userData && userData.userDocumentId) {
        setIsProcessing({ process: process, userDocumentId: userData.userDocumentId });
        console.log(
          `Attempting to give admin privileges to user with email: '${userData.email}'.`
        );

        showModal('loading', `making ${userData.email} an admin...`, null);

        // Retrieve the current user's name from local storage
        const localStorageUser = await getUserData();

        if (!localStorageUser) {
          throw new Error('user not found in local storage');
        }

        const currentUserName = localStorageUser.userName;

        // Reference to the Firestore document
        const userDocRef = doc(db, 'users', userData.userDocumentId);

        // Update the Firestore document
        await updateDoc(userDocRef, {
          isAdmin: true,
          accessRequestStatus: {
            ...userData.accessRequestStatus,
            madeAdminBy: currentUserName,
            madeAdminAt: Date.now(),
          },
        });

        setIsProcessing(null);

        showModal('success', `${userData.email} is now an admin`, null);

        setTimeout(() => {
          console.log(
            'admin privileges granted successfully: waiting for time-out'
          );

          fetchUsers();
          hideModal();
        }, 2000);
      }
    } catch (error) {
      setError(
        'An error occurred while attempting to grant admin privilege to user.'
      );
      console.error('errors:', error);
      setIsProcessing(null);

      hideModal();
    }
  };

  const handleRemoveAdmin = async (userData: UserSpecs, process: string) => {
    try {
      if (userData && userData.userDocumentId) {
        setIsProcessing({ process: process, userDocumentId: userData.userDocumentId });
        // console.log(
        //   `Attempting to revoke admin privileges for user with email: '${userData.email}'.`
        // );

        showModal('loading', `removing ${userData.email} from admin list...`, null);

        // Retrieve the current user's name from local storage
        const localStorageUser = await getUserData();

        if (!localStorageUser) {
          throw new Error('user not found in local storage');
        }

        const currentUserName = localStorageUser.userName;

        // Reference to the Firestore document
        const userDocRef = doc(db, 'users', userData.userDocumentId);

        // Update the Firestore document
        await updateDoc(userDocRef, {
          isAdmin: false,
          accessRequestStatus: {
            ...userData.accessRequestStatus,
            removedAdminBy: currentUserName,
            removedAdminAt: Date.now(),
          },
        });

        setIsProcessing(null);

        showModal('success', `${userData.email} is no longer an admin`, null);

        setTimeout(() => {
          // console.log(
          //   'admin privileges revoked successfully: waiting for time-out'
          // );

          fetchUsers();
          hideModal();
        }, 2000);
      }
    } catch (error) {
      setError(
        'An error occurred while attempting to revoke admin privilege from user.'
      );
      console.error('errors:', error);
      setIsProcessing(null);

      hideModal();
    }
  };

  const values: AuthContextExports = {
    signUpForm,
    setSignUpForm,
    loginForm,
    setLoginForm,
    handleLogin,
    handleSignUp,
    handleMakeAdmin,
    handleRemoveAdmin,
    handleResetPassword,
    handleLogout,
    handleApproveAccessRequest,
    handleRevokeAccessRequest,
    handleDeclineAccessRequest,
    loading,
    isProcessing,
    error,
    setLoading,
    setIsProcessing,
    setError,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
