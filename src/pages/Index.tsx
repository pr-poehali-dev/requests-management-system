import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';
import Login from './Login';
import Sidebar from '@/components/dashboard/Sidebar';
import DashboardView from '@/components/dashboard/DashboardView';
import RequestsView from '@/components/dashboard/RequestsView';
import TasksView from '@/components/dashboard/TasksView';
import ObjectsView from '@/components/dashboard/ObjectsView';
import UsersView from '@/components/dashboard/UsersView';
import ReportsView from '@/components/dashboard/ReportsView';
import type { UserRole, Request, Task, AppObject } from '@/types';

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ name: string; role: UserRole } | null>(null);

  const [requests, setRequests] = useState<Request[]>([
    { id: 'REQ-001', title: 'Установка оборудования', status: 'in_progress', priority: 'high', objectId: 'OBJ-001', createdAt: '2024-01-15', assignedTo: 'Сидоров А.' },
    { id: 'REQ-002', title: 'Техническое обслуживание', status: 'new', priority: 'medium', objectId: 'OBJ-002', createdAt: '2024-01-16', assignedTo: 'Иванов П.' },
    { id: 'REQ-003', title: 'Ремонт системы', status: 'completed', priority: 'urgent', objectId: 'OBJ-001', createdAt: '2024-01-10', assignedTo: 'Петров К.' },
    { id: 'REQ-004', title: 'Диагностика оборудования', status: 'in_progress', priority: 'low', objectId: 'OBJ-003', createdAt: '2024-01-17', assignedTo: 'Сидоров А.' },
  ]);

  const [tasks, setTasks] = useState<Task[]>([
    { id: 'TSK-001', title: 'Подготовка документации', status: 'in_progress', requestId: 'REQ-001', assignedTo: 'Сидоров А.', dueDate: '2024-01-20' },
    { id: 'TSK-002', title: 'Проверка комплектации', status: 'todo', requestId: 'REQ-001', assignedTo: 'Иванов П.', dueDate: '2024-01-18' },
    { id: 'TSK-003', title: 'Установка ПО', status: 'done', requestId: 'REQ-003', assignedTo: 'Петров К.', dueDate: '2024-01-12' },
    { id: 'TSK-004', title: 'Тестирование системы', status: 'review', requestId: 'REQ-001', assignedTo: 'Сидоров А.', dueDate: '2024-01-19' },
    { id: 'TSK-005', title: 'Планирование работ', status: 'backlog', requestId: 'REQ-002', assignedTo: 'Иванов П.', dueDate: '2024-01-22' },
  ]);

  const [objects, setObjects] = useState<AppObject[]>([
    { id: 'OBJ-001', name: 'Производственный корпус А', address: 'ул. Промышленная, 15', requestsCount: 12, tasksCount: 8 },
    { id: 'OBJ-002', name: 'Складской комплекс Б', address: 'ул. Логистическая, 42', requestsCount: 7, tasksCount: 5 },
    { id: 'OBJ-003', name: 'Офисное здание В', address: 'пр. Центральный, 88', requestsCount: 4, tasksCount: 3 },
  ]);

  const [users, setUsers] = useState([
    { id: '1', name: 'Администратор', email: 'admin@company.ru', role: 'admin' as UserRole },
    { id: '2', name: 'Иван Петров', email: 'manager@company.ru', role: 'manager' as UserRole },
    { id: '3', name: 'Сергей Иванов', email: 'executor@company.ru', role: 'executor' as UserRole },
  ]);

  const handleLogin = (name: string, role: UserRole) => {
    setCurrentUser({ name, role });
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    setActiveSection('dashboard');
    toast.success('Вы успешно вышли из системы');
  };

  const handleAddRequest = (request: Omit<Request, 'id' | 'createdAt'>) => {
    const newRequest: Request = {
      ...request,
      id: `REQ-${String(requests.length + 1).padStart(3, '0')}`,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setRequests([...requests, newRequest]);
    toast.success('Заявка создана успешно');
  };

  const handleUpdateRequestStatus = (id: string, status: Request['status']) => {
    setRequests(requests.map(r => r.id === id ? { ...r, status } : r));
    toast.success('Статус заявки обновлен');
  };

  const handleAddUser = (user: { name: string; email: string; role: UserRole }) => {
    const newUser = { ...user, id: String(users.length + 1) };
    setUsers([...users, newUser]);
    toast.success('Пользователь добавлен успешно');
  };

  if (!isAuthenticated || !currentUser) {
    return <Login onLogin={handleLogin} />;
  }

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardView requests={requests} tasks={tasks} objects={objects} onRequestClick={(id) => {
          setActiveSection('requests');
        }} />;
      case 'requests':
        return <RequestsView 
          requests={requests} 
          objects={objects} 
          onAddRequest={handleAddRequest}
          onUpdateStatus={handleUpdateRequestStatus}
        />;
      case 'tasks':
        return <TasksView tasks={tasks} />;
      case 'objects':
        return <ObjectsView objects={objects} />;
      case 'users':
        return <UsersView users={users} onAddUser={handleAddUser} currentUserRole={currentUser.role} />;
      case 'reports':
        return <ReportsView requests={requests} tasks={tasks} />;
      case 'settings':
        return (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-3xl font-bold tracking-tight">Настройки</h2>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-12 text-muted-foreground">
                  <Icon name="Settings" className="mx-auto h-12 w-12 mb-4" />
                  <p>Настройки профиля и системы</p>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      default:
        return <DashboardView requests={requests} tasks={tasks} objects={objects} />;
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
        currentUser={currentUser}
        handleLogout={handleLogout}
      />
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {renderSection()}
        </div>
      </main>
    </div>
  );
};

export default Index;