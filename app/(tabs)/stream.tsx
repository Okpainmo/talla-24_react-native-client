import {
  SafeAreaView,
  StatusBar,
  View,
  ScrollView,
  Text,
  StyleSheet,
  Platform,
  Image,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from 'react-native';
import React, { useState, useContext, useEffect } from 'react';
import { Link, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
const mockAvatar1 = require('../../assets/images/img-3.jpg');

import { GlobalsContext } from '@/context/Globals.context';
import { HardwareContext } from '@/context/Hardware.context';
import { UserContext } from '@/context/User.context';
import GlobalModal from '@/components/Layout/GlobalModal';

import { auth } from '../../firebaseConfig';
import { getAuth } from 'firebase/auth';

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
} = default_light_backgrounds || {};
const {
  text_variant_1,
  text_variant_2,
  text_variant_3,
  text_variant_4,
  text_variant_5,
  text_variant_6,
} = default_light_texts || {};

const Profile = () => {
  getAuth().onAuthStateChanged((user) => {
    if (!user) router.replace('/');
  });
  const globalsContext = useContext(GlobalsContext);
  const hardwareContext = useContext(HardwareContext);
  const userContext = useContext(UserContext);

  // Ensure context is not undefined
  if (!globalsContext || !hardwareContext || !userContext) {
    throw new Error('error: context error');
  }

  // Now it's safe to access `testing` after the type check
  const { showModal, hideModal } = globalsContext;
  const {
    isOnline,
    speed,
    setHighSpeed,
    setMediumSpeed,
    setLowSpeed,
    moveBack,
    moveForward,
    stopMotion,
    isProcessing,
    motion,
  } = hardwareContext;
  const { firestoreUser } = userContext;
  // useEffect(() => {
  //   showModal('preloader');
  // }, []);

  const [showNameInput, setShowNameInput] = useState(false);
  const [showEmailInput, setShowEmailInput] = useState(false);

  return (
    <KeyboardAvoidingView
      className='flex flex-1 justify-center items-center flex-col w-full'
      style={{
        backgroundColor: background_variant_1,
        paddingTop: Platform.OS === 'android' ? 50 : 0,
      }}
      behavior='padding'
      keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : 0}
    >
      <View
        className='header flex flex-row items-center mb-[10px] px-3 w-full'
        style={{ backgroundColor: background_variant_1 }}
      >
        <Pressable
          onPress={() => router.back()}
          style={{ borderColor: text_variant_3 }}
          className={`mr-6 w-[40px] h-[40px] rounded-full border flex items-center justify-center`}
        >
          <Ionicons
            name='chevron-back-outline'
            size={22}
            color={text_variant_3}
          />
        </Pressable>
        <Text
          className='text-[25px] mt-1'
          style={{ color: text_variant_1, fontFamily: 'font_800' }}
        >
          Stream and Control.
        </Text>
      </View>
      <ScrollView className='flex flex-1 w-full'>
        <View className='bg-slate-800 h-[220px]'></View>
        <View className='flex flex-row justify-between items-center px-3'>
          <View className='flex flex-col'>
            <View className='hardware-status-wrapper flex flex-row mt-3'>
              <Text style={{ color: text_variant_1, fontFamily: 'font_400' }}>
                Hardware Status:
              </Text>
              <Text
                className='ml-2 underline'
                style={{ fontFamily: 'font_500', color: text_variant_1 }}
              >
                {isOnline ? 'Online' : 'Offline'}
              </Text>
            </View>
            <View className='controller-details-wrapper flex flex-row mt-1'>
              <Text style={{ color: text_variant_1, fontFamily: 'font_400' }}>
                Controller Name:
              </Text>
              <Text
                className='ml-2 underline'
                style={{ fontFamily: 'font_500', color: text_variant_1 }}
              >
                {firestoreUser && `${firestoreUser.userName.slice(0, 20)}...`}
              </Text>
            </View>
          </View>
          <View className='flex justify-center items-center'>
            <ActivityIndicator
              className={`mt-2 ${isProcessing ? 'flex' : 'hidden'}`}
              size='small'
              color={text_variant_2}
            />
          </View>
        </View>
        <View className='flex flex-row w-full justify-center items-center mt-6'>
          <View className='directions-control'>
            <View className='flex flex-row justify-center'>
              <Pressable onPress={() => moveForward()}>
                <Ionicons
                  name='caret-up'
                  size={110}
                  color={text_variant_1}
                  style={{ opacity: motion === 'forward' ? 0.5 : 1 }}
                />
              </Pressable>
            </View>
            <View className='flex flex-row justify-center'>
              {/* <Pressable>
              <Ionicons name='caret-back' size={110} color={text_variant_1} />
            </Pressable> */}
              <Pressable onPress={() => stopMotion()}>
                <Ionicons
                  name='pause-circle'
                  size={110}
                  color={text_variant_1}
                  style={{ opacity: motion === 'stopped' ? 0.5 : 1 }}
                />
              </Pressable>
              {/* <Pressable>
              <Ionicons
                name='caret-forward'
                size={110}
                color={text_variant_1}
              />
            </Pressable> */}
            </View>
            <View className='flex flex-row justify-center'>
              <Pressable onPress={() => moveBack()}>
                <Ionicons
                  name='caret-down'
                  size={110}
                  color={text_variant_1}
                  style={{ opacity: motion === 'backward' ? 0.5 : 1 }}
                />
              </Pressable>
            </View>
          </View>
          <View
            className='h-[200px] w-[1px] mr-10 ml-6'
            style={{ backgroundColor: background_variant_3 }}
          ></View>
          <View
            className='speed-controls flex-col justify-center'
            // style={{ borderLeftWidth: 1, borderColor: text_variant_3 }}
          >
            {/* add 3 buttons stacked vertically, well styled with proper colors and icons for speed control - low, medium, and high */}
            <Pressable
              className='bg-green-800 p-2 rounded-md py-2 w-[110px]'
              onPress={() => setLowSpeed()}
            >
              <Text
                className='text-white text-center text-[12px]'
                style={{ fontFamily: 'font_400' }}
              >
                {speed === 'low-speed' ? (
                  <Ionicons
                    name='checkmark-circle-outline'
                    size={22}
                    color='#ffffff'
                  />
                ) : (
                  'Low Speed'
                )}
              </Text>
            </Pressable>
            <Pressable
              className='bg-yellow-800 p-2 rounded-md py-2 w-[110px] mt-6'
              onPress={() => setMediumSpeed()}
            >
              <Text
                className='text-white text-center text-[12px]'
                style={{ fontFamily: 'font_400' }}
              >
                {speed === 'medium-speed' ? (
                  <Ionicons
                    name='checkmark-circle-outline'
                    size={22}
                    color='#ffffff'
                  />
                ) : (
                  'Medium Speed'
                )}
              </Text>
            </Pressable>
            <Pressable
              className='bg-red-800 p-2 rounded-md py-2 w-[110px] mt-6'
              onPress={() => setHighSpeed()}
            >
              <Text
                className='text-white text-center text-[12px]'
                style={{ fontFamily: 'font_400' }}
              >
                {speed === 'high-speed' ? (
                  <Ionicons
                    name='checkmark-circle-outline'
                    size={22}
                    color='#ffffff'
                  />
                ) : (
                  'High Speed'
                )}
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Profile;

// const styles = StyleSheet.create({
//   safePadding: {
//     paddingTop: Platform.OS === 'android' ? 45 : 0,
//     backgroundColor: background_variant_1,
//   },
// });
