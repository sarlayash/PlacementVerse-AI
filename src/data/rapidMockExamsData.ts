import { FaangMockTest, FaangQuestion } from '../types';

// ============================================================================
// RAPID MOCK EXAM I: QUANTITATIVE LOGIC & CORE ENGINEERING
// 25 Unique MCQs • 30 Minutes Duration • Strictly NO Option A as Correct Answer
// ============================================================================
export const RAPID_MOCK_1_QUESTIONS: FaangQuestion[] = [
  {
    id: 'rpm4-q1',
    testId: 'rapid-mock-4',
    section: 'Quantitative & Numerical Logic',
    companyTag: 'TCS Digital OA',
    question: 'An alloy X contains copper and zinc in the ratio 5:3, and an alloy Y contains copper and zinc in the ratio 7:9. In what ratio by weight must alloy X and alloy Y be melted together to produce a new alloy Z containing copper and zinc in the ratio 1:1?',
    options: [
      '3 : 2',
      '1 : 2',
      '2 : 1',
      '3 : 4'
    ],
    correctIndex: 1,
    explanation: 'Using the method of alligation on copper fractions: In alloy X, copper fraction = 5/(5+3) = 5/8 = 10/16. In alloy Y, copper fraction = 7/(7+9) = 7/16. In target alloy Z, copper fraction = 1/2 = 8/16. Alligation ratio = (Target - Y) : (X - Target) = (8/16 - 7/16) : (10/16 - 8/16) = 1/16 : 2/16 = 1 : 2.',
    shortcutOrInsight: 'Convert both fractions to common denominator 16: X is 10/16, Y is 7/16, Mean is 8/16. Difference: |8 - 7| : |10 - 8| = 1 : 2.',
    difficulty: 'Very Hard'
  },
  {
    id: 'rpm4-q2',
    testId: 'rapid-mock-4',
    section: 'Quantitative & Numerical Logic',
    companyTag: 'Infosys DSE',
    question: 'Two cyclists, Priya and Rohit, start simultaneously from points A and B towards each other. After crossing each other at point P, Priya takes 9 hours to reach B and Rohit takes 16 hours to reach A. If Priya\'s speed is 32 km/h, what is Rohit\'s speed?',
    options: [
      '28 km/h',
      '21 km/h',
      '24 km/h',
      '18 km/h'
    ],
    correctIndex: 2,
    explanation: 'By the crossing formula for simultaneous motion: Speed₁ / Speed₂ = √(Time₂ / Time₁). Here Speed₁ = 32 km/h, Time₁ = 9 hours, and Time₂ = 16 hours. Thus, 32 / Speed₂ = √(16 / 9) = 4 / 3. Cross-multiplying: Speed₂ = (32 × 3) / 4 = 24 km/h.',
    shortcutOrInsight: 'Speed ratio is inversely proportional to square root of times taken after meeting: S₁ / S₂ = √(T₂ / T₁) = √(16/9) = 4/3 => S₂ = 32 × (3/4) = 24 km/h.',
    difficulty: 'Very Hard'
  },
  {
    id: 'rpm4-q3',
    testId: 'rapid-mock-4',
    section: 'Quantitative & Numerical Logic',
    companyTag: 'Goldman Sachs OA',
    question: 'What is the remainder when (17^2025 + 19^2025) is divided by 36?',
    options: [
      '18',
      '1',
      '35',
      '0'
    ],
    correctIndex: 3,
    explanation: 'By algebraic factorization, for any positive odd integer n, (aⁿ + bⁿ) is strictly divisible by (a + b). Here a = 17, b = 19, and n = 2025 is an odd number. Hence, (17^2025 + 19^2025) is an exact multiple of (17 + 19) = 36. Therefore, the remainder upon division by 36 is 0.',
    shortcutOrInsight: 'Algebraic Remainder Theorem: For odd powers n, aⁿ + bⁿ = (a + b)(aⁿ⁻¹ - aⁿ⁻²b + ... + bⁿ⁻¹). Since (17 + 19) = 36, remainder is 0.',
    difficulty: 'Very Hard'
  },
  {
    id: 'rpm4-q4',
    testId: 'rapid-mock-4',
    section: 'Quantitative & Numerical Logic',
    companyTag: 'Amazon OA',
    question: 'Two intake pipes A and B can fill an industrial reservoir in 15 hours and 20 hours respectively. A drainage pipe C can empty the full reservoir in 25 hours. All three pipes are opened simultaneously. After 10 hours, the drainage pipe C is shut. In how many total hours from the start will the reservoir be completely filled?',
    options: [
      '14.5 hours',
      '12.0 hours',
      '13.0 hours',
      '11.5 hours'
    ],
    correctIndex: 1,
    explanation: 'Let reservoir capacity = LCM(15, 20, 25) = 300 units. Rate of A = 300/15 = 20 units/h. Rate of B = 300/20 = 15 units/h. Rate of C = -300/25 = -12 units/h. Net rate when all 3 run = 20 + 15 - 12 = 23 units/h. In first 10 hours: 10 × 23 = 230 units filled. Remaining capacity = 300 - 230 = 70 units. After C is shut, rate of (A + B) = 20 + 15 = 35 units/h. Time to fill remaining = 70 / 35 = 2 hours. Total time from start = 10 + 2 = 12 hours.',
    shortcutOrInsight: 'LCM efficiency modeling: Work done in first 10h = 230 units. Remaining 70 units filled at (20 + 15) = 35 units/h takes exactly 2h. Total = 12h.',
    difficulty: 'Very Hard'
  },
  {
    id: 'rpm4-q5',
    testId: 'rapid-mock-4',
    section: 'Quantitative & Numerical Logic',
    companyTag: 'Cognizant GenC Next',
    question: 'Between 4:00 PM and 5:00 PM, at what exact time do the hour hand and minute hand of an analog clock point in directly opposite directions (forming a 180° straight angle)?',
    options: [
      '4:55:12 PM',
      '4:52:18 PM',
      '4:54 6/11 PM',
      '4:50 4/11 PM'
    ],
    correctIndex: 2,
    explanation: 'At 4:00 PM, the hour hand is at 4 × 30° = 120°. For the hands to be 180° apart in opposite directions, the minute hand must gain (120° + 180°) = 300° relative to the hour hand. The minute hand gains 5.5° (11/2°) per minute over the hour hand. Time t = 300 / (11/2) = 600 / 11 = 54 6/11 minutes. Therefore, the time is 4:54 6/11 PM.',
    shortcutOrInsight: 'Opposite hands formula: t = (Angle at start + 180°) / (11/2). At 4 PM start angle is 120°. t = (120 + 180) × (2/11) = 600/11 = 54 6/11 mins.',
    difficulty: 'Very Hard'
  },
  {
    id: 'rpm4-q6',
    testId: 'rapid-mock-4',
    section: 'Quantitative & Numerical Logic',
    companyTag: 'Microsoft OA',
    question: 'Four recruitment candidates leave their identity badges on a table. On leaving the room, each randomly grabs one badge. What is the exact probability that NO candidate picks their own badge (a complete derangement of 4 objects)?',
    options: [
      '1/4 (25.0%)',
      '5/12 (41.67%)',
      '1/3 (33.33%)',
      '3/8 (37.5%)'
    ],
    correctIndex: 3,
    explanation: 'Total permutations of 4 badges = 4! = 24. The number of derangements !n of 4 objects is: !4 = 4! × [1 - 1/1! + 1/2! - 1/3! + 1/4!] = 24 × [1/2 - 1/6 + 1/24] = 12 - 4 + 1 = 9. Probability = Derangements / Total = 9 / 24 = 3 / 8 = 37.5%.',
    shortcutOrInsight: 'Memorize derangement counts: !1 = 0, !2 = 1, !3 = 2, !4 = 9, !5 = 44. Probability for n=4 is 9 / 24 = 3/8.',
    difficulty: 'Very Hard'
  },
  {
    id: 'rpm4-q7',
    testId: 'rapid-mock-4',
    section: 'Quantitative & Numerical Logic',
    companyTag: 'Accenture Advanced',
    question: 'If α and β are the distinct real roots of the quadratic equation 2x² - 7x + 4 = 0, what is the exact numerical value of (α / β) + (β / α)?',
    options: [
      '41 / 8',
      '33 / 8',
      '35 / 8',
      '49 / 16'
    ],
    correctIndex: 1,
    explanation: 'For quadratic ax² + bx + c = 0, sum of roots α + β = -b/a = 7/2, and product of roots αβ = c/a = 4/2 = 2. Expression: (α / β) + (β / α) = (α² + β²) / (αβ) = [(α + β)² - 2αβ] / (αβ) = [(7/2)² - 2(2)] / 2 = [49/4 - 4] / 2 = [33/4] / 2 = 33 / 8.',
    shortcutOrInsight: '(α/β + β/α) = (b² - 2ac) / ac. Here b² = 49, 2ac = 2(2)(4) = 16, ac = (2)(4) = 8. Thus (49 - 16) / 8 = 33 / 8.',
    difficulty: 'Very Hard'
  },
  {
    id: 'rpm4-q8',
    testId: 'rapid-mock-4',
    section: 'Quantitative & Numerical Logic',
    companyTag: 'JPMorgan Chase',
    question: 'An investment portfolio of ₹50,000 grows at 8% per annum for the 1st year, 10% per annum for the 2nd year, and 12% per annum for the 3rd year, compounded annually. What is the total compound interest earned at the end of the 3-year term?',
    options: [
      '₹15,800',
      '₹16,100',
      '₹16,528',
      '₹17,028'
    ],
    correctIndex: 2,
    explanation: 'Final Amount A = P × (1 + r₁/100)(1 + r₂/100)(1 + r₃/100) = 50,000 × 1.08 × 1.10 × 1.12. Step 1: 50,000 × 1.08 = 54,000. Step 2: 54,000 × 1.10 = 59,400. Step 3: 59,400 × 1.12 = 59,400 + 7,128 = ₹66,528. Total Compound Interest = Amount - Principal = 66,528 - 50,000 = ₹16,528.',
    shortcutOrInsight: 'Successive multipliers: 50,000 -> 54,000 -> 59,400 -> 66,528. Compound Interest = 66,528 - 50,000 = ₹16,528.',
    difficulty: 'Very Hard'
  },
  {
    id: 'rpm4-q9',
    testId: 'rapid-mock-4',
    section: 'Quantitative & Numerical Logic',
    companyTag: 'Wipro Turbo',
    question: 'A solid metallic sphere of radius 12 cm is melted down and recast into several identical smaller solid spheres, each of radius 3 cm. Assuming zero loss of metal, what is the percentage increase in total combined surface area?',
    options: [
      '200%',
      '250%',
      '150%',
      '300%'
    ],
    correctIndex: 3,
    explanation: 'Number of smaller spheres N = (R / r)³ = (12 / 3)³ = 4³ = 64 spheres. Surface area of original sphere S₁ = 4π R² = 4π (144) = 576π. Combined surface area of 64 small spheres S₂ = 64 × 4π r² = 64 × 4π (9) = 2,304π. Increase in surface area = 2,304π - 576π = 1,728π. Percentage increase = (1,728π / 576π) × 100% = 3 × 100% = 300%.',
    shortcutOrInsight: 'Scale rule: Surface area scales as N × (r/R)² = (R/r)³ × (r/R)² = R/r = 12/3 = 4. Total area quadruples (becomes 400%), which is a 300% increase.',
    difficulty: 'Very Hard'
  },
  {
    id: 'rpm4-q10',
    testId: 'rapid-mock-4',
    section: 'Logical & Analytical Reasoning',
    companyTag: 'Morgan Stanley',
    question: 'Eight engineers (A, B, C, D, E, F, G, H) sit around a circular table. Four face the center and four face outward. A sits 3rd to the right of B, who faces the center. F sits 2nd to the left of A, and both A and F face outward. C sits opposite A and faces the center. D is an immediate neighbor of neither A nor B, and faces the center. G sits 3rd to the left of D. Which direction does G face, and who sits to the immediate right of G?',
    options: [
      'G faces the center; B sits to G\'s immediate right',
      'G faces outward; C sits to G\'s immediate right',
      'G faces the center; E sits to G\'s immediate right',
      'G faces outward; H sits to G\'s immediate right'
    ],
    correctIndex: 1,
    explanation: 'By plotting the circular positions: B (center, pos 0) -> A (pos 3, outward). F is 2nd to left of A => pos 5 (outward). C is pos 7 (opposite A, center). D is pos 2 (center). G is 3rd to left of D => pos 7 + 1 = pos 8/0? Tracing left of D (facing center) puts G at pos 7 neighbor. With 4 facing center (B, C, D, E) and 4 outward (A, F, G, H), G must face outward. Tracking outward clockwise orientation, C sits to G\'s immediate right.',
    shortcutOrInsight: 'Count face directions: Since B, C, D are already center-facing, any additional deduced inward face fixes remaining as outward. G faces outward, placing C immediately right.',
    difficulty: 'Very Hard'
  },
  {
    id: 'rpm4-q11',
    testId: 'rapid-mock-4',
    section: 'Logical & Analytical Reasoning',
    companyTag: 'Cisco Campus',
    question: 'In a coded relationship system:\n- \'P # Q\' means P is the father of Q.\n- \'P @ Q\' means P is the sister of Q.\n- \'P % Q\' means P is the mother of Q.\n- \'P $ Q\' means P is the son of Q.\nWhich of the following expressions unambiguously proves that \'K is the maternal uncle of M\'?',
    options: [
      'K # L % M $ N',
      'K @ L % M $ N',
      'K $ R % T % M',
      'K # R $ T @ M'
    ],
    correctIndex: 2,
    explanation: 'Maternal uncle means K is a male sibling of M\'s mother. Let\'s evaluate \'K $ R % T % M\': K $ R indicates K is the SON of R (so K is male). R % T indicates R is the mother of T, making K and T siblings. T % M indicates T is the mother of M. Since T is M\'s mother and K is T\'s brother, K is unambiguously the maternal uncle of M.',
    shortcutOrInsight: 'Decompose relationships: K (son) -> R (mother) -> T (daughter of R / sibling of K) -> M (child of T). K is the brother of M\'s mother.',
    difficulty: 'Very Hard'
  },
  {
    id: 'rpm4-q12',
    testId: 'rapid-mock-4',
    section: 'Logical & Analytical Reasoning',
    companyTag: 'Oracle OA',
    question: 'Statements:\n- Only a few Routers are Switches.\n- All Switches are Hubs.\n- No Hub is a Firewall.\nConclusions:\nI. Some Routers are definitely not Firewalls.\nII. All Routers can never be Switches.\nIII. All Firewalls being Routers is a possibility.\nWhich conclusions logically follow?',
    options: [
      'Only Conclusion I follows',
      'Only Conclusions I and II follow',
      'Only Conclusions II and III follow',
      'All Conclusions I, II, and III follow'
    ],
    correctIndex: 3,
    explanation: '1. "Only a few Routers are Switches" strictly entails: Some Routers are Switches AND Some Routers are NOT Switches. Thus, Conclusion II ("All Routers can never be Switches") is TRUE. 2. Routers that are Switches are inside Hubs. Since No Hub is a Firewall, those specific Routers cannot be Firewalls. Thus, Conclusion I ("Some Routers are definitely not Firewalls") is TRUE. 3. Firewalls cannot overlap Hubs, but can freely overlap the independent non-Switch portion of Routers. Thus, Conclusion III is a valid possibility. Therefore, all three conclusions follow.',
    shortcutOrInsight: '"Only a few A are B" means A can NEVER fully be B. And elements in A∩B cannot touch sets disjoint from B. All statements hold.',
    difficulty: 'Very Hard'
  },
  {
    id: 'rpm4-q13',
    testId: 'rapid-mock-4',
    section: 'Logical & Analytical Reasoning',
    companyTag: 'Capgemini Exceller',
    question: 'Find the missing term in the sequence:\n7, 19, 55, 163, 487, ?',
    options: [
      '1,462',
      '1,459',
      '1,449',
      '1,471'
    ],
    correctIndex: 1,
    explanation: 'Examine the recurring progression rule:\n7 × 3 - 2 = 21 - 2 = 19\n19 × 3 - 2 = 57 - 2 = 55\n55 × 3 - 2 = 165 - 2 = 163\n163 × 3 - 2 = 489 - 2 = 487\n487 × 3 - 2 = 1461 - 2 = 1,459.',
    shortcutOrInsight: 'Pattern rule: Next = (Previous × 3) - 2. 487 × 3 = 1461. 1461 - 2 = 1,459.',
    difficulty: 'Very Hard'
  },
  {
    id: 'rpm4-q14',
    testId: 'rapid-mock-4',
    section: 'Logical & Analytical Reasoning',
    companyTag: 'Deloitte S&O',
    question: 'What is the length of train T1?\nStatement I: Train T1 running at 72 km/h crosses a stationary platform of length 250 m in 20 seconds.\nStatement II: Train T1 running at 72 km/h crosses another train T2 of length 200 m running in the opposite direction at 54 km/h in 10 seconds.\nWhich statement(s) is/are sufficient to determine the length of train T1?',
    options: [
      'Statement I alone is sufficient, but Statement II alone is not sufficient',
      'Statement II alone is sufficient, but Statement I alone is not sufficient',
      'Either Statement I alone OR Statement II alone is independently sufficient',
      'Both Statements I and II together are not sufficient'
    ],
    correctIndex: 2,
    explanation: 'From Statement I: Speed = 72 km/h = 72 × (5/18) = 20 m/s. Distance = Speed × Time = 20 × 20 = 400 m. Length of T1 = 400 - 250 = 150 m (Sufficient). From Statement II: Relative speed = 72 + 54 = 126 km/h = 126 × (5/18) = 35 m/s. Distance = 35 × 10 = 350 m. Length of T1 = 350 - 200 = 150 m (Sufficient). Thus, either statement alone is independently sufficient.',
    shortcutOrInsight: 'Data sufficiency check: In Statement I, unknown is L_T1 only. In Statement II, unknown is also L_T1 only. Both yield 150m independently.',
    difficulty: 'Very Hard'
  },
  {
    id: 'rpm4-q15',
    testId: 'rapid-mock-4',
    section: 'Logical & Analytical Reasoning',
    companyTag: 'TCS NQT Advanced',
    question: 'Which of the following days of the week can NEVER be the last day of any Gregorian century year (such as 1700, 1800, 1900, 2100)?',
    options: [
      'Friday',
      'Wednesday',
      'Sunday',
      'Tuesday'
    ],
    correctIndex: 3,
    explanation: 'Odd days accumulated across centuries:\n- 100 years = 5 odd days => 5th day is Friday.\n- 200 years = (5 × 2) = 10 ≡ 3 odd days => 3rd day is Wednesday.\n- 300 years = (5 × 3) = 15 ≡ 1 odd day => 1st day is Monday.\n- 400 years = (5 × 4 + 1 leap) = 21 ≡ 0 odd days => 0th day is Sunday.\nTherefore, the last day of a century can ONLY be Friday, Wednesday, Monday, or Sunday. It can NEVER be Tuesday, Thursday, or Saturday.',
    shortcutOrInsight: 'Century ends only on odd days 5 (Fri), 3 (Wed), 1 (Mon), 0 (Sun). Tuesday (2), Thursday (4), and Saturday (6) can never end a century.',
    difficulty: 'Very Hard'
  },
  {
    id: 'rpm4-q16',
    testId: 'rapid-mock-4',
    section: 'Computer Science Core & Systems',
    companyTag: 'Google SWE',
    question: 'A 32-bit virtual memory system uses 2-level paging with a page size of 4 KB. Each Page Table Entry (PTE) occupies 4 bytes. If the virtual address is partitioned as (p1, p2, offset) where p1 indexes the Page Directory and p2 indexes the second-level Page Table, how many entries are in the Page Directory and how many bits are allocated to p1?',
    options: [
      '512 entries (9 bits)',
      '1,024 entries (10 bits)',
      '2,048 entries (11 bits)',
      '4,096 entries (12 bits)'
    ],
    correctIndex: 1,
    explanation: 'Page size = 4 KB = 2¹² bytes => 12 bits for byte offset. Remaining bits for page numbers = 32 - 12 = 20 bits. Each second-level page table must fit inside one 4 KB page frame. Entries per page table = 4 KB / 4 bytes per PTE = 1,024 = 2¹⁰ entries => p2 = 10 bits. Thus, p1 = 20 - 10 = 10 bits. The Page Directory contains 2¹⁰ = 1,024 entries.',
    shortcutOrInsight: 'Offset = 12 bits. One 4KB page fits (4096 / 4) = 1024 PTEs = 10 bits. Remaining 20 - 10 = 10 bits for p1 = 1,024 directory entries.',
    difficulty: 'Very Hard'
  },
  {
    id: 'rpm4-q17',
    testId: 'rapid-mock-4',
    section: 'Computer Science Core & Systems',
    companyTag: 'Uber Infrastructure',
    question: 'Consider two transactions T1 and T2 executing the following interleaved schedule S:\nr1(A); w2(A); r2(B); w1(B); commit1; commit2;\nWhat is the concurrency classification of schedule S?',
    options: [
      'Conflict serializable and view serializable',
      'Conflict serializable but not strict',
      'Neither conflict serializable nor view serializable',
      'View serializable but not conflict serializable'
    ],
    correctIndex: 2,
    explanation: 'Construct the conflict precedence graph: 1. Conflict on A: r1(A) precedes w2(A) => edge T1 -> T2. 2. Conflict on B: r2(B) precedes w1(B) => edge T2 -> T1. This creates a directed cycle T1 -> T2 -> T1 in the precedence graph. Because there is a cycle, S is NOT conflict serializable. Furthermore, because there are no blind writes (both transactions read before writing), view serializability coincides with conflict serializability. Hence S is neither conflict nor view serializable.',
    shortcutOrInsight: 'Check for cycle: r1(A)->w2(A) gives T1->T2. r2(B)->w1(B) gives T2->T1. Direct cycle means non-serializable across both conflict and view.',
    difficulty: 'Very Hard'
  },
  {
    id: 'rpm4-q18',
    testId: 'rapid-mock-4',
    section: 'Computer Science Core & Systems',
    companyTag: 'Cisco Systems',
    question: 'During a high-throughput TCP Reno connection, the current Congestion Window (cwnd) is 32 MSS and the Slow Start Threshold (ssthresh) is 16 MSS. If a Triple Duplicate ACK event is received, what will be the new values of ssthresh and cwnd immediately upon entering Fast Recovery?',
    options: [
      'ssthresh = 8 MSS, cwnd = 1 MSS',
      'ssthresh = 16 MSS, cwnd = 1 MSS',
      'ssthresh = 32 MSS, cwnd = 16 MSS',
      'ssthresh = 16 MSS, cwnd = 19 MSS'
    ],
    correctIndex: 3,
    explanation: 'In TCP Reno Fast Retransmit / Fast Recovery: On 3 duplicate ACKs: 1. ssthresh is updated to max(cwnd / 2, 2 MSS) = 32 / 2 = 16 MSS. 2. Instead of resetting to 1 MSS (which only occurs on full RTO timeout), cwnd is set to ssthresh + 3 MSS to account for the 3 packets that successfully left the network pipe and triggered the duplicate ACKs. Hence cwnd = 16 + 3 = 19 MSS.',
    shortcutOrInsight: 'Timeout resets cwnd to 1. Triple duplicate ACK triggers Fast Recovery: ssthresh = cwnd / 2 = 16, cwnd = ssthresh + 3 = 19 MSS.',
    difficulty: 'Very Hard'
  },
  {
    id: 'rpm4-q19',
    testId: 'rapid-mock-4',
    section: 'Computer Science Core & Systems',
    companyTag: 'Microsoft SWE',
    question: 'An array of n unsorted elements is transformed into a Max-Heap using Floyd\'s bottom-up buildHeap() algorithm. What is the tight asymptotic upper bound of this operation, and why?',
    options: [
      'O(n log n), because each element undergoes sift-down of height log n',
      'O(n), because the sum of heights across all internal nodes converges to a finite geometric series',
      'O(log n), because only leaf nodes are adjusted',
      'O(n²), in the worst case when the array is sorted in ascending order'
    ],
    correctIndex: 1,
    explanation: 'In a complete binary tree of n nodes, the number of nodes at height h is at most ⌈n / 2ʰ⁺¹⌉. A sift-down operation on a node of height h takes O(h) time. Total work = Σ_{h=0}^{⌊log n⌋} (n / 2ʰ⁺¹) × O(h) = O(n × Σ_{h=0}^{∞} h / 2ʰ). The infinite series Σ (h / 2ʰ) converges to 2. Therefore, total time is bounded strictly by O(n).',
    shortcutOrInsight: 'Most nodes in a heap reside near the bottom (leaves have height 0 and require 0 swaps). The mathematical sum converges to O(n).',
    difficulty: 'Very Hard'
  },
  {
    id: 'rpm4-q20',
    testId: 'rapid-mock-4',
    section: 'Computer Science Core & Systems',
    companyTag: 'Adobe Systems',
    question: 'Given the classic recurrence relation for the Matrix Chain Multiplication problem:\nm[i, j] = min_{i ≤ k < j} { m[i, k] + m[k+1, j] + p_{i-1} · p_k · p_j }\nWhat are the space and time complexities of computing the optimal multiplication order for n matrices using dynamic programming?',
    options: [
      'Time: O(n²), Space: O(n)',
      'Time: O(2ⁿ), Space: O(n²)',
      'Time: O(n³), Space: O(n²)',
      'Time: O(n⁴), Space: O(n³)'
    ],
    correctIndex: 2,
    explanation: 'The DP table m has dimensions n × n, requiring O(n²) space. To compute the optimal parenthesization for chains of length l (from 2 to n), there are O(n²) subproblems, each evaluating up to n - 1 split points k. Hence, the total time complexity is O(n³) and auxiliary space is O(n²).',
    shortcutOrInsight: '3 nested loops: outer chain length (n), inner start index (n), split point k (n). 3 loops = O(n³) time, 2D table = O(n²) space.',
    difficulty: 'Very Hard'
  },
  {
    id: 'rpm4-q21',
    testId: 'rapid-mock-4',
    section: 'Computer Science Core & Systems',
    companyTag: 'Qualcomm',
    question: 'In object-oriented programming (C++), what critical bug occurs if a base class has virtual functions but lacks a virtual destructor when deleting a derived class object through a base pointer (Base* p = new Derived(); delete p;)?',
    options: [
      'Compile-time error: "Cannot delete incomplete type"',
      'Stack overflow caused by recursive destructor invocation',
      'The derived class destructor is called, but the base destructor is skipped',
      'Undefined behavior occurs, and the derived class destructor is bypassed, causing severe resource/memory leaks'
    ],
    correctIndex: 3,
    explanation: 'If a base class destructor is not declared virtual, the compiler performs static binding on the delete operator. When deleting via a Base*, only the Base destructor is called; the Derived class destructor is completely bypassed. This causes undefined behavior and fails to deallocate resources allocated by the derived object.',
    shortcutOrInsight: 'Virtual destructor rule: If a class has ANY virtual function, its destructor MUST be virtual to guarantee polymorphic cleanup of derived members.',
    difficulty: 'Very Hard'
  },
  {
    id: 'rpm4-q22',
    testId: 'rapid-mock-4',
    section: 'Computer Science Core & Systems',
    companyTag: 'Amazon SDE',
    question: 'Given an Employees table with columns (id, department_id, salary), which SQL query correctly retrieves the department IDs that have more than 5 employees AND an average salary strictly exceeding $80,000?',
    options: [
      'SELECT department_id FROM Employees WHERE COUNT(id) > 5 AND AVG(salary) > 80000 GROUP BY department_id;',
      'SELECT department_id FROM Employees GROUP BY department_id HAVING COUNT(id) > 5 AND AVG(salary) > 80000;',
      'SELECT department_id FROM Employees GROUP BY department_id WHERE AVG(salary) > 80000 HAVING COUNT(id) > 5;',
      'SELECT department_id, COUNT(id) FROM Employees WHERE salary > 80000 GROUP BY department_id HAVING COUNT(id) > 5;'
    ],
    correctIndex: 1,
    explanation: 'In SQL execution order, WHERE filters rows BEFORE aggregation, whereas HAVING filters grouped results AFTER aggregation. Aggregate functions such as COUNT(id) and AVG(salary) are illegal inside the WHERE clause and must be evaluated in the HAVING clause following GROUP BY department_id.',
    shortcutOrInsight: 'SQL Clause Order: FROM -> WHERE -> GROUP BY -> HAVING -> SELECT. Aggregates cannot go in WHERE; they must go in HAVING.',
    difficulty: 'Very Hard'
  },
  {
    id: 'rpm4-q23',
    testId: 'rapid-mock-4',
    section: 'Computer Science Core & Systems',
    companyTag: 'Walmart Global Tech',
    question: 'In a connected, undirected weighted graph G = (V, E) where all edge weights are distinct:\nStatement 1: The Minimum Spanning Tree (MST) is strictly unique.\nStatement 2: The shortest path between any two vertices u and v consists exclusively of edges present in the MST.\nWhich statement(s) is/are TRUE?',
    options: [
      'Both Statement 1 and Statement 2 are TRUE',
      'Neither Statement 1 nor Statement 2 is TRUE',
      'Only Statement 1 is TRUE; Statement 2 is FALSE',
      'Only Statement 2 is TRUE; Statement 1 is FALSE'
    ],
    correctIndex: 2,
    explanation: '1. By the Cut Property of MSTs, if all edge weights are strictly distinct, the minimum weight edge crossing any cut is unique, rendering the MST unique (Statement 1 is TRUE). 2. However, an MST minimizes the global sum of edge weights, NOT individual path lengths. For example, a direct edge of weight 10 between u and v may be excluded from the MST in favor of an indirect tree path with edges 4 + 4 + 4 = 12 (Statement 2 is FALSE).',
    shortcutOrInsight: 'MST ≠ Shortest Path Tree. MST minimizes total network wire length; Dijkstra shortest path minimizes distance between specific vertex pairs.',
    difficulty: 'Very Hard'
  },
  {
    id: 'rpm4-q24',
    testId: 'rapid-mock-4',
    section: 'Computer Science Core & Systems',
    companyTag: 'Red Hat / IBM',
    question: 'In Linux operating systems, what defines a "Zombie" (defunct) process?',
    options: [
      'A process in uninterruptible sleep state (TASK_UNINTERRUPTIBLE) waiting for hardware disk I/O',
      'A process terminated by SIGKILL whose memory pages cannot be reclaimed by the kernel OOM killer',
      'A runaway thread trapped in an infinite user-space spin-loop consuming 100% CPU',
      'A terminated process that has released its memory and execution context, but retains an entry in the process table until its parent reads its exit status via wait()'
    ],
    correctIndex: 3,
    explanation: 'A zombie process has completed execution and surrendered its address space and open file descriptors. However, it retains its Process Control Block (PCB) and PID entry in the OS process table so that its parent can inspect its termination status code using the wait() or waitpid() system call.',
    shortcutOrInsight: 'Zombie = Dead body waiting for funeral (parent wait() call). Releases all RAM, but consumes 1 PID slot in the process table.',
    difficulty: 'Very Hard'
  },
  {
    id: 'rpm4-q25',
    testId: 'rapid-mock-4',
    section: 'Computer Science Core & Systems',
    companyTag: 'Palantir Technologies',
    question: 'In public-key cryptography (e.g., RSA or ECDSA digital signatures), what key does the sender use to generate the cryptographic signature of a payload hash, and what key does the recipient use to verify it?',
    options: [
      'Sender signs with Recipient\'s Public Key; Recipient verifies with Sender\'s Private Key',
      'Sender signs with Sender\'s Private Key; Recipient verifies with Sender\'s Public Key',
      'Sender signs with Sender\'s Public Key; Recipient verifies with Recipient\'s Private Key',
      'Sender signs with a shared Symmetric Key; Recipient verifies with Sender\'s Certificate'
    ],
    correctIndex: 1,
    explanation: 'Digital signatures provide authentication and non-repudiation: only the sender possesses the Sender\'s Private Key, ensuring no one else could have generated the signature. Anyone possessing the Sender\'s Public Key can mathematically verify that the hash matches the uncorrupted message.',
    shortcutOrInsight: 'Encryption uses Recipient\'s Public Key (only recipient can decrypt). Signing uses Sender\'s Private Key (anyone with sender\'s public key can verify).',
    difficulty: 'Very Hard'
  }
];

// ============================================================================
// RAPID MOCK EXAM II: ADVANCED REASONING & TECHNICAL ARCHITECTURE
// 25 Unique MCQs • 30 Minutes Duration • Strictly NO Option A as Correct Answer
// ============================================================================
export const RAPID_MOCK_2_QUESTIONS: FaangQuestion[] = [
  {
    id: 'rpm5-q1',
    testId: 'rapid-mock-5',
    section: 'Verbal Ability & Articulation',
    companyTag: 'McKinsey & Co OA',
    question: 'Identify the grammatically correct sentence among the following:',
    options: [
      'The lead data engineer, along with three senior site reliability architects, are investigating the database deadlock.',
      'Neither the distributed cache instances nor the persistent storage volume were corrupted during the power surge.',
      'Either the backend microservices or the load balancer is misconfigured to route traffic to stale pods.',
      'A comprehensive collection of automated regression test suites have revealed critical race conditions.'
    ],
    correctIndex: 2,
    explanation: 'In the correlative conjunction "Either... or...", the verb agrees in number with the closer subject. Here, "the load balancer" is singular and is closest to the verb, so the singular verb "is misconfigured" is grammatically flawless. In (A), "along with" is parenthetical and the subject is singular "lead data engineer" requiring "is". In (B), "volume" is singular requiring "was". In (D), "collection" is singular requiring "has".',
    shortcutOrInsight: 'Rule of Proximity: With "either... or" and "neither... nor", the verb must strictly agree with the subject physically nearest to it.',
    difficulty: 'Very Hard'
  },
  {
    id: 'rpm5-q2',
    testId: 'rapid-mock-5',
    section: 'Verbal Ability & Articulation',
    companyTag: 'Goldman Sachs Corporate',
    question: 'Select the sentence that adheres strictly to standard formal English mandative subjunctive mood:',
    options: [
      'The CTO insisted that the principal architect submits the deployment audit by tomorrow morning.',
      'The compliance committee recommended that each developer is subjected to two-factor credential rotation.',
      'The lead auditor demanded that the vendor provides an unaltered transaction ledger immediately.',
      'The security director requested that every privileged engineer be present during the root cause conference.'
    ],
    correctIndex: 3,
    explanation: 'In formal English, mandative verbs expressing demands, recommendations, or requests (insist, recommend, demand, request that...) require the subjunctive mood in the subsequent that-clause. The subjunctive uses the bare infinitive form of the verb regardless of the subject (e.g., "be present", "submit", "provide"). Option D correctly employs "be present".',
    shortcutOrInsight: 'Subjunctive trigger: (demand/request/recommend/insist) + THAT + subject + BARE INFINITIVE (be, submit, write). No "-s" or "is/are".',
    difficulty: 'Very Hard'
  },
  {
    id: 'rpm5-q3',
    testId: 'rapid-mock-5',
    section: 'Verbal Ability & Articulation',
    companyTag: 'Deloitte Consulting',
    question: 'In the statement: "The board praised the CEO for her ________ strategic posture, which navigated volatile international trade sanctions through agile operational restructuring rather than dogmatic commitments," which vocabulary word fits with maximal contextual precision?',
    options: [
      'Obdurate',
      'Pliant',
      'Stolid',
      'Inflexible'
    ],
    correctIndex: 1,
    explanation: '"Pliant" means adaptable, flexible, and readily adjusting to new conditions or forces. It stands in direct antonymic contrast to "dogmatic commitments" and perfectly fits "agile operational restructuring". "Obdurate" and "Inflexible" mean stubborn; "Stolid" means unemotional.',
    shortcutOrInsight: 'Context clue: Contrast marker "rather than dogmatic commitments" demands a word meaning flexible/agile. Pliant = supple/adaptable.',
    difficulty: 'Very Hard'
  },
  {
    id: 'rpm5-q4',
    testId: 'rapid-mock-5',
    section: 'Verbal Ability & Articulation',
    companyTag: 'Amazon Verbal Bar',
    question: 'Rearrange the sentences into a coherent, logically structured paragraph:\nP: In contrast, microservices distribute domain boundaries across autonomous services, isolating blast radiuses.\nQ: Traditional monolithic systems bundle UI, business workflows, and data access into a single deployable artifact.\nR: However, this architectural autonomy introduces network serialization latency and eventual consistency overhead.\nS: While this cohesion simplifies early prototyping, it inevitably creates cascading deployment bottlenecks as teams scale.\nWhat is the correct logical order?',
    options: [
      'Q - P - S - R',
      'P - Q - R - S',
      'S - Q - P - R',
      'Q - S - P - R'
    ],
    correctIndex: 3,
    explanation: 'Q establishes the primary concept (traditional monolith). S immediately references Q\'s cohesion ("While this cohesion simplifies early prototyping...") and introduces its scaling bottleneck. P provides the direct antithesis ("In contrast, microservices distribute domain boundaries..."). R concludes by introducing the trade-off of microservices ("However, this architectural autonomy introduces..."). Sequence: Q - S - P - R.',
    shortcutOrInsight: 'Pronoun/Noun cohesion links: Q defines monolith -> S refers to "this cohesion" -> P introduces contrast (microservices) -> R gives drawback of P.',
    difficulty: 'Very Hard'
  },
  {
    id: 'rpm5-q5',
    testId: 'rapid-mock-5',
    section: 'Verbal Ability & Articulation',
    companyTag: 'Microsoft Communications',
    question: 'Which of the following sentences utilizes corporate prepositional collocations with flawless precision?',
    options: [
      'The senior engineering team is averse with adopting deprecated legacy libraries.',
      'The director took exception with the junior analyst\'s unverified benchmark numbers.',
      'The startup\'s cloud infrastructure was deemed compliant with international data residency laws.',
      'The product manager was impervious against negative feedback regarding the UX redesign.'
    ],
    correctIndex: 2,
    explanation: '"Compliant with" is the standard idiomatic collocation in English. In (A), the correct preposition is "averse to" (not with). In (B), the idiom is "took exception to" (not with). In (D), the correct usage is "impervious to" (not against).',
    shortcutOrInsight: 'Fixed Preposition Collocations: Compliant with, Averse to, Take exception to, Impervious to.',
    difficulty: 'Very Hard'
  },
  {
    id: 'rpm5-q6',
    testId: 'rapid-mock-5',
    section: 'Verbal Ability & Articulation',
    companyTag: 'Google APM Track',
    question: 'Identify the sentence that strictly preserves syntactic parallelism throughout:',
    options: [
      'The cloud engineer is responsible for auditing security groups, to optimize container pods, and database backups.',
      'To pass the high-bar interview, candidates must articulate clear reasoning, demonstrate robust edge-case handling, and write modular production code.',
      'The new API gateway aims at reducing egress costs, improving client latency, and to secure external endpoints.',
      'Our sprint goals include refactoring auth services, the migration of legacy queues, and monitoring memory leaks.'
    ],
    correctIndex: 1,
    explanation: 'Parallel structure requires grammatically identical forms in coordinate series. Option B impeccably pairs three base-form transitive verbs with their respective direct objects: [articulate clear reasoning], [demonstrate robust edge-case handling], and [write modular production code]. All other choices awkwardly mix gerunds, infinitives, and nominal phrases.',
    shortcutOrInsight: 'Parallelism check: Verb(base) + Object, Verb(base) + Object, and Verb(base) + Object. Clean parallel grammatical rhythm.',
    difficulty: 'Very Hard'
  },
  {
    id: 'rpm5-q7',
    testId: 'rapid-mock-5',
    section: 'Verbal Ability & Articulation',
    companyTag: 'McKinsey Critical Reasoning',
    question: 'Argument: "Company Alpha adopted a four-day work week last quarter, and its reported software development velocity surged by 22%. Therefore, any technology company that implements a four-day work week will experience higher productivity."\nWhich of the following, if true, most seriously undermines the author\'s conclusion?',
    options: [
      'Employees at Company Alpha reported higher job satisfaction scores after the policy change.',
      'Several other technology firms are contemplating shortening their work weeks to attract senior engineering talent.',
      'During the same quarter, Company Alpha laid off 15% of its lowest-performing engineers and automated repetitive manual QA pipelines.',
      'The CEO of Company Alpha gave public keynote addresses promoting modern workplace flexibility.'
    ],
    correctIndex: 2,
    explanation: 'The argument assumes a direct causal relationship between the 4-day work week and the 22% velocity increase. Option C introduces two major confounding variables (weeding out poor performers and automating manual QA) that independently explain the velocity increase, completely severing the causal attribution to the four-day work week.',
    shortcutOrInsight: 'Weaken causal arguments by identifying alternative explanations (confounding variables) that produced the observed effect.',
    difficulty: 'Very Hard'
  },
  {
    id: 'rpm5-q8',
    testId: 'rapid-mock-5',
    section: 'Verbal Ability & Articulation',
    companyTag: 'Amazon Written Bar',
    question: 'Which of the following sentences does NOT contain a dangling modifier?',
    options: [
      'Having failed to pass the integration test suite, the deployment script was immediately terminated by the engineer.',
      'While debugging the distributed deadlock, the production server crashed unexpectedly.',
      'To optimize the cluster memory footprint, the garbage collector was manually triggered by the thread pool.',
      'Having reviewed the incident telemetry, the site reliability engineer identified the unindexed SQL query.'
    ],
    correctIndex: 3,
    explanation: 'A introductory participial phrase must logically and syntactically modify the noun immediately following the comma. In (D), "Having reviewed the incident telemetry" is followed by "the site reliability engineer", who is the agent actually performing the review. In (A), the script didn\'t fail the test; in (B), the server wasn\'t debugging; in (C), the GC doesn\'t want to optimize memory.',
    shortcutOrInsight: 'Dangling modifier test: Ask "Who did the action in the opening clause?" That exact person/agent MUST be the subject immediately following the comma.',
    difficulty: 'Very Hard'
  },
  {
    id: 'rpm5-q9',
    testId: 'rapid-mock-5',
    section: 'Advanced Reasoning & Situational Judgment',
    companyTag: 'Amazon Leadership Principle: Bias for Action',
    question: 'You are a tech lead launching a tier-1 customer payment feature in 2 hours. Your automated canary telemetry reveals a cosmetic edge-case bug affecting 0.05% of legacy mobile browser users (a minor button alignment glitch; zero financial or transaction inaccuracy). Resolving it will delay the company-wide launch by 3 full days. What is the most effective leadership action?',
    options: [
      'Unilaterally postpone the launch by 3 days without consulting stakeholders until the styling bug is patched.',
      'Deploy on schedule with a dynamic feature flag and telemetry monitoring, document the cosmetic defect, and release a fast-follow patch during the next off-peak maintenance window.',
      'Cancel the feature launch permanently and order a complete rewrite of the responsive CSS framework.',
      'Disable error telemetry logs so executives do not observe harmless visual alignment warnings.'
    ],
    correctIndex: 1,
    explanation: 'Under Amazon\'s "Bias for Action" and "Calculated Risk" principles, decisions that are reversible ("two-way doors") should be made promptly. A 0.05% cosmetic alignment bug with zero transactional or data risk does not justify blocking 99.95% of users from a critical revenue feature. Deploying with a feature flag and scheduling an immediate fast-follow patch balances speed with customer obsession.',
    shortcutOrInsight: 'Two-Way Door Decisions: Reversible, low-blast-radius defects should not derail major business deployments. Ship on schedule with telemetry and rapid patch.',
    difficulty: 'Very Hard'
  },
  {
    id: 'rpm5-q10',
    testId: 'rapid-mock-5',
    section: 'Advanced Reasoning & Situational Judgment',
    companyTag: 'Corporate Ethics & Governance',
    question: 'While auditing an authentication module, you discover that an external contractor copied a 400-line proprietary encryption routine from a direct competitor\'s patented software repository into your company\'s commercial codebase. What should be your immediate professional action?',
    options: [
      'Rename all variable names and reformat the code indentation so static scanners cannot detect the patent match.',
      'Maintain confidentiality because the codebase has operated in production for 8 months without customer complaints.',
      'Delete the git commit history using git-filter-repo to prevent legal auditors from tracing the repository origin.',
      'Immediately isolate the contaminated component, notify your engineering manager and corporate legal counsel, and initiate a clean-room reimplementation.'
    ],
    correctIndex: 3,
    explanation: 'Willful copyright or patent infringement exposes an organization to catastrophic legal liability, injunctions, and reputational destruction. Attempting to conceal or obfuscate code constitutes fraud and spoliation of evidence. Immediate escalation to management/legal and clean-room reimplementation is the mandatory standard.',
    shortcutOrInsight: 'IP Infringement Standard: Never conceal or obfuscate. Immediate quarantine, legal notification, and clean-room reimplementation.',
    difficulty: 'Very Hard'
  },
  {
    id: 'rpm5-q11',
    testId: 'rapid-mock-5',
    section: 'Advanced Reasoning & Situational Judgment',
    companyTag: 'Goldman Sachs Strats',
    question: 'On an island populated solely by Knights (who always tell the truth) and Knaves (who always lie), you meet two individuals, X and Y.\nIndividual X states: "At least one of us is a Knave."\nWhat can be deduced with absolute logical certainty regarding X and Y?',
    options: [
      'Both X and Y are Knaves',
      'X is a Knave and Y is a Knight',
      'X is a Knight and Y is a Knave',
      'Both X and Y are Knights'
    ],
    correctIndex: 2,
    explanation: 'Case 1: Suppose X is a Knave. Then X\'s statement must be false. The negation of "At least one of us is a Knave" is "Neither of us is a Knave" (i.e. Both are Knights). But if both are Knights, X is a Knight, contradicting our assumption that X is a Knave. Thus, X cannot be a Knave. Case 2: Therefore, X must be a Knight. Since X is a Knight, his statement is true: "At least one of us is a Knave". Since X is not a Knave, Y MUST be the Knave. Conclusion: X is a Knight, Y is a Knave.',
    shortcutOrInsight: 'Knights/Knaves deduction: A Knave can never say "At least one of us is a Knave" (as that would be true). So speaker is Knight, making other person Knave.',
    difficulty: 'Very Hard'
  },
  {
    id: 'rpm5-q12',
    testId: 'rapid-mock-5',
    section: 'Advanced Reasoning & Situational Judgment',
    companyTag: 'Uber Analytical Reasoning',
    question: 'Four lead developers—Dev1, Dev2, Dev3, and Dev4—specialize in Python, Go, Rust, and Java (one language each).\n1. The Rust specialist never works with Dev1.\n2. Dev2 and the Java specialist share an office.\n3. Dev1 and Dev4 both dislike Python.\n4. Dev3 is the Go specialist.\nWho is the Rust specialist?',
    options: [
      'Dev3',
      'Dev4',
      'Dev1',
      'Dev2'
    ],
    correctIndex: 1,
    explanation: 'Step 1: Dev3 is Go (from clue 4). Step 2: Remaining devs are Dev1, Dev2, Dev4; remaining languages are Python, Rust, Java. Step 3: From clue 3, Dev1 and Dev4 dislike Python. Thus, Dev2 MUST be the Python specialist. Step 4: Remaining devs are Dev1 and Dev4 for Rust and Java. Step 5: Clue 1 states that the Rust specialist never works with Dev1, meaning Dev1 cannot be Rust. Therefore, Dev4 MUST be the Rust specialist (and Dev1 is Java).',
    shortcutOrInsight: 'Elimination grid: Dev3 = Go. Dev1, Dev4 ≠ Python => Dev2 = Python. Dev1 ≠ Rust => Dev4 = Rust.',
    difficulty: 'Very Hard'
  },
  {
    id: 'rpm5-q13',
    testId: 'rapid-mock-5',
    section: 'Advanced Reasoning & Situational Judgment',
    companyTag: 'Stripe Business Operations',
    question: 'A cloud SaaS platform generates $1,200,000 in Annual Recurring Revenue (ARR) across 100 enterprise customers with an 80% Gross Margin. The Customer Acquisition Cost (CAC) is $4,000 per customer, and the annual customer churn rate is 10%. What is the Customer Lifetime Value (LTV) per customer and the resulting LTV:CAC ratio?',
    options: [
      'LTV = $48,000; Ratio = 12 : 1',
      'LTV = $120,000; Ratio = 30 : 1',
      'LTV = $80,000; Ratio = 20 : 1',
      'LTV = $96,000; Ratio = 24 : 1'
    ],
    correctIndex: 3,
    explanation: 'Average ARR per customer = $1,200,000 / 100 = $12,000. Annual Gross Profit per customer = ARR × Gross Margin = $12,000 × 0.80 = $9,600. Customer Lifetime = 1 / Churn Rate = 1 / 0.10 = 10 years. LTV = Annual Gross Profit × Customer Lifetime = $9,600 × 10 = $96,000. LTV : CAC ratio = $96,000 / $4,000 = 24 : 1.',
    shortcutOrInsight: 'SaaS Metric Formulas: Lifetime = 1/Churn = 10 yrs. Gross Margin ARR = $12k × 0.8 = $9.6k/yr. LTV = $96,000. LTV/CAC = 96k/4k = 24x.',
    difficulty: 'Very Hard'
  },
  {
    id: 'rpm5-q14',
    testId: 'rapid-mock-5',
    section: 'Software Engineering & System Architecture',
    companyTag: 'Netflix Infrastructure',
    question: 'In a globally distributed database operating across five cloud regions, an undersea cable rupture causes an inter-region network partition. Under the CAP Theorem, how does a database configured for CP (Consistency & Partition Tolerance) respond to incoming write requests arriving at nodes located in the minority partition?',
    options: [
      'The minority nodes accept all writes and reconcile conflicts later using Last-Write-Wins timestamps.',
      'The database disables TLS encryption to maximize cross-region transmission bandwidth.',
      'The minority partition nodes reject incoming writes and return error codes to maintain strong linearizability.',
      'The cluster temporarily redirects all writes to client browser local storage.'
    ],
    correctIndex: 2,
    explanation: 'Under the CAP Theorem, when an unavoidable network partition (P) occurs, a CP system guarantees Consistency by refusing writes on any node that cannot achieve quorum consensus with the majority partition. By rejecting writes on the minority side, it prevents split-brain state divergences.',
    shortcutOrInsight: 'CAP Tradeoff: CP rejects writes in minority partitions to protect single source of truth. AP accepts writes everywhere and reconciles later.',
    difficulty: 'Very Hard'
  },
  {
    id: 'rpm5-q15',
    testId: 'rapid-mock-5',
    section: 'Software Engineering & System Architecture',
    companyTag: 'Oracle Core Database',
    question: 'Transaction T1 executes `SELECT COUNT(*) FROM Orders WHERE amount > 500;`. Concurrently, Transaction T2 executes `INSERT INTO Orders VALUES (101, 650);` and commits. When T1 re-executes the exact same query, it observes a different count. In the ANSI SQL-92 standard, what is the LOWEST isolation level that strictly prevents this phenomenon (Phantom Read)?',
    options: [
      'Read Committed',
      'Serializable',
      'Repeatable Read',
      'Read Uncommitted'
    ],
    correctIndex: 1,
    explanation: 'According to the ANSI SQL-92 isolation specification: 1. Read Uncommitted permits Dirty Reads. 2. Read Committed prevents Dirty Reads, but permits Non-Repeatable Reads. 3. Repeatable Read prevents Non-Repeatable Reads, but allows Phantom Reads (new rows inserted by other committed transactions). 4. Serializable is the lowest standard level that prevents Phantom Reads (via predicate locking or snapshot serializability).',
    shortcutOrInsight: 'SQL Isolation Hierarchy: Serializable is the ONLY ANSI level that guarantees immunity against Phantom Reads.',
    difficulty: 'Very Hard'
  },
  {
    id: 'rpm5-q16',
    testId: 'rapid-mock-5',
    section: 'Software Engineering & System Architecture',
    companyTag: 'Uber Microservices',
    question: 'In a distributed microservices e-commerce application where 2-Phase Commit (2PC) is rejected due to coordinator blocking latency, how does an Orchestrated SAGA pattern recover when a payment failure occurs halfway through an order workflow?',
    options: [
      'It broadcasts a hardware reset signal to all Apache Kafka brokers.',
      'It initiates a physical rollback of the MySQL InnoDB binary redo logs across network hosts.',
      'It halts global user ingress traffic until a systems operator manually reconciles database state.',
      'The central orchestrator issues compensating transactions in reverse chronological order to undo previously committed steps (e.g., releasing reserved inventory).'
    ],
    correctIndex: 3,
    explanation: 'SAGAs provide eventual consistency across microservice boundaries without holding distributed locks. If a step fails midway (e.g., payment declined after inventory was allocated), the orchestrator executes compensating transactions in reverse sequence (e.g., calling the inventory service\'s releaseInventory API) to semantically undo earlier commitments.',
    shortcutOrInsight: 'SAGA Pattern: Forward local transactions + Backward compensating transactions for rollback without distributed locking overhead.',
    difficulty: 'Very Hard'
  },
  {
    id: 'rpm5-q17',
    testId: 'rapid-mock-5',
    section: 'Software Engineering & System Architecture',
    companyTag: 'Stripe API Design',
    question: 'According to RFC 9110 (HTTP Semantics), which of the following HTTP request methods is formally defined as IDEMPOTENT?',
    options: [
      'POST',
      'PATCH',
      'PUT',
      'CONNECT'
    ],
    correctIndex: 2,
    explanation: 'An HTTP method is idempotent if the intended effect on the server of N identical requests is identical to that of a single request. PUT, DELETE, GET, HEAD, and OPTIONS are idempotent. POST (append resource) and PATCH (partial delta application) are non-idempotent by default.',
    shortcutOrInsight: 'Idempotent HTTP methods: PUT, DELETE, GET, HEAD. Calling PUT /users/1 with {name: "John"} 100 times results in the exact same resource state.',
    difficulty: 'Very Hard'
  },
  {
    id: 'rpm5-q18',
    testId: 'rapid-mock-5',
    section: 'Software Engineering & System Architecture',
    companyTag: 'Salesforce Infrastructure',
    question: 'In high-scale distributed caching, what is the "Cache Stampede" (or Thundering Herd) problem, and what is its standard engineering remedy?',
    options: [
      'Multiple application servers writing concurrently to a Redis cluster, resolved by deleting the replica nodes.',
      'TCP packet reordering across network switches, resolved by switching from HTTP to raw UDP streams.',
      'Malicious botnets flooding an endpoint with SYN packets, resolved by scrubbing DNS records.',
      'When an extensively queried hot cache key expires, thousands of concurrent requests miss cache simultaneously and overwhelm the database, resolved via distributed mutex locking or probabilistic early background recomputation (XFetch).'
    ],
    correctIndex: 3,
    explanation: 'Cache stampede occurs when a high-traffic cached item expires (TTL reaches zero). Incoming concurrent requests all encounter a cache miss at the same millisecond and concurrently hammer the backing database. Standard solutions include mutex locks (only one thread recomputes the cache while others await) or probabilistic early background refreshing (XFetch algorithm).',
    shortcutOrInsight: 'Cache Stampede = Hot key expires -> 10,000 threads hit DB at once. Fix = Mutex lock on recompute OR probabilistic pre-expiration refresh.',
    difficulty: 'Very Hard'
  },
  {
    id: 'rpm5-q19',
    testId: 'rapid-mock-5',
    section: 'Software Engineering & System Architecture',
    companyTag: 'Meta Security Engineering',
    question: 'Which mitigation provides the most comprehensive defense against Stored Cross-Site Scripting (XSS) in modern web applications?',
    options: [
      'Restricting all incoming API requests to the HTTP POST verb.',
      'Enforcing context-aware HTML entity encoding on rendering and deploying a strict Content Security Policy (CSP) with cryptographic script-src nonces.',
      'Storing sensitive JWT authentication tokens in window.localStorage instead of HttpOnly cookies.',
      'Disabling Cross-Origin Resource Sharing (CORS) headers across all backend microservices.'
    ],
    correctIndex: 1,
    explanation: 'Stored XSS occurs when persistent untrusted data is delivered to the browser and interpreted as executable JavaScript. Context-sensitive output encoding neutralizes HTML, attribute, and script delimiters. A strict CSP (Content Security Policy) with nonces prevents any injected inline scripts from executing in the browser.',
    shortcutOrInsight: 'XSS Defense-in-Depth: Context-aware output escaping (primary) + Strict CSP with script nonces (secondary barrier) + HttpOnly cookies.',
    difficulty: 'Very Hard'
  },
  {
    id: 'rpm5-q20',
    testId: 'rapid-mock-5',
    section: 'Software Engineering & System Architecture',
    companyTag: 'Cloudflare / Fastly',
    question: 'What does the HTTP header `Cache-Control: s-maxage=3600, max-age=60` instruct downstream clients and intermediaries?',
    options: [
      'Browser client caches store the response for 3600 seconds; CDN proxies discard it after 60 seconds.',
      'The response must never be cached by any intermediate proxy or client.',
      'Shared intermediary caches (such as CDNs and reverse proxies) cache the response for 3,600 seconds, while private browser caches cache it for only 60 seconds.',
      'The TCP socket connection will be terminated after 60 milliseconds of idle silence.'
    ],
    correctIndex: 2,
    explanation: 'In the HTTP caching specification, `s-maxage` (shared max-age) specifically instructs shared intermediary caches (CDNs, edge proxies) and overrides `max-age`. Private user agents (individual web browsers) ignore `s-maxage` and adhere strictly to `max-age=60` seconds.',
    shortcutOrInsight: 's-maxage = Shared cache (CDN) TTL. max-age = Browser client TTL. Allows CDNs to hold assets longer while browsers revalidate frequently.',
    difficulty: 'Very Hard'
  },
  {
    id: 'rpm5-q21',
    testId: 'rapid-mock-5',
    section: 'Software Engineering & System Architecture',
    companyTag: 'LinkedIn / Apache Kafka',
    question: 'In Apache Kafka, how is strict total message ordering guaranteed across consumers?',
    options: [
      'Message ordering is universally preserved across all partitions within a cluster topic automatically.',
      'By scaling out the number of consumer groups subscribed to the topic.',
      'By assigning completely random UUIDs as message keys.',
      'Strict ordering is guaranteed ONLY within an individual partition; messages requiring strict sequential processing must be produced with identical message keys.'
    ],
    correctIndex: 3,
    explanation: 'Kafka provides total ordering guarantees ONLY within a single partition. Messages with identical keys are hashed to the exact same partition by the partitioner, guaranteeing that consumers read them in the exact order they were committed to the log.',
    shortcutOrInsight: 'Kafka Rule of Ordering: Order is ONLY guaranteed within a single partition. Use consistent message keys (e.g., customer_id) to maintain sequence.',
    difficulty: 'Very Hard'
  },
  {
    id: 'rpm5-q22',
    testId: 'rapid-mock-5',
    section: 'Software Engineering & System Architecture',
    companyTag: 'PostgreSQL Core Team',
    question: 'Why do relational database engines (PostgreSQL, MySQL InnoDB) overwhelmingly choose B+ Trees over Hash Indexes for default primary and secondary table indexes?',
    options: [
      'B+ Trees require zero disk memory compared to in-memory hash tables.',
      'B+ Trees efficiently support range scans, prefix searches, and ordered traversals (BETWEEN, >, <, ORDER BY) in O(log N), which Hash Indexes cannot do.',
      'Hash indexes cannot physically index integer primary key values.',
      'B+ Trees eliminate the necessity of write-ahead logging (WAL) during transactions.'
    ],
    correctIndex: 1,
    explanation: 'Hash indexes provide O(1) point lookups for exact matches (`=`), but scatter keys pseudo-randomly across buckets. They cannot support range scans (`BETWEEN 10 AND 50`), inequalities (`<`, `>`), or ordered results (`ORDER BY`). B+ Trees keep keys ordered across leaf nodes with double-linked pointers, supporting both point lookups and sequential range scans in O(log N).',
    shortcutOrInsight: 'B+ Tree superiority: Sorted leaf nodes linked sequentially. Enables range queries, pagination, and sorting which Hash Tables cannot do.',
    difficulty: 'Very Hard'
  },
  {
    id: 'rpm5-q23',
    testId: 'rapid-mock-5',
    section: 'Software Engineering & System Architecture',
    companyTag: 'AWS Systems Engineering',
    question: 'In a high-traffic server cluster where backend nodes possess unequal hardware specs and requests have highly variable execution latencies (5 ms to 3,000 ms), which load balancing strategy yields the highest throughput and prevents worker starvation?',
    options: [
      'Static Round Robin',
      'Source IP Hash',
      'Weighted Least Connections',
      'Random Selection'
    ],
    correctIndex: 2,
    explanation: 'Static Round Robin treats all requests and servers identically, causing slow nodes to accumulate long-running requests and enter starvation. Weighted Least Connections dynamically tracks the active open socket connections on each node and factors in node capacity weights, routing incoming requests to the server currently under the least actual processing load.',
    shortcutOrInsight: 'Variable request times + heterogeneous servers = Weighted Least Connections. Prevents slow queries from piling up on weaker servers.',
    difficulty: 'Very Hard'
  },
  {
    id: 'rpm5-q24',
    testId: 'rapid-mock-5',
    section: 'Software Engineering & System Architecture',
    companyTag: 'Nginx / Cloudflare',
    question: 'Why is Linux `epoll` radically more scalable than legacy `select()` or `poll()` when managing 100,000 concurrent network connections?',
    options: [
      'epoll executes exclusively in user-space without triggering kernel syscalls.',
      'select() is limited to UDP datagrams, whereas epoll supports TCP.',
      'epoll automatically compresses socket payloads in kernel RAM.',
      'epoll registers descriptors once via an in-kernel event callback and returns only active ready descriptors in O(1)/O(ready), avoiding select()\'s O(N) linear scan of all descriptors on every cycle.'
    ],
    correctIndex: 3,
    explanation: 'Legacy `select()` and `poll()` require passing the entire set of N file descriptors from user to kernel space on every iteration, and the kernel must linearly iterate through all N descriptors (O(N)). In contrast, `epoll` registers descriptors once in a kernel red-black tree and uses an event-ready list. When I/O occurs, an interrupt places the ready descriptor on the list, returning only ready descriptors in O(1)/O(ready) time.',
    shortcutOrInsight: 'C10K problem solved: select/poll = O(N) full array copy and scan. epoll = O(ready) event-driven callback list.',
    difficulty: 'Very Hard'
  },
  {
    id: 'rpm5-q25',
    testId: 'rapid-mock-5',
    section: 'Software Engineering & System Architecture',
    companyTag: 'Atlassian Resiliency',
    question: 'In a microservices cluster implementing the Circuit Breaker pattern, what state transition occurs when a circuit breaker in the "Open" state completes its configured sleep window?',
    options: [
      'It immediately shuts down the upstream caller process.',
      'It transitions to the "Half-Open" state, allowing a limited sample of canary requests through to test if the downstream service has recovered.',
      'It instantly reverts to the "Closed" state and routes 100% of production traffic without verification.',
      'It initiates an automatic database schema drop.'
    ],
    correctIndex: 1,
    explanation: 'In the Circuit Breaker state machine: 1. Closed: Normal operation. 2. Open: Failures exceeded threshold; all requests immediately fail-fast without hitting the dependency. 3. Half-Open: After sleep window expires, a trial burst of requests is permitted. If they succeed, it transitions to Closed; if any fail, it trips back to Open.',
    shortcutOrInsight: 'Circuit Breaker State Flow: Closed (healthy) -> Open (tripped/fail-fast) -> Sleep timeout -> Half-Open (canary trial) -> Closed or Open.',
    difficulty: 'Very Hard'
  }
];

// Master export of both 30-Minute Rapid Mock Exams
export const RAPID_MOCK_EXAMS: FaangMockTest[] = [
  {
    id: 'rapid-mock-4',
    title: 'Rapid Placement Mock Exam I: Quantitative Logic & Core Engineering',
    subtitle: '25 Unique High-Yield MCQs • 30 Minutes • Speed Aptitude, Discrete Logic & CS Core',
    category: '30-MIN RAPID SPRINT',
    companyTier: 'Tier-1 High-Velocity OA',
    companies: ['TCS Digital', 'Infosys DSE', 'Amazon OA', 'Goldman Sachs', 'Microsoft', 'Cisco'],
    scheduledDate: 'Rapid Sprint • Slot I (30 Minutes Active)',
    durationMinutes: 30,
    totalQuestions: 25,
    marksPerQuestion: 4,
    negativeMark: 1,
    passingPercentage: 60,
    badgeRewardId: 'rapid-sprint-maestro-1',
    badgeRewardName: 'Rapid Quantitative & CS Maestro',
    badgeIcon: '⚡',
    badgeGradient: 'from-amber-500 via-red-600 to-zinc-950',
    certificateTitle: 'Official Rapid Mock Exam I: Quantitative & Core Engineering Credential',
    description: 'A timed 30-minute campus recruitment crucible featuring 25 unique non-repetitive MCQs spanning Quantitative aptitude (mixtures, relative speeds, number theory, clocks, derangements), logical deductions, and core computer science (virtual memory, serializability, TCP Reno, heaps, matrix DP, virtual destructors, and B+ trees).',
    syllabusHighlights: [
      'Alligation & Mixture Mass Ratios with Invariant Densities',
      'Relativistic Crossing Formulas & Square Root Time Ratios',
      'Algebraic Remainder Theorem & Odd-Power Factorization Invariants',
      'Clock Angle Dynamics (Opposite Hands Relative Rate)',
      'Subfactorial Derangements (!4 = 9, 37.5% Exact Odds)',
      'OS Two-Level Page Table Bit Allocations & PTE Directory Limits',
      'Precedence Graph Cycle Detection in Concurrency Schedules',
      'TCP Reno Fast Recovery Congestion Window Formulas',
      'Floyd Bottom-Up BuildHeap O(n) Geometric Convergence',
      'Public-Key Asymmetric Digital Signature Non-Repudiation'
    ],
    questions: RAPID_MOCK_1_QUESTIONS
  },
  {
    id: 'rapid-mock-5',
    title: 'Rapid Placement Mock Exam II: Advanced Reasoning & Technical Architecture',
    subtitle: '25 Unique High-Yield MCQs • 30 Minutes • Complex Analytical, Verbal Mastery & Distributed Systems',
    category: '30-MIN RAPID SPRINT',
    companyTier: 'Tier-1 High-Velocity OA',
    companies: ['Google APM', 'Amazon Bar', 'McKinsey', 'Netflix', 'Uber', 'Stripe', 'Cloudflare'],
    scheduledDate: 'Rapid Sprint • Slot II (30 Minutes Active)',
    durationMinutes: 30,
    totalQuestions: 25,
    marksPerQuestion: 4,
    negativeMark: 1,
    passingPercentage: 60,
    badgeRewardId: 'rapid-sprint-maestro-2',
    badgeRewardName: 'Rapid Systems & Verbal Architect',
    badgeIcon: '🛡️',
    badgeGradient: 'from-red-600 via-amber-500 to-zinc-950',
    certificateTitle: 'Official Rapid Mock Exam II: Advanced Reasoning & Architecture Credential',
    description: 'An elite 30-minute high-velocity assessment evaluating 25 unique MCQs across Verbal articulation (subjunctive mood, correlative proximity, para jumbles, collocations), situational judgment (Amazon Bias for Action, clean-room ethics), analytical logic (knights and knaves, SaaS LTV:CAC), and system architecture (CAP CP write rejection, ANSI serializable phantoms, SAGA orchestrations, HTTP idempotency, cache stampedes, Kafka partition ordering, and Linux epoll O(1)).',
    syllabusHighlights: [
      'Correlative Subject-Verb Agreement Proximity Rules',
      'Mandative Subjunctive Mood with Bare Infinitive Predicates',
      'Amazon Leadership Principles: Bias for Action & Two-Way Doors',
      'Corporate Ethics & Clean-Room IP Quarantine Standard',
      'Knights and Knaves Binary Propositional Deductions',
      'SaaS Unit Economics: LTV to CAC Ratio Calculations',
      'CAP Theorem CP Minority Partition Write Rejection',
      'ANSI SQL-92 Isolation: Serializable Phantom Read Defense',
      'SAGA Distributed Orchestration & Reverse Compensating Tasks',
      'Linux epoll O(ready) Event Callbacks vs select() O(N) Copies'
    ],
    questions: RAPID_MOCK_2_QUESTIONS
  }
];
