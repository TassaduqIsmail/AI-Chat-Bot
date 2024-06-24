import {
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
  Linking,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { setlogindata, setverified, toggleLanguage } from '../Store/Lang';
import ToggleSwitch from 'toggle-switch-react-native';
import background from './../assets/background.jpg';
import bottom from './../assets/img.png';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import CoustomButton from '../common/CoustomButton.js/CoustomButton';
import { AvoidSoftInput } from 'react-native-avoid-softinput';
import Applogo from './../assets/Applogo.png';
import axios from 'axios';
import useToast from '../Hooks/useToast';
import MsgModal from '../common/MassegeModal/MsgModal';
import social from '../assets/social-media.png';
import view from '../assets/view.png';
import hide from '../assets/hide.png';
import yt from '../assets/youtube.png';
import instagram from '../assets/instagram.png';
import facebook from '../assets/facebook.png';
import linkedin from '../assets/linkedin.png';
import twitter from '../assets/twitter.png';
import telegram from '../assets/telegram.png';
import CheckBox from '@react-native-community/checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }) => {
  const isDarkmood = useColorScheme() === 'dark';
  //const [isSelected, setSelection] = useState(false);

  const [values, setValues] = useState({
    email: 'john@yopmail.com' , //john@yopmail.com
    password: 'john123', //john123
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [bool, setbool] = useState();

  useEffect(() => {
    // Load saved email and password from AsyncStorage when component mounts
    loadSavedCredentials();
  }, []);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // do something

      loadSavedCredentials();
    });

    return unsubscribe;
  }, [navigation]);

  const loadSavedCredentials = async () => {
    try {
      const savedEmail = await AsyncStorage.getItem('email');
      const savedPassword = await AsyncStorage.getItem('password');

      if (savedEmail && savedPassword) {
        setValues({ email: savedEmail, password: savedPassword });
        // setValues(savedPassword);
        setRememberMe(true);
        // alert(JSON.stringify(savedEmail))
      }
    } catch (error) {
      console.error('Error loading saved credentials:', error);
    }
  };

  const handleLogin = async () => {
    // Perform your login logic here
    // ...

    // If "Remember Me" is checked, save email and password to AsyncStorage
    if (rememberMe) {
      try {
        await AsyncStorage.setItem('email',values?.email );
        await AsyncStorage.setItem('password', values?.password); 
      } catch (error) {
        console.error('Error saving credentials:', error);
        console.log(handleLogin);
      }
    }
  };
  const [isEnabled, setIsEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [valid, setvalid] = useState(false);
  const [eye, SetEye] = useState(true);
  const isLanguage = useSelector(state => state.auth.language);
  const { showToast } = useToast();
  const dispatch = useDispatch();
  const handleLanguageToggle = () => {
    dispatch(toggleLanguage());
    setIsEnabled(previousState => !previousState);
  };

  const handleyoutubePress = () => {
    Linking.openURL('https://www.youtube.com/channel/UCfRwi2MRxIhEcJoQCamAe0A');
  };
  const handleInstagramPress = () => {
    Linking.openURL('https://www.instagram.com/professionista_ai/');
  };
  const handlefbPress = () => {
    Linking.openURL('https://www.facebook.com/professionistaai/');
  };
  const handleLkinPress = () => {
    Linking.openURL('https://www.linkedin.com/company/professionista-ai/');
  };
  const handletelegramPress = () => {
    Linking.openURL('https://t.me/Professionista_AI');
  };

  console.log('Setting up AvoidSoftInput');
  useEffect(() => {
    AvoidSoftInput.setShouldMimicIOSBehavior(true);
    AvoidSoftInput.setEnabled(true);
  }, []);
  const websiteURL = 'https://professionista-ai.com/abbonamenti/';

  const openWebsite = async () => {
    try {
      await Linking.openURL(websiteURL);
      setvalid(false);
    } catch (error) {
      console.error('Error opening URL:', error);
    }
  };
  const Handlepress = async (username, password) => {
    if (!username) {
      let lang =
        isLanguage == 'eng' ? 'inserire la email' : 'enter email or username';
      return showToast('error', isLanguage === 'eng' ? 'Errore' : 'Error', lang, 5000);
    }
    if (!password) {
      let lang =
        isLanguage == 'eng' ? 'inserire la password' : 'enter password';
      return showToast('error', isLanguage === 'eng' ? 'Errore' : 'Error', lang, 5000);
    }
    setLoading(true);
    await axios
      .post(
        `https://professionista-ai.com/wp-json/proff_ai/v1/check-user?token=3h97Cu0RAb4AKrDo&username=${username}&password=${password}`,
      )
      .then(i => {
        console.log();
        // if (i.data[0] == 'E' || i.data.status == 404) {
        if (i.data.status != 200) {
          setLoading(false);
          console.log('false', i);
          let lang =
            isLanguage == 'eng'
              ? 'Controlla la tua email e la tua password'
              : 'Check your email and password';

          showToast('error', isLanguage === 'eng' ? 'Errore' : 'Error', lang, 5000);
          return;
        } else {
          setLoading(false);
          if (i.data.message == 'Valid User') {
            dispatch(setverified(true));
            dispatch(setlogindata(i.data.data['0']));
          } else {
            setvalid(true);
          }
        }
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
        showToast('error', 'Error', err.message, 5000);
      });
  };
  console.log(values);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground style={{ flex: 1 }} source={background}>
        {valid && (
          <View style={styles.valid}>
            <Text style={styles.validtxt}>
              Il tuo abbonamento è scaduto, accedi al sito
              <Text onPress={openWebsite} style={{ color: '#fff' }}>
                {' '}
                www.professionista-ai.com{' '}
              </Text>
              per rinnovarlo!
            </Text>
          </View>
        )}
        <ScrollView showsVerticalScrollIndicator={false} style={{}}>
          <StatusBar
            backgroundColor={'transparent'}
            barStyle={'dark-content'}
            translucent={true}
          />
          {loading ? <MsgModal loader={true} /> : null}
          <View style={styles.btn_txt}>
            <Text style={{ color: '#000', fontFamily: 'Poppins-Regular' }}>
              {isLanguage === 'eng' ? 'Italiano' : 'English'}
            </Text>

            <ToggleSwitch
              isOn={isEnabled}
              onColor={'gray'}
              offColor={'#000'}
              trackOnStyle={{ transform: [{ scaleY: 0.9 }, { scaleX: 0.9 }] }}
              trackOffStyle={{ transform: [{ scaleY: 0.9 }, { scaleX: 0.9 }] }}
              size="medium"
              thumbOffStyle={{
                backgroundColor: 'gray',
              }}
              onToggle={handleLanguageToggle}
            />
          </View>

          <View>
            <View style={styles.header}>
              <Image
                resizeMode="contain"
                source={Applogo}
                style={styles.Applogo}
              />
              <View style={styles.login}>
                {/* <Text style={styles.login_label}>Login</Text> */}
                <Text style={styles.login_label}>
                  {isLanguage === 'eng'
                    ? 'Accedi al tuo account'
                    : 'Login to your account'}
                </Text>
              </View>
            </View>
            <View style={{ alignSelf: 'center', marginTop: responsiveHeight(2) }}>
              <Text style={styles.label}>
                {isLanguage === 'eng' ? 'Nome utente' : 'User Name'}
              </Text>
              <View style={styles.txt_input}>
                <TextInput
                  placeholder={
                    isLanguage === 'eng'
                      ? 'Inserire il nome utente o e-mail'
                      : 'Enter your UserName'
                  }
                  placeholderTextColor={'#000'}
                  cursorColor={'#000'}
                  style={styles.input}
                  value={values.email}
                  onChangeText={txt => setValues(pre => ({ ...pre, email: txt }))}
                />
              </View>
              <Text style={[styles.label, { marginTop: responsiveHeight(1) }]}>
                {isLanguage === 'eng' ? 'Parola d`ordine' : 'Password'}
              </Text>
              <View style={styles.txt_input}>
                <TextInput
                  placeholder={
                    isLanguage === 'eng'
                      ? 'Inserire la parola d`ordine'
                      : 'Enter your password'
                  }
                  cursorColor={'#000'}
                  placeholderTextColor={'black'}
                  secureTextEntry={eye}
                  style={styles.input}
                  value={values.password}
                  onChangeText={txt =>
                    setValues(pre => ({ ...pre, password: txt }))
                  }
                />
                <TouchableOpacity
                  onPress={() => {
                    SetEye(!eye);
                  }}>
                  <Image
                    source={eye ? hide : view}
                    resizeMode="contain"
                    style={{
                      height: responsiveHeight(6),
                      width: responsiveWidth(6),
                    }}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.container}>
                <CheckBox
                  value={rememberMe}
                  onValueChange={() => setRememberMe(!rememberMe)}
                  tintColor="black"
                  onCheckColor="black"
                  onFillColor="black"
                />
                <Text style={{ color: '#000' }}>
                  {isLanguage === 'eng'
                    ? 'Ricorda utente e password'
                    : 'Rember my password'}
                </Text>
              </View>
            </View>

            <CoustomButton
              bgcolor={'#000'}
              onPress={() => {
                Handlepress(values.email, values.password);
                handleLogin();
              }}
              self
              textStyle={{
                color: '#fff',
                fontSize: responsiveFontSize(1.6),
                fontFamily: 'Poppins-Bold',
              }}
              text={isLanguage === 'eng' ? 'Accedi' : 'Login'}
              width={responsiveWidth(90)}
              style={styles.login_btn}
            />
            <Text
              style={[
                styles.input,
                { color: '#000', textAlign: 'center', top: responsiveHeight(1) },
              ]}>
              Non hai un account
            </Text>
            <CoustomButton
              bgcolor={'#000'}
              onPress={openWebsite}
              self
              textStyle={{
                color: '#fff',
                fontSize: responsiveFontSize(1.6),
                fontFamily: 'Poppins-Bold',
              }}
              Registrati
              text={isLanguage === 'eng' ? 'Registrati' : 'Register'}
              width={responsiveWidth(90)}
              style={[styles.login_btn, { marginTop: responsiveHeight(2) }]}
            />

            <View
              style={{
                height: responsiveHeight(18),
              }}></View>

            {/* <Image source={bottom} resizeMode="contain" style={styles.bottom} /> */}
          </View>
        </ScrollView>
        <View style={styles.bottomcontain}>
          <Text style={styles.txtbottom}>{' Professionaisa Ai srl '}</Text>
          <Text style={styles.txtbottom}>
            {'   Email:  info@professionista-ai.com      Tel:   0721 624470'}
          </Text>
          <View style={styles.bottomicon}>
            <TouchableOpacity onPress={handleyoutubePress}>
              <Image source={yt} resizeMode="contain" style={styles.icons} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleInstagramPress}>
              <Image
                source={instagram}
                resizeMode="contain"
                style={styles.icons}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={handlefbPress}>
              <Image
                source={facebook}
                resizeMode="contain"
                style={styles.icons}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLkinPress}>
              <Image
                source={linkedin}
                resizeMode="contain"
                style={styles.icons}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={handletelegramPress}>
              <Image
                source={telegram}
                resizeMode="contain"
                style={styles.icons}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  btn_txt: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    right: responsiveWidth(4),
    gap: 10,
    marginTop: responsiveHeight(8),
    color: 'red',
  },
  label: {
    fontSize: responsiveFontSize(1.9),
    paddingVertical: responsiveHeight(1),
    color: '#000',
    fontFamily: 'Poppins-Bold',
    textShadowColor: '#000',
    shadowOpacity: 10,
    textDecorationColor: '#000',
    paddingStart: responsiveWidth(1),
  },
  txt_input: {
    height: responsiveHeight(5),
    width: responsiveWidth(98),
    backgroundColor: 'transparent',
    borderBottomWidth: responsiveWidth(0.2),
    borderColor: '#000',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    color: 'gray',
    textShadowColor: '#000',
    fontFamily: 'Poppins-Regular',
    paddingVertical: responsiveHeight(1),
    width: responsiveWidth(90),
    fontSize: responsiveFontSize(1.5),
  },
  header: {},
  Applogo: {
    height: responsiveWidth(30),
    width: responsiveWidth(70),
    alignSelf: 'center',
  },

  login_label: {
    color: '#000',
    fontSize: responsiveFontSize(2.3),
    fontFamily: 'Poppins-Bold',
    // letterSpacing: 0.6,
  },
  login_disc: {
    color: 'rgba(128, 116, 116, 1)',
    fontSize: responsiveFontSize(1.6),
    fontFamily: 'Poppins-Regular',
    bottom: 4,
    textDecorationLine: 'underline',
  },
  login_btn: {
    marginTop: responsiveHeight(7),
    borderRadius: responsiveWidth(10),
    height: responsiveHeight(6),
    zIndex: 9999,
  },
  bottom: {
    width: responsiveWidth(50),
    height: responsiveWidth(50),
    alignSelf: 'center',
  },
  icons: {
    height: responsiveWidth(6.5),
    width: responsiveWidth(6.5),
    alignSelf: 'center',

    tintColor: '#ffff',
  },
  txtbottom: {
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
    fontSize: responsiveFontSize(1.3),
    paddingTop: responsiveHeight(1),
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: responsiveWidth(0.1),
  },
  valid: {
    width: responsiveHeight(40),
    height: responsiveWidth(30),
    borderRadius: responsiveWidth(3),
    position: 'absolute',
    zIndex: 999,
    elevation: 10,
    backgroundColor: '#000',
    alignSelf: 'center',
    marginTop: responsiveHeight(45),
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(1.3),
    paddingTop: responsiveHeight(4),
  },
  validtxt: {
    color: 'red',
    fontFamily: 'Poppins-Regular',
    fontSize: responsiveFontSize(1.5),

    letterSpacing: 0.6,
  },
  login: {
    paddingStart: responsiveWidth(5),
    marginTop: responsiveHeight(4),
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    marginLeft: 8,
  },
  bottomicon: {
    flexDirection: 'row',
    alignSelf: 'center',
    gap: responsiveWidth(2),
    marginTop: responsiveHeight(2),
  },
  bottomcontain: {
    height: '14%',
    backgroundColor: '#000',
    paddingBottom: responsiveHeight(5),
    position: 'absolute',
    width: responsiveWidth(100),
    bottom: 0,
  },
});
