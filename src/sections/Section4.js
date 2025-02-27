import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import $ from "jquery";
import { useContext, useEffect } from "react";
import { THEME_IPHONE, ThemeContext } from "../ThemeContext";
import Divider from "../components/Divider";
import SectionalButton from "../components/SectionalButton";
import "../style/section-4.css";
gsap.registerPlugin(ScrollTrigger);
export default function () {
  const theme = useContext(ThemeContext);
  const names = [
    "Tomas Bartoleto, CTO\n@BartoletoCEO",
    "Maximillien Wojcicki, CTO\n@WojcickiCTO",
    "Carolina Alvarez-Miyata, CRO\n@AlvarezCRO",
    "Vanessa Hadjar, Chief Analyst\n@VanessaHadjar",
    "Richard Blume, Analyst: Blockchain\n@RichardBlume",
    "Melinda Gyasi, Analyst: AI\n@MelinaGyasi",
    "Alana Moises, Analyst: Cyber Security\n@AlanaMoises",
    "Christine Reece, Analyst: Blockchain\n@ChristineReece",
  ].map(name => theme === THEME_IPHONE ? name.replace(", ", "\n") : name);
  const imageCount = names.length;
  const duplicateNumber = 5;

  useEffect(() => {
    const loopDuration = 200;
    const _imageList = $("#section-4 .image-list");
    const _imageItems = _imageList
      .find(".image-item")
      .map((index, element) => $(element));
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: _imageList,
        start: "top 80%",
        end: "bottom 0%",
        scrub: false,
        markers: false,
        once: true,
        onEnter: function () { },
      },
    });
    tl.to(
      _imageList,
      {
        x: `-${100 / duplicateNumber}%`,
        ease: "linear",
        duration: loopDuration,
      },
      "<"
    )
      .set(_imageList, {
        x: `-${(100 / duplicateNumber) * 2}%`,
      })
      .to(_imageList, {
        x: `-${(100 / duplicateNumber) * 3}%`,
        ease: "linear",
        duration: loopDuration,
        repeat: -1,
      });
    const groupWidth = _imageList.width() / duplicateNumber;
    const imageWidth = groupWidth / imageCount;
    const handleLeft = () => {
      gsap
        .timeline()
        .to(_imageList, {
          marginLeft: `+=${imageWidth}px`,
          ease: "power3.inOut",
          duration: 1,
          onStart: () => {
            tl.pause();
          },
          onComplete: () => {
            tl.resume();
          },
        })
        .set(_imageList, {
          marginLeft: () => {
            const oldMl = Number(
              _imageList.css("margin-left").replace("px", "")
            );
            const newMl = gsap.utils.wrap(-groupWidth, 0, oldMl);
            return newMl;
          },
        });
    };
    const handleRight = () => {
      gsap
        .timeline()
        .to(_imageList, {
          marginLeft: `-=${imageWidth}px`,
          ease: "power3.inOut",
          duration: 1,
          onStart: () => {
            tl.pause();
          },
          onComplete: () => {
            tl.resume();
          },
        })
        .set(_imageList, {
          marginLeft: () => {
            const oldMl = Number(
              _imageList.css("margin-left").replace("px", "")
            );
            const newMl = gsap.utils.wrap(-groupWidth, 0, oldMl);
            return newMl;
          },
        });
    };
    $("#section-4 .image-controller .left").on("click", handleLeft);
    $("#section-4 .image-controller .right").on("click", handleRight);
    return () => {
      $("#section-4 .image-controller .left").off("click", handleLeft);
      $("#section-4 .image-controller .right").off("click", handleRight);
    };
  }, []);

  return (
    <div className="section" id="section-4">
      <Divider />
      <div className="reveal">
        Meet our team of <br /> pioneers
      </div>
      <div className="subtitle">
        Our combined 20 years of working on strategic investments in emerging
        digital markets across the public and private sectors makes us ready for
        tomorrow.
      </div>
      <div className="image-list-wrapper">
        <div className="image-list">
          {(function () {
            const images = [];
            for (let i = 0; i < imageCount * duplicateNumber; i++) {
              const itemIndex = i % imageCount;
              images.push(
                <div className="image-item" key={i}>
                  <div className="img-src">
                    <img src={`./assets/sec4-img${itemIndex + 1}.png`} />
                  </div>
                  <div className="content">
                    <pre className="name">{names[itemIndex]}</pre>
                    <svg
                      width="16"
                      height="15"
                      viewBox="0 0 16 15"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12.3633 3.43275C12.322 3.46507 12.2795 3.49611 12.2398 3.53003C9.92713 5.50667 7.61257 7.48171 5.30569 9.46507C5.12009 9.62475 4.96809 9.65579 4.73417 9.57931C3.24073 9.09131 1.74153 8.62091 0.244252 8.14475C0.196572 8.12971 0.146972 8.11947 0.102172 8.09803C-0.0290283 8.03467 -0.0341483 7.90475 0.0884117 7.82635C0.171932 7.77291 0.264092 7.73227 0.352732 7.68683C5.33577 5.13867 10.3182 2.59051 15.3006 0.0426726C15.3217 0.0317926 15.3422 0.0157926 15.3646 0.0119526C15.3844 0.00843263 15.4046 0.0052326 15.4247 0.0023526C15.5614 -0.0184474 15.6839 0.101873 15.6539 0.236913C15.6539 0.237873 15.6535 0.238513 15.6532 0.239473C15.3732 1.41643 15.0862 2.59147 14.8007 3.76683C14.1511 6.44043 13.5012 9.11403 12.8516 11.7873C12.7921 12.0318 12.7563 12.0542 12.5223 11.9832C10.6903 11.4254 8.85865 10.867 7.02697 10.3086C6.78377 10.2344 6.75913 10.1454 6.92937 9.94379C8.70793 7.83659 10.4868 5.73035 12.2654 3.62347C12.3099 3.57067 12.3524 3.51627 12.3959 3.46251C12.3851 3.45259 12.3745 3.44267 12.3636 3.43307L12.3633 3.43275Z" />
                      <path d="M6.7422 12.8751C6.7422 12.4179 6.7406 11.9606 6.74252 11.503C6.74348 11.2559 6.80044 11.2124 7.03116 11.2828C7.4958 11.4243 7.96012 11.5676 8.4238 11.7129C8.63276 11.7785 8.66028 11.8524 8.54412 12.0361C8.04972 12.8188 7.55564 13.6019 7.05484 14.3804C7.05132 14.3855 7.0478 14.3907 7.04364 14.3955C6.95916 14.4956 6.79308 14.4543 6.755 14.3292C6.7502 14.3139 6.74732 14.2982 6.747 14.2825C6.73708 13.8134 6.74188 13.3443 6.74188 12.8748L6.7422 12.8751Z" />
                    </svg>
                  </div>
                </div>
              );
            }
            return images;
          })()}
        </div>
        <div className="image-overlap"></div>
      </div>
      <div className="image-controller">
        {theme === THEME_IPHONE ? (
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="31.5"
              y="31.5"
              width="31"
              height="31"
              rx="15.5"
              transform="rotate(-180 31.5 31.5)"
              stroke="white"
            />
            <path
              d="M27 16.501L19.7619 16.501L8.45238 16.501"
              stroke="white"
              strokeWidth="1.25"
            />
            <path
              d="M12.9766 9.50098L8.00037 16.5002L12.9766 23.0002"
              stroke="white"
              strokeWidth="1.25"
            />
          </svg>
        ) : (
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="left"
          >
            <rect
              x="39.5"
              y="39.5"
              width="39"
              height="39"
              rx="19.5"
              transform="rotate(-180 39.5 39.5)"
              stroke="white"
            />
            <path
              d="M30 20.501L22 20.501L9.5 20.501"
              stroke="white"
              strokeWidth="1.25"
            />
            <path
              d="M14.5 13.501L9 20.5002L14.5 27.0002"
              stroke="white"
              strokeWidth="1.25"
            />
          </svg>
        )}
        {theme === THEME_IPHONE ? (
          <svg
            width="173"
            height="2"
            viewBox="0 0 173 2"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 1L173 0.999987" stroke="#A2A2A2" />
          </svg>
        ) : (
          <svg
            width="552"
            height="1"
            viewBox="0 0 552 1"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="progress"
          >
            <line
              x1="-4.37114e-08"
              y1="0.5"
              x2="552"
              y2="0.499952"
              stroke="#A2A2A2"
            />
          </svg>
        )}
        {theme === THEME_IPHONE ? (
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="0.5"
              y="0.5"
              width="31"
              height="31"
              rx="15.5"
              stroke="white"
            />
            <path
              d="M5 15.499L12.2381 15.499L23.5476 15.499"
              stroke="white"
              strokeWidth="1.25"
            />
            <path
              d="M19.0234 22.499L23.9996 15.4998L19.0234 8.99982"
              stroke="white"
              strokeWidth="1.25"
            />
          </svg>
        ) : (
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="right"
          >
            <rect
              x="0.5"
              y="0.5"
              width="39"
              height="39"
              rx="19.5"
              stroke="#FFFF99"
            />
            <path
              d="M10 19.499L18 19.499L30.5 19.499"
              stroke="#FFFF99"
              strokeWidth="1.25"
            />
            <path
              d="M25.5 26.499L31 19.4998L25.5 12.9998"
              stroke="#FFFF99"
              strokeWidth="1.25"
            />
          </svg>
        )}
      </div>
      <SectionalButton label="Meet our Organization?" type="right" />
    </div>
  );
}
