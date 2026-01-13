import { useEffect } from 'react';

/**
 * CustomScrollbar component
 * This component adds global styles to customize the browser scrollbar 
 * to match the premium brand identity of Boucherie Vaz.
 */
export function CustomScrollbar() {
  useEffect(() => {
    // We update the styles via a style tag to ensure it's applied globally
    const styleId = 'custom-scrollbar-styles';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.innerHTML = `
        /* Global Smooth Scroll */
        html {
          scroll-behavior: smooth;
        }

        /* Webkit Scrollbar Styling */
        ::-webkit-scrollbar {
          width: 12px;
          height: 12px; /* For horizontal scrolling if needed */
        }

        ::-webkit-scrollbar-track {
          background: transparent; /* Clean, transparent track */
        }

        ::-webkit-scrollbar-thumb {
          background-color: #8B1538; /* Brand Primary */
          border-radius: 20px;       /* pill shape */
          border: 3px solid transparent; /* Creates a 'floating' narrower effect */
          background-clip: content-box;
          transition: background-color 0.3s ease;
        }

        ::-webkit-scrollbar-thumb:hover {
          background-color: #6D102C; /* Darker on hover */
        }

        /* Firefox */
        html {
          scrollbar-width: thin;
          scrollbar-color: #8B1538 transparent;
        }
      `;
      document.head.appendChild(style);
    }

    return () => {
      const style = document.getElementById(styleId);
      if (style) {
        style.remove();
      }
    };
  }, []);

  return null; // This component doesn't render visual DOM elements directly
}
