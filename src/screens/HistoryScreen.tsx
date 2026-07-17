import React, { useCallback } from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import { BoldText, RegularText } from "../utils/Texts";
import { useTheme } from "../theme/ThemeProvider";
import { AppTheme } from "../theme/constant";
import LinearGradient from "react-native-linear-gradient";
import { useFocusEffect } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { fetchHistory } from "../api/services/fetchHistory";
import { setLoading, setExpense } from "../store/expenses/historySlice";

const HistoryScreen = () => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const dispatch = useDispatch();

  const { isStale, loading, items } = useSelector(
    (state: RootState) => state.history
  );

  const loadHistory = async (page: number) => {
    if (loading) return;
    try {

      const response = await fetchHistory(page);

      if (response.data.success) {
        
        const groupedExpenses = response.data.data.map((group: any) => ({
          id: group._id,
          data: group.expenses.map((expense: any) => ({
            ...expense,
            time: new Date(expense.expense_date).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          })),
        }));

        dispatch(
          setExpense({
            expenses: groupedExpenses,
            page: response.data.meta.page,
            totalPages: response.data.meta.total_pages,
            hasMore: response.data.meta.has_more,
            append: page > 1,
          })
        );
      }
    } catch (error: any) {
      // Handle error if needed
    } finally {
      dispatch(setLoading(false));
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (isStale) {
        loadHistory(1);
      }
    }, [isStale])
  );

  const renderExpense = ({ item }: any) => (
    <View style={styles.sectionContainer}>
      <View
        style={[
          styles.dateContainer,
          { backgroundColor: theme.colors.background },
        ]}
      >
        <Ionicons
          name="calendar-outline"
          size={18}
          color={theme.colors.primary}
        />

        <BoldText
          color={theme.colors.text}
          style={{ marginLeft: 8 }}
        >
          {new Date(item.id).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </BoldText>
      </View>

      <View
        style={[
          styles.expenseGroup,
          {
            backgroundColor: theme.colors.background,
            borderColor: theme.colors.border,
            borderWidth: 1,
          },
        ]}
      >
        {item.data.map((expense: any, index: number) => (
          <View
            key={expense.expense_id}
            style={[
              styles.activityCard,
              index !== item.data.length - 1 && {
                borderBottomWidth: 1,
                borderBottomColor: theme.colors.border,
              },
            ]}
          >
            <View
              style={[
                styles.iconContainer,
                { backgroundColor: theme.colors.card },
              ]}
            >
              <Ionicons
                name={expense.category_icon}
                size={22}
                color={theme.colors.primary}
              />
            </View>

            <View style={styles.activityContent}>
              <BoldText color={theme.colors.text}>
                {expense.category_name}
              </BoldText>

              <RegularText color={theme.colors.text}>
                {expense.expense_note}
              </RegularText>
            </View>

            <View style={styles.right}>
              <BoldText color={theme.colors.text}>
                ₹ {expense.amount}
              </BoldText>

              <RegularText color={theme.colors.text}>
                {expense.time}
              </RegularText>
            </View>

            <View style={styles.rightContent}>
              <Ionicons
                name="arrow-forward-outline"
                size={20}
                color={theme.colors.primary}
              />
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: theme.colors.background },
      ]}
    >
      <LinearGradient
        colors={[
          theme.banner.accent,
          theme.banner.accentSecondary,
        ]}
        start={{ x: 0.0, y: 0.0 }}
        end={{ x: 1.0, y: 1.0 }}
        style={styles.header}
      >
        <View style={styles.blob1} />
        <View style={styles.blob2} />
        <View style={styles.shineStreak} />

        <View style={styles.navRow}>
          <View>
            <Text style={styles.screenTitle}>History</Text>
            <Text style={styles.greeting}>
              Check your Expense History
            </Text>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.body} />

      <FlatList
        data={items}
        keyExtractor={(item: any) => item.id}
        renderItem={renderExpense}
      />
    </SafeAreaView>
  );
};

export default HistoryScreen;

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },

    body: {
      marginTop: -18,
      borderTopLeftRadius: 26,
      borderTopRightRadius: 26,
      backgroundColor: theme.colors.background,
      paddingHorizontal: 16,
      paddingTop: 22,
    },

    dateContainer: {
      flexDirection: "row",
      alignItems: "center",
      padding: 14,
      borderRadius: 14,
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      marginTop: 18,
      marginBottom: 12,
    },

    activityContent: {
      flex: 1,
      marginLeft: 12,
    },

    right: {
      alignItems: "flex-end",
      marginRight: 16,
    },

    rightContent: {
      alignItems: "center",
      justifyContent: "center",
    },

    iconContainer: {
      width: 42,
      height: 42,
      borderRadius: 21,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: `${theme.colors.primary}15`,
    },

    sectionContainer: {
      marginBottom: 20,
      borderRadius: 20,
      marginHorizontal: 12,
      backgroundColor: theme.colors.background,
    },

    expenseGroup: {
      backgroundColor: theme.colors.card,
      borderRadius: 18,
      overflow: "hidden",
    },

    activityCard: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 14,
      paddingHorizontal: 16,
    },

    header: {
      paddingTop: 52,
      paddingBottom: 32,
      paddingHorizontal: 20,
      overflow: "hidden",
    },

    blob1: {
      position: "absolute",
      top: -40,
      right: -30,
      width: 150,
      height: 150,
      borderRadius: 75,
      backgroundColor: "rgba(255,255,255,0.1)",
    },

    blob2: {
      position: "absolute",
      bottom: -60,
      left: 40,
      width: 120,
      height: 120,
      borderRadius: 60,
      backgroundColor: "rgba(255,255,255,0.07)",
    },

    shineStreak: {
      position: "absolute",
      top: -40,
      left: -80,
      width: 260,
      height: 80,
      borderRadius: 80,
      backgroundColor: "rgba(255,255,255,0.1)",
      transform: [{ rotate: "-18deg" }],
    },

    navRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      zIndex: 1,
    },

    greeting: {
      fontSize: 18,
      color: "rgba(255,255,255,0.8)",
      marginBottom: 4,
    },

    screenTitle: {
      fontSize: 28,
      fontWeight: "700",
      color: "#fff",
      letterSpacing: -0.4,
    },
  });