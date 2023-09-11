import { useEffect, useState } from 'react';
import { Stage } from '@pixi/react';
import { Ground, Clouds, Wrapper, WalkingDino, DefaultDino } from '@/components';
import { VIEW_PORT_WIDTH, TWO_THIRD_VIEW_PORT_WIDTH } from '@/global/constants';
import { ComponentBuilderProps } from '@/global/interfaces';

function App() {
	const [start, setStart] = useState(false);

	const cloudsBuilder = ({ key, xPos, update }: ComponentBuilderProps): JSX.Element => {
		return <Clouds key={key} xPos={xPos} update={update} />;
	};

	useEffect(() => {
		document.addEventListener('keydown', (e: KeyboardEvent) => {
			const keyCode = e.code;
			if ((keyCode === 'Space' || keyCode === 'ArrowUp') && !start) {
				setStart(true);
			}
		});
	}, []);

	// const handleKeyDown = (e: React.KeyboardEvent) => {
	// 	console.log(e);
	// };

	return (
		<Stage width={VIEW_PORT_WIDTH} height={400} options={{ antialias: true, background: '#ffffff' }}>
			<Wrapper componentBuilder={cloudsBuilder} total={3} width={TWO_THIRD_VIEW_PORT_WIDTH} />
			<DefaultDino visible={!start} />
			<WalkingDino visible={start} />
			<Ground />
		</Stage>
	);
}

export default App;
