import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { GameModuleProps } from "@/types";

export const GameModule = ({
  name,
  directory_gif_name,
  directory_image_name,
  genres,
  is_live,
}: GameModuleProps) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className="w-44 md:w-72 relative group cursor-pointer">
      <Card
        className="relative transform transition-all duration-300 ease-in-out hover:scale-115 
    border border-[#d1a641] hover:border-[#d1a641]
    hover:shadow-[0_0_30px_2px_#d1a641]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="h-48 overflow-hidden">
          <img
            src={
              isHovered
                ? `/images/${directory_gif_name}`
                : `/images/${directory_image_name}`
            }
            alt="Game preview"
            className="w-full h-full object-cover transition-all duration-300"
          />
        </div>

        <CardContent className="relative overflow-hidden">
          <div
            className={`transform transition-all duration-300 ${
              isHovered ? "opacity-0 -translate-y-4" : "opacity-100"
            }`}
          >
            <p
              className={`text-sm text-green-300 font-bold ${
                is_live === true ? "text-green-500" : "text-orange-400"
              }`}
            >
              {is_live === true ? "Live" : "Non-live"}
            </p>
          </div>

          <h6
            className={`md:text-xl text-white font-bold transform transition-all duration-300 ${
              isHovered ? "-translate-y-4" : ""
            }`}
          >
            {name}
          </h6>

          <p
            className={`mt-2 text-sm text-slate-300 ${
              isHovered ? "opacity-0 -translate-y-4" : "opacity-100"
            }`}
          >
            {genres.map((genre) => genre.genre_name).join(" , ")}
          </p>

          <p
            className={`text-sm text-white transform transition-all truncate duration-300 ${
              isHovered
                ? "opacity-100 -translate-y-6"
                : "opacity-0 translate-y-4"
            }`}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
