import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import type { Request, Task, AppObject } from '@/types';
import { getStatusColor, getStatusLabel } from '@/types';

type DashboardViewProps = {
  requests: Request[];
  tasks: Task[];
  objects: AppObject[];
};

const DashboardView = ({ requests, tasks, objects }: DashboardViewProps) => {
  return (
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
};

export default DashboardView;
