import React, { useEffect, useState } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { getOverviewData } from '../api/services/overviewService';
import { setOverviewData } from '../store/expenses/expenseSlice';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_GAP = 10;
const CHIP_WIDTH = (SCREEN_WIDTH - 32 - CARD_GAP) / 2; // 2-column grid with 16px side padding

const CATEGORY_COLORS = ['#3B82F6', '#8B5CF6', '#EC4899', '#F59E0B', '#10B981', '#06B6D4', '#F97316'];
const getColor = (index: number) => CATEGORY_COLORS[index % CATEGORY_COLORS.length];


interface DonutCategory {
  id: string;
  name: string;
  percentage: number;
  color: string;
}

interface DonutChartProps {
  categories: DonutCategory[];
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

// ─── Overview screen ────────────────────────────────────────────────────────

const OverviewScreen = () => {

  const { theme } = useTheme();
  const styles = getStyles(theme);
  const dispatch = useDispatch();
  const navigation: any = useNavigation();

  const { budget, total_spent, overviewExpenseData } = useSelector( (state: RootState) => state.expense);
  const { categoryWiseAmount } = useSelector(
    (state: RootState) => state.category
  );

  const remaining = Number(budget) - Number(total_spent);
  const [selectedId, setSelectedId] = useState<string | null>(null);

 
  const donutCategories: DonutCategory[] = overviewExpenseData.map((cat, index) => ({
    id: cat.category_id,
    name: cat.category_name,
    percentage: cat.percentage,
    color: getColor(index),
  }));

  
  const topCategories = categoryWiseAmount.slice(0, 3).map((cat, index) => ({
    id: cat.category_id,
    name: cat.category_name,
    icon: cat.category_icon,
    amount: cat.total_spent,
    color: getColor(index),
  }));

  const totalSpent = overviewExpenseData.reduce((sum, c) => sum + c.total_spent, 0);
  const usedPct =  Math.round((Number(total_spent) / Number(budget)) * 100);
  const majorCat = donutCategories[0]; // API returns them sorted, first is fine for now

  // Determine if theme looks dark by checking background darkness
  const isDark = theme.colors.background.startsWith('#0') || theme.colors.background.startsWith('#1');

  // Stat chips config
  const STATS = [
    {
      label: 'Budget',
      value: `₹${Number(budget || 0).toLocaleString()}`,
      sub: 'Monthly limit',
      icon: 'wallet-outline',
      color: theme.banner.accent,
    },
    {
      label: 'Spent',
      value: `₹${Number(total_spent || 0).toLocaleString()}`,
      sub: `${usedPct}% used`,
      icon: 'trending-down-outline',
      color: theme.colors.danger,
    },
    {
      label: 'Major',
      value: majorCat ? majorCat.name.split(' ')[0] : '—',
      sub: majorCat ? `${majorCat.percentage}%` : '',
      icon: 'pricetag-outline',
      color: majorCat ? majorCat.color : theme.colors.text,
    },
    {
      label: 'Remaining',
      value: `₹${remaining.toLocaleString()}`,
      sub: `${100 - usedPct}% left`,
      icon: 'cash-outline',
      color: theme.colors.primary,
    },
  ];

  const handleCategoryPress = (cat: any) => {
    setSelectedId(cat.id === selectedId ? null : cat.id);
  };

  const fetchOverviewData = async () => {
    try {
      const response = await getOverviewData();
      if (response?.data?.success) {
        dispatch(setOverviewData(response.data.data));
      }
    } catch (error: any) {
      console.log('Error fetching overview data', error);
    }
  };

  useEffect(() => {
    fetchOverviewData();
  }, []);

  return (
    <SafeAreaView style={styles.root}>

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
            <TouchableOpacity style={styles.notifBtn} onPress={() => {}} activeOpacity={0.8}>
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


        <View style={styles.body}>

          {/* Stats */}
          <View style={styles.chipsGrid}>
            {STATS.map((stat, i) => (
              <View key={i} style={[styles.chip, { backgroundColor: theme.colors.card }]}>
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
                <Text style={[styles.badgeText, { color: theme.banner.accent }]}>  {donutCategories.length} cats</Text>
              </View>
            </View>

            <View style={styles.donutRow}>
              {/* Donut */}
              <View style={styles.donutWrap}>
                <DonutChart categories={donutCategories} size={154} strokeWidth={24} isDark={isDark} />
                <View style={styles.donutCenter}>
                  <Text style={[styles.donutCenterAmount, { color: theme.colors.text }]}>
                    ₹{(totalSpent / 1000).toFixed(1)}k
                  </Text>
                  <Text style={[styles.donutCenterLabel, { color: theme.colors.text }]}>spent</Text>
                </View>
              </View>

              {/* Legend */}
              <View style={styles.legend}>
                {donutCategories.map((cat) => (
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

          {/* ── Category cards (top 3) ───────────────────────────────────── */}
          <View style={styles.catSectionHeader}>
            <Text style={[styles.cardTitle, { color: theme.colors.text }]}>Categories</Text>
            <TouchableOpacity style={styles.seeAllBtn} onPress={() => navigation.navigate("CategoryListScreen")} activeOpacity={0.7}>
              <Text style={[styles.seeAllText, { color: theme.banner.accent }]}>See all</Text>
              <Ionicons name="chevron-forward" size={13} color={theme.banner.accent} />
            </TouchableOpacity>
          </View>

          {topCategories.map((cat) => {
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
                  <Ionicons name={(cat.icon || 'pricetag-outline') as any} size={22} color={cat.color} />
                </LinearGradient>

                {/* Centre: info */}
                <View style={styles.catBody}>
                  <View style={styles.catTopRow}>
                    <Text style={[styles.catName, { color: theme.colors.text }]}>{cat.name}</Text>
                    <Text style={[styles.catAmount, { color: theme.colors.text }]}>
                      ₹{Number(cat.amount).toLocaleString()}
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
  });
