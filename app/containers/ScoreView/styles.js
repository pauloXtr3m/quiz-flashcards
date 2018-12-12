import styled from 'styled-components/native'
import {blue, green, purple, red, white} from '../../utils/colors';

export const ScoreText = styled.Text`
	font-size: 36;
`;

export const ScoreNumber = styled.Text`
	font-size: 50;
	color: ${purple};
`;

export const TotalQuestions  = styled.Text`
	font-size: 20;
`;

export const CorrectQuestions = styled.Text`
	font-size: 20;
	color: ${green};
`;

export const IncorrectQuestions = styled.Text`
	font-size: 20;
	color: ${red};
`;

export const ContinueText = styled.Text`
     color: ${white};
     padding: 0 16px 0 16px;
`;

export const RestartQuizText = styled.Text`
     color: ${blue};
     padding: 0 16px 0 16px;
`;

export const ScoreContainer = styled.View`
	flex: 3;
	flex-direction: column;
	justify-content: space-around;
	margin: 16px 16px 16px 16px;
`;

export const MainScoreContainer = styled.View`
	flex: 1;
	align-items: center;
	justify-content: center;
`;

export const DetailScoreContainer = styled.View`
	flex: 1;
	align-items: center;
	justify-content: center;
`;

export const ScoreActionsContainer = styled.View`
	flex: 1;
	justify-content: flex-end;
`;

export const ScoreActionsRow = styled.View`
	flex: 1;
	flex-direction: row;
	align-items: flex-end
	justify-content: space-between;
`;