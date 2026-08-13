import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const Navbar = ({ onBookClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navRef = useRef(null);
  const logoRef = useRef(null);
  const linksRef = useRef([]);
  const buttonRef = useRef(null);
  const mobileButtonRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const mobileLinksRef = useRef([]);

  // =========================================================
  // INITIAL NAVBAR ANIMATION
  // =========================================================

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: {
          ease: "expo.out",
        },
      });

      tl.from(navRef.current, {
        y: -100,
        opacity: 0,
        duration: 1,
      });

      tl.from(
        logoRef.current,
        {
          x: -20,
          opacity: 0,
          duration: 0.8,
        },
        "-=0.6"
      );

      tl.from(
        linksRef.current,
        {
          y: -10,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
        },
        "-=0.6"
      );

      tl.fromTo(
        buttonRef.current,
        {
          x: 20,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          ease: "back.out(1.5)",
        },
        "-=0.4"
      );

    }, navRef);

    return () => ctx.revert();
  }, []);

  // =========================================================
  // SCROLL ANIMATION
  // =========================================================

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Background state
      setIsScrolled(currentScrollY > 20);

      // -----------------------------------------
      // SCROLL DOWN → HIDE NAVBAR
      // -----------------------------------------

      if (currentScrollY > lastScrollY && currentScrollY > 150) {
        gsap.to(navRef.current, {
          yPercent: -100,
          duration: 0.5,
          ease: "power3.out",
        });

        // Close mobile menu
        if (isMobileOpen) {
          setIsMobileOpen(false);
        }
      }

      // -----------------------------------------
      // SCROLL UP → SHOW NAVBAR
      // -----------------------------------------

      else if (currentScrollY < lastScrollY) {
        gsap.to(navRef.current, {
          yPercent: 0,
          duration: 0.5,
          ease: "power3.out",
        });
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMobileOpen]);

  // =========================================================
  // MOBILE MENU
  // =========================================================

  useEffect(() => {
    if (!mobileMenuRef.current) return;

    if (isMobileOpen) {
      // Menu container
      gsap.set(mobileMenuRef.current, {
        display: "block",
      });

      const tl = gsap.timeline();

      tl.fromTo(
        mobileMenuRef.current,
        {
          height: 0,
          opacity: 0,
        },
        {
          height: "auto",
          opacity: 1,
          duration: 0.5,
          ease: "expo.out",
        }
      );

      tl.fromTo(
        mobileLinksRef.current,
        {
          y: 20,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.05,
          ease: "back.out(1.2)",
        },
        "-=0.3"
      );
    } else {
      gsap.to(mobileMenuRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.4,
        ease: "expo.inOut",
        onComplete: () => {
          gsap.set(mobileMenuRef.current, {
            display: "none",
          });
        },
      });
    }
  }, [isMobileOpen]);

  // =========================================================
  // HAMBURGER ANIMATION
  // =========================================================

  useEffect(() => {
    if (!mobileButtonRef.current) return;

    const lines = mobileButtonRef.current.querySelectorAll(".menu-line");

    if (isMobileOpen) {
      gsap.to(lines[0], {
        top: "50%",
        rotate: 45,
        duration: 0.4,
        ease: "back.out(1.5)",
      });

      gsap.to(lines[1], {
        scaleX: 0,
        opacity: 0,
        duration: 0.3,
      });

      gsap.to(lines[2], {
        top: "50%",
        rotate: -45,
        duration: 0.4,
        ease: "back.out(1.5)",
      });
    } else {
      gsap.to(lines[0], {
        top: "calc(50% - 6px)",
        rotate: 0,
        duration: 0.4,
        ease: "power3.out",
      });

      gsap.to(lines[1], {
        scaleX: 1,
        opacity: 1,
        duration: 0.4,
      });

      gsap.to(lines[2], {
        top: "calc(50% + 6px)",
        rotate: 0,
        duration: 0.4,
        ease: "power3.out",
      });
    }
  }, [isMobileOpen]);

  // =========================================================
  // CLOSE MENU
  // =========================================================

  const handleMobileLinkClick = () => {
    setIsMobileOpen(false);

    gsap.to(window, {
      scrollTo: window.scrollY,
      duration: 0,
    });
  };

  return (
    <nav
      ref={navRef}
      className={`
        fixed
        top-0
        left-0
        w-full
        z-50
        transition-all
        duration-500
        border-b
        ${
          isScrolled
            ? "bg-surface/90 backdrop-blur-xl border-primary/10 shadow-sm"
            : "bg-surface/50 backdrop-blur-sm border-transparent"
        }
      `}
    >
      {/* =====================================================
          MAIN NAVBAR
      ====================================================== */}

      <div
        className="
          container
          mx-auto
          max-w-7xl
          flex
          justify-between
          items-center
          px-gutter
          py-3.5
        "
      >
        {/* ===================================================
            LOGO (LEFT)
        ==================================================== */}

        <a
          ref={logoRef}
          href="#"
          className="
            font-headline-md
            text-headline-md
            font-bold
            text-primary
            tracking-tight
            relative
            group
            flex
            items-center
            gap-2
          "
        >
          MedPrecision
        </a>

        {/* ===================================================
            DESKTOP NAVIGATION (CENTER)
        ==================================================== */}

        <div className="hidden md:flex items-center gap-8">
          {/* Services */}
          <a
            ref={(el) => (linksRef.current[0] = el)}
            className="
              nav-link
              text-on-surface-variant
              hover:text-primary
              transition-colors
              duration-300
              font-label-sm
              text-label-sm
              relative
              group
            "
            href="#services"
          >
            Services
            <span
              className="
                absolute
                -bottom-1.5
                left-1/2
                -translate-x-1/2
                w-0
                h-[2px]
                bg-primary
                rounded-full
                transition-all
                duration-300
                group-hover:w-full
              "
            />
          </a>

          {/* Médecins */}
          <a
            ref={(el) => (linksRef.current[1] = el)}
            className="
              nav-link
              text-on-surface-variant
              hover:text-primary
              transition-colors
              duration-300
              font-label-sm
              text-label-sm
              relative
              group
            "
            href="#doctors"
          >
            Médecins
            <span
              className="
                absolute
                -bottom-1.5
                left-1/2
                -translate-x-1/2
                w-0
                h-[2px]
                bg-primary
                rounded-full
                transition-all
                duration-300
                group-hover:w-full
              "
            />
          </a>

          {/* À propos */}
          <a
            ref={(el) => (linksRef.current[2] = el)}
            className="
              nav-link
              text-on-surface-variant
              hover:text-primary
              transition-colors
              duration-300
              font-label-sm
              text-label-sm
              relative
              group
            "
            href="#about"
          >
            À propos
            <span
              className="
                absolute
                -bottom-1.5
                left-1/2
                -translate-x-1/2
                w-0
                h-[2px]
                bg-primary
                rounded-full
                transition-all
                duration-300
                group-hover:w-full
              "
            />
          </a>

          {/* Contact */}
          <a
            ref={(el) => (linksRef.current[3] = el)}
            className="
              nav-link
              text-on-surface-variant
              hover:text-primary
              transition-colors
              duration-300
              font-label-sm
              text-label-sm
              relative
              group
            "
            href="#contact"
          >
            Contact
            <span
              className="
                absolute
                -bottom-1.5
                left-1/2
                -translate-x-1/2
                w-0
                h-[2px]
                bg-primary
                rounded-full
                transition-all
                duration-300
                group-hover:w-full
              "
            />
          </a>
        </div>

        {/* ===================================================
            RIGHT SIDE: BUTTON + MOBILE HAMBURGER
        ==================================================== */}

        <div className="flex items-center gap-3">
          {/* Appointment Button — desktop only */}
          <button
            ref={buttonRef}
            onClick={onBookClick}
            className="
              hidden
              md:inline-flex
              bg-primary
              text-on-primary
              px-6
              py-2.5
              rounded-full
              font-label-sm
              text-label-sm
              font-bold
              hover:bg-primary/90
              hover:shadow-lg
              hover:shadow-primary/20
              transition-all
              duration-300
              active:scale-95
              hover:-translate-y-0.5
            "
          >
            Prendre rendez-vous
          </button>

          {/* Mobile Hamburger */}
          <button
            ref={mobileButtonRef}
            onClick={() => setIsMobileOpen((prev) => !prev)}
            className="
              md:hidden
              w-11
              h-11
              relative
              flex
              justify-center
              items-center
              rounded-full
              bg-surface/50
              hover:bg-primary/5
              transition-colors
              z-50
              border
              border-primary/10
            "
            aria-label="Menu"
          >
            <span
              className="menu-line absolute w-5 h-[2px] bg-primary rounded-full"
              style={{ top: "calc(50% - 6px)", transformOrigin: "center" }}
            />
            <span
              className="menu-line absolute w-5 h-[2px] bg-primary rounded-full"
              style={{ top: "50%", transformOrigin: "center" }}
            />
            <span
              className="menu-line absolute w-5 h-[2px] bg-primary rounded-full"
              style={{ top: "calc(50% + 6px)", transformOrigin: "center" }}
            />
          </button>
        </div>
      </div>

      {/* =====================================================
          MOBILE MENU
      ====================================================== */}

      <div
        ref={mobileMenuRef}
        className="
          md:hidden
          overflow-hidden
          border-t
          border-primary/10
          bg-surface/95
          backdrop-blur-xl
        "
        style={{
          display: "none",
          height: 0,
        }}
      >
        <div
          className="
            px-gutter
            py-8
            flex
            flex-col
            items-center
            gap-6
          "
        >
          {/* Mobile Services */}
          <a
            ref={(el) => (mobileLinksRef.current[0] = el)}
            href="#services"
            onClick={handleMobileLinkClick}
            className="
              text-on-surface
              hover:text-primary
              transition-colors
              font-title-lg
              text-title-lg
              font-medium
            "
          >
            Services
          </a>

          {/* Mobile Médecins */}
          <a
            ref={(el) => (mobileLinksRef.current[1] = el)}
            href="#doctors"
            onClick={handleMobileLinkClick}
            className="
              text-on-surface
              hover:text-primary
              transition-colors
              font-title-lg
              text-title-lg
              font-medium
            "
          >
            Médecins
          </a>

          {/* Mobile À propos */}
          <a
            ref={(el) => (mobileLinksRef.current[2] = el)}
            href="#about"
            onClick={handleMobileLinkClick}
            className="
              text-on-surface
              hover:text-primary
              transition-colors
              font-title-lg
              text-title-lg
              font-medium
            "
          >
            À propos
          </a>

          {/* Mobile Contact */}
          <a
            ref={(el) => (mobileLinksRef.current[3] = el)}
            href="#contact"
            onClick={handleMobileLinkClick}
            className="
              text-on-surface
              hover:text-primary
              transition-colors
              font-title-lg
              text-title-lg
              font-medium
            "
          >
            Contact
          </a>



          {/* Mobile Appointment */}
          <button
            ref={(el) => (mobileLinksRef.current[4] = el)}
            onClick={() => {
              setIsMobileOpen(false);
              onBookClick();
            }}
            className="
              w-full
              max-w-[250px]
              mt-2
              bg-primary
              text-on-primary
              px-6
              py-3.5
              rounded-full
              font-label-lg
              text-label-lg
              font-bold
              shadow-lg
              shadow-primary/20
              active:scale-95
              transition-all
            "
          >
            Prendre rendez-vous
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;