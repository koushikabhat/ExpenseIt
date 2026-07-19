import React, {useCallback, useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import {useTheme} from '../theme/ThemeProvider';
import {BoldText, RegularText, SemiBoldText} from '../utils/Texts';
import {AppTheme} from '../theme/constant';
import { useFocusEffect } from '@react-navigation/native';
import { getCategoryWiseExpense } from '../api/services/categoryService';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryWiseAmount } from '../store/category/categorySlice';
import { RootState } from '../store';

// ─── Component ────────────────────────────────────────────────────────────────

const CategoryListScreen = ({navigation}: any) => {
  const {theme} = useTheme();
  const styles  = createStyles(theme);
  const dispatch = useDispatch();

  const {categoryWiseAmount} = useSelector((s : RootState) => s.category);
  const { budget} = useSelector((s : RootState) => s.expense);


  const [modalVisible, setModalVisible] = useState(false);

  // Modal state
  const [name, setName] = useState('');

  const resetModal = () => {
    // pass
  };

  const handleCreate = () => {
    resetModal();
    setModalVisible(false);
  };


  const fetchData = async() => {
    try{
      const response  = await getCategoryWiseExpense();
      if(response?.data?.success){
        dispatch(setCategoryWiseAmount(response?.data?.data));
      }

    }catch(error: any){
      console.log("error occured", error?.response?.data)
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchData()
    }, [])
  )


  //  Category card 
  const renderItem = ({item}: any) => {
    const pct = Number(budget) > 0 ? Math.round((item.total_spent / Number(budget)) * 100) : 0;
    return (
      <TouchableOpacity
        activeOpacity={0.75}
        onPress={() => navigation?.navigate('CategoryDetailScreen', {category: item})}
        style={[styles.card, {backgroundColor: theme.colors.card}]}
      >
        {/* Icon */}
        <View style={[styles.cardIcon, {backgroundColor: `${item.color}18`}]}>
          {item.emoji ? <BoldText style={{fontSize: 22}}>{item.category_icon}</BoldText> : <Ionicons name={item.category_icon} size={22} color={theme.banner.accent} />}
        </View>

        {/* Info */}
        <View style={styles.cardBody}>
          <View style={styles.cardTopRow}>
            <BoldText color={theme.colors.text} style={{fontSize: 15}}>{item.category_name}</BoldText>
            <BoldText color={theme.colors.text} style={{fontSize: 14}}>
              ₹{item.total_spent ?? 0}
            </BoldText>
          </View>

          { Number(budget) > 0 && (
            <>
              <View style={[styles.progressTrack, {backgroundColor: theme.colors.background}]}>
                <View style={[styles.progressFill, {width: `${Math.min(pct, 100)}%`, backgroundColor: theme.banner.accent}]} />
              </View>
              <View style={styles.cardBottomRow}>
                <RegularText color={theme.colors.text} style={styles.metaText}>
                  Budget ₹{ Number(budget) ?? 0}
                </RegularText>
                <SemiBoldText style={{fontSize: 11, color: theme.colors.text}}>{pct}% used</SemiBoldText>
              </View>
            </>
          )}

          {Number(budget) === 0 && (
            <RegularText color={theme.colors.text} style={styles.metaText}>
              No budget set
            </RegularText>
          )}
        </View>

        <Ionicons name="chevron-forward" size={15} color={theme.colors.text} style={{opacity: 0.25}} />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: theme.colors.background}]}>

      {/* ── Gradient header  */}
      <LinearGradient
        colors={[theme.banner.accent, theme.banner.accentSecondary]}
        start={{x: 0.0, y: 0.0}}
        end={{x: 1.0, y: 1.0}}
        style={styles.header}
      >
        <View style={styles.blob1} />
        <View style={styles.blob2} />
        <View style={styles.shineStreak} />
        <BoldText style={styles.headerTitle}>Categories</BoldText>
        <RegularText style={styles.headerSub}>
          {categoryWiseAmount.length} categories tracked
        </RegularText>
      </LinearGradient>

      {/*  Body  */}
      <View style={[styles.body, {backgroundColor: theme.colors.background}]}>
        <FlatList
          data={categoryWiseAmount}
          keyExtractor={item => item.category_id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 100}}
        />
      </View>

      {/* FAB  */}
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        activeOpacity={0.85}
        style={styles.fab}
      >
        <LinearGradient
          colors={[theme.banner.accent, theme.banner.accentSecondary]}
          start={{x: 0, y: 0}} end={{x: 1, y: 1}}
          style={styles.fabGradient}
        >
          <Ionicons name="add" size={28} color="#fff" />
        </LinearGradient>
      </TouchableOpacity>

      {/* ── Add Category Modal  */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => { resetModal(); setModalVisible(false); }}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => { resetModal(); setModalVisible(false); }}
        />

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.modalWrapper}
        >
          <View style={[styles.modalSheet, {backgroundColor: theme.colors.card}]}>

            {/* Handle */}
            <View style={[styles.handle, {backgroundColor: theme.colors.border}]} />

            {/* Title */}
            <View style={styles.modalHeader}>
              <BoldText color={theme.colors.text} style={{fontSize: 18}}>New Category</BoldText>
              <TouchableOpacity onPress={() => { resetModal(); setModalVisible(false); }}>
                <Ionicons name="close-circle-outline" size={24} color={theme.colors.text} />
              </TouchableOpacity>
            </View>

            {/* Name input */}
            <SemiBoldText style={[styles.fieldLabel, {color: theme.colors.text}]}>Name</SemiBoldText>
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="e.g. Subscriptions"
              placeholderTextColor={`${theme.colors.text}55`}
              style={[styles.nameInput, {
                color: theme.colors.text,
                backgroundColor: theme.colors.background,
                borderColor: theme.colors.border,
              }]}
            />

            {/* Color picker */}
            <SemiBoldText style={[styles.fieldLabel, {color: theme.colors.text}]}>Color</SemiBoldText>

            {/* Create button */}
            <TouchableOpacity onPress={handleCreate} activeOpacity={0.85} style={{marginTop: 14}}>
              <LinearGradient
                colors={[ theme.banner.accentSecondary]}
                start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                style={styles.createBtn}
              >
                <Ionicons name="add-circle-outline" size={18} color="#fff" />
                <BoldText style={{color: '#fff', fontSize: 15, marginLeft: 8}}>
                  Create Category
                </BoldText>
              </LinearGradient>
            </TouchableOpacity>

          </View>
        </KeyboardAvoidingView>
      </Modal>

    </SafeAreaView>
  );
};

export default CategoryListScreen;

// Styles 
const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {flex: 1},

    // Header
    header: {
      paddingTop: 52, paddingBottom: 34, paddingHorizontal: 20, overflow: 'hidden',
    },
    blob1: {
      position: 'absolute', top: -40, right: -30,
      width: 150, height: 150, borderRadius: 75,
      backgroundColor: 'rgba(255,255,255,0.1)',
    },
    blob2: {
      position: 'absolute', bottom: -60, left: 40,
      width: 120, height: 120, borderRadius: 60,
      backgroundColor: 'rgba(255,255,255,0.07)',
    },
    shineStreak: {
      position: 'absolute', top: -40, left: -80,
      width: 260, height: 80, borderRadius: 80,
      backgroundColor: 'rgba(255,255,255,0.1)',
      transform: [{rotate: '-18deg'}],
    },
    headerTitle: {fontSize: 28, color: '#fff', letterSpacing: -0.4},
    headerSub:   {fontSize: 13, color: 'rgba(255,255,255,0.75)', marginTop: 4},

    // Body
    body: {
      flex: 1, marginTop: -18,
      borderTopLeftRadius: 26, borderTopRightRadius: 26,
      paddingHorizontal: 16, paddingTop: 20,
    },

    // Category card
    card: {
      flexDirection: 'row', alignItems: 'center',
      borderRadius: 18, padding: 14, marginBottom: 10, gap: 12,
      shadowColor: '#000', shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.06, shadowRadius: 6, elevation: 2,
    },
    cardIcon: {
      width: 48, height: 48, borderRadius: 14,
      alignItems: 'center', justifyContent: 'center',
    },
    cardBody:      {flex: 1, gap: 6},
    cardTopRow:    {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'},
    cardBottomRow: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'},
    progressTrack: {height: 5, borderRadius: 3, overflow: 'hidden'},
    progressFill:  {height: '100%', borderRadius: 3},
    metaText:      {fontSize: 11, opacity: 0.45},

    // FAB
    fab: {
      position: 'absolute', bottom: 28, right: 22,
      shadowColor: theme.banner.accent,
      shadowOffset: {width: 0, height: 6},
      shadowOpacity: 0.4, shadowRadius: 12, elevation: 8,
    },
    fabGradient: {
      width: 58, height: 58, borderRadius: 18,
      alignItems: 'center', justifyContent: 'center',
    },

    // Modal
    modalOverlay: {
      flex: 1, backgroundColor: 'rgba(0,0,0,0.45)',
    },
    modalWrapper: {
      position: 'absolute', bottom: 0, left: 0, right: 0,
    },
    modalSheet: {
      borderTopLeftRadius: 28, borderTopRightRadius: 28,
      padding: 20, paddingBottom: 34,
    },
    handle: {
      width: 40, height: 4, borderRadius: 2,
      alignSelf: 'center', marginBottom: 16,
    },
    modalHeader: {
      flexDirection: 'row', justifyContent: 'space-between',
      alignItems: 'center', marginBottom: 20,
    },

    // Fields
    fieldLabel: {fontSize: 13, opacity: 0.6, marginBottom: 8},
    nameInput: {
      borderWidth: 1, borderRadius: 12,
      paddingHorizontal: 14, paddingVertical: 12,
      fontSize: 15, marginBottom: 18,
    },

    // Colors
    colorRow: {flexDirection: 'row', gap: 10, paddingVertical: 4},
    colorSwatch: {
      width: 32, height: 32, borderRadius: 10,
      alignItems: 'center', justifyContent: 'center',
    },
    colorSwatchSelected: {
      borderWidth: 2.5, borderColor: '#fff',
      shadowColor: '#000', shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.25, shadowRadius: 4, elevation: 4,
    },

    // Tabs
    tabRow: {
      flexDirection: 'row', borderRadius: 12,
      padding: 4, marginBottom: 14,
    },
    tabBtn: {
      flex: 1, paddingVertical: 8,
      borderRadius: 10, alignItems: 'center',
    },

    // Icon grid
    iconScroll: {maxHeight: 160, marginBottom: 4},
    iconGrid:   {flexDirection: 'row', flexWrap: 'wrap', gap: 10},
    iconCell: {
      width: 48, height: 48, borderRadius: 13,
      alignItems: 'center', justifyContent: 'center',
    },

    // Emoji
    emojiWrap: {gap: 12},
    emojiPreview: {
      alignSelf: 'center', width: 80, height: 80,
      borderRadius: 20, alignItems: 'center', justifyContent: 'center',
    },

    // Create button
    createBtn: {
      flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
      paddingVertical: 15, borderRadius: 16,
    },
  });
