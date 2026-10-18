
export type CellState = number | string;

export type BoardMatrix = CellState[][];

export interface ShapeData {
	id: string;
	matrix: number[][]; // Двовимірний масив (наприклад, 2х2 чи 3х3 з 1 та 0)
	color: string;      // Колір фігурки
}

export interface Point {
	x: number;
	y: number;
}
