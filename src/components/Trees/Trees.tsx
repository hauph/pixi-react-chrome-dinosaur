import { FC, useState, useMemo, useEffect, useCallback } from 'react';
import { BigTree, SmallTree } from './components';
import { Container, useTick, Graphics, Text } from '@pixi/react';
import { TREE_STATUS, TREE_TYPE, SMALL_TREE_WIDTH, BIG_TREE_WIDTH } from '@/global/enums';
import { ComponentBuilderProps } from '@/global/interfaces';
import { random, getGameSpeedFromSessionStorage, createXY } from '@/global/utils';
import { TOTAL_TREES, HALF_VIEW_PORT_WIDTH } from '@/global/constants';

type TreesProps = Omit<ComponentBuilderProps, 'key'>;

export const Trees: FC<TreesProps> = ({ xPos, update }) => {
	const [isSmallTree] = useState(Math.floor(random(2)));
	const [xContainer, setXContainer] = useState(xPos);
	const [trees, setTrees] = useState<JSX.Element[]>([]);
	const [memory, setMemory] = useState<number[]>([]);
	const [gSpeed, setGSpeed] = useState(0);

	const treeType = useMemo(() => {
		if (isSmallTree === TREE_STATUS.SMALL) {
			return Math.floor(random(4));
		}
		return Math.floor(random(3));
	}, []);

	const treeWidth = useMemo(() => {
		if (isSmallTree === TREE_STATUS.SMALL) {
			if (treeType === TREE_TYPE.TYPE_0 || treeType === TREE_TYPE.TYPE_3) {
				return SMALL_TREE_WIDTH.WIDTH_37;
			}
			return SMALL_TREE_WIDTH.WIDTH_35;
		} else {
			if (treeType === TREE_TYPE.TYPE_2) {
				return BIG_TREE_WIDTH.WIDTH_104;
			}
			return BIG_TREE_WIDTH.WIDTH_50;
		}
	}, []);

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

		const newTrees = Array.from({ length: TOTAL_TREES }, (_, i) => {
			const x = createXY(memoArrayX, xPos || 100, xPos + HALF_VIEW_PORT_WIDTH, treeWidth);

			if (i === TOTAL_TREES - 1) {
				const sortedMemoArrayX = memoArrayX.sort((a, b) => a - b);
				setMemory(sortedMemoArrayX);
			}

			return isSmallTree === TREE_STATUS.SMALL ? (
				<SmallTree key={i} x={x} y={250} treeType={treeType} />
			) : (
				<BigTree key={i} x={x} y={225} treeType={treeType} />
			);
		});

		setTrees(newTrees.sort((a, b) => a.props.x - b.props.x));
	}, []);

	useTick(() => {
		setXContainer(xContainer - gSpeed);
	}, gSpeed > 0);

	useEffect(() => {
		if (memory.length === 0) return;

		// @ts-ignore
		const containerIsInViewport = xContainer + memory.at(-1) + treeWidth > 0;

		if (!containerIsInViewport) {
			update();
		}
	}, [xContainer]);

	return <Container position={[xContainer, 0]}>{trees}</Container>;
};
