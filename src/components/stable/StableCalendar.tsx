import { ArrowLeft, Plus, Calendar, Clock, CheckCircle2, Circle } from "lucide-react";
import { Button } from "@components/primitives/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@components/primitives/Card";
import { useState } from "react";
import { useStableStore, CalendarEvent } from "@stores/stableStore";
import { cn } from "@lib/utils";
import { AddEventModal } from "./AddEventModal";

interface StableCalendarProps {
  onBack: () => void;
}

const eventTypeLabels: Record<string, string> = {
  kengitys: "Kengitys",
  hammashoito: "Hammashoito",
  elainlaakari: "Eläinlääkäri",
  kilpailu: "Kilpailu",
  valmennus: "Valmennus",
  rokotus: "Rokotus",
  muu: "Muu",
};

const eventTypeColors: Record<string, string> = {
  kengitys: "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300",
  hammashoito: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
  elainlaakari: "bg-rose-100 text-rose-700 dark:bg-rose-900 dark:text-rose-300",
  kilpailu: "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300",
  valmennus: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
  rokotus: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
  muu: "bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300",
};

export function StableCalendar({ onBack }: StableCalendarProps) {
  const { events, horses, completeEvent } = useStableStore();
  const [addEventOpen, setAddEventOpen] = useState(false);

  // Sort events by date
  const sortedEvents = [...events].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const upcomingEvents = sortedEvents.filter((e) => !e.completed);
  const completedEvents = sortedEvents.filter((e) => e.completed);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Takaisin
        </Button>
        <h1 className="text-2xl font-bold">Kalenteri</h1>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-primary-100 dark:bg-primary-900 rounded-lg">
                <Calendar className="h-4 w-4 text-primary-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Kaikki tapahtumat</p>
                <p className="text-2xl font-bold">{events.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-secondary-100 dark:bg-secondary-900 rounded-lg">
                <Clock className="h-4 w-4 text-secondary-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Tulevat</p>
                <p className="text-2xl font-bold">{upcomingEvents.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-success/20 rounded-lg">
                <CheckCircle2 className="h-4 w-4 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Tehdyt</p>
                <p className="text-2xl font-bold">{completedEvents.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Events */}
      <Card>
        <CardHeader>
          <CardTitle>Tulevat tapahtumat</CardTitle>
          <CardDescription>Seuraavat merkityt tapahtumat</CardDescription>
        </CardHeader>
        <CardContent>
          {upcomingEvents.length === 0 ? (
            <p className="text-muted-foreground">Ei tulevia tapahtumia</p>
          ) : (
            <div className="space-y-3">
              {upcomingEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  horse={horses.find((h) => h.id === event.horseId)}
                  onComplete={() => completeEvent(event.id)}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Completed Events */}
      {completedEvents.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-muted-foreground">Tehdyt tapahtumat</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {completedEvents.slice(0, 5).map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  horse={horses.find((h) => h.id === event.horseId)}
                  completed
                />
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Button className="w-full" onClick={() => setAddEventOpen(true)}>
        <Plus className="mr-2 h-4 w-4" />
        Lisää tapahtuma
      </Button>

      {/* Add Event Modal */}
      <AddEventModal
        open={addEventOpen}
        onClose={() => setAddEventOpen(false)}
      />
    </div>
  );
}

function EventCard({
  event,
  horse,
  onComplete,
  completed = false,
}: {
  event: CalendarEvent;
  horse?: { name: string };
  onComplete?: () => void;
  completed?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-start gap-3 p-4 rounded-lg border",
        completed ? "bg-muted/50 border-muted" : "bg-background"
      )}
    >
      <button
        onClick={onComplete}
        className={cn(
          "mt-0.5 shrink-0",
          completed ? "text-success" : "text-muted-foreground hover:text-success"
        )}
        disabled={completed}
      >
        {completed ? (
          <CheckCircle2 className="h-5 w-5" />
        ) : (
          <Circle className="h-5 w-5" />
        )}
      </button>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className={cn(
              "inline-flex px-2 py-0.5 rounded-full text-xs font-medium",
              eventTypeColors[event.type] || eventTypeColors["muu"]
            )}
          >
            {eventTypeLabels[event.type] || event.type}
          </span>
          <span className="font-medium">{event.title}</span>
        </div>

        <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
          <span>{event.date}</span>
          {event.time && <span>klo {event.time}</span>}
          {horse && <span>• {horse.name}</span>}
        </div>

        {event.notes && (
          <p className="text-sm text-muted-foreground mt-2">{event.notes}</p>
        )}
      </div>
    </div>
  );
}
