import React from 'react';
import {Button } from 'native-base';
import {
	DeckTitle,
	CardsNumber,
	StartQuizText,
	AddCardText,
	DeckContainer,
	DeckTitleContainer,
	DeckActionsContainer, DeckActionsRow
} from './styles';
import { Animated } from 'react-native';
import * as Api from '../../utils/api';

export default class DeckView extends React.Component {
	state = {
		height: new Animated.Value(0),
		// width: new Animated.Value(0),
		opacity: new Animated.Value(0),
		cardsNumber: 0,
	};

	componentWillMount() {
		const {cardsNumber} = this.props.navigation.state.params;
		this.setState({cardsNumber});
	}

	componentDidMount() {
		const {opacity, height} = this.state;

		Animated.timing(opacity, {duration: 500, toValue: 1}).start();

		// Animated.spring(width, {toValue: widthAfter, speed: 6}).start();
		Animated.spring(height, {toValue: 40, speed: 3}).start();
	}

	increaseCardsNumber = () => {
		const {key, increaseCardsNumber} = this.props.navigation.state.params;
		const {cardsNumber} = this.state;

		Api.increaseCardsNumber(key);

		increaseCardsNumber(key);

		this.setState({cardsNumber: cardsNumber + 1});
	};

	goToQuizView = () => {
		const {deckKey} = this.props.navigation.state.params;
		this.props.navigation.navigate(
			'QuizView',
			{deckKey}
		)
	};

	goToAddCardView = () => {
		const {deckKey} = this.props.navigation.state.params;

		this.props.navigation.navigate(
			'AddCardView',
			{deckKey, increaseCardsNumber: this.increaseCardsNumber}
		)
	};

	render() {
		const {opacity, height, cardsNumber} = this.state;
		const {title} = this.props.navigation.state.params;

		const animationTexts = {opacity};
		const animationButtons = {opacity, height};

		return (
			<DeckContainer>
				<DeckTitleContainer>
					<Animated.Text style={animationTexts}>
						<DeckTitle>{title}</DeckTitle>
					</Animated.Text>
					<Animated.Text style={animationTexts}>
						<CardsNumber>{`${cardsNumber} cards`}</CardsNumber>
					</Animated.Text>
				</DeckTitleContainer>
				<DeckActionsContainer>
					<DeckActionsRow>
						<Animated.View style={animationButtons}>
							<Button rounded bordered onPress={this.goToAddCardView}>
								<AddCardText>New card</AddCardText>
							</Button>
						</Animated.View>
						<Animated.View style={animationButtons}>
							<Button block primary rounded onPress={this.goToQuizView}>
								<StartQuizText>Start Quiz</StartQuizText>
							</Button>
						</Animated.View>
					</DeckActionsRow>
				</DeckActionsContainer>
			</DeckContainer>
		)
	}
}