```tsx
import React, { useState } from 'react';
import { DIMENSION_QUESTIONS, DimensionKey } from '../../data/questions.data';
import { OrbitaDiagnostic } from '../../types/orbita.types';

interface EvaluationFormProps {
  onComplete: (diagnostic: OrbitaDiagnostic) => void;
  companyName: string;
  userRole: string;
}

export const EvaluationForm: React.FC<EvaluationFormProps> = ({
  onComplete,
  companyName,
  userRole
}) => {
  const [currentDimension, setCurrentDimension] = useState<DimensionKey>('organization');
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [progress, setProgress] = useState(0);

  const dimensions = Object.keys(DIMENSION_QUESTIONS) as DimensionKey[];
  const totalQuestions = dimensions.reduce(
    (acc, dim) => acc + DIMENSION_QUESTIONS[dim].questions.length,
    0
  );

  const currentQuestions = DIMENSION_QUESTIONS[currentDimension].questions;
  const dimensionNames = {
    organization: 'Organización',
    resources: 'Recursos',
    wellbeing: 'Bienestar',
    innovation: 'Innovación',
    technology: 'Tecnología',
    adaptability: 'Adaptabilidad'
  };

  const handleAnswer = (questionId: string, value: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
    
    const answered = Object.keys(answers).length + 1;
    setProgress((answered / totalQuestions) * 100);
  };

  const calculateDimensionScore = (dimensionKey: DimensionKey): number => {
    const questions = DIMENSION_QUESTIONS[dimensionKey].questions;
    const scores = questions.map(q => answers[q.id] || 0);
    const average = scores.reduce((a, b) => a + b, 0) / scores.length;
    return Math.round((average / 10) * 100);
  };

  const getDimensionScore = (dimensionKey: DimensionKey) => {
    const questions = DIMENSION_QUESTIONS[dimensionKey].questions;
    return {
      id: dimensionKey,
      name: dimensionNames[dimensionKey],
      score: calculateDimensionScore(dimensionKey),
      questions: questions.map(q => ({
        id: q.id,
        question: q.question,
        answer: answers[q.id] || 0,
        category: q.category
      }))
    };
  };

  const handleSubmit = () => {
    const diagnostic: OrbitaDiagnostic = {
      id: `diag_${Date.now()}`,
      companyName,
      date: new Date(),
      userRole: userRole as OrbitaDiagnostic['userRole'],
      dimensions: {
        organization: getDimensionScore('organization'),
        resources: getDimensionScore('resources'),
        wellbeing: getDimensionScore('wellbeing'),
        innovation: getDimensionScore('innovation'),
        technology: getDimensionScore('technology'),
        adaptability: getDimensionScore('adaptability')
      }
    };
    onComplete(diagnostic);
  };

  const isDimensionComplete = (dimensionKey: DimensionKey): boolean => {
    const questions = DIMENSION_QUESTIONS[dimensionKey].questions;
    return questions.every(q => answers[q.id] !== undefined && answers[q.id] > 0);
  };

  const isComplete = dimensions.every(isDimensionComplete);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                🪐 Diagnóstico ÓRBITA
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                {companyName} • {userRole}
              </p>
            </div>
            <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
              {Math.round(progress)}% completado
            </span>
          </div>
          <div className="mt-3 bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Navegación por dimensiones */}
        <div className="flex flex-wrap gap-2 mb-6">
          {dimensions.map((dim) => {
            const dimData = DIMENSION_QUESTIONS[dim];
            const isComplete = isDimensionComplete(dim);
            const isActive = currentDimension === dim;
            
            return (
              <button
                key={dim}
                onClick={() => setCurrentDimension(dim)}
                className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md scale-105'
                    : isComplete
                    ? 'bg-green-100 text-green-800 hover:bg-green-200'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {dimData.icon} {dimensionNames[dim]}
                {isComplete && ' ✅'}
              </button>
            );
          })}
        </div>

        {/* Preguntas */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">{DIMENSION_QUESTIONS[currentDimension].icon}</span>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {dimensionNames[currentDimension]}
              </h2>
              <p className="text-sm text-gray-500">
                {DIMENSION_QUESTIONS[currentDimension].description}
              </p>
            </div>
          </div>

          <div className="space-y-6 mt-4">
            {currentQuestions.map((q, index) => (
              <div key={q.id} className="border-b border-gray-100 pb-5 last:border-0">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
                      {q.category}
                    </p>
                    <p className="text-gray-800 font-medium">{q.question}</p>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-4 pl-12">
                  <span className="text-xs text-gray-400">0</span>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    step="1"
                    value={answers[q.id] || 0}
                    onChange={(e) => handleAnswer(q.id, parseInt(e.target.value))}
                    className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <span className="text-xs text-gray-400">10</span>
                  <span className="text-lg font-bold text-blue-600 min-w-[35px] text-center">
                    {answers[q.id] || 0}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Botones */}
        <div className="flex justify-between mt-6">
          <button
            onClick={() => {
              const currentIndex = dimensions.indexOf(currentDimension);
              if (currentIndex > 0) {
                setCurrentDimension(dimensions[currentIndex - 1]);
              }
            }}
            className="px-6 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={dimensions.indexOf(currentDimension) === 0}
          >
            ← Anterior
          </button>
          
          {currentDimension === dimensions[dimensions.length - 1] ? (
            <button
              onClick={handleSubmit}
              disabled={!isComplete}
              className={`px-8 py-2.5 rounded-lg font-semibold transition-all ${
                isComplete
                  ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:shadow-lg hover:scale-105'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Ver Resultados 🚀
            </button>
          ) : (
            <button
              onClick={() => {
                const currentIndex = dimensions.indexOf(currentDimension);
                if (currentIndex < dimensions.length - 1) {
                  setCurrentDimension(dimensions[currentIndex + 1]);
                }
              }}
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Siguiente →
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
```