import React, { useEffect, useState } from 'react';
import { Animated, Easing, Text, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from './i18n/i18n';
import styles from './Styles';
import RNRestart from 'react-native-restart';

const LanguageButtonsComponent: React.FunctionComponent = () => {
    const [selectedLanguageCode, setSelectedLanguageCode] = useState('');
    const [currentLanguage, setCurrentLanguage] = useState('');

    const [selectLanguageAnimation] = useState(() => new Animated.Value(0));
    const [englishButtonAnimation] = useState(() => new Animated.Value(0));
    const [spanishButtonAnimation] = useState(() => new Animated.Value(0));
    const [selectedLanguageAnimation] = useState(() => new Animated.Value(0));
    const [currentLanguageAnimation] = useState(() => new Animated.Value(0));

    const scaleText1 = selectLanguageAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [0.5, 1]
    });

    const englishButton = englishButtonAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [0.5, 1]
    });
    
    const spanishButton = spanishButtonAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [0.5, 1]
    });

    const scaleText2 = selectedLanguageAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [0.5, 1]
    });

    const scaleText3 = currentLanguageAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [0.5, 1]
    });

    useEffect(() => {
        AsyncStorage.getItem('language').then((value) => {
            if (value === 'es') {
                setCurrentLanguage(i18n.t('language_spanish'));
            } else if (value === 'en') {
                setCurrentLanguage(i18n.t('language_english'));
            } else {
                setCurrentLanguage(i18n.t('language_spanish'));
            }
		});

        const createAnimation = 
            (value: Animated.Value | Animated.ValueXY, 
            duration: number, 
            easing: any, 
            delay = 0) => {
            return Animated.timing(
                value,
                {
                    toValue: 1,
                    duration,
                    easing,
                    delay,
                    useNativeDriver: true
                }
            )
        }
        Animated.parallel([
            createAnimation(selectLanguageAnimation, 1000, Easing.ease),
            createAnimation(englishButtonAnimation, 1000, Easing.bounce, 1000),
            createAnimation(spanishButtonAnimation, 1000, Easing.bounce, 2000),
            createAnimation(selectedLanguageAnimation, 1000, Easing.bezier(0, 2, 1, -1), 3000),
            createAnimation(currentLanguageAnimation, 1000, Easing.bezier(0, 2, 1, -1), 4000)
        ]).start()
    });

    const changeLanguage = async (lang: any) => {
        i18n.locale = lang;
        AsyncStorage.setItem('language', lang);
        RNRestart.Restart();
    };

    return (
        <>
            <View style={[styles.languageContainer]}>
                <Animated.View
                    style={{
                        transform: [{scale: scaleText1}]
                    }}
                >
                    <Text style={[styles.languageTitle]}>{i18n.t('select_language')}</Text>
                </Animated.View>
                <Animated.View
                    style={{
                        transform: [{scale: englishButton}]
                    }}
                >
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
                </Animated.View>
                <Animated.View
                    style={{
                        transform: [{scale: spanishButton}]
                    }}
                >
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
                </Animated.View>
                <Animated.View
                    style={{
                        transform: [{scale: scaleText2}]
                    }}
                >
                    <Text style={[styles.currentLanguage]}>{i18n.t('current_language')}</Text>
                </Animated.View>
                <Animated.View
                    style={{
                        transform: [{scale: scaleText3}]
                    }}
                >
                    <Text style={[styles.currentLanguage]}>{currentLanguage}</Text>
                </Animated.View>
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
