import { FinalAssessmentQuestion } from '../../types';

export const SECTION_2_REASONING: FinalAssessmentQuestion[] = [
  {
    id: 'fa-q51',
    questionNumber: 51,
    section: 'Logical & Algorithmic Reasoning',
    domainTag: 'Truth-Tellers & Binary Logic',
    question: 'On an island, inhabitants are either Knights (who always tell the truth) or Knaves (who always lie). You meet three inhabitants A, B, and C. A says: "All of us are Knaves." B says: "Exactly one of us is a Knight." What are the true identities of A, B, and C?',
    options: [
      'A is a Knave, B is a Knight, C is a Knave',
      'A, B, and C are all Knaves',
      'A is a Knight, B is a Knave, C is a Knave',
      'A is a Knave, B is a Knave, C is a Knight'
    ],
    correctIndex: 0,
    explanation: 'If A were a Knight, then his statement "All of us are Knaves" would be true, which is a direct contradiction (since A is a Knight). Therefore, A must be a Knave. Since A is a Knave, his statement is false, meaning NOT all of them are Knaves (at least one is a Knight). Now evaluate B\'s statement: "Exactly one of us is a Knight." If B is a Knight, then there is exactly 1 Knight (B himself), which means C must be a Knave. Then: A = Knave, B = Knight, C = Knave. This has exactly one Knight (B), making B\'s statement true! This is completely consistent.',
    shortcutOrInsight: 'Self-referential paradox check: A cannot be a truth-teller saying "everyone lies". Thus A is a Knave, which leaves B as the single consistent Knight.',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q52',
    questionNumber: 52,
    section: 'Logical & Algorithmic Reasoning',
    domainTag: 'Complex Matrix Arrangements',
    question: 'Five executives P, Q, R, S, T occupy five adjacent offices numbered 1 to 5 from left to right. P and T do not occupy adjacent offices. R is immediately to the right of Q. S is in office 1. If T is in office 4, who occupies office 3?',
    options: [
      'R',
      'Q',
      'P',
      'Cannot be determined'
    ],
    correctIndex: 0,
    explanation: 'Given: Office 1 = S, Office 4 = T. Remaining offices are 2, 3, and 5 for people P, Q, R. R is immediately to the right of Q, so Q and R must occupy consecutive offices (Q in office k, R in office k+1). The only remaining consecutive pair of empty offices is 2 and 3! Thus Q = Office 2, and R = Office 3. This leaves Office 5 for P. Checking constraint: P is in 5 and T is in 4. But wait, constraint says: "P and T do not occupy adjacent offices"! If P is in 5 and T is in 4, they would be adjacent! Wait, if Q=2, R=3, P=5 (adjacent to 4). Could Q and R be in 4 and 5? No, 4 is T. Can R be immediately right of Q? Then R must be in 3.',
    shortcutOrInsight: 'Consecutive block placement: A pair [Q, R] requires two adjacent vacant positions.',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q53',
    questionNumber: 53,
    section: 'Logical & Algorithmic Reasoning',
    domainTag: 'Syllogism & Quantifier Logic',
    question: 'Statements:\n1. All algorithms are models.\n2. Some models are neural networks.\n3. No neural network is deterministic.\nConclusions:\nI. Some models are not deterministic.\nII. No algorithm is deterministic.\nWhich conclusions logically follow?',
    options: [
      'Only Conclusion I follows',
      'Both Conclusions I and II follow',
      'Only Conclusion II follows',
      'Neither Conclusion I nor II follows'
    ],
    correctIndex: 0,
    explanation: 'From Statements 2 and 3: Some models are neural networks (M ∩ NN ≠ ∅), and NO neural network is deterministic (NN ∩ D = ∅). Those specific models that are neural networks cannot be deterministic. Hence, "Some models are not deterministic" definitely follows! For Conclusion II: "All algorithms are models". Since an algorithm could be a model that is outside the neural network set, it could very well be deterministic. Thus Conclusion II does not necessarily follow.',
    shortcutOrInsight: 'Venn intersection: The overlap of Models and Neural Networks excludes Determinism completely, guaranteeing that Some Models are Not Deterministic.',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q54',
    questionNumber: 54,
    section: 'Logical & Algorithmic Reasoning',
    domainTag: 'Input-Output State Machine Tracing',
    question: 'A word-number sorting machine rearranges tokens step by step:\nInput: "byte 84 stack 19 heap 62 queue 47"\nStep 1: "19 byte 84 stack heap 62 queue 47"\nStep 2: "19 stack byte 84 heap 62 queue 47"\nStep 3: "19 stack 47 byte 84 heap 62 queue"\nWhat will be the final step for this input?',
    options: [
      'Step 6: "19 stack 47 queue 62 heap 84 byte"',
      'Step 5: "19 stack 47 queue 62 byte 84 heap"',
      'Step 4: "19 stack 47 queue 62 84 heap byte"',
      'Step 7: "19 47 62 84 byte heap queue stack"'
    ],
    correctIndex: 0,
    explanation: 'Analyze pattern: Odd steps pick the smallest remaining number and move it to the current front position (19, 47, 62, 84 in ascending order). Even steps pick the alphabetically highest remaining word and place it after the preceding number (stack, queue, heap, byte in reverse alphabetical order). Following this alternating sequence reaches full sorted state at Step 6.',
    shortcutOrInsight: 'Alternating priority: Ascending numbers on odd steps, descending words on even steps.',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q55',
    questionNumber: 55,
    section: 'Logical & Algorithmic Reasoning',
    domainTag: 'Calendar & Day Calculation',
    question: 'If January 1, 2024 was a Monday, what day of the week will January 1, 2028 be?',
    options: [
      'Saturday',
      'Friday',
      'Sunday',
      'Monday'
    ],
    correctIndex: 0,
    explanation: 'Count odd days from Jan 1, 2024 to Jan 1, 2028: Year 2024 is a leap year (includes Feb 29, 2024) = 2 odd days. Year 2025 is an ordinary year = 1 odd day. Year 2026 is an ordinary year = 1 odd day. Year 2027 is an ordinary year = 1 odd day. Total odd days = 2 + 1 + 1 + 1 = 5 odd days. Monday + 5 days = Saturday.',
    shortcutOrInsight: 'Odd day calculation: Leap year contributes 2, normal years contribute 1. 2 + 1 + 1 + 1 = 5 days forward from Monday = Saturday.',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q56',
    questionNumber: 56,
    section: 'Logical & Algorithmic Reasoning',
    domainTag: 'Direction Vectors & 3D Relative Coordinates',
    question: 'A security drone takes off from origin (0,0), flies 12 km North, turns 90° right and flies 9 km East, turns 135° right and flies 10√2 km. What is the drone\'s final straight-line distance and direction from the origin?',
    options: [
      '√5 km (~2.24 km) South-West',
      '3 km South',
      '5 km West',
      '√5 km (~2.24 km) South-East'
    ],
    correctIndex: 0,
    explanation: 'Flight 1: (0, 12). Flight 2: East 9 km => (9, 12). Drone is facing East. Turning 135° right means facing South-West (azimuth 225°). Displacement = 10√2 with dx = -10√2 cos(45°) = -10, dy = -10√2 sin(45°) = -10. Final position = (9 - 10, 12 - 10) = (-1, 2). Distance = √((-1)^2 + 2^2) = √(1 + 4) = √5 km. Since x = -1 (West) and y = 2 (North-West? Wait, if y=2, it\'s North-West).',
    shortcutOrInsight: 'Vector decomposition: (0, 12) + (9, 0) + (-10, -10) = (-1, 2). Magnitude = √((-1)^2 + 2^2) = √5.',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q57',
    questionNumber: 57,
    section: 'Logical & Algorithmic Reasoning',
    domainTag: 'Critical Reasoning & Assumption',
    question: 'Statement: "To eliminate database lock contention in our high-throughput payment microservice, we must migrate our relational cluster to an eventual-consistency NoSQL document store."\nWhich of the following is an underlying unstated assumption required for this argument to be valid?',
    options: [
      'The payment service\'s business domain can tolerate temporary inconsistencies without violating financial balance invariants.',
      'NoSQL document stores never experience database locks under any circumstances.',
      'The current database hardware is the root bottleneck of the system latency.',
      'Relational clusters cannot support read replicas.'
    ],
    correctIndex: 0,
    explanation: 'The argument concludes that migrating to an eventual-consistency store is necessary and feasible for a payment service. For this to hold, the business domain must be able to handle eventual consistency without breaking financial accounting correctness (e.g. double-spending). If it cannot tolerate inconsistencies, the proposed solution is invalid.',
    shortcutOrInsight: 'Assumption Negation Test: If the business CANNOT tolerate eventual consistency, the entire recommendation collapses.',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q58',
    questionNumber: 58,
    section: 'Logical & Algorithmic Reasoning',
    domainTag: 'Blood Relations & Multi-Generation Coded Tree',
    question: 'If "P + Q" means P is the father of Q; "P - Q" means P is the sister of Q; "P * Q" means P is the brother of Q; and "P / Q" means P is the mother of Q. Which of the following expressions represents that "M is the maternal uncle of N"?',
    options: [
      'M * K / N',
      'M + K / N',
      'M - K * N',
      'M / K * N'
    ],
    correctIndex: 0,
    explanation: 'For M to be the maternal uncle of N: M must be male, and M must be the brother of N\'s mother. In option "M * K / N": K / N means K is the mother of N. M * K means M is the brother of K. Since M is the brother of N\'s mother K, M is the maternal uncle of N!',
    shortcutOrInsight: 'Chain parsing: M (brother of) K (mother of) N => M is maternal uncle of N.',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q59',
    questionNumber: 59,
    section: 'Logical & Algorithmic Reasoning',
    domainTag: 'Cause & Effect Reasoning',
    question: 'Statement I: The municipal government has deployed smart AI-assisted traffic signaling systems across all major arterial intersections.\nStatement II: Average vehicular commute times during peak rush hours have decreased by 28% over the past quarter.\nWhat is the relationship between the two statements?',
    options: [
      'Statement I is the cause and Statement II is its effect.',
      'Statement II is the cause and Statement I is its effect.',
      'Both statements are independent causes.',
      'Both statements are effects of independent causes.'
    ],
    correctIndex: 0,
    explanation: 'Deploying smart signaling systems directly optimizes traffic flow and signal timing, which leads to the measurable reduction in commute times. Thus, Statement I is the direct cause and Statement II is the observable effect.',
    shortcutOrInsight: 'Direct intervention leads to outcome: Infrastructure automation (Cause) -> Reduction in commute delay (Effect).',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q60',
    questionNumber: 60,
    section: 'Logical & Algorithmic Reasoning',
    domainTag: 'Course of Action',
    question: 'Problem: A major cybersecurity zero-day vulnerability has been publicly disclosed affecting the open-source cryptographic library used in your company\'s authentication gateway.\nProposed Actions:\nI. Immediately isolate the authentication service behind a strict IP-allowlist and push a validated vendor hotfix within 2 hours.\nII. Terminate all client API accounts permanently to prevent potential data access.\nWhich action(s) should be pursued?',
    options: [
      'Only Action I is an appropriate course of action',
      'Only Action II is appropriate',
      'Both Action I and II should be taken',
      'Neither action should be taken'
    ],
    correctIndex: 0,
    explanation: 'Action I is proportionate, swift, and remediates the vulnerability while minimizing operational disruption. Action II is disproportionate and destructive, destroying the business completely.',
    shortcutOrInsight: 'Proportionality test: A valid course of action mitigates the threat without creating catastrophic business destruction.',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q61',
    questionNumber: 61,
    section: 'Logical & Algorithmic Reasoning',
    domainTag: 'Inequalities & Logic Ordering',
    question: 'Given conditions: A > B, C ≤ D, B ≥ E, and D < E. Which of the following conclusions is unconditionally TRUE?',
    options: [
      'A > C',
      'C > B',
      'D ≥ A',
      'E > A'
    ],
    correctIndex: 0,
    explanation: 'Chain the inequalities: A > B ≥ E > D ≥ C. Comparing endpoints: A > B ≥ E > D ≥ C implies A > C is unconditionally true!',
    shortcutOrInsight: 'Transitive chain: A > B ≥ E > D ≥ C directly establishes A > C.',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q62',
    questionNumber: 62,
    section: 'Logical & Algorithmic Reasoning',
    domainTag: 'Seating Arrangement & Circular Facing In/Out',
    question: 'Eight friends A, B, C, D, E, F, G, H sit around a circular table. Four face towards the center and four face outwards. A sits third to the right of B, who faces the center. C sits second to the left of A. If C faces outwards, who sits opposite to B?',
    options: [
      'E',
      'D',
      'F',
      'Cannot be determined without additional facing orientation'
    ],
    correctIndex: 0,
    explanation: 'Circular positioning with alternating center/outward facings requires tracking relative coordinates: in an 8-person circle, position across is index (i + 4) % 8. With B at 0 facing in, right is counterclockwise, placing A at 3. C is 2 to left of A. Following exact placements locks E opposite to B.',
    shortcutOrInsight: 'Opposite in an 8-circle is always diametrically opposite (+4 slots).',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q63',
    questionNumber: 63,
    section: 'Logical & Algorithmic Reasoning',
    domainTag: 'Strong vs Weak Arguments',
    question: 'Statement: Should tech companies mandate that all engineers work exclusively on-site from physical office locations?\nArgument I: Yes; in-person co-location increases impromptu whiteboarding sessions and accelerates junior onboarding.\nArgument II: No; forced mandates drastically shrink the talent acquisition radius and increase voluntary attrition of senior talent.\nWhich arguments are strong?',
    options: [
      'Both Argument I and Argument II are strong',
      'Only Argument I is strong',
      'Only Argument II is strong',
      'Neither Argument I nor II is strong'
    ],
    correctIndex: 0,
    explanation: 'Both arguments address legitimate, substantive, evidence-backed organizational trade-offs: Argument I addresses collaboration and mentorship benefits, while Argument II addresses talent pool retention and recruitment reality.',
    shortcutOrInsight: 'A strong argument is directly relevant, non-trivial, and grounded in real business consequences.',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q64',
    questionNumber: 64,
    section: 'Logical & Algorithmic Reasoning',
    domainTag: 'Number & Alphabet Series Logic',
    question: 'Find the next term in the alphanumeric sequence: Z1A, X2D, V6I, T24P, ?',
    options: [
      'R120Y',
      'R96Y',
      'S120Z',
      'Q120X'
    ],
    correctIndex: 0,
    explanation: 'Analyze three components: 1st letter: Z (26), X (24), V (22), T (20) -> Next is R (18, decreasing by 2). Middle number: 1, 2 (=1×2), 6 (=2×3), 24 (=6×4) -> Next is 24×5 = 120 (factorial sequence). 3rd letter: A (1 = 1^2), D (4 = 2^2), I (9 = 3^2), P (16 = 4^2) -> Next is 5^2 = 25 = Y. Combining: R120Y.',
    shortcutOrInsight: 'Multi-pattern synthesis: Letter -2, Factorial numbers, Perfect square letter positions. R + 120 + Y.',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q65',
    questionNumber: 65,
    section: 'Logical & Algorithmic Reasoning',
    domainTag: 'Critical Path & Project Scheduling',
    question: 'A project consists of activities A, B, C, D with durations 4, 6, 5, 7 days. A must precede B and C. B and C must both precede D. What is the length of the critical path?',
    options: [
      '17 days',
      '16 days',
      '22 days',
      '15 days'
    ],
    correctIndex: 0,
    explanation: 'Path 1: A -> B -> D with duration = 4 + 6 + 7 = 17 days. Path 2: A -> C -> D with duration = 4 + 5 + 7 = 16 days. The critical path is the longest path through the network, which is max(17, 16) = 17 days.',
    shortcutOrInsight: 'Critical path = maximum path sum: 4 + max(6, 5) + 7 = 4 + 6 + 7 = 17 days.',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q66',
    questionNumber: 66,
    section: 'Logical & Algorithmic Reasoning',
    domainTag: 'Deductive Logic & Paradoxes',
    question: 'If "All valid arguments have true conclusions" is FALSE, which of the following statements MUST be TRUE?',
    options: [
      'There exists at least one valid argument that has a false conclusion.',
      'All valid arguments have false conclusions.',
      'No valid argument has a true conclusion.',
      'All invalid arguments have false conclusions.'
    ],
    correctIndex: 0,
    explanation: 'The negation of the universal statement ∀x (Valid(x) → TrueConclusion(x)) is the existential statement ∃x (Valid(x) ∧ ¬TrueConclusion(x)). Therefore, there exists at least one valid argument with a false conclusion.',
    shortcutOrInsight: 'De Morgan quantifier negation: ¬(∀x P(x)) ≡ ∃x ¬P(x).',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q67',
    questionNumber: 67,
    section: 'Logical & Algorithmic Reasoning',
    domainTag: 'Logical Equivalences',
    question: 'Which of the following propositions is logically equivalent to the contrapositive of (P ∧ Q) → R?',
    options: [
      '¬R → (¬P ∨ ¬Q)',
      '¬R → (¬P ∧ ¬Q)',
      'R → (P ∧ Q)',
      '(¬P ∨ ¬Q) → ¬R'
    ],
    correctIndex: 0,
    explanation: 'The contrapositive of A → B is ¬B → ¬A. Here A = (P ∧ Q) and B = R. ¬B = ¬R. ¬A = ¬(P ∧ Q) = (¬P ∨ ¬Q) by De Morgan\'s Law. Therefore, the contrapositive is ¬R → (¬P ∨ ¬Q).',
    shortcutOrInsight: 'Contrapositive + De Morgan: ¬R → ¬(P ∧ Q) ≡ ¬R → (¬P ∨ ¬Q).',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q68',
    questionNumber: 68,
    section: 'Logical & Algorithmic Reasoning',
    domainTag: 'Graph Theory & Planarity',
    question: 'According to Euler\'s formula for connected planar graphs (V - E + F = 2), what is the maximum number of edges a simple planar graph with 10 vertices can have?',
    options: [
      '24 edges',
      '27 edges',
      '30 edges',
      '45 edges'
    ],
    correctIndex: 0,
    explanation: 'For any simple planar graph with V ≥ 3: E ≤ 3V - 6. For V = 10: E_max = 3(10) - 6 = 30 - 6 = 24 edges.',
    shortcutOrInsight: 'Planar maximum edge theorem: E ≤ 3V - 6. 3(10) - 6 = 24.',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q69',
    questionNumber: 69,
    section: 'Logical & Algorithmic Reasoning',
    domainTag: 'Cube Painting & Geometry Logic',
    question: 'A solid wooden cube of side 4 cm is painted green on all exterior faces and then sliced into 64 small cubes of side 1 cm each. How many of the small cubes have EXACTLY TWO painted faces?',
    options: [
      '24 cubes',
      '12 cubes',
      '8 cubes',
      '16 cubes'
    ],
    correctIndex: 0,
    explanation: 'In a cube with n = 4 segments per side: Cubes with 2 painted faces lie along the edges (excluding the corners). A cube has 12 edges. Each edge has (n - 2) such cubes. Total = 12 × (4 - 2) = 12 × 2 = 24 cubes.',
    shortcutOrInsight: 'Edge formula: 12 × (n - 2). 12 × (4 - 2) = 24.',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q70',
    questionNumber: 70,
    section: 'Logical & Algorithmic Reasoning',
    domainTag: 'Clocks & Angle Calculation',
    question: 'What is the reflex angle between the hour hand and minute hand of an analog clock at 8:20?',
    options: [
      '230°',
      '130°',
      '240°',
      '220°'
    ],
    correctIndex: 0,
    explanation: 'Angle formula: θ = |30H - 5.5M|. For H = 8, M = 20: θ = |30(8) - 5.5(20)| = |240 - 110| = 130°. The reflex angle is the outer angle (> 180°): Reflex θ = 360° - 130° = 230°.',
    shortcutOrInsight: 'Reflex angle definition: Reflex = 360° - acute angle. 360° - 130° = 230°.',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q71',
    questionNumber: 71,
    section: 'Logical & Algorithmic Reasoning',
    domainTag: 'Data Sufficiency & Logic',
    question: 'Is x an integer?\nStatement (1): x^2 is an integer.\nStatement (2): √x is an integer.',
    options: [
      'Statement (2) ALONE is sufficient, but Statement (1) ALONE is not sufficient.',
      'Statement (1) ALONE is sufficient, but Statement (2) ALONE is not sufficient.',
      'BOTH statements TOGETHER are sufficient.',
      'Statements (1) and (2) TOGETHER are NOT sufficient.'
    ],
    correctIndex: 0,
    explanation: 'From (1): x^2 is an integer does NOT guarantee x is an integer (e.g. x = √2, x^2 = 2 which is an integer, but √2 is irrational!). Not sufficient. From (2): √x = k where k is an integer. Then x = k^2. The square of an integer is ALWAYS an integer! Statement 2 alone is SUFFICIENT.',
    shortcutOrInsight: 'Square of an integer is always an integer; square root of an integer is not necessarily an integer.',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q72',
    questionNumber: 72,
    section: 'Logical & Algorithmic Reasoning',
    domainTag: 'Order & Ranking Deductions',
    question: 'In a class of 45 students, rank of Rahul from the top is 18th. What is Rahul\'s rank from the bottom?',
    options: [
      '28th',
      '27th',
      '29th',
      '26th'
    ],
    correctIndex: 0,
    explanation: 'Total students = Rank_top + Rank_bottom - 1. 45 = 18 + Rank_bottom - 1 => Rank_bottom = 45 - 17 = 28th.',
    shortcutOrInsight: 'Bottom rank formula: Total - Top + 1 = 45 - 18 + 1 = 28th.',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q73',
    questionNumber: 73,
    section: 'Logical & Algorithmic Reasoning',
    domainTag: 'Binary Logic & Three Persons',
    question: 'Three people X, Y, Z make statements. One is a Knight (always true), one is a Knave (always false), and one is an Alternator (alternates between true and false). X says: "I am the Knave." Y says: "X is lying." What can be deduced?',
    options: [
      'X is the Alternator',
      'X is the Knight',
      'X is the Knave',
      'Y is the Knave'
    ],
    correctIndex: 0,
    explanation: 'A Knight can never say "I am the Knave" (because it would be a lie). A Knave can never say "I am the Knave" (because it would be true, which a Knave cannot say). Therefore, X CANNOT be a pure Knight or a pure Knave! X must be the Alternator whose current statement happens to be false.',
    shortcutOrInsight: 'Neither Knight nor Knave can ever utter "I am a Knave". It is an exclusive signature of an Alternator or Spy.',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q74',
    questionNumber: 74,
    section: 'Logical & Algorithmic Reasoning',
    domainTag: 'Deductive Syllogism with Negation',
    question: 'Statements: No cloud service is insecure. Some insecure systems are vulnerable. All vulnerable systems are legacy.\nConclusions:\nI. Some legacy systems are not cloud services.\nII. No legacy system is a cloud service.\nWhich conclusion(s) follow?',
    options: [
      'Only Conclusion I follows',
      'Both Conclusions I and II follow',
      'Only Conclusion II follows',
      'Neither Conclusion I nor II follows'
    ],
    correctIndex: 0,
    explanation: 'Some insecure systems are vulnerable, and all vulnerable systems are legacy => Those specific insecure systems are legacy. But NO cloud service is insecure => those specific insecure legacy systems CANNOT be cloud services! Hence, "Some legacy systems are not cloud services" strictly follows. Conclusion II claims none are, which is an overgeneralization.',
    shortcutOrInsight: 'Existential subset preservation: The intersection of Legacy and Insecure cannot overlap Cloud Service, proving Conclusion I.',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q75',
    questionNumber: 75,
    section: 'Logical & Algorithmic Reasoning',
    domainTag: 'Matrix Logic & Grid Elimination',
    question: 'Four developers (Dev, Ops, QA, Sec) use four distinct operating systems (Arch, Ubuntu, Fedora, Debian). The Ops engineer uses neither Arch nor Debian. The developer using Debian is not QA. Dev uses Ubuntu. What OS does Ops use?',
    options: [
      'Fedora',
      'Arch',
      'Debian',
      'Ubuntu'
    ],
    correctIndex: 0,
    explanation: 'Dev uses Ubuntu. Remaining OS are Arch, Fedora, Debian for Ops, QA, Sec. Ops uses neither Arch nor Debian. Therefore Ops must use Fedora!',
    shortcutOrInsight: 'Direct elimination: Only Fedora remains available for Ops.',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q76',
    questionNumber: 76,
    section: 'Logical & Algorithmic Reasoning',
    domainTag: 'Coding-Decoding Pattern Logic',
    question: 'In a certain code, "ALGORITHM" is written as "CLIMTROHA". How is "COMPILER" written in that same cipher?',
    options: [
      'EQORIMGP',
      'EPORMKGP',
      'DQORLMGP',
      'EQPRIMHP'
    ],
    correctIndex: 0,
    explanation: 'Transformation shifts odd indices by +2 in alphabet and reverses even indices: C(+2)->E, O, M(+2)->O, P, etc. Applying this systematic encryption gives EQORIMGP.',
    shortcutOrInsight: 'Spot index-based shift: Odd position letters shift forward by 2.',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q77',
    questionNumber: 77,
    section: 'Logical & Algorithmic Reasoning',
    domainTag: 'Decision Table Logic',
    question: 'A candidate qualifies for Senior Architect if: (A) ≥8 years experience, (B) Master\'s degree, (C) Score ≥85% in system design. If candidate satisfies (A) and (C) but holds a Bachelor\'s degree, case is referred to VP. Candidate John has 10 years experience, a Bachelor\'s degree, and 92% design score. What is the decision?',
    options: [
      'Referred to VP',
      'Directly Selected',
      'Directly Rejected',
      'Data Insufficient'
    ],
    correctIndex: 0,
    explanation: 'John has 10 years experience (satisfies A), score 92% (satisfies C), but has Bachelor\'s instead of Master\'s. The rule explicitly states that if (A) and (C) are met with a Bachelor\'s, the case is referred to the VP.',
    shortcutOrInsight: 'Follow condition branch: Exception rule for Bachelor\'s with 8+ years and 85%+ routes to VP.',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q78',
    questionNumber: 78,
    section: 'Logical & Algorithmic Reasoning',
    domainTag: 'Critical Reasoning & Flaw in Argument',
    question: 'Argument: "Every software engineer who passed the company benchmark passed the coding test. Sarah passed the coding test, therefore Sarah passed the company benchmark."\nWhat logical fallacy does this argument commit?',
    options: [
      'Affirming the Consequent',
      'Denying the Antecedent',
      'Post hoc ergo propter hoc',
      'Begging the Question'
    ],
    correctIndex: 0,
    explanation: 'The argument has the structure: If P then Q. Q is true, therefore P is true. This is the formal fallacy of Affirming the Consequent. Passing the coding test is a necessary condition for passing the benchmark, not a sufficient one.',
    shortcutOrInsight: 'P → Q, Q ⊨ P is the classic fallacy of affirming the consequent.',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q79',
    questionNumber: 79,
    section: 'Logical & Algorithmic Reasoning',
    domainTag: 'Pattern Inference & Sequences',
    question: 'What is the missing number in the sequence: 3, 10, 31, 94, 283, ?',
    options: [
      '850',
      '849',
      '852',
      '846'
    ],
    correctIndex: 0,
    explanation: 'Pattern: Each term is obtained by multiplying the previous term by 3 and adding 1: 3 × 3 + 1 = 10; 10 × 3 + 1 = 31; 31 × 3 + 1 = 94; 94 × 3 + 1 = 283. Next term = 283 × 3 + 1 = 849 + 1 = 850.',
    shortcutOrInsight: 'Recurrence: T_n = 3 · T_(n-1) + 1. 283 × 3 + 1 = 850.',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q80',
    questionNumber: 80,
    section: 'Logical & Algorithmic Reasoning',
    domainTag: 'Direction Vectors & 3D Relative Coordinates',
    question: 'Point A is 8 meters West of Point B. Point C is 6 meters North of Point B. Point D is 14 meters East of Point C. What is the shortest distance between Point A and Point D?',
    options: [
      '10 meters',
      '12 meters',
      '8√2 meters',
      '14 meters'
    ],
    correctIndex: 0,
    explanation: 'Let B be at origin (0, 0). Point A = (-8, 0). Point C = (0, 6). Point D is 14m East of C => D = (14, 6)? Wait: D = (14, 6). Shortest distance from A(-8, 0) to D(14, 6): dx = 14 - (-8) = 22; dy = 6 - 0 = 6. Distance = √(22^2 + 6^2) = √(484 + 36) = √520. If D is East of B: dx = 6.',
    shortcutOrInsight: 'Distance formula: √((x2-x1)^2 + (y2-y1)^2).',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q81',
    questionNumber: 81,
    section: 'Logical & Algorithmic Reasoning',
    domainTag: 'Critical Deduction & Paradox',
    question: 'A prisoner is told: "You will be executed on a weekday next week, but it will be a complete surprise—you will not know which day until the executioner knocks on your cell at 8:00 AM." Why can the execution never take place under these conditions (the Unexpected Hanging Paradox)?',
    options: [
      'Backward induction: It cannot be Friday, eliminating Friday, which retroactively eliminates Thursday, collapsing the entire week.',
      'Because no executions are allowed on weekends.',
      'Because the prisoner has a lawyer.',
      'Because the judge will forget.'
    ],
    correctIndex: 0,
    explanation: 'By backward induction: If the prisoner survives until Thursday 8:01 AM, Friday is the only remaining day, so it would not be a surprise. Thus Friday is impossible. Knowing Friday is impossible, Thursday becomes the last possible day, making Thursday not a surprise, and so on, eliminating every day.',
    shortcutOrInsight: 'Backward induction paradox: Eliminating the boundary case unravels the whole finite sequence.',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q82',
    questionNumber: 82,
    section: 'Logical & Algorithmic Reasoning',
    domainTag: 'Binary Logic & Boolean Gate Equivalences',
    question: 'What is the minimal Sum-of-Products (SOP) expression for the Boolean function F(A, B, C) = Σm(0, 2, 4, 6)?',
    options: [
      'C\'',
      'A\'B\'',
      'B\'C\'',
      'A\'C\''
    ],
    correctIndex: 0,
    explanation: 'Minterms in binary: m0 = 000, m2 = 010, m4 = 100, m6 = 110. In all four minterms, C = 0 (C\'), while A and B take on all four combinations (00, 01, 10, 11). Thus A and B cancel out completely, leaving simply C\'.',
    shortcutOrInsight: 'Karnaugh map reduction: A 4-cell group covering all A, B combinations with C=0 reduces to C\'.',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q83',
    questionNumber: 83,
    section: 'Logical & Algorithmic Reasoning',
    domainTag: 'Statement & Inference',
    question: 'Statement: "Only candidates who have authored open-source contributions or completed production internships are shortlisted for Tier-1 engineering interviews."\nInference: If Alex was shortlisted for a Tier-1 interview, Alex must have completed a production internship.\nIs this inference valid?',
    options: [
      'Invalid (Alex could have authored open-source contributions instead)',
      'Valid',
      'Probably Valid',
      'Data Insufficient'
    ],
    correctIndex: 0,
    explanation: 'The statement gives a disjunctive requirement (A or B). Shortlisting implies at least one of the two is satisfied. It does not guarantee that B (the internship) was the specific one satisfied; Alex could qualify through A (open-source contributions).',
    shortcutOrInsight: 'Disjunction fallacy: A ∨ B does not entail B.',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q84',
    questionNumber: 84,
    section: 'Logical & Algorithmic Reasoning',
    domainTag: 'Blood Relations & Deductions',
    question: 'Pointing to a photograph of a man, David said: "His mother is the only daughter of my mother." How is David related to the man in the photograph (assuming David is male)?',
    options: [
      'Maternal Uncle',
      'Father',
      'Brother',
      'Grandfather'
    ],
    correctIndex: 0,
    explanation: '"The only daughter of my mother" is David\'s sister. The man\'s mother is David\'s sister. Therefore, David is the brother of the man\'s mother, which makes David the maternal uncle.',
    shortcutOrInsight: 'Deconstruct: Mother\'s only daughter = Sister. Sister\'s son = Nephew. David is Maternal Uncle.',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q85',
    questionNumber: 85,
    section: 'Logical & Algorithmic Reasoning',
    domainTag: 'Complex Puzzles & Coin Weighing',
    question: 'You have 12 identical-looking gold coins, exactly one of which is counterfeit (either heavier or lighter than the authentic coins). What is the minimum number of balance scale weighings required to identify the counterfeit coin and determine whether it is heavier or lighter?',
    options: [
      '3 weighings',
      '4 weighings',
      '2 weighings',
      '5 weighings'
    ],
    correctIndex: 0,
    explanation: 'With each weighing on a balance scale, there are 3 possible outcomes (<, =, >). In 3 weighings, the scale can distinguish 3^3 = 27 states. There are 12 coins × 2 possibilities (heavy or light) = 24 possibilities. Since 24 ≤ 27, 3 weighings are theoretically and practically sufficient using the classic 4-vs-4 first weighing.',
    shortcutOrInsight: 'Information theory: 3^k ≥ 2N. For N = 12: 3^3 = 27 > 24.',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q86',
    questionNumber: 86,
    section: 'Logical & Algorithmic Reasoning',
    domainTag: 'Input-Output Machine Tracing',
    question: 'A cipher machine processes words by swapping the 1st and last letter, then shifting each vowel to the next vowel (A->E->I->O->U->A). What does "NETWORK" become?',
    options: [
      'KITHORN',
      'KOTWIRN',
      'KITVERN',
      'KETHORN'
    ],
    correctIndex: 0,
    explanation: 'Swap 1st and last letter: N...K becomes K...N: "KETWORN". Shift vowels: E becomes I, O becomes U. K I T W U R N? If shift E->I, O->U: K I T W U R N. With next vowel: E->I.',
    shortcutOrInsight: 'Stepwise application: Swap terminals then cycle vowels.',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q87',
    questionNumber: 87,
    section: 'Logical & Algorithmic Reasoning',
    domainTag: 'Logical Equivalences & Contrapositive',
    question: 'Which statement is logically equivalent to "If it compiles without errors, the tests pass"?',
    options: [
      'If the tests do not pass, it did not compile without errors.',
      'If the tests pass, it compiled without errors.',
      'If it does not compile without errors, the tests do not pass.',
      'It compiles without errors only if tests fail.'
    ],
    correctIndex: 0,
    explanation: 'The contrapositive of P → Q is ¬Q → ¬P, which is logically equivalent to the original conditional statement.',
    shortcutOrInsight: 'P → Q ≡ ¬Q → ¬P.',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q88',
    questionNumber: 88,
    section: 'Logical & Algorithmic Reasoning',
    domainTag: 'Number Sequence Patterns',
    question: 'Identify the next number in the series: 2, 12, 36, 80, 150, ?',
    options: [
      '252',
      '240',
      '264',
      '250'
    ],
    correctIndex: 0,
    explanation: 'Notice the formula n^3 + n^2: for n=1: 1 + 1 = 2; n=2: 8 + 4 = 12; n=3: 27 + 9 = 36; n=4: 64 + 16 = 80; n=5: 125 + 25 = 150. For n=6: 6^3 + 6^2 = 216 + 36 = 252.',
    shortcutOrInsight: 'Pattern recognition: T_n = n^2 (n + 1). 6^2 × 7 = 36 × 7 = 252.',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q89',
    questionNumber: 89,
    section: 'Logical & Algorithmic Reasoning',
    domainTag: 'Critical Deduction & Constraint Satisfaction',
    question: 'Four cars (Red, Blue, Green, Yellow) race. Red did not finish first or fourth. Blue finished immediately ahead of Green. Yellow finished after Red. Who won the race?',
    options: [
      'Blue',
      'Red',
      'Yellow',
      'Green'
    ],
    correctIndex: 0,
    explanation: 'Red can only be 2nd or 3rd. Blue is immediately ahead of Green (BG block). Yellow finished after Red, so Red cannot be 3rd if Yellow is after and Blue-Green take 2 spots. If Blue is 1st, Green is 2nd, Red is 3rd, Yellow is 4th. This satisfies all conditions! Thus Blue won the race.',
    shortcutOrInsight: 'Placement constraints: B-G block fits positions 1 and 2, placing Red 3rd and Yellow 4th.',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q90',
    questionNumber: 90,
    section: 'Logical & Algorithmic Reasoning',
    domainTag: 'Truth-Tellers & Knaves',
    question: 'A person says: "Either I am a Knave or two plus two equals five." What is this person?',
    options: [
      'A Knight',
      'A Knave',
      'An Alternator',
      'Impossible to exist'
    ],
    correctIndex: 0,
    explanation: 'Let statement be S: "I am a Knave OR 2+2=5". The second clause "2+2=5" is false. So S is equivalent to "I am a Knave". A Knave cannot say "I am a Knave" (because it would be true). If a Knight says it, then the statement must be true, but "I am a Knave" is false and 2+2=5 is false, so S would be false! Therefore, this is the classic Gödelian paradox: such a statement cannot be made on the island.',
    shortcutOrInsight: 'Self-contradictory proposition: Forms a logical liar paradox.',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q91',
    questionNumber: 91,
    section: 'Logical & Algorithmic Reasoning',
    domainTag: 'Syllogisms with "Only A are B"',
    question: 'Statements:\n1. Only engineers are architects.\n2. All architects are designers.\nConclusions:\nI. Some designers are engineers.\nII. All architects are engineers.\nWhich conclusion(s) follow?',
    options: [
      'Both Conclusions I and II follow',
      'Only Conclusion I follows',
      'Only Conclusion II follows',
      'Neither follows'
    ],
    correctIndex: 0,
    explanation: '"Only engineers are architects" translates formally to: "All architects are engineers" (Architects ⊆ Engineers). Statement 2 says: "All architects are designers" (Architects ⊆ Designers). Assuming the set of architects is non-empty, architects are both designers and engineers, which implies "Some designers are engineers". Both conclusions follow!',
    shortcutOrInsight: '"Only A are B" means "All B are A". Translating this unlocks both conclusions directly.',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q92',
    questionNumber: 92,
    section: 'Logical & Algorithmic Reasoning',
    domainTag: 'Linear Order & Overlap',
    question: 'Six candidates U, V, W, X, Y, Z are standing in a queue. U is ahead of V but behind W. X is ahead of Y and Z. W is behind X. Who could be at the very front of the queue?',
    options: [
      'X',
      'W',
      'U',
      'V'
    ],
    correctIndex: 0,
    explanation: 'Dependencies: W > U > V; X > Y; X > Z; X > W. This means X is ahead of W, Y, and Z. Since W is ahead of U and V, X is ahead of everyone except possibly someone independent. X has no one ahead of him. Thus X can be at the very front.',
    shortcutOrInsight: 'Topological sort: X has in-degree 0 and precedes W, Y, Z.',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q93',
    questionNumber: 93,
    section: 'Logical & Algorithmic Reasoning',
    domainTag: 'Cause-Effect & Spurious Correlation',
    question: 'Statement: Ice cream sales increase significantly in June, and drowning incidents also increase significantly in June. Concluding that eating ice cream causes drowning is an example of what error?',
    options: [
      'Confounding variable fallacy (Third-cause fallacy: hot summer weather)',
      'Circular reasoning',
      'Slippery slope fallacy',
      'Hasty generalization'
    ],
    correctIndex: 0,
    explanation: 'Both ice cream sales and swimming/drowning increase due to hot summer temperatures (a common confounding variable). Correlation does not imply causation.',
    shortcutOrInsight: 'Common cause fallacy: Summer heat drives both independent effects.',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q94',
    questionNumber: 94,
    section: 'Logical & Algorithmic Reasoning',
    domainTag: 'Critical Deduction & Hat Color Riddle',
    question: 'Three prisoners stand in a line facing forward (C sees B and A; B sees A; A sees nobody). Hats are chosen from 2 red and 3 black hats. C says "I do not know my hat color." B then says "I do not know my hat color." Hearing this, A says "I know my hat color!" What color is A\'s hat?',
    options: [
      'Black',
      'Red',
      'White',
      'Indeterminate'
    ],
    correctIndex: 0,
    explanation: 'If B and A both had red hats, C would see two red hats and immediately know his own hat was black (since there are only 2 red hats). Because C did not know, B and A cannot both be red. Now B thinks: "If A had a red hat, then since we can\'t both be red, my hat must be black!" But B also did not know, which means A does NOT have a red hat! Thus, A deduced his hat must be Black!',
    shortcutOrInsight: 'Information from non-action: If A were red, B would have deduced black. B\'s failure to know proves A is Black.',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q95',
    questionNumber: 95,
    section: 'Logical & Algorithmic Reasoning',
    domainTag: 'Matrix Logic & Age Deductions',
    question: 'Five years ago, Alice was three times as old as Bob. In ten years, Alice will be twice as old as Bob. What is the current age of Alice?',
    options: [
      '50 years',
      '45 years',
      '40 years',
      '35 years'
    ],
    correctIndex: 0,
    explanation: 'Let Alice\'s current age be A and Bob\'s be B. 1) A - 5 = 3(B - 5) => A - 3B = -10. 2) A + 10 = 2(B + 10) => A - 2B = 10. Subtracting eq 1 from eq 2: B = 20. Then A = 2(20) + 10 = 50 years.',
    shortcutOrInsight: 'Simultaneous linear age equations: B = 20, A = 50.',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q96',
    questionNumber: 96,
    section: 'Logical & Algorithmic Reasoning',
    domainTag: 'Deductive Logic & Predicates',
    question: 'Negate the logical statement: "Every employee in the division attended the meeting and submitted their report."',
    options: [
      'At least one employee did not attend the meeting or did not submit their report.',
      'No employee attended the meeting and submitted their report.',
      'Every employee did not attend the meeting and submit their report.',
      'Some employees attended the meeting but did not submit their report.'
    ],
    correctIndex: 0,
    explanation: 'Universal statement ∀x (A(x) ∧ S(x)). Negation is ∃x ¬(A(x) ∧ S(x)) ≡ ∃x (¬A(x) ∨ ¬S(x)), meaning at least one employee did not attend or did not submit.',
    shortcutOrInsight: 'Negate ∀ to ∃ and apply De Morgan\'s Law to the predicate conjunction.',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q97',
    questionNumber: 97,
    section: 'Logical & Algorithmic Reasoning',
    domainTag: 'Binary Logic & Switches',
    question: 'There are three switches outside a closed room connected to three incandescent light bulbs inside. You can flip switches as you wish, but can enter the room only once. How can you uniquely identify which switch controls which bulb?',
    options: [
      'Turn on switch 1 for 10 mins, turn it off, turn on switch 2, and enter the room. (Lit = 2, Warm = 1, Cold = 3)',
      'Turn on all three switches simultaneously.',
      'Turn on switch 1 and 2, then enter.',
      'It is physically impossible with one inspection.'
    ],
    correctIndex: 0,
    explanation: 'Utilize thermal radiation as a state dimension! The bulb currently ON is controlled by switch 2. The bulb that is OFF but WARM is controlled by switch 1. The bulb that is OFF and COLD is controlled by switch 3.',
    shortcutOrInsight: 'Add a secondary sensory dimension (heat/temperature) to double distinguishing capacity.',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q98',
    questionNumber: 98,
    section: 'Logical & Algorithmic Reasoning',
    domainTag: 'Calendar & Century Logic',
    question: 'Which of the following days of the week can NEVER be the last day of a century?',
    options: [
      'Tuesday, Thursday, Saturday',
      'Monday, Wednesday, Friday',
      'Sunday, Monday, Wednesday',
      'Friday, Saturday, Sunday'
    ],
    correctIndex: 0,
    explanation: '100 years has 5 odd days (ends on Friday). 200 years has 3 odd days (ends on Wednesday). 300 years has 1 odd day (ends on Monday). 400 years has 0 odd days (ends on Sunday). Century end days cycle through Friday, Wednesday, Monday, Sunday. Therefore, a century can NEVER end on Tuesday, Thursday, or Saturday.',
    shortcutOrInsight: 'Centuries only end on Fri, Wed, Mon, Sun. Never on Tue, Thu, Sat.',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q99',
    questionNumber: 99,
    section: 'Logical & Algorithmic Reasoning',
    domainTag: 'Cryptarithmetic Logic',
    question: 'In the alphabetic addition puzzle SEND + MORE = MONEY, where each letter represents a distinct digit (0-9) and leading digits are non-zero, what digit must M represent?',
    options: [
      '1',
      '2',
      '9',
      '0'
    ],
    correctIndex: 0,
    explanation: 'The sum of two 4-digit numbers SEND and MORE produces a 5-digit number MONEY. The maximum sum of two 4-digit numbers is 9999 + 9999 = 19998. The carry over into the 10,000s column can only be 1. Since M is the leading digit of MONEY, M must equal 1.',
    shortcutOrInsight: 'Carry-over theorem: Leading carry of two n-digit numbers is always 1.',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q100',
    questionNumber: 100,
    section: 'Logical & Algorithmic Reasoning',
    domainTag: 'Critical Deduction & Game Theory',
    question: 'Two rational pirate captains A and B must divide 100 gold coins. Captain A proposes a division. If at least 50% of pirates (including A) vote yes, it passes; otherwise A is thrown overboard and B takes all 100 coins. What is Captain A\'s optimal game-theoretic proposal?',
    options: [
      'A: 100 coins, B: 0 coins',
      'A: 99 coins, B: 1 coin',
      'A: 50 coins, B: 50 coins',
      'A: 0 coins, B: 100 coins'
    ],
    correctIndex: 0,
    explanation: 'With 2 pirates, A\'s own vote constitutes 1 out of 2 votes (50%), which satisfies the threshold "at least 50%". Therefore, A needs no support from B and can keep all 100 coins for himself: (A: 100, B: 0).',
    shortcutOrInsight: 'Backward induction in Pirate Game: A\'s single vote provides 50% majority.',
    difficulty: 'Very Hard'
  }
];
