import { TextInput, TouchableOpacity, View, StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import ScreenHeader from "../components/ScreenHeader";
import { BoldText, RegularText } from "../utils/Texts";
import Ionicons from "react-native-vector-icons/Ionicons";
import { AppTheme } from "../theme/constant";
import { useTheme } from "../theme/ThemeProvider";


const AddScreen  = () => {

    const {theme} = useTheme();
    const styles = createstylesSheet(theme);

    return(
      <SafeAreaView style={{flex : 1}}>
        <ScreenHeader title="Add Expense" showBack />

        <View style={styles.content}>
          <View style={styles.iconWrapper}>
            <Ionicons
              name="wallet-outline"
              size={40}
              color={theme.colors.primary}
            />
          </View>

          <View style={{justifyContent : "center", alignContent : "center", alignItems : 'center'}}> 
            <BoldText size={24}>Quick Add Expense </BoldText>
          </View>

          <RegularText
            color={theme.colors.text}
            style={styles.subtitle}>
            Track your spending in seconds
          </RegularText>

          <View style={styles.card}>
            {/* Amount */}
            <View style={styles.inputContainer}>
              <Ionicons
                name="cash-outline"
                size={22}
                color={theme.colors.primary}
              />

              <TextInput
                placeholder="Enter Amount"
                keyboardType="numeric"
                style={styles.input}
              />
            </View>

            {/* Category */}
            <TouchableOpacity style={styles.inputContainer}>
              <Ionicons
                name="pricetag-outline"
                size={22}
                color={theme.colors.primary}
              />

              <RegularText style={{flex: 1, marginLeft: 15}}>
                Select Category
              </RegularText>

              <Ionicons
                name="chevron-down"
                size={20}
                color={theme.colors.text}
              />
            </TouchableOpacity>

            {/* Create Category */}
            <TouchableOpacity style={styles.inputContainer}>
              <Ionicons
                name="add-circle-outline"
                size={22}
                color={theme.colors.primary}
              />

              <RegularText style={{marginLeft : 15}}>
                Create New Category
              </RegularText>
            </TouchableOpacity>

            {/* Note */}
            <View style={[ styles.inputContainer, styles.noteContainer]}>
              <Ionicons
                name="document-text-outline"
                size={22}
                color={theme.colors.primary}
              />

              <TextInput
                placeholder="Add a note here realted to the expense optional... "
                multiline
                style={styles.noteInput}
              />
            </View>

            {/* Button */}
            <TouchableOpacity style={styles.button}>
              <Ionicons
                name="add-outline"
                size={22}
                color="#FFF"
              />

              <BoldText color="#FFF">
                Add Expense
              </BoldText>
            </TouchableOpacity>
            
          </View>
        </View>
      </SafeAreaView>
    );
}

export default AddScreen;

const createstylesSheet  = (theme : AppTheme) => StyleSheet.create({
  container : {
    alignContent : 'center',
    alignItems : 'center'
  },

  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  
  iconWrapper: {
    width: 90,
    height: 90,
    borderRadius: 45,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 16,
    backgroundColor: `${theme.colors.primary}15`,
  },
  
  subtitle: {
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 24,
    opacity: 0.7,
  },
  
  card: {
    backgroundColor: theme.colors.background,
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  
  inputContainer: {
    height: 58,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 14,
    backgroundColor: theme.colors.card,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  
  input: {
    flex: 1,
    marginLeft: 12,
    color: theme.colors.text,
  },
  
  noteContainer: {
    height: 110,
    alignItems: 'flex-start',
    paddingTop: 16,
  },
  
  noteInput: {
    flex: 1,
    marginLeft: 12,
    color: theme.colors.text,
    textAlignVertical: 'top',
  },
  
  button: {
    height: 58,
    borderRadius: 16,
    backgroundColor: theme.colors.primary,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginTop: 10,
  },
})