category: 'office|home';

export interface Task {
  id?: number;
  text: string;
  isCompleted: boolean;
  category: 'office' | 'personal' | 'other';
  dateAdded?: Date;
  dateCompleted?: Date;
  Priority: 'high' | 'medium' | 'low';
}
