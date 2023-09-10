export function random(max: number, min = 0) {
    return Math.random() * (max - min) + min;
}