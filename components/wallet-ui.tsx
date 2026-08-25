import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { ComponentProps, ReactNode } from 'react';
import { Image, StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';

export const palette = {
  background: '#F8F9FC',
  surface: '#FFFFFF',
  navy: '#091534',
  muted: '#70798C',
  faint: '#A7AFC0',
  border: '#E8EAF0',
  blue: '#0868F7',
  blueSoft: '#EAF0FF',
  green: '#059B72',
  red: '#D81F35',
};

type IconName = ComponentProps<typeof MaterialCommunityIcons>['name'];

export function WalletText({
  children,
  style,
  numberOfLines,
}: {
  children: ReactNode;
  style?: StyleProp<TextStyle>;
  numberOfLines?: number;
}) {
  return (
    <Text numberOfLines={numberOfLines} style={[styles.text, style]}>
      {children}
    </Text>
  );
}

export function IconBubble({
  name,
  color,
  backgroundColor,
  size = 42,
  iconSize = 23,
}: {
  name: IconName;
  color: string;
  backgroundColor: string;
  size?: number;
  iconSize?: number;
}) {
  return (
    <View
      style={[
        styles.iconBubble,
        { width: size, height: size, borderRadius: size / 2, backgroundColor },
      ]}>
      <MaterialCommunityIcons color={color} name={name} size={iconSize} />
    </View>
  );
}

export function MayaAvatar({ size = 48 }: { size?: number }) {
  return (
    <View style={{ width: size, height: size, borderRadius: size / 2, overflow: 'hidden' }}>
      <Image
        accessibilityLabel={'Maya Bennett'}
        resizeMode={'stretch'}
        source={require('../design/01_Home.png')}
        style={{
          position: 'absolute',
          width: size * 9.16,
          height: size * 19.85,
          left: -size * 0.71,
          top: -size * 1.39,
        }}
      />
    </View>
  );
}

export function Surface({ children, style }: { children: ReactNode; style?: StyleProp<ViewStyle> }) {
  return <View style={[styles.surface, style]}>{children}</View>;
}

export function Chevron({ color = '#818A9A' }: { color?: string }) {
  return <MaterialCommunityIcons color={color} name={'chevron-right'} size={24} />;
}

const styles = StyleSheet.create({
  text: { color: palette.navy, fontSize: 15 },
  surface: {
    backgroundColor: palette.surface,
    borderColor: palette.border,
    borderRadius: 15,
    borderWidth: 1,
  },
  iconBubble: { alignItems: 'center', justifyContent: 'center' },
});
