import { BoardMatrix } from '../utils/Types';
import { BoardView } from './BoardView';
import { CELL_SIZE, GRID_SIZE } from '../utils/Constants';

export class Renderer {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    constructor(canvasId: string) {
        this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
        this.canvas.width = GRID_SIZE * CELL_SIZE;
        this.canvas.height = GRID_SIZE * CELL_SIZE;
        this.ctx = this.canvas.getContext('2d')!;
    }

    public drawBoard(grid: BoardMatrix): void {
        BoardView.render(this.ctx, grid);
    }
}