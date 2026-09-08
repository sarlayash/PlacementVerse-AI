import { Difficulty } from '../../types';
import { RawQuestion } from './quantQuestions';

export const VERBAL_QUESTIONS: Record<string, {
  easy: RawQuestion[];
  medium: RawQuestion[];
  hard: RawQuestion[];
  boss: RawQuestion[];
}> = {
  'Sentence Correction': {
    easy: [
      {
        question: 'Identify the grammatically correct sentence from the choices below:',
        options: [
          'Neither the project manager nor the software engineers were informed about the deployment schedule.',
          'Neither the project manager nor the software engineers was informed about the deployment schedule.',
          'Neither the project manager or the software engineers were informed about the deployment schedule.',
          'Neither the project manager nor the software engineers has been informed about the deployment schedule.'
        ],
        correctIndex: 0,
        difficulty: 'Easy',
        explanation: 'In "neither... nor" compound subjects of differing grammatical number, the verb agrees with the closer subject ("software engineers" -> plural -> "were informed").',
        companyTag: 'TCS NQT'
      },
      {
        question: 'Choose the sentence with the correct use of "between" or "among":',
        options: [
          'The bonus pool was distributed among all five team members.',
          'The bonus pool was distributed between all five team members.',
          'The bonus pool was distributed amongst of all five team members.',
          'The bonus pool was distributed within each five team members.'
        ],
        correctIndex: 0,
        difficulty: 'Easy',
        explanation: '"Among" is used for three or more entities, whereas "between" is used for two distinct entities.',
        companyTag: 'Infosys'
      },
      {
        question: 'Spot the correct usage of the apostrophe:',
        options: [
          'The company announced its quarterly earnings report yesterday.',
          'The company announced it\'s quarterly earnings report yesterday.',
          'The company announced its\' quarterly earnings report yesterday.',
          'The company announced it quarterly earnings report yesterday.'
        ],
        correctIndex: 0,
        difficulty: 'Easy',
        explanation: '"Its" is the possessive pronoun. "It\'s" is a contraction for "it is" or "it has".',
        companyTag: 'Wipro'
      },
      {
        question: 'Select the grammatically sound sentence:',
        options: [
          'One of the candidates has submitted his documentation on time.',
          'One of the candidates have submitted his documentation on time.',
          'One of the candidate has submitted their documentation on time.',
          'One of the candidates are submitting his documentation on time.'
        ],
        correctIndex: 0,
        difficulty: 'Easy',
        explanation: 'The subject is "One", which is singular and requires the singular verb "has".',
        companyTag: 'Cognizant'
      },
      {
        question: 'Choose the correct preposition:',
        options: [
          'She has been working in this tech enterprise since 2021.',
          'She has been working in this tech enterprise for 2021.',
          'She is working in this tech enterprise from 2021.',
          'She works in this tech enterprise during 2021.'
        ],
        correctIndex: 0,
        difficulty: 'Easy',
        explanation: '"Since" is used with a specific point in time (2021) in the present perfect continuous tense.',
        companyTag: 'Capgemini'
      }
    ],
    medium: [
      {
        question: 'Identify the sentence free from dangling modifiers:',
        options: [
          'Walking through the tech park, Ananya noticed the new quantum computing lab.',
          'Walking through the tech park, the new quantum computing lab caught Ananya\'s eye.',
          'Walking through the tech park, an impression was made on Ananya by the lab.',
          'Having walked through the tech park, the building looked modern to Ananya.'
        ],
        correctIndex: 0,
        difficulty: 'Medium',
        explanation: 'The introductory participle "Walking through the tech park" must immediately precede the subject doing the walking ("Ananya"). In the other options, the modifier danglingly describes the lab or building.',
        companyTag: 'Accenture'
      },
      {
        question: 'Select the correct sentence with parallel structure:',
        options: [
          'The senior developer enjoys writing clean code, reviewing pull requests, and mentoring interns.',
          'The senior developer enjoys writing clean code, to review pull requests, and mentoring interns.',
          'The senior developer enjoys writing clean code, review pull requests, and mentoring interns.',
          'The senior developer enjoys to write clean code, reviewing pull requests, and mentors interns.'
        ],
        correctIndex: 0,
        difficulty: 'Medium',
        explanation: 'Parallelism requires matching grammatical forms: gerunds (writing, reviewing, mentoring) must be used consistently across the series.',
        companyTag: 'Amazon'
      },
      {
        question: 'Choose the correct subjunctive mood sentence:',
        options: [
          'The tech lead recommended that he be present for the sprint retrospective.',
          'The tech lead recommended that he is present for the sprint retrospective.',
          'The tech lead recommended that he was present for the sprint retrospective.',
          'The tech lead recommended that he should have been present for the sprint retrospective.'
        ],
        correctIndex: 0,
        difficulty: 'Medium',
        explanation: 'Verbs of demand or recommendation (recommend, insist, require) take the subjunctive base form ("that he be present").',
        companyTag: 'Deloitte'
      },
      {
        question: 'Which option correctly fixes the run-on sentence: "The build failed the junior engineer forgot to commit the config file."',
        options: [
          'The build failed because the junior engineer forgot to commit the config file.',
          'The build failed, the junior engineer forgot to commit the config file.',
          'The build failed however the junior engineer forgot to commit the config file.',
          'The build failed, so therefore the junior engineer forgot to commit the config file.'
        ],
        correctIndex: 0,
        difficulty: 'Medium',
        explanation: 'A subordinating conjunction ("because") correctly connects the independent clauses and repairs the run-on error.',
        companyTag: 'TCS Digital'
      },
      {
        question: 'Choose the sentence that correctly adheres to tense consistency:',
        options: [
          'By the time the CTO arrived at the conference, the keynote speaker had already concluded his talk.',
          'By the time the CTO arrived at the conference, the keynote speaker already concluded his talk.',
          'By the time the CTO had arrived at the conference, the keynote speaker had concluded his talk.',
          'By the time the CTO arrives at the conference, the keynote speaker has concluded his talk.'
        ],
        correctIndex: 0,
        difficulty: 'Medium',
        explanation: 'When two events occurred in the past, the earlier event takes past perfect ("had concluded") and the later takes simple past ("arrived").',
        companyTag: 'Infosys InfyTQ'
      }
    ],
    hard: [
      {
        question: 'Choose the sentence that correctly employs the correlative conjunction "not only... but also":',
        options: [
          'The architecture not only provides sub-millisecond latency but also ensures end-to-end data encryption.',
          'The architecture provides not only sub-millisecond latency but also ensures end-to-end data encryption.',
          'Not only the architecture provides sub-millisecond latency but also ensures data encryption.',
          'The architecture provides sub-millisecond latency not only but also ensures end-to-end data encryption.'
        ],
        correctIndex: 0,
        difficulty: 'Hard',
        explanation: 'Parallel placement: "not only [verb phrase 1] but also [verb phrase 2]" balances "provides..." with "ensures...".',
        companyTag: 'Google'
      },
      {
        question: 'Select the sentence with accurate idiom and pronoun antecedent agreement:',
        options: [
          'Every researcher must submit their abstract, accompanied by his or her laboratory findings.',
          'Every researcher must submit their abstract, accompanied by their laboratory findings.',
          'Every researchers must submit his abstract, accompanied by their laboratory findings.',
          'Every researcher must submit his or her abstract, accompanied by their laboratory findings.'
        ],
        correctIndex: 0,
        difficulty: 'Hard',
        explanation: 'In strict formal test grammar, "Every researcher" is grammatically singular and agrees with singular possessives ("his or her").',
        companyTag: 'Amazon SDE'
      },
      {
        question: 'Identify the sentence with correct punctuation in an absolute phrase:',
        options: [
          'The deployment pipeline having succeeded, the team celebrated the production release.',
          'The deployment pipeline having succeeded; the team celebrated the production release.',
          'The deployment pipeline, having succeeded the team celebrated the production release.',
          'The deployment pipeline having succeeded: the team celebrated the production release.'
        ],
        correctIndex: 0,
        difficulty: 'Hard',
        explanation: 'An absolute phrase ("The deployment pipeline having succeeded") modifies the entire clause and is set off by a comma.',
        companyTag: 'Microsoft'
      },
      {
        question: 'Which of the following sentences exhibits neither ambiguity nor faulty comparison?',
        options: [
          'Google\'s revenue model is more resilient than that of many legacy hardware companies.',
          'Google\'s revenue model is more resilient than many legacy hardware companies.',
          'Google\'s revenue model is more resilient than those of many legacy hardware companies.',
          'Google\'s revenue model is more resilient compared to legacy hardware companies.'
        ],
        correctIndex: 0,
        difficulty: 'Hard',
        explanation: 'Comparing a revenue model to companies is an illogical comparison. It must compare "model" to "that of companies".',
        companyTag: 'Goldman Sachs'
      }
    ],
    boss: [
      {
        question: '[Amazon SDE Round 1] In technical documentation reviewing: "The latency was so acute that it effected the database failover mechanism." What exact correction must be made?',
        options: ['Replace "effected" with "affected"', 'Replace "acute" with "acutely"', 'Replace "so" with "such"', 'No correction needed'],
        correctIndex: 0,
        difficulty: 'Hard',
        explanation: '"Affect" is a verb meaning to influence; "effect" is typically a noun denoting the result.',
        companyTag: 'Amazon'
      },
      {
        question: '[Google Technical Round] "Scarcely had the cluster rebooted ______ the monitoring daemon triggered an automated health check." Choose the correct connective:',
        options: ['when', 'than', 'then', 'before'],
        correctIndex: 0,
        difficulty: 'Hard',
        explanation: 'Correlative pair: "Scarcely... when" (or "Hardly... when"). "No sooner" pairs with "than".',
        companyTag: 'Google'
      },
      {
        question: '[TCS Digital Advanced] "The board comprised of seven independent technical directors." What is the grammatical defect?',
        options: ['"Comprise" means "consist of"; therefore, "comprised of" is redundant. It should be "comprised seven" or "was composed of".', 'The verb should be "comprises" in present tense', '"Independent" should be an adverb', 'Direct should be in plural genitive form'],
        correctIndex: 0,
        difficulty: 'Hard',
        explanation: 'The whole comprises the parts ("The board comprises seven directors"), or the whole is composed of the parts.',
        companyTag: 'TCS Digital'
      },
      {
        question: '[Infosys InfyTQ Critical Round] Identify the sentence that correctly distinguishes between "uninterested" and "disinterested":',
        options: [
          'A disinterested judge ensures impartiality, while an uninterested juror is simply bored and disengaged.',
          'A disinterested juror pays zero attention to witness testimony.',
          'An uninterested referee never favors either team.',
          'Disinterested and uninterested are exact interchangeable synonyms.'
        ],
        correctIndex: 0,
        difficulty: 'Hard',
        explanation: '"Disinterested" means neutral/unbiased. "Uninterested" means lacking interest/bored.',
        companyTag: 'Infosys'
      },
      {
        question: '[Deloitte Strategy Track] "If I was the Chief Information Security Officer, I would revoke external administrative credentials immediately." What mood error is present?',
        options: ['Subjunctive mood error: "If I were the CISO" is required for hypothetical/contrary-to-fact conditions.', 'Tense error: "would revoke" should be "will revoke"', 'Word order error: "external" should follow credentials', 'No error'],
        correctIndex: 0,
        difficulty: 'Hard',
        explanation: 'Contrary-to-fact conditional clauses require the subjunctive "were" regardless of singular subject ("If I were").',
        companyTag: 'Deloitte'
      }
    ]
  }
};
