import characterIdleImage from "../assets/characters/sarah/pixellab-Pixel-art-sprite-sheet-of-a-25-1790427467541.png";
import characterImage from "../assets/characters/sarah/pixellab-Pixel-art-sprite-sheet-of-a-25-1790427467541.png";
import houseImage from "../assets/environment/farm-objects/House.png";
import treeImage from "../assets/environment/farm-objects/Maple Tree.png";
import roadImage from "../assets/environment/farm-objects/Road copiar.png";
import playerImage from "../assets/environment/dungeon-tiles/tile_0000.png";
import grassImage from "../assets/environment/dungeon-tiles/tile_0001.png";

export const images = {
  main: new Image(),
  tree: new Image(),
  wall: new Image(),
  grass: new Image(),
  character: new Image(),
  idleCharacter: new Image(),
  road: new Image(),
  house: new Image(),
};

images.main.src = playerImage;
images.tree.src = treeImage;
images.wall.src = playerImage;
images.grass.src = grassImage;
images.character.src = characterImage;
images.idleCharacter.src = characterIdleImage;
images.road.src = roadImage;
images.house.src = houseImage;
