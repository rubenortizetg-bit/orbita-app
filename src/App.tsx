```tsx
import React, { useState } from 'react';
import { EvaluationForm } from './components/Evaluation/EvaluationForm';
import { DashboardResults } from './components/Dashboard/DashboardResults';
import { OrbitaDiagnostic } from './types/orbita.types';

function App() {
  const [step, setStep] = useState<'welcome' | 'evaluation' | 'results'>('welcome');
  const [diagnostic, setDiagnostic] = useState<OrbitaDiagnostic | null>(null);
  const [companyName, setCompanyName] = useState('');
  const [userRole, setUserRole] = useState('');

  const handleStartEvaluation = () => {
    if (companyName && userRole) {
      setStep('evaluation');
    }
  };

  const handleCompleteEvaluation = (result: OrbitaDiagnostic) => {
    setDiagnostic(result);
    setStep('results');
  };

  const handleReset = () => {
    setStep('welcome');
    setDiagnostic(null);
    setCompanyName('');
    setUserRole('');
  };

  if (step === 'welcome') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/20">
          <div className="text-center mb-8">
            <div className="text-7xl mb-4">🪐</div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              ÓRBITA
            </h1>
            <p className="text-gray-600 mt-2 text-sm">
              El modelo sistémico para la competitividad<br />en la era de la IA
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre de tu empresa
              </label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Ej: Mi Empresa S.A."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tu rol en la organización
              </label>
              <select
                value={userRole}
                onChange={(e) => setUserRole(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="">Selecciona tu rol</option>
                <option value="CEO">CEO / Gerente General</option>
                <option value="CFO">CFO / Director Financiero</option>
                <option value="HR">Gerente de Recursos Humanos</option>
                <option value="Operations">Gerente de Operaciones</option>
                <option value="Marketing">Gerente de Marketing</option>
                <option value="Other">Otro</option>
              </select>
            </div>

            <button
              onClick={handleStartEvaluation}
              disabled={!companyName || !userRole}
              className={`w-full py-3 rounded-lg font-semibold transition-all transform ${
                companyName && userRole
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:scale-[1.02] hover:shadow-lg'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Comenzar Diagnóstico →
            </button>
          </div>

          <div className="mt-6 text-xs text-gray-400 text-center border-t border-gray-100 pt-4">
            Basado en el libro <span className="font-semibold">"ÓRBITA"</span> de Rubén Darío Ortiz Hernández
          </div>
        </div>
      </div>
    );
  }

  if (step === 'evaluation') {
    return (
      <EvaluationForm
        companyName={companyName}
        userRole={userRole}
        onComplete={handleCompleteEvaluation}
      />
    );
  }

  if (step === 'results' && diagnostic) {
    return (
      <DashboardResults
        diagnostic={diagnostic}
        onReset={handleReset}
      />
    );
  }

  return null;
}

export default App;