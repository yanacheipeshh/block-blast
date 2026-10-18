import { ShapeData, Point } from '../utils/Types';
import { Board } from '../core/Board';
import { CELL_SIZE } from '../utils/Constants';

export class DragController {
    private activeShape: ShapeData | null = null;
    private dragPosition: Point = { x: 0, y: 0 };
    private board: Board;

    constructor(board: Board) {
        this.board = board;
    }

    public startDrag(shape: ShapeData, pos: Point): void {
        this.activeShape = shape;
        this.dragPosition = pos;
    }

    public moveDrag(pos: Point): void {
        if (!this.activeShape) return;
        this.dragPosition = pos;
    }

    public endDrag(): { success: boolean; shape: ShapeData | null } {
        if (!this.activeShape) return { success: false, shape: null };

        const targetCol = Math.floor(this.dragPosition.x / CELL_SIZE);
        const targetRow = Math.floor(this.dragPosition.y / CELL_SIZE);

        if (this.board.canPlaceShape(this.activeShape.matrix, targetRow, targetCol)) {
            this.board.placeShape(this.activeShape.matrix, targetRow, targetCol, this.activeShape.color);
            
            const placedShape = this.activeShape;
            this.activeShape = null;
            return { success: true, shape: placedShape };
        }

        this.activeShape = null;
        return { success: false, shape: null };
    }

    public getActiveShape(): ShapeData | null {
        return this.activeShape;
    }

    public getDragPosition(): Point {
        return this.dragPosition;
    }
}