import { useState } from 'react';
import { TilingSprite, Container, useTick } from '@pixi/react';
import SpriteImage from '@/assets/sprite.png';
import { VIEW_PORT_WIDTH } from '@/global/constants';

export const Ground = () => {
	const [xBackground, setXBackground] = useState(-1);
	const [baseNumber, setBaseNumber] = useState(10);
	const [start, setStart] = useState(true);

	// useTick((delta) => {
	// 	setXBackground(xBackground - baseNumber);
	// }, start);

	return (
		<Container position={[0, 300]}>
			<TilingSprite
				width={VIEW_PORT_WIDTH}
				height={25}
				image={SpriteImage}
				tilePosition={{ x: xBackground, y: 158 }}
			/>
		</Container>
	);
};
