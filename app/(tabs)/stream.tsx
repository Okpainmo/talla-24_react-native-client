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
} from 'react-native';
import React, { useState, useContext, useEffect } from 'react';
import { Link, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
const mockAvatar1 = require('../../assets/images/img-3.jpg');

import { GlobalsContext } from '@/context/Globals.context';
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
} = default_light_texts || {};

const Profile = () => {
  getAuth().onAuthStateChanged((user) => {
    if (!user) router.replace('/');
  });
  const globalsContext = useContext(GlobalsContext);

  // Ensure context is not undefined
  if (!globalsContext) {
    throw new Error('error: context error');
  }

  // Now it's safe to access `testing` after the type check
  const { showModal, hideModal } = globalsContext;

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
        <View>
          <View className='hardware-status-wrapper px-3 flex flex-row mt-3'>
            <Text style={{ color: text_variant_1, fontFamily: 'font_400' }}>
              Hardware Status:
            </Text>
            <Text
              className='ml-2 underline'
              style={{ fontFamily: 'font_500', color: text_variant_1 }}
            >
              Online
            </Text>
          </View>
          <View className='controller-details-wrapper px-3 flex flex-row mt-1'>
            <Text style={{ color: text_variant_1, fontFamily: 'font_400' }}>
              Controller Name:
            </Text>
            <Text
              className='ml-2 underline'
              style={{ fontFamily: 'font_500', color: text_variant_1 }}
            >
              Andrew Okpainmo
            </Text>
          </View>
        </View>
        <View className='w-full min-h-[500px]'>
          <View className='flex flex-row justify-center'>
            <Pressable>
              <Ionicons name='caret-up' size={110} color={text_variant_1} />
            </Pressable>
          </View>
          <View className='flex flex-row justify-center'>
            <Pressable>
              <Ionicons name='caret-back' size={110} color={text_variant_1} />
            </Pressable>
            <Pressable>
              <Ionicons name='pause-circle' size={110} color={text_variant_1} />
            </Pressable>
            <Pressable>
              <Ionicons
                name='caret-forward'
                size={110}
                color={text_variant_1}
              />
            </Pressable>
          </View>
          <View className='flex flex-row justify-center'>
            <Pressable>
              <Ionicons name='caret-down' size={110} color={text_variant_1} />
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
