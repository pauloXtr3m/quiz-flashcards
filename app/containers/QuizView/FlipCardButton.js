import React from 'react';
import {Button} from 'native-base';
import {View,Text, StyleSheet} from 'react-native';
import {blue, white} from '../../utils/colors';

export class FlipCardButton extends React.Component {
	state = {
		flipped: false,
	};

	swipedCard = () => {
		this.setState({flipped: false});
	};

	updateButtonText = (flipCard) => () => {
		const { flipped } = this.state;

		flipCard();
		this.setState({flipped: !flipped});
	};

	render() {
		let {flipped} = this.state;
		const {flipCard} = this.props;

		return (
			<View>
				{!flipped && (
					<Button rounded block style={{backgroundColor: blue}} onPress={this.updateButtonText(flipCard)}>
						<Text style={{color: white}}>Show answer</Text>
					</Button>
				)}

				{flipped && (
					<Button rounded block bordered onPress={this.updateButtonText(flipCard)}>
						<Text style={{color: blue}}>Back to question</Text>
					</Button>
				)}
			</View>
		)
	}
}

