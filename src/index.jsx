import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes } from 'react-router-dom';
import Main from './components/Main';
import TeamNum from './components/TeamNum';
import GameBoard from './components/GameBoard';

const App = () => {
	return (
		<Routes>
			<Route path='/' element={<Main />} />
			<Route path='/' element={<TeamNum />} />
			<Route path='/' element={<GameBoard />} />
		</Routes>
	);
};

createRoot(document.getElementById('root')).render(
	<BrowserRouter>
		<App />
	</BrowserRouter>
);
