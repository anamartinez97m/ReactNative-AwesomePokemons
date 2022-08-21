import React, {useState, useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from './i18n/i18n';

const Context = React.createContext(undefined);

export const Provider = ({children}: any) => {
    const [language, setLanguage] = useState(i18n.locale)

    useEffect(()=> {
        AsyncStorage.getItem('storedLanguage')
        .then(data => {
            if (data !== null) {
                setLanguage(data);
            }
        }).catch((error) => 
            console.log(error)
        );
    }, [])

    const userChangeLanguage = async (language: any) => {
        setLanguage(language);
        await AsyncStorage.setItem('storedLanguage', language);
    }

    return (
        <Context.Provider value={{data: language, userChangeLanguage}}>
            {children}
        </Context.Provider>
    );
}

export default Context