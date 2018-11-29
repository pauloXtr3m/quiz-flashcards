import React from 'react';
import { Text, StyleSheet } from "react-native";
import { Container, List, ListItem } from 'native-base';
import * as MapUtils from '../utils/MapUtils';

class DecksListView extends React.Component {
    state = {
        decks: {
            'fasqwerqwe': {
                key: 'fasqwerqwe',
                title: 'Math challenges'
            },
            '1234asfaer': {
                key: '1234asfaer',
                title: 'Physics questions'
            },
            'fer1312qwe': {
                key: 'fer1312qwe',
                title: 'English sentences'
            },
        }
    };

    render(){
        const decksArray = MapUtils.toArray(this.state.decks);

        return (
            <Container style={styles.decksView}>
                <List>
                    {decksArray.map(deck => (
                        <ListItem key={deck.key}>
                            <Text>{deck.title}</Text>
                        </ListItem>
                    ))}
                </List>
            </Container>
        );
    }

}

const styles = StyleSheet.create({
    decksView: {
        flex: 1,
    },
});

export default DecksListView;