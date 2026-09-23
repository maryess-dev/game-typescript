export type DialogueLine = {
  speaker: string;
  text: string;
};

export class DialogueSystem {
  private lines: DialogueLine[] = [];

  setLines(lines: DialogueLine[]) {
    this.lines = lines;
  }

  getLines() {
    return this.lines;
  }
}
