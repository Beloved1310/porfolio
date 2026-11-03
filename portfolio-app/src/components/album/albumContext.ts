import { createContext, useContext } from "react";
import { chapters } from "../../data/album";

interface AlbumState {
  // true: show the illustrated version of a photo where one has been supplied.
  anime: boolean;
  // Turn to a spread by index (used by the contents page).
  goTo: (spread: number) => void;
}

export const AlbumContext = createContext<AlbumState>({ anime: false, goTo: () => {} });

export const useAlbum = () => useContext(AlbumContext);

// Page numbers: the prologue is page 1 and the contents page 2; each chapter then takes two pages.
export const chapterPhotoPage = (chapterIndex: number) => 3 + chapterIndex * 2;
export const FINAL_PAGE = chapterPhotoPage(chapters.length);
// Spread index of a chapter in the book (0 is the cover, 1 is prologue and contents).
export const chapterSpread = (chapterIndex: number) => chapterIndex + 2;

// The illustrated switch is only offered once at least one illustrated photo exists.
export const hasIllustrations = chapters.some((c) => c.images.some((i) => i.illustrated));
