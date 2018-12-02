import React from 'react';
import {Button, Container} from 'native-base';
import {DeckTitle, CardsNumber, StartQuizText, AddCardText} from './styles';
import {StyleSheet, Animated} from 'react-native';

export default class DeckView extends React.Component {
	state = {
		height: new Animated.Value(0),
		width: new Animated.Value(0),
		opacity: new Animated.Value(0),
	};

	componentDidMount() {
		const { opacity, width, height} = this.state;

		Animated.timing(opacity, {duration: 500, toValue:1}).start();

		Animated.spring(width, {toValue: 200, speed: 7}).start();
		Animated.spring(height, {toValue: 80, speed: 7}).start();
	}

	render() {
		const { opacity, height, width } = this.state;
		const {title, cardsNumber} = this.props.navigation.state.params;

		const animationTexts = {opacity};
		const animationButtons = {opacity, height, width};

		return (
			<Container style={styles.deck}>
				<Animated.Text style={animationTexts}>
					<DeckTitle>{title}</DeckTitle>
				</Animated.Text>
				<Animated.Text style={animationTexts}>
					<CardsNumber>{`${cardsNumber} cards`}</CardsNumber>
				</Animated.Text>
				<Container style={styles.actionsDeck}>
					<Animated.View style={animationButtons}>
						<Button primary style={styles.actionButton}>
							<StartQuizText>Start a Quiz</StartQuizText>
						</Button>
					</Animated.View>
					<Animated.View style={animationButtons}>
						<Button bordered primary style={styles.actionButton}>
							<Animated.Text><AddCardText>New Question</AddCardText></Animated.Text>
						</Button>
					</Animated.View>
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
		height: 50,
		width: 200,
	}
});