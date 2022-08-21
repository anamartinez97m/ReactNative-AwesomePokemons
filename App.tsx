/**
 * author: Ana Martínez Montañez
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import i18n from './i18n/i18n';
import { openDatabase } from 'react-native-sqlite-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigator } from './StackNavigator';
import { Text } from 'react-native';

const db = openDatabase({ name: 'UserDatabase.db' });

export const App = () => {

	const [languageFromCache, setLanguageFromCache] = useState('');

	useEffect(() => {
		AsyncStorage.getItem('language').then((value) => {
			i18n.locale = value;
			setLanguageFromCache(value? value : 'es');
		});
		
		db.transaction((txn: any) => {
			txn.executeSql(
				"SELECT name FROM sqlite_master WHERE type='table' AND name='table_user'",
				[],
				(tx: any, res: any) => {
					if (res.rows.length == 0) {
						txn.executeSql('DROP TABLE IF EXISTS table_user', []);
						txn.executeSql(
						'CREATE TABLE IF NOT EXISTS table_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, username VARCHAR(20), password VARCHAR(255))',
						[]
						);
					}
				}
		  	);
		});
	});

	return (
		<NavigationContainer>
			<StackNavigator></StackNavigator>
		</NavigationContainer>
	);
};

export default App;