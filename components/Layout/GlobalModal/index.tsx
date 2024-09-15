import React, { useContext } from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import Preloader from './components/Preloader';
import SuccessPopUp from './components/SuccessPopUp';
import CautionPopUp from './components/CautionPopUp';
import ErrorPopUp from './components/ErrorPopUp';
import Dialog from './components/Dialog';
import { GlobalsContext } from '@/context/Globals.context';

const GlobalModal = () => {
  const context = useContext(GlobalsContext);

  // Ensure context is not undefined
  if (!context) {
    throw new Error(
      'GlobalsContext must be used within a GlobalsContextProvider'
    );
  }

  const {
    isModalVisible,
    currentModalComponent,
    hideModal,
    dialogData,
    popUpMessage,
  } = context;

  return (
    <Modal
      animationType='fade'
      transparent={true}
      visible={isModalVisible}
      onRequestClose={hideModal} // Close the modal when back button is pressed (for Android)
    >
      <View style={styles.modalContainer}>
        {currentModalComponent === 'preloader' && <Preloader />}
        {currentModalComponent === 'success' && (
          <SuccessPopUp popUpMessage={popUpMessage} />
        )}
        {currentModalComponent === 'error' && (
          <ErrorPopUp popUpMessage={popUpMessage} />
        )}
        {currentModalComponent === 'caution' && (
          <CautionPopUp popUpMessage={popUpMessage} />
        )}
        {currentModalComponent === 'dialog' && (
          <Dialog
            title={dialogData.title}
            message={dialogData.message}
            buttonText={dialogData.buttonText}
          />
        )}
      </View>
    </Modal>
  );
};

export default GlobalModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
});
