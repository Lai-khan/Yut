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
			<div id='gameBoard'>
				<svg id='gameBoardSvg' width='900' height='900' viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'>
					{/* 게임판 테두리 */}
					<rect x='10' y='10' width='380' height='380' stroke='black' fill='none' stroke-width='4' />

					{/* 윷놀이 칸 - 모서리&중앙 */}
					{/* 중앙 */}
					<circle cx='200' cy='200' r='20' stroke='black' stroke-width='3' fill='none' />
					<circle cx='200' cy='200' r='12' stroke='black' stroke-width='1.5' fill='none' />
					{/* 좌상 */}
					<circle cx='55' cy='55' r='20' stroke='black' stroke-width='3' fill='none' />
					<circle cx='55' cy='55' r='12' stroke='black' stroke-width='1.5' fill='none' />
					{/* 우상 */}
					<circle cx='345' cy='55' r='20' stroke='black' stroke-width='3' fill='none' />
					<circle cx='345' cy='55' r='12' stroke='black' stroke-width='1.5' fill='none' />
					{/* 좌하 */}
					<circle cx='55' cy='345' r='20' stroke='black' stroke-width='3' fill='none' />
					<circle cx='55' cy='345' r='12' stroke='black' stroke-width='1.5' fill='none' />
					{/* 우하 */}
					<circle cx='345' cy='345' r='20' stroke='black' stroke-width='3' fill='none' />
					<circle cx='345' cy='345' r='12' stroke='black' stroke-width='1.5' fill='none' />

					{/* 윷놀이 칸 - 나머지 */}
					{/* 좌상~우상 */}
					<circle cx='119' cy='55' r='12' stroke='black' stroke-width='1.5' fill='none' />
					<circle cx='173' cy='55' r='12' stroke='black' stroke-width='1.5' fill='none' />
					<circle cx='227' cy='55' r='12' stroke='black' stroke-width='1.5' fill='none' />
					<circle cx='281' cy='55' r='12' stroke='black' stroke-width='1.5' fill='none' />
					{/* 좌상~좌하 */}
					<circle cx='55' cy='119' r='12' stroke='black' stroke-width='1.5' fill='none' />
					<circle cx='55' cy='173' r='12' stroke='black' stroke-width='1.5' fill='none' />
					<circle cx='55' cy='227' r='12' stroke='black' stroke-width='1.5' fill='none' />
					<circle cx='55' cy='281' r='12' stroke='black' stroke-width='1.5' fill='none' />
					{/* 좌하~우하 */}
					<circle cx='119' cy='345' r='12' stroke='black' stroke-width='1.5' fill='none' />
					<circle cx='173' cy='345' r='12' stroke='black' stroke-width='1.5' fill='none' />
					<circle cx='227' cy='345' r='12' stroke='black' stroke-width='1.5' fill='none' />
					<circle cx='281' cy='345' r='12' stroke='black' stroke-width='1.5' fill='none' />
					{/* 우상~우하 */}
					<circle cx='345' cy='119' r='12' stroke='black' stroke-width='1.5' fill='none' />
					<circle cx='345' cy='173' r='12' stroke='black' stroke-width='1.5' fill='none' />
					<circle cx='345' cy='227' r='12' stroke='black' stroke-width='1.5' fill='none' />
					<circle cx='345' cy='281' r='12' stroke='black' stroke-width='1.5' fill='none' />
					{/* 대각선 */}
					<circle cx='105' cy='105' r='12' stroke='black' stroke-width='1.5' fill='none' />
					<circle cx='150' cy='150' r='12' stroke='black' stroke-width='1.5' fill='none' />
					<circle cx='250' cy='250' r='12' stroke='black' stroke-width='1.5' fill='none' />
					<circle cx='295' cy='295' r='12' stroke='black' stroke-width='1.5' fill='none' />
					<circle cx='295' cy='105' r='12' stroke='black' stroke-width='1.5' fill='none' />
					<circle cx='250' cy='150' r='12' stroke='black' stroke-width='1.5' fill='none' />
					<circle cx='150' cy='250' r='12' stroke='black' stroke-width='1.5' fill='none' />
					<circle cx='105' cy='295' r='12' stroke='black' stroke-width='1.5' fill='none' />

					{/* 화살표 */}
					<defs>
						<marker
							id='arrow'
							viewBox='0 0 10 10'
							refX='5'
							refY='5'
							markerWidth='6'
							markerHeight='6'
							orient='auto-start-reverse'
						>
							<path d='M 0 0 L 10 5 L 0 10 z' />
						</marker>
					</defs>

					{/* 경로 */}
					{/* 화살표는 대각선은 x,y +-2 / 가로세로선은 화살표쪽 +-3 */}
					{/* 좌상~우상 */}
					<line x1='80' y1='55' x2='104' y2='55' stroke='black' stroke-width='1' />
					<line x1='134' y1='55' x2='158' y2='55' stroke='black' stroke-width='1' />
					<line x1='188' y1='55' x2='212' y2='55' stroke='black' stroke-width='1' />
					<line x1='242' y1='55' x2='266' y2='55' stroke='black' stroke-width='1' />
					<polyline points='320,55 299,55' stroke='black' stroke-width='1' marker-end='url(#arrow)' />
					{/* 좌상~좌하 */}
					<polyline points='55,80 55,101' stroke='black' stroke-width='1' marker-end='url(#arrow)' />
					<line x1='55' y1='134' x2='55' y2='158' stroke='black' stroke-width='1' />
					<line x1='55' y1='188' x2='55' y2='212' stroke='black' stroke-width='1' />
					<line x1='55' y1='242' x2='55' y2='266' stroke='black' stroke-width='1' />
					<line x1='55' y1='296' x2='55' y2='320' stroke='black' stroke-width='1' />
					<polyline points='55,296 55,317' stroke='black' stroke-width='1' marker-end='url(#arrow)' />
					{/* 좌하~우하  */}
					<polyline points='80,345 101,345' stroke='black' stroke-width='1' marker-end='url(#arrow)' />
					<line x1='134' y1='345' x2='158' y2='345' stroke='black' stroke-width='1' />
					<line x1='188' y1='345' x2='212' y2='345' stroke='black' stroke-width='1' />
					<line x1='242' y1='345' x2='266' y2='345' stroke='black' stroke-width='1' />
					<line x1='296' y1='345' x2='320' y2='345' stroke='black' stroke-width='1' />
					{/* 우상~우하 */}
					<line x1='345' y1='80' x2='345' y2='104' stroke='black' stroke-width='1' />
					<line x1='345' y1='134' x2='345' y2='158' stroke='black' stroke-width='1' />
					<line x1='345' y1='188' x2='345' y2='212' stroke='black' stroke-width='1' />
					<line x1='345' y1='242' x2='345' y2='266' stroke='black' stroke-width='1' />
					<polyline points='345,320 345,299' stroke='black' stroke-width='1' marker-end='url(#arrow)' />
					{/* 대각선 */}
					<line x1='75' y1='75' x2='93' y2='93' stroke='black' stroke-width='1' />
					<line x1='117' y1='117' x2='138' y2='138' stroke='black' stroke-width='1' />
					<polyline points='182,182 164,164' stroke='black' stroke-width='1' marker-end='url(#arrow)' />
					<line x1='220' y1='220' x2='238' y2='238' stroke='black' stroke-width='1' />
					<line x1='262' y1='262' x2='283' y2='283' stroke='black' stroke-width='1' />
					<polyline points='327,327 309,309' stroke='black' stroke-width='1' marker-end='url(#arrow)' />
					<polyline points='92,307 75,325' stroke='black' stroke-width='1' marker-end='url(#arrow)' />
					<line x1='117' y1='283' x2='138' y2='262' stroke='black' stroke-width='1' />
					<polyline points='182,218 164,236' stroke='black' stroke-width='1' marker-end='url(#arrow)' />
					<line x1='220' y1='180' x2='238' y2='162' stroke='black' stroke-width='1' />
					<line x1='262' y1='138' x2='283' y2='117' stroke='black' stroke-width='1' />
					<polyline points='327,73 309,91' stroke='black' stroke-width='1' marker-end='url(#arrow)' />

					<text x='82' y='360' class='small'>
						출발
					</text>
					<text x='63' y='310' class='small'>
						도착
					</text>
				</svg>
			</div>
		</div>
	);
};

export default GameBoard;
