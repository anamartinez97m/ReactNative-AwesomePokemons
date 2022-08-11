import React, {FC, ReactElement, useState} from 'react';
import {
  Alert,
  Animated,
  Image,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { openDatabase } from 'react-native-sqlite-storage';
import styles from './Styles';
import i18n from './i18n/i18n';

const db = openDatabase({ name: 'UserDatabase.db' });

export const UserLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  const doUserLogin = async () => {
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
        'SELECT * FROM table_user where username = ? and password = ?',
        [username, password],
        (tx: any, results: any) => {
          var len = results.rows.length;
          if (len > 0) {
            navigation.navigate('TabNavigator');
          } else {
            Alert.alert(i18n.t('no_user'));
          }
        }
      );
    });

  };

  return (
    <View style={[styles.loginContainer]}>
      <Image
        resizeMode="contain"
        // todo: for pokemon images from api
        // source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}}
        source={require('./pokemon_logo.png')}
        style={[styles.logoImageStyle]}
      />
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
        <TouchableOpacity 
        style={[styles.loginButton]} 
        onPress={() => doUserLogin()}>
          <View>
            <Text style={[styles.loginText]}>{i18n.t('sign_in')}</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View>
        <View style={[styles.loginSeparator]}>
          <Text style={[styles.loginSeparatorText]}>{i18n.t('common_or')}</Text>
        </View>
        <View>
          <TouchableOpacity 
          style={[styles.loginButton]} 
          onPress={() => navigation.navigate('Register')}>
            <View>
              <Text style={[styles.loginText]}>{i18n.t('create_account')}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};