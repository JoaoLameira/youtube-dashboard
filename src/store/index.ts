import { atom } from "jotai";

export const playerRefAtom = atom<YT.Player | null>(null);
export const isPlayerReadyAtom = atom<boolean>(false);
export const isPlayingAtom = atom<boolean>(false);
