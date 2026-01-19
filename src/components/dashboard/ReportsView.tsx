import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import type { Request, Task } from '@/types';

type ReportsViewProps = {
  requests: Request[];
  tasks: Task[];
};

const ReportsView = ({ requests, tasks }: ReportsViewProps) => {
  const statusStats = {
    new: requests.filter(r => r.status === 'new').length,
    in_progress: requests.filter(r => r.status === 'in_progress').length,
    completed: requests.filter(r => r.status === 'completed').length,
    cancelled: requests.filter(r => r.status === 'cancelled').length,
  };

  const priorityStats = {
    urgent: requests.filter(r => r.priority === 'urgent').length,
    high: requests.filter(r => r.priority === 'high').length,
    medium: requests.filter(r => r.priority === 'medium').length,
    low: requests.filter(r => r.priority === 'low').length,
  };

  const taskStats = {
    backlog: tasks.filter(t => t.status === 'backlog').length,
    todo: tasks.filter(t => t.status === 'todo').length,
    in_progress: tasks.filter(t => t.status === 'in_progress').length,
    review: tasks.filter(t => t.status === 'review').length,
    done: tasks.filter(t => t.status === 'done').length,
  };

  const completionRate = requests.length > 0 
    ? Math.round((statusStats.completed / requests.length) * 100) 
    : 0;

  const taskCompletionRate = tasks.length > 0 
    ? Math.round((taskStats.done / tasks.length) * 100) 
    : 0;

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Отчеты и аналитика</h2>
        <p className="text-muted-foreground">Статистика по заявкам и задачам</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Всего заявок</CardTitle>
            <Icon name="Inbox" className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-data">{requests.length}</div>
            <div className="flex items-center gap-2 mt-2">
              <div className="h-2 flex-1 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-green-500 transition-all"
                  style={{ width: `${completionRate}%` }}
                />
              </div>
              <span className="text-xs text-muted-foreground font-data">{completionRate}%</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Выполнено</CardTitle>
            <Icon name="CheckCircle2" className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-data text-green-600">{statusStats.completed}</div>
            <p className="text-xs text-muted-foreground mt-1">Завершенных заявок</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">В работе</CardTitle>
            <Icon name="Clock" className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-data text-yellow-600">{statusStats.in_progress}</div>
            <p className="text-xs text-muted-foreground mt-1">Активных заявок</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Срочные</CardTitle>
            <Icon name="AlertCircle" className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-data text-red-600">{priorityStats.urgent}</div>
            <p className="text-xs text-muted-foreground mt-1">Требуют внимания</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Распределение по статусам</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Новые</span>
                  <span className="font-data font-medium">{statusStats.new}</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 transition-all"
                    style={{ width: `${requests.length > 0 ? (statusStats.new / requests.length) * 100 : 0}%` }}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>В работе</span>
                  <span className="font-data font-medium">{statusStats.in_progress}</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-yellow-500 transition-all"
                    style={{ width: `${requests.length > 0 ? (statusStats.in_progress / requests.length) * 100 : 0}%` }}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Завершены</span>
                  <span className="font-data font-medium">{statusStats.completed}</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-green-500 transition-all"
                    style={{ width: `${requests.length > 0 ? (statusStats.completed / requests.length) * 100 : 0}%` }}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Распределение по приоритетам</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Срочные</span>
                  <span className="font-data font-medium">{priorityStats.urgent}</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-red-500 transition-all"
                    style={{ width: `${requests.length > 0 ? (priorityStats.urgent / requests.length) * 100 : 0}%` }}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Высокие</span>
                  <span className="font-data font-medium">{priorityStats.high}</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-orange-500 transition-all"
                    style={{ width: `${requests.length > 0 ? (priorityStats.high / requests.length) * 100 : 0}%` }}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Средние</span>
                  <span className="font-data font-medium">{priorityStats.medium}</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 transition-all"
                    style={{ width: `${requests.length > 0 ? (priorityStats.medium / requests.length) * 100 : 0}%` }}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Статистика задач</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Всего задач</span>
                <span className="font-data font-medium">{tasks.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Выполнено</span>
                <span className="font-data font-medium text-green-600">{taskStats.done}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">В работе</span>
                <span className="font-data font-medium text-yellow-600">{taskStats.in_progress}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">На проверке</span>
                <span className="font-data font-medium text-purple-600">{taskStats.review}</span>
              </div>
              <div className="pt-3 border-t">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Процент выполнения</span>
                  <span className="font-data font-bold text-lg">{taskCompletionRate}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden mt-2">
                  <div 
                    className="h-full bg-green-500 transition-all"
                    style={{ width: `${taskCompletionRate}%` }}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Производительность</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Среднее время выполнения</span>
                <span className="font-data font-medium">3.5 дня</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Заявок в неделю</span>
                <span className="font-data font-medium">12</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Коэффициент выполнения</span>
                <span className="font-data font-medium">{completionRate}%</span>
              </div>
              <div className="pt-3 border-t">
                <div className="text-center">
                  <div className="text-3xl font-bold font-data text-green-600">{statusStats.completed}</div>
                  <p className="text-xs text-muted-foreground mt-1">Заявок выполнено в этом месяце</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReportsView;
