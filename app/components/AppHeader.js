import {Body, Header, Left, Right, Title, } from "native-base";
import React from "react";

class AppHeader extends React.Component {

    render() {
        return (
            <Header>
                <Left/>
                <Body>
                <Title> FlashCards </Title>
                </Body>
                <Right/>
            </Header>
        );
    }
}


export default AppHeader;