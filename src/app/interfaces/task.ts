
export interface Task {
  id?: number;
  text: string;
  isCompleted: boolean;
  category: 'office' | 'personal' | 'other';
  dateAdded?: any;
  dateCompleted?: Date;
  dateModified?: String|null;
  priority: 'high' | 'medium' | 'low';
}
