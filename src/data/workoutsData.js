/**
 * RepFuelAI Workouts Central Data Store
 * Structured database of workout routines, categories, filters, and exercise breakdowns.
 */

export const workoutCategories = [
  {
    id: "strength",
    name: "Strength Training",
    icon: "Dumbbell",
    description: "Heavy compound resistance protocols focused on progressive overload, raw force output, and dense muscle development.",
    workoutCount: "12 Routines"
  },
  {
    id: "cardio",
    name: "Cardio",
    icon: "HeartPulse",
    description: "Endurance-based conditioning sessions engineered to elevate aerobic VO2 max and enhance metabolic recovery.",
    workoutCount: "8 Routines"
  },
  {
    id: "hiit",
    name: "HIIT",
    icon: "Flame",
    description: "High-intensity interval bursts paired with tactical recovery windows for maximal EPOC afterburn.",
    workoutCount: "10 Routines"
  },
  {
    id: "bodyweight",
    name: "Bodyweight",
    icon: "Zap",
    description: "Zero-equipment calisthenics routines emphasizing gymnastic levers, kinetic stability, and relative strength.",
    workoutCount: "9 Routines"
  },
  {
    id: "mobility",
    name: "Mobility & Flexibility",
    icon: "Sparkles",
    description: "Deep thoracic flows, hip opener mechanics, and active myofascial recovery to restore full joint mechanics.",
    workoutCount: "7 Routines"
  },
  {
    id: "core",
    name: "Core Training",
    icon: "Shield",
    description: "Anti-rotational, pelvic stability, and intra-abdominal bracing regimens to protect the spine and build deep power.",
    workoutCount: "8 Routines"
  }
];

export const filterOptions = {
  difficulties: ["All", "Beginner", "Intermediate", "Advanced"],
  durations: [
    { label: "All Durations", value: "all" },
    { label: "Under 15 min", value: "under-15" },
    { label: "15–30 min", value: "15-30" },
    { label: "30–45 min", value: "30-45" },
    { label: "45+ min", value: "45-plus" }
  ],
  goals: ["All", "Fat Loss", "Muscle Gain", "Strength", "Endurance", "General Fitness"],
  equipment: ["All", "No Equipment", "Dumbbells", "Barbell", "Gym Equipment"]
};

export const workoutsData = [
  {
    id: "wo-1",
    name: "Full Body Hypertrophy Forge",
    category: "Strength Training",
    categoryId: "strength",
    difficulty: "Intermediate",
    duration: "45 min",
    durationMinutes: 45,
    durationCategory: "30-45",
    goal: "Muscle Gain",
    equipment: "Barbell",
    muscles: ["Chest", "Quads", "Upper Back", "Hamstrings", "Triceps"],
    calories: "420 kcal",
    rating: "4.9 (1.4k reviews)",
    image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=80",
    description: "A foundational mechanical-tension protocol targeting all major muscle groups through progressive resistance compound barbell lifts.",
    overview: "Designed for athletes seeking dense muscle mass and foundational joint resilience. This workout uses high-yield multi-joint movements with controlled eccentrics (3-1-1 tempo) to optimize mechanical tension and recruit motor units efficiently.",
    exercises: [
      {
        name: "Barbell Back Squat",
        sets: 4,
        reps: "8–10 reps",
        rest: "90 seconds",
        target: "Quadriceps, Glutes, Spinal Erectors"
      },
      {
        name: "Barbell Bench Press",
        sets: 4,
        reps: "8–12 reps",
        rest: "90 seconds",
        target: "Pectoralis Major, Anterior Deltoids, Triceps"
      },
      {
        name: "Bent-Over Barbell Row",
        sets: 3,
        reps: "10–12 reps",
        rest: "75 seconds",
        target: "Latissimus Dorsi, Rhomboids, Biceps"
      },
      {
        name: "Romanian Deadlift",
        sets: 3,
        reps: "10–12 reps",
        rest: "90 seconds",
        target: "Hamstrings, Glutes, Lower Back"
      },
      {
        name: "Close-Grip Triceps Press",
        sets: 3,
        reps: "12–15 reps",
        rest: "60 seconds",
        target: "Triceps Brachii, Upper Chest"
      }
    ]
  },
  {
    id: "wo-2",
    name: "Metabolic Inferno HIIT",
    category: "HIIT",
    categoryId: "hiit",
    difficulty: "Advanced",
    duration: "30 min",
    durationMinutes: 30,
    durationCategory: "15-30",
    goal: "Fat Loss",
    equipment: "Dumbbells",
    muscles: ["Full Body", "Core", "Shoulders", "Cardiovascular"],
    calories: "390 kcal",
    rating: "4.8 (920 reviews)",
    image: "https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?auto=format&fit=crop&w=800&q=80",
    description: "Relentless intervals that elevate VO2 max and stimulate sustained EPOC caloric expenditure well after the session concludes.",
    overview: "A lactate-threshold conditioning protocol utilizing high-velocity dumbbell complexes paired with plyometrics. Structured in 40-second work bouts and 20-second active rests to challenge metabolic output.",
    exercises: [
      {
        name: "Dumbbell Thrusters",
        sets: 4,
        reps: "40 seconds active",
        rest: "20 seconds",
        target: "Deltoids, Quads, Core, Triceps"
      },
      {
        name: "Burpee to Dumbbell Clean",
        sets: 4,
        reps: "40 seconds active",
        rest: "20 seconds",
        target: "Full Kinetic Chain, Cardio Endurance"
      },
      {
        name: "Renegade Row to Push-Up",
        sets: 4,
        reps: "40 seconds active",
        rest: "20 seconds",
        target: "Core Anti-Rotation, Upper Back, Chest"
      },
      {
        name: "Dumbbell Snatch (Alternating)",
        sets: 4,
        reps: "40 seconds active",
        rest: "20 seconds",
        target: "Posterior Chain, Traps, Cardio"
      },
      {
        name: "Mountain Climbers Sprint",
        sets: 4,
        reps: "40 seconds active",
        rest: "60 seconds (inter-round)",
        target: "Rectus Abdominis, Hip Flexors"
      }
    ]
  },
  {
    id: "wo-3",
    name: "Kinetic Calisthenics Mastery",
    category: "Bodyweight",
    categoryId: "bodyweight",
    difficulty: "Beginner",
    duration: "25 min",
    durationMinutes: 25,
    durationCategory: "15-30",
    goal: "General Fitness",
    equipment: "No Equipment",
    muscles: ["Chest", "Triceps", "Core", "Quads"],
    calories: "210 kcal",
    rating: "4.9 (2.1k reviews)",
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80",
    description: "Master foundational body control, scapular retraction, and clean kinetic alignment without needing a single piece of gym equipment.",
    overview: "Designed for beginners and travel athletes looking to build functional gymnastic baseline strength. Emphasizes scapular control, strict plank bracing, and eccentric tempo.",
    exercises: [
      {
        name: "Tempo Floor Push-Ups",
        sets: 3,
        reps: "10–15 reps",
        rest: "60 seconds",
        target: "Chest, Triceps, Anterior Deltoids"
      },
      {
        name: "Bodyweight Pause Squats",
        sets: 3,
        reps: "15–20 reps",
        rest: "45 seconds",
        target: "Quadriceps, Adductors, Glutes"
      },
      {
        name: "Hollow Body Hold",
        sets: 3,
        reps: "30–45 seconds",
        rest: "45 seconds",
        target: "Deep Transverse Abdominis, Hip Flexors"
      },
      {
        name: "Reverse Lunges (Alternating)",
        sets: 3,
        reps: "12 reps/leg",
        rest: "45 seconds",
        target: "Hamstrings, Gluteus Medius"
      },
      {
        name: "Prone Cobra Holds",
        sets: 3,
        reps: "12 reps (3s hold)",
        rest: "45 seconds",
        target: "Rhomboids, Lower Trapezius, Posterior Delts"
      }
    ]
  },
  {
    id: "wo-4",
    name: "Power Sprint & Engine Builder",
    category: "Cardio",
    categoryId: "cardio",
    difficulty: "Intermediate",
    duration: "35 min",
    durationMinutes: 35,
    durationCategory: "30-45",
    goal: "Endurance",
    equipment: "Gym Equipment",
    muscles: ["Cardiovascular", "Calves", "Quads", "Hamstrings"],
    calories: "450 kcal",
    rating: "4.7 (780 reviews)",
    image: "https://images.unsplash.com/photo-1434725039720-aaad6dd32dfe?auto=format&fit=crop&w=800&q=80",
    description: "Aerobic threshold training incorporating interval wattage targets on the treadmill or assault rower to expand lung capacity.",
    overview: "Combines aerobic base endurance intervals with lactic tolerance sprints. Ideal for distance runners, combat athletes, and hybrid lifters seeking unshakeable conditioning.",
    exercises: [
      {
        name: "Aerobic Ramp-Up Jog",
        sets: 1,
        reps: "5 minutes ramp",
        rest: "0 seconds",
        target: "Warm-Up, Aerobic Base"
      },
      {
        name: "High Incline Treadmill Power Walk",
        sets: 4,
        reps: "3 minutes (12% incline)",
        rest: "60 seconds flat walk",
        target: "Calves, Hamstrings, Posterior Chain"
      },
      {
        name: "Rowing Ergometer Sprint Intervals",
        sets: 5,
        reps: "500m sprint pace",
        rest: "90 seconds active recovery",
        target: "Cardiovascular VO2 Max, Upper Back"
      },
      {
        name: "Assault Bike Burst",
        sets: 4,
        reps: "30 seconds max RPM",
        rest: "60 seconds easy spin",
        target: "Quads, Anaerobic Capacity"
      },
      {
        name: "Zone 2 Cool-Down Flush",
        sets: 1,
        reps: "5 minutes",
        rest: "Completed",
        target: "Lactate Clearance"
      }
    ]
  },
  {
    id: "wo-5",
    name: "Thoracic Mobility & Deep Flow",
    category: "Mobility & Flexibility",
    categoryId: "mobility",
    difficulty: "Beginner",
    duration: "15 min",
    durationMinutes: 15,
    durationCategory: "15-30",
    goal: "General Fitness",
    equipment: "No Equipment",
    muscles: ["Thoracic Spine", "Hip Flexors", "Hamstrings", "Lats"],
    calories: "110 kcal",
    rating: "4.9 (1.8k reviews)",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80",
    description: "Restore restricted spine rotation, relieve lower back compression, and loosen stubborn hip capsules in a restorative active sequence.",
    overview: "A physical therapy-inspired mobility sequence designed to counteract desk posture, anterior pelvic tilt, and thoracic rigidity. Safe for daily execution as a warm-up or recovery session.",
    exercises: [
      {
        name: "Cat-Cow Segmental Spinal Articulation",
        sets: 2,
        reps: "10 slow cycles",
        rest: "30 seconds",
        target: "Spinal Extensors, Transverse Abdominis"
      },
      {
        name: "World's Greatest Stretch",
        sets: 3,
        reps: "6 reps/side",
        rest: "30 seconds",
        target: "Thoracic Spine, Psoas, Hamstrings, Adductors"
      },
      {
        name: "90/90 Hip Internal & External Rotations",
        sets: 3,
        reps: "8 switches/side",
        rest: "30 seconds",
        target: "Gluteus Medius, Piriformis, Hip Capsule"
      },
      {
        name: "Thread the Needle",
        sets: 2,
        reps: "8 reps/side (3s hold)",
        rest: "30 seconds",
        target: "Posterior Deltoids, Rhomboids, Thoracic Rib Cage"
      },
      {
        name: "Deep Diaphragmatic Child's Pose",
        sets: 1,
        reps: "2 minutes sustained hold",
        rest: "Completed",
        target: "Lats, Sacroiliac Joint, Nervous System"
      }
    ]
  },
  {
    id: "wo-6",
    name: "Posterior Chain Deadlift Focus",
    category: "Strength Training",
    categoryId: "strength",
    difficulty: "Advanced",
    duration: "50 min",
    durationMinutes: 50,
    durationCategory: "45-plus",
    goal: "Strength",
    equipment: "Barbell",
    muscles: ["Hamstrings", "Glutes", "Erector Spinae", "Trapezius", "Forearms"],
    calories: "510 kcal",
    rating: "5.0 (3.2k reviews)",
    image: "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?auto=format&fit=crop&w=800&q=80",
    description: "Heavy conventional deadlifts coupled with accessory pulling work to build raw posterior pulling power and bulletproof spinal support.",
    overview: "An advanced power-building workout for trainees seeking to shatter deadlift PRs. Prioritizes wedge mechanics, lat tension, and explosive hip extension.",
    exercises: [
      {
        name: "Conventional Barbell Deadlift",
        sets: 5,
        reps: "5 reps (Progressive RPE 8-9)",
        rest: "2–3 minutes",
        target: "Glutes, Hamstrings, Spinal Erectors, Latissimus"
      },
      {
        name: "Barbell Hip Thrust",
        sets: 4,
        reps: "8–10 reps (2s peak contraction)",
        rest: "90 seconds",
        target: "Gluteus Maximus"
      },
      {
        name: "Barbell Good Mornings",
        sets: 3,
        reps: "10–12 reps",
        rest: "75 seconds",
        target: "Hamstrings, Lumbar Spine Stability"
      },
      {
        name: "Heavy Barbell Shrugs",
        sets: 4,
        reps: "12–15 reps",
        rest: "60 seconds",
        target: "Upper Trapezius, Grip Strength"
      },
      {
        name: "Hanging Leg Raises",
        sets: 3,
        reps: "12–15 reps",
        rest: "60 seconds",
        target: "Rectus Abdominis, Hip Flexor Compression"
      }
    ]
  },
  {
    id: "wo-7",
    name: "Core Pillar & Anti-Rotation Shield",
    category: "Core Training",
    categoryId: "core",
    difficulty: "Intermediate",
    duration: "20 min",
    durationMinutes: 20,
    durationCategory: "15-30",
    goal: "Strength",
    equipment: "Gym Equipment",
    muscles: ["Obliques", "Transverse Abdominis", "Rectus Abdominis", "Lower Back"],
    calories: "180 kcal",
    rating: "4.8 (1.1k reviews)",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80",
    description: "Train the core the way it was biomechanically designed: resisting unwanted rotation, spinal flexion, and lateral shear forces.",
    overview: "Emphasizes the McGill Big 3 and anti-rotation cable patterns. By resisting torque, the core develops rigid kinetic stability that transfers directly to heavier squats, presses, and sprints.",
    exercises: [
      {
        name: "Cable Pallof Press",
        sets: 3,
        reps: "12 reps/side (2s hold)",
        rest: "45 seconds",
        target: "Internal/External Obliques, Transverse Abdominis"
      },
      {
        name: "Single-Arm Farmer's Carry",
        sets: 4,
        reps: "40 meters/arm",
        rest: "60 seconds",
        target: "Quadratus Lumborum, Obliques, Grip"
      },
      {
        name: "Ab Wheel Rollouts",
        sets: 3,
        reps: "10–12 reps",
        rest: "60 seconds",
        target: "Anti-Extension Core, Lats"
      },
      {
        name: "Dead Bug with Kettlebell Press",
        sets: 3,
        reps: "10 reps/side",
        rest: "45 seconds",
        target: "Pelvic Neutrality, Deep Core Coordination"
      },
      {
        name: "Side Plank with Leg Abduction",
        sets: 3,
        reps: "30 seconds/side",
        rest: "30 seconds",
        target: "Gluteus Medius, Lateral Obliques"
      }
    ]
  },
  {
    id: "wo-8",
    name: "Dumbbell Upper Body Blast",
    category: "Strength Training",
    categoryId: "strength",
    difficulty: "Beginner",
    duration: "30 min",
    durationMinutes: 30,
    durationCategory: "15-30",
    goal: "Muscle Gain",
    equipment: "Dumbbells",
    muscles: ["Chest", "Shoulders", "Biceps", "Triceps", "Upper Back"],
    calories: "280 kcal",
    rating: "4.9 (1.6k reviews)",
    image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=800&q=80",
    description: "An accessible yet demanding dumbbell circuit targeting shoulders, chest, and arms with zero gym machines required.",
    overview: "Perfect for home gym or hotel setups. Uses unilateral dumbbell loads to identify and correct muscular imbalances between dominant and non-dominant sides.",
    exercises: [
      {
        name: "Seated Dumbbell Overhead Press",
        sets: 3,
        reps: "10–12 reps",
        rest: "75 seconds",
        target: "Anterior & Lateral Deltoids, Triceps"
      },
      {
        name: "Dumbbell Incline Bench Press",
        sets: 3,
        reps: "10–12 reps",
        rest: "75 seconds",
        target: "Clavicular Pectoralis Major, Triceps"
      },
      {
        name: "Chest-Supported Dumbbell Row",
        sets: 3,
        reps: "12 reps",
        rest: "60 seconds",
        target: "Middle Traps, Rhomboids, Rear Delts"
      },
      {
        name: "Incline Dumbbell Biceps Curl",
        sets: 3,
        reps: "12–15 reps",
        rest: "60 seconds",
        target: "Biceps Long Head"
      },
      {
        name: "Overhead Dumbbell Triceps Extension",
        sets: 3,
        reps: "12–15 reps",
        rest: "60 seconds",
        target: "Triceps Long Head"
      }
    ]
  },
  {
    id: "wo-9",
    name: "Quick Morning Express Burner",
    category: "HIIT",
    categoryId: "hiit",
    difficulty: "Beginner",
    duration: "12 min",
    durationMinutes: 12,
    durationCategory: "under-15",
    goal: "Fat Loss",
    equipment: "No Equipment",
    muscles: ["Full Body", "Quads", "Core", "Heart"],
    calories: "140 kcal",
    rating: "4.8 (850 reviews)",
    image: "https://images.unsplash.com/photo-1549576490-b0b4831ef60a?auto=format&fit=crop&w=800&q=80",
    description: "Ignite metabolic wakefulness and mental alertness in under 15 minutes with dynamic bodyweight plyometrics.",
    overview: "Fast, body-temperature-elevating session designed to trigger endorphins and prime the central nervous system before the workday starts.",
    exercises: [
      {
        name: "Jumping Jacks to High Knees",
        sets: 3,
        reps: "45 seconds",
        rest: "15 seconds",
        target: "Cardiovascular, Calves"
      },
      {
        name: "Speed Air Squats",
        sets: 3,
        reps: "45 seconds",
        rest: "15 seconds",
        target: "Quadriceps, Glutes"
      },
      {
        name: "Plank Shoulder Taps",
        sets: 3,
        reps: "45 seconds",
        rest: "15 seconds",
        target: "Anti-Rotation Core, Anterior Deltoids"
      },
      {
        name: "Alternating Jump Lunges",
        sets: 3,
        reps: "45 seconds",
        rest: "15 seconds",
        target: "Power Output, Hamstrings, Quads"
      }
    ]
  }
];
