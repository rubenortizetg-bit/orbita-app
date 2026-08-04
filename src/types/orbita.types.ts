```typescript
export interface DimensionScore {
  id: string;
  name: string;
  score: number;
  questions: QuestionAnswer[];
}

export interface QuestionAnswer {
  id: string;
  question: string;
  answer: number;
  category: string;
}

export interface OrbitaDiagnostic {
  id: string;
  companyName: string;
  date: Date;
  userRole: 'CEO' | 'CFO' | 'HR' | 'Operations' | 'Marketing' | 'Other';
  dimensions: {
    organization: DimensionScore;
    resources: DimensionScore;
    wellbeing: DimensionScore;
    innovation: DimensionScore;
    technology: DimensionScore;
    adaptability: DimensionScore;
  };
}

export interface PriorityRecommendation {
  dimension: keyof OrbitaDiagnostic['dimensions'];
  priority: 1 | 2 | 3 | 4 | 5 | 6;
  reason: string;
  suggestedActions: string[];
}