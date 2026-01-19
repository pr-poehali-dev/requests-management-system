import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';
import Login from './Login';

type UserRole = 'admin' | 'manager' | 'executor';

type Request = {
  id: string;
  title: string;
  status: 'new' | 'in_progress' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  objectId: string;
  createdAt: string;
  assignedTo: string;
};

type Task = {
  id: string;
  title: string;
  status: 'backlog' | 'todo' | 'in_progress' | 'review' | 'done';
  requestId: string;
  assignedTo: string;
  dueDate: string;
};

type AppObject = {
  id: string;
  name: string;
  address: string;
  requestsCount: number;
  tasksCount: number;
};

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ name: string; role: UserRole } | null>(null);

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

  if (!isAuthenticated || !currentUser) {
    return <Login onLogin={handleLogin} />;
  }

  const [requests] = useState<Request[]>([
    { id: 'REQ-001', title: 'Установка оборудования', status: 'in_progress', priority: 'high', objectId: 'OBJ-001', createdAt: '2024-01-15', assignedTo: 'Сидоров А.' },
    { id: 'REQ-002', title: 'Техническое обслуживание', status: 'new', priority: 'medium', objectId: 'OBJ-002', createdAt: '2024-01-16', assignedTo: 'Иванов П.' },
    { id: 'REQ-003', title: 'Ремонт системы', status: 'completed', priority: 'urgent', objectId: 'OBJ-001', createdAt: '2024-01-10', assignedTo: 'Петров К.' },
    { id: 'REQ-004', title: 'Диагностика оборудования', status: 'in_progress', priority: 'low', objectId: 'OBJ-003', createdAt: '2024-01-17', assignedTo: 'Сидоров А.' },
  ]);

  const [tasks] = useState<Task[]>([
    { id: 'TSK-001', title: 'Подготовка документации', status: 'in_progress', requestId: 'REQ-001', assignedTo: 'Сидоров А.', dueDate: '2024-01-20' },
    { id: 'TSK-002', title: 'Проверка комплектации', status: 'todo', requestId: 'REQ-001', assignedTo: 'Иванов П.', dueDate: '2024-01-18' },
    { id: 'TSK-003', title: 'Установка ПО', status: 'done', requestId: 'REQ-003', assignedTo: 'Петров К.', dueDate: '2024-01-12' },
    { id: 'TSK-004', title: 'Тестирование системы', status: 'review', requestId: 'REQ-001', assignedTo: 'Сидоров А.', dueDate: '2024-01-19' },
    { id: 'TSK-005', title: 'Планирование работ', status: 'backlog', requestId: 'REQ-002', assignedTo: 'Иванов П.', dueDate: '2024-01-22' },
  ]);

  const [objects] = useState<AppObject[]>([
    { id: 'OBJ-001', name: 'Производственный корпус А', address: 'ул. Промышленная, 15', requestsCount: 12, tasksCount: 8 },
    { id: 'OBJ-002', name: 'Складской комплекс Б', address: 'ул. Логистическая, 42', requestsCount: 7, tasksCount: 5 },
    { id: 'OBJ-003', name: 'Офисное здание В', address: 'пр. Центральный, 88', requestsCount: 4, tasksCount: 3 },
  ]);

  const getStatusColor = (status: string) => {
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

  const getPriorityColor = (priority: string) => {
    const colors: Record<string, string> = {
      low: 'bg-gray-500',
      medium: 'bg-blue-500',
      high: 'bg-orange-500',
      urgent: 'bg-red-500',
    };
    return colors[priority] || 'bg-gray-500';
  };

  const getStatusLabel = (status: string) => {
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

  const getPriorityLabel = (priority: string) => {
    const labels: Record<string, string> = {
      low: 'Низкий',
      medium: 'Средний',
      high: 'Высокий',
      urgent: 'Срочный',
    };
    return labels[priority] || priority;
  };

  const menuItems = [
    { id: 'dashboard', icon: 'LayoutDashboard', label: 'Главная', roles: ['admin', 'manager', 'executor'] },
    { id: 'requests', icon: 'Inbox', label: 'Заявки', roles: ['admin', 'manager', 'executor'] },
    { id: 'objects', icon: 'Building2', label: 'Объекты', roles: ['admin', 'manager'] },
    { id: 'tasks', icon: 'CheckSquare', label: 'Задачи', roles: ['admin', 'manager', 'executor'] },
    { id: 'users', icon: 'Users', label: 'Пользователи', roles: ['admin'] },
    { id: 'reports', icon: 'BarChart3', label: 'Отчеты', roles: ['admin', 'manager'] },
    { id: 'settings', icon: 'Settings', label: 'Настройки', roles: ['admin', 'manager', 'executor'] },
  ];

  const canAccessSection = (roles: UserRole[]) => roles.includes(currentUser.role);

  const renderDashboard = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="hover-scale">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Всего заявок</CardTitle>
            <Icon name="Inbox" className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-data">{requests.length}</div>
            <p className="text-xs text-muted-foreground mt-1">+2 за последнюю неделю</p>
          </CardContent>
        </Card>
        <Card className="hover-scale">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">В работе</CardTitle>
            <Icon name="Clock" className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-data">{requests.filter(r => r.status === 'in_progress').length}</div>
            <p className="text-xs text-muted-foreground mt-1">Активных сейчас</p>
          </CardContent>
        </Card>
        <Card className="hover-scale">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Задачи</CardTitle>
            <Icon name="CheckSquare" className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-data">{tasks.length}</div>
            <p className="text-xs text-muted-foreground mt-1">{tasks.filter(t => t.status === 'done').length} выполнено</p>
          </CardContent>
        </Card>
        <Card className="hover-scale">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Объекты</CardTitle>
            <Icon name="Building2" className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-data">{objects.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Под управлением</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Последние заявки</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {requests.slice(0, 4).map(request => (
                <div key={request.id} className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent/50 transition-colors">
                  <div className="space-y-1">
                    <div className="font-medium font-data">{request.id}</div>
                    <div className="text-sm">{request.title}</div>
                  </div>
                  <Badge className={`${getStatusColor(request.status)} text-white`}>
                    {getStatusLabel(request.status)}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Активные задачи</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {tasks.filter(t => t.status !== 'done').slice(0, 4).map(task => (
                <div key={task.id} className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent/50 transition-colors">
                  <div className="space-y-1">
                    <div className="font-medium font-data">{task.id}</div>
                    <div className="text-sm">{task.title}</div>
                  </div>
                  <div className="text-xs text-muted-foreground">{task.dueDate}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderRequests = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Заявки</h2>
          <p className="text-muted-foreground">Управление заявками на обслуживание</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Icon name="Plus" className="mr-2 h-4 w-4" />
              Создать заявку
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Новая заявка</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="request-title">Название заявки</Label>
                <Input id="request-title" placeholder="Введите название" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="request-object">Объект</Label>
                <Select>
                  <SelectTrigger id="request-object">
                    <SelectValue placeholder="Выберите объект" />
                  </SelectTrigger>
                  <SelectContent>
                    {objects.map(obj => (
                      <SelectItem key={obj.id} value={obj.id}>{obj.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="request-priority">Приоритет</Label>
                <Select>
                  <SelectTrigger id="request-priority">
                    <SelectValue placeholder="Выберите приоритет" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Низкий</SelectItem>
                    <SelectItem value="medium">Средний</SelectItem>
                    <SelectItem value="high">Высокий</SelectItem>
                    <SelectItem value="urgent">Срочный</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="request-desc">Описание</Label>
                <Textarea id="request-desc" placeholder="Опишите задачу" rows={4} />
              </div>
              <Button className="w-full" onClick={() => toast.success('Заявка создана успешно')}>
                Создать заявку
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Input placeholder="Поиск заявок..." className="max-w-sm" />
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Все статусы" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все статусы</SelectItem>
                <SelectItem value="new">Новые</SelectItem>
                <SelectItem value="in_progress">В работе</SelectItem>
                <SelectItem value="completed">Завершенные</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Название</TableHead>
                <TableHead>Объект</TableHead>
                <TableHead>Приоритет</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead>Исполнитель</TableHead>
                <TableHead>Дата</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.map(request => (
                <TableRow key={request.id} className="hover:bg-accent/50">
                  <TableCell className="font-data font-medium">{request.id}</TableCell>
                  <TableCell>{request.title}</TableCell>
                  <TableCell className="font-data">{request.objectId}</TableCell>
                  <TableCell>
                    <Badge className={`${getPriorityColor(request.priority)} text-white`}>
                      {getPriorityLabel(request.priority)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={`${getStatusColor(request.status)} text-white`}>
                      {getStatusLabel(request.status)}
                    </Badge>
                  </TableCell>
                  <TableCell>{request.assignedTo}</TableCell>
                  <TableCell className="font-data">{request.createdAt}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <Icon name="Eye" className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );

  const renderKanban = () => {
    const columns = [
      { id: 'backlog', title: 'Бэклог', tasks: tasks.filter(t => t.status === 'backlog') },
      { id: 'todo', title: 'К выполнению', tasks: tasks.filter(t => t.status === 'todo') },
      { id: 'in_progress', title: 'В работе', tasks: tasks.filter(t => t.status === 'in_progress') },
      { id: 'review', title: 'На проверке', tasks: tasks.filter(t => t.status === 'review') },
      { id: 'done', title: 'Готово', tasks: tasks.filter(t => t.status === 'done') },
    ];

    return (
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Канбан-доска</h2>
            <p className="text-muted-foreground">Управление задачами в визуальном режиме</p>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-4 overflow-x-auto pb-4">
          {columns.map(column => (
            <div key={column.id} className="min-w-[280px]">
              <div className="bg-muted/50 rounded-lg p-3 mb-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{column.title}</h3>
                  <Badge variant="secondary" className="font-data">{column.tasks.length}</Badge>
                </div>
              </div>
              <div className="space-y-3">
                {column.tasks.map(task => (
                  <Card key={task.id} className="hover-scale cursor-pointer">
                    <CardContent className="p-4">
                      <div className="space-y-2">
                        <div className="font-data text-sm text-muted-foreground">{task.id}</div>
                        <div className="font-medium">{task.title}</div>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{task.assignedTo}</span>
                          <span className="font-data">{task.dueDate}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderObjects = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Объекты</h2>
          <p className="text-muted-foreground">Управление объектами обслуживания</p>
        </div>
        <Button>
          <Icon name="Plus" className="mr-2 h-4 w-4" />
          Добавить объект
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {objects.map(obj => (
          <Card key={obj.id} className="hover-scale cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-start justify-between">
                <div>
                  <div className="text-sm text-muted-foreground font-data">{obj.id}</div>
                  <div className="mt-1">{obj.name}</div>
                </div>
                <Icon name="Building2" className="h-5 w-5 text-muted-foreground" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Icon name="MapPin" className="mr-2 h-4 w-4" />
                  {obj.address}
                </div>
                <div className="flex items-center gap-4 pt-3 border-t">
                  <div className="flex items-center text-sm">
                    <Icon name="Inbox" className="mr-1 h-4 w-4 text-muted-foreground" />
                    <span className="font-data font-medium">{obj.requestsCount}</span>
                    <span className="ml-1 text-muted-foreground">заявок</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Icon name="CheckSquare" className="mr-1 h-4 w-4 text-muted-foreground" />
                    <span className="font-data font-medium">{obj.tasksCount}</span>
                    <span className="ml-1 text-muted-foreground">задач</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return renderDashboard();
      case 'requests':
        return renderRequests();
      case 'tasks':
        return (
          <Tabs defaultValue="kanban" className="space-y-6">
            <TabsList>
              <TabsTrigger value="kanban">
                <Icon name="Columns3" className="mr-2 h-4 w-4" />
                Канбан
              </TabsTrigger>
              <TabsTrigger value="list">
                <Icon name="List" className="mr-2 h-4 w-4" />
                Список
              </TabsTrigger>
            </TabsList>
            <TabsContent value="kanban">
              {renderKanban()}
            </TabsContent>
            <TabsContent value="list">
              <div className="text-center py-12 text-muted-foreground">Представление списком в разработке</div>
            </TabsContent>
          </Tabs>
        );
      case 'objects':
        return renderObjects();
      case 'users':
        return (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-3xl font-bold tracking-tight">Пользователи</h2>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-12 text-muted-foreground">
                  <Icon name="Users" className="mx-auto h-12 w-12 mb-4" />
                  <p>Управление пользователями доступно только администраторам</p>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      case 'reports':
        return (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-3xl font-bold tracking-tight">Отчеты</h2>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-12 text-muted-foreground">
                  <Icon name="BarChart3" className="mx-auto h-12 w-12 mb-4" />
                  <p>Раздел отчетов и аналитики</p>
                </div>
              </CardContent>
            </Card>
          </div>
        );
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
        return renderDashboard();
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <aside className={`${sidebarCollapsed ? 'w-16' : 'w-64'} bg-sidebar text-sidebar-foreground transition-all duration-300 flex flex-col`}>
        <div className="p-4 flex items-center justify-between">
          {!sidebarCollapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-sidebar-primary flex items-center justify-center">
                <Icon name="Inbox" className="h-5 w-5 text-sidebar-primary-foreground" />
              </div>
              <span className="font-bold text-lg">RequestHub</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="text-sidebar-foreground hover:bg-sidebar-accent"
          >
            <Icon name={sidebarCollapsed ? 'ChevronRight' : 'ChevronLeft'} className="h-4 w-4" />
          </Button>
        </div>

        <nav className="flex-1 px-2 py-4 space-y-1">
          {menuItems.map(item => 
            canAccessSection(item.roles as UserRole[]) && (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  activeSection === item.id
                    ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent'
                }`}
              >
                <Icon name={item.icon as any} className="h-5 w-5" />
                {!sidebarCollapsed && <span>{item.label}</span>}
              </button>
            )
          )}
        </nav>

        <div className="p-4 border-t border-sidebar-border">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className={`w-full flex items-center gap-3 hover:bg-sidebar-accent rounded-lg p-2 transition-colors ${sidebarCollapsed ? 'justify-center' : ''}`}>
                <div className="w-8 h-8 rounded-full bg-sidebar-primary flex items-center justify-center text-sidebar-primary-foreground font-medium">
                  {currentUser.name.split(' ').map(n => n[0]).join('')}
                </div>
                {!sidebarCollapsed && (
                  <div className="flex-1 min-w-0 text-left">
                    <div className="font-medium truncate">{currentUser.name}</div>
                    <div className="text-xs text-sidebar-foreground/70 capitalize">{currentUser.role === 'admin' ? 'Администратор' : currentUser.role === 'manager' ? 'Менеджер' : 'Исполнитель'}</div>
                  </div>
                )}
                {!sidebarCollapsed && <Icon name="ChevronUp" className="h-4 w-4 text-sidebar-foreground/50" />}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Мой аккаунт</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setActiveSection('settings')}>
                <Icon name="Settings" className="mr-2 h-4 w-4" />
                Настройки
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>
                <Icon name="LogOut" className="mr-2 h-4 w-4" />
                Выйти
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {renderSection()}
        </div>
      </main>
    </div>
  );
};

export default Index;