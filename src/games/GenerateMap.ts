import { images } from "./Images";

type Tile = "empty" | "main" | "tree" | "wall" | "grass";


export const MAP_W = 20;
export const MAP_H = 10;


let range = (size:number) => {
    return [...Array(size).keys()]
}

let random = (max:number) => {
    return Math.floor(Math.random() * max)
}


export const map: Tile[][] = range(MAP_H).map(() =>
    range(MAP_W).map(() => "empty")
);

 for (let y = 0; y < MAP_H; y++) {
    for (let x = 0; x < MAP_W; x++) {
       map[y][x] = "main"
       map[random(3)][random(5)] = "grass"
    }
}