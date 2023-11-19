import { FC, useMemo, useRef, useContext } from 'react';
import { Sprite, useTick } from '@pixi/react';
import { Texture, Rectangle, BaseTexture } from 'pixi.js';
import SpriteImage from '@/assets/sprite.png';
import { TREE_TYPE, SMALL_TREE_WIDTH } from '@/global/enums';
import { AppContext } from '@/global/context';

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
		let rectW = SMALL_TREE_WIDTH.WIDTH_37;
		let rectH = 100;

		if (treeType === TREE_TYPE.TYPE_1) {
			rectX = 511;
			rectY = 0;
			rectW = SMALL_TREE_WIDTH.WIDTH_35;
			rectH = 100;
		} else if (treeType === TREE_TYPE.TYPE_2) {
			rectX = 580;
			rectY = 0;
			rectW = SMALL_TREE_WIDTH.WIDTH_35;
			rectH = 100;
		} else if (treeType === TREE_TYPE.TYPE_3) {
			rectX = 613;
			rectY = 0;
			rectW = SMALL_TREE_WIDTH.WIDTH_37;
			rectH = 100;
		}

		return new Rectangle(rectX, rectY, rectW, rectH);
	}, [treeType]);

	const croppedTexture = useMemo(() => {
		return new Texture(baseTexture, cropRect);
	}, [cropRect]);

	const treeRef = useRef(null);

	const appContext = useContext(AppContext);

	useTick(() => {
		if (treeRef.current && appContext) {
			appContext.detectCollision(treeRef.current);
		}
	});

	return <Sprite texture={croppedTexture} x={x} y={y} ref={treeRef} />;
};
