import React from 'react';
import * as MapUtils from '../utils/MapUtils';
import styled from 'styled-components/native';

import {StyleSheet, View} from "react-native";
import {Container, List, ListItem, Body} from 'native-base';
import * as Api from '../utils/api';

class DecksListView extends React.Component {
	state = {
		decks: {}
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
					<List>
						{decksArray.map(deck => (
							<ListItem key={deck.key}>
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

const DeckTitle = styled.Text`
	font-size: 18;
`;

const CardsNumber = styled.Text`
	font-size: 12;
	color: grey;
`;

const styles = StyleSheet.create({
	decksView: {
		flex: 1,
	},
});

export default DecksListView;