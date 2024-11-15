import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, ArrowLeft, Target, Percent, Trophy, Star } from "lucide-react";
import { toPng } from 'html-to-image';
import { useToast } from "@/hooks/use-toast";
import { StatCard } from "./stat-card";
import { useRef } from "react";

interface PlayerStatsProps {
  teamName: string;
  jerseyNumber: string;
  onBack: () => void;
}

export default function PlayerStats({
  teamName,
  jerseyNumber,
  onBack,
}: PlayerStatsProps) {
  const statsRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const stats = {
    battingAverage: ".325",
    hits: 28,
    runs: 15,
    rbis: 22,
    homeRuns: 4,
    stolenBases: 7,
  };

  const downloadStats = async () => {
    if (statsRef.current) {
      try {
        await document.fonts.ready;
        
        const computedStyle = window.getComputedStyle(statsRef.current);
        
        const dataUrl = await toPng(statsRef.current, {
          cacheBust: true,
          pixelRatio: 3,
          style: {
            transform: 'none',
            marginLeft: '0',
            fontFamily: computedStyle.fontFamily,
            fontWeight: computedStyle.fontWeight,
            fontSize: computedStyle.fontSize,
            letterSpacing: computedStyle.letterSpacing,
            lineHeight: computedStyle.lineHeight,
            textRendering: 'optimizeLegibility',
            ['WebkitFontSmoothing' as any]: 'antialiased',
            ['MozOsxFontSmoothing' as any]: 'grayscale'
          },
          filter: (node) => {
            return !node.classList?.contains('exclude-from-screenshot');
          }
        });
        
        const link = document.createElement("a");
        link.download = `${teamName}-${jerseyNumber}-stats.png`;
        link.href = dataUrl;
        link.click();

        toast({
          title: "Success!",
          description: "Statistics image has been downloaded",
        });
      } catch (error) {
        console.error('Error generating image:', error);
        toast({
          title: "Error",
          description: "Failed to download statistics",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-4">
      <Button variant="ghost" className="mb-4" onClick={onBack}>
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>
      <div className="w-[320px] aspect-[9/16] bg-red-500 mx-auto">
        <div ref={statsRef} className="stats-card w-full h-full">
          <div className="w-full h-full bg-gradient-to-br from-blue-600 to-purple-700 p-5">
            <Card className="w-full h-full bg-white/95 backdrop-blur-sm p-5 flex flex-col items-center justify-between">
              <div className="text-center space-y-2">
                <div className="inline-block p-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500">
                  <Star className="h-8 w-8 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900">{teamName}</h1>
                <p className="text-lg font-normal text-gray-600">#{jerseyNumber}</p>
              </div>
              <div className="grid grid-cols-2 gap-3 w-full">
                <StatCard
                  icon={Target}
                  label="Batting Average"
                  value={stats.battingAverage}
                />
                <StatCard
                  icon={Trophy}
                  label="Home Runs"
                  value={stats.homeRuns.toString()}
                />
                <StatCard
                  icon={Percent}
                  label="Hits"
                  value={stats.hits.toString()}
                />
                <StatCard
                  icon={Star}
                  label="RBIs"
                  value={stats.rbis.toString()}
                />
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold text-gray-500">
                  Softball Tournament 2024
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
      <Button className="w-full" onClick={downloadStats}>
        <Download className="mr-2 h-4 w-4" /> Download for Instagram
      </Button>
    </div>
  );
}