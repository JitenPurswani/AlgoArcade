import { notFound } from "next/navigation";

const GAME_MAP: Record<string, string> = {
  silvertongue: "SilverTongue",
  hook: "The Hook",
  entangled: "Entangled",
};

export default async function GamePage({
  params,
}: {
  params: Promise<{ game: string }>;
}) {
  const { game } = await params;

  const gameKey = game?.toLowerCase();

  if (!gameKey || !GAME_MAP[gameKey]) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
      <h1 className="text-5xl font-bold">
        {GAME_MAP[gameKey]}
      </h1>
    </div>
  );
}
