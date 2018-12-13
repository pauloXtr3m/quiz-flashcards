import React from "react";
import styled from 'styled-components/native';
import {white} from '../utils/colors';

const AppTitle = styled.Text`
	font-size: 18;
	margin-left: 12;
	color: ${white};
`;

export const AppHeader = ({title}) => {
	return (
		<AppTitle>{ title }</AppTitle>
	);
};