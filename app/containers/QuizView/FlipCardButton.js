import React from 'react';
import {Button} from 'native-base';
import {View, Text} from 'react-native';
import {blue, green, red, white} from '../../utils/colors';

export class FlipCardButton extends React.Component {
    state = {
        flipped: false,
    };

    swipedCard = () => {
        this.setState({flipped: false});
    };

    updateButtonText = (flipCard) => () => {
        const {flipped} = this.state;

        flipCard();
        this.setState({flipped: !flipped});
    };

    render() {
        let {flipped} = this.state;
        const {flipCard, swipeRight, swipeLeft} = this.props;

        return (
            <View>
                {!flipped && (
                    <Button rounded block style={{backgroundColor: blue}} onPress={this.updateButtonText(flipCard)}>
                        <Text style={{color: white}}>Show answer</Text>
                    </Button>
                )}

                {flipped && (
                    <View>
                        <Button rounded block bordered onPress={this.updateButtonText(flipCard)}
                                style={{marginTop: 20}}>
                            <Text style={{color: blue}}>Back to question</Text>
                        </Button>
                        <Button rounded block onPress={swipeRight}
                                style={{backgroundColor: green, marginTop: 40}}>
                            <Text style={{color: white}}>Correct</Text>
                        </Button>
                        <Button rounded block bordered onPress={swipeLeft}
                                style={{backgroundColor: red, marginTop: 24}}>
                            <Text style={{color: white}}>Incorrect</Text>
                        </Button>
                    </View>
                )}
            </View>
        )
    }
}

