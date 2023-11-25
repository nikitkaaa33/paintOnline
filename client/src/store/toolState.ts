import { makeAutoObservable } from "mobx";

class ToolState {
	tool: any = null;

	constructor() {
		makeAutoObservable(this);
	}

	setTool(tool: any) {
		this.tool = tool;
	}

	setFillColor(color: string) {
		if (this.tool) {
			this.tool.fillColor = color;
		}
	}

	setStrokeColor(color: string) {
		if (this.tool) {
			this.tool.strokeColor = color;
		}
	}

	setLineWidth(width: string) {
		if (this.tool) {
			this.tool.lineWidth = width;
		}
	}
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new ToolState();
