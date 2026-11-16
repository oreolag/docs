'use client';

import { Ellipsis, SunMoon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from 'fumadocs-ui/components/ui/popover';
import { ThemeSwitch } from 'fumadocs-ui/layouts/shared/slots/theme-switch';

export function ThemeMenu() {
  return (
    <Popover>
      <PopoverTrigger className="oreol-theme-trigger" aria-label="Appearance settings">
        <Ellipsis size={21} aria-hidden="true" />
      </PopoverTrigger>
      <PopoverContent align="end" sideOffset={10} className="oreol-theme-popover" aria-label="Appearance settings">
        <div className="oreol-theme-label"><SunMoon size={19} aria-hidden="true" />Theme</div>
        <ThemeSwitch mode="light-dark-system" role="group" aria-label="Theme" className="oreol-theme-options" />
      </PopoverContent>
    </Popover>
  );
}
