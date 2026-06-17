import { TouchableOpacity, View, StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import ScreenHeader from "../components/ScreenHeader";
import { BoldText, RegularText } from "../utils/Texts";
import Ionicons from "react-native-vector-icons/Ionicons";
import { AppTheme } from "../theme/constant";
import { useTheme } from "../theme/ThemeProvider";

const ProfileScreen  = () => {
    const {theme} = useTheme();
    const styles = createStyles(theme);


    return(
        <SafeAreaView>
            {/* Header */
            <ScreenHeader title="Profile" showBack/>}

            {/* add a profile Picture at a center top of the screen */}
            <View style={styles.profileSection}>
                <TouchableOpacity
                    style={styles.avatarContainer}
                    onPress={() => {}}>

                    <Ionicons
                    name="person"
                    size={40}
                    color="#FFF"
                    />

                    {/* <View style={styles.cameraButton}>
                    <Ionicons
                        name="camera"
                        size={18}
                        color="#FFF"
                    />
                    </View> */}
                </TouchableOpacity>

                <BoldText size={22}>
                    Koushik A
                </BoldText>

                <RegularText>
                    koushik@email.com
                </RegularText>
            </View>

            {/* General Section */}
            {/*theme change ,  Notifications, Helps and support , Privacy and Policy  */}
            <View style={styles.settingsContainer}>
  <BoldText
    size={18}
    style={styles.sectionTitle}>
    General Settings
  </BoldText>

  <TouchableOpacity style={styles.menuItem}>
    <Ionicons
      name="moon-outline"
      size={22}
      color={theme.colors.primary}
    />
    <RegularText style={styles.menuText}>
      Theme
    </RegularText>
    <Ionicons
      name="chevron-forward"
      size={18}
      color={theme.colors.text}
    />
  </TouchableOpacity>

  <TouchableOpacity style={styles.menuItem}>
    <Ionicons
      name="notifications-outline"
      size={22}
      color={theme.colors.primary}
    />
    <RegularText style={styles.menuText}>
      Notifications
    </RegularText>
    <Ionicons
      name="chevron-forward"
      size={18}
      color={theme.colors.text}
    />
  </TouchableOpacity>

  <TouchableOpacity style={styles.menuItem}>
    <Ionicons
      name="help-circle-outline"
      size={22}
      color={theme.colors.primary}
    />
    <RegularText style={styles.menuText}>
      Help & Support
    </RegularText>
    <Ionicons
      name="chevron-forward"
      size={18}
      color={theme.colors.text}
    />
  </TouchableOpacity>

  <TouchableOpacity style={styles.menuItem}>
    <Ionicons
      name="shield-checkmark-outline"
      size={22}
      color={theme.colors.primary}
    />
    <RegularText style={styles.menuText}>
      Privacy Policy
    </RegularText>
    <Ionicons
      name="chevron-forward"
      size={18}
      color={theme.colors.text}
    />
  </TouchableOpacity>
</View>

<TouchableOpacity style={styles.signOutButton}>
  <Ionicons
    name="log-out-outline"
    size={22}
    color="#FFF"
  />

  <BoldText color="#FFF">
    Sign Out
  </BoldText>
</TouchableOpacity>

            {/* Seperate Section Sign out Button  */}
        </SafeAreaView>
    );
}

export default ProfileScreen;

const createStyles = (theme : AppTheme) => StyleSheet.create({
    profileSection: {
        alignItems: 'center',
        marginVertical: 24,
      },
      
      avatarContainer: {
        width: 80,
        height: 80,
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.primary,
        marginBottom: 16,
      },
      
      cameraButton: {
        position: 'absolute',
        right: 4,
        bottom: 4,
        width: 34,
        height: 34,
        borderRadius: 17,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
      },
      settingsContainer: {
        marginHorizontal: 16,
        marginTop: 16,
        padding: 16,
        borderRadius: 20,
        backgroundColor: theme.colors.background,
      },
      
      sectionTitle: {
        marginBottom: 16,
      },
      
      menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
      },
      
      menuText: {
        flex: 1,
        marginLeft: 12,
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
})  