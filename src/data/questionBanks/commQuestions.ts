import { Difficulty } from '../../types';
import { RawQuestion } from './quantQuestions';

export const COMM_QUESTIONS: Record<string, {
  easy: RawQuestion[];
  medium: RawQuestion[];
  hard: RawQuestion[];
  boss: RawQuestion[];
}> = {
  'Email Writing': {
    easy: [
      {
        question: 'What is the most professional subject line when requesting approval for software licenses from your manager?',
        options: [
          '[For Approval] Q3 Developer Software License Budget - Team Cloud',
          'Urgent please approve licenses asap!!',
          'Hey manager check this out',
          'License request'
        ],
        correctIndex: 0,
        difficulty: 'Easy',
        explanation: 'Professional subject lines follow the Action Tag + Topic + Team convention: "[For Approval] Q3 Developer Software License Budget - Team Cloud", which allows instant email triage.',
        companyTag: 'Deloitte'
      },
      {
        question: 'When should the "BCC" (Blind Carbon Copy) field be used in professional corporate email communication?',
        options: [
          'When sending a company-wide announcement to preserve privacy of hundreds of recipient email addresses',
          'To secretly criticize a colleague without them knowing',
          'For all standard daily team updates',
          'When requesting urgent approval from your direct supervisor'
        ],
        correctIndex: 0,
        difficulty: 'Easy',
        explanation: 'BCC protects personal contact details and prevents accidental "Reply All" storms when emailing large recipient lists.',
        companyTag: 'Accenture'
      },
      {
        question: 'Which sign-off is standard and appropriate for professional correspondence with client executives?',
        options: [
          'Best regards, / Sincerely,',
          'Cheers mate,',
          'Later,',
          'Thx bye,'
        ],
        correctIndex: 0,
        difficulty: 'Easy',
        explanation: '"Best regards," or "Sincerely," maintains corporate decorum and respectful distance in formal business correspondence.',
        companyTag: 'TCS'
      },
      {
        question: 'In the 7 Cs of Business Communication, what does "Concise" mean?',
        options: [
          'Communicating what is necessary in the fewest possible words without sacrificing clarity',
          'Using abbreviations and text slang',
          'Writing in bullet points exclusively with no sentences',
          'Leaving out important technical background details'
        ],
        correctIndex: 0,
        difficulty: 'Easy',
        explanation: 'Concisiveness means eliminating filler words and redundant phrasing while retaining all essential facts.',
        companyTag: 'Infosys'
      },
      {
        question: 'What should you do before hitting "Send" on an important client email?',
        options: [
          'Proofread for recipient names, attachment verification, and tone neutrality',
          'Immediately click Send to save seconds',
          'CC your entire department',
          'Mark high priority on every routine message'
        ],
        correctIndex: 0,
        difficulty: 'Easy',
        explanation: 'Reviewing attachments, names, and tone avoids embarrassing errata and security oversights.',
        companyTag: 'Wipro'
      }
    ],
    medium: [
      {
        question: 'Your engineering sprint is delayed by 3 days due to an upstream API outage. How should you frame this in a proactive update email to your client?',
        options: [
          'Acknowledge the impact objectively, specify root-cause mitigations underway, and present a revised committed delivery timestamp',
          'Blame the third-party API vendor defensively in capital letters',
          'Wait until 1 hour before the original deadline to mention the slip',
          'Ship broken untested code to meet the calendar date at all costs'
        ],
        correctIndex: 0,
        difficulty: 'Medium',
        explanation: 'Executive stakeholders value early transparency, objective impact assessments, and actionable mitigation plans.',
        companyTag: 'Amazon'
      },
      {
        question: 'Which of the following sentences best embodies "constructive assertiveness" in an email regarding unfulfilled team deliverables?',
        options: [
          '"To meet our Friday sprint release, please deliver the remaining API documentation by Thursday 2:00 PM."',
          '"You are always late and you are ruining our sprint schedule."',
          '"Maybe if you have free time consider checking the documentation."',
          '"I will complain to the VP if this is not done immediately."'
        ],
        correctIndex: 0,
        difficulty: 'Medium',
        explanation: 'Constructive assertiveness states clear business rationale, specific action required, and a definite deadline without personal hostility.',
        companyTag: 'Google'
      },
      {
        question: 'When is it appropriate to utilize "Reply All" in an enterprise email thread?',
        options: [
          'Only when every person on the thread genuinely requires the information to execute their role',
          'To acknowledge every "Thank you" note to 50 people',
          'To prove to leadership that you answered faster than others',
          'Whenever you are included in the CC line'
        ],
        correctIndex: 0,
        difficulty: 'Medium',
        explanation: 'Reply All should be reserved strictly for substantive updates necessary for all stakeholders.',
        companyTag: 'Microsoft'
      },
      {
        question: 'Which phrasing best converts a negative statement into a customer-centric positive tone: "We cannot process your cloud refund because your account is unverified"?',
        options: [
          '"To help us process your cloud refund as quickly as possible, please verify your account credentials via the link below."',
          '"Your account is invalid so no refund can ever happen."',
          '"You forgot to verify your account so wait 3 weeks."',
          '"Company policy strictly forbids helping unverified users."'
        ],
        correctIndex: 0,
        difficulty: 'Medium',
        explanation: 'Framing around the customer goal and next actionable step turns resistance into helpful collaboration.',
        companyTag: 'Deloitte'
      },
      {
        question: 'What is the risk of utilizing sarcasm or excessive colloquialisms in asynchronous written team communications?',
        options: [
          'Written communication lacks vocal intonation and facial cues, leading to high probability of misinterpretation',
          'It increases corporate firewall flags',
          'It increases file size in cloud email storage',
          'It violates basic SMTP email transfer protocol'
        ],
        correctIndex: 0,
        difficulty: 'Medium',
        explanation: 'Without vocal inflections or body language, sarcasm often reads as hostile or dismissive.',
        companyTag: 'Cognizant'
      }
    ],
    hard: [
      {
        question: 'You receive an emotionally charged, accusatory email from a cross-functional manager criticizing your team test coverage. What is the optimal executive communication strategy?',
        options: [
          'Pause emotional reaction, summarize their core business concern factually, propose a short sync call, and document objective test metrics calmly',
          'Reply instantly pointing out multiple spelling errors and past mistakes of their team',
          'Forward the email to HR and the CEO requesting disciplinary inquiry immediately',
          'Ignore the email entirely and delete the thread'
        ],
        correctIndex: 0,
        difficulty: 'Hard',
        explanation: 'High emotional quotient (EQ) de-escalates written conflict by addressing root business risks and migrating contentious debates to voice/video.',
        companyTag: 'Google'
      },
      {
        question: 'In Minto Pyramid Principle communication: What should appear in the very first sentence of an executive summary memo to the Chief Technology Officer?',
        options: [
          'The core recommendation / key takeaway (Governing Thought)',
          'Detailed historical background from 5 years ago',
          'A table of all 24 hardware vendor names reviewed',
          'Apologies for the document length'
        ],
        correctIndex: 0,
        difficulty: 'Hard',
        explanation: 'The Minto Pyramid Principle dictates "Answer First" (top-down communication) where the primary conclusion precedes supporting data.',
        companyTag: 'McKinsey'
      },
      {
        question: 'Which formatting design yields the highest readability when presenting three competing cloud vendor proposals via email to leadership?',
        options: [
          'A crisp comparison matrix highlighting Cost, SLA Guarantee, Migration Risk, and Final Recommendation in bullet points',
          'A single dense 600-word paragraph with no line breaks',
          'Sending 3 separate uncoordinated emails across 3 days',
          'Attaching a 40-page raw PDF without any email body text'
        ],
        correctIndex: 0,
        difficulty: 'Hard',
        explanation: 'A comparison matrix allows decision-makers to evaluate trade-offs in seconds.',
        companyTag: 'Amazon SDE'
      },
      {
        question: 'Under international cross-cultural communication protocols, what should you avoid when writing emails to offshore global engineering teams?',
        options: [
          'Culture-specific sports idioms ("ballpark figure", "touch base on third down") and ambiguous date notations (e.g. 04/05/26)',
          'Using bullet points for technical steps',
          'Writing clear unambiguous action items',
          'Specifying UTC or time zone offsets'
        ],
        correctIndex: 0,
        difficulty: 'Hard',
        explanation: 'Idioms and localized date formats cause confusion across international and non-native English engineering hubs.',
        companyTag: 'Goldman Sachs'
      }
    ],
    boss: [
      {
        question: '[Amazon SDE Round 1] In Amazon famous "Six-Page Narrative" culture, what traditional corporate presentation method is banned in favor of structured written memos?',
        options: ['PowerPoint slide decks with fragmented bullet points', 'Architecture block diagrams', 'Financial spreadsheet tables', 'Customer quote excerpts'],
        correctIndex: 0,
        difficulty: 'Hard',
        explanation: 'Jeff Bezos instituted the 6-page narrative format because structured prose forces deep conceptual clarity over flashy PowerPoint slides.',
        companyTag: 'Amazon'
      },
      {
        question: '[Google Technical Round] An engineer writes: "The system is fast enough for now." How should this be rewritten to conform to Google technical communication standards?',
        options: ['"The system achieves 99th-percentile (p99) latency of 14ms under a peak load of 25,000 queries per second."', '"The system runs at warp speed."', '"The system has adequate throughput."', '"Nobody complained during smoke testing."'],
        correctIndex: 0,
        difficulty: 'Hard',
        explanation: 'Engineering precision mandates quantified metrics (p99 latency, exact QPS load) instead of subjective qualitative adjectives.',
        companyTag: 'Google'
      },
      {
        question: '[TCS Digital Advanced] In a critical SLA escalation email, which element represents a legally binding commitment that should only be made with prior executive clearance?',
        options: ['Financial penalty compensation / contractual waiver guarantees', 'Acknowledging receipt of ticket', 'Providing a status update timestamp', 'Sharing system telemetry graphs'],
        correctIndex: 0,
        difficulty: 'Hard',
        explanation: 'Engineers must never offer monetary credits or legal concessions without formal commercial contracts approval.',
        companyTag: 'TCS Digital'
      },
      {
        question: '[Infosys InfyTQ Critical Round] What is the "Rule of Three" in executive oral and written communication?',
        options: ['The human brain recognizes patterns and retains ideas best when grouped in sets of three', 'Never send an email longer than 3 lines', 'Always CC at least 3 managers', 'Wait 3 hours before answering client inquiries'],
        correctIndex: 0,
        difficulty: 'Hard',
        explanation: 'The Rule of Three is a classical rhetorical principle showing that triads of arguments or examples are most memorable and persuasive.',
        companyTag: 'Infosys'
      },
      {
        question: '[Deloitte Strategy Track] When communicating adverse audit findings to a client C-Suite, what technique ensures the relationship remains collaborative rather than adversarial?',
        options: ['"Sandwich Technique" or "Solution-First Framing": Frame findings around enterprise value creation, risk mitigation, and actionable roadmap', 'Downplay all security vulnerabilities to avoid causing alarm', 'Publicly reprimand the client staff in front of their CEO', 'Send an anonymous leak to industry regulators'],
        correctIndex: 0,
        difficulty: 'Hard',
        explanation: 'Elite management consulting frames vulnerabilities as growth opportunities tied to concrete risk reduction.',
        companyTag: 'Deloitte'
      }
    ]
  }
};
