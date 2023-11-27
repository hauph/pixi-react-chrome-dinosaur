import { FC, useEffect, useState, useRef, useContext } from 'react';
import { Container, useTick } from '@pixi/react';
import { WalkingDino, DefaultDino, DeadDino } from './components';
import { PixiObject } from '@/global/interfaces';
import { AppContext } from '@/global/context';

interface DinoProps {
	gameSpeed: number;
	setRef: (ref: PixiObject) => void;
}

enum JUMP_STAGE {
	DEFAULT = 0,
	START = 1,
	END = 2,
}

let jumpProgress = 0;

export const Dino: FC<DinoProps> = ({ gameSpeed, setRef }) => {
	const [jump, setJump] = useState<number>(JUMP_STAGE.DEFAULT);
	const [dinoYPos, setDinoYPos] = useState(230);

	const jumpRef = useRef<number>(jump);
	const containerRef = useRef<PixiObject>(null);

	const appContext = useContext(AppContext);
	const isGameOver = appContext?.gameOver || false;

	useEffect(() => {
		if (containerRef.current) {
			setRef(containerRef.current);
		}
	}, [containerRef]);

	useEffect(() => {
		jumpRef.current = jump;
	}, [jump]);

	useEffect(() => {
		document.addEventListener('keydown', (e: KeyboardEvent) => {
			const keyCode = e.code;
			if ((keyCode === 'Space' || keyCode === 'ArrowUp') && jumpRef.current === JUMP_STAGE.DEFAULT) {
				setJump(JUMP_STAGE.START);
			}
		});
	}, []);

	useTick(() => {
		if (gameSpeed > 0) {
			if (jump === JUMP_STAGE.START) {
				const newYPos = dinoYPos - 15;
				setDinoYPos(newYPos);
				if (newYPos <= 10) {
					setJump(JUMP_STAGE.END);
				}
			} else if (jump === JUMP_STAGE.END) {
				jumpProgress += 0.6;
				const newYPos = dinoYPos + jumpProgress;
				setDinoYPos(newYPos);
				if (newYPos >= 240) {
					setDinoYPos(230);
					setJump(JUMP_STAGE.DEFAULT);
					jumpProgress = 0;
				}
			}
		}
	});

	return (
		<Container ref={containerRef} position={[50, dinoYPos]} zIndex={2}>
			<DefaultDino visible={gameSpeed === 0 || jump !== JUMP_STAGE.DEFAULT || !!isGameOver} />
			<WalkingDino visible={gameSpeed > 0 && jump === JUMP_STAGE.DEFAULT} gameSpeed={gameSpeed} />
			<DeadDino visible={isGameOver === true} />
		</Container>
	);
};
