import React, { useEffect, useRef, useState } from "react";
import {
  Modal,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
  Text,
  ScrollView,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { BoldText, RegularText, SemiBoldText } from "../../utils/Texts";
import { useTheme } from "../../theme/ThemeProvider";
import { AppTheme } from "../../theme/constant";
import { Period } from "../../store/expenses/expenseSlice";
const { height } = Dimensions.get("screen");


interface BudgetModalProps {
  visible: boolean;
  selectedBudget: string | number;
  selectedPeroid: Period | "";
  onClose: () => void;
  onsetBudget: (budget: string, peroid: Period) => void;
}

const PERIOD_OPTIONS: { label: string; value: Period }[] = [
  { label: "Weekly", value: "weekly" },
  { label: "Monthly", value: "monthly" },
  { label: "Yearly", value: "yearly" },
];

const BudgetModal = ({
  visible,
  selectedBudget,
  selectedPeroid,
  onClose,
  onsetBudget,
}: BudgetModalProps) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const slideAnim = useRef(new Animated.Value(height)).current;

  // Local draft state — synced from props whenever the modal opens
  const [budgetInput, setBudgetInput] = useState("");
  const [periodInput, setPeriodInput] = useState<Period | "">("");

  useEffect(() => {
    if (visible) {
      // seed local state with whatever was previously selected (or blank/none)
      setBudgetInput(selectedBudget ? String(selectedBudget) : "");
      setPeriodInput(selectedPeroid || "");

      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      slideAnim.setValue(height);
    }
  }, [visible]);

  const handleClose = () => {
    Animated.timing(slideAnim, {
      toValue: height,
      duration: 250,
      useNativeDriver: true,
    }).start(() => onClose());
  };

  const handleSave = () => {
    if (!budgetInput || !periodInput) return; // basic guard, swap for validation/toast later
    onsetBudget(budgetInput, periodInput as Period);
    handleClose();
  };

  const isValid = budgetInput.trim().length > 0 && periodInput !== "";

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={handleClose}>
      <View style={styles.overlay}>
       
        <TouchableOpacity style={StyleSheet.absoluteFill} activeOpacity={1} onPress={handleClose} />

        <Animated.View style={[styles.sheet, { transform: [{ translateY: slideAnim }] }]}>
        <ScrollView>
          {/* Header */}
          <View style={styles.header}>
            <BoldText size={18} color={theme.colors.text}>Set Budget</BoldText>
            <TouchableOpacity onPress={handleClose}>
              <Ionicons name="close" size={24} color={theme.colors.text} />
            </TouchableOpacity>
          </View>

          {/* Current selection summary */}
          <View style={styles.currentBox}>
            <RegularText color={theme.colors.text} style={{ opacity: 0.5, fontSize: 12 }}>
              Current Budget
            </RegularText>
            <BoldText size={20} color={theme.colors.text} style={{ marginTop: 4 }}>
              {selectedBudget ? `₹${selectedBudget}` : "None"}
              {selectedPeroid ? (
                <RegularText color={theme.colors.text} style={{ opacity: 0.5, fontSize: 14 }}>
                  {`  /  ${selectedPeroid}`}
                </RegularText>
              ) : null}
            </BoldText>
          </View>

          {/* Budget amount input */}
          <RegularText color={theme.colors.text} style={styles.label}>
            Budget Amount
          </RegularText>
          <View style={styles.inputWrap}>
            <Text style={[styles.currencyPrefix, { color: theme.colors.text }]}>₹</Text>
            <TextInput
              value={budgetInput}
              onChangeText={setBudgetInput}
              placeholder="Enter amount"
              placeholderTextColor={theme.colors.text + "80"}
              keyboardType="numeric"
              style={[styles.input, { color: theme.colors.text }]}
            />
            <Ionicons
              name="create-outline"
              size={20}
              color={theme.colors.text}
            />
          </View>

          {/* Period selector */}
          <RegularText color={theme.colors.text} style={styles.label}>
            Period
          </RegularText>
          <View style={styles.periodRow}>
            {PERIOD_OPTIONS.map((opt) => {
              const active = periodInput === opt.value;
              return (
                <TouchableOpacity
                  key={opt.value}
                  onPress={() => setPeriodInput(opt.value)}
                  activeOpacity={0.8}
                  style={[
                    styles.periodPill,
                    {
                      backgroundColor: active ? theme.banner.accent : theme.colors.card,
                      borderColor: active ? theme.banner.accent : "rgba(0,0,0,0.1)",
                    },
                  ]}
                >
                  <SemiBoldText
                    style={{ fontSize: 13, color: active ? "#fff" : theme.colors.text }}
                  >
                    {opt.label}
                  </SemiBoldText>
                </TouchableOpacity>
              );
            })}
          </View>
          </ScrollView>

          {/* Save button */}
          <TouchableOpacity
            onPress={handleSave}
            disabled={!isValid}
            activeOpacity={0.85}
            style={[
              styles.saveBtn,
              { backgroundColor: theme.banner.accent, opacity: isValid ? 1 : 0.5 },
            ]}
          >
            <SemiBoldText style={{ color: "#fff", fontSize: 15 }}>Save Budget</SemiBoldText>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default BudgetModal;

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      justifyContent: "flex-end",
      backgroundColor: "rgba(0,0,0,0.4)",
    },
    sheet: {
      backgroundColor: theme.colors.background,
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      paddingHorizontal: 20,
      paddingTop: 20,
      paddingBottom: 30,
      height: "70%",
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 20,
    },
    currentBox: {
      backgroundColor: theme.colors.card,
      borderRadius: 16,
      padding: 16,
      marginBottom: 24,
    },
    label: {
      fontSize: 13,
      opacity: 0.6,
      marginBottom: 8,
    },
    inputWrap: {
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 1,
      borderColor: "rgba(0,0,0,0.1)",
      borderRadius: 14,
      paddingHorizontal: 14,
      marginBottom: 22,
      backgroundColor : theme.colors.card,
    },
    currencyPrefix: {
      fontSize: 16,
      fontWeight: "600",
      marginRight: 6,
    },
    input: {
      flex: 1,
      paddingVertical: 14,
      fontSize: 16,
    },
    periodRow: {
      flexDirection: "row",
      gap: 10,
      marginBottom: 30,
    },
    periodPill: {
      flex: 1,
      paddingVertical: 10,
      borderRadius: 12,
      borderWidth: 1,
      alignItems: "center",
    },
    saveBtn: {
      marginTop: "auto",
      paddingVertical: 16,
      borderRadius: 16,
      alignItems: "center",
    },
  });