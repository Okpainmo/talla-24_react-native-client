import colours from '@/constants/_colours';
import { defaultStyles } from '@/constants/styles';
import { useAssets } from 'expo-asset';
import { ResizeMode, Video } from 'expo-av';
import { Link } from 'expo-router';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {
  default_light_backgrounds,
  default_light_texts,
} from '@/constants/colours';

const {
  background_variant_1,
  background_variant_2,
  background_variant_3,
  background_variant_4,
} = default_light_backgrounds || {};
const {
  text_variant_1,
  text_variant_2,
  text_variant_3,
  text_variant_4,
  text_variant_5,
} = default_light_texts || {};

const IndexScreen = () => {
  const [assets] = useAssets([require('@/assets/videos/intro-video.mp4')]);

  return (
    <View
      // style={styles.container}
      className='flex flex-1 space-between relative'
    >
      {assets && (
        <Video
          resizeMode={ResizeMode.COVER}
          isMuted
          isLooping
          shouldPlay
          // useNativeControls
          // source={{
          //   uri: 'https://cdn.pixabay.com/video/2024/04/18/208442_large.mp4',
          // }}
          source={{ uri: assets[0].uri }}
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
          }}
        />
      )}
      <View style={{ marginTop: 80, padding: 20 }}>
        <Text
          className='text-5xl pt-4'
          style={{ color: text_variant_5, fontFamily: 'font_600' }}
        >
          Talla 24
        </Text>
      </View>

      <View className='flex-1 w-full flex-row absolute bottom-[50px] h-[55px] px-3'>
        <Link
          href={'/request-access'}
          className='rounded-[10px] px-10 flex items-center justify-center py-4 flex-1 mr-3'
          style={{
            fontFamily: 'font_200',
            backgroundColor: background_variant_2,
          }}
          asChild
        >
          <TouchableOpacity>
            <Text style={{ color: text_variant_5, fontFamily: 'font_600' }}>
              Request access
            </Text>
          </TouchableOpacity>
        </Link>
        <Link
          href={'/log-in'}
          className='rounded-[10px] flex items-center justify-center py-4 flex-1 ml-3'
          style={{
            fontFamily: 'font_200',
            backgroundColor: background_variant_1,
          }}
          asChild
        >
          <TouchableOpacity>
            <Text style={{ color: text_variant_2, fontFamily: 'font_600' }}>
              Log in
            </Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
};

export default IndexScreen;
