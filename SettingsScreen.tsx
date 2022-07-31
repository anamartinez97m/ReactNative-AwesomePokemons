import React, { Component, useState } from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { CheckBox } from "@rneui/themed";

type CheckboxComponentProps = {};

const CheckboxComponent: React.FunctionComponent<CheckboxComponentProps> = () => {
    let [checkEnglish, setCheckEnglish] = useState(false);
    let [checkSpanish, setCheckSpanish] = useState(false);

    return (
        <>
          <CheckBox
            title="English"
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checked={checkEnglish}
            onPress={() => setCheckEnglish(!checkEnglish)}
          />
          <CheckBox
            title="Spanish"
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checked={checkSpanish}
            onPress={() => setCheckSpanish(!checkSpanish)}
          />
        </>
    );
}
class SettingsScreen extends React.Component {

    render() {
        return (
            <View style={styles.checkboxsContainer}>
                <Text style={[styles.checkboxsTitle]}>Select the language!</Text>
                <CheckboxComponent></CheckboxComponent>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    checkboxsContainer: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        paddingBottom: 5,
        marginHorizontal: 16
    },
    checkboxsTitle: {
        padding: 5,
        marginVertical: 8,
        fontSize: 24,
        color: 'black'
    },
    checkbox: {
        tintColor: 'pink'
    }
});

export default SettingsScreen;
