import React from 'react';
import Grid from '@mui/material/Grid';

import '../style/GameBoard.css';

const GameBoard = () => {
	const teamNum = 6;
	const height = 900 / teamNum;

	return (
		<div id='game'>
			<div id='teamMarker'>
				<Grid container direction='column' justifyContent='space-between' alignItems='stretch'>
					<Grid item className='team' style={{ height: height }}></Grid>
					<Grid item className='team' style={{ height: height }}></Grid>
					<Grid item className='team' style={{ height: height }}></Grid>
					<Grid item className='team' style={{ height: height }}></Grid>
					<Grid item className='team' style={{ height: height }}></Grid>
					<Grid item className='team' style={{ height: height }}></Grid>
				</Grid>
			</div>
			<div id='gameBoard'></div>
		</div>
	);
};

export default GameBoard;
