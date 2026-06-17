import React from 'react';
import {Text, TextProps} from 'react-native';

interface RegularTextProps extends TextProps {
  children: React.ReactNode;
  color?: string;
  size?: number;
}

export function RegularText({
  children,
  color = '#000',
  size = 14,
  style,
  ...rest
}: RegularTextProps) {
  return (
    <Text style={[ {fontSize: size, color, fontWeight: '400' },style]}
      {...rest}>
      {children}
    </Text>
  );
}



interface SemiBoldTextProps extends TextProps {
  children: React.ReactNode;
  color?: string;
  size?: number;
}

export function SemiBoldText({
  children,
  color = '#000',
  size = 14,
  style,
  ...rest
}: SemiBoldTextProps) {
  return (
    <Text style={[{ fontSize: size, color, fontWeight: '600' }, style ]}
      {...rest}>
      {children}
    </Text>
  );
}



interface BoldTextProps extends TextProps {
  children: React.ReactNode;
  color?: string;
  size?: number;
}

export function BoldText({
  children,
  color = '#000',
  size = 14,
  style,
  ...rest
}: BoldTextProps) {
  return (
    <Text style={[{ fontSize: size, color, fontWeight: '700' }, style]}
      {...rest}>
      {children}
    </Text>
  );
}


