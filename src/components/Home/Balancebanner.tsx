
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import {AppTheme} from '../../theme/constant';

interface BalanceBannerProps {
  theme: AppTheme;
  totalSpent: number;
  budget: number;
  remaining: number;
  usedPercentage: number;
}

export const BalanceBanner: React.FC<BalanceBannerProps> = ({
  theme,
  totalSpent,
  budget,
  remaining,
  usedPercentage,
}) => {
  const styles = getStyles(theme);

  const clampedPercentage = Math.min(
    Math.max(usedPercentage, 0),
    100,
  );

  return (
    <LinearGradient
      colors={['#4F46E5', '#7C3AED', '#EC4899']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={styles.card}>
      {/* Glass shine */}
      <View style={styles.glassOverlay} />

      {/* Glow blobs */}
      <View style={styles.circleLarge} />
      <View style={styles.circleSmall} />

      {/* Header */}
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.label}>TOTAL SPENT THIS MONTH</Text>

          <Text style={styles.amount}>
            ₹{totalSpent.toLocaleString()}
          </Text>
        </View>

        <View style={styles.iconCircle}>
          <Ionicons
            name="wallet-outline"
            size={24}
            color={theme.colors.card}
          />
        </View>
      </View>

      {/* Stats */}
      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <View style={styles.statIconCircle}>
            <Ionicons
              name="locate-outline"
              size={16}
              color="#FFFFFF"
            />
          </View>

          <View>
            <Text style={styles.statLabel}>Budget</Text>

            <Text style={styles.statValue}>
              ₹{budget.toLocaleString()}
            </Text>
          </View>
        </View>

        <View style={styles.statBox}>
          <View style={styles.statIconCircle}>
            <Ionicons
              name="cash-outline"
              size={16}
              color="#FFFFFF"
            />
          </View>

          <View>
            <Text style={styles.statLabel}>Remaining</Text>

            <Text style={styles.statValue}>
              ₹{remaining.toLocaleString()}
            </Text>
          </View>
        </View>
      </View>

      {/* Progress */}
      <View style={styles.progressContainer}>
        <View style={styles.progressTrack}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${clampedPercentage}%`,
              },
            ]}
          />
        </View>

        <Text style={styles.progressText}>
          {Math.round(clampedPercentage)}% of budget used
        </Text>
      </View>
    </LinearGradient>
  );
};

const getStyles = (_theme: AppTheme) =>
  StyleSheet.create({
    card: {
      borderRadius: 30,
      padding: 22,
      overflow: 'hidden',

      borderWidth: 1,
      borderColor: 'rgba(255,255,255,0.15)',

      shadowColor: '#4F46E5',
      shadowOffset: {
        width: 0,
        height: 15,
      },
      shadowOpacity: 0.35,
      shadowRadius: 30,

      elevation: 15,
    },

    glassOverlay: {
      position: 'absolute',

      top: 0,
      left: 0,
      right: 0,

      height: '45%',

      backgroundColor: 'rgba(255,255,255,0.10)',

      borderBottomLeftRadius: 120,
      borderBottomRightRadius: 120,
    },

    circleLarge: {
      position: 'absolute',

      top: -60,
      right: -20,

      width: 220,
      height: 220,

      borderRadius: 110,

      backgroundColor: 'rgba(255,255,255,0.15)',
    },

    circleSmall: {
      position: 'absolute',

      bottom: -70,
      left: -30,

      width: 150,
      height: 150,

      borderRadius: 75,

      backgroundColor: 'rgba(255,255,255,0.08)',
    },

    headerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      zIndex: 10,
    },

    label: {
      color: 'rgba(255,255,255,0.75)',

      fontSize: 11,

      fontWeight: '600',

      letterSpacing: 1,
    },

    amount: {
      color: '#FFFFFF',
      fontSize: 34,
      fontWeight: '800',
      marginTop: 4,
    },

    iconCircle: {
      width: 54,
      height: 54,

      borderRadius: 18,

      backgroundColor: 'rgba(255,255,255,0.12)',

      borderWidth: 1,

      borderColor: 'rgba(255,255,255,0.18)',

      justifyContent: 'center',
      alignItems: 'center',
    },

    statsRow: {
      flexDirection: 'row',
      gap: 12,
      marginTop: 4,
      zIndex: 10,
    },

    statBox: {
      flex: 1,

      flexDirection: 'row',

      alignItems: 'center',

      gap: 10,

      padding: 14,

      borderRadius: 18,

      backgroundColor: 'rgba(255,255,255,0.12)',

      borderWidth: 1,

      borderColor: 'rgba(255,255,255,0.18)',
    },

    statIconCircle: {
      width: 34,
      height: 34,

      borderRadius: 12,

      backgroundColor: 'rgba(255,255,255,0.12)',

      justifyContent: 'center',
      alignItems: 'center',
    },

    statLabel: {
      color: 'rgba(255,255,255,0.70)',

      fontSize: 10,
    },

    statValue: {
      color: '#FFFFFF',

      fontSize: 14,

      fontWeight: '700',

      marginTop: 2,
    },

    progressContainer: {
      marginTop: 12,
      zIndex: 10,
    },

    progressTrack: {
      height: 8,

      borderRadius: 50,

      overflow: 'hidden',

      backgroundColor: 'rgba(255,255,255,0.15)',
    },

    progressFill: {
      height: '100%',

      borderRadius: 50,

      backgroundColor: '#FFFFFF',
    },

    progressText: {
      color: 'rgba(255,255,255,0.80)',

      fontSize: 11,

      fontWeight: '600',

      textAlign: 'right',

      marginTop: 8,
    },
  });
