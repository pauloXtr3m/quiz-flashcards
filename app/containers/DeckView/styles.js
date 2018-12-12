import styled from 'styled-components/native';
import {blue, purple, white} from '../../utils/colors';

export const DeckTitle = styled.Text`
	font-size: 36;
`;

export const ScoreText = styled.Text`
    color: ${purple};
	font-size: 36;
`;

export const ScoreDescription = styled.Text`
	font-size: 20;
`;

export const CardsNumber = styled.Text`
	font-size: 18;
	color: grey;
`;

export const AddCardText = styled.Text`
     color: ${blue};
     padding: 0 16px 0 16px;
`;

export const StartQuizText = styled.Text`
     color: ${white};
     padding: 0 16px 0 16px;
`;

export const DeckContainer = styled.View`
	flex: 3;
	flex-direction: column;
	justify-content: space-around;
	margin: 16px 16px 16px 16px;
`;

export const DeckTitleContainer = styled.View`
	flex: 1;
	align-items: center;
	justify-content: center;
`;

export const DeckScoreContainer = styled.View`
	flex: 1;
	align-items: center;
	justify-content: center;
`;

export const DeckActionsContainer = styled.View`
	flex: 1;
	justify-content: flex-end;
`;

export const DeckActionsRow = styled.View`
	flex: 1;
	flex-direction: row;
	align-items: flex-end;
	justify-content: space-between;
`;