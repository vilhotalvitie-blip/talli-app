import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useStableStore } from "@stores/stableStore";

interface BudgetChartProps {
  totalBudget?: number;
}

export function BudgetChart({ totalBudget = 1000 }: BudgetChartProps) {
  const { budgetCategories, expenses } = useStableStore();

  // Calculate totals per category
  const categoryTotals = budgetCategories.map((cat) => {
    const spent = expenses
      .filter((e) => e.categoryId === cat.id)
      .reduce((sum, e) => sum + e.amount, 0);
    return {
      name: cat.name,
      value: spent,
      color: cat.color,
      budgetLimit: cat.budgetLimit,
    };
  });

  const totalSpent = categoryTotals.reduce((sum, cat) => sum + cat.value, 0);
  const remaining = Math.max(0, totalBudget - totalSpent);
  const unassigned = Math.max(0, totalBudget - totalSpent - remaining);

  // Prepare chart data
  const chartData = [
    ...categoryTotals.filter((cat) => cat.value > 0),
    ...(remaining > 0
      ? [
          {
            name: "Jäljellä",
            value: remaining,
            color: "#e5e7eb", // gray-200
          },
        ]
      : []),
    ...(unassigned > 0
      ? [
          {
            name: "Määrittämätön",
            value: unassigned,
            color: "#f3f4f6", // gray-100
          },
        ]
      : []),
  ];

  const usagePercentage = totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-full max-w-[280px]">
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={110}
              paddingAngle={2}
              dataKey="value"
              stroke="none"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold">{Math.round(usagePercentage)}%</span>
          <span className="text-sm text-muted-foreground">käytetty</span>
        </div>
      </div>

      {/* Legend */}
      <div className="w-full mt-6 space-y-2">
        {categoryTotals
          .filter((cat) => cat.value > 0)
          .map((cat) => (
            <div key={cat.name} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: cat.color }}
                />
                <span>{cat.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-medium">{cat.value} €</span>
                {cat.budgetLimit && (
                  <span className="text-xs text-muted-foreground">
                    / {cat.budgetLimit} €
                  </span>
                )}
              </div>
            </div>
          ))}

        {remaining > 0 && (
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gray-200" />
              <span className="text-muted-foreground">Jäljellä</span>
            </div>
            <span className="font-medium text-muted-foreground">{remaining} €</span>
          </div>
        )}
      </div>

      {/* Summary */}
      <div className="w-full mt-6 pt-4 border-t">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Budjetti yhteensä</span>
          <span className="font-medium">{totalBudget} €</span>
        </div>
        <div className="flex justify-between text-sm mt-1">
          <span className="text-muted-foreground">Käytetty</span>
          <span className="font-medium">{totalSpent} €</span>
        </div>
      </div>
    </div>
  );
}
