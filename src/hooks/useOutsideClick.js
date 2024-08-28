import { useEffect, useRef } from "react";

export function useOutsideClick(handler, listenPhase = true) {
  const ref = useRef();

  useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current.contains?.(e.target)) {
          handler();
        }
      }
      document.addEventListener("click", handleClick, listenPhase);
      return () => {
        document.removeEventListener("click", handleClick, listenPhase);
      };
    },
    [handler, listenPhase]
  );

  return ref;
}
