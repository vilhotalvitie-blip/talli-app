import { ArrowLeft, Plus, Euro, PieChart, TrendingUp } from "lucide-react";
import { Button } from "@components/primitives/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@components/primitives/Card";
import { useStableStore } from "@stores/stableStore";

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

      {/* Categories */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Kulukategoriat</CardTitle>
            <CardDescription>Kulut kategorioittain</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {categoryTotals.map((cat) => (
                <div key={cat.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: cat.color }}
                    />
                    <span className="font-medium">{cat.name}</span>
                  </div>
                  <span className="font-bold">{cat.total} €</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

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
                      <div>
                        <p className="font-medium">{expense.description}</p>
                        <p className="text-sm text-muted-foreground">
                          {horse?.name} • {category?.name}
                        </p>
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

      <Button className="w-full">
        <Plus className="mr-2 h-4 w-4" />
        Lisää kulu
      </Button>
    </div>
  );
}
