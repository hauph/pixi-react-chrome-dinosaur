import { useEffect, useState, useCallback, FC } from 'react';
import { Stage, Container } from '@pixi/react';
import { Ground, Clouds, Wrapper, Dino, Trees } from '@/components';
import { VIEW_PORT_WIDTH, HALF_VIEW_PORT_WIDTH } from '@/global/constants';
import { ComponentBuilderProps, PixiObject } from '@/global/interfaces';
import { AppContext } from '@/global/context';
import {
	setGameSpeedToSessionStorage,
	getGameSpeedFromSessionStorage,
	removeGameSpeedFromSessionStorage,
} from '@/global/utils';
import { GAME_SPEED } from '@/global/enums';

interface GameProps {
	restartGame: () => void;
}

export const Game: FC<GameProps> = ({ restartGame }) => {
	const [gameSpeed, setGameSpeed] = useState(0);
	const [dinoRef, setDinoRef] = useState<PixiObject | null>(null);
	const [gameOver, setGameOver] = useState(false);

	const cloudsBuilder = ({ key, xPos, update }: ComponentBuilderProps): JSX.Element => {
		return <Clouds key={key} xPos={xPos} update={update} />;
	};

	const treesBuilder = ({ key, xPos, update }: ComponentBuilderProps): JSX.Element => {
		return <Trees key={key} xPos={xPos} update={update} />;
	};

	const detectCollision = useCallback(
		(treeRef: PixiObject) => {
			if (treeRef && dinoRef) {
				const bounds1 = treeRef.getBounds();
				const bounds2 = dinoRef.getBounds();

				if (
					bounds1.x < bounds2.x + bounds2.width - 30 &&
					bounds1.x + bounds1.width - 30 > bounds2.x &&
					bounds1.y < bounds2.y + bounds2.height - 30 &&
					bounds1.y + bounds1.height - 30 > bounds2.y
				) {
					setGameSpeed(GAME_SPEED.DEFAULT);
					removeGameSpeedFromSessionStorage();
					setGameOver(true);
				}
			}
		},
		[dinoRef]
	);

	useEffect(() => {
		const gameSpeed = getGameSpeedFromSessionStorage();
		if (gameSpeed > GAME_SPEED.DEFAULT) {
			removeGameSpeedFromSessionStorage();
		}

		document.addEventListener(
			'keydown',
			(e: KeyboardEvent) => {
				const keyCode = e.code;
				if ((keyCode === 'Space' || keyCode === 'ArrowUp') && !gameOver) {
					setGameSpeed(GAME_SPEED.START);
					setGameSpeedToSessionStorage(GAME_SPEED.START);
				} else if (gameOver) {
					restartGame();
				}
			},
			{ once: true }
		);
	}, [gameOver]);

	// useEffect(() => {
	// 	let intervalID: number;

	// 	if (gameSpeed > GAME_SPEED.DEFAULT && !gameOver) {
	// 		intervalID = setInterval(() => {
	// 			const newGameSpeed = gameSpeed + GAME_SPEED.START;
	// 			setGameSpeed(newGameSpeed);
	// 			setGameSpeedToSessionStorage(newGameSpeed);
	// 		}, 3000);
	// 	}

	// 	return () => {
	// 		clearInterval(intervalID);
	// 	};
	// }, [gameSpeed, gameOver]);

	return (
		<Stage width={VIEW_PORT_WIDTH} height={400} options={{ antialias: true, background: '#ffffff' }}>
			<Container sortableChildren={true}>
				<AppContext.Provider
					value={{
						detectCollision,
						gameOver,
					}}
				>
					<Wrapper componentBuilder={cloudsBuilder} total={3} width={HALF_VIEW_PORT_WIDTH} />
					<Dino gameSpeed={gameSpeed} setRef={setDinoRef} />
					<Wrapper
						componentBuilder={treesBuilder}
						total={2}
						width={HALF_VIEW_PORT_WIDTH}
						skipFirstElement={true}
					/>
					<Ground gameSpeed={gameSpeed} />
				</AppContext.Provider>
			</Container>
		</Stage>
	);
};
