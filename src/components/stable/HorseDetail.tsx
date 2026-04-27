import { Activity, Calendar, Euro, FileText } from "lucide-react";
import { Button } from "@components/primitives/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@components/primitives/Card";
import { useStableStore } from "@stores/stableStore";
import { cn } from "@lib/utils";
import { HorseAvatar } from "./HorseAvatar";

interface HorseDetailProps {
  horseId: string;
  onBack: () => void;
}

export function HorseDetail({ horseId, onBack }: HorseDetailProps) {
  const { horses, events, expenses } = useStableStore();
  const horse = horses.find((h) => h.id === horseId);

  if (!horse) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Hevosta ei löytynyt</p>
        <Button onClick={onBack} className="mt-4">
          Takaisin
        </Button>
      </div>
    );
  }

  const horseEvents = events.filter((e) => e.horseId === horseId);
  const horseExpenses = expenses.filter((e) => e.horseId === horseId);
  const totalExpenses = horseExpenses.reduce((sum, e) => sum + e.amount, 0);

  const genderColors = {
    tamma: "bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-300",
    ruuna: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
    ori: "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300",
  };

  const genderLabels = {
    tamma: "Tamma",
    ruuna: "Ruuna",
    ori: "Ori",
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start gap-4">
        <HorseAvatar
          breed={horse.breed}
          color={horse.color}
          height={horse.height}
          weight={horse.weight}
          gender={horse.gender}
          size="lg"
        />
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className={cn("px-2 py-0.5 rounded-full text-xs font-medium", genderColors[horse.gender])}>
              {genderLabels[horse.gender]}
            </span>
          </div>
          <h1 className="text-2xl font-bold">{horse.name}</h1>
          <p className="text-muted-foreground">{horse.breed}</p>
          
          <div className="flex flex-wrap gap-4 mt-4 text-sm">
            <div>
              <span className="text-muted-foreground">Ikä</span>
              <p className="font-medium">{horse.age} vuotta</p>
            </div>
            <div>
              <span className="text-muted-foreground">Väri</span>
              <p className="font-medium">{horse.color}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Säkäkorkeus</span>
              <p className="font-medium">{horse.height} cm</p>
            </div>
            <div>
              <span className="text-muted-foreground">Paino</span>
              <p className="font-medium">{horse.weight} kg</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-primary-100 dark:bg-primary-900 rounded-lg">
                <Calendar className="h-4 w-4 text-primary-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Tapahtumat</p>
                <p className="text-xl font-bold">{horseEvents.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-warning/20 rounded-lg">
                <Euro className="h-4 w-4 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Kulut yhteensä</p>
                <p className="text-xl font-bold">{totalExpenses} €</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-secondary-100 dark:bg-secondary-900 rounded-lg">
                <Activity className="h-4 w-4 text-secondary-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <p className="text-xl font-bold">Aktiivinen</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Tiedot
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {horse.acquisitionDate && (
              <div>
                <span className="text-sm text-muted-foreground">Hankittu</span>
                <p className="font-medium">{horse.acquisitionDate}</p>
              </div>
            )}
            <div>
              <span className="text-sm text-muted-foreground">Merkintöjä</span>
              <p className="font-medium">{horse.notes || "Ei merkintöjä"}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Viimeisimmät tapahtumat</CardTitle>
            <CardDescription>Hevosen viimeiset tapahtumat</CardDescription>
          </CardHeader>
          <CardContent>
            {horseEvents.length === 0 ? (
              <p className="text-sm text-muted-foreground">Ei tapahtumia</p>
            ) : (
              <div className="space-y-2">
                {horseEvents.slice(0, 5).map((event) => (
                  <div key={event.id} className="flex items-center justify-between p-2 bg-muted rounded">
                    <span className="text-sm font-medium">{event.title}</span>
                    <span className="text-sm text-muted-foreground">{event.date}</span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
