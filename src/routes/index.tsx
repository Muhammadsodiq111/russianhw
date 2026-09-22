import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  BookOpen,
  Check,
  ChevronDown,
  Clock3,
  FlaskConical,
  GraduationCap,
  Menu,
  Music2,
  Palette,
  Search,
  Sparkles,
  Trophy,
  Utensils,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import heroImage from "@/assets/japanese-classroom-hero.jpg";
import classroomImage from "@/assets/elementary-classroom.jpg";
import lunchImage from "@/assets/school-lunch.jpg";
import clubsImage from "@/assets/school-clubs.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Система образования Японии — от школы до университета" },
      { name: "description", content: "Понятный русскоязычный гид по системе образования Японии: ступени школы, повседневная жизнь, экзамены, университеты и японские термины." },
      { property: "og:title", content: "Система образования Японии" },
      { property: "og:description", content: "От начальной школы до университета: структура, школьная жизнь, экзамены и традиции." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: EducationPortal,
});

const navItems = [
  ["Главная", "top"], ["Система", "system"], ["Школа", "primary"],
  ["Повседневная жизнь", "life"], ["Экзамены", "exams"],
  ["Университет", "university"], ["Факты", "myths"],
];

const stages = [
  { jp: "幼稚園", latin: "Yōchien", name: "Дошкольное образование", age: "до 6 лет", detail: "Детские сады и дошкольные учреждения помогают подготовиться к школьной жизни. Посещение не входит в обязательные девять лет." },
  { jp: "小学校", latin: "Shōgakkō", name: "Начальная школа", age: "6–12 лет", detail: "Шесть лет базового образования: язык, математика, естественные и общественные науки, искусство, музыка и физическая культура." },
  { jp: "中学校", latin: "Chūgakkō", name: "Средняя школа", age: "12–15 лет", detail: "Три года, завершающие обязательное образование. Программа становится сложнее, возрастает роль экзаменов и клубов." },
  { jp: "高等学校", latin: "Kōtōgakkō", name: "Старшая школа", age: "15–18 лет", detail: "Не входит в обязательный цикл, однако большинство подростков продолжает обучение по академическому или профессиональному направлению." },
  { jp: "大学", latin: "Daigaku", name: "Университет", age: "18+", detail: "Стандартная программа бакалавриата обычно длится четыре года. Также доступны колледжи и профессиональные школы." },
];

const subjects = [
  ["国語", "Японский язык", "Чтение, письмо, литература и работа с текстом."],
  ["数学", "Математика", "Вычисления, геометрия и развитие логического мышления."],
  ["英語", "Английский язык", "Иностранный язык и навыки коммуникации."],
  ["理科", "Естественные науки", "Основы физики, химии, биологии и наблюдения природы."],
  ["社会", "Обществознание", "История, география и устройство общества."],
  ["音楽", "Музыка", "Пение, инструменты и знакомство с музыкальной культурой."],
  ["美術", "Искусство", "Рисунок, композиция и творческие практики."],
  ["体育", "Физическая культура", "Спорт, движение и основы здорового образа жизни."],
  ["技術・家庭", "Технологии и домоводство", "Практические навыки, технологии и ведение быта."],
];

const glossary = [
  ["学校", "gakkō", "школа"], ["先生", "sensei", "учитель"], ["生徒", "seito", "ученик"],
  ["学生", "gakusei", "студент / учащийся"], ["制服", "seifuku", "школьная форма"],
  ["給食", "kyūshoku", "школьное питание"], ["部活動", "bukatsu", "школьные клубы"],
  ["清掃", "sōji", "уборка"], ["塾", "juku", "дополнительные занятия"],
  ["小学校", "shōgakkō", "начальная школа"], ["中学校", "chūgakkō", "средняя школа"],
  ["高等学校", "kōtōgakkō", "старшая школа"], ["大学", "daigaku", "университет"],
];

const quiz = [
  { q: "Сколько лет длится начальная школа?", options: ["4 года", "6 лет", "9 лет"], answer: 1, note: "Начальная школа обычно длится шесть лет — примерно с 6 до 12 лет." },
  { q: "Сколько лет составляет обязательное образование?", options: ["6 лет", "9 лет", "12 лет"], answer: 1, note: "Обязательный цикл состоит из шести лет начальной и трёх лет средней школы." },
  { q: "Что такое kyūshoku?", options: ["Школьный обед", "Экзамен", "Униформа"], answer: 0, note: "Kyūshoku — организованное школьное питание, часто проходящее прямо в классе." },
  { q: "Что означает bukatsu?", options: ["Каникулы", "Школьные клубы", "Домашняя работа"], answer: 1, note: "Bukatsu — клубная деятельность после уроков: от спорта до музыки и науки." },
  { q: "Что такое juku?", options: ["Частный учебный центр", "Школьная столовая", "Начальная школа"], answer: 0, note: "Juku — частные центры дополнительной подготовки и академической поддержки." },
  { q: "Сколько лет обычно длится старшая школа?", options: ["2 года", "3 года", "4 года"], answer: 1, note: "Старшая школа обычно рассчитана на три года — с 15 до 18 лет." },
];

function SectionHead({ number, title, intro }: { number: string; title: string; intro?: string }) {
  return <div className="mb-10 max-w-3xl"><p className="section-kicker">{number}</p><h2 className="mt-3 text-3xl font-bold leading-tight md:text-5xl">{title}</h2>{intro && <p className="mt-4 text-base leading-7 text-muted-foreground md:text-lg">{intro}</p>}</div>;
}

function EducationPortal() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [stage, setStage] = useState(1);
  const [dayPoint, setDayPoint] = useState(0);
  const [mythsOpen, setMythsOpen] = useState<number[]>([]);
  const [glossQuery, setGlossQuery] = useState("");
  const [quizIndex, setQuizIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  const filteredGlossary = useMemo(() => glossary.filter((x) => x.join(" ").toLowerCase().includes(glossQuery.toLowerCase())), [glossQuery]);
  const searchMatches = useMemo(() => navItems.filter((x) => x[0].toLowerCase().includes(glossQuery.toLowerCase())), [glossQuery]);
  const day = [["07:30", "Приход в школу"], ["08:00", "Начало занятий"], ["12:00", "Школьный обед"], ["13:00", "Продолжение уроков"], ["15:30", "Уборка"], ["16:00+", "Клубные занятия"]];
  const myths = [
    ["Все японские школы выглядят одинаково.", "Школы могут отличаться по правилам, форме, расписанию и другим особенностям."],
    ["Все японские ученики каждый день проводят одинаковое количество времени в школе.", "Расписание и внеурочная деятельность различаются в зависимости от школы, возраста и дня недели."],
    ["Все школьники обязательно ходят в juku.", "Некоторые учащиеся посещают juku, но это не является обязательным для всех."],
  ];

  const go = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); setSearchOpen(false); };
  const chooseAnswer = (option: number) => { if (answers[quizIndex] !== undefined) return; const next = [...answers]; next[quizIndex] = option; setAnswers(next); };

  return (
    <div id="top" className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="page-shell flex h-16 items-center justify-between gap-5">
          <button onClick={() => go("top")} className="flex items-center gap-3 text-left" aria-label="На главную">
            <span className="h-6 w-6 rounded-full bg-primary" />
            <span className="text-xs font-extrabold leading-tight md:text-sm">ОБРАЗОВАНИЕ<br />ЯПОНИИ</span>
          </button>
          <nav className="hidden items-center gap-6 lg:flex" aria-label="Основная навигация">
            {navItems.map(([label, id]) => <button key={id} onClick={() => go(id)} className="text-xs font-semibold text-muted-foreground transition-colors hover:text-primary">{label}</button>)}
          </nav>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" onClick={() => setSearchOpen(!searchOpen)} aria-label="Поиск"><Search /></Button>
            <Button variant="ghost" size="sm" aria-label="Язык сайта">RU <ChevronDown className="size-3" /></Button>
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="Открыть меню">{menuOpen ? <X /> : <Menu />}</Button>
          </div>
        </div>
        {searchOpen && <div className="border-t border-border bg-background py-4"><div className="page-shell"><div className="relative max-w-xl"><Search className="absolute left-3 top-2.5 size-4 text-muted-foreground"/><Input value={glossQuery} onChange={(e) => setGlossQuery(e.target.value)} placeholder="Найти раздел или термин…" className="pl-10" autoFocus /></div>{glossQuery && <div className="mt-3 flex flex-wrap gap-2">{searchMatches.map(([name,id]) => <Button key={id} size="sm" variant="outline" onClick={() => go(id)}>{name}</Button>)}<Button size="sm" variant="outline" onClick={() => go("glossary")}>Искать в глоссарии</Button></div>}</div></div>}
        {menuOpen && <nav className="border-t border-border bg-background p-5 lg:hidden">{navItems.map(([label,id]) => <button key={id} onClick={() => go(id)} className="block w-full border-b border-border py-3 text-left text-sm font-semibold">{label}</button>)}</nav>}
      </header>

      <main>
        <section className="page-shell pt-6 md:pt-10">
          <div className="relative min-h-[570px] overflow-hidden bg-foreground md:min-h-[620px]">
            <img src={heroImage} alt="Ученики занимаются в японском классе" width={1600} height={1008} className="absolute inset-0 h-full w-full object-cover opacity-70" fetchPriority="high" />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--foreground)_0%,color-mix(in_oklab,var(--foreground)_78%,transparent)_42%,transparent_78%)]" />
            <div className="relative flex min-h-[570px] max-w-2xl flex-col justify-end px-6 py-12 text-primary-foreground md:min-h-[620px] md:px-14 md:py-16">
              <p className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.12em]"><span className="h-px w-12 bg-primary"/>Путеводитель для школьников и студентов</p>
              <h1 className="text-4xl font-extrabold leading-[1.08] md:text-6xl">Как устроено образование в Японии?</h1>
              <p className="mt-6 max-w-xl text-base leading-7 text-primary-foreground/85 md:text-lg">От начальной школы до университета: структура, школьная жизнь, экзамены и традиции японской системы образования.</p>
              <div className="mt-8 flex flex-wrap gap-3"><Button size="lg" onClick={() => go("system")}>Изучить систему <ArrowDown /></Button><Button size="lg" variant="outline" onClick={() => go("numbers")} className="border-primary-foreground/50 bg-transparent text-primary-foreground hover:bg-primary-foreground hover:text-foreground">Быстрые факты</Button></div>
            </div>
          </div>
        </section>

        <section id="numbers" className="section-space"><div className="page-shell">
          <SectionHead number="Коротко о главном" title="Образование в цифрах" />
          <div className="grid border-y border-border sm:grid-cols-2 lg:grid-cols-5">{[["6", "лет", "Начальная школа"],["3", "года", "Средняя школа"],["3", "года", "Старшая школа"],["4", "года", "Бакалавриат"],["9", "лет", "Обязательное образование"]].map(([n,u,t],i) => <div key={t} className={`px-5 py-7 ${i < 4 ? "lg:border-r lg:border-border" : ""}`}><div className="flex items-baseline gap-2"><strong className="text-5xl font-bold text-primary">{n}</strong><span className="text-sm font-semibold">{u}</span></div><p className="mt-3 text-sm text-muted-foreground">{t}</p></div>)}</div>
          <p className="mt-6 max-w-2xl border-l-2 border-primary pl-5 text-sm leading-6 text-muted-foreground">В Японии обязательное образование обычно включает 6 лет начальной и 3 года средней школы.</p>
        </div></section>

        <section id="system" className="section-space bg-paper"><div className="page-shell">
          <SectionHead number="01 — Структура" title="Путь ученика" intro="Выберите ступень, чтобы узнать, какое место она занимает в системе." />
          <div className="grid gap-8 lg:grid-cols-[1.35fr_0.65fr]">
            <div className="grid gap-px border border-border bg-border md:grid-cols-5">{stages.map((s,i) => <button key={s.jp} onClick={() => setStage(i)} className={`relative min-h-48 bg-background p-5 text-left transition-colors ${stage===i ? "border-t-4 border-primary" : "hover:bg-secondary"}`}><span className="text-3xl font-bold">{s.jp}</span><span className="mt-4 block text-xs font-bold text-primary">{s.latin}</span><span className="mt-2 block text-sm font-semibold">{s.name}</span><span className="mt-5 block text-xs text-muted-foreground">{s.age}</span>{i<4 && <ArrowRight className="absolute -right-3 top-1/2 z-10 hidden size-5 rounded-full bg-primary p-1 text-primary-foreground md:block"/>}</button>)}</div>
            <div className="border-l-4 border-primary bg-background p-7"><p className="text-5xl font-bold">{stages[stage].jp}</p><p className="mt-2 font-semibold text-primary">{stages[stage].latin}</p><h3 className="mt-8 text-2xl font-bold">{stages[stage].name}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{stages[stage].detail}</p></div>
          </div>
        </div></section>

        <section id="primary" className="section-space"><div className="page-shell grid items-center gap-12 lg:grid-cols-2">
          <div><SectionHead number="02 — Школьные ступени" title="Начальная школа"/><p className="text-2xl font-bold">小学校 <span className="text-base font-medium text-primary">shōgakkō</span></p><p className="mt-5 leading-7 text-muted-foreground">Обычно это шесть лет обучения для детей примерно от 6 до 12 лет. Наряду с базовыми предметами школа уделяет внимание самостоятельности, работе в коллективе и повседневным правилам.</p><ul className="mt-7 grid gap-3 sm:grid-cols-2">{["Основные базовые предметы","Развитие самостоятельности","Работа в коллективе","Школьные правила","Клубные активности","Внеурочные занятия"].map(x=><li key={x} className="flex gap-3 text-sm"><Check className="mt-0.5 size-4 shrink-0 text-primary"/>{x}</li>)}</ul></div>
          <figure><img src={classroomImage} alt="Занятие в японской начальной школе" width={1408} height={1008} loading="lazy" className="aspect-[7/5] w-full object-cover"/><figcaption className="mt-3 text-xs text-muted-foreground">Совместная работа помогает развивать не только знания, но и навыки общения.</figcaption></figure>
        </div></section>

        <section className="section-space bg-paper"><div className="page-shell grid gap-12 lg:grid-cols-2">
          <article className="border-t-4 border-primary bg-background p-7 md:p-10"><p className="section-kicker">中学校 · chūgakkō</p><h2 className="mt-3 text-3xl font-bold">Средняя школа</h2><p className="mt-5 leading-7 text-muted-foreground">Три года, обычно с 12 до 15 лет, продолжают обязательное образование. Учебная программа усложняется, контрольные и экзамены становятся заметнее, а школьные клубы помогают найти интересы и круг общения.</p><ul className="mt-7 space-y-3 text-sm">{["Более сложная учебная программа","Экзамены и контрольные работы","Школьные клубы","Подготовка к следующему этапу"].map(x=><li key={x} className="border-b border-border pb-3">{x}</li>)}</ul></article>
          <article className="border-t-4 border-navy bg-background p-7 md:p-10"><p className="section-kicker">高等学校 · kōtōgakkō</p><h2 className="mt-3 text-3xl font-bold">Старшая школа</h2><p className="mt-5 leading-7 text-muted-foreground">Эти три года, обычно с 15 до 18 лет, не входят в обязательный цикл. Однако большинство учеников продолжает обучение. Для поступления во многие школы используются вступительные экзамены.</p><div className="mt-7 grid gap-3 sm:grid-cols-2"><div className="border border-border p-5"><BookOpen className="text-primary"/><h3 className="mt-4 font-bold">Академическое направление</h3><p className="mt-2 text-xs leading-5 text-muted-foreground">Подготовка к дальнейшему обучению.</p></div><div className="border border-border p-5"><Sparkles className="text-navy"/><h3 className="mt-4 font-bold">Профессиональное направление</h3><p className="mt-2 text-xs leading-5 text-muted-foreground">Практические и профессиональные навыки.</p></div></div></article>
        </div></section>

        <section id="life" className="section-space"><div className="page-shell">
          <SectionHead number="03 — Повседневная жизнь" title="Один день в японской школе" intro="Нажмите на время, чтобы пройти типичный учебный день. Реальное расписание зависит от школы и возраста учащихся." />
          <div className="grid gap-8 lg:grid-cols-[1fr_2fr]">
            <div className="bg-foreground p-8 text-primary-foreground"><Clock3 className="size-8 text-primary"/><p className="mt-12 text-5xl font-bold">{day[dayPoint][0]}</p><h3 className="mt-3 text-2xl font-bold">{day[dayPoint][1]}</h3><p className="mt-5 text-sm leading-6 text-primary-foreground/70">День включает не только уроки: обед, уборка и клубная работа также формируют школьный ритм.</p></div>
            <div className="grid grid-cols-2 gap-px border border-border bg-border md:grid-cols-3">{day.map(([time,label],i)=><button onClick={()=>setDayPoint(i)} key={time} className={`min-h-32 p-5 text-left transition-colors ${dayPoint===i ? "bg-primary text-primary-foreground" : "bg-background hover:bg-secondary"}`}><span className="text-xl font-bold">{time}</span><span className="mt-4 block text-sm">{label}</span></button>)}</div>
          </div>
        </div></section>

        <section className="section-space bg-paper"><div className="page-shell"><SectionHead number="04 — Учебная программа" title="Что изучают?"/><div className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">{subjects.map(([jp,name,text])=><article key={jp} className="bg-background p-6"><div className="flex items-start justify-between"><span className="text-3xl font-bold">{jp}</span><span className="h-2 w-2 rounded-full bg-primary"/></div><h3 className="mt-5 font-bold">{name}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p></article>)}</div></div></section>

        <section className="section-space"><div className="page-shell"><SectionHead number="05 — Школьная культура" title="Школьная жизнь" intro="Школа — это уроки, общая ответственность и время после занятий. Конкретные правила и практики могут различаться."/><div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">{[["制服","seifuku","Школьная форма","Требования к одежде зависят от конкретной школы."],["給食","kyūshoku","Школьный обед","Обед часто становится общей частью классной жизни."],["清掃","sōji","Уборка школы","Ученики могут помогать заботиться об общих пространствах."],["部活動","bukatsu","Школьные клубы","Спорт, искусство и другие занятия после уроков."]].map(([jp,latin,title,text])=><article key={jp} className="border-t-2 border-primary bg-paper p-6"><span className="text-3xl font-bold">{jp}</span><span className="ml-2 text-xs font-bold text-primary">{latin}</span><h3 className="mt-8 text-lg font-bold">{title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{text}</p></article>)}</div></div></section>

        <section className="section-space bg-foreground text-primary-foreground"><div className="page-shell grid items-center gap-12 lg:grid-cols-2">
          <figure><img src={lunchImage} alt="Японский школьный обед кюсёку" width={1408} height={1008} loading="lazy" className="aspect-[7/5] w-full object-cover"/></figure>
          <div><p className="section-kicker">給食 · Kyūshoku</p><h2 className="mt-3 text-4xl font-bold">Школьный обед — часть учебного дня</h2><p className="mt-5 leading-7 text-primary-foreground/70">Организованный обед часто едят в классе. Ученики могут по очереди раздавать блюда, готовить столы и убирать после еды — так питание становится частью совместной школьной жизни.</p><div className="mt-8 grid grid-cols-3 gap-px bg-primary-foreground/20">{["Рис","Суп","Овощи","Рыба или мясо","Молоко","Фрукты"].map(x=><span key={x} className="bg-foreground p-3 text-center text-xs">{x}</span>)}</div></div>
        </div></section>

        <section className="section-space"><div className="page-shell grid gap-12 lg:grid-cols-[0.8fr_1.2fr]"><div><SectionHead number="06 — 清掃 · sōji" title="Почему ученики сами убирают школу?"/><p className="leading-7 text-muted-foreground">В некоторых школах ученики помогают убирать классы, коридоры, лестницы и общие пространства. Практика может поддерживать ответственность, сотрудничество, самостоятельность и уважение к общей среде.</p><p className="mt-5 border-l-2 border-primary pl-4 text-sm font-medium">Не каждая школа следует одной и той же системе: порядок и объём обязанностей различаются.</p></div><div className="grid grid-cols-2 gap-px bg-border">{["Классы","Коридоры","Лестницы","Общие пространства"].map((x,i)=><div key={x} className="min-h-36 bg-paper p-6"><span className="text-xs font-bold text-primary">0{i+1}</span><p className="mt-10 font-bold">{x}</p></div>)}</div></div></section>

        <section className="section-space bg-paper"><div className="page-shell"><div className="grid items-end gap-8 md:grid-cols-2"><SectionHead number="07 — 部活動 · bukatsu" title="Жизнь после уроков"/><p className="mb-10 leading-7 text-muted-foreground">Клубы могут играть важную роль в социальной и внеурочной жизни: ученики развивают навыки, работают в команде и общаются с ребятами разных классов.</p></div><img src={clubsImage} alt="Клубная жизнь японских школьников" width={1408} height={1008} loading="lazy" className="h-[360px] w-full object-cover md:h-[520px]"/><div className="grid grid-cols-2 gap-px bg-border md:grid-cols-3 lg:grid-cols-6">{[[Trophy,"Спорт"],[Music2,"Музыка"],[FlaskConical,"Наука"],[Sparkles,"Робототехника"],[Palette,"Искусство"],[GraduationCap,"Боевые искусства"]].map(([Icon,label])=>{const C=Icon as typeof Trophy; return <div key={label as string} className="bg-background p-5"><C className="size-5 text-primary"/><p className="mt-5 text-sm font-bold">{label as string}</p></div>})}</div></div></section>

        <section id="exams" className="section-space"><div className="page-shell"><SectionHead number="08 — Экзамены" title="Экзамены и поступление" intro="Контрольные сопровождают учёбу, а переход в старшую школу и университет часто связан со вступительными испытаниями."/><div className="grid gap-10 lg:grid-cols-[1fr_0.75fr]"><div className="space-y-4">{[["Средняя школа","Экзамен","Старшая школа"],["Старшая школа","Вступительные испытания","Университет"]].map(path=><div key={path[0]} className="grid items-center gap-3 border border-border p-5 text-center text-sm font-bold sm:grid-cols-[1fr_auto_1fr_auto_1fr]"><span>{path[0]}</span><ArrowRight className="mx-auto size-4 text-primary"/><span className="text-primary">{path[1]}</span><ArrowRight className="mx-auto size-4 text-primary"/><span>{path[2]}</span></div>)}<p className="text-sm leading-6 text-muted-foreground">Ученики могут готовиться самостоятельно, с учителями или на дополнительных занятиях. Формат и требования зависят от учебного заведения.</p></div><aside className="border-t-4 border-primary bg-paper p-7"><p className="text-5xl font-bold">塾</p><p className="mt-2 font-bold text-primary">juku</p><h3 className="mt-7 text-xl font-bold">Дополнительные учебные центры</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">Частные центры, где учащиеся могут готовиться к экзаменам или получать дополнительную академическую поддержку. Их посещают не все школьники.</p></aside></div></div></section>

        <section id="university" className="section-space bg-foreground text-primary-foreground"><div className="page-shell"><SectionHead number="09 — Высшее образование" title="После школы" intro="Выпускники могут выбирать университеты, колледжи или профессиональные школы."/><div className="grid gap-8 lg:grid-cols-2"><div><div className="grid grid-cols-3 gap-px bg-primary-foreground/20">{[["4 года","Бакалавриат"],["大学院","Магистратура"],["博士課程","Докторантура"]].map(([a,b])=><div key={b} className="bg-foreground p-5"><strong className="text-xl text-primary">{a}</strong><span className="mt-2 block text-xs">{b}</span></div>)}</div><p className="mt-7 text-sm leading-7 text-primary-foreground/70"><strong className="text-primary-foreground">大学 — daigaku</strong> означает университет. <strong className="text-primary-foreground">大学院 — daigakuin</strong> называют последипломную ступень, или graduate school.</p></div><div><p className="mb-4 text-xs font-bold uppercase tracking-[0.12em] text-primary">Примеры университетов, не рейтинг</p>{["University of Tokyo","Kyoto University","Osaka University","Tohoku University"].map((x,i)=><div key={x} className="flex items-center justify-between border-t border-primary-foreground/20 py-4"><span className="font-semibold">{x}</span><span className="text-xs text-primary-foreground/50">0{i+1}</span></div>)}</div></div></div></section>

        <section className="section-space"><div className="page-shell"><SectionHead number="10 — Сравнение" title="Япония и другая школьная система" intro="Параметры помогают увидеть различия, но не определяют, какая система лучше."/><div className="overflow-x-auto border border-border"><table className="w-full min-w-[700px] text-left text-sm"><thead className="bg-paper"><tr><th className="p-5">Категория</th><th className="p-5 text-primary">Япония</th><th className="p-5">Другая система</th></tr></thead><tbody>{[["Возраст начала школы","Обычно около 6 лет","Может отличаться"],["Обязательное образование","Обычно 9 лет","Зависит от страны"],["Начальная школа","6 лет","Разная продолжительность"],["Школьная форма","Распространена, особенно в средней школе","Зависит от школы и страны"],["Школьное питание","Часто организовано школой","Разные модели"],["Уборка школы","Ученики могут участвовать","Чаще выполняет персонал"],["Клубы","Заметная часть школьной жизни","Разная роль"],["Вступительные экзамены","Используются на переходных этапах","Зависит от системы"]].map(row=><tr key={row[0]} className="border-t border-border"><th className="p-5 font-semibold">{row[0]}</th><td className="p-5">{row[1]}</td><td className="p-5 text-muted-foreground">{row[2]}</td></tr>)}</tbody></table></div></div></section>

        <section id="myths" className="section-space bg-paper"><div className="page-shell"><SectionHead number="11 — Проверяем представления" title="Миф или факт?"/><div className="space-y-3">{myths.map(([myth,fact],i)=>{const open=mythsOpen.includes(i); return <article key={myth} className="border border-border bg-background"><button onClick={()=>setMythsOpen(open?mythsOpen.filter(x=>x!==i):[...mythsOpen,i])} className="flex w-full items-center justify-between gap-5 p-6 text-left"><span><strong className="mr-3 text-xs text-primary">МИФ</strong>{myth}</span><ChevronDown className={`size-5 shrink-0 transition-transform ${open?"rotate-180":""}`}/></button>{open&&<div className="border-t border-border p-6"><strong className="text-xs text-navy">ФАКТ</strong><p className="mt-2 leading-7 text-muted-foreground">{fact}</p></div>}</article>})}</div></div></section>

        <section id="glossary" className="section-space"><div className="page-shell"><div className="grid items-end gap-7 md:grid-cols-[1fr_0.6fr]"><SectionHead number="12 — Японские термины" title="Глоссарий"/><label className="relative mb-10 block"><span className="sr-only">Поиск термина</span><Search className="absolute left-4 top-3.5 size-4 text-muted-foreground"/><Input value={glossQuery} onChange={(e)=>setGlossQuery(e.target.value)} className="h-11 pl-11" placeholder="学校, gakkō или школа…"/></label></div><div className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">{filteredGlossary.map(([jp,latin,ru])=><div key={jp} className="flex items-center gap-5 bg-background p-5"><span className="min-w-20 text-2xl font-bold">{jp}</span><span><b className="block text-xs text-primary">{latin}</b><span className="mt-1 block text-sm text-muted-foreground">{ru}</span></span></div>)}</div>{filteredGlossary.length===0&&<p className="border border-border p-8 text-center text-muted-foreground">Термин не найден. Попробуйте другой запрос.</p>}</div></section>

        <section className="section-space bg-foreground text-primary-foreground"><div className="page-shell max-w-4xl"><SectionHead number="13 — Интерактивный тест" title="Насколько хорошо вы знаете систему образования Японии?"/>{quizIndex < quiz.length ? <div><div className="mb-5 flex items-center justify-between text-xs"><span>Вопрос {quizIndex+1} из {quiz.length}</span><span>{Math.round(((quizIndex+1)/quiz.length)*100)}%</span></div><div className="h-1 bg-primary-foreground/20"><div className="h-full bg-primary transition-all" style={{width:`${((quizIndex+1)/quiz.length)*100}%`}}/></div><h3 className="mt-10 text-2xl font-bold md:text-3xl">{quiz[quizIndex].q}</h3><div className="mt-7 grid gap-3">{quiz[quizIndex].options.map((o,i)=>{const answered=answers[quizIndex]!==undefined; const correct=i===quiz[quizIndex].answer; const chosen=answers[quizIndex]===i; return <Button key={o} variant="outline" onClick={()=>chooseAnswer(i)} className={`h-auto justify-start border-primary-foreground/30 bg-transparent px-5 py-4 text-left text-primary-foreground hover:text-foreground ${answered&&correct?"border-primary bg-primary":""} ${answered&&chosen&&!correct?"opacity-50":""}`}>{o}</Button>})}</div>{answers[quizIndex]!==undefined&&<div className="mt-6 border-l-2 border-primary pl-5"><p className="font-bold">{answers[quizIndex]===quiz[quizIndex].answer?"Верно!":"Не совсем."}</p><p className="mt-2 text-sm leading-6 text-primary-foreground/70">{quiz[quizIndex].note}</p><Button className="mt-5" onClick={()=>setQuizIndex(quizIndex+1)}>{quizIndex===quiz.length-1?"Узнать результат":"Следующий вопрос"}<ArrowRight/></Button></div>}</div> : <div className="border-t border-primary pt-8"><p className="text-6xl font-bold text-primary">{answers.filter((a,i)=>a===quiz[i].answer).length}/{quiz.length}</p><h3 className="mt-4 text-2xl font-bold">Тест завершён</h3><p className="mt-3 text-primary-foreground/70">Теперь вы лучше ориентируетесь в ступенях, терминах и школьной жизни Японии.</p><Button className="mt-6" onClick={()=>{setAnswers([]);setQuizIndex(0)}}>Пройти ещё раз</Button></div>}</div></section>

        <section className="section-space"><div className="page-shell"><SectionHead number="Итог" title="Что делает японскую систему образования особенной?"/><div className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">{["6–3–3 структура","9 лет обязательного образования","Жизнь за пределами уроков","Клубная деятельность","Школьное питание","Участие в уборке","Вступительные экзамены","Дополнительная подготовка"].map((x,i)=><div key={x} className="bg-background p-6"><span className="text-xs font-bold text-primary">0{i+1}</span><p className="mt-7 font-semibold">{x}</p></div>)}</div><blockquote className="mx-auto mt-16 max-w-4xl border-l-4 border-primary pl-7 text-2xl font-bold leading-snug md:text-4xl">«Образование в Японии — это не только уроки и экзамены, но и большая часть повседневной жизни ученика».</blockquote></div></section>
      </main>

      <footer className="border-t border-border bg-paper"><div className="page-shell py-12"><div className="grid gap-10 md:grid-cols-[1fr_2fr]"><div><div className="flex items-center gap-3"><span className="h-6 w-6 rounded-full bg-primary"/><strong className="text-sm">ОБРАЗОВАНИЕ ЯПОНИИ</strong></div><p className="mt-4 max-w-xs text-sm text-muted-foreground">О системе образования Японии — понятно, нейтрально и по существу.</p></div><nav className="grid grid-cols-2 gap-4 text-sm sm:grid-cols-3">{[["Система","system"],["Школа","primary"],["Школьная жизнь","life"],["Экзамены","exams"],["Университет","university"],["Глоссарий","glossary"]].map(([a,id])=><button key={id} onClick={()=>go(id)} className="text-left font-semibold hover:text-primary">{a}</button>)}</nav></div><p className="mt-10 border-t border-border pt-6 text-xs leading-5 text-muted-foreground">Информация представлена в образовательных целях. Правила и практика могут различаться в зависимости от школы, региона и уровня образования.</p></div></footer>
    </div>
  );
}