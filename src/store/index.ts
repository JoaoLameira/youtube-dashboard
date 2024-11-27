import { atom } from "jotai";

//Menu
export const isOpen = atom<boolean>(false);

//Video
export const playerRefAtom = atom<YT.Player | null>(null);
export const isPlayerReadyAtom = atom<boolean>(false);
export const isPlayingAtom = atom<boolean>(false);

//Trim
export const trimStartAtom = atom<number | undefined>(undefined);
export const trimEndAtom = atom<number | undefined>(undefined);
