'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 space-y-6 bg-white/80 backdrop-blur-sm dark:bg-gray-900/80">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            Softball Tournament 2024
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            View and share your tournament statistics
          </p>
        </div>

        <div className="space-y-4">
          <Link href="/stats" className="w-full block">
            <Button className="w-full text-lg py-6" size="lg">
              View My Stats
            </Button>
          </Link>
        </div>

        <p className="text-sm text-center text-gray-500 dark:text-gray-400">
          20 teams competing for glory
        </p>
      </Card>
    </main>
  );
}