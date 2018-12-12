import React from 'react';
import * as MapUtils from '../../utils/MapUtils';
import * as Api from '../../utils/Api';

import {StyleSheet,} from "react-native";
import {CardsNumber, DeckTitle, NoDecksContainer, NoDecksMessage} from './styles';
import {AppHeader} from '../../components/AppHeader';
import {
    Container,
    Content,
    List,
    ListItem,
    Body,
    Footer,
} from 'native-base';
import {AddDeckButton} from './AddDeckButton';

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

    shouldComponentUpdate() {
        let shouldComponentUpdate = true;
        try {
            const {scoreUpdated} = this.props.navigation.state.params;

            shouldComponentUpdate = !!scoreUpdated;
        } catch (e) {
            shouldComponentUpdate = true;
        }

        return shouldComponentUpdate;
    }

    componentWillUpdate() {
        Api.fetchDecks().then(decks => {
            if (decks) {
                this.setState({decks});
            }
        });
    }

    increaseCardsNumber = (deckKey) => {
        const {decks} = this.state;

        decks[deckKey].cardsNumber = decks[deckKey].cardsNumber + 1;

        this.setState({decks});
    };

    addDeck = (deck) => {
        const {decks} = this.state;
        const newDecks = {...decks, [deck.key]: deck};

        this.setState({decks: newDecks});
    };

    goToAddDeckView = () => {
        this.props.navigation.navigate(
            'AddDeckView',
            {addDeck: this.addDeck}
        )
    };

    goToDeckDetailView = deck => () => {
        const {increaseCardsNumber} = this;

        this.props.navigation.navigate(
            'DeckView',
            {...deck, increaseCardsNumber}
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
                                    <ListItem key={deck.key} button={true} onPress={this.goToDeckDetailView(deck)}>
                                        <Body>
                                        <DeckTitle>{deck.title}</DeckTitle>
                                        <CardsNumber>{`${deck.cardsNumber} cards`}</CardsNumber>
                                        </Body>
                                    </ListItem>
                            ))}
                        </List>
                    </Content>
                    <Footer>
                        <AddDeckButton onPressFunction={this.goToAddDeckView}/>
                    </Footer>
                </Container>
            );
        }
        return <Container style={{flex: 1}}>
            <NoDecksContainer>
                <NoDecksMessage>There are no decks to show</NoDecksMessage>
            </NoDecksContainer>
            <Footer>
                <AddDeckButton onPressFunction={this.goToAddDeckView}/>
            </Footer>
        </Container>;
    }
}

export const styles = StyleSheet.create({
    decksView: {
        flex: 1,
    },
});