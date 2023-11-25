import Tool from "./Tools";

export default class Brush extends Tool {
	mouseDown: boolean = false;
	socket!: WebSocket | null;
	id!: string | null;

	constructor(
		canvas: HTMLCanvasElement | null,
		socket: WebSocket | null,
		id: string | null
	) {
		super(canvas, socket, id);
		this.listen();
	}

	listen() {
		this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
		this.canvas.onmousedown = this.mouseDownHandler.bind(this);
		this.canvas.onmouseup = this.mouseUpHandler.bind(this);
	}

	mouseUpHandler(e: any) {
		this.mouseDown = false;
		if (this.socket && this.socket.readyState === WebSocket.OPEN) {
			this.socket.send(
				JSON.stringify({
					method: "draw",
					id: this.id,
					figure: {
						type: "finish",
					},
				})
			);
		}
	}
	mouseDownHandler(e: {
		pageX: number;
		target: { offsetLeft: number; offsetTop: number };
		pageY: number;
	}) {
		this.mouseDown = true;
		this.ctx.beginPath();
		this.ctx.moveTo(
			e.pageX - e.target.offsetLeft,
			e.pageY - e.target.offsetTop
		);
	}
	mouseMoveHandler(e: {
		pageX: number;
		target: { offsetLeft: number; offsetTop: number };
		pageY: number;
	}) {
		if (this.mouseDown) {
			if (
				this.mouseDown &&
				this.socket &&
				this.socket.readyState === WebSocket.OPEN
			) {
				this.socket.send(
					JSON.stringify({
						method: "draw",
						id: this.id,
						figure: {
							type: "brush",
							x: e.pageX - e.target.offsetLeft,
							y: e.pageY - e.target.offsetTop,
						},
					})
				);
			}
			// this.draw(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop)
		}
	}

	static draw(
		ctx: { lineTo: (arg0: any, arg1: any) => void; stroke: () => void },
		x: any,
		y: any
	) {
		ctx.lineTo(x, y);
		ctx.stroke();
	}
}
