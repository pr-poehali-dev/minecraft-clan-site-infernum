import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [applicationForm, setApplicationForm] = useState({
    username: '',
    discordTag: '',
    experience: '',
    motivation: ''
  });

  const [currentUser] = useState({
    name: 'Конфуций',
    role: 'Конфуций',
    hasAdminRights: true
  });

  const [editMode, setEditMode] = useState({
    news: false,
    gallery: false,
    rules: false,
    members: false
  });

  const [notifications, setNotifications] = useState<Array<{
    id: string;
    message: string;
    type: 'success' | 'warning' | 'info';
    timestamp: Date;
  }>>([]);

  const [activityLogs, setActivityLogs] = useState<Array<{
    id: string;
    user: string;
    action: string;
    target: string;
    timestamp: Date;
  }>>([
    {
      id: '1',
      user: 'Конфуций',
      action: 'Создал роль',
      target: 'Мастер Кузнец',
      timestamp: new Date('2025-08-01T10:30:00')
    },
    {
      id: '2',
      user: 'Конфуций',
      action: 'Добавил новость',
      target: 'Фестиваль красных фонарей',
      timestamp: new Date('2025-08-01T09:15:00')
    }
  ]);

  const [editingItem, setEditingItem] = useState<any>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editType, setEditType] = useState<'news' | 'gallery' | 'rules' | 'role' | null>(null);

  const [roles, setRoles] = useState([
    { 
      id: '1', 
      name: 'Конфуций', 
      color: '#dc2626', 
      description: 'Верховный мудрец клана',
      permissions: {
        manageRoles: true,
        editContent: true,
        manageMembers: true,
        deleteContent: true,
        viewReports: true
      }
    },
    { 
      id: '2', 
      name: 'Главный Инженер', 
      color: '#FFD700', 
      description: 'Лидер клана',
      permissions: {
        manageRoles: false,
        editContent: true,
        manageMembers: true,
        deleteContent: false,
        viewReports: true
      }
    },
    { 
      id: '3', 
      name: 'Мастер Кузнец', 
      color: '#FF6B35', 
      description: 'Заместитель лидера',
      permissions: {
        manageRoles: false,
        editContent: true,
        manageMembers: false,
        deleteContent: false,
        viewReports: false
      }
    },
    { 
      id: '4', 
      name: 'Механик', 
      color: '#8B4513', 
      description: 'Офицер клана',
      permissions: {
        manageRoles: false,
        editContent: false,
        manageMembers: false,
        deleteContent: false,
        viewReports: false
      }
    },
    { 
      id: '5', 
      name: 'Изобретатель', 
      color: '#B87333', 
      description: 'Активный участник',
      permissions: {
        manageRoles: false,
        editContent: false,
        manageMembers: false,
        deleteContent: false,
        viewReports: false
      }
    },
    { 
      id: '6', 
      name: 'Инженер', 
      color: '#4A4A4A', 
      description: 'Участник клана',
      permissions: {
        manageRoles: false,
        editContent: false,
        manageMembers: false,
        deleteContent: false,
        viewReports: false
      }
    }
  ]);

  const [newRole, setNewRole] = useState({
    name: '',
    color: '#FFD700',
    description: '',
    permissions: {
      manageRoles: false,
      editContent: false,
      manageMembers: false,
      deleteContent: false,
      viewReports: false
    }
  });

  const [members, setMembers] = useState([
    { id: '1', name: 'SteamMaster_Yuki', rank: 'Главный Инженер', role: 'Лидер клана', status: 'online', roleColor: '#FFD700' },
    { id: '2', name: 'GearForge_Akira', rank: 'Мастер Кузнец', role: 'Заместитель', status: 'online', roleColor: '#FF6B35' },
    { id: '3', name: 'CopperWind_Sato', rank: 'Механик', role: 'Офицер', status: 'away', roleColor: '#8B4513' },
    { id: '4', name: 'BrassStorm_Kenji', rank: 'Изобретатель', role: 'Участник', status: 'offline', roleColor: '#B87333' },
    { id: '5', name: 'IronDragon_Hana', rank: 'Инженер', role: 'Участник', status: 'online', roleColor: '#4A4A4A' },
    { id: '6', name: 'Конфуций', rank: 'Конфуций', role: 'Верховный мудрец', status: 'online', roleColor: '#dc2626' }
  ]);

  const [news, setNews] = useState([
    {
      id: '1',
      title: '🏮 Фестиваль красных фонарей',
      date: '1 августа 2025',
      content: 'Начинается традиционный японский фестиваль! Украшаем базу красными фонариками и строим святилища.'
    },
    {
      id: '2',
      title: 'Обновление клановой базы',
      date: '28 июля 2025',
      content: 'Завершено строительство новой стимпанк мастерской с автоматическими системами крафта.'
    },
    {
      id: '3',
      title: 'Набор в клан открыт!',
      date: '25 июля 2025', 
      content: 'Приглашаем новых участников присоединиться к клану Infernum. Требования: опыт игры от 100 часов.'
    },
    {
      id: '4',
      title: 'Турнир между кланами',
      date: '20 июля 2025',
      content: 'Победа в межклановом турнире! Infernum занял 1 место в категории "Лучшие постройки".'
    }
  ]);

  const [newNewsItem, setNewNewsItem] = useState({
    title: '',
    content: ''
  });

  const [gallery, setGallery] = useState([
    { id: '1', title: 'Клановая база', image: '/img/898a4a62-680e-4954-8324-57f0b6423198.jpg' },
    { id: '2', title: 'Японские фонарики', image: '/img/69d0941d-94f1-4667-aea7-2a84f6074202.jpg' },
    { id: '3', title: 'Святилище Тории', image: '/img/51c0d897-82e2-4d99-b8eb-1ad1f55a57aa.jpg' },
    { id: '4', title: 'Стимпанк мастерская', image: '/img/898a4a62-680e-4954-8324-57f0b6423198.jpg' },
    { id: '5', title: 'Механические конструкции', image: '/img/898a4a62-680e-4954-8324-57f0b6423198.jpg' }
  ]);

  const [newGalleryItem, setNewGalleryItem] = useState({
    title: '',
    image: ''
  });

  const [rules, setRules] = useState([
    { id: '1', title: 'Уважение к участникам', desc: 'Соблюдайте взаимное уважение и поддерживайте дружескую атмосферу' },
    { id: '2', title: 'Активность', desc: 'Минимальная активность - 2 раза в неделю' },
    { id: '3', title: 'Стиль построек', desc: 'Все постройки должны соответствовать стимпанк тематике клана' },
    { id: '4', title: 'Discord обязателен', desc: 'Наличие Discord для координации и общения' },
    { id: '5', title: 'Помощь новичкам', desc: 'Опытные игроки помогают новым участникам освоиться' },
    { id: '6', title: 'Японские традиции', desc: 'Уважайте японские элементы в дизайне базы и построек' }
  ]);

  const [newRule, setNewRule] = useState({
    title: '',
    desc: ''
  });

  const permissionLabels = {
    manageRoles: 'Управление ролями',
    editContent: 'Редактирование контента',
    manageMembers: 'Управление участниками',
    deleteContent: 'Удаление контента',
    viewReports: 'Просмотр отчетов'
  };

  const addNotification = (message: string, type: 'success' | 'warning' | 'info' = 'success') => {
    const notification = {
      id: Date.now().toString(),
      message,
      type,
      timestamp: new Date()
    };
    setNotifications(prev => [notification, ...prev.slice(0, 4)]);
    
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== notification.id));
    }, 5000);
  };

  const addLog = (action: string, target: string) => {
    const log = {
      id: Date.now().toString(),
      user: currentUser.name,
      action,
      target,
      timestamp: new Date()
    };
    setActivityLogs(prev => [log, ...prev.slice(0, 49)]);
  };

  const openEditDialog = (item: any, type: 'news' | 'gallery' | 'rules' | 'role') => {
    setEditingItem({ ...item });
    setEditType(type);
    setEditDialogOpen(true);
  };

  const handleEditSave = () => {
    if (!editingItem || !editType) return;

    switch (editType) {
      case 'news':
        setNews(news.map(item => 
          item.id === editingItem.id ? editingItem : item
        ));
        addLog('Отредактировал новость', editingItem.title);
        addNotification('Новость успешно обновлена');
        break;
      case 'gallery':
        setGallery(gallery.map(item => 
          item.id === editingItem.id ? editingItem : item
        ));
        addLog('Отредактировал элемент галереи', editingItem.title);
        addNotification('Элемент галереи обновлен');
        break;
      case 'rules':
        setRules(rules.map(item => 
          item.id === editingItem.id ? editingItem : item
        ));
        addLog('Отредактировал правило', editingItem.title);
        addNotification('Правило успешно обновлено');
        break;
      case 'role':
        setRoles(roles.map(item => 
          item.id === editingItem.id ? editingItem : item
        ));
        addLog('Отредактировал роль', editingItem.name);
        addNotification('Роль успешно обновлена');
        break;
    }

    setEditDialogOpen(false);
    setEditingItem(null);
    setEditType(null);
  };

  const handleApplicationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addNotification('Заявка отправлена! Мы свяжемся с вами в Discord в течение 24 часов.', 'info');
  };

  const handleCreateRole = (e: React.FormEvent) => {
    e.preventDefault();
    const role = {
      id: Date.now().toString(),
      ...newRole
    };
    setRoles([...roles, role]);
    setNewRole({ 
      name: '', 
      color: '#FFD700', 
      description: '',
      permissions: {
        manageRoles: false,
        editContent: false,
        manageMembers: false,
        deleteContent: false,
        viewReports: false
      }
    });
    addLog('Создал роль', role.name);
    addNotification('Роль создана успешно!');
  };

  const handleMemberRoleChange = (memberId: string, newRankId: string) => {
    const selectedRole = roles.find(role => role.id === newRankId);
    if (!selectedRole) return;

    const member = members.find(m => m.id === memberId);
    if (member) {
      setMembers(members.map(m => 
        m.id === memberId 
          ? { ...m, rank: selectedRole.name, roleColor: selectedRole.color }
          : m
      ));
      addLog('Изменил роль участника', `${member.name} → ${selectedRole.name}`);
      addNotification(`Роль участника ${member.name} изменена на ${selectedRole.name}`);
    }
  };

  const handleAddNews = (e: React.FormEvent) => {
    e.preventDefault();
    const newsItem = {
      id: Date.now().toString(),
      title: newNewsItem.title,
      date: new Date().toLocaleDateString('ru-RU'),
      content: newNewsItem.content
    };
    setNews([newsItem, ...news]);
    setNewNewsItem({ title: '', content: '' });
    addLog('Добавил новость', newsItem.title);
    addNotification('Новость добавлена!');
  };

  const handleAddGalleryItem = (e: React.FormEvent) => {
    e.preventDefault();
    const galleryItem = {
      id: Date.now().toString(),
      ...newGalleryItem
    };
    setGallery([...gallery, galleryItem]);
    setNewGalleryItem({ title: '', image: '' });
    addLog('Добавил элемент в галерею', galleryItem.title);
    addNotification('Элемент добавлен в галерею!');
  };

  const handleAddRule = (e: React.FormEvent) => {
    e.preventDefault();
    const rule = {
      id: Date.now().toString(),
      ...newRule
    };
    setRules([...rules, rule]);
    setNewRule({ title: '', desc: '' });
    addLog('Добавил правило', rule.title);
    addNotification('Правило добавлено!');
  };

  const handleDelete = (id: string, type: 'news' | 'gallery' | 'rules' | 'role' | 'member', name: string) => {
    switch (type) {
      case 'news':
        setNews(news.filter(n => n.id !== id));
        addLog('Удалил новость', name);
        addNotification('Новость удалена', 'warning');
        break;
      case 'gallery':
        setGallery(gallery.filter(g => g.id !== id));
        addLog('Удалил элемент галереи', name);
        addNotification('Элемент удален из галереи', 'warning');
        break;
      case 'rules':
        setRules(rules.filter(r => r.id !== id));
        addLog('Удалил правило', name);
        addNotification('Правило удалено', 'warning');
        break;
      case 'role':
        setRoles(roles.filter(r => r.id !== id));
        addLog('Удалил роль', name);
        addNotification('Роль удалена', 'warning');
        break;
      case 'member':
        setMembers(members.filter(m => m.id !== id));
        addLog('Удалил участника', name);
        addNotification('Участник удален', 'warning');
        break;
    }
  };

  const canEdit = currentUser.hasAdminRights;

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {notifications.map((notification) => (
          <Alert key={notification.id} className={`w-80 ${
            notification.type === 'success' ? 'border-green-500 bg-green-50' :
            notification.type === 'warning' ? 'border-yellow-500 bg-yellow-50' :
            'border-blue-500 bg-blue-50'
          }`}>
            <Icon name={
              notification.type === 'success' ? 'CheckCircle' :
              notification.type === 'warning' ? 'AlertTriangle' : 'Info'
            } className="h-4 w-4" />
            <AlertDescription>{notification.message}</AlertDescription>
          </Alert>
        ))}
      </div>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Редактировать {editType === 'news' ? 'новость' : editType === 'gallery' ? 'элемент галереи' : editType === 'rules' ? 'правило' : 'роль'}</DialogTitle>
          </DialogHeader>
          {editingItem && (
            <div className="space-y-4">
              {editType === 'news' && (
                <>
                  <div>
                    <Label>Заголовок</Label>
                    <Input
                      value={editingItem.title}
                      onChange={(e) => setEditingItem({...editingItem, title: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label>Содержание</Label>
                    <Textarea
                      value={editingItem.content}
                      onChange={(e) => setEditingItem({...editingItem, content: e.target.value})}
                    />
                  </div>
                </>
              )}
              {editType === 'gallery' && (
                <>
                  <div>
                    <Label>Название</Label>
                    <Input
                      value={editingItem.title}
                      onChange={(e) => setEditingItem({...editingItem, title: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label>URL изображения</Label>
                    <Input
                      value={editingItem.image}
                      onChange={(e) => setEditingItem({...editingItem, image: e.target.value})}
                    />
                  </div>
                </>
              )}
              {editType === 'rules' && (
                <>
                  <div>
                    <Label>Заголовок</Label>
                    <Input
                      value={editingItem.title}
                      onChange={(e) => setEditingItem({...editingItem, title: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label>Описание</Label>
                    <Textarea
                      value={editingItem.desc}
                      onChange={(e) => setEditingItem({...editingItem, desc: e.target.value})}
                    />
                  </div>
                </>
              )}
              {editType === 'role' && (
                <>
                  <div>
                    <Label>Название роли</Label>
                    <Input
                      value={editingItem.name}
                      onChange={(e) => setEditingItem({...editingItem, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label>Цвет роли</Label>
                    <Input
                      type="color"
                      value={editingItem.color}
                      onChange={(e) => setEditingItem({...editingItem, color: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label>Описание</Label>
                    <Textarea
                      value={editingItem.description}
                      onChange={(e) => setEditingItem({...editingItem, description: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label>Разрешения</Label>
                    <div className="grid grid-cols-1 gap-2 mt-2">
                      {Object.entries(permissionLabels).map(([key, label]) => (
                        <div key={key} className="flex items-center space-x-2">
                          <Checkbox
                            checked={editingItem.permissions?.[key] || false}
                            onCheckedChange={(checked) =>
                              setEditingItem({
                                ...editingItem,
                                permissions: {
                                  ...editingItem.permissions,
                                  [key]: !!checked
                                }
                              })
                            }
                          />
                          <Label className="text-sm">{label}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
              <div className="flex space-x-2">
                <Button onClick={handleEditSave}>
                  <Icon name="Save" className="w-4 h-4 mr-2" />
                  Сохранить
                </Button>
                <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
                  Отмена
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Japanese Lanterns Background */}
      <div className="fixed inset-0 pointer-events-none opacity-10">
        <div className="absolute top-10 left-10 text-6xl animate-pulse">🏮</div>
        <div className="absolute top-32 right-20 text-4xl animate-pulse delay-1000">🏮</div>
        <div className="absolute top-64 left-1/4 text-5xl animate-pulse delay-2000">🏮</div>
        <div className="absolute bottom-32 right-1/4 text-4xl animate-pulse delay-500">🏮</div>
        <div className="absolute bottom-64 left-16 text-6xl animate-pulse delay-1500">🏮</div>
        <div className="absolute top-1/2 right-10 text-5xl animate-pulse delay-3000">🏮</div>
      </div>

      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur relative z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img src="/img/898a4a62-680e-4954-8324-57f0b6423198.jpg" alt="Infernum Logo" className="w-12 h-12 rounded-lg" />
              <div>
                <h1 className="text-2xl font-bold text-primary">INFERNUM CLAN</h1>
                <p className="text-sm text-muted-foreground">Стимпанк империя Майнкрафта 🏮</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <nav className="hidden md:flex space-x-6">
                <a href="#home" className="text-foreground hover:text-primary transition-colors">Главная</a>
                <a href="#members" className="text-foreground hover:text-primary transition-colors">Участники</a>
                <a href="#news" className="text-foreground hover:text-primary transition-colors">Новости</a>
                <a href="#gallery" className="text-foreground hover:text-primary transition-colors">Галерея</a>
                <a href="#rules" className="text-foreground hover:text-primary transition-colors">Правила</a>
                {currentUser.hasAdminRights && (
                  <>
                    <a href="#roles" className="text-foreground hover:text-primary transition-colors">Роли</a>
                    <a href="#logs" className="text-foreground hover:text-primary transition-colors">Логи</a>
                  </>
                )}
              </nav>
              <div className="flex items-center space-x-2">
                <Badge style={{ backgroundColor: currentUser.role === 'Конфуций' ? '#dc2626' : '#FFD700' }} className="text-white">
                  {currentUser.role}
                </Badge>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-primary hover:bg-primary/90">
                      <Icon name="UserPlus" className="w-4 h-4 mr-2" />
                      Подать заявку
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Заявка на вступление в клан</DialogTitle>
                      <DialogDescription>
                        Заполните форму для вступления в Infernum Clan
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleApplicationSubmit} className="space-y-4">
                      <div>
                        <Label htmlFor="username">Ник в Minecraft</Label>
                        <Input
                          id="username"
                          value={applicationForm.username}
                          onChange={(e) => setApplicationForm({...applicationForm, username: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="discord">Discord тег</Label>
                        <Input
                          id="discord"
                          placeholder="username#1234"
                          value={applicationForm.discordTag}
                          onChange={(e) => setApplicationForm({...applicationForm, discordTag: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="experience">Опыт игры</Label>
                        <Textarea
                          id="experience"
                          placeholder="Расскажите о своем опыте в Minecraft..."
                          value={applicationForm.experience}
                          onChange={(e) => setApplicationForm({...applicationForm, experience: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="motivation">Почему хотите вступить?</Label>
                        <Textarea
                          id="motivation"
                          placeholder="Что привлекает вас в нашем клане?"
                          value={applicationForm.motivation}
                          onChange={(e) => setApplicationForm({...applicationForm, motivation: e.target.value})}
                          required
                        />
                      </div>
                      <Button type="submit" className="w-full">
                        <Icon name="Send" className="w-4 h-4 mr-2" />
                        Отправить заявку
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="py-20 bg-gradient-to-r from-background via-card to-background relative">
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="relative mb-8">
              <img src="/img/898a4a62-680e-4954-8324-57f0b6423198.jpg" alt="Infernum Clan" className="w-48 h-48 mx-auto rounded-2xl shadow-2xl" />
              <div className="absolute -top-4 -right-4 text-4xl animate-bounce">🏮</div>
              <div className="absolute -bottom-4 -left-4 text-3xl animate-bounce delay-500">⚙️</div>
            </div>
            <h2 className="text-5xl font-bold mb-6 text-primary">INFERNUM CLAN</h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Добро пожаловать в элитный майнкрафт клан, где стимпанк встречается с японскими традициями. 
              Создавайте невероятные механизмы, изучайте древние техники и станьте частью легендарной истории.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="lg" className="bg-primary hover:bg-primary/90">
                    <Icon name="Zap" className="w-5 h-5 mr-2" />
                    Присоединиться к клану
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Заявка на вступление в клан</DialogTitle>
                    <DialogDescription>
                      Заполните форму для вступления в Infernum Clan
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleApplicationSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="username2">Ник в Minecraft</Label>
                      <Input
                        id="username2"
                        value={applicationForm.username}
                        onChange={(e) => setApplicationForm({...applicationForm, username: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="discord2">Discord тег</Label>
                      <Input
                        id="discord2"
                        placeholder="username#1234"
                        value={applicationForm.discordTag}
                        onChange={(e) => setApplicationForm({...applicationForm, discordTag: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="experience2">Опыт игры</Label>
                      <Textarea
                        id="experience2"
                        placeholder="Расскажите о своем опыте в Minecraft..."
                        value={applicationForm.experience}
                        onChange={(e) => setApplicationForm({...applicationForm, experience: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="motivation2">Почему хотите вступить?</Label>
                      <Textarea
                        id="motivation2"
                        placeholder="Что привлекает вас в нашем клане?"
                        value={applicationForm.motivation}
                        onChange={(e) => setApplicationForm({...applicationForm, motivation: e.target.value})}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      <Icon name="Send" className="w-4 h-4 mr-2" />
                      Отправить заявку
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
              <Button variant="outline" size="lg">
                <Icon name="MessageSquare" className="w-5 h-5 mr-2" />
                Discord сервер
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 relative z-10">
        <Tabs defaultValue="roles" className="w-full">
          <TabsList className={`grid w-full ${currentUser.hasAdminRights ? 'grid-cols-6' : 'grid-cols-4'} mb-8`}>
            <TabsTrigger value="members">Участники</TabsTrigger>
            <TabsTrigger value="news">Новости</TabsTrigger>
            <TabsTrigger value="gallery">Галерея</TabsTrigger>
            <TabsTrigger value="rules">Правила</TabsTrigger>
            {currentUser.hasAdminRights && (
              <>
                <TabsTrigger value="roles">Роли</TabsTrigger>
                <TabsTrigger value="logs">Логи</TabsTrigger>
              </>
            )}
          </TabsList>

          <TabsContent value="members" id="members">
            <div className="space-y-6">
              <div className="text-center mb-8">
                <div className="flex items-center justify-center space-x-4">
                  <h3 className="text-3xl font-bold mb-2">Участники клана</h3>
                  {canEdit && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditMode({...editMode, members: !editMode.members})}
                    >
                      <Icon name="Edit" className="w-4 h-4 mr-2" />
                      {editMode.members ? 'Готово' : 'Редактировать'}
                    </Button>
                  )}
                </div>
                <p className="text-muted-foreground">Познакомьтесь с нашими талантливыми инженерами 🏮</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {members.map((member, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                            <Icon name="User" className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{member.name}</CardTitle>
                            <CardDescription>{member.role}</CardDescription>
                          </div>
                        </div>
                        <div className={`w-3 h-3 rounded-full ${
                          member.status === 'online' ? 'bg-green-500' :
                          member.status === 'away' ? 'bg-yellow-500' : 'bg-gray-500'
                        }`} />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <Badge style={{ backgroundColor: member.roleColor }} className="text-white">
                          {member.rank}
                        </Badge>
                        {editMode.members && canEdit && (
                          <div className="flex space-x-2">
                            <Select value={member.rank} onValueChange={(value) => {
                              const roleId = roles.find(r => r.name === value)?.id;
                              if (roleId) handleMemberRoleChange(member.id, roleId);
                            }}>
                              <SelectTrigger className="w-32">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {roles.map((role) => (
                                  <SelectItem key={role.id} value={role.name}>
                                    <span style={{ color: role.color }}>{role.name}</span>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDelete(member.id, 'member', member.name)}
                            >
                              <Icon name="Trash2" className="w-4 h-4" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="news" id="news">
            <div className="space-y-6">
              <div className="text-center mb-8">
                <div className="flex items-center justify-center space-x-4">
                  <h3 className="text-3xl font-bold mb-2">Новости клана</h3>
                  {canEdit && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditMode({...editMode, news: !editMode.news})}
                    >
                      <Icon name="Edit" className="w-4 h-4 mr-2" />
                      {editMode.news ? 'Готово' : 'Редактировать'}
                    </Button>
                  )}
                </div>
                <p className="text-muted-foreground">Последние события и обновления 🏮</p>
              </div>

              {editMode.news && canEdit && (
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>Добавить новость</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleAddNews} className="space-y-4">
                      <div>
                        <Label htmlFor="newsTitle">Заголовок</Label>
                        <Input
                          id="newsTitle"
                          value={newNewsItem.title}
                          onChange={(e) => setNewNewsItem({...newNewsItem, title: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="newsContent">Содержание</Label>
                        <Textarea
                          id="newsContent"
                          value={newNewsItem.content}
                          onChange={(e) => setNewNewsItem({...newNewsItem, content: e.target.value})}
                          required
                        />
                      </div>
                      <Button type="submit">
                        <Icon name="Plus" className="w-4 h-4 mr-2" />
                        Добавить новость
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              )}

              <div className="space-y-6">
                {news.map((item, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xl">{item.title}</CardTitle>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">{item.date}</Badge>
                          {editMode.news && canEdit && (
                            <div className="flex space-x-1">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => openEditDialog(item, 'news')}
                              >
                                <Icon name="Edit" className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDelete(item.id, 'news', item.title)}
                              >
                                <Icon name="Trash2" className="w-4 h-4" />
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed">{item.content}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="gallery" id="gallery">
            <div className="space-y-6">
              <div className="text-center mb-8">
                <div className="flex items-center justify-center space-x-4">
                  <h3 className="text-3xl font-bold mb-2">Галерея</h3>
                  {canEdit && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditMode({...editMode, gallery: !editMode.gallery})}
                    >
                      <Icon name="Edit" className="w-4 h-4 mr-2" />
                      {editMode.gallery ? 'Готово' : 'Редактировать'}
                    </Button>
                  )}
                </div>
                <p className="text-muted-foreground">Наши лучшие творения и достижения 🏮</p>
              </div>

              {editMode.gallery && canEdit && (
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>Добавить в галерею</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleAddGalleryItem} className="space-y-4">
                      <div>
                        <Label htmlFor="galleryTitle">Название</Label>
                        <Input
                          id="galleryTitle"
                          value={newGalleryItem.title}
                          onChange={(e) => setNewGalleryItem({...newGalleryItem, title: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="galleryImage">URL изображения</Label>
                        <Input
                          id="galleryImage"
                          value={newGalleryItem.image}
                          onChange={(e) => setNewGalleryItem({...newGalleryItem, image: e.target.value})}
                          placeholder="/img/example.jpg"
                          required
                        />
                      </div>
                      <Button type="submit">
                        <Icon name="Plus" className="w-4 h-4 mr-2" />
                        Добавить в галерею
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {gallery.map((item, index) => (
                  <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-video overflow-hidden relative">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                      {editMode.gallery && canEdit && (
                        <div className="absolute top-2 right-2 space-x-1">
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => openEditDialog(item, 'gallery')}
                          >
                            <Icon name="Edit" className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(item.id, 'gallery', item.title)}
                          >
                            <Icon name="Trash2" className="w-4 h-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <h4 className="font-semibold text-lg">{item.title}</h4>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="rules" id="rules">
            <div className="space-y-6">
              <div className="text-center mb-8">
                <div className="flex items-center justify-center space-x-4">
                  <h3 className="text-3xl font-bold mb-2">Правила клана</h3>
                  {canEdit && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditMode({...editMode, rules: !editMode.rules})}
                    >
                      <Icon name="Edit" className="w-4 h-4 mr-2" />
                      {editMode.rules ? 'Готово' : 'Редактировать'}
                    </Button>
                  )}
                </div>
                <p className="text-muted-foreground">Основные принципы нашего сообщества 🏮</p>
              </div>

              {editMode.rules && canEdit && (
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>Добавить правило</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleAddRule} className="space-y-4">
                      <div>
                        <Label htmlFor="ruleTitle">Заголовок</Label>
                        <Input
                          id="ruleTitle"
                          value={newRule.title}
                          onChange={(e) => setNewRule({...newRule, title: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="ruleDesc">Описание</Label>
                        <Textarea
                          id="ruleDesc"
                          value={newRule.desc}
                          onChange={(e) => setNewRule({...newRule, desc: e.target.value})}
                          required
                        />
                      </div>
                      <Button type="submit">
                        <Icon name="Plus" className="w-4 h-4 mr-2" />
                        Добавить правило
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              )}

              <div className="space-y-4">
                {rules.map((rule, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="flex items-center justify-center w-8 h-8 bg-primary text-primary-foreground rounded-full text-sm font-bold">
                            {index + 1}
                          </span>
                          <span>{rule.title}</span>
                        </div>
                        {editMode.rules && canEdit && (
                          <div className="flex space-x-1">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => openEditDialog(rule, 'rules')}
                            >
                              <Icon name="Edit" className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDelete(rule.id, 'rules', rule.title)}
                            >
                              <Icon name="Trash2" className="w-4 h-4" />
                            </Button>
                          </div>
                        )}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed">{rule.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {currentUser.hasAdminRights && (
            <>
              <TabsContent value="roles" id="roles">
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <h3 className="text-3xl font-bold mb-2">Управление ролями</h3>
                    <p className="text-muted-foreground">Создавайте и управляйте ролями клана 🏮</p>
                  </div>
                  
                  <Card className="mb-6">
                    <CardHeader>
                      <CardTitle>Создать новую роль</CardTitle>
                      <CardDescription>Добавьте новую роль с уникальным цветом и разрешениями</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleCreateRole} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="roleName">Название роли</Label>
                            <Input
                              id="roleName"
                              value={newRole.name}
                              onChange={(e) => setNewRole({...newRole, name: e.target.value})}
                              placeholder="Новая роль"
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="roleColor">Цвет роли</Label>
                            <Input
                              id="roleColor"
                              type="color"
                              value={newRole.color}
                              onChange={(e) => setNewRole({...newRole, color: e.target.value})}
                              required
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="roleDescription">Описание</Label>
                          <Textarea
                            id="roleDescription"
                            value={newRole.description}
                            onChange={(e) => setNewRole({...newRole, description: e.target.value})}
                            placeholder="Описание роли..."
                            required
                          />
                        </div>
                        <div>
                          <Label>Разрешения</Label>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                            {Object.entries(permissionLabels).map(([key, label]) => (
                              <div key={key} className="flex items-center space-x-2">
                                <Checkbox
                                  id={key}
                                  checked={newRole.permissions[key as keyof typeof newRole.permissions]}
                                  onCheckedChange={(checked) =>
                                    setNewRole({
                                      ...newRole,
                                      permissions: {
                                        ...newRole.permissions,
                                        [key]: !!checked
                                      }
                                    })
                                  }
                                />
                                <Label htmlFor={key} className="text-sm">
                                  {label}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </div>
                        <Button type="submit">
                          <Icon name="Plus" className="w-4 h-4 mr-2" />
                          Создать роль
                        </Button>
                      </form>
                    </CardContent>
                  </Card>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {roles.map((role) => (
                      <Card key={role.id} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <CardTitle className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div 
                                className="w-4 h-4 rounded-full"
                                style={{ backgroundColor: role.color }}
                              />
                              <span style={{ color: role.color }}>{role.name}</span>
                            </div>
                            {role.name !== 'Конфуций' && (
                              <div className="flex space-x-1">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => openEditDialog(role, 'role')}
                                >
                                  <Icon name="Edit" className="w-4 h-4" />
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleDelete(role.id, 'role', role.name)}
                                >
                                  <Icon name="Trash2" className="w-4 h-4" />
                                </Button>
                              </div>
                            )}
                          </CardTitle>
                          <CardDescription>{role.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <Badge style={{ backgroundColor: role.color }} className="text-white">
                                {role.color}
                              </Badge>
                            </div>
                            <div className="text-sm">
                              <p className="font-medium mb-2">Разрешения:</p>
                              <div className="space-y-1">
                                {Object.entries(role.permissions).map(([key, value]) => (
                                  <div key={key} className="flex items-center space-x-2">
                                    <div className={`w-2 h-2 rounded-full ${value ? 'bg-green-500' : 'bg-gray-300'}`} />
                                    <span className={`text-xs ${value ? 'text-green-600' : 'text-gray-500'}`}>
                                      {permissionLabels[key as keyof typeof permissionLabels]}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="logs" id="logs">
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <h3 className="text-3xl font-bold mb-2">Логи активности</h3>
                    <p className="text-muted-foreground">История действий администраторов 🏮</p>
                  </div>

                  <div className="space-y-4">
                    {activityLogs.map((log) => (
                      <Card key={log.id} className="hover:shadow-lg transition-shadow">
                        <CardContent className="py-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                                <Icon name="Activity" className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <p className="font-medium">
                                  <span className="text-primary">{log.user}</span> {log.action}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  Цель: {log.target}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-medium">
                                {log.timestamp.toLocaleDateString('ru-RU')}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {log.timestamp.toLocaleTimeString('ru-RU')}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </>
          )}
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 mt-20 relative z-10">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <img src="/img/898a4a62-680e-4954-8324-57f0b6423198.jpg" alt="Infernum" className="w-8 h-8 rounded" />
              <h4 className="text-lg font-bold">INFERNUM CLAN</h4>
              <span className="text-2xl">🏮</span>
            </div>
            <p className="text-muted-foreground mb-4">
              Стимпанк империя Майнкрафта • Создано с ⚡ в 2025
            </p>
            <Separator className="my-4" />
            <div className="flex justify-center space-x-6 text-sm text-muted-foreground">
              <span>© 2025 Infernum Clan</span>
              <span>•</span>
              <a href="#" className="hover:text-primary transition-colors">Discord</a>
              <span>•</span>
              <a href="#" className="hover:text-primary transition-colors">Правила</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;