import React, { useState } from 'react';
import HomeFeatures from './homeFeatures';
import ReactTooltip from "react-tooltip";

export default function Home() {
	const [content, setContent] = useState("");

	return (
		<div>
			<HomeFeatures setTooltipContent={setContent}/>
			<ReactTooltip>{content}</ReactTooltip>
		</div>
	);
}
