import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
  Image,
  Modal,
  Button,
  ActivityIndicator,
} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {useDispatch, useSelector} from 'react-redux';
import cross from './../assets/cross.png';
import setting from './../assets/setting.png';
import {setdefault} from '../Store/Lang';

// import {
//   Backgroundimages,
//   Colors,
//   Iconsimages,
// } from '../../utlies/constants/Themes';
const Sidedrawer = ({
  Close,
  visible,
  Language,
  tone,
  Wstyle,
  onDismiss,
  cros,
  navigation,
  Setvasible,
}) => {
  // const [vasible, Setvasible] = useState(null);
  const isLanguage = useSelector(state => state.auth.language);
  const isdata = useSelector(state => state.auth.logindata);

  const name = isdata?.display_name;
  const email = isdata?.user_email;
  // const name = '';
  // const email = '';
  const [selected, setSelected] = useState(1);
  const [select, setSelect] = useState(false);
  const dispatch = useDispatch();
  return (
    <View style={{}}>
      <StatusBar
        translucent={true}
        backgroundColor={'transparent'}
        // barStyle={'dark-content'}
      />
      {/* <View style={{top: 20}}>
        <Button
          title="open"
          onPress={() => {
            Setvasible(true);
          }}
        />
      </View> */}

      <Modal
        statusBarTranslucent
        transparent
        visible={visible}
        style={{height: responsiveHeight(100)}}
        animationType="fade"
        animationOut="slide"
        animationIn="slideInRight"
        // animationInTiming={10}
        backdropOpacity={10}
        onDismiss={onDismiss}>
        <View
          // onTouchEnd={Close}
          style={{
            width: responsiveWidth(73),
            backgroundColor: '#fff',
            flex: 1,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            elevation: 50,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: responsiveWidth(2),
              marginTop: responsiveHeight(2),
              marginBottom: responsiveHeight(1),
            }}>
            <TouchableOpacity
              onPress={() => {
                cros(); // Assuming cros is a function you want to call
                setTimeout(() => {
                  setSelect(false);
                }, 200); // Adjust the delay (in milliseconds) according to your needs
              }}>
              <Image
                source={cross}
                resizeMode="contain"
                style={{height: responsiveHeight(8), width: responsiveWidth(8)}}
              />
            </TouchableOpacity>
            <Text style={{marginRight:'40%',fontWeight:"bold",color:'#000',fontSize:20}}>Opzioni</Text>
          </View>

      
          <View
            style={{
              height: responsiveHeight(8),
              width: responsiveWidth(70),
              borderWidth: responsiveWidth(0.3),
              borderRadius: responsiveWidth(10),
              alignSelf: 'center',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: responsiveWidth(3),
              marginBottom: responsiveHeight(2),
            }}>
            <TouchableOpacity
              onPress={() => {
                setSelected(1);
              }}
              style={{
                height: responsiveHeight(6.5),
                width: responsiveWidth(32),
                backgroundColor: selected == 1 ? '#000' : '#fff',
                borderRadius: responsiveWidth(10),
                // borderWidth: responsiveWidth(0.2),
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontSize: responsiveFontSize(1.7),
                  fontFamily: 'Poppins-Bold',
                  color: selected === 1 ? '#fff' : '#000',
                }}>
                gpt 3
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setSelected(2);
              }}
              style={{
                height: responsiveHeight(6),
                width: responsiveWidth(30),
                backgroundColor: selected == 2 ? '#000' : '#fff',
                borderRadius: responsiveWidth(10),

                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontSize: responsiveFontSize(1.7),
                  fontFamily: 'Poppins-Bold',
                  color: selected == 2 ? '#fff' : '#000',
                }}>
                gpt 4
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={Language} style={styles.Button}>
            <Text style={styles.btntxt}>
              {isLanguage === 'eng' ? 'Lingua' : 'Language'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={tone} style={styles.Button}>
            <Text style={styles.btntxt}>
              {isLanguage === 'eng' ? 'Tono di scrittura' : 'Writing tone'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={Wstyle} style={styles.Button}>
            <Text style={styles.btntxt}>
              {isLanguage === 'eng' ? 'Stile di scrittura' : 'Writing style'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.Button, {borderColor: 'green'}]}
            onPress={() => {
              dispatch(setdefault());
              setTimeout(() => {
                setSelect(!select);
              }, 100);
            }}>
            {select ===true? (
            null
            ) : (
              <Text style={[styles.btntxt, {color: 'green'}]}>
                Ripristina default
                {/* {isLanguage === 'eng' ? 'Stile di scrittura' : 'Writing style'} */}
              </Text>
            )}
          </TouchableOpacity>

          {select == true && (
            <View style={styles.popup}>
              <Text
                style={{
                  color: 'black',
                  fontSize: responsiveFontSize(2),
                  fontFamily: 'Poppins-Bold',
                }}>
                {'Lingua,Tono e Stile,ripristinati con successo'}
              </Text>
            </View>
          )}

          <View
            style={{
              height: responsiveHeight(10),
              backgroundColor: '#000',
              position: 'absolute',
              bottom: responsiveHeight(4),
              width: responsiveWidth(67),
              borderBottomRightRadius: responsiveHeight(5),
              borderTopRightRadius: responsiveHeight(5),
              justifyContent: 'center',
              paddingStart: responsiveWidth(3),
            }}>
            <Text style={styles.users}>{name}</Text>
            <Text style={[styles.users, {fontSize: responsiveFontSize(1.4)}]}>
              {email}
            </Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  dummy: {
    height: responsiveHeight(6),
    width: responsiveHeight(6),
    borderRadius: responsiveWidth(6),
  },
  heading: {
    fontSize: responsiveFontSize(2),
    color: '#000',
    fontWeight: '900',
  },
  title: {
    fontSize: responsiveFontSize(1.4),
    color: 'gray',
  },
  profilecontain: {
    flexDirection: 'row',
    width: responsiveWidth(65),
    height: responsiveHeight(15),
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingRight: responsiveWidth(10),
    // backgroundColor: 'red',
    marginTop: responsiveHeight(4),
  },
  Button: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    height: responsiveHeight(8.4),
    width: responsiveWidth(60),
    alignSelf: 'center',
    borderRadius: responsiveWidth(3),
    alignItems: 'center',
    // justifyContent: 'space-evenly',
    borderWidth: responsiveWidth(0.2),
    borderColor: '#000',
    elevation: 3,
    marginVertical: responsiveHeight(1),
  },
  btntxt: {
    fontSize: responsiveFontSize(2.4),
    fontFamily: 'Poppins-Regular',
    color: '#000',
    fontWeight: '600',
    left: responsiveWidth(6),
  },
  Icon: {
    height: responsiveHeight(3),
    width: responsiveHeight(3),
    // tintColor: Colors.background,
    left: responsiveWidth(6),
  },
  logoutcontain: {
    height: responsiveHeight(16),
    backgroundColor: '#fff',
    position: 'absolute',
    flex: 1,
    bottom: responsiveHeight(4),
    right: 0,
    left: 0,
    borderTopWidth: responsiveWidth(0.2),
    borderColor: 'gray',
  },
  users: {
    fontSize: responsiveFontSize(2.4),
    fontFamily: 'Poppins-Regular',
    color: '#fff',
  },
  txt: {},
  popup: {
    height: responsiveHeight(20),
    width: responsiveWidth(60),
    borderRadius: responsiveWidth(4),
    backgroundColor: '#fff',
    elevation: 10,
    top: responsiveHeight(2),
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: responsiveWidth(0.2),
    alignSelf: 'center',
  },
});
export default Sidedrawer;
