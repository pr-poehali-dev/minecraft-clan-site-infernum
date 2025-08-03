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
import Icon from '@/components/ui/icon';

const Index = () => {
  const [applicationForm, setApplicationForm] = useState({
    username: '',
    discordTag: '',
    experience: '',
    motivation: ''
  });

  const members = [
    { name: 'SteamMaster_Yuki', rank: 'Главный Инженер', role: 'Лидер клана', status: 'online' },
    { name: 'GearForge_Akira', rank: 'Мастер Кузнец', role: 'Заместитель', status: 'online' },
    { name: 'CopperWind_Sato', rank: 'Механик', role: 'Офицер', status: 'away' },
    { name: 'BrassStorm_Kenji', rank: 'Изобретатель', role: 'Участник', status: 'offline' },
    { name: 'IronDragon_Hana', rank: 'Инженер', role: 'Участник', status: 'online' }
  ];

  const news = [
    {
      title: 'Обновление клановой базы',
      date: '28 июля 2025',
      content: 'Завершено строительство новой стимпанк мастерской с автоматическими системами крафта.'
    },
    {
      title: 'Набор в клан открыт!',
      date: '25 июля 2025', 
      content: 'Приглашаем новых участников присоединиться к клану Infernum. Требования: опыт игры от 100 часов.'
    },
    {
      title: 'Турнир между кланами',
      date: '20 июля 2025',
      content: 'Победа в межклановом турнире! Infernum занял 1 место в категории "Лучшие постройки".'
    }
  ];

  const gallery = [
    { title: 'Клановая база', image: '/img/898a4a62-680e-4954-8324-57f0b6423198.jpg' },
    { title: 'Стимпанк мастерская', image: '/img/898a4a62-680e-4954-8324-57f0b6423198.jpg' },
    { title: 'Механические конструкции', image: '/img/898a4a62-680e-4954-8324-57f0b6423198.jpg' }
  ];

  const rules = [
    { title: 'Уважение к участникам', desc: 'Соблюдайте взаимное уважение и поддерживайте дружескую атмосферу' },
    { title: 'Активность', desc: 'Минимальная активность - 2 раза в неделю' },
    { title: 'Стиль построек', desc: 'Все постройки должны соответствовать стимпанк тематике клана' },
    { title: 'Discord обязателен', desc: 'Наличие Discord для координации и общения' },
    { title: 'Помощь новичкам', desc: 'Опытные игроки помогают новым участникам освоиться' }
  ];

  const handleApplicationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Заявка отправлена! Мы свяжемся с вами в Discord в течение 24 часов.');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img src="/img/898a4a62-680e-4954-8324-57f0b6423198.jpg" alt="Infernum Logo" className="w-12 h-12 rounded-lg" />
              <div>
                <h1 className="text-2xl font-bold text-primary">INFERNUM CLAN</h1>
                <p className="text-sm text-muted-foreground">Стимпанк империя Майнкрафта</p>
              </div>
            </div>
            <nav className="hidden md:flex space-x-6">
              <a href="#home" className="text-foreground hover:text-primary transition-colors">Главная</a>
              <a href="#members" className="text-foreground hover:text-primary transition-colors">Участники</a>
              <a href="#news" className="text-foreground hover:text-primary transition-colors">Новости</a>
              <a href="#gallery" className="text-foreground hover:text-primary transition-colors">Галерея</a>
              <a href="#rules" className="text-foreground hover:text-primary transition-colors">Правила</a>
            </nav>
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
      </header>

      {/* Hero Section */}
      <section id="home" className="py-20 bg-gradient-to-r from-background via-card to-background">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <img src="/img/898a4a62-680e-4954-8324-57f0b6423198.jpg" alt="Infernum Clan" className="w-48 h-48 mx-auto mb-8 rounded-2xl shadow-2xl" />
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
      <main className="container mx-auto px-4 py-12">
        <Tabs defaultValue="members" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="members">Участники</TabsTrigger>
            <TabsTrigger value="news">Новости</TabsTrigger>
            <TabsTrigger value="gallery">Галерея</TabsTrigger>
            <TabsTrigger value="rules">Правила</TabsTrigger>
          </TabsList>

          <TabsContent value="members" id="members">
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold mb-2">Участники клана</h3>
                <p className="text-muted-foreground">Познакомьтесь с нашими талантливыми инженерами</p>
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
                      <Badge variant="secondary" className="bg-steampunk-bronze text-white">
                        {member.rank}
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="news" id="news">
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold mb-2">Новости клана</h3>
                <p className="text-muted-foreground">Последние события и обновления</p>
              </div>
              <div className="space-y-6">
                {news.map((item, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xl">{item.title}</CardTitle>
                        <Badge variant="outline">{item.date}</Badge>
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
                <h3 className="text-3xl font-bold mb-2">Галерея</h3>
                <p className="text-muted-foreground">Наши лучшие творения и достижения</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {gallery.map((item, index) => (
                  <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-video overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
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
                <h3 className="text-3xl font-bold mb-2">Правила клана</h3>
                <p className="text-muted-foreground">Основные принципы нашего сообщества</p>
              </div>
              <div className="space-y-4">
                {rules.map((rule, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center space-x-3">
                        <span className="flex items-center justify-center w-8 h-8 bg-primary text-primary-foreground rounded-full text-sm font-bold">
                          {index + 1}
                        </span>
                        <span>{rule.title}</span>
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
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <img src="/img/898a4a62-680e-4954-8324-57f0b6423198.jpg" alt="Infernum" className="w-8 h-8 rounded" />
              <h4 className="text-lg font-bold">INFERNUM CLAN</h4>
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