import React from 'react';
import {Form, Item, Input, Label, Button, Text} from 'native-base';


export default class AddDeckView extends React.Component {
	render() {
		return (
			<Container>
				<Form>
					<Item floatingLabel>
						<Label>Deck title</Label>
						<Input />
					</Item>
					<Button><Text>Add deck</Text></Button>
					<Button><Text>Cancel</Text></Button>
				</Form>
			</Container>
		)
	}
}