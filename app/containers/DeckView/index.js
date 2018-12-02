import React from 'react';
import { Button, Container } from 'native-base';
import { DeckTitle, CardsNumber, StartQuizText, AddCardText } from './styles';
import {StyleSheet} from 'react-native';

class DeckView extends React.Component {
	render() {
		const { title, cardsNumber } = this.props.navigation.state.params;
		return (
				<Container style={styles.deck}>
					<DeckTitle>{title}</DeckTitle>
					<CardsNumber>{`${cardsNumber} cards`}</CardsNumber>
					<Container style={styles.actionsDeck}>
						<Button primary style={styles.actionButton}>
							<StartQuizText>Start a Quiz</StartQuizText>
						</Button>
						<Button bordered primary style={styles.actionButton}>
							<AddCardText>New Question</AddCardText>
						</Button>
					</Container>
				</Container>
		)
	}
}

export const styles = StyleSheet.create({
	deck: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 48,
	},
	actionsDeck: {
		marginTop: 24,
		justifyContent: 'center',
	},
	actionButton: {
		marginTop: 24,
		padding: 48,
	}
});

export default DeckView;