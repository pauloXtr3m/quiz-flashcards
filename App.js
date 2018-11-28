import React from 'react';
import { StyleSheet  } from 'react-native';
import {  Container, Header, Content } from 'native-base'
import FlashCard from './app/components/FlashCard';
import DeckView from './app/containers/DeckView';

export default class App extends React.Component {
  render() {
    return (
      <Container>
        <Header/>
          <Content>
			  <DeckView/>
          </Content>
      </Container>
    );
  }
}
