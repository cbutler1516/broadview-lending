"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronDown, Menu, Phone, X } from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";
import { BookingLink } from "@/components/booking-link";
import {
  CONTACT,
  NAV_BUY,
  NAV_HOME_EQUITY,
  NAV_INVEST,
  NAV_LINKS,
  NAV_PRIMARY_CTA_LABEL,
  NAV_REFINANCE,
  scenarioHrefForPath,
  type NavChild,
} from "@/lib/nav/constants";
import { CTA_PRIMARY } from "@/lib/ui/styles";

const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600/40 focus-visible:ring-offset-2";

type DesktopMenuKey = "buy" | "refinance" | "home-equity" | "invest";

const DROPDOWNS: {
  key: DesktopMenuKey;
  label: string;
  href: string;
  children: readonly NavChild[];
}[] = [
  NAV_BUY,
  NAV_REFINANCE,
  NAV_HOME_EQUITY,
  NAV_INVEST,
].map((group, index) => ({
  key: (["buy", "refinance", "home-equity", "invest"] as const)[index],
  label: group.label,
  href: group.href,
  children: group.children,
}));

function isChildActive(pathname: string | null | undefined, item: NavChild) {
  if (!pathname) return false;
  if (item.href.includes("#")) {
    return pathname === item.href.split("#")[0];
  }
  if (pathname === item.href) return true;
  return Boolean(pathname.startsWith(`${item.href}/`));
}

function NavLink({
  href,
  label,
  onClick,
  pathname,
  className,
}: {
  href: string;
  label: string;
  onClick?: () => void;
  pathname?: string | null;
  className?: string;
}) {
  const isActive =
    pathname === href || (href !== "/" && Boolean(pathname?.startsWith(href)));

  const base =
    className ??
    `px-3 py-2 text-sm rounded-lg font-medium transition-colors duration-200 ${FOCUS_RING}`;

  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={isActive ? "page" : undefined}
      className={
        className
          ? className
          : `${base} ${
              isActive
                ? "text-navy-900 bg-slate-100"
                : "text-slate-600 hover:text-navy-900 hover:bg-slate-50"
            }`
      }
    >
      {label}
    </Link>
  );
}

function DesktopDropdown({
  label,
  items,
  pathname,
  isOpen,
  onToggle,
  isActive,
  menuKey,
}: {
  label: string;
  items: readonly NavChild[];
  pathname: string | null;
  isOpen: boolean;
  onToggle: () => void;
  isActive: boolean;
  menuKey: DesktopMenuKey;
}) {
  const triggerId = `nav-${menuKey}-trigger`;
  const menuId = `nav-${menuKey}-menu`;

  return (
    <div className="relative">
      <button
        type="button"
        id={triggerId}
        onClick={onToggle}
        className={`inline-flex items-center gap-1 px-2.5 py-2 text-sm rounded-lg font-medium transition-colors duration-200 ${FOCUS_RING} ${
          isActive
            ? "text-navy-900 bg-slate-100"
            : "text-slate-600 hover:text-navy-900 hover:bg-slate-50"
        }`}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-controls={menuId}
      >
        {label}
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={menuId}
            role="menu"
            aria-labelledby={triggerId}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 mt-1.5 w-60 rounded-xl border border-slate-200 bg-white shadow-lg shadow-slate-200/50 py-1.5 z-50"
          >
            {items.map((item) => (
              <Link
                key={`${item.href}-${item.label}`}
                href={item.href}
                role="menuitem"
                className={`block px-4 py-2.5 text-sm transition-colors duration-200 ${FOCUS_RING} mx-1 rounded-lg ${
                  isChildActive(pathname, item)
                    ? "text-teal-700 bg-teal-50 font-semibold"
                    : "text-slate-600 hover:text-navy-900 hover:bg-slate-50"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDesktopMenu, setOpenDesktopMenu] = useState<DesktopMenuKey | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<DesktopMenuKey | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const scenarioHref = scenarioHrefForPath(pathname);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDesktopMenu(null);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  useEffect(() => {
    if (!openDesktopMenu) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenDesktopMenu(null);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [openDesktopMenu]);

  const [menuPath, setMenuPath] = useState(pathname);
  if (pathname !== menuPath) {
    setMenuPath(pathname);
    setMobileOpen(false);
    setOpenDesktopMenu(null);
    setMobileExpanded(null);
  }

  useEffect(() => {
    if (!mobileOpen) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setMobileOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-lg shadow-sm border-b border-slate-200/80"
            : "bg-white/80 backdrop-blur-md"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-[72px]">
            <BrandLogo className="lg:h-10" showParent={false} />

            <nav ref={navRef} className="hidden lg:flex items-center gap-0" aria-label="Main">
              {DROPDOWNS.map((menu) => (
                <DesktopDropdown
                  key={menu.key}
                  label={menu.label}
                  items={menu.children}
                  pathname={pathname}
                  isOpen={openDesktopMenu === menu.key}
                  onToggle={() =>
                    setOpenDesktopMenu((current) => (current === menu.key ? null : menu.key))
                  }
                  isActive={
                    pathname === menu.href ||
                    Boolean(pathname?.startsWith(`${menu.href}/`)) ||
                    menu.children.some((item) => isChildActive(pathname, item))
                  }
                  menuKey={menu.key}
                />
              ))}
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.href}
                  href={link.href}
                  label={link.label}
                  pathname={pathname}
                />
              ))}
            </nav>

            <div className="hidden lg:flex items-center gap-3">
              <a
                href={CONTACT.phoneHref}
                className={`flex items-center gap-2 text-slate-600 hover:text-navy-800 text-sm transition-colors duration-200 font-medium ${FOCUS_RING} rounded-lg px-2 py-1.5`}
              >
                <Phone className="w-4 h-4" aria-hidden="true" />
                {CONTACT.phone}
              </a>
              <Link href={scenarioHref} className={`${CTA_PRIMARY} px-5 py-2.5`}>
                {NAV_PRIMARY_CTA_LABEL}
              </Link>
            </div>

            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`lg:hidden p-2 text-slate-600 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg ${FOCUS_RING}`}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] lg:hidden"
          >
            <div
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />
            <motion.nav
              id="mobile-nav"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="absolute right-0 top-0 bottom-0 w-[85%] max-w-sm bg-white border-l border-slate-200 p-6 pt-8 overflow-y-auto shadow-xl"
              aria-label="Mobile"
            >
              <div className="flex items-center justify-between mb-6">
                <BrandLogo href="/" showParent={false} />
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className={`p-2 text-slate-400 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg ${FOCUS_RING}`}
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex flex-col gap-1">
                {DROPDOWNS.map((menu) => {
                  const expanded = mobileExpanded === menu.key;
                  const active =
                    pathname === menu.href ||
                    Boolean(pathname?.startsWith(`${menu.href}/`)) ||
                    menu.children.some((item) => isChildActive(pathname, item));

                  return (
                    <div key={menu.key}>
                      <button
                        type="button"
                        onClick={() =>
                          setMobileExpanded((current) => (current === menu.key ? null : menu.key))
                        }
                        className={`w-full flex items-center justify-between px-4 py-3.5 min-h-[48px] rounded-xl text-base font-medium transition-colors duration-200 ${FOCUS_RING} ${
                          active ? "text-navy-900 bg-slate-100" : "text-navy-700 hover:bg-slate-50"
                        }`}
                        aria-expanded={expanded}
                      >
                        {menu.label}
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-200 ${
                            expanded ? "rotate-180" : ""
                          }`}
                          aria-hidden="true"
                        />
                      </button>
                      {expanded ? (
                        <div className="ml-3 mt-1 flex flex-col gap-0.5 border-l border-slate-200 pl-3">
                          {menu.children.map((item) => (
                            <Link
                              key={`${item.href}-${item.label}`}
                              href={item.href}
                              onClick={() => setMobileOpen(false)}
                              className={`px-3 py-3 min-h-[44px] rounded-lg text-sm font-medium transition-colors duration-200 flex items-center ${FOCUS_RING} ${
                                isChildActive(pathname, item)
                                  ? "text-teal-700 bg-teal-50"
                                  : "text-slate-600 hover:text-navy-900 hover:bg-slate-50"
                              }`}
                            >
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  );
                })}

                {NAV_LINKS.map((link) => (
                  <NavLink
                    key={link.href}
                    href={link.href}
                    label={link.label}
                    pathname={pathname}
                    onClick={() => setMobileOpen(false)}
                    className={`px-4 py-3.5 min-h-[48px] rounded-xl text-base font-medium transition-colors duration-200 flex items-center ${FOCUS_RING} ${
                      pathname === link.href || pathname?.startsWith(`${link.href}/`)
                        ? "text-navy-900 bg-slate-100"
                        : "text-navy-700 hover:text-navy-900 hover:bg-slate-50"
                    }`}
                  />
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-slate-200 flex flex-col gap-3">
                <a
                  href={CONTACT.phoneHref}
                  className={`flex items-center gap-3 px-4 py-3 min-h-[48px] text-slate-600 hover:text-navy-800 transition-colors duration-200 font-medium rounded-xl ${FOCUS_RING}`}
                >
                  <Phone className="w-4 h-4 text-teal-600" aria-hidden="true" />
                  {CONTACT.phone}
                </a>
                <Link
                  href={scenarioHref}
                  onClick={() => setMobileOpen(false)}
                  className={`${CTA_PRIMARY} w-full justify-center`}
                >
                  {NAV_PRIMARY_CTA_LABEL}
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
                <BookingLink
                  location="nav_mobile"
                  className="flex items-center justify-center gap-2 border border-slate-300 text-navy-700 py-3.5 min-h-[48px] rounded-xl font-medium text-sm transition-colors duration-200 hover:bg-slate-50"
                  onClick={() => setMobileOpen(false)}
                >
                  Talk With An Advisor
                </BookingLink>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
