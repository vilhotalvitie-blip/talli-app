import { useEffect } from "react";
import { Search, MapPin, Calendar, Home, Menu, X } from "lucide-react";
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

// Mock stable data
const mockStables = [
  {
    id: 1,
    name: "Tampereen Ratsastuskeskus",
    location: "Tampere",
    type: "Ratsastuskoulu",
    image: "/stable1.jpg",
  },
  {
    id: 2,
    name: "Espoon Talli",
    location: "Espoo",
    type: "Talli",
    image: "/stable2.jpg",
  },
  {
    id: 3,
    name: "Vuokatin Ratsastuskoulu",
    location: "Vuokatti",
    type: "Ratsastuskoulu",
    image: "/stable3.jpg",
  },
  {
    id: 4,
    name: "Hevoslehdon Ratsastustalli",
    location: "Helsinki",
    type: "Talli",
    image: "/stable4.jpg",
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
  return (
    <section className="relative py-20 lg:py-32 bg-gradient-to-b from-primary-50 to-background dark:from-primary-950 dark:to-background">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
          Ratsastuksen uusi koti
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Etsi sopiva talli ja varaa ratsastustuntisi helposti. TalliApp tuo
          ratsastuksen lähemmäs sinua.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Hae tallia tai paikkakuntaa..."
              className="w-full h-10 pl-10 pr-4 rounded-md border border-input bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            />
          </div>
          <Button className="h-10">Hae</Button>
        </div>
      </div>
    </section>
  );
}

function StableCard({ stable }: { stable: (typeof mockStables)[0] }) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
      <div className="aspect-video bg-muted relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
        <div className="absolute bottom-3 left-3 z-20">
          <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-background text-foreground">
            {stable.type}
          </span>
        </div>
        <div className="absolute inset-0 bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
          <Home className="h-12 w-12 text-primary-400" />
        </div>
      </div>
      <CardHeader className="p-4">
        <CardTitle className="text-lg group-hover:text-primary-500 transition-colors">
          {stable.name}
        </CardTitle>
        <CardDescription className="flex items-center gap-1">
          <MapPin className="h-3 w-3" />
          {stable.location}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}

function FeaturedStables() {
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
        return "grid-cols-4";
      default:
        return "grid-cols-1";
    }
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">Suositellut tallit</h2>
          <Button variant="ghost" className="hidden sm:flex">
            Näytä kaikki
          </Button>
        </div>
        <div className={cn("grid gap-6", getGridCols())}>
          {mockStables.map((stable) => (
            <StableCard key={stable.id} stable={stable} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Features() {
  const features = [
    {
      icon: Search,
      title: "Helppo haku",
      description:
        "Löydä tallit lähelläsi tai etsi tietyn alueen ratsastuskeskuksia.",
    },
    {
      icon: Calendar,
      title: "Varaa tunteja",
      description:
        "Tutustu tarjontaan ja varaa ratsastustunnit suoraan verkossa.",
    },
    {
      icon: Home,
      title: "Tallien hallinta",
      description:
        "Hallinnoi omaa talliasi ja tarjoa palveluitasi ratsastajille.",
    },
  ];

  return (
    <section className="py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
          Miten TalliApp toimii
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary-600" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
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
  useEffect(() => {
    // Initialize theme
    initializeTheme();

    // Initialize breakpoint detection
    const cleanup = initializeBreakpointDetection();

    return () => {
      cleanup();
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <FeaturedStables />
        <Features />
      </main>
      <Footer />
    </div>
  );
}

export default App;
