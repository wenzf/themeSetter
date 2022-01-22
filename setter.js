const ROOT = ':root';
const SEL_PREFIX = '--main';
const FOREIGN_SYLESHEET = 'https://fonts.googleapis.com/';

const themeSetter = (themeName) => {
  const allStyles = document.styleSheets;
  let selsArr = [];
  if (allStyles) {
    for (let i = 0; i < allStyles.length; i += 1) {
      /**
       * check if stylesheet is of non-foreign origin
       * prevent CORS issue with foreign style sheets such as google fonts;
       * https://stackoverflow.com/questions/49993633/uncaught-domexception-failed-to-read-the-cssrules-property
       */
      let sRules = null;
      if (
        allStyles[i].href === null // workaround for dev mode
        || allStyles[i].href.indexOf(FOREIGN_SYLESHEET) === -1 // production
        /**
         * or white listing:
         *  || allStyles[i].href.indexOf(OWN_DOMAIN) !== -1 // production
         */
      ) {
        sRules = allStyles[i].cssRules;
      }
      if (sRules !== null) {
        for (let j = 0; j < sRules.length; j += 1) {
          if (sRules[j].selectorText === ROOT) {
            const sels = sRules[j].cssText;
            const tArr = sels.split(/ /g);
            for (let k = 0; k < tArr.length; k += 1) {
              if (tArr[k].startsWith(SEL_PREFIX)) {
                selsArr = selsArr.concat([tArr[k].replace(/:/g, '')]);
              }
            }
          }
        }
      }
    }
  }

  if (selsArr.length) {
    for (let i = 0; i < selsArr.length; i += 1) {
      document.documentElement.style.setProperty(selsArr[i], `var(--${themeName}${selsArr[i].substring(SEL_PREFIX.length)})`);
    }
  }
};

export default themeSetter;

// usage:
themeSetter('dark');
