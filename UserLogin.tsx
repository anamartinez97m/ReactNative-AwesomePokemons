import React, {FC, ReactElement, useState} from 'react';
import {
  Image,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import styles from './Styles';
import { useNavigation } from '@react-navigation/native';

export const UserLogin: FC<{}> = ({}): ReactElement => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  const doUserLogIn = async function () {
    const usernameValue: string = username;
    const passwordValue: string = password;

    console.log(usernameValue);

//     return await Parse.User.logIn(usernameValue, passwordValue)
//       .then(async (loggedInUser: Parse.User) => {
//         // logIn returns the corresponding ParseUser object
//         Alert.alert(
//           'Success!',
//           `User ${loggedInUser.get('username')} has successfully signed in!`,
//         );
//         // To verify that this is in fact the current user, currentAsync can be used
//         const currentUser: Parse.User = await Parse.User.currentAsync();
//         console.log(loggedInUser === currentUser);
//         return true;
//       })
//       .catch((error: object) => {
//         // Error can be caused by wrong parameters or lack of Internet connection
//         Alert.alert('Error!');
//         return false;
//       });
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
              onPress={() => navigation.navigate('Welcome!')}>{'Sign in'}</Text>
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