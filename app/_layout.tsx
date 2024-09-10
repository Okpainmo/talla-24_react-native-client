import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
// import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import AuthContextProvider from '@/context/Auth.context';
import UserContextProvider from '@/context/User.context';

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

import { useColorScheme } from '@/hooks/useColorScheme';
import {
  useFonts,
  Poppins_100Thin,
  Poppins_200ExtraLight,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
  Poppins_900Black,
} from '@expo-google-fonts/poppins';

// restating font-name for easier retraction and remembrance during development
const font_100 = Poppins_100Thin;
const font_200 = Poppins_200ExtraLight;
const font_300 = Poppins_300Light;
const font_400 = Poppins_400Regular;
const font_500 = Poppins_500Medium;
const font_600 = Poppins_600SemiBold;
const font_700 = Poppins_700Bold;
const font_800 = Poppins_800ExtraBold;
const font_900 = Poppins_900Black;

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  let [fontsLoaded] = useFonts({
    font_100,
    font_200,
    font_300,
    font_400,
    font_500,
    font_600,
    font_700,
    font_800,
    font_900,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <StatusBar
        // backgroundColor={background_variant_1}
        barStyle={'dark-content'}
      />
      <AuthContextProvider>
        <UserContextProvider>
          <ThemeProvider
            value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
          >
            <Stack>
              <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
              <Stack.Screen name='(auth)' options={{ headerShown: false }} />
              <Stack.Screen name='(misc)' options={{ headerShown: false }} />
              <Stack.Screen name='index' options={{ headerShown: false }} />
              {/* <Stack.Screen name="+not-found" /> */}
            </Stack>
          </ThemeProvider>
        </UserContextProvider>
      </AuthContextProvider>
    </>
  );
}
