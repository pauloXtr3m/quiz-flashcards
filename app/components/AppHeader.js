import {Body, Header, Left, Right, Title, Font, Container} from "native-base";
import {View} from 'react-native';
import React from "react";

class AppHeader extends React.Component {

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
        return (
            <Header>
                <Left/>
                <Body>
                {this.state.fontLoaded && (
                    <Title> Header </Title>
                )}
                </Body>
                <Right/>
            </Header>
        );
    }
}


export default AppHeader;