import React, {useState} from 'react';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import Toast from 'react-native-toast-message';

const useToast = () => {
  const [count, setCount] = useState(0);
  const showToast = (type, text, message, time, options) => {
    Toast.show({
      type: type,
      text1: text,
      text2: message,
      visibilityTime: time,
      autoHide: true,
      bottomOffset: responsiveHeight(10),
      ...options,
    });
  };

  return {showToast};
};

export default useToast;
