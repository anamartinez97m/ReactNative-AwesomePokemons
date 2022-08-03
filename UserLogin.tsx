import React, {FC, ReactElement, useState} from 'react';
import {
    Alert,
    Image,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import Parse from 'parse/react-native';
import styles from './Styles';
import { useNavigation } from '@react-navigation/native';

export const UserLogin: FC<{}> = ({}): ReactElement => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

//   const doUserLogIn = async function (): Promise<boolean> {
//     // Note that these values come from state variables that we've declared before
//     const usernameValue: string = username;
//     const passwordValue: string = password;

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
//   };

  return (
    <View>
      <View>
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
        />
        <TouchableOpacity onPress={() => {}}>
          <View>
            <Text onPress={() => navigation.navigate('TabNavigator')}>{'Sign in'}</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View>
        <View>
          <View/>
          <Text>{'or'}</Text>
          <View/>
        </View>
        <View>
          <TouchableOpacity onPress={() => {}}>
            <View>
              <Text onPress={() => navigation.navigate('Register')}>{'Sign up'}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};