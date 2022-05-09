import { useEffect, useState } from "react";
import { ArrowCircleUpIcon } from "@heroicons/react/solid";
import classNames from "classnames";

function Scrolltotop() {
  const [isVisible, setVisible] = useState(false);
  const toggleVisibility = () => {
    window.pageYOffset > 300 ? setVisible(true) : setVisible(false);
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);
  return (
    <div>
      <ArrowCircleUpIcon
        className={classNames(
          isVisible ? "opacity-100" : "opacity-0",
          "fixed z-30 w-8 bottom-2 right-2 md:w-9"
        )}
        onClick={scrollToTop}
      />
    </div>
  );
}

export default Scrolltotop;
