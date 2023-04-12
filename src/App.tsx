import { Stage, Graphics } from '@pixi/react';

function App() {
	return (
		<div>
			<Stage width={480} height={640} options={{ antialias: true, background: '#000000' }}>
				<Graphics
					draw={(g) => {
						g.beginFill(0xff3300);
						g.lineStyle(4, 0xffd900, 1);

						g.moveTo(50, 50);
						g.lineTo(250, 50);
						g.lineTo(100, 100);
						g.lineTo(50, 50);
						g.endFill();

						g.lineStyle(2, 0x0000ff, 1);
						g.beginFill(0xff700b, 1);
						g.drawRect(50, 250, 120, 120);

						g.lineStyle(2, 0xff00ff, 1);
						g.beginFill(0xff00bb, 0.25);
						g.drawRoundedRect(150, 450, 300, 100, 15);
						g.endFill();

						g.lineStyle(0);
						g.beginFill(0xffff0b, 0.5);
						g.drawCircle(470, 90, 60);
						g.endFill();
					}}
				/>
			</Stage>
		</div>
	);
}

export default App;
