import { Button } from '@mui/material';
import React from 'react';

import '../style/Main.css';
import '@kfonts/bm-dohyeon';

const Main = () => {
	return (
		<div>
			<h1 id='title'>윷놀이</h1>
			<div className='mainImage'>
				<img src='/images/yut-nori-game.png' alt='yut' />
			</div>
			<Button id='startBtn' variant='outlined' color='primary' size='large' href='/num'>
				시작
			</Button>
		</div>
	);
};

export default Main;
