import { GameModule } from "@/components/GameModule";
import { Skeleton } from "@/components/ui/skeleton";
import { GameModuleProps } from "@/types";
import { Sidebar } from "@/components/Sidebar";
import { useGames } from "@/context/GameContext";

export const Home = () => {
  const { delayedLoading, games } = useGames();

  return (
    <div className="container mx-auto flex flex-col md:flex-row">
      <aside className="h-56 md:h-screen bg-background sticky top-0 z-20 lg:z-0">
        <Sidebar />
      </aside>
      <main className="p-4 flex-1">
        <div className="mt-10 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {delayedLoading ? (
            Array.from({ length: 8 }).map((_, index) => (
              <Skeleton key={index} className="h-60 w-64 rounded-lg bg-gray-700" />
            ))
          ) : games?.length > 0 ? (
            games?.map((game: GameModuleProps) => (
              <GameModule key={game.id} {...game} />
            ))
          ) : (
            <p>No game found</p>
          )}
        </div>
      </main>
    </div>
  );
};