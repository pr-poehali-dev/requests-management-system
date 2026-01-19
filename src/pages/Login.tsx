import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

type LoginProps = {
  onLogin: (username: string, role: 'admin' | 'manager' | 'executor') => void;
};

const Login = ({ onLogin }: LoginProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      toast.error('Заполните все поля');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const users = {
        'admin': { password: 'admin123', role: 'admin' as const, name: 'Администратор' },
        'manager': { password: 'manager123', role: 'manager' as const, name: 'Иван Петров' },
        'executor': { password: 'executor123', role: 'executor' as const, name: 'Сергей Иванов' },
      };

      const user = users[username as keyof typeof users];

      if (user && user.password === password) {
        toast.success(`Добро пожаловать, ${user.name}!`);
        onLogin(user.name, user.role);
      } else {
        toast.error('Неверный логин или пароль');
        setIsLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8 animate-fade-in">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-xl bg-primary flex items-center justify-center">
              <Icon name="Inbox" className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">RequestHub</h1>
          <p className="text-muted-foreground mt-2">Система управления заявками</p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Вход в систему</CardTitle>
            <CardDescription>Введите ваши учетные данные для доступа</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Логин</Label>
                <div className="relative">
                  <Icon name="User" className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="username"
                    type="text"
                    placeholder="Введите логин"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="pl-10"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Пароль</Label>
                <div className="relative">
                  <Icon name="Lock" className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Введите пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Icon name={showPassword ? 'EyeOff' : 'Eye'} className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Icon name="Loader2" className="mr-2 h-4 w-4 animate-spin" />
                    Вход...
                  </>
                ) : (
                  <>
                    <Icon name="LogIn" className="mr-2 h-4 w-4" />
                    Войти
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t">
              <p className="text-sm text-muted-foreground text-center mb-3">Демо-аккаунты для тестирования:</p>
              <div className="space-y-2 text-xs">
                <div className="p-3 bg-muted/50 rounded-lg">
                  <div className="font-medium mb-1">👑 Администратор</div>
                  <div className="text-muted-foreground font-data">admin / admin123</div>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg">
                  <div className="font-medium mb-1">💼 Менеджер</div>
                  <div className="text-muted-foreground font-data">manager / manager123</div>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg">
                  <div className="font-medium mb-1">🔧 Исполнитель</div>
                  <div className="text-muted-foreground font-data">executor / executor123</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-muted-foreground">
          © 2024 RequestHub. Корпоративная система управления заявками
        </p>
      </div>
    </div>
  );
};

export default Login;
