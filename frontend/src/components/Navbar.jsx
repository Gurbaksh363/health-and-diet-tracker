import { useState, useEffect } from "react";
import Logo from "../assets/Logo";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ArrowDownIcon } from "lucide-react";
import { ChevronDown } from "lucide-react";

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [open, setOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest(".navbar-container")) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isOpen]);

  const navLinks = [
    { name: "Home", href: "/", type: "route" },
    { name: "Tracker", href: "/dashboard", type: "route" },
    { name: "Nutrition", href: "/nutrition", type: "route" },
    { name: "Workouts", href: "/workouts", type: "route" },
    { name: "Progress", href: "/goals", type: "route" },
    // { name: "Settings", href: "/settings", type: "route" },
  ];

  const handleLinkClick = (href, type) => {
    setIsOpen(false);

    if (type === "anchor") {
      // For anchor links, navigate to home first if not there
      if (location.pathname !== "/") {
        navigate("/");
        // Wait for navigation, then scroll
        setTimeout(() => {
          const element = document.querySelector(href);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      } else {
        // Already on home, just scroll
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
      setActiveSection(href.slice(1));
    }
  };

  return (
    <nav
      className={`navbar-container fixed top-0 left-0 right-0 z-50 transition-all duration-300 animate-slide-in-down ${
        scrolled
          ? "bg-white/80 backdrop-blur-lg shadow-lg"
          : "bg-white/50 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-2 animate-fade-in">
            <Logo height={36} width={36} className="fill-[#06D6A0]" />
            <div className="flex flex-col animate-slide-in-left delay-200">
              <span className="text-xl font-bold text-gray-900">FitMind</span>
              <span className="text-xs text-gray-500 tracking-wide hidden sm:block">
                Health & Diet
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link, index) => {
              const isActive =
                link.type === "route"
                  ? location.pathname === link.href
                  : activeSection === link.href.slice(1);

              const linkContent = (
                <div
                  className={`relative px-3 py-2 rounded-lg text-sm font-medium transition-all hover:scale-105 active:scale-95 animate-fade-in ${
                    isActive
                      ? "text-[#06D6A0]"
                      : "text-gray-700 hover:text-[#06D6A0]"
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {link.name}
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#06D6A0]" />
                  )}
                </div>
              );

              return link.type === "route" ? (
                <Link key={link.name} to={link.href}>
                  {linkContent}
                </Link>
              ) : (
                <button
                  key={link.name}
                  onClick={() => handleLinkClick(link.href, link.type)}
                >
                  {linkContent}
                </button>
              );
            })}

            {/* NAVBAR AUTH */}
            {isAuthenticated ? (
              <DropdownMenu onOpenChange={setOpen} open={open}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="secondary"
                    className="flex items-center gap-2 px-0  rounded-full transition-all hover"
                  >
                    {/* Optional first name (show only on desktop) */}
                    <span className="hidden sm:inline p-2 font-semibold bg-linear-to-r from-[#00cd96] to-[#073B4C] bg-clip-text text-transparent">
                      Hi {user?.name?.trim().split(" ")[0]}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-600 transition-transform duration-300 ${
                        open ? "rotate-180" : ""
                      }`}
                    />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-56 shadow-lg border-gray-100 rounded-lg">
                  <DropdownMenuLabel className="flex flex-col gap-1">
                    <span className="text-gray-900 font-semibold">
                      {user?.name?.trim()}
                    </span>
                    <span className="text-xs text-gray-500">{user?.email}</span>
                  </DropdownMenuLabel>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem asChild>
                    <Link to="/dashboard" className="w-full cursor-pointer">
                      {" "}
                      Dashboard{" "}
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <Link to="/settings" className="w-full cursor-pointer">
                      Setting
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    onClick={logout}
                    className="text-red-500 cursor-pointer font-medium hover:bg-red-50"
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-[#06D6A0] transition-all"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-[#06D6A0] text-white px-4 py-2 rounded-lg hover:bg-[#06D6A0]/90 transition-all"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden relative w-9 h-9 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-[#06D6A0]/10 transition-all hover:scale-110 active:scale-90"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="w-5 flex flex-col items-center justify-center space-y-1.5">
              <span
                className={`w-full h-0.5 bg-[#06D6A0] rounded-full transition-all duration-300 ${
                  isOpen ? "rotate-45 translate-y-2" : ""
                }`}
              />
              <span
                className={`w-full h-0.5 bg-[#06D6A0] rounded-full transition-all duration-300 ${
                  isOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`w-full h-0.5 bg-[#06D6A0] rounded-full transition-all duration-300 ${
                  isOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          className="md:hidden fixed left-0 right-0 bg-white/98 backdrop-blur-xl z-40 h-dvh animate-slide-in-right"
          style={{ top: "64px", bottom: 0 }}
        >
          <div className="flex flex-col items-center justify-start py-6 px-4 space-y-2 h-full overflow-y-auto">
            {navLinks.map((link, index) => {
              const isActive =
                link.type === "route"
                  ? location.pathname === link.href
                  : activeSection === link.href.slice(1);

              const linkContent = (
                <div
                  className={`w-full max-w-sm px-5 py-3 rounded-lg text-center text-base font-medium transition-all hover:scale-[1.02] hover:translate-x-1 active:scale-98 animate-slide-in-left ${
                    isActive
                      ? "bg-[#06D6A0] text-white shadow-md"
                      : "bg-gray-50 hover:bg-[#06D6A0]/10 text-gray-900"
                  }`}
                  style={{ animationDelay: `${index * 70}ms` }}
                >
                  {link.name}
                </div>
              );

              return link.type === "route" ? (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className="w-full"
                >
                  {linkContent}
                </Link>
              ) : (
                <button
                  key={link.name}
                  onClick={() => handleLinkClick(link.href, link.type)}
                  className="w-full"
                >
                  {linkContent}
                </button>
              );
            })}

            {isAuthenticated && (
              <div className="w-full max-w-sm border-t border-gray-200 pt-3 mt-3 space-y-2">
                <Link to="/login" onClick={() => setIsOpen(false)}>
                  <button
                    className="w-full px-5 py-3 bg-gray-50 hover:bg-[#06D6A0]/10 text-gray-900 rounded-lg font-semibold text-base transition-all hover:scale-[1.02] hover:-translate-y-0.5 active:scale-98 animate-fade-in"
                    style={{ animationDelay: `${navLinks.length * 70}ms` }}
                  >
                    Login
                  </button>
                </Link>

                <Link to="/signup" onClick={() => setIsOpen(false)}>
                  <button
                    className="w-full px-5 py-3 bg-[#06D6A0] text-white rounded-lg font-semibold text-base shadow-md transition-all hover:scale-[1.02] hover:-translate-y-0.5 active:scale-98 animate-fade-in"
                    style={{
                      animationDelay: `${(navLinks.length + 1) * 70}ms`,
                    }}
                  >
                    Sign Up
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Navbar Bottom Line */}
      <div
        className={`h-0.5 bg-linear-to-r from-[#06D6A0] via-cyan-500 to-teal-600 transition-all duration-300 ${
          scrolled ? "scale-x-100" : "scale-x-0"
        }`}
        style={{ transformOrigin: "left" }}
      />
    </nav>
  );
};

export default Navbar;
