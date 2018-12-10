import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {Container, Button, DeckSwiper} from 'native-base';
import * as MapUtils from "../../utils/MapUtils";
import {green, red, white} from "../../utils/colors";
import {CORRECT, INCORRECT} from './constants';
import QuizCard from '../../components/QuizCard';
import {FlipCardButton} from './FlipCardButton';


export default class QuizView extends React.Component {

	state = {
		deckKey: '',
		cards: {
			'agewrqasf': {
				key: 'agewrqasf',
				question: 'Is RTX 2080 a expensive card ?',
				answer: 'Yes, just testing the answer here',
				scored: false,
			},
			'gsdfgsdf': {
				key: 'gsdfgsdf',
				question: 'Is rdr2 the game of the year ?',
				answer: 'Yes, of course',
				scored: false,
			},
			'ggerfda': {
				key: 'ggerfda',
				question: 'Is BF5 better than rdr2 ?',
				answer: 'No, bf5 is so good, but doesnt overtake rdr2',
				scored: false,
			},
		},
		score: 0,
		cardsSwiped: 0,
		cardsEnded: false,
	};

	componentDidMount() {
		alert('Swipe right to correct, and left to incorrect');
	}

	increaseScore = () => {
		let {score} = this.state;
		score = score + 100;

		this.setState({score});
	};

	restartQuiz = () => {
		this.props.navigation.navigate(
			'QuizView',
			{}
		)
	};

	render() {
		const {score, cardsSwiped} = this.state;
		const stateCards = this.state.cards;
		const cards = MapUtils.toArrayWithPosition(stateCards);

		return (
			<Container style={styles.cardContainer}>
				<View>
					<DeckSwiper
						dataSource={cards}
						looping={false}
						renderItem={item =>
							<QuizCard {...item} numberOfCards={cards.length} ref={(card) => this._quizCard = card}/>
						}
						onSwipeRight={item => {
							this._btnFlip.swipedCard();
							this.increaseScore();
						}}

						onSwipeLeft={item => {
							this._btnFlip.swipedCard();
						}}
						renderEmpty={() => {
							return (
								<View>
									<Text>{`You scored ${score} points`}</Text>
									<View style={styles.actionsCard}>
										<Button style={{backgroundColor: red, padding: 48,}}
												onPress={() => {
													const cardsTemp = this.state.cards;
													this.setState({score: 0, cards: {}});
													this.setState({cards: cardsTemp});
												}}>
											<Text style={{color: white}}>Restart</Text>
										</Button>
										<Button style={{backgroundColor: green, padding: 48,}}
												onPress={() => this.props.navigation.goBack()}>
											<Text style={{color: white}}>Continue</Text>
										</Button>
									</View>
								</View>
							);
						}}

					/>
				</View>

				<FlipCardButton flipCard={() => {this._quizCard.flipCard()}} ref={(btn) => this._btnFlip = btn}/>
			</Container>)
	}
}

const styles = StyleSheet.create({
	cardContainer: {
		flex: 1,
		margin: 16,
		justifyContent: 'space-around',
	},
	actionsCard: {
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
});