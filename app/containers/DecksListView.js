import React from 'react';
import * as MapUtils from '../utils/MapUtils';
import styled from 'styled-components/native';

import {StyleSheet} from "react-native";
import {Container, List, ListItem, Body} from 'native-base';

class DecksListView extends React.Component {
	state = {
		decks: {
			'fasqwerqwe': {
				key: 'fasqwerqwe',
				title: 'Math challenges',
				cardsNumber: 4,
			},
			'1234asfaer': {
				key: '1234asfaer',
				title: 'Physics questions',
				cardsNumber: 2,
			},
			'fer1312qwe': {
				key: 'fer1312qwe',
				title: 'English sentences',
				cardsNumber: 5,
			},
		}
	};

	render() {
		const decksArray = MapUtils.toArray(this.state.decks);

		return (
			<Container style={styles.decksView}>
				<List>
					{decksArray.map(deck => (
						<ListItem key={deck.key}>
							<Body>
							<DeckTitle>{deck.title}</DeckTitle>
							<CardsNumber>{` ${deck.cardsNumber}	cards`}</CardsNumber>
							</Body>
						</ListItem>
					))}
				</List>
			</Container>
		);
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