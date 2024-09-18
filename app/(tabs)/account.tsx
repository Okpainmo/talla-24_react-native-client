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
  ActivityIndicator,
  Modal,
} from 'react-native';
import React, { useState, useContext, useEffect } from 'react';
import { Link, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
const mockAvatar1 = require('../../assets/images/img-3.jpg');

import {
  default_light_backgrounds,
  default_light_texts,
} from '@/constants/colours';

import { GlobalsContext } from '@/context/Globals.context';
import { UserContext } from '@/context/User.context';
import GlobalModal from '@/components/Layout/GlobalModal';
import { auth } from '../../firebaseConfig';
import { getAuth } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

  const [showNameInput, setShowNameInput] = useState(false);
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [updateForm, setUpdateForm] = useState({
    userName: '',
    email: '',
  });
  // const [userDocumentId, setUserDocumentId] = useState('');

  const globalsContext = useContext(GlobalsContext);
  const userContext = useContext(UserContext);

  // Ensure context is not undefined
  if (!globalsContext || !userContext) {
    throw new Error('error: context error');
  }

  // Now it's safe to access `testing` after the type check
  const { showModal, hideModal } = globalsContext;
  const {
    handleUpdateUser,
    isUpdating,
    error,
    setIsUpdating,
    setError,
    getUserData,
    getUserDocumentId,
    firestoreUserDocumentId,
    fetchUser,
    firestoreUser,
  } = userContext;

  useEffect(() => {
    fetchUser();
    getUserDocumentId();
  }, []);
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
      <GlobalModal />
      <View
        className='header flex flex-row items-center px-3 w-full'
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
          Account.
        </Text>
      </View>
      <ScrollView className='flex flex-1 w-full pt-[20px]'>
        <View
          className='user-avatar-wrapper relative flex flex-row justify-center 
        w-full mb-6 mt-6'
        >
          <View
            className='mr-4 w-[100px] h-[100px] rounded-full flex items-center justify-center'
            style={{ backgroundColor: background_variant_3 }}
          >
            <Ionicons name='person-outline' size={30} color={text_variant_1} />
          </View>
        </View>
        <View className='other-updates-section flex px-3 mb-[100px]'>
          <View className='username flex flex-row mb-6'>
            <Ionicons name='person-outline' size={22} color={text_variant_1} />
            <View className='user-details-wrapper flex justify-between ml-4'>
              <Text
                className='user-name text-[14px] mb-3'
                style={{ color: text_variant_1, fontFamily: 'font_500' }}
              >
                Name
              </Text>
              <View
                className={`${
                  showNameInput ? 'flex' : 'hidden'
                } mb-[15px] flex-1`}
              >
                <View
                  className='border pl-[12px]'
                  style={{
                    borderRadius: 10,
                    borderColor: `${text_variant_3}`,
                    width: '75%',
                  }}
                >
                  <TextInput
                    // className='border'
                    placeholder='add new user name'
                    style={{
                      // paddingHorizontal: 12,
                      paddingVertical: 12,
                      // borderBottom: '1px solid',
                      // backgroundColor: `${background_variant_3}`,
                      color: `${text_variant_1}`,
                      fontSize: 14,
                      fontFamily: 'font_400',
                    }}
                    multiline={true}
                    placeholderTextColor={text_variant_3} // Set the placeholder color here
                    // value='Andrew James Okpainmo'
                    // value={loginForm.password}
                    onChangeText={(text) => {
                      // console.log('email input in progress...');
                      setUpdateForm({
                        ...updateForm,
                        userName: text,
                      });
                    }}
                  />
                </View>
                <TouchableOpacity
                  className='mt-4 rounded-[10px] w-[80px] px-4 flex items-center justify-center py-[0] 
                min-h-[40px] mr-2'
                  style={{
                    // fontFamily: 'font_200',
                    backgroundColor: background_variant_5,
                    // color: text_variant_3,
                  }}
                  onPress={async () => {
                    // setShowNameInput(false);
                    console.log(updateForm);
                    handleUpdateUser(
                      `${firestoreUserDocumentId}`,
                      `userName`,
                      updateForm
                    );
                  }}
                >
                  {isUpdating === 'userName' ? (
                    <ActivityIndicator size='small' color='#473bf0' />
                  ) : (
                    <Text
                      className='text-[12px]'
                      style={{
                        color: text_variant_2,
                        fontFamily: 'font_500',
                      }}
                    >
                      update
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
              <Text
                className={`user-name text-[14px] ${
                  showNameInput ? 'hidden' : 'flex'
                } mb-[15px]`}
                style={{ color: text_variant_1, fontFamily: 'font_400' }}
              >
                {firestoreUser?.userName}
              </Text>
              <Text
                className='user-status text-[12px] mt-[3px] w-[80%] flex flex-wrap'
                style={{ color: text_variant_1, fontFamily: 'font_300' }}
              >
                This is your Talla-24 username, it will be visible to all users
                and admins.
              </Text>
            </View>
            <Pressable
              onPress={() => setShowNameInput(!showNameInput)}
              className='absolute right-3 z-20'
              // style={{ backgroundColor: background_variant_2 }}
            >
              <Ionicons
                className='relative z-10'
                name='create-outline'
                size={22}
                color={text_variant_2}
              />
            </Pressable>
          </View>
          <View className='email flex flex-row mb-6'>
            <Ionicons name='mail-outline' size={22} color={text_variant_1} />
            <View className='user-details-wrapper flex justify-between ml-4'>
              <Text
                className='email text-[14px] mb-3'
                style={{ color: text_variant_1, fontFamily: 'font_500' }}
              >
                Email
              </Text>
              <View
                className={`${
                  showEmailInput ? 'flex' : 'hidden'
                } mb-[15px] flex-1`}
              >
                <View
                  className='border pl-[12px]'
                  style={{
                    borderRadius: 10,
                    borderColor: `${text_variant_3}`,
                    width: '75%',
                  }}
                >
                  <TextInput
                    // className='border'
                    placeholder='add your email'
                    style={{
                      // paddingHorizontal: 12,
                      paddingVertical: 12,
                      // borderBottom: '1px solid',
                      // backgroundColor: `${background_variant_3}`,
                      color: `${text_variant_1}`,
                      fontSize: 14,
                      fontFamily: 'font_400',
                    }}
                    multiline={true}
                    placeholderTextColor={text_variant_3} // Set the placeholder color here
                    // value='Andrew James Okpainmo'
                    // value={loginForm.password}
                    onChangeText={(text) => {
                      // console.log('email input in progress...');
                      setUpdateForm({
                        ...updateForm,
                        email: text,
                      });
                    }}
                  />
                </View>
                <TouchableOpacity
                  className='mt-4 rounded-[10px] w-[80px] px-4 flex items-center justify-center py-[0] 
                min-h-[40px] mr-2'
                  style={{
                    // fontFamily: 'font_200',
                    backgroundColor: background_variant_5,
                    // color: text_variant_3,
                  }}
                  onPress={() => {
                    // setShowEmailInput(false);
                    console.log(updateForm);
                    handleUpdateUser(
                      `${firestoreUser?.id}`,
                      `email`,
                      updateForm
                    );
                  }}
                >
                  {isUpdating === 'email' ? (
                    <ActivityIndicator size='small' color='#473bf0' />
                  ) : (
                    <Text
                      className='text-[12px]'
                      style={{
                        color: text_variant_2,
                        fontFamily: 'font_500',
                      }}
                    >
                      update
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
              <Text
                className={`user-name text-[14px] ${
                  showEmailInput ? 'hidden' : 'flex'
                } mb-[15px]`}
                style={{ color: text_variant_1, fontFamily: 'font_400' }}
              >
                {firestoreUser?.email}
              </Text>
              <Text
                className='user-status text-[12px] mt-[3px] w-[80%] flex flex-wrap'
                style={{ color: text_variant_1, fontFamily: 'font_300' }}
              >
                This is your Talla-24 email, it will be visible to all users and
                admins.
              </Text>
            </View>
            <Pressable
              onPress={() => setShowEmailInput(!showEmailInput)}
              className='absolute right-3 z-20 hidden'
              // style={{ backgroundColor: background_variant_2 }}
            >
              <Ionicons
                className='relative z-10'
                name='create-outline'
                size={22}
                color={text_variant_2}
              />
            </Pressable>
          </View>
        </View>

        {/* </View> */}
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
