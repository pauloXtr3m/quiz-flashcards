import React from 'react';

import {Text, View, Alert, Animated} from 'react-native';
import {DeckSwiper, Toast} from 'native-base';
import {FlipCardButton} from './FlipCardButton';
import {CardsContainer} from './styles';
import QuizCard from '../../components/QuizCard';

import * as ArrayUtils from "../../utils/ArrayUtils";
import * as Api from "../../utils/Api";

export default class QuizView extends React.Component {

    state = {
        cards: [],
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
        this.totalSwiped = 0;

        if (!stateCards.length) {
            return <View><Text>Loading...</Text></View>
        }

        return (
            <CardsContainer>
                <View>
                    <DeckSwiper
                        ref={(r) => this._deckSwiper = r}
                        dataSource={cards}
                        renderItem={item =>
                            <QuizCard {...item} numberOfCards={cards.length} ref={(card) => this._quizCard = card}/>
                        }
                        onSwipeRight={() => {
                            this.increaseScore();
                            this.totalSwiped = this.totalSwiped + 1;
                            if (this.totalSwiped === this.totalQuestions) {
                                this.showScoreView();
                            } else {
                                this._btnFlip.swipedCard();
                            }
                        }}
                        onSwipeLeft={() => {
                            this.totalSwiped = this.totalSwiped + 1;
                            if (this.totalSwiped === this.totalQuestions) {
                                this.showScoreView();
                            } else {
                                this._btnFlip.swipedCard();
                            }
                        }}
                    />
                </View>

                <FlipCardButton flipCard={() => {this._quizCard.flipCard()}}
                                swipeRight={() => {
                                    this._deckSwiper._root.swipeRight();
                                    this._deckSwiper.props.onSwipeRight();
                                }}
                                swipeLeft={() => {
                                    this._deckSwiper._root.swipeLeft();
                                    this._deckSwiper.props.onSwipeLeft();
                                }}
                                ref={(btn) => this._btnFlip = btn}/>
            </CardsContainer>
        )
    }
}