import React from 'react';
import * as MapUtils from '../../utils/MapUtils';
import * as Api from '../../utils/api';

import {View, Text, StyleSheet} from "react-native";
import {Container, List, ListItem, Body, Button, Icon} from 'native-base';
import {CardsNumber, DeckTitle} from './styles';
import {AppHeader} from '../../components/AppHeader';

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
			if(decks){
				this.setState({decks});
			}
		});
	}


	render() {
		const decksArray = this.state.decks && Object.keys(this.state.decks).length
			? MapUtils.toArray(this.state.decks)
			: null;

		if(decksArray){
			return (
				<Container style={styles.decksView}>
					<Button block primary bordered onPress={() => this.props.navigation.navigate(
						'AddDeckView',
						{ }
					)}>
						<Icon name='add' />
						<Text>Add deck</Text>
					</Button>

					<List>
						{decksArray.map(deck => (
							<ListItem key={deck.key} button={true} onPress={() => this.props.navigation.navigate(
								'DeckView',
								{ key: deck.key, title:deck.title, cardsNumber: deck.cardsNumber }
							)} >
								<Body>
								<DeckTitle>{deck.title}</DeckTitle>
								<CardsNumber>{`${deck.cardsNumber} cards`}</CardsNumber>
								</Body>
							</ListItem>
						))}
					</List>
				</Container>
			);
		}
		return <View></View>;
	}
}

export const styles = StyleSheet.create({
	decksView: {
		flex: 1,
		margin: 16,
	},
});