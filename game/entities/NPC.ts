export type NPC = {
  id: string;
  name: string;
  x: number;
  y: number;
};

export const createNPC = ({ id, name, x, y }: NPC): NPC => ({
  id,
  name,
  x,
  y,
});
