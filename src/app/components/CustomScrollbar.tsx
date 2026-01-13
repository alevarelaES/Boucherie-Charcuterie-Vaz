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
        /* Hide scrollbars globally but allow scrolling */
        * {
          -ms-overflow-style: none;  /* Internet Explorer 10+ */
          scrollbar-width: none;     /* Firefox */
        }
        *::-webkit-scrollbar { 
          display: none;             /* Safari and Chrome */
        }

        /* Re-enable and style ONLY the main document scrollbar */
        html::-webkit-scrollbar {
          display: block;
          width: 10px;
        }

        html::-webkit-scrollbar-track {
          background: #FAF7F2;
        }

        html::-webkit-scrollbar-thumb {
          background: #8B1538;
          border: 2px solid #FAF7F2;
          border-radius: 10px;
        }

        html::-webkit-scrollbar-thumb:hover {
          background: #6D102C;
        }

        /* Re-enable for Firefox on html only */
        html {
          scrollbar-width: thin;
          scrollbar-color: #8B1538 #FAF7F2;
        }
      `;
            document.head.appendChild(style);
        }
    }, []);

    return null; // This component doesn't render visual DOM elements directly
}
