"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Save, Trash2, AlertTriangle, Lock, Globe } from "lucide-react";
import { Button } from "@components/primitives/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@components/primitives/Card";
import { Input } from "@components/primitives/Input";
import { Label } from "@components/primitives/Label";
import { useStableStore } from "@stores/stableStore";
import { CountUp } from "@components/animation/CountUp";
import { StaggerContainer, StaggerItem } from "@components/animation/StaggerContainer";

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
            <div className="flex gap-2 relative">
              <motion.div
                className="absolute inset-0 bg-primary-500 rounded-md"
                initial={false}
                animate={{
                  x: stable.isPublic ? "100%" : "0%",
                  opacity: stable.isPublic ? 0 : 1,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                style={{ width: "50%" }}
              />
              <Button
                variant={stable.isPublic ? "outline" : "default"}
                className="flex-1 relative z-10"
                onClick={() => !stable.isPublic || togglePrivacy()}
              >
                <motion.div
                  animate={{ scale: stable.isPublic ? 0.9 : 1 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Lock className="h-4 w-4 mr-2" />
                </motion.div>
                Yksityinen
              </Button>
              <Button
                variant={stable.isPublic ? "default" : "outline"}
                className="flex-1 relative z-10"
                onClick={() => stable.isPublic || togglePrivacy()}
              >
                <motion.div
                  animate={{ scale: stable.isPublic ? 1 : 0.9 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Globe className="h-4 w-4 mr-2" />
                </motion.div>
                Julkinen
              </Button>
            </div>
            <motion.p 
              className="text-sm text-muted-foreground"
              initial={false}
              animate={{ opacity: 1 }}
              key={stable.isPublic ? "public" : "private"}
            >
              {stable.isPublic
                ? "Tallisi on julkinen. Muut käyttäjät voivat nähdä perustiedot."
                : "Tallisi on yksityinen. Vain sinä näet tallin sisällön."}
            </motion.p>
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
            <motion.div 
              className="p-4 bg-muted rounded-lg text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <p className="text-2xl font-bold">
                <CountUp end={horses.length} duration={1} />
              </p>
              <p className="text-sm text-muted-foreground">Hevoset</p>
            </motion.div>
            <motion.div 
              className="p-4 bg-muted rounded-lg text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <p className="text-2xl font-bold">
                <CountUp end={expenses.length} duration={1} />
              </p>
              <p className="text-sm text-muted-foreground">Kulut</p>
            </motion.div>
            <motion.div 
              className="p-4 bg-muted rounded-lg text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <p className="text-2xl font-bold">
                <CountUp end={events.length} duration={1} />
              </p>
              <p className="text-sm text-muted-foreground">Tapahtumat</p>
            </motion.div>
            <motion.div 
              className="p-4 bg-muted rounded-lg text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <p className="text-2xl font-bold">
                <CountUp 
                  end={Math.floor((Date.now() - new Date(stable.createdAt).getTime()) / (1000 * 60 * 60 * 24))} 
                  duration={1.5} 
                />
              </p>
              <p className="text-sm text-muted-foreground">Päivää tallissa</p>
            </motion.div>
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
            <motion.p 
              className="text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Ei hevosia hallinnoitavaksi
            </motion.p>
          ) : (
            <StaggerContainer className="space-y-2">
              {horses.map((horse) => (
                <StaggerItem key={horse.id}>
                  <motion.div
                    className="flex items-center justify-between p-3 bg-muted rounded-lg"
                    whileHover={{ scale: 1.01, x: 4 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    <div>
                      <p className="font-medium">{horse.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {horse.breed} • {horse.age} v
                      </p>
                    </div>
                    <motion.div
                      whileHover={{ 
                        scale: 1.05,
                        x: [0, -2, 2, -2, 2, 0],
                      }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 400,
                        x: { duration: 0.4 }
                      }}
                    >
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-error hover:text-error hover:bg-error/10"
                        onClick={() => handleDeleteHorse(horse.id, horse.name)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Poista
                      </Button>
                    </motion.div>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
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
            <motion.div
              whileHover={{ 
                scale: 1.05,
                x: [0, -3, 3, -3, 3, 0],
              }}
              transition={{ 
                type: "spring", 
                stiffness: 400,
                x: { duration: 0.5 }
              }}
            >
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
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
