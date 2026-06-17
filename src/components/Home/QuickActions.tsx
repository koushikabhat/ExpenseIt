import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

import {AppTheme} from '../../theme/constant';

interface QuickActionsProps {
  theme: AppTheme;

  onAddExpense: () => void;
  onSetupBudget: () => void;
  onSetupCategory: () => void;
  onViewCategories: () => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({
  theme,
  onAddExpense,
  onSetupBudget,
  onSetupCategory,
  onViewCategories,
}) => {
  const styles = getStyles(theme);

  const actions = [
    {
      title: 'Add Expense',
      icon: 'add-circle-outline',
      onPress: onAddExpense,
      color: '#3B82F6',
    },
    {
      title: 'Set Budget',
      icon: 'wallet-outline',
      onPress: onSetupBudget,
      color: '#10B981',
    },
    {
      title: 'Set Category',
      icon: 'pricetag-outline',
      onPress: onSetupCategory,
      color: '#8B5CF6',
    },
    {
      title: 'View All Categories',
      icon: 'grid-outline',
      onPress: onViewCategories,
      color: '#F59E0B',
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        Quick Actions
      </Text>

      <View style={styles.grid}>
        {actions.map(item => (
          <TouchableOpacity
            key={item.title}
            style={styles.card}
            activeOpacity={0.8}
            onPress={item.onPress}>
            <View
              style={[
                styles.iconContainer,
                {
                  backgroundColor: `${item.color}20`,
                },
              ]}>
              <Ionicons
                name={item.icon}
                size={26}
                color={item.color}
              />
            </View>

            <Text style={styles.title}>
              {item.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      marginTop: 30,
    },

    heading: {
      fontSize: 18,
      fontWeight: '700',
      color: theme.colors.text,
      marginBottom: 12,
    },

    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      rowGap: 12,
      alignContent : 'center'
    },

    card: {
      alignItems : 'center',
      width: '48%',
      backgroundColor: theme.colors.card,
      borderRadius: 20,
      paddingVertical: 18,
      paddingHorizontal: 16,
      borderWidth: 1,
      borderColor: theme.colors.border,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.05,
      shadowRadius: 10,
      elevation: 2,
    },

    iconContainer: {
      width: 58,
      height: 58,
      borderRadius: 14,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 12,
    },

    title: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.colors.text,
    },
  });