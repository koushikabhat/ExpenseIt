// components/modals/CategoryModal.tsx
import React, { useRef, useState } from "react";
import {
  Modal,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { BoldText, RegularText, SemiBoldText } from "../../utils/Texts";
import { useTheme } from "../../theme/ThemeProvider";
import { AppTheme } from "../../theme/constant";
import IconPickerModal from "./IconPickerModal";

const { height } = Dimensions.get("screen");

interface CategoryModalProps {
  visible: boolean;
  onClose: () => void;
}

const CategoryModal = ({ visible, onClose }: CategoryModalProps) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const slideAnim = useRef(new Animated.Value(height)).current;

  // ── Local UI-only state (swap for redux/form logic later) ──
  const [categoryName, setCategoryName] = useState("");
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [showIconPicker, setShowIconPicker] = useState(false);

  React.useEffect(() => {
    if (visible) {
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

  const isValid = categoryName.trim().length > 0 && !!selectedIcon;

  return (
    <>
      <Modal visible={visible} transparent animationType="fade" onRequestClose={handleClose}>
        <View style={styles.overlay}>
          <TouchableOpacity style={StyleSheet.absoluteFill} activeOpacity={1} onPress={handleClose} />

          <Animated.View style={[styles.sheet, { transform: [{ translateY: slideAnim }] }]}>
            {/* Header */}
            <View style={styles.header}>
              <BoldText size={18} color={theme.colors.text}>Add Category</BoldText>
              <TouchableOpacity onPress={handleClose}>
                <Ionicons name="close" size={24} color={theme.colors.text} />
              </TouchableOpacity>
            </View>

            {/* Category name input */}
            <RegularText color={theme.colors.text} style={styles.label}>
              Category Name
            </RegularText>
            <View style={styles.inputWrap}>
              <TextInput
                value={categoryName}
                onChangeText={setCategoryName}
                placeholder="e.g. Groceries"
                placeholderTextColor={theme.colors.text + "80"}
                style={[styles.input, { color: theme.colors.text }]}
              />
            </View>

            {/* Icon select */}
            <RegularText color={theme.colors.text} style={styles.label}>
              Icon
            </RegularText>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setShowIconPicker(true)}
              style={[styles.iconSelectBtn, { backgroundColor: theme.colors.card }]}
            >
              <View style={styles.iconSelectLeft}>
                <View
                  style={[
                    styles.iconPreview,
                    { backgroundColor: `${theme.banner.accent}14` },
                  ]}
                >
                  <Ionicons
                    name={selectedIcon || "help-circle-outline"}
                    size={20}
                    color={theme.banner.accent}
                  />
                </View>
                <SemiBoldText style={{ fontSize: 14, color: theme.colors.text }}>
                  {selectedIcon ? "Change Icon" : "Select Icon"}
                </SemiBoldText>
              </View>
              <Ionicons name="chevron-forward" size={18} color={theme.colors.text} style={{ opacity: 0.3 }} />
            </TouchableOpacity>

            {/* Save button */}
            <TouchableOpacity
              onPress={() => {
                // TODO: dispatch(addCategory({ name: categoryName, icon: selectedIcon }))
              }}
              disabled={!isValid}
              activeOpacity={0.85}
              style={[
                styles.saveBtn,
                { backgroundColor: theme.banner.accent, opacity: isValid ? 1 : 0.5 },
              ]}
            >
              <SemiBoldText style={{ color: "#fff", fontSize: 15 }}>Save Category</SemiBoldText>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>

      {/* Nested icon picker */}
      <IconPickerModal
        visible={showIconPicker}
        onClose={() => setShowIconPicker(false)}
        selectedIcon={selectedIcon}
        onSelect={() => {
          setShowIconPicker(false);
        }}
      />
    </>
  );
};

export default CategoryModal;

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      justifyContent: "flex-end",
      backgroundColor: "rgba(0,0,0,0.4)",
    },
    sheet: {
      borderColor : theme.colors.primary,
      backgroundColor: theme.colors.background,
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      paddingHorizontal: 20,
      paddingTop: 20,
      paddingBottom: 30,
      height: "60%",
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 20,
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
    },
    input: {
      flex: 1,
      paddingVertical: 14,
      fontSize: 16,
    },
    iconSelectBtn: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      borderRadius: 14,
      paddingHorizontal: 14,
      paddingVertical: 12,
      marginBottom: 24,
    },
    iconSelectLeft: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
    },
    iconPreview: {
      width: 40,
      height: 40,
      borderRadius: 12,
      alignItems: "center",
      justifyContent: "center",
    },
    saveBtn: {
      marginTop: "auto",
      paddingVertical: 16,
      borderRadius: 16,
      alignItems: "center",
    },
  });