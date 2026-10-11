// NFL team colors plus Sleeper's CDN for headshots and logos — what the play
// stage uses to dress each pop-up in the scoring player's uniform.
globalThis.SLT = globalThis.SLT || {};

(function (SLT) {
  'use strict';

  // [primary, secondary]
  const COLORS = {
    ARI: ['#97233F', '#FFB612'], ATL: ['#A71930', '#000000'], BAL: ['#241773', '#9E7C0C'],
    BUF: ['#00338D', '#C60C30'], CAR: ['#0085CA', '#101820'], CHI: ['#0B162A', '#C83803'],
    CIN: ['#FB4F14', '#000000'], CLE: ['#311D00', '#FF3C00'], DAL: ['#003594', '#869397'],
    DEN: ['#FB4F14', '#002244'], DET: ['#0076B6', '#B0B7BC'], GB: ['#203731', '#FFB612'],
    HOU: ['#03202F', '#A71930'], IND: ['#002C5F', '#A2AAAD'], JAX: ['#006778', '#D7A22A'],
    KC: ['#E31837', '#FFB81C'], LV: ['#000000', '#A5ACAF'], LAC: ['#0080C6', '#FFC20E'],
    LAR: ['#003594', '#FFA300'], MIA: ['#008E97', '#FC4C02'], MIN: ['#4F2683', '#FFC62F'],
    NE: ['#002244', '#C60C30'], NO: ['#D3BC8D', '#101820'], NYG: ['#0B2265', '#A71930'],
    NYJ: ['#125740', '#FFFFFF'], PHI: ['#004C54', '#A5ACAF'], PIT: ['#FFB612', '#101820'],
    SF: ['#AA0000', '#B3995D'], SEA: ['#002244', '#69BE28'], TB: ['#D50A0A', '#34302B'],
    TEN: ['#0C2340', '#4B92DB'], WAS: ['#5A1414', '#FFB612']
  };
  const FALLBACK = ['#262e3e', '#00ceb8'];

  function luminance(hex) {
    const n = parseInt(hex.slice(1), 16);
    const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((c) => {
      const v = c / 255;
      return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  }

  // Readable ink on a team color: white on dark jerseys, near-black on gold ones.
  const inkOn = (hex) => (luminance(hex) > 0.35 ? '#101820' : '#ffffff');

  function colors(team) {
    const [primary, secondary] = COLORS[team] || FALLBACK;
    return { primary, secondary, ink: inkOn(primary) };
  }

  SLT.teams = {
    colors,
    inkOn,
    logo: (team) => `https://sleepercdn.com/images/team_logos/nfl/${String(team).toLowerCase()}.png`,
    headshot: (pid) => `https://sleepercdn.com/content/nfl/players/thumb/${pid}.jpg`
  };
})(globalThis.SLT);

if (typeof module !== 'undefined') module.exports = globalThis.SLT.teams;
