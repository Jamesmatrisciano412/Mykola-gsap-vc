import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import $ from "jquery";
import { ReactLenis, useLenis } from "lenis/react";
import { useEffect, useState } from "react";
import SplitType from "split-type";
import "./App.css";
import { getWindowTheme, wrapByLineWrapper } from "./utils";

import Cursor from "./components/Cursor";
import Header from "./components/Header";
import Section1 from "./sections/Section1";
import Section10 from "./sections/Section10";
import Section11 from "./sections/Section11";
import Section12 from "./sections/Section12";
import Section13 from "./sections/Section13";
import Section14 from "./sections/Section14";
import Section2 from "./sections/Section2";
import Section3 from "./sections/Section3";
import Section4 from "./sections/Section4";
import Section5 from "./sections/Section5";
import Section6 from "./sections/Section6";
import Section7 from "./sections/Section7";
import Section8 from "./sections/Section8";
import Section9 from "./sections/Section9";
import { ThemeContext } from "./ThemeContext";

gsap.registerPlugin(ScrollTrigger);

function App() {
  // Effects

  // useEffect at the beginning
  useEffect(() => {
    // Background gradient animation
    (function () {
      const sectionBg = [
        "linear-gradient(270deg, #161e29, #1c2c3f, #161e29)",
        "linear-gradient(270deg, #1a1b21, #1e212f, #1a1b21)",
        "linear-gradient(270deg, #1e212f, #242e42, #1e212f)",
        "linear-gradient(270deg, #161e29, #1c2c3f, #161e29)",
        "linear-gradient(270deg, #161e29, #1c2c3f, #161e29)",

        "linear-gradient(270deg, #1e212f, #242e42, #1e212f)",
        "linear-gradient(270deg, #161e29, #1c2c3f, #161e29)",
        "linear-gradient(270deg, #1e212f, #242e42, #1e212f)",
        "linear-gradient(270deg, #1a1b21, #1e212f, #1a1b21)",

        "linear-gradient(270deg, #1e212f, #242e42, #1e212f)",
        "linear-gradient(270deg, #1e212f, #242e42, #1e212f)",
        "linear-gradient(270deg, #161e29, #1c2c3f, #161e29)",
        // "linear-gradient(270deg, #1a1b21, #1e212f, #1a1b21)",
      ];
      for (let index = 0; index < sectionBg.length; index++) {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: `#section-${index + 2}`,
              start: "top 100%", // when the top of the trigger hits the top of the viewport
              end: "top 0%", // end after scrolling 500px beyond the start
              scrub: true,
              toggleActions: "play play reverse reverse",
              markers: false,
            },
          })
          .to(".App>.container", {
            backgroundImage: sectionBg[index],
            duration: 3,
          });
      }
    })();

    // Divider line
    $(".divider, .email-input-bottom-line").each((index, ele) => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: ele,
            start: "top 95%",
            end: "top 50%",
            //toggleActions: "play none none reverse",
            scrub: false,
            markers: false,
            once: true,
          },
        })
        .fromTo(
          ele,
          {
            width: "0%",
            opacity: 0.5,
          },
          {
            width: "100%",
            opacity: 1,
            duration: 0.7,
            ease: "circ.out",
          }
        );
    });

    document.fonts.ready.then(() => {
      // H1 split
      document.querySelectorAll(".reveal").forEach((char, index) => {
        const text = new SplitType(char, { types: ["lines", "chars"] });
        gsap
          .timeline({
            scrollTrigger: {
              trigger: char,
              start: "top 90%",
              end: "top 20%",
              scrub: false,
              markers: false,
              once: true,
            },
          })
          .fromTo(
            text.chars,
            {
              color: "#233246ff",
              opacity: 0.9,
            },
            {
              ///background: "linear-gradient(-20deg, #f5f774, #50abff, #ffffff)",

              opacity: 1,
              color: "#23324600",
              stagger: {
                amount: 0.4,
              },
              duration: 0.2,
            }
          )
          .to(text.chars, {
            color: "#ffffffff",
            duration: 0.8,
          }, ">+0.75");
      });

      // H2 split
      document.querySelectorAll(".subtitle").forEach((subTitle, index) => {
        const text = new SplitType(subTitle, { types: "lines" });
        text.lines = text.lines.map((line) => wrapByLineWrapper(line));
        gsap.fromTo(
          text.lines,
          {
            y: "101%",
            opacity: 0.8,
          },
          {
            y: "0%",
            opacity: 1,
            duration: 1,
            stagger: {
              each: 0.2,
            },
            ease: "power3.out",
            scrollTrigger: {
              trigger: subTitle,
              start: "top 90%",
              end: "top 20%",
              scrub: false,
              once: true,
              //toggleActions: "play play reverse reverse"
              markers: false,
            },
          }
        );
      });
    });
  }, []);

  // Use lenis
  const lenis = useLenis(({ scroll }) => {
    // called every scroll
  });

  const [theme, setTheme] = useState(getWindowTheme());
  const updateThemeState = () => {
    setTheme(getWindowTheme());
  };
  useEffect(() => {
    updateThemeState(); // Initial check on component mount
    window.addEventListener("resize", updateThemeState);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", updateThemeState);
    };
  }, []);
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 2,
        easing: (x) => {
          return 1 - Math.pow(1 - x, 5);
        },
      }}
    >
      <ThemeContext.Provider value={theme}>
        <div className="App">
          <Cursor />
          <div className="container">
            <Header />
            <Section1 />
            <Section2 />
            <Section3 />
            <Section4 />
            <Section5 />
            <Section6 />
            <Section7 />
            <Section8 />
            <Section9 />
            <Section10 />
            <Section11 />
            <Section12 />
            <Section13 />
            <Section14 />
          </div>
        </div>
      </ThemeContext.Provider>
    </ReactLenis>
  );
}

export default App;
