You are answering fantasy football trade-advice cases. For each case below, follow the SYSTEM text, read the DATA, and write your JSON answer to the reply file named for that case.
Rules: write only the JSON object (no markdown fence, no commentary) to each reply file. Do not read any other file on disk. Do not look at any directory named truth or any file outside the reply paths. Work each case independently.

=========== CASE 1180663903803871232-w7-r4 ===========
REPLY FILE: /Users/anik/workspace/chrome/sleeper/.eval-market/replies/suggest-v2/heldout1/1180663903803871232-w7-r4.json
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
League: keeper, 14 teams, week 7, 8 regular season weeks left, playoffs start week 15
Lineup slots: QB, RB, WR, WR, TE, FLEX, FLEX, K, DEF, BN, BN, BN, BN, BN, BN, BN, BN. Superflex: no. Tight end premium: no. Points per reception: 1.
Columns: id | name | position | age | team | market value | projected points for the rest of the regular season (and per week) | points per week over the last three weeks played | lineup value (points my lineup loses if this player is removed).

MY TEAM (partnerId me): record 2-4, rank 9, points for 780.6, contention window 0.34
11560 | Caleb Williams | QB | age 24 | CHI | market 5809 | projected 166.8 (20.8 a week) | last 3 weeks 13.4 a week | lineup value 166.7
6813 | Jonathan Taylor | RB | age 27 | IND | market 5006 | projected 154.2 (19.3 a week) | last 3 weeks 23.3 a week | lineup value 70.7
5850 | Josh Jacobs | RB | age 28 | GB | market 4032 | projected 127.8 (16 a week) | last 3 weeks 21.2 a week | lineup value 44.4
2449 | Stefon Diggs | WR | age 32 | WAS | market 2782 | projected 99.7 (12.5 a week) | last 3 weeks 15.5 a week | lineup value 16.5
11533 | Brandon Aubrey | K | age 31 | DAL | market 0 | projected 97.7 (12.2 a week) | last 3 weeks 3.7 a week | lineup value 97.7
5859 | A.J. Brown | WR | age 29 | NE | market 4312 | projected 88.3 (11 a week) | last 3 weeks 8.7 a week | lineup value 18.8
1479 | Keenan Allen | WR | age 34 | IND | market 2143 | projected 85.3 (10.7 a week) | last 3 weeks 8.7 a week | lineup value 3.2
6790 | D'Andre Swift | RB | age 27 | CHI | market 3659 | projected 84.6 (10.6 a week) | last 3 weeks 13.8 a week | lineup value 3.2
6801 | Tee Higgins | WR | age 27 | CIN | market 4113 | projected 81.1 (10.1 a week) | last 3 weeks 9.5 a week | lineup value 12.4
8122 | Zonovan Knight | RB | age 25 | ARI | market 0 | projected 73 (9.1 a week) | last 3 weeks 4.1 a week | lineup value 0.8
3214 | Hunter Henry | TE | age 31 | NE | market 3151 | projected 70.5 (8.8 a week) | last 3 weeks 8.1 a week | lineup value 70.5
12533 | Jacory Croskey-Merritt | RB | age 25 | WAS | market 3247 | projected 68.7 (8.6 a week) | last 3 weeks 13.5 a week | lineup value 3.4
8408 | Jordan Mason | RB | age 27 | MIN | market 3072 | projected 68.6 (8.6 a week) | last 3 weeks 7.6 a week | lineup value 0
4454 | Kendrick Bourne | WR | age 31 | ARI | market 0 | projected 46.9 (5.9 a week) | last 3 weeks 14.5 a week | lineup value 0.6
CAR | Carolina Panthers | DEF | age ? | CAR | market 0 | projected 46.2 (5.8 a week) | last 3 weeks 0 a week | lineup value 46.2
7607 | Michael Carter | RB | age 27 | TEN | market 0 | projected 38.2 (4.8 a week) | last 3 weeks 8.9 a week | lineup value 0
12501 | Matthew Golden | WR | age 23 | GB | market 3527 | projected 33.6 (4.2 a week) | last 3 weeks 8.2 a week | lineup value 0

PARTNER (partnerId 1): record 6-0, rank 1, points for 841.9, contention window 1
4046 | Patrick Mahomes | QB | age 31 | KC | market 4330 | projected 195.2 (24.4 a week) | last 3 weeks 36.7 a week | lineup value 15.2
3294 | Dak Prescott | QB | age 33 | DAL | market 4257 | projected 183.3 (22.9 a week) | last 3 weeks 36.6 a week | lineup value 3.2
9221 | Jahmyr Gibbs | RB | age 24 | DET | market 6364 | projected 147.3 (18.4 a week) | last 3 weeks 14 a week | lineup value 66.2
7569 | Nico Collins | WR | age 27 | HOU | market 4427 | projected 111.8 (14 a week) | last 3 weeks 9.3 a week | lineup value 30.7
8150 | Kyren Williams | RB | age 26 | LAR | market 4549 | projected 107.1 (13.4 a week) | last 3 weeks 19.4 a week | lineup value 25.9
5846 | DK Metcalf | WR | age 28 | PIT | market 3435 | projected 105.7 (13.2 a week) | last 3 weeks 14.4 a week | lineup value 16.8
DEN | Denver Broncos | DEF | age ? | DEN | market 0 | projected 88.4 (11 a week) | last 3 weeks 19.3 a week | lineup value 33.9
8148 | Jameson Williams | WR | age 25 | DET | market 4091 | projected 84.8 (10.6 a week) | last 3 weeks 8.8 a week | lineup value 5.3
4983 | DJ Moore | WR | age 29 | BUF | market 3645 | projected 83.2 (10.4 a week) | last 3 weeks 5.3 a week | lineup value 3.7
7567 | Kenny Gainwell | RB | age 27 | TB | market 3125 | projected 79.7 (10 a week) | last 3 weeks 13.7 a week | lineup value 0.7
5844 | T.J. Hockenson | TE | age 29 | MIN | market 2961 | projected 67.7 (8.5 a week) | last 3 weeks 5.9 a week | lineup value 42.9
MIN | Minnesota Vikings | DEF | age ? | MIN | market 0 | projected 64.5 (8.1 a week) | last 3 weeks 6 a week | lineup value 10
4035 | Alvin Kamara | RB | age 31 | NO | market 2508 | projected 60.6 (7.6 a week) | last 3 weeks 11.1 a week | lineup value 6.1
11626 | Xavier Legette | WR | age 25 | CAR | market 0 | projected 48.5 (6.1 a week) | last 3 weeks 1 a week | lineup value 0
11646 | Jalen Coker | WR | age 24 | CAR | market 3263 | projected 48.4 (6 a week) | last 3 weeks 0 a week | lineup value 0
10219 | Chris Rodriguez | RB | age 27 | JAX | market 2757 | projected 39.6 (4.9 a week) | last 3 weeks 2.2 a week | lineup value 0
9484 | Tucker Kraft | TE | age 25 | GB | market 4149 | projected 36.8 (4.6 a week) | last 3 weeks 7.6 a week | lineup value 12
5927 | Terry McLaurin | WR | age 31 | WAS | market 3391 | projected 36.3 (4.5 a week) | last 3 weeks 0 a week | lineup value 4.5
11623 | Jordan Whittington | WR | age 26 | LAR | market 0 | projected 32.4 (4 a week) | last 3 weeks 0 a week | lineup value 0

PARTNER (partnerId 13): record 4-2, rank 5, points for 790.1, contention window 0.77
11564 | Drake Maye | QB | age 24 | NE | market 6351 | projected 181.9 (22.7 a week) | last 3 weeks 26.7 a week | lineup value 30.3
6797 | Justin Herbert | QB | age 28 | LAC | market 4865 | projected 177.5 (22.2 a week) | last 3 weeks 20.1 a week | lineup value 26.4
4034 | Christian McCaffrey | RB | age 30 | SF | market 4598 | projected 164.9 (20.6 a week) | last 3 weeks 26 a week | lineup value 118
12508 | Jaxson Dart | QB | age 23 | NYG | market 5289 | projected 114.3 (14.3 a week) | last 3 weeks 24 a week | lineup value 1.3
12526 | Tetairoa McMillan | WR | age 23 | CAR | market 4720 | projected 94.7 (11.8 a week) | last 3 weeks 13.8 a week | lineup value 35.3
8259 | Cameron Dicker | K | age 26 | LAC | market 0 | projected 90.3 (11.3 a week) | last 3 weeks 11.4 a week | lineup value 90.3
11620 | Rome Odunze | WR | age 24 | CHI | market 4056 | projected 89.2 (11.1 a week) | last 3 weeks 7.4 a week | lineup value 29.8
LAC | Los Angeles Chargers | DEF | age ? | LAC | market 0 | projected 87.5 (10.9 a week) | last 3 weeks 9 a week | lineup value 87.5
5872 | Deebo Samuel | WR | age 30 | SF | market 2700 | projected 79.7 (10 a week) | last 3 weeks 16.4 a week | lineup value 26.7
7002 | Juwan Johnson | TE | age 30 | NO | market 3114 | projected 68.7 (8.6 a week) | last 3 weeks 3.7 a week | lineup value 10
5012 | Mark Andrews | TE | age 31 | BAL | market 3101 | projected 68.3 (8.5 a week) | last 3 weeks 6.9 a week | lineup value 5.4
12498 | Mason Taylor | TE | age 22 | NYJ | market 3674 | projected 61.5 (7.7 a week) | last 3 weeks 10.1 a week | lineup value 5.1
8167 | Christian Watson | WR | age 27 | GB | market 3659 | projected 60.6 (7.6 a week) | last 3 weeks 0 a week | lineup value 3.8
11435 | Emanuel Wilson | RB | age 27 | SEA | market 2482 | projected 54.4 (6.8 a week) | last 3 weeks 0.6 a week | lineup value 4.2
12641 | Jaylin Lane | WR | age 24 | WAS | market 0 | projected 32.3 (4 a week) | last 3 weeks 1.8 a week | lineup value 3.1
11638 | Ricky Pearsall | WR | age 26 | SF | market 2208 | projected 31.4 (3.9 a week) | last 3 weeks 2.9 a week | lineup value 4.1
12495 | Ollie Gordon | RB | age 22 | MIA | market 0 | projected 30.7 (3.8 a week) | last 3 weeks 0.7 a week | lineup value 0
4037 | Chris Godwin | WR | age 30 | TB | market 3091 | projected 27 (3.4 a week) | last 3 weeks 3.7 a week | lineup value 2.4
11783 | Ryan Flournoy | WR | age 26 | DAL | market 2499 | projected 16.4 (2 a week) | last 3 weeks 2.1 a week | lineup value 0
12507 | Omarion Hampton | RB | age 23 | LAC | market 5138 | projected 10.5 (1.3 a week) | last 3 weeks 13.5 a week | lineup value 6.5

PARTNER (partnerId 12): record 5-1, rank 2, points for 894.9, contention window 1
4881 | Lamar Jackson | QB | age 29 | BAL | market 5861 | projected 170.9 (21.4 a week) | last 3 weeks 4.7 a week | lineup value 59.8
96 | Aaron Rodgers | QB | age 42 | PIT | market 2407 | projected 153.6 (19.2 a week) | last 3 weeks 13.6 a week | lineup value 4.6
9226 | De'Von Achane | RB | age 25 | MIA | market 4987 | projected 151.8 (19 a week) | last 3 weeks 21.6 a week | lineup value 87.3
12527 | Ashton Jeanty | RB | age 22 | LV | market 5349 | projected 111.1 (13.9 a week) | last 3 weeks 22 a week | lineup value 47.9
8137 | George Pickens | WR | age 25 | DAL | market 4759 | projected 105.5 (13.2 a week) | last 3 weeks 26.3 a week | lineup value 47.9
12514 | Emeka Egbuka | WR | age 24 | TB | market 4516 | projected 102.4 (12.8 a week) | last 3 weeks 18.6 a week | lineup value 42.8
9224 | Chase Brown | RB | age 26 | CIN | market 4512 | projected 101.7 (12.7 a week) | last 3 weeks 10.3 a week | lineup value 39.5
HOU | Houston Texans | DEF | age ? | HOU | market 0 | projected 86.3 (10.8 a week) | last 3 weeks 13.7 a week | lineup value 39.4
5022 | Dallas Goedert | TE | age 31 | PHI | market 3125 | projected 76.3 (9.5 a week) | last 3 weeks 18.9 a week | lineup value 13
7527 | Mac Jones | QB | age 28 | SF | market 1543 | projected 72.5 (9.1 a week) | last 3 weeks 4.9 a week | lineup value 0
12506 | Harold Fannin | TE | age 22 | CLE | market 4701 | projected 68.1 (8.5 a week) | last 3 weeks 10.3 a week | lineup value 4.9
TB | Tampa Bay Buccaneers | DEF | age ? | TB | market 0 | projected 63 (7.9 a week) | last 3 weeks 10 a week | lineup value 16.2
11610 | Malik Washington | WR | age 25 | MIA | market 2865 | projected 61.3 (7.7 a week) | last 3 weeks 3.4 a week | lineup value 2.3
4988 | Nick Chubb | RB | age 30 | FA | market 1804 | projected 54.4 (6.8 a week) | last 3 weeks 6.8 a week | lineup value 0
12519 | Luther Burden | WR | age 22 | CHI | market 4866 | projected 42.8 (5.4 a week) | last 3 weeks 3.6 a week | lineup value 0
4950 | Christian Kirk | WR | age 29 | SF | market 2201 | projected 38.4 (4.8 a week) | last 3 weeks 5.1 a week | lineup value 0.1
11575 | Ray Davis | RB | age 26 | BUF | market 2506 | projected 17 (2.1 a week) | last 3 weeks 3.4 a week | lineup value 0

PARTNER (partnerId 8): record 4-2, rank 6, points for 780.1, contention window 0.66
4984 | Josh Allen | QB | age 30 | BUF | market 5850 | projected 205.6 (25.7 a week) | last 3 weeks 26 a week | lineup value 205.6
9488 | Jaxon Smith-Njigba | WR | age 24 | SEA | market 5790 | projected 148.2 (18.5 a week) | last 3 weeks 23.5 a week | lineup value 93.8
6786 | CeeDee Lamb | WR | age 27 | DAL | market 4920 | projected 133.7 (16.7 a week) | last 3 weeks 0 a week | lineup value 72.8
3198 | Derrick Henry | RB | age 32 | BAL | market 4135 | projected 119.6 (15 a week) | last 3 weeks 10.4 a week | lineup value 57.4
GB | Green Bay Packers | DEF | age ? | GB | market 0 | projected 107.3 (13.4 a week) | last 3 weeks 4 a week | lineup value 44.3
4217 | George Kittle | TE | age 33 | SF | market 3140 | projected 96.3 (12 a week) | last 3 weeks 0 a week | lineup value 32.7
8121 | Romeo Doubs | WR | age 26 | NE | market 3165 | projected 85.3 (10.7 a week) | last 3 weeks 13.4 a week | lineup value 24.5
IND | Indianapolis Colts | DEF | age ? | IND | market 0 | projected 77.6 (9.7 a week) | last 3 weeks 9.3 a week | lineup value 14.6
9753 | Zach Charbonnet | RB | age 25 | SEA | market 3186 | projected 68 (8.5 a week) | last 3 weeks 9.6 a week | lineup value 6.4
8111 | Cade Otton | TE | age 27 | TB | market 2960 | projected 61.8 (7.7 a week) | last 3 weeks 0 a week | lineup value 1.2
8132 | Tyler Allgeier | RB | age 26 | ARI | market 3205 | projected 58.2 (7.3 a week) | last 3 weeks 7.3 a week | lineup value 0
11631 | Brian Thomas | WR | age 24 | JAX | market 3926 | projected 50.5 (6.3 a week) | last 3 weeks 15.2 a week | lineup value 14.2
8131 | Isaiah Likely | TE | age 26 | NYG | market 3473 | projected 42 (5.2 a week) | last 3 weeks 0.9 a week | lineup value 0
5848 | Marquise Brown | WR | age 29 | PHI | market 0 | projected 41.6 (5.2 a week) | last 3 weeks 14 a week | lineup value 0
4219 | Jeremy McNichols | RB | age 30 | WAS | market 0 | projected 40.8 (5.1 a week) | last 3 weeks 2.6 a week | lineup value 0
10236 | Dalton Kincaid | TE | age 26 | BUF | market 3769 | projected 40.1 (5 a week) | last 3 weeks 8.9 a week | lineup value 4.5
4381 | Taysom Hill | TE | age 35 | FA | market 1530 | projected 36.3 (4.5 a week) | last 3 weeks 0.3 a week | lineup value 0
8932 | Lucas Havrisik | K | age 26 | FA | market 0 | projected 11.1 (1.4 a week) | last 3 weeks 4.7 a week | lineup value 11.1
11651 | Isaac Guerendo | RB | age 26 | SF | market 0 | projected 1.7 (0.2 a week) | last 3 weeks 0 a week | lineup value 0
4018 | Joe Mixon | RB | age 30 | FA | market 2254 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0

CANDIDATE DEALS (from a rules-based finder; points are the finder projections for the rest of the season):
c1 | partnerId 1 | I give Josh Jacobs + Stefon Diggs (5850,2449) | I get Dak Prescott + DJ Moore (3294,4983) | my points -26.9 | their points 52.4 | likelihood 0.71
c2 | partnerId 1 | I give Josh Jacobs (5850) | I get Dak Prescott + Kenny Gainwell (3294,7567) | my points -5.6 | their points 42.7 | likelihood 0.72
c3 | partnerId 1 | I give Josh Jacobs + Keenan Allen (5850,1479) | I get Dak Prescott + Jalen Coker (3294,11646) | my points -14.1 | their points 44.5 | likelihood 0.72
c4 | partnerId 1 | I give Josh Jacobs + Jacory Croskey-Merritt (5850,12533) | I get Dak Prescott (3294) | my points -11.4 | their points 43.3 | likelihood 0.72
c5 | partnerId 13 | I give Jonathan Taylor + Jacory Croskey-Merritt (6813,12533) | I get Jaxson Dart + Mason Taylor (12508,12498) | my points -52.9 | their points 92.2 | likelihood 0.69
c6 | partnerId 13 | I give Jonathan Taylor + Keenan Allen (6813,1479) | I get Jaxson Dart + Mark Andrews (12508,5012) | my points -52.3 | their points 91 | likelihood 0.7
c7 | partnerId 12 | I give Josh Jacobs + Tee Higgins (5850,6801) | I get Nick Chubb + Harold Fannin (4988,12506) | my points -45.7 | their points 48.1 | likelihood 0.58
c8 | partnerId 12 | I give Josh Jacobs + A.J. Brown (5850,5859) | I get Ray Davis + Harold Fannin (11575,12506) | my points -54.5 | their points 51.5 | likelihood 0.7
c9 | partnerId 13 | I give Stefon Diggs + Keenan Allen (2449,1479) | I get Ryan Flournoy + Mark Andrews (11783,5012) | my points -26.2 | their points 36 | likelihood 0.45
c10 | partnerId 8 | I give Stefon Diggs + Keenan Allen (2449,1479) | I get Taysom Hill + Cade Otton (4381,8111) | my points -32.2 | their points 37.2 | likelihood 0.56
c11 | partnerId 8 | I give Stefon Diggs (2449) | I get Cade Otton (8111) | my points -8.7 | their points 28.4 | likelihood 0.46

Pick the best trades for my team.

=========== CASE 1180733050925387776-w4-r8 ===========
REPLY FILE: /Users/anik/workspace/chrome/sleeper/.eval-market/replies/suggest-v2/heldout1/1180733050925387776-w4-r8.json
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
League: dynasty, 10 teams, week 4, 11 regular season weeks left, playoffs start week 15
Lineup slots: QB, RB, RB, WR, WR, WR, TE, FLEX, FLEX, FLEX, FLEX, FLEX, SUPER_FLEX, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN. Superflex: yes. Tight end premium: yes. Points per reception: 1.
Columns: id | name | position | age | team | market value | projected points for the rest of the regular season (and per week) | points per week over the last three weeks played | lineup value (points my lineup loses if this player is removed).

MY TEAM (partnerId me): record 3-0, rank 1, points for 922.5, contention window 1
9488 | Jaxon Smith-Njigba | WR | age 24 | SEA | market 5858 | projected 311.1 (28.3 a week) | last 3 weeks 28.9 a week | lineup value 199.3
4984 | Josh Allen | QB | age 30 | BUF | market 5730 | projected 298.9 (27.2 a week) | last 3 weeks 37.9 a week | lineup value 135.2
9493 | Puka Nacua | WR | age 25 | LAR | market 5760 | projected 286.9 (26.1 a week) | last 3 weeks 37.8 a week | lineup value 183.9
8150 | Kyren Williams | RB | age 26 | LAR | market 4902 | projected 246.2 (22.4 a week) | last 3 weeks 23 a week | lineup value 135
7569 | Nico Collins | WR | age 27 | HOU | market 4449 | projected 216.5 (19.7 a week) | last 3 weeks 18.5 a week | lineup value 112.1
12529 | TreVeyon Henderson | RB | age 23 | NE | market 4834 | projected 204.5 (18.6 a week) | last 3 weeks 16.8 a week | lineup value 95.1
5022 | Dallas Goedert | TE | age 31 | PHI | market 3001 | projected 189.8 (17.3 a week) | last 3 weeks 10.9 a week | lineup value 94
9228 | Bryce Young | QB | age 25 | CAR | market 3344 | projected 172.8 (15.7 a week) | last 3 weeks 24.2 a week | lineup value 19.3
6801 | Tee Higgins | WR | age 27 | CIN | market 4044 | projected 169.2 (15.4 a week) | last 3 weeks 10.8 a week | lineup value 72
6783 | Jerry Jeudy | WR | age 27 | CLE | market 2771 | projected 150.1 (13.6 a week) | last 3 weeks 11.3 a week | lineup value 44.2
4098 | Kareem Hunt | RB | age 30 | FA | market 1889 | projected 146.3 (13.3 a week) | last 3 weeks 7.8 a week | lineup value 37.4
12517 | Colston Loveland | TE | age 22 | CHI | market 5109 | projected 122.7 (11.2 a week) | last 3 weeks 3.9 a week | lineup value 28.3
19 | Joe Flacco | QB | age 41 | CIN | market 0 | projected 118.1 (10.7 a week) | last 3 weeks 15.7 a week | lineup value 2.9
7611 | Rhamondre Stevenson | RB | age 28 | NE | market 3675 | projected 115.8 (10.5 a week) | last 3 weeks 15.7 a week | lineup value 41.5
12490 | Bhayshul Tuten | RB | age 23 | JAX | market 4533 | projected 107.3 (9.8 a week) | last 3 weeks 11.3 a week | lineup value 6.2
8125 | Calvin Austin | WR | age 27 | NYG | market 0 | projected 106.6 (9.7 a week) | last 3 weeks 12.4 a week | lineup value 17.7
9494 | Marvin Mims | WR | age 24 | DEN | market 3516 | projected 106.4 (9.7 a week) | last 3 weeks 16.5 a week | lineup value 24.5
11435 | Emanuel Wilson | RB | age 27 | SEA | market 2755 | projected 100.3 (9.1 a week) | last 3 weeks 2.4 a week | lineup value 13
7527 | Mac Jones | QB | age 28 | SF | market 1342 | projected 99.6 (9.1 a week) | last 3 weeks 20.7 a week | lineup value 3.3
5906 | Dawson Knox | TE | age 29 | BUF | market 0 | projected 93.7 (8.5 a week) | last 3 weeks 5.5 a week | lineup value 3.2
10226 | Andrei Iosivas | WR | age 27 | CIN | market 0 | projected 90.5 (8.2 a week) | last 3 weeks 1.2 a week | lineup value 0.4
9481 | Luke Musgrave | TE | age 26 | GB | market 0 | projected 73.8 (6.7 a week) | last 3 weeks 4.2 a week | lineup value 3.9
11638 | Ricky Pearsall | WR | age 26 | SF | market 2320 | projected 71.6 (6.5 a week) | last 3 weeks 24.6 a week | lineup value 15.3
2197 | Brandin Cooks | WR | age 33 | SF | market 0 | projected 61.2 (5.6 a week) | last 3 weeks 7.7 a week | lineup value 0
8119 | Jahan Dotson | WR | age 26 | ATL | market 0 | projected 53.6 (4.9 a week) | last 3 weeks 5.3 a week | lineup value 0.5
6770 | Joe Burrow | QB | age 29 | CIN | market 4814 | projected 43 (3.9 a week) | last 3 weeks 8.5 a week | lineup value 15.5
12487 | Terrance Ferguson | TE | age 23 | LAR | market 3412 | projected 39.5 (3.6 a week) | last 3 weeks 0 a week | lineup value 0
11643 | Jaylen Wright | RB | age 23 | MIA | market 3466 | projected 15.4 (1.4 a week) | last 3 weeks 0 a week | lineup value 0
11569 | Jarquez Hunter | RB | age 23 | NO | market 2702 | projected 1.8 (0.2 a week) | last 3 weeks 0 a week | lineup value 0
11583 | Jonathon Brooks | RB | age 23 | CAR | market 3587 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0

PARTNER (partnerId 9): record 0-3, rank 10, points for 704.5, contention window 0
6794 | Justin Jefferson | WR | age 27 | MIN | market 4897 | projected 236.1 (21.5 a week) | last 3 weeks 15.6 a week | lineup value 113.3
8136 | Rachaad White | RB | age 27 | WAS | market 2968 | projected 209.3 (19 a week) | last 3 weeks 9.2 a week | lineup value 130.9
8676 | Rashid Shaheed | WR | age 28 | SEA | market 3404 | projected 209.3 (19 a week) | last 3 weeks 16.1 a week | lineup value 86.5
2449 | Stefon Diggs | WR | age 32 | WAS | market 2757 | projected 201.7 (18.3 a week) | last 3 weeks 11.1 a week | lineup value 90.6
4943 | Sam Darnold | QB | age 29 | SEA | market 3283 | projected 200.3 (18.2 a week) | last 3 weeks 20.6 a week | lineup value 42.2
12474 | Woody Marks | RB | age 25 | HOU | market 3446 | projected 191.3 (17.4 a week) | last 3 weeks 4.5 a week | lineup value 112.9
1479 | Keenan Allen | WR | age 34 | IND | market 2075 | projected 182.8 (16.6 a week) | last 3 weeks 23.8 a week | lineup value 73.2
12506 | Harold Fannin | TE | age 22 | CLE | market 4522 | projected 178.1 (16.2 a week) | last 3 weeks 17.6 a week | lineup value 66.4
12508 | Jaxson Dart | QB | age 23 | NYG | market 5123 | projected 177 (16.1 a week) | last 3 weeks 0 a week | lineup value 52.6
5947 | Jakobi Meyers | WR | age 29 | JAX | market 3311 | projected 166 (15.1 a week) | last 3 weeks 18.1 a week | lineup value 61.3
5844 | T.J. Hockenson | TE | age 29 | MIN | market 2855 | projected 161 (14.6 a week) | last 3 weeks 12.5 a week | lineup value 38.2
9756 | Jordan Addison | WR | age 24 | MIN | market 3542 | projected 155.9 (14.2 a week) | last 3 weeks 0 a week | lineup value 33.3
4066 | Evan Engram | TE | age 32 | DEN | market 0 | projected 146.2 (13.3 a week) | last 3 weeks 4.8 a week | lineup value 40
9500 | Josh Downs | WR | age 25 | IND | market 3531 | projected 134.2 (12.2 a week) | last 3 weeks 9.6 a week | lineup value 29.8
4199 | Aaron Jones | RB | age 31 | MIN | market 3196 | projected 129.9 (11.8 a week) | last 3 weeks 7.5 a week | lineup value 51.6
9758 | C.J. Stroud | QB | age 25 | HOU | market 3653 | projected 125.1 (11.4 a week) | last 3 weeks 21.2 a week | lineup value 4.4
11565 | J.J. McCarthy | QB | age 23 | NYG | market 2731 | projected 101.1 (9.2 a week) | last 3 weeks 10.7 a week | lineup value 12.6
12501 | Matthew Golden | WR | age 23 | GB | market 3540 | projected 78.4 (7.1 a week) | last 3 weeks 6.6 a week | lineup value 25.2
10444 | Cedric Tillman | WR | age 26 | NO | market 0 | projected 68.3 (6.2 a week) | last 3 weeks 13.2 a week | lineup value 0
4993 | Mike Gesicki | TE | age 31 | CIN | market 1158 | projected 61.3 (5.6 a week) | last 3 weeks 5.6 a week | lineup value 8.4
1689 | Adam Thielen | WR | age 35 | FA | market 2139 | projected 26.2 (2.4 a week) | last 3 weeks 3.2 a week | lineup value 0
3321 | Tyreek Hill | WR | age 31 | FA | market 2597 | projected 21.8 (2 a week) | last 3 weeks 21.4 a week | lineup value 7

PARTNER (partnerId 10): record 0-3, rank 8, points for 802.2, contention window 0.11
7547 | Amon-Ra St. Brown | WR | age 26 | DET | market 5155 | projected 280.5 (25.5 a week) | last 3 weeks 30.6 a week | lineup value 188.8
11564 | Drake Maye | QB | age 24 | NE | market 6192 | projected 257.6 (23.4 a week) | last 3 weeks 34.1 a week | lineup value 193.1
8155 | Breece Hall | RB | age 25 | NYJ | market 4938 | projected 254.5 (23.1 a week) | last 3 weeks 19.7 a week | lineup value 164
12526 | Tetairoa McMillan | WR | age 23 | CAR | market 4728 | projected 210.2 (19.1 a week) | last 3 weeks 19.5 a week | lineup value 118.1
1466 | Travis Kelce | TE | age 37 | KC | market 2793 | projected 206.2 (18.7 a week) | last 3 weeks 16.1 a week | lineup value 118.3
8151 | Kenneth Walker | RB | age 25 | KC | market 4989 | projected 196.4 (17.9 a week) | last 3 weeks 20.7 a week | lineup value 104.8
8126 | Wan'Dale Robinson | WR | age 25 | TEN | market 3315 | projected 183.7 (16.7 a week) | last 3 weeks 22 a week | lineup value 91.5
10229 | Rashee Rice | WR | age 26 | KC | market 4281 | projected 178.8 (16.3 a week) | last 3 weeks 0 a week | lineup value 112.5
9508 | Tyjae Spears | RB | age 25 | TEN | market 3493 | projected 133.4 (12.1 a week) | last 3 weeks 0 a week | lineup value 49.8
11566 | Jayden Daniels | QB | age 25 | WAS | market 5727 | projected 132.5 (12 a week) | last 3 weeks 19.8 a week | lineup value 78.1
12481 | Cam Skattebo | RB | age 24 | NYG | market 4448 | projected 118 (10.7 a week) | last 3 weeks 20.5 a week | lineup value 70.1
5857 | Noah Fant | TE | age 28 | NO | market 0 | projected 102.6 (9.3 a week) | last 3 weeks 13.2 a week | lineup value 20.8
8205 | Isiah Pacheco | RB | age 27 | DET | market 2877 | projected 92.3 (8.4 a week) | last 3 weeks 7.5 a week | lineup value 26.4
6130 | Devin Singletary | RB | age 29 | NYG | market 0 | projected 91.6 (8.3 a week) | last 3 weeks 5.6 a week | lineup value 21
4177 | Mack Hollins | WR | age 33 | NE | market 0 | projected 89.9 (8.2 a week) | last 3 weeks 6.3 a week | lineup value 15.7
9486 | Dontayvion Wicks | WR | age 25 | PHI | market 2516 | projected 70.4 (6.4 a week) | last 3 weeks 9.3 a week | lineup value 5.7
2374 | Tyler Lockett | WR | age 33 | FA | market 2529 | projected 68.9 (6.3 a week) | last 3 weeks 4.5 a week | lineup value 9.2
12483 | Jack Bech | WR | age 23 | LV | market 2834 | projected 68 (6.2 a week) | last 3 weeks 2.8 a week | lineup value 6.6
11575 | Ray Davis | RB | age 26 | BUF | market 3306 | projected 64.2 (5.8 a week) | last 3 weeks 2.3 a week | lineup value 5.7
12455 | Brashard Smith | RB | age 23 | KC | market 2951 | projected 63.2 (5.7 a week) | last 3 weeks 5.6 a week | lineup value 2.5
8154 | Brian Robinson | RB | age 27 | ATL | market 3482 | projected 62.8 (5.7 a week) | last 3 weeks 4.6 a week | lineup value 0
5927 | Terry McLaurin | WR | age 31 | WAS | market 3324 | projected 53.6 (4.9 a week) | last 3 weeks 12.6 a week | lineup value 27.6

PARTNER (partnerId 5): record 2-1, rank 5, points for 909.6, contention window 0.58
9226 | De'Von Achane | RB | age 25 | MIA | market 5517 | projected 359.5 (32.7 a week) | last 3 weeks 26.8 a week | lineup value 234.5
4046 | Patrick Mahomes | QB | age 31 | KC | market 4259 | projected 278.9 (25.4 a week) | last 3 weeks 31.4 a week | lineup value 224.1
7588 | Javonte Williams | RB | age 26 | DAL | market 4371 | projected 270.9 (24.6 a week) | last 3 weeks 28.2 a week | lineup value 139.1
7543 | Travis Etienne | RB | age 27 | NO | market 4354 | projected 218.8 (19.9 a week) | last 3 weeks 22.2 a week | lineup value 95.2
10213 | Tre Tucker | WR | age 25 | LV | market 3063 | projected 179.8 (16.3 a week) | last 3 weeks 27.6 a week | lineup value 56.2
7567 | Kenny Gainwell | RB | age 27 | TB | market 3566 | projected 177 (16.1 a week) | last 3 weeks 13 a week | lineup value 52.6
11624 | Xavier Worthy | WR | age 23 | KC | market 3537 | projected 176.3 (16 a week) | last 3 weeks 0 a week | lineup value 44.5
4217 | George Kittle | TE | age 33 | SF | market 3092 | projected 175.4 (15.9 a week) | last 3 weeks 6.5 a week | lineup value 92.1
5967 | Tony Pollard | RB | age 29 | TEN | market 3702 | projected 171.5 (15.6 a week) | last 3 weeks 17.7 a week | lineup value 39.7
4983 | DJ Moore | WR | age 29 | BUF | market 3679 | projected 160.5 (14.6 a week) | last 3 weeks 13 a week | lineup value 37.5
11610 | Malik Washington | WR | age 25 | MIA | market 3596 | projected 159.8 (14.5 a week) | last 3 weeks 17.3 a week | lineup value 35.2
12498 | Mason Taylor | TE | age 22 | NYJ | market 3525 | projected 155.7 (14.2 a week) | last 3 weeks 6.9 a week | lineup value 43.6
11597 | Theo Johnson | TE | age 25 | NYG | market 3057 | projected 148.5 (13.5 a week) | last 3 weeks 7.1 a week | lineup value 29.6
11627 | Troy Franklin | WR | age 23 | DEN | market 2959 | projected 134.7 (12.2 a week) | last 3 weeks 15.7 a week | lineup value 18
9484 | Tucker Kraft | TE | age 25 | GB | market 4063 | projected 108.6 (9.9 a week) | last 3 weeks 21.2 a week | lineup value 41.9
11571 | Isaiah Davis | RB | age 24 | NYJ | market 0 | projected 105.6 (9.6 a week) | last 3 weeks 9 a week | lineup value 10.7
12545 | Tyler Shough | QB | age 27 | NO | market 3422 | projected 89.4 (8.1 a week) | last 3 weeks 0 a week | lineup value 34.6
8146 | Garrett Wilson | WR | age 26 | NYJ | market 4193 | projected 89.3 (8.1 a week) | last 3 weeks 22.3 a week | lineup value 47.6
12507 | Omarion Hampton | RB | age 23 | LAC | market 5646 | projected 75 (6.8 a week) | last 3 weeks 21 a week | lineup value 36.3
6826 | Cole Kmet | TE | age 27 | CHI | market 0 | projected 74.4 (6.8 a week) | last 3 weeks 8.5 a week | lineup value 0
11625 | Adonai Mitchell | WR | age 24 | NYJ | market 3026 | projected 62.7 (5.7 a week) | last 3 weeks 3.2 a week | lineup value 0.4
11650 | Luke McCaffrey | WR | age 25 | WAS | market 0 | projected 54.8 (5 a week) | last 3 weeks 10.9 a week | lineup value 0

PARTNER (partnerId 3): record 2-1, rank 6, points for 870.8, contention window 0.42
6813 | Jonathan Taylor | RB | age 27 | IND | market 5437 | projected 350.9 (31.9 a week) | last 3 weeks 38.9 a week | lineup value 289.5
11563 | Bo Nix | QB | age 26 | DEN | market 4646 | projected 234.4 (21.3 a week) | last 3 weeks 24.3 a week | lineup value 35.7
8137 | George Pickens | WR | age 25 | DAL | market 4799 | projected 232.5 (21.1 a week) | last 3 weeks 18.9 a week | lineup value 165
12514 | Emeka Egbuka | WR | age 24 | TB | market 4483 | projected 222.3 (20.2 a week) | last 3 weeks 20 a week | lineup value 151.1
421 | Matthew Stafford | QB | age 38 | LAR | market 3118 | projected 207 (18.8 a week) | last 3 weeks 23.9 a week | lineup value 25.8
6786 | CeeDee Lamb | WR | age 27 | DAL | market 4955 | projected 203 (18.5 a week) | last 3 weeks 20.4 a week | lineup value 162.7
1373 | Geno Smith | QB | age 36 | NYJ | market 1982 | projected 195.8 (17.8 a week) | last 3 weeks 29.6 a week | lineup value 20
5045 | Courtland Sutton | WR | age 31 | DEN | market 3156 | projected 195.2 (17.7 a week) | last 3 weeks 21.3 a week | lineup value 123.9
6819 | Michael Pittman | WR | age 29 | PIT | market 2964 | projected 193 (17.5 a week) | last 3 weeks 20.3 a week | lineup value 125.7
6768 | Tua Tagovailoa | QB | age 28 | ATL | market 2223 | projected 191.1 (17.4 a week) | last 3 weeks 21.9 a week | lineup value 2.8
6790 | D'Andre Swift | RB | age 27 | CHI | market 4077 | projected 184.5 (16.8 a week) | last 3 weeks 17.9 a week | lineup value 129.9
96 | Aaron Rodgers | QB | age 42 | PIT | market 2149 | projected 180.8 (16.4 a week) | last 3 weeks 23.7 a week | lineup value 1.9
8111 | Cade Otton | TE | age 27 | TB | market 2873 | projected 151.2 (13.7 a week) | last 3 weeks 3.3 a week | lineup value 80
10859 | Sam LaPorta | TE | age 25 | DET | market 4097 | projected 132.8 (12.1 a week) | last 3 weeks 16.8 a week | lineup value 87.1
8210 | Chig Okonkwo | TE | age 27 | WAS | market 3001 | projected 128.8 (11.7 a week) | last 3 weeks 14.5 a week | lineup value 61.2
5970 | Greg Dortch | WR | age 28 | BUF | market 0 | projected 94.1 (8.6 a week) | last 3 weeks 9 a week | lineup value 31.5
4950 | Christian Kirk | WR | age 29 | SF | market 2205 | projected 86.8 (7.9 a week) | last 3 weeks 2.8 a week | lineup value 31.2
9501 | DeMario Douglas | WR | age 25 | NE | market 0 | projected 78.1 (7.1 a week) | last 3 weeks 4.2 a week | lineup value 19.8
12495 | Ollie Gordon | RB | age 22 | MIA | market 0 | projected 76.1 (6.9 a week) | last 3 weeks 6.8 a week | lineup value 12.8
12530 | Travis Hunter | DB | age 23 | JAX | market 0 | projected 45.3 (4.1 a week) | last 3 weeks 6.9 a week | lineup value 10.8
12547 | Kyle Williams | WR | age 23 | NE | market 3124 | projected 43.1 (3.9 a week) | last 3 weeks 1.8 a week | lineup value 1.5
12531 | Trevor Etienne | RB | age 22 | CAR | market 0 | projected 29.2 (2.7 a week) | last 3 weeks 4.5 a week | lineup value 1.6

CANDIDATE DEALS (from a rules-based finder; points are the finder projections for the rest of the season):
c1 | partnerId 9 | I give MarShawn Lloyd (11581) | I get Rachaad White + Stefon Diggs (8136,2449) | my points 168.8 | their points -232.3 | likelihood 0.91
c2 | partnerId 9 | I give MarShawn Lloyd + Jarquez Hunter (11581,11569) | I get Rachaad White + Keenan Allen (8136,1479) | my points 156.5 | their points -211.6 | likelihood 0.91
c3 | partnerId 10 | I give Jarquez Hunter + MarShawn Lloyd (11569,11581) | I get Travis Kelce (1466) | my points 84.5 | their points -118.3 | likelihood 0.94
c4 | partnerId 5 | I give Mac Jones + Jonathon Brooks (7527,11583) | I get George Kittle (4217) | my points 90.7 | their points -63.7 | likelihood 0.73
c5 | partnerId 3 | I give Dawson Knox + Jonathon Brooks (5906,11583) | I get Courtland Sutton (5045) | my points 75.6 | their points -91.3 | likelihood 0.73
c6 | partnerId 3 | I give Dawson Knox + Terrance Ferguson (5906,12487) | I get Michael Pittman (6819) | my points 72.7 | their points -89.8 | likelihood 0.76

Pick the best trades for my team.

=========== CASE 1180947953223675904-w10-r2 ===========
REPLY FILE: /Users/anik/workspace/chrome/sleeper/.eval-market/replies/suggest-v2/heldout1/1180947953223675904-w10-r2.json
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
Lineup slots: QB, RB, WR, TE, FLEX, FLEX, K, DEF, DL, DL, DL, LB, LB, LB, DB, DB, DB, IDP_FLEX, IDP_FLEX, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN. Superflex: no. Tight end premium: no. Points per reception: 1.
Columns: id | name | position | age | team | market value | projected points for the rest of the regular season (and per week) | points per week over the last three weeks played | lineup value (points my lineup loses if this player is removed).

MY TEAM (partnerId me): record 5-4, rank 5, points for 2121.8, contention window 0.69
6904 | Jalen Hurts | QB | age 28 | PHI | market 4041 | projected 111.4 (22.3 a week) | last 3 weeks 16.5 a week | lineup value 26
11604 | Brock Bowers | TE | age 23 | LV | market 5534 | projected 81.9 (16.4 a week) | last 3 weeks 14.4 a week | lineup value 32.3
4866 | Saquon Barkley | RB | age 29 | PHI | market 4233 | projected 80.2 (16 a week) | last 3 weeks 12.9 a week | lineup value 30.8
5870 | Daniel Jones | QB | age 29 | IND | market 2575 | projected 69.7 (13.9 a week) | last 3 weeks 21.5 a week | lineup value 0
7136 | Kam Curl | DB | age 27 | LAR | market 0 | projected 60.5 (12.1 a week) | last 3 weeks 10.6 a week | lineup value 8
4070 | T.J. Watt | DL | age 32 | PIT | market 0 | projected 57.9 (11.6 a week) | last 3 weeks 7.8 a week | lineup value 30.3
6901 | Joshua Metellus | DB | age 28 | MIN | market 0 | projected 57.4 (11.5 a week) | last 3 weeks 11.8 a week | lineup value 21.7
10949 | Chamarri Conner | DB | age 26 | KC | market 0 | projected 56.7 (11.3 a week) | last 3 weeks 10 a week | lineup value 13.7
1213 | Harrison Smith | DB | age 37 | MIN | market 0 | projected 51 (10.2 a week) | last 3 weeks 12.5 a week | lineup value 1.7
5045 | Courtland Sutton | WR | age 31 | DEN | market 3187 | projected 50.1 (10 a week) | last 3 weeks 12.5 a week | lineup value 10
1233 | Bobby Wagner | LB | age 35 | FA | market 0 | projected 49.5 (9.9 a week) | last 3 weeks 16 a week | lineup value 18.7
5001 | Dalton Schultz | TE | age 30 | HOU | market 3167 | projected 48.5 (9.7 a week) | last 3 weeks 12.3 a week | lineup value 0
1945 | Chris Boswell | K | age 35 | PIT | market 0 | projected 46.3 (9.3 a week) | last 3 weeks 12.7 a week | lineup value 9.8
6416 | Andrew Wingard | DB | age 29 | ARI | market 0 | projected 46.1 (9.2 a week) | last 3 weeks 3 a week | lineup value 4.1
9754 | Quentin Johnston | WR | age 25 | LAC | market 3436 | projected 45 (9 a week) | last 3 weeks 8.8 a week | lineup value 4.8
4098 | Kareem Hunt | RB | age 30 | FA | market 1814 | projected 44.2 (8.8 a week) | last 3 weeks 10.5 a week | lineup value 4.7
8333 | Alontae Taylor | DB | age 27 | TEN | market 0 | projected 44 (8.8 a week) | last 3 weeks 11.5 a week | lineup value 2
2393 | Danielle Hunter | DL | age 31 | HOU | market 0 | projected 44 (8.8 a week) | last 3 weeks 6.3 a week | lineup value 16.4
7819 | Deommodore Lenoir | DB | age 27 | SF | market 0 | projected 43.1 (8.6 a week) | last 3 weeks 8 a week | lineup value 1.5
843 | Cameron Heyward | DL | age 37 | PIT | market 0 | projected 43 (8.6 a week) | last 3 weeks 10.6 a week | lineup value 15.5
1339 | Zach Ertz | TE | age 35 | PHI | market 0 | projected 41.5 (8.3 a week) | last 3 weeks 9.6 a week | lineup value 1.2
8476 | DaRon Bland | DB | age 27 | DAL | market 0 | projected 41.4 (8.3 a week) | last 3 weeks 9 a week | lineup value 0
11676 | Mike Sainristil | DB | age 26 | WAS | market 0 | projected 38.3 (7.7 a week) | last 3 weeks 8.6 a week | lineup value 0
8259 | Cameron Dicker | K | age 26 | LAC | market 0 | projected 38 (7.6 a week) | last 3 weeks 10.7 a week | lineup value 1.6
12540 | Chimere Dike | WR | age 24 | TEN | market 2868 | projected 34.3 (6.9 a week) | last 3 weeks 2.5 a week | lineup value 1.5
5372 | D.J. Reed | DB | age 29 | DET | market 0 | projected 33.9 (6.8 a week) | last 3 weeks 0 a week | lineup value 1.4
12566 | Jihaad Campbell | LB | age 22 | PHI | market 0 | projected 33.8 (6.8 a week) | last 3 weeks 3.1 a week | lineup value 0
DEN | Denver Broncos | DEF | age ? | DEN | market 0 | projected 31.5 (6.3 a week) | last 3 weeks 13.7 a week | lineup value 3.9
11559 | Michael Penix | QB | age 26 | ATL | market 2099 | projected 30 (6 a week) | last 3 weeks 11.7 a week | lineup value 0
LAC | Los Angeles Chargers | DEF | age ? | LAC | market 0 | projected 29.5 (5.9 a week) | last 3 weeks 10.5 a week | lineup value 1.9

PARTNER (partnerId 11): record 7-2, rank 1, points for 2218.9, contention window 1
11564 | Drake Maye | QB | age 24 | NE | market 5101 | projected 86.2 (17.2 a week) | last 3 weeks 22.6 a week | lineup value 24.1
6794 | Justin Jefferson | WR | age 27 | MIN | market 4821 | projected 75.7 (15.1 a week) | last 3 weeks 14.7 a week | lineup value 22.9
8293 | Coby Bryant | DB | age 27 | CHI | market 0 | projected 73.8 (14.8 a week) | last 3 weeks 5.3 a week | lineup value 19.1
5017 | Jessie Bates | DB | age 29 | ATL | market 0 | projected 70.3 (14.1 a week) | last 3 weeks 11.8 a week | lineup value 15.6
12578 | Carson Schwesinger | LB | age 23 | CLE | market 0 | projected 69.4 (13.9 a week) | last 3 weeks 7.5 a week | lineup value 15.7
7588 | Javonte Williams | RB | age 26 | DAL | market 4036 | projected 67.3 (13.5 a week) | last 3 weeks 14.7 a week | lineup value 23.8
3233 | Kevin Byard | DB | age 33 | NE | market 0 | projected 65 (13 a week) | last 3 weeks 10.6 a week | lineup value 10.3
9228 | Bryce Young | QB | age 25 | CAR | market 2843 | projected 62 (12.4 a week) | last 3 weeks 4.8 a week | lineup value 0
6790 | D'Andre Swift | RB | age 27 | CHI | market 3664 | projected 60.5 (12.1 a week) | last 3 weeks 12 a week | lineup value 7.6
4413 | Eric Wilson | LB | age 32 | MIN | market 0 | projected 59.1 (11.8 a week) | last 3 weeks 14.9 a week | lineup value 5.4
8384 | Zyon McCollum | DB | age 27 | TB | market 0 | projected 55.3 (11.1 a week) | last 3 weeks 7.3 a week | lineup value 2.1
6119 | Devin White | LB | age 28 | DET | market 0 | projected 54.4 (10.9 a week) | last 3 weeks 18.8 a week | lineup value 1
10213 | Tre Tucker | WR | age 25 | LV | market 2700 | projected 54.2 (10.8 a week) | last 3 weeks 5 a week | lineup value 1.6
8126 | Wan'Dale Robinson | WR | age 25 | TEN | market 3419 | projected 52.4 (10.5 a week) | last 3 weeks 12.3 a week | lineup value 9.8
11017 | Dee Winters | LB | age 25 | DAL | market 0 | projected 51.9 (10.4 a week) | last 3 weeks 11.9 a week | lineup value 8
5991 | Maxx Crosby | DL | age 29 | LV | market 0 | projected 48.5 (9.7 a week) | last 3 weeks 6.7 a week | lineup value 9.8
8359 | Marcus Jones | DB | age 27 | NE | market 0 | projected 46.5 (9.3 a week) | last 3 weeks 12.3 a week | lineup value 1.6
12646 | Barrett Carter | LB | age 23 | CIN | market 0 | projected 43.9 (8.8 a week) | last 3 weeks 19.7 a week | lineup value 5.4
10921 | Yaya Diaby | DL | age 27 | TB | market 0 | projected 43.6 (8.7 a week) | last 3 weeks 5.3 a week | lineup value 4.9
11685 | Kamari Lassiter | DB | age 23 | HOU | market 0 | projected 41.8 (8.4 a week) | last 3 weeks 7.3 a week | lineup value 0
11792 | Will Reichard | K | age 25 | MIN | market 0 | projected 41.6 (8.3 a week) | last 3 weeks 5.3 a week | lineup value 41.6
10881 | Christian Gonzalez | DB | age 24 | NE | market 0 | projected 41.5 (8.3 a week) | last 3 weeks 14.1 a week | lineup value 0

PARTNER (partnerId 5): record 6-3, rank 4, points for 2182.3, contention window 0.82
9221 | Jahmyr Gibbs | RB | age 24 | DET | market 6371 | projected 108.6 (21.7 a week) | last 3 weeks 14.2 a week | lineup value 48
3163 | Jared Goff | QB | age 32 | DET | market 3077 | projected 92.6 (18.5 a week) | last 3 weeks 10.2 a week | lineup value 20.2
6797 | Justin Herbert | QB | age 28 | LAC | market 3830 | projected 80.2 (16 a week) | last 3 weeks 28.7 a week | lineup value 7.8
6815 | Zack Baun | LB | age 29 | PHI | market 0 | projected 79.5 (15.9 a week) | last 3 weeks 13 a week | lineup value 21.4
5859 | A.J. Brown | WR | age 29 | NE | market 4313 | projected 75.6 (15.1 a week) | last 3 weeks 9.4 a week | lineup value 14.2
9997 | Zay Flowers | WR | age 26 | BAL | market 4183 | projected 73.2 (14.6 a week) | last 3 weeks 8.5 a week | lineup value 11.9
6949 | Jordyn Brooks | LB | age 28 | MIA | market 0 | projected 69 (13.8 a week) | last 3 weeks 17.6 a week | lineup value 21.3
6807 | Patrick Queen | LB | age 27 | PIT | market 0 | projected 68.4 (13.7 a week) | last 3 weeks 7.2 a week | lineup value 10.3
12474 | Woody Marks | RB | age 25 | HOU | market 3145 | projected 65.4 (13.1 a week) | last 3 weeks 10.1 a week | lineup value 4.8
8392 | Nick Cross | DB | age 25 | WAS | market 0 | projected 62.9 (12.6 a week) | last 3 weeks 10.3 a week | lineup value 17.8
6302 | Kaden Elliss | LB | age 31 | NO | market 0 | projected 62 (12.4 a week) | last 3 weeks 19.9 a week | lineup value 3.9
8151 | Kenneth Walker | RB | age 25 | KC | market 4558 | projected 58.4 (11.7 a week) | last 3 weeks 4.9 a week | lineup value 1.8
11678 | Cooper DeJean | DB | age 23 | PHI | market 0 | projected 58.4 (11.7 a week) | last 3 weeks 7.8 a week | lineup value 3.2
11086 | Ivan Pace | LB | age 25 | MIN | market 0 | projected 55.2 (11 a week) | last 3 weeks 2.7 a week | lineup value 0
12140 | Omar Speights | LB | age 25 | LAR | market 0 | projected 53.9 (10.8 a week) | last 3 weeks 2.8 a week | lineup value 0.4
11710 | Calen Bullock | DB | age 23 | HOU | market 0 | projected 53.8 (10.8 a week) | last 3 weeks 8.5 a week | lineup value 0.1
6911 | Brandon Jones | DB | age 28 | DEN | market 0 | projected 53.8 (10.8 a week) | last 3 weeks 13.1 a week | lineup value 8.1
12591 | Xavier Watts | DB | age 24 | ATL | market 0 | projected 53.5 (10.7 a week) | last 3 weeks 9.1 a week | lineup value 0.1
8280 | Nik Bonitto | DL | age 27 | DEN | market 0 | projected 53.4 (10.7 a week) | last 3 weeks 2.8 a week | lineup value 20.8
7667 | Tyson Campbell | DB | age 26 | CLE | market 0 | projected 49.7 (9.9 a week) | last 3 weeks 9.5 a week | lineup value 0
12568 | Jalon Walker | DL | age 22 | ATL | market 0 | projected 47.6 (9.5 a week) | last 3 weeks 7.3 a week | lineup value 10
7672 | Ernest Jones | LB | age 26 | SEA | market 0 | projected 46.2 (9.2 a week) | last 3 weeks 11.4 a week | lineup value 10.7

PARTNER (partnerId 4): record 4-5, rank 8, points for 2029, contention window 0.31
4881 | Lamar Jackson | QB | age 29 | BAL | market 4610 | projected 111.6 (22.3 a week) | last 3 weeks 8.5 a week | lineup value 47.7
11687 | Edgerrin Cooper | LB | age 24 | GB | market 0 | projected 81.2 (16.2 a week) | last 3 weeks 10.9 a week | lineup value 35.9
5332 | Foyesade Oluokun | LB | age 31 | JAX | market 0 | projected 73.7 (14.7 a week) | last 3 weeks 9.9 a week | lineup value 28.4
6768 | Tua Tagovailoa | QB | age 28 | ATL | market 1924 | projected 63.9 (12.8 a week) | last 3 weeks 11.8 a week | lineup value 0
8329 | Devin Lloyd | LB | age 28 | CAR | market 0 | projected 62 (12.4 a week) | last 3 weeks 0 a week | lineup value 16.8
6485 | Azeez Al-Shaair | LB | age 29 | HOU | market 0 | projected 58.6 (11.7 a week) | last 3 weeks 12.3 a week | lineup value 13.4
7811 | Talanoa Hufanga | DB | age 26 | DEN | market 0 | projected 58.4 (11.7 a week) | last 3 weeks 15.5 a week | lineup value 52.3
4199 | Aaron Jones | RB | age 31 | MIN | market 2799 | projected 57.2 (11.4 a week) | last 3 weeks 5.6 a week | lineup value 33.2
5012 | Mark Andrews | TE | age 31 | BAL | market 3103 | projected 49.6 (9.9 a week) | last 3 weeks 7.7 a week | lineup value 29.5
4983 | DJ Moore | WR | age 29 | BUF | market 3649 | projected 48.3 (9.7 a week) | last 3 weeks 14.3 a week | lineup value 20.4
5030 | Harold Landry | DL | age 30 | NE | market 0 | projected 46.6 (9.3 a week) | last 3 weeks 5.1 a week | lineup value 19.4
12654 | Craig Woodson | DB | age 25 | NE | market 0 | projected 44.3 (8.9 a week) | last 3 weeks 2.8 a week | lineup value 38.3
8110 | Jake Ferguson | TE | age 27 | DAL | market 3462 | projected 44.1 (8.8 a week) | last 3 weeks 10.6 a week | lineup value 24
8266 | Quay Walker | LB | age 26 | LV | market 0 | projected 42.1 (8.4 a week) | last 3 weeks 15.3 a week | lineup value 10.5
4227 | Harrison Butker | K | age 31 | KC | market 0 | projected 37.7 (7.5 a week) | last 3 weeks 6.3 a week | lineup value 37.7
5862 | Brian Burns | DL | age 28 | NYG | market 0 | projected 37.2 (7.4 a week) | last 3 weeks 14.8 a week | lineup value 10
8311 | Terrel Bernard | LB | age 27 | BUF | market 0 | projected 36.4 (7.3 a week) | last 3 weeks 3.5 a week | lineup value 6.3
8112 | Drake London | WR | age 25 | ATL | market 4861 | projected 33.5 (6.7 a week) | last 3 weeks 15.7 a week | lineup value 19.4
5908 | Amani Hooker | DB | age 28 | TEN | market 0 | projected 33.2 (6.6 a week) | last 3 weeks 13.8 a week | lineup value 27.1
10873 | Nolan Smith | DL | age 25 | PHI | market 0 | projected 30.4 (6.1 a week) | last 3 weeks 0 a week | lineup value 3.9
6811 | Kenneth Murray | LB | age 27 | HOU | market 0 | projected 28.8 (5.8 a week) | last 3 weeks 12.5 a week | lineup value 0
10984 | Noah Sewell | LB | age 24 | CHI | market 0 | projected 28.7 (5.7 a week) | last 3 weeks 3.5 a week | lineup value 0

PARTNER (partnerId 9): record 4-5, rank 9, points for 1939, contention window 0.18
9488 | Jaxon Smith-Njigba | WR | age 24 | SEA | market 5795 | projected 105.7 (21.1 a week) | last 3 weeks 17.4 a week | lineup value 51.4
4046 | Patrick Mahomes | QB | age 31 | KC | market 3422 | projected 87.5 (17.5 a week) | last 3 weeks 20.9 a week | lineup value 67.5
3198 | Derrick Henry | RB | age 32 | BAL | market 4139 | projected 83.9 (16.8 a week) | last 3 weeks 10.7 a week | lineup value 31.4
8659 | Nate Landman | LB | age 27 | LAR | market 0 | projected 75.4 (15.1 a week) | last 3 weeks 8.2 a week | lineup value 38.1
8267 | Nakobe Dean | LB | age 25 | LV | market 0 | projected 65.7 (13.1 a week) | last 3 weeks 6.7 a week | lineup value 28.3
12617 | Demetrius Knight | LB | age 26 | CIN | market 0 | projected 58.7 (11.7 a week) | last 3 weeks 14.7 a week | lineup value 28.2
8838 | Isaiah Pola-Mao | DB | age 27 | LV | market 0 | projected 56.1 (11.2 a week) | last 3 weeks 13.3 a week | lineup value 18.8
5947 | Jakobi Meyers | WR | age 29 | JAX | market 3300 | projected 54.7 (10.9 a week) | last 3 weeks 2.1 a week | lineup value 3
7553 | Kyle Pitts | TE | age 26 | ATL | market 3956 | projected 52.6 (10.5 a week) | last 3 weeks 12 a week | lineup value 7.9
8121 | Romeo Doubs | WR | age 26 | NE | market 3166 | projected 52.5 (10.5 a week) | last 3 weeks 12.9 a week | lineup value 1
11647 | Kimani Vidal | RB | age 25 | LAC | market 2815 | projected 52 (10.4 a week) | last 3 weeks 10.1 a week | lineup value 9.4
10927 | Jordan Battle | DB | age 25 | CIN | market 0 | projected 51.7 (10.3 a week) | last 3 weeks 15.3 a week | lineup value 21.3
8167 | Christian Watson | WR | age 27 | GB | market 3662 | projected 49.4 (9.9 a week) | last 3 weeks 6.8 a week | lineup value 1.8
8289 | Aidan Hutchinson | DL | age 26 | DET | market 0 | projected 47.7 (9.5 a week) | last 3 weeks 6.1 a week | lineup value 13.3
7637 | Zaven Collins | DL | age 27 | ARI | market 0 | projected 43.7 (8.7 a week) | last 3 weeks 2.4 a week | lineup value 9.3
10913 | Joey Porter | DB | age 26 | DAL | market 0 | projected 43.6 (8.7 a week) | last 3 weeks 17.8 a week | lineup value 6.3
12517 | Colston Loveland | TE | age 22 | CHI | market 5266 | projected 43.1 (8.6 a week) | last 3 weeks 14.7 a week | lineup value 0
12508 | Jaxson Dart | QB | age 23 | NYG | market 4336 | projected 41.6 (8.3 a week) | last 3 weeks 25.4 a week | lineup value 21.7
SEA | Seattle Seahawks | DEF | age ? | SEA | market 0 | projected 41 (8.2 a week) | last 3 weeks 11.5 a week | lineup value 41
11667 | Dallas Turner | DL | age 23 | MIN | market 0 | projected 40.1 (8 a week) | last 3 weeks 4.9 a week | lineup value 5.7
11603 | AJ Barner | TE | age 24 | SEA | market 3513 | projected 39.8 (8 a week) | last 3 weeks 4.5 a week | lineup value 0
7839 | Evan McPherson | K | age 27 | CIN | market 0 | projected 34.6 (6.9 a week) | last 3 weeks 11.7 a week | lineup value 34.6

PARTNER (partnerId 8): record 6-3, rank 3, points for 2225.5, contention window 0.95
9509 | Bijan Robinson | RB | age 24 | ATL | market 6371 | projected 102 (20.4 a week) | last 3 weeks 14.9 a week | lineup value 25.8
6813 | Jonathan Taylor | RB | age 27 | IND | market 5007 | projected 89.3 (17.9 a week) | last 3 weeks 26.4 a week | lineup value 28
2133 | Davante Adams | WR | age 33 | LAR | market 3376 | projected 77.6 (15.5 a week) | last 3 weeks 16.5 a week | lineup value 1.4
12527 | Ashton Jeanty | RB | age 22 | LV | market 5357 | projected 77.4 (15.5 a week) | last 3 weeks 8.1 a week | lineup value 3
96 | Aaron Rodgers | QB | age 42 | PIT | market 1832 | projected 67.1 (13.4 a week) | last 3 weeks 17.8 a week | lineup value 5
12567 | Malaki Starks | DB | age 22 | BAL | market 0 | projected 64.3 (12.9 a week) | last 3 weeks 8.3 a week | lineup value 21.4
8137 | George Pickens | WR | age 25 | DAL | market 4766 | projected 64 (12.8 a week) | last 3 weeks 13.6 a week | lineup value 3.5
8144 | Chris Olave | WR | age 26 | NO | market 4420 | projected 63.1 (12.6 a week) | last 3 weeks 17.2 a week | lineup value 2.2
12640 | Teddye Buchanan | LB | age 24 | BAL | market 0 | projected 62.2 (12.4 a week) | last 3 weeks 8.5 a week | lineup value 21.4
12545 | Tyler Shough | QB | age 27 | NO | market 3028 | projected 61.9 (12.4 a week) | last 3 weeks 5.2 a week | lineup value 4.9
7526 | Jaylen Waddle | WR | age 27 | DEN | market 4003 | projected 59.8 (12 a week) | last 3 weeks 12.5 a week | lineup value 0.9
11726 | Kamren Kinchens | DB | age 24 | LAR | market 0 | projected 59 (11.8 a week) | last 3 weeks 6.1 a week | lineup value 16
11742 | Cedric Gray | LB | age 23 | TEN | market 0 | projected 56.4 (11.3 a week) | last 3 weeks 21.7 a week | lineup value 22.2
10891 | Devon Witherspoon | DB | age 25 | SEA | market 0 | projected 54.5 (10.9 a week) | last 3 weeks 4.5 a week | lineup value 11.6
6788 | Xavier McKinney | DB | age 28 | GB | market 0 | projected 54.2 (10.8 a week) | last 3 weeks 16.1 a week | lineup value 11.3
7567 | Kenny Gainwell | RB | age 27 | TB | market 3132 | projected 53 (10.6 a week) | last 3 weeks 4.8 a week | lineup value 0
5872 | Deebo Samuel | WR | age 30 | SF | market 2702 | projected 52.9 (10.6 a week) | last 3 weeks 5.2 a week | lineup value 0
8136 | Rachaad White | RB | age 27 | WAS | market 2755 | projected 52.5 (10.5 a week) | last 3 weeks 5.5 a week | lineup value 0.5
12522 | Cam Ward | QB | age 24 | TEN | market 3057 | projected 50 (10 a week) | last 3 weeks 10.5 a week | lineup value 0
12506 | Harold Fannin | TE | age 22 | CLE | market 4700 | projected 49.4 (9.9 a week) | last 3 weeks 8.7 a week | lineup value 0.3
7058 | Jaylinn Hawkins | DB | age 29 | BAL | market 0 | projected 44 (8.8 a week) | last 3 weeks 6.6 a week | lineup value 8.5
7002 | Juwan Johnson | TE | age 30 | NO | market 3117 | projected 43.2 (8.6 a week) | last 3 weeks 11.8 a week | lineup value 2.9

CANDIDATE DEALS (from a rules-based finder; points are the finder projections for the rest of the season):
c1 | partnerId 11 | I give Zach Ertz + Chamarri Conner (1339,10949) | I get Eric Wilson + Dee Winters (4413,11017) | my points 18.1 | their points 18.5 | likelihood 0.8
c2 | partnerId 11 | I give Zach Ertz (1339) | I get DeMarvion Overshown + Eric Wilson (10933,4413) | my points 20.3 | their points 15.8 | likelihood 0.8
c3 | partnerId 5 | I give Zach Ertz + Chamarri Conner (1339,10949) | I get Kaden Elliss + Ivan Pace (6302,11086) | my points 14 | their points 14.7 | likelihood 0.78
c4 | partnerId 5 | I give Zach Ertz + D.J. Reed (1339,5372) | I get Ivan Pace + Omar Speights (11086,12140) | my points 18.3 | their points 8.9 | likelihood 0.78
c5 | partnerId 5 | I give Zach Ertz (1339) | I get Ivan Pace + Kiko Mauigoa (11086,12666) | my points 18.6 | their points 7.8 | likelihood 0.78
c6 | partnerId 4 | I give Deommodore Lenoir + Alontae Taylor (7819,8333) | I get Devin Lloyd (8329) | my points 17.8 | their points 20.1 | likelihood 0.77
c7 | partnerId 4 | I give Harrison Smith + Alontae Taylor (1213,8333) | I get Azeez Al-Shaair + Quay Walker (6485,8266) | my points 27 | their points 12.4 | likelihood 0.77
c8 | partnerId 4 | I give Deommodore Lenoir + Harrison Smith (7819,1213) | I get Azeez Al-Shaair (6485) | my points 16.4 | their points 19.4 | likelihood 0.77
c9 | partnerId 9 | I give Keon Coleman + Pat Bryant (11637,12492) | I get Nate Landman + Kimani Vidal (8659,11647) | my points 45.7 | their points -47.4 | likelihood 0.85
c10 | partnerId 9 | I give DeAndre Hopkins + Pat Bryant (1426,12492) | I get Demetrius Knight + Kimani Vidal (12617,11647) | my points 39.3 | their points -37.6 | likelihood 0.82
c11 | partnerId 9 | I give Pat Bryant (12492) | I get Nakobe Dean + Kimani Vidal (8267,11647) | my points 36 | their points -37.7 | likelihood 0.82
c12 | partnerId 8 | I give Jalen Hurts + D.J. Reed (6904,5372) | I get Davante Adams + Jaylen Waddle (2133,7526) | my points 12.1 | their points 25.5 | likelihood 0.8

Pick the best trades for my team.

=========== CASE 1180947953223675904-w10-r9 ===========
REPLY FILE: /Users/anik/workspace/chrome/sleeper/.eval-market/replies/suggest-v2/heldout1/1180947953223675904-w10-r9.json
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
Lineup slots: QB, RB, WR, TE, FLEX, FLEX, K, DEF, DL, DL, DL, LB, LB, LB, DB, DB, DB, IDP_FLEX, IDP_FLEX, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN. Superflex: no. Tight end premium: no. Points per reception: 1.
Columns: id | name | position | age | team | market value | projected points for the rest of the regular season (and per week) | points per week over the last three weeks played | lineup value (points my lineup loses if this player is removed).

MY TEAM (partnerId me): record 4-5, rank 9, points for 1939, contention window 0.18
9488 | Jaxon Smith-Njigba | WR | age 24 | SEA | market 5795 | projected 105.7 (21.1 a week) | last 3 weeks 17.4 a week | lineup value 51.4
4046 | Patrick Mahomes | QB | age 31 | KC | market 3422 | projected 87.5 (17.5 a week) | last 3 weeks 20.9 a week | lineup value 67.5
3198 | Derrick Henry | RB | age 32 | BAL | market 4139 | projected 83.9 (16.8 a week) | last 3 weeks 10.7 a week | lineup value 31.4
8659 | Nate Landman | LB | age 27 | LAR | market 0 | projected 75.4 (15.1 a week) | last 3 weeks 8.2 a week | lineup value 38.1
8267 | Nakobe Dean | LB | age 25 | LV | market 0 | projected 65.7 (13.1 a week) | last 3 weeks 6.7 a week | lineup value 28.3
12617 | Demetrius Knight | LB | age 26 | CIN | market 0 | projected 58.7 (11.7 a week) | last 3 weeks 14.7 a week | lineup value 28.2
8838 | Isaiah Pola-Mao | DB | age 27 | LV | market 0 | projected 56.1 (11.2 a week) | last 3 weeks 13.3 a week | lineup value 18.8
5947 | Jakobi Meyers | WR | age 29 | JAX | market 3300 | projected 54.7 (10.9 a week) | last 3 weeks 2.1 a week | lineup value 3
7553 | Kyle Pitts | TE | age 26 | ATL | market 3956 | projected 52.6 (10.5 a week) | last 3 weeks 12 a week | lineup value 7.9
8121 | Romeo Doubs | WR | age 26 | NE | market 3166 | projected 52.5 (10.5 a week) | last 3 weeks 12.9 a week | lineup value 1
11647 | Kimani Vidal | RB | age 25 | LAC | market 2815 | projected 52 (10.4 a week) | last 3 weeks 10.1 a week | lineup value 9.4
10927 | Jordan Battle | DB | age 25 | CIN | market 0 | projected 51.7 (10.3 a week) | last 3 weeks 15.3 a week | lineup value 21.3
8167 | Christian Watson | WR | age 27 | GB | market 3662 | projected 49.4 (9.9 a week) | last 3 weeks 6.8 a week | lineup value 1.8
8289 | Aidan Hutchinson | DL | age 26 | DET | market 0 | projected 47.7 (9.5 a week) | last 3 weeks 6.1 a week | lineup value 13.3
7637 | Zaven Collins | DL | age 27 | ARI | market 0 | projected 43.7 (8.7 a week) | last 3 weeks 2.4 a week | lineup value 9.3
10913 | Joey Porter | DB | age 26 | DAL | market 0 | projected 43.6 (8.7 a week) | last 3 weeks 17.8 a week | lineup value 6.3
12517 | Colston Loveland | TE | age 22 | CHI | market 5266 | projected 43.1 (8.6 a week) | last 3 weeks 14.7 a week | lineup value 0
12508 | Jaxson Dart | QB | age 23 | NYG | market 4336 | projected 41.6 (8.3 a week) | last 3 weeks 25.4 a week | lineup value 21.7
SEA | Seattle Seahawks | DEF | age ? | SEA | market 0 | projected 41 (8.2 a week) | last 3 weeks 11.5 a week | lineup value 41
11667 | Dallas Turner | DL | age 23 | MIN | market 0 | projected 40.1 (8 a week) | last 3 weeks 4.9 a week | lineup value 5.7
11603 | AJ Barner | TE | age 24 | SEA | market 3513 | projected 39.8 (8 a week) | last 3 weeks 4.5 a week | lineup value 0
7839 | Evan McPherson | K | age 27 | CIN | market 0 | projected 34.6 (6.9 a week) | last 3 weeks 11.7 a week | lineup value 34.6
5031 | Oren Burks | LB | age 31 | CIN | market 0 | projected 33.9 (6.8 a week) | last 3 weeks 4.7 a week | lineup value 4.5
4950 | Christian Kirk | WR | age 29 | SF | market 2204 | projected 31.1 (6.2 a week) | last 3 weeks 2.2 a week | lineup value 0
7647 | Pete Werner | LB | age 27 | NO | market 0 | projected 31.1 (6.2 a week) | last 3 weeks 3.8 a week | lineup value 2.3
8294 | Bryan Cook | DB | age 27 | CIN | market 0 | projected 30.6 (6.1 a week) | last 3 weeks 7.3 a week | lineup value 1.2
9486 | Dontayvion Wicks | WR | age 25 | PHI | market 2551 | projected 29.1 (5.8 a week) | last 3 weeks 0.5 a week | lineup value 0
5847 | Dexter Lawrence | DL | age 28 | CIN | market 0 | projected 28.8 (5.8 a week) | last 3 weeks 4.6 a week | lineup value 0.8
2036 | Khalil Mack | DL | age 35 | LAC | market 0 | projected 27.1 (5.4 a week) | last 3 weeks 6.7 a week | lineup value 0
8290 | Sauce Gardner | DB | age 25 | IND | market 0 | projected 26.8 (5.4 a week) | last 3 weeks 3.2 a week | lineup value 3.1

PARTNER (partnerId 8): record 6-3, rank 3, points for 2225.5, contention window 0.95
9509 | Bijan Robinson | RB | age 24 | ATL | market 6371 | projected 102 (20.4 a week) | last 3 weeks 14.9 a week | lineup value 25.8
6813 | Jonathan Taylor | RB | age 27 | IND | market 5007 | projected 89.3 (17.9 a week) | last 3 weeks 26.4 a week | lineup value 28
2133 | Davante Adams | WR | age 33 | LAR | market 3376 | projected 77.6 (15.5 a week) | last 3 weeks 16.5 a week | lineup value 1.4
12527 | Ashton Jeanty | RB | age 22 | LV | market 5357 | projected 77.4 (15.5 a week) | last 3 weeks 8.1 a week | lineup value 3
96 | Aaron Rodgers | QB | age 42 | PIT | market 1832 | projected 67.1 (13.4 a week) | last 3 weeks 17.8 a week | lineup value 5
12567 | Malaki Starks | DB | age 22 | BAL | market 0 | projected 64.3 (12.9 a week) | last 3 weeks 8.3 a week | lineup value 21.4
8137 | George Pickens | WR | age 25 | DAL | market 4766 | projected 64 (12.8 a week) | last 3 weeks 13.6 a week | lineup value 3.5
8144 | Chris Olave | WR | age 26 | NO | market 4420 | projected 63.1 (12.6 a week) | last 3 weeks 17.2 a week | lineup value 2.2
12640 | Teddye Buchanan | LB | age 24 | BAL | market 0 | projected 62.2 (12.4 a week) | last 3 weeks 8.5 a week | lineup value 21.4
12545 | Tyler Shough | QB | age 27 | NO | market 3028 | projected 61.9 (12.4 a week) | last 3 weeks 5.2 a week | lineup value 4.9
7526 | Jaylen Waddle | WR | age 27 | DEN | market 4003 | projected 59.8 (12 a week) | last 3 weeks 12.5 a week | lineup value 0.9
11726 | Kamren Kinchens | DB | age 24 | LAR | market 0 | projected 59 (11.8 a week) | last 3 weeks 6.1 a week | lineup value 16
11742 | Cedric Gray | LB | age 23 | TEN | market 0 | projected 56.4 (11.3 a week) | last 3 weeks 21.7 a week | lineup value 22.2
10891 | Devon Witherspoon | DB | age 25 | SEA | market 0 | projected 54.5 (10.9 a week) | last 3 weeks 4.5 a week | lineup value 11.6
6788 | Xavier McKinney | DB | age 28 | GB | market 0 | projected 54.2 (10.8 a week) | last 3 weeks 16.1 a week | lineup value 11.3
7567 | Kenny Gainwell | RB | age 27 | TB | market 3132 | projected 53 (10.6 a week) | last 3 weeks 4.8 a week | lineup value 0
5872 | Deebo Samuel | WR | age 30 | SF | market 2702 | projected 52.9 (10.6 a week) | last 3 weeks 5.2 a week | lineup value 0
8136 | Rachaad White | RB | age 27 | WAS | market 2755 | projected 52.5 (10.5 a week) | last 3 weeks 5.5 a week | lineup value 0.5
12522 | Cam Ward | QB | age 24 | TEN | market 3057 | projected 50 (10 a week) | last 3 weeks 10.5 a week | lineup value 0
12506 | Harold Fannin | TE | age 22 | CLE | market 4700 | projected 49.4 (9.9 a week) | last 3 weeks 8.7 a week | lineup value 0.3
7058 | Jaylinn Hawkins | DB | age 29 | BAL | market 0 | projected 44 (8.8 a week) | last 3 weeks 6.6 a week | lineup value 8.5
7002 | Juwan Johnson | TE | age 30 | NO | market 3117 | projected 43.2 (8.6 a week) | last 3 weeks 11.8 a week | lineup value 2.9

PARTNER (partnerId 1): record 7-2, rank 2, points for 2063.1, contention window 1
8130 | Trey McBride | TE | age 26 | ARI | market 4884 | projected 86.8 (17.4 a week) | last 3 weeks 15.3 a week | lineup value 40.8
6804 | Jordan Love | QB | age 27 | GB | market 3372 | projected 85.2 (17 a week) | last 3 weeks 17.2 a week | lineup value 1.3
7523 | Trevor Lawrence | QB | age 27 | JAX | market 3680 | projected 84.5 (16.9 a week) | last 3 weeks 13.3 a week | lineup value 2.4
4943 | Sam Darnold | QB | age 29 | SEA | market 2863 | projected 83.6 (16.7 a week) | last 3 weeks 12.6 a week | lineup value 0.7
7569 | Nico Collins | WR | age 27 | HOU | market 4433 | projected 80.1 (16 a week) | last 3 weeks 7.1 a week | lineup value 26.6
8339 | Kyle Hamilton | DB | age 25 | BAL | market 0 | projected 74.3 (14.9 a week) | last 3 weeks 8.3 a week | lineup value 45.1
8228 | Jaylen Warren | RB | age 27 | PIT | market 3538 | projected 69.5 (13.9 a week) | last 3 weeks 15.3 a week | lineup value 30
5726 | Robert Spillane | LB | age 30 | NE | market 0 | projected 68.7 (13.7 a week) | last 3 weeks 14.5 a week | lineup value 40.6
5843 | Devin Bush | LB | age 28 | CHI | market 0 | projected 65.8 (13.2 a week) | last 3 weeks 7.2 a week | lineup value 37.6
3160 | Jalen Ramsey | DB | age 31 | PIT | market 0 | projected 65 (13 a week) | last 3 weeks 10 a week | lineup value 35.8
5846 | DK Metcalf | WR | age 28 | PIT | market 3438 | projected 63.4 (12.7 a week) | last 3 weeks 10.4 a week | lineup value 9.9
8148 | Jameson Williams | WR | age 25 | DET | market 4092 | projected 62.8 (12.6 a week) | last 3 weeks 6.2 a week | lineup value 9.3
6333 | Keisean Nixon | DB | age 29 | GB | market 0 | projected 52.1 (10.4 a week) | last 3 weeks 9.5 a week | lineup value 23
9756 | Jordan Addison | WR | age 24 | MIN | market 3614 | projected 52 (10.4 a week) | last 3 weeks 14.6 a week | lineup value 1.6
11727 | Payton Wilson | LB | age 26 | PIT | market 0 | projected 51.4 (10.3 a week) | last 3 weeks 17.7 a week | lineup value 23.2
6711 | Jalen Thompson | DB | age 28 | DAL | market 0 | projected 50.4 (10.1 a week) | last 3 weeks 6.6 a week | lineup value 21.2
11539 | Jake Bates | K | age 27 | DET | market 0 | projected 48.9 (9.8 a week) | last 3 weeks 2 a week | lineup value 48.9
11728 | Jaden Hicks | DB | age 24 | KC | market 0 | projected 47.9 (9.6 a week) | last 3 weeks 3.1 a week | lineup value 27.5
8111 | Cade Otton | TE | age 27 | TB | market 2962 | projected 44.7 (8.9 a week) | last 3 weeks 7.8 a week | lineup value 0
12498 | Mason Taylor | TE | age 22 | NYJ | market 3677 | projected 43.6 (8.7 a week) | last 3 weeks 6.8 a week | lineup value 0
4039 | Cooper Kupp | WR | age 33 | SEA | market 2097 | projected 43.4 (8.7 a week) | last 3 weeks 1.1 a week | lineup value 0
5346 | Zaire Franklin | LB | age 30 | GB | market 0 | projected 40.9 (8.2 a week) | last 3 weeks 8.6 a week | lineup value 12.7

PARTNER (partnerId 2): record 5-4, rank 5, points for 2121.8, contention window 0.69
6904 | Jalen Hurts | QB | age 28 | PHI | market 4041 | projected 111.4 (22.3 a week) | last 3 weeks 16.5 a week | lineup value 26
11604 | Brock Bowers | TE | age 23 | LV | market 5534 | projected 81.9 (16.4 a week) | last 3 weeks 14.4 a week | lineup value 32.3
4866 | Saquon Barkley | RB | age 29 | PHI | market 4233 | projected 80.2 (16 a week) | last 3 weeks 12.9 a week | lineup value 30.8
5870 | Daniel Jones | QB | age 29 | IND | market 2575 | projected 69.7 (13.9 a week) | last 3 weeks 21.5 a week | lineup value 0
7136 | Kam Curl | DB | age 27 | LAR | market 0 | projected 60.5 (12.1 a week) | last 3 weeks 10.6 a week | lineup value 8
4070 | T.J. Watt | DL | age 32 | PIT | market 0 | projected 57.9 (11.6 a week) | last 3 weeks 7.8 a week | lineup value 30.3
6901 | Joshua Metellus | DB | age 28 | MIN | market 0 | projected 57.4 (11.5 a week) | last 3 weeks 11.8 a week | lineup value 21.7
10949 | Chamarri Conner | DB | age 26 | KC | market 0 | projected 56.7 (11.3 a week) | last 3 weeks 10 a week | lineup value 13.7
1213 | Harrison Smith | DB | age 37 | MIN | market 0 | projected 51 (10.2 a week) | last 3 weeks 12.5 a week | lineup value 1.7
5045 | Courtland Sutton | WR | age 31 | DEN | market 3187 | projected 50.1 (10 a week) | last 3 weeks 12.5 a week | lineup value 10
1233 | Bobby Wagner | LB | age 35 | FA | market 0 | projected 49.5 (9.9 a week) | last 3 weeks 16 a week | lineup value 18.7
5001 | Dalton Schultz | TE | age 30 | HOU | market 3167 | projected 48.5 (9.7 a week) | last 3 weeks 12.3 a week | lineup value 0
1945 | Chris Boswell | K | age 35 | PIT | market 0 | projected 46.3 (9.3 a week) | last 3 weeks 12.7 a week | lineup value 9.8
6416 | Andrew Wingard | DB | age 29 | ARI | market 0 | projected 46.1 (9.2 a week) | last 3 weeks 3 a week | lineup value 4.1
9754 | Quentin Johnston | WR | age 25 | LAC | market 3436 | projected 45 (9 a week) | last 3 weeks 8.8 a week | lineup value 4.8
4098 | Kareem Hunt | RB | age 30 | FA | market 1814 | projected 44.2 (8.8 a week) | last 3 weeks 10.5 a week | lineup value 4.7
8333 | Alontae Taylor | DB | age 27 | TEN | market 0 | projected 44 (8.8 a week) | last 3 weeks 11.5 a week | lineup value 2
2393 | Danielle Hunter | DL | age 31 | HOU | market 0 | projected 44 (8.8 a week) | last 3 weeks 6.3 a week | lineup value 16.4
7819 | Deommodore Lenoir | DB | age 27 | SF | market 0 | projected 43.1 (8.6 a week) | last 3 weeks 8 a week | lineup value 1.5
843 | Cameron Heyward | DL | age 37 | PIT | market 0 | projected 43 (8.6 a week) | last 3 weeks 10.6 a week | lineup value 15.5
1339 | Zach Ertz | TE | age 35 | PHI | market 0 | projected 41.5 (8.3 a week) | last 3 weeks 9.6 a week | lineup value 1.2
8476 | DaRon Bland | DB | age 27 | DAL | market 0 | projected 41.4 (8.3 a week) | last 3 weeks 9 a week | lineup value 0

CANDIDATE DEALS (from a rules-based finder; points are the finder projections for the rest of the season):
c1 | partnerId 8 | I give Nate Landman + Patrick Mahomes (8659,4046) | I get Kyle Monangai + Cam Ward (12534,12522) | my points -68.9 | their points 45.8 | likelihood 0.65
c2 | partnerId 1 | I give Nate Landman + Patrick Mahomes (8659,4046) | I get Jonathon Brooks (11583) | my points -105.6 | their points 41.3 | likelihood 0.73
c3 | partnerId 1 | I give Aidan Hutchinson + Patrick Mahomes (8289,4046) | I get Jonathon Brooks + Cooper Kupp (11583,4039) | my points -80.8 | their points 41 | likelihood 0.73
c4 | partnerId 1 | I give Patrick Mahomes + Demetrius Knight (4046,12617) | I get Mason Taylor (12498) | my points -95.8 | their points 34.3 | likelihood 0.7
c5 | partnerId 1 | I give Patrick Mahomes + Zaven Collins (4046,7637) | I get Mason Taylor + Jonathon Brooks (12498,11583) | my points -76.8 | their points 37 | likelihood 0.68
c6 | partnerId 8 | I give Patrick Mahomes + Demetrius Knight (4046,12617) | I get Kyle Monangai (12534) | my points -95.8 | their points 36.8 | likelihood 0.65
c7 | partnerId 8 | I give Patrick Mahomes + Nakobe Dean (4046,8267) | I get Kyle Monangai + MarShawn Lloyd (12534,11581) | my points -95.9 | their points 36 | likelihood 0.64
c8 | partnerId 2 | I give Nate Landman + Kimani Vidal (8659,11647) | I get DeAndre Hopkins + Pat Bryant (1426,12492) | my points -47.4 | their points 45.7 | likelihood 0.67
c9 | partnerId 2 | I give Demetrius Knight + Kimani Vidal (12617,11647) | I get Pat Bryant (12492) | my points -37.6 | their points 39.3 | likelihood 0.67
c10 | partnerId 2 | I give Nakobe Dean + Kimani Vidal (8267,11647) | I get Keon Coleman + Pat Bryant (11637,12492) | my points -37.7 | their points 36 | likelihood 0.67

Pick the best trades for my team.

=========== CASE 1180947953223675904-w7-r3 ===========
REPLY FILE: /Users/anik/workspace/chrome/sleeper/.eval-market/replies/suggest-v2/heldout1/1180947953223675904-w7-r3.json
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
Lineup slots: QB, RB, WR, TE, FLEX, FLEX, K, DEF, DL, DL, DL, LB, LB, LB, DB, DB, DB, IDP_FLEX, IDP_FLEX, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN. Superflex: no. Tight end premium: no. Points per reception: 1.
Columns: id | name | position | age | team | market value | projected points for the rest of the regular season (and per week) | points per week over the last three weeks played | lineup value (points my lineup loses if this player is removed).

MY TEAM (partnerId me): record 3-3, rank 5, points for 1429.6, contention window 0.69
4034 | Christian McCaffrey | RB | age 30 | SF | market 4600 | projected 164.9 (20.6 a week) | last 3 weeks 26.7 a week | lineup value 81.7
11563 | Bo Nix | QB | age 26 | DEN | market 3824 | projected 132.1 (16.5 a week) | last 3 weeks 19.3 a week | lineup value 26
421 | Matthew Stafford | QB | age 38 | LAR | market 2729 | projected 124.3 (15.5 a week) | last 3 weeks 20.8 a week | lineup value 3.2
4960 | Roquan Smith | LB | age 29 | BAL | market 0 | projected 118.6 (14.8 a week) | last 3 weeks 1.3 a week | lineup value 40.9
1373 | Geno Smith | QB | age 36 | NYJ | market 1712 | projected 112.3 (14 a week) | last 3 weeks 10.1 a week | lineup value 1.1
10880 | Jack Campbell | LB | age 26 | DET | market 0 | projected 106.6 (13.3 a week) | last 3 weeks 18.6 a week | lineup value 26.5
6315 | Tyrel Dodson | LB | age 28 | CAR | market 0 | projected 104.1 (13 a week) | last 3 weeks 9.5 a week | lineup value 24.1
12514 | Emeka Egbuka | WR | age 24 | TB | market 4519 | projected 102.4 (12.8 a week) | last 3 weeks 18.6 a week | lineup value 23.8
12512 | Quinshon Judkins | RB | age 22 | CLE | market 4396 | projected 99.1 (12.4 a week) | last 3 weeks 13 a week | lineup value 16.6
2617 | Alex Singleton | LB | age 32 | DEN | market 0 | projected 98.7 (12.3 a week) | last 3 weeks 15.8 a week | lineup value 30.2
7021 | Rico Dowdle | RB | age 28 | PIT | market 3264 | projected 97.7 (12.2 a week) | last 3 weeks 24.1 a week | lineup value 15.1
4118 | Alex Anzalone | LB | age 32 | TB | market 0 | projected 96.4 (12.1 a week) | last 3 weeks 18.8 a week | lineup value 16.3
4217 | George Kittle | TE | age 33 | SF | market 3142 | projected 96.3 (12 a week) | last 3 weeks 0 a week | lineup value 57.7
8323 | Jaquan Brisker | DB | age 27 | PIT | market 0 | projected 87.1 (10.9 a week) | last 3 weeks 6.4 a week | lineup value 25.2
8134 | Khalil Shakir | WR | age 26 | BUF | market 3140 | projected 86.4 (10.8 a week) | last 3 weeks 13.1 a week | lineup value 6.5
6141 | Drue Tranquill | LB | age 31 | KC | market 0 | projected 81 (10.1 a week) | last 3 weeks 9.2 a week | lineup value 7.7
6860 | Akeem Davis-Gaither | LB | age 29 | IND | market 0 | projected 78.5 (9.8 a week) | last 3 weeks 10.2 a week | lineup value 2.9
5892 | David Montgomery | RB | age 29 | HOU | market 3465 | projected 78.2 (9.8 a week) | last 3 weeks 9.2 a week | lineup value 0.5
7090 | Darnell Mooney | WR | age 28 | NYG | market 2373 | projected 78.1 (9.8 a week) | last 3 weeks 0.8 a week | lineup value 0
7069 | Alohi Gilman | DB | age 29 | KC | market 0 | projected 73 (9.1 a week) | last 3 weeks 9 a week | lineup value 26.7
8752 | Ja'Quan McMillian | DB | age 26 | DEN | market 0 | projected 70.2 (8.8 a week) | last 3 weeks 8.9 a week | lineup value 16.8
9753 | Zach Charbonnet | RB | age 25 | SEA | market 3188 | projected 68 (8.5 a week) | last 3 weeks 9.6 a week | lineup value 0
6056 | Dre Greenlaw | LB | age 29 | SF | market 0 | projected 66.2 (8.3 a week) | last 3 weeks 0 a week | lineup value 1.1
11655 | Tyrone Tracy | RB | age 26 | NYG | market 2984 | projected 65 (8.1 a week) | last 3 weeks 0.2 a week | lineup value 2.2
7627 | Greg Rousseau | DL | age 26 | BUF | market 0 | projected 58.8 (7.3 a week) | last 3 weeks 8.6 a week | lineup value 26.4
2747 | Jason Myers | K | age 35 | SEA | market 0 | projected 58.7 (7.3 a week) | last 3 weeks 9 a week | lineup value 17.4
5297 | Zach Sieler | DL | age 31 | MIA | market 0 | projected 57.9 (7.2 a week) | last 3 weeks 7.8 a week | lineup value 25.6
5341 | Taron Johnson | DB | age 30 | LV | market 0 | projected 57.4 (7.2 a week) | last 3 weeks 7.8 a week | lineup value 10.9
12557 | Jahdae Barron | DB | age 24 | DEN | market 0 | projected 55.1 (6.9 a week) | last 3 weeks 3.8 a week | lineup value 7.9
11626 | Xavier Legette | WR | age 25 | CAR | market 0 | projected 48.5 (6.1 a week) | last 3 weeks 4.7 a week | lineup value 0

PARTNER (partnerId 8): record 4-2, rank 3, points for 1493.8, contention window 0.95
9509 | Bijan Robinson | RB | age 24 | ATL | market 6371 | projected 164.9 (20.6 a week) | last 3 weeks 21.3 a week | lineup value 42.5
6813 | Jonathan Taylor | RB | age 27 | IND | market 5008 | projected 154.2 (19.3 a week) | last 3 weeks 23.3 a week | lineup value 46.7
96 | Aaron Rodgers | QB | age 42 | PIT | market 1826 | projected 116.5 (14.6 a week) | last 3 weeks 10.1 a week | lineup value 8.8
12527 | Ashton Jeanty | RB | age 22 | LV | market 5352 | projected 111.1 (13.9 a week) | last 3 weeks 22 a week | lineup value 5.1
2133 | Davante Adams | WR | age 33 | LAR | market 3375 | projected 108.6 (13.6 a week) | last 3 weeks 12.4 a week | lineup value 3.5
8144 | Chris Olave | WR | age 26 | NO | market 4416 | projected 107.6 (13.5 a week) | last 3 weeks 12.9 a week | lineup value 4
8137 | George Pickens | WR | age 25 | DAL | market 4762 | projected 105.5 (13.2 a week) | last 3 weeks 26.3 a week | lineup value 3.5
7526 | Jaylen Waddle | WR | age 27 | DEN | market 4001 | projected 102.5 (12.8 a week) | last 3 weeks 16 a week | lineup value 1.4
12567 | Malaki Starks | DB | age 22 | BAL | market 0 | projected 92.7 (11.6 a week) | last 3 weeks 9.8 a week | lineup value 46.7
12522 | Cam Ward | QB | age 24 | TEN | market 3041 | projected 88.8 (11.1 a week) | last 3 weeks 7.5 a week | lineup value 0
8136 | Rachaad White | RB | age 27 | WAS | market 2758 | projected 88.7 (11.1 a week) | last 3 weeks 16.4 a week | lineup value 5.4
6788 | Xavier McKinney | DB | age 28 | GB | market 0 | projected 88.2 (11 a week) | last 3 weeks 5.6 a week | lineup value 42.1
12640 | Teddye Buchanan | LB | age 24 | BAL | market 0 | projected 87.1 (10.9 a week) | last 3 weeks 18.3 a week | lineup value 33.9
11726 | Kamren Kinchens | DB | age 24 | LAR | market 0 | projected 86.4 (10.8 a week) | last 3 weeks 6 a week | lineup value 40.4
11742 | Cedric Gray | LB | age 23 | TEN | market 0 | projected 84.4 (10.6 a week) | last 3 weeks 26.2 a week | lineup value 30.9
7567 | Kenny Gainwell | RB | age 27 | TB | market 3127 | projected 79.7 (10 a week) | last 3 weeks 13.7 a week | lineup value 0
5872 | Deebo Samuel | WR | age 30 | SF | market 2701 | projected 79.7 (10 a week) | last 3 weeks 16.4 a week | lineup value 0
12545 | Tyler Shough | QB | age 27 | NO | market 3008 | projected 75.2 (9.4 a week) | last 3 weeks 0 a week | lineup value 4.9
7591 | Justin Fields | QB | age 27 | KC | market 1246 | projected 70.3 (8.8 a week) | last 3 weeks 19.3 a week | lineup value 6.4
7058 | Jaylinn Hawkins | DB | age 29 | BAL | market 0 | projected 69.3 (8.7 a week) | last 3 weeks 4.7 a week | lineup value 29.3
7002 | Juwan Johnson | TE | age 30 | NO | market 3116 | projected 68.7 (8.6 a week) | last 3 weeks 3.7 a week | lineup value 3
12506 | Harold Fannin | TE | age 22 | CLE | market 4703 | projected 68.1 (8.5 a week) | last 3 weeks 10.3 a week | lineup value 2.4

PARTNER (partnerId 5): record 4-2, rank 2, points for 1503, contention window 1
9221 | Jahmyr Gibbs | RB | age 24 | DET | market 6367 | projected 147.3 (18.4 a week) | last 3 weeks 14 a week | lineup value 64.5
6797 | Justin Herbert | QB | age 28 | LAC | market 3818 | projected 139.2 (17.4 a week) | last 3 weeks 17 a week | lineup value 17.4
3163 | Jared Goff | QB | age 32 | DET | market 3070 | projected 129.1 (16.1 a week) | last 3 weeks 16.9 a week | lineup value 20.2
6949 | Jordyn Brooks | LB | age 28 | MIA | market 0 | projected 117.1 (14.6 a week) | last 3 weeks 25.9 a week | lineup value 32.6
8392 | Nick Cross | DB | age 25 | WAS | market 0 | projected 112.3 (14 a week) | last 3 weeks 17.5 a week | lineup value 29.5
6815 | Zack Baun | LB | age 29 | PHI | market 0 | projected 111.7 (14 a week) | last 3 weeks 17.9 a week | lineup value 29
6807 | Patrick Queen | LB | age 27 | PIT | market 0 | projected 110.7 (13.8 a week) | last 3 weeks 14.2 a week | lineup value 15.7
9997 | Zay Flowers | WR | age 26 | BAL | market 4184 | projected 103.5 (12.9 a week) | last 3 weeks 12.4 a week | lineup value 25.7
7715 | Cam Bynum | DB | age 28 | IND | market 0 | projected 101.9 (12.7 a week) | last 3 weeks 7.5 a week | lineup value 19.1
6302 | Kaden Elliss | LB | age 31 | NO | market 0 | projected 101 (12.6 a week) | last 3 weeks 6.9 a week | lineup value 6
12474 | Woody Marks | RB | age 25 | HOU | market 3141 | projected 97.7 (12.2 a week) | last 3 weeks 0.8 a week | lineup value 11.8
6911 | Brandon Jones | DB | age 28 | DEN | market 0 | projected 94.1 (11.8 a week) | last 3 weeks 8.6 a week | lineup value 10.6
8280 | Nik Bonitto | DL | age 27 | DEN | market 0 | projected 93.3 (11.7 a week) | last 3 weeks 13.4 a week | lineup value 37
5859 | A.J. Brown | WR | age 29 | NE | market 4314 | projected 88.3 (11 a week) | last 3 weeks 8.7 a week | lineup value 15.5
11086 | Ivan Pace | LB | age 25 | MIN | market 0 | projected 88.1 (11 a week) | last 3 weeks 6.5 a week | lineup value 0
12591 | Xavier Watts | DB | age 24 | ATL | market 0 | projected 87.2 (10.9 a week) | last 3 weeks 6.8 a week | lineup value 0
11710 | Calen Bullock | DB | age 23 | HOU | market 0 | projected 86.2 (10.8 a week) | last 3 weeks 1.3 a week | lineup value 0.1
1479 | Keenan Allen | WR | age 34 | IND | market 2144 | projected 85.3 (10.7 a week) | last 3 weeks 10.7 a week | lineup value 11.3
11678 | Cooper DeJean | DB | age 23 | PHI | market 0 | projected 82 (10.2 a week) | last 3 weeks 11.7 a week | lineup value 2.4
8151 | Kenneth Walker | RB | age 25 | KC | market 4561 | projected 81.2 (10.2 a week) | last 3 weeks 8.8 a week | lineup value 2.4
7672 | Ernest Jones | LB | age 26 | SEA | market 0 | projected 76.1 (9.5 a week) | last 3 weeks 16.4 a week | lineup value 15.8
12140 | Omar Speights | LB | age 25 | LAR | market 0 | projected 75.1 (9.4 a week) | last 3 weeks 5.3 a week | lineup value 0.4

PARTNER (partnerId 11): record 5-1, rank 1, points for 1470.7, contention window 1
11564 | Drake Maye | QB | age 24 | NE | market 5076 | projected 145.3 (18.2 a week) | last 3 weeks 20.9 a week | lineup value 54
6794 | Justin Jefferson | WR | age 27 | MIN | market 4819 | projected 124.5 (15.6 a week) | last 3 weeks 14 a week | lineup value 42.1
7588 | Javonte Williams | RB | age 26 | DAL | market 4032 | projected 118.2 (14.8 a week) | last 3 weeks 18.1 a week | lineup value 45.4
5017 | Jessie Bates | DB | age 29 | ATL | market 0 | projected 114.6 (14.3 a week) | last 3 weeks 6.8 a week | lineup value 27.3
3233 | Kevin Byard | DB | age 33 | NE | market 0 | projected 105.7 (13.2 a week) | last 3 weeks 12.3 a week | lineup value 18.5
8293 | Coby Bryant | DB | age 27 | CHI | market 0 | projected 102.3 (12.8 a week) | last 3 weeks 4.8 a week | lineup value 24.9
12578 | Carson Schwesinger | LB | age 23 | CLE | market 0 | projected 96 (12 a week) | last 3 weeks 15.3 a week | lineup value 23.6
9228 | Bryce Young | QB | age 25 | CAR | market 2845 | projected 91.3 (11.4 a week) | last 3 weeks 14.3 a week | lineup value 0
8126 | Wan'Dale Robinson | WR | age 25 | TEN | market 3412 | projected 90.8 (11.4 a week) | last 3 weeks 11 a week | lineup value 18.7
11017 | Dee Winters | LB | age 25 | DAL | market 0 | projected 89.8 (11.2 a week) | last 3 weeks 14.3 a week | lineup value 16.2
4413 | Eric Wilson | LB | age 32 | MIN | market 0 | projected 86.3 (10.8 a week) | last 3 weeks 4.8 a week | lineup value 5.3
6790 | D'Andre Swift | RB | age 27 | CHI | market 3661 | projected 84.6 (10.6 a week) | last 3 weeks 13.8 a week | lineup value 13.5
12646 | Barrett Carter | LB | age 23 | CIN | market 0 | projected 80.4 (10 a week) | last 3 weeks 0 a week | lineup value 11.9
8359 | Marcus Jones | DB | age 27 | NE | market 0 | projected 80 (10 a week) | last 3 weeks 0 a week | lineup value 2.8
8384 | Zyon McCollum | DB | age 27 | TB | market 0 | projected 77.9 (9.7 a week) | last 3 weeks 5.7 a week | lineup value 3.5
10213 | Tre Tucker | WR | age 25 | LV | market 2699 | projected 74.8 (9.3 a week) | last 3 weeks 9.1 a week | lineup value 3.8
6119 | Devin White | LB | age 28 | DET | market 0 | projected 74.3 (9.3 a week) | last 3 weeks 17.9 a week | lineup value 1
10881 | Christian Gonzalez | DB | age 24 | NE | market 0 | projected 71.4 (8.9 a week) | last 3 weeks 9.1 a week | lineup value 0
5991 | Maxx Crosby | DL | age 29 | LV | market 0 | projected 68.1 (8.5 a week) | last 3 weeks 17.6 a week | lineup value 13.5
4071 | Marlon Humphrey | DB | age 30 | BAL | market 0 | projected 62.9 (7.9 a week) | last 3 weeks 5.4 a week | lineup value 0
11786 | Cam Little | K | age 23 | JAX | market 0 | projected 61.5 (7.7 a week) | last 3 weeks 5 a week | lineup value 61.5
10921 | Yaya Diaby | DL | age 27 | TB | market 0 | projected 61.4 (7.7 a week) | last 3 weeks 8 a week | lineup value 6.9

PARTNER (partnerId 2): record 3-3, rank 7, points for 1390.8, contention window 0.44
6904 | Jalen Hurts | QB | age 28 | PHI | market 4040 | projected 151.7 (19 a week) | last 3 weeks 20.2 a week | lineup value 30.1
5870 | Daniel Jones | QB | age 29 | IND | market 2576 | projected 124 (15.5 a week) | last 3 weeks 17.5 a week | lineup value 3.3
4866 | Saquon Barkley | RB | age 29 | PHI | market 4232 | projected 114.4 (14.3 a week) | last 3 weeks 15.3 a week | lineup value 42.8
10949 | Chamarri Conner | DB | age 26 | KC | market 0 | projected 101.3 (12.7 a week) | last 3 weeks 13.9 a week | lineup value 33.5
11604 | Brock Bowers | TE | age 23 | LV | market 5533 | projected 95.5 (11.9 a week) | last 3 weeks 3.2 a week | lineup value 35.7
6901 | Joshua Metellus | DB | age 28 | MIN | market 0 | projected 94.6 (11.8 a week) | last 3 weeks 8.4 a week | lineup value 33.2
4070 | T.J. Watt | DL | age 32 | PIT | market 0 | projected 93.6 (11.7 a week) | last 3 weeks 11.5 a week | lineup value 44.5
5045 | Courtland Sutton | WR | age 31 | DEN | market 3183 | projected 90.9 (11.4 a week) | last 3 weeks 13.2 a week | lineup value 19.4
1233 | Bobby Wagner | LB | age 35 | FA | market 0 | projected 87.9 (11 a week) | last 3 weeks 20.1 a week | lineup value 31.6
7136 | Kam Curl | DB | age 27 | LAR | market 0 | projected 84.1 (10.5 a week) | last 3 weeks 15.2 a week | lineup value 16.2
1213 | Harrison Smith | DB | age 37 | MIN | market 0 | projected 81.4 (10.2 a week) | last 3 weeks 4.3 a week | lineup value 4.4
9754 | Quentin Johnston | WR | age 25 | LAC | market 3434 | projected 80.8 (10.1 a week) | last 3 weeks 10.2 a week | lineup value 9.3
8333 | Alontae Taylor | DB | age 27 | TEN | market 0 | projected 77.2 (9.7 a week) | last 3 weeks 10.1 a week | lineup value 9.9
5001 | Dalton Schultz | TE | age 30 | HOU | market 3165 | projected 75.3 (9.4 a week) | last 3 weeks 6.3 a week | lineup value 0.8
7819 | Deommodore Lenoir | DB | age 27 | SF | market 0 | projected 74.7 (9.3 a week) | last 3 weeks 9.2 a week | lineup value 7.3
1945 | Chris Boswell | K | age 35 | PIT | market 0 | projected 73.6 (9.2 a week) | last 3 weeks 6.3 a week | lineup value 9.8
1339 | Zach Ertz | TE | age 35 | PHI | market 0 | projected 72.3 (9 a week) | last 3 weeks 7.5 a week | lineup value 4.3
2393 | Danielle Hunter | DL | age 31 | HOU | market 0 | projected 70.6 (8.8 a week) | last 3 weeks 5.3 a week | lineup value 21.4
843 | Cameron Heyward | DL | age 37 | PIT | market 0 | projected 69.6 (8.7 a week) | last 3 weeks 1.8 a week | lineup value 20.5
4098 | Kareem Hunt | RB | age 30 | FA | market 1815 | projected 68.1 (8.5 a week) | last 3 weeks 9.6 a week | lineup value 6.2
11676 | Mike Sainristil | DB | age 26 | WAS | market 0 | projected 68 (8.5 a week) | last 3 weeks 13.9 a week | lineup value 0.5
8259 | Cameron Dicker | K | age 26 | LAC | market 0 | projected 67.6 (8.4 a week) | last 3 weeks 9.3 a week | lineup value 3.8

CANDIDATE DEALS (from a rules-based finder; points are the finder projections for the rest of the season):
c1 | partnerId 8 | I give Dre Greenlaw + Akeem Davis-Gaither (6056,6860) | I get Nic Scourton (12562) | my points 15.4 | their points 16.1 | likelihood 0.79
c2 | partnerId 5 | I give Jack Campbell (10880) | I get Derrick Barnes + Tyler Nubin (7726,11674) | my points 11.9 | their points 13.6 | likelihood 0.8
c3 | partnerId 8 | I give Dre Greenlaw (6056) | I get Will McDonald + Nick Herbig (10883,10940) | my points 12.3 | their points 13.9 | likelihood 0.79
c4 | partnerId 11 | I give Alex Singleton (2617) | I get Derrick Brown + Maxx Crosby (6784,5991) | my points 9.4 | their points 12.6 | likelihood 0.8
c5 | partnerId 2 | I give Dre Greenlaw + Akeem Davis-Gaither (6056,6860) | I get Cameron Heyward (843) | my points 25.3 | their points 8.9 | likelihood 0.76
c6 | partnerId 2 | I give Akeem Davis-Gaither + Drue Tranquill (6860,6141) | I get Cameron Heyward + James Pearce (843,12585) | my points 14.7 | their points 12.4 | likelihood 0.76
c7 | partnerId 2 | I give Dre Greenlaw + Drue Tranquill (6056,6141) | I get Danielle Hunter + James Pearce (2393,12585) | my points 21.8 | their points 7.4 | likelihood 0.76

Pick the best trades for my team.

=========== CASE 1180995252055453696-w10-r1 ===========
REPLY FILE: /Users/anik/workspace/chrome/sleeper/.eval-market/replies/suggest-v2/heldout1/1180995252055453696-w10-r1.json
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
League: keeper, 10 teams, week 10, 5 regular season weeks left, playoffs start week 15
Lineup slots: QB, RB, RB, WR, WR, TE, FLEX, FLEX, BN, BN, BN, BN, BN, BN, BN, BN, BN. Superflex: no. Tight end premium: no. Points per reception: 1.
Columns: id | name | position | age | team | market value | projected points for the rest of the regular season (and per week) | points per week over the last three weeks played | lineup value (points my lineup loses if this player is removed).

MY TEAM (partnerId me): record 7-2, rank 2, points for 1218.9, contention window 1
4984 | Josh Allen | QB | age 30 | BUF | market 4667 | projected 117 (23.4 a week) | last 3 weeks 17.3 a week | lineup value 33.9
9221 | Jahmyr Gibbs | RB | age 24 | DET | market 6357 | projected 107.6 (21.5 a week) | last 3 weeks 14.2 a week | lineup value 54.3
9488 | Jaxon Smith-Njigba | WR | age 24 | SEA | market 5815 | projected 105.3 (21.1 a week) | last 3 weeks 16.1 a week | lineup value 53.1
8130 | Trey McBride | TE | age 26 | ARI | market 4901 | projected 86.5 (17.3 a week) | last 3 weeks 15.3 a week | lineup value 45.3
6804 | Jordan Love | QB | age 27 | GB | market 3314 | projected 83.1 (16.6 a week) | last 3 weeks 16.6 a week | lineup value 0
8228 | Jaylen Warren | RB | age 27 | PIT | market 3524 | projected 68.7 (13.7 a week) | last 3 weeks 15.3 a week | lineup value 15.4
6790 | D'Andre Swift | RB | age 27 | CHI | market 3656 | projected 59.9 (12 a week) | last 3 weeks 12 a week | lineup value 6.6
5872 | Deebo Samuel | WR | age 30 | SF | market 2709 | projected 52.6 (10.5 a week) | last 3 weeks 4.5 a week | lineup value 8.9
8122 | Zonovan Knight | RB | age 25 | ARI | market 0 | projected 51.6 (10.3 a week) | last 3 weeks 5.4 a week | lineup value 3.6
6819 | Michael Pittman | WR | age 29 | PIT | market 2998 | projected 50.2 (10 a week) | last 3 weeks 21.6 a week | lineup value 7.4
8676 | Rashid Shaheed | WR | age 28 | SEA | market 2683 | projected 43.1 (8.6 a week) | last 3 weeks 11.1 a week | lineup value 0
1339 | Zach Ertz | TE | age 35 | PHI | market 0 | projected 41.3 (8.3 a week) | last 3 weeks 9 a week | lineup value 0.1
12534 | Kyle Monangai | RB | age 24 | CHI | market 3771 | projected 40.7 (8.1 a week) | last 3 weeks 14.2 a week | lineup value 0
12519 | Luther Burden | WR | age 22 | CHI | market 4873 | projected 30.9 (6.2 a week) | last 3 weeks 1.3 a week | lineup value 0
12499 | Elic Ayomanor | WR | age 23 | TEN | market 2918 | projected 22.2 (4.4 a week) | last 3 weeks 7.2 a week | lineup value 0
8146 | Garrett Wilson | WR | age 26 | NYJ | market 4226 | projected 14.5 (2.9 a week) | last 3 weeks 0 a week | lineup value 1.7
9225 | Tank Bigsby | RB | age 24 | PHI | market 2852 | projected 11 (2.2 a week) | last 3 weeks 0 a week | lineup value 0
4981 | Calvin Ridley | WR | age 31 | TEN | market 2288 | projected 9.2 (1.8 a week) | last 3 weeks 0 a week | lineup value 0

PARTNER (partnerId 10): record 2-7, rank 9, points for 870.2, contention window 0
7569 | Nico Collins | WR | age 27 | HOU | market 4449 | projected 79.8 (16 a week) | last 3 weeks 7.1 a week | lineup value 24.5
11560 | Caleb Williams | QB | age 24 | CHI | market 4547 | projected 79 (15.8 a week) | last 3 weeks 18.4 a week | lineup value 16.1
12514 | Emeka Egbuka | WR | age 24 | TB | market 4531 | projected 71.8 (14.4 a week) | last 3 weeks 5.4 a week | lineup value 16.5
12512 | Quinshon Judkins | RB | age 22 | CLE | market 4362 | projected 69.2 (13.8 a week) | last 3 weeks 10.4 a week | lineup value 15.3
5870 | Daniel Jones | QB | age 29 | IND | market 2452 | projected 65.9 (13.2 a week) | last 3 weeks 19.8 a week | lineup value 3.1
8151 | Kenneth Walker | RB | age 25 | KC | market 4515 | projected 57.4 (11.5 a week) | last 3 weeks 4.9 a week | lineup value 3.5
5022 | Dallas Goedert | TE | age 31 | PHI | market 3134 | projected 55.4 (11.1 a week) | last 3 weeks 7.5 a week | lineup value 13.1
11647 | Kimani Vidal | RB | age 25 | LAC | market 2792 | projected 51.2 (10.2 a week) | last 3 weeks 9.7 a week | lineup value 10.7
5045 | Courtland Sutton | WR | age 31 | DEN | market 3196 | projected 49.9 (10 a week) | last 3 weeks 12.5 a week | lineup value 4.9
8167 | Christian Watson | WR | age 27 | GB | market 3677 | projected 49.3 (9.9 a week) | last 3 weeks 6.8 a week | lineup value 0.2
12493 | Oronde Gadsden | TE | age 23 | LAC | market 4210 | projected 45.3 (9.1 a week) | last 3 weeks 10.2 a week | lineup value 3.1
11624 | Xavier Worthy | WR | age 23 | KC | market 3493 | projected 41.3 (8.3 a week) | last 3 weeks 8 a week | lineup value 0.1
9500 | Josh Downs | WR | age 25 | IND | market 3354 | projected 37.2 (7.4 a week) | last 3 weeks 9.2 a week | lineup value 0
11435 | Emanuel Wilson | RB | age 27 | SEA | market 2467 | projected 37.2 (7.4 a week) | last 3 weeks 5.3 a week | lineup value 4
6770 | Joe Burrow | QB | age 29 | CIN | market 4033 | projected 34.2 (6.8 a week) | last 3 weeks 0 a week | lineup value 1.9
11584 | Bucky Irving | RB | age 24 | TB | market 4286 | projected 29.2 (5.8 a week) | last 3 weeks 0 a week | lineup value 4.7
12533 | Jacory Croskey-Merritt | RB | age 25 | WAS | market 3218 | projected 27.7 (5.5 a week) | last 3 weeks 3.9 a week | lineup value 0
9504 | Kayshon Boutte | WR | age 24 | HOU | market 2978 | projected 18.6 (3.7 a week) | last 3 weeks 10 a week | lineup value 0

PARTNER (partnerId 9): record 2-7, rank 8, points for 911.2, contention window 0.11
7547 | Amon-Ra St. Brown | WR | age 26 | DET | market 5321 | projected 97.8 (19.6 a week) | last 3 weeks 13.1 a week | lineup value 46.9
3163 | Jared Goff | QB | age 32 | DET | market 3026 | projected 90.4 (18.1 a week) | last 3 weeks 9.9 a week | lineup value 19.1
3294 | Dak Prescott | QB | age 33 | DAL | market 3207 | projected 80.1 (16 a week) | last 3 weeks 15.8 a week | lineup value 8.8
9224 | Chase Brown | RB | age 26 | CIN | market 4488 | projected 63.2 (12.6 a week) | last 3 weeks 18.9 a week | lineup value 27.1
12529 | TreVeyon Henderson | RB | age 23 | NE | market 4319 | projected 60.9 (12.2 a week) | last 3 weeks 5.9 a week | lineup value 21.8
7553 | Kyle Pitts | TE | age 26 | ATL | market 3969 | projected 52.4 (10.5 a week) | last 3 weeks 12 a week | lineup value 12
8136 | Rachaad White | RB | age 27 | WAS | market 2725 | projected 51.6 (10.3 a week) | last 3 weeks 5.5 a week | lineup value 11.8
7090 | Darnell Mooney | WR | age 28 | NYG | market 2374 | projected 49.3 (9.9 a week) | last 3 weeks 4.8 a week | lineup value 1
12489 | RJ Harvey | RB | age 25 | DEN | market 3710 | projected 48.1 (9.6 a week) | last 3 weeks 16 a week | lineup value 12.8
4983 | DJ Moore | WR | age 29 | BUF | market 3660 | projected 48.1 (9.6 a week) | last 3 weeks 14.3 a week | lineup value 0.7
7002 | Juwan Johnson | TE | age 30 | NO | market 3127 | projected 43 (8.6 a week) | last 3 weeks 0 a week | lineup value 2.7
8142 | Alec Pierce | WR | age 26 | IND | market 3420 | projected 43 (8.6 a week) | last 3 weeks 8.8 a week | lineup value 1.4
11627 | Troy Franklin | WR | age 23 | DEN | market 3039 | projected 39.8 (8 a week) | last 3 weeks 16 a week | lineup value 1.2
6149 | Darius Slayton | WR | age 29 | IND | market 0 | projected 28.3 (5.7 a week) | last 3 weeks 5.3 a week | lineup value 0.6
5927 | Terry McLaurin | WR | age 31 | WAS | market 3401 | projected 24.1 (4.8 a week) | last 3 weeks 4.8 a week | lineup value 2.2
12469 | Dylan Sampson | RB | age 22 | CLE | market 3264 | projected 20.7 (4.1 a week) | last 3 weeks 0 a week | lineup value 0
9484 | Tucker Kraft | TE | age 25 | GB | market 4154 | projected 0 (0 a week) | last 3 weeks 18 a week | lineup value 0
12530 | Travis Hunter | DB | age 23 | JAX | market 0 | projected 0 (0 a week) | last 3 weeks 8 a week | lineup value 0

PARTNER (partnerId 6): record 2-7, rank 10, points for 864.6, contention window 0
12527 | Ashton Jeanty | RB | age 22 | LV | market 5339 | projected 76.5 (15.3 a week) | last 3 weeks 8.1 a week | lineup value 32
11563 | Bo Nix | QB | age 26 | DEN | market 3784 | projected 74.6 (14.9 a week) | last 3 weeks 27.8 a week | lineup value 43.9
12474 | Woody Marks | RB | age 25 | HOU | market 3125 | projected 64.5 (12.9 a week) | last 3 weeks 10.1 a week | lineup value 20
4199 | Aaron Jones | RB | age 31 | MIN | market 2773 | projected 56.3 (11.3 a week) | last 3 weeks 5.6 a week | lineup value 11.8
11635 | Ladd McConkey | WR | age 24 | LAC | market 4614 | projected 55.8 (11.2 a week) | last 3 weeks 15.4 a week | lineup value 25.2
7567 | Kenny Gainwell | RB | age 27 | TB | market 3113 | projected 52.3 (10.5 a week) | last 3 weeks 4.5 a week | lineup value 7.8
8110 | Jake Ferguson | TE | age 27 | DAL | market 3464 | projected 43.8 (8.8 a week) | last 3 weeks 9.6 a week | lineup value 11.6
5844 | T.J. Hockenson | TE | age 29 | MIN | market 2965 | projected 41.6 (8.3 a week) | last 3 weeks 8 a week | lineup value 9.4
12490 | Bhayshul Tuten | RB | age 23 | JAX | market 4210 | projected 33.8 (6.8 a week) | last 3 weeks 3.9 a week | lineup value 0
11638 | Ricky Pearsall | WR | age 26 | SF | market 2215 | projected 31.2 (6.2 a week) | last 3 weeks 0 a week | lineup value 14
9758 | C.J. Stroud | QB | age 25 | HOU | market 3107 | projected 30.8 (6.2 a week) | last 3 weeks 13.9 a week | lineup value 0
4037 | Chris Godwin | WR | age 30 | TB | market 3096 | projected 26.9 (5.4 a week) | last 3 weeks 0 a week | lineup value 5
11628 | Marvin Harrison | WR | age 24 | HOU | market 3938 | projected 24.2 (4.8 a week) | last 3 weeks 10.1 a week | lineup value 10.2
11631 | Brian Thomas | WR | age 24 | JAX | market 3945 | projected 23.3 (4.7 a week) | last 3 weeks 4.9 a week | lineup value 2.2
10218 | Xavier Hutchinson | WR | age 26 | HOU | market 0 | projected 19.6 (3.9 a week) | last 3 weeks 8 a week | lineup value 0
8154 | Brian Robinson | RB | age 27 | ATL | market 3119 | projected 14.2 (2.8 a week) | last 3 weeks 5 a week | lineup value 0
8205 | Isiah Pacheco | RB | age 27 | DET | market 2541 | projected 12.9 (2.6 a week) | last 3 weeks 6.1 a week | lineup value 0

PARTNER (partnerId 3): record 5-4, rank 6, points for 985.4, contention window 0.42
11564 | Drake Maye | QB | age 24 | NE | market 4980 | projected 83.5 (16.7 a week) | last 3 weeks 21.6 a week | lineup value 83.5
4866 | Saquon Barkley | RB | age 29 | PHI | market 4215 | projected 79.3 (15.9 a week) | last 3 weeks 12.9 a week | lineup value 31.5
8155 | Breece Hall | RB | age 25 | NYJ | market 4243 | projected 71.6 (14.3 a week) | last 3 weeks 13.4 a week | lineup value 23.8
8150 | Kyren Williams | RB | age 26 | LAR | market 4531 | projected 71.2 (14.2 a week) | last 3 weeks 8.6 a week | lineup value 23.4
8144 | Chris Olave | WR | age 26 | NO | market 4432 | projected 62.8 (12.6 a week) | last 3 weeks 16.5 a week | lineup value 23.6
7526 | Jaylen Waddle | WR | age 27 | DEN | market 4015 | projected 59.5 (11.9 a week) | last 3 weeks 12.5 a week | lineup value 21.2
5892 | David Montgomery | RB | age 29 | HOU | market 3454 | projected 54.7 (10.9 a week) | last 3 weeks 5.3 a week | lineup value 6.9
8126 | Wan'Dale Robinson | WR | age 25 | TEN | market 3424 | projected 52.1 (10.4 a week) | last 3 weeks 12.3 a week | lineup value 13
5012 | Mark Andrews | TE | age 31 | BAL | market 3109 | projected 49.3 (9.9 a week) | last 3 weeks 7.3 a week | lineup value 6.5
4039 | Cooper Kupp | WR | age 33 | SEA | market 2101 | projected 43.2 (8.6 a week) | last 3 weeks 1.1 a week | lineup value 0
12517 | Colston Loveland | TE | age 22 | CHI | market 5273 | projected 42.8 (8.6 a week) | last 3 weeks 14 a week | lineup value 0
11571 | Isaiah Davis | RB | age 24 | NYJ | market 0 | projected 32.8 (6.6 a week) | last 3 weeks 7.7 a week | lineup value 0
12495 | Ollie Gordon | RB | age 22 | MIA | market 0 | projected 16.9 (3.4 a week) | last 3 weeks 5.9 a week | lineup value 0
2505 | Darren Waller | TE | age 34 | CAR | market 1422 | projected 16.2 (3.2 a week) | last 3 weeks 0 a week | lineup value 0
12503 | Isaiah Bond | WR | age 22 | CLE | market 0 | projected 10.5 (2.1 a week) | last 3 weeks 0 a week | lineup value 0
2216 | Mike Evans | WR | age 33 | SF | market 3188 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0
6803 | Brandon Aiyuk | WR | age 28 | SF | market 2490 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0
5849 | Kyler Murray | QB | age 29 | MIN | market 3322 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0

PARTNER (partnerId 7): record 5-4, rank 5, points for 1033.1, contention window 0.58
6904 | Jalen Hurts | QB | age 28 | PHI | market 3971 | projected 108.7 (21.7 a week) | last 3 weeks 16.5 a week | lineup value 27.6
4943 | Sam Darnold | QB | age 29 | SEA | market 2798 | projected 81.1 (16.2 a week) | last 3 weeks 9.4 a week | lineup value 0
6794 | Justin Jefferson | WR | age 27 | MIN | market 4840 | projected 75.4 (15.1 a week) | last 3 weeks 14.7 a week | lineup value 30.3
9997 | Zay Flowers | WR | age 26 | BAL | market 4193 | projected 72.9 (14.6 a week) | last 3 weeks 8.5 a week | lineup value 27.7
5850 | Josh Jacobs | RB | age 28 | GB | market 4023 | projected 72.8 (14.6 a week) | last 3 weeks 17.4 a week | lineup value 38.8
7543 | Travis Etienne | RB | age 27 | NO | market 3815 | projected 65.8 (13.2 a week) | last 3 weeks 7.3 a week | lineup value 23.6
8134 | Khalil Shakir | WR | age 26 | BUF | market 3147 | projected 61.5 (12.3 a week) | last 3 weeks 10.7 a week | lineup value 16.4
2449 | Stefon Diggs | WR | age 32 | WAS | market 2790 | projected 58 (11.6 a week) | last 3 weeks 12.4 a week | lineup value 19.9
4098 | Kareem Hunt | RB | age 30 | FA | market 1801 | projected 43.5 (8.7 a week) | last 3 weeks 10.5 a week | lineup value 8.2
4988 | Nick Chubb | RB | age 30 | FA | market 1792 | projected 30.3 (6.1 a week) | last 3 weeks 4.8 a week | lineup value 0
11626 | Xavier Legette | WR | age 25 | CAR | market 0 | projected 28.5 (5.7 a week) | last 3 weeks 10.4 a week | lineup value 0
3200 | Sterling Shepard | WR | age 33 | NYJ | market 1658 | projected 27.5 (5.5 a week) | last 3 weeks 2.8 a week | lineup value 0
7571 | Rashod Bateman | WR | age 26 | BAL | market 2484 | projected 23.9 (4.8 a week) | last 3 weeks 5.5 a week | lineup value 0
10236 | Dalton Kincaid | TE | age 26 | BUF | market 3777 | projected 19.7 (3.9 a week) | last 3 weeks 8.5 a week | lineup value 9.9
7594 | Chuba Hubbard | RB | age 27 | CAR | market 3344 | projected 15.9 (3.2 a week) | last 3 weeks 6.2 a week | lineup value 0
7611 | Rhamondre Stevenson | RB | age 28 | NE | market 3327 | projected 15.7 (3.1 a week) | last 3 weeks 7.6 a week | lineup value 0
10859 | Sam LaPorta | TE | age 25 | DET | market 4266 | projected 13 (2.6 a week) | last 3 weeks 8.7 a week | lineup value 3.2
3321 | Tyreek Hill | WR | age 31 | FA | market 2521 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0

CANDIDATE DEALS (from a rules-based finder; points are the finder projections for the rest of the season):
c1 | partnerId 10 | I give Luther Burden + Elic Ayomanor (12519,12499) | I get Nico Collins + Emeka Egbuka (7569,12514) | my points 31 | their points -47.2 | likelihood 0.87
c2 | partnerId 10 | I give Luther Burden + Rashid Shaheed (12519,8676) | I get Nico Collins + Quinshon Judkins (7569,12512) | my points 28.5 | their points -43.7 | likelihood 0.9
c3 | partnerId 9 | I give Luther Burden + Elic Ayomanor (12519,12499) | I get Chase Brown + TreVeyon Henderson (9224,12529) | my points 29.2 | their points -61.2 | likelihood 0.88
c4 | partnerId 10 | I give Luther Burden + Calvin Ridley (12519,4981) | I get Nico Collins + Kimani Vidal (7569,11647) | my points 27.3 | their points -35.9 | likelihood 0.93
c5 | partnerId 9 | I give Luther Burden + Tank Bigsby (12519,9225) | I get Chase Brown + Rachaad White (9224,8136) | my points 23.1 | their points -47.4 | likelihood 0.91
c6 | partnerId 9 | I give Luther Burden + Calvin Ridley (12519,4981) | I get Chase Brown + RJ Harvey (9224,12489) | my points 21.4 | their points -46.8 | likelihood 0.9
c7 | partnerId 6 | I give Luther Burden + Tank Bigsby (12519,9225) | I get Ladd McConkey + Woody Marks (11635,12474) | my points 14.9 | their points -48.6 | likelihood 0.88
c8 | partnerId 3 | I give Jordan Love + Luther Burden (6804,12519) | I get Saquon Barkley + Jaylen Waddle (4866,7526) | my points 30.8 | their points -37 | likelihood 0.76
c9 | partnerId 3 | I give Zach Ertz + Luther Burden (1339,12519) | I get Saquon Barkley + Breece Hall (4866,8155) | my points 30.8 | their points -52.5 | likelihood 0.65
c10 | partnerId 7 | I give Zach Ertz + Luther Burden (1339,12519) | I get Josh Jacobs + Stefon Diggs (5850,2449) | my points 34.5 | their points -38.1 | likelihood 0.76

Pick the best trades for my team.
