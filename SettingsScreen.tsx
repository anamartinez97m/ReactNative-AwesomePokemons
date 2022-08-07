import React, { Component, useContext, useState } from 'react';
import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CheckBox } from '@rneui/themed';
// import { Updates } from 'expo';
import i18n from './i18n/i18n';
import en from './i18n/locales/en';
import es from './i18n/locales/es';
import styles from './Styles';
import I18n from './i18n/i18n';

const LanguageButtonsComponent: React.FunctionComponent = () => {
    console.log(i18n.locale);
    const selectedLanguageCode = i18n.locale;
    const selectedLanguage = 
        (selectedLanguageCode === 'en') ? I18n.t('language_english') : I18n.t('language_spanish');

    // const {language, setLanguage} = useContext(global.LanguageContext);

    const onChangeLanguage = (value: any) => {
        console.log(value);
        changeLanguage(value)
     // setTimeout(() => Updates.reload(),500)
    }

    const changeLanguage = async (lang: any) => {
        i18n.locale = lang;
        // setI18nConfig(lang);
        // AsyncStorage.setItem('language', lang);
    };

    const setI18nConfig = (lang: any) => {
        const fallback = { languageTag: 'en', isRTL: false };
        i18n.translations = { en, es };
        i18n.locale = lang;
    };

    return (
        <>
            <View style={[styles.languageContainer]}>
                <Text style={[styles.languageTitle]}>{I18n.t('select_language')}</Text>
                <TouchableOpacity 
                style={[styles.languageButton]} 
                onPress={() => {console.log('pulsado ingles')}}>
                    <View>
                        <Text 
                        style={[styles.languageText]}
                        onPress={() => {}}>{I18n.t('language_english')}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity 
                style={[styles.languageButton]} 
                onPress={() => {}}>
                    <View>
                        <Text 
                        style={[styles.languageText]} 
                        onPress={() => console.log('pulsado español')}>{I18n.t('language_spanish')}</Text>
                    </View>
                </TouchableOpacity>
                <Text style={[styles.currentLanguage]}>{I18n.t('current_language')}</Text>
                <Text style={[styles.currentLanguage]}>{selectedLanguage}</Text>
            </View>
        </>
    );
}
class SettingsScreen extends React.Component {

    render() {
        return (
            <LanguageButtonsComponent></LanguageButtonsComponent>
        );
    }
}

export default SettingsScreen;
