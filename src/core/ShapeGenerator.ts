import { SHAPES } from './Shape';
import { ShapeData } from '../utils/Types';

export class ShapeGenerator {
    // Генерує випадкову фігурку
    public static getRandomShape(): ShapeData {
        const randomIndex = Math.floor(Math.random() * SHAPES.length);
        const template = SHAPES[randomIndex];

        return {
            id: 'shape_' + Math.random().toString(36).substring(2, 9),
            matrix: template.matrix,
            color: template.color
        };
    }

    // Генерує одразу 3 фігурки для панелі знизу
    public static generateBatch(): ShapeData[] {
        return [
            this.getRandomShape(),
            this.getRandomShape(),
            this.getRandomShape()
        ];
    }
}