/**
 * @flow
 */

import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
    height: 30,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
  },
});

type Props = {
  onPress: Function,
  text?: string,
};

const Button = (props: Props): React$Element<any> => (
  <TouchableOpacity style={styles.container} onPress={props.onPress} >
    <View style={{ flexDirection: 'row' }}>
      <Text style={styles.text}>{props.text}</Text>
    </View>
  </TouchableOpacity>
);

export default Button;

Button.defaultProps = {
  text: undefined,
};
