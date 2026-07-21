// components/modals/IconPickerModal.tsx
import React, { useRef, useState, useMemo } from "react";
import {
  Modal,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
  FlatList,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { BoldText } from "../../utils/Texts";
import { useTheme } from "../../theme/ThemeProvider";
import { AppTheme } from "../../theme/constant";

const { height, width } = Dimensions.get("screen");
const NUM_COLUMNS = 5;

// Dummy icon set — replace/extend with your real category icon list
const ICON_LIST = [
  // Food & Drink
  "fast-food-outline", "cafe-outline", "restaurant-outline", "pizza-outline",
  "wine-outline", "beer-outline", "ice-cream-outline", "nutrition-outline",

  // Shopping
  "cart-outline", "basket-outline", "bag-outline", "bag-handle-outline",
  "pricetag-outline", "pricetags-outline", "storefront-outline", "gift-outline",

  // Transport
  "car-outline", "car-sport-outline", "bus-outline", "subway-outline",
  "train-outline", "airplane-outline", "bicycle-outline", "boat-outline",
  "rocket-outline", "walk-outline", "navigate-outline", "speedometer-outline",

  // Home & Utilities
  "home-outline", "business-outline", "bed-outline", "flash-outline",
  "water-outline", "flame-outline", "thermometer-outline", "hammer-outline",
  "construct-outline", "build-outline", "key-outline", "wifi-outline",
  "tv-outline", "hardware-chip-outline",

  // Health & Fitness
  "medkit-outline", "fitness-outline", "heart-outline", "pulse-outline",
  "bandage-outline", "body-outline", "glasses-outline",

  // Education
  "school-outline", "book-outline", "library-outline", "pencil-outline",
  "newspaper-outline",

  // Entertainment
  "film-outline", "musical-notes-outline", "game-controller-outline",
  "headset-outline", "ticket-outline", "camera-outline", "images-outline",
  "mic-outline",

  // Personal Care
  "cut-outline", "shirt-outline", "footsteps-outline",

  // Pets & Nature
  "paw-outline", "leaf-outline", "flower-outline", "earth-outline",

  // Finance
  "wallet-outline", "card-outline", "cash-outline", "calculator-outline",
  "trending-up-outline", "trending-down-outline", "stats-chart-outline",
  "bar-chart-outline", "pie-chart-outline", "receipt-outline", "briefcase-outline",

  // Communication
  "call-outline", "mail-outline", "chatbubble-outline", "phone-portrait-outline",

  // People & Family
  "people-outline", "person-outline", "happy-outline",

  // Misc
  "umbrella-outline", "star-outline", "ribbon-outline", "trophy-outline",
  "shield-checkmark-outline", "lock-closed-outline",
];

interface IconPickerModalProps {
  visible: boolean;
  onClose: () => void;
  selectedIcon: string | null;
  onSelect: (iconName: string) => void;
}

const IconPickerModal = ({ visible, onClose, selectedIcon, onSelect }: IconPickerModalProps) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const slideAnim = useRef(new Animated.Value(height)).current;

  // Local UI-only state
  const [search, setSearch] = useState("");

  React.useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      slideAnim.setValue(height);
      setSearch("");
    }
  }, [visible]);

  const handleClose = () => {
    Animated.timing(slideAnim, {
      toValue: height,
      duration: 250,
      useNativeDriver: true,
    }).start(() => onClose());
  };

  const filteredIcons = useMemo(() => {
    if (!search.trim()) return ICON_LIST;
    return ICON_LIST.filter((name) =>
      name.toLowerCase().includes(search.trim().toLowerCase())
    );
  }, [search]);

  const renderIcon = ({ item }: { item: string }) => {
    const active = item === selectedIcon;
    return (
      <TouchableOpacity
        activeOpacity={0.75}
        onPress={() => onSelect(item)}
        style={[
          styles.iconCell,
          {
            backgroundColor: active ? theme.banner.accent : theme.colors.card,
            borderColor: active ? theme.banner.accent : "transparent",
          },
        ]}
      >
        <Ionicons
          name={item}
          size={22}
          color={active ? "#fff" : theme.colors.text}
        />
      </TouchableOpacity>
    );
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={handleClose}>
      <View style={styles.overlay}>
        <TouchableOpacity style={StyleSheet.absoluteFill} activeOpacity={1} onPress={handleClose} />

        <Animated.View style={[styles.sheet, { transform: [{ translateY: slideAnim }] }]}>
          {/* Header */}
          <View style={styles.header}>
            <BoldText size={18} color={theme.colors.text}>Select Icon</BoldText>
            <TouchableOpacity onPress={handleClose}>
              <Ionicons name="close" size={24} color={theme.colors.text} />
            </TouchableOpacity>
          </View>

          {/* Search bar */}
          <View style={[styles.searchWrap, { backgroundColor: theme.colors.card }]}>
            <Ionicons name="search-outline" size={18} color={theme.colors.text} style={{ opacity: 0.5 }} />
            <TextInput
              value={search}
              onChangeText={setSearch}
              placeholder="Search icons"
              placeholderTextColor={theme.colors.text + "80"}
              style={[styles.searchInput, { color: theme.colors.text }]}
            />
          </View>

          {/* Icon grid */}
          <FlatList
            data={filteredIcons}
            keyExtractor={(item) => item}
            renderItem={renderIcon}
            numColumns={NUM_COLUMNS}
            showsVerticalScrollIndicator={false}
            columnWrapperStyle={{ gap: 12, marginBottom: 12 }}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        </Animated.View>
      </View>
    </Modal>
  );
};

export default IconPickerModal;

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
      height: "80%",
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 16,
    },
    searchWrap: {
      flexDirection: "row",
      alignItems: "center",
      borderRadius: 14,
      paddingHorizontal: 14,
      marginBottom: 18,
      gap: 8,
    },
    searchInput: {
      flex: 1,
      paddingVertical: 12,
      fontSize: 15,
    },
    iconCell: {
      flex: 1,
      aspectRatio: 1,
      borderRadius: 14,
      borderWidth: 1.5,
      alignItems: "center",
      justifyContent: "center",
    },
  });