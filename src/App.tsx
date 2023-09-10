import { Stage } from '@pixi/react';
import { Ground, Clouds, Wrapper } from '@/components';
import { VIEW_PORT_WIDTH, TOTAL_CLOUDS, TWO_THIRD_VIEW_PORT_WIDTH } from '@/global/constants';
import { ComponentBuilderProps } from '@/global/interfaces';

function App() {
	const cloudsBuilder = ({ key, xPos, update }: ComponentBuilderProps): JSX.Element => {
		return <Clouds key={key} xPos={xPos} update={update} />;
	};

	return (
		<Stage width={VIEW_PORT_WIDTH} height={400} options={{ antialias: true, background: '#ffffff' }}>
			<Wrapper componentBuilder={cloudsBuilder} total={3} width={TWO_THIRD_VIEW_PORT_WIDTH} />
			<Ground />
		</Stage>
	);
}

export default App;
