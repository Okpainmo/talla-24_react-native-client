import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Platform,
  Pressable,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { Link, router } from 'expo-router';
import React, { useState, useContext } from 'react';
import {
  default_light_backgrounds,
  default_light_texts,
} from '@/constants/colours';
import { Ionicons } from '@expo/vector-icons';
// @ts-ignore - false error
import EmptyActivityLogSVG from '../../assets/images/img-1.svg';
import { GlobalsContext } from '@/context/Globals.context';

import GlobalModal from '@/components/Layout/GlobalModal';

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

interface AboutModalProps {
  showAboutModal: boolean;
  setShowAboutModal: React.Dispatch<React.SetStateAction<boolean>>;
}

function AboutModal({ showAboutModal, setShowAboutModal }: AboutModalProps) {
  //   const [showAboutModal, setShowAboutModal] = useState(false);

    return (
      <View
        className={`modal-background-overlay ${
          showAboutModal ? 'flex' : 'hidden'
        } absolute top-0 left-0 right-0 z-[100] h-screen`}
        style={{
          backgroundColor: background_variant_6,
          //   paddingTop: 50,
          //   height: '100%',
          // width: '100%',
          // padding: 10,
          // borderRadius: 10,
        }}
      >
        {/* Modal background overlay */}
        <Modal
          animationType='slide'
          transparent={true}
          visible={showAboutModal}
          // style={{ height: 300 }}
        >
          <View
            className='modal-content flex-1 flex flex-col-reverse'
            style={
              {
                //   backgroundColor: background_variant_6,
                //   height: '100%',
                // width: '100%',
                // padding: 10,
                // borderRadius: 10,
              }
            }
          >
            <View
              className='rounded-tl-[20px] rounded-tr-[20px] '
              style={{
                backgroundColor: background_variant_1,
                height: '85%',
                // width: '100%',
                // padding: 10,
                // borderRadius: 10,
              }}
            >
              <View
                className='w-[40px] h-[7px] mx-auto rounded-full mt-[20px]'
                style={{ backgroundColor: background_variant_6 }}
              >
                {/* just a stylish modal top elements */}
              </View>
              <View
                className='modal-header flex flex-row items-center px-3 pb-[7px]
           pt-[20px]'
                style={{
                  backgroundColor: background_variant_1,
                  //   marginTop: Platform.OS === 'android' ? 10 : 0,
                  // paddingBottom: Platform.OS === 'android' ? 10 : 0,
                }}
                // style={{  }}
              >
                <Pressable
                  onPress={() => setShowAboutModal(false)}
                  style={{ borderColor: text_variant_3 }}
                  className={`mr-6 w-[35px] h-[35px] rounded-full border flex items-center 
                justify-center`}
                >
                  <Ionicons
                    name='close-outline'
                    size={25}
                    color={text_variant_3}
                  />
                </Pressable>
                <Text
                  className='text-[25px] h-[40px] mt-1'
                  style={{ color: text_variant_1, fontFamily: 'font_800' }}
                >
                  Talla 24.
                </Text>
              </View>
              <ScrollView
                className='modal-content h-[100%] 
        overflow-y-auto w-full px-3'
                style={{
                  backgroundColor: background_variant_1,
                  // paddingBottom: Platform.OS === 'android' ? 10 : 0,
                }}
              >
                <View className='pb-[100px]'>
                  <Text
                    className='text-[12px] leading-[25px]'
                    style={{ fontFamily: 'font_400' }}
                  >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Ducimus et qui reprehenderit soluta, iusto incidunt in eius
                    culpa laudantium dolore voluptas nisi, quaerat cupiditate
                    similique exercitationem, modi vitae voluptate? Natus ab
                    deleniti dolorum odio officia voluptatibus commodi laborum
                    sed facilis deserunt error quia quas rem provident porro cum
                    inventore, ipsam, hic soluta ut? Quaerat iusto soluta
                    ratione, similique in quas voluptate nobis quis doloremque
                    vel odit dolores non perferendis qui perspiciatis, dolore
                    magnam. Velit qui repellendus quia quis modi nemo explicabo
                    dolorem facere delectus recusandae obcaecati officiis
                    cupiditate tempora, aperiam, amet, blanditiis deleniti
                    impedit asperiores. Voluptas deserunt porro quisquam sunt!
                  </Text>
                  <Text
                    className='text-[12px] leading-[25px] mt-6'
                    style={{ fontFamily: 'font_400' }}
                  >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Ducimus et qui reprehenderit soluta, iusto incidunt in eius
                    culpa laudantium dolore voluptas nisi, quaerat cupiditate
                    similique exercitationem, modi vitae voluptate? Natus ab
                    deleniti dolorum odio officia voluptatibus commodi laborum
                    sed facilis deserunt error quia quas.
                  </Text>
                  <Text
                    className='text-[12px] leading-[25px] mt-6'
                    style={{ fontFamily: 'font_400' }}
                  >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Ducimus et qui reprehenderit soluta, iusto incidunt in eius
                    culpa laudantium dolore voluptas nisi, quaerat cupiditate
                    similique exercitationem, modi vitae voluptate? Natus ab
                    deleniti dolorum odio officia voluptatibus commodi laborum
                    sed facilis deserunt error quia quas. dolore voluptas nisi,
                    quaerat cupiditate similique exercitationem, modi vitae
                    voluptate? Natus ab deleniti dolorum odio officia
                    voluptatibus commodi laborum sed facilis deserunt error quia
                    quas.
                  </Text>
                  <Text
                    className='text-[12px] leading-[25px] mt-6'
                    style={{ fontFamily: 'font_400' }}
                  >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Ducimus et qui reprehenderit soluta, iusto incidunt in eius
                    culpa laudantium dolore voluptas nisi, quaerat cupiditate
                    similique exercitationem, modi vitae voluptate? Natus ab
                    deleniti dolorum odio officia voluptatibus commodi laborum
                    sed facilis deserunt error quia quas.
                  </Text>
                </View>
              </ScrollView>
            </View>
          </View>
        </Modal>
      </View>
    );
}

export default AboutModal;
