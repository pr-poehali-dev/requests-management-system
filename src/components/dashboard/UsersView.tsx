import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import type { UserRole } from '@/types';

type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
};

type UsersViewProps = {
  users: User[];
  onAddUser: (user: { name: string; email: string; role: UserRole }) => void;
  currentUserRole: UserRole;
};

const UsersView = ({ users, onAddUser, currentUserRole }: UsersViewProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState<UserRole>('executor');

  const handleSubmit = () => {
    if (!newUserName || !newUserEmail) return;
    
    onAddUser({
      name: newUserName,
      email: newUserEmail,
      role: newUserRole,
    });

    setNewUserName('');
    setNewUserEmail('');
    setNewUserRole('executor');
    setIsDialogOpen(false);
  };

  const getRoleLabel = (role: UserRole) => {
    const labels = {
      admin: 'Администратор',
      manager: 'Менеджер',
      executor: 'Исполнитель',
    };
    return labels[role];
  };

  const getRoleBadgeColor = (role: UserRole) => {
    const colors = {
      admin: 'bg-red-500',
      manager: 'bg-blue-500',
      executor: 'bg-green-500',
    };
    return colors[role];
  };

  if (currentUserRole !== 'admin') {
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
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Пользователи</h2>
          <p className="text-muted-foreground">Управление пользователями и ролями</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Icon name="UserPlus" className="mr-2 h-4 w-4" />
              Добавить пользователя
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Новый пользователь</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="user-name">Имя и фамилия</Label>
                <Input
                  id="user-name"
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  placeholder="Введите имя"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="user-email">Email</Label>
                <Input
                  id="user-email"
                  type="email"
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  placeholder="email@company.ru"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="user-role">Роль</Label>
                <Select value={newUserRole} onValueChange={(value) => setNewUserRole(value as UserRole)}>
                  <SelectTrigger id="user-role">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="executor">Исполнитель</SelectItem>
                    <SelectItem value="manager">Менеджер</SelectItem>
                    <SelectItem value="admin">Администратор</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full" onClick={handleSubmit}>
                Добавить пользователя
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Input placeholder="Поиск пользователей..." className="max-w-sm" />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Имя</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Роль</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map(user => (
                <TableRow key={user.id} className="hover:bg-accent/50">
                  <TableCell className="font-data font-medium">{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell className="text-muted-foreground">{user.email}</TableCell>
                  <TableCell>
                    <Badge className={`${getRoleBadgeColor(user.role)} text-white`}>
                      {getRoleLabel(user.role)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <Icon name="MoreVertical" className="h-4 w-4" />
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
};

export default UsersView;
