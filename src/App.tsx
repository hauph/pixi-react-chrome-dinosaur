import { useState, useEffect } from 'react';
import { Game } from '@/components';

function App() {
	const [shouldRestart, setShouldRestart] = useState(false);

	useEffect(() => {
		if (shouldRestart) {
			setShouldRestart(false);
		}
	}, [shouldRestart]);

	return !shouldRestart ? <Game restartGame={() => setShouldRestart(true)} /> : null;
}

export default App;
