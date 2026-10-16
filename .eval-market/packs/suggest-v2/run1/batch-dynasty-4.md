You are answering fantasy football trade-advice cases. For each case below, follow the SYSTEM text, read the DATA, and write your JSON answer to the reply file named for that case.
Rules: write only the JSON object (no markdown fence, no commentary) to each reply file. Do not read any other file on disk. Do not look at any directory named truth or any file outside the reply paths. Work each case independently.

=========== CASE 1180184942900514816-w4-r9 ===========
REPLY FILE: /Users/anik/workspace/chrome/sleeper/.eval-market/replies/suggest-v2/run1/1180184942900514816-w4-r9.json
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
Lineup slots: QB, RB, RB, WR, WR, TE, FLEX, FLEX, FLEX, DEF, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN. Superflex: no. Tight end premium: no. Points per reception: 1.
Columns: id | name | position | age | team | market value | projected points for the rest of the regular season (and per week) | points per week over the last three weeks played | lineup value (points my lineup loses if this player is removed).

MY TEAM (partnerId me): record 2-1, rank 4, points for 399.3, contention window 0.82
3294 | Dak Prescott | QB | age 33 | DAL | market 3794 | projected 229.5 (20.9 a week) | last 3 weeks 16 a week | lineup value 105.1
9221 | Jahmyr Gibbs | RB | age 24 | DET | market 6366 | projected 205.4 (18.7 a week) | last 3 weeks 20.4 a week | lineup value 101.9
9493 | Puka Nacua | WR | age 25 | LAR | market 5686 | projected 187.9 (17.1 a week) | last 3 weeks 24.5 a week | lineup value 93.1
4866 | Saquon Barkley | RB | age 29 | PHI | market 4231 | projected 166.5 (15.1 a week) | last 3 weeks 15.1 a week | lineup value 64.3
5859 | A.J. Brown | WR | age 29 | NE | market 4313 | projected 130.2 (11.8 a week) | last 3 weeks 10.8 a week | lineup value 42
7543 | Travis Etienne | RB | age 27 | NO | market 3837 | projected 127.9 (11.6 a week) | last 3 weeks 15.7 a week | lineup value 24.4
8228 | Jaylen Warren | RB | age 27 | PIT | market 3537 | projected 122.3 (11.1 a week) | last 3 weeks 14.8 a week | lineup value 31
8110 | Jake Ferguson | TE | age 27 | DAL | market 3462 | projected 116.5 (10.6 a week) | last 3 weeks 15.1 a week | lineup value 16.3
9758 | C.J. Stroud | QB | age 25 | HOU | market 3555 | projected 116.5 (10.6 a week) | last 3 weeks 12.7 a week | lineup value 0
6801 | Tee Higgins | WR | age 27 | CIN | market 4116 | projected 114.3 (10.4 a week) | last 3 weeks 7.8 a week | lineup value 29.1
11604 | Brock Bowers | TE | age 23 | LV | market 5530 | projected 110.7 (10.1 a week) | last 3 weeks 11.3 a week | lineup value 34.2
7002 | Juwan Johnson | TE | age 30 | NO | market 3115 | projected 100.7 (9.2 a week) | last 3 weeks 14.2 a week | lineup value 2.7
12493 | Oronde Gadsden | TE | age 23 | LAC | market 4191 | projected 91.4 (8.3 a week) | last 3 weeks 3.2 a week | lineup value 6.3
5844 | T.J. Hockenson | TE | age 29 | MIN | market 2962 | projected 85.6 (7.8 a week) | last 3 weeks 7.5 a week | lineup value 0.3
9500 | Josh Downs | WR | age 25 | IND | market 3344 | projected 84.3 (7.7 a week) | last 3 weeks 6.6 a week | lineup value 0.2
DEN | Denver Broncos | DEF | age ? | DEN | market 0 | projected 77.7 (7.1 a week) | last 3 weeks 8.7 a week | lineup value 12.2
PHI | Philadelphia Eagles | DEF | age ? | PHI | market 0 | projected 76.5 (7 a week) | last 3 weeks 3.3 a week | lineup value 10.9
9508 | Tyjae Spears | RB | age 25 | TEN | market 2982 | projected 75.5 (6.9 a week) | last 3 weeks 0 a week | lineup value 0
8132 | Tyler Allgeier | RB | age 26 | ARI | market 3203 | projected 71.7 (6.5 a week) | last 3 weeks 6.3 a week | lineup value 0
4033 | David Njoku | TE | age 30 | LAC | market 2851 | projected 69.6 (6.3 a week) | last 3 weeks 7.9 a week | lineup value 0
3161 | Carson Wentz | QB | age 33 | MIN | market 0 | projected 66.2 (6 a week) | last 3 weeks 0 a week | lineup value 0
9486 | Dontayvion Wicks | WR | age 25 | PHI | market 2552 | projected 47.3 (4.3 a week) | last 3 weeks 5.8 a week | lineup value 0
4381 | Taysom Hill | TE | age 35 | FA | market 1530 | projected 42.8 (3.9 a week) | last 3 weeks 0 a week | lineup value 0
6770 | Joe Burrow | QB | age 29 | CIN | market 4804 | projected 41.1 (3.7 a week) | last 3 weeks 6.6 a week | lineup value 0
5927 | Terry McLaurin | WR | age 31 | WAS | market 3392 | projected 36.3 (3.3 a week) | last 3 weeks 8.3 a week | lineup value 4.4
11577 | Will Shipley | RB | age 24 | PHI | market 0 | projected 19.2 (1.7 a week) | last 3 weeks 0.9 a week | lineup value 0
10222 | Jayden Reed | WR | age 26 | GB | market 3364 | projected 7.1 (0.6 a week) | last 3 weeks 4.5 a week | lineup value 0
9229 | Anthony Richardson | QB | age 24 | IND | market 0 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0

PARTNER (partnerId 8): record 1-2, rank 10, points for 313.3, contention window 0.05
4892 | Baker Mayfield | QB | age 31 | TB | market 3398 | projected 220.2 (20 a week) | last 3 weeks 24.1 a week | lineup value 82
8144 | Chris Olave | WR | age 26 | NO | market 4415 | projected 147.9 (13.4 a week) | last 3 weeks 13.2 a week | lineup value 88.2
7591 | Justin Fields | QB | age 27 | KC | market 1368 | projected 139.1 (12.6 a week) | last 3 weeks 11.8 a week | lineup value 1
7525 | DeVonta Smith | WR | age 27 | PHI | market 4156 | projected 139 (12.6 a week) | last 3 weeks 11.3 a week | lineup value 81.2
5892 | David Montgomery | RB | age 29 | HOU | market 3463 | projected 113.8 (10.3 a week) | last 3 weeks 16.9 a week | lineup value 65.5
5947 | Jakobi Meyers | WR | age 29 | JAX | market 3295 | projected 109.5 (10 a week) | last 3 weeks 13.3 a week | lineup value 54.6
8112 | Drake London | WR | age 25 | ATL | market 4859 | projected 93 (8.5 a week) | last 3 weeks 10 a week | lineup value 52.5
4066 | Evan Engram | TE | age 32 | DEN | market 0 | projected 77.9 (7.1 a week) | last 3 weeks 2.4 a week | lineup value 27.1
4144 | Jonnu Smith | TE | age 31 | GB | market 0 | projected 77.9 (7.1 a week) | last 3 weeks 8.2 a week | lineup value 27.8
DET | Detroit Lions | DEF | age ? | DET | market 0 | projected 74.5 (6.8 a week) | last 3 weeks 6.3 a week | lineup value 74.5
4988 | Nick Chubb | RB | age 30 | FA | market 1806 | projected 74.1 (6.7 a week) | last 3 weeks 9.4 a week | lineup value 21.3
11626 | Xavier Legette | WR | age 25 | CAR | market 0 | projected 62.2 (5.7 a week) | last 3 weeks 1.6 a week | lineup value 11
7594 | Chuba Hubbard | RB | age 27 | CAR | market 3355 | projected 56.7 (5.2 a week) | last 3 weeks 15.4 a week | lineup value 15.1
12495 | Ollie Gordon | RB | age 22 | MIA | market 0 | projected 47.5 (4.3 a week) | last 3 weeks 4.5 a week | lineup value 6.4
4040 | JuJu Smith-Schuster | WR | age 29 | FA | market 1344 | projected 44.4 (4 a week) | last 3 weeks 3.7 a week | lineup value 0
5849 | Kyler Murray | QB | age 29 | MIN | market 3319 | projected 39.2 (3.6 a week) | last 3 weeks 18.1 a week | lineup value 0
11630 | Roman Wilson | WR | age 25 | PIT | market 0 | projected 39.1 (3.6 a week) | last 3 weeks 0.6 a week | lineup value 2.6
8117 | Jalen Tolbert | WR | age 27 | MIA | market 0 | projected 36.5 (3.3 a week) | last 3 weeks 0.3 a week | lineup value 2.6
12541 | Dont'e Thornton | WR | age 23 | LV | market 0 | projected 34.2 (3.1 a week) | last 3 weeks 4.8 a week | lineup value 0
5955 | Hunter Renfrow | WR | age 30 | FA | market 1331 | projected 23.1 (2.1 a week) | last 3 weeks 9.8 a week | lineup value 1.2
1689 | Adam Thielen | WR | age 35 | FA | market 2197 | projected 17.8 (1.6 a week) | last 3 weeks 2.2 a week | lineup value 0
11596 | Ben Sinnott | TE | age 24 | WAS | market 0 | projected 11.1 (1 a week) | last 3 weeks 0.6 a week | lineup value 0

PARTNER (partnerId 12): record 1-2, rank 9, points for 339.7, contention window 0.18
5870 | Daniel Jones | QB | age 29 | IND | market 2869 | projected 197.8 (18 a week) | last 3 weeks 14.2 a week | lineup value 5.1
12508 | Jaxson Dart | QB | age 23 | NYG | market 4764 | projected 157.6 (14.3 a week) | last 3 weeks 0 a week | lineup value 5.5
12514 | Emeka Egbuka | WR | age 24 | TB | market 4519 | projected 148.6 (13.5 a week) | last 3 weeks 17 a week | lineup value 47.8
11635 | Ladd McConkey | WR | age 24 | LAC | market 4597 | projected 140 (12.7 a week) | last 3 weeks 10.4 a week | lineup value 36.3
12526 | Tetairoa McMillan | WR | age 23 | CAR | market 4720 | projected 139.2 (12.7 a week) | last 3 weeks 11.9 a week | lineup value 36.9
8136 | Rachaad White | RB | age 27 | WAS | market 2758 | projected 129 (11.7 a week) | last 3 weeks 6.5 a week | lineup value 58.4
8126 | Wan'Dale Robinson | WR | age 25 | TEN | market 3410 | projected 125.3 (11.4 a week) | last 3 weeks 14.4 a week | lineup value 23
8148 | Jameson Williams | WR | age 25 | DET | market 4093 | projected 119.9 (10.9 a week) | last 3 weeks 10.6 a week | lineup value 21
12474 | Woody Marks | RB | age 25 | HOU | market 3140 | projected 115.6 (10.5 a week) | last 3 weeks 3.7 a week | lineup value 44.2
11566 | Jayden Daniels | QB | age 25 | WAS | market 4996 | projected 110.6 (10.1 a week) | last 3 weeks 15.3 a week | lineup value 12.4
8676 | Rashid Shaheed | WR | age 28 | SEA | market 2694 | projected 109.9 (10 a week) | last 3 weeks 10.9 a week | lineup value 4.2
11627 | Troy Franklin | WR | age 23 | DEN | market 3028 | projected 91.4 (8.3 a week) | last 3 weeks 11.7 a week | lineup value 0.1
12545 | Tyler Shough | QB | age 27 | NO | market 3410 | projected 85.3 (7.8 a week) | last 3 weeks 0 a week | lineup value 0
12499 | Elic Ayomanor | WR | age 23 | TEN | market 2913 | projected 81.6 (7.4 a week) | last 3 weeks 10.9 a week | lineup value 0
11597 | Theo Johnson | TE | age 25 | NYG | market 3211 | projected 81.1 (7.4 a week) | last 3 weeks 3.6 a week | lineup value 62.8
11610 | Malik Washington | WR | age 25 | MIA | market 2747 | projected 81 (7.4 a week) | last 3 weeks 6.9 a week | lineup value 0
LAR | Los Angeles Rams | DEF | age ? | LAR | market 0 | projected 78.1 (7.1 a week) | last 3 weeks 9 a week | lineup value 78.1
12481 | Cam Skattebo | RB | age 24 | NYG | market 4226 | projected 74.3 (6.8 a week) | last 3 weeks 13.6 a week | lineup value 32.9
11586 | Blake Corum | RB | age 25 | LAR | market 3569 | projected 56 (5.1 a week) | last 3 weeks 6.1 a week | lineup value 4.4
12519 | Luther Burden | WR | age 22 | CHI | market 4865 | projected 54.5 (5 a week) | last 3 weeks 7.3 a week | lineup value 1.3
12455 | Brashard Smith | RB | age 23 | KC | market 2699 | projected 38.3 (3.5 a week) | last 3 weeks 0.5 a week | lineup value 1.9
12487 | Terrance Ferguson | TE | age 23 | LAR | market 3481 | projected 21.7 (2 a week) | last 3 weeks 0 a week | lineup value 3.4

PARTNER (partnerId 4): record 2-1, rank 2, points for 508.4, contention window 1
4034 | Christian McCaffrey | RB | age 30 | SF | market 4597 | projected 235.6 (21.4 a week) | last 3 weeks 23.3 a week | lineup value 152.9
6797 | Justin Herbert | QB | age 28 | LAC | market 4378 | projected 226.5 (20.6 a week) | last 3 weeks 24.4 a week | lineup value 41.1
6813 | Jonathan Taylor | RB | age 27 | IND | market 5007 | projected 214.3 (19.5 a week) | last 3 weeks 25 a week | lineup value 133
6768 | Tua Tagovailoa | QB | age 28 | ATL | market 2253 | projected 185.4 (16.9 a week) | last 3 weeks 15.6 a week | lineup value 0
8138 | James Cook | RB | age 27 | BUF | market 4895 | projected 178.2 (16.2 a week) | last 3 weeks 22.8 a week | lineup value 96.3
7564 | Ja'Marr Chase | WR | age 26 | CIN | market 5776 | projected 163.6 (14.9 a week) | last 3 weeks 16.7 a week | lineup value 88.4
5846 | DK Metcalf | WR | age 28 | PIT | market 3437 | projected 131.9 (12 a week) | last 3 weeks 11.8 a week | lineup value 48.8
5872 | Deebo Samuel | WR | age 30 | SF | market 2700 | projected 121.5 (11 a week) | last 3 weeks 15 a week | lineup value 46
7049 | Jauan Jennings | WR | age 29 | MIN | market 2832 | projected 102.1 (9.3 a week) | last 3 weeks 7.8 a week | lineup value 24.3
12533 | Jacory Croskey-Merritt | RB | age 25 | WAS | market 3247 | projected 100.1 (9.1 a week) | last 3 weeks 8.7 a week | lineup value 21.8
4217 | George Kittle | TE | age 33 | SF | market 3141 | projected 96.3 (8.8 a week) | last 3 weeks 4.2 a week | lineup value 55.4
NE | New England Patriots | DEF | age ? | NE | market 0 | projected 75.1 (6.8 a week) | last 3 weeks 7.7 a week | lineup value 16.8
BAL | Baltimore Ravens | DEF | age ? | BAL | market 0 | projected 72.3 (6.6 a week) | last 3 weeks 3.3 a week | lineup value 13.9
12490 | Bhayshul Tuten | RB | age 23 | JAX | market 4231 | projected 66.4 (6 a week) | last 3 weeks 8.2 a week | lineup value 3.8
8210 | Chig Okonkwo | TE | age 27 | WAS | market 3057 | projected 66.4 (6 a week) | last 3 weeks 8 a week | lineup value 10.3
10226 | Andrei Iosivas | WR | age 27 | CIN | market 0 | projected 61.1 (5.6 a week) | last 3 weeks 0.7 a week | lineup value 4.1
6826 | Cole Kmet | TE | age 27 | CHI | market 0 | projected 40.2 (3.7 a week) | last 3 weeks 5.7 a week | lineup value 0.1
8154 | Brian Robinson | RB | age 27 | ATL | market 3195 | projected 38.2 (3.5 a week) | last 3 weeks 3.3 a week | lineup value 0
11575 | Ray Davis | RB | age 26 | BUF | market 2515 | projected 32.4 (2.9 a week) | last 3 weeks 1.2 a week | lineup value 0
12544 | LeQuint Allen | RB | age 22 | JAX | market 0 | projected 26.8 (2.4 a week) | last 3 weeks 1.1 a week | lineup value 0
12547 | Kyle Williams | WR | age 23 | NE | market 2801 | projected 25.7 (2.3 a week) | last 3 weeks 1.3 a week | lineup value 0
12505 | Jalen Royals | WR | age 23 | KC | market 0 | projected 5.1 (0.5 a week) | last 3 weeks 0 a week | lineup value 0

PARTNER (partnerId 3): record 2-1, rank 7, points for 322, contention window 0.44
7523 | Trevor Lawrence | QB | age 27 | JAX | market 4110 | projected 186.1 (16.9 a week) | last 3 weeks 15.1 a week | lineup value 28.8
5850 | Josh Jacobs | RB | age 28 | GB | market 4034 | projected 162.8 (14.8 a week) | last 3 weeks 13.6 a week | lineup value 74.4
9228 | Bryce Young | QB | age 25 | CAR | market 3206 | projected 158.6 (14.4 a week) | last 3 weeks 16.4 a week | lineup value 1.3
8137 | George Pickens | WR | age 25 | DAL | market 4762 | projected 153 (13.9 a week) | last 3 weeks 13.9 a week | lineup value 57.2
8151 | Kenneth Walker | RB | age 25 | KC | market 4557 | projected 119 (10.8 a week) | last 3 weeks 14.1 a week | lineup value 27
11624 | Xavier Worthy | WR | age 23 | KC | market 3491 | projected 115.4 (10.5 a week) | last 3 weeks 0 a week | lineup value 19.6
6790 | D'Andre Swift | RB | age 27 | CHI | market 3660 | projected 109.9 (10 a week) | last 3 weeks 11.4 a week | lineup value 25.8
9754 | Quentin Johnston | WR | age 25 | LAC | market 3431 | projected 107.1 (9.7 a week) | last 3 weeks 18.6 a week | lineup value 20
9756 | Jordan Addison | WR | age 24 | MIN | market 3610 | projected 105.4 (9.6 a week) | last 3 weeks 0 a week | lineup value 13.1
7553 | Kyle Pitts | TE | age 26 | ATL | market 3955 | projected 97.3 (8.8 a week) | last 3 weeks 9.5 a week | lineup value 14.7
6783 | Jerry Jeudy | WR | age 27 | CLE | market 2699 | projected 97 (8.8 a week) | last 3 weeks 7.8 a week | lineup value 6.7
6806 | J.K. Dobbins | RB | age 27 | DEN | market 3331 | projected 91.3 (8.3 a week) | last 3 weeks 15.2 a week | lineup value 23.9
8111 | Cade Otton | TE | age 27 | TB | market 2962 | projected 80.7 (7.3 a week) | last 3 weeks 1.8 a week | lineup value 1.4
BUF | Buffalo Bills | DEF | age ? | BUF | market 0 | projected 75.8 (6.9 a week) | last 3 weeks 5.7 a week | lineup value 16.8
12534 | Kyle Monangai | RB | age 24 | CHI | market 3797 | projected 73.2 (6.7 a week) | last 3 weeks 3.2 a week | lineup value 4.2
SF | San Francisco 49ers | DEF | age ? | SF | market 0 | projected 66.4 (6 a week) | last 3 weeks 8 a week | lineup value 7.3
8167 | Christian Watson | WR | age 27 | GB | market 3660 | projected 60.6 (5.5 a week) | last 3 weeks 0 a week | lineup value 6
12501 | Matthew Golden | WR | age 23 | GB | market 3530 | projected 51.9 (4.7 a week) | last 3 weeks 5.1 a week | lineup value 0
2505 | Darren Waller | TE | age 34 | CAR | market 1414 | projected 46.7 (4.2 a week) | last 3 weeks 0 a week | lineup value 4
12503 | Isaiah Bond | WR | age 22 | CLE | market 0 | projected 42.2 (3.8 a week) | last 3 weeks 2.5 a week | lineup value 0
5995 | Justice Hill | RB | age 28 | BAL | market 2034 | projected 42.1 (3.8 a week) | last 3 weeks 4.3 a week | lineup value 0
11600 | Ja'Tavion Sanders | TE | age 23 | CAR | market 0 | projected 40.4 (3.7 a week) | last 3 weeks 6.7 a week | lineup value 0

PARTNER (partnerId 2): record 2-1, rank 6, points for 343.6, contention window 0.56
4984 | Josh Allen | QB | age 30 | BUF | market 5345 | projected 266.9 (24.3 a week) | last 3 weeks 27.9 a week | lineup value 100.5
1373 | Geno Smith | QB | age 36 | NYJ | market 1929 | projected 182.5 (16.6 a week) | last 3 weeks 18.2 a week | lineup value 16.1
6794 | Justin Jefferson | WR | age 27 | MIN | market 4817 | projected 154 (14 a week) | last 3 weeks 12.8 a week | lineup value 68.3
2449 | Stefon Diggs | WR | age 32 | WAS | market 2783 | projected 135 (12.3 a week) | last 3 weeks 8.1 a week | lineup value 52.3
1479 | Keenan Allen | WR | age 34 | IND | market 2142 | projected 125.2 (11.4 a week) | last 3 weeks 18.8 a week | lineup value 41.8
10213 | Tre Tucker | WR | age 25 | LV | market 2697 | projected 105 (9.5 a week) | last 3 weeks 19.7 a week | lineup value 16.7
5012 | Mark Andrews | TE | age 31 | BAL | market 3102 | projected 94.9 (8.6 a week) | last 3 weeks 10 a week | lineup value 13.5
5001 | Dalton Schultz | TE | age 30 | HOU | market 3164 | projected 90.9 (8.3 a week) | last 3 weeks 6.9 a week | lineup value 8.7
4039 | Cooper Kupp | WR | age 33 | SEA | market 2098 | projected 86.6 (7.9 a week) | last 3 weeks 8.2 a week | lineup value 10.2
4199 | Aaron Jones | RB | age 31 | MIN | market 2798 | projected 75.4 (6.9 a week) | last 3 weeks 6 a week | lineup value 31.7
11603 | AJ Barner | TE | age 24 | SEA | market 3514 | projected 73.7 (6.7 a week) | last 3 weeks 5.1 a week | lineup value 1
IND | Indianapolis Colts | DEF | age ? | IND | market 0 | projected 70.8 (6.4 a week) | last 3 weeks 5.3 a week | lineup value 24.9
7611 | Rhamondre Stevenson | RB | age 28 | NE | market 3350 | projected 70 (6.4 a week) | last 3 weeks 10.2 a week | lineup value 41
9504 | Kayshon Boutte | WR | age 24 | HOU | market 2964 | projected 67.8 (6.2 a week) | last 3 weeks 9.9 a week | lineup value 5.3
6130 | Devin Singletary | RB | age 29 | NYG | market 0 | projected 55.7 (5.1 a week) | last 3 weeks 0 a week | lineup value 18.4
TEN | Tennessee Titans | DEF | age ? | TEN | market 0 | projected 52.9 (4.8 a week) | last 3 weeks 0 a week | lineup value 7
9501 | DeMario Douglas | WR | age 25 | NE | market 0 | projected 49.7 (4.5 a week) | last 3 weeks 4.2 a week | lineup value 0
11584 | Bucky Irving | RB | age 24 | TB | market 4304 | projected 48.4 (4.4 a week) | last 3 weeks 15.5 a week | lineup value 21.7
12476 | Devin Neal | RB | age 23 | WAS | market 2801 | projected 47.8 (4.3 a week) | last 3 weeks 0.3 a week | lineup value 5.5
12497 | Tory Horton | WR | age 23 | SEA | market 2786 | projected 34.1 (3.1 a week) | last 3 weeks 9.8 a week | lineup value 0
4993 | Mike Gesicki | TE | age 31 | CIN | market 1197 | projected 32.6 (3 a week) | last 3 weeks 2.9 a week | lineup value 0
2216 | Mike Evans | WR | age 33 | SF | market 3189 | projected 15.5 (1.4 a week) | last 3 weeks 11.3 a week | lineup value 5

CANDIDATE DEALS (from a rules-based finder; points are the finder projections for the rest of the season):
c1 | partnerId 8 | I give Joe Burrow (6770) | I get Chris Olave + DeVonta Smith (8144,7525) | my points 55.7 | their points -176.5 | likelihood 0.89
c2 | partnerId 8 | I give Joe Burrow + Taysom Hill (6770,4381) | I get Chris Olave + Baker Mayfield (8144,4892) | my points 62.6 | their points -124.6 | likelihood 0.91
c3 | partnerId 12 | I give Tyler Allgeier (8132) | I get Rachaad White + Daniel Jones (8136,5870) | my points 59.7 | their points -55.3 | likelihood 0.93
c4 | partnerId 4 | I give Juwan Johnson (7002) | I get Tua Tagovailoa + Brian Robinson (6768,8154) | my points 15.9 | their points 22.4 | likelihood 0.64
c5 | partnerId 3 | I give Carson Wentz + Joe Burrow (3161,6770) | I get Josh Jacobs + Trevor Lawrence (5850,7523) | my points 80.1 | their points -61.8 | likelihood 0.79
c6 | partnerId 3 | I give C.J. Stroud + Juwan Johnson (9758,7002) | I get Bryce Young + J.K. Dobbins (9228,6806) | my points 34.5 | their points 4.7 | likelihood 0.69
c7 | partnerId 2 | I give Tyjae Spears + Tyler Allgeier (9508,8132) | I get Mike Evans + Braelon Allen (2216,11576) | my points 7.4 | their points 13.2 | likelihood 0.46

Pick the best trades for my team.

=========== CASE 1180184942900514816-w7-r2 ===========
REPLY FILE: /Users/anik/workspace/chrome/sleeper/.eval-market/replies/suggest-v2/run1/1180184942900514816-w7-r2.json
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
Lineup slots: QB, RB, RB, WR, WR, TE, FLEX, FLEX, FLEX, DEF, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN. Superflex: no. Tight end premium: no. Points per reception: 1.
Columns: id | name | position | age | team | market value | projected points for the rest of the regular season (and per week) | points per week over the last three weeks played | lineup value (points my lineup loses if this player is removed).

MY TEAM (partnerId me): record 3-3, rank 7, points for 683.4, contention window 0.44
4984 | Josh Allen | QB | age 30 | BUF | market 5350 | projected 188 (23.5 a week) | last 3 weeks 23.9 a week | lineup value 77.6
1373 | Geno Smith | QB | age 36 | NYJ | market 1929 | projected 126.6 (15.8 a week) | last 3 weeks 10.1 a week | lineup value 16.1
6794 | Justin Jefferson | WR | age 27 | MIN | market 4816 | projected 124.5 (15.6 a week) | last 3 weeks 14 a week | lineup value 54.3
2449 | Stefon Diggs | WR | age 32 | WAS | market 2782 | projected 99.7 (12.5 a week) | last 3 weeks 15.5 a week | lineup value 39.4
1479 | Keenan Allen | WR | age 34 | IND | market 2143 | projected 85.3 (10.7 a week) | last 3 weeks 8.7 a week | lineup value 24.5
4199 | Aaron Jones | RB | age 31 | MIN | market 2798 | projected 75.4 (9.4 a week) | last 3 weeks 0 a week | lineup value 31.3
5001 | Dalton Schultz | TE | age 30 | HOU | market 3163 | projected 75.3 (9.4 a week) | last 3 weeks 6.3 a week | lineup value 8.7
10213 | Tre Tucker | WR | age 25 | LV | market 2698 | projected 74.8 (9.3 a week) | last 3 weeks 9.1 a week | lineup value 9.1
5012 | Mark Andrews | TE | age 31 | BAL | market 3101 | projected 68.3 (8.5 a week) | last 3 weeks 6.9 a week | lineup value 9.4
11603 | AJ Barner | TE | age 24 | SEA | market 3513 | projected 55.9 (7 a week) | last 3 weeks 15.5 a week | lineup value 0.1
4039 | Cooper Kupp | WR | age 33 | SEA | market 2096 | projected 53.9 (6.7 a week) | last 3 weeks 10.2 a week | lineup value 0
IND | Indianapolis Colts | DEF | age ? | IND | market 0 | projected 48.4 (6.1 a week) | last 3 weeks 9 a week | lineup value 17.6
12476 | Devin Neal | RB | age 23 | WAS | market 2802 | projected 46.6 (5.8 a week) | last 3 weeks 0 a week | lineup value 5.5
9504 | Kayshon Boutte | WR | age 24 | HOU | market 2961 | projected 45.9 (5.7 a week) | last 3 weeks 12.1 a week | lineup value 5.3
6130 | Devin Singletary | RB | age 29 | NYG | market 0 | projected 42.1 (5.3 a week) | last 3 weeks 2.4 a week | lineup value 11.3
7611 | Rhamondre Stevenson | RB | age 28 | NE | market 3348 | projected 40.4 (5.1 a week) | last 3 weeks 7.2 a week | lineup value 18.3
9501 | DeMario Douglas | WR | age 25 | NE | market 0 | projected 37.9 (4.7 a week) | last 3 weeks 6.6 a week | lineup value 0
NYG | New York Giants | DEF | age ? | NYG | market 0 | projected 36.2 (4.5 a week) | last 3 weeks 3.3 a week | lineup value 5.4
11584 | Bucky Irving | RB | age 24 | TB | market 4304 | projected 29.6 (3.7 a week) | last 3 weeks 8.5 a week | lineup value 9.9
4993 | Mike Gesicki | TE | age 31 | CIN | market 1198 | projected 19.2 (2.4 a week) | last 3 weeks 1.8 a week | lineup value 0
2216 | Mike Evans | WR | age 33 | SF | market 3188 | projected 15.5 (1.9 a week) | last 3 weeks 0 a week | lineup value 5
12497 | Tory Horton | WR | age 23 | SEA | market 2785 | projected 14.3 (1.8 a week) | last 3 weeks 5 a week | lineup value 0
11299 | Zavier Scott | RB | age 27 | CHI | market 0 | projected 10.1 (1.3 a week) | last 3 weeks -0.1 a week | lineup value 4
11576 | Braelon Allen | RB | age 22 | NYJ | market 3225 | projected 0 (0 a week) | last 3 weeks 0.2 a week | lineup value 0
4018 | Joe Mixon | RB | age 30 | FA | market 2254 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0
1234 | Russell Wilson | QB | age 37 | FA | market 1666 | projected 0 (0 a week) | last 3 weeks 0.1 a week | lineup value 0

PARTNER (partnerId 9): record 5-1, rank 2, points for 851.9, contention window 1
3294 | Dak Prescott | QB | age 33 | DAL | market 3826 | projected 164.7 (20.6 a week) | last 3 weeks 33.9 a week | lineup value 73.9
9221 | Jahmyr Gibbs | RB | age 24 | DET | market 6364 | projected 147.3 (18.4 a week) | last 3 weeks 14 a week | lineup value 73.4
9493 | Puka Nacua | WR | age 25 | LAR | market 5684 | projected 124.3 (15.5 a week) | last 3 weeks 21.8 a week | lineup value 59.1
4866 | Saquon Barkley | RB | age 29 | PHI | market 4230 | projected 114.4 (14.3 a week) | last 3 weeks 14.6 a week | lineup value 41.9
8228 | Jaylen Warren | RB | age 27 | PIT | market 3536 | projected 110.4 (13.8 a week) | last 3 weeks 2.8 a week | lineup value 28.1
11604 | Brock Bowers | TE | age 23 | LV | market 5531 | projected 95.5 (11.9 a week) | last 3 weeks 3.2 a week | lineup value 30.3
7543 | Travis Etienne | RB | age 27 | NO | market 3837 | projected 90.8 (11.3 a week) | last 3 weeks 12.6 a week | lineup value 16.9
5859 | A.J. Brown | WR | age 29 | NE | market 4312 | projected 88.3 (11 a week) | last 3 weeks 8.7 a week | lineup value 25.2
9758 | C.J. Stroud | QB | age 25 | HOU | market 3568 | projected 85.6 (10.7 a week) | last 3 weeks 19.7 a week | lineup value 0
6801 | Tee Higgins | WR | age 27 | CIN | market 4114 | projected 81.1 (10.1 a week) | last 3 weeks 9.5 a week | lineup value 21
8110 | Jake Ferguson | TE | age 27 | DAL | market 3460 | projected 78.5 (9.8 a week) | last 3 weeks 17.7 a week | lineup value 7.7
12493 | Oronde Gadsden | TE | age 23 | LAC | market 4194 | projected 76.1 (9.5 a week) | last 3 weeks 5.9 a week | lineup value 6.1
7002 | Juwan Johnson | TE | age 30 | NO | market 3115 | projected 68.7 (8.6 a week) | last 3 weeks 3.7 a week | lineup value 0
5844 | T.J. Hockenson | TE | age 29 | MIN | market 2962 | projected 67.7 (8.5 a week) | last 3 weeks 5.9 a week | lineup value 0.1
9508 | Tyjae Spears | RB | age 25 | TEN | market 2977 | projected 61.6 (7.7 a week) | last 3 weeks 3.5 a week | lineup value 0
8132 | Tyler Allgeier | RB | age 26 | ARI | market 3206 | projected 58.2 (7.3 a week) | last 3 weeks 7.3 a week | lineup value 0
12485 | Tez Johnson | WR | age 24 | TB | market 0 | projected 58.2 (7.3 a week) | last 3 weeks 3.8 a week | lineup value 0.7
9500 | Josh Downs | WR | age 25 | IND | market 3343 | projected 56 (7 a week) | last 3 weeks 11.3 a week | lineup value 0
DEN | Denver Broncos | DEF | age ? | DEN | market 0 | projected 54 (6.8 a week) | last 3 weeks 10 a week | lineup value 11.1
PHI | Philadelphia Eagles | DEF | age ? | PHI | market 0 | projected 52 (6.5 a week) | last 3 weeks 6.3 a week | lineup value 9.1
4033 | David Njoku | TE | age 30 | LAC | market 2848 | projected 42 (5.3 a week) | last 3 weeks 9.2 a week | lineup value 0
6770 | Joe Burrow | QB | age 29 | CIN | market 4803 | projected 41.1 (5.1 a week) | last 3 weeks 0 a week | lineup value 0

PARTNER (partnerId 3): record 5-1, rank 3, points for 778.8, contention window 0.95
7523 | Trevor Lawrence | QB | age 27 | JAX | market 4125 | projected 131.2 (16.4 a week) | last 3 weeks 21.7 a week | lineup value 27.7
5850 | Josh Jacobs | RB | age 28 | GB | market 4033 | projected 127.8 (16 a week) | last 3 weeks 21.2 a week | lineup value 59.5
8137 | George Pickens | WR | age 25 | DAL | market 4760 | projected 105.5 (13.2 a week) | last 3 weeks 26.3 a week | lineup value 38
9228 | Bryce Young | QB | age 25 | CAR | market 3224 | projected 103.5 (12.9 a week) | last 3 weeks 17.6 a week | lineup value 0
9756 | Jordan Addison | WR | age 24 | MIN | market 3611 | projected 85.8 (10.7 a week) | last 3 weeks 10.2 a week | lineup value 11.7
6790 | D'Andre Swift | RB | age 27 | CHI | market 3660 | projected 84.6 (10.6 a week) | last 3 weeks 13.8 a week | lineup value 20.7
8151 | Kenneth Walker | RB | age 25 | KC | market 4559 | projected 81.2 (10.2 a week) | last 3 weeks 8.8 a week | lineup value 16.2
9754 | Quentin Johnston | WR | age 25 | LAC | market 3433 | projected 80.8 (10.1 a week) | last 3 weeks 10.2 a week | lineup value 13.2
7553 | Kyle Pitts | TE | age 26 | ATL | market 3956 | projected 80.4 (10 a week) | last 3 weeks 7.6 a week | lineup value 13.1
11624 | Xavier Worthy | WR | age 23 | KC | market 3488 | projected 76.3 (9.5 a week) | last 3 weeks 12.9 a week | lineup value 8.9
12534 | Kyle Monangai | RB | age 24 | CHI | market 3795 | projected 65.3 (8.2 a week) | last 3 weeks 2.4 a week | lineup value 4.2
6783 | Jerry Jeudy | WR | age 27 | CLE | market 2696 | projected 61.9 (7.7 a week) | last 3 weeks 6.9 a week | lineup value 0
8111 | Cade Otton | TE | age 27 | TB | market 2961 | projected 61.8 (7.7 a week) | last 3 weeks 8.7 a week | lineup value 1.4
8167 | Christian Watson | WR | age 27 | GB | market 3659 | projected 60.6 (7.6 a week) | last 3 weeks 0 a week | lineup value 6
6806 | J.K. Dobbins | RB | age 27 | DEN | market 3329 | projected 51.9 (6.5 a week) | last 3 weeks 10.3 a week | lineup value 11.5
BUF | Buffalo Bills | DEF | age ? | BUF | market 0 | projected 51.6 (6.4 a week) | last 3 weeks 6.3 a week | lineup value 10.9
SF | San Francisco 49ers | DEF | age ? | SF | market 0 | projected 48 (6 a week) | last 3 weeks 3 a week | lineup value 7.3
11600 | Ja'Tavion Sanders | TE | age 23 | CAR | market 0 | projected 40.4 (5 a week) | last 3 weeks 0 a week | lineup value 0
12501 | Matthew Golden | WR | age 23 | GB | market 3527 | projected 33.6 (4.2 a week) | last 3 weeks 8.2 a week | lineup value 0
2505 | Darren Waller | TE | age 34 | CAR | market 1414 | projected 25.7 (3.2 a week) | last 3 weeks 15.2 a week | lineup value 1
12535 | Isaac TeSlaa | WR | age 24 | DET | market 2787 | projected 25.4 (3.2 a week) | last 3 weeks 2.7 a week | lineup value 0
12503 | Isaiah Bond | WR | age 22 | CLE | market 0 | projected 23.7 (3 a week) | last 3 weeks 5.5 a week | lineup value 0

PARTNER (partnerId 5): record 5-1, rank 1, points for 885.6, contention window 1
6904 | Jalen Hurts | QB | age 28 | PHI | market 4517 | projected 169.6 (21.2 a week) | last 3 weeks 23.2 a week | lineup value 54.6
9226 | De'Von Achane | RB | age 25 | MIA | market 4987 | projected 151.8 (19 a week) | last 3 weeks 21.6 a week | lineup value 79.8
7547 | Amon-Ra St. Brown | WR | age 26 | DET | market 5297 | projected 137 (17.1 a week) | last 3 weeks 19.2 a week | lineup value 64.5
4943 | Sam Darnold | QB | age 29 | SEA | market 3311 | projected 136.1 (17 a week) | last 3 weeks 25.9 a week | lineup value 21.1
3198 | Derrick Henry | RB | age 32 | BAL | market 4135 | projected 119.6 (15 a week) | last 3 weeks 10.4 a week | lineup value 48.4
7588 | Javonte Williams | RB | age 26 | DAL | market 4030 | projected 118.2 (14.8 a week) | last 3 weeks 18.1 a week | lineup value 46.1
2133 | Davante Adams | WR | age 33 | LAR | market 3374 | projected 108.6 (13.6 a week) | last 3 weeks 12.4 a week | lineup value 36.1
8150 | Kyren Williams | RB | age 26 | LAR | market 4550 | projected 107.1 (13.4 a week) | last 3 weeks 19.4 a week | lineup value 34.5
8121 | Romeo Doubs | WR | age 26 | NE | market 3165 | projected 85.3 (10.7 a week) | last 3 weeks 13.4 a week | lineup value 9.6
4983 | DJ Moore | WR | age 29 | BUF | market 3646 | projected 83.2 (10.4 a week) | last 3 weeks 5.3 a week | lineup value 7
5022 | Dallas Goedert | TE | age 31 | PHI | market 3125 | projected 76.3 (9.5 a week) | last 3 weeks 18.9 a week | lineup value 8.6
3214 | Hunter Henry | TE | age 31 | NE | market 3151 | projected 70.5 (8.8 a week) | last 3 weeks 8.1 a week | lineup value 0
12498 | Mason Taylor | TE | age 22 | NYJ | market 3674 | projected 61.5 (7.7 a week) | last 3 weeks 10.1 a week | lineup value 0
4035 | Alvin Kamara | RB | age 31 | NO | market 2508 | projected 60.6 (7.6 a week) | last 3 weeks 11.1 a week | lineup value 8.6
MIN | Minnesota Vikings | DEF | age ? | MIN | market 0 | projected 49.2 (6.1 a week) | last 3 weeks 2.7 a week | lineup value 9.6
JAX | Jacksonville Jaguars | DEF | age ? | JAX | market 0 | projected 46.6 (5.8 a week) | last 3 weeks 3 a week | lineup value 7
12524 | Shedeur Sanders | QB | age 24 | CLE | market 2466 | projected 45.6 (5.7 a week) | last 3 weeks 0 a week | lineup value 0
5848 | Marquise Brown | WR | age 29 | PHI | market 0 | projected 41.6 (5.2 a week) | last 3 weeks 14 a week | lineup value 0
9484 | Tucker Kraft | TE | age 25 | GB | market 4150 | projected 36.8 (4.6 a week) | last 3 weeks 7.6 a week | lineup value 5.9
8917 | KaVontae Turpin | WR | age 30 | DAL | market 1161 | projected 33.4 (4.2 a week) | last 3 weeks 2.1 a week | lineup value 0
12641 | Jaylin Lane | WR | age 24 | WAS | market 0 | projected 32.3 (4 a week) | last 3 weeks 3.9 a week | lineup value 0
9511 | Keaton Mitchell | RB | age 24 | LAC | market 2856 | projected 29.4 (3.7 a week) | last 3 weeks 0.8 a week | lineup value 0

PARTNER (partnerId 1): record 4-2, rank 4, points for 880.6, contention window 0.82
9509 | Bijan Robinson | RB | age 24 | ATL | market 6368 | projected 164.9 (20.6 a week) | last 3 weeks 21.3 a week | lineup value 102.9
6804 | Jordan Love | QB | age 27 | GB | market 3883 | projected 157.5 (19.7 a week) | last 3 weeks 16.4 a week | lineup value 19
4881 | Lamar Jackson | QB | age 29 | BAL | market 5393 | projected 157.2 (19.7 a week) | last 3 weeks 4.2 a week | lineup value 27.7
421 | Matthew Stafford | QB | age 38 | LAR | market 3217 | projected 146.6 (18.3 a week) | last 3 weeks 25.4 a week | lineup value 0
6786 | CeeDee Lamb | WR | age 27 | DAL | market 4920 | projected 133.7 (16.7 a week) | last 3 weeks 0 a week | lineup value 82.7
8155 | Breece Hall | RB | age 25 | NYJ | market 4261 | projected 102.6 (12.8 a week) | last 3 weeks 13.2 a week | lineup value 47.5
12529 | TreVeyon Henderson | RB | age 23 | NE | market 4323 | projected 90.8 (11.4 a week) | last 3 weeks 7.3 a week | lineup value 35
11620 | Rome Odunze | WR | age 24 | CHI | market 4056 | projected 89.2 (11.1 a week) | last 3 weeks 7.4 a week | lineup value 32.1
1339 | Zach Ertz | TE | age 35 | PHI | market 0 | projected 72.3 (9 a week) | last 3 weeks 7.5 a week | lineup value 16.5
12506 | Harold Fannin | TE | age 22 | CLE | market 4701 | projected 68.1 (8.5 a week) | last 3 weeks 10.3 a week | lineup value 11.7
12517 | Colston Loveland | TE | age 22 | CHI | market 5257 | projected 62.3 (7.8 a week) | last 3 weeks 1 a week | lineup value 4.1
GB | Green Bay Packers | DEF | age ? | GB | market 0 | projected 61.2 (7.7 a week) | last 3 weeks -0.3 a week | lineup value 7.2
HOU | Houston Texans | DEF | age ? | HOU | market 0 | projected 57.4 (7.2 a week) | last 3 weeks 8.3 a week | lineup value 3.4
11628 | Marvin Harrison | WR | age 24 | HOU | market 3922 | projected 50.6 (6.3 a week) | last 3 weeks 12.5 a week | lineup value 16.2
4454 | Kendrick Bourne | WR | age 31 | ARI | market 0 | projected 46.9 (5.9 a week) | last 3 weeks 14.5 a week | lineup value 8
3200 | Sterling Shepard | WR | age 33 | NYJ | market 1658 | projected 41.7 (5.2 a week) | last 3 weeks 7.7 a week | lineup value 0
10236 | Dalton Kincaid | TE | age 26 | BUF | market 3770 | projected 40.1 (5 a week) | last 3 weeks 8.9 a week | lineup value 9.4
12502 | Gunnar Helm | TE | age 24 | TEN | market 3240 | projected 39.9 (5 a week) | last 3 weeks 4.4 a week | lineup value 0
7607 | Michael Carter | RB | age 27 | TEN | market 0 | projected 38.2 (4.8 a week) | last 3 weeks 8.9 a week | lineup value 0
10444 | Cedric Tillman | WR | age 26 | NO | market 0 | projected 37.6 (4.7 a week) | last 3 weeks 0.5 a week | lineup value 4.9
11623 | Jordan Whittington | WR | age 26 | LAR | market 0 | projected 32.4 (4 a week) | last 3 weeks 0 a week | lineup value 0
4080 | Zay Jones | WR | age 31 | FA | market 0 | projected 15.1 (1.9 a week) | last 3 weeks 0 a week | lineup value 0

CANDIDATE DEALS (from a rules-based finder; points are the finder projections for the rest of the season):
c1 | partnerId 9 | I give Geno Smith + Stefon Diggs (1373,2449) | I get Tyjae Spears + Juwan Johnson (9508,7002) | my points -39.4 | their points 39.7 | likelihood 0.65
c2 | partnerId 9 | I give Geno Smith + Mike Evans (1373,2216) | I get Tyjae Spears + Jayden Reed (9508,10222) | my points -14.7 | their points 25.5 | likelihood 0.66
c3 | partnerId 3 | I give Stefon Diggs + Mike Evans (2449,2216) | I get Jerry Jeudy + Matthew Golden (6783,12501) | my points -39.6 | their points 31.3 | likelihood 0.51
c4 | partnerId 5 | I give Stefon Diggs + Devin Neal (2449,12476) | I get Hunter Henry (3214) | my points -32 | their points 22.8 | likelihood 0.41
c5 | partnerId 9 | I give Stefon Diggs + Mike Evans (2449,2216) | I get Tyjae Spears + C.J. Stroud (9508,9758) | my points -35.9 | their points 25.4 | likelihood 0.41
c6 | partnerId 5 | I give Stefon Diggs (2449) | I get Hunter Henry + Shedeur Sanders (3214,12524) | my points -26.4 | their points 22.1 | likelihood 0.38
c7 | partnerId 1 | I give Stefon Diggs + Mike Evans (2449,2216) | I get Michael Carter + Jonathon Brooks (7607,11583) | my points -43.2 | their points 37.6 | likelihood 0.43
c8 | partnerId 5 | I give Stefon Diggs + Keenan Allen (2449,1479) | I get Hunter Henry + Chris Godwin (3214,4037) | my points -51.7 | their points 24.3 | likelihood 0.41

Pick the best trades for my team.

=========== CASE 1180185965862105088-w7-r9 ===========
REPLY FILE: /Users/anik/workspace/chrome/sleeper/.eval-market/replies/suggest-v2/run1/1180185965862105088-w7-r9.json
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
League: dynasty, 10 teams, week 7, 8 regular season weeks left, playoffs start week 15
Lineup slots: QB, RB, RB, WR, WR, TE, FLEX, FLEX, SUPER_FLEX, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN. Superflex: yes. Tight end premium: yes. Points per reception: 1.
Columns: id | name | position | age | team | market value | projected points for the rest of the regular season (and per week) | points per week over the last three weeks played | lineup value (points my lineup loses if this player is removed).

MY TEAM (partnerId me): record 3-3, rank 6, points for 811.5, contention window 0.42
6904 | Jalen Hurts | QB | age 28 | PHI | market 5313 | projected 142.3 (17.8 a week) | last 3 weeks 19.7 a week | lineup value 79.9
8138 | James Cook | RB | age 27 | BUF | market 4801 | projected 126.3 (15.8 a week) | last 3 weeks 14.1 a week | lineup value 74.5
11563 | Bo Nix | QB | age 26 | DEN | market 5015 | projected 123.6 (15.5 a week) | last 3 weeks 20.4 a week | lineup value 61.2
5045 | Courtland Sutton | WR | age 31 | DEN | market 3183 | projected 93.6 (11.7 a week) | last 3 weeks 14 a week | lineup value 23.7
8136 | Rachaad White | RB | age 27 | WAS | market 2721 | projected 90.1 (11.3 a week) | last 3 weeks 17.6 a week | lineup value 25.8
6790 | D'Andre Swift | RB | age 27 | CHI | market 3622 | projected 86.2 (10.8 a week) | last 3 weeks 15.8 a week | lineup value 21.9
11610 | Malik Washington | WR | age 25 | MIA | market 3397 | projected 74.8 (9.4 a week) | last 3 weeks 11.4 a week | lineup value 9
4066 | Evan Engram | TE | age 32 | DEN | market 0 | projected 74.1 (9.3 a week) | last 3 weeks 12.6 a week | lineup value 17.8
10232 | Michael Wilson | WR | age 26 | ARI | market 3651 | projected 70.4 (8.8 a week) | last 3 weeks 5.9 a week | lineup value 16.9
12485 | Tez Johnson | WR | age 24 | TB | market 0 | projected 67.2 (8.4 a week) | last 3 weeks 8.4 a week | lineup value 3.7
8112 | Drake London | WR | age 25 | ATL | market 4867 | projected 67.1 (8.4 a week) | last 3 weeks 21.3 a week | lineup value 25
4035 | Alvin Kamara | RB | age 31 | NO | market 2495 | projected 62.1 (7.8 a week) | last 3 weeks 11.8 a week | lineup value 20.6
7600 | Pat Freiermuth | TE | age 27 | PIT | market 2354 | projected 59.3 (7.4 a week) | last 3 weeks 0.9 a week | lineup value 0.6
11628 | Marvin Harrison | WR | age 24 | HOU | market 3920 | projected 52.1 (6.5 a week) | last 3 weeks 13.5 a week | lineup value 11
12502 | Gunnar Helm | TE | age 24 | TEN | market 3284 | projected 50.7 (6.3 a week) | last 3 weeks 5.7 a week | lineup value 1.3
8131 | Isaiah Likely | TE | age 26 | NYG | market 3474 | projected 50.4 (6.3 a week) | last 3 weeks 1.9 a week | lineup value 0.8
5848 | Marquise Brown | WR | age 29 | PHI | market 0 | projected 42.9 (5.4 a week) | last 3 weeks 14.5 a week | lineup value 0
12469 | Dylan Sampson | RB | age 22 | CLE | market 3262 | projected 29 (3.6 a week) | last 3 weeks 4 a week | lineup value 0
3271 | Tyler Higbee | TE | age 33 | LAR | market 0 | projected 24.8 (3.1 a week) | last 3 weeks 7.3 a week | lineup value 0
2216 | Mike Evans | WR | age 33 | SF | market 3179 | projected 15.9 (2 a week) | last 3 weeks 0 a week | lineup value 3.4
12530 | Travis Hunter | DB | age 23 | JAX | market 0 | projected 8.7 (1.1 a week) | last 3 weeks 7.8 a week | lineup value 0
12542 | Efton Chism | WR | age 24 | NE | market 0 | projected 3.7 (0.5 a week) | last 3 weeks 2.2 a week | lineup value 0
12462 | Damien Martinez | RB | age 22 | FA | market 2112 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0
12510 | Jalen Milroe | QB | age 23 | SEA | market 0 | projected 0 (0 a week) | last 3 weeks -0.7 a week | lineup value 0
5849 | Kyler Murray | QB | age 29 | MIN | market 4796 | projected 0 (0 a week) | last 3 weeks 11.3 a week | lineup value 0

PARTNER (partnerId 7): record 4-2, rank 3, points for 870.9, contention window 0.89
6813 | Jonathan Taylor | RB | age 27 | IND | market 4963 | projected 157.4 (19.7 a week) | last 3 weeks 25.5 a week | lineup value 81
6797 | Justin Herbert | QB | age 28 | LAC | market 4999 | projected 130.1 (16.3 a week) | last 3 weeks 17 a week | lineup value 40.3
7564 | Ja'Marr Chase | WR | age 26 | CIN | market 5789 | projected 120.3 (15 a week) | last 3 weeks 22 a week | lineup value 54.8
4866 | Saquon Barkley | RB | age 29 | PHI | market 4210 | projected 117.2 (14.7 a week) | last 3 weeks 15.5 a week | lineup value 40.9
12514 | Emeka Egbuka | WR | age 24 | TB | market 4502 | projected 105.1 (13.1 a week) | last 3 weeks 21.2 a week | lineup value 27.2
12526 | Tetairoa McMillan | WR | age 23 | CAR | market 4732 | projected 97.7 (12.2 a week) | last 3 weeks 14.5 a week | lineup value 20.1
9756 | Jordan Addison | WR | age 24 | MIN | market 3606 | projected 88.2 (11 a week) | last 3 weeks 11.5 a week | lineup value 4.3
8121 | Romeo Doubs | WR | age 26 | NE | market 3164 | projected 87.8 (11 a week) | last 3 weeks 14.3 a week | lineup value 3.1
5844 | T.J. Hockenson | TE | age 29 | MIN | market 2991 | projected 85.1 (10.6 a week) | last 3 weeks 7.8 a week | lineup value 9.6
12517 | Colston Loveland | TE | age 22 | CHI | market 5291 | projected 77 (9.6 a week) | last 3 weeks 1.5 a week | lineup value 1.5
4199 | Aaron Jones | RB | age 31 | MIN | market 2761 | projected 76.7 (9.6 a week) | last 3 weeks 0 a week | lineup value 7.1
11565 | J.J. McCarthy | QB | age 23 | NYG | market 2927 | projected 74 (9.3 a week) | last 3 weeks 0 a week | lineup value 9.2
19 | Joe Flacco | QB | age 41 | CIN | market 0 | projected 66.6 (8.3 a week) | last 3 weeks 7.5 a week | lineup value 3.4
9508 | Tyjae Spears | RB | age 25 | TEN | market 3113 | projected 66.3 (8.3 a week) | last 3 weeks 3.7 a week | lineup value 0
6806 | J.K. Dobbins | RB | age 27 | DEN | market 3265 | projected 52.4 (6.5 a week) | last 3 weeks 12.3 a week | lineup value 7.3
11626 | Xavier Legette | WR | age 25 | CAR | market 0 | projected 50.8 (6.4 a week) | last 3 weeks 4.6 a week | lineup value 0
12486 | Dillon Gabriel | QB | age 25 | CLE | market 0 | projected 46.4 (5.8 a week) | last 3 weeks 7.9 a week | lineup value 0
7571 | Rashod Bateman | WR | age 26 | BAL | market 2464 | projected 41.4 (5.2 a week) | last 3 weeks 1.8 a week | lineup value 0
12501 | Matthew Golden | WR | age 23 | GB | market 3541 | projected 34.7 (4.3 a week) | last 3 weeks 9.7 a week | lineup value 0
6770 | Joe Burrow | QB | age 29 | CIN | market 5306 | projected 32.4 (4 a week) | last 3 weeks 0 a week | lineup value 7.7
4037 | Chris Godwin | WR | age 30 | TB | market 3100 | projected 27.9 (3.5 a week) | last 3 weeks 4 a week | lineup value 1.3
3161 | Carson Wentz | QB | age 33 | MIN | market 0 | projected 27.5 (3.4 a week) | last 3 weeks 13.4 a week | lineup value 2.3

PARTNER (partnerId 6): record 4-2, rank 4, points for 834.3, contention window 0.73
4984 | Josh Allen | QB | age 30 | BUF | market 6329 | projected 158.7 (19.8 a week) | last 3 weeks 20.8 a week | lineup value 68.4
5850 | Josh Jacobs | RB | age 28 | GB | market 3979 | projected 129.8 (16.2 a week) | last 3 weeks 23.3 a week | lineup value 65.3
10229 | Rashee Rice | WR | age 26 | KC | market 4426 | projected 126.2 (15.8 a week) | last 3 weeks 0 a week | lineup value 41.8
5870 | Daniel Jones | QB | age 29 | IND | market 3276 | projected 112.5 (14.1 a week) | last 3 weeks 17.4 a week | lineup value 22
1466 | Travis Kelce | TE | age 37 | KC | market 2879 | projected 98.3 (12.3 a week) | last 3 weeks 18.2 a week | lineup value 13.9
1339 | Zach Ertz | TE | age 35 | PHI | market 0 | projected 89.2 (11.1 a week) | last 3 weeks 8.7 a week | lineup value 4.6
5872 | Deebo Samuel | WR | age 30 | SF | market 2893 | projected 87.9 (11 a week) | last 3 weeks 16.7 a week | lineup value 14.9
8148 | Jameson Williams | WR | age 25 | DET | market 4104 | projected 87.6 (11 a week) | last 3 weeks 9.4 a week | lineup value 5
7567 | Kenny Gainwell | RB | age 27 | TB | market 3288 | projected 86.3 (10.8 a week) | last 3 weeks 15.9 a week | lineup value 13.3
12506 | Harold Fannin | TE | age 22 | CLE | market 4748 | projected 85.1 (10.6 a week) | last 3 weeks 12.9 a week | lineup value 3.5
6801 | Tee Higgins | WR | age 27 | CIN | market 4107 | projected 83.4 (10.4 a week) | last 3 weeks 10.2 a week | lineup value 11.2
9754 | Quentin Johnston | WR | age 25 | LAC | market 3418 | projected 82.8 (10.3 a week) | last 3 weeks 10.6 a week | lineup value 1.6
4098 | Kareem Hunt | RB | age 30 | FA | market 1785 | projected 69 (8.6 a week) | last 3 weeks 10.4 a week | lineup value 8
5967 | Tony Pollard | RB | age 29 | TEN | market 3165 | projected 63.5 (7.9 a week) | last 3 weeks 11.3 a week | lineup value 1.5
9500 | Josh Downs | WR | age 25 | IND | market 3540 | projected 61 (7.6 a week) | last 3 weeks 12 a week | lineup value 0
8210 | Chig Okonkwo | TE | age 27 | WAS | market 3096 | projected 56.9 (7.1 a week) | last 3 weeks 9.2 a week | lineup value 0
11566 | Jayden Daniels | QB | age 25 | WAS | market 5836 | projected 54.5 (6.8 a week) | last 3 weeks 13.1 a week | lineup value 11.5
11559 | Michael Penix | QB | age 26 | ATL | market 2643 | projected 53.9 (6.7 a week) | last 3 weeks 12.2 a week | lineup value 1.4
12519 | Luther Burden | WR | age 22 | CHI | market 5224 | projected 47.4 (5.9 a week) | last 3 weeks 4.4 a week | lineup value 0
9504 | Kayshon Boutte | WR | age 24 | HOU | market 2960 | projected 47.2 (5.9 a week) | last 3 weeks 10 a week | lineup value 0
11586 | Blake Corum | RB | age 25 | LAR | market 3565 | projected 43.6 (5.4 a week) | last 3 weeks 2.7 a week | lineup value 0
12641 | Jaylin Lane | WR | age 24 | WAS | market 0 | projected 38.6 (4.8 a week) | last 3 weeks 3.7 a week | lineup value 0

PARTNER (partnerId 5): record 4-2, rank 2, points for 1032.4, contention window 1
9488 | Jaxon Smith-Njigba | WR | age 24 | SEA | market 5795 | projected 152.7 (19.1 a week) | last 3 weeks 26.6 a week | lineup value 57.3
4046 | Patrick Mahomes | QB | age 31 | KC | market 4550 | projected 146.3 (18.3 a week) | last 3 weeks 30.3 a week | lineup value 38.7
11564 | Drake Maye | QB | age 24 | NE | market 6622 | projected 135.2 (16.9 a week) | last 3 weeks 20.8 a week | lineup value 26.6
9493 | Puka Nacua | WR | age 25 | LAR | market 5706 | projected 128.5 (16.1 a week) | last 3 weeks 23.5 a week | lineup value 44.9
6804 | Jordan Love | QB | age 27 | GB | market 4422 | projected 127.9 (16 a week) | last 3 weeks 15.5 a week | lineup value 6.3
7588 | Javonte Williams | RB | age 26 | DAL | market 3970 | projected 119.9 (15 a week) | last 3 weeks 20.7 a week | lineup value 28.9
11604 | Brock Bowers | TE | age 23 | LV | market 5572 | projected 117.8 (14.7 a week) | last 3 weeks 4.2 a week | lineup value 34.3
7569 | Nico Collins | WR | age 27 | HOU | market 4431 | projected 115.2 (14.4 a week) | last 3 weeks 9.6 a week | lineup value 19.8
8155 | Breece Hall | RB | age 25 | NYJ | market 4206 | projected 104.3 (13 a week) | last 3 weeks 15.9 a week | lineup value 14.3
7021 | Rico Dowdle | RB | age 28 | PIT | market 3206 | projected 98.8 (12.4 a week) | last 3 weeks 29.2 a week | lineup value 10.3
8110 | Jake Ferguson | TE | age 27 | DAL | market 3495 | projected 98.8 (12.4 a week) | last 3 weeks 20.8 a week | lineup value 6.1
6819 | Michael Pittman | WR | age 29 | PIT | market 3008 | projected 94.7 (11.8 a week) | last 3 weeks 11.8 a week | lineup value 12.2
5022 | Dallas Goedert | TE | age 31 | PHI | market 3139 | projected 93 (11.6 a week) | last 3 weeks 22.8 a week | lineup value 2.4
7543 | Travis Etienne | RB | age 27 | NO | market 3793 | projected 92.4 (11.5 a week) | last 3 weeks 14.3 a week | lineup value 2
8151 | Kenneth Walker | RB | age 25 | KC | market 4474 | projected 82.1 (10.3 a week) | last 3 weeks 9.7 a week | lineup value 0.1
8111 | Cade Otton | TE | age 27 | TB | market 2987 | projected 76.9 (9.6 a week) | last 3 weeks 11.2 a week | lineup value 0
12533 | Jacory Croskey-Merritt | RB | age 25 | WAS | market 3180 | projected 69.2 (8.7 a week) | last 3 weeks 15.3 a week | lineup value 5.1
5947 | Jakobi Meyers | WR | age 29 | JAX | market 3303 | projected 68.3 (8.5 a week) | last 3 weeks 7.8 a week | lineup value 0
8167 | Christian Watson | WR | age 27 | GB | market 3643 | projected 62.1 (7.8 a week) | last 3 weeks 0 a week | lineup value 0
11646 | Jalen Coker | WR | age 24 | CAR | market 3276 | projected 50 (6.3 a week) | last 3 weeks 0 a week | lineup value 0
7611 | Rhamondre Stevenson | RB | age 28 | NE | market 3307 | projected 41.1 (5.1 a week) | last 3 weeks 8 a week | lineup value 1.3
12483 | Jack Bech | WR | age 23 | LV | market 2851 | projected 33.5 (4.2 a week) | last 3 weeks 2.2 a week | lineup value 0

CANDIDATE DEALS (from a rules-based finder; points are the finder projections for the rest of the season):
c1 | partnerId 7 | I give James Cook + Marvin Harrison (8138,11628) | I get Tyjae Spears + Colston Loveland (9508,12517) | my points -59 | their points 44.4 | likelihood 0.48
c2 | partnerId 6 | I give Rachaad White + Mike Evans (8136,2216) | I get Kayshon Boutte + Quentin Johnston (9504,9754) | my points -16.1 | their points 28.6 | likelihood 0.42
c3 | partnerId 6 | I give Rachaad White + Drake London (8136,8112) | I get Zach Ertz + Luther Burden (1339,12519) | my points -31 | their points 41.4 | likelihood 0.42
c4 | partnerId 5 | I give Rachaad White + Mike Evans (8136,2216) | I get Dallas Goedert + Jakobi Meyers (5022,5947) | my points 5.2 | their points 10.7 | likelihood 0.46
c5 | partnerId 7 | I give James Cook (8138) | I get Colston Loveland + Xavier Legette (12517,11626) | my points -68.3 | their points 41.9 | likelihood 0.42
c6 | partnerId 6 | I give Rachaad White (8136) | I get Kayshon Boutte (9504) | my points -20.9 | their points 26.2 | likelihood 0.4
c7 | partnerId 6 | I give Rachaad White + Alvin Kamara (8136,4035) | I get Zach Ertz + Kayshon Boutte (1339,9504) | my points -31.2 | their points 25.1 | likelihood 0.39

Pick the best trades for my team.

=========== CASE 1180189331122126848-w4-r7 ===========
REPLY FILE: /Users/anik/workspace/chrome/sleeper/.eval-market/replies/suggest-v2/run1/1180189331122126848-w4-r7.json
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
Lineup slots: QB, RB, RB, WR, WR, TE, TE, FLEX, FLEX, FLEX, SUPER_FLEX, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN. Superflex: yes. Tight end premium: yes. Points per reception: 1.
Columns: id | name | position | age | team | market value | projected points for the rest of the regular season (and per week) | points per week over the last three weeks played | lineup value (points my lineup loses if this player is removed).

MY TEAM (partnerId me): record 2-1, rank 5, points for 451.3, contention window 0.69
4892 | Baker Mayfield | QB | age 31 | TB | market 5061 | projected 227.2 (20.7 a week) | last 3 weeks 24.1 a week | lineup value 83
3163 | Jared Goff | QB | age 32 | DET | market 5368 | projected 221.9 (20.2 a week) | last 3 weeks 24.2 a week | lineup value 82.4
9226 | De'Von Achane | RB | age 25 | MIA | market 4987 | projected 215.6 (19.6 a week) | last 3 weeks 19.6 a week | lineup value 159.9
7591 | Justin Fields | QB | age 27 | KC | market 2035 | projected 143.4 (13 a week) | last 3 weeks 11.8 a week | lineup value 17.3
8121 | Romeo Doubs | WR | age 26 | NE | market 3166 | projected 104.8 (9.5 a week) | last 3 weeks 8.4 a week | lineup value 48.8
11647 | Kimani Vidal | RB | age 25 | LAC | market 2812 | projected 101.5 (9.2 a week) | last 3 weeks 0 a week | lineup value 56
10859 | Sam LaPorta | TE | age 25 | DET | market 4248 | projected 93 (8.5 a week) | last 3 weeks 12.2 a week | lineup value 87
10232 | Michael Wilson | WR | age 26 | ARI | market 3638 | projected 85.6 (7.8 a week) | last 3 weeks 3.7 a week | lineup value 31.3
12481 | Cam Skattebo | RB | age 24 | NYG | market 4225 | projected 74.3 (6.8 a week) | last 3 weeks 13.6 a week | lineup value 47.2
5857 | Noah Fant | TE | age 28 | NO | market 0 | projected 72.2 (6.6 a week) | last 3 weeks 5.8 a week | lineup value 66.2
11655 | Tyrone Tracy | RB | age 26 | NYG | market 2982 | projected 70.5 (6.4 a week) | last 3 weeks 6.7 a week | lineup value 29
12490 | Bhayshul Tuten | RB | age 23 | JAX | market 4230 | projected 66.4 (6 a week) | last 3 weeks 8.2 a week | lineup value 10.8
10226 | Andrei Iosivas | WR | age 27 | CIN | market 0 | projected 61.1 (5.6 a week) | last 3 weeks 0.7 a week | lineup value 8.7
12484 | Jayden Higgins | WR | age 23 | HOU | market 3437 | projected 60.5 (5.5 a week) | last 3 weeks 3.5 a week | lineup value 13.2
8143 | Jerome Ford | RB | age 27 | ARI | market 0 | projected 52.1 (4.7 a week) | last 3 weeks 5.6 a week | lineup value 1.7
9486 | Dontayvion Wicks | WR | age 25 | PHI | market 2552 | projected 47.3 (4.3 a week) | last 3 weeks 5.8 a week | lineup value 5
11623 | Jordan Whittington | WR | age 26 | LAR | market 0 | projected 41.9 (3.8 a week) | last 3 weeks 3.4 a week | lineup value 2.8
12469 | Dylan Sampson | RB | age 22 | CLE | market 3280 | projected 38.9 (3.5 a week) | last 3 weeks 9.5 a week | lineup value 0
12535 | Isaac TeSlaa | WR | age 24 | DET | market 2784 | projected 36.2 (3.3 a week) | last 3 weeks 4.1 a week | lineup value 1
12509 | Tre' Harris | WR | age 24 | LAC | market 2831 | projected 32.3 (2.9 a week) | last 3 weeks 2.5 a week | lineup value 0.9
5955 | Hunter Renfrow | WR | age 30 | FA | market 1330 | projected 23.1 (2.1 a week) | last 3 weeks 9.8 a week | lineup value 6.7
2216 | Mike Evans | WR | age 33 | SF | market 3188 | projected 15.5 (1.4 a week) | last 3 weeks 11.3 a week | lineup value 9.5
3321 | Tyreek Hill | WR | age 31 | FA | market 2519 | projected 14 (1.3 a week) | last 3 weeks 13.6 a week | lineup value 8.2
11629 | Devontez Walker | WR | age 25 | BAL | market 0 | projected 8.6 (0.8 a week) | last 3 weeks 7 a week | lineup value 0
5086 | Marquez Valdes-Scantling | WR | age 32 | LAC | market 0 | projected 7.5 (0.7 a week) | last 3 weeks 0.6 a week | lineup value 0
10222 | Jayden Reed | WR | age 26 | GB | market 3363 | projected 7.1 (0.6 a week) | last 3 weeks 4.5 a week | lineup value 1.1
5010 | Will Dissly | TE | age 29 | FA | market 1428 | projected 6.3 (0.6 a week) | last 3 weeks 2 a week | lineup value 0.3
8129 | Dameon Pierce | RB | age 26 | PHI | market 0 | projected 0.2 (0 a week) | last 3 weeks 0.2 a week | lineup value 0
11618 | Jalen McMillan | WR | age 24 | TB | market 2954 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0

PARTNER (partnerId 6): record 1-2, rank 10, points for 417.4, contention window 0.05
4046 | Patrick Mahomes | QB | age 31 | KC | market 5797 | projected 251.8 (22.9 a week) | last 3 weeks 22.8 a week | lineup value 191.3
4034 | Christian McCaffrey | RB | age 30 | SF | market 4596 | projected 235.6 (21.4 a week) | last 3 weeks 23.3 a week | lineup value 171.8
1466 | Travis Kelce | TE | age 37 | KC | market 2865 | projected 143.3 (13 a week) | last 3 weeks 12.3 a week | lineup value 71.6
6786 | CeeDee Lamb | WR | age 27 | DAL | market 4920 | projected 133.7 (12.2 a week) | last 3 weeks 12.7 a week | lineup value 76.5
1339 | Zach Ertz | TE | age 35 | PHI | market 0 | projected 130.3 (11.8 a week) | last 3 weeks 15.3 a week | lineup value 58.6
9758 | C.J. Stroud | QB | age 25 | HOU | market 5329 | projected 121 (11 a week) | last 3 weeks 13.7 a week | lineup value 60.5
12493 | Oronde Gadsden | TE | age 23 | LAC | market 4190 | projected 118.7 (10.8 a week) | last 3 weeks 4.5 a week | lineup value 47
11624 | Xavier Worthy | WR | age 23 | KC | market 3490 | projected 115.4 (10.5 a week) | last 3 weeks 0 a week | lineup value 35
4983 | DJ Moore | WR | age 29 | BUF | market 3647 | projected 105.5 (9.6 a week) | last 3 weeks 10.3 a week | lineup value 32.6
10213 | Tre Tucker | WR | age 25 | LV | market 2696 | projected 105 (9.5 a week) | last 3 weeks 19.7 a week | lineup value 31.3
8408 | Jordan Mason | RB | age 27 | MIN | market 3072 | projected 100.1 (9.1 a week) | last 3 weeks 12.6 a week | lineup value 39.5
12489 | RJ Harvey | RB | age 25 | DEN | market 3727 | projected 94.3 (8.6 a week) | last 3 weeks 5.3 a week | lineup value 28.5
9500 | Josh Downs | WR | age 25 | IND | market 3343 | projected 84.3 (7.7 a week) | last 3 weeks 6.6 a week | lineup value 17.3
11610 | Malik Washington | WR | age 25 | MIA | market 2747 | projected 81 (7.4 a week) | last 3 weeks 6.9 a week | lineup value 8.5
5848 | Marquise Brown | WR | age 29 | PHI | market 0 | projected 68 (6.2 a week) | last 3 weeks 12 a week | lineup value 3.1
12502 | Gunnar Helm | TE | age 24 | TEN | market 3243 | projected 66 (6 a week) | last 3 weeks 5.2 a week | lineup value 9.4
12540 | Chimere Dike | WR | age 24 | TEN | market 2865 | projected 64.8 (5.9 a week) | last 3 weeks 2.4 a week | lineup value 3.5
8205 | Isiah Pacheco | RB | age 27 | DET | market 2549 | projected 54.3 (4.9 a week) | last 3 weeks 4.8 a week | lineup value 1.7
12641 | Jaylin Lane | WR | age 24 | WAS | market 0 | projected 48.5 (4.4 a week) | last 3 weeks 3.4 a week | lineup value 3.7
12541 | Dont'e Thornton | WR | age 23 | LV | market 0 | projected 34.2 (3.1 a week) | last 3 weeks 4.8 a week | lineup value 0
12539 | Arian Smith | WR | age 25 | NYJ | market 0 | projected 24.1 (2.2 a week) | last 3 weeks 1 a week | lineup value 0
6943 | Gabe Davis | WR | age 26 | FA | market 1798 | projected 23.6 (2.1 a week) | last 3 weeks 0 a week | lineup value 0

PARTNER (partnerId 5): record 1-2, rank 12, points for 374.4, contention window 0
4943 | Sam Darnold | QB | age 29 | SEA | market 4950 | projected 200.3 (18.2 a week) | last 3 weeks 16 a week | lineup value 81.7
7588 | Javonte Williams | RB | age 26 | DAL | market 4030 | projected 165.7 (15.1 a week) | last 3 weeks 19.2 a week | lineup value 103.6
9228 | Bryce Young | QB | age 25 | CAR | market 4811 | projected 164.9 (15 a week) | last 3 weeks 17.4 a week | lineup value 46.3
12514 | Emeka Egbuka | WR | age 24 | TB | market 4518 | projected 148.6 (13.5 a week) | last 3 weeks 17 a week | lineup value 64.2
6819 | Michael Pittman | WR | age 29 | PIT | market 2989 | projected 129.1 (11.7 a week) | last 3 weeks 15.8 a week | lineup value 46.7
8126 | Wan'Dale Robinson | WR | age 25 | TEN | market 3410 | projected 125.3 (11.4 a week) | last 3 weeks 14.4 a week | lineup value 40.1
8148 | Jameson Williams | WR | age 25 | DET | market 4092 | projected 119.9 (10.9 a week) | last 3 weeks 10.6 a week | lineup value 35.1
12474 | Woody Marks | RB | age 25 | HOU | market 3139 | projected 115.6 (10.5 a week) | last 3 weeks 3.7 a week | lineup value 55.7
12498 | Mason Taylor | TE | age 22 | NYJ | market 3672 | projected 109.7 (10 a week) | last 3 weeks 4.9 a week | lineup value 45.3
11597 | Theo Johnson | TE | age 25 | NYG | market 3211 | projected 105.2 (9.6 a week) | last 3 weeks 5.1 a week | lineup value 40
7049 | Jauan Jennings | WR | age 29 | MIN | market 2832 | projected 102.1 (9.3 a week) | last 3 weeks 7.8 a week | lineup value 24.5
8183 | Brock Purdy | QB | age 26 | SF | market 6152 | projected 89.2 (8.1 a week) | last 3 weeks 7.6 a week | lineup value 15.9
12485 | Tez Johnson | WR | age 24 | TB | market 0 | projected 71.4 (6.5 a week) | last 3 weeks 0 a week | lineup value 6.5
4219 | Jeremy McNichols | RB | age 30 | WAS | market 0 | projected 63.3 (5.8 a week) | last 3 weeks 4.6 a week | lineup value 4.5
8146 | Garrett Wilson | WR | age 26 | NYJ | market 4216 | projected 59.6 (5.4 a week) | last 3 weeks 18.6 a week | lineup value 20.6
9494 | Marvin Mims | WR | age 24 | DEN | market 2741 | projected 55 (5 a week) | last 3 weeks 4.7 a week | lineup value 3
12519 | Luther Burden | WR | age 22 | CHI | market 4864 | projected 54.5 (5 a week) | last 3 weeks 7.3 a week | lineup value 4.6
6826 | Cole Kmet | TE | age 27 | CHI | market 0 | projected 52.6 (4.8 a week) | last 3 weeks 6.7 a week | lineup value 2.6
6039 | Ty Johnson | RB | age 29 | BUF | market 0 | projected 52 (4.7 a week) | last 3 weeks 2 a week | lineup value 2
12521 | Elijah Arroyo | TE | age 23 | SEA | market 0 | projected 50.5 (4.6 a week) | last 3 weeks 3 a week | lineup value 1.7
9501 | DeMario Douglas | WR | age 25 | NE | market 0 | projected 49.7 (4.5 a week) | last 3 weeks 4.2 a week | lineup value 0
11646 | Jalen Coker | WR | age 24 | CAR | market 3263 | projected 48.4 (4.4 a week) | last 3 weeks 0 a week | lineup value 1.6

PARTNER (partnerId 8): record 2-1, rank 3, points for 465.4, contention window 0.95
4984 | Josh Allen | QB | age 30 | BUF | market 7914 | projected 273.8 (24.9 a week) | last 3 weeks 27.9 a week | lineup value 214.9
8138 | James Cook | RB | age 27 | BUF | market 4893 | projected 178.2 (16.2 a week) | last 3 weeks 22.8 a week | lineup value 96.6
11635 | Ladd McConkey | WR | age 24 | LAC | market 4595 | projected 140 (12.7 a week) | last 3 weeks 10.4 a week | lineup value 59.4
8136 | Rachaad White | RB | age 27 | WAS | market 2757 | projected 129 (11.7 a week) | last 3 weeks 6.5 a week | lineup value 52.9
12506 | Harold Fannin | TE | age 22 | CLE | market 4696 | projected 125.1 (11.4 a week) | last 3 weeks 13.4 a week | lineup value 45.4
8111 | Cade Otton | TE | age 27 | TB | market 2961 | projected 105.6 (9.6 a week) | last 3 weeks 2.6 a week | lineup value 27.6
4144 | Jonnu Smith | TE | age 31 | GB | market 0 | projected 100.4 (9.1 a week) | last 3 weeks 11.2 a week | lineup value 27.6
9753 | Zach Charbonnet | RB | age 25 | SEA | market 3183 | projected 99.7 (9.1 a week) | last 3 weeks 3.9 a week | lineup value 18.9
11565 | J.J. McCarthy | QB | age 23 | NYG | market 3893 | projected 95.7 (8.7 a week) | last 3 weeks 10 a week | lineup value 55.9
8112 | Drake London | WR | age 25 | ATL | market 4858 | projected 93 (8.5 a week) | last 3 weeks 10 a week | lineup value 43.2
12499 | Elic Ayomanor | WR | age 23 | TEN | market 2913 | projected 81.6 (7.4 a week) | last 3 weeks 10.9 a week | lineup value 10.6
10236 | Dalton Kincaid | TE | age 26 | BUF | market 3769 | projected 76.4 (6.9 a week) | last 3 weeks 16.6 a week | lineup value 33.2
8132 | Tyler Allgeier | RB | age 26 | ARI | market 3203 | projected 71.7 (6.5 a week) | last 3 weeks 6.3 a week | lineup value 0.9
11637 | Keon Coleman | WR | age 23 | BUF | market 2736 | projected 71.1 (6.5 a week) | last 3 weeks 11.9 a week | lineup value 8.8
4950 | Christian Kirk | WR | age 29 | SF | market 2202 | projected 57.5 (5.2 a week) | last 3 weeks 1.8 a week | lineup value 0.2
7594 | Chuba Hubbard | RB | age 27 | CAR | market 3354 | projected 56.7 (5.2 a week) | last 3 weeks 15.4 a week | lineup value 8
11586 | Blake Corum | RB | age 25 | LAR | market 3568 | projected 56 (5.1 a week) | last 3 weeks 6.1 a week | lineup value 2.6
10444 | Cedric Tillman | WR | age 26 | NO | market 0 | projected 46.9 (4.3 a week) | last 3 weeks 10.7 a week | lineup value 3.8
11199 | Emari Demercado | RB | age 27 | DAL | market 0 | projected 44.2 (4 a week) | last 3 weeks 0 a week | lineup value 1.9
12503 | Isaiah Bond | WR | age 22 | CLE | market 0 | projected 42.2 (3.8 a week) | last 3 weeks 2.5 a week | lineup value 0
11625 | Adonai Mitchell | WR | age 24 | NYJ | market 2986 | projected 41 (3.7 a week) | last 3 weeks 2.7 a week | lineup value 5.5
5849 | Kyler Murray | QB | age 29 | MIN | market 4932 | projected 40.4 (3.7 a week) | last 3 weeks 18.5 a week | lineup value 21.2

PARTNER (partnerId 4): record 1-2, rank 6, points for 474.5, contention window 0.56
9221 | Jahmyr Gibbs | RB | age 24 | DET | market 6364 | projected 205.4 (18.7 a week) | last 3 weeks 20.4 a week | lineup value 106.3
9509 | Bijan Robinson | RB | age 24 | ATL | market 6368 | projected 203.5 (18.5 a week) | last 3 weeks 20.1 a week | lineup value 104.9
5850 | Josh Jacobs | RB | age 28 | GB | market 4033 | projected 162.8 (14.8 a week) | last 3 weeks 13.6 a week | lineup value 73.6
12527 | Ashton Jeanty | RB | age 22 | LV | market 5348 | projected 157.6 (14.3 a week) | last 3 weeks 8.6 a week | lineup value 58.5
11604 | Brock Bowers | TE | age 23 | LV | market 5529 | projected 143.5 (13 a week) | last 3 weeks 14.8 a week | lineup value 73.6
12526 | Tetairoa McMillan | WR | age 23 | CAR | market 4719 | projected 139.2 (12.7 a week) | last 3 weeks 11.9 a week | lineup value 44.5
7525 | DeVonta Smith | WR | age 27 | PHI | market 4155 | projected 139 (12.6 a week) | last 3 weeks 11.3 a week | lineup value 41.2
5022 | Dallas Goedert | TE | age 31 | PHI | market 3123 | projected 133.4 (12.1 a week) | last 3 weeks 9.2 a week | lineup value 54.9
7553 | Kyle Pitts | TE | age 26 | ATL | market 3954 | projected 126 (11.5 a week) | last 3 weeks 13.3 a week | lineup value 44.9
1479 | Keenan Allen | WR | age 34 | IND | market 2142 | projected 125.2 (11.4 a week) | last 3 weeks 18.8 a week | lineup value 30.2
11566 | Jayden Daniels | QB | age 25 | WAS | market 7410 | projected 113.7 (10.3 a week) | last 3 weeks 15.3 a week | lineup value 66.5
9754 | Quentin Johnston | WR | age 25 | LAC | market 3430 | projected 107.1 (9.7 a week) | last 3 weeks 18.6 a week | lineup value 22.8
4039 | Cooper Kupp | WR | age 33 | SEA | market 2097 | projected 86.6 (7.9 a week) | last 3 weeks 8.2 a week | lineup value 5.1
11562 | Spencer Rattler | QB | age 26 | NO | market 0 | projected 86.4 (7.9 a week) | last 3 weeks 18 a week | lineup value 52.4
12534 | Kyle Monangai | RB | age 24 | CHI | market 3796 | projected 73.2 (6.7 a week) | last 3 weeks 3.2 a week | lineup value 8.6
1166 | Kirk Cousins | QB | age 38 | LV | market 2523 | projected 69.7 (6.3 a week) | last 3 weeks 0.4 a week | lineup value 22
5906 | Dawson Knox | TE | age 29 | BUF | market 0 | projected 65.5 (6 a week) | last 3 weeks 3.6 a week | lineup value 0
9506 | Sean Tucker | RB | age 24 | TB | market 2807 | projected 60.5 (5.5 a week) | last 3 weeks 0.1 a week | lineup value 2
12524 | Shedeur Sanders | QB | age 24 | CLE | market 3735 | projected 47.8 (4.3 a week) | last 3 weeks 0 a week | lineup value 4.1
4993 | Mike Gesicki | TE | age 31 | CIN | market 1196 | projected 42.9 (3.9 a week) | last 3 weeks 4.2 a week | lineup value 1.7
6770 | Joe Burrow | QB | age 29 | CIN | market 7150 | projected 42.4 (3.9 a week) | last 3 weeks 6.6 a week | lineup value 8
4171 | Josh Reynolds | WR | age 31 | FA | market 1290 | projected 22.1 (2 a week) | last 3 weeks 1.3 a week | lineup value 0

PARTNER (partnerId 10): record 1-2, rank 7, points for 437.1, contention window 0.44
5870 | Daniel Jones | QB | age 29 | IND | market 4268 | projected 203.9 (18.5 a week) | last 3 weeks 24.7 a week | lineup value 113
6768 | Tua Tagovailoa | QB | age 28 | ATL | market 3369 | projected 192.1 (17.5 a week) | last 3 weeks 16.9 a week | lineup value 101.1
12512 | Quinshon Judkins | RB | age 22 | CLE | market 4392 | projected 142.9 (13 a week) | last 3 weeks 8.9 a week | lineup value 48
9224 | Chase Brown | RB | age 26 | CIN | market 4512 | projected 140.9 (12.8 a week) | last 3 weeks 9.2 a week | lineup value 43.8
2449 | Stefon Diggs | WR | age 32 | WAS | market 2782 | projected 135 (12.3 a week) | last 3 weeks 8.1 a week | lineup value 37.1
3214 | Hunter Henry | TE | age 31 | NE | market 3148 | projected 128.9 (11.7 a week) | last 3 weeks 17.1 a week | lineup value 115.9
5872 | Deebo Samuel | WR | age 30 | SF | market 2700 | projected 121.5 (11 a week) | last 3 weeks 15 a week | lineup value 29.4
6801 | Tee Higgins | WR | age 27 | CIN | market 4115 | projected 114.3 (10.4 a week) | last 3 weeks 7.8 a week | lineup value 25.8
5947 | Jakobi Meyers | WR | age 29 | JAX | market 3294 | projected 109.5 (10 a week) | last 3 weeks 13.3 a week | lineup value 19.4
6783 | Jerry Jeudy | WR | age 27 | CLE | market 2699 | projected 97 (8.8 a week) | last 3 weeks 7.8 a week | lineup value 3.3
11627 | Troy Franklin | WR | age 23 | DEN | market 3027 | projected 91.4 (8.3 a week) | last 3 weeks 11.7 a week | lineup value 2.3
6806 | J.K. Dobbins | RB | age 27 | DEN | market 3331 | projected 91.3 (8.3 a week) | last 3 weeks 15.2 a week | lineup value 23.7
7090 | Darnell Mooney | WR | age 28 | NYG | market 2372 | projected 88.1 (8 a week) | last 3 weeks 4.1 a week | lineup value 4.1
9508 | Tyjae Spears | RB | age 25 | TEN | market 2981 | projected 75.5 (6.9 a week) | last 3 weeks 0 a week | lineup value 1.3
8142 | Alec Pierce | WR | age 26 | IND | market 3406 | projected 74.6 (6.8 a week) | last 3 weeks 8.7 a week | lineup value 5.3
4988 | Nick Chubb | RB | age 30 | FA | market 1806 | projected 74.1 (6.7 a week) | last 3 weeks 9.4 a week | lineup value 0.6
8125 | Calvin Austin | WR | age 27 | NYG | market 0 | projected 65.7 (6 a week) | last 3 weeks 10.9 a week | lineup value 0
10219 | Chris Rodriguez | RB | age 27 | JAX | market 2758 | projected 62.2 (5.7 a week) | last 3 weeks 1.3 a week | lineup value 0.9
2374 | Tyler Lockett | WR | age 33 | FA | market 2516 | projected 45.5 (4.1 a week) | last 3 weeks 3.5 a week | lineup value 0
4981 | Calvin Ridley | WR | age 31 | TEN | market 2278 | projected 41 (3.7 a week) | last 3 weeks 6.4 a week | lineup value 0
4082 | Curtis Samuel | WR | age 29 | FA | market 1446 | projected 21.9 (2 a week) | last 3 weeks 0 a week | lineup value 0
12473 | Mitchell Evans | TE | age 23 | CAR | market 0 | projected 20 (1.8 a week) | last 3 weeks 1.8 a week | lineup value 7

CANDIDATE DEALS (from a rules-based finder; points are the finder projections for the rest of the season):
c1 | partnerId 6 | I give Dylan Sampson (12469) | I get Travis Kelce + Zach Ertz (1466,1339) | my points 195.7 | their points -145.3 | likelihood 0.94
c2 | partnerId 5 | I give Dylan Sampson (12469) | I get Michael Pittman + Woody Marks (6819,12474) | my points 114.9 | their points -103.8 | likelihood 0.86
c3 | partnerId 6 | I give Dylan Sampson + Will Dissly (12469,5010) | I get Travis Kelce (1466) | my points 120.8 | their points -71.6 | likelihood 0.94
c4 | partnerId 8 | I give Justin Fields + Mike Evans (7591,2216) | I get Cade Otton + Keon Coleman (8111,11637) | my points 88.4 | their points 22 | likelihood 0.9
c5 | partnerId 8 | I give Justin Fields + Jalen McMillan (7591,11618) | I get Jonnu Smith + Keon Coleman (4144,11637) | my points 91.9 | their points 13.5 | likelihood 0.91
c6 | partnerId 8 | I give Justin Fields (7591) | I get Jonnu Smith + Christian Kirk (4144,4950) | my points 78.5 | their points 22.2 | likelihood 0.52
c7 | partnerId 4 | I give Justin Fields + Dylan Sampson (7591,12469) | I get Dallas Goedert (5022) | my points 99 | their points 6 | likelihood 0.65
c8 | partnerId 10 | I give Will Dissly + Dylan Sampson (5010,12469) | I get Stefon Diggs + Deebo Samuel (2449,5872) | my points 135.8 | their points -67.9 | likelihood 0.78
c9 | partnerId 10 | I give Will Dissly + Jalen McMillan (5010,11618) | I get Deebo Samuel (5872) | my points 66.6 | their points -26.2 | likelihood 0.69
c10 | partnerId 10 | I give Dylan Sampson (12469) | I get Stefon Diggs (2449) | my points 73.8 | their points -37.1 | likelihood 0.88

Pick the best trades for my team.

=========== CASE 1180189331122126848-w4-r9 ===========
REPLY FILE: /Users/anik/workspace/chrome/sleeper/.eval-market/replies/suggest-v2/run1/1180189331122126848-w4-r9.json
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
Lineup slots: QB, RB, RB, WR, WR, TE, TE, FLEX, FLEX, FLEX, SUPER_FLEX, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN. Superflex: yes. Tight end premium: yes. Points per reception: 1.
Columns: id | name | position | age | team | market value | projected points for the rest of the regular season (and per week) | points per week over the last three weeks played | lineup value (points my lineup loses if this player is removed).

MY TEAM (partnerId me): record 2-1, rank 2, points for 474.8, contention window 1
6904 | Jalen Hurts | QB | age 28 | PHI | market 6633 | projected 241.8 (22 a week) | last 3 weeks 23.6 a week | lineup value 89.2
11560 | Caleb Williams | QB | age 24 | CHI | market 7769 | projected 193.3 (17.6 a week) | last 3 weeks 28.4 a week | lineup value 38.8
3198 | Derrick Henry | RB | age 32 | BAL | market 4135 | projected 168.9 (15.4 a week) | last 3 weeks 14.1 a week | lineup value 86.5
12518 | Tyler Warren | TE | age 24 | IND | market 4598 | projected 165.4 (15 a week) | last 3 weeks 14.7 a week | lineup value 88.5
7564 | Ja'Marr Chase | WR | age 26 | CIN | market 5775 | projected 163.6 (14.9 a week) | last 3 weeks 16.7 a week | lineup value 91.2
6794 | Justin Jefferson | WR | age 27 | MIN | market 4816 | projected 154 (14 a week) | last 3 weeks 12.8 a week | lineup value 71.5
7569 | Nico Collins | WR | age 27 | HOU | market 4427 | projected 142.9 (13 a week) | last 3 weeks 14 a week | lineup value 63.1
5859 | A.J. Brown | WR | age 29 | NE | market 4312 | projected 130.2 (11.8 a week) | last 3 weeks 10.8 a week | lineup value 54
19 | Joe Flacco | QB | age 41 | CIN | market 0 | projected 122.6 (11.1 a week) | last 3 weeks 10.9 a week | lineup value 10.1
8228 | Jaylen Warren | RB | age 27 | PIT | market 3536 | projected 122.3 (11.1 a week) | last 3 weeks 14.8 a week | lineup value 48
5892 | David Montgomery | RB | age 29 | HOU | market 3462 | projected 113.8 (10.3 a week) | last 3 weeks 16.9 a week | lineup value 28.7
12486 | Dillon Gabriel | QB | age 25 | CLE | market 0 | projected 99.1 (9 a week) | last 3 weeks 2.3 a week | lineup value 11.8
11603 | AJ Barner | TE | age 24 | SEA | market 3513 | projected 93.8 (8.5 a week) | last 3 weeks 6.1 a week | lineup value 14.6
4098 | Kareem Hunt | RB | age 30 | FA | market 1814 | projected 93.2 (8.5 a week) | last 3 weeks 6.8 a week | lineup value 10.4
8210 | Chig Okonkwo | TE | age 27 | WAS | market 3056 | projected 89.3 (8.1 a week) | last 3 weeks 11 a week | lineup value 15.3
8131 | Isaiah Likely | TE | age 26 | NYG | market 3475 | projected 76.4 (6.9 a week) | last 3 weeks 0 a week | lineup value 3.1
12476 | Devin Neal | RB | age 23 | WAS | market 2800 | projected 47.8 (4.3 a week) | last 3 weeks 0.3 a week | lineup value 5
12483 | Jack Bech | WR | age 23 | LV | market 2720 | projected 43.3 (3.9 a week) | last 3 weeks 1.8 a week | lineup value 0
11630 | Roman Wilson | WR | age 25 | PIT | market 0 | projected 39.1 (3.6 a week) | last 3 weeks 0.6 a week | lineup value 0
2306 | Jameis Winston | QB | age 32 | NYG | market 0 | projected 36.2 (3.3 a week) | last 3 weeks 0 a week | lineup value 0
9511 | Keaton Mitchell | RB | age 24 | LAC | market 2857 | projected 33.1 (3 a week) | last 3 weeks 0 a week | lineup value 0
7828 | Noah Gray | TE | age 27 | KC | market 0 | projected 33 (3 a week) | last 3 weeks 3.6 a week | lineup value 0
8188 | Tyquan Thornton | WR | age 26 | KC | market 0 | projected 30.8 (2.8 a week) | last 3 weeks 12.7 a week | lineup value 0
11439 | Jaleel McLaughlin | RB | age 26 | CLE | market 0 | projected 17.4 (1.6 a week) | last 3 weeks 0 a week | lineup value 0
12543 | Tahj Brooks | RB | age 24 | CIN | market 0 | projected 16.8 (1.5 a week) | last 3 weeks 0.6 a week | lineup value 0
9225 | Tank Bigsby | RB | age 24 | PHI | market 2872 | projected 12.6 (1.1 a week) | last 3 weeks 0.4 a week | lineup value 0
12670 | KeAndre Lambert-Smith | WR | age 24 | LAC | market 0 | projected 5.8 (0.5 a week) | last 3 weeks 0 a week | lineup value 0
12470 | Riley Leonard | QB | age 24 | IND | market 0 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0
8249 | Lucas Krull | TE | age 28 | DEN | market 1669 | projected 0 (0 a week) | last 3 weeks 1.7 a week | lineup value 0
9999 | Will Levis | QB | age 27 | NYJ | market 0 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0

PARTNER (partnerId 10): record 1-2, rank 7, points for 437.1, contention window 0.44
5870 | Daniel Jones | QB | age 29 | IND | market 4268 | projected 203.9 (18.5 a week) | last 3 weeks 24.7 a week | lineup value 113
6768 | Tua Tagovailoa | QB | age 28 | ATL | market 3369 | projected 192.1 (17.5 a week) | last 3 weeks 16.9 a week | lineup value 101.1
12512 | Quinshon Judkins | RB | age 22 | CLE | market 4392 | projected 142.9 (13 a week) | last 3 weeks 8.9 a week | lineup value 48
9224 | Chase Brown | RB | age 26 | CIN | market 4512 | projected 140.9 (12.8 a week) | last 3 weeks 9.2 a week | lineup value 43.8
2449 | Stefon Diggs | WR | age 32 | WAS | market 2782 | projected 135 (12.3 a week) | last 3 weeks 8.1 a week | lineup value 37.1
3214 | Hunter Henry | TE | age 31 | NE | market 3148 | projected 128.9 (11.7 a week) | last 3 weeks 17.1 a week | lineup value 115.9
5872 | Deebo Samuel | WR | age 30 | SF | market 2700 | projected 121.5 (11 a week) | last 3 weeks 15 a week | lineup value 29.4
6801 | Tee Higgins | WR | age 27 | CIN | market 4115 | projected 114.3 (10.4 a week) | last 3 weeks 7.8 a week | lineup value 25.8
5947 | Jakobi Meyers | WR | age 29 | JAX | market 3294 | projected 109.5 (10 a week) | last 3 weeks 13.3 a week | lineup value 19.4
6783 | Jerry Jeudy | WR | age 27 | CLE | market 2699 | projected 97 (8.8 a week) | last 3 weeks 7.8 a week | lineup value 3.3
11627 | Troy Franklin | WR | age 23 | DEN | market 3027 | projected 91.4 (8.3 a week) | last 3 weeks 11.7 a week | lineup value 2.3
6806 | J.K. Dobbins | RB | age 27 | DEN | market 3331 | projected 91.3 (8.3 a week) | last 3 weeks 15.2 a week | lineup value 23.7
7090 | Darnell Mooney | WR | age 28 | NYG | market 2372 | projected 88.1 (8 a week) | last 3 weeks 4.1 a week | lineup value 4.1
9508 | Tyjae Spears | RB | age 25 | TEN | market 2981 | projected 75.5 (6.9 a week) | last 3 weeks 0 a week | lineup value 1.3
8142 | Alec Pierce | WR | age 26 | IND | market 3406 | projected 74.6 (6.8 a week) | last 3 weeks 8.7 a week | lineup value 5.3
4988 | Nick Chubb | RB | age 30 | FA | market 1806 | projected 74.1 (6.7 a week) | last 3 weeks 9.4 a week | lineup value 0.6
8125 | Calvin Austin | WR | age 27 | NYG | market 0 | projected 65.7 (6 a week) | last 3 weeks 10.9 a week | lineup value 0
10219 | Chris Rodriguez | RB | age 27 | JAX | market 2758 | projected 62.2 (5.7 a week) | last 3 weeks 1.3 a week | lineup value 0.9
2374 | Tyler Lockett | WR | age 33 | FA | market 2516 | projected 45.5 (4.1 a week) | last 3 weeks 3.5 a week | lineup value 0
4981 | Calvin Ridley | WR | age 31 | TEN | market 2278 | projected 41 (3.7 a week) | last 3 weeks 6.4 a week | lineup value 0
4082 | Curtis Samuel | WR | age 29 | FA | market 1446 | projected 21.9 (2 a week) | last 3 weeks 0 a week | lineup value 0
12473 | Mitchell Evans | TE | age 23 | CAR | market 0 | projected 20 (1.8 a week) | last 3 weeks 1.8 a week | lineup value 7

PARTNER (partnerId 11): record 1-2, rank 11, points for 402, contention window 0
8130 | Trey McBride | TE | age 26 | ARI | market 4879 | projected 216.8 (19.7 a week) | last 3 weeks 18 a week | lineup value 145.2
7523 | Trevor Lawrence | QB | age 27 | JAX | market 6167 | projected 193.5 (17.6 a week) | last 3 weeks 16.4 a week | lineup value 4.8
1373 | Geno Smith | QB | age 36 | NYJ | market 2903 | projected 190.3 (17.3 a week) | last 3 weeks 19.6 a week | lineup value 6.2
96 | Aaron Rodgers | QB | age 42 | PIT | market 3221 | projected 179.8 (16.3 a week) | last 3 weeks 21.6 a week | lineup value 20.5
12508 | Jaxson Dart | QB | age 23 | NYG | market 7115 | projected 163.1 (14.8 a week) | last 3 weeks 0 a week | lineup value 24.4
7526 | Jaylen Waddle | WR | age 27 | DEN | market 4001 | projected 141.4 (12.9 a week) | last 3 weeks 13.2 a week | lineup value 68.3
10229 | Rashee Rice | WR | age 26 | KC | market 4416 | projected 122.3 (11.1 a week) | last 3 weeks 0 a week | lineup value 71.7
5012 | Mark Andrews | TE | age 31 | BAL | market 3101 | projected 117.8 (10.7 a week) | last 3 weeks 12 a week | lineup value 45
5844 | T.J. Hockenson | TE | age 29 | MIN | market 2961 | projected 113.1 (10.3 a week) | last 3 weeks 9.8 a week | lineup value 39.4
8676 | Rashid Shaheed | WR | age 28 | SEA | market 2694 | projected 109.9 (10 a week) | last 3 weeks 10.9 a week | lineup value 31.6
4035 | Alvin Kamara | RB | age 31 | NO | market 2508 | projected 100.4 (9.1 a week) | last 3 weeks 12.1 a week | lineup value 65.2
4033 | David Njoku | TE | age 30 | LAC | market 2850 | projected 91.1 (8.3 a week) | last 3 weeks 10.9 a week | lineup value 26.9
12545 | Tyler Shough | QB | age 27 | NO | market 5136 | projected 89 (8.1 a week) | last 3 weeks 0 a week | lineup value 2.3
4454 | Kendrick Bourne | WR | age 31 | ARI | market 0 | projected 73.2 (6.7 a week) | last 3 weeks 2.6 a week | lineup value 17.9
3200 | Sterling Shepard | WR | age 33 | NYJ | market 1657 | projected 66 (6 a week) | last 3 weeks 0 a week | lineup value 5.3
6271 | Olamide Zaccheaus | WR | age 29 | ATL | market 0 | projected 58.4 (5.3 a week) | last 3 weeks 3.6 a week | lineup value 0
11600 | Ja'Tavion Sanders | TE | age 23 | CAR | market 0 | projected 54 (4.9 a week) | last 3 weeks 9.5 a week | lineup value 4.3
9481 | Luke Musgrave | TE | age 26 | GB | market 0 | projected 51.5 (4.7 a week) | last 3 weeks 2.9 a week | lineup value 1.1
4381 | Taysom Hill | TE | age 35 | FA | market 1530 | projected 49 (4.5 a week) | last 3 weeks 0 a week | lineup value 0
12495 | Ollie Gordon | RB | age 22 | MIA | market 0 | projected 47.5 (4.3 a week) | last 3 weeks 4.5 a week | lineup value 10.5
12492 | Pat Bryant | WR | age 23 | DEN | market 3009 | projected 40.4 (3.7 a week) | last 3 weeks 1.3 a week | lineup value 0
12455 | Brashard Smith | RB | age 23 | KC | market 2698 | projected 38.3 (3.5 a week) | last 3 weeks 0.5 a week | lineup value 6.9

CANDIDATE DEALS (from a rules-based finder; points are the finder projections for the rest of the season):
c1 | partnerId 10 | I give Jameis Winston + Chig Okonkwo (2306,8210) | I get Stefon Diggs + Deebo Samuel (2449,5872) | my points 52.6 | their points 16 | likelihood 0.86
c2 | partnerId 10 | I give Jameis Winston + AJ Barner (2306,11603) | I get Stefon Diggs + J.K. Dobbins (2449,6806) | my points 50.9 | their points 28.2 | likelihood 0.72
c3 | partnerId 10 | I give Noah Gray + Chig Okonkwo (7828,8210) | I get Stefon Diggs + Jerry Jeudy (2449,6783) | my points 38.9 | their points 27.5 | likelihood 0.89
c4 | partnerId 10 | I give AJ Barner + Noah Gray (11603,7828) | I get Deebo Samuel + J.K. Dobbins (5872,6806) | my points 46.3 | their points 21.5 | likelihood 0.7
c5 | partnerId 11 | I give Lucas Krull + Tank Bigsby (8249,9225) | I get Alvin Kamara (4035) | my points 31.3 | their points -64.6 | likelihood 0.95

Pick the best trades for my team.

=========== CASE 1180189331122126848-w7-r2 ===========
REPLY FILE: /Users/anik/workspace/chrome/sleeper/.eval-market/replies/suggest-v2/run1/1180189331122126848-w7-r2.json
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
Lineup slots: QB, RB, RB, WR, WR, TE, TE, FLEX, FLEX, FLEX, SUPER_FLEX, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN. Superflex: yes. Tight end premium: yes. Points per reception: 1.
Columns: id | name | position | age | team | market value | projected points for the rest of the regular season (and per week) | points per week over the last three weeks played | lineup value (points my lineup loses if this player is removed).

MY TEAM (partnerId me): record 4-2, rank 1, points for 1068, contention window 1
4881 | Lamar Jackson | QB | age 29 | BAL | market 7934 | projected 160.3 (20 a week) | last 3 weeks 4.6 a week | lineup value 128.1
11563 | Bo Nix | QB | age 26 | DEN | market 6526 | projected 156.3 (19.5 a week) | last 3 weeks 22 a week | lineup value 124.1
6813 | Jonathan Taylor | RB | age 27 | IND | market 5005 | projected 154.2 (19.3 a week) | last 3 weeks 23.3 a week | lineup value 108.1
4217 | George Kittle | TE | age 33 | SF | market 3140 | projected 120.7 (15.1 a week) | last 3 weeks 0 a week | lineup value 82.4
8144 | Chris Olave | WR | age 26 | NO | market 4414 | projected 107.6 (13.5 a week) | last 3 weeks 12.9 a week | lineup value 61.5
8110 | Jake Ferguson | TE | age 27 | DAL | market 3460 | projected 104.3 (13 a week) | last 3 weeks 22 a week | lineup value 65.2
8155 | Breece Hall | RB | age 25 | NYJ | market 4260 | projected 102.6 (12.8 a week) | last 3 weeks 13.2 a week | lineup value 65.8
5045 | Courtland Sutton | WR | age 31 | DEN | market 3181 | projected 90.9 (11.4 a week) | last 3 weeks 13.2 a week | lineup value 46.6
7002 | Juwan Johnson | TE | age 30 | NO | market 3114 | projected 89.2 (11.2 a week) | last 3 weeks 5.4 a week | lineup value 50.9
8151 | Kenneth Walker | RB | age 25 | KC | market 4558 | projected 81.2 (10.2 a week) | last 3 weeks 8.8 a week | lineup value 37.8
12533 | Jacory Croskey-Merritt | RB | age 25 | WAS | market 3247 | projected 68.7 (8.6 a week) | last 3 weeks 13.5 a week | lineup value 31.2
11628 | Marvin Harrison | WR | age 24 | HOU | market 3921 | projected 50.6 (6.3 a week) | last 3 weeks 12.5 a week | lineup value 16
9504 | Kayshon Boutte | WR | age 24 | HOU | market 2961 | projected 45.9 (5.7 a week) | last 3 weeks 12.1 a week | lineup value 11.9
8917 | KaVontae Turpin | WR | age 30 | DAL | market 1161 | projected 33.4 (4.2 a week) | last 3 weeks 2.1 a week | lineup value 8.1
11584 | Bucky Irving | RB | age 24 | TB | market 4304 | projected 29.6 (3.7 a week) | last 3 weeks 8.5 a week | lineup value 11.9
4037 | Chris Godwin | WR | age 30 | TB | market 3091 | projected 27 (3.4 a week) | last 3 weeks 3.7 a week | lineup value 11.7
12523 | Jimmy Horn | WR | age 24 | CLE | market 0 | projected 19.7 (2.5 a week) | last 3 weeks 3.9 a week | lineup value 1.6
12497 | Tory Horton | WR | age 23 | SEA | market 2784 | projected 14.3 (1.8 a week) | last 3 weeks 5 a week | lineup value 0
12457 | Jaydon Blue | RB | age 22 | PHI | market 2760 | projected 7.3 (0.9 a week) | last 3 weeks 0.2 a week | lineup value 0
11593 | Brevyn Spann-Ford | TE | age 26 | DAL | market 0 | projected 6.1 (0.8 a week) | last 3 weeks 0.7 a week | lineup value 0
12531 | Trevor Etienne | RB | age 22 | CAR | market 0 | projected 4.4 (0.5 a week) | last 3 weeks 3 a week | lineup value 0
12634 | Jordan Watkins | WR | age 24 | SF | market 0 | projected 3.9 (0.5 a week) | last 3 weeks 0 a week | lineup value 0
6820 | Clyde Edwards-Helaire | RB | age 26 | FA | market 0 | projected 2.8 (0.4 a week) | last 3 weeks 0 a week | lineup value 0.3
11616 | Jacob Cowing | WR | age 25 | SF | market 0 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0
11619 | Ja'Lynn Polk | WR | age 24 | FA | market 0 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0
11632 | Malik Nabers | WR | age 23 | NYG | market 5024 | projected 0 (0 a week) | last 3 weeks 1.3 a week | lineup value 0
11645 | Javon Baker | WR | age 23 | FA | market 0 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0
12738 | Phil Mafah | RB | age 23 | NYG | market 0 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0
6151 | Miles Sanders | RB | age 28 | FA | market 1690 | projected 0 (0 a week) | last 3 weeks 1.5 a week | lineup value 0

PARTNER (partnerId 5): record 2-4, rank 11, points for 822.3, contention window 0
4943 | Sam Darnold | QB | age 29 | SEA | market 4950 | projected 141 (17.6 a week) | last 3 weeks 26.2 a week | lineup value 56.8
10229 | Rashee Rice | WR | age 26 | KC | market 4416 | projected 122.3 (15.3 a week) | last 3 weeks 0 a week | lineup value 59
7588 | Javonte Williams | RB | age 26 | DAL | market 4030 | projected 118.2 (14.8 a week) | last 3 weeks 18.1 a week | lineup value 75.4
9228 | Bryce Young | QB | age 25 | CAR | market 4835 | projected 107.6 (13.4 a week) | last 3 weeks 18.3 a week | lineup value 23.4
12514 | Emeka Egbuka | WR | age 24 | TB | market 4516 | projected 102.4 (12.8 a week) | last 3 weeks 18.6 a week | lineup value 35.8
12474 | Woody Marks | RB | age 25 | HOU | market 3140 | projected 97.7 (12.2 a week) | last 3 weeks 10.1 a week | lineup value 50.9
6819 | Michael Pittman | WR | age 29 | PIT | market 2989 | projected 91.5 (11.4 a week) | last 3 weeks 11.3 a week | lineup value 26.8
8126 | Wan'Dale Robinson | WR | age 25 | TEN | market 3410 | projected 90.8 (11.4 a week) | last 3 weeks 11 a week | lineup value 22.7
8148 | Jameson Williams | WR | age 25 | DET | market 4091 | projected 84.8 (10.6 a week) | last 3 weeks 8.8 a week | lineup value 19.3
12498 | Mason Taylor | TE | age 22 | NYJ | market 3673 | projected 82.1 (10.3 a week) | last 3 weeks 13.9 a week | lineup value 39.1
11597 | Theo Johnson | TE | age 25 | NYG | market 3211 | projected 79 (9.9 a week) | last 3 weeks 15 a week | lineup value 35.3
7049 | Jauan Jennings | WR | age 29 | MIN | market 2831 | projected 76.8 (9.6 a week) | last 3 weeks 2.7 a week | lineup value 8.7
8183 | Brock Purdy | QB | age 26 | SF | market 6164 | projected 66 (8.3 a week) | last 3 weeks 7.9 a week | lineup value 10.8
12485 | Tez Johnson | WR | age 24 | TB | market 0 | projected 58.2 (7.3 a week) | last 3 weeks 7.9 a week | lineup value 1
11646 | Jalen Coker | WR | age 24 | CAR | market 3263 | projected 48.4 (6 a week) | last 3 weeks 0 a week | lineup value 0
12519 | Luther Burden | WR | age 22 | CHI | market 4866 | projected 42.8 (5.4 a week) | last 3 weeks 3.6 a week | lineup value 3.7
4219 | Jeremy McNichols | RB | age 30 | WAS | market 0 | projected 40.8 (5.1 a week) | last 3 weeks 3.5 a week | lineup value 2.2
6039 | Ty Johnson | RB | age 29 | BUF | market 0 | projected 39 (4.9 a week) | last 3 weeks 1.2 a week | lineup value 1.1
9482 | Michael Mayer | TE | age 25 | LV | market 0 | projected 38.5 (4.8 a week) | last 3 weeks 6.6 a week | lineup value 2.8
9501 | DeMario Douglas | WR | age 25 | NE | market 0 | projected 37.9 (4.7 a week) | last 3 weeks 6.6 a week | lineup value 0
12521 | Elijah Arroyo | TE | age 23 | SEA | market 0 | projected 37.5 (4.7 a week) | last 3 weeks 4.3 a week | lineup value 1.7
6826 | Cole Kmet | TE | age 27 | CHI | market 0 | projected 35.3 (4.4 a week) | last 3 weeks 3.9 a week | lineup value 1.1

PARTNER (partnerId 10): record 2-4, rank 12, points for 812.6, contention window 0
5870 | Daniel Jones | QB | age 29 | IND | market 4279 | projected 142.8 (17.8 a week) | last 3 weeks 20.8 a week | lineup value 87.5
6768 | Tua Tagovailoa | QB | age 28 | ATL | market 3373 | projected 134.5 (16.8 a week) | last 3 weeks 20 a week | lineup value 79.1
2449 | Stefon Diggs | WR | age 32 | WAS | market 2782 | projected 99.7 (12.5 a week) | last 3 weeks 15.5 a week | lineup value 36.8
12512 | Quinshon Judkins | RB | age 22 | CLE | market 4393 | projected 99.1 (12.4 a week) | last 3 weeks 13 a week | lineup value 46.4
3214 | Hunter Henry | TE | age 31 | NE | market 3151 | projected 89.9 (11.2 a week) | last 3 weeks 9.8 a week | lineup value 75.3
6801 | Tee Higgins | WR | age 27 | CIN | market 4113 | projected 81.1 (10.1 a week) | last 3 weeks 9.5 a week | lineup value 29
5872 | Deebo Samuel | WR | age 30 | SF | market 2700 | projected 79.7 (10 a week) | last 3 weeks 16.4 a week | lineup value 23
7090 | Darnell Mooney | WR | age 28 | NYG | market 2372 | projected 78.1 (9.8 a week) | last 3 weeks 0.8 a week | lineup value 6.6
8142 | Alec Pierce | WR | age 26 | IND | market 3407 | projected 67.4 (8.4 a week) | last 3 weeks 2.3 a week | lineup value 6.6
5947 | Jakobi Meyers | WR | age 29 | JAX | market 3296 | projected 66.2 (8.3 a week) | last 3 weeks 7.4 a week | lineup value 10.3
11627 | Troy Franklin | WR | age 23 | DEN | market 3028 | projected 64.1 (8 a week) | last 3 weeks 7 a week | lineup value 2.5
6783 | Jerry Jeudy | WR | age 27 | CLE | market 2696 | projected 61.9 (7.7 a week) | last 3 weeks 6.9 a week | lineup value 3.9
9508 | Tyjae Spears | RB | age 25 | TEN | market 2977 | projected 61.6 (7.7 a week) | last 3 weeks 3.5 a week | lineup value 9.7
8125 | Calvin Austin | WR | age 27 | NYG | market 0 | projected 55.9 (7 a week) | last 3 weeks 1.1 a week | lineup value 0
4988 | Nick Chubb | RB | age 30 | FA | market 1804 | projected 54.4 (6.8 a week) | last 3 weeks 6.8 a week | lineup value 0.8
11600 | Ja'Tavion Sanders | TE | age 23 | CAR | market 0 | projected 54 (6.8 a week) | last 3 weeks 0 a week | lineup value 39.4
6806 | J.K. Dobbins | RB | age 27 | DEN | market 3329 | projected 51.9 (6.5 a week) | last 3 weeks 10.3 a week | lineup value 22
10219 | Chris Rodriguez | RB | age 27 | JAX | market 2757 | projected 39.6 (4.9 a week) | last 3 weeks 2.2 a week | lineup value 1.6
2374 | Tyler Lockett | WR | age 33 | FA | market 2517 | projected 36.4 (4.5 a week) | last 3 weeks 2.9 a week | lineup value 0
4082 | Curtis Samuel | WR | age 29 | FA | market 1446 | projected 17.5 (2.2 a week) | last 3 weeks 4.2 a week | lineup value 0
12473 | Mitchell Evans | TE | age 23 | CAR | market 0 | projected 14.3 (1.8 a week) | last 3 weeks 8.5 a week | lineup value 0
1689 | Adam Thielen | WR | age 35 | FA | market 2193 | projected 12.3 (1.5 a week) | last 3 weeks 1 a week | lineup value 0

PARTNER (partnerId 1): record 2-4, rank 9, points for 1003.2, contention window 0.18
6804 | Jordan Love | QB | age 27 | GB | market 5767 | projected 162.1 (20.3 a week) | last 3 weeks 16.7 a week | lineup value 40.2
421 | Matthew Stafford | QB | age 38 | LAR | market 4780 | projected 150.9 (18.9 a week) | last 3 weeks 25.4 a week | lineup value 45.1
9493 | Puka Nacua | WR | age 25 | LAR | market 5684 | projected 124.3 (15.5 a week) | last 3 weeks 21.8 a week | lineup value 60
3198 | Derrick Henry | RB | age 32 | BAL | market 4135 | projected 119.6 (15 a week) | last 3 weeks 10.4 a week | lineup value 51.2
8150 | Kyren Williams | RB | age 26 | LAR | market 4549 | projected 107.1 (13.4 a week) | last 3 weeks 19.4 a week | lineup value 36.4
5846 | DK Metcalf | WR | age 28 | PIT | market 3435 | projected 105.7 (13.2 a week) | last 3 weeks 14.4 a week | lineup value 30.2
8137 | George Pickens | WR | age 25 | DAL | market 4759 | projected 105.5 (13.2 a week) | last 3 weeks 26.3 a week | lineup value 39.1
5001 | Dalton Schultz | TE | age 30 | HOU | market 3163 | projected 99 (12.4 a week) | last 3 weeks 8.8 a week | lineup value 52.4
8134 | Khalil Shakir | WR | age 26 | BUF | market 3138 | projected 86.4 (10.8 a week) | last 3 weeks 11.7 a week | lineup value 17.6
4199 | Aaron Jones | RB | age 31 | MIN | market 2797 | projected 75.4 (9.4 a week) | last 3 weeks 0 a week | lineup value 7
11559 | Michael Penix | QB | age 26 | ATL | market 3503 | projected 69.4 (8.7 a week) | last 3 weeks 13.4 a week | lineup value 0
7527 | Mac Jones | QB | age 28 | SF | market 2051 | projected 66.8 (8.3 a week) | last 3 weeks 13.1 a week | lineup value 0
8167 | Christian Watson | WR | age 27 | GB | market 3659 | projected 60.6 (7.6 a week) | last 3 weeks 0 a week | lineup value 0
11435 | Emanuel Wilson | RB | age 27 | SEA | market 2482 | projected 54.4 (6.8 a week) | last 3 weeks 0.6 a week | lineup value 3
9479 | Darnell Washington | TE | age 25 | PIT | market 0 | projected 54 (6.8 a week) | last 3 weeks 6.2 a week | lineup value 7.4
9487 | Parker Washington | WR | age 24 | JAX | market 4014 | projected 52.9 (6.6 a week) | last 3 weeks 6.8 a week | lineup value 0
11631 | Brian Thomas | WR | age 24 | JAX | market 3926 | projected 50.5 (6.3 a week) | last 3 weeks 15.2 a week | lineup value 12.6
6149 | Darius Slayton | WR | age 29 | IND | market 0 | projected 46.3 (5.8 a week) | last 3 weeks 3.8 a week | lineup value 5.8
7611 | Rhamondre Stevenson | RB | age 28 | NE | market 3348 | projected 40.4 (5.1 a week) | last 3 weeks 7.2 a week | lineup value 13.3
9480 | Brenton Strange | TE | age 25 | JAX | market 3623 | projected 38.4 (4.8 a week) | last 3 weeks 6.3 a week | lineup value 14.2
7607 | Michael Carter | RB | age 27 | TEN | market 0 | projected 38.2 (4.8 a week) | last 3 weeks 8.9 a week | lineup value 1.2
3161 | Carson Wentz | QB | age 33 | MIN | market 0 | projected 34.2 (4.3 a week) | last 3 weeks 14.6 a week | lineup value 1.3

PARTNER (partnerId 8): record 2-4, rank 10, points for 901.7, contention window 0.05
4984 | Josh Allen | QB | age 30 | BUF | market 7921 | projected 192.9 (24.1 a week) | last 3 weeks 25.2 a week | lineup value 153
8138 | James Cook | RB | age 27 | BUF | market 4893 | projected 125.1 (15.6 a week) | last 3 weeks 12 a week | lineup value 70.5
11635 | Ladd McConkey | WR | age 24 | LAC | market 4596 | projected 97.8 (12.2 a week) | last 3 weeks 13.3 a week | lineup value 44
11565 | J.J. McCarthy | QB | age 23 | NYG | market 3893 | projected 95.7 (12 a week) | last 3 weeks 0 a week | lineup value 55.8
12506 | Harold Fannin | TE | age 22 | CLE | market 4701 | projected 89.6 (11.2 a week) | last 3 weeks 13.6 a week | lineup value 34.8
8136 | Rachaad White | RB | age 27 | WAS | market 2757 | projected 88.7 (11.1 a week) | last 3 weeks 16.4 a week | lineup value 35.7
8111 | Cade Otton | TE | age 27 | TB | market 2960 | projected 80.8 (10.1 a week) | last 3 weeks 11.7 a week | lineup value 26
4144 | Jonnu Smith | TE | age 31 | GB | market 0 | projected 79.4 (9.9 a week) | last 3 weeks 4.1 a week | lineup value 18.3
9753 | Zach Charbonnet | RB | age 25 | SEA | market 3186 | projected 68 (8.5 a week) | last 3 weeks 9.6 a week | lineup value 14.1
8112 | Drake London | WR | age 25 | ATL | market 4857 | projected 65 (8.1 a week) | last 3 weeks 18.9 a week | lineup value 32.9
8132 | Tyler Allgeier | RB | age 26 | ARI | market 3205 | projected 58.2 (7.3 a week) | last 3 weeks 7.3 a week | lineup value 0.9
12499 | Elic Ayomanor | WR | age 23 | TEN | market 2910 | projected 52.1 (6.5 a week) | last 3 weeks 5.3 a week | lineup value 7.6
10236 | Dalton Kincaid | TE | age 26 | BUF | market 3769 | projected 51.3 (6.4 a week) | last 3 weeks 10.6 a week | lineup value 18.9
7594 | Chuba Hubbard | RB | age 27 | CAR | market 3352 | projected 43.1 (5.4 a week) | last 3 weeks 3.3 a week | lineup value 4.4
11586 | Blake Corum | RB | age 25 | LAR | market 3567 | projected 42.4 (5.3 a week) | last 3 weeks 2.4 a week | lineup value 2.6
11637 | Keon Coleman | WR | age 23 | BUF | market 2734 | projected 39.2 (4.9 a week) | last 3 weeks 7.3 a week | lineup value 3.8
4950 | Christian Kirk | WR | age 29 | SF | market 2201 | projected 38.4 (4.8 a week) | last 3 weeks 5.1 a week | lineup value 0
10444 | Cedric Tillman | WR | age 26 | NO | market 0 | projected 37.6 (4.7 a week) | last 3 weeks 0.5 a week | lineup value 3.8
11625 | Adonai Mitchell | WR | age 24 | NYJ | market 2986 | projected 32.2 (4 a week) | last 3 weeks 3.5 a week | lineup value 5.5
12536 | Jaylin Noel | WR | age 24 | HOU | market 2759 | projected 30.2 (3.8 a week) | last 3 weeks 3.6 a week | lineup value 0
7694 | Tommy Tremble | TE | age 26 | CAR | market 0 | projected 26.6 (3.3 a week) | last 3 weeks 10.8 a week | lineup value 0
12503 | Isaiah Bond | WR | age 22 | CLE | market 0 | projected 23.7 (3 a week) | last 3 weeks 5.5 a week | lineup value 0

PARTNER (partnerId 12): record 3-3, rank 8, points for 799.5, contention window 0.31
6904 | Jalen Hurts | QB | age 28 | PHI | market 6677 | projected 173.8 (21.7 a week) | last 3 weeks 23.5 a week | lineup value 131.5
7547 | Amon-Ra St. Brown | WR | age 26 | DET | market 5296 | projected 137 (17.1 a week) | last 3 weeks 19.2 a week | lineup value 93.6
4866 | Saquon Barkley | RB | age 29 | PHI | market 4230 | projected 114.4 (14.3 a week) | last 3 weeks 14.6 a week | lineup value 67.7
12522 | Cam Ward | QB | age 24 | TEN | market 5166 | projected 104.6 (13.1 a week) | last 3 weeks 8.1 a week | lineup value 62.3
7021 | Rico Dowdle | RB | age 28 | PIT | market 3262 | projected 97.7 (12.2 a week) | last 3 weeks 23.4 a week | lineup value 52.2
6790 | D'Andre Swift | RB | age 27 | CHI | market 3659 | projected 84.6 (10.6 a week) | last 3 weeks 13.8 a week | lineup value 37.9
11603 | AJ Barner | TE | age 24 | SEA | market 3513 | projected 70.7 (8.8 a week) | last 3 weeks 18.8 a week | lineup value 32.2
7600 | Pat Freiermuth | TE | age 27 | PIT | market 2343 | projected 62.2 (7.8 a week) | last 3 weeks 1 a week | lineup value 23.7
5967 | Tony Pollard | RB | age 29 | TEN | market 3191 | projected 62.1 (7.8 a week) | last 3 weeks 10.7 a week | lineup value 15.4
8210 | Chig Okonkwo | TE | age 27 | WAS | market 3056 | projected 60.2 (7.5 a week) | last 3 weeks 9.7 a week | lineup value 21.7
11626 | Xavier Legette | WR | age 25 | CAR | market 0 | projected 48.5 (6.1 a week) | last 3 weeks 4.7 a week | lineup value 5.8
7571 | Rashod Bateman | WR | age 26 | BAL | market 2473 | projected 40.4 (5 a week) | last 3 weeks 1.7 a week | lineup value 10.3
1426 | DeAndre Hopkins | WR | age 33 | FA | market 1500 | projected 37.9 (4.7 a week) | last 3 weeks 3.5 a week | lineup value 0
8180 | Jalen Nailor | WR | age 27 | LV | market 2606 | projected 37.8 (4.7 a week) | last 3 weeks 5.5 a week | lineup value 0
5927 | Terry McLaurin | WR | age 31 | WAS | market 3391 | projected 36.3 (4.5 a week) | last 3 weeks 0 a week | lineup value 15
12501 | Matthew Golden | WR | age 23 | GB | market 3527 | projected 33.6 (4.2 a week) | last 3 weeks 8.2 a week | lineup value 6.4
11638 | Ricky Pearsall | WR | age 26 | SF | market 2208 | projected 31.4 (3.9 a week) | last 3 weeks 2.9 a week | lineup value 8.6
2749 | Raheem Mostert | RB | age 33 | FA | market 1173 | projected 27 (3.4 a week) | last 3 weeks 3.4 a week | lineup value 0
8154 | Brian Robinson | RB | age 27 | ATL | market 3187 | projected 24.8 (3.1 a week) | last 3 weeks 2.4 a week | lineup value 0
5185 | Allen Lazard | WR | age 30 | FA | market 1593 | projected 24.1 (3 a week) | last 3 weeks 1 a week | lineup value 0
5995 | Justice Hill | RB | age 28 | BAL | market 2032 | projected 23.7 (3 a week) | last 3 weeks 13.4 a week | lineup value 2.9
7562 | Tutu Atwell | WR | age 27 | LAR | market 0 | projected 7.2 (0.9 a week) | last 3 weeks 8.3 a week | lineup value 1

CANDIDATE DEALS (from a rules-based finder; points are the finder projections for the rest of the season):
c1 | partnerId 5 | I give Malik Nabers (11632) | I get Javonte Williams + Rashee Rice (7588,10229) | my points 116.5 | their points -135.2 | likelihood 0.95
c2 | partnerId 5 | I give Malik Nabers + Jaydon Blue (11632,12457) | I get Rashee Rice + Emeka Egbuka (10229,12514) | my points 102.4 | their points -105.2 | likelihood 0.92
c3 | partnerId 5 | I give Malik Nabers + Tory Horton (11632,12497) | I get Javonte Williams + Emeka Egbuka (7588,12514) | my points 98.3 | their points -112.1 | likelihood 0.93
c4 | partnerId 10 | I give Malik Nabers (11632) | I get Daniel Jones + Quinshon Judkins (5870,12512) | my points 76.8 | their points -134.6 | likelihood 0.95
c5 | partnerId 1 | I give Malik Nabers (11632) | I get Derrick Henry + Kyren Williams (3198,8150) | my points 99.8 | their points -108.1 | likelihood 0.9
c6 | partnerId 8 | I give Malik Nabers (11632) | I get Rachaad White + Ladd McConkey (8136,11635) | my points 75.1 | their points -79.8 | likelihood 0.92
c7 | partnerId 10 | I give Malik Nabers + Jaydon Blue (11632,12457) | I get Daniel Jones + Stefon Diggs (5870,2449) | my points 77.3 | their points -128.6 | likelihood 0.95
c8 | partnerId 10 | I give Malik Nabers + Tory Horton (11632,12497) | I get Hunter Henry + Quinshon Judkins (3214,12512) | my points 68.4 | their points -121.7 | likelihood 0.95
c9 | partnerId 8 | I give Malik Nabers + Jaydon Blue (11632,12457) | I get Rachaad White + Harold Fannin (8136,12506) | my points 69.5 | their points -73.4 | likelihood 0.89
c10 | partnerId 1 | I give Malik Nabers + Jaydon Blue (11632,12457) | I get Kyren Williams + DK Metcalf (8150,5846) | my points 76.8 | their points -75.3 | likelihood 0.92
c11 | partnerId 1 | I give Malik Nabers + Tory Horton (11632,12497) | I get Derrick Henry + DK Metcalf (3198,5846) | my points 92.4 | their points -89.8 | likelihood 0.93
c12 | partnerId 12 | I give Tory Horton + Malik Nabers (12497,11632) | I get Saquon Barkley + Rico Dowdle (4866,7021) | my points 91.2 | their points -118.2 | likelihood 0.92

Pick the best trades for my team.
