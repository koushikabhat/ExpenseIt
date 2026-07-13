// import React, { useEffect, useRef } from "react";
// import { Modal, View, TouchableOpacity, StyleSheet, Animated, Dimensions } from "react-native";
// import Ionicons from "react-native-vector-icons/Ionicons";
// import { BoldText, RegularText } from "../utils/Texts";
// import { useTheme } from "../theme/ThemeProvider";

// const { height } = Dimensions.get("window");

// interface CategoryModalProps {
//   visible: boolean;
//   onClose: () => void;
//   allCount?: number;
//   customCount?: number;
// }

// const CategoryModal = ({ visible, onClose, allCount = 0, customCount = 0 }: CategoryModalProps) => {
//   const { theme } = useTheme();
//   const styles = createStyles(theme);

//   const slideAnim = useRef(new Animated.Value(height)).current;
//   const [activeFilter, setActiveFilter] = React.useState<"all" | "custom">("all");

//   useEffect(() => {
//     if (visible) {
//       Animated.timing(slideAnim, {
//         toValue: 0,
//         duration: 300,
//         useNativeDriver: true,
//       }).start();
//     } else {
//       slideAnim.setValue(height);
//     }
//   }, [visible]);

//   const handleClose = () => {
//     Animated.timing(slideAnim, {
//       toValue: height,
//       duration: 250,
//       useNativeDriver: true,
//     }).start(() => onClose());
//   };

//   return (
//     <Modal visible={visible} transparent animationType="fade" onRequestClose={handleClose}>
//       <View style={styles.overlay}>
//         <TouchableOpacity style={StyleSheet.absoluteFill} activeOpacity={1} onPress={handleClose} />

//         <Animated.View style={[styles.sheet, { transform: [{ translateY: slideAnim }] }]}>
//           {/* Header */}
//           <View style={styles.header}>
//             <BoldText size={18} color={theme.colors.text}>Select Category</BoldText>
//             <TouchableOpacity onPress={handleClose}>
//               <Ionicons name="close" size={24} color={theme.colors.text} />
//             </TouchableOpacity>
//           </View>

//           {/* Filter Buttons */}
//           <View style={styles.filterRow}>
//             <TouchableOpacity
//               style={[styles.filterButton, activeFilter === "all" && styles.filterButtonActive]}
//               onPress={() => setActiveFilter("all")}
//             >
//               <RegularText color={activeFilter === "all" ? "#FFF" : theme.colors.text}>
//                 All ({allCount})
//               </RegularText>
//             </TouchableOpacity>

//             <TouchableOpacity
//               style={[styles.filterButton, activeFilter === "custom" && styles.filterButtonActive]}
//               onPress={() => setActiveFilter("custom")}
//             >
//               <RegularText color={activeFilter === "custom" ? "#FFF" : theme.colors.text}>
//                 Custom ({customCount})
//               </RegularText>
//             </TouchableOpacity>
//           </View>

//           {/* content goes here */}
//         </Animated.View>
//       </View>
//     </Modal>
//   );
// };

// export default CategoryModal;

// const createStyles = (theme: any) =>
//   StyleSheet.create({
//     overlay: {
//       flex: 1,
//       justifyContent: "flex-end",
//       backgroundColor: "rgba(0,0,0,0.4)",
//     },
//     sheet: {
//       backgroundColor: theme.colors.background,
//       borderTopLeftRadius: 24,
//       borderTopRightRadius: 24,
//       paddingHorizontal: 20,
//       paddingTop: 20,
//       paddingBottom: 30,
//       minHeight: height * 0.5,
//     },
//     header: {
//       flexDirection: "row",
//       justifyContent: "space-between",
//       alignItems: "center",
//       marginBottom: 20,
//     },
//     filterRow: {
//       flexDirection: "row",
//       gap: 10,
//       marginBottom: 16,
//     },
//     filterButton: {
//       paddingVertical: 8,
//       paddingHorizontal: 16,
//       borderRadius: 20,
//       borderWidth: 1,
//       borderColor: theme.colors.border,
//       backgroundColor: theme.colors.card,
//     },
//     filterButtonActive: {
//       backgroundColor: theme.colors.primary,
//       borderColor: theme.colors.primary,
//     },
//   });


import React, { useEffect, useRef, useState } from "react";
import { Modal, View, TextInput, TouchableOpacity, StyleSheet, Animated, Dimensions, KeyboardAvoidingView, Text,  FlatList, Pressable } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { BoldText, RegularText } from "../utils/Texts";
import { useTheme } from "../theme/ThemeProvider";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { useSelector } from "react-redux";
import { RootState } from "../store";
const { height } = Dimensions.get("screen");

interface CategoryModalProps {
  visible: boolean;
  onClose: () => void;
  allCount?: number;
  customCount?: number;
}

const CategoryModal = ({ visible, onClose, allCount = 0, customCount = 0 }: CategoryModalProps) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const {categories} = useSelector((state : RootState) => state.category);

  const slideAnim = useRef(new Animated.Value(height)).current;
  const [activeFilter, setActiveFilter] = React.useState<"all" | "custom">("all");
  const [searchText, setSearchText] = useState("");
  const [selectedCatId, setSelectedCatId] = useState("");
  
  useEffect(() => {
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

  return (
    
    <Modal visible={visible} transparent animationType="fade" onRequestClose={handleClose}>
        
      <View style={styles.overlay}>
        <TouchableOpacity style={StyleSheet.absoluteFill} activeOpacity={1} onPress={handleClose} />
        
        
        <Animated.View style={[styles.sheet, { transform: [{ translateY: slideAnim }] }]}>
          {/* Header */}
          <View style={styles.header}>
            <BoldText size={18} color={theme.colors.text}>Select Category</BoldText>
            <TouchableOpacity onPress={handleClose}>
              <Ionicons name="close" size={24} color={theme.colors.text} />
            </TouchableOpacity>
          </View>

          {/* Filter Buttons */}
          <View style={styles.filterRow}>
            <TouchableOpacity
              style={[styles.filterButton, activeFilter === "all" && styles.filterButtonActive]}
              onPress={() => setActiveFilter("all")}
            >
              <RegularText color={activeFilter === "all" ? "#FFF" : theme.colors.text}>
                All ({allCount})
              </RegularText>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.filterButton, activeFilter === "custom" && styles.filterButtonActive]}
              onPress={() => setActiveFilter("custom")}
            >
              <RegularText color={activeFilter === "custom" ? "#FFF" : theme.colors.text}>
                Custom ({customCount})
              </RegularText>
            </TouchableOpacity>
          </View>

          {/* Search Box */}
          <View style={styles.searchContainer}>
            <Ionicons name="search-outline" size={20} color={theme.colors.text} style={{ opacity: 0.6 }} />
            <TextInput
              value={searchText}
              onChangeText={setSearchText}
              placeholder="Search category"
              placeholderTextColor={theme.colors.text + "80"}
              style={styles.searchInput}
            />
            {searchText.length > 0 && (
              <TouchableOpacity onPress={() => setSearchText("")}>
                <Ionicons name="close-circle" size={18} color={theme.colors.text} style={{ opacity: 0.6 }} />
              </TouchableOpacity>
            )}
          </View>

          <FlatList
            data={categories}
            extraData={selectedCatId}
            keyExtractor={(item) => item.category_id}
            renderItem={({ item }) => {
               
            return (
                <Pressable  style={styles.categoryItem} onPress={() => setSelectedCatId(item.category_id)}>
                    {/* Left */}
                    <View style={styles.leftContainer}>

                     <Ionicons
                      name={item.icon}
                     size={24}
                      color={theme.colors.primary}
                     />
                
                     <View style={styles.textContainer}>
                     <BoldText color={theme.colors.text}>{item.name}</BoldText>
                
                     <RegularText size={12} color={theme.colors.text + "80"} >
                      {item.name}
                     </RegularText>
                     </View>
                    </View>
                
                    {/* Right */}
                    {selectedCatId === item.category_id ? (
                    <Ionicons
                     name="checkmark-circle"
                     size={24}
                     color={ theme.colors.primary }
                    />
                    ): (
                    <Ionicons
                     name="ellipse-outline"
                     size={24}
                     color={ theme.colors.primary }
                    />
                        
                    )
                   }
                    
                </Pressable >
            )
            }
            }        
          />

          {/* content goes here */}
        </Animated.View>
       
      </View>
      
    </Modal>
    
  );
};

export default CategoryModal;

const createStyles = (theme: any) =>
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
      height : "75%"
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 20,
    },
    filterRow: {
      flexDirection: "row",
      gap: 10,
      marginBottom: 16,
    },
    filterButton: {
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.card,
    },
    filterButtonActive: {
      backgroundColor: theme.colors.primary,
      borderColor: theme.colors.primary,
    },
    searchContainer: {
      flexDirection: "row",
      alignItems: "center",
      height: 48,
      borderRadius: 14,
      paddingHorizontal: 14,
      gap: 10,
      backgroundColor: theme.colors.card,
      borderWidth: 1,
      borderColor: theme.colors.border,
      marginBottom: 16,
    },
    searchInput: {
      flex: 1,
      color: theme.colors.text,
    },


    categoryItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 14,
      },
      
      leftContainer: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
      },
      
      textContainer: {
        marginLeft: 12,
        flex: 1,
      },
  });