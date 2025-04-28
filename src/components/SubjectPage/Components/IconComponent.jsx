import React from 'react';
import { iconComponents } from '../Utils/subjectUtils';
import { Book } from 'lucide-react';

export default function IconComponent({ iconName, size = 24 }) {
  const Icon = iconComponents[iconName] || Book;
  return <Icon size={size} />;
}
