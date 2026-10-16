You are answering fantasy football trade-advice cases. For each case below, follow the SYSTEM text, read the DATA, and write your JSON answer to the reply file named for that case.
Rules: write only the JSON object (no markdown fence, no commentary) to each reply file. Do not read any other file on disk. Do not look at any directory named truth or any file outside the reply paths. Work each case independently.

=========== CASE 1126221449154408448-w10-r2 ===========
REPLY FILE: /Users/anik/workspace/chrome/sleeper/.eval-market/replies/suggest-v2/heldout1/1126221449154408448-w10-r2.json
--- SYSTEM ---
You advise one fantasy football manager on which trades to propose. You reason only from the facts you are given and never invent players, stats or values.

This is a dynasty or keeper league: market value, age and future seasons matter as well as this season. Contending teams should convert future value into points now, and rebuilding teams should do the reverse. Players past their position age curve lose value quickly; young players on the rise gain it.

A good suggestion raises my lineup points for the rest of the season, is something the partner would plausibly accept, and fits where each team stands in the standings.

Compare each player's recent weekly scoring with his weekly projection: a player scoring far above his projection is a sell-high, one far below with an unchanged role is a buy-low, and a player who has stopped scoring for several weeks may have lost his role. Prefer deals where the player I receive starts for me every week.

Reply with JSON only, no other text, in exactly this shape:
{"suggestions":[{"candidate":"c3","pitch":"one sentence"},{"partnerId":4,"give":["id"],"get":["id","id"],"pitch":"one sentence"}]}
Use "candidate" to pick one of the listed candidate keys, or give your own deal with "partnerId", "give" (players on my roster) and "get" (players on that partner roster).
Each side has one or two players. Rank the suggestions best first. Give at most three. Use only the player ids and partner ids in the data.
--- DATA ---
League: dynasty, 12 teams, week 10, 5 regular season weeks left, playoffs start week 15
Lineup slots: QB, RB, RB, WR, WR, TE, FLEX, FLEX, SUPER_FLEX, K, DEF, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN. Superflex: yes. Tight end premium: no. Points per reception: 1.
Columns: id | name | position | age | team | market value | projected points for the rest of the regular season (and per week) | points per week over the last three weeks played | lineup value (points my lineup loses if this player is removed).

MY TEAM (partnerId me): record 6-3, rank 3, points for 1266.8, contention window 0.95
7547 | Amon-Ra St. Brown | WR | age 26 | DET | market 5297 | projected 84 (16.8 a week) | last 3 weeks 17.5 a week | lineup value 27.7
3163 | Jared Goff | QB | age 32 | DET | market 4202 | projected 75.8 (15.2 a week) | last 3 weeks 14.6 a week | lineup value 19.5
9999 | Will Levis | QB | age 27 | NYJ | market 0 | projected 62.2 (12.4 a week) | last 3 weeks 0 a week | lineup value 5.9
6790 | D'Andre Swift | RB | age 27 | CHI | market 3667 | projected 61.5 (12.3 a week) | last 3 weeks 11 a week | lineup value 5.2
5872 | Deebo Samuel | WR | age 30 | SF | market 2703 | projected 61.3 (12.3 a week) | last 3 weeks 4.2 a week | lineup value 5
5850 | Josh Jacobs | RB | age 28 | GB | market 4034 | projected 60.5 (12.1 a week) | last 3 weeks 19.5 a week | lineup value 15.4
5927 | Terry McLaurin | WR | age 31 | WAS | market 3390 | projected 59.3 (11.9 a week) | last 3 weeks 16.4 a week | lineup value 13.8
8146 | Garrett Wilson | WR | age 26 | NYJ | market 4216 | projected 57.6 (11.5 a week) | last 3 weeks 19.8 a week | lineup value 12.2
8148 | Jameson Williams | WR | age 25 | DET | market 4098 | projected 52.4 (10.5 a week) | last 3 weeks 0.2 a week | lineup value 0
8130 | Trey McBride | TE | age 26 | ARI | market 4876 | projected 52.2 (10.4 a week) | last 3 weeks 14.7 a week | lineup value 34.2
11655 | Tyrone Tracy | RB | age 26 | NYG | market 2985 | projected 49.7 (9.9 a week) | last 3 weeks 12.4 a week | lineup value 5.4
9756 | Jordan Addison | WR | age 24 | MIN | market 3608 | projected 49.5 (9.9 a week) | last 3 weeks 10 a week | lineup value 0.2
6806 | J.K. Dobbins | RB | age 27 | DEN | market 3329 | projected 40.6 (8.1 a week) | last 3 weeks 17 a week | lineup value 6.5
DET | Detroit Lions | DEF | age ? | DET | market 0 | projected 37.6 (7.5 a week) | last 3 weeks 9.3 a week | lineup value 37.6
8117 | Jalen Tolbert | WR | age 27 | MIA | market 0 | projected 35 (7 a week) | last 3 weeks 6.1 a week | lineup value 0
6650 | Chase McLaughlin | K | age 30 | TB | market 0 | projected 32.2 (6.4 a week) | last 3 weeks 6.3 a week | lineup value 32.2
9492 | Trey Palmer | WR | age 25 | FA | market 0 | projected 24.9 (5 a week) | last 3 weeks 3.4 a week | lineup value 0
4040 | JuJu Smith-Schuster | WR | age 29 | FA | market 1345 | projected 19.5 (3.9 a week) | last 3 weeks 0 a week | lineup value 0
11597 | Theo Johnson | TE | age 25 | NYG | market 3209 | projected 18.1 (3.6 a week) | last 3 weeks 6.9 a week | lineup value 0
11643 | Jaylen Wright | RB | age 23 | MIA | market 2760 | projected 18 (3.6 a week) | last 3 weeks 2.3 a week | lineup value 0
11574 | Dylan Laube | RB | age 26 | LV | market 0 | projected 5.7 (1.1 a week) | last 3 weeks 0 a week | lineup value 0
8230 | Ty Chandler | RB | age 28 | NO | market 0 | projected 4.5 (0.9 a week) | last 3 weeks 0.1 a week | lineup value 0
11559 | Michael Penix | QB | age 26 | ATL | market 3465 | projected 0 (0 a week) | last 3 weeks 0.2 a week | lineup value 0
8676 | Rashid Shaheed | WR | age 28 | SEA | market 2691 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0
6820 | Clyde Edwards-Helaire | RB | age 26 | FA | market 0 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0

PARTNER (partnerId 10): record 2-7, rank 12, points for 1353.8, contention window 0
4866 | Saquon Barkley | RB | age 29 | PHI | market 4229 | projected 92.3 (18.5 a week) | last 3 weeks 23.9 a week | lineup value 53.4
4046 | Patrick Mahomes | QB | age 31 | KC | market 4656 | projected 87.6 (17.5 a week) | last 3 weeks 18.3 a week | lineup value 42.5
4199 | Aaron Jones | RB | age 31 | MIN | market 2803 | projected 73.2 (14.6 a week) | last 3 weeks 14.8 a week | lineup value 34.3
4018 | Joe Mixon | RB | age 30 | FA | market 2253 | projected 72.2 (14.4 a week) | last 3 weeks 22.1 a week | lineup value 33.3
3321 | Tyreek Hill | WR | age 31 | FA | market 2521 | projected 71.4 (14.3 a week) | last 3 weeks 9.2 a week | lineup value 27
4574 | Cooper Rush | QB | age 32 | ATL | market 0 | projected 59.7 (11.9 a week) | last 3 weeks 0 a week | lineup value 14.6
9997 | Zay Flowers | WR | age 26 | BAL | market 4183 | projected 55.8 (11.2 a week) | last 3 weeks 17.4 a week | lineup value 17.6
9488 | Jaxon Smith-Njigba | WR | age 24 | SEA | market 5789 | projected 53.2 (10.6 a week) | last 3 weeks 18.4 a week | lineup value 17
1264 | Justin Tucker | K | age 35 | FA | market 0 | projected 37.1 (7.4 a week) | last 3 weeks 10 a week | lineup value 37
3214 | Hunter Henry | TE | age 31 | NE | market 3147 | projected 37 (7.4 a week) | last 3 weeks 13.1 a week | lineup value 10.3
10859 | Sam LaPorta | TE | age 25 | DET | market 4256 | projected 36.4 (7.3 a week) | last 3 weeks 8.4 a week | lineup value 3.5
CHI | Chicago Bears | DEF | age ? | CHI | market 0 | projected 32.7 (6.5 a week) | last 3 weeks 4 a week | lineup value 0.9
4663 | Austin Ekeler | RB | age 31 | WAS | market 0 | projected 31.3 (6.3 a week) | last 3 weeks 9.7 a week | lineup value 3.1
1689 | Adam Thielen | WR | age 35 | FA | market 2214 | projected 30.1 (6 a week) | last 3 weeks 0 a week | lineup value 4.7
NYG | New York Giants | DEF | age ? | NYG | market 0 | projected 28.8 (5.8 a week) | last 3 weeks 0 a week | lineup value 1.6
9487 | Parker Washington | WR | age 24 | JAX | market 4014 | projected 26.9 (5.4 a week) | last 3 weeks 2.4 a week | lineup value 0.7
BAL | Baltimore Ravens | DEF | age ? | BAL | market 0 | projected 25.8 (5.2 a week) | last 3 weeks 7 a week | lineup value 0
10226 | Andrei Iosivas | WR | age 27 | CIN | market 0 | projected 21.8 (4.4 a week) | last 3 weeks 2.7 a week | lineup value 0
11600 | Ja'Tavion Sanders | TE | age 23 | CAR | market 0 | projected 20.1 (4 a week) | last 3 weeks 8.8 a week | lineup value 0
8408 | Jordan Mason | RB | age 27 | MIN | market 3101 | projected 11.9 (2.4 a week) | last 3 weeks 3.6 a week | lineup value 0
11623 | Jordan Whittington | WR | age 26 | LAR | market 0 | projected 9.3 (1.9 a week) | last 3 weeks 0 a week | lineup value 0
7591 | Justin Fields | QB | age 27 | KC | market 1909 | projected 3.9 (0.8 a week) | last 3 weeks 0 a week | lineup value 0

PARTNER (partnerId 11): record 3-6, rank 10, points for 1258.7, contention window 0.05
6768 | Tua Tagovailoa | QB | age 28 | ATL | market 2681 | projected 79.9 (16 a week) | last 3 weeks 10.7 a week | lineup value 40.5
1466 | Travis Kelce | TE | age 37 | KC | market 2868 | projected 77.9 (15.6 a week) | last 3 weeks 17.6 a week | lineup value 52.6
7564 | Ja'Marr Chase | WR | age 26 | CIN | market 5779 | projected 73.7 (14.7 a week) | last 3 weeks 16.4 a week | lineup value 41.1
11563 | Bo Nix | QB | age 26 | DEN | market 5043 | projected 62.3 (12.5 a week) | last 3 weeks 20.5 a week | lineup value 22.9
1426 | DeAndre Hopkins | WR | age 33 | FA | market 1502 | projected 61.5 (12.3 a week) | last 3 weeks 11.4 a week | lineup value 21.2
7528 | Najee Harris | RB | age 28 | NYG | market 2343 | projected 57.7 (11.5 a week) | last 3 weeks 10.8 a week | lineup value 23.1
5846 | DK Metcalf | WR | age 28 | PIT | market 3437 | projected 54.2 (10.8 a week) | last 3 weeks 6.6 a week | lineup value 23.5
11628 | Marvin Harrison | WR | age 24 | HOU | market 3920 | projected 50.2 (10 a week) | last 3 weeks 10.5 a week | lineup value 17.1
7611 | Rhamondre Stevenson | RB | age 28 | NE | market 3353 | projected 48.7 (9.7 a week) | last 3 weeks 16.8 a week | lineup value 14.1
KC | Kansas City Chiefs | DEF | age ? | KC | market 0 | projected 40.5 (8.1 a week) | last 3 weeks 6.7 a week | lineup value 11.1
7588 | Javonte Williams | RB | age 26 | DAL | market 4029 | projected 39.5 (7.9 a week) | last 3 weeks 15.2 a week | lineup value 4.9
4666 | Younghoe Koo | K | age 31 | FA | market 0 | projected 34.8 (7 a week) | last 3 weeks 3.3 a week | lineup value 34.8
7596 | Elijah Moore | WR | age 26 | PHI | market 0 | projected 32.8 (6.6 a week) | last 3 weeks 10.8 a week | lineup value 3.8
HOU | Houston Texans | DEF | age ? | HOU | market 0 | projected 31.7 (6.3 a week) | last 3 weeks 7.3 a week | lineup value 2.3
5133 | Tyler Conklin | TE | age 31 | DET | market 0 | projected 25.2 (5 a week) | last 3 weeks 8.2 a week | lineup value 0
2749 | Raheem Mostert | RB | age 33 | FA | market 1172 | projected 24.5 (4.9 a week) | last 3 weeks 9.3 a week | lineup value 0
11627 | Troy Franklin | WR | age 23 | DEN | market 3022 | projected 20.7 (4.1 a week) | last 3 weeks 4.9 a week | lineup value 0
7523 | Trevor Lawrence | QB | age 27 | JAX | market 5021 | projected 15.1 (3 a week) | last 3 weeks 19.3 a week | lineup value 0
4080 | Zay Jones | WR | age 31 | FA | market 0 | projected 7.2 (1.4 a week) | last 3 weeks 0.4 a week | lineup value 0
8139 | Zamir White | RB | age 27 | NO | market 0 | projected 5.3 (1.1 a week) | last 3 weeks 3.5 a week | lineup value 0
11645 | Javon Baker | WR | age 23 | FA | market 0 | projected 2.7 (0.5 a week) | last 3 weeks 0 a week | lineup value 0

PARTNER (partnerId 4): record 4-5, rank 7, points for 1221.1, contention window 0.44
4035 | Alvin Kamara | RB | age 31 | NO | market 2512 | projected 80.2 (16 a week) | last 3 weeks 18 a week | lineup value 57.2
9758 | C.J. Stroud | QB | age 25 | HOU | market 4449 | projected 65.5 (13.1 a week) | last 3 weeks 9.8 a week | lineup value 45.1
6813 | Jonathan Taylor | RB | age 27 | IND | market 5009 | projected 61.3 (12.3 a week) | last 3 weeks 9.2 a week | lineup value 37.6
4098 | Kareem Hunt | RB | age 30 | FA | market 1816 | projected 59.9 (12 a week) | last 3 weeks 18.1 a week | lineup value 33.6
4981 | Calvin Ridley | WR | age 31 | TEN | market 2281 | projected 57.1 (11.4 a week) | last 3 weeks 14 a week | lineup value 32
2028 | Derek Carr | QB | age 34 | FA | market 2488 | projected 50.9 (10.2 a week) | last 3 weeks 4.5 a week | lineup value 30.5
4066 | Evan Engram | TE | age 32 | DEN | market 0 | projected 44.2 (8.8 a week) | last 3 weeks 11.2 a week | lineup value 23.9
2216 | Mike Evans | WR | age 33 | SF | market 3188 | projected 42.3 (8.5 a week) | last 3 weeks 3.2 a week | lineup value 28
1339 | Zach Ertz | TE | age 35 | PHI | market 0 | projected 35.1 (7 a week) | last 3 weeks 10.1 a week | lineup value 14.7
7042 | Tyler Bass | K | age 29 | BUF | market 0 | projected 33.9 (6.8 a week) | last 3 weeks 10 a week | lineup value 33.9
3200 | Sterling Shepard | WR | age 33 | NYJ | market 1656 | projected 32.6 (6.5 a week) | last 3 weeks 5.2 a week | lineup value 11.1
GB | Green Bay Packers | DEF | age ? | GB | market 0 | projected 28.8 (5.8 a week) | last 3 weeks 4 a week | lineup value 12.4
5937 | Diontae Johnson | WR | age 29 | FA | market 1980 | projected 21.9 (4.4 a week) | last 3 weeks 0.9 a week | lineup value 2.5
NE | New England Patriots | DEF | age ? | NE | market 0 | projected 21.9 (4.4 a week) | last 3 weeks 2 a week | lineup value 5.5
8205 | Isiah Pacheco | RB | age 27 | DET | market 2549 | projected 20.3 (4.1 a week) | last 3 weeks 0 a week | lineup value 8.4
10235 | Roschon Johnson | RB | age 25 | CHI | market 0 | projected 18.5 (3.7 a week) | last 3 weeks 3.6 a week | lineup value 2.6
3164 | Ezekiel Elliott | RB | age 29 | FA | market 2710 | projected 13.1 (2.6 a week) | last 3 weeks 3.6 a week | lineup value 0
6960 | Tyler Johnson | WR | age 28 | FA | market 1881 | projected 12.2 (2.4 a week) | last 3 weeks 6 a week | lineup value 0.3
11640 | Jermaine Burton | WR | age 24 | FA | market 2046 | projected 11 (2.2 a week) | last 3 weeks 1.7 a week | lineup value 0
8129 | Dameon Pierce | RB | age 26 | PHI | market 0 | projected 6.2 (1.2 a week) | last 3 weeks 0.2 a week | lineup value 0
11595 | Jared Wiley | TE | age 25 | KC | market 1477 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0
11629 | Devontez Walker | WR | age 25 | BAL | market 0 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0

PARTNER (partnerId 3): record 7-2, rank 1, points for 1478.5, contention window 1
4943 | Sam Darnold | QB | age 29 | SEA | market 3772 | projected 79.1 (15.8 a week) | last 3 weeks 17.8 a week | lineup value 20
6786 | CeeDee Lamb | WR | age 27 | DAL | market 4922 | projected 77.4 (15.5 a week) | last 3 weeks 18.6 a week | lineup value 37.9
8183 | Brock Purdy | QB | age 26 | SF | market 5092 | projected 71.6 (14.3 a week) | last 3 weeks 14.4 a week | lineup value 12.5
9509 | Bijan Robinson | RB | age 24 | ATL | market 6364 | projected 70.3 (14.1 a week) | last 3 weeks 22.8 a week | lineup value 32.6
5892 | David Montgomery | RB | age 29 | HOU | market 3467 | projected 66.9 (13.4 a week) | last 3 weeks 11.8 a week | lineup value 26.3
1166 | Kirk Cousins | QB | age 38 | LV | market 2031 | projected 57.9 (11.6 a week) | last 3 weeks 17.9 a week | lineup value 0
4137 | James Conner | RB | age 31 | ARI | market 2739 | projected 55.7 (11.1 a week) | last 3 weeks 15.7 a week | lineup value 21.7
11604 | Brock Bowers | TE | age 23 | LV | market 5530 | projected 54.2 (10.8 a week) | last 3 weeks 15.2 a week | lineup value 25.1
8134 | Khalil Shakir | WR | age 26 | BUF | market 3139 | projected 53.7 (10.7 a week) | last 3 weeks 14.8 a week | lineup value 17.2
10222 | Jayden Reed | WR | age 26 | GB | market 3357 | projected 49.6 (9.9 a week) | last 3 weeks 8.9 a week | lineup value 16.7
8111 | Cade Otton | TE | age 27 | TB | market 2958 | projected 42.7 (8.5 a week) | last 3 weeks 22.9 a week | lineup value 12.4
5248 | Gus Edwards | RB | age 29 | FA | market 2770 | projected 35 (7 a week) | last 3 weeks 0 a week | lineup value 1.5
5095 | Daniel Carlson | K | age 31 | NO | market 0 | projected 30 (6 a week) | last 3 weeks 11 a week | lineup value 30
WAS | Washington Commanders | DEF | age ? | WAS | market 0 | projected 29.8 (6 a week) | last 3 weeks 9.3 a week | lineup value 29.8
7002 | Juwan Johnson | TE | age 30 | NO | market 3114 | projected 28.3 (5.7 a week) | last 3 weeks 6.2 a week | lineup value 0.7
8132 | Tyler Allgeier | RB | age 26 | ARI | market 3195 | projected 27.3 (5.5 a week) | last 3 weeks 5.5 a week | lineup value 0.3
5906 | Dawson Knox | TE | age 29 | BUF | market 0 | projected 26.8 (5.4 a week) | last 3 weeks 3.3 a week | lineup value 0
11651 | Isaac Guerendo | RB | age 26 | SF | market 0 | projected 18.8 (3.8 a week) | last 3 weeks 7 a week | lineup value 1.9
5870 | Daniel Jones | QB | age 29 | IND | market 3511 | projected 16.4 (3.3 a week) | last 3 weeks 12.3 a week | lineup value 0
11650 | Luke McCaffrey | WR | age 25 | WAS | market 0 | projected 13.7 (2.7 a week) | last 3 weeks 0.6 a week | lineup value 0
11599 | Cade Stover | TE | age 26 | HOU | market 0 | projected 12.5 (2.5 a week) | last 3 weeks 2.1 a week | lineup value 0
11646 | Jalen Coker | WR | age 24 | CAR | market 3254 | projected 6.6 (1.3 a week) | last 3 weeks 1.9 a week | lineup value 0

PARTNER (partnerId 9): record 5-4, rank 6, points for 1255.2, contention window 0.56
6904 | Jalen Hurts | QB | age 28 | PHI | market 5593 | projected 103.2 (20.6 a week) | last 3 weeks 29.3 a week | lineup value 34.5
5859 | A.J. Brown | WR | age 29 | NE | market 4313 | projected 83.5 (16.7 a week) | last 3 weeks 13 a week | lineup value 37.1
8150 | Kyren Williams | RB | age 26 | LAR | market 4550 | projected 80.8 (16.2 a week) | last 3 weeks 17.6 a week | lineup value 36.6
421 | Matthew Stafford | QB | age 38 | LAR | market 3553 | projected 74 (14.8 a week) | last 3 weeks 15.5 a week | lineup value 5.4
4892 | Baker Mayfield | QB | age 31 | TB | market 4028 | projected 67.5 (13.5 a week) | last 3 weeks 22.4 a week | lineup value 9
2133 | Davante Adams | WR | age 33 | LAR | market 3374 | projected 55.1 (11 a week) | last 3 weeks 12.5 a week | lineup value 17.4
6783 | Jerry Jeudy | WR | age 27 | CLE | market 2695 | projected 44.2 (8.8 a week) | last 3 weeks 10 a week | lineup value 6.1
4988 | Nick Chubb | RB | age 30 | FA | market 1805 | projected 43 (8.6 a week) | last 3 weeks 6.6 a week | lineup value 7.1
4195 | Jake Elliott | K | age 31 | PHI | market 0 | projected 42.4 (8.5 a week) | last 3 weeks 2.7 a week | lineup value 1.9
1945 | Chris Boswell | K | age 35 | PIT | market 0 | projected 40.5 (8.1 a week) | last 3 weeks 9.3 a week | lineup value 0.1
7543 | Travis Etienne | RB | age 27 | NO | market 3836 | projected 40.3 (8.1 a week) | last 3 weeks 1.7 a week | lineup value 2.6
5022 | Dallas Goedert | TE | age 31 | PHI | market 3128 | projected 39.1 (7.8 a week) | last 3 weeks 0 a week | lineup value 4
3286 | Demarcus Robinson | WR | age 32 | SF | market 0 | projected 38.1 (7.6 a week) | last 3 weeks 15.6 a week | lineup value 0.7
5012 | Mark Andrews | TE | age 31 | BAL | market 3109 | projected 37.1 (7.4 a week) | last 3 weeks 13.1 a week | lineup value 1.9
8167 | Christian Watson | WR | age 27 | GB | market 3663 | projected 36.2 (7.2 a week) | last 3 weeks 6 a week | lineup value 0.8
LAC | Los Angeles Chargers | DEF | age ? | LAC | market 0 | projected 33.5 (6.7 a week) | last 3 weeks 6.3 a week | lineup value 33.5
2374 | Tyler Lockett | WR | age 33 | FA | market 2520 | projected 33.1 (6.6 a week) | last 3 weeks 8.6 a week | lineup value 0
9753 | Zach Charbonnet | RB | age 25 | SEA | market 3176 | projected 31.6 (6.3 a week) | last 3 weeks 6.2 a week | lineup value 3
9486 | Dontayvion Wicks | WR | age 25 | PHI | market 2557 | projected 28.1 (5.6 a week) | last 3 weeks 5.6 a week | lineup value 0
11625 | Adonai Mitchell | WR | age 24 | NYJ | market 2979 | projected 27.2 (5.4 a week) | last 3 weeks 3.4 a week | lineup value 0.5
9225 | Tank Bigsby | RB | age 24 | PHI | market 2864 | projected 23.5 (4.7 a week) | last 3 weeks 12.2 a week | lineup value 0
11439 | Jaleel McLaughlin | RB | age 26 | CLE | market 0 | projected 18.8 (3.8 a week) | last 3 weeks 7 a week | lineup value 0

PARTNER (partnerId 8): record 4-5, rank 9, points for 1174.2, contention window 0.18
4034 | Christian McCaffrey | RB | age 30 | SF | market 4591 | projected 79.8 (16 a week) | last 3 weeks 0 a week | lineup value 64.1
11566 | Jayden Daniels | QB | age 25 | WAS | market 6174 | projected 76.8 (15.4 a week) | last 3 weeks 15.8 a week | lineup value 47.8
6804 | Jordan Love | QB | age 27 | GB | market 4633 | projected 67.8 (13.6 a week) | last 3 weeks 11.2 a week | lineup value 38.8
5947 | Jakobi Meyers | WR | age 29 | JAX | market 3292 | projected 52.3 (10.5 a week) | last 3 weeks 11.9 a week | lineup value 23.3
5045 | Courtland Sutton | WR | age 31 | DEN | market 3181 | projected 51.4 (10.3 a week) | last 3 weeks 13.5 a week | lineup value 12.9
9502 | Tank Dell | WR | age 26 | HOU | market 2580 | projected 50 (10 a week) | last 3 weeks 10.7 a week | lineup value 11.5
11620 | Rome Odunze | WR | age 24 | CHI | market 4053 | projected 48.2 (9.6 a week) | last 3 weeks 7.9 a week | lineup value 11.6
9501 | DeMario Douglas | WR | age 25 | NE | market 0 | projected 38.6 (7.7 a week) | last 3 weeks 5.7 a week | lineup value 0.1
8154 | Brian Robinson | RB | age 27 | ATL | market 3187 | projected 37.5 (7.5 a week) | last 3 weeks 7.2 a week | lineup value 24.6
5001 | Dalton Schultz | TE | age 30 | HOU | market 3165 | projected 34.7 (6.9 a week) | last 3 weeks 6 a week | lineup value 8.2
SF | San Francisco 49ers | DEF | age ? | SF | market 0 | projected 33.8 (6.8 a week) | last 3 weeks 4.3 a week | lineup value 33.8
7571 | Rashod Bateman | WR | age 26 | BAL | market 2468 | projected 32.6 (6.5 a week) | last 3 weeks 10.5 a week | lineup value 0
8110 | Jake Ferguson | TE | age 27 | DAL | market 3458 | projected 28.7 (5.7 a week) | last 3 weeks 7.5 a week | lineup value 10.9
4381 | Taysom Hill | TE | age 35 | FA | market 1529 | projected 25.4 (5.1 a week) | last 3 weeks 0 a week | lineup value 0.1
10444 | Cedric Tillman | WR | age 26 | NO | market 0 | projected 21.4 (4.3 a week) | last 3 weeks 16.1 a week | lineup value 2.1
6943 | Gabe Davis | WR | age 26 | FA | market 1797 | projected 17.7 (3.5 a week) | last 3 weeks 0.8 a week | lineup value 0.1
6945 | Antonio Gibson | RB | age 27 | FA | market 1423 | projected 17.5 (3.5 a week) | last 3 weeks 1.7 a week | lineup value 2.1
11647 | Kimani Vidal | RB | age 25 | LAC | market 2814 | projected 9 (1.8 a week) | last 3 weeks 1.7 a week | lineup value 4.9
6219 | Austin Seibert | K | age 28 | FA | market 0 | projected 8.6 (1.7 a week) | last 3 weeks 12.7 a week | lineup value 8.5
5185 | Allen Lazard | WR | age 30 | FA | market 1600 | projected 5.5 (1.1 a week) | last 3 weeks 3.3 a week | lineup value 5.5
4029 | Dalvin Cook | RB | age 29 | FA | market 0 | projected 2.8 (0.6 a week) | last 3 weeks 1.3 a week | lineup value 0
10229 | Rashee Rice | WR | age 26 | KC | market 4415 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0

CANDIDATE DEALS (from a rules-based finder; points are the finder projections for the rest of the season):
c1 | partnerId 10 | I give Rashid Shaheed (8676) | I get Joe Mixon + Tyreek Hill (4018,3321) | my points 31.8 | their points -66 | likelihood 0.89
c2 | partnerId 11 | I give Theo Johnson (11597) | I get Travis Kelce + Tua Tagovailoa (1466,6768) | my points 46.2 | their points -86.7 | likelihood 0.94
c3 | partnerId 10 | I give Theo Johnson (11597) | I get Joe Mixon + Aaron Jones (4018,4199) | my points 33.5 | their points -81.7 | likelihood 0.95
c4 | partnerId 4 | I give Deebo Samuel + Tyrone Tracy (5872,11655) | I get Alvin Kamara + Zach Ertz (4035,1339) | my points 32.2 | their points -13.6 | likelihood 0.9
c5 | partnerId 3 | I give J.K. Dobbins (6806) | I get Dawson Knox + Daniel Jones (5906,5870) | my points 5.3 | their points 22.3 | likelihood 0.72
c6 | partnerId 4 | I give Deebo Samuel + D'Andre Swift (5872,6790) | I get Alvin Kamara + Mike Evans (4035,2216) | my points 32.3 | their points -17.2 | likelihood 0.82
c7 | partnerId 4 | I give Jalen Tolbert + Tyrone Tracy (8117,11655) | I get Alvin Kamara (4035) | my points 29 | their points -22.8 | likelihood 0.82
c8 | partnerId 9 | I give Jordan Addison + D'Andre Swift (9756,6790) | I get Mark Andrews + Matthew Stafford (5012,421) | my points 15.8 | their points 8.6 | likelihood 0.68
c9 | partnerId 8 | I give Michael Penix (11559) | I get Dalton Schultz + Jakobi Meyers (5001,5947) | my points 13.9 | their points -31.5 | likelihood 0.73
c10 | partnerId 4 | I give Tyrone Tracy + Trey Palmer (11655,9492) | I get Alvin Kamara + Jared Wiley (4035,11595) | my points 29 | their points -29.1 | likelihood 0.76
c11 | partnerId 9 | I give Jameson Williams + D'Andre Swift (8148,6790) | I get Baker Mayfield + Mark Andrews (4892,5012) | my points 21.6 | their points 5.9 | likelihood 0.58
c12 | partnerId 8 | I give Michael Penix + Rashid Shaheed (11559,8676) | I get Jakobi Meyers + Taysom Hill (5947,4381) | my points 12.4 | their points -23.4 | likelihood 0.72

Pick the best trades for my team.

=========== CASE 1126221449154408448-w4-r3 ===========
REPLY FILE: /Users/anik/workspace/chrome/sleeper/.eval-market/replies/suggest-v2/heldout1/1126221449154408448-w4-r3.json
--- SYSTEM ---
You advise one fantasy football manager on which trades to propose. You reason only from the facts you are given and never invent players, stats or values.

This is a dynasty or keeper league: market value, age and future seasons matter as well as this season. Contending teams should convert future value into points now, and rebuilding teams should do the reverse. Players past their position age curve lose value quickly; young players on the rise gain it.

A good suggestion raises my lineup points for the rest of the season, is something the partner would plausibly accept, and fits where each team stands in the standings.

Compare each player's recent weekly scoring with his weekly projection: a player scoring far above his projection is a sell-high, one far below with an unchanged role is a buy-low, and a player who has stopped scoring for several weeks may have lost his role. Prefer deals where the player I receive starts for me every week.

Reply with JSON only, no other text, in exactly this shape:
{"suggestions":[{"candidate":"c3","pitch":"one sentence"},{"partnerId":4,"give":["id"],"get":["id","id"],"pitch":"one sentence"}]}
Use "candidate" to pick one of the listed candidate keys, or give your own deal with "partnerId", "give" (players on my roster) and "get" (players on that partner roster).
Each side has one or two players. Rank the suggestions best first. Give at most three. Use only the player ids and partner ids in the data.
--- DATA ---
League: dynasty, 12 teams, week 4, 11 regular season weeks left, playoffs start week 15
Lineup slots: QB, RB, RB, WR, WR, TE, FLEX, FLEX, SUPER_FLEX, K, DEF, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN. Superflex: yes. Tight end premium: no. Points per reception: 1.
Columns: id | name | position | age | team | market value | projected points for the rest of the regular season (and per week) | points per week over the last three weeks played | lineup value (points my lineup loses if this player is removed).

MY TEAM (partnerId me): record 2-1, rank 3, points for 475.1, contention window 0.95
9509 | Bijan Robinson | RB | age 24 | ATL | market 6366 | projected 170.8 (15.5 a week) | last 3 weeks 15.2 a week | lineup value 75.6
6786 | CeeDee Lamb | WR | age 27 | DAL | market 4922 | projected 167.9 (15.3 a week) | last 3 weeks 13.8 a week | lineup value 80.9
8183 | Brock Purdy | QB | age 26 | SF | market 5087 | projected 160.3 (14.6 a week) | last 3 weeks 16.7 a week | lineup value 25.7
4943 | Sam Darnold | QB | age 29 | SEA | market 3828 | projected 159.9 (14.5 a week) | last 3 weeks 19.3 a week | lineup value 25.8
1166 | Kirk Cousins | QB | age 38 | LV | market 2031 | projected 149.1 (13.6 a week) | last 3 weeks 11.6 a week | lineup value 0.6
4137 | James Conner | RB | age 31 | ARI | market 2741 | projected 133.8 (12.2 a week) | last 3 weeks 14.1 a week | lineup value 42.3
10222 | Jayden Reed | WR | age 26 | GB | market 3355 | projected 132.3 (12 a week) | last 3 weeks 16.9 a week | lineup value 41.9
5892 | David Montgomery | RB | age 29 | HOU | market 3466 | projected 129.7 (11.8 a week) | last 3 weeks 18.2 a week | lineup value 38.5
11604 | Brock Bowers | TE | age 23 | LV | market 5530 | projected 127.9 (11.6 a week) | last 3 weeks 12.6 a week | lineup value 49.1
8134 | Khalil Shakir | WR | age 26 | BUF | market 3139 | projected 111.8 (10.2 a week) | last 3 weeks 14.3 a week | lineup value 26.5
5870 | Daniel Jones | QB | age 29 | IND | market 3493 | projected 105 (9.5 a week) | last 3 weeks 14.2 a week | lineup value 0.3
8111 | Cade Otton | TE | age 27 | TB | market 2958 | projected 93.8 (8.5 a week) | last 3 weeks 3.6 a week | lineup value 14
5095 | Daniel Carlson | K | age 31 | NO | market 0 | projected 74.4 (6.8 a week) | last 3 weeks 7.3 a week | lineup value 74.4
LAC | Los Angeles Chargers | DEF | age ? | LAC | market 0 | projected 71.2 (6.5 a week) | last 3 weeks 5.3 a week | lineup value 71.2
8132 | Tyler Allgeier | RB | age 26 | ARI | market 3196 | projected 68.1 (6.2 a week) | last 3 weeks 4.3 a week | lineup value 0.3
7002 | Juwan Johnson | TE | age 30 | NO | market 3113 | projected 62.3 (5.7 a week) | last 3 weeks 3.5 a week | lineup value 0.7
4037 | Chris Godwin | WR | age 30 | TB | market 3084 | projected 59.7 (5.4 a week) | last 3 weeks 21.4 a week | lineup value 22.6
5906 | Dawson Knox | TE | age 29 | BUF | market 0 | projected 46.4 (4.2 a week) | last 3 weeks 1.7 a week | lineup value 0
11650 | Luke McCaffrey | WR | age 25 | WAS | market 0 | projected 41.8 (3.8 a week) | last 3 weeks 4.1 a week | lineup value 0
5248 | Gus Edwards | RB | age 29 | FA | market 2770 | projected 40.7 (3.7 a week) | last 3 weeks 3.5 a week | lineup value 1.5
11651 | Isaac Guerendo | RB | age 26 | SF | market 0 | projected 32.3 (2.9 a week) | last 3 weeks 0.6 a week | lineup value 1.9
11599 | Cade Stover | TE | age 26 | HOU | market 0 | projected 27.7 (2.5 a week) | last 3 weeks 0.9 a week | lineup value 0
8135 | Treylon Burks | WR | age 26 | WAS | market 0 | projected 4.7 (0.4 a week) | last 3 weeks 1.1 a week | lineup value 0

PARTNER (partnerId 9): record 3-0, rank 2, points for 372, contention window 1
6904 | Jalen Hurts | QB | age 28 | PHI | market 5579 | projected 201.4 (18.3 a week) | last 3 weeks 17.1 a week | lineup value 65.1
8150 | Kyren Williams | RB | age 26 | LAR | market 4549 | projected 163.8 (14.9 a week) | last 3 weeks 20.4 a week | lineup value 75.2
4892 | Baker Mayfield | QB | age 31 | TB | market 4000 | projected 160.8 (14.6 a week) | last 3 weeks 19 a week | lineup value 26.4
5859 | A.J. Brown | WR | age 29 | NE | market 4313 | projected 150.1 (13.6 a week) | last 3 weeks 7.6 a week | lineup value 63.1
421 | Matthew Stafford | QB | age 38 | LAR | market 3555 | projected 146.1 (13.3 a week) | last 3 weeks 11.4 a week | lineup value 10.6
6783 | Jerry Jeudy | WR | age 27 | CLE | market 2696 | projected 105.5 (9.6 a week) | last 3 weeks 10.8 a week | lineup value 9.9
2374 | Tyler Lockett | WR | age 33 | FA | market 2519 | projected 99.7 (9.1 a week) | last 3 weeks 8.9 a week | lineup value 9.2
2133 | Davante Adams | WR | age 33 | LAR | market 3374 | projected 97.7 (8.9 a week) | last 3 weeks 15 a week | lineup value 28.4
7543 | Travis Etienne | RB | age 27 | NO | market 3836 | projected 89.4 (8.1 a week) | last 3 weeks 13.1 a week | lineup value 20.6
5012 | Mark Andrews | TE | age 31 | BAL | market 3107 | projected 82.7 (7.5 a week) | last 3 weeks 4.2 a week | lineup value 32.8
9486 | Dontayvion Wicks | WR | age 25 | PHI | market 2556 | projected 82.5 (7.5 a week) | last 3 weeks 3.9 a week | lineup value 4.3
8167 | Christian Watson | WR | age 27 | GB | market 3663 | projected 81.4 (7.4 a week) | last 3 weeks 6.3 a week | lineup value 0.8
6650 | Chase McLaughlin | K | age 30 | TB | market 0 | projected 78.1 (7.1 a week) | last 3 weeks 0.3 a week | lineup value 78.1
3286 | Demarcus Robinson | WR | age 32 | SF | market 0 | projected 77.5 (7 a week) | last 3 weeks 6.5 a week | lineup value 0.7
4988 | Nick Chubb | RB | age 30 | FA | market 1806 | projected 73.9 (6.7 a week) | last 3 weeks 0 a week | lineup value 8.2
9753 | Zach Charbonnet | RB | age 25 | SEA | market 3181 | projected 71.7 (6.5 a week) | last 3 weeks 18.6 a week | lineup value 3
9225 | Tank Bigsby | RB | age 24 | PHI | market 2868 | projected 70.5 (6.4 a week) | last 3 weeks 2.7 a week | lineup value 1.2
LV | Las Vegas Raiders | DEF | age ? | LV | market 0 | projected 62.2 (5.7 a week) | last 3 weeks -0.7 a week | lineup value 62.2
5022 | Dallas Goedert | TE | age 31 | PHI | market 3128 | projected 59.8 (5.4 a week) | last 3 weeks 13.6 a week | lineup value 9.9
4950 | Christian Kirk | WR | age 29 | SF | market 2209 | projected 58.3 (5.3 a week) | last 3 weeks 6.9 a week | lineup value 11.8
4068 | Mike Williams | WR | age 30 | FA | market 1701 | projected 56.6 (5.1 a week) | last 3 weeks 3.1 a week | lineup value 0
11439 | Jaleel McLaughlin | RB | age 26 | CLE | market 0 | projected 55.5 (5 a week) | last 3 weeks 4.9 a week | lineup value 0

PARTNER (partnerId 8): record 1-2, rank 7, points for 408.6, contention window 0.44
11566 | Jayden Daniels | QB | age 25 | WAS | market 6176 | projected 194.9 (17.7 a week) | last 3 weeks 23.2 a week | lineup value 95.7
6804 | Jordan Love | QB | age 27 | GB | market 4628 | projected 173.4 (15.8 a week) | last 3 weeks 5.5 a week | lineup value 74.3
5045 | Courtland Sutton | WR | age 31 | DEN | market 3182 | projected 119.7 (10.9 a week) | last 3 weeks 8.4 a week | lineup value 31.3
9502 | Tank Dell | WR | age 26 | HOU | market 2581 | projected 112.3 (10.2 a week) | last 3 weeks 7.5 a week | lineup value 32.6
11620 | Rome Odunze | WR | age 24 | CHI | market 4055 | projected 98.4 (8.9 a week) | last 3 weeks 10.3 a week | lineup value 18.8
8154 | Brian Robinson | RB | age 27 | ATL | market 3187 | projected 88.6 (8.1 a week) | last 3 weeks 14.4 a week | lineup value 54.3
9501 | DeMario Douglas | WR | age 25 | NE | market 0 | projected 88.1 (8 a week) | last 3 weeks 6 a week | lineup value 6.7
5001 | Dalton Schultz | TE | age 30 | HOU | market 3164 | projected 86.2 (7.8 a week) | last 3 weeks 3.9 a week | lineup value 17.5
8110 | Jake Ferguson | TE | age 27 | DAL | market 3459 | projected 83.6 (7.6 a week) | last 3 weeks 6.7 a week | lineup value 23.5
4034 | Christian McCaffrey | RB | age 30 | SF | market 4591 | projected 79.8 (7.3 a week) | last 3 weeks 0 a week | lineup value 60
7571 | Rashod Bateman | WR | age 26 | BAL | market 2470 | projected 79.8 (7.3 a week) | last 3 weeks 8.7 a week | lineup value 0.1
SF | San Francisco 49ers | DEF | age ? | SF | market 0 | projected 70.7 (6.4 a week) | last 3 weeks 6.7 a week | lineup value 70.7
6943 | Gabe Davis | WR | age 26 | FA | market 1797 | projected 61.2 (5.6 a week) | last 3 weeks 6.8 a week | lineup value 1.2
6945 | Antonio Gibson | RB | age 27 | FA | market 1427 | projected 61.2 (5.6 a week) | last 3 weeks 6.6 a week | lineup value 22.5
10937 | Jake Moody | K | age 26 | FA | market 0 | projected 58.7 (5.3 a week) | last 3 weeks 12 a week | lineup value 58.7
829 | Andy Dalton | QB | age 38 | FA | market 0 | projected 56 (5.1 a week) | last 3 weeks 8.2 a week | lineup value 0
6938 | Cam Akers | RB | age 26 | FA | market 0 | projected 43.1 (3.9 a week) | last 3 weeks 3.3 a week | lineup value 5.9
4381 | Taysom Hill | TE | age 35 | FA | market 1529 | projected 41.1 (3.7 a week) | last 3 weeks 2.5 a week | lineup value 0.1
5185 | Allen Lazard | WR | age 30 | FA | market 1595 | projected 37.1 (3.4 a week) | last 3 weeks 5.6 a week | lineup value 5.5
6151 | Miles Sanders | RB | age 28 | FA | market 1691 | projected 27.1 (2.5 a week) | last 3 weeks 5.5 a week | lineup value 5.7
2197 | Brandin Cooks | WR | age 33 | SF | market 0 | projected 24.5 (2.2 a week) | last 3 weeks 7.2 a week | lineup value 8.1
10229 | Rashee Rice | WR | age 26 | KC | market 4415 | projected 17.1 (1.6 a week) | last 3 weeks 21.6 a week | lineup value 8.4

PARTNER (partnerId 5): record 2-1, rank 4, points for 453.1, contention window 0.82
4984 | Josh Allen | QB | age 30 | BUF | market 6470 | projected 209.5 (19 a week) | last 3 weeks 24 a week | lineup value 65.3
5849 | Kyler Murray | QB | age 29 | MIN | market 4173 | projected 178 (16.2 a week) | last 3 weeks 19.2 a week | lineup value 34
3198 | Derrick Henry | RB | age 32 | BAL | market 4136 | projected 166.5 (15.1 a week) | last 3 weeks 19.2 a week | lineup value 74.7
1373 | Geno Smith | QB | age 36 | NYJ | market 2413 | projected 160.2 (14.6 a week) | last 3 weeks 15.7 a week | lineup value 17.7
9224 | Chase Brown | RB | age 26 | CIN | market 4507 | projected 130.4 (11.9 a week) | last 3 weeks 5.8 a week | lineup value 42.1
8138 | James Cook | RB | age 27 | BUF | market 4893 | projected 120.3 (10.9 a week) | last 3 weeks 20.2 a week | lineup value 37.9
8126 | Wan'Dale Robinson | WR | age 25 | TEN | market 3408 | projected 110.4 (10 a week) | last 3 weeks 11.6 a week | lineup value 19.5
11635 | Ladd McConkey | WR | age 24 | LAC | market 4601 | projected 106.5 (9.7 a week) | last 3 weeks 9 a week | lineup value 28.6
2309 | Amari Cooper | WR | age 31 | FA | market 2260 | projected 97.9 (8.9 a week) | last 3 weeks 11.8 a week | lineup value 30.8
11626 | Xavier Legette | WR | age 25 | CAR | market 0 | projected 88.8 (8.1 a week) | last 3 weeks 4.6 a week | lineup value 4.2
3451 | Ka'imi Fairbairn | K | age 32 | HOU | market 0 | projected 84.3 (7.7 a week) | last 3 weeks 12.3 a week | lineup value 84.3
7600 | Pat Freiermuth | TE | age 27 | PIT | market 2349 | projected 77.7 (7.1 a week) | last 3 weeks 7.3 a week | lineup value 24.8
DET | Detroit Lions | DEF | age ? | DET | market 0 | projected 72.1 (6.6 a week) | last 3 weeks 7.3 a week | lineup value 72.1
10236 | Dalton Kincaid | TE | age 26 | BUF | market 3772 | projected 71.9 (6.5 a week) | last 3 weeks 7.5 a week | lineup value 20.8
8144 | Chris Olave | WR | age 26 | NO | market 4412 | projected 66.5 (6 a week) | last 3 weeks 12.2 a week | lineup value 16.7
5995 | Justice Hill | RB | age 28 | BAL | market 2040 | projected 66.1 (6 a week) | last 3 weeks 4.2 a week | lineup value 0
8228 | Jaylen Warren | RB | age 27 | PIT | market 3535 | projected 64.5 (5.9 a week) | last 3 weeks 4.4 a week | lineup value 7.4
8143 | Jerome Ford | RB | age 27 | ARI | market 0 | projected 64.2 (5.8 a week) | last 3 weeks 12.1 a week | lineup value 3.6
11637 | Keon Coleman | WR | age 23 | BUF | market 2741 | projected 49.8 (4.5 a week) | last 3 weeks 6.2 a week | lineup value 0
9508 | Tyjae Spears | RB | age 25 | TEN | market 2979 | projected 46 (4.2 a week) | last 3 weeks 7.5 a week | lineup value 0.6
11618 | Jalen McMillan | WR | age 24 | TB | market 2954 | projected 45.8 (4.2 a week) | last 3 weeks 5 a week | lineup value 0
11575 | Ray Davis | RB | age 26 | BUF | market 2518 | projected 41.5 (3.8 a week) | last 3 weeks 5.6 a week | lineup value 0

PARTNER (partnerId 10): record 0-3, rank 11, points for 437.2, contention window 0
4866 | Saquon Barkley | RB | age 29 | PHI | market 4229 | projected 176.9 (16.1 a week) | last 3 weeks 28.1 a week | lineup value 85
4046 | Patrick Mahomes | QB | age 31 | KC | market 4643 | projected 174.3 (15.8 a week) | last 3 weeks 14.8 a week | lineup value 129.5
3321 | Tyreek Hill | WR | age 31 | FA | market 2521 | projected 148.3 (13.5 a week) | last 3 weeks 13.2 a week | lineup value 56.2
4199 | Aaron Jones | RB | age 31 | MIN | market 2805 | projected 148.3 (13.5 a week) | last 3 weeks 18.2 a week | lineup value 60
9997 | Zay Flowers | WR | age 26 | BAL | market 4181 | projected 136.7 (12.4 a week) | last 3 weeks 12.8 a week | lineup value 37.9
4018 | Joe Mixon | RB | age 30 | FA | market 2254 | projected 134.4 (12.2 a week) | last 3 weeks 11.6 a week | lineup value 54.7
9488 | Jaxon Smith-Njigba | WR | age 24 | SEA | market 5792 | projected 129.2 (11.7 a week) | last 3 weeks 11.5 a week | lineup value 30.3
1264 | Justin Tucker | K | age 35 | FA | market 0 | projected 96.5 (8.8 a week) | last 3 weeks 7.3 a week | lineup value 96.5
8408 | Jordan Mason | RB | age 27 | MIN | market 3076 | projected 84.6 (7.7 a week) | last 3 weeks 16.8 a week | lineup value 14.5
4663 | Austin Ekeler | RB | age 31 | WAS | market 0 | projected 84.1 (7.6 a week) | last 3 weeks 11.8 a week | lineup value 10.5
10859 | Sam LaPorta | TE | age 25 | DET | market 4253 | projected 83.9 (7.6 a week) | last 3 weeks 5.8 a week | lineup value 14.4
3214 | Hunter Henry | TE | age 31 | NE | market 3148 | projected 78.8 (7.2 a week) | last 3 weeks 8.5 a week | lineup value 4.3
2449 | Stefon Diggs | WR | age 32 | WAS | market 2786 | projected 74 (6.7 a week) | last 3 weeks 16.5 a week | lineup value 14
CHI | Chicago Bears | DEF | age ? | CHI | market 0 | projected 69.8 (6.3 a week) | last 3 weeks 12.3 a week | lineup value 13.3
BAL | Baltimore Ravens | DEF | age ? | BAL | market 0 | projected 69 (6.3 a week) | last 3 weeks 6 a week | lineup value 12.5
10226 | Andrei Iosivas | WR | age 27 | CIN | market 0 | projected 67.1 (6.1 a week) | last 3 weeks 12.2 a week | lineup value 0
4993 | Mike Gesicki | TE | age 31 | CIN | market 1195 | projected 62.4 (5.7 a week) | last 3 weeks 0 a week | lineup value 1.1
7591 | Justin Fields | QB | age 27 | KC | market 1718 | projected 55.6 (5.1 a week) | last 3 weeks 13.9 a week | lineup value 8.7
4017 | Deshaun Watson | QB | age 31 | CLE | market 2040 | projected 54.2 (4.9 a week) | last 3 weeks 14.2 a week | lineup value 1.1
4082 | Curtis Samuel | WR | age 29 | FA | market 1443 | projected 51.4 (4.7 a week) | last 3 weeks 3.3 a week | lineup value 1.1
11600 | Ja'Tavion Sanders | TE | age 23 | CAR | market 0 | projected 49.8 (4.5 a week) | last 3 weeks 1.4 a week | lineup value 0.7
11623 | Jordan Whittington | WR | age 26 | LAR | market 0 | projected 32 (2.9 a week) | last 3 weeks 3.3 a week | lineup value 0

PARTNER (partnerId 11): record 0-3, rank 12, points for 355.2, contention window 0
7564 | Ja'Marr Chase | WR | age 26 | CIN | market 5779 | projected 176.6 (16.1 a week) | last 3 weeks 16.5 a week | lineup value 97.1
1466 | Travis Kelce | TE | age 37 | KC | market 2868 | projected 144.8 (13.2 a week) | last 3 weeks 5 a week | lineup value 77.4
11563 | Bo Nix | QB | age 26 | DEN | market 4993 | projected 142.9 (13 a week) | last 3 weeks 12.9 a week | lineup value 44.8
11628 | Marvin Harrison | WR | age 24 | HOU | market 3923 | projected 130 (11.8 a week) | last 3 weeks 15.9 a week | lineup value 50
7528 | Najee Harris | RB | age 28 | NYG | market 2343 | projected 118.3 (10.8 a week) | last 3 weeks 10.3 a week | lineup value 46.2
6768 | Tua Tagovailoa | QB | age 28 | ATL | market 2680 | projected 110.9 (10.1 a week) | last 3 weeks 8 a week | lineup value 42.9
5846 | DK Metcalf | WR | age 28 | PIT | market 3437 | projected 110.2 (10 a week) | last 3 weeks 18.4 a week | lineup value 49.3
1426 | DeAndre Hopkins | WR | age 33 | FA | market 1502 | projected 107.2 (9.7 a week) | last 3 weeks 7.7 a week | lineup value 28.9
7588 | Javonte Williams | RB | age 26 | DAL | market 4030 | projected 106.3 (9.7 a week) | last 3 weeks 7 a week | lineup value 26.2
7611 | Rhamondre Stevenson | RB | age 28 | NE | market 3354 | projected 105.2 (9.6 a week) | last 3 weeks 13 a week | lineup value 28.2
7523 | Trevor Lawrence | QB | age 27 | JAX | market 4944 | projected 103.5 (9.4 a week) | last 3 weeks 11.3 a week | lineup value 29.7
4666 | Younghoe Koo | K | age 31 | FA | market 0 | projected 88.7 (8.1 a week) | last 3 weeks 7 a week | lineup value 88.7
KC | Kansas City Chiefs | DEF | age ? | KC | market 0 | projected 81.4 (7.4 a week) | last 3 weeks 8 a week | lineup value 81.4
7596 | Elijah Moore | WR | age 26 | PHI | market 0 | projected 72.7 (6.6 a week) | last 3 weeks 6 a week | lineup value 3.8
5133 | Tyler Conklin | TE | age 31 | DET | market 0 | projected 65.9 (6 a week) | last 3 weeks 6 a week | lineup value 7.9
2749 | Raheem Mostert | RB | age 33 | FA | market 1171 | projected 58.4 (5.3 a week) | last 3 weeks 1.3 a week | lineup value 2.4
6865 | Colby Parkinson | TE | age 27 | LAR | market 3062 | projected 53.3 (4.8 a week) | last 3 weeks 5.3 a week | lineup value 0
11627 | Troy Franklin | WR | age 23 | DEN | market 3022 | projected 48.2 (4.4 a week) | last 3 weeks 1 a week | lineup value 0
8139 | Zamir White | RB | age 27 | NO | market 0 | projected 25.5 (2.3 a week) | last 3 weeks 4.9 a week | lineup value 0
11647 | Kimani Vidal | RB | age 25 | LAC | market 2811 | projected 24.4 (2.2 a week) | last 3 weeks 0 a week | lineup value 4.9
4080 | Zay Jones | WR | age 31 | FA | market 0 | projected 23.7 (2.2 a week) | last 3 weeks 0 a week | lineup value 0
9482 | Michael Mayer | TE | age 25 | LV | market 0 | projected 10.4 (0.9 a week) | last 3 weeks 2 a week | lineup value 0

PARTNER (partnerId 1): record 3-0, rank 1, points for 548.7, contention window 1
8155 | Breece Hall | RB | age 25 | NYJ | market 4264 | projected 153.8 (14 a week) | last 3 weeks 20.3 a week | lineup value 85.8
96 | Aaron Rodgers | QB | age 42 | PIT | market 2569 | projected 149.9 (13.6 a week) | last 3 weeks 14.9 a week | lineup value 76.5
11632 | Malik Nabers | WR | age 23 | NYG | market 5025 | projected 122.6 (11.1 a week) | last 3 weeks 22.8 a week | lineup value 44
4217 | George Kittle | TE | age 33 | SF | market 3141 | projected 115.1 (10.5 a week) | last 3 weeks 9.5 a week | lineup value 42.2
7526 | Jaylen Waddle | WR | age 27 | DEN | market 4006 | projected 107 (9.7 a week) | last 3 weeks 10.4 a week | lineup value 12.6
4039 | Cooper Kupp | WR | age 33 | SEA | market 2094 | projected 105.1 (9.6 a week) | last 3 weeks 13.2 a week | lineup value 32.3
5947 | Jakobi Meyers | WR | age 29 | JAX | market 3291 | projected 103.5 (9.4 a week) | last 3 weeks 12.5 a week | lineup value 20.7
7021 | Rico Dowdle | RB | age 28 | PIT | market 3263 | projected 102.4 (9.3 a week) | last 3 weeks 7.6 a week | lineup value 40.1
9229 | Anthony Richardson | QB | age 24 | IND | market 0 | projected 94.6 (8.6 a week) | last 3 weeks 13.7 a week | lineup value 31
11533 | Brandon Aubrey | K | age 31 | DAL | market 0 | projected 88.8 (8.1 a week) | last 3 weeks 16.3 a week | lineup value 88.8
7049 | Jauan Jennings | WR | age 29 | MIN | market 2834 | projected 88.2 (8 a week) | last 3 weeks 15.5 a week | lineup value 16.2
7569 | Nico Collins | WR | age 27 | HOU | market 4424 | projected 84.9 (7.7 a week) | last 3 weeks 19.3 a week | lineup value 32.7
11576 | Braelon Allen | RB | age 22 | NYJ | market 3227 | projected 73.8 (6.7 a week) | last 3 weeks 10.7 a week | lineup value 10.8
6011 | Gardner Minshew | QB | age 30 | ARI | market 0 | projected 69.1 (6.3 a week) | last 3 weeks 12.6 a week | lineup value 3.6
CLE | Cleveland Browns | DEF | age ? | CLE | market 0 | projected 65.7 (6 a week) | last 3 weeks 7 a week | lineup value 65.7
5987 | Alexander Mattison | RB | age 27 | FA | market 1372 | projected 65 (5.9 a week) | last 3 weeks 6.5 a week | lineup value 12.1
5844 | T.J. Hockenson | TE | age 29 | MIN | market 2958 | projected 60.8 (5.5 a week) | last 3 weeks 0 a week | lineup value 20.1
6130 | Devin Singletary | RB | age 29 | NYG | market 0 | projected 59.4 (5.4 a week) | last 3 weeks 14.2 a week | lineup value 9.8
5857 | Noah Fant | TE | age 28 | NO | market 0 | projected 51 (4.6 a week) | last 3 weeks 4 a week | lineup value 4.8
3225 | Tyler Boyd | WR | age 30 | FA | market 1966 | projected 50.2 (4.6 a week) | last 3 weeks 5.2 a week | lineup value 5.9
11638 | Ricky Pearsall | WR | age 26 | SF | market 2208 | projected 49.9 (4.5 a week) | last 3 weeks 0 a week | lineup value 0
11589 | Trey Benson | RB | age 24 | ARI | market 3161 | projected 33.7 (3.1 a week) | last 3 weeks 2.1 a week | lineup value 0

CANDIDATE DEALS (from a rules-based finder; points are the finder projections for the rest of the season):
c1 | partnerId 9 | I give Dawson Knox (5906) | I get Demarcus Robinson (3286) | my points 5.3 | their points 7.3 | likelihood 0.8
c2 | partnerId 8 | I give Dawson Knox + Isaac Guerendo (5906,11651) | I get DeMario Douglas (9501) | my points 8.8 | their points 15.6 | likelihood 0.76
c3 | partnerId 5 | I give Isaac Guerendo + Dawson Knox (11651,5906) | I get Xavier Legette (11626) | my points 5.4 | their points 6.6 | likelihood 0.78
c4 | partnerId 10 | I give Gus Edwards (5248) | I get Joe Mixon + Tyreek Hill (4018,3321) | my points 92.3 | their points -111.6 | likelihood 0.93
c5 | partnerId 10 | I give Juwan Johnson (7002) | I get Joe Mixon + Aaron Jones (4018,4199) | my points 91 | their points -126.6 | likelihood 0.95
c6 | partnerId 10 | I give Dawson Knox + Juwan Johnson (5906,7002) | I get Aaron Jones + Tyreek Hill (4199,3321) | my points 79.3 | their points -121.6 | likelihood 0.95
c7 | partnerId 11 | I give Juwan Johnson (7002) | I get Travis Kelce + Najee Harris (1466,7528) | my points 57.5 | their points -121.4 | likelihood 0.92
c8 | partnerId 1 | I give Kirk Cousins + Isaac Guerendo (1166,11651) | I get Ricky Pearsall + Gardner Minshew (11638,6011) | my points 12.9 | their points 27.6 | likelihood 0.68
c9 | partnerId 1 | I give Kirk Cousins (1166) | I get Ricky Pearsall (11638) | my points 7.5 | their points 25.3 | likelihood 0.64
c10 | partnerId 1 | I give Kirk Cousins + Chris Godwin (1166,4037) | I get Gardner Minshew + Jakobi Meyers (6011,5947) | my points 9.5 | their points 29.1 | likelihood 0.6
c11 | partnerId 1 | I give Kirk Cousins + James Conner (1166,4137) | I get Cooper Kupp + Jauan Jennings (4039,7049) | my points 13.7 | their points 17 | likelihood 0.59
c12 | partnerId 8 | I give Kirk Cousins + Gus Edwards (1166,5248) | I get Tank Dell + DeMario Douglas (9502,9501) | my points 31.8 | their points -13.9 | likelihood 0.65

Pick the best trades for my team.

=========== CASE 1126221449154408448-w7-r1 ===========
REPLY FILE: /Users/anik/workspace/chrome/sleeper/.eval-market/replies/suggest-v2/heldout1/1126221449154408448-w7-r1.json
--- SYSTEM ---
You advise one fantasy football manager on which trades to propose. You reason only from the facts you are given and never invent players, stats or values.

This is a dynasty or keeper league: market value, age and future seasons matter as well as this season. Contending teams should convert future value into points now, and rebuilding teams should do the reverse. Players past their position age curve lose value quickly; young players on the rise gain it.

A good suggestion raises my lineup points for the rest of the season, is something the partner would plausibly accept, and fits where each team stands in the standings.

Compare each player's recent weekly scoring with his weekly projection: a player scoring far above his projection is a sell-high, one far below with an unchanged role is a buy-low, and a player who has stopped scoring for several weeks may have lost his role. Prefer deals where the player I receive starts for me every week.

Reply with JSON only, no other text, in exactly this shape:
{"suggestions":[{"candidate":"c3","pitch":"one sentence"},{"partnerId":4,"give":["id"],"get":["id","id"],"pitch":"one sentence"}]}
Use "candidate" to pick one of the listed candidate keys, or give your own deal with "partnerId", "give" (players on my roster) and "get" (players on that partner roster).
Each side has one or two players. Rank the suggestions best first. Give at most three. Use only the player ids and partner ids in the data.
--- DATA ---
League: dynasty, 12 teams, week 7, 8 regular season weeks left, playoffs start week 15
Lineup slots: QB, RB, RB, WR, WR, TE, FLEX, FLEX, SUPER_FLEX, K, DEF, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN. Superflex: yes. Tight end premium: no. Points per reception: 1.
Columns: id | name | position | age | team | market value | projected points for the rest of the regular season (and per week) | points per week over the last three weeks played | lineup value (points my lineup loses if this player is removed).

MY TEAM (partnerId me): record 5-1, rank 1, points for 935.9, contention window 1
11632 | Malik Nabers | WR | age 23 | NYG | market 5024 | projected 106.7 (13.3 a week) | last 3 weeks 7.7 a week | lineup value 49.4
96 | Aaron Rodgers | QB | age 42 | PIT | market 2580 | projected 105.7 (13.2 a week) | last 3 weeks 13.7 a week | lineup value 70.3
8155 | Breece Hall | RB | age 25 | NYJ | market 4265 | projected 105.2 (13.1 a week) | last 3 weeks 10.8 a week | lineup value 63.2
4039 | Cooper Kupp | WR | age 33 | SEA | market 2094 | projected 105.1 (13.1 a week) | last 3 weeks 0 a week | lineup value 45
7526 | Jaylen Waddle | WR | age 27 | DEN | market 4006 | projected 87.6 (10.9 a week) | last 3 weeks 5.4 a week | lineup value 21.6
4217 | George Kittle | TE | age 33 | SF | market 3142 | projected 79.9 (10 a week) | last 3 weeks 19.2 a week | lineup value 44
9229 | Anthony Richardson | QB | age 24 | IND | market 0 | projected 77 (9.6 a week) | last 3 weeks 1.7 a week | lineup value 41.5
7021 | Rico Dowdle | RB | age 28 | PIT | market 3263 | projected 72.7 (9.1 a week) | last 3 weeks 14.3 a week | lineup value 36.4
7049 | Jauan Jennings | WR | age 29 | MIN | market 2834 | projected 61.5 (7.7 a week) | last 3 weeks 6.6 a week | lineup value 16.3
11533 | Brandon Aubrey | K | age 31 | DAL | market 0 | projected 61.2 (7.7 a week) | last 3 weeks 10.3 a week | lineup value 61.2
5844 | T.J. Hockenson | TE | age 29 | MIN | market 2958 | projected 60.8 (7.6 a week) | last 3 weeks 0 a week | lineup value 24.9
11576 | Braelon Allen | RB | age 22 | NYJ | market 3227 | projected 51.7 (6.5 a week) | last 3 weeks 3.4 a week | lineup value 5.8
7569 | Nico Collins | WR | age 27 | HOU | market 4424 | projected 50.7 (6.3 a week) | last 3 weeks 16.3 a week | lineup value 20.1
11638 | Ricky Pearsall | WR | age 26 | SF | market 2208 | projected 49.9 (6.2 a week) | last 3 weeks 0 a week | lineup value 1.2
6130 | Devin Singletary | RB | age 29 | NYG | market 0 | projected 46.5 (5.8 a week) | last 3 weeks 1.6 a week | lineup value 6
CLE | Cleveland Browns | DEF | age ? | CLE | market 0 | projected 45.6 (5.7 a week) | last 3 weeks 10 a week | lineup value 45.6
5987 | Alexander Mattison | RB | age 27 | FA | market 1372 | projected 38.7 (4.8 a week) | last 3 weeks 11.2 a week | lineup value 8.8
3225 | Tyler Boyd | WR | age 30 | FA | market 1966 | projected 37.4 (4.7 a week) | last 3 weeks 3.3 a week | lineup value 0.6
5970 | Greg Dortch | WR | age 28 | BUF | market 0 | projected 33.5 (4.2 a week) | last 3 weeks 1.5 a week | lineup value 0
11589 | Trey Benson | RB | age 24 | ARI | market 3158 | projected 24.5 (3.1 a week) | last 3 weeks 2.5 a week | lineup value 0
11616 | Jacob Cowing | WR | age 25 | SF | market 0 | projected 7.5 (0.9 a week) | last 3 weeks 0 a week | lineup value 0
11565 | J.J. McCarthy | QB | age 23 | NYG | market 3918 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0
11567 | Jordan Travis | QB | age 24 | FA | market 2353 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0

PARTNER (partnerId 10): record 1-5, rank 11, points for 892, contention window 0
4866 | Saquon Barkley | RB | age 29 | PHI | market 4230 | projected 142.4 (17.8 a week) | last 3 weeks 7 a week | lineup value 78.4
4046 | Patrick Mahomes | QB | age 31 | KC | market 4630 | projected 137.8 (17.2 a week) | last 3 weeks 8.8 a week | lineup value 121.8
3321 | Tyreek Hill | WR | age 31 | FA | market 2521 | projected 122.2 (15.3 a week) | last 3 weeks 7 a week | lineup value 57.9
4018 | Joe Mixon | RB | age 30 | FA | market 2254 | projected 122 (15.3 a week) | last 3 weeks 9.1 a week | lineup value 58.1
4199 | Aaron Jones | RB | age 31 | MIN | market 2805 | projected 120.4 (15.1 a week) | last 3 weeks 8.1 a week | lineup value 56.5
9997 | Zay Flowers | WR | age 26 | BAL | market 4182 | projected 97.1 (12.1 a week) | last 3 weeks 14.5 a week | lineup value 35.3
9488 | Jaxon Smith-Njigba | WR | age 24 | SEA | market 5790 | projected 92 (11.5 a week) | last 3 weeks 12.2 a week | lineup value 33.2
1264 | Justin Tucker | K | age 35 | FA | market 0 | projected 67.3 (8.4 a week) | last 3 weeks 10.3 a week | lineup value 67.3
4663 | Austin Ekeler | RB | age 31 | WAS | market 0 | projected 63.3 (7.9 a week) | last 3 weeks 7.5 a week | lineup value 14.1
10859 | Sam LaPorta | TE | age 25 | DET | market 4254 | projected 62.9 (7.9 a week) | last 3 weeks 7.2 a week | lineup value 9.8
3214 | Hunter Henry | TE | age 31 | NE | market 3149 | projected 58.8 (7.4 a week) | last 3 weeks 7.2 a week | lineup value 9.1
BAL | Baltimore Ravens | DEF | age ? | BAL | market 0 | projected 49.8 (6.2 a week) | last 3 weeks 5.3 a week | lineup value 2.3
CIN | Cincinnati Bengals | DEF | age ? | CIN | market 0 | projected 48.4 (6 a week) | last 3 weeks 0 a week | lineup value 2.3
CHI | Chicago Bears | DEF | age ? | CHI | market 0 | projected 46.3 (5.8 a week) | last 3 weeks 12 a week | lineup value 2.8
10226 | Andrei Iosivas | WR | age 27 | CIN | market 0 | projected 44.7 (5.6 a week) | last 3 weeks 4.8 a week | lineup value 3
11600 | Ja'Tavion Sanders | TE | age 23 | CAR | market 0 | projected 40.5 (5.1 a week) | last 3 weeks 5.9 a week | lineup value 3.7
8408 | Jordan Mason | RB | age 27 | MIN | market 3080 | projected 38.7 (4.8 a week) | last 3 weeks 14 a week | lineup value 1.5
6865 | Colby Parkinson | TE | age 27 | LAR | market 3061 | projected 37.4 (4.7 a week) | last 3 weeks 6.5 a week | lineup value 0
2449 | Stefon Diggs | WR | age 32 | WAS | market 2787 | projected 30.4 (3.8 a week) | last 3 weeks 17.5 a week | lineup value 5.1
1689 | Adam Thielen | WR | age 35 | FA | market 2214 | projected 30.1 (3.8 a week) | last 3 weeks 0 a week | lineup value 9.5
11623 | Jordan Whittington | WR | age 26 | LAR | market 0 | projected 16.8 (2.1 a week) | last 3 weeks 9.4 a week | lineup value 0
4017 | Deshaun Watson | QB | age 31 | CLE | market 1922 | projected 12.1 (1.5 a week) | last 3 weeks 9.7 a week | lineup value 0

PARTNER (partnerId 11): record 1-5, rank 12, points for 790.1, contention window 0
7564 | Ja'Marr Chase | WR | age 26 | CIN | market 5779 | projected 126.5 (15.8 a week) | last 3 weeks 23.7 a week | lineup value 67.9
1466 | Travis Kelce | TE | age 37 | KC | market 2868 | projected 119.1 (14.9 a week) | last 3 weeks 10.6 a week | lineup value 74.8
6768 | Tua Tagovailoa | QB | age 28 | ATL | market 2680 | projected 110.9 (13.9 a week) | last 3 weeks 0 a week | lineup value 42.9
11563 | Bo Nix | QB | age 26 | DEN | market 5022 | projected 106.2 (13.3 a week) | last 3 weeks 16.9 a week | lineup value 29
1426 | DeAndre Hopkins | WR | age 33 | FA | market 1502 | projected 89.9 (11.2 a week) | last 3 weeks 4.8 a week | lineup value 24.1
11628 | Marvin Harrison | WR | age 24 | HOU | market 3923 | projected 88.1 (11 a week) | last 3 weeks 7 a week | lineup value 29.1
7611 | Rhamondre Stevenson | RB | age 28 | NE | market 3354 | projected 83.3 (10.4 a week) | last 3 weeks 9.1 a week | lineup value 22.9
7528 | Najee Harris | RB | age 28 | NYG | market 2343 | projected 81.3 (10.2 a week) | last 3 weeks 13.4 a week | lineup value 29
7588 | Javonte Williams | RB | age 26 | DAL | market 4031 | projected 75.2 (9.4 a week) | last 3 weeks 10.2 a week | lineup value 14.8
5846 | DK Metcalf | WR | age 28 | PIT | market 3438 | projected 68.8 (8.6 a week) | last 3 weeks 10.2 a week | lineup value 28.8
KC | Kansas City Chiefs | DEF | age ? | KC | market 0 | projected 64.2 (8 a week) | last 3 weeks 4.3 a week | lineup value 13.8
4666 | Younghoe Koo | K | age 31 | FA | market 0 | projected 62.2 (7.8 a week) | last 3 weeks 15.7 a week | lineup value 62.2
7523 | Trevor Lawrence | QB | age 27 | JAX | market 4998 | projected 59 (7.4 a week) | last 3 weeks 17.7 a week | lineup value 6.3
7596 | Elijah Moore | WR | age 26 | PHI | market 0 | projected 56.3 (7 a week) | last 3 weeks 2.5 a week | lineup value 3.8
2749 | Raheem Mostert | RB | age 33 | FA | market 1171 | projected 52.7 (6.6 a week) | last 3 weeks 3.9 a week | lineup value 2.4
HOU | Houston Texans | DEF | age ? | HOU | market 0 | projected 52.6 (6.6 a week) | last 3 weeks 5.7 a week | lineup value 2.3
5133 | Tyler Conklin | TE | age 31 | DET | market 0 | projected 44.3 (5.5 a week) | last 3 weeks 6.7 a week | lineup value 0
11627 | Troy Franklin | WR | age 23 | DEN | market 3023 | projected 40.6 (5.1 a week) | last 3 weeks 5.5 a week | lineup value 0
4080 | Zay Jones | WR | age 31 | FA | market 0 | projected 23.7 (3 a week) | last 3 weeks 0 a week | lineup value 0
8139 | Zamir White | RB | age 27 | NO | market 0 | projected 18.1 (2.3 a week) | last 3 weeks 1 a week | lineup value 0
11645 | Javon Baker | WR | age 23 | FA | market 0 | projected 4.3 (0.5 a week) | last 3 weeks 0 a week | lineup value 0

PARTNER (partnerId 9): record 3-3, rank 9, points for 756.6, contention window 0.18
6904 | Jalen Hurts | QB | age 28 | PHI | market 5592 | projected 162.5 (20.3 a week) | last 3 weeks 12.7 a week | lineup value 48
5859 | A.J. Brown | WR | age 29 | NE | market 4313 | projected 133.7 (16.7 a week) | last 3 weeks 7.9 a week | lineup value 55.7
8150 | Kyren Williams | RB | age 26 | LAR | market 4550 | projected 132.2 (16.5 a week) | last 3 weeks 12 a week | lineup value 58.2
421 | Matthew Stafford | QB | age 38 | LAR | market 3576 | projected 120.4 (15 a week) | last 3 weeks 5.8 a week | lineup value 6
4892 | Baker Mayfield | QB | age 31 | TB | market 3990 | projected 114.7 (14.3 a week) | last 3 weeks 26.1 a week | lineup value 10.4
2133 | Davante Adams | WR | age 33 | LAR | market 3374 | projected 97.7 (12.2 a week) | last 3 weeks 0 a week | lineup value 28.4
6783 | Jerry Jeudy | WR | age 27 | CLE | market 2695 | projected 76.9 (9.6 a week) | last 3 weeks 6.8 a week | lineup value 7.2
4988 | Nick Chubb | RB | age 30 | FA | market 1806 | projected 73.9 (9.2 a week) | last 3 weeks 0 a week | lineup value 8.2
2374 | Tyler Lockett | WR | age 33 | FA | market 2518 | projected 69.9 (8.7 a week) | last 3 weeks 13 a week | lineup value 5.3
8167 | Christian Watson | WR | age 27 | GB | market 3663 | projected 65.5 (8.2 a week) | last 3 weeks 5.3 a week | lineup value 0.8
5012 | Mark Andrews | TE | age 31 | BAL | market 3108 | projected 61.6 (7.7 a week) | last 3 weeks 8.4 a week | lineup value 26.5
3286 | Demarcus Robinson | WR | age 32 | SF | market 0 | projected 60.7 (7.6 a week) | last 3 weeks 5.8 a week | lineup value 0.7
LAC | Los Angeles Chargers | DEF | age ? | LAC | market 0 | projected 57.2 (7.1 a week) | last 3 weeks 5.7 a week | lineup value 57.1
1945 | Chris Boswell | K | age 35 | PIT | market 0 | projected 55.4 (6.9 a week) | last 3 weeks 7.7 a week | lineup value 55.4
9486 | Dontayvion Wicks | WR | age 25 | PHI | market 2556 | projected 54 (6.7 a week) | last 3 weeks 10.2 a week | lineup value 0
9225 | Tank Bigsby | RB | age 24 | PHI | market 2867 | projected 51.9 (6.5 a week) | last 3 weeks 12.4 a week | lineup value 0.5
9753 | Zach Charbonnet | RB | age 25 | SEA | market 3180 | projected 50.6 (6.3 a week) | last 3 weeks 7 a week | lineup value 3
7543 | Travis Etienne | RB | age 27 | NO | market 3835 | projected 50.4 (6.3 a week) | last 3 weeks 6.3 a week | lineup value 2.6
11625 | Adonai Mitchell | WR | age 24 | NYJ | market 2979 | projected 41.9 (5.2 a week) | last 3 weeks 4.4 a week | lineup value 0.5
5022 | Dallas Goedert | TE | age 31 | PHI | market 3128 | projected 39.1 (4.9 a week) | last 3 weeks 4.4 a week | lineup value 4
4068 | Mike Williams | WR | age 30 | FA | market 1702 | projected 36.7 (4.6 a week) | last 3 weeks 5.1 a week | lineup value 0
11439 | Jaleel McLaughlin | RB | age 26 | CLE | market 0 | projected 36 (4.5 a week) | last 3 weeks 7.2 a week | lineup value 0

PARTNER (partnerId 2): record 3-3, rank 8, points for 789.8, contention window 0.31
7547 | Amon-Ra St. Brown | WR | age 26 | DET | market 5296 | projected 136.6 (17.1 a week) | last 3 weeks 11.5 a week | lineup value 46.5
3163 | Jared Goff | QB | age 32 | DET | market 4211 | projected 124.4 (15.5 a week) | last 3 weeks 17.4 a week | lineup value 55.4
5927 | Terry McLaurin | WR | age 31 | WAS | market 3390 | projected 104.3 (13 a week) | last 3 weeks 18.3 a week | lineup value 25.1
5850 | Josh Jacobs | RB | age 28 | GB | market 4035 | projected 102.4 (12.8 a week) | last 3 weeks 13.4 a week | lineup value 27.8
8146 | Garrett Wilson | WR | age 26 | NYJ | market 4217 | projected 100.4 (12.6 a week) | last 3 weeks 20.3 a week | lineup value 21.2
8130 | Trey McBride | TE | age 26 | ARI | market 4875 | projected 89.6 (11.2 a week) | last 3 weeks 9.6 a week | lineup value 57.5
5872 | Deebo Samuel | WR | age 30 | SF | market 2703 | projected 88.7 (11.1 a week) | last 3 weeks 11.3 a week | lineup value 9
6790 | D'Andre Swift | RB | age 27 | CHI | market 3666 | projected 88.3 (11 a week) | last 3 weeks 23.8 a week | lineup value 10.9
9756 | Jordan Addison | WR | age 24 | MIN | market 3609 | projected 83.3 (10.4 a week) | last 3 weeks 9.8 a week | lineup value 0.2
6806 | J.K. Dobbins | RB | age 27 | DEN | market 3329 | projected 82.5 (10.3 a week) | last 3 weeks 9.1 a week | lineup value 18.9
11655 | Tyrone Tracy | RB | age 26 | NYG | market 2985 | projected 78.3 (9.8 a week) | last 3 weeks 13.3 a week | lineup value 7.1
8148 | Jameson Williams | WR | age 25 | DET | market 4097 | projected 64.4 (8.1 a week) | last 3 weeks 11.2 a week | lineup value 0
9999 | Will Levis | QB | age 27 | NYJ | market 0 | projected 62.2 (7.8 a week) | last 3 weeks 2.3 a week | lineup value 5.9
8117 | Jalen Tolbert | WR | age 27 | MIA | market 0 | projected 53 (6.6 a week) | last 3 weeks 11.8 a week | lineup value 0
ATL | Atlanta Falcons | DEF | age ? | ATL | market 0 | projected 45.2 (5.6 a week) | last 3 weeks 2.3 a week | lineup value 45.2
11597 | Theo Johnson | TE | age 25 | NYG | market 3208 | projected 32.2 (4 a week) | last 3 weeks 5.8 a week | lineup value 0
4040 | JuJu Smith-Schuster | WR | age 29 | FA | market 1346 | projected 29 (3.6 a week) | last 3 weeks 0 a week | lineup value 0
11643 | Jaylen Wright | RB | age 23 | MIA | market 2769 | projected 25.1 (3.1 a week) | last 3 weeks 3.9 a week | lineup value 0
8230 | Ty Chandler | RB | age 28 | NO | market 0 | projected 22.7 (2.8 a week) | last 3 weeks 2.7 a week | lineup value 0
7083 | Tyler Huntley | QB | age 28 | BAL | market 0 | projected 13.4 (1.7 a week) | last 3 weeks 6.1 a week | lineup value 0.7
11574 | Dylan Laube | RB | age 26 | LV | market 0 | projected 5.7 (0.7 a week) | last 3 weeks -0.7 a week | lineup value 0
11559 | Michael Penix | QB | age 26 | ATL | market 3465 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0

PARTNER (partnerId 3): record 4-2, rank 2, points for 940.3, contention window 1
4943 | Sam Darnold | QB | age 29 | SEA | market 3814 | projected 129.1 (16.1 a week) | last 3 weeks 8.3 a week | lineup value 23.8
9509 | Bijan Robinson | RB | age 24 | ATL | market 6366 | projected 121.2 (15.1 a week) | last 3 weeks 15.9 a week | lineup value 55
6786 | CeeDee Lamb | WR | age 27 | DAL | market 4922 | projected 113 (14.1 a week) | last 3 weeks 17 a week | lineup value 54.9
8183 | Brock Purdy | QB | age 26 | SF | market 5091 | projected 106.8 (13.3 a week) | last 3 weeks 17.3 a week | lineup value 16.6
1166 | Kirk Cousins | QB | age 38 | LV | market 2030 | projected 104.7 (13.1 a week) | last 3 weeks 18.1 a week | lineup value 0.6
5892 | David Montgomery | RB | age 29 | HOU | market 3466 | projected 104.6 (13.1 a week) | last 3 weeks 12 a week | lineup value 35.4
11604 | Brock Bowers | TE | age 23 | LV | market 5530 | projected 93.6 (11.7 a week) | last 3 weeks 15 a week | lineup value 36
4137 | James Conner | RB | age 31 | ARI | market 2741 | projected 93.5 (11.7 a week) | last 3 weeks 13 a week | lineup value 31
8134 | Khalil Shakir | WR | age 26 | BUF | market 3139 | projected 89.8 (11.2 a week) | last 3 weeks 4.7 a week | lineup value 26.5
10222 | Jayden Reed | WR | age 26 | GB | market 3355 | projected 89.2 (11.2 a week) | last 3 weeks 18.5 a week | lineup value 27.8
8111 | Cade Otton | TE | age 27 | TB | market 2958 | projected 71.2 (8.9 a week) | last 3 weeks 9.4 a week | lineup value 12.4
5870 | Daniel Jones | QB | age 29 | IND | market 3507 | projected 60.7 (7.6 a week) | last 3 weeks 14.5 a week | lineup value 0
5095 | Daniel Carlson | K | age 31 | NO | market 0 | projected 52.4 (6.5 a week) | last 3 weeks 5.3 a week | lineup value 52.4
WAS | Washington Commanders | DEF | age ? | WAS | market 0 | projected 51.7 (6.5 a week) | last 3 weeks 5.7 a week | lineup value 51.7
8132 | Tyler Allgeier | RB | age 26 | ARI | market 3194 | projected 48.8 (6.1 a week) | last 3 weeks 11.8 a week | lineup value 0.3
7002 | Juwan Johnson | TE | age 30 | NO | market 3113 | projected 47.5 (5.9 a week) | last 3 weeks 6.4 a week | lineup value 0.7
5906 | Dawson Knox | TE | age 29 | BUF | market 0 | projected 36.9 (4.6 a week) | last 3 weeks 3.1 a week | lineup value 0
5248 | Gus Edwards | RB | age 29 | FA | market 2770 | projected 35 (4.4 a week) | last 3 weeks 0.6 a week | lineup value 1.5
11650 | Luke McCaffrey | WR | age 25 | WAS | market 0 | projected 28.1 (3.5 a week) | last 3 weeks 3 a week | lineup value 0
11651 | Isaac Guerendo | RB | age 26 | SF | market 0 | projected 26.9 (3.4 a week) | last 3 weeks 3.4 a week | lineup value 1.9
11599 | Cade Stover | TE | age 26 | HOU | market 0 | projected 20.2 (2.5 a week) | last 3 weeks 2.1 a week | lineup value 0
4037 | Chris Godwin | WR | age 30 | TB | market 3086 | projected 16 (2 a week) | last 3 weeks 20 a week | lineup value 7.9

CANDIDATE DEALS (from a rules-based finder; points are the finder projections for the rest of the season):
c1 | partnerId 10 | I give Jordan Travis + Trey Benson (11567,11589) | I get Joe Mixon + Aaron Jones (4018,4199) | my points 96.9 | their points -124 | likelihood 0.95
c2 | partnerId 10 | I give Trey Benson (11589) | I get Aaron Jones + Tyreek Hill (4199,3321) | my points 87.5 | their points -120.5 | likelihood 0.95
c3 | partnerId 10 | I give Jordan Travis (11567) | I get Joe Mixon (4018) | my points 61.8 | their points -58.1 | likelihood 0.86
c4 | partnerId 11 | I give Jordan Travis + Trey Benson (11567,11589) | I get Travis Kelce + Tua Tagovailoa (1466,6768) | my points 71.9 | their points -112.9 | likelihood 0.94
c5 | partnerId 11 | I give Trey Benson (11589) | I get Travis Kelce + Najee Harris (1466,7528) | my points 60.4 | their points -99.1 | likelihood 0.94
c6 | partnerId 11 | I give J.J. McCarthy (11565) | I get Travis Kelce + Rhamondre Stevenson (1466,7611) | my points 62.6 | their points -97.7 | likelihood 0.95
c7 | partnerId 9 | I give J.J. McCarthy + Trey Benson (11565,11589) | I get Davante Adams + Matthew Stafford (2133,421) | my points 52.8 | their points -35.1 | likelihood 0.86
c8 | partnerId 2 | I give J.J. McCarthy + Ricky Pearsall (11565,11638) | I get Terry McLaurin + J.K. Dobbins (5927,6806) | my points 65 | their points -50.2 | likelihood 0.88
c9 | partnerId 3 | I give Ricky Pearsall + Greg Dortch (11638,5970) | I get Kirk Cousins + Isaac Guerendo (1166,11651) | my points 21 | their points 5.6 | likelihood 0.92
c10 | partnerId 3 | I give Ricky Pearsall (11638) | I get Kirk Cousins (1166) | my points 17 | their points 7.5 | likelihood 0.92
c11 | partnerId 9 | I give J.J. McCarthy (11565) | I get Matthew Stafford + Nick Chubb (421,4988) | my points 36.3 | their points -14.9 | likelihood 0.84
c12 | partnerId 9 | I give J.J. McCarthy + Jordan Travis (11565,11567) | I get Davante Adams + Nick Chubb (2133,4988) | my points 39.9 | their points -39.6 | likelihood 0.93

Pick the best trades for my team.

=========== CASE 1180145866219773952-w4-r12 ===========
REPLY FILE: /Users/anik/workspace/chrome/sleeper/.eval-market/replies/suggest-v2/heldout1/1180145866219773952-w4-r12.json
--- SYSTEM ---
You advise one fantasy football manager on which trades to propose. You reason only from the facts you are given and never invent players, stats or values.

This is a dynasty or keeper league: market value, age and future seasons matter as well as this season. Contending teams should convert future value into points now, and rebuilding teams should do the reverse. Players past their position age curve lose value quickly; young players on the rise gain it.

A good suggestion raises my lineup points for the rest of the season, is something the partner would plausibly accept, and fits where each team stands in the standings.

Compare each player's recent weekly scoring with his weekly projection: a player scoring far above his projection is a sell-high, one far below with an unchanged role is a buy-low, and a player who has stopped scoring for several weeks may have lost his role. Prefer deals where the player I receive starts for me every week.

Reply with JSON only, no other text, in exactly this shape:
{"suggestions":[{"candidate":"c3","pitch":"one sentence"},{"partnerId":4,"give":["id"],"get":["id","id"],"pitch":"one sentence"}]}
Use "candidate" to pick one of the listed candidate keys, or give your own deal with "partnerId", "give" (players on my roster) and "get" (players on that partner roster).
Each side has one or two players. Rank the suggestions best first. Give at most three. Use only the player ids and partner ids in the data.
--- DATA ---
League: keeper, 12 teams, week 4, 11 regular season weeks left, playoffs start week 15
Lineup slots: QB, RB, RB, WR, WR, TE, FLEX, FLEX, SUPER_FLEX, BN, BN, BN, BN, BN, BN, BN, BN, BN. Superflex: yes. Tight end premium: no. Points per reception: 1.
Columns: id | name | position | age | team | market value | projected points for the rest of the regular season (and per week) | points per week over the last three weeks played | lineup value (points my lineup loses if this player is removed).

MY TEAM (partnerId me): record 2-1, rank 4, points for 418.8, contention window 0.82
6904 | Jalen Hurts | QB | age 28 | PHI | market 6480 | projected 236.1 (21.5 a week) | last 3 weeks 23.6 a week | lineup value 17.6
3294 | Dak Prescott | QB | age 33 | DAL | market 5477 | projected 229.5 (20.9 a week) | last 3 weeks 16 a week | lineup value 13.2
11564 | Drake Maye | QB | age 24 | NE | market 8196 | projected 226.1 (20.6 a week) | last 3 weeks 23.8 a week | lineup value 9.9
6813 | Jonathan Taylor | RB | age 27 | IND | market 5007 | projected 214.3 (19.5 a week) | last 3 weeks 25 a week | lineup value 118.8
421 | Matthew Stafford | QB | age 38 | LAR | market 4574 | projected 201.4 (18.3 a week) | last 3 weeks 18.3 a week | lineup value 0
5870 | Daniel Jones | QB | age 29 | IND | market 4141 | projected 197.8 (18 a week) | last 3 weeks 24.7 a week | lineup value 0.3
7588 | Javonte Williams | RB | age 26 | DAL | market 4031 | projected 165.7 (15.1 a week) | last 3 weeks 19.2 a week | lineup value 72
8130 | Trey McBride | TE | age 26 | ARI | market 4880 | projected 164.7 (15 a week) | last 3 weeks 13.7 a week | lineup value 79
5872 | Deebo Samuel | WR | age 30 | SF | market 2700 | projected 121.5 (11 a week) | last 3 weeks 15 a week | lineup value 44.3
12474 | Woody Marks | RB | age 25 | HOU | market 3140 | projected 115.6 (10.5 a week) | last 3 weeks 3.7 a week | lineup value 26.8
11624 | Xavier Worthy | WR | age 23 | KC | market 3491 | projected 115.4 (10.5 a week) | last 3 weeks 0 a week | lineup value 31.9
6790 | D'Andre Swift | RB | age 27 | CHI | market 3660 | projected 109.9 (10 a week) | last 3 weeks 11.4 a week | lineup value 26
7002 | Juwan Johnson | TE | age 30 | NO | market 3115 | projected 100.7 (9.2 a week) | last 3 weeks 9 a week | lineup value 15
4039 | Cooper Kupp | WR | age 33 | SEA | market 2098 | projected 86.6 (7.9 a week) | last 3 weeks 8.2 a week | lineup value 10.2
3200 | Sterling Shepard | WR | age 33 | NYJ | market 1658 | projected 66 (6 a week) | last 3 weeks 0 a week | lineup value 0
12501 | Matthew Golden | WR | age 23 | GB | market 3530 | projected 51.9 (4.7 a week) | last 3 weeks 5.1 a week | lineup value 0
9757 | Kendre Miller | RB | age 24 | NO | market 2606 | projected 24.4 (2.2 a week) | last 3 weeks 2.5 a week | lineup value 0
2216 | Mike Evans | WR | age 33 | SF | market 3189 | projected 15.5 (1.4 a week) | last 3 weeks 11.3 a week | lineup value 6.1
12471 | DJ Giddens | RB | age 23 | IND | market 0 | projected 7.9 (0.7 a week) | last 3 weeks 1.5 a week | lineup value 0

PARTNER (partnerId 4): record 1-2, rank 9, points for 338.6, contention window 0.18
11563 | Bo Nix | QB | age 26 | DEN | market 6310 | projected 211.2 (19.2 a week) | last 3 weeks 16.8 a week | lineup value 97.2
7547 | Amon-Ra St. Brown | WR | age 26 | DET | market 5300 | projected 191.2 (17.4 a week) | last 3 weeks 22.8 a week | lineup value 122.8
5850 | Josh Jacobs | RB | age 28 | GB | market 4034 | projected 162.8 (14.8 a week) | last 3 weeks 13.6 a week | lineup value 106.1
9228 | Bryce Young | QB | age 25 | CAR | market 4627 | projected 158.6 (14.4 a week) | last 3 weeks 16.4 a week | lineup value 44.6
9997 | Zay Flowers | WR | age 26 | BAL | market 4182 | projected 146 (13.3 a week) | last 3 weeks 15.4 a week | lineup value 79.5
8126 | Wan'Dale Robinson | WR | age 25 | TEN | market 3410 | projected 125.3 (11.4 a week) | last 3 weeks 14.4 a week | lineup value 58.8
12529 | TreVeyon Henderson | RB | age 23 | NE | market 4326 | projected 121.4 (11 a week) | last 3 weeks 8.3 a week | lineup value 60.2
11559 | Michael Penix | QB | age 26 | ATL | market 3353 | projected 100.6 (9.1 a week) | last 3 weeks 11.7 a week | lineup value 0.2
8112 | Drake London | WR | age 25 | ATL | market 4859 | projected 93 (8.5 a week) | last 3 weeks 10 a week | lineup value 49.9
4033 | David Njoku | TE | age 30 | LAC | market 2851 | projected 69.6 (6.3 a week) | last 3 weeks 7.9 a week | lineup value 17.6
12490 | Bhayshul Tuten | RB | age 23 | JAX | market 4231 | projected 66.4 (6 a week) | last 3 weeks 8.2 a week | lineup value 6.1
8210 | Chig Okonkwo | TE | age 27 | WAS | market 3057 | projected 66.4 (6 a week) | last 3 weeks 8 a week | lineup value 7.3
12484 | Jayden Higgins | WR | age 23 | HOU | market 3438 | projected 60.5 (5.5 a week) | last 3 weeks 3.5 a week | lineup value 12.3
10444 | Cedric Tillman | WR | age 26 | NO | market 0 | projected 46.9 (4.3 a week) | last 3 weeks 10.7 a week | lineup value 4.3
12507 | Omarion Hampton | RB | age 23 | LAC | market 5148 | projected 45.4 (4.1 a week) | last 3 weeks 12.2 a week | lineup value 24.3
11600 | Ja'Tavion Sanders | TE | age 23 | CAR | market 0 | projected 40.4 (3.7 a week) | last 3 weeks 6.7 a week | lineup value 2.5
12469 | Dylan Sampson | RB | age 22 | CLE | market 3281 | projected 38.9 (3.5 a week) | last 3 weeks 9.5 a week | lineup value 0
12505 | Jalen Royals | WR | age 23 | KC | market 0 | projected 5.1 (0.5 a week) | last 3 weeks 0 a week | lineup value 0

PARTNER (partnerId 10): record 0-3, rank 11, points for 336.5, contention window 0
9488 | Jaxon Smith-Njigba | WR | age 24 | SEA | market 5789 | projected 203.9 (18.5 a week) | last 3 weeks 19.4 a week | lineup value 127.9
8150 | Kyren Williams | RB | age 26 | LAR | market 4552 | projected 151.6 (13.8 a week) | last 3 weeks 14.4 a week | lineup value 85.5
12526 | Tetairoa McMillan | WR | age 23 | CAR | market 4720 | projected 139.2 (12.7 a week) | last 3 weeks 11.9 a week | lineup value 66.7
7021 | Rico Dowdle | RB | age 28 | PIT | market 3263 | projected 135.4 (12.3 a week) | last 3 weeks 5.8 a week | lineup value 65.7
12518 | Tyler Warren | TE | age 24 | IND | market 4599 | projected 128.3 (11.7 a week) | last 3 weeks 11.2 a week | lineup value 67.5
9758 | C.J. Stroud | QB | age 25 | HOU | market 5132 | projected 116.5 (10.6 a week) | last 3 weeks 12.7 a week | lineup value 82
4983 | DJ Moore | WR | age 29 | BUF | market 3648 | projected 105.5 (9.6 a week) | last 3 weeks 10.3 a week | lineup value 35
6806 | J.K. Dobbins | RB | age 27 | DEN | market 3331 | projected 91.3 (8.3 a week) | last 3 weeks 15.2 a week | lineup value 40.1
9500 | Josh Downs | WR | age 25 | IND | market 3344 | projected 84.3 (7.7 a week) | last 3 weeks 6.6 a week | lineup value 14.8
4066 | Evan Engram | TE | age 32 | DEN | market 0 | projected 77.9 (7.1 a week) | last 3 weeks 2.4 a week | lineup value 14.7
4950 | Christian Kirk | WR | age 29 | SF | market 2203 | projected 57.5 (5.2 a week) | last 3 weeks 1.8 a week | lineup value 1
11586 | Blake Corum | RB | age 25 | LAR | market 3569 | projected 56 (5.1 a week) | last 3 weeks 6.1 a week | lineup value 10
6770 | Joe Burrow | QB | age 29 | CIN | market 6934 | projected 41.1 (3.7 a week) | last 3 weeks 6.6 a week | lineup value 25.7
8154 | Brian Robinson | RB | age 27 | ATL | market 3195 | projected 38.2 (3.5 a week) | last 3 weeks 3.3 a week | lineup value 0
12536 | Jaylin Noel | WR | age 24 | HOU | market 2761 | projected 35.7 (3.2 a week) | last 3 weeks 1 a week | lineup value 4.5
6111 | Jake Browning | QB | age 30 | LAC | market 0 | projected 35.1 (3.2 a week) | last 3 weeks 2.6 a week | lineup value 16
12541 | Dont'e Thornton | WR | age 23 | LV | market 0 | projected 34.2 (3.1 a week) | last 3 weeks 4.8 a week | lineup value 0
8188 | Tyquan Thornton | WR | age 26 | KC | market 0 | projected 30.8 (2.8 a week) | last 3 weeks 6 a week | lineup value 0
6869 | Adam Trautman | TE | age 29 | DEN | market 0 | projected 23.1 (2.1 a week) | last 3 weeks 0 a week | lineup value 0
10222 | Jayden Reed | WR | age 26 | GB | market 3364 | projected 7.1 (0.6 a week) | last 3 weeks 4.5 a week | lineup value 0
4137 | James Conner | RB | age 31 | ARI | market 2739 | projected 0 (0 a week) | last 3 weeks 11.1 a week | lineup value 0

PARTNER (partnerId 7): record 2-1, rank 7, points for 368, contention window 0.44
4034 | Christian McCaffrey | RB | age 30 | SF | market 4597 | projected 235.6 (21.4 a week) | last 3 weeks 23.3 a week | lineup value 160.7
9221 | Jahmyr Gibbs | RB | age 24 | DET | market 6366 | projected 205.4 (18.7 a week) | last 3 weeks 20.4 a week | lineup value 129.5
4943 | Sam Darnold | QB | age 29 | SEA | market 4781 | projected 193.4 (17.6 a week) | last 3 weeks 15.3 a week | lineup value 193.4
8144 | Chris Olave | WR | age 26 | NO | market 4415 | projected 147.9 (13.4 a week) | last 3 weeks 13.2 a week | lineup value 71.8
12512 | Quinshon Judkins | RB | age 22 | CLE | market 4394 | projected 142.9 (13 a week) | last 3 weeks 8.9 a week | lineup value 64.8
6819 | Michael Pittman | WR | age 29 | PIT | market 2989 | projected 129.1 (11.7 a week) | last 3 weeks 15.8 a week | lineup value 53.1
6801 | Tee Higgins | WR | age 27 | CIN | market 4116 | projected 114.3 (10.4 a week) | last 3 weeks 7.8 a week | lineup value 50.1
8121 | Romeo Doubs | WR | age 26 | NE | market 3167 | projected 104.8 (9.5 a week) | last 3 weeks 8.4 a week | lineup value 31.3
5022 | Dallas Goedert | TE | age 31 | PHI | market 3124 | projected 104 (9.5 a week) | last 3 weeks 7.2 a week | lineup value 25.9
12489 | RJ Harvey | RB | age 25 | DEN | market 3728 | projected 94.3 (8.6 a week) | last 3 weeks 5.3 a week | lineup value 22.7
12498 | Mason Taylor | TE | age 22 | NYJ | market 3673 | projected 82.4 (7.5 a week) | last 3 weeks 3.4 a week | lineup value 6.1
7600 | Pat Freiermuth | TE | age 27 | PIT | market 2347 | projected 61.7 (5.6 a week) | last 3 weeks 4.5 a week | lineup value 6.4
12483 | Jack Bech | WR | age 23 | LV | market 2720 | projected 43.3 (3.9 a week) | last 3 weeks 1.8 a week | lineup value 0
11623 | Jordan Whittington | WR | age 26 | LAR | market 0 | projected 41.9 (3.8 a week) | last 3 weeks 3.4 a week | lineup value 0
12509 | Tre' Harris | WR | age 24 | LAC | market 2832 | projected 32.3 (2.9 a week) | last 3 weeks 2.5 a week | lineup value 0
4018 | Joe Mixon | RB | age 30 | FA | market 2254 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0
6803 | Brandon Aiyuk | WR | age 28 | SF | market 2490 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0
7528 | Najee Harris | RB | age 28 | NYG | market 2342 | projected 0 (0 a week) | last 3 weeks 3.9 a week | lineup value 0

PARTNER (partnerId 2): record 1-2, rank 8, points for 392.7, contention window 0.31
7523 | Trevor Lawrence | QB | age 27 | JAX | market 5933 | projected 186.1 (16.9 a week) | last 3 weeks 15.1 a week | lineup value 40.8
7564 | Ja'Marr Chase | WR | age 26 | CIN | market 5776 | projected 163.6 (14.9 a week) | last 3 weeks 16.7 a week | lineup value 81.3
8137 | George Pickens | WR | age 25 | DAL | market 4762 | projected 153 (13.9 a week) | last 3 weeks 13.9 a week | lineup value 66.3
8155 | Breece Hall | RB | age 25 | NYJ | market 4262 | projected 145.6 (13.2 a week) | last 3 weeks 10.5 a week | lineup value 76.1
7543 | Travis Etienne | RB | age 27 | NO | market 3837 | projected 127.9 (11.6 a week) | last 3 weeks 15.7 a week | lineup value 59.1
11566 | Jayden Daniels | QB | age 25 | WAS | market 7211 | projected 110.6 (10.1 a week) | last 3 weeks 15.3 a week | lineup value 26.8
9754 | Quentin Johnston | WR | age 25 | LAC | market 3431 | projected 107.1 (9.7 a week) | last 3 weeks 10.3 a week | lineup value 31.7
2307 | Marcus Mariota | QB | age 32 | WAS | market 0 | projected 100.7 (9.2 a week) | last 3 weeks 7.4 a week | lineup value 35.2
1339 | Zach Ertz | TE | age 35 | PHI | market 0 | projected 100.3 (9.1 a week) | last 3 weeks 12.3 a week | lineup value 51
11631 | Brian Thomas | WR | age 24 | JAX | market 3928 | projected 92.7 (8.4 a week) | last 3 weeks 8.5 a week | lineup value 28.3
12545 | Tyler Shough | QB | age 27 | NO | market 4922 | projected 85.3 (7.8 a week) | last 3 weeks 0 a week | lineup value 15.7
11562 | Spencer Rattler | QB | age 26 | NO | market 0 | projected 82.7 (7.5 a week) | last 3 weeks 17.6 a week | lineup value 7.6
9508 | Tyjae Spears | RB | age 25 | TEN | market 2982 | projected 75.5 (6.9 a week) | last 3 weeks 0 a week | lineup value 8.2
10236 | Dalton Kincaid | TE | age 26 | BUF | market 3770 | projected 59.4 (5.4 a week) | last 3 weeks 13.4 a week | lineup value 10.1
9494 | Marvin Mims | WR | age 24 | DEN | market 2742 | projected 55 (5 a week) | last 3 weeks 4.7 a week | lineup value 0.1
11646 | Jalen Coker | WR | age 24 | CAR | market 3264 | projected 48.4 (4.4 a week) | last 3 weeks 0 a week | lineup value 10.8
11638 | Ricky Pearsall | WR | age 26 | SF | market 2209 | projected 45.2 (4.1 a week) | last 3 weeks 14.6 a week | lineup value 10.9
5995 | Justice Hill | RB | age 28 | BAL | market 2034 | projected 42.1 (3.8 a week) | last 3 weeks 4.3 a week | lineup value 2.2
12497 | Tory Horton | WR | age 23 | SEA | market 2786 | projected 34.1 (3.1 a week) | last 3 weeks 0 a week | lineup value 0
11575 | Ray Davis | RB | age 26 | BUF | market 2515 | projected 32.4 (2.9 a week) | last 3 weeks 1.2 a week | lineup value 0

CANDIDATE DEALS (from a rules-based finder; points are the finder projections for the rest of the season):
c1 | partnerId 4 | I give Matthew Stafford (421) | I get Josh Jacobs + Zay Flowers (5850,9997) | my points 107.5 | their points -140.6 | likelihood 0.86
c2 | partnerId 10 | I give Matthew Golden (12501) | I get Rico Dowdle + J.K. Dobbins (7021,6806) | my points 43.2 | their points -122.7 | likelihood 0.88
c3 | partnerId 4 | I give Matthew Golden + Matthew Stafford (12501,421) | I get Josh Jacobs + TreVeyon Henderson (5850,12529) | my points 80.8 | their points -136.9 | likelihood 0.74
c4 | partnerId 7 | I give Daniel Jones + Dak Prescott (5870,3294) | I get Christian McCaffrey + Chris Olave (4034,8144) | my points 154.1 | their points -37.1 | likelihood 0.91
c5 | partnerId 4 | I give Kendre Miller + Matthew Stafford (9757,421) | I get Josh Jacobs + Wan'Dale Robinson (5850,8126) | my points 87.3 | their points -117.2 | likelihood 0.93
c6 | partnerId 7 | I give Dak Prescott + Matthew Golden (3294,12501) | I get Christian McCaffrey + Michael Pittman (4034,6819) | my points 136.6 | their points -46.1 | likelihood 0.91
c7 | partnerId 7 | I give Matthew Stafford + Dak Prescott (421,3294) | I get Christian McCaffrey + Tee Higgins (4034,6801) | my points 128 | their points -25.5 | likelihood 0.91
c8 | partnerId 7 | I give Daniel Jones + Matthew Stafford (5870,421) | I get Chris Olave + Michael Pittman (8144,6819) | my points 61.3 | their points 20.4 | likelihood 0.67
c9 | partnerId 2 | I give Matthew Stafford + Daniel Jones (421,5870) | I get Breece Hall + Brian Thomas (8155,11631) | my points 52.8 | their points -78.3 | likelihood 0.68
c10 | partnerId 2 | I give Matthew Stafford + Sterling Shepard (421,3200) | I get Breece Hall + Quentin Johnston (8155,9754) | my points 48.8 | their points -83.9 | likelihood 0.64
c11 | partnerId 2 | I give Matthew Stafford + Kendre Miller (421,9757) | I get Breece Hall + Ricky Pearsall (8155,11638) | my points 42.4 | their points -74.7 | likelihood 0.66
c12 | partnerId 2 | I give Matthew Stafford + Matthew Golden (421,12501) | I get Breece Hall + Travis Etienne (8155,7543) | my points 45.8 | their points -154.6 | likelihood 0.58

Pick the best trades for my team.

=========== CASE 1180145866219773952-w7-r1 ===========
REPLY FILE: /Users/anik/workspace/chrome/sleeper/.eval-market/replies/suggest-v2/heldout1/1180145866219773952-w7-r1.json
--- SYSTEM ---
You advise one fantasy football manager on which trades to propose. You reason only from the facts you are given and never invent players, stats or values.

This is a dynasty or keeper league: market value, age and future seasons matter as well as this season. Contending teams should convert future value into points now, and rebuilding teams should do the reverse. Players past their position age curve lose value quickly; young players on the rise gain it.

A good suggestion raises my lineup points for the rest of the season, is something the partner would plausibly accept, and fits where each team stands in the standings.

Compare each player's recent weekly scoring with his weekly projection: a player scoring far above his projection is a sell-high, one far below with an unchanged role is a buy-low, and a player who has stopped scoring for several weeks may have lost his role. Prefer deals where the player I receive starts for me every week.

Reply with JSON only, no other text, in exactly this shape:
{"suggestions":[{"candidate":"c3","pitch":"one sentence"},{"partnerId":4,"give":["id"],"get":["id","id"],"pitch":"one sentence"}]}
Use "candidate" to pick one of the listed candidate keys, or give your own deal with "partnerId", "give" (players on my roster) and "get" (players on that partner roster).
Each side has one or two players. Rank the suggestions best first. Give at most three. Use only the player ids and partner ids in the data.
--- DATA ---
League: keeper, 12 teams, week 7, 8 regular season weeks left, playoffs start week 15
Lineup slots: QB, RB, RB, WR, WR, TE, FLEX, FLEX, SUPER_FLEX, BN, BN, BN, BN, BN, BN, BN, BN, BN. Superflex: yes. Tight end premium: no. Points per reception: 1.
Columns: id | name | position | age | team | market value | projected points for the rest of the regular season (and per week) | points per week over the last three weeks played | lineup value (points my lineup loses if this player is removed).

MY TEAM (partnerId me): record 2-4, rank 8, points for 807.3, contention window 0.31
4881 | Lamar Jackson | QB | age 29 | BAL | market 7783 | projected 157.2 (19.7 a week) | last 3 weeks 4.2 a week | lineup value 48.5
3257 | Jacoby Brissett | QB | age 33 | ARI | market 3160 | projected 131 (16.4 a week) | last 3 weeks 8.2 a week | lineup value 11.5
1373 | Geno Smith | QB | age 36 | NYJ | market 2783 | projected 126.6 (15.8 a week) | last 3 weeks 10.1 a week | lineup value 4
9493 | Puka Nacua | WR | age 25 | LAR | market 5684 | projected 124.3 (15.5 a week) | last 3 weeks 21.8 a week | lineup value 66.3
4866 | Saquon Barkley | RB | age 29 | PHI | market 4230 | projected 114.4 (14.3 a week) | last 3 weeks 14.6 a week | lineup value 62.2
1479 | Keenan Allen | WR | age 34 | IND | market 2143 | projected 85.3 (10.7 a week) | last 3 weeks 8.7 a week | lineup value 18.1
8110 | Jake Ferguson | TE | age 27 | DAL | market 3460 | projected 78.5 (9.8 a week) | last 3 weeks 17.7 a week | lineup value 12
8676 | Rashid Shaheed | WR | age 28 | SEA | market 2692 | projected 78.3 (9.8 a week) | last 3 weeks 12.5 a week | lineup value 4.7
7591 | Justin Fields | QB | age 27 | KC | market 1998 | projected 78.1 (9.8 a week) | last 3 weeks 21.3 a week | lineup value 29.1
7049 | Jauan Jennings | WR | age 29 | MIN | market 2831 | projected 76.8 (9.6 a week) | last 3 weeks 2.7 a week | lineup value 8.1
3214 | Hunter Henry | TE | age 31 | NE | market 3151 | projected 70.5 (8.8 a week) | last 3 weeks 8.1 a week | lineup value 2.8
4098 | Kareem Hunt | RB | age 30 | FA | market 1814 | projected 68.1 (8.5 a week) | last 3 weeks 9.6 a week | lineup value 10.3
5844 | T.J. Hockenson | TE | age 29 | MIN | market 2962 | projected 67.7 (8.5 a week) | last 3 weeks 5.9 a week | lineup value 0.5
11655 | Tyrone Tracy | RB | age 26 | NYG | market 2983 | projected 65 (8.1 a week) | last 3 weeks 0.2 a week | lineup value 16.6
5967 | Tony Pollard | RB | age 29 | TEN | market 3191 | projected 62.1 (7.8 a week) | last 3 weeks 10.7 a week | lineup value 7
11628 | Marvin Harrison | WR | age 24 | HOU | market 3922 | projected 50.6 (6.3 a week) | last 3 weeks 12.5 a week | lineup value 9.4
9504 | Kayshon Boutte | WR | age 24 | HOU | market 2961 | projected 45.9 (5.7 a week) | last 3 weeks 0 a week | lineup value 0
7607 | Michael Carter | RB | age 27 | TEN | market 0 | projected 38.2 (4.8 a week) | last 3 weeks 8.9 a week | lineup value 0
4037 | Chris Godwin | WR | age 30 | TB | market 3091 | projected 27 (3.4 a week) | last 3 weeks 3.7 a week | lineup value 3
8123 | Hassan Haskins | RB | age 26 | NE | market 0 | projected 8.8 (1.1 a week) | last 3 weeks 1.1 a week | lineup value 0
4663 | Austin Ekeler | RB | age 31 | WAS | market 0 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0

PARTNER (partnerId 12): record 5-1, rank 1, points for 883.3, contention window 1
6904 | Jalen Hurts | QB | age 28 | PHI | market 6520 | projected 169.6 (21.2 a week) | last 3 weeks 23.2 a week | lineup value 12.9
3294 | Dak Prescott | QB | age 33 | DAL | market 5522 | projected 164.7 (20.6 a week) | last 3 weeks 33.9 a week | lineup value 9.6
11564 | Drake Maye | QB | age 24 | NE | market 8283 | projected 164.3 (20.5 a week) | last 3 weeks 24.2 a week | lineup value 9.9
6813 | Jonathan Taylor | RB | age 27 | IND | market 5006 | projected 154.2 (19.3 a week) | last 3 weeks 23.3 a week | lineup value 96.1
421 | Matthew Stafford | QB | age 38 | LAR | market 4644 | projected 146.6 (18.3 a week) | last 3 weeks 25.4 a week | lineup value 0
5870 | Daniel Jones | QB | age 29 | IND | market 4150 | projected 138.5 (17.3 a week) | last 3 weeks 19.8 a week | lineup value 0
8130 | Trey McBride | TE | age 26 | ARI | market 4879 | projected 120 (15 a week) | last 3 weeks 14.2 a week | lineup value 120
7588 | Javonte Williams | RB | age 26 | DAL | market 4030 | projected 118.2 (14.8 a week) | last 3 weeks 18.1 a week | lineup value 59.3
12474 | Woody Marks | RB | age 25 | HOU | market 3140 | projected 97.7 (12.2 a week) | last 3 weeks 10.1 a week | lineup value 34.4
6790 | D'Andre Swift | RB | age 27 | CHI | market 3660 | projected 84.6 (10.6 a week) | last 3 weeks 13.8 a week | lineup value 26.9
5872 | Deebo Samuel | WR | age 30 | SF | market 2700 | projected 79.7 (10 a week) | last 3 weeks 16.4 a week | lineup value 32.7
11624 | Xavier Worthy | WR | age 23 | KC | market 3488 | projected 76.3 (9.5 a week) | last 3 weeks 12.9 a week | lineup value 23.6
4039 | Cooper Kupp | WR | age 33 | SEA | market 2096 | projected 53.9 (6.7 a week) | last 3 weeks 10.2 a week | lineup value 11.8
4454 | Kendrick Bourne | WR | age 31 | ARI | market 0 | projected 46.9 (5.9 a week) | last 3 weeks 6.4 a week | lineup value 7.1
11571 | Isaiah Davis | RB | age 24 | NYJ | market 0 | projected 46 (5.8 a week) | last 3 weeks 2.5 a week | lineup value 0
12501 | Matthew Golden | WR | age 23 | GB | market 3527 | projected 33.6 (4.2 a week) | last 3 weeks 8.2 a week | lineup value 0
2216 | Mike Evans | WR | age 33 | SF | market 3188 | projected 15.5 (1.9 a week) | last 3 weeks 0 a week | lineup value 5
9757 | Kendre Miller | RB | age 24 | NO | market 2610 | projected 6.7 (0.8 a week) | last 3 weeks 7.5 a week | lineup value 0
12471 | DJ Giddens | RB | age 23 | IND | market 0 | projected 2.2 (0.3 a week) | last 3 weeks 0.7 a week | lineup value 0

PARTNER (partnerId 9): record 4-2, rank 5, points for 709, contention window 0.69
6797 | Justin Herbert | QB | age 28 | LAC | market 6322 | projected 159.8 (20 a week) | last 3 weeks 18 a week | lineup value 159.8
6794 | Justin Jefferson | WR | age 27 | MIN | market 4816 | projected 124.5 (15.6 a week) | last 3 weeks 14 a week | lineup value 59.9
9224 | Chase Brown | RB | age 26 | CIN | market 4513 | projected 101.7 (12.7 a week) | last 3 weeks 10.3 a week | lineup value 54.6
11647 | Kimani Vidal | RB | age 25 | LAC | market 2813 | projected 93.3 (11.7 a week) | last 3 weeks 7.6 a week | lineup value 46.2
5045 | Courtland Sutton | WR | age 31 | DEN | market 3182 | projected 90.9 (11.4 a week) | last 3 weeks 13.2 a week | lineup value 31.5
9756 | Jordan Addison | WR | age 24 | MIN | market 3611 | projected 85.8 (10.7 a week) | last 3 weeks 10.2 a week | lineup value 21.3
8408 | Jordan Mason | RB | age 27 | MIN | market 3073 | projected 68.6 (8.6 a week) | last 3 weeks 7.6 a week | lineup value 24.1
5947 | Jakobi Meyers | WR | age 29 | JAX | market 3297 | projected 66.2 (8.3 a week) | last 3 weeks 7.4 a week | lineup value 16.1
11627 | Troy Franklin | WR | age 23 | DEN | market 3028 | projected 64.1 (8 a week) | last 3 weeks 7 a week | lineup value 5.7
11610 | Malik Washington | WR | age 25 | MIA | market 2748 | projected 58.8 (7.3 a week) | last 3 weeks 3.4 a week | lineup value 0
11603 | AJ Barner | TE | age 24 | SEA | market 3513 | projected 55.9 (7 a week) | last 3 weeks 3.4 a week | lineup value 13.2
3200 | Sterling Shepard | WR | age 33 | NYJ | market 1658 | projected 41.7 (5.2 a week) | last 3 weeks 3.7 a week | lineup value 0
11584 | Bucky Irving | RB | age 24 | TB | market 4304 | projected 29.6 (3.7 a week) | last 3 weeks 8.5 a week | lineup value 12
9480 | Brenton Strange | TE | age 25 | JAX | market 3624 | projected 29.2 (3.7 a week) | last 3 weeks 4.6 a week | lineup value 7.1
9482 | Michael Mayer | TE | age 25 | LV | market 0 | projected 29 (3.6 a week) | last 3 weeks 5.3 a week | lineup value 3.3
7670 | Joshua Palmer | WR | age 27 | BUF | market 0 | projected 14.6 (1.8 a week) | last 3 weeks 6 a week | lineup value 1.8
4981 | Calvin Ridley | WR | age 31 | TEN | market 2279 | projected 9.2 (1.2 a week) | last 3 weeks 8.6 a week | lineup value 0
12457 | Jaydon Blue | RB | age 22 | PHI | market 2760 | projected 7.3 (0.9 a week) | last 3 weeks 0.2 a week | lineup value 0
11576 | Braelon Allen | RB | age 22 | NYJ | market 3225 | projected 0 (0 a week) | last 3 weeks 0.2 a week | lineup value 0
11589 | Trey Benson | RB | age 24 | ARI | market 3171 | projected 0 (0 a week) | last 3 weeks 3.5 a week | lineup value 0
5849 | Kyler Murray | QB | age 29 | MIN | market 4796 | projected 0 (0 a week) | last 3 weeks 11.8 a week | lineup value 0

PARTNER (partnerId 7): record 4-2, rank 4, points for 807.8, contention window 0.82
4034 | Christian McCaffrey | RB | age 30 | SF | market 4598 | projected 164.9 (20.6 a week) | last 3 weeks 26 a week | lineup value 112.8
9221 | Jahmyr Gibbs | RB | age 24 | DET | market 6364 | projected 147.3 (18.4 a week) | last 3 weeks 14 a week | lineup value 94.1
4943 | Sam Darnold | QB | age 29 | SEA | market 4779 | projected 136.1 (17 a week) | last 3 weeks 25.9 a week | lineup value 136.1
8144 | Chris Olave | WR | age 26 | NO | market 4414 | projected 107.6 (13.5 a week) | last 3 weeks 12.6 a week | lineup value 54.3
12512 | Quinshon Judkins | RB | age 22 | CLE | market 4394 | projected 99.1 (12.4 a week) | last 3 weeks 13 a week | lineup value 43.7
6819 | Michael Pittman | WR | age 29 | PIT | market 2990 | projected 91.5 (11.4 a week) | last 3 weeks 11.3 a week | lineup value 38.1
8121 | Romeo Doubs | WR | age 26 | NE | market 3165 | projected 85.3 (10.7 a week) | last 3 weeks 13.4 a week | lineup value 27.5
6801 | Tee Higgins | WR | age 27 | CIN | market 4114 | projected 81.1 (10.1 a week) | last 3 weeks 9.5 a week | lineup value 39.8
5022 | Dallas Goedert | TE | age 31 | PHI | market 3125 | projected 76.3 (9.5 a week) | last 3 weeks 18.9 a week | lineup value 20.9
12489 | RJ Harvey | RB | age 25 | DEN | market 3727 | projected 69.7 (8.7 a week) | last 3 weeks 10.8 a week | lineup value 20
12498 | Mason Taylor | TE | age 22 | NYJ | market 3674 | projected 61.5 (7.7 a week) | last 3 weeks 10.1 a week | lineup value 6.1
7600 | Pat Freiermuth | TE | age 27 | PIT | market 2343 | projected 48.5 (6.1 a week) | last 3 weeks 0.7 a week | lineup value 6.4
11623 | Jordan Whittington | WR | age 26 | LAR | market 0 | projected 32.4 (4 a week) | last 3 weeks 4.1 a week | lineup value 0
12483 | Jack Bech | WR | age 23 | LV | market 2719 | projected 31.1 (3.9 a week) | last 3 weeks 1.9 a week | lineup value 0
12509 | Tre' Harris | WR | age 24 | LAC | market 2825 | projected 19.9 (2.5 a week) | last 3 weeks 2.2 a week | lineup value 0
4018 | Joe Mixon | RB | age 30 | FA | market 2254 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0
6803 | Brandon Aiyuk | WR | age 28 | SF | market 2490 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0
7528 | Najee Harris | RB | age 28 | NYG | market 2342 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0

PARTNER (partnerId 3): record 4-2, rank 3, points for 858.6, contention window 0.95
4984 | Josh Allen | QB | age 30 | BUF | market 7722 | projected 188 (23.5 a week) | last 3 weeks 23.9 a week | lineup value 69.7
4892 | Baker Mayfield | QB | age 31 | TB | market 4894 | projected 154.7 (19.3 a week) | last 3 weeks 25.7 a week | lineup value 33.1
96 | Aaron Rodgers | QB | age 42 | PIT | market 3136 | projected 138.6 (17.3 a week) | last 3 weeks 12.1 a week | lineup value 18.9
2133 | Davante Adams | WR | age 33 | LAR | market 3374 | projected 108.6 (13.6 a week) | last 3 weeks 12.4 a week | lineup value 28
7526 | Jaylen Waddle | WR | age 27 | DEN | market 3999 | projected 102.5 (12.8 a week) | last 3 weeks 15.5 a week | lineup value 24.6
12514 | Emeka Egbuka | WR | age 24 | TB | market 4517 | projected 102.4 (12.8 a week) | last 3 weeks 18.6 a week | lineup value 22.6
11620 | Rome Odunze | WR | age 24 | CHI | market 4056 | projected 89.2 (11.1 a week) | last 3 weeks 7.4 a week | lineup value 11.1
5859 | A.J. Brown | WR | age 29 | NE | market 4312 | projected 88.3 (11 a week) | last 3 weeks 8.7 a week | lineup value 17
8151 | Kenneth Walker | RB | age 25 | KC | market 4559 | projected 81.2 (10.2 a week) | last 3 weeks 8.8 a week | lineup value 10.9
7567 | Kenny Gainwell | RB | age 27 | TB | market 3126 | projected 79.7 (10 a week) | last 3 weeks 13.7 a week | lineup value 2.7
8122 | Zonovan Knight | RB | age 25 | ARI | market 0 | projected 73 (9.1 a week) | last 3 weeks 0 a week | lineup value 5.1
9753 | Zach Charbonnet | RB | age 25 | SEA | market 3187 | projected 68 (8.5 a week) | last 3 weeks 9.6 a week | lineup value 3.9
12485 | Tez Johnson | WR | age 24 | TB | market 0 | projected 58.2 (7.3 a week) | last 3 weeks 0 a week | lineup value 1
9506 | Sean Tucker | RB | age 24 | TB | market 2810 | projected 46.5 (5.8 a week) | last 3 weeks 3.8 a week | lineup value 0
6149 | Darius Slayton | WR | age 29 | IND | market 0 | projected 46.3 (5.8 a week) | last 3 weeks 1.4 a week | lineup value 0
7594 | Chuba Hubbard | RB | age 27 | CAR | market 3352 | projected 43.1 (5.4 a week) | last 3 weeks 3.3 a week | lineup value 2.3
7611 | Rhamondre Stevenson | RB | age 28 | NE | market 3348 | projected 40.4 (5.1 a week) | last 3 weeks 7.2 a week | lineup value 5.9
9484 | Tucker Kraft | TE | age 25 | GB | market 4150 | projected 36.8 (4.6 a week) | last 3 weeks 7.6 a week | lineup value 27.3
2505 | Darren Waller | TE | age 34 | CAR | market 1414 | projected 25.7 (3.2 a week) | last 3 weeks 9.3 a week | lineup value 16.3
11575 | Ray Davis | RB | age 26 | BUF | market 2506 | projected 17 (2.1 a week) | last 3 weeks 3.4 a week | lineup value 0
11783 | Ryan Flournoy | WR | age 26 | DAL | market 2499 | projected 16.4 (2 a week) | last 3 weeks 2.1 a week | lineup value 0

PARTNER (partnerId 11): record 5-1, rank 2, points for 807.9, contention window 1
4046 | Patrick Mahomes | QB | age 31 | KC | market 5687 | projected 177.6 (22.2 a week) | last 3 weeks 33.8 a week | lineup value 83.5
3163 | Jared Goff | QB | age 32 | DET | market 5254 | projected 153.2 (19.1 a week) | last 3 weeks 21.2 a week | lineup value 68.3
7569 | Nico Collins | WR | age 27 | HOU | market 4427 | projected 111.8 (14 a week) | last 3 weeks 9.3 a week | lineup value 40.7
7525 | DeVonta Smith | WR | age 27 | PHI | market 4157 | projected 101.3 (12.7 a week) | last 3 weeks 11.1 a week | lineup value 31.4
2449 | Stefon Diggs | WR | age 32 | WAS | market 2782 | projected 99.7 (12.5 a week) | last 3 weeks 15.5 a week | lineup value 25.5
11635 | Ladd McConkey | WR | age 24 | LAC | market 4597 | projected 97.8 (12.2 a week) | last 3 weeks 13.3 a week | lineup value 27.6
4217 | George Kittle | TE | age 33 | SF | market 3140 | projected 96.3 (12 a week) | last 3 weeks 0 a week | lineup value 26
8136 | Rachaad White | RB | age 27 | WAS | market 2757 | projected 88.7 (11.1 a week) | last 3 weeks 16.4 a week | lineup value 25.5
19 | Joe Flacco | QB | age 41 | CIN | market 0 | projected 84.9 (10.6 a week) | last 3 weeks 8 a week | lineup value 7.8
7553 | Kyle Pitts | TE | age 26 | ATL | market 3956 | projected 80.4 (10 a week) | last 3 weeks 7.6 a week | lineup value 6.2
5892 | David Montgomery | RB | age 29 | HOU | market 3464 | projected 78.2 (9.8 a week) | last 3 weeks 9.8 a week | lineup value 14.3
12533 | Jacory Croskey-Merritt | RB | age 25 | WAS | market 3247 | projected 68.7 (8.6 a week) | last 3 weeks 13.5 a week | lineup value 8.8
12506 | Harold Fannin | TE | age 22 | CLE | market 4701 | projected 68.1 (8.5 a week) | last 3 weeks 10.3 a week | lineup value 4.7
4035 | Alvin Kamara | RB | age 31 | NO | market 2508 | projected 60.6 (7.6 a week) | last 3 weeks 11.1 a week | lineup value 7.6
8132 | Tyler Allgeier | RB | age 26 | ARI | market 3206 | projected 58.2 (7.3 a week) | last 3 weeks 7.3 a week | lineup value 1.4
12455 | Brashard Smith | RB | age 23 | KC | market 2697 | projected 29.5 (3.7 a week) | last 3 weeks 6.1 a week | lineup value 0
8146 | Garrett Wilson | WR | age 26 | NYJ | market 4210 | projected 14.6 (1.8 a week) | last 3 weeks 14.5 a week | lineup value 3.4
12504 | Kaleb Johnson | RB | age 23 | GB | market 2730 | projected 10.9 (1.4 a week) | last 3 weeks 1.2 a week | lineup value 0
11643 | Jaylen Wright | RB | age 23 | MIA | market 2739 | projected 7.1 (0.9 a week) | last 3 weeks 0 a week | lineup value 0
11583 | Jonathon Brooks | RB | age 23 | CAR | market 3587 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0

CANDIDATE DEALS (from a rules-based finder; points are the finder projections for the rest of the season):
c1 | partnerId 12 | I give Saquon Barkley + Jake Ferguson (4866,8110) | I get Matthew Stafford + Matthew Golden (421,12501) | my points -67.4 | their points 53.6 | likelihood 0.67
c2 | partnerId 12 | I give Saquon Barkley + Hunter Henry (4866,3214) | I get Matthew Stafford (421) | my points -57.9 | their points 51.6 | likelihood 0.67
c3 | partnerId 12 | I give Saquon Barkley + Keenan Allen (4866,1479) | I get Matthew Stafford + Kendre Miller (421,9757) | my points -72.4 | their points 52.6 | likelihood 0.67
c4 | partnerId 9 | I give Jacoby Brissett + Saquon Barkley (3257,4866) | I get Malik Washington + Kyler Murray (11610,5849) | my points -73.3 | their points 124 | likelihood 0.62
c5 | partnerId 7 | I give Justin Fields (7591) | I get Joe Mixon (4018) | my points -29.1 | their points 48.2 | likelihood 0.63
c6 | partnerId 7 | I give Justin Fields + Keenan Allen (7591,1479) | I get Joe Mixon + Najee Harris (4018,7528) | my points -47.2 | their points 63.2 | likelihood 0.65
c7 | partnerId 12 | I give Saquon Barkley + T.J. Hockenson (4866,5844) | I get Daniel Jones + Matthew Stafford (5870,421) | my points -40.5 | their points 49.5 | likelihood 0.62
c8 | partnerId 9 | I give Geno Smith + Saquon Barkley (1373,4866) | I get Calvin Ridley + Kyler Murray (4981,5849) | my points -66.1 | their points 119.5 | likelihood 0.62
c9 | partnerId 3 | I give Hunter Henry + Keenan Allen (3214,1479) | I get Kenny Gainwell + Chuba Hubbard (7567,7594) | my points -10.7 | their points 30.2 | likelihood 0.67
c10 | partnerId 11 | I give Saquon Barkley + Kareem Hunt (4866,4098) | I get Tyler Allgeier + Harold Fannin (8132,12506) | my points -65.6 | their points 44.6 | likelihood 0.57
c11 | partnerId 11 | I give Saquon Barkley + Justin Fields (4866,7591) | I get Brashard Smith + Harold Fannin (12455,12506) | my points -87.1 | their points 47.1 | likelihood 0.6
c12 | partnerId 3 | I give Hunter Henry + T.J. Hockenson (3214,5844) | I get Darius Slayton + Chuba Hubbard (6149,7594) | my points -10.9 | their points 29.7 | likelihood 0.67

Pick the best trades for my team.

=========== CASE 1180172796326912000-w4-r4 ===========
REPLY FILE: /Users/anik/workspace/chrome/sleeper/.eval-market/replies/suggest-v2/heldout1/1180172796326912000-w4-r4.json
--- SYSTEM ---
You advise one fantasy football manager on which trades to propose. You reason only from the facts you are given and never invent players, stats or values.

This is a dynasty or keeper league: market value, age and future seasons matter as well as this season. Contending teams should convert future value into points now, and rebuilding teams should do the reverse. Players past their position age curve lose value quickly; young players on the rise gain it.

A good suggestion raises my lineup points for the rest of the season, is something the partner would plausibly accept, and fits where each team stands in the standings.

Compare each player's recent weekly scoring with his weekly projection: a player scoring far above his projection is a sell-high, one far below with an unchanged role is a buy-low, and a player who has stopped scoring for several weeks may have lost his role. Prefer deals where the player I receive starts for me every week.

Reply with JSON only, no other text, in exactly this shape:
{"suggestions":[{"candidate":"c3","pitch":"one sentence"},{"partnerId":4,"give":["id"],"get":["id","id"],"pitch":"one sentence"}]}
Use "candidate" to pick one of the listed candidate keys, or give your own deal with "partnerId", "give" (players on my roster) and "get" (players on that partner roster).
Each side has one or two players. Rank the suggestions best first. Give at most three. Use only the player ids and partner ids in the data.
--- DATA ---
League: dynasty, 12 teams, week 4, 11 regular season weeks left, playoffs start week 15
Lineup slots: QB, RB, RB, WR, WR, TE, FLEX, FLEX, FLEX, SUPER_FLEX, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN. Superflex: yes. Tight end premium: yes. Points per reception: 1.
Columns: id | name | position | age | team | market value | projected points for the rest of the regular season (and per week) | points per week over the last three weeks played | lineup value (points my lineup loses if this player is removed).

MY TEAM (partnerId me): record 3-0, rank 2, points for 506.5, contention window 1
6904 | Jalen Hurts | QB | age 28 | PHI | market 6587 | projected 239.2 (21.7 a week) | last 3 weeks 23.3 a week | lineup value 183.1
4034 | Christian McCaffrey | RB | age 30 | SF | market 4586 | projected 234.2 (21.3 a week) | last 3 weeks 23.3 a week | lineup value 125.4
9509 | Bijan Robinson | RB | age 24 | ATL | market 6359 | projected 202.5 (18.4 a week) | last 3 weeks 20.1 a week | lineup value 93.4
8130 | Trey McBride | TE | age 26 | ARI | market 4887 | projected 199.1 (18.1 a week) | last 3 weeks 16.6 a week | lineup value 87.1
12518 | Tyler Warren | TE | age 24 | IND | market 4582 | projected 152.1 (13.8 a week) | last 3 weeks 13.5 a week | lineup value 40.3
5045 | Courtland Sutton | WR | age 31 | DEN | market 3184 | projected 130.2 (11.8 a week) | last 3 weeks 14.5 a week | lineup value 17.6
5859 | A.J. Brown | WR | age 29 | NE | market 4318 | projected 129.9 (11.8 a week) | last 3 weeks 10.8 a week | lineup value 28.6
5872 | Deebo Samuel | WR | age 30 | SF | market 2702 | projected 121.1 (11 a week) | last 3 weeks 15 a week | lineup value 19.8
11624 | Xavier Worthy | WR | age 23 | KC | market 3492 | projected 115.1 (10.5 a week) | last 3 weeks 0 a week | lineup value 8.1
12474 | Woody Marks | RB | age 25 | HOU | market 3127 | projected 114.8 (10.4 a week) | last 3 weeks 3.7 a week | lineup value 11.1
12493 | Oronde Gadsden | TE | age 23 | LAC | market 4196 | projected 109.4 (9.9 a week) | last 3 weeks 4 a week | lineup value 14.2
7049 | Jauan Jennings | WR | age 29 | MIN | market 2831 | projected 101.7 (9.2 a week) | last 3 weeks 7.8 a week | lineup value 3.3
8408 | Jordan Mason | RB | age 27 | MIN | market 3059 | projected 99.3 (9 a week) | last 3 weeks 12.6 a week | lineup value 10
12489 | RJ Harvey | RB | age 25 | DEN | market 3716 | projected 93.7 (8.5 a week) | last 3 weeks 5.3 a week | lineup value 4.8
8142 | Alec Pierce | WR | age 26 | IND | market 3412 | projected 74.5 (6.8 a week) | last 3 weeks 8.7 a week | lineup value 0.7
4454 | Kendrick Bourne | WR | age 31 | ARI | market 0 | projected 73 (6.6 a week) | last 3 weeks 4.7 a week | lineup value 2.1
9487 | Parker Washington | WR | age 24 | JAX | market 4010 | projected 70.7 (6.4 a week) | last 3 weeks 0 a week | lineup value 0
3161 | Carson Wentz | QB | age 33 | MIN | market 0 | projected 68.6 (6.2 a week) | last 3 weeks 6.4 a week | lineup value 23
12490 | Bhayshul Tuten | RB | age 23 | JAX | market 4215 | projected 65.9 (6 a week) | last 3 weeks 8.2 a week | lineup value 0
7594 | Chuba Hubbard | RB | age 27 | CAR | market 3342 | projected 56.3 (5.1 a week) | last 3 weeks 15.4 a week | lineup value 0.8
12455 | Brashard Smith | RB | age 23 | KC | market 2690 | projected 38.1 (3.5 a week) | last 3 weeks 0.5 a week | lineup value 0
12497 | Tory Horton | WR | age 23 | SEA | market 2789 | projected 34.1 (3.1 a week) | last 3 weeks 9.8 a week | lineup value 0
4972 | Mason Rudolph | QB | age 31 | PIT | market 0 | projected 17.9 (1.6 a week) | last 3 weeks 0.2 a week | lineup value 7.5
12471 | DJ Giddens | RB | age 23 | IND | market 0 | projected 7.8 (0.7 a week) | last 3 weeks 1.5 a week | lineup value 0
12542 | Efton Chism | WR | age 24 | NE | market 0 | projected 3.2 (0.3 a week) | last 3 weeks 0 a week | lineup value 0
10235 | Roschon Johnson | RB | age 25 | CHI | market 0 | projected 2.4 (0.2 a week) | last 3 weeks 0 a week | lineup value 0
1234 | Russell Wilson | QB | age 37 | FA | market 2405 | projected 0 (0 a week) | last 3 weeks 17.8 a week | lineup value 0

PARTNER (partnerId 10): record 2-1, rank 6, points for 396, contention window 0.56
11563 | Bo Nix | QB | age 26 | DEN | market 6475 | projected 215.9 (19.6 a week) | last 3 weeks 17.8 a week | lineup value 74.6
7588 | Javonte Williams | RB | age 26 | DAL | market 4012 | projected 164.4 (14.9 a week) | last 3 weeks 19.2 a week | lineup value 94.8
5850 | Josh Jacobs | RB | age 28 | GB | market 4024 | projected 161.9 (14.7 a week) | last 3 weeks 13.3 a week | lineup value 98
12508 | Jaxson Dart | QB | age 23 | NYG | market 7075 | projected 161.5 (14.7 a week) | last 3 weeks 0 a week | lineup value 45.3
6794 | Justin Jefferson | WR | age 27 | MIN | market 4825 | projected 153.8 (14 a week) | last 3 weeks 12.8 a week | lineup value 82.2
7021 | Rico Dowdle | RB | age 28 | PIT | market 3239 | projected 134 (12.2 a week) | last 3 weeks 5.8 a week | lineup value 65.6
11604 | Brock Bowers | TE | age 23 | LV | market 5538 | projected 132.3 (12 a week) | last 3 weeks 13.6 a week | lineup value 104.2
10229 | Rashee Rice | WR | age 26 | KC | market 4420 | projected 122 (11.1 a week) | last 3 weeks 0 a week | lineup value 69.8
19 | Joe Flacco | QB | age 41 | CIN | market 0 | projected 120.8 (11 a week) | last 3 weeks 10.9 a week | lineup value 1.3
8112 | Drake London | WR | age 25 | ATL | market 4866 | projected 92.8 (8.4 a week) | last 3 weeks 10 a week | lineup value 49.6
8183 | Brock Purdy | QB | age 26 | SF | market 6144 | projected 88.8 (8.1 a week) | last 3 weeks 7.6 a week | lineup value 16.3
10859 | Sam LaPorta | TE | age 25 | DET | market 4250 | projected 86.2 (7.8 a week) | last 3 weeks 11.1 a week | lineup value 50.3
1166 | Kirk Cousins | QB | age 38 | LV | market 2468 | projected 67.9 (6.2 a week) | last 3 weeks 0.4 a week | lineup value 9
8125 | Calvin Austin | WR | age 27 | NYG | market 0 | projected 65.5 (6 a week) | last 3 weeks 10.9 a week | lineup value 9.6
11626 | Xavier Legette | WR | age 25 | CAR | market 0 | projected 61.9 (5.6 a week) | last 3 weeks 1.6 a week | lineup value 6.1
9506 | Sean Tucker | RB | age 24 | TB | market 2774 | projected 59.5 (5.4 a week) | last 3 weeks 0.1 a week | lineup value 7.3
6039 | Ty Johnson | RB | age 29 | BUF | market 0 | projected 51.7 (4.7 a week) | last 3 weeks 2 a week | lineup value 0
11584 | Bucky Irving | RB | age 24 | TB | market 4291 | projected 48.1 (4.4 a week) | last 3 weeks 15.5 a week | lineup value 25.5
12495 | Ollie Gordon | RB | age 22 | MIA | market 0 | projected 47.2 (4.3 a week) | last 3 weeks 4.5 a week | lineup value 0.9
11834 | Devaughn Vele | WR | age 28 | NO | market 2272 | projected 44.3 (4 a week) | last 3 weeks 3.2 a week | lineup value 2.2
11625 | Adonai Mitchell | WR | age 24 | NYJ | market 2991 | projected 41 (3.7 a week) | last 3 weeks 2.7 a week | lineup value 2.2
12492 | Pat Bryant | WR | age 23 | DEN | market 3013 | projected 40.3 (3.7 a week) | last 3 weeks 1.3 a week | lineup value 0

PARTNER (partnerId 3): record 0-3, rank 12, points for 317.9, contention window 0
4892 | Baker Mayfield | QB | age 31 | TB | market 5015 | projected 224.3 (20.4 a week) | last 3 weeks 23.4 a week | lineup value 176.5
9226 | De'Von Achane | RB | age 25 | MIA | market 4978 | projected 214.4 (19.5 a week) | last 3 weeks 19.6 a week | lineup value 172.5
12526 | Tetairoa McMillan | WR | age 23 | CAR | market 4726 | projected 138.8 (12.6 a week) | last 3 weeks 11.9 a week | lineup value 95.8
1466 | Travis Kelce | TE | age 37 | KC | market 2867 | projected 132.2 (12 a week) | last 3 weeks 11.5 a week | lineup value 87.6
4217 | George Kittle | TE | age 33 | SF | market 3145 | projected 112.3 (10.2 a week) | last 3 weeks 4.8 a week | lineup value 76.7
11565 | J.J. McCarthy | QB | age 23 | NYG | market 3865 | projected 94.6 (8.6 a week) | last 3 weeks 10 a week | lineup value 52.8
5848 | Marquise Brown | WR | age 29 | PHI | market 0 | projected 67.8 (6.2 a week) | last 3 weeks 12 a week | lineup value 23.2
11586 | Blake Corum | RB | age 25 | LAR | market 3541 | projected 55.4 (5 a week) | last 3 weeks 6.1 a week | lineup value 14.4
8143 | Jerome Ford | RB | age 27 | ARI | market 0 | projected 51.7 (4.7 a week) | last 3 weeks 5.6 a week | lineup value 10.2
11600 | Ja'Tavion Sanders | TE | age 23 | CAR | market 0 | projected 49.3 (4.5 a week) | last 3 weeks 8.6 a week | lineup value 13.7
12524 | Shedeur Sanders | QB | age 24 | CLE | market 3691 | projected 47.1 (4.3 a week) | last 3 weeks 0 a week | lineup value 9.6
4381 | Taysom Hill | TE | age 35 | FA | market 1531 | projected 46.8 (4.3 a week) | last 3 weeks 0 a week | lineup value 6.3
5995 | Justice Hill | RB | age 28 | BAL | market 2014 | projected 41.5 (3.8 a week) | last 3 weeks 4 a week | lineup value 11.2
5927 | Terry McLaurin | WR | age 31 | WAS | market 3395 | projected 36.2 (3.3 a week) | last 3 weeks 8.3 a week | lineup value 21.9
12535 | Isaac TeSlaa | WR | age 24 | DET | market 2790 | projected 36.1 (3.3 a week) | last 3 weeks 4.1 a week | lineup value 5.9
7670 | Joshua Palmer | WR | age 27 | BUF | market 0 | projected 34.8 (3.2 a week) | last 3 weeks 6.4 a week | lineup value 12.9
10871 | Luke Schoonmaker | TE | age 28 | DAL | market 0 | projected 21.9 (2 a week) | last 3 weeks 0.7 a week | lineup value 0.7
1689 | Adam Thielen | WR | age 35 | FA | market 2196 | projected 17.8 (1.6 a week) | last 3 weeks 2.2 a week | lineup value 0
5096 | Ray-Ray McCloud | WR | age 29 | FA | market 0 | projected 17.8 (1.6 a week) | last 3 weeks 4 a week | lineup value 3.7
12505 | Jalen Royals | WR | age 23 | KC | market 0 | projected 5.1 (0.5 a week) | last 3 weeks 0 a week | lineup value 0.3
7608 | Khalil Herbert | RB | age 28 | ATL | market 0 | projected 0.8 (0.1 a week) | last 3 weeks 0 a week | lineup value 0
11573 | Frank Gore | RB | age 24 | BUF | market 0 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0

PARTNER (partnerId 2): record 1-2, rank 9, points for 371, contention window 0.18
96 | Aaron Rodgers | QB | age 42 | PIT | market 3208 | projected 178.4 (16.2 a week) | last 3 weeks 21.6 a week | lineup value 105
7591 | Justin Fields | QB | age 27 | KC | market 2011 | projected 141.1 (12.8 a week) | last 3 weeks 11.5 a week | lineup value 78.9
8228 | Jaylen Warren | RB | age 27 | PIT | market 3526 | projected 121.5 (11 a week) | last 3 weeks 14.8 a week | lineup value 49.6
12529 | TreVeyon Henderson | RB | age 23 | NE | market 4320 | projected 120.8 (11 a week) | last 3 weeks 8.3 a week | lineup value 41.7
9754 | Quentin Johnston | WR | age 25 | LAC | market 3420 | projected 106.3 (9.7 a week) | last 3 weeks 18.6 a week | lineup value 35.2
5844 | T.J. Hockenson | TE | age 29 | MIN | market 2962 | projected 103.6 (9.4 a week) | last 3 weeks 9 a week | lineup value 23.5
5967 | Tony Pollard | RB | age 29 | TEN | market 3185 | projected 97.5 (8.9 a week) | last 3 weeks 10.3 a week | lineup value 18.6
11603 | AJ Barner | TE | age 24 | SEA | market 3518 | projected 86.9 (7.9 a week) | last 3 weeks 5.8 a week | lineup value 10
11628 | Marvin Harrison | WR | age 24 | HOU | market 3927 | projected 86.1 (7.8 a week) | last 3 weeks 10.1 a week | lineup value 29.8
9500 | Josh Downs | WR | age 25 | IND | market 3344 | projected 84 (7.6 a week) | last 3 weeks 6.6 a week | lineup value 14.8
4199 | Aaron Jones | RB | age 31 | MIN | market 2782 | projected 74.8 (6.8 a week) | last 3 weeks 6 a week | lineup value 18.7
4988 | Nick Chubb | RB | age 30 | FA | market 1796 | projected 73.4 (6.7 a week) | last 3 weeks 9.4 a week | lineup value 5.9
7600 | Pat Freiermuth | TE | age 27 | PIT | market 2346 | projected 73.3 (6.7 a week) | last 3 weeks 5.7 a week | lineup value 1.2
8167 | Christian Watson | WR | age 27 | GB | market 3665 | projected 60.5 (5.5 a week) | last 3 weeks 0 a week | lineup value 8.8
827 | Tyrod Taylor | QB | age 37 | GB | market 0 | projected 54.2 (4.9 a week) | last 3 weeks 7.2 a week | lineup value 36.8
11646 | Jalen Coker | WR | age 24 | CAR | market 3266 | projected 48.3 (4.4 a week) | last 3 weeks 0 a week | lineup value 0
9482 | Michael Mayer | TE | age 25 | LV | market 0 | projected 43.9 (4 a week) | last 3 weeks 4.6 a week | lineup value 5
12503 | Isaiah Bond | WR | age 22 | CLE | market 0 | projected 42.1 (3.8 a week) | last 3 weeks 2.5 a week | lineup value 3.2
11623 | Jordan Whittington | WR | age 26 | LAR | market 0 | projected 41.8 (3.8 a week) | last 3 weeks 3.4 a week | lineup value 0
8147 | John Metchie | WR | age 26 | CAR | market 0 | projected 40 (3.6 a week) | last 3 weeks 0.9 a week | lineup value 2.9
5849 | Kyler Murray | QB | age 29 | MIN | market 4888 | projected 39.8 (3.6 a week) | last 3 weeks 18.5 a week | lineup value 15.6
7828 | Noah Gray | TE | age 27 | KC | market 0 | projected 30.5 (2.8 a week) | last 3 weeks 3.2 a week | lineup value 0

PARTNER (partnerId 6): record 2-1, rank 4, points for 431.7, contention window 0.82
4943 | Sam Darnold | QB | age 29 | SEA | market 4914 | projected 198.1 (18 a week) | last 3 weeks 16 a week | lineup value 47.5
11560 | Caleb Williams | QB | age 24 | CHI | market 7684 | projected 190.5 (17.3 a week) | last 3 weeks 28.4 a week | lineup value 45.3
9228 | Bryce Young | QB | age 25 | CAR | market 4759 | projected 162.5 (14.8 a week) | last 3 weeks 18.4 a week | lineup value 14.2
8126 | Wan'Dale Robinson | WR | age 25 | TEN | market 3411 | projected 124.9 (11.4 a week) | last 3 weeks 14.4 a week | lineup value 67
8151 | Kenneth Walker | RB | age 25 | KC | market 4532 | projected 117.9 (10.7 a week) | last 3 weeks 14.1 a week | lineup value 60
11620 | Rome Odunze | WR | age 24 | CHI | market 4057 | projected 116.6 (10.6 a week) | last 3 weeks 20.9 a week | lineup value 64.1
12506 | Harold Fannin | TE | age 22 | CLE | market 4703 | projected 114.9 (10.4 a week) | last 3 weeks 12.1 a week | lineup value 62.8
12533 | Jacory Croskey-Merritt | RB | age 25 | WAS | market 3235 | projected 99.4 (9 a week) | last 3 weeks 8.7 a week | lineup value 44.9
9753 | Zach Charbonnet | RB | age 25 | SEA | market 3172 | projected 99 (9 a week) | last 3 weeks 3.9 a week | lineup value 41.1
11637 | Keon Coleman | WR | age 23 | BUF | market 2736 | projected 70.8 (6.4 a week) | last 3 weeks 11.9 a week | lineup value 26.8
9484 | Tucker Kraft | TE | age 25 | GB | market 4154 | projected 69.8 (6.3 a week) | last 3 weeks 15.2 a week | lineup value 35.4
8205 | Isiah Pacheco | RB | age 27 | DET | market 2541 | projected 53.9 (4.9 a week) | last 3 weeks 4.8 a week | lineup value 19.2
12641 | Jaylin Lane | WR | age 24 | WAS | market 0 | projected 48.3 (4.4 a week) | last 3 weeks 3.4 a week | lineup value 1.2
12521 | Elijah Arroyo | TE | age 23 | SEA | market 0 | projected 46.7 (4.2 a week) | last 3 weeks 2.8 a week | lineup value 4.5
11638 | Ricky Pearsall | WR | age 26 | SF | market 2210 | projected 45.1 (4.1 a week) | last 3 weeks 14.6 a week | lineup value 22.8
12483 | Jack Bech | WR | age 23 | LV | market 2722 | projected 43.2 (3.9 a week) | last 3 weeks 1.8 a week | lineup value 4.7
11650 | Luke McCaffrey | WR | age 25 | WAS | market 0 | projected 34.6 (3.1 a week) | last 3 weeks 6.5 a week | lineup value 1.2
8188 | Tyquan Thornton | WR | age 26 | KC | market 0 | projected 30.7 (2.8 a week) | last 3 weeks 10.7 a week | lineup value 0
12544 | LeQuint Allen | RB | age 22 | JAX | market 0 | projected 26.7 (2.4 a week) | last 3 weeks 1.8 a week | lineup value 0
11589 | Trey Benson | RB | age 24 | ARI | market 3149 | projected 13.9 (1.3 a week) | last 3 weeks 8.3 a week | lineup value 3.8
11643 | Jaylen Wright | RB | age 23 | MIA | market 2687 | projected 7.9 (0.7 a week) | last 3 weeks 0 a week | lineup value 0
11576 | Braelon Allen | RB | age 22 | NYJ | market 3195 | projected 3.8 (0.3 a week) | last 3 weeks 4.9 a week | lineup value 0

PARTNER (partnerId 9): record 1-2, rank 7, points for 389.7, contention window 0.44
421 | Matthew Stafford | QB | age 38 | LAR | market 4709 | projected 206.6 (18.8 a week) | last 3 weeks 18.3 a week | lineup value 34
6768 | Tua Tagovailoa | QB | age 28 | ATL | market 3341 | projected 189.8 (17.3 a week) | last 3 weeks 17.6 a week | lineup value 24.9
1373 | Geno Smith | QB | age 36 | NYJ | market 2889 | projected 188.7 (17.2 a week) | last 3 weeks 20.6 a week | lineup value 16.1
3198 | Derrick Henry | RB | age 32 | BAL | market 4124 | projected 167.8 (15.3 a week) | last 3 weeks 13.7 a week | lineup value 98
2133 | Davante Adams | WR | age 33 | LAR | market 3377 | projected 151.4 (13.8 a week) | last 3 weeks 15.4 a week | lineup value 66
7526 | Jaylen Waddle | WR | age 27 | DEN | market 4006 | projected 141.1 (12.8 a week) | last 3 weeks 13.2 a week | lineup value 58.2
8134 | Khalil Shakir | WR | age 26 | BUF | market 3140 | projected 118.7 (10.8 a week) | last 3 weeks 9.7 a week | lineup value 34.7
5892 | David Montgomery | RB | age 29 | HOU | market 3454 | projected 113.1 (10.3 a week) | last 3 weeks 16.9 a week | lineup value 44.2
5001 | Dalton Schultz | TE | age 30 | HOU | market 3158 | projected 109.5 (10 a week) | last 3 weeks 8.7 a week | lineup value 40.8
4144 | Jonnu Smith | TE | age 31 | GB | market 0 | projected 92.6 (8.4 a week) | last 3 weeks 9.8 a week | lineup value 16.4
7090 | Darnell Mooney | WR | age 28 | NYG | market 2371 | projected 87.7 (8 a week) | last 3 weeks 4.1 a week | lineup value 14.7
12499 | Elic Ayomanor | WR | age 23 | TEN | market 2915 | projected 81.3 (7.4 a week) | last 3 weeks 10.9 a week | lineup value 11.5
12519 | Luther Burden | WR | age 22 | CHI | market 4863 | projected 54.3 (4.9 a week) | last 3 weeks 7.3 a week | lineup value 0
1426 | DeAndre Hopkins | WR | age 33 | FA | market 1503 | projected 50.4 (4.6 a week) | last 3 weeks 9.4 a week | lineup value 0.5
6826 | Cole Kmet | TE | age 27 | CHI | market 0 | projected 48.1 (4.4 a week) | last 3 weeks 6.3 a week | lineup value 0
4037 | Chris Godwin | WR | age 30 | TB | market 3090 | projected 47.6 (4.3 a week) | last 3 weeks 0 a week | lineup value 3.5
12476 | Devin Neal | RB | age 23 | WAS | market 2791 | projected 47.4 (4.3 a week) | last 3 weeks 0.3 a week | lineup value 9.7
10444 | Cedric Tillman | WR | age 26 | NO | market 0 | projected 46.7 (4.2 a week) | last 3 weeks 10.7 a week | lineup value 0.3
11199 | Emari Demercado | RB | age 27 | DAL | market 0 | projected 43.9 (4 a week) | last 3 weeks 0 a week | lineup value 2
8917 | KaVontae Turpin | WR | age 30 | DAL | market 1160 | projected 42.4 (3.9 a week) | last 3 weeks 8 a week | lineup value 0
2749 | Raheem Mostert | RB | age 33 | FA | market 1170 | projected 36.9 (3.4 a week) | last 3 weeks 0 a week | lineup value 4.3
8117 | Jalen Tolbert | WR | age 27 | MIA | market 0 | projected 36.4 (3.3 a week) | last 3 weeks 4 a week | lineup value 0.9

CANDIDATE DEALS (from a rules-based finder; points are the finder projections for the rest of the season):
c1 | partnerId 10 | I give Kendrick Bourne (4454) | I get Joe Flacco (19) | my points 25.7 | their points 14.6 | likelihood 0.76
c2 | partnerId 3 | I give Russell Wilson + Bhayshul Tuten (1234,12490) | I get J.J. McCarthy + George Kittle (11565,4217) | my points 68.8 | their points -110.1 | likelihood 0.92
c3 | partnerId 3 | I give Bhayshul Tuten (12490) | I get J.J. McCarthy + Travis Kelce (11565,1466) | my points 54.3 | their points -118.5 | likelihood 0.92
c4 | partnerId 2 | I give Brashard Smith + Bhayshul Tuten (12455,12490) | I get Aaron Rodgers + Marvin Harrison (96,11628) | my points 69.5 | their points -135.8 | likelihood 0.85
c5 | partnerId 2 | I give Russell Wilson (1234) | I get Justin Fields + Tyrod Taylor (7591,827) | my points 50 | their points -115.7 | likelihood 0.93
c6 | partnerId 6 | I give Woody Marks + Tyler Warren (12474,12518) | I get Sam Darnold (4943) | my points 18.7 | their points 92.1 | likelihood 0.68
c7 | partnerId 6 | I give Xavier Worthy + Tyler Warren (11624,12518) | I get Sam Darnold + Jaylen Wright (4943,11643) | my points 20.4 | their points 85.8 | likelihood 0.69
c8 | partnerId 2 | I give Russell Wilson + Bhayshul Tuten (1234,12490) | I get Aaron Rodgers + Jaylen Warren (96,8228) | my points 78.1 | their points -158.2 | likelihood 0.93
c9 | partnerId 6 | I give Xavier Worthy + A.J. Brown (11624,5859) | I get Bryce Young (9228) | my points 10 | their points 99.7 | likelihood 0.65
c10 | partnerId 6 | I give Woody Marks + A.J. Brown (12474,5859) | I get Bryce Young + Jaylen Wright (9228,11643) | my points 5.7 | their points 106 | likelihood 0.64
c11 | partnerId 9 | I give Chuba Hubbard + Jauan Jennings (7594,7049) | I get Geno Smith (1373) | my points 55.8 | their points 22.6 | likelihood 0.91
c12 | partnerId 9 | I give Jauan Jennings + Parker Washington (7049,9487) | I get Geno Smith + Davante Adams (1373,2133) | my points 84.5 | their points -47.3 | likelihood 0.89

Pick the best trades for my team.
