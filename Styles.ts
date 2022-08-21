import { ScreenWidth } from '@rneui/themed/dist/config';
import { StatusBar, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        paddingBottom: 5,
        marginHorizontal: 16
    },
    item: {
        backgroundColor: '#fff',
        padding: 5,
        marginVertical: 8,
		marginRight: 4
    },
	header: {
		fontSize: 24,
		marginVertical: 8
	},
    title: {
        fontSize: 18,
        color: 'black'
    },
    loginContainer: {
        paddingTop: StatusBar.currentHeight,
    },
    logoImageStyle: {
        width: 200,
        height: 200,
        alignSelf: "center",
    },
    loginTextInputContainer: {
        marginTop: 12,
        alignItems: "center",
        justifyContent: "center",
    },
    passwordTextInputContainer: {
        marginTop: 16,
    },
    loginButton: {
        height: 40,
        width: ScreenWidth * 0.9,
        backgroundColor: "purple",
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        marginTop: 32,
        elevation: 5,
        shadowRadius: 8,
        shadowOpacity: 0.3,
        shadowColor: "#166080",
        shadowOffset: {
            width: 0,
            height: 3,
        },
    },
    loginText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    loginSeparator: {
        marginTop: 32,
        alignItems: "center",
        justifyContent: "center",
    },
    loginSeparatorText: {
        color: "#acabb0",
    },
    languageContainer: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        paddingBottom: 5,
        marginHorizontal: 16
    },
    languageTitle: {
        padding: 5,
        marginVertical: 8,
        fontSize: 24,
        color: 'black'
    },
    currentLanguage: {
        padding: 5,
        marginVertical: 8,
        marginTop: 32,
        fontSize: 24,
        color: 'black'
    },
    languageButton: {
        height: 40,
        width: ScreenWidth * 0.9,
        backgroundColor: "purple",
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        marginTop: 32,
        elevation: 5,
        shadowRadius: 8,
        shadowOpacity: 0.3,
        shadowColor: "#166080",
        shadowOffset: {
            width: 0,
            height: 3,
        },
    },
    languageText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default styles;