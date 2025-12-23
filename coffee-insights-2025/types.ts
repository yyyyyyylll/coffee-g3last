import { LucideIcon } from 'lucide-react';

export interface ConsumptionData {
  id: string;
  name: string;
  value2024: number; // Percentage in 2024
  value2025: number; // Percentage in 2025
  description: string;
  icon: LucideIcon;
  fill: string; // Base color for the chart
}

export interface TimelineEvent {
  id: string;
  date: string; // formatted date string e.g. "2023.02"
  brands: string[];
  title: string;
  description: string;
  priceTag: string; // The key price point e.g. "9.9元"
  isMajor: boolean; // For visual emphasis
}