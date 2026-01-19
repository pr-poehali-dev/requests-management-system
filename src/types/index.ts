export type UserRole = 'admin' | 'manager' | 'executor';

export type Request = {
  id: string;
  title: string;
  status: 'new' | 'in_progress' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  objectId: string;
  createdAt: string;
  assignedTo: string;
};

export type Task = {
  id: string;
  title: string;
  status: 'backlog' | 'todo' | 'in_progress' | 'review' | 'done';
  requestId: string;
  assignedTo: string;
  dueDate: string;
};

export type AppObject = {
  id: string;
  name: string;
  address: string;
  requestsCount: number;
  tasksCount: number;
};

export const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    new: 'bg-blue-500',
    in_progress: 'bg-yellow-500',
    completed: 'bg-green-500',
    cancelled: 'bg-gray-500',
    backlog: 'bg-gray-400',
    todo: 'bg-blue-400',
    review: 'bg-purple-500',
    done: 'bg-green-500',
  };
  return colors[status] || 'bg-gray-500';
};

export const getPriorityColor = (priority: string) => {
  const colors: Record<string, string> = {
    low: 'bg-gray-500',
    medium: 'bg-blue-500',
    high: 'bg-orange-500',
    urgent: 'bg-red-500',
  };
  return colors[priority] || 'bg-gray-500';
};

export const getStatusLabel = (status: string) => {
  const labels: Record<string, string> = {
    new: 'Новая',
    in_progress: 'В работе',
    completed: 'Завершена',
    cancelled: 'Отменена',
    backlog: 'Бэклог',
    todo: 'К выполнению',
    review: 'На проверке',
    done: 'Готово',
  };
  return labels[status] || status;
};

export const getPriorityLabel = (priority: string) => {
  const labels: Record<string, string> = {
    low: 'Низкий',
    medium: 'Средний',
    high: 'Высокий',
    urgent: 'Срочный',
  };
  return labels[priority] || priority;
};
