import React, { useContext } from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import Preloader from './components/Preloader';
import SuccessPopUp from './components/SuccessPopUp';
import LoadingPopUp from './components/LoadingPopUp';
import ErrorPopUp from './components/ErrorPopUp';
import Dialog from './components/Dialog';
import { GlobalsContext } from '@/context/Globals.context';
import {
  default_light_backgrounds,
  default_light_texts,
} from '@/constants/colours';
import { Ionicons } from '@expo/vector-icons';
const {
  background_variant_1,
  background_variant_2,
  background_variant_3,
  background_variant_4,
  background_variant_5,
  background_variant_6,
} = default_light_backgrounds || {};
const {
  text_variant_1,
  text_variant_2,
  text_variant_3,
  text_variant_4,
  text_variant_5,
} = default_light_texts || {};

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
        {currentModalComponent === 'loading' && (
          <LoadingPopUp popUpMessage={popUpMessage} />
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
    backgroundColor: background_variant_6,
  },
});
