import { FC, useEffect, useState, useRef } from 'react';
import { Container, useTick } from '@pixi/react';
import { WalkingDino, DefaultDino } from './components';

interface DinoProps {
	gameSpeed: number;
}

enum JUMP_STAGE {
	DEFAULT = 0,
	START = 1,
	END = 2,
}

export const Dino: FC<DinoProps> = ({ gameSpeed }) => {
	const [jump, setJump] = useState<number>(JUMP_STAGE.DEFAULT);
	const [dinoYPos, setDinoYPos] = useState(230);

	const jumpRef = useRef<number>(jump);

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
				const newYPos = dinoYPos - 10;
				setDinoYPos(newYPos);
				if (newYPos <= 0) {
					setJump(JUMP_STAGE.END);
				}
			} else if (jump === JUMP_STAGE.END) {
				const newYPos = dinoYPos + 10;
				setDinoYPos(newYPos);
				if (newYPos >= 230) {
					setJump(JUMP_STAGE.DEFAULT);
				}
			}
		}
	});

	return (
		<Container>
			<DefaultDino visible={gameSpeed === 0 || jump !== JUMP_STAGE.DEFAULT} yPos={dinoYPos} />
			<WalkingDino visible={gameSpeed > 0 && jump === JUMP_STAGE.DEFAULT} gameSpeed={gameSpeed} />
		</Container>
	);
};
