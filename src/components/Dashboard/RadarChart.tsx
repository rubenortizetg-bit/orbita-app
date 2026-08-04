```tsx
import React, { useEffect, useRef } from 'react';

interface RadarChartProps {
  data: {
    dimension: string;
    score: number;
    icon: string;
  }[];
}

export const RadarChart: React.FC<RadarChartProps> = ({ data }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    const width = canvasRef.current.width;
    const height = canvasRef.current.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 2 - 60;
    const numAxes = data.length;
    const angleStep = (Math.PI * 2) / numAxes;

    ctx.clearRect(0, 0, width, height);

    // Dibujar ejes
    data.forEach((item, index) => {
      const angle = -Math.PI / 2 + index * angleStep;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(x, y);
      ctx.strokeStyle = '#e5e7eb';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Etiquetas
      const labelRadius = radius + 35;
      const labelX = centerX + labelRadius * Math.cos(angle);
      const labelY = centerY + labelRadius * Math.sin(angle);
      ctx.fillStyle = '#1f2937';
      ctx.font = 'bold 12px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`${item.icon} ${item.dimension}`, labelX, labelY);
    });

    // Anillos de referencia
    for (let r = 1; r <= 10; r++) {
      const ringRadius = (radius / 10) * r;
      ctx.beginPath();
      for (let i = 0; i <= numAxes; i++) {
        const angle = -Math.PI / 2 + i * angleStep;
        const x = centerX + ringRadius * Math.cos(angle);
        const y = centerY + ringRadius * Math.sin(angle);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.strokeStyle = r % 2 === 0 ? '#d1d5db' : '#f3f4f6';
      ctx.lineWidth = 1;
      ctx.stroke();
      
      // Etiquetas de porcentaje
      if (r % 2 === 0) {
        ctx.fillStyle = '#9ca3af';
        ctx.font = '9px Inter, sans-serif';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'bottom';
        ctx.fillText(`${r * 10}%`, centerX + 5, centerY - ringRadius - 2);
      }
    }

    // Área de datos
    ctx.beginPath();
    data.forEach((item, index) => {
      const angle = -Math.PI / 2 + index * angleStep;
      const scoreRadius = (item.score / 100) * radius;
      const x = centerX + scoreRadius * Math.cos(angle);
      const y = centerY + scoreRadius * Math.sin(angle);
      if (index === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.closePath();
    
    const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
    gradient.addColorStop(0, 'rgba(59, 130, 246, 0.3)');
    gradient.addColorStop(1, 'rgba(99, 102, 241, 0.1)');
    ctx.fillStyle = gradient;
    ctx.fill();
    
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Puntos
    data.forEach((item, index) => {
      const angle = -Math.PI / 2 + index * angleStep;
      const scoreRadius = (item.score / 100) * radius;
      const x = centerX + scoreRadius * Math.cos(angle);
      const y = centerY + scoreRadius * Math.sin(angle);
      
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.strokeStyle = '#3b82f6';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Valor
      ctx.fillStyle = '#1f2937';
      ctx.font = 'bold 10px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'bottom';
      ctx.fillText(`${item.score}%`, x, y - 8);
    });
  }, [data]);

  return (
    <div className="flex justify-center">
      <canvas ref={canvasRef} width={500} height={400} className="w-full max-w-[500px] h-auto" />
    </div>
  );
};
```