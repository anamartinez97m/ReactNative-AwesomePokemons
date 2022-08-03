import React, { Component, useContext, useState } from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { CheckBox } from '@rneui/themed';
// import { Updates } from 'expo';
import i18n from './i18n/i18n';
import en from './i18n/locales/en';
import es from './i18n/locales/es';
import styles from './Styles';

type CheckboxComponentProps = {};

const CheckboxComponent: React.FunctionComponent<CheckboxComponentProps> = () => {
    let [checkEnglish, setCheckEnglish] = useState(false);
    let [checkSpanish, setCheckSpanish] = useState(false);

    // const {language, setLanguage} = useContext(global.LanguageContext);

    // const onChangeLanguage = (value: any) => {
        // setLanguage(value)
        // changeLanguage(value)
        // setTimeout(() => Updates.reload(),500)
    // }

    // const changeLanguage = async (lang: any) => {
        // setI18nConfig(lang);
        // AsyncStorage.setItem('language', lang);
    // };

    const setI18nConfig = (lang: any) => {
        // fallback if no available language fits
        const fallback = { languageTag: 'en', isRTL: false };
      
        // clear translation cache
        // translate.cache.clear();
        // update layout directio
        // set i18n-js config
        i18n.translations = { en, es };
        i18n.locale = lang;
    };

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

export default SettingsScreen;
