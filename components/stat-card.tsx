import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
}

export function StatCard({ icon: Icon, label, value }: StatCardProps) {
  return (
    <Card className="p-3 text-center bg-white/50 backdrop-blur-sm border hover:border-blue-500 transition-colors duration-300">
      <div className="flex flex-col items-center gap-1">
        <div className="p-1 rounded-full bg-blue-100 dark:bg-blue-900/20">
          <Icon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
        </div>
        <div className="space-y-1">
          <h3 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {value}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
            {label}
          </p>
        </div>
      </div>
    </Card>
  );
}