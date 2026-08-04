import React, { useState } from 'react';
import { OrbitaDiagnostic, PriorityRecommendation } from '../../types/orbita.types';
import { RadarChart } from './RadarChart';

interface DashboardResultsProps {
  diagnostic: OrbitaDiagnostic;
  onReset: () => void;
}

export const DashboardResults: React.FC<DashboardResultsProps> = ({
  diagnostic,
  onReset
}) => {
  const [showActions, setShowActions] = useState<string | null>(null);

  const dimensionConfig = {
    organization: { name: 'Organización', icon: '🏛️', color: '#3b82f6' },
    resources: { name: 'Recursos', icon: '💰', color: '#10b981' },
    wellbeing: { name: 'Bienestar', icon: '❤️', color: '#ef4444' },
    innovation: { name: 'Innovación', icon: '💡', color: '#f59e0b' },
    technology: { name: 'Tecnología', icon: '🤖', color: '#8b5cf6' },
    adaptability: { name: 'Adaptabilidad', icon: '🔄', color: '#ec4899' }
  };

  const chartData = Object.entries(diagnostic.dimensions).map(([key, value]) => ({
    dimension: dimensionConfig[key as keyof typeof dimensionConfig].name,
    score: value.score,
    icon: dimensionConfig[key as keyof typeof dimensionConfig].icon
  }));

  const getPriorities = (): PriorityRecommendation[] => {
    const sorted = Object.entries(diagnostic.dimensions)
      .sort(([, a], [, b]) => a.score - b.score)
      .map(([key, value], index) => ({
        dimension: key as keyof typeof diagnostic.dimensions,
        priority: (index + 1) as 1 | 2 | 3 | 4 | 5 | 6,
        reason: getReasonForPriority(key as keyof typeof diagnostic.dimensions),
        suggestedActions: getSuggestedActions(key as keyof typeof diagnostic.dimensions)
      }));
    return sorted;
  };

  const getReasonForPriority = (dimension: string): string => {
    const reasons: Record<string, string> = {
      organization: 'La estructura y cultura son la base del sistema. Sin una organización ágil, la tecnología y la innovación no pueden prosperar.',
      resources: 'Los recursos son el combustible. Si faltan talento, datos o capital, las otras dimensiones no pueden operar al máximo.',
      wellbeing: 'El bienestar es el combustible humano. Sin equipos comprometidos y saludables, la productividad y la innovación se resienten.',
      innovation: 'La innovación es el motor del crecimiento. Sin nuevas ideas y su implementación, la organización se estanca.',
      technology: 'La tecnología es el habilitador. Sin ella, la organización no puede competir en la era digital.',
      adaptability: 'La adaptabilidad lo gobierna todo. Sin ella, la organización no puede sostenerse en el tiempo.'
    };
    return reasons[dimension] || 'Dimensión clave para la competitividad sistémica.';
  };

  const getSuggestedActions = (dimension: string): string[] => {
    const actions: Record<string, string[]> = {
      organization: [
        'Rediseñar la estructura para reducir niveles jerárquicos y agilizar decisiones',
        'Implementar equipos autónomos y multifuncionales por producto o cliente',
        'Definir y comunicar un propósito claro que alinee a toda la organización',
        'Crear un comité de transformación cultural con representación de todas las áreas',
        'Establecer métricas de cultura y clima organizacional con seguimiento trimestral'
      ],
      resources: [
        'Realizar un análisis de brechas de talento y diseñar un plan de reskilling',
        'Invertir en infraestructura digital (conectividad, datos, plataformas)',
        'Crear un plan de gestión de datos para mejorar su calidad y acceso',
        'Fortalecer alianzas estratégicas con proveedores y socios tecnológicos',
        'Revisar la asignación de capital para priorizar la transformación digital'
      ],
      wellbeing: [
        'Implementar encuestas de clima y bienestar con periodicidad trimestral',
        'Diseñar programas de flexibilidad laboral y equilibrio vida-trabajo',
        'Crear planes de desarrollo individuales para cada colaborador',
        'Fomentar espacios de conexión humana y seguridad psicológica',
        'Reconocer y celebrar los logros y aprendizajes del equipo'
      ],
      innovation: [
        'Crear un laboratorio de innovación con presupuesto y tiempo dedicado',
        'Implementar un proceso sistemático de generación y selección de ideas',
        'Invertir en I+D con un porcentaje mínimo del presupuesto anual',
        'Fomentar la diversidad de perspectivas en los equipos de innovación',
        'Establecer métricas de innovación (ingresos de nuevos productos, etc.)'
      ],
      technology: [
        'Definir un roadmap de transformación digital alineado con la estrategia',
        'Capacitar al equipo en alfabetización en datos e IA',
        'Implementar un piloto de IA para resolver un problema crítico de negocio',
        'Fortalecer la ciberseguridad y la gobernanza de datos',
        'Evaluar la infraestructura tecnológica actual y planificar su evolución'
      ],
      adaptability: [
        'Crear un equipo de inteligencia estratégica para monitorear tendencias',
        'Implementar planeación de escenarios para preparar múltiples futuros',
        'Desarrollar una cultura de aprendizaje continuo y experimentación',
        'Crear reservas financieras y flexibilidad para reasignar recursos',
        'Establecer tiempos de respuesta objetivo para cambios en el entorno'
      ]
    };
    return actions[dimension] || [];
  };

  const priorities = getPriorities();

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              🪐 Resultados del Diagnóstico
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              {diagnostic.companyName} • {diagnostic.userRole}
            </p>
            <p className="text-xs text-gray-400">
              {new Date(diagnostic.date).toLocaleDateString('es-ES', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </p>
          </div>
          <button
            onClick={onReset}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm font-medium"
          >
            Nueva Evaluación
          </button>
        </div>

        {/* Grid principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Radar Chart */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Visión Sistémica</h2>
            <RadarChart data={chartData} />
            
            {/* Puntuaciones */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
              {Object.entries(diagnostic.dimensions).map(([key, value]) => {
                const config = dimensionConfig[key as keyof typeof dimensionConfig];
                const scoreColor = value.score >= 70 ? 'text-green-600' :
                                  value.score >= 50 ? 'text-yellow-600' :
                                  'text-red-600';
                return (
                  <div key={key} className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-2xl">{config.icon}</div>
                    <p className="text-xs text-gray-600 mt-1">{config.name}</p>
                    <p className={`text-2xl font-bold ${scoreColor}`}>{value.score}%</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Prioridades */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">🎯 Prioridades</h2>
            <p className="text-xs text-gray-500 mb-4">
              Basado en el diagnóstico, estas son las dimensiones que requieren atención inmediata.
            </p>
            
            <div className="space-y-4">
              {priorities.slice(0, 3).map((item, index) => {
                const config = dimensionConfig[item.dimension];
                const score = diagnostic.dimensions[item.dimension].score;
                const colors = ['border-red-500', 'border-yellow-500', 'border-blue-500'];
                const bgColors = ['bg-red-50', 'bg-yellow-50', 'bg-blue-50'];
                const textColors = ['text-red-700', 'text-yellow-700', 'text-blue-700'];
                
                return (
                  <div key={item.dimension} className={`border-l-4 ${colors[index]} pl-4 ${bgColors[index]} p-3 rounded-r-lg`}>
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{config.icon}</span>
                      <span className="font-semibold text-gray-800">{config.name}</span>
                      <span className={`ml-auto text-xs font-medium ${textColors[index]} px-2 py-0.5 rounded-full bg-white`}>
                        {item.priority === 1 ? 'Urgente' : item.priority === 2 ? 'Importante' : 'Estratégico'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{score}%</p>
                    <p className="text-xs text-gray-500 mt-1">{item.reason}</p>
                    
                    <button
                      onClick={() => setShowActions(showActions === item.dimension ? null : item.dimension)}
                      className="mt-2 text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
                    >
                      {showActions === item.dimension ? 'Ocultar acciones' : 'Ver acciones sugeridas'}
                    </button>
                    
                    {showActions === item.dimension && (
                      <ul className="mt-2 space-y-1 list-disc list-inside text-xs text-gray-600">
                        {item.suggestedActions.slice(0, 3).map((action, i) => (
                          <li key={i}>{action}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>

            <button className="mt-6 w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all hover:scale-[1.02]">
              📋 Generar Plan de Acción
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};