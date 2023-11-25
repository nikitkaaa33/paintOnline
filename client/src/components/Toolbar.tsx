import React from "react";
import "../styles/toolbar.scss";
import toolState from "../store/toolState";
import Brush from "../tools/Brush";
import canvasState from "../store/canvasState";
import Rect from "../tools/Rect";
import Eraser from "../tools/Eraser";
import Circle from "../tools/Circle";

const Toolbar = () => {
	const changeColor = (e: any) => {
		toolState.setStrokeColor(e.target.value);
		toolState.setFillColor(e.target.value);
	};

	const download = () => {
		const dataUrl = canvasState.canvas?.toDataURL();
	};

	return (
		<div className="toolbar">
			<button
				className="toolbar__btn brush"
				onClick={() =>
					toolState.setTool(
						new Brush(
							canvasState.canvas ?? null,
							canvasState.socket,
							canvasState.sessionid
						)
					)
				}
			></button>
			<button
				className="toolbar__btn rect"
				onClick={() =>
					toolState.setTool(
						new Rect(
							canvasState.canvas,
							canvasState.socket,
							canvasState.sessionid
						)
					)
				}
			></button>
			<button className="toolbar__btn circle" />
			<button
				className="toolbar__btn eraser"
				onClick={() =>
					toolState.setTool(
						new Eraser(
							canvasState.canvas,
							canvasState.socket,
							canvasState.sessionid
						)
					)
				}
			></button>
			<button className="toolbar__btn line"></button>
			<input
				onChange={(e) => changeColor(e)}
				style={{ marginLeft: 10 }}
				type="color"
			/>
			<button
				className="toolbar__btn undo"
				onClick={() => canvasState.undo()}
			></button>
			<button
				className="toolbar__btn redo"
				onClick={() => canvasState.redo()}
			></button>
			<button className="toolbar__btn save"></button>
		</div>
	);
};

export default Toolbar;
