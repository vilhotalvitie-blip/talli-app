import { ArrowLeft, Plus, Euro, PieChart, TrendingUp, Settings } from "lucide-react";
import { Button } from "@components/primitives/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@components/primitives/Card";
import { useStableStore } from "@stores/stableStore";
import { BudgetChart } from "./BudgetChart";

interface BudgetDashboardProps {
  onBack: () => void;
}

export function BudgetDashboard({ onBack }: BudgetDashboardProps) {
  const { budgetCategories, expenses, horses } = useStableStore();

  // Calculate totals per category
  const categoryTotals = budgetCategories.map((cat) => {
    const total = expenses
      .filter((e) => e.categoryId === cat.id)
      .reduce((sum, e) => sum + e.amount, 0);
    return { ...cat, total };
  });

  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Takaisin
        </Button>
        <h1 className="text-2xl font-bold">Budjetti</h1>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-warning/20 rounded-lg">
                <Euro className="h-4 w-4 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Kokonaiskulut</p>
                <p className="text-2xl font-bold">{totalExpenses} €</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-primary-100 dark:bg-primary-900 rounded-lg">
                <PieChart className="h-4 w-4 text-primary-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Kategorioita</p>
                <p className="text-2xl font-bold">{budgetCategories.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-secondary-100 dark:bg-secondary-900 rounded-lg">
                <TrendingUp className="h-4 w-4 text-secondary-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Keskiarvo/hevonen</p>
                <p className="text-2xl font-bold">
                  {horses.length > 0 ? Math.round(totalExpenses / horses.length) : 0} €
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Circular Budget Chart */}
      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Budjettinäkymä</CardTitle>
                <CardDescription>Menot ja jäljellä oleva</CardDescription>
              </div>
              <Button variant="ghost" size="icon">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <BudgetChart totalBudget={1500} />
          </CardContent>
        </Card>

        <div className="lg:col-span-2 space-y-6">
          {/* Categories */}
          <Card>
            <CardHeader>
              <CardTitle>Kulukategoriat</CardTitle>
              <CardDescription>Kulut kategorioittain samoilla väreillä</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 gap-4">
                {categoryTotals.map((cat) => (
                  <div key={cat.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: cat.color }}
                      />
                      <div>
                        <span className="font-medium block">{cat.name}</span>
                        {cat.budgetLimit && (
                          <span className="text-xs text-muted-foreground">
                            Budjetti: {cat.budgetLimit} €
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-bold block">{cat.total} €</span>
                      {cat.budgetLimit && cat.budgetLimit > 0 && (
                        <span className={
                          cat.total > cat.budgetLimit
                            ? "text-xs text-error"
                            : "text-xs text-muted-foreground"
                        }>
                          {Math.round((cat.total / cat.budgetLimit) * 100)}%
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Expenses */}
          <Card>
            <CardHeader>
              <CardTitle>Viimeisimmät kulut</CardTitle>
              <CardDescription>Viimeiset kirjatut kulut</CardDescription>
            </CardHeader>
            <CardContent>
              {expenses.length === 0 ? (
                <p className="text-muted-foreground">Ei kirjattuja kuluja</p>
              ) : (
                <div className="space-y-2">
                  {expenses.slice(0, 5).map((expense) => {
                    const category = budgetCategories.find(
                      (c) => c.id === expense.categoryId
                    );
                    const horse = horses.find((h) => h.id === expense.horseId);
                    return (
                      <div
                        key={expense.id}
                        className="flex items-center justify-between p-3 bg-muted rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className="w-3 h-3 rounded-full shrink-0"
                            style={{ backgroundColor: category?.color }}
                          />
                          <div>
                            <p className="font-medium">{expense.description}</p>
                            <p className="text-sm text-muted-foreground">
                              {horse?.name} • {category?.name}
                            </p>
                          </div>
                        </div>
                        <span className="font-bold">{expense.amount} €</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <Button className="w-full">
        <Plus className="mr-2 h-4 w-4" />
        Lisää kulu
      </Button>
    </div>
  );
}
