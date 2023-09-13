import React, { useState, useEffect } from 'react';
import { Container, useTick } from '@pixi/react';
import { Cloud } from './components';
import { random, getGameSpeedFromSessionStorage } from '@/global/utils';
import { TWO_THIRD_VIEW_PORT_WIDTH, CLOUD_WIDTH, TOTAL_CLOUDS } from '@/global/constants';
import { ComponentBuilderProps } from '@/global/interfaces';

type CloudsProps = Omit<ComponentBuilderProps, 'key'>;

function randomXY(max: number) {
	return random(max);
}

function createXY(array: number[], max: number) {
	let value = randomXY(max);

	if (array.length === 2) {
		const [first, second] = array;
		if (first > second) {
			value = first + CLOUD_WIDTH;
		} else {
			value = second + CLOUD_WIDTH;
		}
	}

	array.push(value);
	return value;
}

export const Clouds: React.FC<CloudsProps> = ({ xPos, update }) => {
	const [xContainer, setXContainer] = useState(xPos);
	const [clouds, setClouds] = useState<JSX.Element[]>([]);
	const [memory, setMemory] = useState<number[]>([]);
	const [gSpeed, setGSpeed] = useState(0);

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

		const newClouds = Array.from({ length: TOTAL_CLOUDS }, (_, i) => {
			const x = createXY(memoArrayX, TWO_THIRD_VIEW_PORT_WIDTH);
			const y = createXY(memoArrayY, 200) > 200 ? createXY(memoArrayY, 200) : createXY(memoArrayY, 200);

			if (i === TOTAL_CLOUDS - 1) {
				setMemory(memoArrayX.sort((a, b) => a - b));
			}

			return <Cloud key={i} x={x} y={y} />;
		});

		setClouds(newClouds);
	}, []);

	useTick(() => {
		setXContainer(xContainer - gSpeed);
	}, gSpeed > 0);

	useEffect(() => {
		if (memory.length === 0) return;

		// @ts-ignore
		const containerIsInViewport = xContainer + memory.at(-1) + CLOUD_WIDTH > 0;

		if (!containerIsInViewport) {
			update();
		}
	}, [xContainer]);

	return <Container position={[xContainer, 0]}>{clouds}</Container>;
};
