export interface GrammarMCQ {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  explanation: string;
  companyTag: string;
  testedConcept: string;
}

export interface CandidateMistake {
  wrongSentence: string;
  correctSentence: string;
  whyWrong: string;
  interviewerImpression: string;
}

export interface PartOfSpeechSection {
  id: string;
  title: string;
  shortName: string;
  partNumber: number;
  tagline: string;
  notes: {
    definition: string;
    roleInPlacements: string;
    subtypes: { name: string; definition: string; examples: string[] }[];
    goldenRules: { rule: string; explanation: string; example: string }[];
    quickMemoryAids: string[];
  };
  interviewTips: {
    overview: string;
    commonMistakes: CandidateMistake[];
    spokenDeliveryAdvice: string[];
    kapilProTip: string;
  };
  mcqs: GrammarMCQ[];
}

export const GRAMMAR_PARTS_OF_SPEECH: PartOfSpeechSection[] = [
  // 1. NOUNS
  {
    id: 'nouns',
    partNumber: 1,
    title: 'Nouns (Naming Entities, Agreement & Pluralization Rules)',
    shortName: 'Nouns',
    tagline: 'Names of persons, places, things, abstract concepts, or collective entities acting as sentence subjects or objects.',
    notes: {
      definition: 'A noun is a naming word representing a person, place, entity, quality, or idea. In campus recruitment tests, nouns are tested through collective agreement, uncountable noun traps, compound hyphenation, and pluralization irregularities.',
      roleInPlacements: 'Verbal aptitude screeners in TCS, Infosys, and Accenture frequently test subject-verb agreement with collective nouns and singular uncountable nouns disguised as plurals.',
      subtypes: [
        { name: 'Proper Nouns', definition: 'Specific names of individual entities (always capitalized).', examples: ['Google', 'Kapil', 'Bengaluru', 'Python'] },
        { name: 'Common Nouns', definition: 'Generic names for a category of items or beings.', examples: ['engineer', 'database', 'candidate', 'university'] },
        { name: 'Collective Nouns', definition: 'Singular terms representing a collection of individuals acting as one unit.', examples: ['jury', 'committee', 'team', 'board', 'audience'] },
        { name: 'Abstract Nouns', definition: 'Intangible concepts, feelings, qualities, or states of being.', examples: ['integrity', 'scalability', 'efficiency', 'leadership'] },
        { name: 'Uncountable / Material Nouns', definition: 'Mass entities that cannot be counted individually and never take plural -s.', examples: ['furniture', 'information', 'advice', 'equipment', 'luggage'] }
      ],
      goldenRules: [
        {
          rule: 'Uncountable Nouns Never Take Plural -s',
          explanation: 'Nouns like advice, information, equipment, furniture, machinery, luggage, and scenery are uncountable. To count them, use "a piece of advice" or "items of equipment".',
          example: 'Incorrect: "He gave me many advices." | Correct: "He gave me pieces of advice."'
        },
        {
          rule: 'Collective Nouns: Single Unit vs Divided Members',
          explanation: 'When a collective noun acts unanimously, use singular verbs and singular pronouns ("The committee has passed its resolution"). When members disagree or act individually, use plural ("The committee were divided in their opinions").',
          example: 'Incorrect: "The jury have reached its verdict." | Correct: "The jury has reached its verdict."'
        },
        {
          rule: 'Nouns Plural in Form but Singular in Meaning',
          explanation: 'Subjects of study (Mathematics, Physics, Economics), news, and sports (Billiards) end in -s but are singular.',
          example: 'Incorrect: "Economics are a tough subject." | Correct: "Economics is a tough subject."'
        },
        {
          rule: 'Hyphenated Compound Nouns as Adjectives Stay Singular',
          explanation: 'When numerical expressions modify a noun, the hyphenated noun never takes plural form.',
          example: 'Incorrect: "A five-years-old child / A ten-rupees note" | Correct: "A five-year-old child / A ten-rupee note"'
        }
      ],
      quickMemoryAids: [
        'Memory Hook: "SCUM" = Scenery, Clothing, Uncountable furniture, Machinery/Luggage (NEVER add -s)',
        'Check agreement with collective nouns: Unit = Singular verb; Disagreement = Plural verb',
        'Numerical adjective + Noun = Singular (e.g. "a three-man team", not "three-men team")'
      ]
    },
    interviewTips: {
      overview: 'During technical and HR interviews, recruiters evaluate your clarity of noun precision. Using vague placeholders ("stuff", "things") or making standard Indian English pluralization blunders signals careless verbal communication.',
      commonMistakes: [
        {
          wrongSentence: 'I have done many project works during my final year.',
          correctSentence: 'I completed several academic projects during my final year.',
          whyWrong: '"Work" in the sense of labor or effort is uncountable. When referring to academic endeavors, use "projects" or "pieces of work".',
          interviewerImpression: 'Sounds non-native and informal. Strong candidates speak of distinct "projects" and "deliverables".'
        },
        {
          wrongSentence: 'One of my friend recommended this company.',
          correctSentence: 'One of my friends recommended this company.',
          whyWrong: 'The construction "One of..." always takes a plural noun ("friends") because you are choosing one item out of a group.',
          interviewerImpression: 'A very common grammatical slip in HR introductions that immediately catches an interviewer\'s ear.'
        },
        {
          wrongSentence: 'Can you give me some feedbacks on my interview performance?',
          correctSentence: 'Could you please share some feedback on my interview performance?',
          whyWrong: '"Feedback" is an uncountable noun and never takes the plural "feedbacks".',
          interviewerImpression: 'Using "feedbacks" is an immediate flag in corporate communications.'
        },
        {
          wrongSentence: 'Our college has state-of-the-art infrastructures.',
          correctSentence: 'Our college has state-of-the-art infrastructure.',
          whyWrong: '"Infrastructure" is an uncountable collective noun and does not take plural form in this context.',
          interviewerImpression: 'Demonstrates grammatical polish when describing institutional facilities.'
        }
      ],
      spokenDeliveryAdvice: [
        'Replace vague nouns like "stuffs", "things", and "workings" with precise technical nouns: "architecture", "microservices", "components", "algorithms".',
        'When naming your role in a team, use clear occupational nouns: "lead front-end architect", "test automation contributor", rather than "the person doing the code".'
      ],
      kapilProTip: 'In introductory questions ("Tell me about yourself"), always listen for "One of my..." phrases. Say: "One of my key strengths is..." (never "One of my key strength is...").'
    },
    mcqs: [
      {
        id: 'noun-q1',
        question: 'Identify the sentence containing no grammatical error in noun usage:',
        options: [
          'The research lab ordered modern equipments for the data science cohort.',
          'The research lab ordered modern equipment for the data science cohort.',
          'The research lab ordered modern pieces of equipments for the data science cohort.',
          'The research lab ordered moderns equipment for the data science cohort.'
        ],
        correctIndex: 1,
        difficulty: 'Easy',
        explanation: '"Equipment" is an uncountable noun and cannot be pluralized as "equipments". Option B is correct.',
        companyTag: 'TCS NQT',
        testedConcept: 'Uncountable Nouns'
      },
      {
        id: 'noun-q2',
        question: 'Choose the correct form to complete the sentence: "The board of directors ______ unanimous in ______ decision to acquire the startup."',
        options: [
          'were, their',
          'was, its',
          'are, its',
          'was, their'
        ],
        correctIndex: 1,
        difficulty: 'Medium',
        explanation: 'Because the board is acting unanimously as a single entity, the singular verb "was" and singular neuter possessive pronoun "its" must be used.',
        companyTag: 'Infosys',
        testedConcept: 'Collective Noun Agreement'
      },
      {
        id: 'noun-q3',
        question: 'Spot the sentence with the correct numerical compound noun:',
        options: [
          'The company organized a three-days workshop on generative AI.',
          'The company organized a three-day workshop on generative AI.',
          'The company organized three-days workshops on generative AI.',
          'The company organized a three-day\'s workshop on generative AI.'
        ],
        correctIndex: 1,
        difficulty: 'Easy',
        explanation: 'When a compound numerical expression acts as an adjective modifying a noun ("workshop"), the unit noun remains singular ("three-day").',
        companyTag: 'Accenture',
        testedConcept: 'Hyphenated Compound Adjectives'
      },
      {
        id: 'noun-q4',
        question: 'Select the correct option: "______ is considered one of the most intellectually demanding fields in computer science."',
        options: [
          'Cryptography are',
          'Cryptography is',
          'Cryptographies is',
          'Cryptographies are'
        ],
        correctIndex: 1,
        difficulty: 'Easy',
        explanation: 'Names of subjects and disciplines ending in -y or -ics are singular and take singular verbs ("Cryptography is").',
        companyTag: 'Wipro',
        testedConcept: 'Subject Nouns ending in -ics/-phy'
      },
      {
        id: 'noun-q5',
        question: 'Identify the grammatically correct sentence:',
        options: [
          'One of the senior developer has reviewed the pull request.',
          'One of the senior developers have reviewed the pull request.',
          'One of the senior developers has reviewed the pull request.',
          'One of senior developers has reviewed the pull request.'
        ],
        correctIndex: 2,
        difficulty: 'Medium',
        explanation: 'The structure "One of the + Plural Noun + Singular Verb" applies here: "senior developers" (plural) followed by "has reviewed" (singular verb agreeing with "One").',
        companyTag: 'Cognizant',
        testedConcept: 'One of the + Plural Noun'
      },
      {
        id: 'noun-q6',
        question: 'Which of the following sentences correctly handles plural-only nouns?',
        options: [
          'The scissors was kept on the manager\'s desk.',
          'A pair of scissors was kept on the manager\'s desk.',
          'The scissoring tool were kept on the manager\'s desk.',
          'A pair of scissors were kept on the manager\'s desk.'
        ],
        correctIndex: 1,
        difficulty: 'Medium',
        explanation: '"Scissors" takes a plural verb when used alone, but when preceded by "A pair of", the singular subject "pair" dictates a singular verb ("was").',
        companyTag: 'Capgemini',
        testedConcept: 'Pair of + Plural Noun'
      },
      {
        id: 'noun-q7',
        question: 'Find the sentence where the abstract noun is appropriately used without an unnecessary article:',
        options: [
          'The honesty is the best policy in team management.',
          'Honesty is the best policy in team management.',
          'An honesty is the best policy in team management.',
          'A honesty is the best policy in team management.'
        ],
        correctIndex: 1,
        difficulty: 'Easy',
        explanation: 'Abstract nouns in general sense do not take the definite article "the" or indefinite articles "a/an".',
        companyTag: 'Deloitte',
        testedConcept: 'Abstract Nouns & Articles'
      },
      {
        id: 'noun-q8',
        question: 'Identify the sentence with the correct plural form of the compound noun "passer-by":',
        options: [
          'Several passer-bys stopped to inspect the autonomous drone prototype.',
          'Several passers-by stopped to inspect the autonomous drone prototype.',
          'Several passers-bys stopped to inspect the autonomous drone prototype.',
          'Several passer-byes stopped to inspect the autonomous drone prototype.'
        ],
        correctIndex: 1,
        difficulty: 'Hard',
        explanation: 'In compound nouns formed of a noun + preposition/adverb, the plural suffix -s is added to the principal noun: "passers-by".',
        companyTag: 'Amazon',
        testedConcept: 'Compound Noun Pluralization'
      },
      {
        id: 'noun-q9',
        question: 'Choose the sentence that correctly employs the word "scenery":',
        options: [
          'The sceneries of the Himalayan hill station refreshed the tired developers.',
          'The scenery of the Himalayan hill station refreshed the tired developers.',
          'The scenerys of the Himalayan hill station refreshed the tired developers.',
          'Many beautiful sceneries were captured by the photography team.'
        ],
        correctIndex: 1,
        difficulty: 'Easy',
        explanation: '"Scenery" is an uncountable singular noun and has no plural form "sceneries".',
        companyTag: 'Wipro NLTH',
        testedConcept: 'Uncountable Scenery'
      },
      {
        id: 'noun-q10',
        question: 'The committee members ______ unable to reach an agreement and ______ argued loudly among ______.',
        options: [
          'was, has, itself',
          'were, have, themselves',
          'was, have, themselves',
          'were, has, itself'
        ],
        correctIndex: 1,
        difficulty: 'Hard',
        explanation: 'When collective noun members act as divided individuals with conflicting stances, plural verb ("were", "have") and plural reflexive pronoun ("themselves") must be used.',
        companyTag: 'Goldman Sachs',
        testedConcept: 'Collective Noun of Multitude'
      }
    ]
  },

  // 2. PRONOUNS
  {
    id: 'pronouns',
    partNumber: 2,
    title: 'Pronouns (Cases, Antecedent Agreement & Relative Pronoun Precision)',
    shortName: 'Pronouns',
    tagline: 'Words used in place of nouns to avoid repetition, establish point of view, and connect clauses.',
    notes: {
      definition: 'A pronoun substitutes for a noun or noun phrase (known as its antecedent). It must match its antecedent in person, number, and gender, while taking the grammatical case (subjective, objective, possessive, reflexive) required by its position in the sentence.',
      roleInPlacements: 'Recruiters and test examiners test pronoun case after prepositions (between you and me), relative pronouns (who vs whom), reflexive pronoun misuse ("myself as subject"), and indefinite pronoun agreement.',
      subtypes: [
        { name: 'Personal Pronouns', definition: 'Represent specific persons or things across subjective (I, he, they) and objective (me, him, them) cases.', examples: ['I', 'we', 'you', 'he', 'she', 'it', 'they'] },
        { name: 'Possessive Pronouns', definition: 'Indicate ownership without apostrophes.', examples: ['mine', 'yours', 'his', 'hers', 'ours', 'theirs', 'its'] },
        { name: 'Reflexive & Emphatic Pronouns', definition: 'Reflect action back to the subject or emphasize a noun.', examples: ['myself', 'yourself', 'himself', 'herself', 'themselves'] },
        { name: 'Relative Pronouns', definition: 'Link dependent clauses to an antecedent noun.', examples: ['who (subject)', 'whom (object)', 'whose (possessive)', 'which', 'that'] },
        { name: 'Indefinite Pronouns', definition: 'Refer to non-specific entities; singular indefinite pronouns take singular verbs.', examples: ['everyone', 'each', 'somebody', 'neither', 'either', 'none'] }
      ],
      goldenRules: [
        {
          rule: 'Prepositions Always Require Objective Case Pronouns',
          explanation: 'After prepositions such as between, among, except, but (meaning except), and for, always use the objective case (me, him, her, us, them), never subjective (I, he, she, we, they).',
          example: 'Incorrect: "Between you and I..." | Correct: "Between you and me..."'
        },
        {
          rule: '"Myself" Can Never Function as a Sentence Subject',
          explanation: '"Myself" is reflexive or emphatic; it cannot initiate an action without "I" as the preceding subject.',
          example: 'Incorrect: "Myself Rahul from IT department." | Correct: "I am Rahul from the IT department."'
        },
        {
          rule: 'Order of Personal Pronouns (231 Rule)',
          explanation: 'When combining different pronouns in normal or pleasant situations, follow the order: Second person (You) -> Third person (He/She/They) -> First person (I). When confessing a mistake or error, reverse the order to 123 (I, You, He).',
          example: 'Incorrect: "I and you will lead the client demo." | Correct: "You and I will lead the client demo."'
        },
        {
          rule: 'Who (Subject) vs Whom (Object)',
          explanation: 'Use "who" if the pronoun acts as the subject performing the verb (replace with he/they). Use "whom" if the pronoun receives the action or follows a preposition (replace with him/them).',
          example: 'Incorrect: "The architect whom built the system." | Correct: "The architect who built the system."'
        }
      ],
      quickMemoryAids: [
        'He = Who (subject performs action); Him = Whom (object receives action)',
        'Preposition + Object: Between you and ME (not I)',
        'Normal 2-3-1: You, he, and I are selected'
      ]
    },
    interviewTips: {
      overview: 'Self-introduction is where 85% of pronoun mistakes occur in campus interviews. Candidates routinely start with "Myself..." or misplace pronouns when talking about team achievements.',
      commonMistakes: [
        {
          wrongSentence: 'Myself Kapil Narula, graduating from ABC Institute.',
          correctSentence: 'I am Kapil Narula, graduating from ABC Institute. / My name is Kapil Narula...',
          whyWrong: '"Myself" is a reflexive pronoun that requires an antecedent. You cannot introduce yourself with a reflexive pronoun in formal English.',
          interviewerImpression: 'The classic Indian campus interview error. Interviewers mark down verbal confidence immediately.'
        },
        {
          wrongSentence: 'Me and my teammate created the backend API.',
          correctSentence: 'My teammate and I created the backend API.',
          whyWrong: 'In the subject position, use the subjective case "I", and out of courtesy, place the other person first (Rule 231).',
          interviewerImpression: 'Shows lack of formal grammatical poise when describing leadership and team initiatives.'
        },
        {
          wrongSentence: 'Between you and I, our sprint had multiple blockers.',
          correctSentence: 'Between you and me, our sprint had multiple blockers.',
          whyWrong: '"Between" is a preposition requiring the objective pronoun "me".',
          interviewerImpression: 'Shows confusion over hypercorrection in formal speech.'
        },
        {
          wrongSentence: 'The recruiter whom called me yesterday rescheduled the round.',
          correctSentence: 'The recruiter who called me yesterday rescheduled the round.',
          whyWrong: 'The pronoun is the subject performing the action "called", so "who" is required.',
          interviewerImpression: 'Shows mastery over who vs whom distinction, which recruiters value in written correspondence.'
        }
      ],
      spokenDeliveryAdvice: [
        'When describing group projects in the STAR method, balance "we" and "I". Use "We decided..." for team consensus, but switch to "I personally engineered..." for individual contribution.',
        'Never say "His-self" or "Their-selves" — the correct standard forms are "himself" and "themselves".'
      ],
      kapilProTip: 'During your opening line, take a deep breath, smile, and say with crisp projection: "Good morning panel, my name is..." It instantly sets an executive tone.'
    },
    mcqs: [
      {
        id: 'pronoun-q1',
        question: 'Identify the sentence with the correct pronoun order and case for a positive collaborative task:',
        options: [
          'I, you, and he have been chosen to represent the university in the hackathon.',
          'You, he, and I have been chosen to represent the university in the hackathon.',
          'He, you, and me have been chosen to represent the university in the hackathon.',
          'You, me, and him have been chosen to represent the university in the hackathon.'
        ],
        correctIndex: 1,
        difficulty: 'Easy',
        explanation: 'For pleasant or general statements, the 231 rule dictates: Second person (You), Third person (He), First person subjective (I).',
        companyTag: 'TCS NQT',
        testedConcept: '231 Pronoun Rule'
      },
      {
        id: 'pronoun-q2',
        question: 'Fill in the blank correctly: "This internal dispute regarding codebase refactoring must remain strictly between ______."',
        options: [
          'you and I',
          'you and me',
          'you and he',
          'he and you'
        ],
        correctIndex: 1,
        difficulty: 'Easy',
        explanation: '"Between" is a preposition, which requires objective case pronouns ("you and me").',
        companyTag: 'Infosys',
        testedConcept: 'Preposition + Objective Case'
      },
      {
        id: 'pronoun-q3',
        question: 'Select the grammatically accurate sentence:',
        options: [
          'The lead engineer whom solved the critical production deadlock received an award.',
          'The lead engineer who solved the critical production deadlock received an award.',
          'The lead engineer which solved the critical production deadlock received an award.',
          'The lead engineer whose solved the critical production deadlock received an award.'
        ],
        correctIndex: 1,
        difficulty: 'Medium',
        explanation: '"Who" is the subject that performed the action of solving ("who solved"). "Whom" is an objective form and cannot act as the subject.',
        companyTag: 'Accenture',
        testedConcept: 'Who vs Whom'
      },
      {
        id: 'pronoun-q4',
        question: 'Which sentence correctly handles indefinite pronoun agreement?',
        options: [
          'Each of the candidates must bring their original certificates.',
          'Each of the candidates must bring his or her original certificates.',
          'Each of the candidate must bring their original certificates.',
          'Each of the candidates must bring its original certificates.'
        ],
        correctIndex: 1,
        difficulty: 'Medium',
        explanation: 'In strict formal verbal exams, "Each" is singular and takes the singular possessive pronoun "his or her".',
        companyTag: 'Cognizant',
        testedConcept: 'Indefinite Pronoun Agreement'
      },
      {
        id: 'pronoun-q5',
        question: 'Identify the sentence where the reflexive pronoun is used INCORRECTLY:',
        options: [
          'The candidate prepared himself thoroughly for the mock assessment.',
          'Myself and my project partner submitted the final documentation.',
          'I myself reviewed every pull request before deployment.',
          'The database system optimized itself automatically.'
        ],
        correctIndex: 1,
        difficulty: 'Easy',
        explanation: '"Myself" cannot be used as a subject without the pronoun "I". It should read: "My project partner and I submitted..."',
        companyTag: 'Wipro',
        testedConcept: 'Reflexive Pronoun Misuse'
      },
      {
        id: 'pronoun-q6',
        question: 'Choose the sentence with the correct possessive form:',
        options: [
          'The automated CI/CD pipeline resumed it\'s execution after the test suite passed.',
          'The automated CI/CD pipeline resumed its execution after the test suite passed.',
          'The automated CI/CD pipeline resumed its\' execution after the test suite passed.',
          'The automated CI/CD pipeline resumed its` execution after the test suite passed.'
        ],
        correctIndex: 1,
        difficulty: 'Easy',
        explanation: '"Its" is the possessive form with no apostrophe. "It\'s" is the contraction for "it is" or "it has".',
        companyTag: 'Capgemini',
        testedConcept: 'Its vs It\'s'
      },
      {
        id: 'pronoun-q7',
        question: 'When confessing a mistake or error, which pronoun order is grammatically standard?',
        options: [
          'You, he, and I made an error in the deployment config.',
          'I, you, and he made an error in the deployment config.',
          'He, you, and I made an error in the deployment config.',
          'You, I, and he made an error in the deployment config.'
        ],
        correctIndex: 1,
        difficulty: 'Medium',
        explanation: 'When admitting guilt, blame, or an error, the 123 rule applies (First person -> Second person -> Third person): "I, you, and he".',
        companyTag: 'Deloitte',
        testedConcept: '123 Pronoun Rule for Confessions'
      },
      {
        id: 'pronoun-q8',
        question: 'Fill in the blank: "To ______ should the escalation email be addressed?"',
        options: [
          'who',
          'whom',
          'whose',
          'which'
        ],
        correctIndex: 1,
        difficulty: 'Medium',
        explanation: 'Following the preposition "To", the objective relative pronoun "whom" must be used ("To whom should it be addressed?").',
        companyTag: 'Amazon',
        testedConcept: 'Preposition + Whom'
      },
      {
        id: 'pronoun-q9',
        question: 'Spot the correct sentence:',
        options: [
          'The two developers helped one another during the debugging marathon.',
          'The two developers helped each other during the debugging marathon.',
          'The two developers helped themselves each during the debugging marathon.',
          'The two developers helped one other during the debugging marathon.'
        ],
        correctIndex: 1,
        difficulty: 'Hard',
        explanation: '"Each other" is used for reciprocal action between two entities; "one another" is used for more than two entities.',
        companyTag: 'Goldman Sachs',
        testedConcept: 'Each other vs One another'
      },
      {
        id: 'pronoun-q10',
        question: 'Select the sentence free from pronoun-antecedent ambiguity:',
        options: [
          'When the client called the project manager, he sounded anxious.',
          'The project manager sounded anxious when the client called him.',
          'When the client and the project manager met, he discussed his goals.',
          'The server crashed before the database responded, which made it useless.'
        ],
        correctIndex: 1,
        difficulty: 'Hard',
        explanation: 'In option B, the referent for "him" is clearly the project manager, eliminating the ambiguity present in other options where "he" could refer to either person.',
        companyTag: 'Morgan Stanley',
        testedConcept: 'Pronoun Antecedent Ambiguity'
      }
    ]
  },

  // 3. VERBS
  {
    id: 'verbs',
    partNumber: 3,
    title: 'Verbs (Tenses, Modals, Subject-Verb Concord & Conditionals)',
    shortName: 'Verbs',
    tagline: 'The grammatical engine expressing actions, occurrences, and states of being with tense fidelity.',
    notes: {
      definition: 'A verb asserts something about the subject. It expresses physical action, mental action, or state of being. Mastery of verbs requires understanding finite vs non-finite forms, modal auxiliaries, subject-verb agreement (concord), and sequence of tenses.',
      roleInPlacements: 'Subject-verb agreement and tense consistency constitute over 40% of all error-spotting and sentence-correction questions in campus aptitude exams.',
      subtypes: [
        { name: 'Transitive Verbs', definition: 'Action verbs requiring a direct object to complete their meaning.', examples: ['engineered', 'deployed', 'resolved', 'analyzed'] },
        { name: 'Intransitive Verbs', definition: 'Action verbs that do not take a direct object.', examples: ['arrived', 'crashed', 'persisted', 'slept'] },
        { name: 'Linking / Stative Verbs', definition: 'Connect subject to a subject complement and describe a condition rather than action (rarely used in continuous -ing).', examples: ['seem', 'appear', 'know', 'believe', 'understand', 'belong'] },
        { name: 'Auxiliary & Modal Verbs', definition: 'Helping verbs indicating tense, possibility, permission, ability, or necessity.', examples: ['is', 'have', 'do', 'can', 'could', 'may', 'might', 'must', 'should'] },
        { name: 'Non-Finite Verbs', definition: 'Verbs not bounded by person or tense: Gerunds (verb-noun -ing), Infinitives (to + V1), and Participles.', examples: ['debugging is fun (gerund)', 'to optimize (infinitive)', 'running process (participle)'] }
      ],
      goldenRules: [
        {
          rule: 'Intervening Phrases Do Not Change the Subject Number',
          explanation: 'Expressions such as "along with", "as well as", "together with", "in addition to", and "accompanied by" are parenthetical and do not alter the grammatical number of the subject.',
          example: 'Incorrect: "The senior architect along with the interns are testing the API." | Correct: "The senior architect along with the interns is testing the API."'
        },
        {
          rule: '"Neither... Nor" / "Either... Or" Follows Proximity Principle',
          explanation: 'When two subjects of differing grammatical number are joined by "neither... nor" or "either... or", the verb agrees with the closer subject.',
          example: 'Incorrect: "Neither the manager nor the engineers was present." | Correct: "Neither the manager nor the engineers were present."'
        },
        {
          rule: '"Did" Is Always Followed by Bare Infinitive (V1)',
          explanation: '"Did" already carries the past tense mark. Never follow "did" or "didn\'t" with a past tense (V2) verb.',
          example: 'Incorrect: "I did not knew about the exception." | Correct: "I did not know about the exception."'
        },
        {
          rule: 'Past Time Anchor Requires Simple Past, Not Present Perfect',
          explanation: 'If a specific completed past time is mentioned (yesterday, in 2024, last week), you MUST use Simple Past, never Present Perfect.',
          example: 'Incorrect: "I have passed my engineering in 2024." | Correct: "I passed my engineering in 2024."'
        },
        {
          rule: 'Third Conditional Formula',
          explanation: 'If + Past Perfect (had + V3) in the if-clause requires "would have + V3" in the main clause.',
          example: 'Incorrect: "If I practiced more, I would have cleared." | Correct: "If I had practiced more, I would have cleared."'
        }
      ],
      quickMemoryAids: [
        'Did + V1: Did know, Did see, Did go (NEVER did knew, did saw)',
        'Singular subject ending without -s takes verb with -s (He writes / They write)',
        'As well as / Along with -> Look ONLY at the first subject'
      ]
    },
    interviewTips: {
      overview: 'Interviewers listen keenly to verb tenses. Describing past accomplishments using Present Perfect with past years or mixing tenses during code explanations is an immediate red flag.',
      commonMistakes: [
        {
          wrongSentence: 'I have graduated in the year 2024 with an 8.5 CGPA.',
          correctSentence: 'I graduated in 2024 with an 8.5 CGPA.',
          whyWrong: '"In 2024" is a finished past point of time. Present Perfect ("have graduated") cannot be anchored to a specific finished past year.',
          interviewerImpression: 'A hallmark error in Indian campus interviews. Using simple past displays grammatical command.'
        },
        {
          wrongSentence: 'I did not knew how to handle memory leaks at that time.',
          correctSentence: 'I did not know how to handle memory leaks at that time.',
          whyWrong: 'Double past tense error: "did" already marks past tense, so the auxiliary takes the base verb (V1) "know".',
          interviewerImpression: 'Sounds uneducated in basic English syntax during technical behavioral rounds.'
        },
        {
          wrongSentence: 'I am knowing Java and Spring Boot very well.',
          correctSentence: 'I know Java and Spring Boot very well. / I am proficient in Java and Spring Boot.',
          whyWrong: '"Know" is a stative verb representing a cognitive state, not a continuous physical activity.',
          interviewerImpression: 'Literal translation from regional languages into continuous tense.'
        },
        {
          wrongSentence: 'If I would have gotten more time, I would optimize the algorithm.',
          correctSentence: 'If I had had more time, I would have optimized the algorithm.',
          whyWrong: 'Never put "would have" in the if-clause. The if-clause takes Past Perfect ("had had"), and the main clause takes "would have + V3".',
          interviewerImpression: 'Shows lack of mastery over conditional reasoning, which is essential in problem-solving discussions.'
        }
      ],
      spokenDeliveryAdvice: [
        'Use strong action verbs on your resume and in your spoken STAR responses: "architected", "refactored", "spearheaded", "benchmarked", rather than weak verbs like "was responsible for" or "did".',
        'When walking through code or an architectural diagram, stick to the Timeless Present Tense: "When the client submits a request, the API Gateway authenticates the token..."'
      ],
      kapilProTip: 'When discussing college milestones, memorize this formula: Simple Past for finished events ("I built a portal in 2023"), and Present Perfect for ongoing skills ("I have developed three microservices so far").'
    },
    mcqs: [
      {
        id: 'verb-q1',
        question: 'Choose the sentence with the correct subject-verb agreement:',
        options: [
          'The lead developer along with his junior teammates are refactoring the legacy modules.',
          'The lead developer along with his junior teammates is refactoring the legacy modules.',
          'The lead developer along with his junior teammates were refactoring the legacy modules.',
          'The lead developer along with his junior teammates have refactored the legacy modules.'
        ],
        correctIndex: 1,
        difficulty: 'Easy',
        explanation: 'Phrases like "along with" do not change the number of the main subject ("The lead developer", singular), which requires the singular verb "is refactoring".',
        companyTag: 'TCS NQT',
        testedConcept: 'Parenthetical Phrase Agreement'
      },
      {
        id: 'verb-q2',
        question: 'Select the grammatically correct sentence regarding past events:',
        options: [
          'The tech lead has completed his master\'s degree in 2021.',
          'The tech lead completed his master\'s degree in 2021.',
          'The tech lead had completed his master\'s degree in 2021.',
          'The tech lead is completing his master\'s degree in 2021.'
        ],
        correctIndex: 1,
        difficulty: 'Easy',
        explanation: 'When a specific past time ("in 2021") is stated, the Simple Past tense ("completed") must be used, not the Present Perfect.',
        companyTag: 'Infosys',
        testedConcept: 'Past Time Markers & Tense'
      },
      {
        id: 'verb-q3',
        question: 'Fill in the blank: "Neither the team lead nor the cloud architects ______ informed about the security audit."',
        options: [
          'was',
          'were',
          'is',
          'has been'
        ],
        correctIndex: 1,
        difficulty: 'Medium',
        explanation: 'In "neither... nor", the verb agrees with the nearer subject. Here "cloud architects" is plural, requiring the plural verb "were".',
        companyTag: 'Accenture',
        testedConcept: 'Proximity Rule in Correlatives'
      },
      {
        id: 'verb-q4',
        question: 'Identify the sentence containing no error with modal or auxiliary usage:',
        options: [
          'He did not understood the multi-threading bottleneck.',
          'He did not understand the multi-threading bottleneck.',
          'He did not understands the multi-threading bottleneck.',
          'He does not understood the multi-threading bottleneck.'
        ],
        correctIndex: 1,
        difficulty: 'Easy',
        explanation: 'The auxiliary "did not" must be followed by the base infinitive form (V1) "understand".',
        companyTag: 'Wipro',
        testedConcept: 'Did + Base Verb'
      },
      {
        id: 'verb-q5',
        question: 'Complete the third conditional correctly: "If the QA engineer ______ the race condition earlier, the production outage ______ avoided."',
        options: [
          'detected, would be',
          'had detected, would have been',
          'would have detected, had been',
          'has detected, will be'
        ],
        correctIndex: 1,
        difficulty: 'Medium',
        explanation: 'The third conditional takes: If + Past Perfect ("had detected") in the condition, and "would have been" in the result.',
        companyTag: 'Cognizant',
        testedConcept: 'Third Conditional'
      },
      {
        id: 'verb-q6',
        question: 'Spot the sentence with the correct use of stative verbs:',
        options: [
          'She is understanding the mathematical proof now.',
          'She understands the mathematical proof now.',
          'She was understanding the mathematical proof yesterday.',
          'She has been understanding the proof for an hour.'
        ],
        correctIndex: 1,
        difficulty: 'Medium',
        explanation: '"Understand" is a stative verb expressing a cognitive state and is correctly used in simple present ("understands"), not continuous tenses.',
        companyTag: 'Capgemini',
        testedConcept: 'Stative Verbs in Non-Continuous'
      },
      {
        id: 'verb-q7',
        question: 'Choose the sentence with correct subjunctive mood usage:',
        options: [
          'The manager insisted that the developer writes clean code.',
          'The manager insisted that the developer write clean code.',
          'The manager insisted that the developer wrote clean code.',
          'The manager insisted that the developer must wrote clean code.'
        ],
        correctIndex: 1,
        difficulty: 'Hard',
        explanation: 'Verbs of demand, recommendation, or insistence (insist, recommend, suggest) take the subjunctive mood with a bare infinitive ("that the developer write").',
        companyTag: 'Amazon',
        testedConcept: 'Subjunctive Mood'
      },
      {
        id: 'verb-q8',
        question: 'Identify the sentence with correct sequence of tenses:',
        options: [
          'The professor said that the earth revolved around the sun.',
          'The professor said that the earth revolves around the sun.',
          'The professor says that the earth revolved around the sun.',
          'The professor had said that the earth is revolving around the sun.'
        ],
        correctIndex: 1,
        difficulty: 'Medium',
        explanation: 'Universal scientific truths and geographical facts remain in the Simple Present tense even if the reporting verb is in the past.',
        companyTag: 'Deloitte',
        testedConcept: 'Universal Truths in Indirect Speech'
      },
      {
        id: 'verb-q9',
        question: 'Select the sentence with proper use of gerund after prepositions:',
        options: [
          'He is accustomed to work late into the night.',
          'He is accustomed to working late into the night.',
          'He is accustomed for working late into the night.',
          'He is accustomed to worked late into the night.'
        ],
        correctIndex: 1,
        difficulty: 'Hard',
        explanation: 'In phrases like "accustomed to", "looking forward to", and "with a view to", "to" is a preposition, requiring a gerund ("working").',
        companyTag: 'Goldman Sachs',
        testedConcept: 'Preposition "to" + Gerund'
      },
      {
        id: 'verb-q10',
        question: 'Choose the correct sentence: "Ten miles ______ a long distance for the marathon runner to cover on foot."',
        options: [
          'are',
          'is',
          'were',
          'have been'
        ],
        correctIndex: 1,
        difficulty: 'Easy',
        explanation: 'When a plural noun of measurement, distance, time, or money is considered as a single unit or quantity, it takes a singular verb ("is").',
        companyTag: 'TCS NQT',
        testedConcept: 'Unit Measurements & Singular Verbs'
      }
    ]
  },

  // 4. ADJECTIVES
  {
    id: 'adjectives',
    partNumber: 4,
    title: 'Adjectives (Degrees of Comparison, Latin Comparatives & OSASCOMP)',
    shortName: 'Adjectives',
    tagline: 'Modifiers adding quality, quantity, dimension, and precision to nouns and pronouns.',
    notes: {
      definition: 'An adjective qualifies or describes a noun or pronoun. It specifies which one, what kind, how many, or how much. Crucial recruitment areas include comparative and superlative degrees, Latin comparatives, and absolute adjectives that admit no comparison.',
      roleInPlacements: 'Frequently tested in error detection: double comparatives ("more better"), Latin comparatives with "than" instead of "to", and confusing pairs like elder/older and little/few.',
      subtypes: [
        { name: 'Adjectives of Quality', definition: 'Describe nature, character, or quality of an entity.', examples: ['robust', 'scalable', 'diligent', 'innovative'] },
        { name: 'Adjectives of Quantity', definition: 'Indicate how much of an uncountable thing is meant.', examples: ['much', 'little', 'sufficient', 'enough'] },
        { name: 'Adjectives of Number', definition: 'Indicate countable quantities: Definite (one, two, first) and Indefinite (several, few, many).', examples: ['five modules', 'several candidates', 'first round'] },
        { name: 'Demonstrative Adjectives', definition: 'Point out which entity is referred to.', examples: ['this architecture', 'that algorithm', 'these metrics'] },
        { name: 'Comparative & Superlative', definition: 'Express higher degree between two (comparative) or among three or more (superlative).', examples: ['faster', 'more efficient', 'fastest', 'most resilient'] }
      ],
      goldenRules: [
        {
          rule: 'Latin Comparatives Take "To", NEVER "Than"',
          explanation: 'Adjectives ending in -ior derived from Latin (senior, junior, superior, inferior, prior, anterior, posterior) as well as "prefer/preferable" take "to", never "than".',
          example: 'Incorrect: "He is senior than me." | Correct: "He is senior to me."'
        },
        {
          rule: 'Absolute Adjectives Cannot Take Comparative or Superlative Modifiers',
          explanation: 'Adjectives expressing absolute states cannot be compared with "more" or "most": unique, perfect, universal, dead, round, square, chief, complete, impossible.',
          example: 'Incorrect: "This is a most unique algorithm." | Correct: "This is a unique algorithm."'
        },
        {
          rule: 'Avoid Double Comparatives and Superlatives',
          explanation: 'Do not use "more" with -er adjectives, or "most" with -est adjectives.',
          example: 'Incorrect: "This solution is more better." | Correct: "This solution is better."'
        },
        {
          rule: 'Few (Countable) vs Little (Uncountable)',
          explanation: '"Few / A few / The few" modify countable nouns. "Little / A little / The little" modify uncountable nouns. "Few/Little" means almost none (negative); "A few/A little" means some (positive).',
          example: 'Incorrect: "He has little friends in the department." | Correct: "He has few friends in the department."'
        },
        {
          rule: 'Standard Order of Multiple Adjectives (OSASCOMP)',
          explanation: 'When multiple adjectives precede a noun, sequence them: Opinion -> Size -> Age -> Shape -> Color -> Origin -> Material -> Purpose.',
          example: 'Correct: "A sleek (opinion), compact (size), new (age), Japanese (origin), digital (purpose) sensor."'
        }
      ],
      quickMemoryAids: [
        'Latin -ior + TO: Senior to, Junior to, Superior to, Prior to',
        'Countable = FEW; Uncountable = LITTLE',
        'Unique, Perfect, Complete = NO "more" or "most"'
      ]
    },
    interviewTips: {
      overview: 'Candidates frequently use double comparatives or incorrect comparative prepositions when defending their technical choices against existing frameworks.',
      commonMistakes: [
        {
          wrongSentence: 'PostgreSQL is more superior than MySQL for our complex transactional schema.',
          correctSentence: 'PostgreSQL is superior to MySQL for our complex transactional schema.',
          whyWrong: '"Superior" already denotes higher quality (no "more" needed), and Latin comparatives take "to", never "than".',
          interviewerImpression: 'Sounds grammatically careless during a technical design discussion.'
        },
        {
          wrongSentence: 'I have few experience in cloud deployment.',
          correctSentence: 'I have little experience / some experience in cloud deployment.',
          whyWrong: '"Experience" in terms of knowledge is uncountable; it requires "little", not "few". If you want to convey positive knowledge, say "some experience".',
          interviewerImpression: 'Saying "few experience" sounds clumsy and misrepresents your actual level.'
        },
        {
          wrongSentence: 'My project idea was the most unique one in the competition.',
          correctSentence: 'My project idea was unique in the competition. / ...truly distinctive.',
          whyWrong: '"Unique" means one of a kind. It is an absolute adjective and cannot take "most".',
          interviewerImpression: 'Overuse of hyperbolic "most unique" marks a candidate as prone to exaggerated claims.'
        },
        {
          wrongSentence: 'This framework is comparatively better than the older version.',
          correctSentence: 'This framework is better than the older version. / ...is comparatively good.',
          whyWrong: '"Comparatively" and "better" is a double comparative error. Use "comparatively good" or simply "better than".',
          interviewerImpression: 'Shows lack of stylistic conciseness in professional verbal speech.'
        }
      ],
      spokenDeliveryAdvice: [
        'When comparing tech stacks, use measured, professional comparative adjectives: "more scalable", "less resource-intensive", "more resilient", instead of vague words like "super cool" or "way better".',
        'Avoid comparative statements without an explicit reference: don\'t just say "My algorithm is faster"; specify "My algorithm is 35% faster than standard merge sort on partially sorted arrays."'
      ],
      kapilProTip: 'Whenever asked "Why this technology over that?", use the comparative template: "While X is [adjective], Y proved to be superior to X in [specific constraint] because..."'
    },
    mcqs: [
      {
        id: 'adj-q1',
        question: 'Identify the sentence with the correct preposition following a Latin comparative adjective:',
        options: [
          'The modern microservice architecture is superior than the legacy monolith.',
          'The modern microservice architecture is superior to the legacy monolith.',
          'The modern microservice architecture is more superior than the legacy monolith.',
          'The modern microservice architecture is superior over the legacy monolith.'
        ],
        correctIndex: 1,
        difficulty: 'Easy',
        explanation: 'Latin comparative adjectives ending in -ior (superior, inferior, senior, junior) are followed by "to", not "than".',
        companyTag: 'TCS NQT',
        testedConcept: 'Latin Comparatives with "To"'
      },
      {
        id: 'adj-q2',
        question: 'Select the grammatically sound sentence free of redundant modifiers:',
        options: [
          'The algorithm introduced a most unique method of memory allocation.',
          'The algorithm introduced a very unique method of memory allocation.',
          'The algorithm introduced a unique method of memory allocation.',
          'The algorithm introduced a more unique method of memory allocation.'
        ],
        correctIndex: 2,
        difficulty: 'Easy',
        explanation: '"Unique" is an absolute adjective that cannot be qualified by "more", "most", or "very".',
        companyTag: 'Infosys',
        testedConcept: 'Absolute Adjectives'
      },
      {
        id: 'adj-q3',
        question: 'Choose the correct option: "Although the schedule was tight, ______ developers volunteered to debug the issue."',
        options: [
          'a little',
          'a few',
          'much',
          'less'
        ],
        correctIndex: 1,
        difficulty: 'Easy',
        explanation: '"Developers" is a countable noun in plural. "A few" is used in a positive sense meaning "some developers".',
        companyTag: 'Accenture',
        testedConcept: 'Few vs Little'
      },
      {
        id: 'adj-q4',
        question: 'Identify the sentence with proper adjective order according to the OSASCOMP rule:',
        options: [
          'The team purchased a metal circular new table for the conference room.',
          'The team purchased a new circular metal table for the conference room.',
          'The team purchased a circular new metal table for the conference room.',
          'The team purchased a metal new circular table for the conference room.'
        ],
        correctIndex: 1,
        difficulty: 'Hard',
        explanation: 'OSASCOMP order: Age ("new") -> Shape ("circular") -> Material ("metal") -> Noun ("table").',
        companyTag: 'Amazon',
        testedConcept: 'Adjective Order (OSASCOMP)'
      },
      {
        id: 'adj-q5',
        question: 'Spot the sentence containing a double comparative error:',
        options: [
          'The revised query is faster than the previous version.',
          'The revised query is more faster than the previous version.',
          'The revised query is significantly faster than the previous version.',
          'The revised query is much faster than the previous version.'
        ],
        correctIndex: 1,
        difficulty: 'Easy',
        explanation: '"More faster" is a double comparative error because "-er" already indicates comparative degree.',
        companyTag: 'Wipro',
        testedConcept: 'Double Comparative Prohibition'
      },
      {
        id: 'adj-q6',
        question: 'Which sentence correctly compares two qualities of the SAME individual?',
        options: [
          'He is wiser than brave.',
          'He is more wise than brave.',
          'He is wisest than brave.',
          'He is more wiser than brave.'
        ],
        correctIndex: 1,
        difficulty: 'Hard',
        explanation: 'When comparing two different qualities of the SAME person or object, use "more + positive degree", never the -er form ("He is more wise than brave").',
        companyTag: 'Goldman Sachs',
        testedConcept: 'Comparing Two Qualities in Same Subject'
      },
      {
        id: 'adj-q7',
        question: 'Fill in the blank: "Coffee is ______ to tea for late-night coding sessions."',
        options: [
          'more preferable',
          'preferable',
          'most preferable',
          'preferabler'
        ],
        correctIndex: 1,
        difficulty: 'Medium',
        explanation: '"Preferable" already possesses comparative force and takes "to"; it is never preceded by "more" or "most".',
        companyTag: 'Deloitte',
        testedConcept: 'Preferable + To'
      },
      {
        id: 'adj-q8',
        question: 'Identify the sentence with correct use of "other" in comparative degree:',
        options: [
          'Python is more versatile than any programming language.',
          'Python is more versatile than any other programming language.',
          'Python is the most versatile than any programming language.',
          'Python is versatile than all programming language.'
        ],
        correctIndex: 1,
        difficulty: 'Medium',
        explanation: 'When comparing one member with others in the same group, "other" must be included to exclude the subject from itself ("any other programming language").',
        companyTag: 'Cognizant',
        testedConcept: 'Exclusion with "Other" in Comparisons'
      },
      {
        id: 'adj-q9',
        question: 'Choose the sentence that correctly distinguishes elder/older:',
        options: [
          'She is elder than her teammate in the engineering cohort.',
          'She is older than her teammate in the engineering cohort.',
          'She is elder to her teammate in the engineering cohort.',
          'She is more older than her teammate.'
        ],
        correctIndex: 1,
        difficulty: 'Medium',
        explanation: '"Elder" is restricted to family members and is never followed by "than". For colleagues or general comparisons, "older than" is correct.',
        companyTag: 'Capgemini',
        testedConcept: 'Elder vs Older'
      },
      {
        id: 'adj-q10',
        question: 'Spot the sentence that correctly uses "the few":',
        options: [
          'The few resources we had were utilized with maximum efficiency.',
          'Few resources we had was utilized with maximum efficiency.',
          'A few resources we had were all wasted completely.',
          'The little resources we had were utilized with efficiency.'
        ],
        correctIndex: 0,
        difficulty: 'Hard',
        explanation: '"The few" means "not many, but all of that specific group", and correctly modifies the plural countable noun "resources" with plural verb "were".',
        companyTag: 'Morgan Stanley',
        testedConcept: 'The Few + Specific Reference'
      }
    ]
  },

  // 5. ADVERBS
  {
    id: 'adverbs',
    partNumber: 5,
    title: 'Adverbs (Inversion, Negative Particles & Position of Modifiers)',
    shortName: 'Adverbs',
    tagline: 'Modifiers adding time, manner, place, degree, or condition to verbs, adjectives, or other adverbs.',
    notes: {
      definition: 'An adverb modifies a verb (He coded quickly), an adjective (very clean code), or another adverb (quite remarkably fast). It answers how, when, where, how often, or to what degree. Placement tests focus on adverb position, inversion rules, and negative adverb traps.',
      roleInPlacements: 'Correlative pairs involving negative adverbs (Hardly...when, No sooner...than) and subject-auxiliary inversion after negative adverbs are premier testing concepts across TCS NQT and Amazon tests.',
      subtypes: [
        { name: 'Adverbs of Manner', definition: 'Describe how an action occurs (usually ending in -ly).', examples: ['elegantly', 'rigorously', 'accurately', 'seamlessly'] },
        { name: 'Adverbs of Time', definition: 'Describe when an action occurs.', examples: ['yesterday', 'now', 'soon', 'already', 'recently'] },
        { name: 'Adverbs of Place', definition: 'Describe where an action occurs.', examples: ['everywhere', 'locally', 'in-memory', 'abroad'] },
        { name: 'Adverbs of Frequency', definition: 'Indicate how often an event repeats.', examples: ['seldom', 'rarely', 'frequently', 'never', 'always'] },
        { name: 'Adverbs of Degree', definition: 'Indicate intensity, quantity, or degree.', examples: ['extremely', 'quite', 'hardly', 'scarcely', 'too'] }
      ],
      goldenRules: [
        {
          rule: 'Negative Adverb at Sentence Beginning Forces Inversion',
          explanation: 'When a negative or restrictive adverb begins a clause (Hardly, Scarcely, Seldom, Rarely, Never, Little, No sooner), the auxiliary verb must precede the subject (Inversion).',
          example: 'Incorrect: "Hardly I had entered..." | Correct: "Hardly had I entered..."'
        },
        {
          rule: 'Hardly / Scarcely is Paired with "When", NEVER "Than"',
          explanation: '"Hardly" and "Scarcely" must be followed by "when" or "before", never "than".',
          example: 'Incorrect: "Hardly had the test begun than the timer reset." | Correct: "Hardly had the test begun when the timer reset."'
        },
        {
          rule: 'No Sooner is Paired with "Than", NEVER "When"',
          explanation: '"No sooner" is a comparative structure and must always be paired with "than".',
          example: 'Incorrect: "No sooner had the build deployed when the alert fired." | Correct: "No sooner had the build deployed than the alert fired."'
        },
        {
          rule: 'Standard Adverb Order: M - P - T (Manner, Place, Time)',
          explanation: 'When multiple adverbs modify the same verb, follow the order: Manner first, Place second, Time third.',
          example: 'Correct: "The developers worked diligently (Manner) in the lab (Place) yesterday (Time)."'
        },
        {
          rule: 'Avoid Double Negatives with Restrictive Adverbs',
          explanation: 'Words like hardly, scarcely, seldom, and barely already carry negative meaning. Do not use "not" with them.',
          example: 'Incorrect: "I couldn\'t hardly hear the panel." | Correct: "I could hardly hear the panel."'
        }
      ],
      quickMemoryAids: [
        'Hardly / Scarcely + WHEN',
        'No sooner + THAN',
        'Inversion: Negative Adverb + Auxiliary + Subject (e.g. "Seldom do we see...")'
      ]
    },
    interviewTips: {
      overview: 'Overusing filler adverbs ("basically", "honestly", "actually", "literally") dilutes technical authority and reveals nervousness during HR and technical panels.',
      commonMistakes: [
        {
          wrongSentence: 'Basically, honestly, my project is like an AI-driven platform...',
          correctSentence: 'Our project is an AI-driven platform designed to optimize...',
          whyWrong: '"Basically" and "honestly" are verbal crutches that weaken your declarative impact and make you sound unsure.',
          interviewerImpression: 'Filler adverbs signal lack of structured communication and lower verbal readiness scores.'
        },
        {
          wrongSentence: 'I did the data processing part very good.',
          correctSentence: 'I performed the data processing very well.',
          whyWrong: '"Good" is an adjective; "well" is the adverb of manner required to modify the verb "performed" or "did".',
          interviewerImpression: 'A blatant grammatical error that undermines claims of professional communication ability.'
        },
        {
          wrongSentence: 'No sooner I joined the call when the tech round started.',
          correctSentence: 'No sooner had I joined the call than the technical round started.',
          whyWrong: 'Requires inversion ("had I joined") and the correlative partner "than", not "when".',
          interviewerImpression: 'Demonstrates grammatical mastery when narrating sequences in behavioral rounds.'
        },
        {
          wrongSentence: 'I am too much excited to join your organization.',
          correctSentence: 'I am very excited / greatly excited to join your organization.',
          whyWrong: '"Too much" usually implies an undesirable excess and cannot modify adjectives directly.',
          interviewerImpression: 'Sounds non-native and awkward when expressing enthusiasm.'
        }
      ],
      spokenDeliveryAdvice: [
        'Strip filler adverbs: Record yourself answering "What was your biggest technical challenge?" and count your uses of "basically", "actually", and "literally". Cut them to zero.',
        'Use adverbs of precision: "consistently achieved 99.9% uptime", "rigorously benchmarked", "seamlessly integrated".'
      ],
      kapilProTip: 'Whenever you feel the urge to say "Basically...", pause for one silent second instead. Silence signals thoughtful deliberation; filler adverbs signal panic.'
    },
    mcqs: [
      {
        id: 'adv-q1',
        question: 'Identify the sentence with correct subject-auxiliary inversion following a negative adverb:',
        options: [
          'Seldom the deployment team has faced such a severe database deadlock.',
          'Seldom has the deployment team faced such a severe database deadlock.',
          'Seldom the deployment team had faced such a severe database deadlock.',
          'Seldom has faced the deployment team such a severe database deadlock.'
        ],
        correctIndex: 1,
        difficulty: 'Easy',
        explanation: 'When the negative adverb "Seldom" begins the sentence, the auxiliary verb ("has") must precede the subject ("the deployment team").',
        companyTag: 'TCS NQT',
        testedConcept: 'Negative Adverb Inversion'
      },
      {
        id: 'adv-q2',
        question: 'Choose the correct correlative conjunction and adverb pair: "No sooner ______ the pull request ______ the CI/CD pipeline triggered."',
        options: [
          'had he approved, when',
          'had he approved, than',
          'he had approved, than',
          'did he approved, then'
        ],
        correctIndex: 1,
        difficulty: 'Easy',
        explanation: '"No sooner" requires inversion ("had he approved") and is paired with "than".',
        companyTag: 'Infosys',
        testedConcept: 'No sooner... than'
      },
      {
        id: 'adv-q3',
        question: 'Spot the sentence that correctly pairs "Hardly":',
        options: [
          'Hardly had the server booted up than the memory leak occurred.',
          'Hardly had the server booted up when the memory leak occurred.',
          'Hardly the server had booted up when the memory leak occurred.',
          'Hardly had the server booted up then the memory leak occurred.'
        ],
        correctIndex: 1,
        difficulty: 'Medium',
        explanation: '"Hardly" requires inversion ("had the server booted up") and takes "when", not "than".',
        companyTag: 'Accenture',
        testedConcept: 'Hardly... when'
      },
      {
        id: 'adv-q4',
        question: 'Identify the sentence with the correct order of adverbs (M-P-T):',
        options: [
          'The interns coded in the hackathon room enthusiastically all night.',
          'The interns coded enthusiastically in the hackathon room all night.',
          'The interns coded all night in the hackathon room enthusiastically.',
          'The interns in the hackathon room coded enthusiastically all night.'
        ],
        correctIndex: 1,
        difficulty: 'Medium',
        explanation: 'Standard order is Manner ("enthusiastically"), Place ("in the hackathon room"), and Time ("all night").',
        companyTag: 'Wipro',
        testedConcept: 'Manner-Place-Time Order'
      },
      {
        id: 'adv-q5',
        question: 'Select the sentence free from a double negative:',
        options: [
          'The candidate could not scarcely hear the interviewer due to packet loss.',
          'The candidate could scarcely hear the interviewer due to packet loss.',
          'The candidate couldn\'t hardly hear the interviewer due to packet loss.',
          'The candidate could scarcely not hear the interviewer due to packet loss.'
        ],
        correctIndex: 1,
        difficulty: 'Easy',
        explanation: '"Scarcely" already has negative force. Adding "not" creates an erroneous double negative.',
        companyTag: 'Cognizant',
        testedConcept: 'Double Negative with Scarcely'
      },
      {
        id: 'adv-q6',
        question: 'Fill in the blank: "The candidate performed ______ during the live coding assessment."',
        options: [
          'good',
          'well',
          'goodly',
          'bestly'
        ],
        correctIndex: 1,
        difficulty: 'Easy',
        explanation: '"Performed" is an action verb requiring the adverb of manner "well". "Good" is an adjective.',
        companyTag: 'Capgemini',
        testedConcept: 'Good vs Well'
      },
      {
        id: 'adv-q7',
        question: 'Choose the sentence with correct placement of "only":',
        options: [
          'He only solved two algorithmic problems out of five.',
          'He solved only two algorithmic problems out of five.',
          'He solved two algorithmic problems only out of five.',
          'Only he solved two algorithmic problems out of five.'
        ],
        correctIndex: 1,
        difficulty: 'Hard',
        explanation: '"Only" should be placed immediately before the word it modifies. Here it modifies the quantity "two algorithmic problems".',
        companyTag: 'Amazon',
        testedConcept: 'Placement of "Only"'
      },
      {
        id: 'adv-q8',
        question: 'Select the sentence where "very" is used appropriately:',
        options: [
          'The team was very surprised by the sudden resignation.',
          'The team was much surprised by the sudden resignation.',
          'The team was too much surprised by the sudden resignation.',
          'The team was very much surprising by the sudden resignation.'
        ],
        correctIndex: 1,
        difficulty: 'Hard',
        explanation: 'With past participles functioning as passive adjectives ("surprised"), "much" is traditionally preferred over "very" in formal verbal grammar.',
        companyTag: 'Goldman Sachs',
        testedConcept: 'Very vs Much with Participles'
      },
      {
        id: 'adv-q9',
        question: 'Spot the sentence that correctly employs the adverb "enough":',
        options: [
          'The code is enough fast to pass the sub-second SLA check.',
          'The code is fast enough to pass the sub-second SLA check.',
          'The code is fastly enough to pass the sub-second SLA check.',
          'The code is too fast enough to pass the sub-second SLA check.'
        ],
        correctIndex: 1,
        difficulty: 'Medium',
        explanation: 'When "enough" acts as an adverb modifying an adjective, it MUST follow the adjective ("fast enough", not "enough fast").',
        companyTag: 'Deloitte',
        testedConcept: 'Position of "Enough"'
      },
      {
        id: 'adv-q10',
        question: 'Choose the grammatically accurate sentence:',
        options: [
          'Little did the team know that the client would double the transaction volume.',
          'Little the team knew that the client would double the transaction volume.',
          'Little had the team knew that the client would double the transaction volume.',
          'Little does the team knew that the client would double the transaction volume.'
        ],
        correctIndex: 0,
        difficulty: 'Medium',
        explanation: 'The negative adverb "Little" triggers inversion: Little + did (auxiliary) + the team (subject) + know (base verb).',
        companyTag: 'Morgan Stanley',
        testedConcept: 'Inversion with "Little"'
      }
    ]
  },

  // 6. PREPOSITIONS
  {
    id: 'prepositions',
    partNumber: 6,
    title: 'Prepositions (Fixed Prepositions, Directional Idioms & Redundancy)',
    shortName: 'Prepositions',
    tagline: 'Connective markers showing relationships of time, location, direction, and fixed verbal association.',
    notes: {
      definition: 'A preposition establishes spatial, temporal, or logical relationships between its noun/pronoun object and other sentence components. In placement tests, testing centers focus heavily on fixed prepositions (adhere to, comply with, abstain from) and spurious preposition redundancy (e.g. "discuss about").',
      roleInPlacements: 'Preposition errors are the single highest frequency question category in verbal ability tests across Cognizant, Wipro, and TCS.',
      subtypes: [
        { name: 'Prepositions of Time', definition: 'Specify points or durations of time.', examples: ['at (specific clock time)', 'on (days/dates)', 'in (months/years/centuries)', 'since (starting point)', 'for (duration)'] },
        { name: 'Prepositions of Place', definition: 'Indicate position or location.', examples: ['in (enclosed space)', 'at (precise point)', 'on (surface)', 'between (two entities)', 'among (three or more)'] },
        { name: 'Prepositions of Movement', definition: 'Describe direction of motion.', examples: ['into (motion towards interior)', 'onto (motion towards surface)', 'across', 'through'] },
        { name: 'Fixed Prepositions', definition: 'Idiomatic verb/adjective + preposition pairings established by usage.', examples: ['abide by', 'accused of', 'abstain from', 'comply with', 'congratulate on', 'differ with/from'] }
      ],
      goldenRules: [
        {
          rule: 'Verbs That Take NO Preposition When Used Actively',
          explanation: 'Certain transitive verbs already contain the preposition\'s meaning: discuss (not discuss about), enter (a room, not enter into), order (not order for), resemble (not resemble to), reach (not reach to), attack (not attack on).',
          example: 'Incorrect: "Let us discuss about the problem." | Correct: "Let us discuss the problem."'
        },
        {
          rule: '"Between" (Two or Mutual Bilateral) vs "Among" (Three or More)',
          explanation: '"Between" is used for two entities or distinct named individuals in mutual relationships. "Among" is used for undefined groups of three or more.',
          example: 'Incorrect: "Distribute the equity between the five co-founders." | Correct: "Distribute the equity among the five co-founders."'
        },
        {
          rule: '"Since" (Starting Point) vs "For" (Duration)',
          explanation: 'Use "since" with a fixed point in time (since Monday, since 2022) with perfect tenses. Use "for" with a duration of time (for three hours, for two years).',
          example: 'Incorrect: "I am coding for 2020." | Correct: "I have been coding since 2020."'
        },
        {
          rule: 'In (Static State) vs Into (Inward Motion)',
          explanation: '"In" denotes resting state inside an area. "Into" expresses movement from outside to inside.',
          example: 'Incorrect: "He jumped in the pool." | Correct: "He jumped into the pool."'
        },
        {
          rule: 'Fixed Preposition: Congratulate ON, Accused OF, Differ FROM',
          explanation: 'Always say "congratulate someone ON something" (never for), "accused OF" (never with), and "different FROM" (never than).',
          example: 'Incorrect: "I congratulated him for his placement." | Correct: "I congratulated him on his placement."'
        }
      ],
      quickMemoryAids: [
        'NO preposition with: Discuss, Enter, Order, Resemble, Describe',
        'Congratulate ON / Comply WITH / Abstain FROM / Accused OF',
        'Since = Point in time; For = Duration'
      ]
    },
    interviewTips: {
      overview: 'Prepositional slip-ups are rampant during interviews because of literal mother-tongue translation. Saying "discuss about" or "entered into" immediately signals informal communication habits to hiring managers.',
      commonMistakes: [
        {
          wrongSentence: 'Let us discuss about the system architecture.',
          correctSentence: 'Let us discuss the system architecture.',
          whyWrong: '"Discuss" means "talk about". Adding "about" creates unnecessary redundancy.',
          interviewerImpression: 'The single most common prepositional slip made by technical candidates.'
        },
        {
          wrongSentence: 'I entered into the interview room at 10 AM.',
          correctSentence: 'I entered the interview room at 10 AM.',
          whyWrong: '"Enter" meaning physical entry into a space takes no preposition. ("Enter into" is reserved for entering into an agreement or contract).',
          interviewerImpression: 'Shows lack of awareness regarding standard verbal conciseness.'
        },
        {
          wrongSentence: 'I want to congratulate the team for winning the trophy.',
          correctSentence: 'I want to congratulate the team on winning the trophy.',
          whyWrong: 'The fixed preposition with "congratulate" is "on", never "for".',
          interviewerImpression: 'Shows attention to idiomatic precision in workplace congratulations.'
        },
        {
          wrongSentence: 'My project approach is different than what traditional papers suggest.',
          correctSentence: 'My project approach is different from what traditional papers suggest.',
          whyWrong: 'Standard formal English pairs "different" with "from", not "than".',
          interviewerImpression: 'Subtle marker that distinguishes top-tier articulate candidates.'
        }
      ],
      spokenDeliveryAdvice: [
        'When talking about past experience: say "I have been working with React FOR two years" or "SINCE 2023" — never "I am working since two years".',
        'When referencing team alignment: say "Our team complied with the client\'s specifications" (not "complied to").'
      ],
      kapilProTip: 'In every mock or live interview, audit yourself whenever you are about to say "about". Check: Did I just say "discuss about" or "describe about"? If so, drop the "about" instantly.'
    },
    mcqs: [
      {
        id: 'prep-q1',
        question: 'Identify the sentence containing a redundant preposition error:',
        options: [
          'The development team met to discuss the microservice architecture.',
          'The development team met to discuss about the microservice architecture.',
          'The development team met to talk about the microservice architecture.',
          'The development team met to review the microservice architecture.'
        ],
        correctIndex: 1,
        difficulty: 'Easy',
        explanation: '"Discuss" means "to examine or talk about". Adding "about" creates a redundant preposition error.',
        companyTag: 'TCS NQT',
        testedConcept: 'Preposition Redundancy (Discuss)'
      },
      {
        id: 'prep-q2',
        question: 'Choose the sentence with the correct fixed preposition:',
        options: [
          'The lead engineer congratulated the interns for their outstanding deployment.',
          'The lead engineer congratulated the interns on their outstanding deployment.',
          'The lead engineer congratulated the interns with their outstanding deployment.',
          'The lead engineer congratulated the interns at their outstanding deployment.'
        ],
        correctIndex: 1,
        difficulty: 'Easy',
        explanation: 'The verb "congratulate" is idiomatically followed by "on", not "for".',
        companyTag: 'Infosys',
        testedConcept: 'Congratulate On'
      },
      {
        id: 'prep-q3',
        question: 'Select the correct option to fill in the blank: "The candidate has been developing Android applications ______ three years."',
        options: [
          'since',
          'for',
          'from',
          'during'
        ],
        correctIndex: 1,
        difficulty: 'Easy',
        explanation: '"Three years" is a duration/period of time, requiring the preposition "for".',
        companyTag: 'Accenture',
        testedConcept: 'Since vs For'
      },
      {
        id: 'prep-q4',
        question: 'Find the sentence with the correct use of "enter":',
        options: [
          'The CEO entered into the conference hall amidst loud applause.',
          'The CEO entered the conference hall amidst loud applause.',
          'The CEO entered inside the conference hall amidst loud applause.',
          'The CEO entered in the conference hall amidst loud applause.'
        ],
        correctIndex: 1,
        difficulty: 'Medium',
        explanation: 'For physical movement into a room or building, "enter" takes no preposition.',
        companyTag: 'Wipro',
        testedConcept: 'Enter (Physical Space)'
      },
      {
        id: 'prep-q5',
        question: 'Which sentence correctly uses fixed prepositions with "differ"?',
        options: [
          'My technical opinion differs with your perspective on this architecture.',
          'My technical opinion differs from your perspective on this architecture.',
          'My technical opinion differs than your perspective on this architecture.',
          'My technical opinion differs to your perspective on this architecture.'
        ],
        correctIndex: 1,
        difficulty: 'Medium',
        explanation: 'One thing differs "from" another thing in characteristics or nature. (To differ "with" a person refers to having a disagreement).',
        companyTag: 'Cognizant',
        testedConcept: 'Differ from vs Differ with'
      },
      {
        id: 'prep-q6',
        question: 'Complete the sentence: "All corporate employees must comply ______ the new GDPR privacy standards."',
        options: [
          'to',
          'by',
          'with',
          'for'
        ],
        correctIndex: 2,
        difficulty: 'Easy',
        explanation: '"Comply" is paired with "with" ("comply with regulations"). Note: "abide" takes "by" ("abide by rules").',
        companyTag: 'Capgemini',
        testedConcept: 'Comply with vs Abide by'
      },
      {
        id: 'prep-q7',
        question: 'Choose the sentence that correctly distinguishes "in" and "into":',
        options: [
          'The robotic arm lowered the silicon wafer in the chemical chamber.',
          'The robotic arm lowered the silicon wafer into the chemical chamber.',
          'The silicon wafer was resting into the chemical chamber.',
          'The robotic arm dropped into the chemical chamber in the floor.'
        ],
        correctIndex: 1,
        difficulty: 'Medium',
        explanation: '"Into" conveys movement or motion directed toward the interior of an enclosure.',
        companyTag: 'Amazon',
        testedConcept: 'In vs Into'
      },
      {
        id: 'prep-q8',
        question: 'Identify the sentence with the correct preposition: "He was accused ______ committing intellectual property theft."',
        options: [
          'for',
          'with',
          'of',
          'about'
        ],
        correctIndex: 2,
        difficulty: 'Easy',
        explanation: 'The adjective/verb "accused" takes the fixed preposition "of" ("accused of").',
        companyTag: 'Deloitte',
        testedConcept: 'Accused of'
      },
      {
        id: 'prep-q9',
        question: 'Select the sentence with the correct preposition of distribution:',
        options: [
          'The prize bounty was divided between all twelve participants in the hackathon.',
          'The prize bounty was divided among all twelve participants in the hackathon.',
          'The prize bounty was divided amidst to all twelve participants.',
          'The prize bounty was divided between each twelve participants.'
        ],
        correctIndex: 1,
        difficulty: 'Easy',
        explanation: '"Among" is used for distribution among more than two entities.',
        companyTag: 'TCS NQT',
        testedConcept: 'Between vs Among'
      },
      {
        id: 'prep-q10',
        question: 'Fill in the blank: "Candidates must abstain ______ using unauthorized devtools during the coding round."',
        options: [
          'to',
          'with',
          'from',
          'for'
        ],
        correctIndex: 2,
        difficulty: 'Medium',
        explanation: 'Verbs of restraint or avoidance (abstain, refrain, prohibit, prevent) take the fixed preposition "from".',
        companyTag: 'Goldman Sachs',
        testedConcept: 'Abstain / Refrain From'
      }
    ]
  },

  // 7. CONJUNCTIONS
  {
    id: 'conjunctions',
    partNumber: 7,
    title: 'Conjunctions (Coordinating FANBOYS, Subordination & Correlative Parallelism)',
    shortName: 'Conjunctions',
    tagline: 'Connective bridges linking words, phrases, and independent/dependent clauses with logical rigor.',
    notes: {
      definition: 'A conjunction links words, phrases, or clauses. They establish logical coordination, contrast, causality, condition, or concession. Campus exams heavily test correlative conjunction parallelism (not only...but also, either...or) and redundant conjunction pairs (although...but).',
      roleInPlacements: 'Correlative parallelism is tested in almost every high-level verbal screening exam (Amazon, Deloitte, Infosys InfyTQ).',
      subtypes: [
        { name: 'Coordinating Conjunctions (FANBOYS)', definition: 'Join grammatical equals (words, phrases, independent clauses): For, And, Nor, But, Or, Yet, So.', examples: ['clean code and fast execution', 'scalable but complex'] },
        { name: 'Subordinating Conjunctions', definition: 'Introduce dependent adverbial clauses: cause (because, since), condition (unless, if), concession (although, though), time (until, while).', examples: ['although the deadline was tight', 'unless you index the table'] },
        { name: 'Correlative Conjunctions', definition: 'Paired conjunctions requiring strictly parallel grammatical elements on both sides.', examples: ['not only... but also', 'either... or', 'neither... nor', 'both... and', 'whether... or'] }
      ],
      goldenRules: [
        {
          rule: 'Parallel Structure with Correlative Conjunctions',
          explanation: 'The grammatical structure following the first correlative element must mirror the structure following the second element (e.g. not only + verb ... but also + verb).',
          example: 'Incorrect: "He not only designed the UI, but also the backend." | Correct: "He designed not only the UI, but also the backend."'
        },
        {
          rule: '"Although / Though" is NEVER Paired with "But"',
          explanation: '"Although" and "but" both express contrast. Using both together in the same sentence is a double concession error.',
          example: 'Incorrect: "Although he worked hard, but he failed." | Correct: "Although he worked hard, he failed."'
        },
        {
          rule: '"Unless" Already Means "If Not" — Never Use "Not" with Unless',
          explanation: '"Unless" expresses negative condition. Adding "not" in the subordinate clause creates a double negative.',
          example: 'Incorrect: "Unless you do not submit on time, you will be penalized." | Correct: "Unless you submit on time, you will be penalized."'
        },
        {
          rule: '"Until" (Time) vs "Unless" (Condition)',
          explanation: '"Until" refers to a threshold in time (Wait until 5 PM). "Unless" refers to an unmet condition (Unless you study, you won\'t clear).',
          example: 'Incorrect: "I will not start until you agree." (if condition) | Correct: "I will not start unless you agree."'
        },
        {
          rule: '"Lest" is Followed by "Should" or Bare Subjunctive, NEVER "Will" or "Not"',
          explanation: '"Lest" means "for fear that" and already carries negative intention. It must be followed by "should" or a bare infinitive, never "not".',
          example: 'Incorrect: "Review the code lest bugs will occur." | Correct: "Review the code lest bugs should occur."'
        }
      ],
      quickMemoryAids: [
        'FANBOYS: For, And, Nor, But, Or, Yet, So',
        'Although... [comma or yet], NEVER Although... but',
        'Unless = Condition; Until = Time'
      ]
    },
    interviewTips: {
      overview: 'Conjunctions govern sentence rhythm and answer organization. Top candidates use subordinating conjunctions to frame nuanced trade-offs ("Although Redis offers high throughput, its in-memory footprint requires strict eviction policies").',
      commonMistakes: [
        {
          wrongSentence: 'Although I was nervous, but I managed to answer all questions.',
          correctSentence: 'Although I was nervous, I managed to answer all questions.',
          whyWrong: 'Combining "Although" with "but" is a redundant conjunction blunder.',
          interviewerImpression: 'A frequent verbal communication error that reduces candidate polish.'
        },
        {
          wrongSentence: 'He not only knows Java, but also knows Python and JavaScript.',
          correctSentence: 'He knows not only Java, but also Python and JavaScript.',
          whyWrong: 'Faulty parallelism. "Not only" precedes the noun "Java", so "but also" must directly precede the matching nouns.',
          interviewerImpression: 'Shows lack of structured sentence architecture in formal speech.'
        },
        {
          wrongSentence: 'Because the server crashed, therefore the transaction aborted.',
          correctSentence: 'Because the server crashed, the transaction aborted.',
          whyWrong: '"Because" already establishes cause. Adding "therefore" is redundant.',
          interviewerImpression: 'A classic Indian spoken English mistake in root-cause discussions.'
        },
        {
          wrongSentence: 'Unless you don\'t practice data structures, you will fail the mock.',
          correctSentence: 'Unless you practice data structures, you will fail the mock.',
          whyWrong: '"Unless" already contains the negative condition "if not". Adding "don\'t" inverts the intended meaning.',
          interviewerImpression: 'Shows logical and grammatical confusion under pressure.'
        }
      ],
      spokenDeliveryAdvice: [
        'Use signposting conjunctions to structure behavioral STAR answers: "While our initial approach reduced latency, it introduced memory overhead; consequently, we refactored..."',
        'Avoid run-on sentences joined by endless "and... and... and". Use coordinating conjunctions deliberately or break thoughts into distinct sentences.'
      ],
      kapilProTip: 'In group discussions or technical debates, disagree diplomatically using: "I appreciate that viewpoint; however, if we examine the edge cases..." It sounds far more collaborative than "But you are wrong."'
    },
    mcqs: [
      {
        id: 'conj-q1',
        question: 'Identify the sentence with flawless correlative parallelism:',
        options: [
          'The candidate not only impressed the HR panel, but also the technical director.',
          'The candidate impressed not only the HR panel, but also the technical director.',
          'Not only the candidate impressed the HR panel, but also the technical director.',
          'The candidate impressed not only the HR panel, but the technical director as well also.'
        ],
        correctIndex: 1,
        difficulty: 'Medium',
        explanation: 'In option B, "not only" precedes the noun phrase "the HR panel" and "but also" mirrors it by preceding "the technical director".',
        companyTag: 'TCS NQT',
        testedConcept: 'Correlative Parallelism'
      },
      {
        id: 'conj-q2',
        question: 'Spot the sentence containing a redundant conjunction error:',
        options: [
          'Although the deployment was delayed by two hours, the team remained calm.',
          'Although the deployment was delayed by two hours, but the team remained calm.',
          'Even though the deployment was delayed by two hours, the team remained calm.',
          'The deployment was delayed by two hours, yet the team remained calm.'
        ],
        correctIndex: 1,
        difficulty: 'Easy',
        explanation: '"Although" and "but" cannot be used together in the same sentence to express contrast.',
        companyTag: 'Infosys',
        testedConcept: 'Although... but Redundancy'
      },
      {
        id: 'conj-q3',
        question: 'Choose the correct option: "You cannot expect to clear the technical screening ______ you master core data structures."',
        options: [
          'until',
          'unless',
          'lest',
          'whether'
        ],
        correctIndex: 1,
        difficulty: 'Easy',
        explanation: '"Unless" expresses the essential condition ("if you do not master"). "Until" relates to time.',
        companyTag: 'Accenture',
        testedConcept: 'Unless vs Until'
      },
      {
        id: 'conj-q4',
        question: 'Select the grammatically accurate sentence using "lest":',
        options: [
          'Double check your SQL queries lest you will delete production records.',
          'Double check your SQL queries lest you should delete production records.',
          'Double check your SQL queries lest you should not delete production records.',
          'Double check your SQL queries lest you do not delete production records.'
        ],
        correctIndex: 1,
        difficulty: 'Medium',
        explanation: '"Lest" must be followed by "should" (or bare subjunctive) and never takes "not" or "will".',
        companyTag: 'Wipro',
        testedConcept: 'Lest... Should'
      },
      {
        id: 'conj-q5',
        question: 'Fill in the blank: "Scarcely had the candidate started presenting ______ the network connection dropped."',
        options: [
          'than',
          'when',
          'then',
          'that'
        ],
        correctIndex: 1,
        difficulty: 'Easy',
        explanation: '"Scarcely" is paired with "when", whereas "no sooner" is paired with "than".',
        companyTag: 'Cognizant',
        testedConcept: 'Scarcely... When'
      },
      {
        id: 'conj-q6',
        question: 'Identify the sentence with proper use of "both... and":',
        options: [
          'The candidate was both praised for his coding speed as well as his system design.',
          'The candidate was praised both for his coding speed and for his system design.',
          'The candidate was praised both for his coding speed and his system design also.',
          'The candidate was both praised for his coding speed and system design.'
        ],
        correctIndex: 1,
        difficulty: 'Medium',
        explanation: '"Both" must be paired with "and" (never "as well as") with parallel prepositional phrases ("both for X and for Y").',
        companyTag: 'Capgemini',
        testedConcept: 'Both... And (Not As Well As)'
      },
      {
        id: 'conj-q7',
        question: 'Choose the sentence free from double negative conjunction error:',
        options: [
          'Unless you don\'t optimize the database index, query latency will remain high.',
          'Unless you optimize the database index, query latency will remain high.',
          'Unless you won\'t optimize the database index, query latency will remain high.',
          'Until you don\'t optimize the database index, query latency will remain high.'
        ],
        correctIndex: 1,
        difficulty: 'Easy',
        explanation: '"Unless" already includes negative meaning; adding "don\'t" creates an erroneous double negative.',
        companyTag: 'Amazon',
        testedConcept: 'Unless + Positive Clause'
      },
      {
        id: 'conj-q8',
        question: 'Select the correct sentence with "so... that":',
        options: [
          'The candidate was so much nervous that he forgot the syntax.',
          'The candidate was so nervous that he forgot the syntax.',
          'The candidate was too nervous that he forgot the syntax.',
          'The candidate was very nervous that he forgot the syntax.'
        ],
        correctIndex: 1,
        difficulty: 'Medium',
        explanation: 'The correlative pair expressing degree and consequence is "so + adjective + that clause".',
        companyTag: 'Deloitte',
        testedConcept: 'So... That Construction'
      },
      {
        id: 'conj-q9',
        question: 'Spot the sentence where "while" is used to show contrast between two simultaneous facts:',
        options: [
          'While the front-end team was coding, the fire alarm rang.',
          'While monolithic architectures are simple to deploy, microservices offer superior modular scaling.',
          'Please wait outside while the panel deliberates.',
          'He listened to music while studying algorithms.'
        ],
        correctIndex: 1,
        difficulty: 'Medium',
        explanation: 'In option B, "while" functions as an adversative subordinating conjunction showing concession/contrast between two paradigms.',
        companyTag: 'Goldman Sachs',
        testedConcept: 'Subordinating Conjunction of Contrast'
      },
      {
        id: 'conj-q10',
        question: 'Complete the sentence: "Neither the team lead ______ the project manager ______ able to resolve the regression defect."',
        options: [
          'or, was',
          'nor, was',
          'nor, were',
          'or, were'
        ],
        correctIndex: 1,
        difficulty: 'Easy',
        explanation: '"Neither" is paired with "nor". The subject nearer to the verb is "the project manager" (singular), requiring the singular verb "was".',
        companyTag: 'TCS NQT',
        testedConcept: 'Neither... Nor Concord'
      }
    ]
  },

  // 8. INTERJECTIONS
  {
    id: 'interjections',
    partNumber: 8,
    title: 'Interjections (Emotive Discourse Markers & Executive Workplace Decorum)',
    shortName: 'Interjections',
    tagline: 'Grammatically independent exclamations expressing sudden emotion, stance, or conversational acknowledgement.',
    notes: {
      definition: 'An interjection is a word or short utterance that expresses sudden emotion, sentiment, or conversational reaction (e.g. surprise, pain, relief, affirmation). Unlike other parts of speech, interjections have no strict grammatical connection to the remaining sentence clauses and are set off with commas or exclamation marks.',
      roleInPlacements: 'In verbal screening and interview etiquette assessments, examiners evaluate your control over spoken interjections and conversational fillers. Professional workplace etiquette requires replacing informal colloquial interjections with polished executive discourse markers.',
      subtypes: [
        { name: 'Primary Interjections', definition: 'Single words used exclusively as exclamations.', examples: ['Ouch!', 'Wow!', 'Alas!', 'Hurrah!', 'Oops!'] },
        { name: 'Secondary Interjections', definition: 'Words that belong to other parts of speech (nouns, adjectives, adverbs) used exclamatorily.', examples: ['Good grief!', 'Heavens!', 'Indeed!', 'Brilliant!', 'Congratulations!'] },
        { name: 'Cognitive & Discourse Interjections', definition: 'Words signaling agreement, hesitation, or transitions in conversation.', examples: ['Certainly', 'Understood', 'Precisely', 'Well', 'Pardon'] },
        { name: 'Volitive Interjections', definition: 'Express imperatives or instructions directed at the listener.', examples: ['Hush!', 'Look!', 'Behold!'] }
      ],
      goldenRules: [
        {
          rule: 'Punctuation of Interjections',
          explanation: 'Strong, sudden emotions are punctuated with an exclamation mark (!). Mild emotions or introductory conversational interjections are set off with a simple comma.',
          example: 'Strong: "Alas! The entire server cluster crashed." | Mild: "Well, let us analyze the logs."'
        },
        {
          rule: 'Grammatical Autonomy',
          explanation: 'An interjection does NOT alter the grammatical agreement or number of the subject or verb in the adjoining sentence.',
          example: 'Correct: "Bravo! The team has cleared the final stage."'
        },
        {
          rule: 'Professional Corporate Substitution',
          explanation: 'Colloquial street interjections (Yeah, Nope, Huh?, Bruh, Gosh) must be replaced with professional affirmative markers: "Certainly", "Understood", "Precisely", "That is correct".',
          example: 'Unprofessional: "Yeah, I did that." | Professional: "Certainly, I implemented that module."'
        },
        {
          rule: 'Eliminate Vocalized Filler Interjections',
          explanation: 'Habitual fillers like "um", "uh", "like", and "er" act as involuntary vocal interjections that erode recruiter perception of competence.',
          example: 'Target: Replace "Um, like, the database is SQL" with "[Breath pause] The database is relational PostgreSQL."'
        }
      ],
      quickMemoryAids: [
        'Exclamation mark (!) for strong emotion; Comma (,) for mild conversational marker',
        'Replace "Yeah / Nope" with "Certainly / Absolutely / Not at this time"',
        'Pause beats filler interjections every single time'
      ]
    },
    interviewTips: {
      overview: 'How you react when an interviewer poses a hard question or challenges your logic defines your executive presence. Informal interjections ("Whoa!", "Huh?", "Geez") make you sound immature.',
      commonMistakes: [
        {
          wrongSentence: 'Saying "Yeah!" or "Nope!" when the panel asks a verification question.',
          correctSentence: 'Responding: "Yes, that is correct, sir." or "No, that was not the approach we selected."',
          whyWrong: '"Yeah" and "Nope" are informal colloquialisms unsuitable for formal corporate interviews.',
          interviewerImpression: 'Interpreted as casual, disrespectful, or lacking corporate readiness.'
        },
        {
          wrongSentence: 'Saying "Huh? Can you repeat that?" when you didn\'t hear a question.',
          correctSentence: 'Saying: "Pardon me, could you please rephrase the question?"',
          whyWrong: '"Huh?" is a dismissive, jarring interjection that breaches interview etiquette.',
          interviewerImpression: 'Leaves an immediate negative impression on senior panelists.'
        },
        {
          wrongSentence: 'Writing in professional email: "Hey! The build failed! Please check asap!!!"',
          correctSentence: 'Writing: "Hello Team, The automated deployment encountered an issue. Kindly review the attached log."',
          whyWrong: 'Overuse of exclamations and urgent conversational interjections degrades email professionalism.',
          interviewerImpression: 'Signals poor email etiquette and inability to communicate calmly under production stress.'
        },
        {
          wrongSentence: 'Using dramatic literary interjections: "Alas, my algorithm took O(N^2) time."',
          correctSentence: 'Stating analytically: "The brute-force algorithm exhibited O(N^2) time complexity; however, by using a hash map..."',
          whyWrong: 'Melodramatic archaic interjections ("Alas", "Lo") sound theatrical and out of place in technical interviews.',
          interviewerImpression: 'Sounds unnatural and unsuited for engineering problem-solving.'
        }
      ],
      spokenDeliveryAdvice: [
        'When surprised by an interviewer\'s novel constraint: Replace "Whoa!" with "That is an intriguing edge case; let me consider the memory implications."',
        'When acknowledged by the interviewer: Respond with "Thank you" or "Understood" instead of "Okay okay".'
      ],
      kapilProTip: 'During HR interviews, when the interviewer explains the company culture or job expectations, nod gently and say: "Understood, sir/ma\'am." It is the gold standard of professional corporate acknowledgement.'
    },
    mcqs: [
      {
        id: 'inter-q1',
        question: 'Identify the sentence where the interjection is punctuated correctly for mild conversational agreement:',
        options: [
          'Well! let us examine the database schema.',
          'Well, let us examine the database schema.',
          'Well; let us examine the database schema.',
          'Well? let us examine the database schema.'
        ],
        correctIndex: 1,
        difficulty: 'Easy',
        explanation: 'Mild conversational interjections that express brief thought or transition take a simple comma, not an exclamation mark.',
        companyTag: 'TCS NQT',
        testedConcept: 'Interjection Punctuation (Mild)'
      },
      {
        id: 'inter-q2',
        question: 'Which of the following represents the most professional corporate discourse response to an interviewer\'s question?',
        options: [
          'Yeah, I know how Docker containerization works.',
          'Certainly, I have hands-on experience with Docker containerization.',
          'Yup, Docker is something I did a lot.',
          'Right on! Docker is super awesome.'
        ],
        correctIndex: 1,
        difficulty: 'Easy',
        explanation: '"Certainly" is a polished, professional discourse marker that conveys confidence and workplace decorum.',
        companyTag: 'Infosys',
        testedConcept: 'Professional Discourse Markers'
      },
      {
        id: 'inter-q3',
        question: 'Identify the sentence containing an archaic interjection that should be avoided in modern technical presentations:',
        options: [
          'Unfortunately, the latency exceeded our initial threshold.',
          'Alas! The cache hit ratio dropped below 70 percent.',
          'Surprisingly, the database handled the concurrency surge smoothly.',
          'Remarkably, the garbage collection paused for less than 10 milliseconds.'
        ],
        correctIndex: 1,
        difficulty: 'Easy',
        explanation: '"Alas" is an archaic literary exclamation of grief that is inappropriate in analytical technical communication.',
        companyTag: 'Accenture',
        testedConcept: 'Archaic vs Professional Tone'
      },
      {
        id: 'inter-q4',
        question: 'Select the sentence where the secondary interjection is used correctly to convey strong corporate appreciation:',
        options: [
          'Congratulations! The entire sprint team achieved all milestone deliverables on schedule.',
          'Congratulations? The entire sprint team achieved all milestone deliverables on schedule.',
          'Congratulations; The entire sprint team achieved all milestone deliverables on schedule.',
          'Congratulations, The entire sprint team achieved all milestone deliverables on schedule!'
        ],
        correctIndex: 0,
        difficulty: 'Easy',
        explanation: '"Congratulations!" is a secondary interjection expressing joyful commendation, correctly punctuated with an exclamation mark.',
        companyTag: 'Wipro',
        testedConcept: 'Secondary Interjection Punctuation'
      },
      {
        id: 'inter-q5',
        question: 'When asked to clarify a previous statement by an interviewer, which introductory phrase is grammatically and socially optimal?',
        options: [
          'Huh? You didn\'t get my point.',
          'Pardon me; allow me to clarify that architecture decision with a quick example.',
          'What?! I explained that already.',
          'Hey, listen carefully this time.'
        ],
        correctIndex: 1,
        difficulty: 'Medium',
        explanation: '"Pardon me; allow me to clarify..." is polite, executive, and de-escalates any communication gap.',
        companyTag: 'Cognizant',
        testedConcept: 'Polite Conversational Clarification'
      },
      {
        id: 'inter-q6',
        question: 'Does an introductory interjection alter the subject-verb agreement of the sentence that follows?',
        options: [
          'Yes, it always turns the verb into plural form.',
          'Yes, it requires the verb to be in subjunctive mood.',
          'No, an interjection is grammatically independent and does not alter agreement.',
          'No, unless the interjection ends with an exclamation point.'
        ],
        correctIndex: 2,
        difficulty: 'Medium',
        explanation: 'Interjections have grammatical independence; they do not impact the person, number, or tense of the associated clause.',
        companyTag: 'Capgemini',
        testedConcept: 'Grammatical Independence of Interjections'
      },
      {
        id: 'inter-q7',
        question: 'Which of the following email salutation and interjection patterns demonstrates proper professional decorum?',
        options: [
          'Hey!! Why isn\'t the API working yet???',
          'Yo team! Quick update on the build.',
          'Dear Engineering Team, I would like to provide an update on the service status.',
          'OMG! The database went down!'
        ],
        correctIndex: 2,
        difficulty: 'Easy',
        explanation: 'Professional email communication avoids hyperbolic exclamations, multiple question marks, and colloquial street greetings.',
        companyTag: 'Deloitte',
        testedConcept: 'Written Workplace Decorum'
      },
      {
        id: 'inter-q8',
        question: 'Identify the sentence with an interjection of hesitation or pause set off appropriately:',
        options: [
          'Well, that concludes my walkthrough of the system architecture.',
          'Well! that concludes my walkthrough of the system architecture.',
          'Well? that concludes my walkthrough of the system architecture.',
          'Well-that concludes my walkthrough of the system architecture.'
        ],
        correctIndex: 0,
        difficulty: 'Easy',
        explanation: '"Well" used as a conversational transition or closing marker is followed by a comma.',
        companyTag: 'Amazon',
        testedConcept: 'Conversational Transition Markers'
      },
      {
        id: 'inter-q9',
        question: 'Choose the sentence that correctly uses an interjection expressing sudden realization:',
        options: [
          'Aha! The missing semicolon was causing the build parse failure.',
          'Aha? The missing semicolon was causing the build parse failure.',
          'Aha; The missing semicolon was causing the build parse failure.',
          'Aha- The missing semicolon was causing the build parse failure.'
        ],
        correctIndex: 0,
        difficulty: 'Easy',
        explanation: '"Aha!" represents sudden discovery or realization, correctly followed by an exclamation mark.',
        companyTag: 'TCS NQT',
        testedConcept: 'Cognitive Interjection of Discovery'
      },
      {
        id: 'inter-q10',
        question: 'What is the most effective verbal technique to replace involuntary filler interjections ("um", "like", "you know") during an interview?',
        options: [
          'Speak twice as fast so you don\'t have time to hesitate.',
          'Take a deliberate 1-2 second silent breath pause before answering.',
          'Repeat the question three times out loud.',
          'Say "basically" instead of "um".'
        ],
        correctIndex: 1,
        difficulty: 'Medium',
        explanation: 'Taking a deliberate 1-2 second silent breath pause projects composure, gives your brain time to structure thoughts, and eliminates filler interjections.',
        companyTag: 'Goldman Sachs',
        testedConcept: 'Executive Poise & Silence over Fillers'
      }
    ]
  }
];
