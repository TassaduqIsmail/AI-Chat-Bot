import {
  ActivityIndicator,
  FlatList,
  Image,
  Keyboard,
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {useDispatch, useSelector} from 'react-redux';
import {
  Bubble,
  GiftedChat,
  Send,
  InputToolbar,
  MessageText,
} from 'react-native-gifted-chat';
import {sendToOpenAI} from './Botapi';
import axios from 'axios';
import Voice from '@react-native-community/voice';
import cross from '../assets/cross.png';
import Tts from 'react-native-tts';
import logoutbtn from './../assets/turn-off.png';
import back from './../assets/back.png';
import {logout} from '../Store/Lang';
import chat from '../assets/chat.png';
import mic from '../assets/mic.png';
import sentmail from '../assets/sentmail.png';
import valum from '../assets/medium-volume.png';
import mute from '../assets/mute.png';
import vc from '../assets/voice-recognition.png';
import search from '../assets/search.png';
import E from '../assets/E.png';
import E1 from '../assets/E1.png';
import setting from './../assets/bars.png';
import useToast from '../Hooks/useToast';
import {useFocusEffect} from '@react-navigation/native';
import Sidedrawer from '../common/SideDrawer';
import SideChat from '../common/SideChat';
import {KeyboardAvoidingView} from 'react-native';
import MsgModal from '../common/MassegeModal/MsgModal';

const Chatscreen = ({navigation, route}) => {
  const {items, name, dummy} = route.params;
  const [get, set] = useState(false);
  console.log('dddd', dummy);
  console.log('data ', items, name);
  const isLanguage = useSelector(state => state.auth.language);
  const [select, setSelect] = useState(1);
  const [spk, setSpk] = useState(false);
  const [spktxt, setSpktxt] = useState('');
  const btns = useCallback(num => {
    setSelect(num);
  }, []);
  const [started, setStarted] = useState('');
  const [end, setEnd] = useState('');
  const [pitch, setPitch] = useState('');
  const [error, setError] = useState('');
  const [results, setResults] = useState('');
  const [partialResults, setPartialResults] = useState([]);
  const [stop, setSstop] = useState(false);
  const [rply, setRply] = useState(false);
  const [R, setR] = useState(false);
  const [values, setValues] = useState('');
  const [messages, setMessages] = useState([]);
  const [newm, setNew] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [loader, setLoader] = useState(false);
   const [Texth, setTexth] = useState(false);


  const dispatch = useDispatch();

  const [get1, set1] = useState(false);

  let payload = {
    Addpr: get1 ? 0 : 1,
  };
  console.log(payload);
  useEffect(() => {
    if (dummy) {
      setSelect(2);
    }
  }, [dummy]);
  useEffect(() => {
    const onSpeechStart = e => {
      console.log('onSpeechStart: ', e);
      setStarted('√');
    };

    const onSpeechResults = e => {
      console.log('onSpeechResults: ', e.value[0]);
      let ans = e.value[0];
      setResults(ans);
      setSstop(false);
      // setMessages(ans);
    };

    const onSpeechPartialResults = e => {
      console.log('onSpeechPartialResults: ', e);
      setPartialResults(e.value);
    };

    const onSpeechVolumeChanged = e => {
      console.log('onSpeechVolumeChanged: ', e.value);
      setPitch(e.value);
    };

    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechPartialResults = onSpeechPartialResults;
    Voice.onSpeechVolumeChanged = onSpeechVolumeChanged;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const _startRecognizing = async () => {
    setPitch('');
    setError('');
    setStarted('');
    setResults('');
    setPartialResults([]);
    setEnd('');
    setSstop(true);
    setNew(false);
    try {
      await Voice.start('en-US');
    } catch (e) {
      console.error(e);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };
  const [y, setY] = useState('');
  const lang = useSelector(state => state.auth.lang).trim();
  const wrting = useSelector(state => state.auth.writting).trim();
  const ton = useSelector(state => state.auth.tone).trim();
  useEffect(() => {
    console.log('l', lang, wrting, ton);
  }, []);

  useEffect(() => {
    Tts.setDefaultLanguage('it-IT');
    Tts.setDefaultRate(0.5);
    Tts.setDefaultPitch(1);
  }, []);

  const isdata = useSelector(state => state.auth.logindata);

  const id = isdata?.ID;
  const [others, SetOthers] = useState({});
  console.log('others', others?.prompthint);

  const handlePress = async text => {
    console.log('others.................', results);

    // alert('dd')

    setRply(true);
    const trimmedText = text ? text : results;

    const userMessage = {
      _id: id,
      text: trimmedText,
      createdAt: new Date(),
      user: {
        _id: 1,
        name: 'User',
        role: 'user',
      },
    };
    setMessages(prevMessages => GiftedChat.append(prevMessages, [userMessage]));

    setLoader(true);

    const systemMessageTyping = {
      _id: Math.random(),
      // text: 'chat bot is typing',
      text: get1 ? (
        <>
          <Image
            source={E1}
            style={{
              width: responsiveWidth(5),
              height: responsiveHeight(5),
              marginBottom: '5%',
            }}
          />
          Ricerca Internet{' '}
        </>
      ) : null,
      createdAt: new Date(),

      system: true,
    };

    try {
      const url = `https://professionista-ai.com/wp-json/proff_ai/v1/search?token=3h97Cu0RAb4AKrDo&userid=${id}&text=${
        userMessage.text
      }&chatcategory=${
        others?.promptcategory
      }&language=${lang}&tone=${ton}&writing=${wrting}&chatcategory&prompt&promptname=${
        others?.prompt
      }&ricercainternet=${get1 ? 0 : 1}`;
      await axios.post(url).then(i => {
        console.log('..', url);
        console.log('i.data.int', i);
        if (i.data.msg) {
          setLoader(false);
        }
        const botMessage = {
          _id: 112,
          text: i?.data?.msg,
          createdAt: new Date(),
          system: false,
          user: {
            _id: 112,
            name: 'Chat Bot',
          },
        };
        console.log(url);

        setMessages(prevMessages =>
          GiftedChat.append(prevMessages, [systemMessageTyping]),
        );

        setMessages(prevMessages =>
          GiftedChat.append(prevMessages, [botMessage]),
        );

        setSpk(false);
        set1(false);

        setSpktxt(botMessage.text);
        setRply(false);
        if (spk == true) {
          Tts.speak(botMessage.text);
        } else {
          Tts.stop();
        }
      });
    } catch (error) {
      console.error('Error fetching data from OpenAI:', error.message);
      console.log(handlePress);
    }
  };

  const renderSend = props => {
    //let cntrl = stop ? 'none' : 'auto';
    return (
      <>
        <Send
          {...props}
          alwaysShowSend={true}
          containerStyle={{
            backgroundColor: 'transparent',
            borderRadius: responsiveWidth(2),
            left: responsiveWidth(13),
            backgroundColor: '#000',
            height: responsiveHeight(6),
            width: responsiveHeight(6.5),
            borderRadius: responsiveHeight(1),
            alignItems: 'center',
            justifyContent: 'center',
           // marginBottom:10
            // pointerEvents: rply || stop ? 'none' : 'auto',
          }}>
        {results== results?(<Image
          source={stop ? vc : mic}
          resizeMode="contain"
          style={{
            width: responsiveWidth(6),
            height: responsiveWidth(6),
            tintColor: '#fff',
          }}
        />): <Image
        source={sentmail}
        resizeMode="contain"
        style={{
          width: responsiveWidth(7),
          height: responsiveWidth(7),
          tintColor: '#fff',
        }}
      />}
        </Send>
       
      </>
    );
  };
  const handleDismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const renderBubble = props => {
    // const marginBottom = props.nextMessage ? 0 : 10;
    return (
      <View style={{marginBottom: responsiveHeight(2)}}>
        <Bubble
          {...props}
          onPress={handleDismissKeyboard}
          wrapperStyle={{
            left: {
              backgroundColor: '#575757',
              borderRadius: 20,
              //right: responsiveWidth(8),
              zIndex: 999,
            },
            right: {
              backgroundColor: '#000',
              borderRadius: 20,
              marginBottom: 3,
            },
          }}
          textStyle={{left: {color: '#FFF'}, right: {color: '#FFF'}}}
        />
      </View>
    );
  };
  // const [inputToolbarHeight, setInputToolbarHeight] = useState(50);
  // const onInputTextChanged = text => {
  //   // Calculate the content size based on the text
  //   const contentHeight = text
  //     ? Math.max(50, text.split('\n').length * 20)
  //     : 10; // Minimum height is 50
  //   setInputToolbarHeight(contentHeight);
  //   // const inptext = text?text:results
  //   setInputText(text);
  //   // console.log('text on change hn bhai ', text);
  // };

  const renderInputToolbar = props => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          backgroundColor: 'gray',
          borderTopWidth: 0,
          marginBottom: 10,
          justifyContent: 'center',
          marginLeft: 9,
         // borderRadius: 10,
         //paddingHorizontal:'2%',

          // position:'absolute',
          width: responsiveWidth(82.9),
          // height: inputToolbarHeight,

          //pointerEvents: rply ? 'none' : 'auto',
        }}
        // onInputTextChanged={onInputTextChanged}
        {...props.textInputProps }
        multiline={true}
        placeholder={results ? results : 'Fai la tua reicerca'}
        textInputStyle={{color: '#FFF'}}></InputToolbar>
    );
  };

  // ==================================================
  // ================================================
  const [data, setData] = useState([]);
  const {showToast} = useToast();
  useEffect(() => {
    const Handlepress = async () => {
      await axios
        .get(
          `https://professionista-ai.com/wp-json/proff_ai/v1/specific-activity?token=3h97Cu0RAb4AKrDo&promptcategory=${items}`,
        )
        .then(i => {
          console.log('category data', i.data.data);
          const Data = i.data.data;
          const sortedData = Data.sort((a, b) =>
            a.promptname > b.promptname ? 1 : -1,
          );

          if (i.data.status != 200) {
            console.log('false', i);
            showToast('error', 'Error', 'network error', 5000);
            return;
          } else {
            setData(sortedData);
          }
        })
        .catch(err => {
          console.log(err);
        });
    };
    Handlepress();
  }, []);
  // =============================
  const [history, setHistory] = useState();
  const [historydata, setHistorydata] = useState([]);
  useEffect(() => {
    const Handlepress = async () => {
      // setLoading(true);
      console.log('historynumber', history);
      if (history) {
        setLoader(true);
        setMessages([]);
        await axios
          .get(
            `https://professionista-ai.com/wp-json/proff_ai/v1/searchpagedata?token=3h97Cu0RAb4AKrDo&user_id=${id}&searchid=${history}`,
          )
          .then(i => {
            console.log('history', i.data.data.searchhistory);
            if (i.data.status != 200) {
              // setLoading(false);
              console.log('false', i);
              setLoader(false);

              return;
            } else {
              // setLoading(false);
              setHistorydata(i.data.data.searchhistory);
              setLoader(false);
            }
          })
          .catch(err => {
            console.log(err);
            setLoader(false);
          });
      }
    };
    Handlepress();
  }, [history]);
  useEffect(() => {
    const All = historydata.map((i, index) => {
      console.log('history data',i)
      const userMessage = {
        _id: i?.userid,
        text: i?.text,
        createdAt: i?.created_at,
        user: {
          _id: 1,
          name: 'User',
          role: 'user',
        },
      };
      const botMessage = {
        _id: i?.id,
        text: i?.result,
        createdAt: i?.created_at,
        user: {
          _id: 112,
          name: 'Chat Bot',
          role: 'Chat Bot',
        },
      };
      return [botMessage, userMessage];
    });
    const flattenedMessages = All.flat();

    setMessages(flattenedMessages);
  }, [historydata]);

  const [value, setValue] = useState('');
  const [vasible, Setvasible] = useState(false);

  const filterData = data.filter(i =>
    i.promptname.toLowerCase().includes(value.toLowerCase()),
  );
  console.log('results');
  let text = results;
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  // const textInputProps = {

  //   placeholder: results ? results : 'fal la tua ricrrca',
  //   multiline:true,
  //   // Other TextInput props can be added here
  // };
  return (
    <SafeAreaView edges={['bottom']} style={{flex: 1}}>
      <View
        style={{
          // flex:1,
          // height: responsiveHeight(20),
          // backgroundColor: 'white',
          // justifyContent: 'space-between',
          height: select === 2 ? responsiveHeight(13) : responsiveHeight(25),
          backgroundColor: '#071832',

          //position:'relative'

          // height: responsiveHeight(20),
        }}>
        <SideChat
          visible={!!vasible}
          Close={() => {
            Setvasible(false);
          }}
          cros={() => {
            Setvasible(false);
          }}
          setbtn={btns}
          Setvasible={Setvasible}
          setHistory={setHistory}
        />
        {select === 2 && (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              paddingTop: responsiveHeight(6),
              paddingVertical: responsiveWidth(4),
              bottom: responsiveHeight(1),
            }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Categry', {val: false});
              }}
              style={{alignSelf: 'flex-start'}}>
              <Image
                source={back}
                resizeMode="contain"
                style={{
                  tintColor: 'white',
                  width: responsiveWidth(10),
                  //  marginTop: '6%',
                  height: responsiveHeight(6),
                  // backgroundColor: '#071832',
                  // borderRadius: 10,
                  marginBottom: '10%',
                  marginLeft: responsiveWidth(3),
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                Setvasible(true);
              }}
              style={{
                alignSelf: 'baseline',
                //borderWidth: 1,
                padding: '1%',
                borderRadius: 10,
              }}>
              <Image
                source={setting}
                //resizeMode="contain"
                style={{
                  tintColor: 'white',
                  // backgroundColor: '#071832',
                  width: responsiveWidth(9),
                  height: responsiveHeight(5),
                  marginTop: responsiveHeight(0.3),
                }}
              />
            </TouchableOpacity>
            <View
              onTouchEnd={() => {
                setSpk(!spk);
                spk == true && Tts.stop();
                spk == false && Tts.speak(spktxt);
                //ggggggggghg
              }}
              style={styles.valum}>
              {spk == true ? (
                <Image
                  resizeMode="contain"
                  source={valum}
                  style={{
                    // marginTop: '2%',
                    height: responsiveWidth(9),
                    width: responsiveWidth(9),
                    tintColor: '#fff',
                    //backgroundColor: '#fff',
                  }}
                />
              ) : (
                <Image
                  resizeMode="contain"
                  source={mute}
                  style={{
                    height: responsiveWidth(8),
                    width: responsiveWidth(8),
                    // marginTop: '2%',
                    /// backgroundColor: '#071832',
                    tintColor: 'white',
                    // backgroundColor: '#fff',
                  }}
                />
              )}
            </View>
            <TouchableOpacity
              onPress={() => {
                set1(!get1);

                //  handlePress()
              }}
              style={{
                alignSelf: 'flex-start',
                padding: '1%',
                borderRadius: 10,
              }}>
              <Image
                source={E}
                resizeMode="contain"
                style={{
                  tintColor: get1 === true ? 'orange' : '#fff',
                  // backgroundColor: '#071832',
                  // marginTop: '2%',
                  width: responsiveWidth(10),
                  height: responsiveHeight(6),
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setNew(true);
                openModal();
                setMessages([]);
                Tts.stop();
                // setResults();
                set(!get);
              }}
              style={{alignSelf: 'flex-start'}}>
              <Image
                source={chat}
                resizeMode="contain"
                style={{
                  tintColor: 'white',
                  // backgroundColor: '#071832',
                  width: responsiveWidth(9),
                  height: responsiveHeight(6),
                  // marginTop: '15%',
                  borderRadius: 10,
                  marginRight: responsiveWidth(3),
                  //marginHorizontal:responsiveHeight(10)

                  //borderRadius: 10,
                }}
              />
            </TouchableOpacity>

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
                  <Text
                    style={{
                      fontFamily: 'Poppins-Regular',
                      fontSize: 20,
                      color: '#000',
                      paddingVertical: 40,
                    }}>
                    Vuoi selezionare una attività?
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: '80%',
                      paddingVertical: 10,
                    }}>
                    <TouchableOpacity
                      style={{
                        // marginVertical: responsiveHeight(4),
                        height: responsiveHeight(6),
                        width: responsiveWidth(25),
                        backgroundColor: '#071832',
                        //  borderRadius: 20,
                        marginBottom: responsiveHeight(1),
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() => {
                        navigation.navigate('Categry');
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
                        SI
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={{
                        // marginVertical: '8%',
                        height: responsiveHeight(6),
                        width: responsiveWidth(25),
                        backgroundColor: '#071832',
                        //  borderRadius: 20,
                        justifyContent: 'center',
                      }}
                      onPress={() => {
                        closeModal();
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
                        No
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
          </View>
        )}

        {select === 1 && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingTop: responsiveHeight(4),
              paddingHorizontal: responsiveWidth(6),
              bottom: responsiveHeight(1),
            }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Categry', {val: false});
              }}
              style={{alignSelf: 'baseline'}}>
              <Image
                source={back}
                resizeMode="contain"
                style={{
                  tintColor: '#fff',
                  width: responsiveWidth(8),
                  height: responsiveHeight(8),
                  // marginLeft:responsiveHeight(3)
                }}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setNew(true);
                btns(2);
                setMessages([]);
                Tts.stop();
                // setResults();
                set1(true);
                set(!get);
              }}
              style={{alignSelf: 'flex-start'}}>
              <Image
                source={chat}
                resizeMode="contain"
                style={{
                  tintColor: '#fff',
                  width: responsiveWidth(8),
                  height: responsiveHeight(8),
                }}
              />
            </TouchableOpacity>
          </View>
        )}

        {/* message loader  */}
        <View style={{flex: 1, position: 'relative', zIndex: 1}}>
          <View style={{}}>
            {loader ? (
              <ActivityIndicator
                size={'large'}
                color={'green'}
                style={{
                  marginTop: responsiveHeight(40),
                  transform: [{scaleX: 2}, {scaleY: 2}],
                }}
              />
            ) : null}
          </View>
        </View>

        {select === 1 && (
          <View style={{marginBottom: responsiveHeight(8)}}>
            <Text
              numberOfLines={2}
              style={{
                fontFamily: 'Poppins-Regular',
                fontSize: responsiveFontSize(2),
                color: '#fff',
                textAlign: 'center',
              }}>
              {isLanguage === 'eng'
                ? `Seleziona I'attivitá o vai al Dossier Interattivo`
                : 'Specify your interest'}
            </Text>
          </View>
        )}
      </View>
      {select === 1 ? (
        <View style={{flex: 1}}>
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
                setValues();
              }}
              style={[
                styles.btn,
                {backgroundColor: select === 1 ? '#071832' : '#fff'},
              ]}>
              <Text
                style={[
                  styles.btn_txt,
                  {color: select === 1 ? '#fff' : '#3C4142'},
                ]}>
                {isLanguage === 'eng'
                  ? ' Specifica Attività '
                  : 'Specific activity'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                btns(2);
                setValues();
              }}
              style={[
                styles.btn,
                {backgroundColor: select === 2 ? '#071832' : '#fff'},
              ]}>
              <Text
                style={[
                  styles.btn_txt,
                  {color: select === 2 ? '#fff' : '#3C4142'},
                ]}>
                {isLanguage === 'eng'
                  ? 'Dossier interattivo'
                  : 'Interactive dossier'}
              </Text>
            </TouchableOpacity>
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
            <Image
              source={search}
              resizeMode="contain"
              style={{
                height: responsiveWidth(5),
                width: responsiveWidth(5),
                right: responsiveWidth(5),
              }}
            />
          </View>
          {data.length > 0 ? null : (
            <ActivityIndicator
              size={'large'}
              color={'#000'}
              style={{marginTop: responsiveHeight(10)}}
            />
          )}

          <FlatList
            data={filterData}
            showsVerticalScrollIndicator={false}
            renderItem={({item, ind}) => {
              // const dataArray = [...item]
              // console.log('this is the data bhai ', filterData);
              // const sortedData = dataArray.sort((a, b) => (a.promptname) - (b.promptname));
              // console.log('sort data ', sortedData);
              return (
                <View style={{flex: 1}}>
                  <TouchableOpacity
                    onPress={() => {
                      setResults(item?.promptname);
                      SetOthers(item);

                      btns(2);
                    }}
                    style={styles.data_content}>
                    <Text
                      style={{
                        fontSize: responsiveFontSize(1.8),
                        color: '#fff',
                        fontFamily: 'Poppins-Regular',
                        paddingStart: responsiveWidth(2),
                      }}>
                      {item.promptname}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        </View>
      ) : null}
      {select === 2 ? (
        <TouchableOpacity style={{zIndex: -1}} onPress={handleDismissKeyboard}>
          <View>
            {/* {this.handleDismissKeyboard} */}
            {/* {stop ? (
              <View style={styles.voice_contain}>
                <Text style={styles.voice_txt}>
                  {`start converting your voice to text`}
                </Text>
                <Text
                  style={{
                    color: 'red',
                    fontFamily: 'Poppins-Bold',
                    fontSize: responsiveFontSize(1.7),
                  }}>
                  {`WAIT--Aspettare`}
                </Text>
                <Text style={styles.voice_txt}>
                  {`inizia a convertire la tua voce in testo`}
                </Text>
                <Text
                  style={{color: '#000', fontSize: responsiveFontSize(1.3)}}>
                  {pitch}
                </Text>
              </View>
            ) : null} */}
            {/* {loader == true && (
              <ActivityIndicator
                size={'large'}
                color={'#000'}
                style={{ marginTop: responsiveHeight(10) }}
              />
            )} */}
            <ScrollView>
              <View style={{height: responsiveHeight(87), zIndex: 1,marginBottom:90}}>
                <GiftedChat
                  messages={messages.map((message, index) => ({
                    ...message,
                    _id: index, // Use index as a unique key
                  }))}
                  onPress={handleDismissKeyboard}
                  text={results ? results : undefined}
                  //  placeholder={}
                  onSend={newMessages => {
                    const userTypedText = newMessages[0].text;
                    const combinedText = userTypedText;
                    handlePress(combinedText);
                 
                    setTimeout(() => {
                      setResults('');
                    }, 100);
                  }}
                  timeFormat="hh:mm A"
                  dateFormat="hh:mm A"
                  // textInputProps={textInputProps}

                   onInputTextChanged={text=>setResults(text)}
                  user={{
                    _id: 1,
                    name: 'User',
                  }}
                  renderBubble={renderBubble}
                  renderSend={renderSend}
                  renderInputToolbar={renderInputToolbar}
                  renderAvatar={props => null}
                  // renderAvatarOnTop={false}
                />
              </View>
            </ScrollView>
          </View>
        </TouchableOpacity>
      ) : null}
    </SafeAreaView>
  );
};

export default Chatscreen;

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
  btn_txt: {fontFamily: 'Poppins-Regular', fontSize: responsiveFontSize(1.6)},

  data_content: {
    paddingVertical: responsiveHeight(2),
    width: responsiveWidth(92),
    borderRadius: responsiveWidth(2),
    justifyContent: 'space-between',
    backgroundColor: '#071832',
    marginVertical: responsiveHeight(1),
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },

  txt_input: {
    height: responsiveHeight(6.2),
    width: responsiveWidth(92),
    backgroundColor: 'transparent',
    // borderWidth: responsiveWidth(0.2),
    borderColor: '#000',
    borderRadius: responsiveWidth(3),
    alignSelf: 'center',
    marginTop: responsiveHeight(4),
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
    //marginTop:10
  },
  voice_contain: {
    height: responsiveHeight(15),
    width: responsiveWidth(80),
    backgroundColor: '#fff',
    elevation: 20,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    alignSelf: 'center',
    top: 7,
    borderRadius: 10,
    zIndex: 999,
  },
  voice_txt: {
    alignSelf: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
    color: '#000',
    fontSize: responsiveFontSize(1.5),
  },
  valum: {
    height: responsiveHeight(7),
    width: responsiveWidth(12),
    tintColor: '#fff',
    //elevation: 1,
    borderRadius: responsiveWidth(3),
    alignItems: 'center',
    justifyContent: 'center',
    // position: 'absolute',
    zIndex: 9999,
    // marginTop: 3,
    alignSelf: 'flex-start',
  },

  headericon: {
    width: responsiveWidth(10),
    height: responsiveHeight(6),
    backgroundColor: '#071832',
    borderRadius: 10,
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
    width: responsiveWidth(90),
    height: responsiveHeight(30),
    marginTop: responsiveHeight(7),
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
