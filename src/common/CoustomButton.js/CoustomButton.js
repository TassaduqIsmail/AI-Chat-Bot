import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {MediumText, NormalText} from '../Coustomtext/Index';

const CoustomButton = ({
  textStyle,
  textcolor,
  fontFamily,
  height,
  width,
  bgcolor,
  borderwidth,
  borderColor,
  text,
  onPress,
  withicon,
  self,
  style,
  iconcolor,
}) => {
  return (
    <>
      <TouchableOpacity
        onPress={onPress}
        style={[
          {
            height: responsiveHeight(5.7),
            width: width,
            backgroundColor: bgcolor,

            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            borderRadius: responsiveWidth(3),
            borderColor: borderColor,
            zIndex: -999999,
          },
          borderwidth && {borderWidth: responsiveWidth(0.2)},
          self && {alignSelf: 'center'},
          style,
        ]}>
        {withicon && (
          <Image
            resizeMode="contain"
            source={withicon}
            style={{
              height: responsiveHeight(2.5),
              width: responsiveHeight(2.5),
              borderRadius: responsiveHeight(2),
              position: 'absolute',
              left: responsiveWidth(7),
              tintColor: iconcolor,
            }}
          />
        )}
        <Text style={[{left: withicon ? responsiveWidth(3) : null}, textStyle]}>
          {text}
        </Text>
      </TouchableOpacity>
    </>
  );
};

export default CoustomButton;

const styles = StyleSheet.create({});
