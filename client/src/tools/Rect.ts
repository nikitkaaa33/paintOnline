import Tool from "./Tools";

export default class Rect extends Tool {
	[x: string]: any;
	mouseDown: boolean | undefined;
	startX!: number;
	startY!: number;
	constructor(canvas: any, socket: any, id: any) {
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
		this.socket.send(
			JSON.stringify({
				method: "draw",
				id: this.id,
				figure: {
					type: "react",
					x: this.startX,
					y: this.startY,
					width: this.width,
					height: this.height,
					color: this.ctx.fillStyle,
				},
			})
		);
	}

	mouseDownHandler(e: any) {
		this.mouseDown = true;
		this.ctx.beginPath();
		this.startX = e.pageX - e.target.offsetLeft;
		this.startY = e.pageY - e.target.offsetTop;
		this.saved = this.canvas.toDataURL();
	}

	mouseMoveHandler(e: any) {
		if (this.mouseDown) {
			let currentX = e.pageX - e.target.offsetLeft;
			let currentY = e.pageX - e.target.offsetLeft;
			this.width = currentX - this.startX;
			this.height = currentY - this.startY;
			this.draw(this.startX, this.startY, this.width, this.height);
		}
	}

	draw(x: any, y: any, w: any, h: any): any {
		const img = new Image();
		img.src = this.saved;
		img.onload = () => {
			this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
			this.ctx.drawImage(
				img,
				0,
				0,
				this.canvas.width,
				this.canvas.height
			);
			this.ctx.beginPath();
			this.ctx.rect(x, y, w, h);
			this.ctx.fill();
			this.ctx.stroke();
		};
	}

	static staticDraw(
		ctx: any,
		x: any,
		y: any,
		w: any,
		h: any,
		color: any
	): any {
		ctx.fillStyle = color;
		ctx.beginPath();
		ctx.rect(x, y, w, h);
		ctx.fill();
		ctx.stroke();
	}
}
