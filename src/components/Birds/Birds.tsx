import React, { useState, useEffect, useContext } from 'react';
import { Container, useTick } from '@pixi/react';
import { Bird } from './components';
import { getGameSpeedFromSessionStorage, createXY } from '@/global/utils';
import { BIRD_WIDTH, TOTAL_BIRDS } from '@/global/constants';
import { ComponentBuilderProps } from '@/global/interfaces';
import { AppContext } from '@/global/context';

type BirdsProps = Omit<ComponentBuilderProps, 'key'>;

const lowestY = 250;

export const Birds: React.FC<BirdsProps> = ({ xPos, update }) => {
	const [xContainer, setXContainer] = useState(xPos);
	const [birds, setBirds] = useState<JSX.Element[]>([]);
	const [memory, setMemory] = useState<number[]>([]);
	const [gSpeed, setGSpeed] = useState(0);

	const appContext = useContext(AppContext);
	const birdXPositions = appContext?.birdXPositions || [];
	const latestBirdXPos = birdXPositions.length > 0 ? birdXPositions[birdXPositions.length - 1] : xPos;

	useEffect(() => {
		const intervalId = setInterval(() => {
			const gameSpeed = getGameSpeedFromSessionStorage();
			setGSpeed(gameSpeed);
		}, 100);

		return () => {
			clearInterval(intervalId);
		};
	}, []);

	useEffect(() => {
		const memoArrayX: number[] = [];
		const memoArrayY: number[] = [];

		const newBirds = Array.from({ length: TOTAL_BIRDS }, (_, i) => {
			const x = createXY(memoArrayX, latestBirdXPos, latestBirdXPos + 100, BIRD_WIDTH);
			const y =
				createXY(memoArrayY, 0, lowestY, BIRD_WIDTH) > lowestY
					? lowestY
					: createXY(memoArrayY, 0, lowestY, BIRD_WIDTH);

			if (i === TOTAL_BIRDS - 1) {
				const sortedMemoArrayX = memoArrayX.sort((a, b) => a - b);
				if (appContext) {
					appContext.updateBirdXPositions(sortedMemoArrayX);
				}
				setMemory(sortedMemoArrayX);
			}

			return <Bird key={x} x={x} y={y} gameSpeed={gSpeed} />;
		});

		setBirds(newBirds.sort((a, b) => a.props.x - b.props.x));
	}, []);

	useTick(() => {
		setXContainer(xContainer - gSpeed * 3);
	}, gSpeed > 0);

	useEffect(() => {
		if (memory.length === 0) return;

		// @ts-ignore
		const containerIsInViewport = xContainer + memory.at(-1) + BIRD_WIDTH > 0;

		if (!containerIsInViewport) {
			update();
		}
	}, [xContainer]);

	return <Container position={[xContainer, 0]}>{birds}</Container>;
};
