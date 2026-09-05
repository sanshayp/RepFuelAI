/**
 * RepFuelAI Training Styles Central Data Store
 * Educational database covering methodologies, benefits, considerations, and sample workouts.
 */

export const trainingStylesData = [
  {
    id: "strength-training",
    name: "Strength Training",
    icon: "Dumbbell",
    shortDescription: "Progressively increases maximal force production using heavy resistance, compound barbell lifts, and lower repetition ranges.",
    bestFor: ["Strength", "Muscle Gain", "Bone Density", "Athletic Power"],
    difficulty: "Intermediate",
    tag: "High Load & Tension",
    whatIsIt: "Strength training is a disciplined methodology centered around maximizing neurological efficiency and recruitment of high-threshold motor units to move maximal loads.",
    howItWorks: "By lifting weights in the 80–90%+ 1RM range (typically 1–6 repetitions), the central nervous system adapts by firing muscle fibers faster and in tighter synchrony, resulting in raw mechanical force.",
    workoutStructure: "3 to 5 sets of 3–6 reps with long rest periods (2–5 minutes) to ensure near-complete ATP-CP recovery before each maximal effort.",
    advantages: [
      "Accelerates central nervous system neural drive and tendon stiffness",
      "Dramatically increases bone mineral density to prevent osteoporosis",
      "Establishes a bulletproof baseline for athletic sports and sprinting",
      "High carry-over to everyday physical tasks and heavy lifting"
    ],
    considerations: [
      "Demands strict technique to safeguard spinal and joint health",
      "Requires extended rest periods between sets (2 to 4 minutes)",
      "High neurological fatigue demands strict sleep and recovery management"
    ],
    exampleWorkout: {
      title: "Heavy Barbell Strength Foundation",
      duration: "60 minutes",
      exercises: [
        { name: "Low-Bar Barbell Squat", sets: "5 sets × 3–5 reps", rest: "3 min", notes: "Focus on explosive hip drive" },
        { name: "Flat Barbell Bench Press", sets: "4 sets × 4–6 reps", rest: "2.5 min", notes: "Tuck shoulder blades and drive heels" },
        { name: "Conventional Deadlift", sets: "3 sets × 3 reps", rest: "3.5 min", notes: "Reset breath and wedge hips every rep" },
        { name: "Standing Overhead Barbell Press", sets: "3 sets × 5 reps", rest: "2 min", notes: "Squeeze glutes to protect lower spine" }
      ]
    }
  },
  {
    id: "hypertrophy-training",
    name: "Hypertrophy Training",
    icon: "Flame",
    shortDescription: "Focuses on maximizing muscular size and aesthetic symmetry through controlled volume, mechanical tension, and metabolic stress.",
    bestFor: ["Muscle Gain", "Body Recomposition", "Aesthetics"],
    difficulty: "Intermediate",
    tag: "Aesthetic Volume",
    whatIsIt: "Hypertrophy training aims to trigger sarcoplasmic and myofibrillar muscular enlargement through structured weekly volume and close proximity to failure (RPE 7-9).",
    howItWorks: "Combines high mechanical tension with metabolic byproduct accumulation (lactate and hydrogen ions) across the 6–15 rep range, signaling muscle protein synthesis signaling cascades (mTOR).",
    workoutStructure: "3 to 4 working sets per exercise across 8–12 reps with 60–90 seconds rest, frequently isolating target muscles through multiple angles.",
    advantages: [
      "Optimal balance of muscular growth and physique sculpting",
      "Improves metabolic rate through increased lean tissue mass",
      "Less central nervous system taxation compared to 1RM strength lifting",
      "Enhanced mind-muscle connection and joint pump sensations"
    ],
    considerations: [
      "Requires progressive overload tracking across weights and reps each week",
      "Demands higher nutritional caloric and protein support (1.6–2.2g/kg)",
      "Can cause delayed onset muscle soreness (DOMS) when introducing new angles"
    ],
    exampleWorkout: {
      title: "Upper Body Hypertrophy Focus",
      duration: "50 minutes",
      exercises: [
        { name: "Incline Dumbbell Press", sets: "4 sets × 8–10 reps", rest: "90 sec", notes: "3-second controlled eccentric" },
        { name: "Neutral-Grip Lat Pulldown", sets: "4 sets × 10–12 reps", rest: "75 sec", notes: "Hold squeeze at clavicle for 1 second" },
        { name: "Seated Cable Row", sets: "3 sets × 10–12 reps", rest: "60 sec", notes: "Full scapular stretch at extension" },
        { name: "Dumbbell Lateral Raises", sets: "4 sets × 12–15 reps", rest: "45 sec", notes: "Lead with elbows; pause at the top" },
        { name: "Overhead Rope Cable Extension", sets: "3 sets × 12–15 reps", rest: "45 sec", notes: "Deep stretch behind the head" }
      ]
    }
  },
  {
    id: "hiit",
    name: "High-Intensity Interval Training (HIIT)",
    icon: "Zap",
    shortDescription: "Alternates brief bursts of maximum anaerobic exertion with tactical low-intensity recovery windows for peak calorie burn.",
    bestFor: ["Fat Loss", "Cardio Conditioning", "Time Efficiency"],
    difficulty: "Advanced",
    tag: "Peak EPOC Burn",
    whatIsIt: "HIIT pushes heart rate to 85–95% of maximum capacity during short intervals (15–60 seconds), alternating with active rest intervals to optimize caloric expenditure in minimal time.",
    howItWorks: "Forces the body into anaerobic metabolism, depleting phosphocreatine and glycogen rapidly. This triggers Excess Post-Exercise Oxygen Consumption (EPOC), burning extra calories for hours post-workout.",
    workoutStructure: "Work-to-rest ratios such as 2:1 (e.g. 40s work / 20s rest) or 1:2 (e.g. 20s sprint / 40s rest) repeated across 4–8 rounds.",
    advantages: [
      "Delivers equivalent cardiovascular adaptations in half the time of steady cardio",
      "Significantly boosts VO2 max and insulin sensitivity",
      "Burns calories during and long after the training session (afterburn effect)",
      "Can be done anywhere with minimal to zero equipment"
    ],
    considerations: [
      "High impact and cardiovascular strain; unsuitable for unconditioned beginners",
      "Limit to 2–3 sessions weekly to avoid cortisol spikes and overtraining",
      "Proper dynamic warm-up is mandatory to prevent muscle strains"
    ],
    exampleWorkout: {
      title: "Tabata-Style Metabolic Meltdown",
      duration: "24 minutes",
      exercises: [
        { name: "Kettlebell Swing Acceleration", sets: "4 rounds (40s work / 20s rest)", rest: "20 sec", notes: "Explosive hip snap" },
        { name: "Assault Bike Sprint", sets: "4 rounds (30s max effort / 30s easy)", rest: "30 sec", notes: "Target 85%+ heart rate" },
        { name: "Plyometric Box Jumps", sets: "4 rounds (40s work / 20s rest)", rest: "20 sec", notes: "Land softly in athletic stance" },
        { name: "Burpee Broad Jumps", sets: "4 rounds (30s work / 30s rest)", rest: "30 sec", notes: "Chest to deck every rep" }
      ]
    }
  },
  {
    id: "circuit-training",
    name: "Circuit Training",
    icon: "Activity",
    shortDescription: "A series of distinct exercises performed back-to-back with minimal rest, combining muscular endurance with cardiovascular conditioning.",
    bestFor: ["General Fitness", "Fat Loss", "Muscular Endurance"],
    difficulty: "Beginner",
    tag: "High Energy Flow",
    whatIsIt: "Circuit training involves rotating through 5 to 10 stations targeting different muscle groups sequentially so one group rests while another works.",
    howItWorks: "Keeps heart rate continuously elevated while distributing mechanical load throughout the body, preventing localized muscular fatigue from halting the workout.",
    workoutStructure: "5–8 exercises performed for 45 seconds or 12–15 reps with only 15 seconds between stations, followed by 2 minutes of rest after the entire circuit.",
    advantages: [
      "Extremely engaging and dynamic format that fights workout monotony",
      "Simultaneously enhances aerobic capacity and muscular stamina",
      "Easily scalable from beginner bodyweight circuits to advanced dumbbell circuits",
      "High calorie burn per minute of workout time"
    ],
    considerations: [
      "Not optimal for building maximal 1RM strength due to residual fatigue",
      "Requires gym floor management if using multiple pieces of equipment",
      "Form must be guarded carefully as fatigue accumulates across rounds"
    ],
    exampleWorkout: {
      title: "Total-Body Metabolic Station Circuit",
      duration: "35 minutes",
      exercises: [
        { name: "Station 1: Goblet Squats", sets: "3 rounds × 45 seconds", rest: "15 sec", notes: "Chest upright, deep hip crease" },
        { name: "Station 2: Dumbbell Push Press", sets: "3 rounds × 45 seconds", rest: "15 sec", notes: "Dip knees and pop overhead" },
        { name: "Station 3: Kettlebell Deadlift", sets: "3 rounds × 45 seconds", rest: "15 sec", notes: "Hinge hips back, squeeze glutes" },
        { name: "Station 4: Push-Ups to Plank Tap", sets: "3 rounds × 45 seconds", rest: "15 sec", notes: "Stable pelvis, tight core" },
        { name: "Station 5: Battle Ropes Waves", sets: "3 rounds × 45 seconds", rest: "2 min between circuits", notes: "Maintain rhythmic speed" }
      ]
    }
  },
  {
    id: "calisthenics",
    name: "Calisthenics",
    icon: "Shield",
    shortDescription: "Bodyweight mastery emphasizing gymnastics levers, strict relative strength, and balance through natural movement planes.",
    bestFor: ["Strength", "Body Control", "Core Stability", "General Fitness"],
    difficulty: "Intermediate",
    tag: "Zero Gear Master",
    whatIsIt: "Calisthenics utilizes leverage and gravitational resistance against your own body weight to develop exceptional relative strength and aesthetic physiques.",
    howItWorks: "Progressions are achieved by manipulating biomechanical leverage, grip width, hand positioning, and eccentric duration rather than adding external iron plates.",
    workoutStructure: "Skill-based practice followed by 3–4 sets of compound bodyweight movements (pull-ups, dips, levers, handstands) performed with strict form.",
    advantages: [
      "Can be practiced anywhere: parks, hotel rooms, home, or outdoors",
      "Develops incredible core rigidity and scapular stabilizer strength",
      "Low impact on joints when progressions are respected gradually",
      "Creates natural, functional proportions and tendon resilience"
    ],
    considerations: [
      "Lower body progressive overload is limited without external weights or single-leg variations",
      "Strict pulling strength (pull-ups) presents a high initial barrier for beginners",
      "Requires patience to master advanced skills like muscle-ups and planches"
    ],
    exampleWorkout: {
      title: "Foundational Bodyweight Calisthenics",
      duration: "40 minutes",
      exercises: [
        { name: "Strict Chest-to-Bar Pull-Ups", sets: "4 sets × 6–10 reps", rest: "90 sec", notes: "No kipping, full dead hang at bottom" },
        { name: "Parallel Bar Dips", sets: "4 sets × 10–12 reps", rest: "75 sec", notes: "Slight forward torso lean for chest activation" },
        { name: "Pistol Squats (Assisted or Free)", sets: "3 sets × 6–8 reps/leg", rest: "60 sec", notes: "Keep non-working leg extended parallel" },
        { name: "Hollow Body Rockers", sets: "3 sets × 45 seconds", rest: "45 sec", notes: "Press lumbar flat against floor" },
        { name: "Wall-Facing Handstand Hold", sets: "3 sets × 30–45 seconds", rest: "60 sec", notes: "Push tall through active shoulders" }
      ]
    }
  },
  {
    id: "functional-training",
    name: "Functional Training",
    icon: "Sparkles",
    shortDescription: "Movement-pattern training focused on multi-planar coordination, anti-rotation, balance, and real-world durability.",
    bestFor: ["General Fitness", "Injury Prevention", "Mobility", "Agility"],
    difficulty: "Beginner",
    tag: "Real-World Agility",
    whatIsIt: "Functional training conditions your body to perform activities of daily living and dynamic athletic movements with maximal efficiency and minimal risk of injury.",
    howItWorks: "Integrates the 7 primary functional movement patterns: squat, hinge, lunge, push, pull, rotate, and carry across all three planes of motion (sagittal, frontal, transverse).",
    workoutStructure: "Dynamic core activations followed by multi-planar lunges, cable chops, unilateral presses, and carries with moderate loads.",
    advantages: [
      "Directly translates to everyday resilience, lifting groceries, and playing with kids",
      "Corrects asymmetric muscular imbalances between left and right sides",
      "Significantly reduces incidence of chronic lower back and shoulder pain",
      "Enhances proprioception, vestibular balance, and agility"
    ],
    considerations: [
      "Focuses on movement mastery rather than pushing maximal poundages",
      "Requires coaching feedback on pelvis and ribcage alignment",
      "May feel less intense initially compared to isolated gym machines"
    ],
    exampleWorkout: {
      title: "Multi-Planar Kinetic Functional Flow",
      duration: "40 minutes",
      exercises: [
        { name: "Single-Arm Dumbbell Suitcase Carry", sets: "4 sets × 40 meters/arm", rest: "60 sec", notes: "Keep shoulders completely level" },
        { name: "Multi-Directional Lunge Matrix", sets: "3 sets × 6 reps/leg", rest: "60 sec", notes: "Step forward, lateral, and 45° reverse" },
        { name: "Half-Kneeling Cable Woodchop", sets: "3 sets × 12 reps/side", rest: "45 sec", notes: "Rotate from thoracic spine, brace hips" },
        { name: "Single-Leg Romanian Deadlift", sets: "3 sets × 8–10 reps/leg", rest: "60 sec", notes: "Square hips to floor, soft knee bend" },
        { name: "Turkish Get-Up", sets: "2 sets × 3 reps/arm", rest: "90 sec", notes: "Eyes glued to kettlebell overhead" }
      ]
    }
  },
  {
    id: "endurance-training",
    name: "Endurance Training",
    icon: "HeartPulse",
    shortDescription: "Aerobic capacity and cardiovascular efficiency developed through steady-state, tempo runs, and sustained effort periods.",
    bestFor: ["Endurance", "Cardio Conditioning", "Longevity", "General Fitness"],
    difficulty: "Beginner",
    tag: "Aerobic Engine",
    whatIsIt: "Endurance training trains the cardiovascular, respiratory, and muscular systems to withstand prolonged periods of physical exertion without debilitating fatigue.",
    howItWorks: "Stimulates mitochondrial biogenesis, capillary bed density, and increases cardiac stroke volume by keeping exertion within aerobic zones (Zone 2–3: 65–75% max HR).",
    workoutStructure: "Sustained continuous bouts (30 to 90 minutes) of rhythmic activity like running, cycling, rowing, or swimming at a conversational pacing.",
    advantages: [
      "Substantially lowers resting heart rate and blood pressure",
      "Improves mitochondrial energy density and fat oxidation efficiency",
      "Accelerates post-workout systemic recovery between lifting sets",
      "Improves mental fortitude, stress regulation, and overall longevity"
    ],
    considerations: [
      "Excessive volume without strength training can induce muscle catabolism",
      "Repetitive impact (e.g. distance running) requires attention to footwear and gait",
      "Requires patience to remain in low-intensity Zone 2 without speeding up"
    ],
    exampleWorkout: {
      title: "Zone 2 Engine Builder Protocol",
      duration: "45 minutes",
      exercises: [
        { name: "Warm-Up Dynamic Leg Swings", sets: "1 set × 5 minutes", rest: "0 sec", notes: "Gradually lubricate hip synovial joints" },
        { name: "Continuous Zone 2 Cadence", sets: "1 continuous bout × 35 min", rest: "0 sec", notes: "Heart rate between 130–145 bpm (nasal breathing)" },
        { name: "Stride Accelerations", sets: "4 sets × 20-second strides", rest: "40 sec easy walk", notes: "Focus on tall posture and light foot strike" },
        { name: "Hamstring and Calf Static Flush", sets: "1 set × 5 minutes", rest: "Completed", notes: "Gentle recovery stretches" }
      ]
    }
  },
  {
    id: "mobility-training",
    name: "Mobility Training",
    icon: "Sparkles",
    shortDescription: "Active joint range of motion, capsular integrity, and myofascial release designed to eliminate pain and enhance movement freedom.",
    bestFor: ["Mobility", "Recovery", "Injury Prevention", "Longevity"],
    difficulty: "Beginner",
    tag: "Active Freedom",
    whatIsIt: "Mobility is the ability to actively control and express strength through a complete joint range of motion, unlike passive flexibility.",
    howItWorks: "Uses Controlled Articular Rotations (CARs), PNF stretching, and end-range isometric holds to signal the nervous system that deep positions are safe and strong.",
    workoutStructure: "20 to 30 minutes of intentional, slow, breath-synchronized joint circles, active stretches, and positional contractions.",
    advantages: [
      "Eliminates nagging joint pinches in the shoulders, hips, and ankles",
      "Allows deeper squat depth and safer bench press mechanics",
      "Accelerates active recovery between heavy lifting sessions",
      "Balances sympathetic and parasympathetic nervous system tone"
    ],
    considerations: [
      "Requires consistent, near-daily practice for lasting tissue remodeling",
      "Never push through sharp or pinching pain (stay in comfortable tension)",
      "Best practiced when muscles are warm or as an evening unwind routine"
    ],
    exampleWorkout: {
      title: "Complete Joint Capsule Reset",
      duration: "25 minutes",
      exercises: [
        { name: "Standing Neck & Shoulder CARs", sets: "2 sets × 5 slow circles/dir", rest: "15 sec", notes: "Zero compensation from torso" },
        { name: "Thoracic Spine Foam Roller Openers", sets: "2 sets × 10 extensions", rest: "15 sec", notes: "Breathe out as spine arches back" },
        { name: "90/90 Hip Lift & Lift-Offs", sets: "3 sets × 6 reps/side", rest: "30 sec", notes: "Contract glute to lift rear ankle" },
        { name: "Ankle Dorsiflexion Banded Mobilization", sets: "2 sets × 10 pulses/side", rest: "20 sec", notes: "Drive knee past toes over second toe" },
        { name: "Deep Diaphragmatic Squat Sit", sets: "2 sets × 90 seconds", rest: "30 sec", notes: "Keep heels glued to floor, chest tall" }
      ]
    }
  }
];
