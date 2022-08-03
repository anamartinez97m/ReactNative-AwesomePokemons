import React, { FC, ReactElement, useState } from "react";
import { Button, StyleSheet, TextInput } from "react-native";
import Parse from "parse/react-native";
import { useNavigation } from '@react-navigation/native';

export const UserRegistration = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

//   const doUserRegistration = async function (): Promise<boolean> {
//     // Note that these values come from state variables that we've declared before
//     const usernameValue: string = username;
//     const passwordValue: string = password;
//     // Since the signUp method returns a Promise, we need to call it using await
//     return await Parse.User.signUp(usernameValue, passwordValue)
//       .then((createdUser: Parse.User) => {
//         // Parse.User.signUp returns the already created ParseUser object if successful
//         Alert.alert(
//           'Success!',
//           `User ${createdUser.getUsername()} was successfully created!`,
//         );
//         return true;
//       })
//       .catch((error: object) => {
//         // signUp can fail if any parameter is blank or failed an uniqueness check on the server
//         Alert.alert('Error!', error.message);
//         return false;
//       });
//   };

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
      <Button title={"Sign Up"} onPress={() => navigation.navigate('TabNavigator')} />
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