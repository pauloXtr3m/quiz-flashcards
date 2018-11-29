import React from "react";
import { Container } from 'native-base';
import { View } from 'react-native';
import styled from "styled-components/native/dist/styled-components.native.esm";
import AppHeader from "./components/AppHeader";
import QuizStatusBar from './components/QuizStatusBar';
import {blue} from './utils/colors';
import DecksListView from "./containers/DecksListView";

const ViewContent = styled.View`
  flex: 1;
  margin-top: 16;
  margin-right: 8;
  margin-left: 8;
  margin-bottom: 8;
`;

class QuizFlashCardsApp extends React.Component {
	state = {
		fontLoaded: false,
	};

	async componentWillMount() {
		await Expo.Font.loadAsync({
			Roboto: require("native-base/Fonts/Roboto.ttf"),
			Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
		});
		this.setState({fontLoaded: true});
	}

	render(){
		return (
			<View style={{flex: 1}}>
				{this.state.fontLoaded && (
					<Container style={{flex: 1}}>
						<QuizStatusBar backgroundColor={blue} barStyle="light-content"/>
						<AppHeader/>
						<ViewContent>
                            <DecksListView/>
						</ViewContent>
					</Container>
				)}
			</View>
		);
	}
}

export default QuizFlashCardsApp;

