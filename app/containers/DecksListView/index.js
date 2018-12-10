import React from 'react';
import * as MapUtils from '../../utils/MapUtils';
import * as Api from '../../utils/api';

import Swipeout from 'react-native-swipeout';
import {View, Text, StyleSheet} from "react-native";
import {CardsNumber, DeckTitle, NoDecksMessage} from './styles';
import {AppHeader} from '../../components/AppHeader';
import {blue, orange, pink, purple, red, white} from "../../utils/colors";
import {
	Container,
	Content,
	List,
	ListItem,
	Body,
	Button,
	Footer,
	FooterTab,
	Icon,
} from 'native-base';

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
		const {decks} = this.state;
		const newDecks = {...decks, [deck.key]: deck};

		this.setState({decks: newDecks});
	};

	deleteDeck = (deck) => {
		const { decks } = this.state;

		if(deck.key){
            Api.deleteDeck(deck.key);

            const newDecks = {...decks, [deck.key]: null};

            this.setState({decks: newDecks});
		}
    };

	goToAddDeckView = () => {
		this.props.navigation.navigate(
			'AddDeckView',
			{addDeck: this.addDeck}
		)
	};

	goToDeckDetailView = deck => () => {
		this.props.navigation.navigate(
			'DeckView',
			{key: deck.key, title: deck.title, cardsNumber: deck.cardsNumber}
		)
	};


	render() {
		const decksArray = this.state.decks && Object.keys(this.state.decks).length
			? MapUtils.toArray(this.state.decks)
			: null;

		const swipeoutBtns = [
			// editDeckButton,
			deleteDeckButton,
		];

		if (decksArray) {
			return (
				<Container style={styles.decksView}>
					<Content>
						<List>
							{decksArray.map(deck => (
								<Swipeout key={deck.key} backgroundColor={white} right={swipeoutBtns}>
									<ListItem button={true} onPress={this.goToDeckDetailView(deck)}>
										<Body>
										<DeckTitle>{deck.title}</DeckTitle>
										<CardsNumber>{`${deck.cardsNumber} cards`}</CardsNumber>
										</Body>
									</ListItem>
								</Swipeout>
							))}
						</List>
					</Content>
					<Footer>
						<AddDeckButton onPressFunction={this.goToAddDeckView} />
					</Footer>
				</Container>
			);
		}
		return <Container style={styles.decksView}>
			<Content>
				<NoDecksMessage>There are no decks to show</NoDecksMessage>
			</Content>
			<Footer>
				<AddDeckButton onPressFunction={this.goToAddDeckView} />
			</Footer>
		</Container>;
	}
}

const AddDeckButton = ({ onPressFunction }) => (
	<FooterTab style={{backgroundColor: orange}}>
		<Button full onPress={ onPressFunction }>
			<Text style={{color: white, fontSize: 18}}>ADD DECK</Text>
		</Button>
	</FooterTab>
);

const deleteDeckButton = {
	backgroundColor: red,
	text: <Icon style={{color: 'white'}} active name="trash" />,
	onPress: () => {},
};

// const editDeckButton = {
// 	backgroundColor: blue,
// 	text: <Icon color={white} active name="edit" />,
// 	onPress: () => {},
// };

export const styles = StyleSheet.create({
	decksView: {
		flex: 1,
	},
});