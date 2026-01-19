import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import type { Request, AppObject } from '@/types';
import { getStatusColor, getPriorityColor, getStatusLabel, getPriorityLabel } from '@/types';

type RequestsViewProps = {
  requests: Request[];
  objects: AppObject[];
  onAddRequest: (request: Omit<Request, 'id' | 'createdAt'>) => void;
  onUpdateStatus: (id: string, status: Request['status']) => void;
};

const RequestsView = ({ requests, objects, onAddRequest, onUpdateStatus }: RequestsViewProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newRequestTitle, setNewRequestTitle] = useState('');
  const [newRequestObject, setNewRequestObject] = useState('');
  const [newRequestPriority, setNewRequestPriority] = useState<Request['priority']>('medium');
  const [newRequestDescription, setNewRequestDescription] = useState('');

  const handleSubmit = () => {
    if (!newRequestTitle || !newRequestObject) return;

    onAddRequest({
      title: newRequestTitle,
      status: 'new',
      priority: newRequestPriority,
      objectId: newRequestObject,
      assignedTo: 'Не назначен',
    });

    setNewRequestTitle('');
    setNewRequestObject('');
    setNewRequestPriority('medium');
    setNewRequestDescription('');
    setIsDialogOpen(false);
  };
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Заявки</h2>
          <p className="text-muted-foreground">Управление заявками на обслуживание</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
                <Input 
                  id="request-title" 
                  value={newRequestTitle}
                  onChange={(e) => setNewRequestTitle(e.target.value)}
                  placeholder="Введите название" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="request-object">Объект</Label>
                <Select value={newRequestObject} onValueChange={setNewRequestObject}>
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
                <Select value={newRequestPriority} onValueChange={(val) => setNewRequestPriority(val as Request['priority'])}>
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
                <Textarea 
                  id="request-desc" 
                  value={newRequestDescription}
                  onChange={(e) => setNewRequestDescription(e.target.value)}
                  placeholder="Опишите задачу" 
                  rows={4} 
                />
              </div>
              <Button className="w-full" onClick={handleSubmit}>
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
                    <Select 
                      value={request.status} 
                      onValueChange={(val) => onUpdateStatus(request.id, val as Request['status'])}
                    >
                      <SelectTrigger className="w-[140px]">
                        <Badge className={`${getStatusColor(request.status)} text-white border-0`}>
                          {getStatusLabel(request.status)}
                        </Badge>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">Новая</SelectItem>
                        <SelectItem value="in_progress">В работе</SelectItem>
                        <SelectItem value="completed">Завершена</SelectItem>
                        <SelectItem value="cancelled">Отменена</SelectItem>
                      </SelectContent>
                    </Select>
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
};

export default RequestsView;