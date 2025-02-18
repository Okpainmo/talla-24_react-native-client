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
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
} from 'firebase/firestore';
import React, { useState, useContext, useEffect } from 'react';
import { Link, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
const mockAvatar1 = require('../../assets/images/img-3.jpg');
import { GlobalsContext } from '@/context/Globals.context';
import { AuthContext } from '@/context/Auth.context';
import { UserContext } from '@/context/User.context';

import GlobalModal from '@/components/Layout/GlobalModal';
import { accessRequests } from '@/data/mockAccessRequestsList';

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
import { auth } from '../../firebaseConfig';
import { getAuth } from 'firebase/auth';
import type { UserSpecs } from '@/context/User.context';

const Notifications = () => {
  const [showPassword, setShowPassword] = useState(false);

  const globalsContext = useContext(GlobalsContext);
  const authContext = useContext(AuthContext);
  const userContext = useContext(UserContext);

  // Ensure context is not undefined
  if (!authContext || !globalsContext || !userContext) {
    throw new Error('error: context error');
  }

  // Now it's safe to access `testing` after the type check
  const {
    handleApproveAccessRequest,
    handleRevokeAccessRequest,
    handleDeclineAccessRequest,
    handleMakeAdmin,
    handleRemoveAdmin,
    loading,
    isProcessing,
  } = authContext;

  // Now it's safe to access `testing` after the type check
  const { showModal, hideModal } = globalsContext;
  const { fetchUsers, users, getUserDataFromDB, firestoreUser } = userContext;

  getAuth().onAuthStateChanged((user) => {
    if (!user) router.replace('/');
  });

  // console.log("firestoreUser", firestoreUser)

  useEffect(() => {
    showModal('preloader');

    fetchUsers();
  }, []);

  return (
    <View
      style={{
        backgroundColor: background_variant_1,
        paddingTop: Platform.OS === 'android' ? 50 : 0,
      }}
      className='w-full flex-1'
    >
      <View
        className='header flex flex-row items-center px-3 pb-[7px]'
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
          Notifications.
        </Text>
      </View>
      <ScrollView
        className='px-3'
        style={{ backgroundColor: background_variant_1 }}
      >
        <View className='pb-[60px] mt-[50px] hidden'>
          <Text
            className='text-[14px] leading-[25px] text-center'
            style={{ fontFamily: 'font_400' }}
          >
            There are no notifications to view...
          </Text>
        </View>
        <View className='notifications-rack flex mt-3 pb-[100px]'>
          {users &&
            users.map((user: UserSpecs) => {
              // console.log('firestoreUser:', firestoreUser);
              return (
                <View
                  key={user.id}
                  className='access-request-card w-full flex-1 border rounded-[10px] 
            p-3 mb-4'
                  style={{ borderColor: text_variant_3 }}
                >
                  <Text
                    className='mb-2'
                    style={{ color: text_variant_1, fontFamily: 'font_400' }}
                  >
                    Access request
                  </Text>
                  <View className='flex flex-row items-center'>
                    {/* <Image
              style={{
                width: 50,
                objectFit: 'contain',
                height: 50,
                borderRadius: 50,
              }}
              source={mockAvatar1}
              // resizeMethod='scale'
              accessibilityLabel='user avatar'
            /> */}
                    <View
                      className='mr-4 w-[50px] h-[50px] rounded-full flex items-center justify-center'
                      style={{ backgroundColor: background_variant_3 }}
                    >
                      <Ionicons
                        name='person-outline'
                        size={22}
                        color={text_variant_1}
                      />
                    </View>
                    <View className='flex justify-between'>
                      <Text
                        className='text-[14px]'
                        style={{
                          color: text_variant_1,
                          fontFamily: 'font_600',
                        }}
                      >
                        {user.userName}
                      </Text>
                      <View className='flex flex-row'>
                        <Text
                          className='text-[11px] mt-[3px]'
                          style={{
                            color: text_variant_1,
                            fontFamily: 'font_400',
                          }}
                        >
                          {user.email}
                        </Text>
                        <Text
                          className='text-[11px] mt-[3px]'
                          style={{
                            color: text_variant_1,
                            fontFamily: 'font_400',
                          }}
                        >
                          {' '}
                          |{' '}
                        </Text>
                        <Text
                          className={`text-[11px] mt-[3px] underline
                          ${
                            user.accessRequestStatus.status === 'Rejected'
                              ? 'text-red-600'
                              : user.accessRequestStatus.status === 'Approved'
                              ? 'text-green-600'
                              : 'text-[#6b7280]'
                          }`}
                          style={{
                            // color: text_variant_1,
                            fontFamily: 'font_400',
                          }}
                        >
                          {user.accessRequestStatus.status}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View
                    className={`${
                      firestoreUser.isAdmin !== true ? 'hidden' : 'flex flex-1'
                    } w-full flex-row mt-4`}
                  >
                    <TouchableOpacity
                      className={`${
                        user.accessRequestStatus.status === 'Approved'
                          ? 'hidden'
                          : 'flex'
                      } rounded-[10px] min-w-[80px] px-4 items-center 
                justify-center py-[0] min-h-[40px] mr-2`}
                      style={{
                        // fontFamily: 'font_200',
                        backgroundColor: background_variant_2,
                      }}
                      onPress={() =>
                        handleApproveAccessRequest(user, 'approving access')
                      }
                    >
                      {isProcessing?.userDocumentId === user.userDocumentId &&
                      isProcessing?.process == 'approving access' ? (
                        <ActivityIndicator size='small' color='#dbeafe' />
                      ) : (
                        <Text
                          className='text-[12px]'
                          style={{
                            color: text_variant_5,
                            fontFamily: 'font_500',
                          }}
                        >
                          Approve Access
                        </Text>
                      )}
                    </TouchableOpacity>
                    <TouchableOpacity
                      className={`${
                        user.accessRequestStatus.status === 'Approved'
                          ? 'flex'
                          : 'hidden'
                      } rounded-[10px] min-w-[80px] px-4 items-center 
                justify-center py-[0] min-h-[40px] mr-2`}
                      style={{
                        // fontFamily: 'font_200',
                        backgroundColor: background_variant_2,
                      }}
                      onPress={() =>
                        handleRevokeAccessRequest(user, 'revoking access')
                      }
                    >
                      {isProcessing?.userDocumentId === user.userDocumentId &&
                      isProcessing?.process == 'revoking access' ? (
                        <ActivityIndicator size='small' color='#dbeafe' />
                      ) : (
                        <Text
                          className='text-[12px]'
                          style={{
                            color: text_variant_5,
                            fontFamily: 'font_500',
                          }}
                        >
                          Revoke Access
                        </Text>
                      )}
                    </TouchableOpacity>
                    <TouchableOpacity
                      className={`${
                        user.accessRequestStatus.status === 'Approved' ||
                        user.accessRequestStatus.status === 'Rejected'
                          ? 'hidden'
                          : 'flex'
                      } rounded-[10px] min-w-[80px] px-4 items-center justify-center py-[0] 
                min-h-[40px] mr-2`}
                      style={{
                        // fontFamily: 'font_200',
                        backgroundColor: background_variant_5,
                      }}
                      onPress={() =>
                        handleDeclineAccessRequest(user, 'declining access')
                      }
                    >
                      {isProcessing?.userDocumentId === user.userDocumentId &&
                      isProcessing?.process == 'declining access' ? (
                        <ActivityIndicator
                          size='small'
                          color={text_variant_2}
                        />
                      ) : (
                        <Text
                          className='text-[12px] text-blue-700'
                          style={{ fontFamily: 'font_500' }}
                        >
                          Decline Access
                        </Text>
                      )}
                    </TouchableOpacity>
                    <TouchableOpacity
                      className={`${
                        user.isAdmin === false && user.accessRequestStatus.status === 'Approved' ? 'flex' : 'hidden'
                      } rounded-[10px] min-w-[80px] px-4 items-center justify-center py-[0] 
                min-h-[40px] mr-2`}
                      style={{
                        // fontFamily: 'font_200',
                        backgroundColor: background_variant_5,
                      }}
                      onPress={() =>
                        handleMakeAdmin(
                          user,
                          'approving admin privilege'
                        )
                      }
                    >
                      {isProcessing?.userDocumentId === user.userDocumentId &&
                      isProcessing?.process === 'approving admin privilege' ? (
                        <ActivityIndicator
                          size='small'
                          color={text_variant_2}
                        />
                      ) : (
                        <Text
                          className='text-[12px] text-blue-700'
                          style={{ fontFamily: 'font_500' }}
                        >
                          Make Admin
                        </Text>
                      )}
                    </TouchableOpacity>
                    <TouchableOpacity
                      className={`${
                        user.isAdmin === true && user.accessRequestStatus.status === 'Approved' ? 'flex' : 'hidden'
                      } rounded-[10px] min-w-[80px] px-4 items-center justify-center py-[0] 
                min-h-[40px] mr-2`}
                      style={{
                        // fontFamily: 'font_200',
                        backgroundColor: background_variant_5,
                      }}
                      onPress={() =>
                        handleRemoveAdmin(
                          user,
                          'revoking admin privilege'
                        )
                      }
                    >
                      {isProcessing?.userDocumentId === user.userDocumentId &&
                      isProcessing?.process === 'revoking admin privilege' ? (
                        <ActivityIndicator
                          size='small'
                          color={text_variant_2}
                        />
                      ) : (
                        <Text
                          className='text-[12px] text-blue-700'
                          style={{ fontFamily: 'font_500' }}
                        >
                          Remove Admin
                        </Text>
                      )}
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
        </View>
      </ScrollView>
    </View>
  );
};

export default Notifications;
