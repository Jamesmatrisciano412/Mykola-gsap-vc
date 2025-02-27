import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import $ from "jquery";
import { useContext, useEffect } from "react";
import SplitType from "split-type";
import { THEME_IPAD, THEME_IPHONE, ThemeContext } from "../ThemeContext";
import BentoCard from "../components/BentoCard";
import Divider from "../components/Divider";
import "../style/section-8.css";
import { wrapByLineWrapper } from "../utils";
gsap.registerPlugin(ScrollTrigger);
export default function () {
  const theme = useContext(ThemeContext);
  const barValues = [
    37, 56, 70, 94, 65, 50, 69, 70, 65, 73, 77, 86, 94, 101, 155, 131, 155, 167,
    192, 213, 223,
  ];
  useEffect(() => {
    document.fonts.ready.then(() => {
      document
        .querySelectorAll("#section-8 .bento-card")
        .forEach((cardEle, index) => {
          const _cardEle = $(cardEle);
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: _cardEle, //"#section-8 .bento-group",
              start: "top 100%",
              end: "bottom 0%",
              scrub: false,
              markers: false,
              once: true,
              onEnter: function () {
                _cardEle.addClass("loaded");
              },
            },
            defaults: {
              ease: "circ.out",
              duration: 0.5,
            },
          });
          if (_cardEle.hasClass("bar-bento")) {
            // barchart
            tl.from(".bar-chart .chart-bar", {
              clipPath: "inset(100% 0% 0% 0%)",
              duration: 0.05,
              delay: 0.2,
              stagger: 0.03,
            }) /*.from(".bar-chart .current-value", {
            opacity: 0,
          })*/;
          } else if (_cardEle.hasClass("circle-bento")) {
            // donut(circle-chart)
            tl.from(".circle-chart .doughnut-chart", {
              backgroundImage:
                "conic-gradient(rgb(133, 167, 255, 0) 0%, rgb(133, 167, 255, 0) 0%, rgb(153, 182, 255, 0) 0%, rgb(153, 182, 255, 0) 0%, rgb(173, 197, 255, 0) 0%, rgb(173, 197, 255, 0) 0%, rgb(82, 130, 255, 0) 0%, rgb(82, 130, 255, 0) 0%, rgb(112, 153, 255, 0) 0%, rgb(112, 153, 255, 0) 0%)",
              delay: 0.2,
            })
              .fromTo(
                ".circle-chart .lines>svg:nth-child(-n+3)",
                {
                  clipPath: "inset(0% 100% 0% 0%)",
                },
                {
                  clipPath: "inset(0% 0% 0% 0%)",
                },
                "<"
              )
              .fromTo(
                ".circle-chart .lines>svg:nth-child(n+4)",
                {
                  clipPath: "inset(0% 0% 0% 100%)",
                },
                {
                  clipPath: "inset(0% 0% 0% 0%)",
                },
                "<"
              )
              .from(
                new SplitType(_cardEle.find(".circle-chart .label"), {
                  types: "lines",
                }).lines.map((line) => wrapByLineWrapper(line)),
                {
                  opacity: 0,
                  y: "100%",
                },
                "<"
              );
          } else if (_cardEle.hasClass("line-bento")) {
            // line-chart
            tl.from(".line-bento .line-svg", {
              clipPath: "inset(0% 100% 0% 0%)",
              delay: 0.2,
            });
          } else {
            // numerial-bento
            tl.from(wrapByLineWrapper(_cardEle.find(".title")[0]), {
              y: "100%",
              delay: 0.2,
            }).from(
              new SplitType(_cardEle.find(".content"), {
                types: "lines",
              }).lines.map((line) => wrapByLineWrapper(line)),
              {
                y: "100%",
              },
              "<"
            );
          }
        });
    });
    const _lineWrapper = $("#section-8 .line-bento .line-wrapper");
    const _tooltip = $("#section-8 .line-bento .tooltip");
    moveTooltip(0);
    function getYValue(linePath, xPos) {
      const totalLength = linePath.getTotalLength();
      const minPoint = linePath.getPointAtLength(0);
      const maxPoint = linePath.getPointAtLength(totalLength);
      const point = linePath.getPointAtLength((xPos / linePath.getBoundingClientRect().width) * totalLength);
      return (point.y - minPoint.y) / (maxPoint.y - minPoint.y);
    }
    function moveTooltip(xPos) {
      const ww = _lineWrapper.width();
      xPos = Math.min(Math.max(0, xPos), ww);
      if (xPos >= 0 && xPos <= ww) {
        const linepath1 = document.getElementById("linepath1");
        const linepath2 = document.getElementById("linepath2");
        const y1 = getYValue(linepath1, xPos);
        const y2 = getYValue(linepath2, xPos);
        const strY1 = Math.floor(10 + y1 * (60 - 10));
        const strY2 = Math.floor(10 + y2 * (58 - 10));
        _tooltip.find('.tip1').text(`${strY1} Billion`);
        _tooltip.find('.tip2').text(`${strY2} Billion`);
        _tooltip.css('left', xPos);
        const hh = _lineWrapper.height();
        _tooltip.css('top', hh - (y1 + y2) / 2 * hh);
      }
    }
    _lineWrapper.on("mousemove", function (event) {
      var parentOffset = $(this).offset();
      moveTooltip(event.pageX - parentOffset.left);
    });
    _lineWrapper.on("touchmove", function (event) {
      const { clientX, clientY } = event.changedTouches[0];
      moveTooltip(clientX - _lineWrapper.offset().left);
    })
    // const _mainChart = $("#section-8 .bar-bento .main-chart");
    // let valueTL = gsap.timeline();
    // _mainChart.on("mousemove", function (event) {
    //   // Get the offset position of the parent element
    //   var parentOffset = $(this).offset();

    //   // Calculate the mouse position relative to the parent element
    //   const relativeX = event.pageX - parentOffset.left;
    //   const width = _mainChart.innerWidth();
    //   //var relativeY = event.pageY - parentOffset.top;
    //   const paddingLeft = 8;
    //   const paddingBottom = 8;
    //   const gap = 8;
    //   const barCount = barValues.length;
    //   const widthOfItem = (width - gap * (barCount - 1)) / barCount;
    //   const index = Math.floor((relativeX - paddingLeft) / (widthOfItem + gap));

    //   if (index >= 0 && index < barCount) {
    //     const currentValueOffset =
    //       $(_mainChart.find(".chart-bar")[index]).offset().left -
    //       parentOffset.left -
    //       paddingLeft;
    //     const currentValueBottom = barValues[index];
    //     const currentValueLabel = `${Math.floor(
    //       ((barValues[index] - barValues[0]) /
    //         (barValues[barCount - 1] - barValues[0])) *
    //         90 +
    //         10
    //     )} Billion`;
    //     const _currentValue = $("#section-8 .bar-bento .current-value");
    //     const _currentValueLabelEle = _currentValue.find(".label");
    //     if (_currentValueLabelEle.html() !== currentValueLabel) {
    //       _currentValueLabelEle.html(currentValueLabel);
    //       gsap.to(_currentValue, {
    //         width: currentValueOffset + widthOfItem / 2,
    //         bottom: currentValueBottom + paddingBottom,
    //         duration: 0.2,
    //       });
    //       gsap.fromTo(
    //         _currentValueLabelEle,
    //         {
    //           color: "#ffffff00",
    //         },
    //         {
    //           color: "#ffffffff",
    //           ease: "circ.out",
    //           duration: 1,
    //         }
    //       );
    //     }
    //   }
    // });
  }, []);
  return (
    <div className="section" id="section-8">
      <Divider />
      <div className="reveal">
        Actionable data <br />
        points at a glance
      </div>
      <div className="subtitle">
        The the transformative potential of blockchain has never been easier to
        see with our regularly updated data offerings and insights.
      </div>
      <div className="bento-group">
        <div className="chart-bentos">
          <BentoCard
            className="bar-bento chart-item"
            render={() => (
              <>
                <div className="description">
                  By 2030, global spending on blockchain solutions will exceed
                  $1.4 Trillion across major sectors
                </div>
                <div className="whole-chart bar-chart">
                  <div className="left-labels">
                    {["1T", 80, 60, 40, 20, 10, 0].map((value, index) => (
                      <span className="left-label" key={index}>
                        {value}
                      </span>
                    ))}
                  </div>
                  <div className="right-chart">
                    <div className="main-chart">
                      {/* <div className="current-value">
                        <div className="label">42 Billion</div>
                      </div> */}
                      {barValues.map((value, index) => (
                        <div
                          className="chart-bar"
                          style={{
                            height: `${theme === THEME_IPHONE
                              ? (value * 201) / 264
                              : value
                              }px`,
                          }}
                          key={index}
                        ></div>
                      ))}
                    </div>
                    <div className="bottom-labels">
                      {(function () {
                        const elements = [];
                        for (let i = 2018; i <= 2032; i += 2) {
                          elements.push(
                            <div className="bottom-value" key={i}>
                              {i}
                            </div>
                          );
                        }
                        return <>{elements}</>;
                      })()}
                    </div>
                  </div>
                </div>
              </>
            )}
          />
          <BentoCard
            className="circle-bento chart-item"
            render={() => (
              <>
                <div className="description">
                  Blockchain investment in Billions across <br />
                  major sectors in 2023.
                </div>
                <div className="whole-chart circle-chart">
                  <div className="doughnut-chart"></div>
                  <div className="lines">
                    {theme === THEME_IPAD ? (
                      <>
                        <svg
                          width="98"
                          height="33"
                          viewBox="0 0 98 33"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M97 1L1 13.5V33" stroke="#85A7FF" />
                        </svg>

                        <svg
                          width="71"
                          height="2"
                          viewBox="0 0 71 2"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M0 1L71 1.00001" stroke="#99B6FF" />
                        </svg>

                        <svg
                          width="63"
                          height="79"
                          viewBox="0 0 63 79"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M0.5 1L62 25.5V79.0005" stroke="#ADC5FF" />
                        </svg>

                        <svg
                          width="78"
                          height="64"
                          viewBox="0 0 78 64"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M77 1L0.5 43.5V64" stroke="#5282FF" />
                        </svg>
                        <svg
                          width="81"
                          height="2"
                          viewBox="0 0 81 2"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M0.5 1.00002L81 1.00001" stroke="#7099FF" />
                        </svg>
                      </>
                    ) : theme === THEME_IPHONE ? (
                      <>
                        <svg
                          width="2"
                          height="42"
                          viewBox="0 0 2 42"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M1 0V42" stroke="#85A7FF" />
                        </svg>

                        <svg
                          width="47"
                          height="17"
                          viewBox="0 0 47 17"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M0.499999 16.5002L46.5 16.5001L46.5 0.500004"
                            stroke="#99B6FF"
                          />
                        </svg>
                        <svg
                          width="38"
                          height="71"
                          viewBox="0 0 38 71"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M1 1L37 21V71" stroke="#ADC5FF" />
                        </svg>
                        <svg
                          width="38"
                          height="71"
                          viewBox="0 0 38 71"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M37 1L1 21V71" stroke="#5282FF" />
                        </svg>
                        <svg
                          width="35"
                          height="20"
                          viewBox="0 0 35 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M0 1L34 1L34 20" stroke="#7099FF" />
                        </svg>
                      </>
                    ) : (
                      <>
                        <svg
                          width="131"
                          height="32"
                          viewBox="0 0 131 32"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M130 0.5L1 20V32" stroke="#85A7FF" />
                        </svg>
                        <svg
                          width="71"
                          height="2"
                          viewBox="0 0 71 2"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M0 1L71 1.00001" stroke="#99B6FF" />
                        </svg>
                        <svg
                          width="129"
                          height="42"
                          viewBox="0 0 129 42"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M1 1L128 21.7309V42.0005" stroke="#ADC5FF" />
                        </svg>
                        <svg
                          width="129"
                          height="42"
                          viewBox="0 0 129 42"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M128 1L1 21.5V42" stroke="#5282FF" />
                        </svg>
                        <svg
                          width="101"
                          height="2"
                          viewBox="0 0 101 2"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M0 1.00001L101 1.00001" stroke="#7099FF" />
                        </svg>
                      </>
                    )}
                  </div>
                  <div className="label label-1">
                    Health Care <br />
                    (1.2B, 11.7%)
                  </div>
                  <div className="label label-2">
                    Supply Chain <br />
                    Management <br />
                    (1.5B, 14.5%)
                  </div>
                  <div className="label label-3">
                    Energy {theme === THEME_IPHONE ? <br /> : ""} Sector <br />{" "}
                    (1B, 8%)
                  </div>
                  <div className="label label-4">
                    Financial {theme === THEME_IPHONE ? <br /> : ""}Services{" "}
                    <br /> (5.7B, 55.3%)
                  </div>
                  <div className="label label-5">
                    Government {theme === THEME_IPHONE ? <br /> : ""}&{" "}
                    {theme !== THEME_IPHONE ? <br /> : ""} Public{" "}
                    {theme === THEME_IPHONE ? <br /> : ""}Sector <br /> (1.1B,
                    10.5%)
                  </div>
                </div>
              </>
            )}
          />
        </div>
        <div className="numer-bentos">
          <BentoCard
            className="numerical-bento"
            render={() => (
              <>
                <div className="title">80%</div>
                <div className="content">
                  Percent of executives <br />
                  reporting that their companies <br />
                  are exploring blockchain technology.
                </div>
              </>
            )}
          />
          <BentoCard
            className="numerical-bento"
            render={() => (
              <>
                <div className="title">27B</div>
                <div className="content">
                  Annual expected savings for financial <br />
                  institutions through reduced fraud, automated <br />
                  processes and compliance by 2030.
                </div>
              </>
            )}
          />
          {theme !== THEME_IPAD && (
            <BentoCard
              className="numerical-bento"
              render={() => (
                <>
                  <div className="title">62%</div>
                  <div className="content">
                    of healthcare applications and institutions <br />
                    will have adopted blockchain for <br />
                    commercial deployment by 2025.
                  </div>
                </>
              )}
            />
          )}
        </div>
        {theme === THEME_IPAD && (
          <div className="numer-bentos">
            <BentoCard
              className="numerical-bento"
              render={() => (
                <>
                  <div className="title">62%</div>
                  <div className="content">
                    of healthcare applications and institutions <br />
                    will have adopted blockchain for <br />
                    commercial deployment by 2025.
                  </div>
                </>
              )}
            />
            <BentoCard
              className="numerical-bento"
              render={() => (
                <>
                  <div className="title">80B</div>
                  <div className="content">
                    Number of blockchain wallets registered <br />
                    globally for use in 2023 and set to exceed <br />
                    100 Billion by 2025.
                  </div>
                </>
              )}
            />
          </div>
        )}
        <div className="mixed-bento-group">
          <BentoCard
            className="line-bento"
            render={() => (
              <>
                <div className="line-labels">
                  <div className="line-label">
                    <svg
                      width="20"
                      height="2"
                      viewBox="0 0 20 2"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M20 1H0" stroke="#5282FF" strokeWidth="2" />
                    </svg>
                    <div className="label">DeFI Market Size (Billions)</div>
                  </div>
                  <div className="line-label">
                    <svg
                      width="20"
                      height="2"
                      viewBox="0 0 20 2"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M20 1H0" stroke="#ADC5FF" strokeWidth="2" />
                    </svg>
                    <div className="label">
                      Investments in DeFi Start-ups (Billions)
                    </div>
                  </div>
                </div>
                <div className="left-labels">
                  {[60, 40, 20, 10].map((value, index) => (
                    <div className="left-label" key={index}>
                      {value}
                    </div>
                  ))}
                </div>
                <div className="right-chart">
                  <div className="main-chart">
                    <div className="line-wrapper">
                      <div className="tooltip">
                        <div className="tip tip1">10 Billion</div>
                        <div className="tip tip2">10 Billion</div>
                      </div>
                      {theme === THEME_IPAD ? (
                        <svg
                          width="900"
                          height="133"
                          viewBox="0 0 900 133"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="line-svg"
                        >
                          <path
                            d="M1 132C20.092 130.376 66.9001 115.237 85.3965 115.67C108.517 116.211 135.841 107.01 156.335 107.01C176.828 107.01 222.247 102.824 240.096 95.0664C262.342 85.3982 287.331 69.6239 308.35 69.6239C329.369 69.6239 373.952 73.5299 391.266 63.5177C421.855 45.8282 456.377 54.5112 482.124 54.5112C532.829 54.5112 542.368 59.2792 559.5 49C594.5 28 594 49 638 33.5C669.224 22.5007 750.574 22 780 22C809.426 22 864.615 18.292 899.5 1.5"
                            stroke="#7099FF"
                            strokeWidth="1.5"
                            id="linepath1"
                          />
                          <path
                            d="M1 132C4.64895 132 24.5049 111.852 45.8773 111.852C67.2497 111.852 75.3074 126.393 100.85 126.393C126.393 126.393 149.788 76.7506 175.996 88.7533C230.969 113.93 276.359 129.855 304.602 111.852C342.928 87.423 359.071 93.1576 393.87 102.851C422.479 110.82 445.817 76.4992 477.59 73.0779C503.311 70.3083 531.699 73.0779 558.284 73.0779C584.869 73.0779 605.187 56.7137 644.736 56.7137C689.916 56.7137 715 36.8465 776 36.8465C837 36.8465 885.5 18.5477 895 6"
                            stroke="#ADC5FF"
                            strokeWidth="1.5"
                            id="linepath2"
                          />
                        </svg>
                      ) : (
                        <svg
                          width="817"
                          height="116"
                          viewBox="0 0 817 116"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="line-svg"
                        >
                          <path
                            d="M1 111C20.092 109.376 62.9001 104.237 81.3965 104.67C104.517 105.211 131.841 96.0102 152.335 96.0102C172.828 96.0102 218.247 91.8238 236.096 84.0664C258.342 74.3982 283.331 58.6239 304.35 58.6239C325.369 58.6239 369.952 62.5299 387.266 52.5177C417.855 34.8282 452.377 43.5112 478.124 43.5112C528.829 43.5112 538.368 48.2792 555.5 38C590.5 17 590 38 634 22.5C665.224 11.5007 691.876 17 721.302 17C750.728 17 781.115 18.292 816 1.5"
                            stroke="#7099FF"
                            strokeWidth="1.5"
                            id="linepath1"
                          />
                          <path
                            d="M1 115C4.64895 115 24.5049 95.7319 45.8773 95.7319C67.2497 95.7319 75.3074 109.638 100.85 109.638C126.393 109.638 149.788 62.1623 175.996 73.6411C230.969 97.7184 276.359 112.949 304.602 95.7319C342.928 72.3688 359.071 77.8531 393.87 87.1236C422.479 94.7449 445.817 61.9218 477.59 58.6499C503.311 56.0012 531.699 58.6499 558.284 58.6499C584.869 58.6499 605.187 43 644.736 43C689.916 43 676.963 30.5 726.056 30.5C775.149 30.5 806.5 18.5 816 6.5"
                            stroke="#ADC5FF"
                            strokeWidth="1.5"
                            id="linepath2"
                          />
                        </svg>
                      )}
                    </div>
                  </div>
                  <div className="bottom-labels">
                    {(function () {
                      const elements = [];
                      for (let i = 2021; i <= 2032; i++) {
                        elements.push(
                          <div className="bottom-value" key={i}>
                            {i}
                          </div>
                        );
                      }
                      return <>{elements}</>;
                    })()}
                  </div>
                </div>
              </>
            )}
          />
          {theme !== THEME_IPAD && (
            <BentoCard
              className="numerical-bento"
              render={() => (
                <>
                  <div className="title">80B</div>
                  <div className="content">
                    Number of blockchain wallets registered <br />
                    globally for use in 2023 and set to exceed <br />
                    100 Billion by 2025.
                  </div>
                </>
              )}
            />
          )}
        </div>
      </div>
    </div>
  );
}
