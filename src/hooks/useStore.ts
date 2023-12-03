import { useState } from 'react';

export const useStore = () => {
    const [gameOver, setGameOver] = useState(false);
    const [cloudXPositions, setCloudXPositions] = useState<number[]>([]);
    const [treeXPositions, setTreeXPositions] = useState<number[]>([]);
    const [birdXPositions, setBirdXPositions] = useState<number[]>([]);

    const updateCloudXPositions = (xPos: number[]) => {
        setCloudXPositions(xPos);
    };

    const updateTreeXPositions = (xPos: number[]) => {
        setTreeXPositions(xPos);
    };

    const updateBirdXPositions = (xPos: number[]) => {
        setBirdXPositions(xPos);
    };

    return {
        gameOver,
        setGameOver,
        cloudXPositions,
        updateCloudXPositions,
        treeXPositions,
        updateTreeXPositions,
        birdXPositions,
        updateBirdXPositions
    }
}