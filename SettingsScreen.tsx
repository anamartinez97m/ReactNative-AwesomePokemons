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
    const [selectedLanguageCode, setSelectedLanguageCode] = useState('');

    const changeLanguage = async (lang: any) => {
        i18n.locale = lang;
        // AsyncStorage.setItem('language', lang);
    };

    return (
        <>
            <View style={[styles.languageContainer]}>
                <Text style={[styles.languageTitle]}>{I18n.t('select_language')}</Text>
                <TouchableOpacity 
                style={[styles.languageButton]} 
                onPress={() => {
                    changeLanguage('en');
                    setSelectedLanguageCode('en');
                }}>
                    <View>
                        <Text style={[styles.languageText]}>{I18n.t('language_english')}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity 
                style={[styles.languageButton]} 
                onPress={() => {
                    changeLanguage('es');
                    setSelectedLanguageCode('es');
                }}>
                    <View>
                        <Text style={[styles.languageText]}>{I18n.t('language_spanish')}</Text>
                    </View>
                </TouchableOpacity>
                <Text style={[styles.currentLanguage]}>{I18n.t('current_language')}</Text>
                <Text style={[styles.currentLanguage]}>
                    {selectedLanguageCode === 'en' ? 
                        I18n.t('language_english') : I18n.t('language_spanish')}
                </Text>
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
