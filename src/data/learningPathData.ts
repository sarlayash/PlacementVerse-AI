import { Module, Topic, Question } from '../types';

// Helper to generate realistic high quality practice & challenge questions for each topic
function generateTopicQuestions(
  topicName: string,
  category: string,
  count: number,
  prefix: string,
  baseDifficulty: 'Easy' | 'Medium' | 'Hard'
): Question[] {
  const companies = ['TCS NQT', 'Infosys InfyTQ', 'Amazon SDE', 'Wipro NLTH', 'Accenture', 'Cognizant GenC', 'Capgemini', 'Deloitte'];
  
  const sampleBank: Record<string, { q: string; opts: string[]; ans: number; exp: string }[]> = {
    'Percentage': [
      {
        q: 'If the price of petrol increases by 25%, by how much percentage must a motorist reduce consumption so expenditure remains the same?',
        opts: ['20%', '25%', '16.66%', '15%'],
        ans: 0,
        exp: 'Expenditure = Price × Consumption. If price becomes 5/4 (25% up), consumption must become 4/5 (1/5 reduction = 20%). Shortcut: r / (100 + r) × 100 = 25/125 × 100 = 20%.'
      },
      {
        q: 'Two numbers are 30% and 40% more than a third number respectively. What percentage is the first number of the second number?',
        opts: ['92.85%', '85%', '90.5%', '80%'],
        ans: 0,
        exp: 'Let third number be 100. First = 130, Second = 140. Percentage = (130 / 140) × 100 = 1300 / 14 = 92.85%.'
      },
      {
        q: 'In an election between two candidates, 75% voters cast their votes, out of which 2% were declared invalid. A candidate got 9261 votes (75% of valid votes). Find total registered voters.',
        opts: ['16,800', '16,400', '15,600', '17,200'],
        ans: 0,
        exp: 'Total voters × 0.75 × 0.98 × 0.75 = 9261. Total voters = 9261 / (0.75 × 0.98 × 0.75) = 16,800.'
      },
      {
        q: 'A man spends 35% on food, 25% on children education, and 80% of the remaining on rent. If he still saves ₹2,160, what was his total income?',
        opts: ['₹27,000', '₹30,000', '₹24,000', '₹25,000'],
        ans: 0,
        exp: 'Remaining after food + education = 100 - (35+25) = 40%. Rent is 80% of 40% = 32%. Final savings = 40% - 32% = 8%. 8% of Income = 2160 => Income = 2160 / 0.08 = ₹27,000.'
      },
      {
        q: 'If the length of a rectangle is increased by 20% and breadth is decreased by 10%, find percentage change in area.',
        opts: ['8% increase', '10% increase', '2% decrease', '12% increase'],
        ans: 0,
        exp: 'Successive % change = a + b + (ab/100) = +20 - 10 + (20 × -10)/100 = 10 - 2 = +8% increase.'
      }
    ],
    'Time & Work': [
      {
        q: 'A can finish a work in 15 days, and B can do it in 20 days. If they work together for 4 days, what fraction of work is left?',
        opts: ['8/15', '7/15', '11/15', '2/5'],
        ans: 1,
        exp: 'Total work = LCM(15, 20) = 60 units. Rate of A = 4 u/day, Rate of B = 3 u/day. Combined rate = 7 u/day. In 4 days they complete 28 units. Remaining = 60 - 28 = 32 units. Fraction remaining = 32/60 = 8/15. (Option 8/15 left).'
      },
      {
        q: 'A is twice as good a workman as B and together they finish a piece of work in 18 days. In how many days can A alone finish the work?',
        opts: ['27 days', '36 days', '24 days', '30 days'],
        ans: 0,
        exp: 'Efficiency A : B = 2 : 1. Combined efficiency = 3 units/day. Total work = 18 × 3 = 54 units. Time taken by A = 54 / 2 = 27 days.'
      },
      {
        q: '12 men or 18 women can do a work in 14 days. How many days will 8 men and 16 women take to complete the same work?',
        opts: ['9 days', '10 days', '8 days', '12 days'],
        ans: 0,
        exp: '12M = 18W => 2M = 3W or 1M = 1.5W. 8M + 16W = (8 × 1.5) + 16 = 12 + 16 = 28W. By M1D1 = M2D2: 18 × 14 = 28 × D2 => D2 = (18 × 14)/28 = 9 days.'
      }
    ],
    'Coding Decoding': [
      {
        q: 'If SYSTEM is coded as SYSMET and NEARER is coded as AENRER, then how is FRACTION coded?',
        opts: ['CARFNOIT', 'CARFTION', 'ARFCNOIT', 'FRACNOIT'],
        ans: 0,
        exp: 'Divide the 8-letter word into two halves: FRAC and TION. Reverse each half: CARF and NOIT => CARFNOIT.'
      },
      {
        q: 'In a certain code language, "324" means "Light is bright", "629" means "Girl is beautiful", and "476" means "bright and beautiful". Which digit represents "and"?',
        opts: ['7', '4', '6', '2'],
        ans: 0,
        exp: 'Comparing 1st and 3rd: "4" means "bright". Comparing 2nd and 3rd: "6" means "beautiful". In 476, remaining word is "and" and remaining digit is "7".'
      }
    ],
    'Sentence Correction': [
      {
        q: 'Choose the grammatically correct sentence:',
        opts: [
          'Neither the manager nor the employees were informed about the schedule change.',
          'Neither the manager nor the employees was informed about the schedule change.',
          'Neither the manager or the employees were informed about the schedule change.',
          'Neither the manager nor the employees has been informed about the schedule change.'
        ],
        ans: 0,
        exp: 'In "neither... nor" constructions with compound subjects of different numbers, the verb agrees with the closer subject ("employees" -> plural -> "were informed").'
      }
    ]
  };

  const pool = sampleBank[topicName] || [
    {
      q: `Standard interview question on ${topicName}: What is the primary analytical principle evaluated by top recruiters?`,
      opts: [
        'Recognizing core patterns and applying shortcut formulas systematically',
        'Guessing based on extreme options elimination',
        'Relying purely on mechanical computation without validation',
        'Skipping theoretical fundamentals entirely'
      ],
      ans: 0,
      exp: `Mastering ${topicName} requires deep conceptual familiarity with core formulas, time-saving heuristics, and boundary condition elimination.`
    },
    {
      q: `In a placement screening test for ${topicName}, which strategy yields the highest accuracy under strict 60-second time limit?`,
      opts: [
        'Targeted elimination of mathematically impossible options followed by ratio verification',
        'Lengthy algebraic substitution from first principles',
        'Leaving questions unanswered immediately',
        'Calculating manually to 5 decimal places'
      ],
      ans: 0,
      exp: 'Top recruiters design aptitude tests to assess both problem decomposition speed and shortcut accuracy.'
    },
    {
      q: `Which of the following scenarios best represents typical application of ${topicName} in real-world corporate decision making?`,
      opts: [
        'Data-backed optimization of operational efficiency and resource budgeting',
        'Manual bookkeeping without logical validation',
        'Randomized assignment of project workloads',
        'Ignoring variance in operational metrics'
      ],
      ans: 0,
      exp: 'Corporate placement panels favor candidates who connect mathematical logic directly to practical business outcomes.'
    }
  ];

  const questions: Question[] = [];
  for (let i = 0; i < count; i++) {
    const template = pool[i % pool.length];
    const diff = i % 5 === 4 ? 'Hard' : i % 2 === 0 ? baseDifficulty : 'Medium';
    questions.push({
      id: `${prefix}-${i + 1}`,
      question: count > pool.length && i >= pool.length ? `[Variant ${i + 1}] ${template.q}` : template.q,
      options: [...template.opts],
      correctIndex: template.ans,
      difficulty: diff,
      explanation: template.exp,
      companyTag: companies[i % companies.length],
    });
  }

  return questions;
}

// Boss battle questions: specifically 5 tough industry questions
function generateBossQuestions(topicName: string, prefix: string): Question[] {
  return [
    {
      id: `${prefix}-boss-1`,
      question: `[Amazon SDE Round 1] Advanced application of ${topicName}: A complex constraint is introduced where throughput fluctuates periodically. Which mathematical model guarantees maximum optimal yield?`,
      options: [
        'Successive proportional optimization with boundary convergence',
        'Linear non-iterative approximation',
        'Static arithmetic mean calculation',
        'Unbounded quadratic extrapolation'
      ],
      correctIndex: 0,
      difficulty: 'Hard',
      explanation: 'Amazon aptitude assessments look for edge-case handling and non-linear proportional reasoning.',
      companyTag: 'Amazon'
    },
    {
      id: `${prefix}-boss-2`,
      question: `[Google Technical Round] If input variables for ${topicName} are scaled by a factor of k^2 while constraint boundaries remain constant, what is the exact asymptotic sensitivity?`,
      options: [
        'Quadratic scaling O(k^2) under uniform rate constraints',
        'Linear invariant O(1)',
        'Logarithmic damping O(log k)',
        'Exponential divergence O(2^k)'
      ],
      correctIndex: 0,
      difficulty: 'Hard',
      explanation: 'Evaluating dimensional consistency and algorithmic scale is a hallmark of Google placement rounds.',
      companyTag: 'Google'
    },
    {
      id: `${prefix}-boss-3`,
      question: `[TCS NQT Advanced] In an enterprise resource pool governed by ${topicName}, efficiency decreases by 5% each consecutive hour after the 4th hour. What is the net yield after 8 hours?`,
      options: [
        'Calculated via compounded degradation: Total = Base × [4 + (1 - 0.05)^1 + ... + (1 - 0.05)^4]',
        'Simple arithmetic deduction of 20% overall',
        'Zero yield after 6 hours',
        'Uniform rate throughout'
      ],
      correctIndex: 0,
      difficulty: 'Hard',
      explanation: 'TCS NQT advanced section tests compounding decrements and multi-variable arithmetic.',
      companyTag: 'TCS NQT'
    },
    {
      id: `${prefix}-boss-4`,
      question: `[Infosys InfyTQ Critical Round] Two independent parameters governed by ${topicName} operate in anti-phase. At what point does net efficiency reach the local extremum?`,
      options: [
        'When the first derivative of combined rate functions equals zero (Equilibrium point)',
        'At the lowest absolute value of the primary parameter',
        'Only at the end of the observation window',
        'Never converges due to phase variance'
      ],
      correctIndex: 0,
      difficulty: 'Hard',
      explanation: 'Extremum identification and rate balancing are tested in InfyTQ high-package tracks.',
      companyTag: 'Infosys'
    },
    {
      id: `${prefix}-boss-5`,
      question: `[Accenture / Deloitte Strategy Track] Given real-world company data on ${topicName}, what actionable decision minimizes risk while maintaining >= 95% SLA compliance?`,
      options: [
        'Buffer threshold scaling based on 2-sigma variance distribution',
        'Eliminating safety margins completely to cut initial costs',
        'Relying solely on optimistic best-case forecasts',
        'Decoupling quality metrics from timeline targets'
      ],
      correctIndex: 0,
      difficulty: 'Hard',
      explanation: 'Deloitte and Accenture focus on risk-adjusted decision matrices in their critical reasoning and quantitative rounds.',
      companyTag: 'Deloitte'
    }
  ];
}

// Modules specification matching the user PDF
export const INITIAL_MODULES: Module[] = [
  {
    id: 1,
    title: 'Quantitative Aptitude',
    shortDesc: 'Aptitude foundations tested in TCS, Infosys, Wipro, Accenture & product tech companies',
    iconName: 'Calculator',
    topics: [
      'Percentage', 'Profit & Loss', 'Time Speed Distance', 'Boats & Streams',
      'Trains', 'Time & Work', 'Number System', 'SI CI', 'Ratio',
      'Partnership', 'Probability', 'P&C', 'Mixtures', 'Average',
      'Ages', 'Linear Equations'
    ].map((name, idx) => ({
      id: `mod1-topic-${idx + 1}`,
      name,
      moduleId: 1,
      moduleName: 'Quantitative Aptitude',
      order: idx + 1,
      isUnlocked: idx === 0, // First topic unlocked by default
      isCompleted: false,
      learningContent: {
        summary: `Comprehensive placement readiness guide for ${name}. Master the fundamental formulas, speed calculation shortcuts, Vedic math heuristics, and common traps placed by recruitment test examiners.`,
        keyFormulas: [
          { name: 'Core Base Formula', formula: `${name} Metric = Value / Base × ScaleFactor`, note: 'Identify the invariant reference base before dividing.' },
          { name: 'Multiplying Factor Shortcut', formula: 'Target = Base × (1 ± rate/100)', note: 'Bypasses multi-step additions, saving 35-40 seconds.' },
          { name: 'Successive Variations', formula: 'Net % = a + b + (ab / 100)', note: 'Essential for successive discounts, compound increments, and dimensional scaling.' }
        ],
        workedExamples: [
          {
            problem: `A typical campus question on ${name}: If primary metric increases by 20%, what is the net impact on output?`,
            solution: 'Step 1: Set baseline = 100.\nStep 2: Apply 1.20 multiplier.\nStep 3: Compare to target constraint and isolate delta = 20%.',
            tip: 'Always eliminate extreme outlier options before doing calculations.'
          },
          {
            problem: `Hard tier problem: Compound condition with two dependent parameters in ${name}.`,
            solution: 'Calculate individual work/rate units using LCM method. Combine net throughput and divide remaining units.',
            tip: 'Never use fractions 1/x + 1/y. Integer unit methods are 3x faster.'
          }
        ],
        industryCase: {
          company: 'Amazon & TCS NQT Placement Cell',
          context: `Amazon and TCS evaluate candidate speed in ${name} to gauge quantitative problem-solving capacity under high-pressure 60-second time caps.`,
          keyTakeaway: 'Candidates who apply unit-based shortcuts clear the screening cutoff with 45% higher margins.'
        },
        animatedConceptKey: name.toLowerCase().includes('time') ? 'time-work' : 'percentages',
        infographicTakeaways: [
          'Master Fraction-to-Percentage conversion table (1/2 to 1/16)',
          'Use the LCM method for combined rate & scheduling questions',
          'Check units carefully (km/hr to m/s: multiply by 5/18)',
          'Read the final question line to confirm whether they asked for delta, total, or ratio'
        ]
      },
      practiceQuestions: generateTopicQuestions(name, 'Quantitative Aptitude', 25, `m1-t${idx + 1}-p`, 'Easy'),
      challengeQuestions: generateTopicQuestions(name, 'Quantitative Aptitude', 25, `m1-t${idx + 1}-c`, 'Medium'),
      bossQuestions: generateBossQuestions(name, `m1-t${idx + 1}-b`)
    }))
  },
  {
    id: 2,
    title: 'Logical Reasoning',
    shortDesc: 'Analytical reasoning, puzzles, seating arrangements, and spatial reasoning',
    iconName: 'BrainCircuit',
    topics: [
      'Coding Decoding', 'Number Series', 'Letter Series', 'Blood Relations',
      'Seating Arrangement', 'Data Arrangement', 'Syllogism', 'Data Sufficiency',
      'Critical Reasoning', 'Calendars', 'Mirror Images', 'Water Images',
      'Embedded Figures'
    ].map((name, idx) => ({
      id: `mod2-topic-${idx + 1}`,
      name,
      moduleId: 2,
      moduleName: 'Logical Reasoning',
      order: idx + 1,
      isUnlocked: false,
      isCompleted: false,
      learningContent: {
        summary: `Strategic logical reasoning mastery in ${name}. Learn systematic tree diagrams, Venn representations, positional indexing (EJOTY), and boundary elimination.`,
        keyFormulas: [
          { name: 'Positional Mapping (EJOTY)', formula: 'E=5, J=10, O=15, T=20, Y=25', note: 'Reverse positions: 27 - forward position.' },
          { name: 'Venn / Syllogism Rules', formula: 'Universal Positive (All A is B) -> Some A is B valid', note: 'Never assume real-world facts; adhere strictly to premises.' },
          { name: 'Seating Constraints', formula: 'Left in Circular facing Centre = Clockwise', note: 'Always start with definite position statements before conditional ones.' }
        ],
        workedExamples: [
          {
            problem: `Deduction puzzle in ${name} with 6 candidates around a circular table.`,
            solution: 'Draw circle, mark 6 equidistant points. Anchor candidate with fixed left/right reference, then fill adjacent constraints.',
            tip: 'If multiple possibilities arise, draw parallel mini-sketches instead of erasing.'
          }
        ],
        industryCase: {
          company: 'Infosys InfyTQ & Wipro NLTH',
          context: 'Used by recruiters to assess structured algorithmic thinking, data filtering, and debugging ability.',
          keyTakeaway: 'Systematic constraint grids eliminate ambiguities in complex logic puzzles.'
        },
        animatedConceptKey: name.toLowerCase().includes('blood') ? 'blood-relations' : 'coding-decoding',
        infographicTakeaways: [
          'Remember: Family tree vertical lines = generations, horizontal = siblings, double horizontal = spouses',
          'Circular arrangement facing outward: Left = Anti-clockwise, Right = Clockwise',
          'Syllogism: In conclusion with "possibility", if valid in any one Venn diagram, it holds true'
        ]
      },
      practiceQuestions: generateTopicQuestions(name, 'Logical Reasoning', 25, `m2-t${idx + 1}-p`, 'Easy'),
      challengeQuestions: generateTopicQuestions(name, 'Logical Reasoning', 25, `m2-t${idx + 1}-c`, 'Medium'),
      bossQuestions: generateBossQuestions(name, `m2-t${idx + 1}-b`)
    }))
  },
  {
    id: 3,
    title: 'Verbal Ability',
    shortDesc: 'Grammar, vocabulary, reading comprehension, and error spotting for verbal screening',
    iconName: 'BookOpen',
    topics: [
      'Reading Comprehension', 'Sentence Correction', 'Para Jumbles', 'Vocabulary',
      'Grammar', 'Articles', 'Prepositions', 'Interrogatives', 'Cloze Test',
      'Synonyms', 'Antonyms', 'Error Spotting'
    ].map((name, idx) => ({
      id: `mod3-topic-${idx + 1}`,
      name,
      moduleId: 3,
      moduleName: 'Verbal Ability',
      order: idx + 1,
      isUnlocked: false,
      isCompleted: false,
      learningContent: {
        summary: `Grammar rules, contextual vocabulary, and reading speed techniques for ${name}. Master subject-verb agreement, modifier placement, and cohesive paragraph sequencing.`,
        keyFormulas: [
          { name: 'Subject-Verb Agreement Rule', formula: 'Singular Subject + Singular Verb', note: 'Phrases like "along with", "as well as", "together with" do not change the number of the main subject.' },
          { name: 'Dangling Modifier Fix', formula: 'Introductory participle must modify adjacent subject', note: '"Walking down the street, the trees looked green" is incorrect; trees don\'t walk!' },
          { name: 'Para Jumbles Cohesion', formula: 'Pronoun -> Preceding Noun Reference', note: 'Find mandatory pairs (e.g. A introduces entity, C explains it).' }
        ],
        workedExamples: [
          {
            problem: `Identify the grammatical error in: "The team of researchers have submitted their report yesterday."`,
            solution: 'Error: "team of researchers" is a collective noun acting as a single unit, requiring singular verb "has". Also "yesterday" dictates simple past "submitted". Correct: "The team of researchers submitted its report yesterday."',
            tip: 'Watch out for prepositional phrases ("of researchers") distracting from the true singular subject ("team").'
          }
        ],
        industryCase: {
          company: 'Cognizant & Accenture Verbal Round',
          context: 'Top tech employers mandate high verbal cutoffs because client-facing communications require precise articulation.',
          keyTakeaway: 'Spotting subject-verb agreement and pronoun antecedent errors clears 80% of verbal screening tests.'
        },
        animatedConceptKey: 'comprehension',
        infographicTakeaways: [
          'Read questions first before reading a 400-word reading comprehension passage',
          'In Para Jumbles, identify the opening sentence: it must be self-contained with no trailing pronouns',
          'Beware of homophones (affect vs effect, their vs there vs they\'re)'
        ]
      },
      practiceQuestions: generateTopicQuestions(name, 'Verbal Ability', 25, `m3-t${idx + 1}-p`, 'Easy'),
      challengeQuestions: generateTopicQuestions(name, 'Verbal Ability', 25, `m3-t${idx + 1}-c`, 'Medium'),
      bossQuestions: generateBossQuestions(name, `m3-t${idx + 1}-b`)
    }))
  },
  {
    id: 4,
    title: 'Communication Mastery',
    shortDesc: 'Corporate speaking, email writing, body language, presentation, and team etiquette',
    iconName: 'MessageSquareText',
    topics: [
      'Verbal Communication', 'Non Verbal', 'Listening Skills', 'Public Speaking',
      'Storytelling', 'Email Writing', 'Stage Confidence', 'Business Communication',
      'Corporate Etiquette', 'Workplace Behaviour', 'Teamwork'
    ].map((name, idx) => ({
      id: `mod4-topic-${idx + 1}`,
      name,
      moduleId: 4,
      moduleName: 'Communication Mastery',
      order: idx + 1,
      isUnlocked: false,
      isCompleted: false,
      learningContent: {
        summary: `Executive-level communication training in ${name}. Cultivate active listening, persuasive storytelling, formal corporate correspondence, and high-impact presence.`,
        keyFormulas: [
          { name: 'The 7 Cs of Business Communication', formula: 'Clear, Concise, Concrete, Correct, Coherent, Complete, Courteous', note: 'Every email and presentation should satisfy all 7 tenets.' },
          { name: 'PREP Speech Structure', formula: 'Point -> Reason -> Example -> Point', note: 'Enables quick 60-second crisp responses in GD and meetings.' },
          { name: '55-38-7 Communication Rule (Mehrabian)', formula: '55% Body Language, 38% Tone, 7% Words', note: 'Posture and vocal cadence convey more conviction than text alone.' }
        ],
        workedExamples: [
          {
            problem: 'Scenario: Your team missed a deadline due to a client-side API delay. How do you communicate this to leadership?',
            solution: 'Subject: Proactive Update: Project Falcon Delivery Adjustment\nBody: Highlight progress, state obstacle objectively with root-cause data, provide updated timeline, and present 2 mitigation steps.',
            tip: 'Never point fingers. Frame issues around solutions, timelines, and risk mitigation.'
          }
        ],
        industryCase: {
          company: 'Deloitte, McKinsey & Google Leadership',
          context: 'Communication is the #1 differentiator for high-package placement offers (12 LPA+) and fast-track promotions.',
          keyTakeaway: 'The PREP framework guarantees high marks in group discussions and managerial rounds.'
        },
        animatedConceptKey: 'email-etiquette',
        infographicTakeaways: [
          'Email Subject: Always put Action + Topic (e.g. [For Approval] Q3 Marketing Plan)',
          'Eye Contact: In video interviews, look directly at the webcam lens 80% of the time',
          'In GDs: Being the initiator gives bonus points only if you provide a structured framework for the group'
        ]
      },
      practiceQuestions: generateTopicQuestions(name, 'Communication Mastery', 25, `m4-t${idx + 1}-p`, 'Easy'),
      challengeQuestions: generateTopicQuestions(name, 'Communication Mastery', 25, `m4-t${idx + 1}-c`, 'Medium'),
      bossQuestions: generateBossQuestions(name, `m4-t${idx + 1}-b`)
    }))
  },
  {
    id: 5,
    title: 'Placement Readiness',
    shortDesc: 'Resume ATS optimization, HR/Tech interviews, STAR method, GD & placement simulation',
    iconName: 'Briefcase',
    topics: [
      'Resume Builder', 'ATS Resume', 'LinkedIn Optimization', 'HR Interview',
      'Technical HR', 'STAR Method', 'Group Discussion', 'Mock Interviews',
      'Personal Branding', 'Placement Simulation'
    ].map((name, idx) => ({
      id: `mod5-topic-${idx + 1}`,
      name,
      moduleId: 5,
      moduleName: 'Placement Readiness',
      order: idx + 1,
      isUnlocked: false,
      isCompleted: false,
      learningContent: {
        summary: `End-to-end recruitment lifecycle preparation for ${name}. Master ATS keyword parsing, Google X-Y-Z bullet formatting, behavioural STAR interview frameworks, and placement simulation rounds.`,
        keyFormulas: [
          { name: 'Google X-Y-Z Resume Formula', formula: 'Accomplished [X], as measured by [Y], by doing [Z]', note: 'Transforms plain duty lists into high-impact verifiable achievements.' },
          { name: 'STAR Behavioral Framework', formula: 'Situation (20%) -> Task (10%) -> Action (50%) -> Result (20%)', note: 'Spend the majority of your time detailing what YOU personally engineered.' },
          { name: 'ATS Keyword Density Rule', formula: 'Match 70%+ of hard skills listed in Job Description', note: 'Keep file in single-column PDF or docx; avoid tables or graphics in headers.' }
        ],
        workedExamples: [
          {
            problem: 'HR Question: "Tell me about a time you had a conflict with a team member during a hackathon or academic project."',
            solution: 'STAR Response:\nSituation: Final 6 hours of college hackathon with 4 teammates.\nTask: Disagreement on database choice (MongoDB vs PostgreSQL).\nAction: Proposed a quick 10-minute benchmark comparing write speed and schema rigidity for our specific use case.\nResult: Chose Mongo, submitted project 30 mins before deadline, and placed in Top 3 finalists.',
            tip: 'Focus on collaboration and analytical compromise rather than emotional discord.'
          }
        ],
        industryCase: {
          company: 'Campus Placement Drives (Tier 1 & Tier 2 Colleges across India)',
          context: '75% of resumes are rejected by ATS filters before reaching human eyes. Candidates with STAR-formatted interview responses have 4.2x higher offer conversion.',
          keyTakeaway: 'Quantified results and clear personal branding guarantee recruiter callbacks.'
        },
        animatedConceptKey: 'star-framework',
        infographicTakeaways: [
          'Resume: Keep it strictly to 1 page for undergraduate campus drives',
          'Include clickable GitHub and LinkedIn hyperlinks in the header',
          'Have 2 questions ready for "Do you have any questions for us?" at the interview finish'
        ]
      },
      practiceQuestions: generateTopicQuestions(name, 'Placement Readiness', 25, `m5-t${idx + 1}-p`, 'Easy'),
      challengeQuestions: generateTopicQuestions(name, 'Placement Readiness', 25, `m5-t${idx + 1}-c`, 'Medium'),
      bossQuestions: generateBossQuestions(name, `m5-t${idx + 1}-b`)
    }))
  }
];
