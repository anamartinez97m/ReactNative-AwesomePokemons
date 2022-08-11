import React, { Component, useContext, useState } from 'react';
import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Updates } from 'expo';
import i18n from './i18n/i18n';
import en from './i18n/locales/en';
import es from './i18n/locales/es';
import styles from './Styles';
import RNRestart from 'react-native-restart';

const LanguageButtonsComponent: React.FunctionComponent = () => {
    const [selectedLanguageCode, setSelectedLanguageCode] = useState('');

    const changeLanguage = async (lang: any) => {
        i18n.locale = lang;
        AsyncStorage.setItem('language', lang);
        RNRestart.Restart();
    };

    return (
        <>
            <View style={[styles.languageContainer]}>
                <Text style={[styles.languageTitle]}>{i18n.t('select_language')}</Text>
                <TouchableOpacity 
                style={[styles.languageButton]} 
                onPress={() => {
                    changeLanguage('en');
                    setSelectedLanguageCode('en');
                }}>
                    <View>
                        <Text style={[styles.languageText]}>{i18n.t('language_english')}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity 
                style={[styles.languageButton]} 
                onPress={() => {
                    changeLanguage('es');
                    setSelectedLanguageCode('es');
                }}>
                    <View>
                        <Text style={[styles.languageText]}>{i18n.t('language_spanish')}</Text>
                    </View>
                </TouchableOpacity>
                <Text style={[styles.currentLanguage]}>{i18n.t('current_language')}</Text>
                <Text style={[styles.currentLanguage]}>
                    {selectedLanguageCode === 'es' ? 
                        i18n.t('language_spanish') : i18n.t('language_english')}
                </Text>
            </View>
        </>
    );
}

const Settings = () => {

    return (
        <LanguageButtonsComponent></LanguageButtonsComponent>
    );
}

export default Settings;
