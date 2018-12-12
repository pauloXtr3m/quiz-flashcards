import React from 'react';

import {Text, View, Alert} from 'react-native';
import { DeckSwiper } from 'native-base';
import {FlipCardButton} from './FlipCardButton';
import {CardsContainer} from './styles';
import QuizCard from '../../components/QuizCard';

import * as ArrayUtils from "../../utils/ArrayUtils";
import * as Api from "../../utils/Api";

export default class QuizView extends React.Component {

    state = {
        cards: [],
        cardsSwiped: 0,
        cardsEnded: false,
    };

    componentDidMount() {
        const {deckKey} = this.props.navigation.state.params;

        this.score = 0;
        this.correctQuestions = 0;

        Api.fetchCards(deckKey).then(cards => {
            if (cards) {
                this.setState({cards});
            }
        });

        Alert.alert('Tutorial', 'Swipe right to correct, and left to incorrect');
    }

    increaseScore() {
        this.score = this.score + 100;
        this.correctQuestions = this.correctQuestions + 1;
    };

    showScoreView() {
		const {deckKey} = this.props.navigation.state.params;
		const {score, correctQuestions, totalQuestions} = this;

		this.props.navigation.navigate(
			'ScoreView',
			{deckKey, score, correctQuestions, totalQuestions},
		)
	};

    render() {
        const stateCards = this.state.cards;
        const cards = stateCards.length ? ArrayUtils.addPosition(stateCards) : [];
        this.totalQuestions = cards.length;

        const hasCardsEnded = (position) => cards.length === position;


        if (!stateCards.length) {
            return <View><Text>Loading...</Text></View>
        }

        return (
            <CardsContainer>
                <View>
                    <DeckSwiper
                        dataSource={cards}
                        renderItem={item =>
                            <QuizCard {...item} numberOfCards={cards.length} ref={(card) => this._quizCard = card}/>
                        }
                        onSwipeRight={(item) => {
                            this.increaseScore();

							if(hasCardsEnded(item.position)){
								this.showScoreView();
							} else {
								this._btnFlip.swipedCard();
							}
                        }}
                        onSwipeLeft={(item) => {
                        	if(hasCardsEnded(item.position)){
								this.showScoreView()
							} else {
								this._btnFlip.swipedCard();
							}
                        }}
                    />
                </View>

                <FlipCardButton flipCard={() => {
                    this._quizCard.flipCard()
                }} ref={(btn) => this._btnFlip = btn}/>
            </CardsContainer>
        )
    }
}