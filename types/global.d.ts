// The one global every content script shares. Modules attach themselves to it
// (NightOwl.api, NightOwl.leagues, ...); typing it loosely keeps checkJs useful
// for everything local (typos, bad calls, null access) without a type per module.
declare var NightOwl: Record<string, any>;
declare function importScripts(...urls: string[]): void;
