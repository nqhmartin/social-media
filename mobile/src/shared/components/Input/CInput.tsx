import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import {ScaleH, ScaleW} from '../../common';

interface Props {
  placeholder: string;
  onChangeText: (txt: string) => void;
  values: string;
  showText: boolean;
}

const CInput: React.FC<Props> = props => {
  const {placeholder, onChangeText, values, showText} = props;
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      onChangeText={(txt: string) => onChangeText(txt)}
      value={values}
      secureTextEntry={showText}
    />
  );
};

export default CInput;

const styles = StyleSheet.create({
  input: {
    width: '100%',
    height: ScaleH(42),
    backgroundColor: '#E8E6E6',
    borderRadius: 5,
    paddingHorizontal: ScaleW(18),
    fontSize: ScaleW(14),
    marginBottom: ScaleH(10),
  },
});
