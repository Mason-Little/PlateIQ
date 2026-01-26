import type { Split } from "@/types";

export const Splits: Split[] = [
  {
    id: "split-ppl",
    name: "Push / Pull / Legs",
    days: [
      {
        id: "split-day-ppl-push",
        name: "Push",
        order: 1,
        focus: "Chest, shoulders, triceps",
        muscleGroups: ["chest", "shoulders", "triceps"],
      },
      {
        id: "split-day-ppl-pull",
        name: "Pull",
        order: 2,
        focus: "Back, biceps",
        muscleGroups: ["back", "biceps", "rear_delts"],
      },
      {
        id: "split-day-ppl-legs",
        name: "Legs",
        order: 3,
        focus: "Quads, hamstrings, glutes",
        muscleGroups: ["quads", "hamstrings", "glutes", "calves"],
      },
    ],
  },
  {
    id: "split-upper-lower",
    name: "Upper / Lower",
    days: [
      {
        id: "split-day-upper",
        name: "Upper",
        order: 1,
        focus: "Chest, back, shoulders, arms",
        muscleGroups: ["chest", "back", "shoulders", "biceps", "triceps"],
      },
      {
        id: "split-day-lower",
        name: "Lower",
        order: 2,
        focus: "Quads, hamstrings, glutes",
        muscleGroups: ["quads", "hamstrings", "glutes", "calves"],
      },
    ],
  },
  {
    id: "split-full-body",
    name: "Full Body",
    days: [
      {
        id: "split-day-full-body",
        name: "Full Body",
        order: 1,
        focus: "All major muscle groups",
        muscleGroups: ["chest", "shoulders", "triceps"],
      },
    ],
  },
  {
    id: "split-arnold-ppl",
    name: "Arnold + PPL",
    days: [
      {
        id: "split-day-arnold-chest-back",
        name: "Chest + Back",
        order: 1,
        focus: "Antagonist pairing",
        muscleGroups: ["chest", "back", "rear_delts"],
      },
      {
        id: "split-day-arnold-shoulders-arms",
        name: "Shoulders + Arms",
        order: 2,
        focus: "Delts, biceps, triceps",
        muscleGroups: ["shoulders", "biceps", "triceps"],
      },
      {
        id: "split-day-arnold-legs",
        name: "Legs",
        order: 3,
        focus: "Quads, hamstrings, glutes",
        muscleGroups: ["quads", "hamstrings", "glutes", "calves"],
      },
    ],
  },
  {
    id: "split-custom",
    name: "Custom Split",
    days: [
      {
        id: "split-day-custom-chest-bis",
        name: "Chest + Biceps",
        order: 1,
        focus: "Chest, biceps",
        muscleGroups: ["chest", "biceps"],
      },
      {
        id: "split-day-custom-back-tris",
        name: "Back + Triceps",
        order: 2,
        focus: "Back, triceps",
        muscleGroups: ["back", "triceps"],
      },
      {
        id: "split-day-custom-shoulders-forearms",
        name: "Shoulders + Forearms",
        order: 3,
        focus: "Delts, forearms",
        muscleGroups: ["shoulders", "forearms"],
      },
      {
        id: "split-day-custom-legs",
        name: "Legs",
        order: 4,
        focus: "Quads, hamstrings, glutes",
        muscleGroups: ["quads", "hamstrings", "glutes", "calves"],
      },
    ],
  },
];
