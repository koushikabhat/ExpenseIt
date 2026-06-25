import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import Svg, { Circle } from 'react-native-svg';
import { AppTheme } from "../theme/constant"; // adjust path
import { useTheme } from '../theme/ThemeProvider';
import { useNavigation } from '@react-navigation/native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_GAP = 10;
const CHIP_WIDTH = (SCREEN_WIDTH - 32 - CARD_GAP) / 2; // 2-column grid with 16px side padding

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  amount: number;
  percentage: number;  // 0–100; must sum to 100 across all categories
  lastDate: string;
  transactions: number;
}



// ─── Default sample data (swap with live data) ────────────────────────────────

const DEFAULT_CATEGORIES: Category[] = [
  {
    id: '1',
    name: 'Food & Dining',
    icon: 'restaurant-outline',
    color: '#3B82F6',
    amount: 4500,
    percentage: 30,
    lastDate: 'Today, 2:30 PM',
    transactions: 12,
  },
  {
    id: '2',
    name: 'Transport',
    icon: 'car-outline',
    color: '#8B5CF6',
    amount: 3000,
    percentage: 20,
    lastDate: 'Yesterday',
    transactions: 8,
  },
  {
    id: '3',
    name: 'Shopping',
    icon: 'bag-handle-outline',
    color: '#EC4899',
    amount: 4500,
    percentage: 30,
    lastDate: 'Jun 18',
    transactions: 5,
  },
  {
    id: '4',
    name: 'Utilities',
    icon: 'receipt-outline',
    color: '#F59E0B',
    amount: 2250,
    percentage: 15,
    lastDate: 'Jun 15',
    transactions: 3,
  },
  {
    id: '5',
    name: 'Health',
    icon: 'medical-outline',
    color: '#10B981',
    amount: 750,
    percentage: 5,
    lastDate: 'Jun 12',
    transactions: 2,
  },
];

// ─── Donut chart ──────────────────────────────────────────────────────────────

interface DonutChartProps {
  categories: Category[];
  size?: number;
  strokeWidth?: number;
  isDark: boolean;
}

const DonutChart: React.FC<DonutChartProps> = ({
  categories,
  size = 150,
  strokeWidth = 22,
  isDark,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const center = size / 2;
  const GAP = 3; // pixel gap between segments

  let accumulated = 0;
  const segments = categories.map((cat) => {
    const segLength = (cat.percentage / 100) * circumference - GAP;
    const dashOffset = circumference - accumulated;
    accumulated += (cat.percentage / 100) * circumference;
    return {
      ...cat,
      dashArray: `${Math.max(segLength, 0)} ${circumference}`,
      dashOffset,
    };
  });

  return (
    <Svg width={size} height={size}>
      {/* Background track */}
      <Circle
        cx={center}
        cy={center}
        r={radius}
        stroke={isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.06)'}
        strokeWidth={strokeWidth}
        fill="none"
      />
      {segments.map((seg) => (
        <Circle
          key={seg.id}
          cx={center}
          cy={center}
          r={radius}
          stroke={seg.color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={seg.dashArray}
          strokeDashoffset={seg.dashOffset}
          strokeLinecap="butt"
          rotation={-90}
          origin={`${center}, ${center}`}
        />
      ))}
    </Svg>
  );
};

// ─── Overview screen ──────────────────────────────────────────────────────────
const OverviewScreen  = ({
  totalBudget = 20000,
  categories = DEFAULT_CATEGORIES,
  onCategoryPress,
  onNotificationPress,
} : any) => {

  const {theme} = useTheme();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const styles = getStyles(theme);
  const navigation : any = useNavigation();

  // Derived values
  const totalSpent = categories.reduce((sum, c) => sum + c.amount, 0);
  const remaining = totalBudget - totalSpent;
  const usedPct = Math.round((totalSpent / totalBudget) * 100);
  const majorCat = [...categories].sort((a, b) => b.amount - a.amount)[0];

  // Determine if theme looks dark by checking background darkness
  const isDark = theme.colors.background.startsWith('#0') || theme.colors.background.startsWith('#1');

  // Progress bar status color
  const progressColor = usedPct >= 90 ? theme.colors.danger : usedPct >= 70 ? '#F59E0B' : theme.banner.accent;

  // Stat chips config
  const STATS = [
    {
      label: 'Budget',
      value: `₹${totalBudget.toLocaleString()}`,
      sub: 'Monthly limit',
      icon: 'wallet-outline',
      color: theme.banner.accent,
    },
    {
      label: 'Spent',
      value: `₹${totalSpent.toLocaleString()}`,
      sub: `${usedPct}% used`,
      icon: 'trending-down-outline',
      color: theme.colors.danger,
    },
    {
      label: 'Major',
      value: majorCat.name.split(' ')[0],
      sub: `₹${majorCat.amount.toLocaleString()}`,
      icon: majorCat.icon,
      color: majorCat.color,
    },
    {
      label: 'Remaining',
      value: `₹${remaining.toLocaleString()}`,
      sub: `${100 - usedPct}% left`,
      icon: 'cash-outline',
      color: theme.colors.primary,
    },
  ];

  const handleCategoryPress = (cat: Category) => {
    setSelectedId(cat.id === selectedId ? null : cat.id);
    onCategoryPress?.(cat);
  };

  return (
    <SafeAreaView style={styles.root}>
      {/* <StatusBar barStyle="light-content" backgroundColor={theme.banner.accent} translucent /> */}

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Gradient header ─────────────────────────────────────────────── */}
        <LinearGradient
          colors={[theme.banner.accent, theme.banner.accentSecondary]}
          start={{ x: 0.0, y: 0.0 }}
          end={{ x: 1.0, y: 1.0 }}
          style={styles.header}
        >
          {/* Decorative blobs */}
          <View style={styles.blob1} />
          <View style={styles.blob2} />
          <View style={styles.shineStreak} />

          {/* Nav row */}
          <View style={styles.navRow}>
            <View>
              <Text style={styles.greeting}>Good morning 👋</Text>
              <Text style={styles.screenTitle}>Overview</Text>
            </View>
            <TouchableOpacity style={styles.notifBtn} onPress={onNotificationPress} activeOpacity={0.8}>
              <Ionicons name="notifications-outline" size={20} color="#fff" />
              <View style={styles.notifDot} />
            </TouchableOpacity>
          </View>

          {/* Month pill */}
          <View style={styles.monthPill}>
            <Ionicons name="calendar-outline" size={12} color="rgba(255,255,255,0.9)" />
            <Text style={styles.monthText}>  June 2026</Text>
          </View>

          {/* Mini progress strip at the bottom of the header */}
          <View style={styles.headerProgressTrack}>
            <View style={[styles.headerProgressFill, { width: `${usedPct}%` }]} />
          </View>
          <Text style={styles.headerProgressLabel}>{usedPct}% of monthly budget used</Text>
        </LinearGradient>

        {/* ── Lifted body panel ─────────────────────────────────────────────── */}
        <View style={styles.body}>

          {/* ── 2×2 Stat chips ─────────────────────────────────────────────── */}
          <View style={styles.chipsGrid}>
            {STATS.map((stat, i) => (
              <View key={i} style={[styles.chip, { backgroundColor: theme.colors.card }]}>
                {/* Subtle tinted top-left corner accent */}
                <View style={[styles.chipAccentCorner, { backgroundColor: `${stat.color}18` }]} />
                <View style={[styles.chipIconWrap, { backgroundColor: `${stat.color}18` }]}>
                  <Ionicons name={stat.icon as any} size={18} color={stat.color} />
                </View>
                <Text style={[styles.chipValue, { color: theme.colors.text }]} numberOfLines={1}>
                  {stat.value}
                </Text>
                <Text style={[styles.chipLabel, { color: theme.colors.text }]}>{stat.label}</Text>
                <Text style={[styles.chipSub, { color: stat.color }]}>{stat.sub}</Text>
              </View>
            ))}
          </View>

          {/* ── Spending breakdown: donut + legend ─────────────────────────── */}
          <View style={[styles.card, { backgroundColor: theme.colors.card }]}>
            {/* Card header */}
            <View style={styles.cardHeader}>
              <View>
                <Text style={[styles.cardTitle, { color: theme.colors.text }]}>
                  Spending Breakdown
                </Text>
                <Text style={[styles.cardSub, { color: theme.colors.text }]}>
                  By category · this month
                </Text>
              </View>
              <View style={[styles.badge, { backgroundColor: `${theme.banner.accent}18` }]}>
                <Ionicons name="pie-chart-outline" size={12} color={theme.banner.accent} />
                <Text style={[styles.badgeText, { color: theme.banner.accent }]}>  {categories.length} cats</Text>
              </View>
            </View>

            {/* Donut + legend side by side */}
            <View style={styles.donutRow}>
              {/* Donut */}
              <View style={styles.donutWrap}>
                <DonutChart categories={categories} size={154} strokeWidth={24} isDark={isDark} />
                <View style={styles.donutCenter}>
                  <Text style={[styles.donutCenterAmount, { color: theme.colors.text }]}>
                    ₹{(totalSpent / 1000).toFixed(1)}k
                  </Text>
                  <Text style={[styles.donutCenterLabel, { color: theme.colors.text }]}>spent</Text>
                </View>
              </View>

              {/* Legend */}
              <View style={styles.legend}>
                {categories.map((cat) => (
                  <View key={cat.id} style={styles.legendRow}>
                    <View style={[styles.legendDot, { backgroundColor: cat.color }]} />
                    <Text
                      style={[styles.legendName, { color: theme.colors.text }]}
                      numberOfLines={1}
                    >
                      {cat.name.split(' ')[0]}
                    </Text>
                    <Text style={[styles.legendPct, { color: cat.color }]}>
                      {cat.percentage}%
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </View>

          {/* ── Category cards ──────────────────────────────────────────────── */}
          <View style={styles.catSectionHeader}>
            <Text style={[styles.cardTitle, { color: theme.colors.text }]}>Categories</Text>
            <TouchableOpacity style={styles.seeAllBtn} onPress={() => navigation.navigate("CategoryListScreen")} activeOpacity={0.7}>
              <Text style={[styles.seeAllText, { color: theme.banner.accent }]}>See all</Text>
              <Ionicons name="chevron-forward" size={13} color={theme.banner.accent} />
            </TouchableOpacity>
          </View>

          {categories.map((cat) => {
            const isSelected = selectedId === cat.id;
            return (
              <TouchableOpacity
                key={cat.id}
                onPress={() => handleCategoryPress(cat)}
                activeOpacity={0.72}
                style={[
                  styles.catCard,
                  { backgroundColor: theme.colors.card },
                  isSelected && { borderColor: cat.color, borderWidth: 1.5 },
                ]}
              >
                {/* Left: icon */}
                <LinearGradient
                  colors={[`${cat.color}30`, `${cat.color}10`]}
                  style={styles.catIconGradient}
                >
                  <Ionicons name={cat.icon as any} size={22} color={cat.color} />
                </LinearGradient>

                {/* Centre: info */}
                <View style={styles.catBody}>
                  {/* Row 1: name + amount */}
                  <View style={styles.catTopRow}>
                    <Text style={[styles.catName, { color: theme.colors.text }]}>{cat.name}</Text>
                    <Text style={[styles.catAmount, { color: theme.colors.text }]}>
                      ₹{cat.amount.toLocaleString()}
                    </Text>
                  </View>

                  {/* Progress bar */}
                  <View
                    style={[
                      styles.catProgressTrack,
                      { backgroundColor: `${cat.color}1A` },
                    ]}
                  >
                    <View
                      style={[
                        styles.catProgressFill,
                        { width: `${cat.percentage}%`, backgroundColor: cat.color },
                      ]}
                    />
                  </View>

                  {/* Row 2: meta */}
                  <View style={styles.catMetaRow}>
                    <View style={styles.catMetaItem}>
                      <Ionicons name="time-outline" size={11} color={theme.colors.text} style={{ opacity: 0.45 }} />
                      <Text style={[styles.catMetaText, { color: theme.colors.text }]}>
                        {' '}{cat.lastDate}
                      </Text>
                    </View>
                    <View style={styles.catMetaItem}>
                      <Ionicons name="receipt-outline" size={11} color={theme.colors.text} style={{ opacity: 0.45 }} />
                      <Text style={[styles.catMetaText, { color: theme.colors.text }]}>
                        {' '}{cat.transactions} txns
                      </Text>
                    </View>
                    <Text style={[styles.catPctBadge, { color: cat.color }]}>
                      {cat.percentage}%
                    </Text>
                  </View>
                </View>

                {/* Right: chevron */}
                <Ionicons
                  name={isSelected ? 'chevron-up' : 'chevron-forward'}
                  size={16}
                  color={isSelected ? cat.color : theme.colors.text}
                  style={{ opacity: isSelected ? 1 : 0.3 }}
                />
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};


export default OverviewScreen;
// ─── Styles ───────────────────────────────────────────────────────────────────

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    scroll: { flex: 1 },
    scrollContent: { paddingBottom: 40 },

    // ── Header
    header: {
      paddingTop: 52,
      paddingBottom: 32,
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
      transform: [{ rotate: '-18deg' }],
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
      marginBottom: 4,
    },
    screenTitle: {
      fontSize: 28,
      fontWeight: '700',
      color: '#fff',
      letterSpacing: -0.4,
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
    monthPill: {
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'flex-start',
      marginTop: 10,
      backgroundColor: 'rgba(255,255,255,0.14)',
      borderRadius: 20,
      paddingHorizontal: 10,
      paddingVertical: 4,
    },
    monthText: {
      fontSize: 11,
      fontWeight: '600',
      color: 'rgba(255,255,255,0.9)',
    },
    headerProgressTrack: {
      height: 4,
      borderRadius: 4,
      backgroundColor: 'rgba(255,255,255,0.22)',
      overflow: 'hidden',
      marginTop: 18,
    },
    headerProgressFill: {
      height: '100%',
      borderRadius: 4,
      backgroundColor: 'rgba(255,255,255,0.85)',
    },
    headerProgressLabel: {
      marginTop: 5,
      fontSize: 11,
      color: 'rgba(255,255,255,0.7)',
      textAlign: 'right',
      fontWeight: '500',
    },

    // ── Body panel
    body: {
      marginTop: -18,
      borderTopLeftRadius: 26,
      borderTopRightRadius: 26,
      backgroundColor: theme.colors.background,
      paddingHorizontal: 16,
      paddingTop: 22,
    },

    // ── 2×2 chips
    chipsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: CARD_GAP,
      marginBottom: 16,
    },
    chip: {
      width: CHIP_WIDTH,
      borderRadius: 18,
      padding: 14,
      overflow: 'hidden',
      // shadow
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.07,
      shadowRadius: 8,
      elevation: 3,
    },
    chipAccentCorner: {
      position: 'absolute',
      top: -20,
      right: -20,
      width: 60,
      height: 60,
      borderRadius: 30,
    },
    chipIconWrap: {
      width: 38,
      height: 38,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 10,
    },
    chipValue: {
      fontSize: 17,
      fontWeight: '700',
      letterSpacing: -0.3,
    },
    chipLabel: {
      fontSize: 11,
      fontWeight: '600',
      opacity: 0.45,
      marginTop: 2,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    chipSub: {
      fontSize: 11,
      fontWeight: '600',
      marginTop: 4,
    },

    // ── Generic card
    card: {
      borderRadius: 20,
      padding: 18,
      marginBottom: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.07,
      shadowRadius: 8,
      elevation: 3,
    },
    cardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 16,
    },
    cardTitle: {
      fontSize: 16,
      fontWeight: '700',
    },
    cardSub: {
      fontSize: 11,
      opacity: 0.45,
      marginTop: 2,
    },
    badge: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 20,
    },
    badgeText: {
      fontSize: 11,
      fontWeight: '600',
    },

    // ── Donut row
    donutRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 14,
    },
    donutWrap: {
      position: 'relative',
      width: 154,
      height: 154,
      alignItems: 'center',
      justifyContent: 'center',
    },
    donutCenter: {
      position: 'absolute',
      alignItems: 'center',
    },
    donutCenterAmount: {
      fontSize: 16,
      fontWeight: '700',
    },
    donutCenterLabel: {
      fontSize: 10,
      opacity: 0.45,
      marginTop: 1,
    },

    // ── Legend
    legend: {
      flex: 1,
      gap: 10,
    },
    legendRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    legendDot: {
      width: 9,
      height: 9,
      borderRadius: 5,
    },
    legendName: {
      flex: 1,
      fontSize: 12,
      fontWeight: '500',
    },
    legendPct: {
      fontSize: 12,
      fontWeight: '700',
    },

    // ── Category section
    catSectionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
    },
    seeAllBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 2,
    },
    seeAllText: {
      fontSize: 13,
      fontWeight: '600',
    },

    // ── Category cards
    catCard: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      borderRadius: 18,
      padding: 14,
      marginBottom: 10,
      borderWidth: 1.5,
      borderColor: 'transparent',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.06,
      shadowRadius: 6,
      elevation: 2,
    },
    catIconGradient: {
      width: 48,
      height: 48,
      borderRadius: 15,
      alignItems: 'center',
      justifyContent: 'center',
    },
    catBody: {
      flex: 1,
      gap: 6,
    },
    catTopRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    catName: {
      fontSize: 14,
      fontWeight: '600',
    },
    catAmount: {
      fontSize: 15,
      fontWeight: '700',
    },
    catProgressTrack: {
      height: 5,
      borderRadius: 3,
      overflow: 'hidden',
    },
    catProgressFill: {
      height: '100%',
      borderRadius: 3,
    },
    catMetaRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
    catMetaItem: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    catMetaText: {
      fontSize: 11,
      opacity: 0.45,
    },
    catPctBadge: {
      marginLeft: 'auto',
      fontSize: 11,
      fontWeight: '700',
    },
  });
