import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function Portal({ children, containerId }) {
  const [mounted, setMounted] = useState(false);
  const [container, setContainer] = useState(null > null);

  useEffect(() => {
    let target = containerId
      ? document.getElementById(containerId)
      : document.body;

    if (!target && containerId) {
      target = document.createElement("div");
      target.id = containerId;
      document.body.appendChild(target);
    }

    setContainer(target);
    setMounted(true);

    return () => {
      if (containerId && target?.parentNode) {
        target.parentNode.removeChild(target);
      }
    };
  }, [containerId]);

  if (!mounted || !container) return null;

  return createPortal(children, container);
}
