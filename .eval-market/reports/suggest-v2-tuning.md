# Eval suggest-v2 (tuning, run1)

## dynasty
- cases 30 in 12 leagues, 3 outlier differences clipped to 3 robust spreads
- mean score: model first pick 25.76 · static finder first pick 7.92 · average candidate 0.61 · best candidate in hindsight 43.84
- paired difference (model minus static, first pick, clipped): 15.97 [3.25, 29.88] p=0.015
- same without clipping: 17.84 [3.35, 34.45]
- paired difference (top three): 9.59 [0.48, 19.44]
- valid replies 1 · first pick passes the finder's gate 0.87 · own deals 0.12
- run-to-run noise null · smallest effect detectable at this size 26.8 · clear win: yes

worst cases (model minus static):
- 1180092558252679168-w7-r1 -53.55
- 1048386748260241408-w7-r5 -27.43
- 1180160590047531008-w4-r9 -10.95
- 1180263272813436928-w10-r6 -9.43
- 1180244250175504384-w10-r5 -8.06
