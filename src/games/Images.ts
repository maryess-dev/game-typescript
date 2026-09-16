import playerImage from "../assets/game/Tiles/tile_0000.png";
import treeImage from "../assets/game/Tiles/tile_0004.png"
import grassImage from "../assets/game/Tiles/tile_0001.png"


export const images = {
    main: new Image(),
    tree: new Image(),
    wall: new Image(),
    grass: new Image()
};

images.main.src = playerImage;
images.tree.src = treeImage;
images.wall.src = playerImage;
images.grass.src = grassImage;
