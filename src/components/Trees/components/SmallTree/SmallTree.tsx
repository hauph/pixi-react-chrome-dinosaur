import { FC, useMemo } from 'react';
import { Sprite } from '@pixi/react';
import { Texture, Rectangle, BaseTexture } from 'pixi.js';
import SpriteImage from '@/assets/sprite.png';
import { TREE_TYPE } from '@/global/enums';

interface SmallTreeProps {
	x: number;
	y: number;
	treeType: number;
}

const baseTexture = new BaseTexture(SpriteImage);

export const SmallTree: FC<SmallTreeProps> = ({ x, y, treeType }) => {
	const cropRect = useMemo(() => {
		let rectX = 440;
		let rectY = 0;
		let rectW = 37;
		let rectH = 100;

		if (treeType === TREE_TYPE.TYPE_1) {
			rectX = 511;
			rectY = 0;
			rectW = 35;
			rectH = 100;
		} else if (treeType === TREE_TYPE.TYPE_2) {
			rectX = 580;
			rectY = 0;
			rectW = 35;
			rectH = 100;
		} else if (treeType === TREE_TYPE.TYPE_3) {
			rectX = 613;
			rectY = 0;
			rectW = 37;
			rectH = 100;
		}

		return new Rectangle(rectX, rectY, rectW, rectH);
	}, [treeType]);

	const croppedTexture = useMemo(() => {
		return new Texture(baseTexture, cropRect);
	}, [cropRect]);

	return <Sprite texture={croppedTexture} x={x} y={y} />;
};
