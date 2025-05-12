export const APP_VERSION = VITE_APP_VERSION;

export const SATELLITE_ID: string | null | undefined = import.meta.env.VITE_SATELLITE_ID;
export const CONTAINER: string | null | undefined = import.meta.env.VITE_CONTAINER;

console.log(SATELLITE_ID, CONTAINER);
