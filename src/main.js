/* main.js */
import React from "react";
import ReactDOM from "react-dom";
import "./style.css";

// Material-UI
import Button from "@material-ui/core/Button";

// Floating action button
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

const App = () => {
	return (
		<div>
			<VerticalLinearStepper/>
			<Button variant="outlined" color="primary" href="https://google.co.jp">
				click!
			</Button>
			<UploadButton/>
			<ButtonWithIcon icon={<SaveIcon/>} title="Save"/>
			<UploadPhotoButton/>
			<Fab color="secondary" aria-label="add">
				<AddIcon/>
			</Fab>
			<MyBottomNavigation/>
		</div>
	);
}

import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
const UploadButton = () => {
	return (
		<div>
			<input accept="image/*" id="icon-button-file" type="file" style={{display: "none"}} />
			<label htmlFor="icon-button-file">
				<IconButton color="primary" aria-label="upload picture" component="span">
					<PhotoCamera/>
				</IconButton>
			</label>
		</div>
	);
}

import SaveIcon from "@material-ui/icons/Save";

// アイコンとラベルをつかったボタンを用意する
const ButtonWithIcon = (props) => {
	return (
		<Button
			variant="contained"
			color="primary"
			size="small"
			startIcon = {props.icon}
			component="span"
		>
		{props.title}
		</Button>
	);
}

const UploadPhotoButton = () => {
	return (
		<div>
			<input accept="image/*" id="upload-photo" type="file" style={{display: "none"}}/>
			<label htmlFor="upload-photo">
				<ButtonWithIcon icon={<PhotoCamera/>} title="Upload"/>
			</label>
		</div>
	);
}

// BottomNavigation
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FolderSpecialIcon from '@material-ui/icons/FolderSpecial';
import BookmarksIcon from '@material-ui/icons/Bookmarks';

const MyBottomNavigation = () => {
	const [value, setValue] = React.useState(0);
	return (
		<BottomNavigation
			value={value}
			onChange={(event, newValue) =>{
				setValue(newValue);
			}}
			showLabels
		>
			<BottomNavigationAction label="Favorite" icon={<FavoriteIcon/>} />
			<BottomNavigationAction label="Folder" icon={<FolderSpecialIcon/>} />
			<BottomNavigationAction label="Bookmarks" icon={<BookmarksIcon/>} />
		</BottomNavigation>
	)
}

//import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
//import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
	},
	button: {
		marginTop: theme.spacing(1),
		marginRight: theme.spacing(1),
	},
	actionsContainer: {
		marginBottom: theme.spacing(2),
	},
	resetContainer: {
		padding: theme.spacing(3),
	},
}));

function getSteps() {
	return ['画像をアップロード', '4点を選択', '画像を処理'];
}

function getStepContent(step) {
	switch (step) {
		case 0:
			return (
				<div>
					<p>処理を行ないたい画像をアップロードして下さい。</p>
					<UploadPhotoButton/>
				</div>
			);
		case 1:
			return (
				<p>画像補正のために、画像の頂点をマウスで選択して下さい。</p>
			);
		case 2:
			return (
				<div>
					<p>処理を行なっています。しばらくお待ち下さい。</p>
					<MyMap />
				</div>
			);
		default:
			return 'Unknown step';
	}
}

export default function VerticalLinearStepper() {
	const classes = useStyles();
	const [activeStep, setActiveStep] = React.useState(0);
	const steps = getSteps();

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleReset = () => {
		setActiveStep(0);
	};

	return (
		<div className={classes.root}>
			<Stepper activeStep={activeStep} orientation="vertical">
				{steps.map((label, index) => (
					<Step key={label}>
						<StepLabel>{label}</StepLabel>
						<StepContent>
							<div>{getStepContent(index)}</div>
							<div className={classes.actionsContainer}>
								<div>
									<Button
										disabled={activeStep === 0}
										onClick={handleBack}
										className={classes.button}
									>
										Back
									</Button>
									<Button
										variant="contained"
										color="primary"
										onClick={handleNext}
										className={classes.button}
									>
										{activeStep === steps.length - 1 ? 'Finish' : 'Next'}
									</Button>
								</div>
							</div>
						</StepContent>
					</Step>
				))}
			</Stepper>
			{activeStep === steps.length && (
				<Paper square elevation={0} className={classes.resetContainer}>
					<Typography>All steps completed - you&apos;re finished</Typography>
					<Button onClick={handleReset} className={classes.button}>
						Reset
					</Button>
				</Paper>
			)}
		</div>
	);
}

ReactDOM.render(<App />, document.getElementById("app"));


// react-leaflet
import Leaflet from "leaflet";
//import "../node_modules/leaflet/dist/leaflet.css";
import {MapContainer, TileLayer} from "react-leaflet";

const MapComponents = () => {
	const osmAttribution = '© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors';
	const osmDefaultUrl = "https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png";
	const position = [34.9, 136.5];

	return (
		<MapContainer center={position} zoom={10} style={{height: "500px"}}>
			<TileLayer attribution={osmAttribution} url={osmDefaultUrl}/>
		</MapContainer>
	);
}

const MyMap = () => {
	return (
		<MapComponents/>
	);
}

//ReactDOM.render(<MyMap />, document.getElementById("map"));
