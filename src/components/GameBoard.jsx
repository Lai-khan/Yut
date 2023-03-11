import React, { useEffect, useState } from 'react';
import { SVG } from '@svgdotjs/svg.js';
import '@svgdotjs/svg.draggable.js';
import { Box, Button } from '@mui/material';
import Victory from './Victory';

import '../style/GameBoard.css';

let teamRoster = new Map();
let movableSpace = new Map();
let spaceInfo = new Map();
let startPos = new Map();

const GameBoard = () => {
	const teamNum = localStorage.getItem('teamNum');
	const [currentTurn, setCurrentTurn] = useState('team1');
	const [canPass, setCanPass] = useState(false);
	const [passableId, setPassableId] = useState();
	const [gameEnd, setGameEnd] = useState(false);

	// 게임 세팅
	const setGame = () => {
		for (var i = 1; i <= teamNum; i++) {
			teamRoster.set(`team${i}`, `team${i == teamNum ? 1 : i + 1}`);
		}

		movableSpace.set('start', ['a1', 'a2', 'a3', 'a4', 'mo1']);
		movableSpace.set('center', ['e2', 'e4', 'e7', 'e8', 'end']);
		movableSpace.set('mo1', ['a4', 'e1', 'e2', 'center', 'e5', 'e6']);
		movableSpace.set('mo2', ['b4', 'e3', 'e4', 'center', 'e7', 'e8']);
		movableSpace.set('mo3', ['c4', 'e6', 'd1', 'd2', 'd3', 'd4', 'end']);
		movableSpace.set('a1', ['end', 'a2', 'a3', 'a4', 'mo1', 'b1']);
		movableSpace.set('a2', ['a1', 'a3', 'a4', 'mo1', 'b1', 'b2']);
		movableSpace.set('a3', ['a2', 'a4', 'mo1', 'b1', 'b2', 'b3']);
		movableSpace.set('a4', ['a3', 'mo1', 'b1', 'b2', 'b3', 'b4']);
		movableSpace.set('b1', ['mo1', 'b2', 'b3', 'b4', 'mo2', 'c1']);
		movableSpace.set('b2', ['b1', 'b3', 'b4', 'mo2', 'c1', 'c2']);
		movableSpace.set('b3', ['b2', 'b4', 'mo2', 'c1', 'c2', 'c3']);
		movableSpace.set('b4', ['b3', 'mo2', 'c1', 'c2', 'c3', 'c4']);
		movableSpace.set('c1', ['mo2', 'c2', 'c3', 'c4', 'mo3', 'd1']);
		movableSpace.set('c2', ['c1', 'c3', 'c4', 'mo3', 'd1', 'd2']);
		movableSpace.set('c3', ['c2', 'c4', 'mo3', 'd1', 'd2', 'd3']);
		movableSpace.set('c4', ['c3', 'mo3', 'd1', 'd2', 'd3', 'd4']);
		movableSpace.set('d1', ['mo3', 'd2', 'd3', 'd4', 'end']);
		movableSpace.set('d2', ['d1', 'd3', 'd4', 'end']);
		movableSpace.set('d3', ['d2', 'd4', 'end']);
		movableSpace.set('d4', ['d3', 'end']);
		movableSpace.set('e1', ['mo1', 'e2', 'center', 'e5', 'e6', 'mo3']);
		movableSpace.set('e2', ['e1', 'center', 'e5', 'e6', 'mo3', 'd1']);
		movableSpace.set('e3', ['mo2', 'e4', 'center', 'e7', 'e8', 'end']);
		movableSpace.set('e4', ['e3', 'center', 'e7', 'e8', 'end']);
		movableSpace.set('e5', ['center', 'e6', 'mo3', 'd1', 'd2', 'd3']);
		movableSpace.set('e6', ['e5', 'mo3', 'd1', 'd2', 'd3', 'd4']);
		movableSpace.set('e7', ['center', 'e8', 'end']);
		movableSpace.set('e8', ['e7', 'end']);
		movableSpace.set('end', ['d4', 'e8']);

		spaceInfo.set('center', { minX: 164, minY: 164, maxX: 212, maxY: 212, sx: 188, sy: 188 });
		spaceInfo.set('mo1', { minX: 309, minY: 309, maxX: 357, maxY: 357, sx: 333, sy: 333 });
		spaceInfo.set('mo2', { minX: 309, minY: 19, maxX: 357, maxY: 67, sx: 333, sy: 43 });
		spaceInfo.set('mo3', { minX: 19, minY: 19, maxX: 67, maxY: 67, sx: 43, sy: 43 });
		spaceInfo.set('a1', { minX: 73, minY: 309, maxX: 131, maxY: 357, sx: 107, sy: 333 });
		spaceInfo.set('a2', { minX: 137, minY: 309, maxX: 185, maxY: 357, sx: 161, sy: 333 });
		spaceInfo.set('a3', { minX: 191, minY: 309, maxX: 239, maxY: 357, sx: 215, sy: 333 });
		spaceInfo.set('a4', { minX: 245, minY: 309, maxX: 293, maxY: 357, sx: 269, sy: 333 });
		spaceInfo.set('b1', { minX: 309, minY: 245, maxX: 357, maxY: 293, sx: 333, sy: 269 });
		spaceInfo.set('b2', { minX: 309, minY: 191, maxX: 357, maxY: 239, sx: 333, sy: 215 });
		spaceInfo.set('b3', { minX: 309, minY: 137, maxX: 357, maxY: 185, sx: 333, sy: 161 });
		spaceInfo.set('b4', { minX: 309, minY: 73, maxX: 357, maxY: 131, sx: 333, sy: 107 });
		spaceInfo.set('c1', { minX: 245, minY: 19, maxX: 293, maxY: 67, sx: 269, sy: 43 });
		spaceInfo.set('c2', { minX: 191, minY: 19, maxX: 239, maxY: 67, sx: 215, sy: 43 });
		spaceInfo.set('c3', { minX: 137, minY: 19, maxX: 185, maxY: 67, sx: 161, sy: 43 });
		spaceInfo.set('c4', { minX: 73, minY: 19, maxX: 131, maxY: 67, sx: 107, sy: 43 });
		spaceInfo.set('d1', { minX: 19, minY: 73, maxX: 67, maxY: 131, sx: 43, sy: 107 });
		spaceInfo.set('d2', { minX: 19, minY: 137, maxX: 67, maxY: 185, sx: 43, sy: 161 });
		spaceInfo.set('d3', { minX: 19, minY: 191, maxX: 67, maxY: 239, sx: 43, sy: 215 });
		spaceInfo.set('d4', { minX: 19, minY: 245, maxX: 67, maxY: 293, sx: 43, sy: 269 });
		spaceInfo.set('e1', { minX: 259, minY: 259, maxX: 307, maxY: 307, sx: 283, sy: 283 });
		spaceInfo.set('e2', { minX: 214, minY: 214, maxX: 262, maxY: 262, sx: 238, sy: 238 });
		spaceInfo.set('e3', { minX: 259, minY: 69, maxX: 307, maxY: 117, sx: 283, sy: 93 });
		spaceInfo.set('e4', { minX: 214, minY: 114, maxX: 262, maxY: 162, sx: 238, sy: 138 });
		spaceInfo.set('e5', { minX: 114, minY: 114, maxX: 162, maxY: 162, sx: 138, sy: 138 });
		spaceInfo.set('e6', { minX: 69, minY: 69, maxX: 117, maxY: 117, sx: 93, sy: 93 });
		spaceInfo.set('e7', { minX: 114, minY: 214, maxX: 162, maxY: 262, sx: 138, sy: 238 });
		spaceInfo.set('e8', { minX: 69, minY: 259, maxX: 117, maxY: 307, sx: 93, sy: 283 });
		spaceInfo.set('end', { minX: 19, minY: 309, maxX: 67, maxY: 357, sx: 43, sy: 333 });

		startPos.set('team1-1', { x: 418, y: 33 });
		startPos.set('team1-2', { x: 458, y: 33 });
		startPos.set('team1-3', { x: 498, y: 33 });
		startPos.set('team1-4', { x: 538, y: 33 });
		startPos.set('team2-1', { x: 418, y: 99.66 });
		startPos.set('team2-2', { x: 458, y: 99.66 });
		startPos.set('team2-3', { x: 498, y: 99.66 });
		startPos.set('team2-4', { x: 538, y: 99.66 });
		if (teamNum >= 3) {
			startPos.set('team3-1', { x: 418, y: 166.32 });
			startPos.set('team3-2', { x: 458, y: 166.32 });
			startPos.set('team3-3', { x: 498, y: 166.32 });
			startPos.set('team3-4', { x: 538, y: 166.32 });
		}
		if (teamNum >= 4) {
			startPos.set('team4-1', { x: 418, y: 232.98 });
			startPos.set('team4-2', { x: 458, y: 232.98 });
			startPos.set('team4-3', { x: 498, y: 232.98 });
			startPos.set('team4-4', { x: 538, y: 232.98 });
		}
		if (teamNum >= 5) {
			startPos.set('team5-1', { x: 418, y: 299.64 });
			startPos.set('team5-2', { x: 458, y: 299.64 });
			startPos.set('team5-3', { x: 498, y: 299.64 });
			startPos.set('team5-4', { x: 538, y: 299.64 });
		}
	};

	const preventClose = (e) => {
		e.preventDefault();
		e.returnValue = '';
		confirm('나가시면 진행하던 게임이 초기화됩니다. 나가시겠습니까?');
	};

	useEffect(() => {
		setGame();

		window.addEventListener('beforeunload', preventClose);

		return () => {
			window.removeEventListener('beforeunload', preventClose);
		};
	}, []);

	useEffect(() => {
		if (gameEnd) {
			window.removeEventListener('beforeunload', preventClose);
		}
	}, [gameEnd]);

	// 말 이동
	const malMove = (id, posId, x, y) => {
		const movable = movableSpace.get(posId);

		const len = movable.length;
		let arrival;
		for (var i = 0; i < len; i++) {
			let { minX, minY, maxX, maxY } = spaceInfo.get(movable[i]);
			if (minX <= x && x <= maxX && minY <= y && y <= maxY) {
				arrival = movable[i];
				break;
			}
		}

		if (arrival === undefined) {
			arrival = posId;
		}

		if (arrival === 'start') {
			const { x: sx, y: sy } = startPos.get(id);
			return { sx, sy, nextPos: arrival };
		}

		const { sx, sy } = spaceInfo.get(arrival);
		return { sx, sy, nextPos: arrival };
	};

	const setDraggable = async (id) => {
		const element = await SVG(`#${id}`);

		element.draggable();

		element.on('dragstart', (e) => {
			const posId = e.target.dataset.pos;
			const movable = movableSpace.get(posId);

			movable.forEach((el) => {
				let svgEl = SVG(`#${el}`);
				svgEl.fill('#8AFF8A');
			});
		});

		element.on('dragend', (e) => {
			e.preventDefault();
			const posId = e.target.dataset.pos;

			const movable = movableSpace.get(posId);
			movable.forEach((el) => {
				let svgEl = SVG(`#${el}`);
				svgEl.fill('none');
			});

			const { handler, box } = e.detail;
			const { sx, sy, nextPos } = malMove(id, posId, box.x, box.y);
			handler.move(sx, sy);
			e.target.dataset.pos = nextPos;

			checkCatch(nextPos);
			checkPass();
		});
	};

	const stopDraggable = async (id) => {
		const element = await SVG(`#${id}`);

		console.log(element);
	};

	const iterateTeamMal = (className, callback) => {
		const pieces = document.getElementsByClassName(className);
		const len = pieces.length;
		for (var i = 0; i < len; i++) {
			callback(pieces[i].id);
		}
	};

	// 팀 로테이션
	const nextTurn = () => {
		const next = teamRoster.get(currentTurn);

		iterateTeamMal(currentTurn, stopDraggable);
		setCurrentTurn(next);

		const checkmark = SVG('#check');
		const posY = checkmark.node.getAttribute('y');
		checkmark.move(435, Number(posY) + 66.66 > 7 + 66.66 * (teamNum - 1) ? 7 : Number(posY) + 66.66);
	};

	useEffect(() => {
		iterateTeamMal(currentTurn, setDraggable);
		checkPass();
	}, [currentTurn]);

	// 말 잡기
	const checkCatch = (posId) => {
		const pieces = document.getElementsByClassName('mal');
		const len = pieces.length;
		for (var i = 0; i < len; i++) {
			const mal = document.getElementById(pieces[i].id);
			if (mal.dataset.pos === posId && !mal.classList.contains(currentTurn)) {
				reset(mal.id);
			}
		}
	};

	// 말 잡힘
	const reset = async (id) => {
		const target = await SVG(`#${id}`);

		const { x, y } = startPos.get(id);
		target.node.setAttribute('data-pos', 'start');
		target.move(x, y);
	};

	// 말 나기
	const checkPass = () => {
		const pieces = document.getElementsByClassName(currentTurn);
		const len = pieces.length;
		for (var i = 0; i < len; i++) {
			const mal = document.getElementById(pieces[i].id);
			if (mal.getAttribute('data-pos') === 'end') {
				setCanPass(true);
				setPassableId(pieces[i].id);
				return;
			}
		}
		setCanPass(false);
		setPassableId(undefined);
	};

	const pass = async () => {
		if (passableId === undefined) {
			return;
		}

		const target = await SVG(`#${passableId}`);
		const startId = `start${passableId.replace('team', '')}`;
		const start = await SVG(`#${startId}`);
		const { x, y } = startPos.get(passableId);

		start.stroke({ color: '#2EFF2E', width: 3 });
		target.move(x, y);
		target.removeClass(currentTurn);
		target.draggable(false);
		// 말이 업어져 있다면 업은 말 모두 나야하고, 업은 말은 따로 안보이게 처리해야 한다.

		checkVictory();

		setCanPass(false);
	};

	const checkVictory = () => {
		const pieces = document.getElementsByClassName(currentTurn);
		if (pieces.length === 0) {
			setGameEnd(true);
		}
	};

	return (
		<div id='game'>
			<svg id='gameBoard' viewBox='0 0 578 400' xmlns='http://www.w3.org/2000/svg'>
				{/* 게임판 테두리 */}
				<rect x='10' y='10' width='380' height='380' stroke='black' fill='none' strokeWidth='4' />
				<line x1='0' y1='0' x2='0' y2='400' stroke='black' strokeWidth='1' />

				{/* 윷놀이 칸 - 모서리&중앙 */}
				{/* 중앙 */}
				<circle cx='200' cy='200' r='20' stroke='black' strokeWidth='3' fill='none' />
				<circle id='center' cx='200' cy='200' r='12' stroke='black' strokeWidth='1.5' fill='none' />
				{/* 좌상 */}
				<circle cx='55' cy='55' r='20' stroke='black' strokeWidth='3' fill='none' />
				<circle id='mo3' cx='55' cy='55' r='12' stroke='black' strokeWidth='1.5' fill='none' />
				{/* 우상 */}
				<circle cx='345' cy='55' r='20' stroke='black' strokeWidth='3' fill='none' />
				<circle id='mo2' cx='345' cy='55' r='12' stroke='black' strokeWidth='1.5' fill='none' />
				{/* 좌하 */}
				<circle cx='55' cy='345' r='20' stroke='black' strokeWidth='3' fill='none' />
				<circle id='end' cx='55' cy='345' r='12' stroke='black' strokeWidth='1.5' fill='none' />
				{/* 우하 */}
				<circle cx='345' cy='345' r='20' stroke='black' strokeWidth='3' fill='none' />
				<circle id='mo1' cx='345' cy='345' r='12' stroke='black' strokeWidth='1.5' fill='none' />

				{/* 윷놀이 칸 - 나머지 */}
				{/* 좌상~우상 */}
				<circle id='c4' cx='119' cy='55' r='12' stroke='black' strokeWidth='1.5' fill='none' />
				<circle id='c3' cx='173' cy='55' r='12' stroke='black' strokeWidth='1.5' fill='none' />
				<circle id='c2' cx='227' cy='55' r='12' stroke='black' strokeWidth='1.5' fill='none' />
				<circle id='c1' cx='281' cy='55' r='12' stroke='black' strokeWidth='1.5' fill='none' />
				{/* 좌상~좌하 */}
				<circle id='d1' cx='55' cy='119' r='12' stroke='black' strokeWidth='1.5' fill='none' />
				<circle id='d2' cx='55' cy='173' r='12' stroke='black' strokeWidth='1.5' fill='none' />
				<circle id='d3' cx='55' cy='227' r='12' stroke='black' strokeWidth='1.5' fill='none' />
				<circle id='d4' cx='55' cy='281' r='12' stroke='black' strokeWidth='1.5' fill='none' />
				{/* 좌하~우하 */}
				<circle id='a1' cx='119' cy='345' r='12' stroke='black' strokeWidth='1.5' fill='none' />
				<circle id='a2' cx='173' cy='345' r='12' stroke='black' strokeWidth='1.5' fill='none' />
				<circle id='a3' cx='227' cy='345' r='12' stroke='black' strokeWidth='1.5' fill='none' />
				<circle id='a4' cx='281' cy='345' r='12' stroke='black' strokeWidth='1.5' fill='none' />
				{/* 우상~우하 */}
				<circle id='b4' cx='345' cy='119' r='12' stroke='black' strokeWidth='1.5' fill='none' />
				<circle id='b3' cx='345' cy='173' r='12' stroke='black' strokeWidth='1.5' fill='none' />
				<circle id='b2' cx='345' cy='227' r='12' stroke='black' strokeWidth='1.5' fill='none' />
				<circle id='b1' cx='345' cy='281' r='12' stroke='black' strokeWidth='1.5' fill='none' />
				{/* 대각선 */}
				<circle id='e6' cx='105' cy='105' r='12' stroke='black' strokeWidth='1.5' fill='none' />
				<circle id='e5' cx='150' cy='150' r='12' stroke='black' strokeWidth='1.5' fill='none' />
				<circle id='e2' cx='250' cy='250' r='12' stroke='black' strokeWidth='1.5' fill='none' />
				<circle id='e1' cx='295' cy='295' r='12' stroke='black' strokeWidth='1.5' fill='none' />
				<circle id='e3' cx='295' cy='105' r='12' stroke='black' strokeWidth='1.5' fill='none' />
				<circle id='e4' cx='250' cy='150' r='12' stroke='black' strokeWidth='1.5' fill='none' />
				<circle id='e7' cx='150' cy='250' r='12' stroke='black' strokeWidth='1.5' fill='none' />
				<circle id='e8' cx='105' cy='295' r='12' stroke='black' strokeWidth='1.5' fill='none' />

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

				<line x1='400' y1='0' x2='400' y2='400' stroke='black' strokeWidth='1' />

				{/* 현황판 */}
				<rect x='400' y='0' width='178' height='66.66' stroke='black' fill='none' strokeWidth='0.2' />
				<text x='405' y='20' className='middle'>
					1팀
				</text>
				<circle id='start1-1' cx='430' cy='45' r='12' stroke='gray' strokeWidth='1.5' fill='none' />
				<circle id='start1-2' cx='470' cy='45' r='12' stroke='gray' strokeWidth='1.5' fill='none' />
				<circle id='start1-3' cx='510' cy='45' r='12' stroke='gray' strokeWidth='1.5' fill='none' />
				<circle id='start1-4' cx='550' cy='45' r='12' stroke='gray' strokeWidth='1.5' fill='none' />
				<rect x='400' y='66.66' width='178' height='66.66' stroke='black' fill='none' strokeWidth='0.2' />
				<text x='405' y='86.66' className='middle'>
					2팀
				</text>
				<circle id='start2-1' cx='430' cy='111.66' r='12' stroke='gray' strokeWidth='1.5' fill='none' />
				<circle id='start2-2' cx='470' cy='111.66' r='12' stroke='gray' strokeWidth='1.5' fill='none' />
				<circle id='start2-3' cx='510' cy='111.66' r='12' stroke='gray' strokeWidth='1.5' fill='none' />
				<circle id='start2-4' cx='550' cy='111.66' r='12' stroke='gray' strokeWidth='1.5' fill='none' />
				{teamNum >= 3 && (
					<>
						<rect x='400' y='133.32' width='178' height='66.66' stroke='black' fill='none' strokeWidth='0.2' />
						<text x='405' y='153.32' className='middle'>
							3팀
						</text>
						<circle id='start3-1' cx='430' cy='178.32' r='12' stroke='gray' strokeWidth='1.5' fill='none' />
						<circle id='start3-2' cx='470' cy='178.32' r='12' stroke='gray' strokeWidth='1.5' fill='none' />
						<circle id='start3-3' cx='510' cy='178.32' r='12' stroke='gray' strokeWidth='1.5' fill='none' />
						<circle id='start3-4' cx='550' cy='178.32' r='12' stroke='gray' strokeWidth='1.5' fill='none' />
					</>
				)}
				{teamNum >= 4 && (
					<>
						<rect x='400' y='199.98' width='178' height='66.66' stroke='black' fill='none' strokeWidth='0.2' />
						<text x='405' y='219.98' className='middle'>
							4팀
						</text>
						<circle id='start4-1' cx='430' cy='244.98' r='12' stroke='gray' strokeWidth='1.5' fill='none' />
						<circle id='start4-2' cx='470' cy='244.98' r='12' stroke='gray' strokeWidth='1.5' fill='none' />
						<circle id='start4-3' cx='510' cy='244.98' r='12' stroke='gray' strokeWidth='1.5' fill='none' />
						<circle id='start4-4' cx='550' cy='244.98' r='12' stroke='gray' strokeWidth='1.5' fill='none' />
					</>
				)}
				{teamNum >= 5 && (
					<>
						<rect x='400' y='266.64' width='178' height='66.66' stroke='black' fill='none' strokeWidth='0.2' />
						<text x='405' y='286.64' className='middle'>
							5팀
						</text>
						<circle id='start5-1' cx='430' cy='311.64' r='12' stroke='gray' strokeWidth='1.5' fill='none' />
						<circle id='start5-2' cx='470' cy='311.64' r='12' stroke='gray' strokeWidth='1.5' fill='none' />
						<circle id='start5-3' cx='510' cy='311.64' r='12' stroke='gray' strokeWidth='1.5' fill='none' />
						<circle id='start5-4' cx='550' cy='311.64' r='12' stroke='gray' strokeWidth='1.5' fill='none' />
					</>
				)}

				{/* 말 */}
				<defs>
					<symbol id='bird' viewBox='0 0 20 20'>
						<image href='./images/dove-solid.svg' x='3' y='3' height='14' width='14' />
					</symbol>
					<symbol id='hippo' viewBox='0 0 20 20'>
						<image href='./images/hippo-solid.svg' x='2' y='2' height='16' width='16' />
					</symbol>
					<symbol id='dragon' viewBox='0 0 20 20'>
						<image href='./images/dragon-solid.svg' x='3' y='3' height='14' width='14' />
					</symbol>
					<symbol id='cat' viewBox='0 0 20 20'>
						<image href='./images/cat-solid.svg' x='2' y='3' height='14' width='14' />
					</symbol>
					<symbol id='horse' viewBox='0 0 20 20'>
						<image href='./images/horse-solid.svg' x='2' y='3' height='14' width='14' />
					</symbol>
					<symbol id='fish' viewBox='0 0 20 20'>
						<image href='./images/fish-solid.svg' x='3' y='3' height='14' width='14' />
					</symbol>
				</defs>

				<image id='check' x='435' y='7' width='15' height='15' href='./images/checked.png' />

				<use
					id='team1-1'
					data-pos='start'
					className='mal bird team1'
					x='418'
					y='33'
					width='24'
					height='24'
					href='#bird'></use>
				<use
					id='team1-2'
					data-pos='start'
					className='mal bird team1'
					x='458'
					y='33'
					width='24'
					height='24'
					href='#bird'></use>
				<use
					id='team1-3'
					data-pos='start'
					className='mal bird team1'
					x='498'
					y='33'
					width='24'
					height='24'
					href='#bird'></use>
				<use
					id='team1-4'
					data-pos='start'
					className='mal bird team1'
					x='538'
					y='33'
					width='24'
					height='24'
					href='#bird'></use>
				<use
					id='team2-1'
					data-pos='start'
					className='mal hippo team2'
					x='418'
					y='99.66'
					width='24'
					height='24'
					href='#hippo'></use>
				<use
					id='team2-2'
					data-pos='start'
					className='mal hippo team2'
					x='458'
					y='99.66'
					width='24'
					height='24'
					href='#hippo'></use>
				<use
					id='team2-3'
					data-pos='start'
					className='mal hippo team2'
					x='498'
					y='99.66'
					width='24'
					height='24'
					href='#hippo'></use>
				<use
					id='team2-4'
					data-pos='start'
					className='mal hippo team2'
					x='538'
					y='99.66'
					width='24'
					height='24'
					href='#hippo'></use>
				{teamNum >= 3 && (
					<>
						<use
							id='team3-1'
							data-pos='start'
							className='mal dragon team3'
							x='418'
							y='166.32'
							width='24'
							height='24'
							href='#dragon'></use>
						<use
							id='team3-2'
							data-pos='start'
							className='mal dragon team3'
							x='458'
							y='166.32'
							width='24'
							height='24'
							href='#dragon'></use>
						<use
							id='team3-3'
							data-pos='start'
							className='mal dragon team3'
							x='498'
							y='166.32'
							width='24'
							height='24'
							href='#dragon'></use>
						<use
							id='team3-4'
							data-pos='start'
							className='mal dragon team3'
							x='538'
							y='166.32'
							width='24'
							height='24'
							href='#dragon'></use>
					</>
				)}
				{teamNum >= 4 && (
					<>
						<use
							id='team4-1'
							data-pos='start'
							className='mal cat team4'
							x='418'
							y='232.98'
							width='24'
							height='24'
							href='#cat'></use>
						<use
							id='team4-2'
							data-pos='start'
							className='mal cat team4'
							x='458'
							y='232.98'
							width='24'
							height='24'
							href='#cat'></use>
						<use
							id='team4-3'
							data-pos='start'
							className='mal cat team4'
							x='498'
							y='232.98'
							width='24'
							height='24'
							href='#cat'></use>
						<use
							id='team4-4'
							data-pos='start'
							className='mal cat team4'
							x='538'
							y='232.98'
							width='24'
							height='24'
							href='#cat'></use>
					</>
				)}
				{teamNum >= 5 && (
					<>
						<use
							id='team5-1'
							data-pos='start'
							className='mal horse team5'
							x='418'
							y='299.64'
							width='24'
							height='24'
							href='#horse'></use>
						<use
							id='team5-2'
							data-pos='start'
							className='mal horse team5'
							x='458'
							y='299.64'
							width='24'
							height='24'
							href='#horse'></use>
						<use
							id='team5-3'
							data-pos='start'
							className='mal horse team5'
							x='498'
							y='299.64'
							width='24'
							height='24'
							href='#horse'></use>
						<use
							id='team5-4'
							data-pos='start'
							className='mal horse team5'
							x='538'
							y='299.64'
							width='24'
							height='24'
							href='#horse'></use>
					</>
				)}
			</svg>

			<Box component='span' sx={{ '& button': { m: 2 } }}>
				<Button id='nextTurn' variant='contained' color='primary' size='large' onClick={nextTurn}>
					다음턴
				</Button>
				{canPass ? (
					<Button variant='contained' color='success' size='large' onClick={pass}>
						나기
					</Button>
				) : (
					<Button variant='contained' color='success' size='large' disabled>
						나기
					</Button>
				)}
				<Button id='rollback' variant='contained' color='error' size='large'>
					무르기
				</Button>
			</Box>

			{!!gameEnd && <Victory teamName={`팀 ${currentTurn.replace('team', '')}`} />}
		</div>
	);
};

export default GameBoard;
