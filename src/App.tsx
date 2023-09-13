import { useEffect, useState } from 'react';
import { Stage } from '@pixi/react';
import { Ground, Clouds, Wrapper, Dino, Trees } from '@/components';
import { VIEW_PORT_WIDTH, TWO_THIRD_VIEW_PORT_WIDTH } from '@/global/constants';
import { ComponentBuilderProps } from '@/global/interfaces';
import {
	setGameSpeedToSessionStorage,
	getGameSpeedFromSessionStorage,
	removeGameSpeedFromSessionStorage,
} from '@/global/utils';

function App() {
	const [gameSpeed, setGameSpeed] = useState(0);

	const cloudsBuilder = ({ key, xPos, update }: ComponentBuilderProps): JSX.Element => {
		return <Clouds key={key} xPos={xPos} update={update} />;
	};

	useEffect(() => {
		const gameSpeed = getGameSpeedFromSessionStorage();
		if (gameSpeed > 0) {
			removeGameSpeedFromSessionStorage();
		}

		document.addEventListener(
			'keydown',
			(e: KeyboardEvent) => {
				const keyCode = e.code;
				if ((keyCode === 'Space' || keyCode === 'ArrowUp') && !gameSpeed) {
					setGameSpeed(3);
					setGameSpeedToSessionStorage(3);
				}
			},
			{ once: true }
		);
	}, []);

	// useEffect(() => {
	// 	if (gameSpeed > 0) {
	// 		setInterval(() => {
	// 			const newGameSpeed = gameSpeed + 3;
	// 			setGameSpeed(newGameSpeed);
	// 			setGameSpeedToSessionStorage(newGameSpeed);
	// 		}, 3000);
	// 	}
	// }, [gameSpeed]);

	return (
		<Stage width={VIEW_PORT_WIDTH} height={400} options={{ antialias: true, background: '#ffffff' }}>
			{/* <Wrapper componentBuilder={cloudsBuilder} total={3} width={TWO_THIRD_VIEW_PORT_WIDTH} />
			<Dino gameSpeed={gameSpeed} /> */}
			<Trees />
			<Ground gameSpeed={gameSpeed} />
		</Stage>
	);
}

export default App;
