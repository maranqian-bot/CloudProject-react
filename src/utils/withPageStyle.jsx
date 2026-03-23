import { useLayoutEffect } from "react";

const mountedPageStyles = new Map();

function mountPageStyle(styleId, cssText) {
  let styleEntry = mountedPageStyles.get(styleId);

  if (!styleEntry) {
    const styleElement = document.createElement("style");
    styleElement.setAttribute("data-page-style", styleId);
    styleElement.textContent = cssText;
    document.head.appendChild(styleElement);

    styleEntry = {
      element: styleElement,
      count: 0,
    };

    mountedPageStyles.set(styleId, styleEntry);
  } else if (!document.head.contains(styleEntry.element)) {
    document.head.appendChild(styleEntry.element);
  } else if (styleEntry.element.textContent !== cssText) {
    styleEntry.element.textContent = cssText;
  }

  styleEntry.count += 1;

  return () => {
    const currentEntry = mountedPageStyles.get(styleId);

    if (!currentEntry) {
      return;
    }

    currentEntry.count -= 1;

    if (currentEntry.count <= 0) {
      currentEntry.element.remove();
      mountedPageStyles.delete(styleId);
    }
  };
}

export default function withPageStyle(Component, styleId, cssText) {
  function StyledPage(props) {
    useLayoutEffect(() => {
      if (typeof document === "undefined") {
        return undefined;
      }

      return mountPageStyle(styleId, cssText);
    }, [styleId, cssText]);

    return <Component {...props} />;
  }

  StyledPage.displayName = `WithPageStyle(${Component.displayName || Component.name || "Page"})`;

  return StyledPage;
}
