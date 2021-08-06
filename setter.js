const ROOT = ':root';
const SEL_PREFIX = '--main';

const themeSetter = (themeName) => {
  const allStyles = document.styleSheets;
  let selsArr = [];
  for (let i = 0; i < allStyles.length; i += 1) {
    const sRules = allStyles[i].cssRules;
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
  if (selsArr.length) {
    for (let i = 0; i < selsArr.length; i += 1) {
      document.documentElement.style.setProperty(selsArr[i], `var(--${themeName}${selsArr[i].substring(SEL_PREFIX.length)})`);
    }
  }
};

// usage:
themeSetter('dark)
