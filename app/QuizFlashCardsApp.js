import React from "react";
import { Container, Content} from 'native-base';
import styled from "styled-components/native/dist/styled-components.native.esm";
import DeckView from "./containers/DeckView";
import AppHeader from "./components/AppHeader";
import QuizStatusBar from './components/QuizStatusBar';
import {blue} from './utils/colors';

const ViewContent = styled.View`
  flex: 1;
  margin-top: 16;
  margin-right: 8;
  margin-left: 8;
  margin-bottom: 8;
`;

const QuizFlashCardsApp = () => {
    return (
		<Container style={{flex: 1}}>
			<QuizStatusBar backgroundColor={blue} barStyle="light-content"/>
			<AppHeader/>
			<ViewContent>
				<DeckView />
			</ViewContent>
		</Container>
    );
};

export default QuizFlashCardsApp;

