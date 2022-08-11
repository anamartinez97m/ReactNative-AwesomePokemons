import React, { Component, useEffect, useState } from 'react';
import { FlatList, SectionList, Text, TouchableOpacity, View } from 'react-native';
import styles from './Styles';

export const Home = () => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [selected, setSelected] = useState(null);
    const sectionData: any = [];

    const getPokemonTypes = async () => {
        try {
            const response = await fetch('https://pokeapi.co/api/v2/type/');
            const json = await response.json();
            json.results.forEach((element: any) => {
                const regex = new RegExp('\\/\\d+');
                const elementId = (element.url.match(regex)).toString().slice(1);
                    sectionData.push({
                    id: elementId,
                    title: element.name, 
                    data: ['hola','hey','hello','hi','holiwi','saludos','good morning','good night','bye']
                });
                });
            setData(json && json.results ? sectionData : []);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }
    
    useEffect(() => {
        getPokemonTypes();
    }, []);

    const Item: React.FunctionComponent<any> = ({ item, onPress, backgroundColor, textColor }) => (
        <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
            <Text style={[styles.title, textColor]}>{item}</Text>
        </TouchableOpacity>
    );

    const HeaderItem: React.FunctionComponent<any> = ({ section, onPress, backgroundColor, textColor }) => (
        <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
            <Text style={[styles.header, textColor]}>{section.title.toUpperCase()}</Text>
        </TouchableOpacity>
    );

    const renderItem = ({ item }: any) => {
        const backgroundColor = item === selected ? "#6e3b6e" : "#fff";
        const color = item === selected ? 'white' : 'black';
    
        return (
                <Item
                item={item}
                onPress={() => setSelected(item)}
                backgroundColor={{ backgroundColor }}
                textColor={{ color }}
                />
        );
    };
        
    const renderHeader = ({ section }: any) => {
        const backgroundColor = section.id === selected ? "#6e3b6e" : "#fff";
        const color = section.id === selected ? 'white' : 'black';
    
        return (
            <>
                <HeaderItem
                    section={section}
                    onPress={() => setSelected(section.id)}
                    backgroundColor={{ backgroundColor }}
                    textColor={{ color }}
                />
                <FlatList
                    horizontal
                    data={section.data}
                    renderItem={renderItem}
                    showsHorizontalScrollIndicator={false}
                />
            </>
        );
    };
    
    return (
        <View style={styles.container}>
            <SectionList
                sections={data}
                keyExtractor={(index) => index}
                renderSectionHeader={renderHeader}
                renderItem={({ item, section }) => {
                    return null;
                }}
            />
        </View>
    );
}

