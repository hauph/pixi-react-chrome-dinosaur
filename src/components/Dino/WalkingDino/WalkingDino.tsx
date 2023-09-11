import { FC, useEffect, useState } from 'react';
import { AnimatedSprite, Container, useTick } from '@pixi/react';
import { Texture, Resource, Assets } from 'pixi.js';

interface WalkingDinoProps {
	visible: boolean;
}

export const WalkingDino: FC<WalkingDinoProps> = ({ visible }) => {
	const [frames, setFrames] = useState<Texture<Resource>[]>([]);
	const [xContainer, setXContainer] = useState(0);

	// useTick((delta) => {
	// 	setXBackground(xBackground - baseNumber);
	// }, start);

	useEffect(() => {
		Assets.load('./walking-dino.json').then((data) => {
			const textures = data.textures;
			setFrames(
				Object.keys(textures).map((key: string) => {
					return textures[key];
				})
			);
		});
	}, []);

	if (frames.length === 0) {
		return null;
	}

	return (
		<Container visible={visible} position={[0, 220]}>
			<AnimatedSprite animationSpeed={0.1} isPlaying={true} textures={frames} />
		</Container>
	);
};
