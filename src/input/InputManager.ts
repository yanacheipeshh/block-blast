import { Point } from '../utils/Types';

export class InputManager {
    private canvas: HTMLCanvasElement;
    public onDragStart: (pos: Point) => void = () => {};
    public onDragMove: (pos: Point) => void = () => {};
    public onDragEnd: () => void = () => {};

    constructor(canvasId: string) {
        this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
        this.initListeners();
    }

    private initListeners(): void {
        this.canvas.addEventListener('pointerdown', (e) => {
            const pos = this.getCanvasPosition(e);
            this.onDragStart(pos);
        });

        this.canvas.addEventListener('pointermove', (e) => {
            const pos = this.getCanvasPosition(e);
            this.onDragMove(pos);
        });

        this.canvas.addEventListener('pointerup', () => {
            this.onDragEnd();
        });
    }

    private getCanvasPosition(e: PointerEvent): Point {
        const rect = this.canvas.getBoundingClientRect();
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    }
}