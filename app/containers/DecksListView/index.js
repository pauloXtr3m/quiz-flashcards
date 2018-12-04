import React from 'react';
import * as MapUtils from '../../utils/MapUtils';
import * as Api from '../../utils/api';

import {View, Text, StyleSheet} from "react-native";
import {Container, Content, List, ListItem, Body, Button, Icon, Footer, FooterTab} from 'native-base';
import {CardsNumber, DeckTitle, NoDecksMessage} from './styles';
import {AppHeader} from '../../components/AppHeader';
import {pink, purple, white} from "../../utils/colors";

export default class DeckListView extends React.Component {
    state = {
        isFabActive: true,
        decks: {}
    };

    static navigationOptions = {
        headerTitle: <AppHeader title='Decks'/>,
    };

    componentDidMount() {
        Api.fetchDecks().then(decks => {
            if (decks) {
                this.setState({decks});
            }
        });
    }

    addDeck = (deck) => {
        const { decks } = this.state;
        const newDecks = {...decks, [deck.key]: deck};

        this.setState({decks: newDecks});
    };

    goToViewAddDeck = () => {
        this.props.navigation.navigate(
            'AddDeckView',
            {addDeck: this.addDeck}
        )
    };

    goToDeckView = deck => () => {
        this.props.navigation.navigate(
            'DeckView',
            {key: deck.key, title: deck.title, cardsNumber: deck.cardsNumber}
        )
    };


    render() {
        const decksArray = this.state.decks && Object.keys(this.state.decks).length
            ? MapUtils.toArray(this.state.decks)
            : null;

        if (decksArray) {
            return (
                <Container style={styles.decksView}>
                    <Content>
                        <List>
                            {decksArray.map(deck => (
                                <ListItem key={deck.key} button={true} onPress={this.goToDeckView(deck)}>
                                    <Body>
                                    <DeckTitle>{deck.title}</DeckTitle>
                                    <CardsNumber>{`${deck.cardsNumber} cards`}</CardsNumber>
                                    </Body>
                                </ListItem>
                            ))}
                        </List>
                    </Content>
                    <Footer>
                        <FooterTab style={{backgroundColor: pink, elevation: 6}}>
                            <Button full onPress={this.goToViewAddDeck}>
                                <Text style={{color: white, fontSize: 18}}>ADD DECK</Text>
                            </Button>
                        </FooterTab>
                    </Footer>
                </Container>
            );
        }
        return <Container style={styles.decksView}>
            <Content>
                <NoDecksMessage>There are no decks to show</NoDecksMessage>
            </Content>
            <Footer>
                <FooterTab>
                    <Button full primary onPress={this.goToViewAddDeck}>
                        <Text style={{color: white, fontSize: 16}}>ADD DECK</Text>
                    </Button>
                </FooterTab>
            </Footer>
        </Container>;
    }
}

export const styles = StyleSheet.create({
    decksView: {
        flex: 1,
        // margin: 16,
    },
});