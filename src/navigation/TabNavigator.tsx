import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import ProfileScreen from '../screens/ProfileScreen';
import AddScreen from '../screens/AddScreen';
import OverviewScreen from '../screens/OverviewScreen';
import HistoryScreen from '../screens/HistoryScreen';
import HomeTabScreens from './HomeStack';
import { useTheme } from '../theme/ThemeProvider';
import OverViewTab from './OverviewStack';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const {theme} = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,


        tabBarIcon: ({color, size}) => {
          let iconName = '';

          switch (route.name) {
            case 'HomeTabScreens':
              iconName = 'home';
              break;

            case 'Profile':
              iconName = 'person';
              break;

            case 'Add':
              iconName = 'add-circle';
              break;

            case 'OverViewTab':
              iconName = 'pie-chart';
              break;

            case 'History':
              iconName = 'time';
              break;

            default:
              iconName = 'ellipse';
          }

          return (
            <Ionicons
              name={iconName}
              size={size}
              color={color}
            />
          );
        },

        tabBarStyle: { backgroundColor: theme.colors.card , paddingTop : 2, paddingBottom : 2, height: 60, borderColor : theme.colors.background, borderWidth : 1},
        tabBarActiveTintColor: theme.colors.primary,
        tabBarLabelStyle: { color: theme.colors.text },

        
      })}>
      <Tab.Screen
        name="HomeTabScreens"
        component={HomeTabScreens}

        listeners={({ navigation }) => ({
          tabPress: e => {
            navigation.navigate('HomeTabScreens', {
              screen: 'HomeScreen',
            });
          },
        })}
        
      />

      <Tab.Screen
        name="OverViewTab"
        component={OverViewTab}
        listeners={({ navigation }) => ({
          tabPress: e => {
            navigation.navigate('OverViewTab', {
              screen: 'OverviewScreen',
            });
          },
        })}
      />

      <Tab.Screen
        name="Add"
        component={AddScreen}
      />

      <Tab.Screen
        name="History"
        component={HistoryScreen}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
}