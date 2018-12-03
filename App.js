import React from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import DeckListView from './app/containers/DecksListView/index';
import {purple, red, white} from './app/utils/colors';
import DeckView from './app/containers/DeckView/index';
import AddDeckView from './app/containers/AddDeckView';

export default class App extends React.Component {
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

  render() {
	if(this.state.fontLoaded){
		return <AppContainer />
    }

    return(<View><Text>Loading</Text></View>);
  }
}

const AppNavigator = createStackNavigator({
	Home: {
		screen: DeckListView,
		navigationOptions: {
			headerTintColor: white,
			headerStyle: {
				backgroundColor: purple,
			}
		},
	},
	DeckView: {
		screen: DeckView,
		navigationOptions: {
			headerTintColor: white,
			headerStyle: {
				backgroundColor: red,
			}
		},
	},
	AddDeckView: {
		screen: AddDeckView,
		navigationOptions: {
			headerTintColor: white,
			headerStyle: {
				backgroundColor: red,
			}
		},
	}
});

const AppContainer = createAppContainer(AppNavigator);