# Eval suggest-v2 (heldout, heldout1)

## dynasty
- cases 48 in 20 leagues, 0 outlier differences clipped to 3 robust spreads
- mean score: model first pick 28.96 · static finder first pick 2.92 · average candidate -2.91 · best candidate in hindsight 40.5
- paired difference (model minus static, first pick, clipped): 26.03 [17.37, 35.27] p=0
- same without clipping: 26.03 [17.37, 35.27]
- paired difference (top three): 7.91 [0.64, 14.94]
- valid replies 0.98 · first pick passes the finder's gate 0.96 · own deals 0.05
- run-to-run noise null · smallest effect detectable at this size 25.57 · clear win: yes

worst cases (model minus static):
- 1180213817211871232-w10-r1 -29.68
- 1180145866219773952-w7-r1 -26.54
- 1180172796326912000-w4-r4 -25.41
- 1180995252055453696-w7-r1 -20.76
- 1180995252055453696-w10-r1 -19.28
