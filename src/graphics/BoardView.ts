import { BoardMatrix } from '../utils/Types';
import { CELL_SIZE, GRID_SIZE } from '../utils/Constants';

export class BoardView {
    // Метод для малювання дошки
    public static render(ctx: CanvasRenderingContext2D, grid: BoardMatrix): void {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        for (let r = 0; r < GRID_SIZE; r++) {
            for (let c = 0; c < GRID_SIZE; c++) {
                const cellValue = grid[r][c];
                const x = c * CELL_SIZE;
                const y = r * CELL_SIZE;

                // Якщо клітинка зайнята — малюємо кольоровий блок, якщо ні — сіру пусту клітинку
                if (cellValue !== 0) {
                    ctx.fillStyle = cellValue as string; // Тут зберігається колір
                    ctx.fillRect(x + 2, y + 2, CELL_SIZE - 4, CELL_SIZE - 4);
                } else {
                    ctx.fillStyle = '#2a2a2a'; // Колір пустої клітинки
                    ctx.fillRect(x + 2, y + 2, CELL_SIZE - 4, CELL_SIZE - 4);
                    
                    // Легкий контур навколо пустої клітинки
                    ctx.strokeStyle = '#333333';
                    ctx.strokeRect(x + 2, y + 2, CELL_SIZE - 4, CELL_SIZE - 4);
                }
            }
        }
    }
}