import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Platform,
  Pressable,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from 'react-native';
import { Link, router } from 'expo-router';
import React, { useState, useContext, useEffect } from 'react';
import {
  default_light_backgrounds,
  default_light_texts,
} from '@/constants/colours';
import { Ionicons } from '@expo/vector-icons';
// @ts-ignore - false error
import EmptyActivityLogSVG from '../../assets/images/img-1.svg';
import { GlobalsContext } from '@/context/Globals.context';
import { AuthContext } from '@/context/Auth.context';
import { UserContext } from '@/context/User.context';

import GlobalModal from '@/components/Layout/GlobalModal';
import { auth } from '../../firebaseConfig';
import { getAuth } from 'firebase/auth';

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
import AboutModal from '@/components/AboutModal';
import Emoji from '@/components/Emoji';

const Home = () => {
  getAuth().onAuthStateChanged((user) => {
    if (!user) router.replace('/');
  });

  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    console.log('current user', user);
  }, []);

  const [showAboutModal, setShowAboutModal] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState<{
    userName: string;
    id: string;
    email: string;
  } | null>(null);
  const globalsContext = useContext(GlobalsContext);
  const authContext = useContext(AuthContext);
  const userContext = useContext(UserContext);

  // Ensure context is not undefined
  if (!globalsContext || !authContext || !userContext) {
    throw new Error('error: context error');
  }

  // Now it's safe to access `testing` after the type check
  const { showModal, hideModal } = globalsContext;
  const { loading, handleLogout } = authContext;
  const { fetchUser, getUserData, firestoreUser } = userContext;

  // async function getUser() {
  //   const user = await getUserData();

  //   if (user) {
  //     console.log("home user", user)
  //     setLoggedInUser(user);
  //   }
  // }

  useEffect(() => {
    fetchUser();
    // getUser();
  }, []);

  return (
    <View
      style={{
        backgroundColor: background_variant_1,
        paddingTop: Platform.OS === 'android' ? 50 : 0,
      }}
      className='w-full flex-1 relative'
    >
      <AboutModal
        showAboutModal={showAboutModal}
        setShowAboutModal={setShowAboutModal}
      />
      <View
        className={`${
          Platform.OS === 'ios' && 'hidden'
        } h-[10px] w-full relative z-40`}
        style={{ backgroundColor: background_variant_1 }}
      >
        {/* { shadow decoy for android only} */}
      </View>
      <View
        className='header flex flex-row items-center px-3 justify-between top-[-5px] relative'
        style={{
          backgroundColor: background_variant_1,
          shadowColor: text_variant_1,
          shadowOpacity: 0.1,
          shadowRadius: 10,
          shadowOffset: {
            width: 0,
            height: 0,
          },
          elevation: Platform.OS === 'android' ? 2 : 0,
        }}
      >
        <View>
          <Text
            className='text-[28px]'
            style={{ fontFamily: 'font_600', color: text_variant_1 }}
          >
            Home
          </Text>
        </View>

        <View className='flex-row justify-end gap-x-5 items-center'>
          <Pressable
            onPress={() => router.push('/notifications')}
            // style={{ borderColor: text_variant_1 }}
            // className={`mb-10 w-[40px] h-[40px] rounded-full border flex items-center justify-center`}
          >
            <Ionicons
              name='notifications-outline'
              size={26}
              color={text_variant_1}
            />
          </Pressable>
          <Pressable
            onPress={() => setShowAboutModal(true)}
            // style={{ borderColor: text_variant_1 }}
            // className={`mb-10 w-[40px] h-[40px] rounded-full border flex items-center justify-center`}
          >
            <Ionicons
              name='help-circle-outline'
              size={28}
              color={text_variant_1}
            />
          </Pressable>
        </View>
      </View>
      <ScrollView className='relative top-[-5px]'>
        <View className='px-3 pt-[20px]'>
          <View
            className='rounded-[15px] py-5'
            style={{ backgroundColor: background_variant_2 }}
          >
            <View className='px-5 flex-row'>
              <Text
                className='text-base mr-[4px]'
                style={{ fontFamily: 'font_500', color: text_variant_5 }}
              >
                Hello {firestoreUser?.userName.split(" ")[0]}
              </Text>
              <Emoji label='waving emoji to welcome user' symbol='👋' />
            </View>
            <View className='px-5 mt-6'>
              <Text
                className='text-[22px]'
                style={{ fontFamily: 'font_600', color: text_variant_5 }}
              >
                Talla 24
              </Text>
            </View>
            <View className='hardware-status-wrapper px-5 flex flex-row'>
              <Text style={{ color: text_variant_5, fontFamily: 'font_400' }}>
                Hardware Status:
              </Text>

              <Text
                className='ml-2 underline'
                style={{ fontFamily: 'font_500', color: text_variant_5 }}
              >
                offline
              </Text>
            </View>
          </View>
          <View className='mt-5 flex-1 flex-row'>
            <View
              className='border rounded-[15px] p-4 flex-1 mr-2'
              style={{ borderColor: text_variant_3 }}
            >
              <View
                className='flex flex-1 mr-2 justify-between flex-row 
          items-center'
              >
                <Text
                  className='text-[12px]'
                  style={{ fontFamily: 'font_400' }}
                >
                  Devices
                </Text>
                <Ionicons
                  name='phone-portrait-outline'
                  size={26}
                  color={text_variant_1}
                />
              </View>
              <View className='mt-4 py-4 flex-1 justify-center items-center'>
                <Text
                  className='text-4xl'
                  style={{ color: text_variant_2, fontFamily: 'font_300' }}
                >
                  1
                </Text>
                <Text
                  className='text-[12px] mt-2'
                  style={{ color: text_variant_2, fontFamily: 'font_400' }}
                >
                  Connected
                </Text>
              </View>
            </View>
            <View
              className='border rounded-[15px] p-4 flex-1 ml-2'
              style={{ borderColor: text_variant_3 }}
            >
              <View
                className='flex flex-1 mr-2 justify-between flex-row 
          items-center'
              >
                <Text
                  className='text-[12px]'
                  style={{ fontFamily: 'font_400' }}
                >
                  Accounts
                </Text>
                <Ionicons
                  name='people-outline'
                  size={28}
                  color={text_variant_1}
                />
              </View>
              <View className='flex flex-row'>
                <View
                  className='mt-4 flex-1 justify-center items-center border-r pr-4 py-4'
                  style={{ borderColor: text_variant_3 }}
                >
                  <Text
                    className='text-4xl'
                    style={{ color: text_variant_2, fontFamily: 'font_300' }}
                  >
                    1
                  </Text>
                  <Text
                    className='text-[12px] mt-2'
                    style={{ color: text_variant_2, fontFamily: 'font_400' }}
                  >
                    Online
                  </Text>
                </View>
                <View className='mt-4 flex-1 justify-center items-center ml-4'>
                  <Text
                    className='text-4xl'
                    style={{ color: text_variant_1, fontFamily: 'font_300' }}
                  >
                    25
                  </Text>
                  <Text
                    className='text-[12px] mt-2'
                    style={{ color: text_variant_1, fontFamily: 'font_400' }}
                  >
                    Offline
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View className='activity-log-section px-3'>
          <Text
            className='text-[20px] mt-4 mb-2'
            style={{ fontFamily: 'font_500', color: text_variant_1 }}
          >
            Activity Log
          </Text>
          <View
            className='border rounded-[15px] p-4 flex-1 flex-row mb-[150px]'
            style={{ borderColor: text_variant_3 }}
          >
            <View className='w-[60%]'>
              <Text className='text-[12px]' style={{ fontFamily: 'font_400' }}>
                Users and hardware activity information will appear here, when
                the activity-logs feature is set up.
              </Text>
              <View className='flex-1 w-full flex-row mt-8'>
                <Link
                  href={'/stream'}
                  className='rounded-[10px] px-4 flex items-center justify-center py-3 mr-2'
                  style={{
                    // fontFamily: 'font_200',
                    backgroundColor: background_variant_2,
                  }}
                  asChild
                >
                  <TouchableOpacity
                    className='rounded-[10px] min-w-[80px] px-4 flex items-center 
                justify-center py-[0] min-h-[40px] mr-2'
                    style={{
                      // fontFamily: 'font_200',
                      backgroundColor: background_variant_2,
                    }}
                    // onPress={() =>
                    //   handleApproveAccessRequest(`${each.id}`, `${each.email}`)
                    // }
                  >
                    <Text
                      className='text-[12px]'
                      style={{
                        color: text_variant_5,
                        fontFamily: 'font_500',
                      }}
                    >
                      Stream
                    </Text>
                  </TouchableOpacity>
                </Link>
                <Link
                  // href={'/log-in'}
                  href='/home'
                  className='rounded-[10px] px-4 flex items-center justify-center py-3 
                mr-2'
                  style={{
                    // fontFamily: 'font_200',
                    backgroundColor: background_variant_5,
                  }}
                  asChild
                >
                  <TouchableOpacity
                    className='rounded-[10px] min-w-[80px] px-4 flex items-center justify-center py-[0] 
                min-h-[40px] mr-2'
                    style={{
                      // fontFamily: 'font_200',
                      backgroundColor: background_variant_5,
                    }}
                    onPress={() => handleLogout()}
                  >
                    {loading ? (
                      <ActivityIndicator size='small' color={text_variant_2} />
                    ) : (
                      <Text
                        className='text-[12px] text-blue-700'
                        style={{ fontFamily: 'font_500' }}
                      >
                        Logout
                      </Text>
                    )}
                  </TouchableOpacity>
                </Link>
              </View>
            </View>
            <View className='absolute right-[10px] bottom-0'>
              <EmptyActivityLogSVG width={110} height={110} />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
