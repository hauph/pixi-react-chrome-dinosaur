export function random(max: number, min = 0) {
    return Math.random() * (max - min) + min;
}

export function setGameSpeedToSessionStorage(speed: number) {
    sessionStorage.setItem('gameSpeed', speed.toString());
}

export function getGameSpeedFromSessionStorage() {
    const gameSpeed = sessionStorage.getItem('gameSpeed');
    return gameSpeed === null ? 0 : parseInt(gameSpeed);
}

export function removeGameSpeedFromSessionStorage() {
    sessionStorage.removeItem('gameSpeed');
}