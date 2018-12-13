import {Animated} from 'react-native';
import * as Api from '../../utils/Api';
import {Button} from "native-base";
import React from 'react';
import * as NotificationUtils from "../../utils/Notification";
import { StackActions, NavigationActions } from 'react-navigation';
import {
	ContinueText,
	MainScoreContainer,
	RestartQuizText,
	ScoreActionsContainer,
	ScoreActionsRow,
	ScoreText,
	ScoreContainer, ScoreNumber, IncorrectQuestions, CorrectQuestions, TotalQuestions, DetailScoreContainer
} from './styles';

export default class ScoreView extends React.Component {
	state = {
		height: new Animated.Value(0),
		opacity: new Animated.Value(0),
		cardsNumber: 0,
	};

	componentWillMount() {
		const {cardsNumber} = this.props.navigation.state.params;
		this.setState({cardsNumber});
	}

	componentDidMount() {
		NotificationUtils.clearLocalNotification()
			.then(NotificationUtils.setLocalNotification);

		const {opacity, height} = this.state;
		const {deckKey, score} = this.props.navigation.state.params;

		Api.updateBestScore({key: deckKey, score});

		Animated.timing(opacity, {duration: 500, toValue: 1}).start();
		Animated.spring(height, {toValue: 40, speed: 3}).start();
	}

	goToQuizView = () => {
		const {deckKey} = this.props.navigation.state.params;
		this.props.navigation.navigate(
			'QuizView',
			{deckKey}
		)
	};

	goToHomeView = () => {
		this.props.navigation.dispatch(StackActions.popToTop());
	};

	render() {
		const {opacity, height} = this.state;
		const {score, correctQuestions, totalQuestions} = this.props.navigation.state.params;
		const animationTexts = {opacity};
		const animationButtons = {opacity, height};

		return (
			<ScoreContainer>
				<MainScoreContainer>
					<Animated.Text style={animationTexts}>
						<ScoreText>{`You scored `}</ScoreText>
					</Animated.Text>
					<Animated.Text style={animationTexts}>
						<ScoreNumber>{score}</ScoreNumber>
					</Animated.Text>
				</MainScoreContainer>

				<DetailScoreContainer>
					<Animated.Text style={animationTexts}>
						<TotalQuestions>{`${totalQuestions} questions `}</TotalQuestions>
					</Animated.Text>
					<Animated.Text style={animationTexts}>
						<CorrectQuestions>{`${correctQuestions} correct questions`}</CorrectQuestions>
					</Animated.Text>
					<Animated.Text style={animationTexts}>
						<IncorrectQuestions>{`${totalQuestions - correctQuestions} incorrect questions`}</IncorrectQuestions>
					</Animated.Text>
				</DetailScoreContainer>

				<ScoreActionsContainer>
					<ScoreActionsRow>
						<Animated.View style={animationButtons}>
							<Button rounded bordered onPress={() => this.props.navigation.goBack()}>
								<RestartQuizText>Restart quiz</RestartQuizText>
							</Button>
						</Animated.View>
						<Animated.View style={animationButtons}>
							<Button block primary rounded onPress={() => this.goToHomeView()}>
								<ContinueText>Continue</ContinueText>
							</Button>
						</Animated.View>
					</ScoreActionsRow>
				</ScoreActionsContainer>
			</ScoreContainer>
		)
	}
}