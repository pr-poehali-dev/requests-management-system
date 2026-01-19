import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import Icon from '@/components/ui/icon';
import type { UserRole } from '@/types';

type SidebarProps = {
  activeSection: string;
  setActiveSection: (section: string) => void;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  currentUser: { name: string; role: UserRole };
  handleLogout: () => void;
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

const Sidebar = ({ activeSection, setActiveSection, sidebarCollapsed, setSidebarCollapsed, currentUser, handleLogout }: SidebarProps) => {
  const canAccessSection = (roles: UserRole[]) => roles.includes(currentUser.role);

  return (
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
  );
};

export default Sidebar;
