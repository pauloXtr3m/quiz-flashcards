import React from 'react';
import {  Card, CardItem, Body } from 'native-base'
import styled from 'styled-components/native'

const Question = styled.Text`
	font-size: 40
`;

class FlashCard extends React.Component {
	render(){
		return (
			<Card>
		<CardItem>
			<Body>
			<Question>
				fasoji fasoji fasoji fasoji fasoji fasoji fasoji asdasd afjoaisdf asdajsoiwe asdfojiasd asdjoas asdjoasij
			</Question>
			</Body>
		</CardItem>
		</Card>)
	}
}

export default FlashCard;