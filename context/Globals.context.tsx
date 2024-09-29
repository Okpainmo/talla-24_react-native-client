import React, { createContext, useState } from 'react';

// Define the types for the context
type ModalComponents =
  | 'preloader'
  | 'success'
  | 'error'
  | 'loading'
  | 'dialog'
  | null;

type ContextExports = {
  isModalVisible: boolean;
  currentModalComponent: ModalComponents;
  showModal: (
    component: ModalComponents,
    popUpMessage?: string,
    dialogContent?: {
      title: string;
      message: string;
      buttonText: string;
    } | null
  ) => void;
  hideModal: () => void;
  popLogOutModal: () => void;
  hideLogOutModal: () => void;
  showLogOutModal: boolean;
  dialogData: { title: string; message: string; buttonText: string };
  popUpMessage: string;
};

// Create the context with the default values being undefined
export const GlobalsContext = createContext<ContextExports | undefined>(
  undefined
);

function GlobalsContextProvider({ children }: ChildProp) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showLogOutModal, setShowLogOutModal] = useState(false);
  const [dialogData, setDialogData] = useState<{
    title: string;
    message: string;
    buttonText: string;
  }>({ title: '', message: '', buttonText: '' });
  const [popUpMessage, setPopUpMessage] = useState<string>('');
  const [currentModalComponent, setCurrentModalComponent] =
    useState<ModalComponents>(null);

  // Function to show a modal component
  const showModal = (
    component: ModalComponents,
    popUpMessage?: string | undefined,
    dialogData?: {
      title: string;
      message: string;
      buttonText: string;
    } | null
  ) => {
    setCurrentModalComponent(component);
    setIsModalVisible(true);

    if (popUpMessage) {
      setPopUpMessage(popUpMessage);
    }

    if (dialogData) {
      setDialogData(dialogData);
    }
  };

  // Function to hide the modal
  const hideModal = () => {
    setIsModalVisible(false);
    setCurrentModalComponent(null);
  };

  const popLogOutModal = () => {
    setShowLogOutModal(true);
  };

  const hideLogOutModal = () => {
    setShowLogOutModal(false);
  };

  return (
    <GlobalsContext.Provider
      value={{
        isModalVisible,
        currentModalComponent,
        showModal,
        hideModal,
        showLogOutModal,
        popLogOutModal,
        hideLogOutModal,
        dialogData,
        popUpMessage,
      }}
    >
      {children}
    </GlobalsContext.Provider>
  );
}

export default GlobalsContextProvider;
