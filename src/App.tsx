import { useEffect, useState } from "react";
import { Search, Calendar, Clock, Home, Menu, X, BookOpen, Info, ChevronRight } from "lucide-react";
import { Button } from "@components/primitives/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@components/primitives/Card";
import { useThemeStore, initializeTheme } from "@stores/themeStore";
import {
  useLayoutStore,
  initializeBreakpointDetection,
} from "@stores/layoutStore";
import { cn } from "@lib/utils";
import { BookingWizard } from "@components/booking/BookingWizard";
import { Lesson } from "@components/booking/types";
import { CalendarPicker } from "@components/ui/CalendarPicker";

// Mock lesson/booking data (tunti/vuoro)
const mockLessons = [
  {
    id: 1,
    title: "Aikuisten alkeistunti",
    stable: "Tampereen Ratsastuskeskus",
    location: "Tampere",
    date: "Ma 27.4.",
    time: "17:00 - 18:00",
    duration: "60 min",
    price: "35 €",
    spots: 3,
    type: "Alkeet",
    instructor: "Maija Meikäläinen",
  },
  {
    id: 2,
    title: "Lasten ponitunti",
    stable: "Espoon Talli",
    location: "Espoo",
    date: "Ti 28.4.",
    time: "16:00 - 17:00",
    duration: "60 min",
    price: "30 €",
    spots: 5,
    type: "Ponitunti",
    instructor: "Liisa Ratsastaja",
  },
  {
    id: 3,
    title: "Kouluratsastus - Vaativa",
    stable: "Vuokatin Ratsastuskoulu",
    location: "Vuokatti",
    date: "Ke 29.4.",
    time: "18:30 - 20:00",
    duration: "90 min",
    price: "55 €",
    spots: 2,
    type: "Koulu",
    instructor: "Kalle Kouluttaja",
  },
  {
    id: 4,
    title: "Estevalmennus",
    stable: "Hevoslehdon Ratsastustalli",
    location: "Helsinki",
    date: "To 30.4.",
    time: "17:30 - 19:00",
    duration: "90 min",
    price: "50 €",
    spots: 4,
    type: "Este",
    instructor: "Essi Estemies",
  },
];

// Mock guidance/help content
const mockGuidance = [
  {
    id: 1,
    title: "Ensimmäistä kertaa tallille?",
    description: "Tutustu ratsastuksen alkeisiin ja varaa ensimmäinen tuntisi.",
    icon: BookOpen,
    action: "Lue ohjeet",
  },
  {
    id: 2,
    title: "Miten varaan tunnin?",
    description: "Opas tuntien varaamiseen ja maksamiseen TalliAppissa.",
    icon: Info,
    action: "Katso ohje",
  },
  {
    id: 3,
    title: "Varustepaketti",
    description: "Mitä tarvitset mukaan ratsastustunnille?",
    icon: Info,
    action: "Katso lista",
  },
];

function ThemeToggle() {
  const { mode, toggleMode } = useThemeStore();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleMode}
      aria-label="Vaihda teema"
    >
      {mode === "dark" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2" />
          <path d="M12 20v2" />
          <path d="m4.93 4.93 1.41 1.41" />
          <path d="m17.66 17.66 1.41 1.41" />
          <path d="M2 12h2" />
          <path d="M20 12h2" />
          <path d="m6.34 17.66-1.41 1.41" />
          <path d="m19.07 4.93-1.41 1.41" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
      )}
    </Button>
  );
}

function Header() {
  const { isMobile, mobileNavOpen, toggleMobileNav } = useLayoutStore();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Home className="h-8 w-8 text-primary-500" />
          <span className="text-xl font-bold">TalliApp</span>
        </div>

        {isMobile ? (
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button variant="ghost" size="icon" onClick={toggleMobileNav}>
              {mobileNavOpen ? <X /> : <Menu />}
            </Button>
          </div>
        ) : (
          <nav className="flex items-center gap-6">
            <a
              href="#"
              className="text-sm font-medium hover:text-primary-500 transition-colors"
            >
              Tallihaku
            </a>
            <a
              href="#"
              className="text-sm font-medium hover:text-primary-500 transition-colors"
            >
              Tuntihaku
            </a>
            <a
              href="#"
              className="text-sm font-medium hover:text-primary-500 transition-colors"
            >
              Ohjeet
            </a>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                Kirjaudu
              </Button>
              <Button size="sm">Rekisteröidy</Button>
              <ThemeToggle />
            </div>
          </nav>
        )}
      </div>

      {/* Mobile Navigation */}
      {isMobile && mobileNavOpen && (
        <div className="border-t bg-background px-4 py-4">
          <nav className="flex flex-col gap-4">
            <a
              href="#"
              className="text-base font-medium hover:text-primary-500"
            >
              Tallihaku
            </a>
            <a
              href="#"
              className="text-base font-medium hover:text-primary-500"
            >
              Tuntihaku
            </a>
            <a
              href="#"
              className="text-base font-medium hover:text-primary-500"
            >
              Ohjeet
            </a>
            <div className="flex gap-2 pt-2">
              <Button variant="outline" className="flex-1">
                Kirjaudu
              </Button>
              <Button className="flex-1">Rekisteröidy</Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

function Hero() {
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const formatDateButton = () => {
    if (!selectedDate) return "Päivä";
    const day = selectedDate.getDate();
    const month = selectedDate.getMonth() + 1;
    return `${day}.${month}.`;
  };

  return (
    <section className="relative py-20 lg:py-32 bg-gradient-to-b from-primary-50 to-background dark:from-primary-950 dark:to-background">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
          Varaa ratsastustunti helposti
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Etsi vapaat vuorot, vertaile hintoja ja varaa tunti suoraan.
          Sopii niin aloittelijoille kuin kokeneille ratsastajille.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Hae tuntia, tallia tai paikkakuntaa..."
              className="w-full h-10 pl-10 pr-4 rounded-md border border-input bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            />
          </div>
          <div className="flex gap-2 relative">
            <div className="relative">
              <Button
                variant={selectedDate ? "default" : "outline"}
                className="h-10"
                onClick={() => setCalendarOpen(!calendarOpen)}
              >
                <Calendar className="mr-2 h-4 w-4" />
                {formatDateButton()}
              </Button>
              {calendarOpen && (
                <div className="absolute top-full left-0 mt-2 z-50">
                  <CalendarPicker
                    selectedDate={selectedDate}
                    onSelect={(date) => {
                      setSelectedDate(date);
                      setCalendarOpen(false);
                    }}
                    onClose={() => setCalendarOpen(false)}
                  />
                </div>
              )}
            </div>
            <Button className="h-10">Hae</Button>
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-4 mt-6 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            Varaa 24/7
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            Peruutus jopa 24h ennen
          </span>
        </div>
      </div>
    </section>
  );
}

function LessonCard({ lesson, onBook }: { lesson: Lesson; onBook: (lesson: Lesson) => void }) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all cursor-pointer group border-l-4 border-l-primary-500">
      <CardHeader className="p-4 pb-2">
        <div className="flex items-start justify-between gap-2">
          <div>
            <span className="inline-flex items-center rounded-full bg-primary-100 dark:bg-primary-900 px-2 py-0.5 text-xs font-medium text-primary-700 dark:text-primary-300 mb-2">
              {lesson.type}
            </span>
            <CardTitle className="text-lg group-hover:text-primary-500 transition-colors line-clamp-1">
              {lesson.title}
            </CardTitle>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-primary-600">{lesson.price}</p>
          </div>
        </div>
        <CardDescription className="flex items-center gap-1 mt-1">
          <Home className="h-3 w-3" />
          {lesson.stable}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="space-y-2">
          <div className="flex items-center gap-4 text-sm">
            <span className="flex items-center gap-1 font-medium">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              {lesson.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4 text-muted-foreground" />
              {lesson.time}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              Ohjaaja: {lesson.instructor}
            </span>
            <span className={cn(
              "font-medium",
              lesson.spots <= 2 ? "text-warning" : "text-success"
            )}>
              {lesson.spots} paikkaa jäljellä
            </span>
          </div>
          <Button className="w-full mt-2" onClick={() => onBook(lesson)}>
            Varaa nyt
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function AvailableLessons({ onBook }: { onBook: (lesson: Lesson) => void }) {
  const { breakpoint } = useLayoutStore();

  const getGridCols = () => {
    switch (breakpoint) {
      case "xs":
      case "sm":
        return "grid-cols-1";
      case "md":
        return "grid-cols-2";
      case "lg":
      case "xl":
      case "2xl":
        return "grid-cols-2 lg:grid-cols-4";
      default:
        return "grid-cols-1";
    }
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">Tulevat tunnit</h2>
            <p className="text-muted-foreground mt-1">
              Vapaat vuorot seuraavalle 7 päivälle
            </p>
          </div>
          <Button variant="ghost" className="hidden sm:flex">
            Näytä kaikki
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
        <div className={cn("grid gap-6", getGridCols())}>
          {mockLessons.map((lesson) => (
            <LessonCard key={lesson.id} lesson={lesson as Lesson} onBook={onBook} />
          ))}
        </div>
      </div>
    </section>
  );
}

function GuidanceHelp() {
  return (
    <section className="py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
          Ohjeita ja apua
        </h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
          Uusi ratsastaja? Tarvitsetko apua varauksessa? Tutustu ohjeisiin.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {mockGuidance.map((guide) => (
            <Card key={guide.id} className="hover:shadow-md transition-shadow cursor-pointer group">
              <CardHeader className="pb-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-secondary-100 dark:bg-secondary-900 flex items-center justify-center shrink-0">
                    <guide.icon className="h-5 w-5 text-secondary-600" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg group-hover:text-secondary-500 transition-colors">
                      {guide.title}
                    </CardTitle>
                    <CardDescription className="mt-1">
                      {guide.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <Button variant="ghost" className="text-secondary-600 hover:text-secondary-700 p-0 h-auto">
                  {guide.action}
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      icon: Search,
      title: "1. Etsi tunti",
      description:
        "Selaa vapaita vuoroja tai hae tietyn tyyppistä tuntia lähelläsi.",
    },
    {
      icon: Calendar,
      title: "2. Varaa aika",
      description:
        "Valitse sopiva aika ja varaa paikkasi. Saat vahvistuksen sähköpostiin.",
    },
    {
      icon: BookOpen,
      title: "3. Ratsasta!",
      description:
        "Tule tallille ja nauti ratsastuksesta. Muista varusteet tai vuokraa ne paikan päällä.",
    },
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
          Näin varaat tunnin
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="text-center border-t-4 border-t-primary-500">
              <CardHeader>
                <div className="mx-auto w-14 h-14 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center mb-4">
                  <step.icon className="h-7 w-7 text-primary-600" />
                </div>
                <CardTitle className="text-xl">{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{step.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Home className="h-6 w-6 text-primary-600" />
            <span className="font-semibold">TalliApp</span>
          </div>
          <p className="text-sm text-muted-foreground">
            2026 TalliApp. Ratsastuksen uusi koti.
          </p>
          <div className="flex gap-4">
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Tietoa
            </a>
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Käyttöehdot
            </a>
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Yhteys
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function App() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

  useEffect(() => {
    // Initialize theme
    initializeTheme();

    // Initialize breakpoint detection
    const cleanup = initializeBreakpointDetection();

    return () => {
      cleanup();
    };
  }, []);

  const handleBook = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    setBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setBookingOpen(false);
    setSelectedLesson(null);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <AvailableLessons onBook={handleBook} />
        <HowItWorks />
        <GuidanceHelp />
      </main>
      <Footer />

      <BookingWizard
        lesson={selectedLesson}
        open={bookingOpen}
        onClose={handleCloseBooking}
      />
    </div>
  );
}

export default App;
