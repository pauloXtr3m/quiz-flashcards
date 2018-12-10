import React from 'react';
import styled from 'styled-components/native'
import {View, Text, StyleSheet, Animated} from 'react-native';
import {Card, CardItem} from 'native-base'
import {white} from '../utils/colors';


const Question = styled.Text`
	font-size: 24
`;

const Answer = styled.Text`
	font-size: 24
`;

class QuizCard extends React.Component {

	componentWillMount() {
		this.flipped = false;
		this.animatedValue = new Animated.Value(0);
		this.value = 0;
		this.animatedValue.addListener(({value}) => {
			this.value = value;
		});
		this.frontInterpolate = this.animatedValue.interpolate({
			inputRange: [0, 180],
			outputRange: ['0deg', '180deg'],
		});
		this.backInterpolate = this.animatedValue.interpolate({
			inputRange: [0, 180],
			outputRange: ['180deg', '360deg']
		});
		this.frontOpacity = this.animatedValue.interpolate({
			inputRange: [89, 90],
			outputRange: [1, 0]
		});
		this.backOpacity = this.animatedValue.interpolate({
			inputRange: [89, 90],
			outputRange: [0, 1]
		});
	}

	flipCard() {
		if (this.value >= 90) {
			Animated.spring(this.animatedValue, {
				toValue: 0,
			}).start();
			this.flipped = false;

		} else {
			Animated.spring(this.animatedValue, {
				toValue: 180,
			}).start();
			this.flipped = true;
		}

	}

	render() {
		const {question, position, answer, numberOfCards} = this.props;

		const frontAnimatedStyle = {
			transform: [
				{rotateY: this.frontInterpolate}
			]
		};
		const backAnimatedStyle = {
			transform: [
				{rotateY: this.backInterpolate}
			]
		};

		return (
			<View style={styles.container}>
				<View>
					<Animated.View style={[styles.flipCard, frontAnimatedStyle, {opacity: this.frontOpacity}]}>
						<Card>
							<CardItem header>
								<Text>Question</Text>
							</CardItem>
							<CardItem style={styles.cardBody}>
								<Question>
									{question}
								</Question>
							</CardItem>
							<CardItem footer>
								<Text>{`${position} of ${numberOfCards}`}</Text>
							</CardItem>
						</Card>
					</Animated.View>

					<Animated.View
						style={[styles.flipCard, styles.flipCardBack, backAnimatedStyle, {opacity: this.backOpacity}]}>
						<Card>
							<CardItem header>
								<Text>Answer</Text>
							</CardItem>
							<CardItem style={styles.cardBody}>
								<Answer>
									{answer}
								</Answer>
							</CardItem>
							<CardItem footer>
								<Text>{`${position} of ${numberOfCards}`}</Text>
							</CardItem>
						</Card>
					</Animated.View>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	cardBody: {
		paddingTop: 16,
		paddingBottom: 120,
		// elevation: 3,
	},
	flipCard: {
		alignItems: 'center',
		justifyContent: 'center',
		backfaceVisibility: 'hidden',
	},
	flipCardBack: {
		position: "absolute",
		top: 0,
	},
	flipText: {
		width: 90,
		fontSize: 20,
		color: 'white',
		fontWeight: 'bold',
	}
});

export default QuizCard;