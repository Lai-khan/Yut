import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const HistoryAlert = ({ setHistory, saveHistory, close }) => {
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

	const loadSave = () => {
		setHistory();
		close();
	};

	const reset = () => {
		localStorage.removeItem('history');
		saveHistory();
		close();
	};

	return (
		<div>
			<Dialog fullScreen={fullScreen} open={true} aria-labelledby='responsive-dialog-title'>
				<DialogContent>
					<DialogContentText>이전 게임 데이터가 있습니다. 불러오시겠습니까?</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button autoFocus onClick={loadSave} color='primary'>
						예
					</Button>
					<Button onClick={reset} color='primary' autoFocus>
						아니오
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default HistoryAlert;
