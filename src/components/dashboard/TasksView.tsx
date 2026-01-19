import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import type { Task } from '@/types';

type TasksViewProps = {
  tasks: Task[];
};

const TasksView = ({ tasks }: TasksViewProps) => {
  const columns = [
    { id: 'backlog', title: 'Бэклог', tasks: tasks.filter(t => t.status === 'backlog') },
    { id: 'todo', title: 'К выполнению', tasks: tasks.filter(t => t.status === 'todo') },
    { id: 'in_progress', title: 'В работе', tasks: tasks.filter(t => t.status === 'in_progress') },
    { id: 'review', title: 'На проверке', tasks: tasks.filter(t => t.status === 'review') },
    { id: 'done', title: 'Готово', tasks: tasks.filter(t => t.status === 'done') },
  ];

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
      </TabsContent>
      <TabsContent value="list">
        <div className="text-center py-12 text-muted-foreground">Представление списком в разработке</div>
      </TabsContent>
    </Tabs>
  );
};

export default TasksView;
