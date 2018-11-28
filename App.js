import React from 'react';
import { StyleSheet  } from 'react-native';
import {  Container, Header, Content } from 'native-base'
import FlashCard from './app/components/FlashCard';

export default class App extends React.Component {
  render() {
    return (
      <Container>
        <Header/>
          <Content>
			  <FlashCard />
          </Content>
      </Container>
    );
  }
}
