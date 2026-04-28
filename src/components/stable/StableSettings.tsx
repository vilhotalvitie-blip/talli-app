import { ArrowLeft, Save, Trash2, AlertTriangle, Lock, Globe } from "lucide-react";
import { Button } from "@components/primitives/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@components/primitives/Card";
import { Input } from "@components/primitives/Input";
import { Label } from "@components/primitives/Label";
import { useStableStore } from "@stores/stableStore";
import { HorseAvatar } from "./HorseAvatar";

interface StableSettingsProps {
  onBack: () => void;
}

export function StableSettings({ onBack }: StableSettingsProps) {
  const { stable, horses, expenses, events, renameStable, togglePrivacy, removeHorse } = useStableStore();

  const handleSaveName = (newName: string) => {
    if (newName.trim()) {
      renameStable(newName.trim());
    }
  };

  const handleDeleteHorse = (horseId: string, horseName: string) => {
    if (confirm(`Oletko varma että haluat poistaa hevosen "${horseName}"? Tämä poistaa myös kaikki hevosen kulut ja tapahtumat.`)) {
      removeHorse(horseId);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Takaisin
        </Button>
        <h1 className="text-2xl font-bold">Tallin asetukset</h1>
      </div>

      {/* General Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Yleiset asetukset</CardTitle>
          <CardDescription>Hallinnoi tallisi perustietoja</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Stable Name */}
          <div className="space-y-2">
            <Label htmlFor="stableName">Tallin nimi</Label>
            <div className="flex gap-2">
              <Input
                id="stableName"
                defaultValue={stable.name}
                onBlur={(e: React.FocusEvent<HTMLInputElement>) => handleSaveName(e.target.value)}
                placeholder="Esim. Minun Talli"
                className="flex-1"
              />
              <Button variant="outline" size="icon">
                <Save className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Privacy Toggle */}
          <div className="space-y-2">
            <Label>Yksityisyys</Label>
            <div className="flex gap-2">
              <Button
                variant={stable.isPublic ? "outline" : "default"}
                className="flex-1"
                onClick={() => !stable.isPublic || togglePrivacy()}
              >
                <Lock className="h-4 w-4 mr-2" />
                Yksityinen
              </Button>
              <Button
                variant={stable.isPublic ? "default" : "outline"}
                className="flex-1"
                onClick={() => stable.isPublic || togglePrivacy()}
              >
                <Globe className="h-4 w-4 mr-2" />
                Julkinen
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              {stable.isPublic
                ? "Tallisi on julkinen. Muut käyttäjät voivat nähdä perustiedot."
                : "Tallisi on yksityinen. Vain sinä näet tallin sisällön."}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Tilastot</CardTitle>
          <CardDescription>Yhteenveto tallin tiedoista</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-muted rounded-lg text-center">
              <p className="text-2xl font-bold">{horses.length}</p>
              <p className="text-sm text-muted-foreground">Hevoset</p>
            </div>
            <div className="p-4 bg-muted rounded-lg text-center">
              <p className="text-2xl font-bold">{expenses.length}</p>
              <p className="text-sm text-muted-foreground">Kulut</p>
            </div>
            <div className="p-4 bg-muted rounded-lg text-center">
              <p className="text-2xl font-bold">{events.length}</p>
              <p className="text-sm text-muted-foreground">Tapahtumat</p>
            </div>
            <div className="p-4 bg-muted rounded-lg text-center">
              <p className="text-2xl font-bold">
                {Math.floor((Date.now() - new Date(stable.createdAt).getTime()) / (1000 * 60 * 60 * 24))}
              </p>
              <p className="text-sm text-muted-foreground">Päivää tallissa</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Horse Management */}
      <Card>
        <CardHeader>
          <CardTitle>Hevosten hallinta</CardTitle>
          <CardDescription>Poista hevosia tallista</CardDescription>
        </CardHeader>
        <CardContent>
          {horses.length === 0 ? (
            <p className="text-muted-foreground">Ei hevosia hallinnoitavaksi</p>
          ) : (
            <div className="space-y-2">
              {horses.map((horse) => (
                <div
                  key={horse.id}
                  className="flex items-center justify-between p-3 bg-muted rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <HorseAvatar horse={horse} size="sm" />
                    <div>
                      <p className="font-medium">{horse.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {horse.breed} • {horse.age} v
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-error hover:text-error hover:bg-error/10"
                    onClick={() => handleDeleteHorse(horse.id, horse.name)}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Poista
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Data Management */}
      <Card className="border-warning/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-warning">
            <AlertTriangle className="h-5 w-5" />
            Tietojen hallinta
          </CardTitle>
          <CardDescription>Varoitus: Nämä toiminnot ovat peruuttamattomia</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-warning/10 rounded-lg">
            <div>
              <p className="font-medium">Tyhjennä kaikki tiedot</p>
              <p className="text-sm text-muted-foreground">
                Poista kaikki hevoset, kulut ja tapahtumat
              </p>
            </div>
            <Button
              variant="outline"
              className="text-error border-error hover:bg-error/10"
              onClick={() => {
                if (confirm("Oletko varma? Tämä poistaa KAIKKI tallin tiedot pysyvästi!")) {
                  // Clear all data
                  horses.forEach((h) => removeHorse(h.id));
                }
              }}
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Tyhjennä
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
