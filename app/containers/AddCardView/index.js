import React from 'react';
import { Item, Input, Label, Button, Text } from 'native-base';
import {AppHeader} from '../../components/AppHeader';
import * as Api from '../../utils/api';
import {blue, red, white} from "../../utils/colors";
import {AddContentContainer, FormActionsContainer, FormActionsLine, FormContainer} from '../Forms/styles';


export default class AddCardView extends React.Component {

	state = {
		title: '',
		question: '',
		answer: '',
		error: false,
	};

	static navigationOptions = {
		headerTitle: <AppHeader title='Add new card'/>,
	};

	addCard = () => {
		const {question, answer} = this.state;
		const {deckKey, increaseCardsNumber} = this.props.navigation.state.params;

		if (answer && answer) {
			const key = Math.random().toString(36).substr(-8);

			const entry = {
				deckKey,
				key,
				answer,
				question,
			};

			Api.addCard({entry, key});
			increaseCardsNumber();
			this.props.navigation.goBack();
		} else {
			this.setState({error: true});
		}
	};

	render() {
		const {error} = this.state;

		return (
			<AddContentContainer>
				{error && (
					<Text style={{color: red, fontSize: 18}}>Fields cannot be empty</Text>
				)}
				<FormContainer>
					<Item floatingLabel>
						<Label>Question</Label>
						<Input onChangeText={(question) => this.setState({question})} value={this.state.questionText}/>
					</Item>
					<Item floatingLabel>
						<Label>Answer</Label>
						<Input onChangeText={(answer) => this.setState({answer})} value={this.state.answerText}/>
					</Item>
				</FormContainer>

				<FormActionsContainer>
					<FormActionsLine>
						<Button transparent block
								onPress={() => this.props.navigation.goBack()}>
							<Text style={{color: blue}}>Cancel</Text>
						</Button>

						<Button block rounded
								onPress={this.addCard}>
							<Text style={{color: white}}>Confirm</Text></Button>
					</FormActionsLine>
				</FormActionsContainer>

			</AddContentContainer>
		)
	}
}