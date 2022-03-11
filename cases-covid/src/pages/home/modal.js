import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';

export default function Modal() {
	return (
		<Box sx={{ width: 500 }}>
			<Grid container justifyContent="center">
				<Grid item>
					<Tooltip title=" uAIIIIIIIIII" placement="top-start">
						<Button>top-start</Button>
					</Tooltip>
				</Grid>
			</Grid>
		</Box>
	);
}
