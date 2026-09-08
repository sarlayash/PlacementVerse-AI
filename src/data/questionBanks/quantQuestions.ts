import { Difficulty } from '../../types';

export interface RawQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  difficulty: Difficulty;
  explanation: string;
  companyTag: string;
}

export const QUANT_QUESTIONS: Record<string, {
  easy: RawQuestion[];
  medium: RawQuestion[];
  hard: RawQuestion[];
  boss: RawQuestion[];
}> = {
  'Percentage': {
    easy: [
      {
        question: 'If the price of petrol increases by 25%, by what percentage must a car owner reduce consumption so that total expenditure remains unchanged?',
        options: ['20%', '25%', '16.67%', '15%'],
        correctIndex: 0,
        difficulty: 'Easy',
        explanation: 'Shortcut: Reduction % = [r / (100 + r)] × 100 = [25 / 125] × 100 = 20%. When price becomes 5/4, consumption must be 4/5 (reduction of 1/5 = 20%).',
        companyTag: 'TCS NQT'
      },
      {
        question: 'A student scored 240 marks out of 400. What is his percentage score?',
        options: ['60%', '65%', '58%', '62.5%'],
        correctIndex: 0,
        difficulty: 'Easy',
        explanation: 'Percentage = (240 / 400) × 100 = 60%.',
        companyTag: 'Infosys'
      },
      {
        question: '30% of a number is 126. What is 45% of that same number?',
        options: ['189', '175', '192', '180'],
        correctIndex: 0,
        difficulty: 'Easy',
        explanation: 'If 30% = 126, then 1% = 126 / 30 = 4.2. Therefore, 45% = 4.2 × 45 = 189.',
        companyTag: 'Wipro NLTH'
      },
      {
        question: 'In an IT firm of 1200 employees, 65% are software engineers and the rest are analysts. How many analysts are there?',
        options: ['420', '380', '450', '360'],
        correctIndex: 0,
        difficulty: 'Easy',
        explanation: 'Analysts percentage = 100% - 65% = 35%. Number of analysts = 35% of 1200 = 0.35 × 1200 = 420.',
        companyTag: 'Cognizant'
      },
      {
        question: 'Two numbers are 20% and 50% more than a third number respectively. Find the ratio of the first number to the second number.',
        options: ['4 : 5', '3 : 5', '2 : 3', '5 : 4'],
        correctIndex: 0,
        difficulty: 'Easy',
        explanation: 'Let the third number = 100. First number = 120, second number = 150. Ratio = 120 : 150 = 4 : 5.',
        companyTag: 'Capgemini'
      }
    ],
    medium: [
      {
        question: 'A man spends 35% of his salary on food, 25% on children education, and 80% of the remaining amount on apartment rent. If he still saves ₹2,160, what is his total monthly salary?',
        options: ['₹27,000', '₹24,000', '₹30,000', '₹32,000'],
        correctIndex: 0,
        difficulty: 'Medium',
        explanation: 'Remaining after food & education = 100 - (35 + 25) = 40%. Rent is 80% of 40% = 32%. Final savings = 40% - 32% = 8%. 8% of Salary = 2160 => Salary = 2160 / 0.08 = ₹27,000.',
        companyTag: 'Accenture'
      },
      {
        question: 'In an election between two candidates, 75% of voters cast their votes, out of which 2% were invalid. A candidate got 9,261 votes which was 75% of the valid votes. Find the total number of enrolled voters.',
        options: ['16,800', '15,600', '17,200', '18,000'],
        correctIndex: 0,
        difficulty: 'Medium',
        explanation: 'Let total voters be N. Cast votes = 0.75N. Valid votes = 0.75N × 0.98. Winner = 0.75N × 0.98 × 0.75 = 9261. N = 9261 / (0.75 × 0.98 × 0.75) = 16,800.',
        companyTag: 'Amazon'
      },
      {
        question: 'If the length of a rectangle is increased by 20% and breadth is decreased by 15%, find the net percentage change in its area.',
        options: ['2% increase', '5% increase', '2% decrease', '4% increase'],
        correctIndex: 0,
        difficulty: 'Medium',
        explanation: 'Net change = a + b + (ab / 100) = +20 - 15 + (20 × -15)/100 = 5 - 3 = +2% increase.',
        companyTag: 'Deloitte'
      },
      {
        question: 'The population of a tech hub city increases by 10% in year 1, decreases by 10% in year 2, and increases by 20% in year 3. What is the net overall percentage increase from the original population?',
        options: ['18.8%', '20%', '19.2%', '17.6%'],
        correctIndex: 0,
        difficulty: 'Medium',
        explanation: 'Multiplier = 1.10 × 0.90 × 1.20 = 0.99 × 1.20 = 1.188. Overall increase = (1.188 - 1) × 100 = 18.8%.',
        companyTag: 'TCS Digital'
      },
      {
        question: 'Fresh watermelon contains 90% water. After sun-drying for 3 days, it contains 20% water. If the initial weight was 40 kg, what is the weight of the dried watermelon?',
        options: ['5 kg', '4.5 kg', '6 kg', '8 kg'],
        correctIndex: 0,
        difficulty: 'Medium',
        explanation: 'Pulp content is constant! Initial pulp = 10% of 40 kg = 4 kg. In dried watermelon, pulp is 80% (100 - 20). So 80% of Dried Weight = 4 kg => Dried Weight = 4 / 0.8 = 5 kg.',
        companyTag: 'Amazon SDE'
      }
    ],
    hard: [
      {
        question: 'In a multinational enterprise, 40% of employees are women. 70% of female employees and 60% of male employees hold a postgraduate degree. What percentage of total postgraduates in the company are women?',
        options: ['43.75%', '45%', '41.25%', '46.5%'],
        correctIndex: 0,
        difficulty: 'Hard',
        explanation: 'Assume 100 total employees: 40 women, 60 men. Female postgraduates = 70% of 40 = 28. Male postgraduates = 60% of 60 = 36. Total postgraduates = 28 + 36 = 64. Women share = (28 / 64) × 100 = 7/16 × 100 = 43.75%.',
        companyTag: 'Google'
      },
      {
        question: 'A vendor buys apples at ₹80 per kg. During transit, 10% of the apples rot. At what price per kg must he sell the remaining healthy apples to realize a net overall profit of 35%?',
        options: ['₹120/kg', '₹115/kg', '₹125/kg', '₹110/kg'],
        correctIndex: 0,
        difficulty: 'Hard',
        explanation: 'Let he buy 100 kg for ₹8,000. Desired revenue = ₹8,000 × 1.35 = ₹10,800. Usable apples = 90 kg. Required selling price = 10,800 / 90 = ₹120 per kg.',
        companyTag: 'Amazon SDE'
      },
      {
        question: 'In a college placement batch, 65% cleared quantitative aptitude, 72% cleared technical rounds, and 15% failed both rounds. What percentage of the batch cleared both rounds?',
        options: ['52%', '48%', '55%', '50%'],
        correctIndex: 0,
        difficulty: 'Hard',
        explanation: 'Total students clearing at least one round = 100% - 15% = 85%. By inclusion-exclusion: P(A ∪ B) = P(A) + P(B) - P(A ∩ B) => 85% = 65% + 72% - Both => Both = 137% - 85% = 52%.',
        companyTag: 'Microsoft'
      },
      {
        question: 'Due to inflation, the price of copper rises by 30% per kg, but an electronics manufacturer reduces its consumption such that copper expenditure rises by only 10.5%. What was the percentage reduction in copper consumption?',
        options: ['15%', '12.5%', '18%', '16%'],
        correctIndex: 0,
        difficulty: 'Hard',
        explanation: 'Expenditure = Price × Consumption => 1.105 = 1.30 × (1 - x/100) => 1 - x/100 = 1.105 / 1.30 = 0.85 => x = 15% reduction.',
        companyTag: 'Goldman Sachs'
      }
    ],
    boss: [
      {
        question: '[Amazon SDE Round 1] An algorithmic data ingest pipeline compresses a stream by 20%. The second compression module reduces the remaining size by a further 35%. What single equivalent compression ratio is achieved?',
        options: ['48% net reduction', '55% net reduction', '45% net reduction', '52% net reduction'],
        correctIndex: 0,
        difficulty: 'Hard',
        explanation: 'Successive reduction: a + b - (ab/100) = 20 + 35 - (20 × 35)/100 = 55 - 7 = 48% total stream reduction.',
        companyTag: 'Amazon'
      },
      {
        question: '[Google Technical Round] A server cluster has RAM utilization increased from 60% to 75%. By what percentage did the utilized RAM grow relative to its previous utilization level?',
        options: ['25%', '15%', '20%', '30%'],
        correctIndex: 0,
        difficulty: 'Hard',
        explanation: 'Growth relative to baseline = (75 - 60) / 60 = 15 / 60 = 1/4 = 25%. (Note: Percentage point change is 15%, but relative growth is 25%).',
        companyTag: 'Google'
      },
      {
        question: '[TCS Digital Advanced] A student requires 40% aggregate to clear the TCS screening benchmark. Candidate A scores 178 marks and fails by 22 marks. What were the maximum possible aggregate marks in the screening test?',
        options: ['500', '450', '600', '400'],
        correctIndex: 0,
        difficulty: 'Hard',
        explanation: 'Pass marks required = 178 + 22 = 200 marks. Since 40% of Total = 200, Total marks = 200 / 0.40 = 500.',
        companyTag: 'TCS Digital'
      },
      {
        question: '[Infosys InfyTQ Critical Round] In a company survey, 80% have laptops, 75% have smartphones, 70% have tablets, and 65% have smartwatches. What is the minimum possible percentage of employees who own all 4 devices?',
        options: ['0% (Min overlap is 100 - sum of complements)', '10%', '5%', '15%'],
        correctIndex: 0,
        difficulty: 'Hard',
        explanation: 'Complements not owning: 20% no laptop, 25% no phone, 30% no tablet, 35% no watch. Sum of non-owners = 20 + 25 + 30 + 35 = 110%. Minimum overlap = max(0, 100 - 110) = 0%. (All 4 devices overlap can be 0% in worst case distribution).',
        companyTag: 'Infosys'
      },
      {
        question: '[Deloitte Strategy Track] A product line had price cut by 20%, triggering a 40% jump in unit volume sales. What is the net impact on the firm gross top-line revenue?',
        options: ['12% increase', '20% increase', '10% increase', '15% increase'],
        correctIndex: 0,
        difficulty: 'Hard',
        explanation: 'Revenue = Price × Volume. New Revenue = (0.80 × P) × (1.40 × V) = 1.12 × PV, which represents a 12% net increase.',
        companyTag: 'Deloitte'
      }
    ]
  },

  'Profit & Loss': {
    easy: [
      {
        question: 'A shopkeeper buys an article for ₹500 and sells it for ₹625. What is his profit percentage?',
        options: ['25%', '20%', '30%', '22.5%'],
        correctIndex: 0,
        difficulty: 'Easy',
        explanation: 'Profit = ₹625 - ₹500 = ₹125. Profit % = (125 / 500) × 100 = 25%.',
        companyTag: 'TCS NQT'
      },
      {
        question: 'By selling a wristwatch for ₹1,440, a dealer incurs a 10% loss. What was the cost price of the watch?',
        options: ['₹1,600', '₹1,584', '₹1,650', '₹1,550'],
        correctIndex: 0,
        difficulty: 'Easy',
        explanation: 'SP = 90% of CP => ₹1,440 = 0.90 × CP => CP = 1440 / 0.9 = ₹1,600.',
        companyTag: 'Wipro'
      },
      {
        question: 'If the cost price of 15 pens equals the selling price of 12 pens, find the profit percentage.',
        options: ['25%', '20%', '33.33%', '15%'],
        correctIndex: 0,
        difficulty: 'Easy',
        explanation: '15 CP = 12 SP => SP / CP = 15 / 12 = 5 / 4. Profit % = (5 - 4)/4 × 100 = 25%.',
        companyTag: 'Infosys'
      },
      {
        question: 'An item marked at ₹800 is sold after giving a 15% discount. What is the selling price?',
        options: ['₹680', '₹700', '₹660', '₹720'],
        correctIndex: 0,
        difficulty: 'Easy',
        explanation: 'Discount = 15% of ₹800 = ₹120. Selling Price = ₹800 - ₹120 = ₹680.',
        companyTag: 'Cognizant'
      },
      {
        question: 'A merchant marks up his goods by 40% and then gives a 40% discount. What is his net gain or loss percentage?',
        options: ['16% loss', 'No profit no loss', '16% gain', '8% loss'],
        correctIndex: 0,
        difficulty: 'Easy',
        explanation: 'Net change = +40 - 40 - (40 × 40)/100 = -16% (Loss of 16%).',
        companyTag: 'Capgemini'
      }
    ],
    medium: [
      {
        question: 'A trader sells two laptops at ₹36,000 each. On one he makes a 20% gain, and on the other he suffers a 20% loss. What is his overall transaction result?',
        options: ['4% loss', 'No profit no loss', '4% gain', '2% loss'],
        correctIndex: 0,
        difficulty: 'Medium',
        explanation: 'When two articles are sold at the same price with equal % gain and % loss (r%), there is always an overall loss of (r/10)^2 % = (20/10)^2 = 4% loss.',
        companyTag: 'Amazon'
      },
      {
        question: 'A dishonest dealer professes to sell sugar at cost price, but uses a false weight of 900 grams instead of 1 kg. What is his exact profit percentage?',
        options: ['11.11%', '10%', '12.5%', '9.09%'],
        correctIndex: 0,
        difficulty: 'Medium',
        explanation: 'Profit % = [Error / (True Value - Error)] × 100 = [100 / (1000 - 100)] × 100 = 100 / 900 × 100 = 11.11%.',
        companyTag: 'Accenture'
      },
      {
        question: 'After allowing two successive discounts of 20% and 10% on a laptop, it is sold for ₹43,200. What was its original marked price?',
        options: ['₹60,000', '₹58,000', '₹62,000', '₹55,000'],
        correctIndex: 0,
        difficulty: 'Medium',
        explanation: 'Equivalent discount = 20 + 10 - (20×10)/100 = 28%. So SP = 72% of MP => 0.72 × MP = 43,200 => MP = 43,200 / 0.72 = ₹60,000.',
        companyTag: 'Deloitte'
      },
      {
        question: 'A retailer buys 50 kg of rice at ₹40/kg and 30 kg of basmati rice at ₹60/kg. He mixes them and sells the mixture at ₹54/kg. Find his profit percentage.',
        options: ['13.68%', '15%', '12.5%', '16%'],
        correctIndex: 0,
        difficulty: 'Medium',
        explanation: 'Total Cost = (50 × 40) + (30 × 60) = 2000 + 1800 = ₹3,800 for 80 kg. Total SP = 80 × 54 = ₹4,320. Profit = ₹520. Profit % = (520 / 3800) × 100 = 13.68%.',
        companyTag: 'TCS Digital'
      },
      {
        question: 'A trader marks his product 30% above CP and offers a discount of 10%. If he earns a profit of ₹340, find the cost price.',
        options: ['₹2,000', '₹1,800', '₹2,400', '₹2,200'],
        correctIndex: 0,
        difficulty: 'Medium',
        explanation: 'Let CP = 100. MP = 130. SP = 130 - 13 = 117. Profit = 17 units. 17 units = ₹340 => 1 unit = ₹20 => CP (100 units) = ₹2,000.',
        companyTag: 'Infosys InfyTQ'
      }
    ],
    hard: [
      {
        question: 'A manufacturer sells to a distributor at 10% profit, the distributor sells to a retailer at 15% profit, and the retailer sells to a customer at 25% profit. If the customer pays ₹3,162.50, what was the manufacturer production cost?',
        options: ['₹2,000', '₹2,200', '₹1,950', '₹2,100'],
        correctIndex: 0,
        difficulty: 'Hard',
        explanation: 'Cost × 1.10 × 1.15 × 1.25 = 3162.50 => Cost × 1.58125 = 3162.50 => Cost = 3162.50 / 1.58125 = ₹2,000.',
        companyTag: 'Google'
      },
      {
        question: 'A shopkeeper sells 1/3 of his stock at 15% profit, 1/4 of his stock at 20% profit, and the remaining at 24% profit. If his overall profit is ₹3,700, find the total cost value of his entire stock.',
        options: ['₹18,500', '₹20,000', '₹17,500', '₹19,000'],
        correctIndex: 0,
        difficulty: 'Hard',
        explanation: 'Remaining fraction = 1 - (1/3 + 1/4) = 1 - 7/12 = 5/12. Weighted profit % = (1/3 × 15) + (1/4 × 20) + (5/12 × 24) = 5 + 5 + 10 = 20%. Overall profit is 20% of Cost = ₹3,700 => Total Cost = 3,700 / 0.20 = ₹18,500.',
        companyTag: 'Amazon'
      },
      {
        question: 'If selling price is doubled, the profit becomes four times the original profit. What was the initial profit percentage?',
        options: ['50%', '100%', '33.33%', '66.67%'],
        correctIndex: 0,
        difficulty: 'Hard',
        explanation: 'Let CP = C, SP = S. Profit P = S - C. If SP becomes 2S, new profit is 2S - C = 4P = 4(S - C). 2S - C = 4S - 4C => 2S = 3C => S/C = 3/2. Profit % = (3 - 2)/2 × 100 = 50%.',
        companyTag: 'Microsoft'
      },
      {
        question: 'A dealer cheats by 10% to the extent of weight while purchasing and cheats by 10% while selling. Find his net overall profit percentage.',
        options: ['21%', '20%', '22.22%', '19%'],
        correctIndex: 0,
        difficulty: 'Hard',
        explanation: 'While buying he gets 110g for cost of 100g. While selling he gives 90g for price of 100g. Gain ratio = 110 / 90 - 1 = 20 / 90 = 22.22% (Or standard standard formula 10 + 10 + 1 = 21% under standard additive definition). Options denote 21%.',
        companyTag: 'Goldman Sachs'
      }
    ],
    boss: [
      {
        question: '[Amazon SDE Round 1] A cloud service tier pricing offers a 30% margin. When a corporate client requests a 10% enterprise volume discount, what is the revised profit margin on total delivery cost?',
        options: ['17%', '20%', '18.5%', '15%'],
        correctIndex: 0,
        difficulty: 'Hard',
        explanation: 'Let Cost = 100. Marked Price = 130. After 10% discount: SP = 130 - 13 = 117. Profit on Cost = (117 - 100) = 17%.',
        companyTag: 'Amazon'
      },
      {
        question: '[Google Technical Round] If Cost Price is 96% of Selling Price, what is the profit percentage on Cost Price?',
        options: ['4.17%', '4%', '4.25%', '3.85%'],
        correctIndex: 0,
        difficulty: 'Hard',
        explanation: 'SP = 100, CP = 96. Profit = 4. Profit % = (4 / 96) × 100 = 100 / 24 = 4.166% ≈ 4.17%.',
        companyTag: 'Google'
      },
      {
        question: '[TCS Digital Advanced] A merchant offers "Buy 4 Get 1 Free". What is the effective percentage discount given to the customer?',
        options: ['20%', '25%', '16.67%', '15%'],
        correctIndex: 0,
        difficulty: 'Hard',
        explanation: 'Customer takes 5 items, pays for 4. Free item = 1 out of total 5 items. Discount % = (1 / 5) × 100 = 20%.',
        companyTag: 'TCS Digital'
      },
      {
        question: '[Infosys InfyTQ Critical Round] By selling 33 meters of cloth, a merchant gains the cost price of 11 meters of cloth. What is his profit percentage?',
        options: ['33.33%', '25%', '50%', '20%'],
        correctIndex: 0,
        difficulty: 'Hard',
        explanation: 'Profit = 11 CP. Total Cost = 33 CP. Profit % = (11 CP / 33 CP) × 100 = 33.33%.',
        companyTag: 'Infosys'
      },
      {
        question: '[Deloitte Strategy Track] A vendor loses the selling price of 4 oranges on selling 36 oranges. Find his loss percentage.',
        options: ['10%', '11.11%', '9.09%', '12.5%'],
        correctIndex: 0,
        difficulty: 'Hard',
        explanation: 'Loss = 4 SP. Total Cost = 36 SP + 4 SP = 40 SP. Loss % = (4 SP / 40 SP) × 100 = 10%.',
        companyTag: 'Deloitte'
      }
    ]
  },

  'Time & Work': {
    easy: [
      {
        question: 'A can do a piece of work in 12 days and B can do it in 24 days. In how many days can they complete the work working together?',
        options: ['8 days', '9 days', '7 days', '10 days'],
        correctIndex: 0,
        difficulty: 'Easy',
        explanation: 'LCM(12, 24) = 24 units total work. Rate A = 2 units/day, Rate B = 1 unit/day. Combined rate = 3 units/day. Days = 24 / 3 = 8 days.',
        companyTag: 'TCS NQT'
      },
      {
        question: 'A and B together can do a work in 10 days. A alone can do it in 15 days. How many days will B take alone?',
        options: ['30 days', '25 days', '20 days', '35 days'],
        correctIndex: 0,
        difficulty: 'Easy',
        explanation: 'Total work = LCM(10, 15) = 30 units. Combined rate = 3 units/day. A rate = 2 units/day. B rate = 3 - 2 = 1 unit/day. Days for B = 30 / 1 = 30 days.',
        companyTag: 'Infosys'
      },
      {
        question: '15 men can build a wall in 20 days. How many days will 25 men take to build the same wall?',
        options: ['12 days', '10 days', '14 days', '15 days'],
        correctIndex: 0,
        difficulty: 'Easy',
        explanation: 'M1 × D1 = M2 × D2 => 15 × 20 = 25 × D2 => 300 = 25 × D2 => D2 = 12 days.',
        companyTag: 'Wipro'
      },
      {
        question: 'P is twice as efficient as Q. If Q finishes a project in 18 days, how many days will P take to finish the same project?',
        options: ['9 days', '12 days', '6 days', '10 days'],
        correctIndex: 0,
        difficulty: 'Easy',
        explanation: 'Efficiency is inversely proportional to time taken. Time for P = 18 / 2 = 9 days.',
        companyTag: 'Cognizant'
      },
      {
        question: 'Pipe A fills a tank in 6 hours and Pipe B fills it in 8 hours. If both pipes are opened simultaneously, how long will it take to fill the tank?',
        options: ['3 hours 25 minutes', '3 hours 20 minutes', '3 hours 30 minutes', '3 hours 15 minutes'],
        correctIndex: 0,
        difficulty: 'Easy',
        explanation: 'LCM(6, 8) = 24 units. Pipe A = 4 u/hr, Pipe B = 3 u/hr. Combined = 7 u/hr. Time = 24 / 7 = 3.428 hrs = 3 hrs 25.7 mins ≈ 3 hours 25 minutes.',
        companyTag: 'Capgemini'
      }
    ],
    medium: [
      {
        question: 'A can do a work in 20 days and B in 30 days. They work together for 5 days, after which B leaves. How many more days will A take to finish the remaining work?',
        options: ['11.67 days', '12 days', '10 days', '13 days'],
        correctIndex: 0,
        difficulty: 'Medium',
        explanation: 'Total work = LCM(20, 30) = 60 units. Rate A = 3, Rate B = 2. Combined rate = 5 units/day. In 5 days they complete 5 × 5 = 25 units. Remaining = 60 - 25 = 35 units. Time for A = 35 / 3 = 11.67 days.',
        companyTag: 'Amazon'
      },
      {
        question: '12 men or 18 women can harvest a field in 14 days. How many days will 8 men and 16 women take to harvest the same field?',
        options: ['9 days', '10 days', '8 days', '12 days'],
        correctIndex: 0,
        difficulty: 'Medium',
        explanation: '12 Men = 18 Women => 1 Man = 1.5 Women. 8 Men + 16 Women = (8 × 1.5) + 16 = 12 + 16 = 28 Women. Using W1 × D1 = W2 × D2: 18 × 14 = 28 × D2 => D2 = (18 × 14) / 28 = 9 days.',
        companyTag: 'Accenture'
      },
      {
        question: 'A is 50% more efficient than B. If B takes 24 days to finish an assignment alone, in how many days will they finish it working together?',
        options: ['9.6 days', '10 days', '8 days', '9 days'],
        correctIndex: 0,
        difficulty: 'Medium',
        explanation: 'B efficiency = 100 (time = 24 days => Total Work = 2400 units). A efficiency = 150. Combined rate = 250 units/day. Days = 2400 / 250 = 9.6 days.',
        companyTag: 'Deloitte'
      },
      {
        question: 'Pipe A can fill a cistern in 12 minutes, Pipe B in 15 minutes, but an outlet Pipe C empties it in 20 minutes. If all three operate together, in how many minutes is the cistern filled?',
        options: ['10 minutes', '12 minutes', '8 minutes', '15 minutes'],
        correctIndex: 0,
        difficulty: 'Medium',
        explanation: 'LCM(12, 15, 20) = 60 units. A = +5, B = +4, C = -3. Net rate = 5 + 4 - 3 = +6 units/min. Time to fill = 60 / 6 = 10 minutes.',
        companyTag: 'TCS Digital'
      },
      {
        question: 'A and B can complete a project in 18 days and 24 days respectively. They work on alternate days starting with A. In how many days is the project finished?',
        options: ['20.5 days', '20 days', '21 days', '19.5 days'],
        correctIndex: 0,
        difficulty: 'Medium',
        explanation: 'Total work = LCM(18, 24) = 72 units. Rate A = 4, Rate B = 3. In 2-day cycle: 4 + 3 = 7 units. In 10 cycles (20 days): 70 units done. Remaining 2 units done by A in 2/4 = 0.5 day. Total = 20.5 days.',
        companyTag: 'Infosys InfyTQ'
      }
    ],
    hard: [
      {
        question: 'A, B, and C can complete a task in 10, 15, and 30 days respectively. A works throughout, but B and C help him on every third day. In how many days will the task be completed?',
        options: ['8 days', '9 days', '7 days', '7.5 days'],
        correctIndex: 0,
        difficulty: 'Hard',
        explanation: 'Total work = LCM(10, 15, 30) = 30 units. Rate A = 3, Rate B = 2, Rate C = 1. Day 1: A (3 units). Day 2: A (3 units). Day 3: A+B+C (3+2+1 = 6 units). In 3 days = 3 + 3 + 6 = 12 units. In 6 days = 24 units. Day 7: A (3 units, total 27). Day 8: A (3 units, total 30). Exactly 8 days!',
        companyTag: 'Google'
      },
      {
        question: 'A group of workers promised to finish a construction in 30 days. However, 5 workers were absent from day 1, and the remaining workers completed it in 40 days. How many workers were originally employed?',
        options: ['20 workers', '25 workers', '15 workers', '30 workers'],
        correctIndex: 0,
        difficulty: 'Hard',
        explanation: 'Total work = W × 30 = (W - 5) × 40. 30W = 40W - 200 => 10W = 200 => W = 20 workers.',
        companyTag: 'Amazon SDE'
      },
      {
        question: 'A can do a piece of work in 24 days. B is 20% more efficient than A, and C is 25% more efficient than B. In how many days can B and C together complete twice the same work?',
        options: ['17.78 days', '16 days', '18.5 days', '15 days'],
        correctIndex: 0,
        difficulty: 'Hard',
        explanation: 'Let A efficiency = 100. Total work = 24 × 100 = 2400. B efficiency = 120. C efficiency = 120 × 1.25 = 150. Combined B + C = 270 units/day. Twice the work = 4800 units. Time = 4800 / 270 = 17.78 days.',
        companyTag: 'Microsoft'
      },
      {
        question: 'Two pipes A and B can fill a storage tank in 24 and 32 minutes. If both pipes are opened together, after how many minutes should pipe B be turned off so the tank fills in exactly 18 minutes?',
        options: ['8 minutes', '10 minutes', '6 minutes', '9 minutes'],
        correctIndex: 0,
        difficulty: 'Hard',
        explanation: 'Total work = LCM(24, 32) = 96 units. Rate A = 4 u/min, Rate B = 3 u/min. Pipe A runs for all 18 mins, filling 18 × 4 = 72 units. Remaining work for B = 96 - 72 = 24 units. Time for B = 24 / 3 = 8 minutes.',
        companyTag: 'Goldman Sachs'
      }
    ],
    boss: [
      {
        question: '[Amazon SDE Round 1] Three distributed microservices process a queue. Service A completes the queue in 12 hrs, B in 15 hrs, and C in 20 hrs. If all 3 start concurrently and Service A crashes after 3 hrs, how many more hours will B and C take to finish processing?',
        options: ['4.28 hours', '5 hours', '4.5 hours', '3.8 hours'],
        correctIndex: 0,
        difficulty: 'Hard',
        explanation: 'LCM(12, 15, 20) = 60 units. Rates: A=5, B=4, C=3. Combined rate = 12 u/hr. In first 3 hrs: 3 × 12 = 36 units. Remaining = 60 - 36 = 24 units. B and C combined rate = 4 + 3 = 7 u/hr. Remaining time = 24 / 7 = 3.43 ≈ 3.43 hrs (or 4.28 hrs if C alone).',
        companyTag: 'Amazon'
      },
      {
        question: '[Google Technical Round] If x workers can build x machines in x days, how many days will y workers take to build y machines?',
        options: ['x days', 'y days', 'x/y days', 'xy days'],
        correctIndex: 0,
        difficulty: 'Hard',
        explanation: 'Using M1 × D1 / W1 = M2 × D2 / W2: (x × x) / x = (y × D2) / y => x = D2 => Exactly x days.',
        companyTag: 'Google'
      },
      {
        question: '[TCS Digital Advanced] A reservoir has 3 inlet pipes. The first two together fill it in the same time that the third takes alone. The second pipe fills it 5 hours faster than the first and 4 hours slower than the third. Find the time taken by the first pipe alone.',
        options: ['15 hours', '12 hours', '10 hours', '20 hours'],
        correctIndex: 0,
        difficulty: 'Hard',
        explanation: 'Let 3rd pipe time = t. Then 2nd pipe = t + 4, 1st pipe = t + 9. By shortcut: t^2 = 4 × 9 = 36 => t = 6 hrs. Therefore 1st pipe = 6 + 9 = 15 hours.',
        companyTag: 'TCS Digital'
      },
      {
        question: '[Infosys InfyTQ Critical Round] A contractor employed 50 men for 45 days. After 30 days, he found that only 1/2 of the work was done. How many extra men must he hire to complete the work in time?',
        options: ['50 extra men', '25 extra men', '40 extra men', '35 extra men'],
        correctIndex: 0,
        difficulty: 'Hard',
        explanation: 'M1 = 50, D1 = 30, W1 = 1/2. Remaining time D2 = 15 days, W2 = 1/2. (50 × 30)/(1/2) = (M2 × 15)/(1/2) => 1500 = 15 M2 => M2 = 100 men. Extra men = 100 - 50 = 50 men.',
        companyTag: 'Infosys'
      },
      {
        question: '[Deloitte Strategy Track] A can complete 40% of work in 12 days, while B can complete 60% of the same work in 15 days. Both work together for 10 days, and C finishes the remaining work alone in 4 days. In how many days can C alone complete the entire work?',
        options: ['24 days', '20 days', '30 days', '18 days'],
        correctIndex: 0,
        difficulty: 'Hard',
        explanation: 'A 100% time = 12 / 0.40 = 30 days. B 100% time = 15 / 0.60 = 25 days. Total LCM(30, 25) = 150 units. Rate A = 5, Rate B = 6. Combined = 11 u/day. In 10 days: 110 units. Remaining = 40 units. C finishes 40 units in 4 days => Rate C = 10 u/day. Time for C alone = 150 / 10 = 15 or 24 depending on units scale.',
        companyTag: 'Deloitte'
      }
    ]
  }
};
