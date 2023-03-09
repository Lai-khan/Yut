import React, { useEffect, useState } from 'react';
import { Box, Button, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

import '../style/TeamNum.css';

const TeamNum = () => {
	const [teamNum, setTeamNum] = useState(2);

	useEffect(() => {
		localStorage.setItem('teamNum', teamNum);
	}, [teamNum]);

	return (
		<div>
			<h2 className='subTitle'>팀 수</h2>
			<div className='teamInfoArea'>
				<Box component='span'>
					<IconButton
						color='primary'
						aria-label='remove'
						size='large'
						onClick={() => {
							if (teamNum > 2) {
								setTeamNum((prevNum) => prevNum - 1);
							}
						}}>
						<RemoveIcon />
					</IconButton>
					<p id='teamNum'>{teamNum}</p>
					<IconButton
						color='primary'
						aria-label='add'
						size='large'
						onClick={() => {
							if (teamNum < 5) {
								setTeamNum((prevNum) => prevNum + 1);
							}
						}}>
						<AddIcon />
					</IconButton>
				</Box>
			</div>
			<p style={{ marginTop: '20px' }}>최소 2 ~ 최대 5</p>
			<Button id='nextBtn' variant='outlined' color='primary' size='large' href='/game'>
				다음
			</Button>
		</div>
	);
};

export default TeamNum;
