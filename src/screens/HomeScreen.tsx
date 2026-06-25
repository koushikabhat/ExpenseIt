import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  StatusBar,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

import {useTheme} from '../theme/ThemeProvider';
import {BoldText, RegularText, SemiBoldText} from '../utils/Texts';
import {QuickActions} from '../components/Home/QuickActions';
import {AppTheme} from '../theme/constant';


const BUDGET      = 50000;
const TOTAL_SPENT = 24500;
const REMAINING   = BUDGET - TOTAL_SPENT;
const USED_PCT    = Math.round((TOTAL_SPENT / BUDGET) * 100);

const recentActivities = [
  {id: '1', icon: 'cart-outline',       title: 'Groceries',     subtitle: 'D-Mart',        amount: '₹1,250', time: '10:45 AM'},
  {id: '2', icon: 'car-outline',        title: 'Transport',     subtitle: 'Uber Ride',     amount: '₹320',   time: '08:30 AM'},
  {id: '3', icon: 'restaurant-outline', title: 'Food',          subtitle: 'McDonalds',     amount: '₹540',   time: '01:15 PM'},
  {id: '4', icon: 'film-outline',       title: 'Entertainment', subtitle: 'Movie Ticket',  amount: '₹800',   time: '07:45 PM'},
];


const HomeScreen = () => {
  const {theme}      = useTheme();
  const navigation: any = useNavigation();
  const styles       = createStyles(theme);

  // Progress bar color reacts to how much budget is consumed
  const progressColor = USED_PCT >= 90 ? theme.colors.danger : USED_PCT >= 70 ? '#F59E0B' : 'rgba(255,255,255,0.9)';

  const renderActivity = ({item}: any) => (
    <TouchableOpacity
      activeOpacity={0.75}
      style={[styles.activityCard, {backgroundColor: theme.colors.card}]}
    >
      {/* Left icon */}
      <View style={[styles.iconContainer, {backgroundColor: `${theme.banner.accent}14`}]}>
        <Ionicons name={item.icon} size={22} color={theme.banner.accent} />
      </View>

      {/* Title + subtitle */}
      <View style={styles.activityContent}>
        <BoldText color={theme.colors.text}>{item.title}</BoldText>
        <RegularText color={theme.colors.text} style={{opacity: 0.5}}>
          {item.subtitle}
        </RegularText>
      </View>

      {/* Amount + time */}
      <View style={styles.right}>
        <BoldText color={theme.colors.text}>{item.amount}</BoldText>
        <RegularText color={theme.colors.text} style={{opacity: 0.45}}>
          {item.time}
        </RegularText>
      </View>

      <Ionicons name="chevron-forward" size={16} color={theme.colors.text} style={{opacity: 0.25}} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <StatusBar barStyle="light-content" backgroundColor={theme.banner.accent} translucent />
      
      <FlatList
        data={recentActivities}
        keyExtractor={item => item.id}
        renderItem={renderActivity}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 36}}
        ListHeaderComponent={
          <>
            <LinearGradient
              colors={[theme.banner.accent, theme.banner.accentSecondary]}
              start={{x: 0.0, y: 0.0}}
              end={{x: 1.0, y: 1.0}}
              style={styles.header}
            >
              {/* Decorative blobs */}
              <View style={styles.blob1} />
              <View style={styles.blob2} />
              <View style={styles.shineStreak} />

              {/* Top nav row */}
              <View style={styles.navRow}>
                <View>
                  <SemiBoldText style={styles.greeting}>Good morning 👋</SemiBoldText>
                  <BoldText style={styles.screenTitle}>Hi, User!</BoldText>
                </View>
                <TouchableOpacity
                  style={styles.notifBtn}
                  onPress={() => navigation.navigate('NotificationScreen')}
                  activeOpacity={0.8}
                >
                  <Ionicons name="notifications-outline" size={20} color="#fff" />
                  <View style={styles.notifDot} />
                </TouchableOpacity>
              </View>

              <View style={styles.summaryRow}>
                {/* Spent */}
                <View style={styles.summaryBox}>
                  <View style={styles.summaryIconRow}>
                    <View style={styles.summaryIconWrap}>
                      <Ionicons name="trending-down-outline" size={14} color="#fff" />
                    </View>
                    <SemiBoldText style={styles.summaryLabel}>Spent</SemiBoldText>
                  </View>
                  <BoldText style={styles.summaryAmount}>
                    ₹{TOTAL_SPENT.toLocaleString()}
                  </BoldText>
                </View>

                {/* Divider */}
                <View style={styles.summaryDivider} />

                {/* Budget */}
                <View style={styles.summaryBox}>
                  <View style={styles.summaryIconRow}>
                    <View style={styles.summaryIconWrap}>
                      <Ionicons name="wallet-outline" size={14} color="#fff" />
                    </View>
                    <SemiBoldText style={styles.summaryLabel}>Budget</SemiBoldText>
                  </View>
                  <BoldText style={styles.summaryAmount}>
                    ₹{BUDGET.toLocaleString()}
                  </BoldText>
                </View>

                {/* Divider */}
                <View style={styles.summaryDivider} />

                {/* Remaining */}
                <View style={styles.summaryBox}>
                  <View style={styles.summaryIconRow}>
                    <View style={styles.summaryIconWrap}>
                      <Ionicons name="cash-outline" size={14} color="#fff" />
                    </View>
                    <SemiBoldText style={styles.summaryLabel}>Left</SemiBoldText>
                  </View>
                  <BoldText style={styles.summaryAmount}>
                    ₹{REMAINING.toLocaleString()}
                  </BoldText>
                </View>
              </View>

              {/*Progress bar */}
              <View style={styles.progressTrack}>
                <View
                  style={[
                    styles.progressFill,
                    {width: `${USED_PCT}%`, backgroundColor: progressColor},
                  ]}
                />
              </View>

              <View style={styles.progressMeta}>
                <View style={styles.monthPill}>
                  <Ionicons name="calendar-outline" size={11} color="rgba(255,255,255,0.9)" />
                  <SemiBoldText style={styles.monthText}>  June 2026</SemiBoldText>
                </View>
                <SemiBoldText style={[styles.pctLabel, {color: progressColor}]}>
                  {USED_PCT}% used
                </SemiBoldText>
              </View>
            </LinearGradient>

            {/*  Body panel  */}
            <View style={styles.body}>

              {/* Quick Actions */}
              <QuickActions
                theme={theme}
                onAddExpense={() => navigation.navigate('AddScreen')}
                onSetupBudget={() => navigation.navigate('BudgetScreen')}
                onSetupCategory={() => navigation.navigate('CategoryListScreen')}
                onViewCategories={() => navigation.navigate('CategoryListScreen')}
              />

              {/* Recent Activities header */}
              <View style={styles.sectionHeader}>
                <BoldText size={18} color={theme.colors.text}>
                  Recent Activities
                </BoldText>
                <TouchableOpacity activeOpacity={0.7}>
                  <SemiBoldText style={{fontSize: 13, color: theme.banner.accent}}>
                    See all
                  </SemiBoldText>
                </TouchableOpacity>
              </View>

            </View>
          </>
        }
      />
    </SafeAreaView>
  );
};

export default HomeScreen;



//  Styles 
const createStyles = (theme: AppTheme) => StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 10,
    paddingBottom: 34,
    paddingHorizontal: 20,
    overflow: 'hidden',
  },
  blob1: {
    position: 'absolute',
    top: -40,
    right: -30,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  blob2: {
    position: 'absolute',
    bottom: -60,
    left: 40,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255,255,255,0.07)',
  },
  shineStreak: {
    position: 'absolute',
    top: -40,
    left: -80,
    width: 260,
    height: 80,
    borderRadius: 80,
    backgroundColor: 'rgba(255,255,255,0.1)',
    transform: [{rotate: '-18deg'}],
  },
  navRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    zIndex: 1,
  },
  greeting: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 2,
  },
  screenTitle: {
    fontSize: 24,
    color: '#fff',
    letterSpacing: -0.3,
  },
  notifBtn: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  notifDot: {
    position: 'absolute',
    top: 10,
    right: 11,
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#FF5252',
    borderWidth: 1.5,
    borderColor: theme.banner.accent,
  },

  // ── Budget/Spent summary inside header
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.13)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    marginTop: 20,
    paddingVertical: 14,
    paddingHorizontal: 12,
  },
  summaryBox: {
    flex: 1,
    alignItems: 'center',
    gap: 6,
  },
  summaryIconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  summaryIconWrap: {
    width: 22,
    height: 22,
    borderRadius: 6,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  summaryLabel: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.75)',
  },
  summaryAmount: {
    fontSize: 15,
    color: '#fff',
    letterSpacing: -0.2,
  },
  summaryDivider: {
    width: 1,
    height: 36,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },

  // ── Progress
  progressTrack: {
    height: 5,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.2)',
    overflow: 'hidden',
    marginTop: 18,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  monthPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.14)',
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  monthText: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.9)',
  },
  pctLabel: {
    fontSize: 11,
    fontWeight: '600',
  },

  // ── Body
  body: {
    marginTop: -18,
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    backgroundColor: theme.colors.background,
    paddingHorizontal: 16,
    paddingTop: 22,
  },

  // ── Section header
  sectionHeader: {
    marginTop: 24,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  // ── Activity cards
  activityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    marginBottom: 10,
    marginHorizontal: 16,
    borderRadius: 18,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
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
  },
  right: {
    alignItems: 'flex-end',
    marginRight: 6,
  },
});


