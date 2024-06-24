import React, {useState, useRef, useEffect} from 'react';
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
  FlatList,
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
import axios from 'axios';
import useToast from '../Hooks/useToast';

// import {
//   Backgroundimages,
//   Colors,
//   Iconsimages,
// } from '../../utlies/constants/Themes';
const SideChat = ({
  Close,
  visible,
  Language,
  tone,
  Wstyle,
  onDismiss,
  cros,
  navigation,
  setbtn,
  Setvasible,
  setHistory,
}) => {
  const isLanguage = useSelector(state => state.auth.language);
  const isdata = useSelector(state => state.auth.logindata);

  const name = isdata?.user_nicename;
  const email = isdata?.user_email;
  const [hiss, sethiss] = useState(false);
  const [hiss1, sethiss1] = useState(false);
  const [hiss2, sethiss2] = useState(false);
  const [hiss3, sethiss3] = useState(false);
  const [hiss4, sethiss4] = useState(false);
  const [hiss5, sethiss5] = useState(false);

  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [data4, setData4] = useState([]);
  const [data5, setData5] = useState([]);

  // const [history, setHistory] = useState();
  const id = isdata?.ID;
  console.log('user id hn bhai ', id);
  const {showToast} = useToast();
  console.log(id);
  useEffect(() => {
    const Handlepress = async () => {
      //   setLoading(true);
      await axios
        .get(
          `https://professionista-ai.com/wp-json/proff_ai/v2/searchpagedata?token=3h97Cu0RAb4AKrDo&user_id=${id}`,
        )

        .then(data => {
          const responseData =
            data?.data?.data?.searchhistory?.today?.map(date => ({
              text: date.text,
              created_at: date.created_at,
              chat_id: date.id,
            })) || [];
          const responseData1 =
            data?.data?.data?.searchhistory?.['7days']?.map(date => ({
              text: date.text,
              created_at: date.created_at,
              chat_id: date.id,
            })) || [];
          const responseData2 =
            data?.data?.data?.searchhistory?.['10days']?.map(date => ({
              text: date.text,
              created_at: date.created_at,
              chat_id: date.id,
            })) || [];
          const responseData3 =
            data?.data?.data?.searchhistory?.['30days']?.map(date => ({
              text: date.text,
              created_at: date.created_at,
              chat_id: date.id,
            })) || [];
          const responseData4 =
            data?.data?.data?.searchhistory?.['1year']?.map(date => ({
              text: date.text,
              created_at: date.created_at,
              chat_id: date.id,
            })) || [];
          const responseData5 =
            data?.data?.data?.searchhistory?.afteryear?.map(date => ({
              text: date.text,
              created_at: date.created_at,
              chat_id: date.id,
            })) || [];

          console.log('check', responseData);
          console.log('check1', responseData1);
          console.log('check2', responseData2);
          console.log('check3', responseData3);
          console.log('check4', responseData4);
          console.log('check5', responseData5);
          console.log('today data ', data?.data?.data?.searchhistory?.today);

          setData(responseData);
          setData1(responseData1);
          setData2(responseData2);
          setData3(responseData3);
          setData4(responseData4);
          setData5(responseData5);
          // console.log(
          //   i.data.searchhistory.today.map(i => i.promptname),
          //   'i.data.data.searchhistory',
          // );
          //  console.log('helllllll',Handlepress())
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          //  console.log(err);
        });
    };
    Handlepress();
  }, []);

  const renderItem = ({item}) => (
    <View style={{flex: 1}}>
      <TouchableOpacity
        onPress={() => {
          setHistory(item.chat_id);
          setbtn(2);
          Setvasible(false);
        }}
        style={styles.data_content}>
        <Text
          numberOfLines={6}
          style={{
            fontSize: responsiveFontSize(1.8),
            color: '#000',
            maxWidth: responsiveWidth(56),
          }}>
          {item?.text}
        </Text>
        <Text
          numberOfLines={6}
          style={{
            fontSize: responsiveFontSize(1.8),
            color: '#000',
            maxWidth: responsiveWidth(56),
          }}>
          {item?.created_at}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{}}>
      {/* <StatusBar
        translucent={true}
        backgroundColor={'transparent'}
        // barStyle={'dark-content'}
      /> */}

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
              marginTop: responsiveHeight(3),
              marginBottom: responsiveHeight(1),
            }}>
            <View>
              <Text
                style={{
                  color: '#000',
                  fontSize: responsiveFontSize(2),
                  fontFamily: 'Poppins-Bold',
                }}>
                Recerche effettuate
              </Text>
            </View>

            <TouchableOpacity onPress={cros}>
              <Image
                source={cross}
                resizeMode="contain"
                style={{height: responsiveHeight(8), width: responsiveWidth(8)}}
              />
            </TouchableOpacity>
          </View>

          {error == true && (
            <Text
              style={{
                color: 'red',
                fontSize: responsiveFontSize(2),
                fontFamily: 'Poppins-Bold',
                top: responsiveHeight(5),
                alignSelf: 'center',
              }}>
              Nessuna storia
            </Text>
          )}
          <TouchableOpacity
            style={{
              borderWidth: 1,
              backgroundColor: '#071832',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 10,
              margin: 10,
            }}
            onPress={() => {
              sethiss(!hiss);
            }}>
            <Text style={{fontFamily: 'Poppins-Bold', color: '#fff'}}>
              Oggi{/* Today */}
            </Text>
          </TouchableOpacity>

          {hiss == true ? (
            <FlatList
              data={data}
              showsVerticalScrollIndicator={false}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
          ) : null}
          <TouchableOpacity
            style={{
              borderWidth: 1,
              backgroundColor: '#071832',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 10,
              margin: 10,
            }}
            onPress={() => {
              sethiss1(!hiss1);
              sethiss(false);
              sethiss2(false);
              sethiss3(false);
              sethiss4(false);
              sethiss5(false);
            }}>
            <Text style={{fontFamily: 'Poppins-Bold', color: '#fff'}}>
              7 Giorni {/* 7days */}
            </Text>
          </TouchableOpacity>
          {hiss1 == true ? (
            <FlatList
              data={data1}
              showsVerticalScrollIndicator={false}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
          ) : null}
          {/* <TouchableOpacity
            style={{
              borderWidth: 1,
              backgroundColor: '#071832',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 10,
              margin: 10,
            }}
            onPress={() => {
              sethiss2(!hiss2);
              sethiss(false);
              sethiss5(false);
              sethiss3(false);
              sethiss4(false);
              sethiss1(false);
            }}>
            <Text style={{fontFamily: 'Poppins-Bold', color: '#fff'}}>
              10days
            </Text>
          </TouchableOpacity>
          {hiss2 == true ? (
            <FlatList
              data={data2}
              showsVerticalScrollIndicator={false}
              renderItem={({item, ind}) => {
                // console.log('item', item.text);
                return (
                  <View style={{flex: 1}}>
                    <TouchableOpacity
                      onPress={() => {
                        setHistory(item.id);
                        setbtn(2);
                        Setvasible(false);
                      }}
                      style={styles.data_content}>
                      <Text
                        numberOfLines={6}
                        style={{
                          fontSize: responsiveFontSize(1.8),
                          color: '#000',
                          //textAlign: 'justify',
                          maxWidth: responsiveWidth(56),
                          //maxHeight: responsiveHeight(5),
                          //backgroundColor:"#000"
                        }}>
                        {data2}
                      </Text>
                      <Text
                      numberOfLines={1}
                      style={{
                        fontSize: responsiveFontSize(1.8),
                        color: '#000',
                        maxWidth: responsiveWidth(56),
                        maxHeight: responsiveHeight(5),
                      }}>
                      { item.text}
                    </Text> 
                    </TouchableOpacity>
                  </View>
                );
              }}
            />
          ) : null} */}
          <TouchableOpacity
            style={{
              borderWidth: 1,
              backgroundColor: '#071832',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 10,
              margin: 10,
            }}
            onPress={() => {
              sethiss3(!hiss3);
              sethiss(false);
              sethiss2(false);
              sethiss5(false);
              sethiss4(false);
              sethiss1(false);
            }}>
            <Text style={{fontFamily: 'Poppins-Bold', color: '#fff'}}>
              30 Giorni {/* 30days */}
            </Text>
          </TouchableOpacity>
          {hiss3 == true ? (
            <FlatList
              data={data3}
              showsVerticalScrollIndicator={false}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
          ) : null}
          <TouchableOpacity
            style={{
              borderWidth: 1,
              backgroundColor: '#071832',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 10,
              margin: 10,
            }}
            onPress={() => {
              sethiss4(!hiss4);
              sethiss(false);
              sethiss2(false);
              sethiss3(false);
              sethiss5(false);
              sethiss1(false);
            }}>
            <Text style={{fontFamily: 'Poppins-Bold', color: '#fff'}}>
              1 Anno{/* 1Year */}
            </Text>
          </TouchableOpacity>
          {hiss4 == true ? (

            data4.length>0?
            <FlatList
              data={data4}
              showsVerticalScrollIndicator={false}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
            />:<Text 
            style={{
              color:'black',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 10,
              margin: 10,
            }}
            
            
            >No Record Found</Text>
          ) : null}
          <TouchableOpacity
            style={{
              borderWidth: 1,
              backgroundColor: '#071832',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 10,
              margin: 10,
            }}
            onPress={() => {
              sethiss5(!hiss5);
              sethiss(false);
              sethiss2(false);
              sethiss3(false);
              sethiss4(false);
              sethiss1(false);
            }}>
            <Text style={{fontFamily: 'Poppins-Bold', color: '#fff'}}>
              AfterYear
            </Text>
          </TouchableOpacity>
          {hiss5 == true ? (
            data5.length>0?
            <FlatList
              data={data5}
              showsVerticalScrollIndicator={false}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
            />:<Text 
            style={{
              color:'black',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 10,
              margin: 10,
            }}
            
            
            >No Record Found</Text>
          ) : null}
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
  data_content: {
    // height: responsiveHeight(6),
    paddingVertical: responsiveHeight(1),
    width: responsiveWidth(67),
    marginVertical: responsiveHeight(0.4),
    borderWidth: responsiveWidth(0.2),
    borderBottomColor: '#000',
    borderRadius: responsiveWidth(2),
    alignSelf: 'center',
    justifyContent: 'center',
    paddingLeft: responsiveWidth(2),
    zIndex: 9999,
  },
});
export default SideChat;
