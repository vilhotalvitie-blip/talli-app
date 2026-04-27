import { useState } from "react";
import { ArrowLeft, ChevronRight, Home } from "lucide-react";
import { Button } from "@components/primitives/Button";
import { StableDashboard } from "./StableDashboard";
import { HorseDetail } from "./HorseDetail";
import { BudgetDashboard } from "./BudgetDashboard";
import { StableCalendar } from "./StableCalendar";
import { StableSettings } from "./StableSettings";

type StableView = "dashboard" | "horse-detail" | "budget" | "calendar" | "settings";

export function StablePage() {
  const [currentView, setCurrentView] = useState<StableView>("dashboard");
  const [selectedHorseId, setSelectedHorseId] = useState<string | null>(null);

  const handleViewHorse = (horseId: string) => {
    setSelectedHorseId(horseId);
    setCurrentView("horse-detail");
  };

  const handleBackToDashboard = () => {
    setCurrentView("dashboard");
    setSelectedHorseId(null);
  };

  const handleViewBudget = () => {
    setCurrentView("budget");
  };

  const handleViewCalendar = () => {
    setCurrentView("calendar");
  };

  const handleViewSettings = () => {
    setCurrentView("settings");
  };

  // Breadcrumb navigation
  const renderBreadcrumb = () => {
    const items: Array<{ label: string; onClick?: () => void }> = [
      { label: "TalliApp", onClick: () => {} }
    ];

    if (currentView !== "dashboard") {
      items.push({ label: "Minun Talli", onClick: handleBackToDashboard });
    } else {
      items.push({ label: "Minun Talli" });
    }

    if (currentView === "horse-detail" && selectedHorseId) {
      items.push({ label: "Hevosen tiedot" });
    } else if (currentView === "budget") {
      items.push({ label: "Budjetti" });
    } else if (currentView === "calendar") {
      items.push({ label: "Kalenteri" });
    } else if (currentView === "settings") {
      items.push({ label: "Asetukset" });
    }

    return (
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            {index > 0 && <ChevronRight className="h-4 w-4" />}
            {item.onClick ? (
              <button
                onClick={item.onClick}
                className="hover:text-foreground transition-colors"
              >
                {item.label}
              </button>
            ) : (
              <span className="text-foreground font-medium">{item.label}</span>
            )}
          </div>
        ))}
      </nav>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-30">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {currentView !== "dashboard" && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBackToDashboard}
                className="mr-2"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Takaisin
              </Button>
            )}
            <a href="/" className="flex items-center gap-2 font-bold text-lg">
              <Home className="h-5 w-5 text-primary-500" />
              TalliApp
            </a>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <a href="/">Etusivu</a>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {renderBreadcrumb()}

        {currentView === "dashboard" && (
          <StableDashboard
            onViewHorse={handleViewHorse}
            onViewBudget={handleViewBudget}
            onViewCalendar={handleViewCalendar}
            onViewSettings={handleViewSettings}
          />
        )}

        {currentView === "settings" && (
          <StableSettings onBack={handleBackToDashboard} />
        )}

        {currentView === "horse-detail" && selectedHorseId && (
          <HorseDetail
            horseId={selectedHorseId}
            onBack={handleBackToDashboard}
          />
        )}

        {currentView === "budget" && (
          <BudgetDashboard onBack={handleBackToDashboard} />
        )}

        {currentView === "calendar" && (
          <StableCalendar onBack={handleBackToDashboard} />
        )}
      </main>
    </div>
  );
}
