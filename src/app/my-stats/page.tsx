/* eslint-disable @typescript-eslint/no-explicit-any */


"use client"

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const StatCardGenerator = () => {
  const [teamName, setTeamName] = useState("");
  const [playerNumber, setPlayerNumber] = useState("");
  const [stats, setStats] = useState<any>(null);

  const fetchPlayerStats = (teamName: string, playerNumber: string) => {
    return {
      teamName,
      playerNumber,
      name: "Jane Smith",
      battingAvg: ".345",
      runs: 12,
      hits: 23,
      rbis: 15,
    };
  };

  const handleGenerate = () => {
    const playerStats = fetchPlayerStats(teamName, playerNumber);
    setStats(playerStats);
  };

  const handleShare = () => {
    const imageUrl =
      "https://images.unsplash.com/photo-1587984584042-dcc9ba27e054";

    // Check if running on mobile
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
      // Try to open Instagram
      window.location.href = `instagram://library?AssetPath=${encodeURIComponent(
        imageUrl
      )}`;

      // Fallback after a short delay
      setTimeout(() => {
        if (navigator?.share) {
          navigator
            .share({
              title: "My Softball Stats",
              text: `Check out my stats!\nTeam: ${teamName}\nNumber: ${playerNumber}`,
              url: imageUrl,
            })
            .catch(() => {
              window.open(imageUrl, "_blank");
            });
        } else {
          window.open(imageUrl, "_blank");
        }
      }, 1000);
    } else {
      window.open(imageUrl, "_blank");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="team">Team Name</Label>
              <Input
                id="team"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                placeholder="Enter your team name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="number">Player Number</Label>
              <Input
                id="number"
                value={playerNumber}
                onChange={(e) => setPlayerNumber(e.target.value)}
                placeholder="Enter your number"
              />
            </div>

            <Button
              className="w-full"
              onClick={handleGenerate}
              disabled={!teamName || !playerNumber}
            >
              Generate Stats Card
            </Button>

            {stats && (
              <div className="mt-6">
                <div
                  className="relative overflow-hidden rounded-lg"
                  style={{ aspectRatio: "9/16" }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1587984584042-dcc9ba27e054"
                    alt="Baseball Field"
                    className="absolute w-full h-full object-cover"
                  />
                  {/* Semi-transparent overlay */}
                  <div className="absolute inset-0 bg-black/50"></div>
                  {/* Stats content */}
                  <div className="absolute inset-0 p-6 text-white">
                    <div className="space-y-4">
                      <h2 className="text-2xl font-bold">{stats.name}</h2>
                      <div className="text-lg">
                        <p>Team: {teamName}</p>
                        <p>Number: {playerNumber}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div className="bg-black/30 p-4 rounded-lg">
                          <p className="text-3xl font-bold">
                            {stats.battingAvg}
                          </p>
                          <p className="text-sm">Batting Avg</p>
                        </div>
                        <div className="bg-black/30 p-4 rounded-lg">
                          <p className="text-3xl font-bold">{stats.runs}</p>
                          <p className="text-sm">Runs</p>
                        </div>
                        <div className="bg-black/30 p-4 rounded-lg">
                          <p className="text-3xl font-bold">{stats.hits}</p>
                          <p className="text-sm">Hits</p>
                        </div>
                        <div className="bg-black/30 p-4 rounded-lg">
                          <p className="text-3xl font-bold">{stats.rbis}</p>
                          <p className="text-sm">RBIs</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Button className="w-full mt-4" onClick={handleShare}>
                  Share to Instagram
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatCardGenerator;
