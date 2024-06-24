import {
  ActivityIndicator,
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import back from './../assets/back.png';
import axios from 'axios';
import {setwritting} from '../Store/Lang';
import check from './../assets/double-check.png';

const WritingStyle = ({navigation}) => {
  const isLanguage = useSelector(state => state.auth.language);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const Handlepress = async () => {
      //   setLoading(true);
      await axios
        .get(
          `https://professionista-ai.com/wp-json/proff_ai/v1/writing-style?token=3h97Cu0RAb4AKrDo`,
        )
        .then(i => {
          console.log(i.data.data);
          if (i.data.status != 200) {
            // setLoading(false);
            console.log('false', i);

            showToast('error', 'Error', 'network error', 5000);
            return;
          } else {
            // setLoading(false);
            setData(i.data.data);
          }
        })
        .catch(err => {
          console.log(err);
        });
    };
    Handlepress();
  }, []);
  console.log('data', data);
  const lang = useSelector(state => state.auth.writting);
  const [select, setSelect] = useState(lang);

  const dispatch = useDispatch();
  const handlelang = item => {
    dispatch(setwritting(item.prompt_name));
    setSelect(item.prompt_name);
    console.log('lang', lang, select);
  };
  return (
    <SafeAreaView edges={['bottom']} style={{flex: 1}}>
      <StatusBar
        backgroundColor={'transparent'}
        barStyle={'light-content'}
        translucent={true}
      />
      <View
        style={{
          height: responsiveHeight(20),
          backgroundColor: '#071832',

          // ,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingTop: responsiveHeight(4),
            paddingHorizontal: responsiveWidth(4),
            bottom: responsiveHeight(1),
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Categry', {val: true});
            }}>
            <Image
              source={back}
              resizeMode="contain"
              style={{
                tintColor: '#fff',
                width: responsiveWidth(8),
                height: responsiveHeight(8),
              }}
            />
          </TouchableOpacity>
        </View>
        <View>
          <Text
            style={{
              fontFamily: 'Poppins-Regular',
              fontSize: responsiveFontSize(2.4),
              color: '#fff',
              textAlign: 'center',
            }}>
            {isLanguage === 'eng'
              ? 'Seleziona lo stile di scrittura'
              : 'Select writing style'}
          </Text>
        </View>
      </View>
      {data.length > 0 ? null : (
        <ActivityIndicator
          size={'large'}
          color={'#000'}
          style={{marginTop: responsiveHeight(10)}}
        />
      )}

      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        renderItem={({item, ind}) => {
          return (
            <View style={{flex: 1}}>
              <TouchableOpacity
                style={styles.data_content}
                onPress={() => handlelang(item)}>
                <Text
                  style={{
                    fontSize: responsiveFontSize(2),
                    color: '#fff',
                    fontFamily: 'Poppins-Regular',
                  }}>
                  {item.prompt_name}
                </Text>
                {select === item.prompt_name && (
                  <Image
                    source={check}
                    resizeMode="contain"
                    style={{
                      height: responsiveHeight(5),
                      width: responsiveWidth(5),
                    }}
                  />
                )}
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default WritingStyle;

const styles = StyleSheet.create({
  data_content: {
    height: responsiveHeight(6.5),
    width: responsiveWidth(85),
    marginVertical: responsiveHeight(1),
    borderWidth: responsiveWidth(0.2),
    borderBottomColor: '#000',
    borderRadius: responsiveWidth(2),
    alignSelf: 'center',
    justifyContent: 'space-between',
    paddingLeft: responsiveWidth(2),
    backgroundColor: '#071832',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(5),
  },
});
