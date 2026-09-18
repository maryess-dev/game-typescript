import characterIdleImage from "../assets/farm/Character/Idle.png";
import characterImage from "../assets/farm/Character/Walk.png";
import houseImage from "../assets/farm/Objects/House.png";
import treeImage from "../assets/farm/Objects/Maple Tree.png";
import roadImage from "../assets/farm/Objects/Road copiar.png";
import playerImage from "../assets/game/Tiles/tile_0000.png";
import grassImage from "../assets/game/Tiles/tile_0001.png";

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
