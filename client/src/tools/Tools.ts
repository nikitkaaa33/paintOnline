export default class Tool {
	canvas: any;
	ctx: any;
	constructor(canvas: any, socket: any, id: any) {
		this.canvas = canvas;
		this.ctx = canvas.getContext("2d");
		this.destroyEvents();
	}

	set fillColor(color: any) {
		this.ctx.fillStyle = color;
	}

	set strokeColor(color: any) {
		this.ctx.strokeStyle = color;
	}

	set lineWidth(color: any) {
		this.ctx.lineWidth = color;
	}

	destroyEvents() {
		this.canvas.onmousemove = null;
		this.canvas.onmousemove = null;
		this.canvas.onmousemove = null;
	}
}
