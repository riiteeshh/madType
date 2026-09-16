// Inlined as a blocking <script> before hydration, so it can't import
// theme-constants.ts — the storage key literal below must stay in sync
// with THEME_STORAGE_KEY.
export const NO_FLASH_THEME_SCRIPT = `(function(){try{var t=localStorage.getItem("madtyper:theme");if(t==="light"||t==="dark"){document.documentElement.setAttribute("data-theme",t);}}catch(e){}})();`;
