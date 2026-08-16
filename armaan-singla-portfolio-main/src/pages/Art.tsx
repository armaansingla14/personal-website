import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

type Artwork = {
  src: string;
  title: string;
  artist: string;
  year: string;
};

const artworks: Artwork[] = [
  { src: "/art/01-the-raven.jpg", title: "The Raven", artist: "Gustave Doré", year: "1883" },
  { src: "/art/02-valley-of-dry-bones.jpg", title: "The Vision of the Valley of Dry Bones", artist: "Gustave Doré", year: "1866" },
  { src: "/art/03-water-lily-pond.jpg", title: "The Water Lily Pond", artist: "Claude Monet", year: "1899" },
  { src: "/art/04-dante-and-virgil.jpg", title: "Dante and Virgil Confronted by Demons", artist: "Gustave Doré", year: "1861" },
  { src: "/art/05-the-colossus.jpg", title: "The Colossus", artist: "Francisco de Goya", year: "1812" },
  { src: "/art/06-old-guitarist.jpg", title: "The Old Guitarist", artist: "Pablo Picasso", year: "1904" },
  { src: "/art/07-buzz-aldrin-moon.jpg", title: "Buzz Aldrin on the Moon", artist: "Neil Armstrong", year: "1969" },
  { src: "/art/08-in-saturns-shadow.jpg", title: "In Saturn's Shadow", artist: "NASA / Cassini", year: "2006" },
  { src: "/art/09-apaches-supper.jpg", title: "The Apache's Supper", artist: "Louis Auguste Mathieu Legrand", year: "1901" },
  { src: "/art/10-vadersolstavlan.jpg", title: "Vädersolstavlan", artist: "Urban målare", year: "1535" },
];

const Art = () => {
  const [active, setActive] = useState<number | null>(null);
  const open = active !== null ? artworks[active] : null;

  return (
    <div>
      <h1 className="text-5xl font-bold tracking-tight mb-3">Art</h1>
      <p className="text-xl text-muted-foreground mb-8">
        A few pieces I keep coming back to.
      </p>

      <div className="sm:relative sm:left-1/2 sm:w-[92vw] sm:max-w-4xl sm:-translate-x-1/2">
        <div className="columns-1 gap-6 sm:columns-2">
          {artworks.map((art, i) => (
            <figure
              key={art.src}
              className="art-reveal mb-6 break-inside-avoid"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-label={`View ${art.title} by ${art.artist}, ${art.year}`}
                className="group block w-full overflow-hidden rounded-md border border-border shadow-sm transition-shadow duration-200 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <img
                  src={art.src}
                  alt={`${art.title} by ${art.artist}`}
                  loading="lazy"
                  decoding="async"
                  className="w-full transition-transform duration-300 ease-out group-hover:scale-[1.02]"
                />
              </button>
              <figcaption className="mt-3 leading-snug">
                <span className="italic">{art.title}</span>
                <span className="block text-muted-foreground">
                  {art.artist}, {art.year}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      <Dialog open={active !== null} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="max-w-5xl border-none bg-background p-2 sm:p-4">
          {open && (
            <figure className="flex flex-col items-center">
              <img
                src={open.src}
                alt={`${open.title} by ${open.artist}`}
                className="max-h-[80vh] w-full rounded-sm object-contain"
              />
              <figcaption className="mt-4 text-center">
                <DialogTitle className="text-xl font-normal italic">
                  {open.title}
                </DialogTitle>
                <DialogDescription className="text-base text-muted-foreground">
                  {open.artist}, {open.year}
                </DialogDescription>
              </figcaption>
            </figure>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Art;
