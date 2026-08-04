import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
} from "framer-motion";
import {
  Menu,
  X,
  User,
  Moon,
  Sun,
  ChevronDown,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { BookingPopup } from "@/components/site/BookingPopup";
import { cn } from "@/lib/utils";

const mainNav = [
  {
    to: "/",
    label: "Home",
  },
  {
    to: "/trails",
    label: "Horse Trails",
  },
  {
    to: "/experiences",
    label: "Experiences",
  },
  {
    to: "/performance",
    label: "Performance",
  },
  {
    to: "/availability",
    label: "Availability",
  },
  {
    to: "/products",
    label: "Products",
  },
] as const;

const moreNav = [
  {
    to: "/packages",
    label: "Packages",
  },
  {
    to: "/about",
    label: "About",
  },
  {
    to: "/gallery",
    label: "Gallery",
  },
  {
    to: "/blog",
    label: "Blog",
  },
  {
    to: "/contact",
    label: "Contact",
  },
] as const;

export function Header() {
  const [scrolled, setScrolled] =
    useState(false);

  const [open, setOpen] =
    useState(false);

  const [moreOpen, setMoreOpen] =
    useState(false);

  const [dark, setDark] =
    useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    onScroll();

    window.addEventListener(
      "scroll",
      onScroll,
      {
        passive: true,
      },
    );

    return () => {
      window.removeEventListener(
        "scroll",
        onScroll,
      );
    };
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle(
      "dark",
      dark,
    );
  }, [dark]);

  return (
    <motion.header
      initial={{
        y: -20,
        opacity: 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      transition={{
        duration: 0.5,
      }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "py-2" : "py-4",
      )}
    >
      <div className="container-wide">
        <div
          className={cn(
            "glass flex items-center justify-between gap-3 rounded-2xl px-4 py-3 md:px-6",
            scrolled && "shadow-elegant",
          )}
        >
          <Link
            to="/"
            className="flex shrink-0 items-center gap-2"
          >
            <div className="gradient-forest grid h-10 w-10 shrink-0 place-items-center rounded-xl text-forest-foreground shadow-glow">
              <span className="font-display text-lg font-bold">
                H
              </span>
            </div>

            <div className="hidden sm:block">
              <div className="font-display text-lg font-bold leading-none text-forest">
                Horse Trails
              </div>

              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                Premium Equestrian
              </div>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 xl:flex">
            {mainNav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{
                  exact: item.to === "/",
                }}
                className="whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-cream hover:text-forest data-[status=active]:bg-forest data-[status=active]:text-forest-foreground"
              >
                {item.label}
              </Link>
            ))}

            <div
              className="relative"
              onMouseEnter={() =>
                setMoreOpen(true)
              }
              onMouseLeave={() =>
                setMoreOpen(false)
              }
            >
              <button
                type="button"
                onClick={() =>
                  setMoreOpen(
                    (current) => !current,
                  )
                }
                className="flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-cream hover:text-forest"
              >
                More
                <ChevronDown
                  className={cn(
                    "h-4 w-4 transition-transform",
                    moreOpen && "rotate-180",
                  )}
                />
              </button>

              <AnimatePresence>
                {moreOpen && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 8,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      y: 8,
                    }}
                    transition={{
                      duration: 0.18,
                    }}
                    className="absolute right-0 top-full z-50 min-w-48 pt-2"
                  >
                    <div className="rounded-2xl border border-border bg-background p-2 shadow-xl">
                      {moreNav.map(
                        (item) => (
                          <Link
                            key={item.to}
                            to={item.to}
                            onClick={() =>
                              setMoreOpen(
                                false,
                              )
                            }
                            activeOptions={{
                              exact: false,
                            }}
                            className="block rounded-xl px-3 py-2 text-sm font-medium text-foreground/80 transition hover:bg-cream hover:text-forest data-[status=active]:bg-forest data-[status=active]:text-forest-foreground"
                          >
                            {item.label}
                          </Link>
                        ),
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="hidden md:inline-flex"
              onClick={() =>
                setDark(
                  (current) => !current,
                )
              }
              aria-label={
                dark
                  ? "Use light mode"
                  : "Use dark mode"
              }
            >
              {dark ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="hidden gap-2 md:inline-flex"
              asChild
            >
              <Link to="/login">
                <User className="h-4 w-4" />
                Login
              </Link>
            </Button>

            <div className="hidden lg:block">
              <BookingPopup
                trailName="Horse Trails Experience"
              />
            </div>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="xl:hidden"
              onClick={() =>
                setOpen(
                  (current) => !current,
                )
              }
              aria-label={
                open
                  ? "Close navigation menu"
                  : "Open navigation menu"
              }
            >
              {open ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{
                opacity: 0,
                y: -10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -10,
              }}
              transition={{
                duration: 0.2,
              }}
              className="glass mt-2 max-h-[calc(100vh-110px)] overflow-y-auto rounded-2xl p-3 xl:hidden"
            >
              <div className="grid gap-1 md:grid-cols-2">
                {mainNav.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() =>
                      setOpen(false)
                    }
                    activeOptions={{
                      exact:
                        item.to === "/",
                    }}
                    className="rounded-xl px-3 py-2 text-sm font-medium transition hover:bg-cream data-[status=active]:bg-forest data-[status=active]:text-forest-foreground"
                  >
                    {item.label}
                  </Link>
                ))}

                {moreNav.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() =>
                      setOpen(false)
                    }
                    activeOptions={{
                      exact: false,
                    }}
                    className="rounded-xl px-3 py-2 text-sm font-medium transition hover:bg-cream data-[status=active]:bg-forest data-[status=active]:text-forest-foreground"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              <div className="mt-3 grid gap-2 border-t border-border pt-3 sm:grid-cols-2">
                <Button
                  variant="outline"
                  className="w-full"
                  asChild
                >
                  <Link
                    to="/login"
                    onClick={() =>
                      setOpen(false)
                    }
                  >
                    Login
                  </Link>
                </Button>

                <Button
                  className="w-full bg-forest text-forest-foreground hover:bg-forest/90"
                  asChild
                >
                  <Link
                    to="/register"
                    onClick={() =>
                      setOpen(false)
                    }
                  >
                    Register
                  </Link>
                </Button>
              </div>

              <div
                className="mt-2 [&>button]:w-full"
                onClick={() => {
                  setOpen(false);
                }}
              >
                <BookingPopup
                  trailName="Horse Trails Experience"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}