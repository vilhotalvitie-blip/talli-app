"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  Plus, 
  Settings, 
  Lock, 
  Globe, 
  TrendingUp, 
  Calendar, 
  Euro,
  ChevronRight,
  Edit2,
  X,
  Check,
  Heart
} from "lucide-react";
import { Button } from "@components/primitives/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@components/primitives/Card";
import { cn } from "@lib/utils";
import { useStableStore, seedDemoData, Horse as HorseType } from "@stores/stableStore";
import { AddHorseModal } from "./AddHorseModal";
import { CountUp } from "@components/animation/CountUp";
import { StaggerContainer, StaggerItem } from "@components/animation/StaggerContainer";

interface StableDashboardProps {
  onViewHorse: (horseId: string) => void;
  onViewBudget: () => void;
  onViewCalendar: () => void;
  onViewSettings: () => void;
}

export function StableDashboard({ onViewHorse, onViewBudget, onViewCalendar, onViewSettings }: StableDashboardProps) {
  const { stable, horses, expenses, events, renameStable, togglePrivacy } = useStableStore();
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(stable.name);
  const [addHorseOpen, setAddHorseOpen] = useState(false);

  // Seed demo data on first load
  useEffect(() => {
    seedDemoData();
  }, []);

  const handleSaveName = () => {
    if (tempName.trim()) {
      renameStable(tempName.trim());
      setIsEditingName(false);
    }
  };

  // Calculate stats
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const upcomingEvents = events.filter(e => !e.completed && new Date(e.date) >= new Date()).length;

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          {isEditingName ? (
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                className="text-2xl font-bold bg-transparent border-b-2 border-primary-500 focus:outline-none px-1"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSaveName();
                  if (e.key === "Escape") {
                    setTempName(stable.name);
                    setIsEditingName(false);
                  }
                }}
              />
              <button onClick={handleSaveName} className="p-1 hover:bg-muted rounded">
                <Check className="h-4 w-4 text-success" />
              </button>
              <button 
                onClick={() => {
                  setTempName(stable.name);
                  setIsEditingName(false);
                }} 
                className="p-1 hover:bg-muted rounded"
              >
                <X className="h-4 w-4 text-error" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">{stable.name}</h1>
              <button 
                onClick={() => setIsEditingName(true)}
                className="p-1 hover:bg-muted rounded opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Edit2 className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>
          )}
          
          {/* Privacy Badge */}
          <button
            onClick={togglePrivacy}
            className={cn(
              "flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium transition-colors",
              stable.isPublic 
                ? "bg-success/20 text-success" 
                : "bg-muted text-muted-foreground"
            )}
            title={stable.isPublic ? "Julkinen - klikkaa muuttaaksesi" : "Yksityinen - klikkaa muuttaaksesi"}
          >
            {stable.isPublic ? <Globe className="h-3 w-3" /> : <Lock className="h-3 w-3" />}
            {stable.isPublic ? "Julkinen" : "Yksityinen"}
          </button>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={onViewBudget}>
            <Euro className="mr-2 h-4 w-4" />
            Budjetti
          </Button>
          <Button variant="outline" size="sm" onClick={onViewCalendar}>
            <Calendar className="mr-2 h-4 w-4" />
            Kalenteri
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-primary-100 dark:bg-primary-900 rounded-lg">
                <Heart className="h-4 w-4 text-primary-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Hevoset</p>
                <p className="text-2xl font-bold">
                  <CountUp end={horses.length} duration={1} />
                </p>
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
                <p className="text-sm text-muted-foreground">Kulut (kk)</p>
                <p className="text-2xl font-bold">
                  <CountUp end={totalExpenses} duration={1.2} suffix=" €" />
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-secondary-100 dark:bg-secondary-900 rounded-lg">
                <Calendar className="h-4 w-4 text-secondary-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Tulevat tapahtumat</p>
                <p className="text-2xl font-bold">
                  <CountUp end={upcomingEvents} duration={1} />
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-success/20 rounded-lg">
                <TrendingUp className="h-4 w-4 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Päivää tallissa</p>
                <p className="text-2xl font-bold">
                  {Math.floor((Date.now() - new Date(stable.createdAt).getTime()) / (1000 * 60 * 60 * 24))}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Horses Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Hevoset</h2>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button size="sm" onClick={() => setAddHorseOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Lisää hevonen
            </Button>
          </motion.div>
        </div>

        {horses.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-8 text-center">
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              </motion.div>
              <p className="text-muted-foreground">Ei hevosia vielä</p>
              <p className="text-sm text-muted-foreground mt-1">
                Lisää ensimmäinen hevosesi aloittaaksesi
              </p>
            </Card>
          </motion.div>
        ) : (
          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {horses.map((horse) => (
              <StaggerItem key={horse.id}>
                <HorseCard horse={horse} onClick={() => onViewHorse(horse.id)} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid sm:grid-cols-3 gap-4">
        <QuickActionCard
          title="Lisää kulu"
          description="Kirjaa uusi tallikulu"
          icon={Euro}
          onClick={onViewBudget}
        />
        <QuickActionCard
          title="Lisää tapahtuma"
          description="Merkitse kalenteriin"
          icon={Calendar}
          onClick={onViewCalendar}
        />
        <QuickActionCard
          title="Tallin asetukset"
          description="Muokkaa tietoja"
          icon={Settings}
          onClick={onViewSettings}
        />
      </div>

      {/* Add Horse Modal */}
      <AddHorseModal
        open={addHorseOpen}
        onClose={() => setAddHorseOpen(false)}
      />
    </div>
  );
}

function HorseCard({ horse, onClick }: { horse: HorseType; onClick: () => void }) {
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
    <motion.div
      whileHover={{ 
        scale: 1.02, 
        y: -4,
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)"
      }}
      whileTap={{ scale: 0.98 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 25,
      }}
    >
      <Card 
        className="cursor-pointer group h-full"
        onClick={onClick}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div>
              <span className={cn("inline-flex px-2 py-0.5 rounded-full text-xs font-medium", genderColors[horse.gender])}>
                {genderLabels[horse.gender]}
              </span>
              <CardTitle className="text-lg mt-2 group-hover:text-primary-500 transition-colors">
                {horse.name}
              </CardTitle>
              <CardDescription>{horse.breed}</CardDescription>
            </div>
            <motion.div
              initial={{ x: 0 }}
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </motion.div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Ikä</span>
              <p className="font-medium">{horse.age} v</p>
            </div>
            <div>
              <span className="text-muted-foreground">Säkä</span>
              <p className="font-medium">{horse.height} cm</p>
            </div>
            <div>
              <span className="text-muted-foreground">Paino</span>
              <p className="font-medium">{horse.weight} kg</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function QuickActionCard({ 
  title, 
  description, 
  icon: Icon, 
  onClick 
}: { 
  title: string; 
  description: string; 
  icon: React.ElementType;
  onClick: () => void;
}) {
  return (
    <motion.div
      whileHover={{ 
        scale: 1.02, 
        y: -2,
      }}
      whileTap={{ scale: 0.98 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 25,
      }}
    >
      <Card 
        className="cursor-pointer hover:bg-muted/50 transition-colors group"
        onClick={onClick}
      >
        <CardContent className="p-4 flex items-center gap-3">
          <motion.div 
            className="p-2 bg-primary-100 dark:bg-primary-900 rounded-lg"
            whileHover={{ rotate: 5, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <Icon className="h-4 w-4 text-primary-600" />
          </motion.div>
          <div>
            <p className="font-medium">{title}</p>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
