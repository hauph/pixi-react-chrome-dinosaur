import { Container as PixiContainer, DisplayObject as PixiDisplayObject } from '@pixi/display';

export interface ComponentBuilderProps {
    key: string;
    xPos: number;
    update: () => void;
}

export interface AppContextTypes {
    detectCollision: (ref: PixiObject) => void;
    gameOver: boolean;
}

export type PixiObject = PixiContainer<PixiDisplayObject>