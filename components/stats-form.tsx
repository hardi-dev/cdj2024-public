"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface StatsFormProps {
  onSubmit: (teamName: string, jerseyNumber: string) => void;
}

export function StatsForm({ onSubmit }: StatsFormProps) {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const teamName = formData.get("teamName") as string;
    const jerseyNumber = formData.get("jerseyNumber") as string;

    if (!teamName || !jerseyNumber) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    onSubmit(teamName, jerseyNumber);
  };

  return (
    <Card className="w-full max-w-md mx-auto p-6 space-y-6 bg-white/80 backdrop-blur-sm dark:bg-gray-900/80 mt-8">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold">Enter Your Details</h1>
        <p className="text-gray-500 dark:text-gray-400">
          View your tournament statistics
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="teamName">Team Name</Label>
          <Input
            id="teamName"
            name="teamName"
            placeholder="Enter your team name"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="jerseyNumber">Jersey Number</Label>
          <Input
            id="jerseyNumber"
            name="jerseyNumber"
            placeholder="Enter your jersey number"
          />
        </div>

        <Button type="submit" className="w-full">
          View Stats
        </Button>
      </form>
    </Card>
  );
}