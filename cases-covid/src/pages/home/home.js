import React, { useState } from 'react';
import HomeFeatures from './homeFeatures';
import ReactTooltip from "react-tooltip";
import { ButtonComeBack } from './style';
import { Link } from 'react-router-dom';

export default function Home() {
	const [content, setContent] = useState("");

	return (
		<div>
			<Link to='/'><ButtonComeBack>Return Home</ButtonComeBack></Link>
			<HomeFeatures setTooltipContent={setContent}/>
			<ReactTooltip>{content}</ReactTooltip>
		</div>
	);
}
