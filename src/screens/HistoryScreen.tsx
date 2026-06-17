import React from "react";
import { View, SectionList, StyleSheet, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";

import ScreenHeader from "../components/ScreenHeader";
import { BoldText, RegularText } from "../utils/Texts";
import { useTheme } from "../theme/ThemeProvider";
import { AppTheme } from "../theme/constant";

const expenses = [
  {
    id : "1",
    title: "16 June 2026",
    data: [
      {
        id: "1",
        icon: "cart-outline",
        title: "Groceries",
        subtitle: "D-Mart",
        amount: "₹1250",
        time: "10:30 AM",
      },
      {
        id: "2",
        icon: "car-outline",
        title: "Transport",
        subtitle: "Uber Ride",
        amount: "₹320",
        time: "08:15 AM",
      },
    ],
  },
  {
    id : "2",
    title: "15 June 2026",
    data: [
      {
        id: "3",
        icon: "restaurant-outline",
        title: "Food",
        subtitle: "McDonalds",
        amount: "₹540",
        time: "01:15 PM",
      },
      {
        id: "4",
        icon: "film-outline",
        title: "Entertainment",
        subtitle: "Movie Ticket",
        amount: "₹800",
        time: "07:45 PM",
      },
    ],
  },
];



const HistoryScreen = () => {
    const { theme } = useTheme();
    const styles = createStyles(theme);


    const renderExpense = ({ item }: any) => {
        return (
        <View style={styles.sectionContainer}>
            <View style={[ styles.dateContainer,{ backgroundColor: theme.colors.card }]}>
                <Ionicons
                    name="calendar-outline"
                    size={18}
                    color={theme.colors.primary}
                />
    
                <BoldText color={theme.colors.text} style={{ marginLeft: 8 }}>
                    {item.title}
                </BoldText>
            </View>
    
            <View style={[ styles.expenseGroup, { backgroundColor: theme.colors.background, borderColor: theme.colors.border, borderWidth: 1}]}>

                {item.data.map((expense: any, index: number) => (
                    <View key={expense.id} style={[ styles.activityCard, index !== item.data.length - 1 && { borderBottomWidth: 1, borderBottomColor: theme.colors.border}]}>
                    <View style={[ styles.iconContainer, { backgroundColor: theme.colors.card }]}>
                        <Ionicons
                        name={expense.icon}
                        size={22}
                        color={theme.colors.primary}
                        />
                    </View>
        
                    <View style={styles.activityContent}>
                        <BoldText color={theme.colors.text}>
                        {expense.title}
                        </BoldText>
        
                        <RegularText color={theme.colors.text}>
                        {expense.subtitle}
                        </RegularText>
                    </View>
        
                    <View style={styles.right}>
                        <BoldText color={theme.colors.text}>
                        {expense.amount}
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
    };



    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.card }]}>
            <ScreenHeader title="Expense History" showBack />
            <FlatList
                data={expenses}
                keyExtractor={(item : any) => item.title}
                renderItem={renderExpense}
            />
        </SafeAreaView>
    );
};

export default HistoryScreen;

const createStyles  = (theme : AppTheme) => StyleSheet.create({
  container: {
    flex: 1,
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

  listContent: {
    padding: 16,
  },
  
  groupContainer: {
    backgroundColor: theme.colors.card,
    borderRadius: 20,
    marginBottom: 20,
    overflow: 'hidden',
  },
  
  dateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  
  expenseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  
  iconContainer: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: `${theme.colors.primary}15`,
  },
  sectionContainer: {
    marginBottom: 20,
    borderRadius : 20,
    marginHorizontal : 12,
  },
  
  dateTitle: {
    marginBottom: 10,
  },
  
  expenseGroup: {
    backgroundColor: theme.colors.card,
    borderRadius: 18,
    overflow: 'hidden',
  },
  
  activityCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
});
