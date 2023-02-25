import React, { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import { SVG } from '@svgdotjs/svg.js';

import '../style/GameBoard.css';

const GameBoard = () => {
	// 게임판 각 칸
	let center,end,	mo1,mo2,mo3,a1,a2,a3,a4,b1,b2,b3,b4,c1,c2,c3,c4,d1,d2,d3,d4,e1,e2,e3,e4,e5,e6,e7,e8;
	// 각 칸별 갈 수 있는 칸
	let movableSpace = new Map();

	const teamNum = 6;
	const height = 900 / teamNum;

	const setGame = () => {
		center = SVG('#center');
		end = SVG('#end');
		mo1 = SVG('#mo1');
		mo2 = SVG('#mo2');
		mo3 = SVG('#mo3');
		a1 = SVG('#a1');
		a2 = SVG('#a2');
		a3 = SVG('#a3');
		a4 = SVG('#a4');
		b1 = SVG('#b1');
		b2 = SVG('#b2');
		b3 = SVG('#b3');
		b4 = SVG('#b4');
		c1 = SVG('#c1');
		c2 = SVG('#c2');
		c3 = SVG('#c3');
		c4 = SVG('#c4');
		d1 = SVG('#d1');
		d2 = SVG('#d2');
		d3 = SVG('#d3');
		d4 = SVG('#d4');
		e1 = SVG('#e1');
		e2 = SVG('#e2');
		e3 = SVG('#e3');
		e4 = SVG('#e4');
		e5 = SVG('#e5');
		e6 = SVG('#e6');
		e7 = SVG('#e7');
		e8 = SVG('#e8');
	};

	useEffect(() => {
		setGame();
	}, []);

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
					<rect x='10' y='10' width='380' height='380' stroke='black' fill='none' strokeWidth='4' />

					{/* 윷놀이 칸 - 모서리&중앙 */}
					{/* 중앙 */}
					<circle cx='200' cy='200' r='20' stroke='black' strokeWidth='3' fill='none' />
					<circle id='center' cx='200' cy='200' r='12' stroke='black' strokeWidth='1.5' fill='white' />
					{/* 좌상 */}
					<circle cx='55' cy='55' r='20' stroke='black' strokeWidth='3' fill='none' />
					<circle id='mo3' cx='55' cy='55' r='12' stroke='black' strokeWidth='1.5' fill='white' />
					{/* 우상 */}
					<circle cx='345' cy='55' r='20' stroke='black' strokeWidth='3' fill='none' />
					<circle id='mo2' cx='345' cy='55' r='12' stroke='black' strokeWidth='1.5' fill='white' />
					{/* 좌하 */}
					<circle cx='55' cy='345' r='20' stroke='black' strokeWidth='3' fill='none' />
					<circle id='end' cx='55' cy='345' r='12' stroke='black' strokeWidth='1.5' fill='white' />
					{/* 우하 */}
					<circle cx='345' cy='345' r='20' stroke='black' strokeWidth='3' fill='none' />
					<circle id='mo1' cx='345' cy='345' r='12' stroke='black' strokeWidth='1.5' fill='white' />

					{/* 윷놀이 칸 - 나머지 */}
					{/* 좌상~우상 */}
					<circle id='c4' cx='119' cy='55' r='12' stroke='black' strokeWidth='1.5' fill='white' />
					<circle id='c3' cx='173' cy='55' r='12' stroke='black' strokeWidth='1.5' fill='white' />
					<circle id='c2' cx='227' cy='55' r='12' stroke='black' strokeWidth='1.5' fill='white' />
					<circle id='c1' cx='281' cy='55' r='12' stroke='black' strokeWidth='1.5' fill='white' />
					{/* 좌상~좌하 */}
					<circle id='d1' cx='55' cy='119' r='12' stroke='black' strokeWidth='1.5' fill='white' />
					<circle id='d2' cx='55' cy='173' r='12' stroke='black' strokeWidth='1.5' fill='white' />
					<circle id='d3' cx='55' cy='227' r='12' stroke='black' strokeWidth='1.5' fill='white' />
					<circle id='d4' cx='55' cy='281' r='12' stroke='black' strokeWidth='1.5' fill='white' />
					{/* 좌하~우하 */}
					<circle id='a1' cx='119' cy='345' r='12' stroke='black' strokeWidth='1.5' fill='white' />
					<circle id='a2' cx='173' cy='345' r='12' stroke='black' strokeWidth='1.5' fill='white' />
					<circle id='a3' cx='227' cy='345' r='12' stroke='black' strokeWidth='1.5' fill='white' />
					<circle id='a4' cx='281' cy='345' r='12' stroke='black' strokeWidth='1.5' fill='white' />
					{/* 우상~우하 */}
					<circle id='b4' cx='345' cy='119' r='12' stroke='black' strokeWidth='1.5' fill='white' />
					<circle id='b3' cx='345' cy='173' r='12' stroke='black' strokeWidth='1.5' fill='white' />
					<circle id='b2' cx='345' cy='227' r='12' stroke='black' strokeWidth='1.5' fill='white' />
					<circle id='b1' cx='345' cy='281' r='12' stroke='black' strokeWidth='1.5' fill='white' />
					{/* 대각선 */}
					<circle id='e6' cx='105' cy='105' r='12' stroke='black' strokeWidth='1.5' fill='white' />
					<circle id='e5' cx='150' cy='150' r='12' stroke='black' strokeWidth='1.5' fill='white' />
					<circle id='e2' cx='250' cy='250' r='12' stroke='black' strokeWidth='1.5' fill='white' />
					<circle id='e1' cx='295' cy='295' r='12' stroke='black' strokeWidth='1.5' fill='white' />
					<circle id='e3' cx='295' cy='105' r='12' stroke='black' strokeWidth='1.5' fill='white' />
					<circle id='e4' cx='250' cy='150' r='12' stroke='black' strokeWidth='1.5' fill='white' />
					<circle id='e7' cx='150' cy='250' r='12' stroke='black' strokeWidth='1.5' fill='white' />
					<circle id='e8' cx='105' cy='295' r='12' stroke='black' strokeWidth='1.5' fill='white' />

					{/* 화살표 */}
					<defs>
						<marker
							id='arrow'
							viewBox='0 0 10 10'
							refX='5'
							refY='5'
							markerWidth='6'
							markerHeight='6'
							orient='auto-start-reverse'>
							<path d='M 0 0 L 10 5 L 0 10 z' />
						</marker>
					</defs>

					{/* 경로 */}
					{/* 화살표는 대각선은 x,y +-2 / 가로세로선은 화살표쪽 +-3 */}
					{/* 좌상~우상 */}
					<line x1='80' y1='55' x2='104' y2='55' stroke='black' strokeWidth='1' />
					<line x1='134' y1='55' x2='158' y2='55' stroke='black' strokeWidth='1' />
					<line x1='188' y1='55' x2='212' y2='55' stroke='black' strokeWidth='1' />
					<line x1='242' y1='55' x2='266' y2='55' stroke='black' strokeWidth='1' />
					<polyline points='320,55 299,55' stroke='black' strokeWidth='1' markerEnd='url(#arrow)' />
					{/* 좌상~좌하 */}
					<polyline points='55,80 55,101' stroke='black' strokeWidth='1' markerEnd='url(#arrow)' />
					<line x1='55' y1='134' x2='55' y2='158' stroke='black' strokeWidth='1' />
					<line x1='55' y1='188' x2='55' y2='212' stroke='black' strokeWidth='1' />
					<line x1='55' y1='242' x2='55' y2='266' stroke='black' strokeWidth='1' />
					<line x1='55' y1='296' x2='55' y2='320' stroke='black' strokeWidth='1' />
					<polyline points='55,296 55,317' stroke='black' strokeWidth='1' markerEnd='url(#arrow)' />
					{/* 좌하~우하  */}
					<polyline points='80,345 101,345' stroke='black' strokeWidth='1' markerEnd='url(#arrow)' />
					<line x1='134' y1='345' x2='158' y2='345' stroke='black' strokeWidth='1' />
					<line x1='188' y1='345' x2='212' y2='345' stroke='black' strokeWidth='1' />
					<line x1='242' y1='345' x2='266' y2='345' stroke='black' strokeWidth='1' />
					<line x1='296' y1='345' x2='320' y2='345' stroke='black' strokeWidth='1' />
					{/* 우상~우하 */}
					<line x1='345' y1='80' x2='345' y2='104' stroke='black' strokeWidth='1' />
					<line x1='345' y1='134' x2='345' y2='158' stroke='black' strokeWidth='1' />
					<line x1='345' y1='188' x2='345' y2='212' stroke='black' strokeWidth='1' />
					<line x1='345' y1='242' x2='345' y2='266' stroke='black' strokeWidth='1' />
					<polyline points='345,320 345,299' stroke='black' strokeWidth='1' markerEnd='url(#arrow)' />
					{/* 대각선 */}
					<line x1='75' y1='75' x2='93' y2='93' stroke='black' strokeWidth='1' />
					<line x1='117' y1='117' x2='138' y2='138' stroke='black' strokeWidth='1' />
					<polyline points='182,182 164,164' stroke='black' strokeWidth='1' markerEnd='url(#arrow)' />
					<line x1='220' y1='220' x2='238' y2='238' stroke='black' strokeWidth='1' />
					<line x1='262' y1='262' x2='283' y2='283' stroke='black' strokeWidth='1' />
					<polyline points='327,327 309,309' stroke='black' strokeWidth='1' markerEnd='url(#arrow)' />
					<polyline points='92,307 75,325' stroke='black' strokeWidth='1' markerEnd='url(#arrow)' />
					<line x1='117' y1='283' x2='138' y2='262' stroke='black' strokeWidth='1' />
					<polyline points='182,218 164,236' stroke='black' strokeWidth='1' markerEnd='url(#arrow)' />
					<line x1='220' y1='180' x2='238' y2='162' stroke='black' strokeWidth='1' />
					<line x1='262' y1='138' x2='283' y2='117' stroke='black' strokeWidth='1' />
					<polyline points='327,73 309,91' stroke='black' strokeWidth='1' markerEnd='url(#arrow)' />

					<text x='82' y='360' className='small'>
						출발
					</text>
					<text x='63' y='310' className='small'>
						도착
					</text>
				</svg>
			</div>
		</div>
	);
};

export default GameBoard;
