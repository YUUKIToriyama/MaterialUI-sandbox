/* main.js */
import React from "react";
import ReactDOM from "react-dom";
//import "./style.css";

// Material-UI
import Button from "@material-ui/core/Button";

const App = () => {
	return (
		<div>
			<Button variant="outlined" color="primary" href="https://google.co.jp">
				click!
			</Button>
			<UploadButton/>
			<ButtonWithIcon icon={<SaveIcon/>} title="Save"/>
			<UploadPhotoButton/>
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

ReactDOM.render(<App />, document.getElementById("button"));
