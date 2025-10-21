import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { FoodIcon, SleepIcon, StepIcon } from "@/components/icons";
import { Zap } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Welcome back, CryptoFitGal!</h1>
        <p className="text-muted-foreground">Here's your wellness summary for today.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="glass-card p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium">Total Points</h3>
            <Zap className="h-4 w-4 text-accent" />
          </div>
          <div>
            <div className="text-4xl font-bold text-primary drop-shadow-[0_0_12px_hsl(var(--primary))]">42,069</div>
            <p className="text-xs text-muted-foreground">+2,012 this week</p>
          </div>
        </div>
        <div className="glass-card p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium">Daily Steps</h3>
            <StepIcon className="h-4 w-4 text-accent" />
          </div>
          <div>
            <div className="text-4xl font-bold">8,450</div>
            <p className="text-xs text-muted-foreground">Goal: 10,000</p>
            <Progress value={84.5} className="h-2 mt-2" />
          </div>
        </div>
        <div className="glass-card p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium">Sleep Score</h3>
            <SleepIcon className="h-4 w-4 text-accent" />
          </div>
          <div>
            <div className="text-4xl font-bold">82</div>
            <p className="text-xs text-muted-foreground">7h 45m last night</p>
          </div>
        </div>
        <div className="glass-card p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium">Calories Logged</h3>
            <FoodIcon className="h-4 w-4 text-accent" />
          </div>
          <div>
            <div className="text-4xl font-bold">1,890</div>
            <p className="text-xs text-muted-foreground">Goal: 2,200</p>
          </div>
        </div>
      </div>
      
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="glass-card p-6">
            <h3 className="font-bold text-xl mb-4">Activity Feed</h3>
            <p className="text-muted-foreground">Placeholder for recent activities and achievements.</p>
        </div>
        <div className="glass-card p-6">
            <h3 className="font-bold text-xl mb-4">Leaderboard Snapshot</h3>
            <p className="text-muted-foreground">Placeholder for top 3 users.</p>
        </div>
      </div>
    </div>
  )
}
