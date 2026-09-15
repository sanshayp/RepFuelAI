import React, { useState, useEffect, useMemo } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Columns, 
  Activity, 
  ArrowRight, 
  CheckCircle2, 
  Dumbbell, 
  ChevronRight, 
  ChevronLeft,
  Flame,
  ShieldCheck,
  Compass
} from 'lucide-react';
import '../../styles/components/exercise-demo.css';

/**
 * Exercise Biomechanical Demonstration Library
 * Provides accurate starting position, movement path, ending position,
 * and vector coordinates for the 6 core exercises + extensible movement patterns.
 */
export const EXERCISE_DEMO_DATA = {
  "barbell-row": {
    id: "barbell-row",
    name: "Bent-Over Barbell Row",
    categoryKey: "barbell-row",
    equipment: "Barbell",
    targetMuscles: ["Latissimus Dorsi", "Rhomboids", "Rear Deltoids", "Biceps", "Spinal Erectors"],
    description: "A premier horizontal pulling movement that targets dense upper back thickness, scapular retractors, and posterior chain stabilization.",
    tempo: "2-0-1-1 (Controlled eccentric with 1s peak contraction hold)",
    startingPosition: {
      title: "1. Starting Position Setup",
      description: "Stand shoulder-width apart, hinge at the hips to a 45-degree torso angle with a rigid neutral spine. Grasp the barbell with an overhand grip slightly wider than shoulder width. Let the bar hang at arm's length directly beneath the shoulders below knee level.",
      cues: [
        "Hip hinge: Hips pushed back, knees slightly bent, spine neutral",
        "Grip: Overhand pronated grip, knuckles facing forward",
        "Shoulder blades: Protracted slightly under tension without rounding lower back",
        "Gaze: Neutral neck looking ~4-5 feet ahead on the floor"
      ]
    },
    movement: {
      title: "2. Movement & Pulling Trajectory",
      description: "Drive the elbows up and backward along an angled trajectory toward the hip crease/lower ribcage. Pull through the elbows rather than yanking with forearms. Keep the bar path tight to the thighs.",
      trajectory: "Smooth diagonal arc pulling from below knee height upward and backward to the naval/lower sternum.",
      cues: [
        "Elbow drive: Lead the pull with the elbows driving past the ribcage",
        "Torso rigidity: Zero torso swinging or bouncing throughout the pull",
        "Breathing: Inhale at hang, exhale forcefully as bar ascends toward ribs",
        "Bar path: Trace close to the thighs to minimize spinal shear leverage"
      ]
    },
    endingPosition: {
      title: "3. Ending Position (Peak Contraction)",
      description: "At full elevation, the barbell touches the lower ribcage or upper abdomen. Scapulae are completely retracted and squeezed together with lats under maximal mechanical tension.",
      cues: [
        "Peak squeeze: Contract upper back for 1 full second at top",
        "Forearm alignment: Forearms remain perpendicular to the bar",
        "Spine check: Maintain 45-degree hip hinge without standing upright",
        "Reset: Lower bar under a 2-second controlled eccentric back to starting position"
      ]
    }
  },

  "bench-press": {
    id: "bench-press",
    name: "Barbell Bench Press",
    categoryKey: "bench-press",
    equipment: "Barbell & Flat Bench",
    targetMuscles: ["Pectoralis Major", "Anterior Deltoids", "Triceps Brachii", "Serratus Anterior"],
    description: "The gold-standard upper body horizontal pressing movement engineered for raw chest force production and triceps power.",
    tempo: "3-1-1-0 (3-second controlled lowering, 1s chest pause, explosive press)",
    startingPosition: {
      title: "1. Starting Position Setup",
      description: "Lie flat on the bench with eyes positioned directly under the racked bar. Retract and depress shoulder blades into the bench padding. Plant both feet firmly into the floor. Grip bar slightly wider than shoulder width with thumbs wrapped.",
      cues: [
        "Scapular retraction: Pin shoulder blades back and down into the bench",
        "Arch & Leg drive: Natural lumbar arch with feet anchored flat to ground",
        "Grip: Firm overhand grip with straight wrists directly over forearms",
        "Unrack: Bring bar out over shoulder joint with locked elbows before descent"
      ]
    },
    movement: {
      title: "2. Movement & Pressing Trajectory",
      description: "Lower the barbell under strict control along a slight reverse-J curve toward the lower chest / xiphoid process. Keep elbows tucked at approximately a 45-to-70 degree angle relative to the torso to protect the glenohumeral joint.",
      trajectory: "Slight curved J-trajectory: vertical descent from shoulders drifting gently down to lower sternum, then reversing upward back over shoulder line.",
      cues: [
        "Elbow tuck: Avoid 90-degree flare; keep elbows angled at 45–70 degrees",
        "Controlled descent: 3 seconds down, maintaining intra-thoracic tension",
        "Breathing: Deep diaphragmatic breath at top, hold through descent, exhale past sticking point",
        "Bar contact: Light touch to chest without bouncing off ribcage"
      ]
    },
    endingPosition: {
      title: "3. Ending Position (Full Lockout)",
      description: "Press explosively back up along the curved bar path until arms are fully extended directly over the shoulder joints, locking out with chest flexed and shoulder blades still firmly anchored to the bench.",
      cues: [
        "Lockout position: Bar positioned directly over mid-chest and shoulders",
        "Scapular position: Keep shoulder blades retracted; do NOT push shoulders forward off bench",
        "Wrist angle: Wrists remain neutral and stacked directly over forearms",
        "Control: Stabilize bar for a split second before beginning subsequent rep"
      ]
    }
  },

  "squat": {
    id: "squat",
    name: "Barbell Back Squat",
    categoryKey: "squat",
    equipment: "Barbell & Squat Rack",
    targetMuscles: ["Quadriceps", "Gluteus Maximus", "Adductor Magnus", "Hamstrings", "Spinal Erectors"],
    description: "The undisputed king of lower-body compound lifts, developing immense quad drive, hip extension power, and systemic structural bone density.",
    tempo: "3-1-1-0 (3-second eccentric descent, 1s parallel pause, explosive drive)",
    startingPosition: {
      title: "1. Starting Position Setup",
      description: "Step under the bar and rack it across the muscular shelf of your upper trapezius (high bar) or rear deltoids (low bar). Step back, set feet shoulder-width apart with toes angled out 15–30 degrees. Brace core with intra-abdominal pressure.",
      cues: [
        "Bar placement: Firmly secured across upper traps; pull down on bar with hands to create upper back tightness",
        "Stance: Shoulder-width or slightly wider, toes turned out naturally",
        "Core bracing: Deep 360-degree belly breath and brace like taking a punch",
        "Pelvic position: Neutral pelvis with ribcage locked down"
      ]
    },
    movement: {
      title: "2. Movement & Descent Trajectory",
      description: "Simultaneously unlock knees and hips, sitting back and down between your heels while pushing knees outward in line with toes. Maintain an upright chest and keep the bar path vertical directly over midfoot.",
      trajectory: "Strict vertical bar path perpendicular to the floor, centered directly over the midfoot arch.",
      cues: [
        "Knee tracking: Drive knees out over toes; never allow knees to cave inward",
        "Depth target: Crease of hips descends below top of the knee cap (parallel or below)",
        "Spine angle: Keep torso angle constant with zero lower back rounding (no butt wink)",
        "Weight balance: Even distribution across tripod of foot (heel, big toe, pinky toe)"
      ]
    },
    endingPosition: {
      title: "3. Ending Position (Lockout & Reset)",
      description: "Drive through midfoot and heels, extending hips and knees at identical rates until standing fully upright at full hip extension without hyperextending lower back.",
      cues: [
        "Drive: Push floor away through midfoot and heels",
        "Torso & hips rise together: Avoid 'good-morning' squat where hips shoot up first",
        "Full lockout: Glutes squeezed tight at top with knees softly locked",
        "Exhale: Exhale through the sticking point and reset brace for next rep"
      ]
    }
  },

  "deadlift": {
    id: "deadlift",
    name: "Conventional Barbell Deadlift",
    categoryKey: "deadlift",
    equipment: "Barbell & Bumper Plates",
    targetMuscles: ["Gluteus Maximus", "Hamstrings", "Erector Spinae", "Latissimus Dorsi", "Trapezius", "Forearms"],
    description: "The definitive full posterior chain compound pull testing total-body kinetic linkage, raw ground force, and grip resilience.",
    tempo: "1-1-2-0 (Explosive pull, 1s lockout, controlled 2-second hinge descent)",
    startingPosition: {
      title: "1. Starting Position Setup",
      description: "Stand with feet hip-width apart, barbell cutting directly across midfoot (1 inch from shins). Hinge at hips to grip the bar just outside legs. Bend knees until shins touch bar. Pull chest proud, engage lats by bending bar around shins.",
      cues: [
        "Bar placement: Bar over midfoot before starting; shins touch bar",
        "Hip height: Hips positioned midway between knees and shoulders",
        "Lat lock: Pull slack out of the barbell until you hear the click",
        "Spine neutrality: Straight diagonal spine from crown of head to tailbone"
      ]
    },
    movement: {
      title: "2. Movement & Pulling Trajectory",
      description: "Push the floor away through midfoot while maintaining consistent back angle until bar passes knees. Once past knees, violently drive hips forward into the bar while pulling shoulder blades back.",
      trajectory: "Strictly vertical ascent tracking flush against shins and dragging lightly up the thighs.",
      cues: [
        "Leg press the floor: Initiate pull by pushing the floor away, not yanking with lower back",
        "Bar closeness: Keep bar dragging against shins and thighs to minimize spinal leverage",
        "Breathing: Inhale and brace fully before pulling; hold breath through lift",
        "Knee and hip synergy: Knees straighten as bar clears shins, then hips snap forward"
      ]
    },
    endingPosition: {
      title: "3. Ending Position (Full Lockout)",
      description: "Stand fully erect with hips locked into full extension, knees straight, glutes clamped, and shoulders back and proud. Avoid leaning back or hyperextending lumbar spine.",
      cues: [
        "Hip lockout: Stand tall with glutes and quads fully flexed",
        "No over-extension: Do NOT lean back at the top; spine should be vertical",
        "Shoulders: Shoulders down and back, chest tall",
        "Descent: Push hips back first until bar clears knees, then bend knees to return to floor"
      ]
    }
  },

  "shoulder-press": {
    id: "shoulder-press",
    name: "Overhead Shoulder Press",
    categoryKey: "shoulder-press",
    equipment: "Dumbbells or Barbell",
    targetMuscles: ["Anterior Deltoids", "Lateral Deltoids", "Triceps Brachii", "Upper Trapezius", "Core Stabilizers"],
    description: "The fundamental vertical pressing movement targeting all heads of the deltoids, scapular stabilizers, and overhead kinetic stability.",
    tempo: "2-0-1-1 (Controlled lowering, explosive press, 1s overhead lockout)",
    startingPosition: {
      title: "1. Starting Position Setup",
      description: "Stand or sit upright with a braced core. Hold weights at clavicle/shoulder height with wrists stacked directly above vertical elbows. Palms facing forward (or neutral). Chest high with glutes clamped tight.",
      cues: [
        "Elbow stack: Elbows directly underneath wrists, not flared far behind",
        "Core & Glute brace: Squeeze glutes and abs to avoid lumbar overarching",
        "Grip: Firm grip with wrists straight and knuckles facing ceiling",
        "Head position: Head pulled back slightly to allow clear vertical pressing path"
      ]
    },
    movement: {
      title: "2. Movement & Pressing Trajectory",
      description: "Press weights straight upward overhead. As the weight clears the forehead, push the head forward slightly back into neutral alignment ('look through the window') so the load finishes stacked over the spine.",
      trajectory: "Vertical upward trajectory clearing the face then stacking directly over the ears and midfoot.",
      cues: [
        "Vertical bar path: Press in straight line, clearing nose and chin",
        "Through the window: Bring head forward naturally once weights clear top of head",
        "Shoulder health: Shrug up slightly at the top to clear the subacromial space",
        "Breathing: Exhale on the way up, inhale on controlled descent"
      ]
    },
    endingPosition: {
      title: "3. Ending Position (Overhead Lockout)",
      description: "Arms locked out vertically overhead with biceps in line with ears. The entire body forms a straight kinetic pillar from wrists down to feet/seat.",
      cues: [
        "Bicep-to-ear alignment: Weights stacked directly above shoulder joint and spine",
        "Arm extension: Full elbow lockout without arching lower back",
        "Trapezius engagement: Upper traps actively supporting weight overhead",
        "Lowering: Lower with 2-second control back to collarbone level"
      ]
    }
  },

  "bicep-curl": {
    id: "bicep-curl",
    name: "Incline / Standing Bicep Curl",
    categoryKey: "bicep-curl",
    equipment: "Dumbbells or Barbell",
    targetMuscles: ["Biceps Brachii (Long & Short Head)", "Brachialis", "Brachioradialis"],
    description: "The premier elbow-flexion isolation protocol designed for building bicep peak height, supination strength, and arm hypertrophy.",
    tempo: "3-0-1-1 (3-second slow eccentric descent, explosive curl, 1s peak squeeze)",
    startingPosition: {
      title: "1. Starting Position Setup",
      description: "Stand or sit with chest up and shoulders pulled back. Hold dumbbells hanging at sides at full arm extension with elbows pinned against your ribcage. Start with palms facing thighs or forward.",
      cues: [
        "Elbow anchor: Pin elbows stationary at your sides; never swing elbows forward or back",
        "Shoulder stability: Retract scapulae so front shoulders don't roll forward",
        "Full stretch: Allow arms to reach full straight extension at bottom of each rep",
        "Posture: Stand tall with ribs locked down and feet shoulder-width apart"
      ]
    },
    movement: {
      title: "2. Movement & Curling Trajectory",
      description: "Curl the weights upward by flexing the elbows while supinating (rotating) the wrists outward so palms face the ceiling. Keep upper arms completely motionless.",
      trajectory: "Smooth semi-circular arc curling from hip level up to anterior shoulder line.",
      cues: [
        "Wrist supination: Turn pinky fingers upward toward ceiling for maximal bicep peak",
        "Zero momentum: Absolutely no swinging or rocking of the lower back",
        "Elbow isolation: Elbows remain static pivot points against the ribs",
        "Breathing: Exhale forcefully as you curl the load up"
      ]
    },
    endingPosition: {
      title: "3. Ending Position (Peak Contraction)",
      description: "At the top of the curl, the dumbbells reach anterior shoulder height. Squeeze the biceps violently for 1 full second without allowing elbows to drift forward.",
      cues: [
        "Peak contraction: Squeeze biceps hard at top of the rep",
        "Elbow position: Keep elbows down; don't lift elbows up to cheat with front delts",
        "Wrists: Wrists remain neutral or slightly flexed, not limp",
        "Eccentric control: Lower under strict 3-second resistance to full extension"
      ]
    }
  }
};

/**
 * Intelligent helper to resolve an exercise to its demonstration data.
 * Matches exact keys or keywords in name (Row, Bench, Squat, Deadlift, Press, Curl).
 */
export const resolveExerciseDemo = (exercise) => {
  if (!exercise) return EXERCISE_DEMO_DATA["bench-press"];

  // If exercise already contains a full demonstration object
  if (exercise.demonstration && exercise.demonstration.startPosition) {
    return {
      id: exercise.id || "custom-ex",
      name: exercise.name,
      equipment: exercise.equipment || "Standard Equipment",
      targetMuscles: exercise.targetMuscles || (exercise.target ? [exercise.target] : ["Target Muscle Group"]),
      description: exercise.description || `${exercise.name} mechanical execution technique.`,
      tempo: exercise.demonstration.tempo || "Controlled 2-1-1 tempo",
      startingPosition: exercise.demonstration.startPosition,
      movement: exercise.demonstration.movement,
      endingPosition: exercise.demonstration.endPosition,
      categoryKey: exercise.demonstration.exerciseKey || "bench-press"
    };
  }

  const nameLower = (exercise.name || "").toLowerCase();
  
  if (nameLower.includes("row")) return EXERCISE_DEMO_DATA["barbell-row"];
  if (nameLower.includes("bench") || nameLower.includes("push-up") || nameLower.includes("push up")) return EXERCISE_DEMO_DATA["bench-press"];
  if (nameLower.includes("squat") || nameLower.includes("lunge")) return EXERCISE_DEMO_DATA["squat"];
  if (nameLower.includes("deadlift") || nameLower.includes("thrust") || nameLower.includes("good morning")) return EXERCISE_DEMO_DATA["deadlift"];
  if (nameLower.includes("overhead") || nameLower.includes("shoulder") || nameLower.includes("press") || nameLower.includes("thruster")) return EXERCISE_DEMO_DATA["shoulder-press"];
  if (nameLower.includes("curl")) return EXERCISE_DEMO_DATA["bicep-curl"];

  // Fallback defaults with dynamic name
  return {
    ...EXERCISE_DEMO_DATA["squat"],
    name: exercise.name || "Resistance Exercise",
    targetMuscles: exercise.targetMuscles || (exercise.target ? [exercise.target] : ["Full Kinetic Chain"]),
    description: exercise.description || `Comprehensive execution cues for ${exercise.name}.`
  };
};

/**
 * High-Precision Biomechanical Vector Renderer
 * Renders anatomical athlete figure and equipment in Starting Position, Movement trajectory, or Ending Position.
 */
const BiomechanicalFigure = ({ categoryKey, phase, isComparing = false }) => {
  // SVG Canvas configuration: 500x320
  const voltGreen = "#00f59b";
  const cyanMovement = "#38bdf8";
  const purpleEnd = "#c084fc";
  const athleteBodyColor = "#ffffff";
  const jointColor = "#4b6e87";
  const barColor = "#e2e8f0";
  const weightPlateColor = "#293643";
  const floorLineY = 275;

  // Ground grid line
  const GroundPlatform = () => (
    <g className="demo-ground">
      <line x1="40" y1={floorLineY} x2="460" y2={floorLineY} stroke="rgba(255,255,255,0.18)" strokeWidth="2" />
      <line x1="120" y1={floorLineY + 6} x2="380" y2={floorLineY + 6} stroke="rgba(75, 110, 135, 0.25)" strokeWidth="1" strokeDasharray="4 4" />
      {/* Foot anchors */}
      <circle cx="210" cy={floorLineY} r="3" fill={jointColor} />
      <circle cx="280" cy={floorLineY} r="3" fill={jointColor} />
    </g>
  );

  // Trajectory Arrow Component
  const TrajectoryPath = ({ pathD, label, arrowEnd = true }) => (
    <g className="trajectory-group">
      <defs>
        <marker id="arrowhead" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
          <polygon points="0 0, 7 3.5, 0 7" fill={cyanMovement} />
        </marker>
        <filter id="glow-cyan" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      <path
        d={pathD}
        fill="none"
        stroke={cyanMovement}
        strokeWidth="3.5"
        strokeDasharray="6 4"
        markerEnd={arrowEnd ? "url(#arrowhead)" : "none"}
        filter="url(#glow-cyan)"
      />
      {label && (
        <text x="260" y="70" fill={cyanMovement} fontSize="11" fontWeight="700" letterSpacing="0.05em">
          {label}
        </text>
      )}
    </g>
  );

  // 1. Barbell Row Biomechanics
  if (categoryKey === "barbell-row") {
    const isEnd = phase === "end";
    const isMovement = phase === "movement";

    // Hip at x=180, y=180
    // Torso hinged forward at 45 deg
    // Shoulder at x=280, y=125
    // Head at x=310, y=105
    // Hands & Bar:
    // Start: x=270, y=240 (hanging below knees)
    // End: x=245, y=165 (pulled to lower ribs)
    const barX = isEnd ? 245 : (isMovement ? 255 : 270);
    const barY = isEnd ? 165 : (isMovement ? 200 : 240);
    const elbowX = isEnd ? 205 : (isMovement ? 230 : 265);
    const elbowY = isEnd ? 135 : (isMovement ? 165 : 185);

    return (
      <svg viewBox="0 0 500 320" className="demo-svg-canvas" aria-label="Barbell Row Illustration">
        <GroundPlatform />

        {/* Motion trajectory arc */}
        {(isMovement || phase === "all") && (
          <TrajectoryPath
            pathD="M 270 240 Q 260 195 245 165"
            label="DIAGONAL PULL TO LOWER RIBS"
          />
        )}

        {/* Ghost silhouette for Starting Position when at End */}
        {isEnd && (
          <g opacity="0.25">
            {/* Ghost arms & bar */}
            <line x1="280" y1="125" x2="270" y2="240" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" strokeDasharray="3 3" />
            <circle cx="270" cy="240" r="14" fill="none" stroke="#ffffff" strokeWidth="2" />
          </g>
        )}

        {/* Lifter Legs */}
        {/* Feet */}
        <path d="M 195 275 L 225 275" stroke="#9ba5a8" strokeWidth="5" strokeLinecap="round" />
        {/* Shins & Thighs with knee flex */}
        <line x1="210" y1="275" x2="200" y2="225" stroke={athleteBodyColor} strokeWidth="8" strokeLinecap="round" />
        <line x1="200" y1="225" x2="175" y2="180" stroke={athleteBodyColor} strokeWidth="9" strokeLinecap="round" />
        <circle cx="200" cy="225" r="5" fill={jointColor} />

        {/* Torso (45-degree hinge) */}
        <line x1="175" y1="180" x2="280" y2="125" stroke={athleteBodyColor} strokeWidth="13" strokeLinecap="round" />
        {/* Lats highlight */}
        <path
          d="M 210 162 L 260 135"
          stroke={isEnd ? voltGreen : (isMovement ? cyanMovement : "rgba(0, 245, 155, 0.3)")}
          strokeWidth="6"
          strokeLinecap="round"
        />

        {/* Head & Neck */}
        <circle cx="310" cy="105" r="14" fill={athleteBodyColor} />
        {/* Gaze direction line */}
        <line x1="324" y1="108" x2="350" y2="120" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeDasharray="2 2" />

        {/* Upper Arm & Forearm */}
        <line x1="280" y1="125" x2={elbowX} y2={elbowY} stroke={athleteBodyColor} strokeWidth="8" strokeLinecap="round" />
        <line x1={elbowX} y1={elbowY} x2={barX} y2={barY} stroke={athleteBodyColor} strokeWidth="7" strokeLinecap="round" />
        <circle cx={elbowX} cy={elbowY} r="5" fill={jointColor} />

        {/* Barbell & Plates */}
        <circle cx={barX} cy={barY} r="22" fill={weightPlateColor} stroke={barColor} strokeWidth="2.5" />
        <circle cx={barX} cy={barY} r="14" fill="#15212d" stroke={isEnd ? voltGreen : barColor} strokeWidth="1.5" />
        <line x1={barX - 25} y1={barY} x2={barX + 25} y2={barY} stroke={barColor} strokeWidth="4" />
        
        {/* Hip Joint Anchor */}
        <circle cx="175" cy="180" r="6" fill={jointColor} />

        {/* Dynamic Status badge */}
        <text x="50" y="45" fill={isEnd ? purpleEnd : (isMovement ? cyanMovement : voltGreen)} fontSize="12" fontWeight="800" letterSpacing="0.08em">
          {isEnd ? "● PHASE 3: PEAK SCAPULAR RETRACTION" : (isMovement ? "● PHASE 2: ELBOW DRIVE TRAJECTORY" : "● PHASE 1: 45° HIP HINGE SETUP")}
        </text>
      </svg>
    );
  }

  // 2. Bench Press Biomechanics
  if (categoryKey === "bench-press") {
    const isEnd = phase === "end";
    const isMovement = phase === "movement";

    // Bench: surface at y=210, length 120 to 360
    // Torso lying flat: head at x=160, hips at x=310
    // Barbell:
    // Start: Lowered touching chest (x=240, y=190)
    // End: Pressed up at arms length (x=225, y=105)
    const barX = isEnd ? 225 : (isMovement ? 232 : 240);
    const barY = isEnd ? 105 : (isMovement ? 150 : 190);
    const elbowX = isEnd ? 220 : (isMovement ? 245 : 260);
    const elbowY = isEnd ? 148 : (isMovement ? 190 : 220);

    return (
      <svg viewBox="0 0 500 320" className="demo-svg-canvas" aria-label="Bench Press Illustration">
        <GroundPlatform />

        {/* Bench Structure */}
        <rect x="130" y="210" width="220" height="14" rx="4" fill="#293643" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
        {/* Bench Legs & Rack */}
        <line x1="160" y1="224" x2="160" y2={floorLineY} stroke="#15212d" strokeWidth="8" />
        <line x1="330" y1="224" x2="330" y2={floorLineY} stroke="#15212d" strokeWidth="8" />
        {/* Upright bar support */}
        <line x1="150" y1="130" x2="150" y2={floorLineY} stroke="rgba(75, 110, 135, 0.4)" strokeWidth="6" />

        {/* Press Trajectory Arrow */}
        {(isMovement || phase === "all") && (
          <TrajectoryPath
            pathD="M 240 190 Q 235 145 225 105"
            label="J-CURVE PRESS PATH OVER SHOULDERS"
          />
        )}

        {/* Ghost Bar at Start when viewing End */}
        {isEnd && (
          <g opacity="0.25">
            <line x1="180" y1="190" x2="300" y2="190" stroke="#ffffff" strokeWidth="4" strokeDasharray="3 3" />
            <circle cx="240" cy="190" r="16" fill="none" stroke="#ffffff" strokeWidth="2" />
          </g>
        )}

        {/* Lifter Body on Bench */}
        {/* Head on bench */}
        <circle cx="165" cy="195" r="13" fill={athleteBodyColor} />
        {/* Flat Torso with slight chest arch */}
        <path d="M 175 204 Q 220 196 305 204" fill="none" stroke={athleteBodyColor} strokeWidth="14" strokeLinecap="round" />
        {/* Chest Pectoral highlight */}
        <path d="M 205 198 Q 235 194 255 198" fill="none" stroke={isEnd ? voltGreen : cyanMovement} strokeWidth="6" strokeLinecap="round" />

        {/* Legs anchored to floor */}
        <line x1="305" y1="204" x2="345" y2="225" stroke={athleteBodyColor} strokeWidth="8" strokeLinecap="round" />
        <line x1="345" y1="225" x2="345" y2={floorLineY} stroke={athleteBodyColor} strokeWidth="8" strokeLinecap="round" />
        <line x1="340" y1={floorLineY} x2="370" y2={floorLineY} stroke="#9ba5a8" strokeWidth="5" strokeLinecap="round" />

        {/* Arms & Elbows */}
        {/* Shoulder joint at x=200, y=200 */}
        <line x1="200" y1="200" x2={elbowX} y2={elbowY} stroke={athleteBodyColor} strokeWidth="8" strokeLinecap="round" />
        <line x1={elbowX} y1={elbowY} x2={barX} y2={barY} stroke={athleteBodyColor} strokeWidth="7" strokeLinecap="round" />
        <circle cx={elbowX} cy={elbowY} r="5" fill={jointColor} />

        {/* Barbell & Plates */}
        <line x1="170" y1={barY} x2="310" y2={barY} stroke={barColor} strokeWidth="5" strokeLinecap="round" />
        <rect x="290" y={barY - 26} width="12" height="52" rx="3" fill={weightPlateColor} stroke={barColor} strokeWidth="2" />
        <circle cx={barX} cy={barY} r="5" fill={isEnd ? voltGreen : cyanMovement} />

        <text x="50" y="45" fill={isEnd ? purpleEnd : (isMovement ? cyanMovement : voltGreen)} fontSize="12" fontWeight="800" letterSpacing="0.08em">
          {isEnd ? "● PHASE 3: ARMS EXTENDED OVER SHOULDERS" : (isMovement ? "● PHASE 2: CONTROLLED DESCENT / 45° TUCK" : "● PHASE 1: PINNED SCAPULAE & FOOT ANCHOR")}
        </text>
      </svg>
    );
  }

  // 3. Squat Biomechanics
  if (categoryKey === "squat") {
    const isEnd = phase === "end";
    const isMovement = phase === "movement";

    // Midfoot center at x=250
    // Start (Standing):
    // Feet: x=220 and x=280, y=275
    // Knees: x=248, y=205
    // Hips: x=245, y=145
    // Torso upright (80 deg)
    // Shoulders/Bar: x=250, y=85
    // End (Parallel Squat):
    // Hips pushed back: x=190, y=215
    // Knees tracking forward: x=275, y=210
    // Torso 45 deg forward
    // Bar centered over midfoot: x=250, y=160
    const barX = 250;
    const barY = isEnd ? 160 : (isMovement ? 120 : 85);
    const hipX = isEnd ? 190 : (isMovement ? 218 : 245);
    const hipY = isEnd ? 215 : (isMovement ? 180 : 145);
    const kneeX = isEnd ? 275 : (isMovement ? 262 : 248);
    const kneeY = isEnd ? 210 : (isMovement ? 208 : 205);
    const headX = isEnd ? 270 : (isMovement ? 260 : 252);
    const headY = isEnd ? 140 : (isMovement ? 100 : 65);

    return (
      <svg viewBox="0 0 500 320" className="demo-svg-canvas" aria-label="Barbell Squat Illustration">
        <GroundPlatform />

        {/* Vertical Midfoot Line of Gravity */}
        <line x1="250" y1="40" x2="250" y2={floorLineY} stroke="rgba(0, 245, 155, 0.18)" strokeWidth="1.5" strokeDasharray="4 4" />

        {/* Bar Path Trajectory */}
        {(isMovement || phase === "all") && (
          <TrajectoryPath
            pathD="M 250 85 L 250 160"
            label="VERTICAL BAR PATH OVER MIDFOOT"
          />
        )}

        {/* Ghost silhouette for Starting Position when at End */}
        {isEnd && (
          <g opacity="0.25">
            <line x1="250" y1="85" x2="245" y2="145" stroke="#ffffff" strokeWidth="8" strokeDasharray="3 3" />
            <circle cx="250" cy="85" r="18" fill="none" stroke="#ffffff" strokeWidth="2" />
          </g>
        )}

        {/* Feet on floor */}
        <line x1="225" y1={floorLineY} x2="275" y2={floorLineY} stroke="#9ba5a8" strokeWidth="5" strokeLinecap="round" />

        {/* Lower Leg (Ankle to Knee) */}
        <line x1="240" y1={floorLineY} x2={kneeX} y2={kneeY} stroke={athleteBodyColor} strokeWidth="9" strokeLinecap="round" />
        <circle cx={kneeX} cy={kneeY} r="5" fill={jointColor} />

        {/* Thigh (Knee to Hip) */}
        <line x1={kneeX} y1={kneeY} x2={hipX} y2={hipY} stroke={athleteBodyColor} strokeWidth="11" strokeLinecap="round" />
        {/* Quad Highlight */}
        <line
          x1={kneeX - 10}
          y1={kneeY - 6}
          x2={hipX + 15}
          y2={hipY - 4}
          stroke={isEnd ? voltGreen : cyanMovement}
          strokeWidth="6"
          strokeLinecap="round"
        />
        <circle cx={hipX} cy={hipY} r="6" fill={jointColor} />

        {/* Torso (Hip to Shoulder) */}
        <line x1={hipX} y1={hipY} x2={barX} y2={barY} stroke={athleteBodyColor} strokeWidth="13" strokeLinecap="round" />

        {/* Head */}
        <circle cx={headX} cy={headY} r="14" fill={athleteBodyColor} />

        {/* Barbell & Plates across Upper Traps */}
        <line x1="180" y1={barY} x2="320" y2={barY} stroke={barColor} strokeWidth="5" strokeLinecap="round" />
        <rect x="180" y={barY - 26} width="12" height="52" rx="3" fill={weightPlateColor} stroke={barColor} strokeWidth="2" />
        <rect x="308" y={barY - 26} width="12" height="52" rx="3" fill={weightPlateColor} stroke={barColor} strokeWidth="2" />
        
        {/* Hands gripping bar */}
        <circle cx={barX - 25} cy={barY} r="5" fill={jointColor} />
        <circle cx={barX + 25} cy={barY} r="5" fill={jointColor} />

        <text x="50" y="45" fill={isEnd ? purpleEnd : (isMovement ? cyanMovement : voltGreen)} fontSize="12" fontWeight="800" letterSpacing="0.08em">
          {isEnd ? "● PHASE 3: PARALLEL DEPTH (HIPS BELOW KNEE)" : (isMovement ? "● PHASE 2: HIP HINGE & KNEE SPREAD" : "● PHASE 1: UPRIGHT BRACED STANCE")}
        </text>
      </svg>
    );
  }

  // 4. Deadlift Biomechanics
  if (categoryKey === "deadlift") {
    const isEnd = phase === "end";
    const isMovement = phase === "movement";

    // Vertical bar axis: x=250
    // Start (Wedge Position):
    // Bar on floor: y=250
    // Hips back: x=175, y=190
    // Shins touching bar: knee at x=235, y=225
    // Torso 40 deg angle: shoulder at x=250, y=140
    // End (Full Lockout):
    // Standing upright: hips at x=245, y=165
    // Shoulders back: x=245, y=105
    // Bar held at mid-thigh: x=250, y=175
    const barX = 250;
    const barY = isEnd ? 175 : (isMovement ? 210 : 250);
    const hipX = isEnd ? 240 : (isMovement ? 205 : 175);
    const hipY = isEnd ? 165 : (isMovement ? 175 : 190);
    const kneeX = isEnd ? 245 : (isMovement ? 240 : 235);
    const kneeY = isEnd ? 218 : (isMovement ? 222 : 225);
    const shoulderX = isEnd ? 245 : (isMovement ? 248 : 250);
    const shoulderY = isEnd ? 105 : (isMovement ? 122 : 140);
    const headX = isEnd ? 245 : (isMovement ? 255 : 265);
    const headY = isEnd ? 80 : (isMovement ? 98 : 115);

    return (
      <svg viewBox="0 0 500 320" className="demo-svg-canvas" aria-label="Deadlift Illustration">
        <GroundPlatform />

        {/* Straight Vertical Bar Path */}
        {(isMovement || phase === "all") && (
          <TrajectoryPath
            pathD="M 250 250 L 250 175"
            label="VERTICAL PULL HUGGING SHINS & THIGHS"
          />
        )}

        {/* Ghost of Start when at Lockout */}
        {isEnd && (
          <g opacity="0.25">
            <line x1="250" y1="140" x2="175" y2="190" stroke="#ffffff" strokeWidth="8" strokeDasharray="3 3" />
            <circle cx="250" cy="250" r="22" fill="none" stroke="#ffffff" strokeWidth="2" />
          </g>
        )}

        {/* Feet on floor */}
        <line x1="230" y1={floorLineY} x2="270" y2={floorLineY} stroke="#9ba5a8" strokeWidth="5" strokeLinecap="round" />

        {/* Lower Leg */}
        <line x1="245" y1={floorLineY} x2={kneeX} y2={kneeY} stroke={athleteBodyColor} strokeWidth="8" strokeLinecap="round" />
        <circle cx={kneeX} cy={kneeY} r="5" fill={jointColor} />

        {/* Thigh (Knee to Hip) */}
        <line x1={kneeX} y1={kneeY} x2={hipX} y2={hipY} stroke={athleteBodyColor} strokeWidth="10" strokeLinecap="round" />
        {/* Hamstring / Glute Highlight */}
        <line
          x1={kneeX - 6}
          y1={kneeY - 6}
          x2={hipX - 2}
          y2={hipY - 2}
          stroke={isEnd ? voltGreen : cyanMovement}
          strokeWidth="6"
          strokeLinecap="round"
        />
        <circle cx={hipX} cy={hipY} r="6" fill={jointColor} />

        {/* Torso (Hip to Shoulder) */}
        <line x1={hipX} y1={hipY} x2={shoulderX} y2={shoulderY} stroke={athleteBodyColor} strokeWidth="13" strokeLinecap="round" />

        {/* Head */}
        <circle cx={headX} cy={headY} r="14" fill={athleteBodyColor} />

        {/* Arms straight down from shoulder to Bar */}
        <line x1={shoulderX} y1={shoulderY} x2={barX} y2={barY} stroke={athleteBodyColor} strokeWidth="7" strokeLinecap="round" />
        <circle cx={barX} cy={barY} r="5" fill={jointColor} />

        {/* Barbell & Plates */}
        <circle cx={barX} cy={barY} r="25" fill={weightPlateColor} stroke={barColor} strokeWidth="2.5" />
        <circle cx={barX} cy={barY} r="15" fill="#15212d" stroke={isEnd ? voltGreen : barColor} strokeWidth="1.5" />
        <line x1={barX - 28} y1={barY} x2={barX + 28} y2={barY} stroke={barColor} strokeWidth="4" />

        <text x="50" y="45" fill={isEnd ? purpleEnd : (isMovement ? cyanMovement : voltGreen)} fontSize="12" fontWeight="800" letterSpacing="0.08em">
          {isEnd ? "● PHASE 3: TALL LOCKOUT (GLUTES & HIPS FORWARD)" : (isMovement ? "● PHASE 2: FLOOR DRIVE & KNEE CLEARANCE" : "● PHASE 1: WEDGE SETUP OVER MIDFOOT")}
        </text>
      </svg>
    );
  }

  // 5. Overhead Shoulder Press Biomechanics
  if (categoryKey === "shoulder-press") {
    const isEnd = phase === "end";
    const isMovement = phase === "movement";

    // Front/3/4 athletic standing figure
    // Center at x=250
    // Start: Dumbbells/Bar at shoulder/collarbone level (y=135)
    // End: Pressed directly overhead (y=65)
    const weightY = isEnd ? 65 : (isMovement ? 100 : 135);
    const leftWeightX = isEnd ? 225 : (isMovement ? 200 : 185);
    const rightWeightX = isEnd ? 275 : (isMovement ? 300 : 315);
    const elbowY = isEnd ? 105 : (isMovement ? 140 : 175);

    return (
      <svg viewBox="0 0 500 320" className="demo-svg-canvas" aria-label="Shoulder Press Illustration">
        <GroundPlatform />

        {/* Press Trajectory Arrows */}
        {(isMovement || phase === "all") && (
          <g>
            <TrajectoryPath pathD="M 185 135 Q 200 100 225 65" arrowEnd={true} />
            <TrajectoryPath pathD="M 315 135 Q 300 100 275 65" label="VERTICAL OVERHEAD LOCKOUT" arrowEnd={true} />
          </g>
        )}

        {/* Ghost at Start when at End */}
        {isEnd && (
          <g opacity="0.25">
            <rect x="175" y="125" width="20" height="20" rx="3" fill="none" stroke="#ffffff" strokeWidth="2" />
            <rect x="305" y="125" width="20" height="20" rx="3" fill="none" stroke="#ffffff" strokeWidth="2" />
          </g>
        )}

        {/* Legs & Torso (Standing Stiff Pillar) */}
        <line x1="230" y1={floorLineY} x2="240" y2="210" stroke={athleteBodyColor} strokeWidth="8" strokeLinecap="round" />
        <line x1="270" y1={floorLineY} x2="260" y2="210" stroke={athleteBodyColor} strokeWidth="8" strokeLinecap="round" />
        {/* Torso */}
        <line x1="250" y1="210" x2="250" y2="125" stroke={athleteBodyColor} strokeWidth="15" strokeLinecap="round" />

        {/* Deltoid / Shoulder highlights */}
        <circle cx="215" cy="130" r="10" fill={isEnd ? voltGreen : cyanMovement} opacity="0.85" />
        <circle cx="285" cy="130" r="10" fill={isEnd ? voltGreen : cyanMovement} opacity="0.85" />

        {/* Head */}
        <circle cx="250" cy="98" r="14" fill={athleteBodyColor} />

        {/* Left Arm & Weight */}
        <line x1="220" y1="130" x2="195" y2={elbowY} stroke={athleteBodyColor} strokeWidth="7" strokeLinecap="round" />
        <line x1="195" y1={elbowY} x2={leftWeightX} y2={weightY} stroke={athleteBodyColor} strokeWidth="7" strokeLinecap="round" />
        {/* Left Dumbbell */}
        <rect x={leftWeightX - 16} y={weightY - 9} width="32" height="18" rx="4" fill={weightPlateColor} stroke={barColor} strokeWidth="2" />

        {/* Right Arm & Weight */}
        <line x1="280" y1="130" x2="305" y2={elbowY} stroke={athleteBodyColor} strokeWidth="7" strokeLinecap="round" />
        <line x1="305" y1={elbowY} x2={rightWeightX} y2={weightY} stroke={athleteBodyColor} strokeWidth="7" strokeLinecap="round" />
        {/* Right Dumbbell */}
        <rect x={rightWeightX - 16} y={weightY - 9} width="32" height="18" rx="4" fill={weightPlateColor} stroke={barColor} strokeWidth="2" />

        <text x="50" y="45" fill={isEnd ? purpleEnd : (isMovement ? cyanMovement : voltGreen)} fontSize="12" fontWeight="800" letterSpacing="0.08em">
          {isEnd ? "● PHASE 3: FULL OVERHEAD LOCKOUT (BICEPS AT EARS)" : (isMovement ? "● PHASE 2: VERTICAL PRESS & HEAD CLEARANCE" : "● PHASE 1: STACKED ELBOWS & BRACED CORE")}
        </text>
      </svg>
    );
  }

  // 6. Bicep Curl Biomechanics
  if (categoryKey === "bicep-curl") {
    const isEnd = phase === "end";
    const isMovement = phase === "movement";

    // Lifter Standing profile
    // Elbow static at x=235, y=165
    // Start: Dumbbell hanging at x=238, y=235
    // End: Dumbbell curled up to anterior shoulder at x=260, y=125
    const weightX = isEnd ? 260 : (isMovement ? 275 : 238);
    const weightY = isEnd ? 125 : (isMovement ? 180 : 235);
    const elbowX = 235;
    const elbowY = 165;

    return (
      <svg viewBox="0 0 500 320" className="demo-svg-canvas" aria-label="Bicep Curl Illustration">
        <GroundPlatform />

        {/* Semi-circular Curling Arc Trajectory */}
        {(isMovement || phase === "all") && (
          <TrajectoryPath
            pathD="M 238 235 Q 285 200 260 125"
            label="CURVED CONCENTRIC SUPINATION ARC"
          />
        )}

        {/* Ghost of Start when at Top */}
        {isEnd && (
          <g opacity="0.25">
            <line x1={elbowX} y1={elbowY} x2="238" y2="235" stroke="#ffffff" strokeWidth="6" strokeDasharray="3 3" />
            <circle cx="238" cy="235" r="12" fill="none" stroke="#ffffff" strokeWidth="2" />
          </g>
        )}

        {/* Lifter Body */}
        <line x1="200" y1={floorLineY} x2="210" y2="210" stroke={athleteBodyColor} strokeWidth="8" strokeLinecap="round" />
        <line x1="210" y1="210" x2="210" y2="125" stroke={athleteBodyColor} strokeWidth="15" strokeLinecap="round" />
        {/* Head */}
        <circle cx="210" cy="95" r="14" fill={athleteBodyColor} />

        {/* Upper Arm (Pinned firmly at side) */}
        <line x1="215" y1="125" x2={elbowX} y2={elbowY} stroke={athleteBodyColor} strokeWidth="9" strokeLinecap="round" />
        {/* Bicep Muscle Peak Highlight */}
        <ellipse
          cx="228"
          cy="145"
          rx={isEnd ? 12 : 7}
          ry={isEnd ? 14 : 9}
          fill={isEnd ? voltGreen : cyanMovement}
        />

        {/* Elbow Joint (Static Pivot Anchor) */}
        <circle cx={elbowX} cy={elbowY} r="6" fill={jointColor} />

        {/* Forearm (Flexing upward) */}
        <line x1={elbowX} y1={elbowY} x2={weightX} y2={weightY} stroke={athleteBodyColor} strokeWidth="7" strokeLinecap="round" />
        <circle cx={weightX} cy={weightY} r="5" fill={jointColor} />

        {/* Dumbbell */}
        <g transform={`translate(${weightX}, ${weightY})`}>
          <rect x="-14" y="-8" width="28" height="16" rx="3" fill={weightPlateColor} stroke={barColor} strokeWidth="2" />
          <line x1="-18" y1="0" x2="18" y2="0" stroke={barColor} strokeWidth="3" />
        </g>

        <text x="50" y="45" fill={isEnd ? purpleEnd : (isMovement ? cyanMovement : voltGreen)} fontSize="12" fontWeight="800" letterSpacing="0.08em">
          {isEnd ? "● PHASE 3: PEAK BICEP CONTRACTION & SUPINATION" : (isMovement ? "● PHASE 2: FOREARM ROTATION & CONCENTRIC FLEXION" : "● PHASE 1: FULL EXTENSION WITH PINNED ELBOWS")}
        </text>
      </svg>
    );
  }

  // Fallback / Standard Biomechanical Diagram for other exercises
  return (
    <svg viewBox="0 0 500 320" className="demo-svg-canvas" aria-label="Biomechanical Exercise Illustration">
      <GroundPlatform />
      <TrajectoryPath pathD="M 200 230 Q 250 140 300 230" label="KINETIC RESISTANCE VECTOR" />
      <circle cx="250" cy="110" r="14" fill={athleteBodyColor} />
      <line x1="250" y1="124" x2="250" y2="210" stroke={athleteBodyColor} strokeWidth="13" strokeLinecap="round" />
      <line x1="250" y1="210" x2="220" y2={floorLineY} stroke={athleteBodyColor} strokeWidth="8" strokeLinecap="round" />
      <line x1="250" y1="210" x2="280" y2={floorLineY} stroke={athleteBodyColor} strokeWidth="8" strokeLinecap="round" />
      <circle cx="250" cy="160" r="22" fill="none" stroke={voltGreen} strokeWidth="2" strokeDasharray="4 4" />
      <text x="50" y="45" fill={voltGreen} fontSize="12" fontWeight="800" letterSpacing="0.08em">
        ● BIOMECHANICAL MOTION PATH
      </text>
    </svg>
  );
};

/**
 * Reusable ExerciseDemo Component
 * Encapsulates the visual demonstration of exercise movement:
 * - Starting Position
 * - Movement
 * - Ending Position
 */
export const ExerciseDemo = ({
  exercise,
  onSelectPrev,
  onSelectNext,
  currentIndex = 0,
  totalExercises = 1
}) => {
  const demoData = useMemo(() => resolveExerciseDemo(exercise), [exercise]);
  const [viewMode, setViewMode] = useState("dynamic"); // "dynamic" | "side-by-side" | "start" | "movement" | "end"
  const [isPlaying, setIsPlaying] = useState(true);
  const [animProgress, setAnimProgress] = useState(0); // 0 to 100
  const [playbackSpeed, setPlaybackSpeed] = useState(1); // 1x or 0.5x

  // Animation Loop for Dynamic Mode
  useEffect(() => {
    if (viewMode !== "dynamic" || !isPlaying) return;

    const intervalTime = 40 / playbackSpeed;
    const interval = setInterval(() => {
      setAnimProgress((prev) => (prev >= 100 ? 0 : prev + 1.2));
    }, intervalTime);

    return () => clearInterval(interval);
  }, [viewMode, isPlaying, playbackSpeed]);

  // Derive current phase based on progress in Dynamic Mode
  const currentPhase = useMemo(() => {
    if (viewMode === "start") return "start";
    if (viewMode === "movement") return "movement";
    if (viewMode === "end") return "end";
    if (viewMode === "side-by-side") return "all";

    // In dynamic mode:
    // 0-30%: start position
    // 30-70%: movement & trajectory
    // 70-100%: ending position
    if (animProgress < 30) return "start";
    if (animProgress < 70) return "movement";
    return "end";
  }, [viewMode, animProgress]);

  const handleReset = () => {
    setAnimProgress(0);
    setIsPlaying(true);
  };

  return (
    <section className="exercise-demo-container" aria-label={`Exercise Demonstration: ${demoData.name}`}>
      {/* Header Area */}
      <div className="exercise-demo-header">
        <div className="exercise-demo-title-group">
          <div className="exercise-demo-badge">
            <Activity size={14} />
            <span>EXERCISE DEMONSTRATION</span>
          </div>
          <h3 className="exercise-demo-title">{demoData.name}</h3>
          <span className="exercise-demo-subtitle">{demoData.description}</span>
        </div>

        {/* Quick Tags (Equipment & Muscle targets) */}
        <div className="exercise-demo-quick-tags">
          <span className="demo-chip highlight">
            <Dumbbell size={13} />
            <span>{demoData.equipment}</span>
          </span>
          {demoData.targetMuscles.slice(0, 3).map((muscle, idx) => (
            <span key={idx} className="demo-chip">
              {muscle}
            </span>
          ))}
          {totalExercises > 1 && (
            <span className="demo-chip">
              Exercise {currentIndex + 1} of {totalExercises}
            </span>
          )}
        </div>
      </div>

      {/* Mode Switch & Playback Toolbar */}
      <div className="demo-toolbar">
        {/* Mode Selector Tabs */}
        <div className="demo-mode-tabs" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={viewMode === "dynamic"}
            className={`demo-mode-btn ${viewMode === "dynamic" ? "active" : ""}`}
            onClick={() => { setViewMode("dynamic"); setIsPlaying(true); }}
          >
            <Activity size={14} />
            <span>Dynamic Motion</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={viewMode === "side-by-side"}
            className={`demo-mode-btn ${viewMode === "side-by-side" ? "active" : ""}`}
            onClick={() => setViewMode("side-by-side")}
          >
            <Columns size={14} />
            <span>Start vs End View</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={viewMode === "start"}
            className={`demo-mode-btn ${viewMode === "start" ? "active" : ""}`}
            onClick={() => setViewMode("start")}
          >
            <span>1. Start Position</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={viewMode === "movement"}
            className={`demo-mode-btn ${viewMode === "movement" ? "active" : ""}`}
            onClick={() => setViewMode("movement")}
          >
            <span>2. Movement Path</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={viewMode === "end"}
            className={`demo-mode-btn ${viewMode === "end" ? "active" : ""}`}
            onClick={() => setViewMode("end")}
          >
            <span>3. Ending Position</span>
          </button>
        </div>

        {/* Playback Controls (Active in Dynamic Mode) */}
        {viewMode === "dynamic" && (
          <div className="demo-playback-controls">
            <button
              type="button"
              className="demo-action-btn"
              onClick={() => setIsPlaying(!isPlaying)}
              aria-label={isPlaying ? "Pause demonstration animation" : "Play demonstration animation"}
            >
              {isPlaying ? <Pause size={14} /> : <Play size={14} />}
              <span>{isPlaying ? "Pause" : "Play"}</span>
            </button>

            <button
              type="button"
              className="demo-action-btn"
              onClick={handleReset}
              aria-label="Replay demonstration"
            >
              <RotateCcw size={14} />
              <span>Replay</span>
            </button>

            <button
              type="button"
              className="demo-action-btn"
              onClick={() => setPlaybackSpeed(playbackSpeed === 1 ? 0.5 : 1)}
              title="Toggle slow-motion analysis"
            >
              <span>{playbackSpeed === 0.5 ? "0.5x Slow-Mo" : "1x Speed"}</span>
            </button>
          </div>
        )}
      </div>

      {/* Main Visual Stage / Viewport */}
      <div className="demo-stage-viewport">
        {/* Active Phase Pill Badge */}
        <div className="demo-stage-indicator">
          <span className={`demo-phase-dot ${currentPhase}`} />
          <span>
            {currentPhase === "start" && "STARTING POSITION SETUP"}
            {currentPhase === "movement" && "MOVEMENT & TRAJECTORY"}
            {currentPhase === "end" && "ENDING POSITION / PEAK LOCKOUT"}
            {currentPhase === "all" && "START & FINISH COMPARISON"}
          </span>
        </div>

        {/* Content depending on mode */}
        {viewMode === "side-by-side" ? (
          /* Split View: Side-by-Side Starting Position & Ending Position */
          <div className="demo-split-grid">
            <div className="demo-split-card">
              <span className="demo-split-card-title start">
                <CheckCircle2 size={12} />
                <span>Starting Position</span>
              </span>
              <BiomechanicalFigure categoryKey={demoData.categoryKey} phase="start" isComparing={true} />
            </div>

            <div className="demo-split-divider">
              <div className="demo-split-arrow">
                <ArrowRight size={20} />
              </div>
              <span>Movement</span>
            </div>

            <div className="demo-split-card">
              <span className="demo-split-card-title end">
                <CheckCircle2 size={12} />
                <span>Ending Position</span>
              </span>
              <BiomechanicalFigure categoryKey={demoData.categoryKey} phase="end" isComparing={true} />
            </div>
          </div>
        ) : (
          /* Single Viewport with Dynamic Animation or Isolated Phase */
          <BiomechanicalFigure categoryKey={demoData.categoryKey} phase={currentPhase} />
        )}

        {/* Timeline Progress Bar (for dynamic playback) */}
        {viewMode === "dynamic" && (
          <div className="demo-stage-timeline">
            <div className="demo-progress-bar-track">
              <div className="demo-progress-bar-fill" style={{ width: `${animProgress}%` }} />
            </div>
            <div className="demo-timeline-markers">
              <span className={`demo-timeline-marker ${animProgress < 30 ? "active" : ""}`}>
                1. Starting Position
              </span>
              <span className={`demo-timeline-marker ${animProgress >= 30 && animProgress < 70 ? "active" : ""}`}>
                2. Movement Execution
              </span>
              <span className={`demo-timeline-marker ${animProgress >= 70 ? "active" : ""}`}>
                3. Ending Position
              </span>
            </div>
          </div>
        )}
      </div>

      {/* 3 Core Pillars: Starting Position, Movement, Ending Position */}
      <div className="demo-breakdown-pillars">
        {/* Pillar 1: Starting Position */}
        <div 
          className={`demo-pillar-card pillar-start ${currentPhase === "start" ? "active" : ""}`}
          onClick={() => setViewMode("start")}
        >
          <div className="demo-pillar-badge">
            <CheckCircle2 size={12} />
            <span>Starting Position</span>
          </div>
          <h4 className="demo-pillar-title">{demoData.startingPosition.title}</h4>
          <p className="demo-pillar-desc">{demoData.startingPosition.description}</p>
          <ul className="demo-cues-list">
            {demoData.startingPosition.cues.slice(0, 3).map((cue, idx) => (
              <li key={idx} className="demo-cue-item">
                <ShieldCheck size={13} color="var(--volt-green)" />
                <span>{cue}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Pillar 2: Movement */}
        <div 
          className={`demo-pillar-card pillar-movement ${currentPhase === "movement" ? "active" : ""}`}
          onClick={() => setViewMode("movement")}
        >
          <div className="demo-pillar-badge">
            <Activity size={12} />
            <span>Movement & Trajectory</span>
          </div>
          <h4 className="demo-pillar-title">{demoData.movement.title}</h4>
          <p className="demo-pillar-desc">{demoData.movement.description}</p>
          <ul className="demo-cues-list">
            {demoData.movement.cues.slice(0, 3).map((cue, idx) => (
              <li key={idx} className="demo-cue-item">
                <Compass size={13} color="#38bdf8" />
                <span>{cue}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Pillar 3: Ending Position */}
        <div 
          className={`demo-pillar-card pillar-end ${currentPhase === "end" ? "active" : ""}`}
          onClick={() => setViewMode("end")}
        >
          <div className="demo-pillar-badge">
            <Flame size={12} />
            <span>Ending Position</span>
          </div>
          <h4 className="demo-pillar-title">{demoData.endingPosition.title}</h4>
          <p className="demo-pillar-desc">{demoData.endingPosition.description}</p>
          <ul className="demo-cues-list">
            {demoData.endingPosition.cues.slice(0, 3).map((cue, idx) => (
              <li key={idx} className="demo-cue-item">
                <CheckCircle2 size={13} color="#c084fc" />
                <span>{cue}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Biomechanics & Tempo Meta Bar */}
      <div className="demo-biomechanics-bar">
        <div className="demo-bio-item">
          <strong>Prescribed Tempo:</strong>
          <span>{demoData.tempo}</span>
        </div>
        <div className="demo-bio-item">
          <strong>Primary Target:</strong>
          <span>{demoData.targetMuscles.join(", ")}</span>
        </div>
      </div>
    </section>
  );
};
