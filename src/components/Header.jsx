import { useContext } from "react";
import { ThemeContext } from "./store/ThemeContext";
import { MenuContext } from "./store/MenuContext";

import NavigationLinkItems from "./NavigationLinkItems";

import "@theme-toggles/react/css/DarkSide.css";
import { DarkSide } from "@theme-toggles/react";
import { Separator } from "@/components/ui/separator";

export default function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div
      id="mobile-desktop-header__container"
      className="absolute left-0 right-0 top-0 z-10 flex"
    >
      <DesktopHeader theme={theme} toggleTheme={toggleTheme} />
      <MobileHeader theme={theme} toggleTheme={toggleTheme} />
    </div>
  );
}

function DesktopHeader() {
  return (
    <header
      id="desktopHeader"
      className="hidden w-full justify-between px-container-padding py-8 md:flex"
    >
      <nav id="desktopNav">
        <ul className="flex w-full justify-between gap-5">
          <NavigationLinkItems />
        </ul>
      </nav>
      <LanguageAndThemeSwitchers screenSize="desktop" />
    </header>
  );
}

function MobileHeader() {
  const { toggleMenuOpenState, menuIsOpen } = useContext(MenuContext);

  return (
    <>
      <header
        id="mobileHeader"
        className="flex w-full justify-between gap-5 px-container-padding py-6 text-sm md:hidden"
      >
        <button
          onClick={toggleMenuOpenState}
          className="grid h-[20px] w-[30px] grid-cols-1 gap-0.5"
        >
          <div
            className={`h-0.5 bg-black transition-all ${menuIsOpen ? "translate-y-[11px] -rotate-45" : undefined}`}
          ></div>
          <div
            className={`h-0.5 bg-black transition-all ${menuIsOpen ? "hidden" : undefined}`}
          ></div>
          <div
            className={`h-0.5 bg-black transition-all ${menuIsOpen ? "-translate-y-[0] rotate-45" : undefined}`}
          ></div>
        </button>
        <LanguageAndThemeSwitchers screenSize="mobile" />
      </header>
    </>
  );
}

function LanguageAndThemeSwitchers({ screenSize }) {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div
      id="languageAndThemeSwitchers"
      className={`flex ${screenSize === "mobile" ? "gap-1" : "gap-2"}`}
    >
      <button>УКР</button>
      <Separator orientation="vertical" />
      <button>ENG</button>
      <DarkSide
        duration={300}
        onToggle={toggleTheme}
        toggled={theme === "light"}
        className={`ml-2 flex ${screenSize === "mobile" ? "text-lg" : "text-2xl"}`}
      />
    </div>
  );
}
