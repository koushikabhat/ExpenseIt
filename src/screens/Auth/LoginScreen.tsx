import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import {BoldText, RegularText, SemiBoldText} from '../../utils/Texts';

// ── Drop your cropped images here ────────────────────────────────────────────
const LOGO_ICON = require('../../assets/images/logo_image.png');   // rounded square
const LOGO_FULL = require('../../assets/images/logo_full.png');   // icon + wordmark

// ── Brand colors (static — login screen is always dark) ───────────────────────
const BG         = '#0A0A0A';
const CARD       = '#141414';
const BORDER     = '#222222';
const TEXT       = '#FFFFFF';
const TEXT_MUTED = 'rgba(255,255,255,0.5)';
const GREEN_1    = '#10B981';  // matches logo gradient start
const GREEN_2    = '#06D6A0';  // matches logo gradient end

// ─── Component ────────────────────────────────────────────────────────────────

const LoginScreen = ({navigation}: any) => {
  const [email, setEmail]         = useState('');
  const [password, setPassword]   = useState('');
  const [showPass, setShowPass]   = useState(false);
  const [focusedField, setFocus]  = useState<string | null>(null);

  const handleLogin = () => {
    // plug in your auth logic here
  };

  const handleGoogle = () => {
    // plug in Google Sign-In here
  };

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={BG} />

      {/* Background blobs for depth */}
      <View style={styles.bgBlob1} />
      <View style={styles.bgBlob2} />

      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >

          {/* ── Logo area  */}
          <View style={styles.logoArea}>
            <View style={styles.logoIconWrap}>
              <Image source={LOGO_ICON} style={styles.logoIcon} resizeMode="contain" />
            </View>
            <RegularText style={ [ {flex : 1}, styles.tagline]}>TRACK  MANAGE  GROW </RegularText>
          </View>

          {/* ── Form card ──────────────────────────────────────────────────── */}
          <View style={styles.card}>

            <BoldText style={styles.cardTitle}>Welcome back</BoldText>
            <RegularText style={styles.cardSub}>Sign in to your account</RegularText>

            {/* Email */}
            <View style={[
              styles.inputWrap,
              focusedField === 'email' && {borderColor: GREEN_1},
            ]}>
              <Ionicons name="mail-outline" size={18} color={focusedField === 'email' ? GREEN_1 : TEXT_MUTED} />
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="Email address"
                placeholderTextColor={TEXT_MUTED}
                keyboardType="email-address"
                autoCapitalize="none"
                style={styles.input}
                onFocus={() => setFocus('email')}
                onBlur={() => setFocus(null)}
              />
            </View>

            {/* Password */}
            <View style={[
              styles.inputWrap,
              focusedField === 'password' && {borderColor: GREEN_1},
            ]}>
              <Ionicons name="lock-closed-outline" size={18} color={focusedField === 'password' ? GREEN_1 : TEXT_MUTED} />
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Password"
                placeholderTextColor={TEXT_MUTED}
                secureTextEntry={!showPass}
                style={styles.input}
                onFocus={() => setFocus('password')}
                onBlur={() => setFocus(null)}
              />
              <TouchableOpacity onPress={() => setShowPass(p => !p)}>
                <Ionicons
                  name={showPass ? 'eye-off-outline' : 'eye-outline'}
                  size={18}
                  color={TEXT_MUTED}
                />
              </TouchableOpacity>
            </View>

            {/* Forgot password */}
            <TouchableOpacity style={styles.forgotWrap}>
              <SemiBoldText style={styles.forgotText}>Forgot password?</SemiBoldText>
            </TouchableOpacity>

            {/* Login button */}
            <TouchableOpacity onPress={handleLogin} activeOpacity={0.85}>
              <LinearGradient
                colors={[GREEN_1, GREEN_2]}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={styles.loginBtn}
              >
                <BoldText style={styles.loginBtnText}>Sign In</BoldText>
              </LinearGradient>
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.dividerRow}>
              <View style={styles.dividerLine} />
              <RegularText style={styles.dividerText}>or continue with</RegularText>
              <View style={styles.dividerLine} />
            </View>

            {/* Google button */}
            <TouchableOpacity
              onPress={handleGoogle}
              activeOpacity={0.8}
              style={styles.googleBtn}
            >
              {/* Google G using text — swap with your google icon asset if you have one */}
              <View style={styles.googleIconCircle}>
                <BoldText style={styles.googleG}>G</BoldText>
              </View>
              <SemiBoldText style={styles.googleBtnText}>Continue with Google</SemiBoldText>
            </TouchableOpacity>

          </View>

          {/* ── Create account ─────────────────────────────────────────────── */}
          <View style={styles.signupRow}>
            <RegularText style={styles.signupText}>Don't have an account? </RegularText>
            <TouchableOpacity onPress={() => navigation?.navigate('RegisterScreen')}>
              <SemiBoldText style={styles.signupLink}>Create account</SemiBoldText>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: BG,
  },

  // Background decorative blobs
  bgBlob1: {
    position: 'absolute',
    top: -80,
    right: -80,
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: `${GREEN_1}12`,
  },
  bgBlob2: {
    position: 'absolute',
    bottom: 60,
    left: -60,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: `${GREEN_2}0A`,
  },

  scroll: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingBottom: 40,
    justifyContent: 'center',
  },

  // Logo
  logoArea: {
    alignItems: 'center',
    marginBottom: 36,
    marginTop: 20,
  },
  logoIconWrap: {
    width: 80,
    height: 80,
    borderRadius: 22,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: GREEN_1,
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 10,
  },
  logoIcon: {
    width: 80,
    height: 80,
  },
  logoFull: {
    width: 180,
    height: 40,
    marginBottom: 8,
  },
  tagline: {
    fontSize: 18,
    color: TEXT_MUTED,
    letterSpacing: 2,
  },

  // Card
  card: {
    backgroundColor: CARD,
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: BORDER,
  },
  cardTitle: {
    fontSize: 22,
    color: TEXT,
    marginBottom: 4,
  },
  cardSub: {
    fontSize: 13,
    color: TEXT_MUTED,
    marginBottom: 24,
  },

  // Inputs
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#1A1A1A',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: BORDER,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 12,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: TEXT,
    padding: 0,
  },

  // Forgot
  forgotWrap: {
    alignSelf: 'flex-end',
    marginBottom: 22,
    marginTop: 4,
  },
  forgotText: {
    fontSize: 13,
    color: GREEN_1,
  },

  // Login button
  loginBtn: {
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
  },
  loginBtnText: {
    fontSize: 16,
    color: '#fff',
    letterSpacing: 0.3,
  },

  // Divider
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginVertical: 22,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: BORDER,
  },
  dividerText: {
    fontSize: 12,
    color: TEXT_MUTED,
  },

  // Google
  googleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    backgroundColor: '#1E1E1E',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: BORDER,
    paddingVertical: 14,
  },
  googleIconCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleG: {
    fontSize: 14,
    color: '#4285F4',
  },
  googleBtnText: {
    fontSize: 14,
    color: TEXT,
  },

  // Sign up
  signupRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 28,
  },
  signupText: {
    fontSize: 14,
    color: TEXT_MUTED,
  },
  signupLink: {
    fontSize: 14,
    color: GREEN_1,
  },
});
