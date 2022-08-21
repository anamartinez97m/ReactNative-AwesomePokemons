import React, { useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { openDatabase } from 'react-native-sqlite-storage';
import styles from './Styles';
import i18n from './i18n/i18n';
import { NativeModules } from 'react-native';

const db = openDatabase({ name: 'UserDatabase.db' });

export const UserRegistration = () => {

  const { PokemonsToast } = NativeModules;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  const doUserRegistration = async () => {
    const usernameValue: string = username;
    const passwordValue: string = password;

    if (!usernameValue) {
      Alert.alert(i18n.t('fill_username'));
      return;
    }

    if (!passwordValue) {
      Alert.alert(i18n.t('fill_password'));
      return;
    }

    db.transaction((tx: any) => {
      tx.executeSql(
        'INSERT INTO table_user (username, password) VALUES (?,?)',
        [username, password],
        (tx: any, results: any) => {
          if (results.rowsAffected > 0) {
            Alert.alert(
              i18n.t('success'),
              i18n.t('registration_correct'),
              [
                {
                  text: 'Ok',
                  onPress: () => {
                    PokemonsToast.show(i18n.t('welcomeToast', {username: usernameValue}), PokemonsToast.SHORT);
                    navigation.navigate('TabNavigator');
                  },
                },
              ],
              { cancelable: false }
            );
          } else Alert.alert(i18n.t('registration_failed'));
        }
      );
    });
  };

  return (
    <>
      <View style={[styles.loginContainer]}>
        <View style={[styles.loginTextInputContainer]}>
          <TextInput
            value={username}
            placeholder={i18n.t('username')}
            onChangeText={(text) => setUsername(text)}
            autoCapitalize={'none'}
            keyboardType={'email-address'}
          />
          <TextInput
            value={password}
            placeholder={i18n.t('password')}
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
            style={[styles.passwordTextInputContainer]}
          />
        </View>
        <View>
          <TouchableOpacity 
          style={[styles.loginButton]} 
          onPress={() => doUserRegistration()}>
            <View>
              <Text style={[styles.loginText]}>{i18n.t('sign_up')}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};
