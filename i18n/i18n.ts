import AsyncStorage from '@react-native-async-storage/async-storage';
import { I18nManager, NativeModules, Platform } from 'react-native';
import RNRestart from 'react-native-restart';
import i18n from 'react-native-i18n';
import en from './locales/en';
import es from './locales/es';

i18n.fallbacks = true;
i18n.translations = {
  en,
  es,
};

export default i18n;
