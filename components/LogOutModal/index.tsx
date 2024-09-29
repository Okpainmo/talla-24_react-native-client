import {
  StyleSheet,
  Text,
  View,
  Modal,
  Image,
  ImageBackground,
  Animated,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useRef, useContext, useState } from 'react';
const Logo = require('@/assets/images/icon.png');
import {
  default_light_backgrounds,
  default_light_texts,
} from '@/constants/colours';
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

import { GlobalsContext } from '@/context/Globals.context';
import { AuthContext } from '@/context/Auth.context';

const LogOutModal = () => {
  const globalsContext = useContext(GlobalsContext);
  const authContext = useContext(AuthContext);
  // const [showLogOutModal, setShowLogOutModal] = useState(false);

  // Ensure context is not undefined
  if (!globalsContext || !authContext) {
    throw new Error('error: context error');
  }

  // Now it's safe to access `handleLogout` after the type check
  const { handleLogout } = authContext;
  const { showLogOutModal, hideLogOutModal } = globalsContext;

  return (
    <View>
      {/* <TouchableOpacity onPress={() => showLogOutModal(true)}>
        <Text>Show Log Out Modal</Text>
      </TouchableOpacity> */}

      <Modal
        animationType='fade'
        transparent={true}
        visible={showLogOutModal}
        // onRequestClose={() => setShowLogOutModal(false)}
      >
        <View
          className='modal-background-overlay flex absolute top-0 left-0 right-0 z-[100] h-screen'
          style={{ backgroundColor: background_variant_6 }}
        >
          <View
            className='modal-content flex-1 w-full flex px-3 items-center justify-center relative'
            // style={{ backgroundColor: background_variant_6 }}
          >
            <View
              className='px-5 py-5 flex rounded-[15px] w-full'
              style={{ backgroundColor: background_variant_1 }}
            >
              <Text
                style={{ fontFamily: 'font_600', color: text_variant_2 }}
                className='text-[17px] mb-3'
              >
                Warning!!!
              </Text>
              <View className='mb-4'>
                <Text
                  className='text-[12px] leading-[20px]'
                  style={{ fontFamily: 'font_400', color: text_variant_1 }}
                >
                  You are about to log out of your account, do you wish to
                  proceed?
                </Text>
              </View>

              <View className='flex-row justify-between'>
                <TouchableOpacity
                  className='px-6 py-3 rounded-[10px] self-start'
                  style={{
                    backgroundColor: background_variant_5,
                    width: '48%',
                    cursor: 'pointer',
                  }}
                  onPress={() => {
                    handleLogout();
                    hideLogOutModal();
                  }}
                >
                  <Text
                    className='mt-[0.5px]'
                    style={{
                      fontFamily: 'font_500',
                      textAlign: 'center',
                      fontSize: 12,
                      color: `${text_variant_2}`,
                    }}
                  >
                    Yes, Log me out
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className='px-6 py-3 rounded-[10px] self-start'
                  style={{
                    backgroundColor: background_variant_2,
                    width: '48%',
                    cursor: 'pointer',
                  }}
                  onPress={() => hideLogOutModal()}
                >
                  <Text
                    className='mt-[0.5px]'
                    style={{
                      fontFamily: 'font_500',
                      textAlign: 'center',
                      fontSize: 12,
                      color: `${text_variant_5}`,
                    }}
                  >
                    Cancel
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default LogOutModal;
