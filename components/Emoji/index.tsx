import React from 'react';
import { Text } from 'react-native';

function Emoji({ label, symbol }: { label: string; symbol: string }) {
  return (
    <Text
      className='emoji text-2xl translate-y-[-5px]'
      //   role='img'
      //   aria-label={label !== undefined ? label : ''}
      //   aria-hidden={label ? 'false' : 'true'}
    >
      {symbol}
    </Text>
  );
}

export default Emoji;
