import React, { useState, useEffect } from 'react';
import { Container, useTick } from '@pixi/react';
import { Cloud } from './components';
import { getGameSpeedFromSessionStorage, createXY } from '@/global/utils';
import { HALF_VIEW_PORT_WIDTH, CLOUD_WIDTH, TOTAL_CLOUDS } from '@/global/constants';
import { ComponentBuilderProps } from '@/global/interfaces';

type CloudsProps = Omit<ComponentBuilderProps, 'key'>;

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
			const x = createXY(memoArrayX, xPos, xPos + HALF_VIEW_PORT_WIDTH, CLOUD_WIDTH);
			const y = createXY(memoArrayY, 0, 200, CLOUD_WIDTH) > 200 ? 200 : createXY(memoArrayY, 0, 200, CLOUD_WIDTH);

			if (i === TOTAL_CLOUDS - 1) {
				setMemory(memoArrayX.sort((a, b) => a - b));
			}

			return <Cloud key={i} x={x} y={y} />;
		});

		setClouds(newClouds.sort((a, b) => a.props.x - b.props.x));
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
