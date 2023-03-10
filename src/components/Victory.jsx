import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const Victory = ({ teamName }) => {
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

	return (
		<div>
			<Dialog fullScreen={fullScreen} open={true} aria-labelledby='responsive-dialog-title'>
				<DialogTitle id='responsive-dialog-title'>`πππ{teamName} μ°μΉ!!πππ`</DialogTitle>
				<DialogActions>
					<Button
						onClick={() => {
							localStorage.removeItem('history');
							location.href = '/';
						}}
						autoFocus>
						νμΌλ‘ μ΄λ
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default Victory;
