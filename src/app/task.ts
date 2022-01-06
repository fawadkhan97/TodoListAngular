
export interface Task {
  id?: number;
  text: string;
  isCompleted: boolean;
  category: 'office' | 'personal' | 'other';
  dateAdded?: Date;
  dateCompleted?: Date;
  priority: 'high' | 'medium' | 'low';
}
