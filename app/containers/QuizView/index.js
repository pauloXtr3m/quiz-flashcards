import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {Container, Button, Card, CardItem, Header, DeckSwiper, Content, Right, Left, H3} from 'native-base';
import * as MapUtils from "../../utils/MapUtils";
import {blue, green, red, white} from "../../utils/colors";
import {CORRECT, INCORRECT} from './constants';


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
	};

	componentDidMount() {
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
		const {score} = this.state;
		const stateCards = this.state.cards;
		const cards = MapUtils.toArrayWithPosition(stateCards);

		return (
			<Container style={styles.cardContainer}>
				<View>
					<DeckSwiper
						ref={(c) => this._deckSwiper = c}
						dataSource={cards}
						looping={false}
						renderItem={item =>
							<Card>
								<CardItem header>
									<Text>{`${item.position} of ${cards.length}`}</Text>
								</CardItem>
								<CardItem style={styles.cardQuestion}>
									<Text style={{fontSize: 32}}>
										{item.question}
									</Text>
								</CardItem>
                                <CardItem footer bordered>
                                    <H3>Answer: </H3>
                                    <Text style={{fontSize: 18}}>
                                        {item.answer}
                                    </Text>
                                </CardItem>
							</Card>
						}
						onSwipeRight={item => {
							if (item.answer === CORRECT) {
								this.increaseScore();
							}
						}}

						onSwipeLeft={item => {
							if (item.answer === INCORRECT) {
								this.increaseScore();
							}
						}}
						renderEmpty={() => (
							<View>
								<Text>{`You scored ${score} points`}</Text>
								<View style={styles.actionsCard}>
									<Button style={{backgroundColor: red, padding: 48,}}
                                            onPress={() => {
                                                const cardsTemp = this.state.cards;
                                                this.setState({ score: 0, cards: {}});
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
						)
						}
					/>
				</View>


			</Container>)
	}
}

const styles = StyleSheet.create({
	cardContainer: {
		flex: 1,
		margin: 16,
        justifyContent: 'flex-start',
	},
	cardQuestion: {
		paddingTop: 16,
		paddingBottom: 120,
		// elevation: 3,
	},
	actionsCard: {
		flexDirection: 'row',
		justifyContent: 'space-around',

	},
});