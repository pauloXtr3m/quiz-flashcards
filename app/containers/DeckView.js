import React from 'react'
import styled from 'styled-components/native';

const DeckTitle = styled.Text`
	font-size: 40;
	flex: 1;
    justifyContent: 'center';
`;

class DeckView extends React.Component {
	render(){
		return (
			<DeckTitle>udacicards</DeckTitle>
		)
	}
}

export default DeckView;