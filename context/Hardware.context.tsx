import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { GlobalsContext } from './Globals.context';

type SpeedState = 'high-speed' | 'medium-speed' | 'low-speed' | null;
type MotionState = 'forward' | 'backward' | 'stopped' | null;

type ContextExports = {
  isOnline: boolean;
  speed: SpeedState;
  motion: MotionState;
  //   setSpeed: (speed: SpeedState) => void;
  moveBack: () => void;
  moveForward: () => void;
  stopMotion: () => void;
  setLowSpeed: () => void;
  setMediumSpeed: () => void;
  setHighSpeed: () => void;
  isProcessing: boolean;
  setIsProcessing: (isProcessing: boolean) => void;
};

// Create the context with the default values being undefined
export const HardwareContext = createContext<ContextExports | undefined>(
  undefined
);

function HardwareContextProvider({ children }: { children: React.ReactNode }) {
  const globalsContext = useContext(GlobalsContext);

  // Ensure context is not undefined
  if (!globalsContext) {
    throw new Error('error: globals context error');
  }

  const { showModal } = globalsContext;

  //   const [isOnline, setIsOnline] = useState(true);
  const [isOnline, setIsOnline] = useState(false);
  const [speed, setSpeed] = useState<SpeedState>(null);
  const [motion, setMotion] = useState<MotionState>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleOnline = () => setIsOnline(true);
  const handleOffline = () => setIsOnline(false);
  //   useEffect(() => {
  //     window.addEventListener('online', handleOnline);
  //     window.addEventListener('offline', handleOffline);

  //     return () => {
  //       window.removeEventListener('online', handleOnline);
  //       window.removeEventListener('offline', handleOffline);
  //     };
  //   }, []);

  const moveForward = async () => {
    try {
      console.log('Moving forward');

      setIsProcessing(true);

      const processResponse = await axios.post(
        'https://final-year-project-api-topaz.vercel.app/api/command/postCommand',
        { command: 'forward' },
        {
          withCredentials: true,
          // headers: {
          //   Authorization: `Bearer ${userAccessToken}`,
          //   Email: `${userEmail}`,
          // },
        }
      );

      if (processResponse && processResponse.data == 'command sent') {
        console.log(processResponse.data);

        setMotion('forward');

        setIsProcessing(false);
      } else {
        showModal('dialog', undefined, {
          title: 'Process Error!',
          message: `Failed to send command. Ensure hardware is online, then try again.`,
          buttonText: 'Got it, thanks!',
        });

        setIsProcessing(false);
      }
    } catch (error) {
      console.log(error);

      showModal('dialog', undefined, {
        title: 'Process Error!',
        message: `Failed to send command. Ensure hardware is online, then try again.`,
        buttonText: 'Got it, thanks!',
      });

      setIsProcessing(false);
    }
  };

  const stopMotion = async () => {
    try {
    } catch (error) {}
    console.log('Stopping motion');

    setIsProcessing(true);

    const processResponse = await axios.post(
      'https://final-year-project-api-topaz.vercel.app/api/command/postCommand',
      { command: 'stop' },
      {
        withCredentials: true,
        // headers: {
        //   Authorization: `Bearer ${userAccessToken}`,
        //   Email: `${userEmail}`,
        // },
      }
    );

    if (processResponse && processResponse.data == 'command sent') {
      console.log(processResponse.data);

      setMotion('stopped');

      setIsProcessing(false);
    }
  };

  const moveBack = async () => {
    try {
      console.log('Moving back');

      setIsProcessing(true);

      const processResponse = await axios.post(
        'https://final-year-project-api-topaz.vercel.app/api/command/postCommand',
        { command: 'backward' },
        {
          withCredentials: true,
          // headers: {
          //   Authorization: `Bearer ${userAccessToken}`,
          //   Email: `${userEmail}`,
          // },
        }
      );

      if (processResponse && processResponse.data == 'command sent') {
        console.log(processResponse.data);

        setMotion('backward');

        setIsProcessing(false);
      } else {
        showModal('dialog', undefined, {
          title: 'Process Error!',
          message: `Failed to send command. Ensure hardware is online, then try again.`,
          buttonText: 'Got it, thanks!',
        });

        setIsProcessing(false);
      }
    } catch (error) {
      console.log(error);

      showModal('dialog', undefined, {
        title: 'Process Error!',
        message: `Failed to send command. Ensure hardware is online, then try again.`,
        buttonText: 'Got it, thanks!',
      });

      setIsProcessing(false);
    }
  };

  const setLowSpeed = async () => {
    try {
      console.log('Setting low speed');

      setIsProcessing(true);

      const processResponse = await axios.post(
        'https://final-year-project-api-topaz.vercel.app/api/command/postCommand',
        { command: 'low' },
        {
          withCredentials: true,
          // headers: {
          //   Authorization: `Bearer ${userAccessToken}`,
          //   Email: `${userEmail}`,
          // },
        }
      );

      if (processResponse && processResponse.data == 'command sent') {
        console.log(processResponse.data);

        setSpeed('low-speed');

        setIsProcessing(false);
      } else {
        showModal('dialog', undefined, {
          title: 'Process Error!',
          message: `Failed to send command. Ensure hardware is online, then try again.`,
          buttonText: 'Got it, thanks!',
        });

        setIsProcessing(false);
      }
    } catch (error) {
      console.log(error);

      showModal('dialog', undefined, {
        title: 'Process Error!',
        message: `Failed to send command. Ensure hardware is online, then try again.`,
        buttonText: 'Got it, thanks!',
      });

      setIsProcessing(false);
    }
  };

  const setMediumSpeed = async () => {
    try {
      console.log('Setting medium speed');

      setIsProcessing(true);

      const processResponse = await axios.post(
        'https://final-year-project-api-topaz.vercel.app/api/command/postCommand',
        { command: 'mid' },
        {
          withCredentials: true,
          // headers: {
          //   Authorization: `Bearer ${userAccessToken}`,
          //   Email: `${userEmail}`,
          // },
        }
      );

      // console.log(processResponse);

      if (processResponse && processResponse.data == 'command sent') {
        console.log(processResponse.data);

        setSpeed('medium-speed');

        setIsProcessing(false);
      } else {
        showModal('dialog', undefined, {
          title: 'Process Error!',
          message: `Failed to send command. Ensure hardware is online, then try again.`,
          buttonText: 'Got it, thanks!',
        });

        setIsProcessing(false);
      }
    } catch (error) {
      console.log(error);

      showModal('dialog', undefined, {
        title: 'Process Error!',
        message: `Failed to send command. Ensure hardware is online, then try again.`,
        buttonText: 'Got it, thanks!',
      });

      setIsProcessing(false);
    }
  };

  const setHighSpeed = async () => {
    try {
      console.log('Setting high speed');

      setIsProcessing(true);

      const processResponse = await axios.post(
        'https://final-year-project-api-topaz.vercel.app/api/command/postCommand',
        { command: 'high' },
        {
          withCredentials: true,
          // headers: {
          //   Authorization: `Bearer ${userAccessToken}`,
          //   Email: `${userEmail}`,
          // },
        }
      );

      // console.log(processResponse);
      if (processResponse && processResponse.data == 'command sent') {
        console.log(processResponse.data);

        setSpeed('high-speed');

        setIsProcessing(false);
      } else {
        showModal('dialog', undefined, {
          title: 'Process Error!',
          message: `Failed to send command. Ensure hardware is online, then try again.`,
          buttonText: 'Got it, thanks!',
        });

        setIsProcessing(false);
      }
    } catch (error) {
      console.log(error);

      showModal('dialog', undefined, {
        title: 'Process Error!',
        message: `Failed to send command. Ensure hardware is online, then try again.`,
        buttonText: 'Got it, thanks!',
      });

      setIsProcessing(false);
    }
  };

  return (
    <HardwareContext.Provider
      value={{
        isOnline,
        speed,
        isProcessing,
        setIsProcessing,
        // setSpeed,
        motion,
        moveBack,
        moveForward,
        stopMotion,
        setLowSpeed,
        setMediumSpeed,
        setHighSpeed,
      }}
    >
      {children}
    </HardwareContext.Provider>
  );
}

export default HardwareContextProvider;
