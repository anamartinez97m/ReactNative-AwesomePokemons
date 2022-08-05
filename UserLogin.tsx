import React, {FC, ReactElement, useState} from 'react';
import {
  Alert,
  Image,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import styles from './Styles';
import { useNavigation } from '@react-navigation/native';
import { openDatabase } from 'react-native-sqlite-storage';

const db = openDatabase({ name: 'UserDatabase.db' });

export const UserLogin: FC<{}> = ({}): ReactElement => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  const doUserLogin = async () => {
    const usernameValue: string = username;
    const passwordValue: string = password;

    if (!usernameValue) {
      Alert.alert('Please fill username');
      return;
    }

    if (!passwordValue) {
      Alert.alert('Please fill password');
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
            Alert.alert('No user found');
          }
        }
      );
    });

  };

  return (
    <View style={[styles.loginContainer]}>
      <Image
        resizeMode="contain"
        // source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}}
        source={require('./pokemon_logo.png')}
        style={[styles.logoImageStyle]}
      />
      <View style={[styles.loginTextInputContainer]}>
        <TextInput
          value={username}
          placeholder={'Username'}
          onChangeText={(text) => setUsername(text)}
          autoCapitalize={'none'}
          keyboardType={'email-address'}
        />
        <TextInput
          value={password}
          placeholder={'Password'}
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
          style={[styles.passwordTextInputContainer]}
        />
        <TouchableOpacity style={[styles.loginButton]} onPress={() => {}}>
          <View>
            <Text 
              style={[styles.loginText]}
              onPress={() => doUserLogin()}>{'Sign in'}</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View>
        <View style={[styles.loginSeparator]}>
          <Text style={[styles.loginSeparatorText]}>{'or'}</Text>
        </View>
        <View>
          <TouchableOpacity style={[styles.loginButton]} onPress={() => {}}>
            <View>
              <Text 
                style={[styles.loginText]} 
                onPress={() => navigation.navigate('Register')}>{'Create an account'}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};