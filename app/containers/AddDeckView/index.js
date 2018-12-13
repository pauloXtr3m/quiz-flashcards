import React from 'react';
import { Item, Input, Label, Button, Text } from 'native-base';
import {AppHeader} from '../../components/AppHeader';
import * as Api from '../../utils/Api';
import {blue, red, white} from "../../utils/colors";
import {AddContentContainer, FormActionsContainer, FormActionsLine, FormContainer} from '../Forms/styles';


export default class AddDeckView extends React.Component {

	state = {
		title: '',
		error: false,
	};

	static navigationOptions = {
		headerTitle: <AppHeader title='Add new deck'/>,
	};

	addDeck = () => {
		const {title} = this.state;

		if (title) {
			const key = Math.random().toString(36).substr(-8);

			const entry = {
				key,
				title: this.state.title,
				cardsNumber: 0,
				bestScore: 0,
			};

			Api.addDeck({entry, key});
			this.props.navigation.state.params.addDeck(entry);
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
					<Text style={{color: red, fontSize: 18}}>Title cannot be empty</Text>
				)}
				<FormContainer>

					<Item floatingLabel>
						<Label>Title</Label>
						<Input onChangeText={(title) => this.setState({title})} value={this.state.text}/>
					</Item>

				</FormContainer>
				<FormActionsContainer>
					<FormActionsLine>
						<Button rounded transparent
								onPress={() => this.props.navigation.goBack()}>
							<Text style={{color: blue}}>Cancel</Text>
						</Button>
						<Button rounded block onPress={this.addDeck}><Text style={{color: white}}>Add deck</Text></Button>
					</FormActionsLine>
				</FormActionsContainer>
			</AddContentContainer>
		)
	}
}