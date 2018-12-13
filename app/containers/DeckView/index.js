import React from 'react';
import {Button} from 'native-base';
import {
    DeckTitle,
    CardsNumber,
    StartQuizText,
    AddCardText,
    DeckContainer,
    DeckTitleContainer,
    DeckActionsContainer, DeckActionsRow, ScoreDescription, ScoreText, DeckScoreContainer
} from './styles';
import {Animated, View,} from 'react-native';
import * as Api from '../../utils/Api';

export default class DeckView extends React.Component {
    state = {
        height: new Animated.Value(0),
        opacity: new Animated.Value(0),
        cardsNumber: 0,
    };

    componentWillMount() {
        const {cardsNumber} = this.props.navigation.state.params;

        if (cardsNumber) {
            this.setState({cardsNumber});
        }
    }

    componentDidMount() {
        const {opacity, height} = this.state;

        Animated.timing(opacity, {duration: 500, toValue: 1}).start();
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
        const {key} = this.props.navigation.state.params;
        this.props.navigation.navigate(
            'QuizView',
            {deckKey: key}
        )
    };

    goToAddCardView = () => {
        const {key} = this.props.navigation.state.params;

        this.props.navigation.navigate(
            'AddCardView',
            {deckKey: key, increaseCardsNumber: this.increaseCardsNumber}
        )
    };

    render() {
        const {opacity, height, cardsNumber} = this.state;
        const {title, bestScore} = this.props.navigation.state.params;

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

                <DeckScoreContainer>
                    {!!bestScore && (
                        <View>
                            <Animated.Text style={[animationTexts, {marginTop: 20}]}>
                                <ScoreDescription>Your best score is</ScoreDescription>
                            </Animated.Text>
                            <Animated.Text style={[animationTexts, {marginTop: 20}]}>
                                <ScoreText>{bestScore}</ScoreText>
                            </Animated.Text>
                        </View>

                    )}

                    {!bestScore && (
                        <Animated.Text style={[animationTexts, {marginTop: 20}]}>
                            <ScoreDescription>You don't have any score yet</ScoreDescription>
                        </Animated.Text>
                    )}
                </DeckScoreContainer>

                <DeckActionsContainer>
                    <DeckActionsRow>
                        <Animated.View style={animationButtons}>
                            <Button rounded bordered onPress={this.goToAddCardView}>
                                <AddCardText>New card</AddCardText>
                            </Button>
                        </Animated.View>

                        {!!cardsNumber && (
                            <Animated.View style={animationButtons}>
                                <Button block primary rounded onPress={this.goToQuizView}>
                                    <StartQuizText>Start Quiz</StartQuizText>
                                </Button>
                            </Animated.View>
                        )
                        }
                    </DeckActionsRow>
                </DeckActionsContainer>
            </DeckContainer>
        )
    }
}