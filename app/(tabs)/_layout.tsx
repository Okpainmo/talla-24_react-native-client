import { Tabs } from 'expo-router';
import React, { useState } from 'react';
import { default_light_backgrounds } from '@/constants/colours';
import { default_light_texts } from '@/constants/colours';
import { TabBarIcons } from '@/constants/icons';
import { StyleSheet } from 'react-native';

// import { TabBarIcon } from '@/components/navigation/TabBarIcon';
// import { Colors } from '@/constants/colors';
// import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const [backgrounds, setBackgrounds] = useState(default_light_backgrounds);
  const [texts, setTexts] = useState(default_light_texts);
  const {
    background_variant_1,
    background_variant_2,
    background_variant_3,
    background_variant_4,
  } = backgrounds;
  const {
    text_variant_1,
    text_variant_2,
    text_variant_3,
    text_variant_4,
    text_variant_5,
  } = texts;
  // const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: `${text_variant_2}`,
        tabBarInactiveTintColor: `${text_variant_1}`,
        // tabBarShowLabel: false,
        headerShown: false,
        tabBarLabelPosition: 'below-icon',
        tabBarLabelStyle: {
          paddingTop: 2,
          paddingBottom: 3,
          fontFamily: 'font_500',
          color: `${text_variant_1}`,
        },
        tabBarIconStyle: {
          marginTop: 5,
        },
        tabBarStyle: {
          backgroundColor: `${background_variant_1}`,
          borderTopWidth: StyleSheet.hairlineWidth,
          borderTopColor: `${text_variant_3}`,
          minHeight: 60,
          // paddingVertical: 10,
        },
      }}
    >
      <Tabs.Screen
        name='home'
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcons
              name={focused ? 'home' : 'home-outline'}
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='stream'
        options={{
          title: 'Stream',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcons
              name={focused ? 'game-controller' : 'game-controller-outline'}
              color={color}
              size={27}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='account'
        options={{
          title: 'Account',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcons
              name={focused ? 'person-circle' : 'person-circle-outline'}
              color={color}
              size={30}
            />
          ),
        }}
      />
    </Tabs>
  );
}
