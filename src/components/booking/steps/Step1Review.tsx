import { Calendar, Clock, MapPin, Home, User } from "lucide-react";
import { Button } from "@components/primitives/Button";
import { Card, CardContent } from "@components/primitives/Card";
import { Lesson } from "../types";

interface Step1ReviewProps {
  lesson: Lesson;
  onNext: () => void;
  onCancel: () => void;
}

export function Step1Review({ lesson, onNext, onCancel }: Step1ReviewProps) {
  return (
    <div className="p-6 space-y-6">
      {/* Lesson Summary Card */}
      <Card>
        <div className="aspect-video bg-muted relative overflow-hidden rounded-t-lg">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
          <div className="absolute bottom-3 left-3 z-20">
            <span className="inline-flex items-center rounded-full bg-primary-500 px-3 py-1 text-sm font-medium text-white">
              {lesson.type}
            </span>
          </div>
          <div className="absolute inset-0 bg-primary-50 dark:bg-primary-900 flex items-center justify-center">
            <Home className="h-16 w-16 text-primary-200" />
          </div>
        </div>
        <CardContent className="p-4 space-y-4">
          <div>
            <h3 className="text-lg font-semibold">{lesson.title}</h3>
            <p className="text-muted-foreground flex items-center gap-1 mt-1">
              <Home className="h-4 w-4" />
              {lesson.stable}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2 border-t">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{lesson.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{lesson.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{lesson.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{lesson.instructor}</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t">
            <span className="text-sm text-muted-foreground">Kesto</span>
            <span className="font-medium">{lesson.duration}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Hinta</span>
            <span className="text-xl font-bold text-primary-600">{lesson.price}</span>
          </div>
        </CardContent>
      </Card>

      {/* Info box */}
      <div className="bg-muted/50 rounded-lg p-4 text-sm space-y-2">
        <p className="font-medium">Varauksen tiedot:</p>
        <ul className="space-y-1 text-muted-foreground list-disc list-inside">
          <li>Vahvistus sähköpostiin varauksen jälkeen</li>
          <li>Maksu paikan päällä tai verkkomaksuna</li>
          <li>Peruutus mahdollista 24h ennen tuntia</li>
          <li>Osallistujia vielä jäljellä: {lesson.spots}</li>
        </ul>
      </div>

      {/* Action buttons */}
      <div className="flex gap-3 pt-4">
        <Button variant="outline" onClick={onCancel} className="flex-1">
          Peruuta
        </Button>
        <Button onClick={onNext} className="flex-1">
          Jatka
        </Button>
      </div>
    </div>
  );
}
