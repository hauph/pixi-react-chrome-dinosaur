import { FC } from 'react';
import { BigTree, SmallTree } from './components';
import { Container } from '@pixi/react';

export const Trees: FC = () => {
	return (
		<Container position={[0, 0]}>
			<BigTree x={50} y={230} treeType={0} />
			<SmallTree x={10} y={255} treeType={0} />
		</Container>
	);
};
