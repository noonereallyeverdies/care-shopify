import { LucideIcon } from 'lucide-react';

export interface StepConfig {
  id: number;
  title: string;
  icon: LucideIcon;
  color: string;
  mobileText: string;
  desktopText: string;
}

export const ScienceStep = ({ step, isActive }: { step: StepConfig; isActive: boolean }) => {
  const Icon = step.icon;
  
  return (
    <div className={`mb-6 border-l-4 pl-6 ${isActive ? `border-${step.color}` : 'border-gray-200'} transition-colors duration-300`}>
      <div className="flex items-center mb-2">
        <div className={`flex items-center justify-center w-10 h-10 rounded-full mr-4 bg-${step.color}/10 text-${step.color}`}>
          <Icon className="w-5 h-5" />
        </div>
        <h3 className="text-xl font-medium">{step.title}</h3>
      </div>
      <p className="text-gray-600">{step.desktopText}</p>
    </div>
  );
};