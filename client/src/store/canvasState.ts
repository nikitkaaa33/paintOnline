import { makeAutoObservable } from "mobx";

class CanvasState {
	canvas?: HTMLCanvasElement | null = null;
	socket = null;
	sessionid = null;
	undoList: string[] = [];
	redoList: string[] = [];
	username: string = "";

	constructor() {
		makeAutoObservable(this);
	}

	setCanvas(canvas: HTMLCanvasElement) {
		this.canvas = canvas;
	}

	setSocket(socket: any) {
		this.socket = socket;
	}

	setSessionId(id: any) {
		this.sessionid = id;
	}

	setUsername(username: string) {
		this.username = username;
	}

	pushToUndo(data: string) {
		this.undoList.push(data);
	}

	pushToRedo(data: string) {
		this.redoList.push(data);
	}

	undo() {
		let ctx = this.canvas?.getContext("2d");
		if (this.undoList.length > 0) {
			let dataUrl = this.undoList.pop();
			this.redoList.push(this.canvas?.toDataURL() as string);
			let img = new Image();
			img.src = dataUrl as string;
			img.onload = () => {
				ctx?.clearRect(
					0,
					0,
					this.canvas?.width as number,
					this.canvas?.height as number
				);
				ctx?.drawImage(
					img,
					0,
					0,
					this.canvas?.width as number,
					this.canvas?.height as number
				);
			};
		} else {
			ctx?.clearRect(
				0,
				0,
				this.canvas?.width as number,
				this.canvas?.height as number
			);
		}
	}

	redo() {
		let ctx = this.canvas?.getContext("2d");
		if (this.redoList.length > 0) {
			let dataUrl = this.redoList.pop();
			this.undoList.push(this.canvas?.toDataURL() as string);
			let img = new Image();
			img.src = dataUrl as string;
			img.onload = () => {
				ctx?.clearRect(
					0,
					0,
					this.canvas?.width as number,
					this.canvas?.height as number
				);
				ctx?.drawImage(
					img,
					0,
					0,
					this.canvas?.width as number,
					this.canvas?.height as number
				);
			};
		} else {
			ctx?.clearRect(
				0,
				0,
				this.canvas?.width as number,
				this.canvas?.height as number
			);
		}
	}
}

export default new CanvasState();
