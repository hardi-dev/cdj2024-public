"use client";

import { useState } from "react";
import { StatsForm } from "@/components/stats-form";
import PlayerStats from "@/components/player-stats";

export default function StatsPage() {
  const [playerData, setPlayerData] = useState<{
    teamName: string;
    jerseyNumber: string;
  } | null>(null);

  const handleSubmit = (teamName: string, jerseyNumber: string) => {
    setPlayerData({ teamName, jerseyNumber });
  };

  const handleBack = () => {
    setPlayerData(null);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 p-4">
      {!playerData ? (
        <StatsForm onSubmit={handleSubmit} />
      ) : (
        <PlayerStats
          teamName={playerData.teamName}
          jerseyNumber={playerData.jerseyNumber}
          onBack={handleBack}
        />
      )}
    </main>
  );
}