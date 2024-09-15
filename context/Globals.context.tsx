import React, { createContext, useState } from 'react';

// Define the types for the context
type ModalComponents =
  | 'preloader'
  | 'success'
  | 'error'
  | 'caution'
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
    }
  ) => void;
  hideModal: () => void;
  // showPreloader: () => void;
  // showSuccess: () => void;
  // showError: () => void;
  // showCaution: () => void;
  // showDialog: () => void;
  // hidePreloader: () => void;
  // hideSuccess: () => void;
  // hideError: () => void;
  // hideCaution: () => void;
  // hideDialog: () => void;
  dialogData: { title: string; message: string; buttonText: string };
  popUpMessage: string;
};

// Create the context with the default values being undefined
export const GlobalsContext = createContext<ContextExports | undefined>(
  undefined
);

function GlobalsContextProvider({ children }: ChildProp) {
  const [isModalVisible, setIsModalVisible] = useState(false);
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
    }
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

  // Specific functions for each modal component
  // const showPreloader = () => showModal('preloader');
  // const showSuccess = () => showModal('success');
  // const showError = () => showModal('error');
  // const showCaution = () => showModal('caution');
  // const showDialog = () => showModal('dialog');

  // const hidePreloader = () => {
  //   if (currentModalComponent === 'preloader') hideModal();
  // };
  // const hideSuccess = () => {
  //   if (currentModalComponent === 'success') hideModal();
  // };
  // const hideError = () => {
  //   if (currentModalComponent === 'error') hideModal();
  // };
  // const hideCaution = () => {
  //   if (currentModalComponent === 'caution') hideModal();
  // };
  // const hideDialog = () => {
  //   if (currentModalComponent === 'dialog') hideModal();
  // };

  return (
    <GlobalsContext.Provider
      value={{
        isModalVisible,
        currentModalComponent,
        showModal,
        hideModal,
        // showPreloader,
        // showSuccess,
        // showError,
        // showCaution,
        // showDialog,
        // hidePreloader,
        // hideSuccess,
        // hideError,
        // hideCaution,
        // hideDialog,
        dialogData,
        popUpMessage,
      }}
    >
      {children}
    </GlobalsContext.Provider>
  );
}

export default GlobalsContextProvider;
