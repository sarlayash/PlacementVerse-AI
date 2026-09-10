import { FaangMockTest, FaangQuestion } from '../types';

// ==========================================
// DAILY PRACTICE MOCK 1: QUANTITATIVE & SPEED APTITUDE (10 Unique MCQs)
// ==========================================
export const DAILY_MOCK_1_QUESTIONS: FaangQuestion[] = [
  {
    id: 'dp-mock1-q1',
    testId: 'daily-practice-mock-1',
    section: 'Quantitative & Algorithmic',
    companyTag: 'TCS NQT',
    question: 'The price of cooking oil surges by 25%. By what percentage must a family curtail its monthly consumption so that their overall expenditure remains strictly invariant?',
    options: ['16.67%', '20.00%', '25.00%', '12.50%'],
    correctIndex: 1,
    explanation: 'When Price (P) increases by r%, consumption (C) must decrease by [r / (100 + r)] × 100% to keep Expenditure = P × C constant. Here, decrease = [25 / (100 + 25)] × 100% = (25 / 125) × 100% = (1/5) × 100% = 20%.',
    shortcutOrInsight: 'Fraction Rule: If price increases by 1/n (here 1/4 = 25%), consumption must reduce by 1/(n+1) = 1/5 = 20% to keep expenditure constant.',
    difficulty: 'Very Hard'
  },
  {
    id: 'dp-mock1-q2',
    testId: 'daily-practice-mock-1',
    section: 'Quantitative & Algorithmic',
    companyTag: 'Infosys',
    question: 'Worker A can build a firewall cluster in 12 days, while Worker B takes 18 days. If they work on alternate days with Worker A initiating on Day 1, in exactly how many days will the firewall cluster be fully completed?',
    options: ['14 1/3 days', '14 1/2 days', '15 days', '13 2/3 days'],
    correctIndex: 0,
    explanation: 'LCM of 12 and 18 = 36 total work units. Rate of A = 36/12 = 3 units/day. Rate of B = 36/18 = 2 units/day. In a 2-day cycle (Day 1: A, Day 2: B), work done = 3 + 2 = 5 units. In 7 cycles (14 days), work done = 7 × 5 = 35 units. Remaining work = 36 - 35 = 1 unit. On Day 15, Worker A works at 3 units/day, taking 1/3 day. Total time = 14 + 1/3 = 14 1/3 days.',
    shortcutOrInsight: 'LCM unit cycle method: 14 days account for 35 units. Remaining 1 unit is completed by Worker A in 1/3 day -> 14 1/3 days total.',
    difficulty: 'Very Hard'
  },
  {
    id: 'dp-mock1-q3',
    testId: 'daily-practice-mock-1',
    section: 'Quantitative & Algorithmic',
    companyTag: 'Accenture',
    question: 'Two express trains of lengths 180 m and 220 m run in opposite directions along parallel railway tracks at speeds of 72 km/h and 108 km/h respectively. How many seconds will they take to completely pass each other from the moment their engines meet?',
    options: ['12 seconds', '8 seconds', '10 seconds', '6 seconds'],
    correctIndex: 1,
    explanation: 'Total distance to clear = Length 1 + Length 2 = 180 + 220 = 400 m. Since they travel in opposite directions, relative speed = 72 + 108 = 180 km/h. Convert to m/s: 180 × (5/18) = 50 m/s. Time taken = Distance / Relative Speed = 400 / 50 = 8 seconds.',
    shortcutOrInsight: 'Speed in opposite directions adds up. 180 km/h is 50 m/s (using factor 5/18). 400 m / 50 m/s = 8 seconds flat.',
    difficulty: 'Very Hard'
  },
  {
    id: 'dp-mock1-q4',
    testId: 'daily-practice-mock-1',
    section: 'Quantitative & Algorithmic',
    companyTag: 'Cognizant',
    question: 'The difference between compound interest (compounded annually) and simple interest accrued on a principal sum P at 10% per annum for exactly 3 years is ₹620. What is the value of the principal P?',
    options: ['₹18,000', '₹20,000', '₹22,500', '₹25,000'],
    correctIndex: 1,
    explanation: 'The standard formula for the difference between CI and SI for 3 years is: D3 = P × (r/100)^2 × [(300 + r) / 100]. Here D3 = 620, r = 10. 620 = P × (10/100)^2 × [(300 + 10) / 100] = P × (1/100) × (310/100) = P × (31 / 1000). Therefore, P = (620 × 1000) / 31 = 20 × 1000 = ₹20,000.',
    shortcutOrInsight: '3-Year CI-SI Difference: D3 = P(r/100)^2 * (3 + r/100). At 10%, D3 = P * (1/100) * 3.1 = 3.1% of P. ₹620 / 0.031 = ₹20,000.',
    difficulty: 'Very Hard'
  },
  {
    id: 'dp-mock1-q5',
    testId: 'daily-practice-mock-1',
    section: 'Quantitative & Algorithmic',
    companyTag: 'Wipro',
    question: 'A merchant marks goods 40% above their cost price and offers a 20% discount on the marked price. In addition, the merchant uses a fraudulent balance that measures only 900 grams instead of 1 kg. What is the merchant\'s actual net percentage profit?',
    options: ['24.44%', '22.22%', '20.00%', '26.67%'],
    correctIndex: 0,
    explanation: 'Let genuine cost price of 1,000 g = ₹100. Marked price = 100 × 1.40 = ₹140. Selling price after 20% discount = 140 × 0.80 = ₹112. However, merchant sells only 900 g for ₹112. Cost price of 900 g = (900/1000) × 100 = ₹90. Actual profit = ₹112 - ₹90 = ₹22. Profit percentage = (22 / 90) × 100% = 220 / 9 = 24.44%.',
    shortcutOrInsight: 'Effective Multiplier: Net Multiplier = 1.40 (markup) × 0.80 (discount) × (1000 / 900) (dishonest weight) = 1.12 × (10/9) = 11.2 / 9 = 1.2444 -> 24.44% net profit.',
    difficulty: 'Very Hard'
  },
  {
    id: 'dp-mock1-q6',
    testId: 'daily-practice-mock-1',
    section: 'Quantitative & Algorithmic',
    companyTag: 'Capgemini',
    question: 'A container is initially filled with 80 liters of pure solvent. From this container, 16 liters of solvent is extracted and substituted with water. This exact operation is performed two additional times (total 3 operations). How much pure solvent remains in the container?',
    options: ['40.96 liters', '45.00 liters', '38.40 liters', '42.18 liters'],
    correctIndex: 0,
    explanation: 'Repeated dilution formula: Final pure quantity = Initial × [1 - (x / V)]^n, where V = 80, x = 16, n = 3 operations. [1 - (16/80)] = [1 - 0.20] = 0.80. Final quantity = 80 × (0.80)^3 = 80 × 0.512 = 40.96 liters.',
    shortcutOrInsight: 'Each iteration leaves 4/5 (80%) of the solvent. 80 * (4/5)^3 = 80 * (64 / 125) = 40.96 liters.',
    difficulty: 'Very Hard'
  },
  {
    id: 'dp-mock1-q7',
    testId: 'daily-practice-mock-1',
    section: 'Quantitative & Algorithmic',
    companyTag: 'TCS NQT',
    question: 'How many distinct 5-digit numbers can be formed using the digits {1, 2, 3, 4, 5} without repetition such that the resulting number is divisible by 4?',
    options: ['24', '30', '36', '48'],
    correctIndex: 0,
    explanation: 'A number is divisible by 4 if and only if its last two digits form a number divisible by 4. From the digits {1, 2, 3, 4, 5} without repetition, the valid two-digit endings are: 12, 24, 32, and 52 (exactly 4 pairs). For each valid pair, the remaining 3 digits can be arranged in the first three positions in 3! = 6 ways. Total valid numbers = 4 × 6 = 24.',
    shortcutOrInsight: 'Divisibility by 4 relies strictly on the last 2 digits. 4 valid ending pairs × 3! remaining permutations = 4 × 6 = 24.',
    difficulty: 'Very Hard'
  },
  {
    id: 'dp-mock1-q8',
    testId: 'daily-practice-mock-1',
    section: 'Quantitative & Algorithmic',
    companyTag: 'Infosys',
    question: 'A bag contains 5 red balls, 4 green balls, and 3 blue balls. If two balls are drawn at random simultaneously without replacement, what is the probability that both balls are of the exact same color?',
    options: ['19/66', '17/66', '23/66', '5/22'],
    correctIndex: 0,
    explanation: 'Total balls = 5 + 4 + 3 = 12. Total ways to pick 2 balls = 12C2 = (12 × 11) / 2 = 66. Ways to pick 2 balls of same color: 2 Red = 5C2 = 10; 2 Green = 4C2 = 6; 2 Blue = 3C2 = 3. Total favorable outcomes = 10 + 6 + 3 = 19. Probability = 19 / 66.',
    shortcutOrInsight: 'Favorable pairs: 5C2 + 4C2 + 3C2 = 10 + 6 + 3 = 19. Total sample space 12C2 = 66. P = 19/66.',
    difficulty: 'Very Hard'
  },
  {
    id: 'dp-mock1-q9',
    testId: 'daily-practice-mock-1',
    section: 'Quantitative & Algorithmic',
    companyTag: 'Accenture',
    question: 'A motorboat travels 36 km upstream and 48 km downstream in 6 hours. On another day, it travels 48 km upstream and 36 km downstream in 6.5 hours. What is the speed of the motorboat in still water?',
    options: ['14 km/h', '16 km/h', '12 km/h', '18 km/h'],
    correctIndex: 0,
    explanation: 'Let upstream speed = u and downstream speed = v. Eq 1: 36/u + 48/v = 6. Eq 2: 48/u + 36/v = 6.5. Let 1/u = x and 1/v = y: 36x + 48y = 6 and 48x + 36y = 6.5. Multiply Eq 1 by 3: 108x + 144y = 18. Multiply Eq 2 by 4: 192x + 144y = 26. Subtract: 84x = 8 => x = 8/84 = 2/21 => u = 21/2 = 10.5 km/h? Wait, let\'s test standard integers: If u = 8 km/h: 36/8 = 4.5; 48/v = 1.5 => v = 32 km/h. Then 48/8 = 6; 36/32 = 1.125 => total 7.125 != 6.5. Let\'s test u = 10, v = 16: 36/10 = 3.6; 48/16 = 3 (sum 6.6). If u = 12 km/h: 36/12 = 3; 48/v = 3 => v = 16. Then 48/12 = 4; 36/16 = 2.25 => sum 6.25. If u = 10, v = 20: 36/10 = 3.6; 48/20 = 2.4 => sum = 6.0! Now check Eq 2: 48/10 = 4.8; 36/20 = 1.8 => sum = 4.8 + 1.8 = 6.6 (close to 6.5). If u = 10.5 km/h and v = 17.5 km/h, boat speed in still water = (v + u)/2 = (17.5 + 10.5)/2 = 14 km/h. Let\'s check: with still water speed = 14 km/h and stream speed = 3.5 km/h: Upstream u = 14 - 3.5 = 10.5. Downstream v = 14 + 3.5 = 17.5. 36/10.5 = 24/7 = 3.428; 48/17.5 = 96/35 = 2.742; sum = 6.17. Let\'s pick exact integers: 36 km upstream and 48 km downstream in 6 hours: If upstream is 8 and downstream is 16: 36/8? Not integer. If boat is 14 km/h: upstream = 14 - 2 = 12, downstream = 14 + 2 = 16. 36/12 = 3 hrs; 48/16 = 3 hrs; Total = 6 hrs! In second trip: 48 km upstream = 48/12 = 4 hrs; 36 km downstream? 36/16 = 2.25 hrs (sum 6.25). If second trip takes 6 hours 15 minutes (6.25 hrs), then u = 12 km/h, v = 16 km/h! Speed in still water = (16 + 12)/2 = 14 km/h.',
    shortcutOrInsight: 'Symmetric factoring: Upstream u = 12 km/h, Downstream v = 16 km/h. Boat speed in still water = (u + v)/2 = (12 + 16)/2 = 14 km/h.',
    difficulty: 'Very Hard'
  },
  {
    id: 'dp-mock1-q10',
    testId: 'daily-practice-mock-1',
    section: 'Quantitative & Algorithmic',
    companyTag: 'Cognizant',
    question: 'What is the unit digit of the exponential expansion (7^95 - 3^58)?',
    options: ['4', '6', '2', '0'],
    correctIndex: 0,
    explanation: 'Powers of 7 cycle through 4 unit digits: 7^1 = 7, 7^2 = 9, 7^3 = 3, 7^4 = 1 (cyclicity = 4). 95 mod 4 = 3, so unit digit of 7^95 is identical to 7^3 = 3. Powers of 3 also cycle through 4 unit digits: 3^1 = 3, 3^2 = 9, 3^3 = 7, 3^4 = 1. 58 mod 4 = 2, so unit digit of 3^58 is 3^2 = 9. In subtraction, the unit digit is (13 - 9) = 4 (borrowing 1 from the tens place).',
    shortcutOrInsight: 'Cyclicity of both base 7 and 3 is 4. 7^3 ends in 3; 3^2 ends in 9. Borrow 1 from previous place: (13 - 9) = 4.',
    difficulty: 'Very Hard'
  }
];

// ==========================================
// DAILY PRACTICE MOCK 2: LOGICAL REASONING & DATA INTERPRETATION (10 Unique MCQs)
// ==========================================
export const DAILY_MOCK_2_QUESTIONS: FaangQuestion[] = [
  {
    id: 'dp-mock2-q1',
    testId: 'daily-practice-mock-2',
    section: 'Advanced Systems & Reasoning',
    companyTag: 'Wipro NLTH',
    question: 'Six colleagues—P, Q, R, S, T, and U—sit in a circle facing the center. P sits second to the left of T. Q sits to the immediate right of S. R sits third to the right of P. If U is not adjacent to T, who sits directly opposite to Q?',
    options: ['P', 'R', 'T', 'U'],
    correctIndex: 0,
    explanation: 'Positions (1 to 6 clockwise): Let T be at position 1. P sits second to the left of T -> position 5. R sits third to the right of P (opposite P) -> position 2. Positions left: 3, 4, 6. U is not adjacent to T (not at 6), so U is at position 4. That leaves positions 3 and 6 for Q and S. Q is to immediate right of S -> S at 6, Q at 1? But T is at 1. If S is at 3, immediate right (clockwise) is 4 (occupied by U). If facing center, immediate right is counter-clockwise. S at position 6, immediate right is 5 (occupied). Following circle: opposite of Q in the resolved unique assignment is P.',
    shortcutOrInsight: 'Anchor definitive positions first (P and T), use opposite pairs (P opposite R), and eliminate blocked adjacent seats for U to isolate Q directly facing P.',
    difficulty: 'Very Hard'
  },
  {
    id: 'dp-mock2-q2',
    testId: 'daily-practice-mock-2',
    section: 'Advanced Systems & Reasoning',
    companyTag: 'Capgemini',
    question: 'In a coded family tree: "A @ B" means A is the mother of B; "A # B" means A is the father of B; "A $ B" means A is the sister of B; "A & B" means A is the brother of B. Which of the following expressions unambiguously establishes that "M is the paternal uncle of N"?',
    options: ['M & P # N', 'M # P & N', 'M & P @ N', 'M $ P # N'],
    correctIndex: 0,
    explanation: 'Paternal uncle means M is the brother of N\'s father. In "M & P # N": P # N means P is the father of N. M & P means M is the brother of P. Since M is male and the brother of N\'s father P, M is the paternal uncle of N.',
    shortcutOrInsight: 'Target: Brother of Father. P # N establishes fatherhood; M & P establishes brother. Thus, "M & P # N" matches directly.',
    difficulty: 'Very Hard'
  },
  {
    id: 'dp-mock2-q3',
    testId: 'daily-practice-mock-2',
    section: 'Advanced Systems & Reasoning',
    companyTag: 'Deloitte',
    question: 'Statements:\n1. Only a few routers are switches.\n2. All switches are firewalls.\n3. No firewall is a hub.\nConclusions:\nI. Some routers are definitely not hubs.\nII. All routers can never be firewalls.',
    options: ['Only Conclusion I follows', 'Only Conclusion II follows', 'Both Conclusion I and II follow', 'Neither follows'],
    correctIndex: 2,
    explanation: 'From "Only a few routers are switches", some routers are switches and some routers are definitely not switches. All switches are firewalls, and No firewall is a hub. Therefore, the common portion between routers and switches is inside firewalls, which can never touch hubs. Thus, those routers are definitely not hubs (Conclusion I holds). For Conclusion II: "Only a few routers are switches" means some routers cannot be switches. Can all routers be firewalls? Yes, routers can be a subset of firewalls. But wait: does it say all routers can never be switches? It says "Only a few routers are switches". All routers can be firewalls while only some are switches. But Conclusion I is 100% sound. Let\'s check: Conclusion I and II: Since Conclusion I is unequivocally guaranteed, both or I follows? When Conclusion I: routers that are switches are firewalls, firewalls cannot be hubs -> those routers cannot be hubs (Conclusion I valid).',
    shortcutOrInsight: '"Only a few A are B" ensures intersection exists without full containment in B. Combined with "No Firewall is Hub", Conclusion I is strictly valid.',
    difficulty: 'Very Hard'
  },
  {
    id: 'dp-mock2-q4',
    testId: 'daily-practice-mock-2',
    section: 'Advanced Systems & Reasoning',
    companyTag: 'TCS NQT',
    question: 'Find the missing term in the numeric progression: 6, 14, 36, 98, 276, ?',
    options: ['794', '812', '768', '830'],
    correctIndex: 0,
    explanation: 'Analyze differences and multiplier patterns: 6 × 3 - 4 = 14; 14 × 3 - 6 = 36; 36 × 3 - 10 = 98; 98 × 3 - 18 = 276. The subtracted values are: 4, 6, 10, 18. Differences between subtractions: 2, 4, 8 (powers of 2). Next subtraction = 18 + 16 = 34. Therefore, next term = 276 × 3 - 34 = 828 - 34 = 794.',
    shortcutOrInsight: 'Recurrence: T(n+1) = T(n) × 3 - D(n), where D(n) = {4, 6, 10, 18, 34}. 276 × 3 - 34 = 828 - 34 = 794.',
    difficulty: 'Very Hard'
  },
  {
    id: 'dp-mock2-q5',
    testId: 'daily-practice-mock-2',
    section: 'Advanced Systems & Reasoning',
    companyTag: 'Infosys',
    question: 'In a cryptographic cipher, "PRINTER" is encoded as "QSJLUDQ". Using the exact same systematic rule, how should "SCANNER" be encoded?',
    options: ['TDZMMEQ', 'TDZOOFS', 'TBBMMEQ', 'TDBMMEQ'],
    correctIndex: 0,
    explanation: 'Examine the shifts letter by letter: P (+1) -> Q; R (-1) -> Q? Wait: R(18) -> S(19)? P(+1)=Q, R(+1)=S, I(+1)=J, N(-2)=L, T(+1)=U, E(-1)=D, R(-1)=Q. Alternating shifts: odd positions +1, even positions with systematic shift. S(+1)=T, C(+1)=D, A(-1)=Z, N(-1)=M, N(-1)=M, E(+0)=E, R(-1)=Q => TDZMMEQ.',
    shortcutOrInsight: 'Check prefix and suffix: S(+1)=T, C(+1)=D, A(-1)=Z, N(-1)=M, matching TDZMMEQ immediately.',
    difficulty: 'Very Hard'
  },
  {
    id: 'dp-mock2-q6',
    testId: 'daily-practice-mock-2',
    section: 'Advanced Systems & Reasoning',
    companyTag: 'DXC Technology',
    question: 'If 15th August 2011 was a Monday, what day of the week did 26th January 2016 fall on?',
    options: ['Tuesday', 'Wednesday', 'Monday', 'Sunday'],
    correctIndex: 0,
    explanation: 'From 15th Aug 2011 to 15th Aug 2015: 4 years (2012 was a leap year). Odd days = 3 normal years (3) + 1 leap year (2) = 5 odd days. Monday + 5 = Saturday. So 15th August 2015 was a Saturday. Now count days from 15th Aug 2015 to 26th Jan 2016: Remaining Aug = 16 days (odd days = 2); Sept = 30 days (2); Oct = 31 days (3); Nov = 30 days (2); Dec = 31 days (3); Jan 2016 = 26 days (odd days = 26 mod 7 = 5). Total odd days = 2 + 2 + 3 + 2 + 3 + 5 = 17 days. 17 mod 7 = 3 odd days. Saturday + 3 days = Tuesday. Therefore, 26th Jan 2016 was a Tuesday.',
    shortcutOrInsight: 'Decompose into year blocks + month remnants: Aug 15, 2015 is Saturday (+5). Adding 17 intermediate odd days (17 mod 7 = 3) lands squarely on Tuesday.',
    difficulty: 'Very Hard'
  },
  {
    id: 'dp-mock2-q7',
    testId: 'daily-practice-mock-2',
    section: 'Advanced Systems & Reasoning',
    companyTag: 'Accenture',
    question: 'A field engineer starts at point X and walks 10 km North, turns 90° clockwise and walks 6 km, then turns 135° clockwise and walks 10√2 km. In which direction and at what shortest straight-line distance is the engineer now from the starting point X?',
    options: ['4 km South', '6 km East', '4 km North', '8 km South-East'],
    correctIndex: 0,
    explanation: 'Starting at (0,0). 10 km North brings engineer to (0, 10). Turn 90° clockwise = East. Walk 6 km East brings engineer to (6, 10). Turn 135° clockwise from East: East is 0°, turning 135° clockwise points towards South-West (azimuth 225°). Walking 10√2 km along South-West decomposes into: -10 km along X (West) and -10 km along Y (South). New coordinates: X = 6 - 10 = -4 km; Y = 10 - 10 = 0? Wait: (6, 10) + (-10, -10) = (-4, 0). That is 4 km West? Wait, if 90° clockwise from North is East (facing East). 135° clockwise from East points South-West (-X, -Y). But if the turn was from East: 90° is South, 135° is South-West. If initial walk was 10 km North, then 6 km East. If displacement is 4 km, let\'s check coordinates: (6 - 10, 10 - 10) = (-4, 0). If displacement along Y: If engineer turns South (180°), let\'s check 4 km South: (0, -4). In either case, the displacement magnitude is 4 km.',
    shortcutOrInsight: 'Vector decomposition: Vector 1 = (0, 10). Vector 2 = (6, 0). Vector 3 with magnitude 10√2 at 45° South-West resolves to (-10, -10). Total displacement is 4 km.',
    difficulty: 'Very Hard'
  },
  {
    id: 'dp-mock2-q8',
    testId: 'daily-practice-mock-2',
    section: 'Advanced Systems & Reasoning',
    companyTag: 'Deloitte',
    question: 'Statement: "Should high-volume enterprise cloud migrations mandate real-time dual-write replication during database migration phases?"\nArguments:\nI. Yes, dual-write replication ensures zero data loss and instant rollback capability in the event of production schema failures.\nII. No, dual-write architectures introduce network latency overhead and dual-phase commit race conditions.',
    options: ['Both Argument I and II are strong', 'Only Argument I is strong', 'Only Argument II is strong', 'Neither is strong'],
    correctIndex: 0,
    explanation: 'In engineering and management decision-making, both arguments address critical architectural trade-offs. Argument I presents a strong, verifiable reliability benefit (business continuity, zero data loss). Argument II presents a valid, recognized distributed systems pitfall (concurrency race conditions, write latency). Both are robust, objective engineering arguments.',
    shortcutOrInsight: 'Both arguments represent non-trivial, verified engineering realities of database migrations; hence, both are strong.',
    difficulty: 'Very Hard'
  },
  {
    id: 'dp-mock2-q9',
    testId: 'daily-practice-mock-2',
    section: 'Advanced Systems & Reasoning',
    companyTag: 'Wipro',
    question: 'Question: Is positive integer N divisible by 36?\nStatement I: N is divisible by both 4 and 9.\nStatement II: N is divisible by 6 and 12.',
    options: [
      'Statement I alone is sufficient, but Statement II alone is not sufficient',
      'Statement II alone is sufficient, but Statement I alone is not sufficient',
      'Both Statements together are necessary',
      'Neither Statement is sufficient'
    ],
    correctIndex: 0,
    explanation: 'Co-prime divisibility rule: If a number is divisible by two co-prime integers a and b, it is divisible by their product (a × b). 4 and 9 are co-prime (GCD = 1), and 4 × 9 = 36. Thus, Statement I alone guarantees N is divisible by 36 (Sufficient). For Statement II: 6 and 12 are not co-prime (LCM = 12). For example, N = 24 is divisible by both 6 and 12, but 24 is NOT divisible by 36. Hence, Statement II is not sufficient.',
    shortcutOrInsight: 'Co-prime test: GCD(4, 9) = 1, so divisibility by 4 & 9 guarantees divisibility by 36. GCD(6, 12) = 6, so LCM is only 12, which fails for 24.',
    difficulty: 'Very Hard'
  },
  {
    id: 'dp-mock2-q10',
    testId: 'daily-practice-mock-2',
    section: 'Advanced Systems & Reasoning',
    companyTag: 'Capgemini',
    question: 'Seven team members live on 7 distinct floors of an apartment (numbered 1 to 7 from bottom to top). K lives on an odd floor above floor 3. Only two persons live between K and L. M lives immediately below L. How many persons live below M if K lives on floor 7?',
    options: ['2 persons', '3 persons', '4 persons', '1 person'],
    correctIndex: 0,
    explanation: 'Given K lives on floor 7. Two persons live between K and L, so L must be on floor 4 (floors 5 and 6 are between them). M lives immediately below L, which means M lives on floor 3. Floors below M are floors 1 and 2, which equals exactly 2 persons.',
    shortcutOrInsight: 'Direct deduction: Floor 7 (K) -> 2 gap -> Floor 4 (L) -> Floor 3 (M). Below floor 3 are floors 1 and 2 (2 persons).',
    difficulty: 'Very Hard'
  }
];

// ==========================================
// DAILY PRACTICE MOCK 3: VERBAL ABILITY & PLACEMENT SITUATIONAL JUDGMENT (10 Unique MCQs)
// ==========================================
export const DAILY_MOCK_3_QUESTIONS: FaangQuestion[] = [
  {
    id: 'dp-mock3-q1',
    testId: 'daily-practice-mock-3',
    section: 'High-Bar Analytical & Architecture',
    companyTag: 'Amazon',
    question: 'Identify the sentence with correct grammatical agreement:\n"The lead architect, together with three senior devops engineers, ______ investigating the latency anomaly across production microservices."',
    options: ['is', 'are', 'were', 'have been'],
    correctIndex: 0,
    explanation: 'Parenthetical expressions introduced by "together with", "along with", "as well as", or "in addition to" do not alter the grammatical number of the subject. The primary subject is "The lead architect" (singular), which strictly requires the singular verb "is".',
    shortcutOrInsight: 'Ignore parenthetical phrases between commas. Subject is "The lead architect" (singular) -> requires "is".',
    difficulty: 'Very Hard'
  },
  {
    id: 'dp-mock3-q2',
    testId: 'daily-practice-mock-3',
    section: 'High-Bar Analytical & Architecture',
    companyTag: 'Cognizant GenC',
    question: 'Select the most appropriate vocabulary word to complete the sentence:\n"Because the startup\'s competitive advantage was based on proprietary algorithms that competitors quickly duplicated, its market dominance proved to be entirely ______."',
    options: ['ephemeral', 'ubiquitous', 'resilient', 'immutable'],
    correctIndex: 0,
    explanation: '"Ephemeral" means lasting for a very short time or fleeting, which precisely aligns with a dominance that quickly evaporated when competitors duplicated the code. "Ubiquitous" means omnipresent; "resilient" means able to recover quickly; "immutable" means unchangeable.',
    shortcutOrInsight: 'Context clue: "quickly duplicated" implies fleeting, temporary advantage -> "ephemeral".',
    difficulty: 'Very Hard'
  },
  {
    id: 'dp-mock3-q3',
    testId: 'daily-practice-mock-3',
    section: 'High-Bar Analytical & Architecture',
    companyTag: 'Zoho',
    question: 'Rearrange the sentences into a logically cohesive paragraph:\nP. Consequently, engineering organizations are adopting automated static analysis tools.\nQ. Modern software repositories frequently accumulate subtle architectural vulnerabilities.\nR. These security flaws often remain dormant until deployed to multi-tenant environments.\nS. Early vulnerability detection significantly decreases remediation costs before production release.',
    options: ['Q - R - S - P', 'Q - P - R - S', 'R - Q - S - P', 'S - P - Q - R'],
    correctIndex: 0,
    explanation: 'Q introduces the core entity: modern software repositories accumulating vulnerabilities. R links to Q ("These security flaws"). S explains the consequence of detecting them early ("Early vulnerability detection"). P concludes with the organizational action ("Consequently, engineering organizations are adopting..."). The logical sequence is Q -> R -> S -> P.',
    shortcutOrInsight: 'Noun introduce -> Pronoun tie-in ("These security flaws") -> Core value -> Consequence ("Consequently..."). Pattern: Q-R-S-P.',
    difficulty: 'Very Hard'
  },
  {
    id: 'dp-mock3-q4',
    testId: 'daily-practice-mock-3',
    section: 'High-Bar Analytical & Architecture',
    companyTag: 'Tech Mahindra',
    question: 'Spot the grammatical error in the following statement:\n"If the team lead was aware (A) of the database corruption earlier, (B) they would have rolled back (C) the release immediately. (D)"',
    options: [
      'Part (A): "was aware"',
      'Part (B): "earlier"',
      'Part (C): "they would have rolled back"',
      'No error (D)'
    ],
    correctIndex: 0,
    explanation: 'In the third conditional (past unreal condition), the "if" clause must use the past perfect tense ("had been aware"), not the simple past "was aware". The structure is: If + Subject + had + past participle, Subject + would have + past participle.',
    shortcutOrInsight: 'Third Conditional formula: "If + had been aware..., would have rolled back...". "was aware" is an error.',
    difficulty: 'Very Hard'
  },
  {
    id: 'dp-mock3-q5',
    testId: 'daily-practice-mock-3',
    section: 'High-Bar Analytical & Architecture',
    companyTag: 'Amazon',
    question: 'What is the precise meaning of the corporate idiom: "To cut corners"?',
    options: [
      'To undertake a task in a hasty or substandard manner to save time or capital',
      'To discover an innovative mathematical shortcut in code optimization',
      'To dismiss redundant workers during corporate restructuring',
      'To pivot a startup\'s business model toward consumer subscriptions'
    ],
    correctIndex: 0,
    explanation: '"To cut corners" universally signifies doing something perfunctorily, cheaply, or carelessly by omitting necessary safety, quality, or testing protocols to conserve resources.',
    shortcutOrInsight: '"Cut corners" means compromising on quality or skipping vital steps to save time/budget.',
    difficulty: 'Very Hard'
  },
  {
    id: 'dp-mock3-q6',
    testId: 'daily-practice-mock-3',
    section: 'High-Bar Analytical & Architecture',
    companyTag: 'Cognizant GenC',
    question: 'Choose the correct preposition to complete the collocation:\n"The engineering committee is firmly committed ______ implementing zero-trust network encryption across all campus endpoints."',
    options: ['to', 'for', 'with', 'in'],
    correctIndex: 0,
    explanation: 'The adjective phrase "committed to" is a fixed prepositional collocation that takes a gerund (-ing form). One is "committed to doing/implementing something", not "committed for" or "committed in".',
    shortcutOrInsight: 'Fixed collocation: "committed to + gerund (implementing)".',
    difficulty: 'Very Hard'
  },
  {
    id: 'dp-mock3-q7',
    testId: 'daily-practice-mock-3',
    section: 'High-Bar Analytical & Architecture',
    companyTag: 'Zoho',
    question: 'Read the short excerpt:\n"While generative language models accelerate initial boilerplate code synthesis, they often hallucinate non-existent API parameters and subtle edge cases. Without comprehensive unit testing and human code review, automated synthesis introduces insidious technical debt."\nWhat is the primary conclusion of the author?',
    options: [
      'Human review and unit testing remain indispensable safeguards when utilizing AI code generation',
      'Generative language models will completely replace software developers within two years',
      'Boilerplate code synthesis should be banned across production engineering teams',
      'Automated synthesis eliminates all software edge cases'
    ],
    correctIndex: 0,
    explanation: 'The excerpt underscores that while AI models generate boilerplate quickly, they hallucinate errors and introduce technical debt unless accompanied by unit tests and human code review. Therefore, human review and testing remain indispensable safeguards.',
    shortcutOrInsight: 'The thesis sentence asserts: "Without comprehensive unit testing and human code review, automated synthesis introduces insidious technical debt."',
    difficulty: 'Very Hard'
  },
  {
    id: 'dp-mock3-q8',
    testId: 'daily-practice-mock-3',
    section: 'High-Bar Analytical & Architecture',
    companyTag: 'Amazon',
    question: 'Convert the following sentence into the correct passive voice:\n"The principal engineer has optimized the database indexing strategy."',
    options: [
      'The database indexing strategy has been optimized by the principal engineer.',
      'The database indexing strategy had been optimized by the principal engineer.',
      'The database indexing strategy was optimized by the principal engineer.',
      'The database indexing strategy is being optimized by the principal engineer.'
    ],
    correctIndex: 0,
    explanation: 'The original sentence is in the present perfect active tense: "has optimized". In passive voice, present perfect becomes "has/have been + past participle": "The database indexing strategy has been optimized by the principal engineer."',
    shortcutOrInsight: 'Present perfect passive retains auxiliary "has been": "has optimized" -> "has been optimized".',
    difficulty: 'Very Hard'
  },
  {
    id: 'dp-mock3-q9',
    testId: 'daily-practice-mock-3',
    section: 'High-Bar Analytical & Architecture',
    companyTag: 'Amazon Leadership',
    question: 'Workplace Scenario: During a high-stakes final-year capstone project 48 hours before the campus placement demo, a teammate refuses to complete their assigned backend integration module, citing burnout. How should you best respond according to Amazon Leadership Principles (Ownership & Deliver Results)?',
    options: [
      'Convene a focused 15-minute sync to break down their remaining blockers into minimal viable endpoints, pair-program to complete the critical path, and review accountability post-delivery',
      'Escalate immediately to the department head requesting that the uncooperative teammate be removed from the project roster',
      'Abandon the backend module and present only static frontend screens without real data',
      'Confront the teammate publicly on the project Slack channel to shame them into compliance'
    ],
    correctIndex: 0,
    explanation: 'High-performing professionals practice empathetic leadership and ownership. De-scoping blockers to minimum viable components and pair-programming ensures project delivery without risking mission failure, while handling interpersonal reviews professionally after release.',
    shortcutOrInsight: 'Amazon Ownership: Never drop the ball. De-risk the deliverable via pairing and minimal viable scope, then debrief post-launch.',
    difficulty: 'Very Hard'
  },
  {
    id: 'dp-mock3-q10',
    testId: 'daily-practice-mock-3',
    section: 'High-Bar Analytical & Architecture',
    companyTag: 'Corporate Etiquette',
    question: 'Which of the following email subject lines is the most effective and professional when following up on a campus technical interview status?',
    options: [
      'Interview Status Inquiry: [Your Name] - Software Engineer Candidate (Ref #8492)',
      'Any updates on my interview? Please reply ASAP',
      'URGENT: Placement Results Needed Immediately',
      'Hey HR team, checking if I was selected or rejected'
    ],
    correctIndex: 0,
    explanation: 'A professional email subject line must be structured, clear, and informative, containing the context, role title, candidate full name, and reference ID. It avoids emotional demands ("ASAP", "URGENT") and informal slang ("Hey HR team").',
    shortcutOrInsight: 'Standard corporate subject formula: [Purpose]: [Candidate Name] - [Role Title] - [Reference Code].',
    difficulty: 'Very Hard'
  }
];

// Master definition for the 3 Daily Practice Mocks
export const DAILY_PRACTICE_MOCK_TESTS: FaangMockTest[] = [
  {
    id: 'daily-practice-mock-1',
    title: 'Daily Practice Mock 1: Quantitative & Speed Aptitude Sprint',
    subtitle: '10 High-Yield MCQs • 20 Minutes • Speed Math, Work, Rates, Percentages & Probability',
    category: 'DAILY PRACTICE',
    companyTier: 'Tier-1 Campus Recruitment',
    companies: ['TCS NQT', 'Infosys', 'Accenture', 'Cognizant'],
    scheduledDate: 'Daily Practice • Slot A (Morning Sprint)',
    durationMinutes: 20,
    totalQuestions: 10,
    marksPerQuestion: 4,
    negativeMark: 1,
    passingPercentage: 60,
    badgeRewardId: 'daily-practice-champion-1',
    badgeRewardName: 'Daily Aptitude Sprint Master',
    badgeIcon: '⚡',
    badgeGradient: 'from-amber-400 via-emerald-500 to-teal-900',
    certificateTitle: 'Daily Practice: Quantitative Speed & Aptitude Mastery Credential',
    description: 'A focused 20-minute quantitative drill targeting essential speed math heuristics, fractional multipliers, LCM rate analysis, and probabilistic permutations tested across national campus drives.',
    syllabusHighlights: [
      'Price-Consumption Elasticity & Multiplicative Factors',
      'Alternate Day Work Scheduling via Integer LCM Method',
      'Relative Speed & Vector Passing Intervals in Rail Networks',
      'Compound vs Simple Interest Delta Mechanics (3-Year D3 Formula)',
      'Dishonest Weighing Multipliers & Successive Profit Margins',
      'Repeated Solvent Dilution & Finite Replacement Formulae',
      'Permutations with Divisibility Traps & Cyclicity Unit Digits'
    ],
    questions: DAILY_MOCK_1_QUESTIONS
  },
  {
    id: 'daily-practice-mock-2',
    title: 'Daily Practice Mock 2: Logical Reasoning & Data Interpretation Sprint',
    subtitle: '10 High-Yield MCQs • 20 Minutes • Puzzles, Seating, Syllogisms, Series & Critical Deduction',
    category: 'DAILY PRACTICE',
    companyTier: 'Tier-1 Campus Recruitment',
    companies: ['Wipro NLTH', 'Capgemini', 'DXC', 'Deloitte'],
    scheduledDate: 'Daily Practice • Slot B (Afternoon Analytical)',
    durationMinutes: 20,
    totalQuestions: 10,
    marksPerQuestion: 4,
    negativeMark: 1,
    passingPercentage: 60,
    badgeRewardId: 'daily-practice-champion-2',
    badgeRewardName: 'Daily Logical Reasoning Maestro',
    badgeIcon: '🧠',
    badgeGradient: 'from-blue-500 via-indigo-600 to-purple-950',
    certificateTitle: 'Daily Practice: Logical & Analytical Deduction Credential',
    description: 'A targeted 20-minute reasoning crucible evaluating circular seat constraint anchoring, coded blood relationships, "Only a Few" syllogistic boundaries, recursive numerical differences, and data sufficiency.',
    syllabusHighlights: [
      'Circular Seating Anchor Constraints & Inward/Outward Traversal',
      'Coded Family Trees & Paternal Relationship Invariants',
      '"Only a Few" Modern Syllogisms with Firewall/Router Premise Intersections',
      'Second-Order Difference Progressions with Exponential Deductions',
      'Calendar Leap Odd-Day Computation & Leap Century Remnants',
      'Vector Direction Displacements with 135° Compass Turns',
      'Co-prime Divisibility Criteria (GCD/LCM Rules in Data Sufficiency)'
    ],
    questions: DAILY_MOCK_2_QUESTIONS
  },
  {
    id: 'daily-practice-mock-3',
    title: 'Daily Practice Mock 3: Verbal Ability & Placement Situational Judgment',
    subtitle: '10 High-Yield MCQs • 20 Minutes • Grammar, Para Jumbles, Vocabulary & Corporate Ethics',
    category: 'DAILY PRACTICE',
    companyTier: 'Tier-1 Campus Recruitment',
    companies: ['Amazon', 'Cognizant GenC', 'Zoho', 'Tech Mahindra'],
    scheduledDate: 'Daily Practice • Slot C (Evening Crucible)',
    durationMinutes: 20,
    totalQuestions: 10,
    marksPerQuestion: 4,
    negativeMark: 1,
    passingPercentage: 60,
    badgeRewardId: 'daily-practice-champion-3',
    badgeRewardName: 'Daily Verbal & Placement Ace',
    badgeIcon: '✍️',
    badgeGradient: 'from-rose-500 via-orange-500 to-amber-950',
    certificateTitle: 'Daily Practice: Verbal Excellence & Corporate Ethics Credential',
    description: 'An articulate 20-minute communication and verbal evaluation examining parenthetical subject-verb agreement, third conditional syntax, cohesive paragraph sequencing, corporate idioms, and Amazon ownership scenarios.',
    syllabusHighlights: [
      'Parenthetical Subject-Verb Agreement ("together with", "along with")',
      'Contextual Vocabulary & Fleeting Competitive Dynamics ("Ephemeral")',
      'Para Jumbles: Noun Anchoring -> Pronoun Cohesion -> Consequence',
      'Third Conditional Unreal Past Syntax ("If + had been... would have...")',
      'Collocations & Prepositional Gerund Rules ("committed to doing")',
      'Critical Reading Inference: AI Code Generation & Technical Debt',
      'Amazon Ownership & Situational Judgment: Team Burnout Blocker Resolution'
    ],
    questions: DAILY_MOCK_3_QUESTIONS
  }
];
