
import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

import {useTheme} from '../theme/ThemeProvider';
import {BoldText, RegularText} from '../utils/Texts';
import {BalanceBanner} from '../components/Home/Balancebanner';
import {QuickActions} from '../components/Home/QuickActions';

const recentActivities = [
  {
    id: '1',
    icon: 'cart-outline',
    title: 'Groceries',
    subtitle: 'D-Mart',
    amount: '₹1,250',
    time: '10:45 AM',
  },
  {
    id: '2',
    icon: 'car-outline',
    title: 'Transport',
    subtitle: 'Uber Ride',
    amount: '₹320',
    time: '08:30 AM',
  },
  {
    id: '3',
    icon: 'restaurant-outline',
    title: 'Food',
    subtitle: 'McDonalds',
    amount: '₹540',
    time: '01:15 PM',
  },
  {
    id: '4',
    icon: 'film-outline',
    title: 'Entertainment',
    subtitle: 'Movie Ticket',
    amount: '₹800',
    time: '07:45 PM',
  },
];

const HomeScreen = () => {
  const {theme} = useTheme();
  const navigation: any = useNavigation();

  const renderActivity = ({item}: any) => (
    <View
      style={[
        styles.activityCard,
        {
          backgroundColor: theme.colors.background,
          borderColor: theme.colors.border,
        },
      ]}>
      <View
        style={[
          styles.iconContainer,
          {backgroundColor: theme.colors.card},
        ]}>
        <Ionicons
          name={item.icon}
          size={22}
          color={theme.colors.primary}
        />
      </View>

      <View style={styles.activityContent}>
        <BoldText color={theme.colors.text}>{item.title}</BoldText>
        <RegularText color={theme.colors.text}>
          {item.subtitle}
        </RegularText>
      </View>

      <View style={styles.right}>
        <BoldText color={theme.colors.text}>
          {item.amount}
        </BoldText>
        <RegularText color={theme.colors.text}>
          {item.time}
        </RegularText>
      </View>

      <View style={styles.rightContent}>
        <Ionicons
            name= "arrow-forward-outline"
            size={22}
            color={theme.colors.primary}
          />
      </View>
    </View>
  );

  return (
    <SafeAreaView
      style={[
        styles.container,
        {backgroundColor: theme.colors.card},
      ]}>
      <FlatList
        data={recentActivities}
        keyExtractor={item => item.id}
        renderItem={renderActivity}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 30}}
        ListHeaderComponent={
          <>
            {/* Header */}
            <View style={styles.headerContainer}>
              <BoldText
                size={24}
                color={theme.colors.text}>
                Hi User 👋,
              </BoldText>

              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(
                    'NotificationScreen',
                  )
                }
                style={[
                  styles.notificationButton,
                  {
                    backgroundColor:
                      theme.colors.card,
                    borderColor:
                      theme.colors.border,
                  },
                ]}>
                <Ionicons
                  name="notifications-outline"
                  size={22}
                  color={theme.colors.text}
                />
              </TouchableOpacity>
            </View>

            {/* Banner */}
            <BalanceBanner
              theme={theme}
              totalSpent={24500}
              budget={50000}
              remaining={25500}
              usedPercentage={49}
            />

            {/* Quick Actions */}
            <QuickActions
              theme={theme}
              onAddExpense={() =>
                navigation.navigate('AddScreen')
              }
              onSetupBudget={() =>
                navigation.navigate(
                  'BudgetScreen',
                )
              }
              onSetupCategory={() =>
                navigation.navigate(
                  'CategorySetupScreen',
                )
              }
              onViewCategories={() =>
                navigation.navigate(
                  'CategoriesScreen',
                )
              }
            />

            {/* Section Title */}
            <View style={styles.sectionHeader}>
              <BoldText
                size={18}
                color={theme.colors.text}>
                Recent Activities
              </BoldText>
            </View>
          </>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },

  headerContainer: {
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  notificationButton: {
    width: 46,
    height: 46,
    borderRadius: 23,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },

  sectionHeader: {
    marginTop: 24,
    marginBottom: 12,
  },

  activityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    marginBottom: 12,
    borderRadius: 16,
    borderWidth: 1,
  },

  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },

  activityContent: {
    flex: 1,
    marginLeft: 12,
  },

  right : {
    marginRight : 20,
    alignItems: 'flex-end',
  },
  
  rightContent: {
    alignItems: 'flex-end',
  },
});

export default HomeScreen;
