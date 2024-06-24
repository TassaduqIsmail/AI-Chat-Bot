import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Modal,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

const MsgModal = ({msg, loader}) => {
  const [visible, setVisible] = useState(null);
  return (
    <Modal transparent visible={!visible}>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <View
          style={{
            height: responsiveHeight(30),
            width: responsiveHeight(35),
            backgroundColor: '#000',
            borderRadius: responsiveWidth(5),
            alignItems: 'center',
            paddingHorizontal: responsiveWidth(3),
            elevation: responsiveHeight(10),
            justifyContent: 'center',
          }}>
          {msg && (
            <>
              <Text
                style={{
                  color: '#fff',
                  fontSize: responsiveFontSize(1.7),
                  letterSpacing: responsiveWidth(0.2),
                  marginTop: responsiveHeight(1.2),
                }}>
                {msg}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setVisible(!visible);
                }}
                style={{
                  height: responsiveHeight(4),
                  width: responsiveHeight(10),
                  backgroundColor: '#fff',
                  top: responsiveHeight(4),
                  borderRadius: responsiveWidth(4),
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{color: '#000', fontWeight: 'bold'}}>OK</Text>
              </TouchableOpacity>
            </>
          )}

          {loader && (
            <ActivityIndicator
              size={'large'}
              color={'#ffff'}
              style={{transform: [{scaleY: 2.5}, {scaleX: 2.5}]}}
            />
          )}
        </View>
      </View>
    </Modal>
  );
};

export default MsgModal;

const styles = StyleSheet.create({});
