import { Module, Topic, Question } from '../types';
import {
  getUniquePracticeQuestions,
  getUniqueChallengeQuestions,
  getUniqueBossQuestions
} from './questionBanks/questionGenerator';

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
      practiceQuestions: getUniquePracticeQuestions(name, 'Quantitative Aptitude', `m1-t${idx + 1}-p`),
      challengeQuestions: getUniqueChallengeQuestions(name, 'Quantitative Aptitude', `m1-t${idx + 1}-c`),
      bossQuestions: getUniqueBossQuestions(name, `m1-t${idx + 1}-b`)
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
      practiceQuestions: getUniquePracticeQuestions(name, 'Logical Reasoning', `m2-t${idx + 1}-p`),
      challengeQuestions: getUniqueChallengeQuestions(name, 'Logical Reasoning', `m2-t${idx + 1}-c`),
      bossQuestions: getUniqueBossQuestions(name, `m2-t${idx + 1}-b`)
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
      practiceQuestions: getUniquePracticeQuestions(name, 'Verbal Ability', `m3-t${idx + 1}-p`),
      challengeQuestions: getUniqueChallengeQuestions(name, 'Verbal Ability', `m3-t${idx + 1}-c`),
      bossQuestions: getUniqueBossQuestions(name, `m3-t${idx + 1}-b`)
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
      practiceQuestions: getUniquePracticeQuestions(name, 'Communication Mastery', `m4-t${idx + 1}-p`),
      challengeQuestions: getUniqueChallengeQuestions(name, 'Communication Mastery', `m4-t${idx + 1}-c`),
      bossQuestions: getUniqueBossQuestions(name, `m4-t${idx + 1}-b`)
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
      practiceQuestions: getUniquePracticeQuestions(name, 'Placement Readiness', `m5-t${idx + 1}-p`),
      challengeQuestions: getUniqueChallengeQuestions(name, 'Placement Readiness', `m5-t${idx + 1}-c`),
      bossQuestions: getUniqueBossQuestions(name, `m5-t${idx + 1}-b`)
    }))
  }
];
