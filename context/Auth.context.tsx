import React, {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  useContext,
} from 'react';
import { Link, router } from 'expo-router';
import { GlobalsContext } from './Globals.context';
import { UserContext } from './User.context';

import { auth } from '../firebaseConfig';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext<AuthContextExports | undefined>(
  undefined
);
interface AuthContextExports {
  handleLogin: (email: string, password: string, name: string) => void;
  handleLogout: () => void;
  handleSignUp: (
    fullName: string,
    email: string,
    password: string,
    confirmedPassword: string
  ) => void;
  handleResetPassword: (email: string) => void;
  handleApproveAccessRequest: (requestId: string, email: string) => void;
  handleDeclineAccessRequest: (requestId: string, email: string) => void;
  loading: boolean;
  isDeclining: string | null;
  isApproving: string | null;
  error: string | null;
  setError: Dispatch<SetStateAction<string | null>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setIsDeclining: Dispatch<SetStateAction<string | null>>;
  setIsApproving: Dispatch<SetStateAction<string | null>>;
}

function AuthContextProvider({ children }: ChildProp) {
  const userContext = useContext(UserContext);
  const globalsContext = useContext(GlobalsContext);

  // Ensure context is not undefined
  if (!globalsContext) {
    throw new Error('error: globals context error');
  }

  if (!userContext) {
    throw new Error('error: user context error');
  }

  // Now it's safe to access values after the type check
  const { showModal, hideModal } = globalsContext;
  const { storeUserData, getUserData, handleCreateUser } = userContext;
  const [isDeclining, setIsDeclining] = useState<string | null>(null);
  const [isApproving, setIsApproving] = useState<string | null>(null);
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

      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;

          console.log(user);

          const currentTimeInMilliseconds = Date.now();

          if (user && user.email) {
            handleCreateUser({
              userName: fullName,
              email: user.email,
              id: user.uid,
              accessRequestStatus: { status: 'Pending', approvedBy: null },
              createdAt: `${currentTimeInMilliseconds}`,
            })

            {/* see the handleCreateUser function to see where/how the userDocumentID was
            stored with AsyncStorage */}

            storeUserData({
              userName: fullName,
              id: user.uid,
              email: user?.email,
            });

            console.log('Sign-up completed successfully');

            setLoading(false);
            router.push('/home');
          } else {
            setLoading(false);
          }

          // ...
        })
        .catch((error) => {
          // const errorCode = error.code;
          // const errorMessage = error.message;

          setLoading(false);
          console.error('errorCode:', error.code);
          console.error('errorMessage:', error.message);

          // ..
        });

      // setLoading(false);

      // Simulate login process
      // setTimeout(() => {
      //   console.log('Login process completed successfully');

      // }, 3000);
    } catch (error) {
      setError('An error occurred while attempting to sign up.');
      setLoading(false);
      console.error('error:', error);
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
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;

          console.log(user);

          if (user && user.email) {
            storeUserData({
              userName: fullName,
              id: user.uid,
              email: user?.email,
            });
            console.log('Log-in completed successfully');

            setLoading(false);
            router.push('/home');
          }
          // ...
        })
        .catch((error) => {
          // const errorCode = error.code;
          // const errorMessage = error.message;

          if (error.code === 'auth/invalid-credential') {
            showModal('dialog', undefined, {
              title: 'Auth Error!',
              message:
                'Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.',
              buttonText: 'Try again!',
            });

            return;
          }

          if (error.code === 'auth/too-many-requests') {
            showModal('dialog', undefined, {
              title: 'Auth Error!',
              message: 'Invalid credentials provided',
              buttonText: 'Try again!',
            });

            return;
          }

          showModal('dialog', undefined, {
            title: 'Auth Error!',
            message: error.message,
            buttonText: 'Try again!',
          });

          console.error('errorCode:', error.code);
          console.error('errorMessage:', error.message);

          // ..
        });

      setLoading(false);

      return;
    } catch {
      setLoading(false);

      showModal('dialog', undefined, {
        title: 'Error!',
        message: 'An error occurred while attempting to log in.',
        buttonText: 'Got it, thanks!',
      });

      return;
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

  const handleApproveAccessRequest = (requestId: string, email: string) => {
    try {
      setIsApproving(requestId);
      console.log(
        `Attempting to approve access request for user with email: '${email}'.`
      );

      // Simulate login process
      setTimeout(() => {
        console.log('access request approval completed successfully');
        setIsApproving(null);
      }, 3000);
    } catch (error) {
      setError(
        'An error occurred while attempting to approve user access request.'
      );
      setIsApproving(null);
      console.error('error:', error);
    }
  };

  const handleDeclineAccessRequest = (requestId: string, email: string) => {
    try {
      setIsDeclining(requestId);
      console.log(
        `Attempting to decline access request for user with email: '${email}'.`
      );

      // Simulate login process
      setTimeout(() => {
        console.log('access request declining completed successfully');
        setIsDeclining(null);
      }, 3000);
    } catch (error) {
      setError(
        'An error occurred while attempting to decline user access request.'
      );
      setIsDeclining(null);
      console.error('error:', error);
    }
  };

  const values: AuthContextExports = {
    handleLogin,
    handleSignUp,
    handleResetPassword,
    handleLogout,
    handleDeclineAccessRequest,
    handleApproveAccessRequest,
    loading,
    isApproving,
    isDeclining,
    error,
    setLoading,
    setIsDeclining,
    setIsApproving,
    setError,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
