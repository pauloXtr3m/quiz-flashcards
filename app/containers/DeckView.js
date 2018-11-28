import React from 'react'
import styled from 'styled-components/native';

const DeckTitle = styled.Text`
	font-size: 40;
`;

const Deck = styled.View`
  flex: 1;
  alignItems: center;
  justifyContent: center;  
`;

class DeckView extends React.Component {
	render() {
		return (
			<Deck>
				<DeckTitle>udacicards</DeckTitle>
			</Deck>
		)
	}
}

export default DeckView;