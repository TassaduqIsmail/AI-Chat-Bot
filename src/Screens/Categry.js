import {
  ActivityIndicator,
  FlatList,
  Image,
  Linking,
  Modal,
  Platform,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { useDispatch, useSelector } from 'react-redux';
import Arrow from './../assets/leftarrow.png';
import logoutbtn from './../assets/turn-off.png';
import setting from './../assets/setting.png';
import { logout, setlogout } from '../Store/Lang';
import Sidedrawer from '../common/SideDrawer';
import axios from 'axios';
import search from '../assets/search.png';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BlurView } from '@react-native-community/blur';
import Tts from 'react-native-tts';
import cross from './../assets/cross.png';

const Categry = ({ navigation, route, item }) => {
  const { val } = route.params || {};

  const dispatch = useDispatch();
  const isLanguage = useSelector(state => state.auth.language);
  const [vasible, Setvasible] = useState(false);
  const [data, setData] = useState([]);
  const [select, setSelect] = useState(1);
  const [apiData, setApiData] = useState([]);
  const [linkd, setlinkd] = useState([]);
  const [loader, setLoader] = useState(false);

  const btns = useCallback(num => {
    setSelect(num);
  }, []);

  useFocusEffect(
    useCallback(() => {
      console.log('callback val', val);
      if (val) {
        Setvasible(true);
      }
    }, [val]),
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace 'https://example.com/api/data' with your actual API endpoint
        const response = await axios
          .get(
            `https://professionista-ai.com/wp-json/proff_ai/v1/mobile-app-version?token=3h97Cu0RAb4AKrDo&id`,
          )
          .then(data => {
            const responseData = data?.data?.data || [];
            const responeseData1 = data?.data?.data.map(data => data?.link) || [];

            console.log('check', responseData);
            console.log('check1', responeseData1);
            setlinkd(responeseData1)
            setApiData(responseData);
          });

        // Assuming your API response is an array of data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const Handlepress = async () => {
      //   setLoading(true);
      await axios
        .get(
          `https://professionista-ai.com/wp-json/proff_ai/v1/activity-prompt?token=3h97Cu0RAb4AKrDo`,
        )
        .then(i => {
          console.log(i.data.data);
          const Data = i.data.data
          const sortedData = Data.sort((a, b) => a.name > b.name ? 1 : -1);
          if (i.data.status != 200) {
            // setLoading(false);
            console.log('false', i);

            showToast('error', 'Error', 'network error', 5000);
            return;
          } else {
            // setLoading(false);
            setData(sortedData);
          }
        })
        .catch(err => {
          console.log(err);
        });
    };
    Handlepress();
  }, []);
  const handleLogout = async () => {
    try {
      await AsyncStorage.setItem('modalVisibility', 'visible');
    } catch (error) {
      console.error('Error saving to AsyncStorage:', error);
    }
    dispatch(setlogout());
  };
  const [value, setValue] = useState('');
  const filterData = data.filter(i =>
    i.name?.toLowerCase().includes(value.toLowerCase()),
  );

  const [get, set] = useState(false);
  const [newm, setNew] = useState(false);
  const [messages, setMessages] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    // Check if the modal has been closed before
    const checkModalVisibility = async () => {
      try {
        const storedModalVisibility = await AsyncStorage.getItem(
          'modalVisibility',
        );
        // If the modalVisibility key is not present or is 'visible', show the modal
        if (
          storedModalVisibility === null ||
          storedModalVisibility === 'visible'
        ) {
          setModalVisible(true);
        }
      } catch (error) {
        console.error('Error reading from AsyncStorage:', error);
      }
    };

    checkModalVisibility();
  }, []); // Run this effect only once when the component mounts

  const closeModal = async () => {
    // Set the modalVisibility key to 'hidden' when the modal is closed
    try {
      await AsyncStorage.setItem('modalVisibility', 'hidden');
      setModalVisible(false);
    } catch (error) {
      console.error('Error saving to AsyncStorage:', error);
    }
  };
  const handleAndroidPress = () => {
    Linking.openURL(linkd[0]);
  };
  // console.log('linkd', linkd[0]);

  const handleIOSPress = () => {
    Linking.openURL(linkd[1]);
  };
  return (
    <SafeAreaView edges={['bottom']} style={{ flex: 1 }}>
      <StatusBar
        backgroundColor={'transparent'}
        barStyle={'light-content'}
        translucent={true}
      />

      <Sidedrawer
        visible={!!vasible}
        Close={() => {
          Setvasible(false);
        }}
        cros={() => {
          Setvasible(false);
        }}
        Language={() => {
          navigation.navigate('Language');
          Setvasible(false);
        }}
        tone={() => {
          navigation.navigate('WritingTone');
          Setvasible(false);
        }}
        Wstyle={() => {
          navigation.navigate('WritingStyle');
          Setvasible(false);
        }}
      />
      <View
        style={{
          height: responsiveHeight(25),
          backgroundColor: '#071832',

          // ,
        }}>
        <View style={styles.headericon}>
          <TouchableOpacity
            onPress={() => {
              Setvasible(true);
            }}>
            <Image
              source={setting}
              resizeMode="contain"
              style={styles.iconbtn}
            />
          </TouchableOpacity>
          <TouchableOpacity style={{}} onPress={() => handleLogout()}>
            <Image
              source={logoutbtn}
              resizeMode="contain"
              style={styles.iconbtn}
            />
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: responsiveHeight(3) }}>
          <Text style={styles.heading}>
            {isLanguage === 'eng'
              ? `Seleziona I'attivitá o vai al Dossier Interattivo`
              : 'Specify your interest'}
          </Text>
        </View>
      </View>
      <View>
        <View
          style={{
            height: responsiveHeight(7),
            width: responsiveWidth(80),
            borderWidth: responsiveWidth(0.2),
            borderRadius: responsiveWidth(8),
            borderColor: '#000',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            alignSelf: 'center',
            //marginBottom:select==2?80:16,
            marginTop: '5%',
          }}>
          <TouchableOpacity
            onPress={() => {
              btns(1);
            }}
            style={[
              styles.btn,
              { backgroundColor: select === 1 ? '#071832' : '#fff' },
            ]}>
            <Text
              style={[
                styles.btn_txt,
                { color: select === 1 ? '#fff' : '#3C4142' },
              ]}>
              {isLanguage === 'eng' ? ' Attività ' : 'Specific activity'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              btns(2);
              setNew(true);
              setMessages([]);
              Tts.stop();
              // setResults();
              set(!get);
              navigation.navigate("Chatscreen", { dummy: "name" })
            }}
            style={[
              styles.btn,
              { backgroundColor: select === 2 ? '#071832' : '#fff' },
            ]}>
            <Text
              style={[
                styles.btn_txt,
                { color: select === 2 ? '#fff' : '#3C4142' },
              ]}>
              {isLanguage === 'eng'
                ? 'Dossier interattivo'
                : 'Interactive dossier'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.txt_input}>
        <TextInput
          placeholder={'cerca qui'}
          cursorColor={'#000'}
          placeholderTextColor={'black'}
          style={styles.input}
          value={value}
          onChangeText={txt => setValue(txt)}
        />
        <Image source={search} resizeMode="contain" style={styles.searchicon} />
      </View>
      <View style={{ backgroundColor: '#f6f6f6', flex: 1 }}>
        {data.length > 0 ? null : (
          <ActivityIndicator
            size={'large'}
            color={'#000'}
            style={{ marginTop: responsiveHeight(10) }}
          />
        )}

        <FlatList
          data={filterData}
          renderItem={({ item, index }) => {
            return (
              <View style={{ flex: 1 }}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Chatscreen', {
                      items: item.id,
                    });
                  }}
                  style={styles.data_content}>
                  <Text style={styles.data_txt}>{item.name}</Text>
                  <Image
                    resizeMode="contain"
                    source={Arrow}
                    style={{ height: responsiveHeight(3), tintColor: '#fff' }}
                  />
                </TouchableOpacity>
              </View>
            );
          }}
        />
        {/* {modalVisible && (
        <BlurView
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
          blurType="light"
          blurAmount={10}
          reducedTransparencyFallbackColor="white"
        />
      )} */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            closeModal();
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              {(<TouchableOpacity
                style={{ alignSelf: 'flex-end', marginRight: '4%' }}
                onPress={() => closeModal()}>
                <Image
                  source={cross}
                  resizeMode="contain"
                  style={{
                    height: responsiveHeight(8),
                    width: responsiveWidth(8),
                  }}
                />
              </TouchableOpacity>)}

              {
                
                apiData.map((item, index) => (
                  <View key={index}>
                    <Text style={{ color: '#000', fontFamily: 'Poppins-Regular', textAlign: 'justify', padding: 10 }}>
                      {item?.id == 5 ? item?.text_msg : null}
                    </Text>
                  </View>
                )) 
                 
              }

              {Platform.OS === 'android' ? (
                <TouchableOpacity
                  style={{
                    // marginVertical: responsiveHeight(4),
                    height: responsiveHeight(8),
                    width: responsiveWidth(90),
                    backgroundColor: '#071832',
                    borderRadius: 20,
                    marginBottom: responsiveHeight(1),
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  onPress={() => {
                    handleAndroidPress(), closeModal();
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Poppins-Regular',
                      //fontWeight: 'bold',
                      color: '#fff',
                      fontSize: 20,
                      // paddingTop: responsiveHeight(2),
                      textAlign: 'center',
                    }}>
                    AGGIORNA
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={{
                    marginVertical: '8%',
                    height: responsiveHeight(8),
                    width: responsiveWidth(90),
                    backgroundColor: '#071832',
                    borderRadius: 20,
                  }}
                  onPress={() => {
                    handleIOSPress(), closeModal();
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Poppins-Regular',
                      //fontWeight: 'bold',
                      color: '#fff',
                      fontSize: 20,
                      textAlign: 'center',
                      // marginLeft: '5%',
                      paddingTop: responsiveHeight(2),
                    }}>
                    FOR IOS
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default Categry;

const styles = StyleSheet.create({
  btn: {
    height: responsiveHeight(5.5),
    width: responsiveWidth(38),
    backgroundColor: '#1d1160',
    //marginTop:'30%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: responsiveWidth(6),
  },
  txt_input: {
    height: responsiveHeight(6.2),
    width: responsiveWidth(92),
    backgroundColor: 'transparent',
    // borderWidth: responsiveWidth(0.2),
    borderColor: '#000',
    borderRadius: responsiveWidth(3),
    alignSelf: 'center',
    marginTop: responsiveHeight(1),
    marginBottom: responsiveHeight(3),
    backgroundColor: 'lightgray',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    color: 'gray',
    textShadowColor: '#000',
    fontFamily: 'Poppins-Regular',
    paddingVertical: responsiveHeight(1),
    fontSize: responsiveFontSize(1.5),
    top: responsiveHeight(0.5),
    paddingLeft: responsiveWidth(4),
    alignItems: 'center',
    width: responsiveWidth(80),
  },
  data_content: {
    paddingVertical: responsiveHeight(2),
    width: responsiveWidth(90),
    borderRadius: responsiveWidth(2),
    justifyContent: 'space-between',

    backgroundColor: '#071832',
    marginVertical: responsiveHeight(1),
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  data_txt: {
    color: '#ffff',
    fontFamily: 'Poppins-Regular',
    fontSize: responsiveFontSize(2),
    maxWidth: responsiveWidth(80),
    left: responsiveWidth(3),
  },
  searchicon: {
    height: responsiveWidth(5),
    width: responsiveWidth(5),
    right: responsiveWidth(5),
  },
  heading: {
    fontFamily: 'Poppins-Regular',
    fontSize: responsiveFontSize(2),
    color: '#fff',
    textAlign: 'center',
  },
  iconbtn: {
    tintColor: '#fff',
    width: responsiveWidth(8),
    height: responsiveHeight(8),
  },
  headericon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: responsiveHeight(4),
    paddingHorizontal: responsiveWidth(4),
    bottom: responsiveHeight(1),
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 21,
  },
  modalView: {
    // margin: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    // paddingTop: 35,
    alignItems: 'center',
    shadowColor: '#000',

    backgroundColor: 'lightgray',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: responsiveWidth(98),
    height: responsiveHeight(80),
    marginTop: responsiveHeight(30),
  },

  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    //textAlign: 'center',
  },
});
