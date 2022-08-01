import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {ScaleH, ScaleW} from '../../../shared/common';
import {DATAHEADER} from '../constant';
import {translate} from '../../../shared/translate/translate';
interface Props {
  onChange: (values: any) => void;
  valuesDefault: string;
}

const Header: React.FC<Props> = props => {
  return (
    <View style={styles.header}>
      {DATAHEADER.map((item, index) => {
        const handleChange = () => {
          props.onChange(item);
        };
        return (
          <TouchableOpacity
            key={index}
            style={styles.headerBtn}
            onPress={handleChange}>
            <Text
              style={[
                styles.headerBtnText,
                {color: props.valuesDefault === item ? '#0C0F14' : '#7c8089'},
              ]}>
              {translate(item)}
            </Text>
            <View
              style={[
                styles.headerBtnLine,
                {
                  backgroundColor:
                    props.valuesDefault === item ? '#0C0F14' : '#DBDBDC',
                },
              ]}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignSelf: 'center',
    width: '75%',
    paddingBottom: ScaleH(15),
  },
  headerBtn: {
    flex: 3.3,
  },
  headerBtnText: {
    fontSize: ScaleW(16),
    fontWeight: '500',
    alignSelf: 'center',
  },
  headerBtnLine: {
    height: ScaleH(2),
    width: '100%',
    backgroundColor: '#DBDBDC',
    marginTop: ScaleH(5),
  },
});
