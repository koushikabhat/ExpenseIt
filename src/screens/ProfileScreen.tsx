import { TouchableOpacity, View, StyleSheet, Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import ScreenHeader from "../components/ScreenHeader";
import { BoldText, RegularText } from "../utils/Texts";
import Ionicons from "react-native-vector-icons/Ionicons";
import { AppTheme } from "../theme/constant";
import { useTheme } from "../theme/ThemeProvider";
import LinearGradient from "react-native-linear-gradient";

const ProfileScreen  = () => {
    const {theme} = useTheme();
    const styles = createStyles(theme);


return(
  <SafeAreaView style={{flex : 1, backgroundColor : theme.colors.background}}>
    <LinearGradient
      colors={[theme.banner.accent, theme.banner.accentSecondary]}
      start={{ x: 0.0, y: 0.0 }}
      end={{ x: 1.0, y: 1.0 }}
      style={styles.header}
    >
      {/* Decorative blobs */}
      <View style={styles.blob1} />
      <View style={styles.blob2} />
      <View style={styles.shineStreak} />

      <View style={styles.navRow}>
        <View style={styles.profileContainer}>
          <View style={styles.avatar}>
            <View style={{flex : 1, justifyContent : 'center', alignContent : 'center', marginLeft : 14}}>
            <Ionicons name="person" size={40} color={theme.colors.text} />
            </View>
          </View>

          <View style={styles.profileInfo}>
            <Text style={styles.screenTitle}>Koushik</Text>
            <Text style={styles.email}> koushik@example.com </Text>
          </View>

        </View>
      </View>
    </LinearGradient>

    <View style={styles.body}>
      <View style={styles.settingsContainer}>
        <BoldText size={18} style={styles.sectionTitle}> General Settings </BoldText>

        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="moon-outline" size={22} color={theme.colors.primary}/>
          <RegularText style={styles.menuText}> Theme </RegularText>
          <Ionicons name="chevron-forward" size={18} color={theme.colors.text} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="notifications-outline" size={22} color={theme.colors.primary}/>
          <RegularText style={styles.menuText}> Notifications </RegularText>
          <Ionicons name="chevron-forward" size={18} color={theme.colors.text}/>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="help-circle-outline" size={22} color={theme.colors.primary} />
          <RegularText style={styles.menuText}> Help & Support </RegularText>
          <Ionicons name="chevron-forward" size={18} color={theme.colors.text}/>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="shield-checkmark-outline" size={22} color={theme.colors.primary}/>
          <RegularText style={styles.menuText}>Privacy Policy </RegularText>
          <Ionicons name="chevron-forward" size={18} color={theme.colors.text} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.signOutButton}>
        <Ionicons name="log-out-outline" size={22} color="#FFF"/>
        <BoldText color="#FFF"> Sign Out </BoldText>
      </TouchableOpacity>
    </View>
  </SafeAreaView>
    );
}

export default ProfileScreen;

const createStyles = (theme : AppTheme) => StyleSheet.create({
  body: {
    marginTop: -18,
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    backgroundColor: theme.colors.background,
    paddingHorizontal: 16,
    paddingTop: 22,
  },
  settingsContainer: {
    marginTop: 16,
    padding: 12,
    borderRadius: 20,
    backgroundColor: theme.colors.background,
  },
  
  sectionTitle: {
    marginBottom: 16,
    color: theme.colors.text
  },
  
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    color : theme.colors.text
  },
  
  menuText: {
    flex: 1,
    marginLeft: 12,
    color : theme.colors.text
  },
  
  signOutButton: {
    marginHorizontal: 16,
    marginTop: 24,
    height: 56,
    borderRadius: 16,
    backgroundColor: theme.colors.danger,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  header: {
    paddingTop: 12,
    paddingBottom: 32,
    paddingHorizontal: 20,
    overflow: 'hidden',
  },
  blob1: {
    position: 'absolute',
    top: -40,
    right: -30,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  blob2: {
    position: 'absolute',
    bottom: -60,
    left: 40,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255,255,255,0.07)',
  },
  shineStreak: {
    position: 'absolute',
    top: -40,
    left: -80,
    width: 260,
    height: 80,
    borderRadius: 80,
    backgroundColor: 'rgba(255,255,255,0.1)',
    transform: [{ rotate: '-18deg' }],
  },
  navRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    zIndex: 1,
  },
  greeting: {
    fontSize: 18,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 4,
  },
  screenTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: -0.4,
  },

  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 46,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.7)',
  },
  
  profileInfo: {
    marginLeft: 12,
  },
  
  email: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 13,
    marginTop: 2,
  },
})  