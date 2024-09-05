// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/

import Ionicons from '@expo/vector-icons/Ionicons';
import { type IconProps } from '@expo/vector-icons/build/createIconSet';
import { type ComponentProps } from 'react';

export function TabBarIcons({
  style,
  size,
  ...rest
}: IconProps<ComponentProps<typeof Ionicons>['name']>) {
  return (
    <Ionicons size={size} style={[{ marginBottom: -3 }, style]} {...rest} />
  );
}
