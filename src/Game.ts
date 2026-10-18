import { Board } from './core/Board';
import { Renderer } from './graphics/Renderer';
import { InputManager } from './input/InputManager';
import { DragController } from './input/DragController';
import { ShapeGenerator } from './core/ShapeGenerator';
import { ShapeData } from './utils/Types';
import { GRID_SIZE, CELL_SIZE } from './utils/Constants';

export class Game {
    private board: Board;
    private renderer: Renderer;
    private inputManager: InputManager;
    private dragController: DragController;
    private availableShapes: (ShapeData | null)[] = [];

    constructor() {
        this.board = new Board();
        this.renderer = new Renderer('gameCanvas');
        this.inputManager = new InputManager('gameCanvas');
        this.dragController = new DragController(this.board);

        // Генеруємо перші 3 фігурки знизу
        this.spawnNewBatch();
        this.initGameLoop();
    }

    private spawnNewBatch(): void {
        this.availableShapes = ShapeGenerator.generateBatch();
    }

    private initGameLoop(): void {
        this.inputManager.onDragStart = (pos) => {
            // Перевіряємо, чи клікнули на якусь із фігур на панелі знизу (зона під дошкою)
            const panelY = GRID_SIZE * CELL_SIZE + 20;
            if (pos.y >= panelY) {
                const shapeIndex = Math.floor(pos.x / (GRID_SIZE * CELL_SIZE / 3));
                if (this.availableShapes[shapeIndex]) {
                    const selectedShape = this.availableShapes[shapeIndex]!;
                    this.dragController.startDrag(selectedShape, pos);
                    // Тимчасово прибираємо з панелі під час перетягування
                    this.availableShapes[shapeIndex] = null;
                }
            }
        };

        this.inputManager.onDragMove = (pos) => {
            this.dragController.moveDrag(pos);
            this.updateAndRender();
        };

        this.inputManager.onDragEnd = () => {
            const result = this.dragController.endDrag();
            
            if (result.success) {
                // Якщо вдалося поставити — очищуємо заповнені лінії
                this.board.clearCompletedLines();

                // Якщо всі 3 фігурки використані — генеруємо нові
                if (this.availableShapes.every(s => s === null)) {
                    this.spawnNewBatch();
                }
            } else if (result.shape) {
                // Якщо не вдалося поставити — повертаємо фігурку назад на панель
                const emptyIndex = this.availableShapes.indexOf(null);
                if (emptyIndex !== -1) {
                    this.availableShapes[emptyIndex] = result.shape;
                }
            }

            this.updateAndRender();
        };

        this.updateAndRender();
    }

    private drawShape(shape: ShapeData, x: number, y: number, scale: number = 1): void {
        const renderer = this.renderer as Renderer & {
            drawShape?: (shape: ShapeData, x: number, y: number, scale?: number) => void;
        };

        if (typeof renderer.drawShape === 'function') {
            renderer.drawShape(shape, x, y, scale);
        }
    }

    private updateAndRender(): void {
        // 1. Малюємо ігрове поле
        this.renderer.drawBoard(this.board.getGrid());

        // 2. Малюємо фігурки на панелі знизу
        const panelY = GRID_SIZE * CELL_SIZE + 30;
        const slotWidth = (GRID_SIZE * CELL_SIZE) / 3;

        this.availableShapes.forEach((shape, index) => {
            if (shape) {
                const slotX = index * slotWidth + slotWidth / 4;
                this.drawShape(shape, slotX, panelY, 0.6); // Зменшений масштаб для панелі
            }
        });

        // 3. Малюємо фігурку, яку гравець зараз тягне за курсором/пальцем
        const activeShape = this.dragController.getActiveShape();
        const dragPos = this.dragController.getDragPosition();
        if (activeShape) {
            this.drawShape(activeShape, dragPos.x - 40, dragPos.y - 40, 1);
        }
    }
}