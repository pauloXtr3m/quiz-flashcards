import {Button, FooterTab} from "native-base";
import {blue, white} from '../../utils/colors';
import {Text} from 'react-native';
import React from 'react';

export const AddDeckButton = ({ onPressFunction }) => (
	<FooterTab style={{backgroundColor: blue}}>
		<Button full onPress={ onPressFunction }>
			<Text style={{color: white, fontSize: 18}}>ADD DECK</Text>
		</Button>
	</FooterTab>
);