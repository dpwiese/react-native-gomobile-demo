/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, SafeAreaView, NativeModules} from 'react-native';
import Button from './Button';
import { solveBVPWithInputs, solveBVPWithoutInputs } from './computation';
import { base64StringToNumberArray, numberArrayToBase64String } from './services';
// import { solveBVPWithoutInputs } from './computation';

const Computation = NativeModules.Computation;

const solverConfig = "{\"solverConfig\":{\"epsilon\": 0.1, \"maxIterations\": 250000, \"maxResidual\": 1.0e-11, \"domain\": {\"min\": -1.0, \"max\": 1.0 }}}";

type Props = {};
export default class App extends Component<Props> {
  constructor(props: Props) {
    super(props);
    this.state = {
      nativeOutput: '0',
      javaScriptOutput: '0'
    };
  }

  nativeCallback = (number) => {
    this.setState({ nativeOutput: number.toString() });
  };

  javaScriptCallback = (object) => {
    this.setState({ javaScriptOutput: object.toString() });
  };

  runNativeComuptation = () => {
    // Computation.solveBVPWithoutInputs(this.nativeCallback);
    Computation.solveBVPWithInputs(solverConfig, this.nativeCallback);
  };

  runJavaScriptComuptation = () => {
    // solveBVPWithoutInputs(this.javaScriptCallback);
    solveBVPWithInputs(solverConfig, this.javaScriptCallback);
  };

  runMoreFunStuff = () => {
    // Concatenate two strings using Go function and log to the console.
    Computation.concatenateStrings('test1', 'test2', out => console.log(out));

    // Convert an array of numbers to a base64 string, pass it to Go where the elements are incremented by one and returned as a
    // base 64 string. This base64 string is decoded and logged to the console as an array of numbers.
    Computation.incrementArrayElements(numberArrayToBase64String([1.1, 2.2]), out => console.log(base64StringToNumberArray(out)));

    // Add two numbers using Go function
    Computation.addTwoNumbers(1, 2, out => console.log(out));
  }

  render() {
    return (
      <SafeAreaView style={styles.safeContainer}>
        <Text style={styles.title}>GoMobile Demo</Text>
        <View style={styles.contentContainer}>
          <View style={styles.rowContainer}>
            <Text style={styles.text}>{this.state.nativeOutput}</Text>
            <Text style={styles.text}>{this.state.javaScriptOutput}</Text>
          </View>
          <View style={styles.rowContainer}>
            <Button onPress={this.runNativeComuptation} text={"NATIVE"}/>
            <Button onPress={this.runJavaScriptComuptation} text={"JAVASCRIPT"}/>
          </View>
          <View style={styles.rowContainer}>
            <Button onPress={this.runMoreFunStuff} text={"RUN MORE FUN STUFF"}/>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 20,
    margin: 20,
    textAlign: 'center',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  rowContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  text: {
    flex: 1,
    fontSize: 20,
    margin: 10,
    textAlign: 'center',
  },
});
