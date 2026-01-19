import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import type { AppObject } from '@/types';

type ObjectsViewProps = {
  objects: AppObject[];
};

const ObjectsView = ({ objects }: ObjectsViewProps) => {
  return (
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
};

export default ObjectsView;
