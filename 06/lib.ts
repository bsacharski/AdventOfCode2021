export class Fish {
  private readonly NEW_FISH_TIMER = 8;
  private readonly POST_SPAWN_TIMER = 6;

  private timer: number;

  public constructor(timer: number) {
    this.timer = timer;
  }

  public live(): Fish | undefined {
    this.timer--;
    if (this.timer < 0) {
      this.timer = this.POST_SPAWN_TIMER;
      return this.spawnNewFish();
    }
  }

  private spawnNewFish() {
    return new Fish(this.NEW_FISH_TIMER);
  }

  public getTimer(): number {
    return this.timer;
  }
}

type FishSchool = {
  size: number;
  fish: Fish;
};

export class Simulation {
  private fishSchools: [number: FishSchool];

  private compactFishes(fishes: Fish[]): [number: FishSchool] {
    const schools: [number: FishSchool] = {} as [number: FishSchool];

    fishes.forEach((fish) => {
      const timer = fish.getTimer();
      if (!schools[timer]) {
        schools[timer] = {
          size: 0,
          fish: fish,
        };
      }

      schools[timer].size += 1;
    });

    return schools;
  }

  public constructor(fishes: Fish[]) {
    this.fishSchools = this.compactFishes(fishes);
  }

  public newTurn(): void {
    const newSchools: [number: FishSchool] = {} as [number: FishSchool];

    for (const school of Object.values(this.fishSchools)) {
      const schoolSize = school.size;
      const fish = school.fish;

      const newFish = fish.live();
      if (newFish) {
        newSchools[newFish.getTimer()] = { size: schoolSize, fish: newFish };
      }

      const updatedTimer = fish.getTimer();
      if (!newSchools[updatedTimer]) {
        newSchools[updatedTimer] = { size: schoolSize, fish: fish };
      } else {
        newSchools[updatedTimer].size += schoolSize;
      }
    }

    this.fishSchools = newSchools;
  }

  public getCurrentState(): number[] {
    const state = [] as number[];

    for (const school of Object.values(this.fishSchools)) {
      const fishes = Array(school.size).fill(school.fish.getTimer());
      fishes.forEach((fish) => {
        state.push(fish);
      });
    }

    return state;
  }

  public getFishesCount(): number {
    let sum = 0;

    for (const school of Object.values(this.fishSchools)) {
      sum += school.size;
    }

    return sum;
  }
}
