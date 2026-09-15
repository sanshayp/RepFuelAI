/**
 * Comprehensive Indian Food Nutrition Dataset & Unit Conversions
 * RepFuelAI Experimental Nutrition Module
 * Contains 140 authentic Indian foods with multiple practical serving measurement units.
 */

export const indianFoodCategories = [
  "All",
  "Breakfast",
  "Indian Breads",
  "Rice & Grains",
  "Dal & Legumes",
  "Sabzi & Vegetables",
  "Dairy & Paneer",
  "Eggs & Poultry",
  "Snacks & Street Food",
  "Fruits",
  "Beverages"
];

export const indianFoods = [
  // ==========================================
  // --- BREAKFAST ---
  // ==========================================
  {
    id: 1,
    name: "Poha (Flattened Rice)",
    category: "Breakfast",
    defaultUnit: "bowl",
    serving: "1 medium bowl (150g)",
    calories: 210,
    protein: 4,
    carbs: 42,
    fats: 3,
    units: {
      bowl: { label: "bowl (150g)", multiplier: 1.0 },
      plate: { label: "plate (250g)", multiplier: 1.67 },
      cup: { label: "cup (100g)", multiplier: 0.67 },
      gram: { label: "gram (g)", multiplier: 0.00667 },
      kilogram: { label: "kilogram (kg)", multiplier: 6.67 },
      tablespoon: { label: "tablespoon (tbsp)", multiplier: 0.12 },
      serving: { label: "serving (150g)", multiplier: 1.0 }
    }
  },
  {
    id: 2,
    name: "Upma (Semolina)",
    category: "Breakfast",
    defaultUnit: "bowl",
    serving: "1 medium bowl (150g)",
    calories: 220,
    protein: 5,
    carbs: 38,
    fats: 6,
    units: {
      bowl: { label: "bowl (150g)", multiplier: 1.0 },
      plate: { label: "plate (250g)", multiplier: 1.67 },
      cup: { label: "cup (120g)", multiplier: 0.8 },
      gram: { label: "gram (g)", multiplier: 0.00667 },
      tablespoon: { label: "tablespoon (tbsp)", multiplier: 0.14 },
      serving: { label: "serving (150g)", multiplier: 1.0 }
    }
  },
  {
    id: 3,
    name: "Idli (Steamed Rice Cakes)",
    category: "Breakfast",
    defaultUnit: "piece",
    serving: "1 piece (50g)",
    calories: 65,
    protein: 2,
    carbs: 13,
    fats: 0.2,
    units: {
      piece: { label: "piece (50g)", multiplier: 1.0 },
      plate: { label: "plate (2 pieces / 100g)", multiplier: 2.0 },
      gram: { label: "gram (g)", multiplier: 0.02 },
      serving: { label: "serving (2 pieces)", multiplier: 2.0 }
    }
  },
  {
    id: 4,
    name: "Plain Dosa",
    category: "Breakfast",
    defaultUnit: "piece",
    serving: "1 medium dosa (100g)",
    calories: 165,
    protein: 3.5,
    carbs: 28,
    fats: 4,
    units: {
      piece: { label: "piece / dosa (100g)", multiplier: 1.0 },
      plate: { label: "plate (1 big dosa)", multiplier: 1.25 },
      gram: { label: "gram (g)", multiplier: 0.01 },
      serving: { label: "serving", multiplier: 1.0 }
    }
  },
  {
    id: 5,
    name: "Masala Dosa",
    category: "Breakfast",
    defaultUnit: "piece",
    serving: "1 dosa with potato filling (160g)",
    calories: 290,
    protein: 5,
    carbs: 45,
    fats: 10,
    units: {
      piece: { label: "piece / dosa (160g)", multiplier: 1.0 },
      plate: { label: "plate (1 full dosa)", multiplier: 1.0 },
      gram: { label: "gram (g)", multiplier: 0.00625 },
      serving: { label: "serving", multiplier: 1.0 }
    }
  },
  {
    id: 6,
    name: "Rava Dosa",
    category: "Breakfast",
    defaultUnit: "piece",
    serving: "1 crisp rava dosa (110g)",
    calories: 195,
    protein: 4,
    carbs: 31,
    fats: 6,
    units: {
      piece: { label: "piece / dosa (110g)", multiplier: 1.0 },
      plate: { label: "plate (1 dosa)", multiplier: 1.0 },
      gram: { label: "gram (g)", multiplier: 0.0091 },
      serving: { label: "serving", multiplier: 1.0 }
    }
  },
  {
    id: 7,
    name: "Besan Chilla (Gram Flour Pancake)",
    category: "Breakfast",
    defaultUnit: "piece",
    serving: "1 medium chilla (60g)",
    calories: 110,
    protein: 5.5,
    carbs: 14,
    fats: 3.5,
    units: {
      piece: { label: "piece / chilla (60g)", multiplier: 1.0 },
      plate: { label: "plate (2 chillas / 120g)", multiplier: 2.0 },
      gram: { label: "gram (g)", multiplier: 0.0167 },
      serving: { label: "serving (2 chillas)", multiplier: 2.0 }
    }
  },
  {
    id: 8,
    name: "Moong Dal Chilla",
    category: "Breakfast",
    defaultUnit: "piece",
    serving: "1 medium chilla (65g)",
    calories: 115,
    protein: 7,
    carbs: 16,
    fats: 2.5,
    units: {
      piece: { label: "piece / chilla (65g)", multiplier: 1.0 },
      plate: { label: "plate (2 chillas)", multiplier: 2.0 },
      gram: { label: "gram (g)", multiplier: 0.0154 },
      serving: { label: "serving (2 chillas)", multiplier: 2.0 }
    }
  },
  {
    id: 9,
    name: "Oats with Milk & Nuts",
    category: "Breakfast",
    defaultUnit: "bowl",
    serving: "1 bowl (200g)",
    calories: 280,
    protein: 11,
    carbs: 42,
    fats: 7,
    units: {
      bowl: { label: "bowl (200g)", multiplier: 1.0 },
      cup: { label: "cup (150g)", multiplier: 0.75 },
      gram: { label: "gram (g)", multiplier: 0.005 },
      serving: { label: "serving (200g)", multiplier: 1.0 }
    }
  },
  {
    id: 10,
    name: "Aloo Paratha (with Ghee)",
    category: "Breakfast",
    defaultUnit: "piece",
    serving: "1 medium paratha (120g)",
    calories: 290,
    protein: 5.5,
    carbs: 45,
    fats: 10,
    units: {
      piece: { label: "piece / paratha (120g)", multiplier: 1.0 },
      plate: { label: "plate (2 parathas)", multiplier: 2.0 },
      gram: { label: "gram (g)", multiplier: 0.00833 },
      serving: { label: "serving", multiplier: 1.0 }
    }
  },
  {
    id: 11,
    name: "Paneer Paratha",
    category: "Breakfast",
    defaultUnit: "piece",
    serving: "1 medium paratha (130g)",
    calories: 320,
    protein: 12,
    carbs: 38,
    fats: 13,
    units: {
      piece: { label: "piece / paratha (130g)", multiplier: 1.0 },
      plate: { label: "plate (2 parathas)", multiplier: 2.0 },
      gram: { label: "gram (g)", multiplier: 0.00769 },
      serving: { label: "serving", multiplier: 1.0 }
    }
  },
  {
    id: 12,
    name: "Gobi Paratha",
    category: "Breakfast",
    defaultUnit: "piece",
    serving: "1 medium paratha (110g)",
    calories: 240,
    protein: 5,
    carbs: 38,
    fats: 8,
    units: {
      piece: { label: "piece / paratha (110g)", multiplier: 1.0 },
      plate: { label: "plate (2 parathas)", multiplier: 2.0 },
      gram: { label: "gram (g)", multiplier: 0.00909 },
      serving: { label: "serving", multiplier: 1.0 }
    }
  },
  {
    id: 13,
    name: "Methi Thepla",
    category: "Breakfast",
    defaultUnit: "piece",
    serving: "1 thepla (45g)",
    calories: 120,
    protein: 3.2,
    carbs: 18,
    fats: 4,
    units: {
      piece: { label: "piece / thepla (45g)", multiplier: 1.0 },
      plate: { label: "plate (3 theplas)", multiplier: 3.0 },
      roti: { label: "roti / thepla", multiplier: 1.0 },
      gram: { label: "gram (g)", multiplier: 0.0222 },
      serving: { label: "serving (2 theplas)", multiplier: 2.0 }
    }
  },
  {
    id: 14,
    name: "Bread Omelette (2 Eggs)",
    category: "Breakfast",
    defaultUnit: "plate",
    serving: "2 eggs + 2 slices bread",
    calories: 340,
    protein: 18,
    carbs: 26,
    fats: 16,
    units: {
      plate: { label: "plate (2 eggs + 2 slices)", multiplier: 1.0 },
      slice: { label: "slice half-serving", multiplier: 0.5 },
      serving: { label: "serving", multiplier: 1.0 }
    }
  },
  {
    id: 15,
    name: "Masala Omelette",
    category: "Breakfast",
    defaultUnit: "egg",
    serving: "2 eggs with veggies & spices",
    calories: 205,
    protein: 14,
    carbs: 4,
    fats: 14.5,
    units: {
      egg: { label: "2 egg omelette", multiplier: 1.0 },
      piece: { label: "single egg omelette", multiplier: 0.5 },
      plate: { label: "3 egg large omelette", multiplier: 1.5 },
      serving: { label: "serving", multiplier: 1.0 }
    }
  },
  {
    id: 16,
    name: "Vegetable Sandwich (Mint Chutney)",
    category: "Breakfast",
    defaultUnit: "piece",
    serving: "1 sandwich (2 slices bread + salad)",
    calories: 210,
    protein: 5.5,
    carbs: 36,
    fats: 4.5,
    units: {
      piece: { label: "piece / sandwich (2 slices)", multiplier: 1.0 },
      slice: { label: "single open slice", multiplier: 0.5 },
      plate: { label: "plate (2 sandwiches)", multiplier: 2.0 },
      serving: { label: "serving", multiplier: 1.0 }
    }
  },
  {
    id: 17,
    name: "Uttapam (Onion Tomato)",
    category: "Breakfast",
    defaultUnit: "piece",
    serving: "1 medium uttapam (120g)",
    calories: 185,
    protein: 4.5,
    carbs: 32,
    fats: 4.5,
    units: {
      piece: { label: "piece / uttapam (120g)", multiplier: 1.0 },
      plate: { label: "plate (2 small uttapams)", multiplier: 1.5 },
      gram: { label: "gram (g)", multiplier: 0.00833 },
      serving: { label: "serving", multiplier: 1.0 }
    }
  },
  {
    id: 18,
    name: "Medu Vada",
    category: "Breakfast",
    defaultUnit: "piece",
    serving: "1 piece (50g)",
    calories: 145,
    protein: 4,
    carbs: 14,
    fats: 8,
    units: {
      piece: { label: "piece (50g)", multiplier: 1.0 },
      plate: { label: "plate (2 vadas / 100g)", multiplier: 2.0 },
      gram: { label: "gram (g)", multiplier: 0.02 },
      serving: { label: "serving (2 vadas)", multiplier: 2.0 }
    }
  },
  {
    id: 19,
    name: "Puri (Deep Fried Bread)",
    category: "Breakfast",
    defaultUnit: "piece",
    serving: "1 puri (30g)",
    calories: 105,
    protein: 1.8,
    carbs: 13,
    fats: 5.5,
    units: {
      piece: { label: "piece / puri (30g)", multiplier: 1.0 },
      plate: { label: "plate (4 puris with bhaji)", multiplier: 4.0 },
      serving: { label: "serving (3 puris)", multiplier: 3.0 }
    }
  },
  {
    id: 20,
    name: "Sabudana Khichdi",
    category: "Breakfast",
    defaultUnit: "bowl",
    serving: "1 medium bowl (150g with peanuts)",
    calories: 320,
    protein: 4,
    carbs: 52,
    fats: 11,
    units: {
      bowl: { label: "bowl (150g)", multiplier: 1.0 },
      plate: { label: "plate (250g)", multiplier: 1.67 },
      cup: { label: "cup (120g)", multiplier: 0.8 },
      gram: { label: "gram (g)", multiplier: 0.00667 },
      serving: { label: "serving", multiplier: 1.0 }
    }
  },
  {
    id: 21,
    name: "Sooji Halwa / Sheera",
    category: "Breakfast",
    defaultUnit: "bowl",
    serving: "1 small katori (100g)",
    calories: 260,
    protein: 3.5,
    carbs: 42,
    fats: 9,
    units: {
      bowl: { label: "bowl / katori (100g)", multiplier: 1.0 },
      cup: { label: "cup (150g)", multiplier: 1.5 },
      tablespoon: { label: "tablespoon (tbsp)", multiplier: 0.25 },
      gram: { label: "gram (g)", multiplier: 0.01 },
      serving: { label: "serving", multiplier: 1.0 }
    }
  },

  // ==========================================
  // --- INDIAN BREADS ---
  // ==========================================
  {
    id: 22,
    name: "Roti / Phulka (Whole Wheat, No Ghee)",
    category: "Indian Breads",
    defaultUnit: "roti",
    serving: "1 medium roti (35g)",
    calories: 85,
    protein: 3,
    carbs: 17,
    fats: 0.5,
    units: {
      roti: { label: "roti / phulka (35g)", multiplier: 1.0 },
      piece: { label: "piece (35g)", multiplier: 1.0 },
      plate: { label: "plate (3 rotis)", multiplier: 3.0 },
      gram: { label: "gram (g)", multiplier: 0.0286 },
      serving: { label: "serving (2 rotis)", multiplier: 2.0 }
    }
  },
  {
    id: 23,
    name: "Roti with Ghee",
    category: "Indian Breads",
    defaultUnit: "roti",
    serving: "1 medium roti + 1/2 tsp ghee (38g)",
    calories: 110,
    protein: 3,
    carbs: 17,
    fats: 3.2,
    units: {
      roti: { label: "roti with ghee (38g)", multiplier: 1.0 },
      piece: { label: "piece", multiplier: 1.0 },
      plate: { label: "plate (3 rotis)", multiplier: 3.0 },
      serving: { label: "serving (2 rotis)", multiplier: 2.0 }
    }
  },
  {
    id: 24,
    name: "Tandoori Roti",
    category: "Indian Breads",
    defaultUnit: "roti",
    serving: "1 tandoori roti (50g)",
    calories: 115,
    protein: 3.8,
    carbs: 23,
    fats: 0.8,
    units: {
      roti: { label: "roti (50g)", multiplier: 1.0 },
      piece: { label: "piece", multiplier: 1.0 },
      plate: { label: "plate (2 rotis)", multiplier: 2.0 },
      serving: { label: "serving", multiplier: 1.0 }
    }
  },
  {
    id: 25,
    name: "Plain Paratha (Pan Fried)",
    category: "Indian Breads",
    defaultUnit: "piece",
    serving: "1 triangular paratha (60g)",
    calories: 190,
    protein: 4,
    carbs: 26,
    fats: 8,
    units: {
      piece: { label: "piece / paratha (60g)", multiplier: 1.0 },
      roti: { label: "paratha", multiplier: 1.0 },
      plate: { label: "plate (2 parathas)", multiplier: 2.0 },
      serving: { label: "serving", multiplier: 1.0 }
    }
  },
  {
    id: 26,
    name: "Butter Naan",
    category: "Indian Breads",
    defaultUnit: "piece",
    serving: "1 naan (90g)",
    calories: 300,
    protein: 7,
    carbs: 46,
    fats: 10,
    units: {
      piece: { label: "piece / naan (90g)", multiplier: 1.0 },
      plate: { label: "plate (1 full naan)", multiplier: 1.0 },
      gram: { label: "gram (g)", multiplier: 0.0111 },
      serving: { label: "serving", multiplier: 1.0 }
    }
  },
  {
    id: 27,
    name: "Garlic Naan",
    category: "Indian Breads",
    defaultUnit: "piece",
    serving: "1 garlic naan (95g)",
    calories: 310,
    protein: 7.2,
    carbs: 47,
    fats: 10.5,
    units: {
      piece: { label: "piece / naan (95g)", multiplier: 1.0 },
      plate: { label: "plate (1 naan)", multiplier: 1.0 },
      serving: { label: "serving", multiplier: 1.0 }
    }
  },
  {
    id: 28,
    name: "Missi Roti (Gram Flour & Spices)",
    category: "Indian Breads",
    defaultUnit: "roti",
    serving: "1 missi roti (50g)",
    calories: 140,
    protein: 6,
    carbs: 22,
    fats: 3.5,
    units: {
      roti: { label: "roti (50g)", multiplier: 1.0 },
      piece: { label: "piece", multiplier: 1.0 },
      plate: { label: "plate (2 rotis)", multiplier: 2.0 },
      serving: { label: "serving", multiplier: 1.0 }
    }
  },
  {
    id: 29,
    name: "Bajra Roti (Pearl Millet)",
    category: "Indian Breads",
    defaultUnit: "roti",
    serving: "1 bajra roti (60g)",
    calories: 155,
    protein: 4.5,
    carbs: 28,
    fats: 2.5,
    units: {
      roti: { label: "roti (60g)", multiplier: 1.0 },
      piece: { label: "piece", multiplier: 1.0 },
      plate: { label: "plate (2 rotis)", multiplier: 2.0 },
      serving: { label: "serving", multiplier: 1.0 }
    }
  },
  {
    id: 30,
    name: "Jowar Bhakri (Sorghum)",
    category: "Indian Breads",
    defaultUnit: "roti",
    serving: "1 jowar bhakri (60g)",
    calories: 145,
    protein: 4,
    carbs: 30,
    fats: 1.2,
    units: {
      roti: { label: "bhakri / roti (60g)", multiplier: 1.0 },
      piece: { label: "piece", multiplier: 1.0 },
      plate: { label: "plate (2 bhakris)", multiplier: 2.0 },
      serving: { label: "serving", multiplier: 1.0 }
    }
  },
  {
    id: 31,
    name: "Bhatura (Deep Fried Leavened)",
    category: "Indian Breads",
    defaultUnit: "piece",
    serving: "1 large bhatura (80g)",
    calories: 290,
    protein: 5.5,
    carbs: 38,
    fats: 13,
    units: {
      piece: { label: "piece / bhatura (80g)", multiplier: 1.0 },
      plate: { label: "plate (2 bhaturas)", multiplier: 2.0 },
      serving: { label: "serving", multiplier: 1.0 }
    }
  },
  {
    id: 32,
    name: "Whole Wheat Bread Slice",
    category: "Indian Breads",
    defaultUnit: "slice",
    serving: "1 slice (28g)",
    calories: 68,
    protein: 3,
    carbs: 12,
    fats: 0.9,
    units: {
      slice: { label: "slice (28g)", multiplier: 1.0 },
      piece: { label: "piece", multiplier: 1.0 },
      plate: { label: "plate (2 slices)", multiplier: 2.0 },
      gram: { label: "gram (g)", multiplier: 0.0357 },
      serving: { label: "serving (2 slices)", multiplier: 2.0 }
    }
  },

  // ==========================================
  // --- RICE & GRAINS ---
  // ==========================================
  {
    id: 33,
    name: "Steamed White Rice (Basmati)",
    category: "Rice & Grains",
    defaultUnit: "bowl",
    serving: "1 medium katori / bowl (150g cooked)",
    calories: 195,
    protein: 3.8,
    carbs: 43,
    fats: 0.5,
    units: {
      bowl: { label: "bowl (150g cooked)", multiplier: 1.0 },
      cup: { label: "cup (180g)", multiplier: 1.2 },
      plate: { label: "plate (280g)", multiplier: 1.87 },
      gram: { label: "gram (g)", multiplier: 0.00667 },
      kilogram: { label: "kilogram (kg)", multiplier: 6.67 },
      tablespoon: { label: "tablespoon (tbsp)", multiplier: 0.16 },
      serving: { label: "serving (150g)", multiplier: 1.0 }
    }
  },
  {
    id: 34,
    name: "Brown Rice (Cooked)",
    category: "Rice & Grains",
    defaultUnit: "bowl",
    serving: "1 medium bowl (150g cooked)",
    calories: 165,
    protein: 3.5,
    carbs: 35,
    fats: 1.3,
    units: {
      bowl: { label: "bowl (150g)", multiplier: 1.0 },
      cup: { label: "cup (180g)", multiplier: 1.2 },
      plate: { label: "plate (280g)", multiplier: 1.87 },
      gram: { label: "gram (g)", multiplier: 0.00667 },
      serving: { label: "serving", multiplier: 1.0 }
    }
  },
  {
    id: 35,
    name: "Jeera Rice (Cumin Rice with Ghee)",
    category: "Rice & Grains",
    defaultUnit: "bowl",
    serving: "1 medium bowl (160g)",
    calories: 225,
    protein: 4,
    carbs: 42,
    fats: 4.5,
    units: {
      bowl: { label: "bowl (160g)", multiplier: 1.0 },
      cup: { label: "cup (180g)", multiplier: 1.13 },
      plate: { label: "plate (300g)", multiplier: 1.88 },
      gram: { label: "gram (g)", multiplier: 0.00625 },
      serving: { label: "serving", multiplier: 1.0 }
    }
  },
  {
    id: 36,
    name: "Vegetable Fried Rice",
    category: "Rice & Grains",
    defaultUnit: "bowl",
    serving: "1 bowl (180g)",
    calories: 250,
    protein: 5,
    carbs: 44,
    fats: 6.5,
    units: {
      bowl: { label: "bowl (180g)", multiplier: 1.0 },
      plate: { label: "plate (300g)", multiplier: 1.67 },
      cup: { label: "cup (150g)", multiplier: 0.83 },
      gram: { label: "gram (g)", multiplier: 0.00556 },
      serving: { label: "serving", multiplier: 1.0 }
    }
  },
  {
    id: 37,
    name: "Vegetable Pulao",
    category: "Rice & Grains",
    defaultUnit: "bowl",
    serving: "1 bowl (180g)",
    calories: 235,
    protein: 5,
    carbs: 43,
    fats: 5,
    units: {
      bowl: { label: "bowl (180g)", multiplier: 1.0 },
      plate: { label: "plate (300g)", multiplier: 1.67 },
      gram: { label: "gram (g)", multiplier: 0.00556 },
      serving: { label: "serving", multiplier: 1.0 }
    }
  },
  {
    id: 38,
    name: "Dal Khichdi",
    category: "Rice & Grains",
    defaultUnit: "bowl",
    serving: "1 medium bowl (200g)",
    calories: 220,
    protein: 8,
    carbs: 38,
    fats: 4,
    units: {
      bowl: { label: "bowl (200g)", multiplier: 1.0 },
      cup: { label: "cup (160g)", multiplier: 0.8 },
      plate: { label: "plate (320g)", multiplier: 1.6 },
      gram: { label: "gram (g)", multiplier: 0.005 },
      serving: { label: "serving (200g)", multiplier: 1.0 }
    }
  },
  {
    id: 39,
    name: "Curd Rice (South Indian Style)",
    category: "Rice & Grains",
    defaultUnit: "bowl",
    serving: "1 bowl (200g with tempering)",
    calories: 230,
    protein: 7,
    carbs: 36,
    fats: 6,
    units: {
      bowl: { label: "bowl (200g)", multiplier: 1.0 },
      plate: { label: "plate (300g)", multiplier: 1.5 },
      cup: { label: "cup (160g)", multiplier: 0.8 },
      gram: { label: "gram (g)", multiplier: 0.005 },
      serving: { label: "serving", multiplier: 1.0 }
    }
  },
  {
    id: 40,
    name: "Vegetable Dum Biryani",
    category: "Rice & Grains",
    defaultUnit: "plate",
    serving: "1 plate (300g)",
    calories: 380,
    protein: 8,
    carbs: 62,
    fats: 11,
    units: {
      plate: { label: "plate (300g)", multiplier: 1.0 },
      bowl: { label: "bowl (180g)", multiplier: 0.6 },
      gram: { label: "gram (g)", multiplier: 0.00333 },
      serving: { label: "serving", multiplier: 1.0 }
    }
  },
  {
    id: 41,
    name: "Chicken Biryani (Hyderabadi)",
    category: "Rice & Grains",
    defaultUnit: "plate",
    serving: "1 plate (350g with 2 chicken pieces)",
    calories: 520,
    protein: 28,
    carbs: 65,
    fats: 16,
    units: {
      plate: { label: "plate (350g)", multiplier: 1.0 },
      bowl: { label: "bowl (200g)", multiplier: 0.57 },
      gram: { label: "gram (g)", multiplier: 0.00286 },
      serving: { label: "serving", multiplier: 1.0 }
    }
  },
  {
    id: 42,
    name: "Egg Biryani",
    category: "Rice & Grains",
    defaultUnit: "plate",
    serving: "1 plate (320g with 2 boiled eggs)",
    calories: 440,
    protein: 19,
    carbs: 58,
    fats: 14,
    units: {
      plate: { label: "plate (320g)", multiplier: 1.0 },
      bowl: { label: "bowl (180g)", multiplier: 0.56 },
      serving: { label: "serving", multiplier: 1.0 }
    }
  },
  {
    id: 43,
    name: "Mutton Biryani",
    category: "Rice & Grains",
    defaultUnit: "plate",
    serving: "1 plate (350g with tender mutton pieces)",
    calories: 590,
    protein: 30,
    carbs: 62,
    fats: 24,
    units: {
      plate: { label: "plate (350g)", multiplier: 1.0 },
      bowl: { label: "bowl (200g)", multiplier: 0.57 },
      serving: { label: "serving", multiplier: 1.0 }
    }
  },
  {
    id: 44,
    name: "Cooked Quinoa",
    category: "Rice & Grains",
    defaultUnit: "bowl",
    serving: "1 medium bowl (150g cooked)",
    calories: 170,
    protein: 6.5,
    carbs: 30,
    fats: 2.8,
    units: {
      bowl: { label: "bowl (150g)", multiplier: 1.0 },
      cup: { label: "cup (180g)", multiplier: 1.2 },
      gram: { label: "gram (g)", multiplier: 0.00667 },
      serving: { label: "serving", multiplier: 1.0 }
    }
  },

  // ==========================================
  // --- DAL & LEGUMES ---
  // ==========================================
  {
    id: 45,
    name: "Yellow Dal Tadka",
    category: "Dal & Legumes",
    defaultUnit: "bowl",
    serving: "1 katori / bowl (150g)",
    calories: 155,
    protein: 8,
    carbs: 22,
    fats: 4,
    units: {
      bowl: { label: "bowl (150g)", multiplier: 1.0 },
      cup: { label: "cup (200ml)", multiplier: 1.33 },
      plate: { label: "plate (250g)", multiplier: 1.67 },
      millilitre: { label: "millilitre (ml)", multiplier: 0.00667 },
      litre: { label: "litre (L)", multiplier: 6.67 },
      tablespoon: { label: "tablespoon (tbsp)", multiplier: 0.1 },
      gram: { label: "gram (g)", multiplier: 0.00667 },
      serving: { label: "serving", multiplier: 1.0 }
    }
  },
  {
    id: 46,
    name: "Dal Fry",
    category: "Dal & Legumes",
    defaultUnit: "bowl",
    serving: "1 bowl (160g)",
    calories: 175,
    protein: 8.5,
    carbs: 23,
    fats: 5.5,
    units: {
      bowl: { label: "bowl (160g)", multiplier: 1.0 },
      cup: { label: "cup (200ml)", multiplier: 1.25 },
      millilitre: { label: "millilitre (ml)", multiplier: 0.00625 },
      gram: { label: "gram (g)", multiplier: 0.00625 },
      serving: { label: "serving", multiplier: 1.0 }
    }
  },
  {
    id: 47,
    name: "Dal Makhani (Restaurant Style with Butter)",
    category: "Dal & Legumes",
    defaultUnit: "bowl",
    serving: "1 katori / bowl (160g)",
    calories: 270,
    protein: 9.5,
    carbs: 26,
    fats: 14.5,
    units: {
      bowl: { label: "bowl (160g)", multiplier: 1.0 },
      cup: { label: "cup (200ml)", multiplier: 1.25 },
      plate: { label: "plate (260g)", multiplier: 1.63 },
      millilitre: { label: "millilitre (ml)", multiplier: 0.00625 },
      serving: { label: "serving", multiplier: 1.0 }
    }
  },
  {
    id: 48,
    name: "Rajma Masala (Kidney Beans Curry)",
    category: "Dal & Legumes",
    defaultUnit: "bowl",
    serving: "1 medium bowl (180g)",
    calories: 210,
    protein: 10.5,
    carbs: 32,
    fats: 4.5,
    units: {
      bowl: { label: "bowl (180g)", multiplier: 1.0 },
      cup: { label: "cup (200g)", multiplier: 1.11 },
      plate: { label: "plate (280g)", multiplier: 1.56 },
      gram: { label: "gram (g)", multiplier: 0.00556 },
      serving: { label: "serving", multiplier: 1.0 }
    }
  },
  {
    id: 49,
    name: "Chana Masala / Chole",
    category: "Dal & Legumes",
    defaultUnit: "bowl",
    serving: "1 medium bowl (180g)",
    calories: 235,
    protein: 11,
    carbs: 34,
    fats: 6,
    units: {
      bowl: { label: "bowl (180g)", multiplier: 1.0 },
      cup: { label: "cup (200g)", multiplier: 1.11 },
      plate: { label: "plate (280g)", multiplier: 1.56 },
      gram: { label: "gram (g)", multiplier: 0.00556 },
      serving: { label: "serving", multiplier: 1.0 }
    }
  },
  {
    id: 50,
    name: "Sambar (South Indian Lentil Stew)",
    category: "Dal & Legumes",
    defaultUnit: "bowl",
    serving: "1 bowl (180ml)",
    calories: 120,
    protein: 5.5,
    carbs: 20,
    fats: 2.5,
    units: {
      bowl: { label: "bowl (180ml)", multiplier: 1.0 },
      cup: { label: "cup (200ml)", multiplier: 1.11 },
      millilitre: { label: "millilitre (ml)", multiplier: 0.00556 },
      litre: { label: "litre (L)", multiplier: 5.56 },
      serving: { label: "serving", multiplier: 1.0 }
    }
  },
  {
    id: 51,
    name: "Rasam (Spiced Pepper Tomato Broth)",
    category: "Dal & Legumes",
    defaultUnit: "bowl",
    serving: "1 bowl / cup (150ml)",
    calories: 55,
    protein: 2,
    carbs: 9,
    fats: 1.2,
    units: {
      bowl: { label: "bowl (150ml)", multiplier: 1.0 },
      cup: { label: "cup (180ml)", multiplier: 1.2 },
      glass: { label: "glass (200ml)", multiplier: 1.33 },
      millilitre: { label: "millilitre (ml)", multiplier: 0.00667 },
      serving: { label: "serving", multiplier: 1.0 }
    }
  },
  {
    id: 52,
    name: "Kadhi Pakora (Gram Flour & Yogurt)",
    category: "Dal & Legumes",
    defaultUnit: "bowl",
    serving: "1 bowl (180g with 2 pakoras)",
    calories: 215,
    protein: 6.5,
    carbs: 22,
    fats: 11,
    units: {
      bowl: { label: "bowl (180g)", multiplier: 1.0 },
      cup: { label: "cup (160g)", multiplier: 0.89 },
      plate: { label: "plate (260g)", multiplier: 1.44 },
      millilitre: { label: "millilitre (ml)", multiplier: 0.00556 },
      serving: { label: "serving", multiplier: 1.0 }
    }
  },
  {
    id: 53,
    name: "Gujarati Kadhi (Sweet & Tangy)",
    category: "Dal & Legumes",
    defaultUnit: "bowl",
    serving: "1 bowl (150ml)",
    calories: 115,
    protein: 3.5,
    carbs: 16,
    fats: 4,
    units: {
      bowl: { label: "bowl (150ml)", multiplier: 1.0 },
      cup: { label: "cup (180ml)", multiplier: 1.2 },
      millilitre: { label: "millilitre (ml)", multiplier: 0.00667 },
      serving: { label: "serving", multiplier: 1.0 }
    }
  },
  {
    id: 54,
    name: "Moong Dal (Cooked Plain)",
    category: "Dal & Legumes",
    defaultUnit: "bowl",
    serving: "1 bowl (150g)",
    calories: 140,
    protein: 9,
    carbs: 21,
    fats: 2,
    units: {
      bowl: { label: "bowl (150g)", multiplier: 1.0 },
      cup: { label: "cup (180g)", multiplier: 1.2 },
      millilitre: { label: "millilitre (ml)", multiplier: 0.00667 },
      gram: { label: "gram (g)", multiplier: 0.00667 },
      serving: { label: "serving", multiplier: 1.0 }
    }
  },
  {
    id: 55,
    name: "Kala Chana Masala (Brown Chickpeas)",
    category: "Dal & Legumes",
    defaultUnit: "bowl",
    serving: "1 bowl (160g)",
    calories: 195,
    protein: 10,
    carbs: 29,
    fats: 4.5,
    units: {
      bowl: { label: "bowl (160g)", multiplier: 1.0 },
      cup: { label: "cup (180g)", multiplier: 1.13 },
      gram: { label: "gram (g)", multiplier: 0.00625 },
      serving: { label: "serving", multiplier: 1.0 }
    }
  },
  {
    id: 56,
    name: "Lobia Curry (Black-Eyed Peas)",
    category: "Dal & Legumes",
    defaultUnit: "bowl",
    serving: "1 bowl (160g)",
    calories: 185,
    protein: 9.5,
    carbs: 28,
    fats: 4,
    units: {
      bowl: { label: "bowl (160g)", multiplier: 1.0 },
      cup: { label: "cup (180g)", multiplier: 1.13 },
      gram: { label: "gram (g)", multiplier: 0.00625 },
      serving: { label: "serving", multiplier: 1.0 }
    }
  },

  // ==========================================
  // --- SABZI & VEGETABLES ---
  // ==========================================
  {
    id: 57,
    name: "Mixed Vegetable Sabzi",
    category: "Sabzi & Vegetables",
    defaultUnit: "bowl",
    serving: "1 katori / bowl (150g)",
    calories: 130,
    protein: 3.5,
    carbs: 16,
    fats: 6,
    units: {
      bowl: { label: "bowl (150g)", multiplier: 1.0 },
      plate: { label: "plate (240g)", multiplier: 1.6 },
      cup: { label: "cup (140g)", multiplier: 0.93 },
      gram: { label: "gram (g)", multiplier: 0.00667 },
      serving: { label: "serving", multiplier: 1.0 }
    }
  },
  {
    id: 58,
    name: "Aloo Sabzi / Aloo Jeera",
    category: "Sabzi & Vegetables",
    defaultUnit: "bowl",
    serving: "1 bowl (150g)",
    calories: 175,
    protein: 2.8,
    carbs: 26,
    fats: 7,
    units: {
      bowl: { label: "bowl (150g)", multiplier: 1.0 },
      plate: { label: "plate (240g)", multiplier: 1.6 },
      gram: { label: "gram (g)", multiplier: 0.00667 },
      serving: { label: "serving", multiplier: 1.0 }
    }
  },
  {
    id: 59,
    name: "Bhindi Masala (Okra)",
    category: "Sabzi & Vegetables",
    defaultUnit: "bowl",
    serving: "1 katori / bowl (130g)",
    calories: 115,
    protein: 2.5,
    carbs: 12,
    fats: 6.5,
    units: {
      bowl: { label: "bowl (130g)", multiplier: 1.0 },
      plate: { label: "plate (200g)", multiplier: 1.54 },
      cup: { label: "cup (120g)", multiplier: 0.92 },
      gram: { label: "gram (g)", multiplier: 0.00769 },
      serving: { label: "serving", multiplier: 1.0 }
    }
  },
  {
    id: 60,
    name: "Baingan Bharta (Roasted Eggplant)",
    category: "Sabzi & Vegetables",
    defaultUnit: "bowl",
    serving: "1 medium bowl (150g)",
    calories: 125,
    protein: 2.2,
    carbs: 14,
    fats: 7,
    units: {
      bowl: { label: "bowl (150g)", multiplier: 1.0 },
      plate: { label: "plate (220g)", multiplier: 1.47 },
      gram: { label: "gram (g)", multiplier: 0.00667 },
      serving: { label: "serving", multiplier: 1.0 }
    }
  },
  {
    id: 61,
    name: "Palak Paneer",
    category: "Sabzi & Vegetables",
    defaultUnit: "bowl",
    serving: "1 medium bowl (180g)",
    calories: 245,
    protein: 12,
    carbs: 9,
    fats: 18,
    units: {
      bowl: { label: "bowl (180g)", multiplier: 1.0 },
      plate: { label: "plate (260g)", multiplier: 1.44 },
      cup: { label: "cup (160g)", multiplier: 0.89 },
      gram: { label: "gram (g)", multiplier: 0.00556 },
      serving: { label: "serving", multiplier: 1.0 }
    }
  },
  {
    id: 62,
    name: "Shahi Paneer (Cashew Gravy)",
    category: "Sabzi & Vegetables",
    defaultUnit: "bowl",
    serving: "1 bowl (180g)",
    calories: 320,
    protein: 13,
    carbs: 15,
    fats: 24,
    units: {
      bowl: { label: "bowl (180g)", multiplier: 1.0 },
      plate: { label: "plate (260g)", multiplier: 1.44 },
      gram: { label: "gram (g)", multiplier: 0.00556 },
      serving: { label: "serving", multiplier: 1.0 }
    }
  },
  {
    id: 63,
    name: "Matar Paneer",
    category: "Sabzi & Vegetables",
    defaultUnit: "bowl",
    serving: "1 bowl (180g)",
    calories: 260,
    protein: 12,
    carbs: 18,
    fats: 16,
    units: {
      bowl: { label: "bowl (180g)", multiplier: 1.0 },
      plate: { label: "plate (260g)", multiplier: 1.44 },
      gram: { label: "gram (g)", multiplier: 0.00556 },
      serving: { label: "serving", multiplier: 1.0 }
    }
  },
  {
    id: 64,
    name: "Paneer Butter Masala",
    category: "Sabzi & Vegetables",
    defaultUnit: "bowl",
    serving: "1 bowl (180g)",
    calories: 340,
    protein: 13.5,
    carbs: 14,
    fats: 26,
    units: {
      bowl: { label: "bowl (180g)", multiplier: 1.0 },
      plate: { label: "plate (260g)", multiplier: 1.44 },
      gram: { label: "gram (g)", multiplier: 0.00556 },
      serving: { label: "serving", multiplier: 1.0 }
    }
  },
  {
    id: 65,
    name: "Paneer Bhurji (Scrambled Paneer)",
    category: "Sabzi & Vegetables",
    defaultUnit: "bowl",
    serving: "1 medium bowl (150g)",
    calories: 280,
    protein: 16,
    carbs: 7,
    fats: 21,
    units: {
      bowl: { label: "bowl (150g)", multiplier: 1.0 },
      plate: { label: "plate (220g)", multiplier: 1.47 },
      gram: { label: "gram (g)", multiplier: 0.00667 },
      serving: { label: "serving", multiplier: 1.0 }
    }
  },
  {
    id: 66,
    name: "Aloo Gobi (Potato & Cauliflower)",
    category: "Sabzi & Vegetables",
    defaultUnit: "bowl",
    serving: "1 bowl (150g)",
    calories: 145,
    protein: 3,
    carbs: 19,
    fats: 6.5,
    units: {
      bowl: { label: "bowl (150g)", multiplier: 1.0 },
      plate: { label: "plate (240g)", multiplier: 1.6 },
      gram: { label: "gram (g)", multiplier: 0.00667 },
      serving: { label: "serving", multiplier: 1.0 }
    }
  },
  {
    id: 67,
    name: "Gajar Matar Sabzi",
    category: "Sabzi & Vegetables",
    defaultUnit: "bowl",
    serving: "1 bowl (150g)",
    calories: 120,
    protein: 3.5,
    carbs: 18,
    fats: 4,
    units: {
      bowl: { label: "bowl (150g)", multiplier: 1.0 },
      plate: { label: "plate (240g)", multiplier: 1.6 },
      gram: { label: "gram (g)", multiplier: 0.00667 },
      serving: { label: "serving", multiplier: 1.0 }
    }
  },
  {
    id: 68,
    name: "Lauki / Bottle Gourd Sabzi (Ghiya)",
    category: "Sabzi & Vegetables",
    defaultUnit: "bowl",
    serving: "1 bowl (160g light gravy)",
    calories: 90,
    protein: 2,
    carbs: 11,
    fats: 4.5,
    units: {
      bowl: { label: "bowl (160g)", multiplier: 1.0 },
      plate: { label: "plate (240g)", multiplier: 1.5 },
      gram: { label: "gram (g)", multiplier: 0.00625 },
      serving: { label: "serving", multiplier: 1.0 }
    }
  },
  {
    id: 69,
    name: "Cabbage Poriyal / Cabbage Sabzi",
    category: "Sabzi & Vegetables",
    defaultUnit: "bowl",
    serving: "1 bowl (140g)",
    calories: 105,
    protein: 2.5,
    carbs: 12,
    fats: 5.5,
    units: {
      bowl: { label: "bowl (140g)", multiplier: 1.0 },
      plate: { label: "plate (220g)", multiplier: 1.57 },
      gram: { label: "gram (g)", multiplier: 0.00714 },
      serving: { label: "serving", multiplier: 1.0 }
    }
  },
  {
    id: 70,
    name: "Mushroom Masala",
    category: "Sabzi & Vegetables",
    defaultUnit: "bowl",
    serving: "1 bowl (170g)",
    calories: 160,
    protein: 6.5,
    carbs: 14,
    fats: 9,
    units: {
      bowl: { label: "bowl (170g)", multiplier: 1.0 },
      plate: { label: "plate (250g)", multiplier: 1.47 },
      gram: { label: "gram (g)", multiplier: 0.00588 },
      serving: { label: "serving", multiplier: 1.0 }
    }
  },
  {
    id: 71,
    name: "Soya Chunks Curry",
    category: "Sabzi & Vegetables",
    defaultUnit: "bowl",
    serving: "1 medium bowl (180g with high protein)",
    calories: 195,
    protein: 18.5,
    carbs: 16,
    fats: 6,
    units: {
      bowl: { label: "bowl (180g)", multiplier: 1.0 },
      plate: { label: "plate (280g)", multiplier: 1.56 },
      cup: { label: "cup (150g)", multiplier: 0.83 },
      gram: { label: "gram (g)", multiplier: 0.00556 },
      serving: { label: "serving", multiplier: 1.0 }
    }
  },
  {
    id: 72,
    name: "Dum Aloo (Kashmiri / Punjabi)",
    category: "Sabzi & Vegetables",
    defaultUnit: "bowl",
    serving: "1 bowl (180g)",
    calories: 220,
    protein: 3.5,
    carbs: 28,
    fats: 11,
    units: {
      bowl: { label: "bowl (180g)", multiplier: 1.0 },
      plate: { label: "plate (260g)", multiplier: 1.44 },
      serving: { label: "serving", multiplier: 1.0 }
    }
  },

  // ==========================================
  // --- POULTRY, MEAT & EGGS ---
  // ==========================================
  {
    id: 73,
    name: "Boiled Whole Egg",
    category: "Eggs & Poultry",
    defaultUnit: "egg",
    serving: "1 large egg (50g)",
    calories: 75,
    protein: 6.3,
    carbs: 0.6,
    fats: 5,
    units: {
      egg: { label: "egg (50g)", multiplier: 1.0 },
      piece: { label: "piece", multiplier: 1.0 },
      plate: { label: "plate (3 eggs)", multiplier: 3.0 },
      serving: { label: "serving (2 eggs)", multiplier: 2.0 }
    }
  },
  {
    id: 74,
    name: "Boiled Egg White",
    category: "Eggs & Poultry",
    defaultUnit: "egg",
    serving: "1 egg white (33g)",
    calories: 17,
    protein: 3.6,
    carbs: 0.2,
    fats: 0.1,
    units: {
      egg: { label: "egg white (33g)", multiplier: 1.0 },
      piece: { label: "piece", multiplier: 1.0 },
      plate: { label: "plate (4 egg whites)", multiplier: 4.0 },
      serving: { label: "serving (3 egg whites)", multiplier: 3.0 }
    }
  },
  {
    id: 75,
    name: "Egg Bhurji (Indian Scrambled Eggs)",
    category: "Eggs & Poultry",
    defaultUnit: "plate",
    serving: "2 eggs scrambled with onion, tomato & green chili",
    calories: 215,
    protein: 13.5,
    carbs: 4.5,
    fats: 16,
    units: {
      plate: { label: "plate (2 eggs bhurji)", multiplier: 1.0 },
      bowl: { label: "bowl (1 serving)", multiplier: 1.0 },
      egg: { label: "single egg equivalent", multiplier: 0.5 },
      serving: { label: "serving", multiplier: 1.0 }
    }
  },
  {
    id: 76,
    name: "Egg Curry (Homestyle with 2 Eggs)",
    category: "Eggs & Poultry",
    defaultUnit: "bowl",
    serving: "1 bowl with 2 eggs & gravy (220g)",
    calories: 260,
    protein: 15,
    carbs: 11,
    fats: 17,
    units: {
      bowl: { label: "bowl (2 eggs / 220g)", multiplier: 1.0 },
      plate: { label: "plate (300g)", multiplier: 1.36 },
      serving: { label: "serving", multiplier: 1.0 }
    }
  },
  {
    id: 77,
    name: "Grilled Chicken Breast (Boneless)",
    category: "Eggs & Poultry",
    defaultUnit: "gram",
    serving: "150g grilled breast",
    calories: 245,
    protein: 46,
    carbs: 0,
    fats: 5.5,
    units: {
      gram: { label: "gram (g)", multiplier: 0.00667 },
      kilogram: { label: "kilogram (kg)", multiplier: 6.67 },
      piece: { label: "piece / fillet (150g)", multiplier: 1.0 },
      plate: { label: "plate (200g)", multiplier: 1.33 },
      serving: { label: "serving (150g)", multiplier: 1.0 }
    }
  },
  {
    id: 78,
    name: "Butter Chicken (Murgh Makhani)",
    category: "Eggs & Poultry",
    defaultUnit: "bowl",
    serving: "1 medium bowl (200g with chicken pieces)",
    calories: 390,
    protein: 26,
    carbs: 12,
    fats: 27,
    units: {
      bowl: { label: "bowl (200g)", multiplier: 1.0 },
      plate: { label: "plate (300g)", multiplier: 1.5 },
      serving: { label: "serving", multiplier: 1.0 }
    }
  },
  {
    id: 79,
    name: "Chicken Curry (Homestyle)",
    category: "Eggs & Poultry",
    defaultUnit: "bowl",
    serving: "1 medium bowl (200g with 2 pieces)",
    calories: 285,
    protein: 27,
    carbs: 8,
    fats: 16,
    units: {
      bowl: { label: "bowl (200g)", multiplier: 1.0 },
      plate: { label: "plate (300g)", multiplier: 1.5 },
      serving: { label: "serving", multiplier: 1.0 }
    }
  },
  {
    id: 80,
    name: "Chicken Tikka (Tandoori Roasted)",
    category: "Eggs & Poultry",
    defaultUnit: "piece",
    serving: "1 piece (35g boneless)",
    calories: 55,
    protein: 8.5,
    carbs: 1.5,
    fats: 1.8,
    units: {
      piece: { label: "piece (35g)", multiplier: 1.0 },
      plate: { label: "plate (6 pieces / 210g)", multiplier: 6.0 },
      gram: { label: "gram (g)", multiplier: 0.0286 },
      serving: { label: "serving (5 pieces)", multiplier: 5.0 }
    }
  },
  {
    id: 81,
    name: "Mutton Curry (Rogan Josh Style)",
    category: "Eggs & Poultry",
    defaultUnit: "bowl",
    serving: "1 bowl (200g with 3 tender mutton pieces)",
    calories: 380,
    protein: 28,
    carbs: 9,
    fats: 26,
    units: {
      bowl: { label: "bowl (200g)", multiplier: 1.0 },
      plate: { label: "plate (300g)", multiplier: 1.5 },
      serving: { label: "serving", multiplier: 1.0 }
    }
  },
  {
    id: 82,
    name: "Fish Curry (Goan / Bengali Mustard)",
    category: "Eggs & Poultry",
    defaultUnit: "bowl",
    serving: "1 bowl (200g with 1 fish steak)",
    calories: 240,
    protein: 24,
    carbs: 7,
    fats: 13,
    units: {
      bowl: { label: "bowl (200g)", multiplier: 1.0 },
      piece: { label: "fish piece / steak", multiplier: 1.0 },
      plate: { label: "plate (300g)", multiplier: 1.5 },
      serving: { label: "serving", multiplier: 1.0 }
    }
  },
  {
    id: 83,
    name: "Fish Fry (Tawa Pomfret / Surmai)",
    category: "Eggs & Poultry",
    defaultUnit: "piece",
    serving: "1 tawa fried fish slice (120g)",
    calories: 220,
    protein: 25,
    carbs: 6,
    fats: 11,
    units: {
      piece: { label: "piece / fillet (120g)", multiplier: 1.0 },
      plate: { label: "plate (2 pieces)", multiplier: 2.0 },
      serving: { label: "serving", multiplier: 1.0 }
    }
  },

  // ==========================================
  // --- DAIRY & PLANT PROTEIN ---
  // ==========================================
  {
    id: 84,
    name: "Fresh Paneer (Raw Cubes)",
    category: "Dairy & Paneer",
    defaultUnit: "gram",
    serving: "100g raw paneer",
    calories: 265,
    protein: 18.5,
    carbs: 4.5,
    fats: 20,
    units: {
      gram: { label: "gram (g)", multiplier: 0.01 },
      kilogram: { label: "kilogram (kg)", multiplier: 10.0 },
      bowl: { label: "bowl (150g cubes)", multiplier: 1.5 },
      piece: { label: "piece / cube (20g)", multiplier: 0.2 },
      serving: { label: "serving (100g)", multiplier: 1.0 }
    }
  },
  {
    id: 85,
    name: "Low Fat Paneer",
    category: "Dairy & Paneer",
    defaultUnit: "gram",
    serving: "100g low-fat paneer",
    calories: 165,
    protein: 24,
    carbs: 5,
    fats: 5.5,
    units: {
      gram: { label: "gram (g)", multiplier: 0.01 },
      kilogram: { label: "kilogram (kg)", multiplier: 10.0 },
      bowl: { label: "bowl (150g cubes)", multiplier: 1.5 },
      piece: { label: "piece / cube (20g)", multiplier: 0.2 },
      serving: { label: "serving (100g)", multiplier: 1.0 }
    }
  },
  {
    id: 86,
    name: "Tofu (Firm / Soya Paneer)",
    category: "Dairy & Paneer",
    defaultUnit: "gram",
    serving: "100g firm tofu",
    calories: 120,
    protein: 14,
    carbs: 3,
    fats: 6,
    units: {
      gram: { label: "gram (g)", multiplier: 0.01 },
      kilogram: { label: "kilogram (kg)", multiplier: 10.0 },
      bowl: { label: "bowl (150g cubes)", multiplier: 1.5 },
      piece: { label: "piece / cube (20g)", multiplier: 0.2 },
      serving: { label: "serving (100g)", multiplier: 1.0 }
    }
  },
  {
    id: 87,
    name: "Curd / Dahi (Plain Homestyle)",
    category: "Dairy & Paneer",
    defaultUnit: "bowl",
    serving: "1 katori / bowl (150g)",
    calories: 95,
    protein: 5.5,
    carbs: 7.5,
    fats: 5,
    units: {
      bowl: { label: "bowl / katori (150g)", multiplier: 1.0 },
      cup: { label: "cup (200g)", multiplier: 1.33 },
      gram: { label: "gram (g)", multiplier: 0.00667 },
      kilogram: { label: "kilogram (kg)", multiplier: 6.67 },
      tablespoon: { label: "tablespoon (tbsp)", multiplier: 0.15 },
      serving: { label: "serving (150g)", multiplier: 1.0 }
    }
  },
  {
    id: 88,
    name: "Greek Yogurt (Plain High Protein)",
    category: "Dairy & Paneer",
    defaultUnit: "cup",
    serving: "1 cup (150g)",
    calories: 110,
    protein: 15,
    carbs: 6,
    fats: 2.5,
    units: {
      cup: { label: "cup (150g)", multiplier: 1.0 },
      bowl: { label: "bowl (150g)", multiplier: 1.0 },
      gram: { label: "gram (g)", multiplier: 0.00667 },
      tablespoon: { label: "tablespoon (tbsp)", multiplier: 0.15 },
      serving: { label: "serving (150g)", multiplier: 1.0 }
    }
  },
  {
    id: 89,
    name: "Whole Cow Milk",
    category: "Dairy & Paneer",
    defaultUnit: "glass",
    serving: "1 glass (250ml)",
    calories: 160,
    protein: 8,
    carbs: 12,
    fats: 9,
    units: {
      glass: { label: "glass (250ml)", multiplier: 1.0 },
      cup: { label: "cup (200ml)", multiplier: 0.8 },
      millilitre: { label: "millilitre (ml)", multiplier: 0.004 },
      litre: { label: "litre (L)", multiplier: 4.0 },
      tablespoon: { label: "tablespoon (tbsp)", multiplier: 0.06 },
      serving: { label: "serving (250ml)", multiplier: 1.0 }
    }
  },
  {
    id: 90,
    name: "Toned / Skimmed Milk",
    category: "Dairy & Paneer",
    defaultUnit: "glass",
    serving: "1 glass (250ml)",
    calories: 120,
    protein: 8.5,
    carbs: 12.5,
    fats: 3.5,
    units: {
      glass: { label: "glass (250ml)", multiplier: 1.0 },
      cup: { label: "cup (200ml)", multiplier: 0.8 },
      millilitre: { label: "millilitre (ml)", multiplier: 0.004 },
      litre: { label: "litre (L)", multiplier: 4.0 },
      serving: { label: "serving", multiplier: 1.0 }
    }
  },
  {
    id: 91,
    name: "Whey Protein Scoop",
    category: "Dairy & Paneer",
    defaultUnit: "serving",
    serving: "1 scoop (30g powder in water)",
    calories: 120,
    protein: 24,
    carbs: 2.5,
    fats: 1.5,
    units: {
      serving: { label: "serving / scoop (30g)", multiplier: 1.0 },
      gram: { label: "gram (g powder)", multiplier: 0.0333 },
      tablespoon: { label: "tablespoon (10g)", multiplier: 0.33 }
    }
  },
  {
    id: 92,
    name: "Peanut Butter (Natural)",
    category: "Dairy & Paneer",
    defaultUnit: "tablespoon",
    serving: "1 tablespoon (16g)",
    calories: 95,
    protein: 4,
    carbs: 3,
    fats: 8,
    units: {
      tablespoon: { label: "tablespoon (16g)", multiplier: 1.0 },
      teaspoon: { label: "teaspoon (5g)", multiplier: 0.31 },
      gram: { label: "gram (g)", multiplier: 0.0625 },
      serving: { label: "serving (2 tbsp / 32g)", multiplier: 2.0 }
    }
  },

  // ==========================================
  // --- SNACKS & STREET FOOD ---
  // ==========================================
  {
    id: 93,
    name: "Pakora (Mixed Vegetable / Onion)",
    category: "Snacks & Street Food",
    defaultUnit: "piece",
    serving: "1 piece (25g)",
    calories: 65,
    protein: 1.5,
    carbs: 6,
    fats: 4.2,
    units: {
      piece: { label: "piece (25g)", multiplier: 1.0 },
      plate: { label: "plate (6 pieces / 150g)", multiplier: 6.0 },
      serving: { label: "serving (4 pieces)", multiplier: 4.0 }
    }
  },
  {
    id: 94,
    name: "Paneer Pakora",
    category: "Snacks & Street Food",
    defaultUnit: "piece",
    serving: "1 piece (40g)",
    calories: 120,
    protein: 5,
    carbs: 7,
    fats: 8.5,
    units: {
      piece: { label: "piece (40g)", multiplier: 1.0 },
      plate: { label: "plate (4 pieces)", multiplier: 4.0 },
      serving: { label: "serving", multiplier: 1.0 }
    }
  },
  {
    id: 95,
    name: "Vegetable Samosa",
    category: "Snacks & Street Food",
    defaultUnit: "piece",
    serving: "1 medium samosa (75g)",
    calories: 240,
    protein: 3.5,
    carbs: 28,
    fats: 13,
    units: {
      piece: { label: "piece (75g)", multiplier: 1.0 },
      plate: { label: "plate (2 samosas)", multiplier: 2.0 },
      serving: { label: "serving", multiplier: 1.0 }
    }
  },
  {
    id: 96,
    name: "Khasta Kachori",
    category: "Snacks & Street Food",
    defaultUnit: "piece",
    serving: "1 piece (70g)",
    calories: 270,
    protein: 4.5,
    carbs: 31,
    fats: 15,
    units: {
      piece: { label: "piece (70g)", multiplier: 1.0 },
      plate: { label: "plate (2 kachoris)", multiplier: 2.0 },
      serving: { label: "serving", multiplier: 1.0 }
    }
  },
  {
    id: 97,
    name: "Vada Pav (Mumbai Street Style)",
    category: "Snacks & Street Food",
    defaultUnit: "piece",
    serving: "1 vada pav with chutneys (120g)",
    calories: 295,
    protein: 6.5,
    carbs: 44,
    fats: 11,
    units: {
      piece: { label: "piece / vada pav (120g)", multiplier: 1.0 },
      plate: { label: "plate (2 vada pavs)", multiplier: 2.0 },
      serving: { label: "serving", multiplier: 1.0 }
    }
  },
  {
    id: 98,
    name: "Pav Bhaji",
    category: "Snacks & Street Food",
    defaultUnit: "plate",
    serving: "1 plate (2 buttered pavs + bhaji)",
    calories: 460,
    protein: 9,
    carbs: 64,
    fats: 19,
    units: {
      plate: { label: "plate (2 pavs + bhaji)", multiplier: 1.0 },
      bowl: { label: "bhaji only (1 bowl)", multiplier: 0.55 },
      piece: { label: "1 extra buttered pav", multiplier: 0.35 },
      serving: { label: "serving", multiplier: 1.0 }
    }
  },
  {
    id: 99,
    name: "Bhel Puri",
    category: "Snacks & Street Food",
    defaultUnit: "plate",
    serving: "1 plate (150g)",
    calories: 210,
    protein: 4.5,
    carbs: 38,
    fats: 5,
    units: {
      plate: { label: "plate (150g)", multiplier: 1.0 },
      bowl: { label: "bowl (120g)", multiplier: 0.8 },
      serving: { label: "serving", multiplier: 1.0 }
    }
  },
  {
    id: 100,
    name: "Sev Puri",
    category: "Snacks & Street Food",
    defaultUnit: "plate",
    serving: "1 plate (6 puris)",
    calories: 250,
    protein: 4,
    carbs: 36,
    fats: 10.5,
    units: {
      plate: { label: "plate (6 puris)", multiplier: 1.0 },
      piece: { label: "single puri", multiplier: 0.167 },
      serving: { label: "serving", multiplier: 1.0 }
    }
  },
  {
    id: 101,
    name: "Dahi Puri",
    category: "Snacks & Street Food",
    defaultUnit: "plate",
    serving: "1 plate (6 puris with dahi & sweet chutney)",
    calories: 280,
    protein: 6,
    carbs: 42,
    fats: 10,
    units: {
      plate: { label: "plate (6 puris)", multiplier: 1.0 },
      piece: { label: "single puri", multiplier: 0.167 },
      serving: { label: "serving", multiplier: 1.0 }
    }
  },
  {
    id: 102,
    name: "Papdi Chaat",
    category: "Snacks & Street Food",
    defaultUnit: "plate",
    serving: "1 plate (180g with yogurt & potatoes)",
    calories: 290,
    protein: 6.5,
    carbs: 45,
    fats: 10.5,
    units: {
      plate: { label: "plate (180g)", multiplier: 1.0 },
      bowl: { label: "bowl (140g)", multiplier: 0.78 },
      serving: { label: "serving", multiplier: 1.0 }
    }
  },
  {
    id: 103,
    name: "Aloo Tikki Chaat",
    category: "Snacks & Street Food",
    defaultUnit: "plate",
    serving: "1 plate (2 tikkis with chole & dahi)",
    calories: 340,
    protein: 8,
    carbs: 52,
    fats: 12,
    units: {
      plate: { label: "plate (2 tikkis + toppings)", multiplier: 1.0 },
      piece: { label: "single tikki only", multiplier: 0.4 },
      serving: { label: "serving", multiplier: 1.0 }
    }
  },
  {
    id: 104,
    name: "Pani Puri / Golgappe",
    category: "Snacks & Street Food",
    defaultUnit: "plate",
    serving: "1 plate (6 puris with flavored water)",
    calories: 160,
    protein: 3,
    carbs: 30,
    fats: 3.5,
    units: {
      plate: { label: "plate (6 puris)", multiplier: 1.0 },
      piece: { label: "single puri", multiplier: 0.167 },
      serving: { label: "serving (6 puris)", multiplier: 1.0 }
    }
  },
  {
    id: 105,
    name: "French Fries",
    category: "Snacks & Street Food",
    defaultUnit: "plate",
    serving: "1 regular serving (100g)",
    calories: 312,
    protein: 3.4,
    carbs: 41,
    fats: 15,
    units: {
      plate: { label: "plate (100g)", multiplier: 1.0 },
      bowl: { label: "bowl (150g)", multiplier: 1.5 },
      gram: { label: "gram (g)", multiplier: 0.01 },
      serving: { label: "serving (100g)", multiplier: 1.0 }
    }
  },
  {
    id: 106,
    name: "Grilled Cheese Sandwich",
    category: "Snacks & Street Food",
    defaultUnit: "piece",
    serving: "1 sandwich (2 slices + processed cheese)",
    calories: 310,
    protein: 11,
    carbs: 32,
    fats: 15.5,
    units: {
      piece: { label: "piece / sandwich", multiplier: 1.0 },
      plate: { label: "plate (2 sandwiches)", multiplier: 2.0 },
      serving: { label: "serving", multiplier: 1.0 }
    }
  },
  {
    id: 107,
    name: "Marie Biscuit",
    category: "Snacks & Street Food",
    defaultUnit: "piece",
    serving: "3 biscuits (24g)",
    calories: 95,
    protein: 1.8,
    carbs: 18,
    fats: 2,
    units: {
      piece: { label: "piece (single biscuit / 8g)", multiplier: 0.333 },
      serving: { label: "serving (3 biscuits / 24g)", multiplier: 1.0 },
      gram: { label: "gram (g)", multiplier: 0.0417 }
    }
  },
  {
    id: 108,
    name: "Glucose / Parle-G Biscuit",
    category: "Snacks & Street Food",
    defaultUnit: "piece",
    serving: "4 biscuits (26g)",
    calories: 120,
    protein: 2,
    carbs: 22,
    fats: 3.5,
    units: {
      piece: { label: "piece (single biscuit / 6.5g)", multiplier: 0.25 },
      serving: { label: "serving (4 biscuits / 26g)", multiplier: 1.0 },
      gram: { label: "gram (g)", multiplier: 0.0385 }
    }
  },
  {
    id: 109,
    name: "Namkeen / Aloo Bhujia",
    category: "Snacks & Street Food",
    defaultUnit: "bowl",
    serving: "1 small bowl (30g)",
    calories: 175,
    protein: 3,
    carbs: 14,
    fats: 12,
    units: {
      bowl: { label: "small bowl (30g)", multiplier: 1.0 },
      tablespoon: { label: "tablespoon (12g)", multiplier: 0.4 },
      gram: { label: "gram (g)", multiplier: 0.0333 },
      serving: { label: "serving (30g)", multiplier: 1.0 }
    }
  },
  {
    id: 110,
    name: "Roasted Makhana (Foxnuts in Ghee)",
    category: "Snacks & Street Food",
    defaultUnit: "bowl",
    serving: "1 large bowl (30g roasted)",
    calories: 135,
    protein: 3,
    carbs: 21,
    fats: 4.5,
    units: {
      bowl: { label: "bowl (30g)", multiplier: 1.0 },
      cup: { label: "cup (20g)", multiplier: 0.67 },
      gram: { label: "gram (g)", multiplier: 0.0333 },
      serving: { label: "serving", multiplier: 1.0 }
    }
  },
  {
    id: 111,
    name: "Khaman Dhokla",
    category: "Snacks & Street Food",
    defaultUnit: "piece",
    serving: "2 pieces (80g)",
    calories: 130,
    protein: 4.5,
    carbs: 22,
    fats: 3,
    units: {
      piece: { label: "piece (40g)", multiplier: 0.5 },
      plate: { label: "plate (4 pieces / 160g)", multiplier: 2.0 },
      serving: { label: "serving (2 pieces)", multiplier: 1.0 }
    }
  },
  {
    id: 112,
    name: "Khandvi (Steamed Gram Flour Rolls)",
    category: "Snacks & Street Food",
    defaultUnit: "piece",
    serving: "4 rolls (80g)",
    calories: 110,
    protein: 4,
    carbs: 14,
    fats: 4,
    units: {
      piece: { label: "piece / roll (20g)", multiplier: 0.25 },
      plate: { label: "plate (6 rolls)", multiplier: 1.5 },
      serving: { label: "serving (4 rolls)", multiplier: 1.0 }
    }
  },
  {
    id: 113,
    name: "Veg Burger",
    category: "Snacks & Street Food",
    defaultUnit: "piece",
    serving: "1 burger with patty & mayo (160g)",
    calories: 360,
    protein: 8,
    carbs: 48,
    fats: 16,
    units: {
      piece: { label: "piece / burger", multiplier: 1.0 },
      serving: { label: "serving", multiplier: 1.0 }
    }
  },

  // ==========================================
  // --- FRUITS ---
  // ==========================================
  {
    id: 114,
    name: "Mango (Ripe Slices)",
    category: "Fruits",
    defaultUnit: "bowl",
    serving: "1 medium bowl cubed (150g)",
    calories: 90,
    protein: 1.2,
    carbs: 23,
    fats: 0.4,
    units: {
      bowl: { label: "bowl cubed (150g)", multiplier: 1.0 },
      cup: { label: "cup (165g)", multiplier: 1.1 },
      piece: { label: "whole medium mango (200g pulp)", multiplier: 1.33 },
      gram: { label: "gram (g)", multiplier: 0.00667 },
      slice: { label: "slice (30g)", multiplier: 0.2 },
      serving: { label: "serving (150g)", multiplier: 1.0 }
    }
  },
  {
    id: 115,
    name: "Guava (Amrood)",
    category: "Fruits",
    defaultUnit: "piece",
    serving: "1 medium whole guava (120g)",
    calories: 68,
    protein: 2.6,
    carbs: 14,
    fats: 0.9,
    units: {
      piece: { label: "piece (120g)", multiplier: 1.0 },
      bowl: { label: "bowl sliced (150g)", multiplier: 1.25 },
      gram: { label: "gram (g)", multiplier: 0.00833 },
      serving: { label: "serving", multiplier: 1.0 }
    }
  },
  {
    id: 116,
    name: "Papaya",
    category: "Fruits",
    defaultUnit: "bowl",
    serving: "1 medium bowl cubed (150g)",
    calories: 60,
    protein: 1,
    carbs: 15,
    fats: 0.3,
    units: {
      bowl: { label: "bowl cubed (150g)", multiplier: 1.0 },
      cup: { label: "cup (145g)", multiplier: 0.97 },
      gram: { label: "gram (g)", multiplier: 0.00667 },
      slice: { label: "slice (50g)", multiplier: 0.33 },
      serving: { label: "serving", multiplier: 1.0 }
    }
  },
  {
    id: 117,
    name: "Watermelon (Tarbooz)",
    category: "Fruits",
    defaultUnit: "bowl",
    serving: "1 large bowl cubed (250g)",
    calories: 75,
    protein: 1.5,
    carbs: 19,
    fats: 0.4,
    units: {
      bowl: { label: "bowl cubed (250g)", multiplier: 1.0 },
      slice: { label: "wedge / slice (150g)", multiplier: 0.6 },
      cup: { label: "cup (150g)", multiplier: 0.6 },
      gram: { label: "gram (g)", multiplier: 0.004 },
      serving: { label: "serving", multiplier: 1.0 }
    }
  },
  {
    id: 118,
    name: "Grapes (Green / Black)",
    category: "Fruits",
    defaultUnit: "bowl",
    serving: "1 small bowl (100g)",
    calories: 69,
    protein: 0.7,
    carbs: 18,
    fats: 0.2,
    units: {
      bowl: { label: "bowl (100g)", multiplier: 1.0 },
      cup: { label: "cup (150g)", multiplier: 1.5 },
      piece: { label: "single grape (~5g)", multiplier: 0.05 },
      gram: { label: "gram (g)", multiplier: 0.01 },
      serving: { label: "serving (100g)", multiplier: 1.0 }
    }
  },
  {
    id: 119,
    name: "Pomegranate (Anar Arils)",
    category: "Fruits",
    defaultUnit: "bowl",
    serving: "1 small bowl (100g)",
    calories: 83,
    protein: 1.7,
    carbs: 19,
    fats: 1.2,
    units: {
      bowl: { label: "bowl (100g)", multiplier: 1.0 },
      cup: { label: "cup (175g)", multiplier: 1.75 },
      tablespoon: { label: "tablespoon (tbsp)", multiplier: 0.15 },
      gram: { label: "gram (g)", multiplier: 0.01 },
      serving: { label: "serving (100g)", multiplier: 1.0 }
    }
  },
  {
    id: 120,
    name: "Pineapple (Ananas Slices)",
    category: "Fruits",
    defaultUnit: "bowl",
    serving: "1 medium bowl (150g)",
    calories: 75,
    protein: 0.8,
    carbs: 20,
    fats: 0.2,
    units: {
      bowl: { label: "bowl (150g)", multiplier: 1.0 },
      slice: { label: "round slice (80g)", multiplier: 0.53 },
      cup: { label: "cup (165g)", multiplier: 1.1 },
      gram: { label: "gram (g)", multiplier: 0.00667 },
      serving: { label: "serving", multiplier: 1.0 }
    }
  },
  {
    id: 121,
    name: "Banana (Kela)",
    category: "Fruits",
    defaultUnit: "piece",
    serving: "1 medium banana (118g)",
    calories: 105,
    protein: 1.3,
    carbs: 27,
    fats: 0.3,
    units: {
      piece: { label: "piece / banana (118g)", multiplier: 1.0 },
      bowl: { label: "bowl sliced (150g)", multiplier: 1.27 },
      gram: { label: "gram (g)", multiplier: 0.00847 },
      serving: { label: "serving", multiplier: 1.0 }
    }
  },
  {
    id: 122,
    name: "Apple (Seb)",
    category: "Fruits",
    defaultUnit: "piece",
    serving: "1 medium apple (180g)",
    calories: 95,
    protein: 0.5,
    carbs: 25,
    fats: 0.3,
    units: {
      piece: { label: "piece / apple (180g)", multiplier: 1.0 },
      bowl: { label: "bowl chopped (150g)", multiplier: 0.83 },
      slice: { label: "slice (25g)", multiplier: 0.14 },
      gram: { label: "gram (g)", multiplier: 0.00556 },
      serving: { label: "serving", multiplier: 1.0 }
    }
  },
  {
    id: 123,
    name: "Orange / Mosambi (Sweet Lime)",
    category: "Fruits",
    defaultUnit: "piece",
    serving: "1 medium whole fruit (130g)",
    calories: 62,
    protein: 1.2,
    carbs: 15,
    fats: 0.2,
    units: {
      piece: { label: "piece (130g)", multiplier: 1.0 },
      glass: { label: "glass fresh juice (200ml)", multiplier: 1.4 },
      gram: { label: "gram (g)", multiplier: 0.00769 },
      serving: { label: "serving", multiplier: 1.0 }
    }
  },
  {
    id: 124,
    name: "Chikoo (Sapodilla)",
    category: "Fruits",
    defaultUnit: "piece",
    serving: "1 medium chikoo (80g)",
    calories: 68,
    protein: 0.4,
    carbs: 16,
    fats: 0.9,
    units: {
      piece: { label: "piece (80g)", multiplier: 1.0 },
      bowl: { label: "bowl sliced (150g)", multiplier: 1.88 },
      serving: { label: "serving", multiplier: 1.0 }
    }
  },

  // ==========================================
  // --- BEVERAGES & DRINKS ---
  // ==========================================
  {
    id: 125,
    name: "Masala Chai (with Milk & Sugar)",
    category: "Beverages",
    defaultUnit: "cup",
    serving: "1 small cup (150ml)",
    calories: 95,
    protein: 3,
    carbs: 15,
    fats: 2.8,
    units: {
      cup: { label: "cup (150ml)", multiplier: 1.0 },
      glass: { label: "glass (200ml)", multiplier: 1.33 },
      millilitre: { label: "millilitre (ml)", multiplier: 0.00667 },
      teaspoon: { label: "teaspoon sugar extra", multiplier: 0.18 },
      serving: { label: "serving", multiplier: 1.0 }
    }
  },
  {
    id: 126,
    name: "Green Tea (Unsweetened)",
    category: "Beverages",
    defaultUnit: "cup",
    serving: "1 cup (200ml)",
    calories: 2,
    protein: 0.2,
    carbs: 0.4,
    fats: 0,
    units: {
      cup: { label: "cup (200ml)", multiplier: 1.0 },
      millilitre: { label: "millilitre (ml)", multiplier: 0.005 },
      serving: { label: "serving", multiplier: 1.0 }
    }
  },
  {
    id: 127,
    name: "Filter Coffee (with Milk & Sugar)",
    category: "Beverages",
    defaultUnit: "cup",
    serving: "1 tumbler / cup (150ml)",
    calories: 110,
    protein: 3.5,
    carbs: 16,
    fats: 3.5,
    units: {
      cup: { label: "cup (150ml)", multiplier: 1.0 },
      glass: { label: "glass (200ml)", multiplier: 1.33 },
      millilitre: { label: "millilitre (ml)", multiplier: 0.00667 },
      serving: { label: "serving", multiplier: 1.0 }
    }
  },
  {
    id: 128,
    name: "Black Coffee (No Sugar)",
    category: "Beverages",
    defaultUnit: "cup",
    serving: "1 cup (200ml)",
    calories: 4,
    protein: 0.3,
    carbs: 0.8,
    fats: 0,
    units: {
      cup: { label: "cup (200ml)", multiplier: 1.0 },
      millilitre: { label: "millilitre (ml)", multiplier: 0.005 },
      serving: { label: "serving", multiplier: 1.0 }
    }
  },
  {
    id: 129,
    name: "Cold Coffee",
    category: "Beverages",
    defaultUnit: "glass",
    serving: "1 tall glass (300ml with milk & sugar)",
    calories: 240,
    protein: 7,
    carbs: 36,
    fats: 8,
    units: {
      glass: { label: "glass (300ml)", multiplier: 1.0 },
      cup: { label: "cup (200ml)", multiplier: 0.67 },
      millilitre: { label: "millilitre (ml)", multiplier: 0.00333 },
      serving: { label: "serving", multiplier: 1.0 }
    }
  },
  {
    id: 130,
    name: "Sweet Lassi",
    category: "Beverages",
    defaultUnit: "glass",
    serving: "1 glass (250ml)",
    calories: 220,
    protein: 7,
    carbs: 34,
    fats: 6,
    units: {
      glass: { label: "glass (250ml)", multiplier: 1.0 },
      cup: { label: "cup (200ml)", multiplier: 0.8 },
      millilitre: { label: "millilitre (ml)", multiplier: 0.004 },
      litre: { label: "litre (L)", multiplier: 4.0 },
      serving: { label: "serving", multiplier: 1.0 }
    }
  },
  {
    id: 131,
    name: "Mango Lassi",
    category: "Beverages",
    defaultUnit: "glass",
    serving: "1 glass (250ml)",
    calories: 255,
    protein: 6.5,
    carbs: 42,
    fats: 6.5,
    units: {
      glass: { label: "glass (250ml)", multiplier: 1.0 },
      cup: { label: "cup (200ml)", multiplier: 0.8 },
      serving: { label: "serving", multiplier: 1.0 }
    }
  },
  {
    id: 132,
    name: "Salted Chaas / Buttermilk",
    category: "Beverages",
    defaultUnit: "glass",
    serving: "1 glass (250ml with cumin & salt)",
    calories: 55,
    protein: 3.5,
    carbs: 5,
    fats: 2,
    units: {
      glass: { label: "glass (250ml)", multiplier: 1.0 },
      cup: { label: "cup (200ml)", multiplier: 0.8 },
      millilitre: { label: "millilitre (ml)", multiplier: 0.004 },
      litre: { label: "litre (L)", multiplier: 4.0 },
      serving: { label: "serving", multiplier: 1.0 }
    }
  },
  {
    id: 133,
    name: "Fresh Coconut Water (Nariyal Pani)",
    category: "Beverages",
    defaultUnit: "glass",
    serving: "1 natural coconut (250ml)",
    calories: 45,
    protein: 1.5,
    carbs: 9,
    fats: 0.2,
    units: {
      glass: { label: "glass / natural coconut (250ml)", multiplier: 1.0 },
      cup: { label: "cup (200ml)", multiplier: 0.8 },
      millilitre: { label: "millilitre (ml)", multiplier: 0.004 },
      litre: { label: "litre (L)", multiplier: 4.0 },
      serving: { label: "serving", multiplier: 1.0 }
    }
  },
  {
    id: 134,
    name: "Nimbu Pani / Shikanji (Lemon Water)",
    category: "Beverages",
    defaultUnit: "glass",
    serving: "1 glass (250ml with mint & spices)",
    calories: 50,
    protein: 0.5,
    carbs: 12,
    fats: 0.1,
    units: {
      glass: { label: "glass (250ml)", multiplier: 1.0 },
      cup: { label: "cup (200ml)", multiplier: 0.8 },
      millilitre: { label: "millilitre (ml)", multiplier: 0.004 },
      serving: { label: "serving", multiplier: 1.0 }
    }
  },
  {
    id: 135,
    name: "Sugarcane Juice (Ganne Ka Ras)",
    category: "Beverages",
    defaultUnit: "glass",
    serving: "1 glass (250ml with ginger & lemon)",
    calories: 180,
    protein: 0.8,
    carbs: 45,
    fats: 0.2,
    units: {
      glass: { label: "glass (250ml)", multiplier: 1.0 },
      cup: { label: "cup (200ml)", multiplier: 0.8 },
      millilitre: { label: "millilitre (ml)", multiplier: 0.004 },
      serving: { label: "serving", multiplier: 1.0 }
    }
  },
  {
    id: 136,
    name: "Rooh Afza Sharbat (with Chilled Water)",
    category: "Beverages",
    defaultUnit: "glass",
    serving: "1 glass (250ml)",
    calories: 125,
    protein: 0.1,
    carbs: 31,
    fats: 0,
    units: {
      glass: { label: "glass (250ml)", multiplier: 1.0 },
      tablespoon: { label: "tablespoon syrup (20ml)", multiplier: 0.6 },
      serving: { label: "serving", multiplier: 1.0 }
    }
  }
];

/**
 * Calculates nutritional values for a food item given quantity and unit
 * @param {Object} food
 * @param {number} quantity
 * @param {string} unit
 * @returns {{calories: number, protein: number, carbs: number, fats: number, unit: string, quantity: number}}
 */
export const getNutritionForServing = (food, quantity = 1, unit = null) => {
  if (!food) return { calories: 0, protein: 0, carbs: 0, fats: 0, unit: 'serving', quantity: 1 };
  
  const selectedUnit = unit || food.defaultUnit || 'serving';
  const unitConfig = food.units && food.units[selectedUnit];
  const multiplier = unitConfig ? unitConfig.multiplier : 1.0;
  const totalFactor = Math.max(0.01, (Number(quantity) || 1) * multiplier);

  return {
    calories: Math.max(0, Math.round(food.calories * totalFactor)),
    protein: Math.max(0, Number((food.protein * totalFactor).toFixed(1))),
    carbs: Math.max(0, Number((food.carbs * totalFactor).toFixed(1))),
    fats: Math.max(0, Number((food.fats * totalFactor).toFixed(1))),
    unit: selectedUnit,
    quantity: Number(quantity) || 1,
  };
};
