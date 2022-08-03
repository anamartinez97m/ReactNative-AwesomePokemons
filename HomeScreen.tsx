import React, { useEffect, useState } from 'react';
import { FlatList, StatusBar, StyleSheet, Text, View } from 'react-native';
import styles from './Styles';

const [isLoading, setLoading] = useState(true);
const [data, setData] = useState([]);

const sectionData: { title: string; data: string[]; }[] = [{title: 'hola', data: []}];

// const getPokemonTypes = async () => {
//     try {
//         const response = await fetch('https://pokeapi.co/api/v2/type/');
//         const json = await response.json();
//         json.results.forEach((element: any) => {
//             sectionData.push({title: element.name, data: []});
//         });
//         // console.log('sectionData: ', sectionData);
//         setData(json ? json.results : []);
//     } catch (error) {
//         console.error(error);
//     } finally {
//         setLoading(false);
//     }
// }

// useEffect(() => {
//     getPokemonTypes();
// }, []);

// const Item: React.FunctionComponent<any> = ({ title }) => (
//     <View style={styles.item}>
//         <Text style={styles.title}>{title.toUpperCase()}</Text>
//     </View>
// );

class HomeScreen extends React.Component {
    private Item: React.FunctionComponent<any> = ({ title }) => (
        <View style={styles.item}>
            <Text style={styles.title}>{title.toUpperCase()}</Text>
        </View>
    );

    componentDidMount() {
        this.getPokemonTypes();
    }

    async getPokemonTypes() {
        try {
            const response = await fetch('https://pokeapi.co/api/v2/type/');
            const json = await response.json();
            json.results.forEach((element: any) => {
                sectionData.push({title: element.name, data: []});
            });
            // console.log('sectionData: ', sectionData);
            setData(json ? json.results : []);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    render() {
        return (
            <View style={styles.container}>
			{/* <SectionList
				sections={sectionData}
				keyExtractor={(index) => index}
				renderItem={({ item }) => <Item title={item} />}
				renderSectionHeader={({ section: { title } }) => (
					<Text style={styles.header}>{title}</Text>
				)}
			/> */}
			<FlatList
				data={data}
				keyExtractor={(item: any) => item.name}
				renderItem={({ item }) => (
					<this.Item
						title={item.name}
					/>
				)}
        	/>
	  	</View>
        );
    }
}

export default HomeScreen;
  