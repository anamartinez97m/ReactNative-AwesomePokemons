import React, { FC, ReactElement, useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { openDatabase } from 'react-native-sqlite-storage';
import styles from './Styles';
import I18n from './i18n/i18n';

const db = openDatabase({ name: 'UserDatabase.db' });

export const UserRegistration = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  const doUserRegistration = async () => {
    const usernameValue: string = username;
    const passwordValue: string = password;

    if (!usernameValue) {
      Alert.alert(I18n.t('fill_username'));
      return;
    }

    if (!passwordValue) {
      Alert.alert(I18n.t('fill_password'));
      return;
    }

    db.transaction((tx: any) => {
      tx.executeSql(
        'INSERT INTO table_user (username, password) VALUES (?,?)',
        [username, password],
        (tx: any, results: any) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              I18n.t('success'),
              I18n.t('registration_correct'),
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('TabNavigator'),
                },
              ],
              { cancelable: false }
            );
          } else Alert.alert(I18n.t('registration_failed'));
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
            placeholder={I18n.t('username')}
            onChangeText={(text) => setUsername(text)}
            autoCapitalize={'none'}
            keyboardType={'email-address'}
          />
          <TextInput
            value={password}
            placeholder={I18n.t('password')}
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
              <Text style={[styles.loginText]}>{I18n.t('sign_up')}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};
