export type Quest = {
  id: string;
  title: string;
  completed: boolean;
};

export class QuestSystem {
  private quests: Quest[] = [];

  addQuest(quest: Quest) {
    this.quests.push(quest);
  }

  getQuests() {
    return this.quests;
  }
}
