const types = ["goal", "substitution", "yellow_card", "own_goal", "offside", "foul", "penalty_kick", "corner_kick", "free_kick", "injury", "shot"];

const goal_origins = [
    "free_kick",
    "corner_kick",
    "penalty_kick",
    //
    "normal_play",
    "set_piece",
    "counter_attack",
    "long_range_shot"
];

const goal_details = [
    "header",
    "volley",
    "rebound",
    "short_range_shot",
    "long_range_shot",
];

const shot_details = [
    'on_target',
    'off_target',
]

const foul_details = [
    "near",
    "far"
]

const yellowCardReasons = [
    "tactical",
    "reckless",
    "unsporting",
    "distance",
    "entering_field"
];

const redCardReasons = [
    "serious_foul",
    "violent",
    "offensive",
    "denying_goal_opportunity",
    "persistent"
];

const injuryReasons = [
    "collision_with_opponent", // Colisión con un oponente
    "awkward_fall", // Caída incómoda
    "overuse", // Uso excesivo
    "muscle_strain", // Tensión muscular
    "impact_from_ball", // Impacto de la pelota
    "slip_or_trip", // Resbalón o tropiezo
    "poor_tackling_technique" // Técnica de tackle deficiente
];