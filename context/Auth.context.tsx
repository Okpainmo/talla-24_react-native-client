import React, {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  useContext,
} from 'react';
import { Link, router } from 'expo-router';
import { GlobalsContext } from '@/context/Globals.context';
export const AuthContext = createContext<AuthContextExports | undefined>(
  undefined
);

interface AuthContextExports {
  handleLogin: (email: string, password: string) => void;
  handleSignUp: (
    fullName: string,
    email: string,
    password: string,
    confirmedPassword: string
  ) => void;
  handleResetPassword: (email: string) => void;
  handleApproveAccessRequest: (email: string) => void;
  handleDeclineAccessRequest: (email: string) => void;
  loading: boolean;
  error: string | null;
  setError: (error: string | null) => void;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

function AuthContextProvider({ children }: ChildProp) {
  const globalsContext = useContext(GlobalsContext);

  // Ensure context is not undefined
  if (!globalsContext) {
    throw new Error('error: context error');
  }

  // Now it's safe to access `testing` after the type check
  const { showModal, hideModal } = globalsContext;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Extended special characters regex
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]{8,}$/;

  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const handleLogin = (email: string, password: string) => {
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
      console.log('Attempting to log in with:', email, password);

      // Simulate login process
      setTimeout(() => {
        console.log('Login process completed successfully');
        router.push('/home');

        setLoading(false);
      }, 3000);

      return;
    } catch {
      showModal('dialog', undefined, {
        title: 'Error!',
        message: 'An error occurred while attempting to log in.',
        buttonText: 'Got it, thanks!',
      });
      setLoading(false);

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

  const handleApproveAccessRequest = (email: string) => {
    try {
      setLoading(true);
      console.log(
        `Attempting to approve access request for user with email: '${email}'.`
      );

      // Simulate login process
      setTimeout(() => {
        console.log('access request approval completed successfully');
        setLoading(false);
      }, 3000);
    } catch (error) {
      setError(
        'An error occurred while attempting to approve user access request.'
      );
      setLoading(false);
      console.error('error:', error);
    }
  };

  const handleDeclineAccessRequest = (email: string) => {
    try {
      setLoading(true);
      console.log(
        `Attempting to decline access request for user with email: '${email}'.`
      );

      // Simulate login process
      setTimeout(() => {
        console.log('access request declining completed successfully');
        setLoading(false);
      }, 3000);
    } catch (error) {
      setError(
        'An error occurred while attempting to decline user access request.'
      );
      setLoading(false);
      console.error('error:', error);
    }
  };

  const handleSignUp = (
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
      console.log('Attempting to log in with:', fullName, email, password);

      // Simulate login process
      setTimeout(() => {
        console.log('Login process completed successfully');

        router.push('/home');
        setLoading(false);
      }, 3000);
    } catch (error) {
      setError('An error occurred while attempting to log in.');
      setLoading(false);
      console.error('error:', error);
    }
  };

  const values: AuthContextExports = {
    handleLogin,
    handleSignUp,
    handleResetPassword,
    handleDeclineAccessRequest,
    handleApproveAccessRequest,
    loading,
    error,
    setLoading,
    setError,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
