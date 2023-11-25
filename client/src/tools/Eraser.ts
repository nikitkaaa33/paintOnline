/* eslint-disable @typescript-eslint/no-useless-constructor */
import Brush from "./Brush";

export default class Eraser extends Brush {
	constructor(canvas: any, socket: any, id: any) {
		super(canvas, socket, id);
	}

	draw(x: number, y: number) {
		this.ctx.strokeStyle = "white";
		this.ctx.lineTo(x, y);
		this.ctx.stroke();
	}
}
