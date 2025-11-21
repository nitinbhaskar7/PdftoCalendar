"use client";

import { ArrowRight, ArrowUpRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface Hero1Props {
  badge?: string;
  heading: string;
  description: string;
  buttons?: {
    primary?: { text: string; url: string };
    secondary?: { text: string; url: string };
  };
  image: { src: string; alt: string };
}

const Hero1 = ({
  badge = "✨ Your Website Builder",
  heading = "Blocks Built With Shadcn & Tailwind",
  description = "Finely crafted components built with React, Tailwind and Shadcn UI.",
  buttons = {
    primary: { text: "Discover all components", url: "https://www.shadcnblocks.com" },
    secondary: { text: "View on GitHub", url: "https://www.shadcnblocks.com" },
  },
  image = {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg",
    alt: "Hero section demo image showing interface components",
  },
}: Hero1Props) => {
  return (
    <section className="py-20 md:py-28 lg:py-32 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid gap-10 md:gap-12 lg:gap-16 items-center lg:grid-cols-2">
          
          {/* Image First on Mobile */}
          <div className="w-full flex justify-center order-1 lg:order-none">
            <Image
              src={image.src}
              alt={image.alt}
              className="w-full max-w-md md:max-w-lg rounded-md object-cover"
              width={600}
              height={600}
              priority
            />
          </div>

          {/* Content Section */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left space-y-6">
            {badge && (
              <Badge variant="outline" className="text-sm px-3 py-1">
                {badge}
                <ArrowUpRight className="ml-2 size-4" />
              </Badge>
            )}

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
              {heading}
            </h1>

            <p className="text-muted-foreground text-base md:text-lg lg:text-xl max-w-xl">
              {description}
            </p>

            <div className="flex flex-col sm:flex-row w-full justify-center lg:justify-start gap-3">
              {buttons.primary && (
                <Button asChild className="w-full sm:w-auto">
                  <a href={buttons.primary.url}>{buttons.primary.text}</a>
                </Button>
              )}

              {buttons.secondary && (
                <Button asChild variant="outline" className="w-full sm:w-auto">
                  <a href={buttons.secondary.url} className="flex items-center gap-2">
                    {buttons.secondary.text}
                    <ArrowRight className="size-4" />
                  </a>
                </Button>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export { Hero1 };
