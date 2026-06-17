import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

import { BoldText }  from '../utils/Texts';
import {useTheme} from '../theme/ThemeProvider';

interface ScreenHeaderProps {
  title: string;

  showBack?: boolean;
  showNotification?: boolean;
  showSearch?: boolean;
  showClose?: boolean;

  onSearchPress?: () => void;
  onNotificationPress?: () => void;
  onClosePress?: () => void;
}

export default function ScreenHeader({
  title,

  showBack = false,
  showNotification = false,
  showSearch = false,
  showClose = false,

  onSearchPress,
  onNotificationPress,
  onClosePress,
}: ScreenHeaderProps) {
  const navigation = useNavigation();
  const {theme} = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.background,
          borderBottomColor: theme.colors.border,
        },
      ]}>
      {/* LEFT */}

      <View style={styles.leftContainer}>
        {showBack && (
          <TouchableOpacity
            onPress={() => navigation.goBack()}>
            <Ionicons
              name="arrow-back"
              size={24}
              color={theme.colors.text}
            />
          </TouchableOpacity>
        )}
      </View>

      {/* CENTER */}

      <BoldText
        size={18}
        color={theme.colors.text}>
        {title}
      </BoldText>

      {/* RIGHT */}

      <View style={styles.rightContainer}>
        {showSearch && (
          <TouchableOpacity
            style={styles.icon}
            onPress={onSearchPress}>
            <Ionicons
              name="search"
              size={22}
              color={theme.colors.text}
            />
          </TouchableOpacity>
        )}

        {showNotification && (
          <TouchableOpacity
            style={styles.icon}
            onPress={onNotificationPress}>
            <Ionicons
              name="notifications-outline"
              size={22}
              color={theme.colors.text}
            />
          </TouchableOpacity>
        )}

        {showClose && (
          <TouchableOpacity
            style={styles.icon}
            onPress={
              onClosePress
                ? onClosePress
                : () => navigation.goBack()
            }>
            <Ionicons
              name="close"
              size={24}
              color={theme.colors.text}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    paddingHorizontal: 16,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    borderBottomWidth: 1,
  },

  leftContainer: {
    width: 40,
    justifyContent: 'center',
  },

  rightContainer: {
    width: 80,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  icon: {
    marginLeft: 12,
  },
});