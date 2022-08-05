import React, { FC, ReactElement, useState } from 'react';
import { Alert, Button, StyleSheet, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { openDatabase } from 'react-native-sqlite-storage';

export const UserRegistration = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  const db = openDatabase({ name: 'UserDatabase.db' });

  const doUserRegistration = async () => {
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
        'INSERT INTO table_user (username, password) VALUES (?,?)',
        [username, password],
        (tx: any, results: any) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'You are Registered Successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('TabNavigator'),
                },
              ],
              { cancelable: false }
            );
          } else Alert.alert('Registration Failed');
        }
      );
    });
  };

  return (
    <>
      <TextInput
        style={styles.input}
        value={username}
        placeholder={"Username"}
        onChangeText={(text) => setUsername(text)}
        autoCapitalize={"none"}
      />
      <TextInput
        style={styles.input}
        value={password}
        placeholder={"Password"}
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
      />
      <Button title={"Sign Up"} onPress={() => /*navigation.navigate('TabNavigator')*/doUserRegistration()} />
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
});
