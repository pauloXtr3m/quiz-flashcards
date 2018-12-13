import React from 'react';
import {View, Text} from 'react-native';
import {Root} from 'native-base';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import DeckListView from './app/containers/DecksListView/index';
import {red, white} from './app/utils/colors';
import DeckView from './app/containers/DeckView/index';
import AddDeckView from './app/containers/AddDeckView';
import AddCardView from "./app/containers/AddCardView";
import QuizView from "./app/containers/QuizView";
import ScoreView from './app/containers/ScoreView';
import * as NotificationUtils from './app/utils/Notification';

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

	componentDidMount() {
		NotificationUtils.setLocalNotification();
	}

	render() {
		if (this.state.fontLoaded) {
			return <AppContainer/>
		}

		return (<View><Text>Loading</Text></View>);
	}
}

const AppNavigator = createStackNavigator({
	Home: {
		screen: DeckListView,
		navigationOptions: {
			headerTintColor: white,
			headerStyle: {
				backgroundColor: red,
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
	},
	AddCardView: {
		screen: AddCardView,
		navigationOptions: {
			headerTintColor: white,
			headerStyle: {
				backgroundColor: red,
			}
		},
	},
	QuizView: {
		screen: QuizView,
		navigationOptions: {
			headerTintColor: white,
			headerStyle: {
				backgroundColor: red,
			}
		},
	},
	ScoreView: {
		screen: ScoreView,
		navigationOptions: {
			headerTintColor: white,
			headerStyle: {
				backgroundColor: red,
			}
		},
	},
});

const AppContainer = createAppContainer(AppNavigator);