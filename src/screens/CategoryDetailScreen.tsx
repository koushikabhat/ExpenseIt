import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import {useTheme} from '../theme/ThemeProvider';
import {BoldText, RegularText, SemiBoldText} from '../utils/Texts';
import {AppTheme} from '../theme/constant';

// ─── Sample data ──────────────────────────────────────────────────────────────

const CATEGORY = {
  name: 'Food & Dining',
  icon: 'restaurant-outline',
  color: '#3B82F6',
  totalSpent: 4500,
  budget: 6000,
};

const TRANSACTIONS = [
  {id: '1', title: 'Lunch with team',  amount: 850,  time: '01:30 PM', date: '16 Jun 2026', note: 'Paid via UPI'},
  {id: '2', title: '',                 amount: 320,  time: '08:00 AM', date: '16 Jun 2026', note: ''},
  {id: '3', title: 'Dinner - Zomato',  amount: 540,  time: '08:45 PM', date: '15 Jun 2026', note: ''},
  {id: '4', title: '',                 amount: 120,  time: '11:00 AM', date: '14 Jun 2026', note: 'Tea and snacks'},
  {id: '5', title: 'McDonalds',        amount: 430,  time: '02:15 PM', date: '13 Jun 2026', note: ''},
  {id: '6', title: '',                 amount: 980,  time: '07:00 PM', date: '12 Jun 2026', note: ''},
  {id: '7', title: 'Cafe Coffee Day',  amount: 260,  time: '04:30 PM', date: '11 Jun 2026', note: 'Client meeting'},
];

const FILTERS = ['All', 'This Week', 'This Month', 'Last Month'];

// ─── Component ────────────────────────────────────────────────────────────────

const CategoryDetailScreen = () => {
  const {theme}                     = useTheme();
  const styles                      = createStyles(theme);
  const [activeFilter, setFilter]   = useState('All');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [notes, setNotes]           = useState<Record<string, string>>({});
  const [editingId, setEditingId]   = useState<string | null>(null);

  const usedPct = Math.round((CATEGORY.totalSpent / CATEGORY.budget) * 100);

  const handleCardPress = (id: string) =>
    setExpandedId(prev => (prev === id ? null : id));

  const handleSaveNote = (id: string, text: string) => {
    setNotes(prev => ({...prev, [id]: text}));
    setEditingId(null);
  };

  // ── Card ──────────────────────────────────────────────────────────────────

  const renderItem = ({item, index}: any) => {
    const isExpanded = expandedId === item.id;
    const savedNote  = notes[item.id] ?? item.note;
    const isEditing  = editingId === item.id;

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => handleCardPress(item.id)}
        style={[
          styles.card,
          {backgroundColor: theme.colors.card},
          isExpanded && {borderColor: CATEGORY.color, borderWidth: 1.5},
        ]}
      >
        {/* Main row */}
        <View style={styles.cardRow}>
          {/* Icon */}
          <View style={[styles.cardIcon, {backgroundColor: `${CATEGORY.color}18`}]}>
            <Ionicons name={CATEGORY.icon} size={20} color={CATEGORY.color} />
          </View>

          {/* Title + date */}
          <View style={styles.cardMid}>
            <BoldText color={theme.colors.text} style={{fontSize: 14}}>
              {item.title || 'Expense'}
            </BoldText>
            <RegularText color={theme.colors.text} style={styles.cardDate}>
              {item.date}  ·  {item.time}
            </RegularText>
          </View>

          {/* Amount + chevron */}
          <View style={styles.cardRight}>
            <BoldText color={theme.colors.text} style={{fontSize: 15}}>
              ₹{item.amount.toLocaleString()}
            </BoldText>
            <Ionicons
              name={isExpanded ? 'chevron-up' : 'chevron-down'}
              size={14}
              color={theme.colors.text}
              style={{opacity: 0.4, marginTop: 4, alignSelf: 'flex-end'}}
            />
          </View>
        </View>

        {/* Expanded: note section */}
        {isExpanded && (
          <View style={[styles.noteSection, {borderTopColor: theme.colors.border}]}>
            <View style={styles.noteHeader}>
              <Ionicons name="document-text-outline" size={13} color={theme.colors.text} style={{opacity: 0.5}} />
              <SemiBoldText style={[styles.noteLabel, {color: theme.colors.text}]}>
                {' '}Note
              </SemiBoldText>
            </View>

            {isEditing ? (
              <View>
                <TextInput
                  autoFocus
                  multiline
                  defaultValue={savedNote}
                  placeholder="Add a note..."
                  placeholderTextColor={`${theme.colors.text}55`}
                  style={[styles.noteInput, {color: theme.colors.text, borderColor: theme.colors.border}]}
                  onEndEditing={e => handleSaveNote(item.id, e.nativeEvent.text)}
                />
                <TouchableOpacity
                  onPress={() => setEditingId(null)}
                  style={[styles.saveBtn, {backgroundColor: CATEGORY.color}]}
                >
                  <SemiBoldText style={{color: '#fff', fontSize: 12}}>Save</SemiBoldText>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity onPress={() => setEditingId(item.id)}>
                <RegularText
                  color={savedNote ? theme.colors.text : `${theme.colors.text}55`}
                  style={styles.noteText}
                >
                  {savedNote || 'Tap to add a note...'}
                </RegularText>
              </TouchableOpacity>
            )}
          </View>
        )}
      </TouchableOpacity>
    );
  };

  // ── Header component for FlatList ─────────────────────────────────────────

  const ListHeader = () => (
    <>
      {/* Gradient header */}
      <LinearGradient
        colors={[CATEGORY.color, theme.banner.accentSecondary]}
        start={{x: 0.0, y: 0.0}}
        end={{x: 1.0, y: 1.0}}
        style={styles.header}
      >
        <View style={styles.blob1} />
        <View style={styles.blob2} />
        <View style={styles.shineStreak} />

        {/* Category name + icon */}
        <View style={styles.catRow}>
          <View style={styles.headerIcon}>
            <Ionicons name={CATEGORY.icon} size={26} color="#fff" />
          </View>
          <View style={{marginLeft: 14}}>
            <RegularText style={styles.headerSub}>Category</RegularText>
            <BoldText style={styles.headerTitle}>{CATEGORY.name}</BoldText>
          </View>
        </View>

        {/* Spent + Budget */}
        <View style={styles.amountRow}>
          <View>
            <RegularText style={styles.amountLabel}>Total Spent</RegularText>
            <BoldText style={styles.amountValue}>₹{CATEGORY.totalSpent.toLocaleString()}</BoldText>
          </View>
          <View style={styles.amountDivider} />
          <View>
            <RegularText style={styles.amountLabel}>Budget Set</RegularText>
            <BoldText style={styles.amountValue}>₹{CATEGORY.budget.toLocaleString()}</BoldText>
          </View>
        </View>

        {/* Progress bar */}
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, {width: `${usedPct}%`}]} />
        </View>
        <RegularText style={styles.progressLabel}>{usedPct}% of budget used</RegularText>
      </LinearGradient>

      {/* Body lift panel */}
      <View style={[styles.body, {backgroundColor: theme.colors.background}]}>
        {/* Filter chips */}
        <View style={styles.filterRow}>
          {FILTERS.map(f => {
            const active = activeFilter === f;
            return (
              <TouchableOpacity
                key={f}
                onPress={() => setFilter(f)}
                style={[
                  styles.filterChip,
                  {
                    backgroundColor: active ? CATEGORY.color : theme.colors.card,
                    borderColor: active ? CATEGORY.color : theme.colors.border,
                  },
                ]}
              >
                <SemiBoldText
                  style={{
                    fontSize: 12,
                    color: active ? '#fff' : theme.colors.text,
                  }}
                >
                  {f}
                </SemiBoldText>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Transactions label */}
        <View style={styles.sectionHeader}>
          <BoldText size={16} color={theme.colors.text}>Transactions</BoldText>
          <SemiBoldText style={{fontSize: 12, color: CATEGORY.color}}>
            {TRANSACTIONS.length} entries
          </SemiBoldText>
        </View>
      </View>
    </>
  );

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <FlatList
        data={TRANSACTIONS}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ListHeaderComponent={ListHeader}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
};

export default CategoryDetailScreen;

// ─── Styles ───────────────────────────────────────────────────────────────────

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {flex: 1},
    listContent: {paddingBottom: 40},

    // Header
    header: {
      paddingTop: 52,
      paddingBottom: 34,
      paddingHorizontal: 20,
      overflow: 'hidden',
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
    catRow: {
      flexDirection: 'row',
      alignItems: 'center',
      zIndex: 1,
    },
    headerIcon: {
      width: 54, height: 54, borderRadius: 16,
      backgroundColor: 'rgba(255,255,255,0.2)',
      borderWidth: 1, borderColor: 'rgba(255,255,255,0.3)',
      alignItems: 'center', justifyContent: 'center',
    },
    headerSub: {fontSize: 11, color: 'rgba(255,255,255,0.7)'},
    headerTitle: {fontSize: 22, color: '#fff', letterSpacing: -0.3},
    amountRow: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'rgba(255,255,255,0.13)',
      borderRadius: 14,
      borderWidth: 1,
      borderColor: 'rgba(255,255,255,0.2)',
      marginTop: 18,
      paddingVertical: 12,
      paddingHorizontal: 20,
      gap: 20,
    },
    amountDivider: {width: 1, height: 32, backgroundColor: 'rgba(255,255,255,0.25)'},
    amountLabel: {fontSize: 11, color: 'rgba(255,255,255,0.7)', marginBottom: 2},
    amountValue: {fontSize: 18, color: '#fff'},
    progressTrack: {
      height: 5, borderRadius: 4,
      backgroundColor: 'rgba(255,255,255,0.2)',
      overflow: 'hidden', marginTop: 16,
    },
    progressFill: {
      height: '100%', borderRadius: 4,
      backgroundColor: 'rgba(255,255,255,0.9)',
    },
    progressLabel: {
      fontSize: 11, color: 'rgba(255,255,255,0.7)',
      textAlign: 'right', marginTop: 5,
    },

    // Body lift
    body: {
      marginTop: -18,
      borderTopLeftRadius: 26,
      borderTopRightRadius: 26,
      paddingHorizontal: 16,
      paddingTop: 20,
    },

    // Filters
    filterRow: {
      flexDirection: 'row',
      gap: 8,
      flexWrap: 'wrap',
    },
    filterChip: {
      paddingHorizontal: 14,
      paddingVertical: 7,
      borderRadius: 20,
      borderWidth: 1,
    },

    // Section
    sectionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 20,
      marginBottom: 12,
    },

    // Transaction cards
    card: {
      marginHorizontal: 16,
      marginBottom: 10,
      borderRadius: 16,
      borderWidth: 1.5,
      borderColor: 'transparent',
      overflow: 'hidden',
    },
    cardRow: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 14,
      gap: 12,
    },
    cardIcon: {
      width: 42, height: 42,
      borderRadius: 12,
      alignItems: 'center', justifyContent: 'center',
    },
    cardMid: {flex: 1},
    cardDate: {fontSize: 11, opacity: 0.45, marginTop: 2},
    cardRight: {alignItems: 'flex-end'},

    // Note
    noteSection: {
      borderTopWidth: 1,
      paddingHorizontal: 14,
      paddingVertical: 12,
    },
    noteHeader: {flexDirection: 'row', alignItems: 'center', marginBottom: 6},
    noteLabel: {fontSize: 12, opacity: 0.6},
    noteText: {fontSize: 13, opacity: 0.8, lineHeight: 19},
    noteInput: {
      fontSize: 13,
      borderWidth: 1,
      borderRadius: 10,
      padding: 10,
      minHeight: 60,
      textAlignVertical: 'top',
      lineHeight: 19,
    },
    saveBtn: {
      alignSelf: 'flex-end',
      marginTop: 8,
      paddingHorizontal: 16,
      paddingVertical: 7,
      borderRadius: 10,
    },
  });
