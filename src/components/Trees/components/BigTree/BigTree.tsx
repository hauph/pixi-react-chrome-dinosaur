import { FC, useMemo } from 'react';
import { Sprite } from '@pixi/react';
import { Texture, Rectangle, BaseTexture } from 'pixi.js';
import SpriteImage from '@/assets/sprite.png';
import { TREE_TYPE, BIG_TREE_WIDTH } from '@/global/enums';

interface BigTreeProps {
	x: number;
	y: number;
	treeType: number;
}

const baseTexture = new BaseTexture(SpriteImage);

export const BigTree: FC<BigTreeProps> = ({ x, y, treeType }) => {
	const cropRect = useMemo(() => {
		let rectX = 650;
		let rectY = 0;
		let rectW = BIG_TREE_WIDTH.WIDTH_50;
		let rectH = 100;

		if (treeType === TREE_TYPE.TYPE_1) {
			rectX = 750;
			rectY = 0;
			rectW = BIG_TREE_WIDTH.WIDTH_50;
			rectH = 100;
		} else if (treeType === TREE_TYPE.TYPE_2) {
			rectX = 847;
			rectY = 0;
			rectW = BIG_TREE_WIDTH.WIDTH_104;
			rectH = 100;
		}

		return new Rectangle(rectX, rectY, rectW, rectH);
	}, [treeType]);

	const croppedTexture = useMemo(() => {
		return new Texture(baseTexture, cropRect);
	}, [cropRect]);

	return <Sprite texture={croppedTexture} x={x} y={y} />;
};
