import { useEffect } from "react";

const SITE_TITLE = "Adefisayo (Ayo) Adejumo | Software Engineer, AI and Agentic Systems | London";

// Sets the browser tab title for a page; omit the title to use the site-wide default.
export const usePageTitle = (title?: string) => {
  useEffect(() => {
    document.title = title ? `${title} | Adefisayo (Ayo) Adejumo` : SITE_TITLE;
  }, [title]);
};
