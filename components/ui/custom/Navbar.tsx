"use client";

import { Book, Menu, Sunset, Trees, Zap, GitBranch } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import Link from "next/link";
import Image from "next/image";
import { SignedIn, SignedOut, SignInButton, SignOutButton } from "@clerk/nextjs";

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface Navbar1Props {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  menu?: MenuItem[];
}

const Navbar1 = ({
  logo = {
    url: "/",
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-icon.svg",
    alt: "logo",
    title: "Shadcnblocks.com",
  },
  menu = [
    { title: "Home", url: "#" },
    {
      title: "Products",
      url: "#",
      items: [
        { title: "Blog", description: "Industry news and insights", icon: <Book className="size-5" />, url: "#" },
        { title: "Company", description: "Learn about us", icon: <Trees className="size-5" />, url: "#" },
        { title: "Careers", description: "Find your next role", icon: <Sunset className="size-5" />, url: "#" },
        { title: "Support", description: "We’re here for you", icon: <Zap className="size-5" />, url: "#" },
      ],
    },
  ],
}: Navbar1Props) => {
  return (
    <section className="py-4 w-full border-b sticky top-0 z-50 bg-background">
      <div className="container mx-auto px-4">
        {/* Main Navbar */}
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Link href={logo.url} className="flex items-center gap-2">
              <Image src={logo.src} alt={logo.alt} width={32} height={32} className="max-h-8" />
              <span className="text-lg font-semibold">{logo.title}</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            <NavigationMenu>
              <NavigationMenuList>
                {menu.map((item) => renderMenuItem(item))}
              </NavigationMenuList>
            </NavigationMenu>

            {/* Desktop Buttons */}
            <div className="flex items-center gap-2">
              <Button variant="outline" asChild>
                <Link href="https://github.com/your-repo" className="flex gap-2">
                  <GitBranch className="h-5 w-5" /> View on GitHub
                </Link>
              </Button>

              <SignedOut>
                <SignInButton />
              </SignedOut>
              <SignedIn>
                <SignOutButton />
              </SignedIn>
            </div>
          </div>

          {/* Mobile Menu Trigger */}
          <Sheet>
            <SheetTrigger className="lg:hidden">
              <Menu className="h-7 w-7" />
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[350px]">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>

              <div className="mt-4 flex flex-col gap-4">
                <Accordion type="single" collapsible className="w-full">
                  {menu.map((item) => renderMobileMenuItem(item))}
                </Accordion>

                <Button variant="default" asChild className="w-full">
                  <Link href="https://github.com/your-repo">
                    <GitBranch className="mr-2 h-5 w-5" /> View on GitHub
                  </Link>
                </Button>

                <SignedOut>
                  <SignInButton />
                </SignedOut>
                <SignedIn>
                  <SignOutButton />
                </SignedIn>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </section>
  );
};

const renderMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
        <NavigationMenuContent>
          {item.items.map((subItem) => (
            <NavigationMenuLink asChild key={subItem.title} className="w-80">
              <SubMenuLink item={subItem} />
            </NavigationMenuLink>
          ))}
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenuItem key={item.title}>
      <NavigationMenuLink
        href={item.url}
        className="inline-flex h-10 items-center justify-center rounded-md px-4 text-sm font-medium hover:bg-muted hover:text-accent-foreground"
      >
        {item.title}
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

const renderMobileMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <AccordionItem key={item.title} value={item.title} className="border-b">
        <AccordionTrigger>{item.title}</AccordionTrigger>
        <AccordionContent>
          {item.items.map((subItem) => (
            <SubMenuLink key={subItem.title} item={subItem} />
          ))}
        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <Link href={item.url} key={item.title} className="text-md font-medium block py-1">
      {item.title}
    </Link>
  );
};

const SubMenuLink = ({ item }: { item: MenuItem }) => (
  <Link
    href={item.url}
    className="flex gap-3 p-2 rounded-md hover:bg-muted transition-colors"
  >
    <div>{item.icon}</div>
    <div>
      <p className="font-semibold text-sm">{item.title}</p>
      <p className="text-xs text-muted-foreground">{item.description}</p>
    </div>
  </Link>
);

export { Navbar1 };
