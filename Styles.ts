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
    checkboxsContainer: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        paddingBottom: 5,
        marginHorizontal: 16
    },
    checkboxsTitle: {
        padding: 5,
        marginVertical: 8,
        fontSize: 24,
        color: 'black'
    },
    checkbox: {
        tintColor: 'pink'
    }
});

export default styles;