import { BoardMatrix } from '../utils/Types';
import { GRID_SIZE } from '../utils/Constants';

export class Board {
    private grid: BoardMatrix;

    constructor() {
        this.grid = this.createEmptyGrid();
    }

    public createEmptyGrid(): BoardMatrix {
        return Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(0));
    }

    public getGrid(): BoardMatrix {
        return this.grid;
    }

    public canPlaceShape(shapeMatrix: number[][], startRow: number, startCol: number): boolean {
        for (let r = 0; r < shapeMatrix.length; r++) {
            for (let c = 0; c < shapeMatrix[r].length; c++) {
                if (shapeMatrix[r][c] === 1) {
                    const targetRow = startRow + r;
                    const targetCol = startCol + c;

                    // Вихід за межі поля 8х8
                    if (targetRow < 0 || targetRow >= GRID_SIZE || targetCol < 0 || targetCol >= GRID_SIZE) {
                        return false;
                    }
                    // Якщо клітинка вже зайнята іншим блоком
                    if (this.grid[targetRow][targetCol] !== 0) {
                        return false;
                    }
                }
            }
        }

        return true;
    }

    public placeShape(shapeMatrix: number[][], startRow: number, startCol: number, color: string): void {
        for (let r = 0; r < shapeMatrix.length; r++) {
            for (let c = 0; c < shapeMatrix[r].length; c++) {
                if (shapeMatrix[r][c] === 1) {
                    this.grid[startRow + r][startCol + c] = color;
                }
            }
        }
    }

    public clearCompletedLines(): number {
        let linesCleared = 0;
        const rowsToClear: number[] = [];
        const colsToClear: number[] = [];

        for (let r = 0; r < GRID_SIZE; r++) {
            if (this.grid[r].every(cell => cell !== 0)) {
                rowsToClear.push(r);
            }
        }

        for (let c = 0; c < GRID_SIZE; c++) {
            let isColFull = true;
            for (let r = 0; r < GRID_SIZE; r++) {
                if (this.grid[r][c] === 0) {
                    isColFull = false;
                    break;
                }
            }

            if (isColFull) {
                colsToClear.push(c);
            }
        }

        rowsToClear.forEach(r => {
            this.grid[r].fill(0);
            linesCleared++;
        });

        colsToClear.forEach(c => {
            for (let r = 0; r < GRID_SIZE; r++) {
                this.grid[r][c] = 0;
            }
            linesCleared++;
        });

        return linesCleared;
    }
}