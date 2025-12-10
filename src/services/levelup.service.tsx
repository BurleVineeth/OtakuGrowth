import { TaskType, type Task } from "@/components/domain/AddSkillModuleForm/types";

interface UserProgress {
  totalXP: number;
  level: number;
  class: string; // "E" | "D" | "C" | "B" | "A" | "S"
}

const frequencyMultiplier = {
  [TaskType.DAILY]: 1,
  [TaskType.WEEKLY]: 1.5,
  [TaskType.ONE_TIME]: 2,
};
const CLASS_ORDER = ["E", "D", "C", "B", "A", "S"];

class LevelUpService {
  public requiredXP(level: number): number {
    return 80 + level * 20;
  }

  public calculateTaskXP(duration: number, taskType: TaskType): number {
    const durationXP = duration / 5;
    return Math.floor(durationXP * frequencyMultiplier[taskType]);
  }

  public getNextClass(current: string): string {
    const index = CLASS_ORDER.indexOf(current);
    if (index === -1 || index === CLASS_ORDER.length - 1) return current; // Already S or invalid
    return CLASS_ORDER[index + 1];
  }

  public applyTaskCompletion(user: UserProgress, task: Task, totalTasks: number) {
    const earnedXP = this.calculateTaskXP(task.duration ?? 0, task.type);
    const bonusXP = totalTasks * 2;
    user.totalXP += earnedXP + bonusXP;

    // Handle Level Ups
    while (user.totalXP >= this.requiredXP(user.level)) {
      user.totalXP -= this.requiredXP(user.level);
      user.level++;

      // Handle Class Upgrade
      if (user.level >= 100) {
        user.class = this.getNextClass(user.class);
        user.level = 1;
      }
    }

    return user;
  }
}

export const levelUpService = new LevelUpService();
