You are answering fantasy football trade-advice cases. For each case below, follow the SYSTEM text, read the DATA, and write your JSON answer to the reply file named for that case.
Rules: write only the JSON object (no markdown fence, no commentary) to each reply file. Do not read any other file on disk. Do not look at any directory named truth or any file outside the reply paths. Work each case independently.

=========== CASE 1180092558252679168-w7-r5 ===========
REPLY FILE: /Users/anik/workspace/chrome/sleeper/.eval-market/replies/suggest-v2/run1/1180092558252679168-w7-r5.json
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
Lineup slots: QB, RB, RB, WR, WR, TE, FLEX, FLEX, DEF, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN. Superflex: no. Tight end premium: no. Points per reception: 1.
Columns: id | name | position | age | team | market value | projected points for the rest of the regular season (and per week) | points per week over the last three weeks played | lineup value (points my lineup loses if this player is removed).

MY TEAM (partnerId me): record 5-1, rank 1, points for 706.6, contention window 1
9509 | Bijan Robinson | RB | age 24 | ATL | market 6371 | projected 164.9 (20.6 a week) | last 3 weeks 21.3 a week | lineup value 76.3
7588 | Javonte Williams | RB | age 26 | DAL | market 4032 | projected 118.2 (14.8 a week) | last 3 weeks 18.1 a week | lineup value 39
2133 | Davante Adams | WR | age 33 | LAR | market 3375 | projected 108.6 (13.6 a week) | last 3 weeks 12.4 a week | lineup value 27.9
6819 | Michael Pittman | WR | age 29 | PIT | market 2991 | projected 91.5 (11.4 a week) | last 3 weeks 11.3 a week | lineup value 15.6
8126 | Wan'Dale Robinson | WR | age 25 | TEN | market 3412 | projected 90.8 (11.4 a week) | last 3 weeks 11 a week | lineup value 13.1
11620 | Rome Odunze | WR | age 24 | CHI | market 4058 | projected 89.2 (11.1 a week) | last 3 weeks 7.4 a week | lineup value 11.3
6790 | D'Andre Swift | RB | age 27 | CHI | market 3661 | projected 84.6 (10.6 a week) | last 3 weeks 13.8 a week | lineup value 7.8
9758 | C.J. Stroud | QB | age 25 | HOU | market 3150 | projected 75.6 (9.4 a week) | last 3 weeks 15.7 a week | lineup value 46.4
12489 | RJ Harvey | RB | age 25 | DEN | market 3729 | projected 69.7 (8.7 a week) | last 3 weeks 10.8 a week | lineup value 4.9
4098 | Kareem Hunt | RB | age 30 | FA | market 1815 | projected 68.1 (8.5 a week) | last 3 weeks 9.6 a week | lineup value 0.3
8142 | Alec Pierce | WR | age 26 | IND | market 3409 | projected 67.4 (8.4 a week) | last 3 weeks 2.3 a week | lineup value 0
12517 | Colston Loveland | TE | age 22 | CHI | market 5260 | projected 62.3 (7.8 a week) | last 3 weeks 1 a week | lineup value 14.6
11559 | Michael Penix | QB | age 26 | ATL | market 2081 | projected 59.5 (7.4 a week) | last 3 weeks 11.4 a week | lineup value 30.4
11435 | Emanuel Wilson | RB | age 27 | SEA | market 2484 | projected 54.4 (6.8 a week) | last 3 weeks 4.3 a week | lineup value 1.8
3200 | Sterling Shepard | WR | age 33 | NYJ | market 1659 | projected 41.7 (5.2 a week) | last 3 weeks 7.7 a week | lineup value 0
9484 | Tucker Kraft | TE | age 25 | GB | market 4152 | projected 36.8 (4.6 a week) | last 3 weeks 7.6 a week | lineup value 17.6
NYG | New York Giants | DEF | age ? | NYG | market 0 | projected 36.2 (4.5 a week) | last 3 weeks 3.3 a week | lineup value 36.2
12501 | Matthew Golden | WR | age 23 | GB | market 3529 | projected 33.6 (4.2 a week) | last 3 weeks 8.2 a week | lineup value 0
12641 | Jaylin Lane | WR | age 24 | WAS | market 0 | projected 32.3 (4 a week) | last 3 weeks 3.9 a week | lineup value 0
9486 | Dontayvion Wicks | WR | age 25 | PHI | market 2552 | projected 32.1 (4 a week) | last 3 weeks 2.5 a week | lineup value 0
11638 | Ricky Pearsall | WR | age 26 | SF | market 2209 | projected 31.4 (3.9 a week) | last 3 weeks 2.9 a week | lineup value 0
12521 | Elijah Arroyo | TE | age 23 | SEA | market 0 | projected 29.4 (3.7 a week) | last 3 weeks 3.3 a week | lineup value 0
4993 | Mike Gesicki | TE | age 31 | CIN | market 1198 | projected 19.2 (2.4 a week) | last 3 weeks 1.2 a week | lineup value 0
10222 | Jayden Reed | WR | age 26 | GB | market 3365 | projected 7.1 (0.9 a week) | last 3 weeks 0 a week | lineup value 0
11581 | MarShawn Lloyd | RB | age 25 | GB | market 3214 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0
11592 | Erick All | TE | age 26 | CIN | market 0 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0
11616 | Jacob Cowing | WR | age 25 | SF | market 0 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0
12500 | Quinn Ewers | QB | age 23 | JAX | market 0 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0

PARTNER (partnerId 12): record 2-4, rank 10, points for 632.9, contention window 0.05
4984 | Josh Allen | QB | age 30 | BUF | market 4736 | projected 166.4 (20.8 a week) | last 3 weeks 21.2 a week | lineup value 45.8
3294 | Dak Prescott | QB | age 33 | DAL | market 3261 | projected 140.3 (17.5 a week) | last 3 weeks 27.2 a week | lineup value 19.7
10229 | Rashee Rice | WR | age 26 | KC | market 4418 | projected 122.3 (15.3 a week) | last 3 weeks 0 a week | lineup value 43.7
3198 | Derrick Henry | RB | age 32 | BAL | market 4137 | projected 119.6 (15 a week) | last 3 weeks 10.4 a week | lineup value 52.9
2449 | Stefon Diggs | WR | age 32 | WAS | market 2783 | projected 99.7 (12.5 a week) | last 3 weeks 15.5 a week | lineup value 18.4
7021 | Rico Dowdle | RB | age 28 | PIT | market 3264 | projected 97.7 (12.2 a week) | last 3 weeks 23.4 a week | lineup value 24
12518 | Tyler Warren | TE | age 24 | IND | market 4601 | projected 89.3 (11.2 a week) | last 3 weeks 17 a week | lineup value 24.8
8136 | Rachaad White | RB | age 27 | WAS | market 2758 | projected 88.7 (11.1 a week) | last 3 weeks 16.4 a week | lineup value 21.3
5859 | A.J. Brown | WR | age 29 | NE | market 4314 | projected 88.3 (11 a week) | last 3 weeks 8.7 a week | lineup value 21.2
9756 | Jordan Addison | WR | age 24 | MIN | market 3612 | projected 85.8 (10.7 a week) | last 3 weeks 10.2 a week | lineup value 0
1479 | Keenan Allen | WR | age 34 | IND | market 2144 | projected 85.3 (10.7 a week) | last 3 weeks 8.7 a week | lineup value 5.5
1466 | Travis Kelce | TE | age 37 | KC | market 2865 | projected 80.3 (10 a week) | last 3 weeks 14.2 a week | lineup value 15.8
6783 | Jerry Jeudy | WR | age 27 | CLE | market 2697 | projected 61.9 (7.7 a week) | last 3 weeks 6.9 a week | lineup value 0
9500 | Josh Downs | WR | age 25 | IND | market 3344 | projected 56 (7 a week) | last 3 weeks 11.3 a week | lineup value 0
6806 | J.K. Dobbins | RB | age 27 | DEN | market 3331 | projected 51.9 (6.5 a week) | last 3 weeks 10.3 a week | lineup value 6.7
SF | San Francisco 49ers | DEF | age ? | SF | market 0 | projected 48 (6 a week) | last 3 weeks 3 a week | lineup value 48
12519 | Luther Burden | WR | age 22 | CHI | market 4869 | projected 42.8 (5.4 a week) | last 3 weeks 3.6 a week | lineup value 0
12495 | Ollie Gordon | RB | age 22 | MIA | market 0 | projected 30.7 (3.8 a week) | last 3 weeks 0.7 a week | lineup value 0
2306 | Jameis Winston | QB | age 32 | NYG | market 0 | projected 30.1 (3.8 a week) | last 3 weeks 0 a week | lineup value 0
11575 | Ray Davis | RB | age 26 | BUF | market 2507 | projected 17 (2.1 a week) | last 3 weeks 3.4 a week | lineup value 0
7596 | Elijah Moore | WR | age 26 | PHI | market 0 | projected 11.9 (1.5 a week) | last 3 weeks 0 a week | lineup value 0
10235 | Roschon Johnson | RB | age 25 | CHI | market 0 | projected 1 (0.1 a week) | last 3 weeks 0.2 a week | lineup value 0

PARTNER (partnerId 10): record 4-2, rank 4, points for 606.3, contention window 0.82
4892 | Baker Mayfield | QB | age 31 | TB | market 2937 | projected 134 (16.7 a week) | last 3 weeks 22.1 a week | lineup value 15.6
11560 | Caleb Williams | QB | age 24 | CHI | market 4661 | projected 133.7 (16.7 a week) | last 3 weeks 10.9 a week | lineup value 0.6
96 | Aaron Rodgers | QB | age 42 | PIT | market 1826 | projected 116.5 (14.6 a week) | last 3 weeks 10.1 a week | lineup value 0
9224 | Chase Brown | RB | age 26 | CIN | market 4515 | projected 101.7 (12.7 a week) | last 3 weeks 10.3 a week | lineup value 48
12512 | Quinshon Judkins | RB | age 22 | CLE | market 4396 | projected 99.1 (12.4 a week) | last 3 weeks 13 a week | lineup value 44.2
11604 | Brock Bowers | TE | age 23 | LV | market 5533 | projected 95.5 (11.9 a week) | last 3 weeks 3.2 a week | lineup value 44.4
8148 | Jameson Williams | WR | age 25 | DET | market 4093 | projected 84.8 (10.6 a week) | last 3 weeks 8.8 a week | lineup value 24.6
11565 | J.J. McCarthy | QB | age 23 | NYG | market 2294 | projected 81.3 (10.2 a week) | last 3 weeks 0 a week | lineup value 0.3
7090 | Darnell Mooney | WR | age 28 | NYG | market 2373 | projected 78.1 (9.8 a week) | last 3 weeks 0.8 a week | lineup value 13.9
11624 | Xavier Worthy | WR | age 23 | KC | market 3490 | projected 76.3 (9.5 a week) | last 3 weeks 12.9 a week | lineup value 19.4
11597 | Theo Johnson | TE | age 25 | NYG | market 3213 | projected 61.2 (7.6 a week) | last 3 weeks 12.2 a week | lineup value 10.5
HOU | Houston Texans | DEF | age ? | HOU | market 0 | projected 57.4 (7.2 a week) | last 3 weeks 8.3 a week | lineup value 10.1
4988 | Nick Chubb | RB | age 30 | FA | market 1805 | projected 54.4 (6.8 a week) | last 3 weeks 6.8 a week | lineup value 5.6
BUF | Buffalo Bills | DEF | age ? | BUF | market 0 | projected 51.6 (6.4 a week) | last 3 weeks 6.3 a week | lineup value 4.3
4454 | Kendrick Bourne | WR | age 31 | ARI | market 0 | projected 46.9 (5.9 a week) | last 3 weeks 14.5 a week | lineup value 11.6
12476 | Devin Neal | RB | age 23 | WAS | market 2803 | projected 46.6 (5.8 a week) | last 3 weeks 0 a week | lineup value 6.2
6130 | Devin Singletary | RB | age 29 | NYG | market 0 | projected 42.1 (5.3 a week) | last 3 weeks 2.4 a week | lineup value 2.4
10444 | Cedric Tillman | WR | age 26 | NO | market 0 | projected 37.6 (4.7 a week) | last 3 weeks 0.5 a week | lineup value 0
11625 | Adonai Mitchell | WR | age 24 | NYJ | market 2987 | projected 32.2 (4 a week) | last 3 weeks 3.5 a week | lineup value 0.3
2505 | Darren Waller | TE | age 34 | CAR | market 1414 | projected 25.7 (3.2 a week) | last 3 weeks 9.3 a week | lineup value 1.5
12509 | Tre' Harris | WR | age 24 | LAC | market 2826 | projected 19.9 (2.5 a week) | last 3 weeks 2.2 a week | lineup value 0
11589 | Trey Benson | RB | age 24 | ARI | market 3171 | projected 0 (0 a week) | last 3 weeks 3.5 a week | lineup value 0

PARTNER (partnerId 9): record 4-2, rank 2, points for 807.9, contention window 1
4034 | Christian McCaffrey | RB | age 30 | SF | market 4600 | projected 164.9 (20.6 a week) | last 3 weeks 26 a week | lineup value 101.8
6904 | Jalen Hurts | QB | age 28 | PHI | market 4040 | projected 151.7 (19 a week) | last 3 weeks 20.2 a week | lineup value 7.6
11564 | Drake Maye | QB | age 24 | NE | market 5076 | projected 145.3 (18.2 a week) | last 3 weeks 20.9 a week | lineup value 3.2
11563 | Bo Nix | QB | age 26 | DEN | market 3824 | projected 132.1 (16.5 a week) | last 3 weeks 19.3 a week | lineup value 0
4866 | Saquon Barkley | RB | age 29 | PHI | market 4232 | projected 114.4 (14.3 a week) | last 3 weeks 14.6 a week | lineup value 49.9
8228 | Jaylen Warren | RB | age 27 | PIT | market 3538 | projected 110.4 (13.8 a week) | last 3 weeks 2.8 a week | lineup value 39.1
5846 | DK Metcalf | WR | age 28 | PIT | market 3437 | projected 105.7 (13.2 a week) | last 3 weeks 14.4 a week | lineup value 44.2
9754 | Quentin Johnston | WR | age 25 | LAC | market 3434 | projected 80.8 (10.1 a week) | last 3 weeks 10.2 a week | lineup value 24.9
8110 | Jake Ferguson | TE | age 27 | DAL | market 3462 | projected 78.5 (9.8 a week) | last 3 weeks 17.7 a week | lineup value 21
5022 | Dallas Goedert | TE | age 31 | PHI | market 3126 | projected 76.3 (9.5 a week) | last 3 weeks 18.9 a week | lineup value 18.7
7591 | Justin Fields | QB | age 27 | KC | market 1246 | projected 70.3 (8.8 a week) | last 3 weeks 19.3 a week | lineup value 0
8408 | Jordan Mason | RB | age 27 | MIN | market 3074 | projected 68.6 (8.6 a week) | last 3 weeks 7.6 a week | lineup value 4.7
8132 | Tyler Allgeier | RB | age 26 | ARI | market 3207 | projected 58.2 (7.3 a week) | last 3 weeks 7.3 a week | lineup value 0
LAC | Los Angeles Chargers | DEF | age ? | LAC | market 0 | projected 52.5 (6.6 a week) | last 3 weeks 6.3 a week | lineup value 13.9
12490 | Bhayshul Tuten | RB | age 23 | JAX | market 4229 | projected 46.8 (5.8 a week) | last 3 weeks 3.4 a week | lineup value 0
9504 | Kayshon Boutte | WR | age 24 | HOU | market 2963 | projected 45.9 (5.7 a week) | last 3 weeks 12.1 a week | lineup value 7.6
TB | Tampa Bay Buccaneers | DEF | age ? | TB | market 0 | projected 44.6 (5.6 a week) | last 3 weeks 5.3 a week | lineup value 6
5848 | Marquise Brown | WR | age 29 | PHI | market 0 | projected 41.6 (5.2 a week) | last 3 weeks 14 a week | lineup value 0
12492 | Pat Bryant | WR | age 23 | DEN | market 3012 | projected 34.7 (4.3 a week) | last 3 weeks 1.4 a week | lineup value 0
9494 | Marvin Mims | WR | age 24 | DEN | market 2739 | projected 33 (4.1 a week) | last 3 weeks 9.7 a week | lineup value 0
9511 | Keaton Mitchell | RB | age 24 | LAC | market 2858 | projected 29.4 (3.7 a week) | last 3 weeks 0.8 a week | lineup value 0
9480 | Brenton Strange | TE | age 25 | JAX | market 3625 | projected 29.2 (3.7 a week) | last 3 weeks 4.6 a week | lineup value 2.9

PARTNER (partnerId 1): record 3-3, rank 7, points for 568.5, contention window 0.44
4881 | Lamar Jackson | QB | age 29 | BAL | market 4615 | projected 134.5 (16.8 a week) | last 3 weeks 3.9 a week | lineup value 23.4
3163 | Jared Goff | QB | age 32 | DET | market 3070 | projected 129.1 (16.1 a week) | last 3 weeks 16.9 a week | lineup value 2.2
6794 | Justin Jefferson | WR | age 27 | MIN | market 4819 | projected 124.5 (15.6 a week) | last 3 weeks 14 a week | lineup value 69.8
7543 | Travis Etienne | RB | age 27 | NO | market 3839 | projected 90.8 (11.3 a week) | last 3 weeks 12.6 a week | lineup value 83.8
4983 | DJ Moore | WR | age 29 | BUF | market 3647 | projected 83.2 (10.4 a week) | last 3 weeks 5.3 a week | lineup value 28.6
1339 | Zach Ertz | TE | age 35 | PHI | market 0 | projected 72.3 (9 a week) | last 3 weeks 7.5 a week | lineup value 24.2
4144 | Jonnu Smith | TE | age 31 | GB | market 0 | projected 61.6 (7.7 a week) | last 3 weeks 2.8 a week | lineup value 8.1
9508 | Tyjae Spears | RB | age 25 | TEN | market 2979 | projected 61.6 (7.7 a week) | last 3 weeks 3.5 a week | lineup value 54.6
11610 | Malik Washington | WR | age 25 | MIA | market 2749 | projected 58.8 (7.3 a week) | last 3 weeks 4.8 a week | lineup value 11
PIT | Pittsburgh Steelers | DEF | age ? | PIT | market 0 | projected 53.2 (6.6 a week) | last 3 weeks 7.3 a week | lineup value 3.1
PHI | Philadelphia Eagles | DEF | age ? | PHI | market 0 | projected 52 (6.5 a week) | last 3 weeks 6.3 a week | lineup value 2.8
10226 | Andrei Iosivas | WR | age 27 | CIN | market 0 | projected 46.2 (5.8 a week) | last 3 weeks 6.1 a week | lineup value 5.6
MIA | Miami Dolphins | DEF | age ? | MIA | market 0 | projected 44.4 (5.6 a week) | last 3 weeks 7.3 a week | lineup value 0.4
4033 | David Njoku | TE | age 30 | LAC | market 2849 | projected 42 (5.3 a week) | last 3 weeks 9.2 a week | lineup value 2.3
1426 | DeAndre Hopkins | WR | age 33 | FA | market 1501 | projected 37.9 (4.7 a week) | last 3 weeks 3.5 a week | lineup value 1
11623 | Jordan Whittington | WR | age 26 | LAR | market 0 | projected 32.4 (4 a week) | last 3 weeks 4.1 a week | lineup value 1.9
11562 | Spencer Rattler | QB | age 26 | NO | market 0 | projected 30.1 (3.8 a week) | last 3 weeks 13.7 a week | lineup value 14.2
12481 | Cam Skattebo | RB | age 24 | NYG | market 4221 | projected 28.9 (3.6 a week) | last 3 weeks 19.5 a week | lineup value 21.9
3286 | Demarcus Robinson | WR | age 32 | SF | market 0 | projected 21.4 (2.7 a week) | last 3 weeks 5.4 a week | lineup value 0
12510 | Jalen Milroe | QB | age 23 | SEA | market 0 | projected 0 (0 a week) | last 3 weeks -0.7 a week | lineup value 0
4018 | Joe Mixon | RB | age 30 | FA | market 2254 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0
4663 | Austin Ekeler | RB | age 31 | WAS | market 0 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0

CANDIDATE DEALS (from a rules-based finder; points are the finder projections for the rest of the season):
c1 | partnerId 12 | I give Matthew Golden (12501) | I get Dak Prescott + Rachaad White (3294,8136) | my points 65.9 | their points -41 | likelihood 0.91
c2 | partnerId 10 | I give Kareem Hunt + Michael Pittman (4098,6819) | I get Baker Mayfield + Aaron Rodgers (4892,96) | my points 26 | their points 22.1 | likelihood 0.81
c3 | partnerId 12 | I give Jayden Reed + Matthew Golden (10222,12501) | I get Dak Prescott (3294) | my points 48.8 | their points -19.7 | likelihood 0.89
c4 | partnerId 9 | I give Davante Adams + Rome Odunze (2133,11620) | I get Jalen Hurts + Brenton Strange (6904,9480) | my points 17.4 | their points 39.1 | likelihood 0.8
c5 | partnerId 9 | I give Kareem Hunt + Rome Odunze (4098,11620) | I get Jalen Hurts + Justin Fields (6904,7591) | my points 45.8 | their points 15.5 | likelihood 0.7
c6 | partnerId 10 | I give Michael Pittman + Ricky Pearsall (6819,11638) | I get Baker Mayfield + J.J. McCarthy (4892,11565) | my points 28.7 | their points 15.6 | likelihood 0.75
c7 | partnerId 9 | I give Rome Odunze + Michael Pittman (11620,6819) | I get Jalen Hurts (6904) | my points 26.2 | their points 23.5 | likelihood 0.81
c8 | partnerId 10 | I give Kareem Hunt + Ricky Pearsall (4098,11638) | I get J.J. McCarthy + Aaron Rodgers (11565,96) | my points 25.3 | their points 16.2 | likelihood 0.59
c9 | partnerId 9 | I give Rome Odunze + Wan'Dale Robinson (11620,8126) | I get Jalen Hurts + Jaylen Wright (6904,11643) | my points 28.1 | their points 20.9 | likelihood 0.8
c10 | partnerId 1 | I give Kareem Hunt + Alec Pierce (4098,8142) | I get Jared Goff + Zach Ertz (3163,1339) | my points 45 | their points 5.4 | likelihood 0.87
c11 | partnerId 1 | I give Alec Pierce + Ricky Pearsall (8142,11638) | I get Jared Goff (3163) | my points 38 | their points 16.8 | likelihood 0.91
c12 | partnerId 1 | I give Kareem Hunt + Jayden Reed (4098,10222) | I get Jared Goff + Joe Mixon (3163,4018) | my points 37.7 | their points 14.2 | likelihood 0.86

Pick the best trades for my team.

=========== CASE 1180157996303147008-w10-r3 ===========
REPLY FILE: /Users/anik/workspace/chrome/sleeper/.eval-market/replies/suggest-v2/run1/1180157996303147008-w10-r3.json
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
Lineup slots: QB, RB, RB, WR, WR, TE, FLEX, FLEX, BN, BN, BN, BN, BN, BN. Superflex: no. Tight end premium: no. Points per reception: 0.5.
Columns: id | name | position | age | team | market value | projected points for the rest of the regular season (and per week) | points per week over the last three weeks played | lineup value (points my lineup loses if this player is removed).

MY TEAM (partnerId me): record 5-4, rank 3, points for 1051, contention window 0.89
9221 | Jahmyr Gibbs | RB | age 24 | DET | market 6920 | projected 99.6 (19.9 a week) | last 3 weeks 13.7 a week | lineup value 46.4
9493 | Puka Nacua | WR | age 25 | LAR | market 5533 | projected 84.8 (17 a week) | last 3 weeks 6.4 a week | lineup value 54
9226 | De'Von Achane | RB | age 25 | MIA | market 5206 | projected 79.6 (15.9 a week) | last 3 weeks 14.2 a week | lineup value 32.7
6786 | CeeDee Lamb | WR | age 27 | DAL | market 4856 | projected 64.6 (12.9 a week) | last 3 weeks 14.7 a week | lineup value 33.8
7021 | Rico Dowdle | RB | age 28 | PIT | market 3528 | projected 58.5 (11.7 a week) | last 3 weeks 14.2 a week | lineup value 14.4
9224 | Chase Brown | RB | age 26 | CIN | market 4717 | projected 56.5 (11.3 a week) | last 3 weeks 16.7 a week | lineup value 14
8183 | Brock Purdy | QB | age 26 | SF | market 4277 | projected 55.8 (11.2 a week) | last 3 weeks 0 a week | lineup value 55.8
11647 | Kimani Vidal | RB | age 25 | LAC | market 3089 | projected 48.2 (9.6 a week) | last 3 weeks 9.2 a week | lineup value 2
5872 | Deebo Samuel | WR | age 30 | SF | market 2650 | projected 43.8 (8.8 a week) | last 3 weeks 3.2 a week | lineup value 13
9753 | Zach Charbonnet | RB | age 25 | SEA | market 3537 | projected 43.7 (8.7 a week) | last 3 weeks 7.9 a week | lineup value 4.1
12518 | Tyler Warren | TE | age 24 | IND | market 4390 | projected 38.9 (7.8 a week) | last 3 weeks 9.1 a week | lineup value 38.9
12534 | Kyle Monangai | RB | age 24 | CHI | market 4209 | projected 38.6 (7.7 a week) | last 3 weeks 7.9 a week | lineup value 0
11566 | Jayden Daniels | QB | age 25 | WAS | market 5214 | projected 17.3 (3.5 a week) | last 3 weeks 11.3 a week | lineup value 17.3
12495 | Ollie Gordon | RB | age 22 | MIA | market 0 | projected 16 (3.2 a week) | last 3 weeks 5.4 a week | lineup value 0
6806 | J.K. Dobbins | RB | age 27 | DEN | market 3758 | projected 10.8 (2.2 a week) | last 3 weeks 9.3 a week | lineup value 0

PARTNER (partnerId 4): record 3-6, rank 8, points for 829.6, contention window 0.11
6904 | Jalen Hurts | QB | age 28 | PHI | market 4786 | projected 111.4 (22.3 a week) | last 3 weeks 17.1 a week | lineup value 26.2
6804 | Jordan Love | QB | age 27 | GB | market 3993 | projected 85.2 (17 a week) | last 3 weeks 12.8 a week | lineup value 0
5850 | Josh Jacobs | RB | age 28 | GB | market 4420 | projected 68 (13.6 a week) | last 3 weeks 16.1 a week | lineup value 30.4
7525 | DeVonta Smith | WR | age 27 | PHI | market 4101 | projected 61 (12.2 a week) | last 3 weeks 13.9 a week | lineup value 14.7
7543 | Travis Etienne | RB | age 27 | NO | market 4161 | projected 61 (12.2 a week) | last 3 weeks 6.7 a week | lineup value 14.7
8151 | Kenneth Walker | RB | age 25 | KC | market 5050 | projected 54.6 (10.9 a week) | last 3 weeks 4.6 a week | lineup value 8.5
9756 | Jordan Addison | WR | age 24 | MIN | market 3607 | projected 43.9 (8.8 a week) | last 3 weeks 11.6 a week | lineup value 2.2
8126 | Wan'Dale Robinson | WR | age 25 | TEN | market 3273 | projected 42.4 (8.5 a week) | last 3 weeks 9.3 a week | lineup value 5.1
7553 | Kyle Pitts | TE | age 26 | ATL | market 3768 | projected 42.3 (8.5 a week) | last 3 weeks 8.6 a week | lineup value 16.7
6819 | Michael Pittman | WR | age 29 | PIT | market 2871 | projected 40.9 (8.2 a week) | last 3 weeks 17.6 a week | lineup value 2.7
11655 | Tyrone Tracy | RB | age 26 | NYG | market 3144 | projected 38 (7.6 a week) | last 3 weeks 3.8 a week | lineup value 2.1
4066 | Evan Engram | TE | age 32 | DEN | market 0 | projected 25.6 (5.1 a week) | last 3 weeks 4.1 a week | lineup value 0
5927 | Terry McLaurin | WR | age 31 | WAS | market 3371 | projected 20.3 (4.1 a week) | last 3 weeks 4.3 a week | lineup value 1.6
11631 | Brian Thomas | WR | age 24 | JAX | market 3923 | projected 19.7 (3.9 a week) | last 3 weeks 3.9 a week | lineup value 0.2

PARTNER (partnerId 9): record 7-2, rank 1, points for 1017, contention window 1
4984 | Josh Allen | QB | age 30 | BUF | market 5610 | projected 119.7 (23.9 a week) | last 3 weeks 17.8 a week | lineup value 49.9
4034 | Christian McCaffrey | RB | age 30 | SF | market 4813 | projected 81 (16.2 a week) | last 3 weeks 25.2 a week | lineup value 46
5870 | Daniel Jones | QB | age 29 | IND | market 3049 | projected 69.7 (13.9 a week) | last 3 weeks 20.8 a week | lineup value 0
12527 | Ashton Jeanty | RB | age 22 | LV | market 5684 | projected 69.3 (13.9 a week) | last 3 weeks 7.1 a week | lineup value 27.8
12514 | Emeka Egbuka | WR | age 24 | TB | market 4555 | projected 61.4 (12.3 a week) | last 3 weeks 4.3 a week | lineup value 19.9
5846 | DK Metcalf | WR | age 28 | PIT | market 3476 | projected 54.2 (10.8 a week) | last 3 weeks 7.4 a week | lineup value 12.6
4199 | Aaron Jones | RB | age 31 | MIN | market 2990 | projected 51.6 (10.3 a week) | last 3 weeks 4.9 a week | lineup value 10.1
4217 | George Kittle | TE | age 33 | SF | market 3085 | projected 44.5 (8.9 a week) | last 3 weeks 5.7 a week | lineup value 12
8121 | Romeo Doubs | WR | age 26 | NE | market 3130 | projected 43.8 (8.8 a week) | last 3 weeks 10.2 a week | lineup value 2.3
9754 | Quentin Johnston | WR | age 25 | LAC | market 3435 | projected 38 (7.6 a week) | last 3 weeks 7.8 a week | lineup value 4.9
8408 | Jordan Mason | RB | age 27 | MIN | market 3428 | projected 33.6 (6.7 a week) | last 3 weeks 5.7 a week | lineup value 1.1
3214 | Hunter Henry | TE | age 31 | NE | market 3059 | projected 32.5 (6.5 a week) | last 3 weeks 6.5 a week | lineup value 0
11637 | Keon Coleman | WR | age 23 | BUF | market 2725 | projected 16.9 (3.4 a week) | last 3 weeks 2.4 a week | lineup value 0
10236 | Dalton Kincaid | TE | age 26 | BUF | market 3660 | projected 16.2 (3.2 a week) | last 3 weeks 7.3 a week | lineup value 8.2
11632 | Malik Nabers | WR | age 23 | NYG | market 5024 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0
12481 | Cam Skattebo | RB | age 24 | NYG | market 4223 | projected 0 (0 a week) | last 3 weeks 8.8 a week | lineup value 0

PARTNER (partnerId 6): record 5-4, rank 7, points for 899.4, contention window 0.27
9488 | Jaxon Smith-Njigba | WR | age 24 | SEA | market 5745 | projected 88.5 (17.7 a week) | last 3 weeks 13.4 a week | lineup value 46.8
6797 | Justin Herbert | QB | age 28 | LAC | market 4535 | projected 80.2 (16 a week) | last 3 weeks 28.3 a week | lineup value 45
8130 | Trey McBride | TE | age 26 | ARI | market 4598 | projected 69 (13.8 a week) | last 3 weeks 12.8 a week | lineup value 27.4
8228 | Jaylen Warren | RB | age 27 | PIT | market 3882 | projected 64.4 (12.9 a week) | last 3 weeks 14 a week | lineup value 23.5
8136 | Rachaad White | RB | age 27 | WAS | market 2845 | projected 45.8 (9.2 a week) | last 3 weeks 4.5 a week | lineup value 10.9
5022 | Dallas Goedert | TE | age 31 | PHI | market 3033 | projected 45.6 (9.1 a week) | last 3 weeks 6.5 a week | lineup value 4
5947 | Jakobi Meyers | WR | age 29 | JAX | market 3223 | projected 45.1 (9 a week) | last 3 weeks 1.4 a week | lineup value 3.4
12489 | RJ Harvey | RB | age 25 | DEN | market 3937 | projected 43.4 (8.7 a week) | last 3 weeks 15 a week | lineup value 10.7
6801 | Tee Higgins | WR | age 27 | CIN | market 4165 | projected 37.1 (7.4 a week) | last 3 weeks 20 a week | lineup value 10.9
7049 | Jauan Jennings | WR | age 29 | MIN | market 2787 | projected 35.8 (7.2 a week) | last 3 weeks 7.9 a week | lineup value 2
6770 | Joe Burrow | QB | age 29 | CIN | market 4867 | projected 35.1 (7 a week) | last 3 weeks 0 a week | lineup value 0
9508 | Tyjae Spears | RB | age 25 | TEN | market 3084 | projected 32.4 (6.5 a week) | last 3 weeks 9.6 a week | lineup value 0
11584 | Bucky Irving | RB | age 24 | TB | market 4581 | projected 26.5 (5.3 a week) | last 3 weeks 0 a week | lineup value 10.5
9504 | Kayshon Boutte | WR | age 24 | HOU | market 2991 | projected 15.9 (3.2 a week) | last 3 weeks 5 a week | lineup value 0
9494 | Marvin Mims | WR | age 24 | DEN | market 2731 | projected 14.3 (2.9 a week) | last 3 weeks 0.6 a week | lineup value 0
3321 | Tyreek Hill | WR | age 31 | FA | market 2521 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0

CANDIDATE DEALS (from a rules-based finder; points are the finder projections for the rest of the season):
c1 | partnerId 4 | I give Jayden Daniels (11566) | I get Jalen Hurts + Josh Jacobs (6904,5850) | my points 55.6 | their points -56.6 | likelihood 0.88
c2 | partnerId 9 | I give Kimani Vidal (11647) | I get Daniel Jones + Hunter Henry (5870,3214) | my points 26.6 | their points 11.4 | likelihood 0.81
c3 | partnerId 4 | I give J.K. Dobbins + Jayden Daniels (6806,11566) | I get Jalen Hurts + Jordan Love (6904,6804) | my points 38.3 | their points -93.6 | likelihood 0.9
c4 | partnerId 4 | I give Kyle Monangai + Jayden Daniels (12534,11566) | I get Jalen Hurts + Kyle Pitts (6904,7553) | my points 47.1 | their points -42.9 | likelihood 0.92
c5 | partnerId 9 | I give Rico Dowdle (7021) | I get Daniel Jones + George Kittle (5870,4217) | my points 24.5 | their points 8.6 | likelihood 0.95
c6 | partnerId 9 | I give Kimani Vidal + Kyle Monangai (11647,12534) | I get Daniel Jones + Cam Skattebo (5870,12481) | my points 18.8 | their points 12.3 | likelihood 0.72
c7 | partnerId 4 | I give Kyle Monangai + J.K. Dobbins (12534,6806) | I get Jordan Love + Kyle Pitts (6804,7553) | my points 27.7 | their points -16.2 | likelihood 0.73
c8 | partnerId 9 | I give Kimani Vidal + J.K. Dobbins (11647,6806) | I get Daniel Jones + Jordan Mason (5870,8408) | my points 17.6 | their points 11.7 | likelihood 0.93
c9 | partnerId 6 | I give Kyle Monangai + Chase Brown (12534,9224) | I get Justin Herbert + Dallas Goedert (6797,5022) | my points 25.5 | their points -27.9 | likelihood 0.65

Pick the best trades for my team.

=========== CASE 1180157996303147008-w10-r5 ===========
REPLY FILE: /Users/anik/workspace/chrome/sleeper/.eval-market/replies/suggest-v2/run1/1180157996303147008-w10-r5.json
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
Lineup slots: QB, RB, RB, WR, WR, TE, FLEX, FLEX, BN, BN, BN, BN, BN, BN. Superflex: no. Tight end premium: no. Points per reception: 0.5.
Columns: id | name | position | age | team | market value | projected points for the rest of the regular season (and per week) | points per week over the last three weeks played | lineup value (points my lineup loses if this player is removed).

MY TEAM (partnerId me): record 3-6, rank 9, points for 824.5, contention window 0
3163 | Jared Goff | QB | age 32 | DET | market 3644 | projected 92.6 (18.5 a week) | last 3 weeks 10.4 a week | lineup value 61
3198 | Derrick Henry | RB | age 32 | BAL | market 4741 | projected 81.1 (16.2 a week) | last 3 weeks 10.6 a week | lineup value 47.5
2133 | Davante Adams | WR | age 33 | LAR | market 3432 | projected 66.6 (13.3 a week) | last 3 weeks 14.8 a week | lineup value 29.7
5892 | David Montgomery | RB | age 29 | HOU | market 3784 | projected 51 (10.2 a week) | last 3 weeks 5 a week | lineup value 17.4
7526 | Jaylen Waddle | WR | age 27 | DEN | market 3969 | projected 50.1 (10 a week) | last 3 weeks 10.7 a week | lineup value 19.6
5045 | Courtland Sutton | WR | age 31 | DEN | market 3172 | projected 42.1 (8.4 a week) | last 3 weeks 10.6 a week | lineup value 11.6
8676 | Rashid Shaheed | WR | age 28 | SEA | market 2697 | projected 36.9 (7.4 a week) | last 3 weeks 8.4 a week | lineup value 2.1
1339 | Zach Ertz | TE | age 35 | PHI | market 0 | projected 33.3 (6.7 a week) | last 3 weeks 7.1 a week | lineup value 12.5
8125 | Calvin Austin | WR | age 27 | NYG | market 0 | projected 31.9 (6.4 a week) | last 3 weeks 4.3 a week | lineup value 0
11586 | Blake Corum | RB | age 25 | LAR | market 3978 | projected 31.6 (6.3 a week) | last 3 weeks 3.5 a week | lineup value 0.1
9758 | C.J. Stroud | QB | age 25 | HOU | market 3744 | projected 31.5 (6.3 a week) | last 3 weeks 13.9 a week | lineup value 0
5967 | Tony Pollard | RB | age 29 | TEN | market 3373 | projected 29.5 (5.9 a week) | last 3 weeks 7.4 a week | lineup value 0.9
4033 | David Njoku | TE | age 30 | LAC | market 2685 | projected 27 (5.4 a week) | last 3 weeks 3.9 a week | lineup value 6.2
4037 | Chris Godwin | WR | age 30 | TB | market 3001 | projected 22.2 (4.4 a week) | last 3 weeks 0 a week | lineup value 2.1
2216 | Mike Evans | WR | age 33 | SF | market 3188 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0
4663 | Austin Ekeler | RB | age 31 | WAS | market 0 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0

PARTNER (partnerId 9): record 7-2, rank 1, points for 1017, contention window 1
4984 | Josh Allen | QB | age 30 | BUF | market 5610 | projected 119.7 (23.9 a week) | last 3 weeks 17.8 a week | lineup value 49.9
4034 | Christian McCaffrey | RB | age 30 | SF | market 4813 | projected 81 (16.2 a week) | last 3 weeks 25.2 a week | lineup value 46
5870 | Daniel Jones | QB | age 29 | IND | market 3049 | projected 69.7 (13.9 a week) | last 3 weeks 20.8 a week | lineup value 0
12527 | Ashton Jeanty | RB | age 22 | LV | market 5684 | projected 69.3 (13.9 a week) | last 3 weeks 7.1 a week | lineup value 27.8
12514 | Emeka Egbuka | WR | age 24 | TB | market 4555 | projected 61.4 (12.3 a week) | last 3 weeks 4.3 a week | lineup value 19.9
5846 | DK Metcalf | WR | age 28 | PIT | market 3476 | projected 54.2 (10.8 a week) | last 3 weeks 7.4 a week | lineup value 12.6
4199 | Aaron Jones | RB | age 31 | MIN | market 2990 | projected 51.6 (10.3 a week) | last 3 weeks 4.9 a week | lineup value 10.1
4217 | George Kittle | TE | age 33 | SF | market 3085 | projected 44.5 (8.9 a week) | last 3 weeks 5.7 a week | lineup value 12
8121 | Romeo Doubs | WR | age 26 | NE | market 3130 | projected 43.8 (8.8 a week) | last 3 weeks 10.2 a week | lineup value 2.3
9754 | Quentin Johnston | WR | age 25 | LAC | market 3435 | projected 38 (7.6 a week) | last 3 weeks 7.8 a week | lineup value 4.9
8408 | Jordan Mason | RB | age 27 | MIN | market 3428 | projected 33.6 (6.7 a week) | last 3 weeks 5.7 a week | lineup value 1.1
3214 | Hunter Henry | TE | age 31 | NE | market 3059 | projected 32.5 (6.5 a week) | last 3 weeks 6.5 a week | lineup value 0
11637 | Keon Coleman | WR | age 23 | BUF | market 2725 | projected 16.9 (3.4 a week) | last 3 weeks 2.4 a week | lineup value 0
10236 | Dalton Kincaid | TE | age 26 | BUF | market 3660 | projected 16.2 (3.2 a week) | last 3 weeks 7.3 a week | lineup value 8.2
11632 | Malik Nabers | WR | age 23 | NYG | market 5024 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0
12481 | Cam Skattebo | RB | age 24 | NYG | market 4223 | projected 0 (0 a week) | last 3 weeks 8.8 a week | lineup value 0

PARTNER (partnerId 7): record 5-4, rank 4, points for 965.2, contention window 0.73
421 | Matthew Stafford | QB | age 38 | LAR | market 3249 | projected 91 (18.2 a week) | last 3 weeks 18.1 a week | lineup value 54.7
6813 | Jonathan Taylor | RB | age 27 | IND | market 5570 | projected 83.9 (16.8 a week) | last 3 weeks 25.8 a week | lineup value 52.2
8155 | Breece Hall | RB | age 25 | NYJ | market 4582 | projected 65.8 (13.2 a week) | last 3 weeks 12.7 a week | lineup value 25.5
5859 | A.J. Brown | WR | age 29 | NE | market 4314 | projected 63.8 (12.8 a week) | last 3 weeks 8.7 a week | lineup value 29.5
7588 | Javonte Williams | RB | age 26 | DAL | market 4340 | projected 61.1 (12.2 a week) | last 3 weeks 14.2 a week | lineup value 30.6
10213 | Tre Tucker | WR | age 25 | LV | market 2675 | projected 45.4 (9.1 a week) | last 3 weeks 3.7 a week | lineup value 11.7
12508 | Jaxson Dart | QB | age 23 | NYG | market 5134 | projected 41.6 (8.3 a week) | last 3 weeks 15.6 a week | lineup value 5.3
8132 | Tyler Allgeier | RB | age 26 | ARI | market 3644 | projected 34.8 (7 a week) | last 3 weeks 3.5 a week | lineup value 0
12517 | Colston Loveland | TE | age 22 | CHI | market 5026 | projected 34.7 (6.9 a week) | last 3 weeks 0 a week | lineup value 2.6
9487 | Parker Washington | WR | age 24 | JAX | market 3949 | projected 32.8 (6.6 a week) | last 3 weeks 0 a week | lineup value 0.8
5844 | T.J. Hockenson | TE | age 29 | MIN | market 2752 | projected 32.8 (6.6 a week) | last 3 weeks 6.3 a week | lineup value 0.7
8112 | Drake London | WR | age 25 | ATL | market 4839 | projected 28.1 (5.6 a week) | last 3 weeks 13.5 a week | lineup value 9.8
4035 | Alvin Kamara | RB | age 31 | NO | market 2623 | projected 21.2 (4.2 a week) | last 3 weeks 3.4 a week | lineup value 3
11628 | Marvin Harrison | WR | age 24 | HOU | market 3928 | projected 20.5 (4.1 a week) | last 3 weeks 8.6 a week | lineup value 3.1
8146 | Garrett Wilson | WR | age 26 | NYJ | market 4121 | projected 12 (2.4 a week) | last 3 weeks 0 a week | lineup value 2.2
5849 | Kyler Murray | QB | age 29 | MIN | market 3322 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0

PARTNER (partnerId 10): record 6-3, rank 2, points for 944.4, contention window 1
4892 | Baker Mayfield | QB | age 31 | TB | market 3478 | projected 94.4 (18.9 a week) | last 3 weeks 5.4 a week | lineup value 12.6
9509 | Bijan Robinson | RB | age 24 | ATL | market 6727 | projected 91 (18.2 a week) | last 3 weeks 12 a week | lineup value 46.4
7547 | Amon-Ra St. Brown | WR | age 26 | DET | market 5239 | projected 81.9 (16.4 a week) | last 3 weeks 10.6 a week | lineup value 37.3
11560 | Caleb Williams | QB | age 24 | CHI | market 5540 | projected 81.8 (16.4 a week) | last 3 weeks 19.2 a week | lineup value 0
9997 | Zay Flowers | WR | age 26 | BAL | market 4124 | projected 61 (12.2 a week) | last 3 weeks 6.5 a week | lineup value 16.4
12529 | TreVeyon Henderson | RB | age 23 | NE | market 4631 | projected 55.6 (11.1 a week) | last 3 weeks 5.6 a week | lineup value 16
6790 | D'Andre Swift | RB | age 27 | CHI | market 3944 | projected 55 (11 a week) | last 3 weeks 11.5 a week | lineup value 10.4
8137 | George Pickens | WR | age 25 | DAL | market 4792 | projected 54.4 (10.9 a week) | last 3 weeks 10.8 a week | lineup value 19.6
8134 | Khalil Shakir | WR | age 26 | BUF | market 3044 | projected 50.6 (10.1 a week) | last 3 weeks 9 a week | lineup value 6.8
12493 | Oronde Gadsden | TE | age 23 | LAC | market 4018 | projected 36.8 (7.4 a week) | last 3 weeks 8.5 a week | lineup value 27.1
12533 | Jacory Croskey-Merritt | RB | age 25 | WAS | market 3626 | projected 26.6 (5.3 a week) | last 3 weeks 3.6 a week | lineup value 0
11638 | Ricky Pearsall | WR | age 26 | SF | market 2208 | projected 26.5 (5.3 a week) | last 3 weeks 0 a week | lineup value 0
10859 | Sam LaPorta | TE | age 25 | DET | market 4197 | projected 10.8 (2.2 a week) | last 3 weeks 7.4 a week | lineup value 1.2

CANDIDATE DEALS (from a rules-based finder; points are the finder projections for the rest of the season):
c1 | partnerId 9 | I give Derrick Henry + Davante Adams (3198,2133) | I get Malik Nabers + Jordan Mason (11632,8408) | my points -76.3 | their points 51.9 | likelihood 0.72
c2 | partnerId 9 | I give Derrick Henry + Jared Goff (3198,3163) | I get Malik Nabers + Hunter Henry (11632,3214) | my points -105.7 | their points 35.5 | likelihood 0.72
c3 | partnerId 9 | I give Derrick Henry + Jaylen Waddle (3198,7526) | I get Malik Nabers + Daniel Jones (11632,5870) | my points -67.2 | their points 45.7 | likelihood 0.73
c4 | partnerId 7 | I give Derrick Henry + Davante Adams (3198,2133) | I get Tyler Allgeier + Colston Loveland (8132,12517) | my points -74.3 | their points 49.7 | likelihood 0.69
c5 | partnerId 7 | I give Derrick Henry + Jaylen Waddle (3198,7526) | I get Parker Washington + Colston Loveland (9487,12517) | my points -63.3 | their points 41.8 | likelihood 0.69
c6 | partnerId 10 | I give Davante Adams + David Njoku (2133,4033) | I get Jacory Croskey-Merritt + Ricky Pearsall (12533,11638) | my points -28 | their points 18.2 | likelihood 0.71
c7 | partnerId 10 | I give Davante Adams + Jaylen Waddle (2133,7526) | I get Sam LaPorta (10859) | my points -47.9 | their points 13.2 | likelihood 0.54

Pick the best trades for my team.

=========== CASE 1180157996303147008-w4-r8 ===========
REPLY FILE: /Users/anik/workspace/chrome/sleeper/.eval-market/replies/suggest-v2/run1/1180157996303147008-w4-r8.json
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
League: keeper, 10 teams, week 4, 11 regular season weeks left, playoffs start week 15
Lineup slots: QB, RB, RB, WR, WR, TE, FLEX, FLEX, BN, BN, BN, BN, BN, BN. Superflex: no. Tight end premium: no. Points per reception: 0.5.
Columns: id | name | position | age | team | market value | projected points for the rest of the regular season (and per week) | points per week over the last three weeks played | lineup value (points my lineup loses if this player is removed).

MY TEAM (partnerId me): record 2-1, rank 6, points for 280.9, contention window 0.42
4046 | Patrick Mahomes | QB | age 31 | KC | market 4078 | projected 214.9 (19.5 a week) | last 3 weeks 20.9 a week | lineup value 214.9
8138 | James Cook | RB | age 27 | BUF | market 5452 | projected 166.9 (15.2 a week) | last 3 weeks 21.5 a week | lineup value 166.9
6794 | Justin Jefferson | WR | age 27 | MIN | market 4806 | projected 129.2 (11.7 a week) | last 3 weeks 10.8 a week | lineup value 52.3
8144 | Chris Olave | WR | age 26 | NO | market 4247 | projected 119.6 (10.9 a week) | last 3 weeks 9.3 a week | lineup value 41.3
8148 | Jameson Williams | WR | age 25 | DET | market 4185 | projected 103.1 (9.4 a week) | last 3 weeks 9.4 a week | lineup value 26.5
10229 | Rashee Rice | WR | age 26 | KC | market 4348 | projected 101.2 (9.2 a week) | last 3 weeks 0 a week | lineup value 41.4
8110 | Jake Ferguson | TE | age 27 | DAL | market 3199 | projected 90.5 (8.2 a week) | last 3 weeks 10.6 a week | lineup value 6.1
1466 | Travis Kelce | TE | age 37 | KC | market 2752 | projected 89.8 (8.2 a week) | last 3 weeks 8.1 a week | lineup value 6.1
4039 | Cooper Kupp | WR | age 33 | SEA | market 2062 | projected 71.6 (6.5 a week) | last 3 weeks 6.4 a week | lineup value 8.8
7611 | Rhamondre Stevenson | RB | age 28 | NE | market 3629 | projected 63.7 (5.8 a week) | last 3 weeks 8.5 a week | lineup value 63.7
9484 | Tucker Kraft | TE | age 25 | GB | market 4107 | projected 49.8 (4.5 a week) | last 3 weeks 11.6 a week | lineup value 5.6
12530 | Travis Hunter | DB | age 23 | JAX | market 0 | projected 24.6 (2.2 a week) | last 3 weeks 4.2 a week | lineup value 0
4018 | Joe Mixon | RB | age 30 | FA | market 2254 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0
4137 | James Conner | RB | age 31 | ARI | market 2739 | projected 0 (0 a week) | last 3 weeks 9.8 a week | lineup value 0
7528 | Najee Harris | RB | age 28 | NYG | market 2342 | projected 0 (0 a week) | last 3 weeks 3.4 a week | lineup value 0

PARTNER (partnerId 9): record 2-1, rank 1, points for 345.7, contention window 1
4984 | Josh Allen | QB | age 30 | BUF | market 5633 | projected 236.4 (21.5 a week) | last 3 weeks 24.5 a week | lineup value 236.4
4034 | Christian McCaffrey | RB | age 30 | SF | market 4814 | projected 207.4 (18.9 a week) | last 3 weeks 19.1 a week | lineup value 127.7
12527 | Ashton Jeanty | RB | age 22 | LV | market 5754 | projected 142.5 (13 a week) | last 3 weeks 7.7 a week | lineup value 65.4
12514 | Emeka Egbuka | WR | age 24 | TB | market 4571 | projected 126.4 (11.5 a week) | last 3 weeks 14.7 a week | lineup value 48.9
5846 | DK Metcalf | WR | age 28 | PIT | market 3482 | projected 112.4 (10.2 a week) | last 3 weeks 10.2 a week | lineup value 35.9
8408 | Jordan Mason | RB | age 27 | MIN | market 3446 | projected 94.4 (8.6 a week) | last 3 weeks 12.1 a week | lineup value 16.9
9754 | Quentin Johnston | WR | age 25 | LAC | market 3429 | projected 89.9 (8.2 a week) | last 3 weeks 9.3 a week | lineup value 17.5
4217 | George Kittle | TE | age 33 | SF | market 3105 | projected 80 (7.3 a week) | last 3 weeks 3.5 a week | lineup value 56.3
12481 | Cam Skattebo | RB | age 24 | NYG | market 4614 | projected 68.2 (6.2 a week) | last 3 weeks 12 a week | lineup value 24.3
4199 | Aaron Jones | RB | age 31 | MIN | market 2997 | projected 67.9 (6.2 a week) | last 3 weeks 5.5 a week | lineup value 18.6
12490 | Bhayshul Tuten | RB | age 23 | JAX | market 4618 | projected 60.9 (5.5 a week) | last 3 weeks 7.5 a week | lineup value 1.3
11637 | Keon Coleman | WR | age 23 | BUF | market 2749 | projected 60 (5.5 a week) | last 3 weeks 9.6 a week | lineup value 3
10236 | Dalton Kincaid | TE | age 26 | BUF | market 3630 | projected 48.1 (4.4 a week) | last 3 weeks 11.2 a week | lineup value 24.4
1426 | DeAndre Hopkins | WR | age 33 | FA | market 1519 | projected 43 (3.9 a week) | last 3 weeks 0.6 a week | lineup value 0
11632 | Malik Nabers | WR | age 23 | NYG | market 4907 | projected 12.7 (1.2 a week) | last 3 weeks 15.2 a week | lineup value 1.9
11576 | Braelon Allen | RB | age 22 | NYJ | market 3515 | projected 3.5 (0.3 a week) | last 3 weeks 4.6 a week | lineup value 0

PARTNER (partnerId 10): record 2-1, rank 4, points for 319.5, contention window 0.73
4892 | Baker Mayfield | QB | age 31 | TB | market 3496 | projected 190.4 (17.3 a week) | last 3 weeks 20.1 a week | lineup value 40.5
9509 | Bijan Robinson | RB | age 24 | ATL | market 6803 | projected 182.7 (16.6 a week) | last 3 weeks 18.3 a week | lineup value 97.5
11560 | Caleb Williams | QB | age 24 | CHI | market 5552 | projected 167.6 (15.2 a week) | last 3 weeks 24.3 a week | lineup value 17.7
7547 | Amon-Ra St. Brown | WR | age 26 | DET | market 5245 | projected 159.1 (14.5 a week) | last 3 weeks 19.5 a week | lineup value 67.4
8137 | George Pickens | WR | age 25 | DAL | market 4814 | projected 130.1 (11.8 a week) | last 3 weeks 11.7 a week | lineup value 42.6
9997 | Zay Flowers | WR | age 26 | BAL | market 4153 | projected 121.8 (11.1 a week) | last 3 weeks 12.8 a week | lineup value 30
12529 | TreVeyon Henderson | RB | age 23 | NE | market 4581 | projected 108.1 (9.8 a week) | last 3 weeks 6.4 a week | lineup value 27.9
6790 | D'Andre Swift | RB | age 27 | CHI | market 3914 | projected 98.7 (9 a week) | last 3 weeks 9.9 a week | lineup value 24.7
8134 | Khalil Shakir | WR | age 26 | BUF | market 3059 | projected 97.6 (8.9 a week) | last 3 weeks 7.9 a week | lineup value 7.7
12533 | Jacory Croskey-Merritt | RB | age 25 | WAS | market 3623 | projected 93.9 (8.5 a week) | last 3 weeks 8.5 a week | lineup value 27.1
10859 | Sam LaPorta | TE | age 25 | DET | market 4145 | projected 60.1 (5.5 a week) | last 3 weeks 6.8 a week | lineup value 60.1
12519 | Luther Burden | WR | age 22 | CHI | market 4694 | projected 44.2 (4 a week) | last 3 weeks 7 a week | lineup value 0
11638 | Ricky Pearsall | WR | age 26 | SF | market 2211 | projected 38 (3.5 a week) | last 3 weeks 11.9 a week | lineup value 2.4
4981 | Calvin Ridley | WR | age 31 | TEN | market 2279 | projected 34.4 (3.1 a week) | last 3 weeks 5 a week | lineup value 0

PARTNER (partnerId 7): record 2-1, rank 5, points for 293.3, contention window 0.58
6813 | Jonathan Taylor | RB | age 27 | IND | market 5538 | projected 199.2 (18.1 a week) | last 3 weeks 23.9 a week | lineup value 113.4
7588 | Javonte Williams | RB | age 26 | DAL | market 4334 | projected 149.8 (13.6 a week) | last 3 weeks 17 a week | lineup value 66.2
8155 | Breece Hall | RB | age 25 | NYJ | market 4577 | projected 131.5 (12 a week) | last 3 weeks 9.2 a week | lineup value 45.9
5859 | A.J. Brown | WR | age 29 | NE | market 4321 | projected 109.7 (10 a week) | last 3 weeks 8.8 a week | lineup value 33.3
10213 | Tre Tucker | WR | age 25 | LV | market 2676 | projected 87.6 (8 a week) | last 3 weeks 0 a week | lineup value 11.5
4035 | Alvin Kamara | RB | age 31 | NO | market 2597 | projected 87.4 (7.9 a week) | last 3 weeks 10.6 a week | lineup value 14.7
8112 | Drake London | WR | age 25 | ATL | market 4793 | projected 77.1 (7 a week) | last 3 weeks 7.3 a week | lineup value 20
8183 | Brock Purdy | QB | age 26 | SF | market 4304 | projected 75.7 (6.9 a week) | last 3 weeks 6.3 a week | lineup value 58.9
11628 | Marvin Harrison | WR | age 24 | HOU | market 3913 | projected 72.4 (6.6 a week) | last 3 weeks 8.4 a week | lineup value 8.2
8132 | Tyler Allgeier | RB | age 26 | ARI | market 3640 | projected 68.5 (6.2 a week) | last 3 weeks 5.9 a week | lineup value 1.9
5844 | T.J. Hockenson | TE | age 29 | MIN | market 2770 | projected 67.3 (6.1 a week) | last 3 weeks 6 a week | lineup value 67.3
8125 | Calvin Austin | WR | age 27 | NYG | market 0 | projected 55 (5 a week) | last 3 weeks 4.5 a week | lineup value 7.1
8146 | Garrett Wilson | WR | age 26 | NYJ | market 4112 | projected 48.8 (4.4 a week) | last 3 weeks 15.1 a week | lineup value 7.3
5849 | Kyler Murray | QB | age 29 | MIN | market 3573 | projected 35.5 (3.2 a week) | last 3 weeks 15.8 a week | lineup value 18.7
12469 | Dylan Sampson | RB | age 22 | CLE | market 3299 | projected 32.8 (3 a week) | last 3 weeks 7.6 a week | lineup value 0

CANDIDATE DEALS (from a rules-based finder; points are the finder projections for the rest of the season):
c1 | partnerId 9 | I give Rashee Rice + Tucker Kraft (10229,9484) | I get Bhayshul Tuten + Jordan Mason (12490,8408) | my points 9.1 | their points 38.8 | likelihood 0.67
c2 | partnerId 9 | I give Rashee Rice + Jake Ferguson (10229,8110) | I get Bhayshul Tuten + Aaron Jones (12490,4199) | my points -3 | their points 42.1 | likelihood 0.65
c3 | partnerId 10 | I give Travis Kelce + Rashee Rice (1466,10229) | I get Calvin Ridley + TreVeyon Henderson (4981,12529) | my points 8.2 | their points 54.1 | likelihood 0.58
c4 | partnerId 9 | I give Rashee Rice + Travis Kelce (10229,1466) | I get Bhayshul Tuten + DeAndre Hopkins (12490,1426) | my points -28.4 | their points 47.3 | likelihood 0.7
c5 | partnerId 10 | I give Jake Ferguson + Rashee Rice (8110,10229) | I get Ricky Pearsall + TreVeyon Henderson (11638,12529) | my points 16.1 | their points 48.9 | likelihood 0.55
c6 | partnerId 9 | I give Rashee Rice + Chris Olave (10229,8144) | I get Bhayshul Tuten + Malik Nabers (12490,11632) | my points -63.9 | their points 54.7 | likelihood 0.5
c7 | partnerId 10 | I give Travis Kelce (1466) | I get Khalil Shakir (8134) | my points 2.2 | their points 39.7 | likelihood 0.4
c8 | partnerId 7 | I give Travis Kelce + Tucker Kraft (1466,9484) | I get Tyler Allgeier + Garrett Wilson (8132,8146) | my points 36 | their points 30.3 | likelihood 0.53
c9 | partnerId 7 | I give Jake Ferguson + Tucker Kraft (8110,9484) | I get Alvin Kamara + Garrett Wilson (4035,8146) | my points 47.5 | their points 12.4 | likelihood 0.48

Pick the best trades for my team.

=========== CASE 1180157996303147008-w7-r8 ===========
REPLY FILE: /Users/anik/workspace/chrome/sleeper/.eval-market/replies/suggest-v2/run1/1180157996303147008-w7-r8.json
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
League: keeper, 10 teams, week 7, 8 regular season weeks left, playoffs start week 15
Lineup slots: QB, RB, RB, WR, WR, TE, FLEX, FLEX, BN, BN, BN, BN, BN, BN. Superflex: no. Tight end premium: no. Points per reception: 0.5.
Columns: id | name | position | age | team | market value | projected points for the rest of the regular season (and per week) | points per week over the last three weeks played | lineup value (points my lineup loses if this player is removed).

MY TEAM (partnerId me): record 3-3, rank 6, points for 573.9, contention window 0.42
4046 | Patrick Mahomes | QB | age 31 | KC | market 4074 | projected 154.7 (19.3 a week) | last 3 weeks 28.8 a week | lineup value 154.7
8138 | James Cook | RB | age 27 | BUF | market 5441 | projected 117.1 (14.6 a week) | last 3 weeks 11.5 a week | lineup value 117.1
6794 | Justin Jefferson | WR | age 27 | MIN | market 4791 | projected 104.3 (13 a week) | last 3 weeks 11.1 a week | lineup value 44.5
10229 | Rashee Rice | WR | age 26 | KC | market 4338 | projected 101.2 (12.7 a week) | last 3 weeks 0 a week | lineup value 41.4
8144 | Chris Olave | WR | age 26 | NO | market 4260 | projected 87.5 (10.9 a week) | last 3 weeks 10.2 a week | lineup value 34.6
8148 | Jameson Williams | WR | age 25 | DET | market 4184 | projected 73.1 (9.1 a week) | last 3 weeks 7.3 a week | lineup value 21.9
1466 | Travis Kelce | TE | age 37 | KC | market 2756 | projected 65.1 (8.1 a week) | last 3 weeks 11.2 a week | lineup value 6.1
8110 | Jake Ferguson | TE | age 27 | DAL | market 3205 | projected 61.2 (7.7 a week) | last 3 weeks 14.9 a week | lineup value 2.2
4039 | Cooper Kupp | WR | age 33 | SEA | market 2062 | projected 44.7 (5.6 a week) | last 3 weeks 8.2 a week | lineup value 7.2
7611 | Rhamondre Stevenson | RB | age 28 | NE | market 3627 | projected 36.9 (4.6 a week) | last 3 weeks 6.7 a week | lineup value 36.9
9484 | Tucker Kraft | TE | age 25 | GB | market 4105 | projected 30.6 (3.8 a week) | last 3 weeks 6.5 a week | lineup value 3.6
2505 | Darren Waller | TE | age 34 | CAR | market 1369 | projected 21 (2.6 a week) | last 3 weeks 2.7 a week | lineup value 0
12530 | Travis Hunter | DB | age 23 | JAX | market 0 | projected 6.7 (0.8 a week) | last 3 weeks 5.7 a week | lineup value 0
4018 | Joe Mixon | RB | age 30 | FA | market 2254 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0
4137 | James Conner | RB | age 31 | ARI | market 2739 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0
7528 | Najee Harris | RB | age 28 | NYG | market 2342 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0

PARTNER (partnerId 10): record 5-1, rank 3, points for 678.4, contention window 0.89
9509 | Bijan Robinson | RB | age 24 | ATL | market 6762 | projected 147.5 (18.4 a week) | last 3 weeks 20.1 a week | lineup value 80.9
4892 | Baker Mayfield | QB | age 31 | TB | market 3485 | projected 134 (16.7 a week) | last 3 weeks 23.2 a week | lineup value 18
11560 | Caleb Williams | QB | age 24 | CHI | market 5530 | projected 133.7 (16.7 a week) | last 3 weeks 11.4 a week | lineup value 17.7
7547 | Amon-Ra St. Brown | WR | age 26 | DET | market 5238 | projected 114.2 (14.3 a week) | last 3 weeks 15.2 a week | lineup value 50.4
8137 | George Pickens | WR | age 25 | DAL | market 4811 | projected 89.8 (11.2 a week) | last 3 weeks 23.3 a week | lineup value 30.3
9997 | Zay Flowers | WR | age 26 | BAL | market 4133 | projected 86.2 (10.8 a week) | last 3 weeks 8.7 a week | lineup value 22.3
12529 | TreVeyon Henderson | RB | age 23 | NE | market 4582 | projected 81.1 (10.1 a week) | last 3 weeks 6.5 a week | lineup value 19.5
6790 | D'Andre Swift | RB | age 27 | CHI | market 3917 | projected 76.3 (9.5 a week) | last 3 weeks 13.3 a week | lineup value 20.9
8134 | Khalil Shakir | WR | age 26 | BUF | market 3053 | projected 70.8 (8.9 a week) | last 3 weeks 9.6 a week | lineup value 7.6
12533 | Jacory Croskey-Merritt | RB | age 25 | WAS | market 3627 | projected 64.6 (8.1 a week) | last 3 weeks 12.7 a week | lineup value 16
12519 | Luther Burden | WR | age 22 | CHI | market 4673 | projected 34.7 (4.3 a week) | last 3 weeks 2.6 a week | lineup value 0
10859 | Sam LaPorta | TE | age 25 | DET | market 4149 | projected 31 (3.9 a week) | last 3 weeks 12.4 a week | lineup value 31
11638 | Ricky Pearsall | WR | age 26 | SF | market 2212 | projected 26.5 (3.3 a week) | last 3 weeks 2.2 a week | lineup value 0
4981 | Calvin Ridley | WR | age 31 | TEN | market 2304 | projected 7.9 (1 a week) | last 3 weeks 7.3 a week | lineup value 0

PARTNER (partnerId 3): record 5-1, rank 1, points for 715.1, contention window 1
9221 | Jahmyr Gibbs | RB | age 24 | DET | market 6909 | projected 134.7 (16.8 a week) | last 3 weeks 13.1 a week | lineup value 53.6
9226 | De'Von Achane | RB | age 25 | MIA | market 5200 | projected 133.4 (16.7 a week) | last 3 weeks 19.9 a week | lineup value 51.6
6786 | CeeDee Lamb | WR | age 27 | DAL | market 4854 | projected 111.1 (13.9 a week) | last 3 weeks 0 a week | lineup value 67.5
9493 | Puka Nacua | WR | age 25 | LAR | market 5548 | projected 102.2 (12.8 a week) | last 3 weeks 17.6 a week | lineup value 58.6
9224 | Chase Brown | RB | age 26 | CIN | market 4732 | projected 89.8 (11.2 a week) | last 3 weeks 8.3 a week | lineup value 8.7
12474 | Woody Marks | RB | age 25 | HOU | market 3400 | projected 89.1 (11.1 a week) | last 3 weeks 0.8 a week | lineup value 3.6
7021 | Rico Dowdle | RB | age 28 | PIT | market 3512 | projected 88.6 (11.1 a week) | last 3 weeks 22.1 a week | lineup value 9.9
11647 | Kimani Vidal | RB | age 25 | LAC | market 3093 | projected 86.4 (10.8 a week) | last 3 weeks 7.1 a week | lineup value 6.7
12518 | Tyler Warren | TE | age 24 | IND | market 4416 | projected 72.3 (9 a week) | last 3 weeks 14.5 a week | lineup value 72.3
5872 | Deebo Samuel | WR | age 30 | SF | market 2652 | projected 65.9 (8.2 a week) | last 3 weeks 13.4 a week | lineup value 22.3
9753 | Zach Charbonnet | RB | age 25 | SEA | market 3519 | projected 63.3 (7.9 a week) | last 3 weeks 9 a week | lineup value 0
11566 | Jayden Daniels | QB | age 25 | WAS | market 5300 | projected 58.5 (7.3 a week) | last 3 weeks 13.3 a week | lineup value 58.5
6806 | J.K. Dobbins | RB | age 27 | DEN | market 3691 | projected 48.5 (6.1 a week) | last 3 weeks 10 a week | lineup value 4.6
7594 | Chuba Hubbard | RB | age 27 | CAR | market 3551 | projected 38.5 (4.8 a week) | last 3 weeks 2.8 a week | lineup value 0
12495 | Ollie Gordon | RB | age 22 | MIA | market 0 | projected 28.7 (3.6 a week) | last 3 weeks 0.5 a week | lineup value 0
12471 | DJ Giddens | RB | age 23 | IND | market 0 | projected 2.1 (0.3 a week) | last 3 weeks 0.7 a week | lineup value 0

PARTNER (partnerId 9): record 5-1, rank 2, points for 705.8, contention window 1
4984 | Josh Allen | QB | age 30 | BUF | market 5619 | projected 166.4 (20.8 a week) | last 3 weeks 21.4 a week | lineup value 59.6
4034 | Christian McCaffrey | RB | age 30 | SF | market 4815 | projected 145.5 (18.2 a week) | last 3 weeks 22.5 a week | lineup value 82.9
5870 | Daniel Jones | QB | age 29 | IND | market 3057 | projected 124 (15.5 a week) | last 3 weeks 4.1 a week | lineup value 17.3
12527 | Ashton Jeanty | RB | age 22 | LV | market 5718 | projected 100 (12.5 a week) | last 3 weeks 21 a week | lineup value 40.1
5846 | DK Metcalf | WR | age 28 | PIT | market 3475 | projected 90.1 (11.3 a week) | last 3 weeks 13.4 a week | lineup value 20.7
12514 | Emeka Egbuka | WR | age 24 | TB | market 4572 | projected 87.3 (10.9 a week) | last 3 weeks 16.9 a week | lineup value 26.7
4217 | George Kittle | TE | age 33 | SF | market 3098 | projected 80 (10 a week) | last 3 weeks 0 a week | lineup value 22.5
8121 | Romeo Doubs | WR | age 26 | NE | market 3135 | projected 71.2 (8.9 a week) | last 3 weeks 2.7 a week | lineup value 2.5
4199 | Aaron Jones | RB | age 31 | MIN | market 2990 | projected 67.9 (8.5 a week) | last 3 weeks 0 a week | lineup value 10.1
9754 | Quentin Johnston | WR | age 25 | LAC | market 3426 | projected 67.9 (8.5 a week) | last 3 weeks 8.2 a week | lineup value 7
8408 | Jordan Mason | RB | age 27 | MIN | market 3434 | projected 64.6 (8.1 a week) | last 3 weeks 6.6 a week | lineup value 5.1
3214 | Hunter Henry | TE | age 31 | NE | market 3054 | projected 57.6 (7.2 a week) | last 3 weeks 3.3 a week | lineup value 0.1
11637 | Keon Coleman | WR | age 23 | BUF | market 2731 | projected 33 (4.1 a week) | last 3 weeks 5.6 a week | lineup value 0
10236 | Dalton Kincaid | TE | age 26 | BUF | market 3639 | projected 32.6 (4.1 a week) | last 3 weeks 7.7 a week | lineup value 8.2
12481 | Cam Skattebo | RB | age 24 | NYG | market 4583 | projected 26.4 (3.3 a week) | last 3 weeks 17.8 a week | lineup value 7.3
11632 | Malik Nabers | WR | age 23 | NYG | market 5024 | projected 0 (0 a week) | last 3 weeks 1 a week | lineup value 0

PARTNER (partnerId 7): record 3-3, rank 5, points for 611.5, contention window 0.58
6813 | Jonathan Taylor | RB | age 27 | IND | market 5544 | projected 143.9 (18 a week) | last 3 weeks 21.3 a week | lineup value 99.4
421 | Matthew Stafford | QB | age 38 | LAR | market 3238 | projected 124.3 (15.5 a week) | last 3 weeks 3.1 a week | lineup value 124.3
7588 | Javonte Williams | RB | age 26 | DAL | market 4344 | projected 107.4 (13.4 a week) | last 3 weeks 16.6 a week | lineup value 72.3
8155 | Breece Hall | RB | age 25 | NYJ | market 4580 | projected 92.9 (11.6 a week) | last 3 weeks 11.7 a week | lineup value 55
5859 | A.J. Brown | WR | age 29 | NE | market 4316 | projected 74.4 (9.3 a week) | last 3 weeks 6.5 a week | lineup value 48.2
10213 | Tre Tucker | WR | age 25 | LV | market 2676 | projected 62.5 (7.8 a week) | last 3 weeks 7.3 a week | lineup value 30.7
8112 | Drake London | WR | age 25 | ATL | market 4799 | projected 54.1 (6.8 a week) | last 3 weeks 15.9 a week | lineup value 26.8
5844 | T.J. Hockenson | TE | age 29 | MIN | market 2756 | projected 53.1 (6.6 a week) | last 3 weeks 4.2 a week | lineup value 16.3
4035 | Alvin Kamara | RB | age 31 | NO | market 2580 | projected 52.5 (6.6 a week) | last 3 weeks 8.9 a week | lineup value 19.3
11603 | AJ Barner | TE | age 24 | SEA | market 3433 | projected 46 (5.8 a week) | last 3 weeks 2.9 a week | lineup value 9.2
11628 | Marvin Harrison | WR | age 24 | HOU | market 3918 | projected 42.6 (5.3 a week) | last 3 weeks 10.5 a week | lineup value 9.8
7607 | Michael Carter | RB | age 27 | TEN | market 0 | projected 32.8 (4.1 a week) | last 3 weeks 7.7 a week | lineup value 0
8146 | Garrett Wilson | WR | age 26 | NYJ | market 4128 | projected 12 (1.5 a week) | last 3 weeks 12 a week | lineup value 2.2
5849 | Kyler Murray | QB | age 29 | MIN | market 3322 | projected 0 (0 a week) | last 3 weeks 11.1 a week | lineup value 0

CANDIDATE DEALS (from a rules-based finder; points are the finder projections for the rest of the season):
c1 | partnerId 10 | I give Travis Kelce + Darren Waller (1466,2505) | I get Calvin Ridley + Khalil Shakir (4981,8134) | my points 2.1 | their points 39.8 | likelihood 0.64
c2 | partnerId 10 | I give Travis Kelce (1466) | I get Khalil Shakir (8134) | my points 2.1 | their points 39.8 | likelihood 0.64
c3 | partnerId 10 | I give Travis Kelce + Rashee Rice (1466,10229) | I get Luther Burden + Jacory Croskey-Merritt (12519,12533) | my points -4.1 | their points 66.2 | likelihood 0.67
c4 | partnerId 10 | I give Jake Ferguson + Rashee Rice (8110,10229) | I get Luther Burden + TreVeyon Henderson (12519,12529) | my points 7.6 | their points 58.1 | likelihood 0.64
c5 | partnerId 3 | I give Rashee Rice + Travis Kelce (10229,1466) | I get Zach Charbonnet + Chase Brown (9753,9224) | my points 31 | their points 32.2 | likelihood 0.52
c6 | partnerId 9 | I give Rashee Rice + Chris Olave (10229,8144) | I get Jordan Mason + Malik Nabers (8408,11632) | my points -45.7 | their points 51.7 | likelihood 0.65
c7 | partnerId 9 | I give Rashee Rice + Tucker Kraft (10229,9484) | I get Aaron Jones + Cam Skattebo (4199,12481) | my points 17.4 | their points 26.1 | likelihood 0.67
c8 | partnerId 3 | I give Justin Jefferson + Jake Ferguson (6794,8110) | I get Woody Marks + Chase Brown (12474,9224) | my points 49.6 | their points 20.5 | likelihood 0.79
c9 | partnerId 3 | I give Justin Jefferson + Travis Kelce (6794,1466) | I get Kimani Vidal + Chase Brown (11647,9224) | my points 50.3 | their points 17.5 | likelihood 0.75
c10 | partnerId 9 | I give Rashee Rice (10229) | I get Jordan Mason + Cam Skattebo (8408,12481) | my points 10.9 | their points 24.2 | likelihood 0.55
c11 | partnerId 9 | I give Rashee Rice + Jameson Williams (10229,8148) | I get Malik Nabers + Romeo Doubs (11632,8121) | my points -51.4 | their points 39.1 | likelihood 0.48
c12 | partnerId 7 | I give Travis Kelce (1466) | I get Michael Carter + T.J. Hockenson (7607,5844) | my points 21.8 | their points 17.3 | likelihood 0.59

Pick the best trades for my team.

=========== CASE 1180160590047531008-w10-r5 ===========
REPLY FILE: /Users/anik/workspace/chrome/sleeper/.eval-market/replies/suggest-v2/run1/1180160590047531008-w10-r5.json
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
League: dynasty, 14 teams, week 10, 5 regular season weeks left, playoffs start week 15
Lineup slots: QB, QB, RB, RB, WR, WR, TE, FLEX, FLEX, FLEX, FLEX, DL, DL, LB, LB, DB, DB, IDP_FLEX, IDP_FLEX, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN. Superflex: yes. Tight end premium: yes. Points per reception: 1.
Columns: id | name | position | age | team | market value | projected points for the rest of the regular season (and per week) | points per week over the last three weeks played | lineup value (points my lineup loses if this player is removed).

MY TEAM (partnerId me): record 5-4, rank 6, points for 2396.6, contention window 0.66
9493 | Puka Nacua | WR | age 25 | LAR | market 5710 | projected 103.9 (20.8 a week) | last 3 weeks 7.7 a week | lineup value 65.3
8150 | Kyren Williams | RB | age 26 | LAR | market 5440 | projected 86.3 (17.3 a week) | last 3 weeks 11.1 a week | lineup value 47.7
4960 | Roquan Smith | LB | age 29 | BAL | market 0 | projected 81.9 (16.4 a week) | last 3 weeks 14.5 a week | lineup value 23.6
11705 | Tykee Smith | DB | age 25 | TB | market 0 | projected 77.5 (15.5 a week) | last 3 weeks 15.8 a week | lineup value 19.6
6794 | Justin Jefferson | WR | age 27 | MIN | market 4810 | projected 75.7 (15.1 a week) | last 3 weeks 14.7 a week | lineup value 37.1
7640 | Micah Parsons | DL | age 27 | GB | market 0 | projected 75.1 (15 a week) | last 3 weeks 20.5 a week | lineup value 17.1
7069 | Alohi Gilman | DB | age 29 | KC | market 0 | projected 74.4 (14.9 a week) | last 3 weeks 6.9 a week | lineup value 16.5
6790 | D'Andre Swift | RB | age 27 | CHI | market 4379 | projected 72.5 (14.5 a week) | last 3 weeks 14 a week | lineup value 33.9
4217 | George Kittle | TE | age 33 | SF | market 3134 | projected 72.1 (14.4 a week) | last 3 weeks 9.8 a week | lineup value 41
5991 | Maxx Crosby | DL | age 29 | LV | market 0 | projected 68.9 (13.8 a week) | last 3 weeks 8.6 a week | lineup value 10.9
1192 | Lavonte David | LB | age 36 | FA | market 0 | projected 66.4 (13.3 a week) | last 3 weeks 9 a week | lineup value 8.2
8111 | Cade Otton | TE | age 27 | TB | market 2954 | projected 63.3 (12.7 a week) | last 3 weeks 11.5 a week | lineup value 24.7
8329 | Devin Lloyd | LB | age 28 | CAR | market 0 | projected 61.7 (12.3 a week) | last 3 weeks 0 a week | lineup value 3.5
10916 | Kobie Turner | DL | age 27 | LAR | market 0 | projected 59.2 (11.8 a week) | last 3 weeks 4.2 a week | lineup value 1.2
7627 | Greg Rousseau | DL | age 26 | BUF | market 0 | projected 56.4 (11.3 a week) | last 3 weeks 11.8 a week | lineup value 0
5947 | Jakobi Meyers | WR | age 29 | JAX | market 3303 | projected 54.9 (11 a week) | last 3 weeks 2.1 a week | lineup value 16.3
11655 | Tyrone Tracy | RB | age 26 | NYG | market 3687 | projected 52.9 (10.6 a week) | last 3 weeks 9.8 a week | lineup value 21.9
4971 | Derwin James | DB | age 30 | LAC | market 0 | projected 51.5 (10.3 a week) | last 3 weeks 8.7 a week | lineup value 4.1
11667 | Dallas Turner | DL | age 23 | MIN | market 0 | projected 48.8 (9.8 a week) | last 3 weeks 5.7 a week | lineup value 0
4066 | Evan Engram | TE | age 32 | DEN | market 0 | projected 47.1 (9.4 a week) | last 3 weeks 8.6 a week | lineup value 18.1
8364 | Trent McDuffie | DB | age 26 | LAR | market 0 | projected 41.8 (8.4 a week) | last 3 weeks 14.4 a week | lineup value 0
8374 | Riq Woolen | DB | age 27 | PHI | market 0 | projected 38.5 (7.7 a week) | last 3 weeks 4.2 a week | lineup value 0
12540 | Chimere Dike | WR | age 24 | TEN | market 2899 | projected 34.8 (7 a week) | last 3 weeks 13.7 a week | lineup value 1
8398 | Jermaine Johnson | DL | age 27 | TEN | market 0 | projected 33 (6.6 a week) | last 3 weeks 4.3 a week | lineup value 0
5054 | Carlton Davis | DB | age 29 | NE | market 0 | projected 32.8 (6.6 a week) | last 3 weeks 7.5 a week | lineup value 0
5857 | Noah Fant | TE | age 28 | NO | market 0 | projected 31 (6.2 a week) | last 3 weeks 13.8 a week | lineup value 0
6811 | Kenneth Murray | LB | age 27 | HOU | market 0 | projected 30.7 (6.1 a week) | last 3 weeks 14 a week | lineup value 0.7
7607 | Michael Carter | RB | age 27 | TEN | market 0 | projected 28.2 (5.6 a week) | last 3 weeks 2.3 a week | lineup value 0
8360 | Logan Hall | DL | age 26 | HOU | market 0 | projected 28 (5.6 a week) | last 3 weeks 3.8 a week | lineup value 0
4993 | Mike Gesicki | TE | age 31 | CIN | market 1195 | projected 27.2 (5.4 a week) | last 3 weeks 0 a week | lineup value 0.4

PARTNER (partnerId 14): record 5-4, rank 8, points for 2171, contention window 0.45
9226 | De'Von Achane | RB | age 25 | MIA | market 5654 | projected 102.6 (20.5 a week) | last 3 weeks 20.2 a week | lineup value 62
7523 | Trevor Lawrence | QB | age 27 | JAX | market 5555 | projected 88.7 (17.7 a week) | last 3 weeks 14 a week | lineup value 38.7
12474 | Woody Marks | RB | age 25 | HOU | market 3793 | projected 79.1 (15.8 a week) | last 3 weeks 12.2 a week | lineup value 29.5
2133 | Davante Adams | WR | age 33 | LAR | market 3366 | projected 77.6 (15.5 a week) | last 3 weeks 16.5 a week | lineup value 34
5892 | David Montgomery | RB | age 29 | HOU | market 4080 | projected 65.3 (13.1 a week) | last 3 weeks 7.2 a week | lineup value 15.9
4413 | Eric Wilson | LB | age 32 | MIN | market 0 | projected 64.8 (13 a week) | last 3 weeks 21.9 a week | lineup value 43.3
1466 | Travis Kelce | TE | age 37 | KC | market 2858 | projected 64.6 (12.9 a week) | last 3 weeks 19 a week | lineup value 23.1
12498 | Mason Taylor | TE | age 22 | NYJ | market 3666 | projected 63.3 (12.7 a week) | last 3 weeks 9.5 a week | lineup value 13.7
2393 | Danielle Hunter | DL | age 31 | HOU | market 0 | projected 63.1 (12.6 a week) | last 3 weeks 5.5 a week | lineup value 41.6
12493 | Oronde Gadsden | TE | age 23 | LAC | market 4187 | projected 63 (12.6 a week) | last 3 weeks 25.6 a week | lineup value 22.4
5030 | Harold Landry | DL | age 30 | NE | market 0 | projected 59.6 (11.9 a week) | last 3 weeks 6.9 a week | lineup value 38.1
10891 | Devon Witherspoon | DB | age 25 | SEA | market 0 | projected 59.2 (11.8 a week) | last 3 weeks 4.3 a week | lineup value 6.9
8406 | Reed Blankenship | DB | age 27 | HOU | market 0 | projected 56.3 (11.3 a week) | last 3 weeks 5.3 a week | lineup value 4.5
2307 | Marcus Mariota | QB | age 32 | WAS | market 0 | projected 56.1 (11.2 a week) | last 3 weeks 6.7 a week | lineup value 6.2
5872 | Deebo Samuel | WR | age 30 | SF | market 2749 | projected 53.9 (10.8 a week) | last 3 weeks 5.3 a week | lineup value 15
4098 | Kareem Hunt | RB | age 30 | FA | market 2183 | projected 53.3 (10.7 a week) | last 3 weeks 12.1 a week | lineup value 11.7
5864 | Byron Murphy | DB | age 28 | MIN | market 0 | projected 50.3 (10.1 a week) | last 3 weeks 8.3 a week | lineup value 0.2
827 | Tyrod Taylor | QB | age 37 | GB | market 0 | projected 49.4 (9.9 a week) | last 3 weeks 1.6 a week | lineup value 32.6
10888 | Jalen Carter | DL | age 25 | PHI | market 0 | projected 47.5 (9.5 a week) | last 3 weeks 7.3 a week | lineup value 26
4963 | Minkah Fitzpatrick | DB | age 29 | NYJ | market 0 | projected 47 (9.4 a week) | last 3 weeks 6.3 a week | lineup value 4.2
6416 | Andrew Wingard | DB | age 29 | ARI | market 0 | projected 46 (9.2 a week) | last 3 weeks 5.8 a week | lineup value 3.9
5906 | Dawson Knox | TE | age 29 | BUF | market 0 | projected 44.6 (8.9 a week) | last 3 weeks 2.8 a week | lineup value 0.2

PARTNER (partnerId 12): record 5-4, rank 7, points for 2327, contention window 0.55
3163 | Jared Goff | QB | age 32 | DET | market 4509 | projected 94.3 (18.9 a week) | last 3 weeks 10.4 a week | lineup value 64
8228 | Jaylen Warren | RB | age 27 | PIT | market 4275 | projected 84.2 (16.8 a week) | last 3 weeks 18.3 a week | lineup value 57.5
7021 | Rico Dowdle | RB | age 28 | PIT | market 3932 | projected 77.5 (15.5 a week) | last 3 weeks 18.7 a week | lineup value 52.4
6302 | Kaden Elliss | LB | age 31 | NO | market 0 | projected 72.8 (14.6 a week) | last 3 weeks 19.9 a week | lineup value 10.2
6949 | Jordyn Brooks | LB | age 28 | MIA | market 0 | projected 71.6 (14.3 a week) | last 3 weeks 19.2 a week | lineup value 20.3
4118 | Alex Anzalone | LB | age 32 | TB | market 0 | projected 70.1 (14 a week) | last 3 weeks 6.3 a week | lineup value 7.5
5001 | Dalton Schultz | TE | age 30 | HOU | market 3157 | projected 68.5 (13.7 a week) | last 3 weeks 18 a week | lineup value 38.6
5012 | Mark Andrews | TE | age 31 | BAL | market 3113 | projected 65.4 (13.1 a week) | last 3 weeks 9.5 a week | lineup value 35.5
6315 | Tyrel Dodson | LB | age 28 | CAR | market 0 | projected 59.9 (12 a week) | last 3 weeks 16.1 a week | lineup value 8.6
5844 | T.J. Hockenson | TE | age 29 | MIN | market 2952 | projected 59.8 (12 a week) | last 3 weeks 11.3 a week | lineup value 29.9
7136 | Kam Curl | DB | age 27 | LAR | market 0 | projected 59.5 (11.9 a week) | last 3 weeks 9.5 a week | lineup value 0.7
5840 | Josh Hines-Allen | DL | age 29 | JAX | market 0 | projected 58.6 (11.7 a week) | last 3 weeks 7.6 a week | lineup value 13.4
7715 | Cam Bynum | DB | age 28 | IND | market 0 | projected 58 (11.6 a week) | last 3 weeks 9.2 a week | lineup value 10.3
12526 | Tetairoa McMillan | WR | age 23 | CAR | market 4724 | projected 54 (10.8 a week) | last 3 weeks 10.6 a week | lineup value 27.7
12140 | Omar Speights | LB | age 25 | LAR | market 0 | projected 52.1 (10.4 a week) | last 3 weeks 2.7 a week | lineup value 0
1233 | Bobby Wagner | LB | age 35 | FA | market 0 | projected 51.8 (10.4 a week) | last 3 weeks 16.2 a week | lineup value 0.5
10927 | Jordan Battle | DB | age 25 | CIN | market 0 | projected 51.7 (10.3 a week) | last 3 weeks 14.7 a week | lineup value 4.2
6118 | Quinnen Williams | DL | age 28 | DAL | market 0 | projected 48.2 (9.6 a week) | last 3 weeks 5 a week | lineup value 13.5
7765 | Jonathon Cooper | DL | age 28 | DEN | market 0 | projected 47.2 (9.4 a week) | last 3 weeks 12.9 a week | lineup value 2
5341 | Taron Johnson | DB | age 30 | LV | market 0 | projected 46.9 (9.4 a week) | last 3 weeks 2 a week | lineup value 0
6065 | Cody Barton | LB | age 29 | TEN | market 0 | projected 46.7 (9.3 a week) | last 3 weeks 13.1 a week | lineup value 0
4967 | Bradley Chubb | DL | age 30 | BUF | market 0 | projected 43.8 (8.8 a week) | last 3 weeks 5.7 a week | lineup value 0.1

PARTNER (partnerId 8): record 4-5, rank 9, points for 1975.4, contention window 0.34
5944 | Bobby Okereke | LB | age 30 | CAR | market 0 | projected 67.4 (13.5 a week) | last 3 weeks 18.3 a week | lineup value 37.9
8137 | George Pickens | WR | age 25 | DAL | market 4758 | projected 64.1 (12.8 a week) | last 3 weeks 13.6 a week | lineup value 47.3
11647 | Kimani Vidal | RB | age 25 | LAC | market 3419 | projected 63.4 (12.7 a week) | last 3 weeks 13 a week | lineup value 44.5
11742 | Cedric Gray | LB | age 23 | TEN | market 0 | projected 58.7 (11.7 a week) | last 3 weeks 22.9 a week | lineup value 29.1
12489 | RJ Harvey | RB | age 25 | DEN | market 4388 | projected 57.5 (11.5 a week) | last 3 weeks 16.8 a week | lineup value 38.6
12534 | Kyle Monangai | RB | age 24 | CHI | market 4555 | projected 49.6 (9.9 a week) | last 3 weeks 17.3 a week | lineup value 30.7
11682 | Cole Bishop | DB | age 23 | BUF | market 0 | projected 47.1 (9.4 a week) | last 3 weeks 10 a week | lineup value 12.2
8286 | Dax Hill | DB | age 26 | CIN | market 0 | projected 46.9 (9.4 a week) | last 3 weeks 8.7 a week | lineup value 17.3
9754 | Quentin Johnston | WR | age 25 | LAC | market 3452 | projected 45.3 (9.1 a week) | last 3 weeks 8.8 a week | lineup value 26.4
12508 | Jaxson Dart | QB | age 23 | NYG | market 6615 | projected 44.1 (8.8 a week) | last 3 weeks 26.6 a week | lineup value 44.1
8269 | Jordan Davis | DL | age 26 | PHI | market 0 | projected 43.2 (8.6 a week) | last 3 weeks 7.1 a week | lineup value 13.6
11656 | Nate Wiggins | DB | age 23 | BAL | market 0 | projected 42.3 (8.5 a week) | last 3 weeks 11.1 a week | lineup value 7.4
7600 | Pat Freiermuth | TE | age 27 | PIT | market 2339 | projected 42.2 (8.4 a week) | last 3 weeks 18.4 a week | lineup value 27.9
12524 | Shedeur Sanders | QB | age 24 | CLE | market 3266 | projected 41.9 (8.4 a week) | last 3 weeks 0 a week | lineup value 41.9
8385 | George Karlaftis | DL | age 25 | KC | market 0 | projected 40.7 (8.1 a week) | last 3 weeks 9.6 a week | lineup value 11.1
2374 | Tyler Lockett | WR | age 33 | FA | market 2513 | projected 34.4 (6.9 a week) | last 3 weeks 1.3 a week | lineup value 13.6
6868 | DJ Wonnum | DL | age 28 | DET | market 0 | projected 34.2 (6.8 a week) | last 3 weeks 3.3 a week | lineup value 10
4968 | Tremaine Edmunds | LB | age 28 | NYG | market 0 | projected 25.5 (5.1 a week) | last 3 weeks 20.5 a week | lineup value 12.3
7642 | Jaycee Horn | DB | age 26 | CAR | market 0 | projected 24.4 (4.9 a week) | last 3 weeks 9.2 a week | lineup value 3
12499 | Elic Ayomanor | WR | age 23 | TEN | market 2910 | projected 22.4 (4.5 a week) | last 3 weeks 7.2 a week | lineup value 7.5
7023 | Willie Gay | LB | age 28 | MIA | market 0 | projected 21.8 (4.4 a week) | last 3 weeks 1.7 a week | lineup value 0
7678 | Joseph Ossai | DL | age 26 | NYJ | market 0 | projected 21.4 (4.3 a week) | last 3 weeks 9.4 a week | lineup value 0.1

PARTNER (partnerId 1): record 2-7, rank 11, points for 1997, contention window 0.12
4943 | Sam Darnold | QB | age 29 | SEA | market 4213 | projected 85.5 (17.1 a week) | last 3 weeks 12.8 a week | lineup value 37.6
9224 | Chase Brown | RB | age 26 | CIN | market 5406 | projected 76.9 (15.4 a week) | last 3 weeks 21.8 a week | lineup value 55.2
9997 | Zay Flowers | WR | age 26 | BAL | market 4204 | projected 73.8 (14.8 a week) | last 3 weeks 8.6 a week | lineup value 49.2
5870 | Daniel Jones | QB | age 29 | IND | market 3914 | projected 73.7 (14.7 a week) | last 3 weeks 22.1 a week | lineup value 25.8
10229 | Rashee Rice | WR | age 26 | KC | market 4430 | projected 70.6 (14.1 a week) | last 3 weeks 22.7 a week | lineup value 49
11565 | J.J. McCarthy | QB | age 23 | NYG | market 3484 | projected 69.2 (13.8 a week) | last 3 weeks 7.2 a week | lineup value 21.3
11665 | Jared Verse | DL | age 25 | CLE | market 0 | projected 66.4 (13.3 a week) | last 3 weeks 4.7 a week | lineup value 29.7
5843 | Devin Bush | LB | age 28 | CHI | market 0 | projected 65.8 (13.2 a week) | last 3 weeks 6.8 a week | lineup value 30.1
11678 | Cooper DeJean | DB | age 23 | PHI | market 0 | projected 60.3 (12.1 a week) | last 3 weeks 7.5 a week | lineup value 14
10949 | Chamarri Conner | DB | age 26 | KC | market 0 | projected 60.2 (12 a week) | last 3 weeks 9 a week | lineup value 23.3
6333 | Keisean Nixon | DB | age 29 | GB | market 0 | projected 52.9 (10.6 a week) | last 3 weeks 8.3 a week | lineup value 6.6
11597 | Theo Johnson | TE | age 25 | NYG | market 3206 | projected 49.6 (9.9 a week) | last 3 weeks 13.8 a week | lineup value 31.9
7667 | Tyson Campbell | DB | age 26 | CLE | market 0 | projected 48.5 (9.7 a week) | last 3 weeks 10.5 a week | lineup value 2.2
12605 | Jacob Parrish | DB | age 22 | TB | market 0 | projected 46.4 (9.3 a week) | last 3 weeks 8.9 a week | lineup value 0.4
12476 | Devin Neal | RB | age 23 | WAS | market 3328 | projected 42.8 (8.6 a week) | last 3 weeks 2.4 a week | lineup value 21.3
9481 | Luke Musgrave | TE | age 26 | GB | market 0 | projected 39.5 (7.9 a week) | last 3 weeks 4 a week | lineup value 16.4
12484 | Jayden Higgins | WR | age 23 | HOU | market 3439 | projected 37.3 (7.5 a week) | last 3 weeks 4.9 a week | lineup value 12.8
12574 | Abdul Carter | DL | age 22 | NYG | market 0 | projected 36.7 (7.3 a week) | last 3 weeks 5.2 a week | lineup value 8.4
12502 | Gunnar Helm | TE | age 24 | TEN | market 3233 | projected 35.6 (7.1 a week) | last 3 weeks 9.1 a week | lineup value 13.9
12566 | Jihaad Campbell | LB | age 22 | PHI | market 0 | projected 35.4 (7.1 a week) | last 3 weeks 3 a week | lineup value 4.3
11676 | Mike Sainristil | DB | age 26 | WAS | market 0 | projected 35.2 (7 a week) | last 3 weeks 8.5 a week | lineup value 0
12533 | Jacory Croskey-Merritt | RB | age 25 | WAS | market 4044 | projected 35.2 (7 a week) | last 3 weeks 6.2 a week | lineup value 15.5

PARTNER (partnerId 11): record 0-9, rank 14, points for 1993, contention window 0
421 | Matthew Stafford | QB | age 38 | LAR | market 4026 | projected 92.8 (18.6 a week) | last 3 weeks 18.5 a week | lineup value 53.5
7841 | Jamien Sherwood | LB | age 26 | NYJ | market 0 | projected 70.5 (14.1 a week) | last 3 weeks 13.6 a week | lineup value 20.7
3233 | Kevin Byard | DB | age 33 | NE | market 0 | projected 64.3 (12.9 a week) | last 3 weeks 11.3 a week | lineup value 19.3
8148 | Jameson Williams | WR | age 25 | DET | market 4115 | projected 63.3 (12.7 a week) | last 3 weeks 6.2 a week | lineup value 40.9
6799 | Grant Delpit | DB | age 28 | CLE | market 0 | projected 57.2 (11.4 a week) | last 3 weeks 8.5 a week | lineup value 12.1
6860 | Akeem Davis-Gaither | LB | age 29 | IND | market 0 | projected 57.1 (11.4 a week) | last 3 weeks 8.5 a week | lineup value 7.2
7811 | Talanoa Hufanga | DB | age 26 | DEN | market 0 | projected 55.5 (11.1 a week) | last 3 weeks 12.7 a week | lineup value 16.8
5894 | Germaine Pratt | LB | age 30 | IND | market 0 | projected 55 (11 a week) | last 3 weeks 11.5 a week | lineup value 11.5
6119 | Devin White | LB | age 28 | DET | market 0 | projected 54 (10.8 a week) | last 3 weeks 17 a week | lineup value 5.4
12522 | Cam Ward | QB | age 24 | TEN | market 4588 | projected 52.1 (10.4 a week) | last 3 weeks 10.7 a week | lineup value 12.8
4144 | Jonnu Smith | TE | age 31 | GB | market 0 | projected 47.4 (9.5 a week) | last 3 weeks 9.7 a week | lineup value 32.4
11435 | Emanuel Wilson | RB | age 27 | SEA | market 2969 | projected 45.2 (9 a week) | last 3 weeks 7.8 a week | lineup value 30.9
1166 | Kirk Cousins | QB | age 38 | LV | market 2172 | projected 45.2 (9 a week) | last 3 weeks 2.5 a week | lineup value 5.9
1052 | Demario Davis | LB | age 37 | NYJ | market 0 | projected 44.1 (8.8 a week) | last 3 weeks 18 a week | lineup value 0.6
8676 | Rashid Shaheed | WR | age 28 | SEA | market 2707 | projected 44 (8.8 a week) | last 3 weeks 12.1 a week | lineup value 21.5
8125 | Calvin Austin | WR | age 27 | NYG | market 0 | projected 38.2 (7.6 a week) | last 3 weeks 5.8 a week | lineup value 15.7
11584 | Bucky Irving | RB | age 24 | TB | market 5104 | projected 35.1 (7 a week) | last 3 weeks 0 a week | lineup value 30.5
5158 | Dennis Gardeck | LB | age 32 | JAX | market 0 | projected 32.1 (6.4 a week) | last 3 weeks 3.3 a week | lineup value 0
11686 | Javon Bullard | DB | age 24 | GB | market 0 | projected 31.1 (6.2 a week) | last 3 weeks 9.3 a week | lineup value 0
6848 | Anfernee Jennings | DL | age 29 | NO | market 0 | projected 30 (6 a week) | last 3 weeks 4.4 a week | lineup value 16.4
4035 | Alvin Kamara | RB | age 31 | NO | market 3052 | projected 29.2 (5.8 a week) | last 3 weeks 6.6 a week | lineup value 20.4
5970 | Greg Dortch | WR | age 28 | BUF | market 0 | projected 28.5 (5.7 a week) | last 3 weeks 1.2 a week | lineup value 10.2

PARTNER (partnerId 10): record 8-1, rank 2, points for 2509.4, contention window 1
8130 | Trey McBride | TE | age 26 | ARI | market 4876 | projected 122.5 (24.5 a week) | last 3 weeks 20.3 a week | lineup value 72.7
4881 | Lamar Jackson | QB | age 29 | BAL | market 7015 | projected 118 (23.6 a week) | last 3 weeks 8.9 a week | lineup value 34.9
11604 | Brock Bowers | TE | age 23 | LV | market 5534 | projected 114.2 (22.8 a week) | last 3 weeks 18.5 a week | lineup value 64.4
4892 | Baker Mayfield | QB | age 31 | TB | market 4385 | projected 97.9 (19.6 a week) | last 3 weeks 5.4 a week | lineup value 14.8
8155 | Breece Hall | RB | age 25 | NYJ | market 5189 | projected 88.4 (17.7 a week) | last 3 weeks 15.3 a week | lineup value 40
1373 | Geno Smith | QB | age 36 | NYJ | market 2558 | projected 84.3 (16.9 a week) | last 3 weeks 10.5 a week | lineup value 1.1
6815 | Zack Baun | LB | age 29 | PHI | market 0 | projected 84.1 (16.8 a week) | last 3 weeks 13.4 a week | lineup value 24.4
4070 | T.J. Watt | DL | age 32 | PIT | market 0 | projected 82.6 (16.5 a week) | last 3 weeks 11.3 a week | lineup value 34.1
6786 | CeeDee Lamb | WR | age 27 | DAL | market 4937 | projected 77.9 (15.6 a week) | last 3 weeks 17.4 a week | lineup value 37.3
8659 | Nate Landman | LB | age 27 | LAR | market 0 | projected 76.4 (15.3 a week) | last 3 weeks 10.8 a week | lineup value 16.7
5017 | Jessie Bates | DB | age 29 | ATL | market 0 | projected 72.2 (14.4 a week) | last 3 weeks 11.7 a week | lineup value 13.1
8151 | Kenneth Walker | RB | age 25 | KC | market 5596 | projected 71.9 (14.4 a week) | last 3 weeks 6.8 a week | lineup value 23.5
8144 | Chris Olave | WR | age 26 | NO | market 4410 | projected 63.2 (12.6 a week) | last 3 weeks 17.2 a week | lineup value 19.6
7016 | Jeremy Chinn | DB | age 28 | LV | market 0 | projected 62.5 (12.5 a week) | last 3 weeks 11 a week | lineup value 3.4
10914 | Daiyan Henley | LB | age 26 | LAC | market 0 | projected 60.4 (12.1 a week) | last 3 weeks 9.4 a week | lineup value 11.5
2449 | Stefon Diggs | WR | age 32 | WAS | market 2777 | projected 58.4 (11.7 a week) | last 3 weeks 13 a week | lineup value 19.7
6901 | Joshua Metellus | DB | age 28 | MIN | market 0 | projected 57.6 (11.5 a week) | last 3 weeks 13.2 a week | lineup value 0.6
9753 | Zach Charbonnet | RB | age 25 | SEA | market 3844 | projected 56.5 (11.3 a week) | last 3 weeks 9.7 a week | lineup value 8.1
8838 | Isaiah Pola-Mao | DB | age 27 | LV | market 0 | projected 56.3 (11.3 a week) | last 3 weeks 0 a week | lineup value 0.9
4999 | Josh Sweat | DL | age 29 | ARI | market 0 | projected 54.9 (11 a week) | last 3 weeks 11.4 a week | lineup value 6.4
11727 | Payton Wilson | LB | age 26 | PIT | market 0 | projected 53.4 (10.7 a week) | last 3 weeks 17.2 a week | lineup value 0
5580 | Frankie Luvu | LB | age 30 | WAS | market 0 | projected 53.1 (10.6 a week) | last 3 weeks 11.5 a week | lineup value 4.1

PARTNER (partnerId 13): record 1-8, rank 13, points for 1749.9, contention window 0
11564 | Drake Maye | QB | age 24 | NE | market 7745 | projected 90.9 (18.2 a week) | last 3 weeks 24.1 a week | lineup value 18.5
3294 | Dak Prescott | QB | age 33 | DAL | market 4841 | projected 84.6 (16.9 a week) | last 3 weeks 17.1 a week | lineup value 9.2
11563 | Bo Nix | QB | age 26 | DEN | market 5829 | projected 80.5 (16.1 a week) | last 3 weeks 28.7 a week | lineup value 7.5
12506 | Harold Fannin | TE | age 22 | CLE | market 4702 | projected 70 (14 a week) | last 3 weeks 12.1 a week | lineup value 49.3
6807 | Patrick Queen | LB | age 27 | PIT | market 0 | projected 70 (14 a week) | last 3 weeks 6.5 a week | lineup value 22.7
6183 | Andrew Van Ginkel | DL | age 31 | MIN | market 0 | projected 69.2 (13.8 a week) | last 3 weeks 2.3 a week | lineup value 27.1
6217 | Blake Cashman | LB | age 30 | MIN | market 0 | projected 69.1 (13.8 a week) | last 3 weeks 17.7 a week | lineup value 21.8
12545 | Tyler Shough | QB | age 27 | NO | market 4539 | projected 64.5 (12.9 a week) | last 3 weeks 5.5 a week | lineup value 0
5893 | C.J. Gardner-Johnson | DB | age 28 | BUF | market 0 | projected 53.6 (10.7 a week) | last 3 weeks 6.8 a week | lineup value 6.4
4191 | Matt Milano | LB | age 31 | FA | market 0 | projected 53.2 (10.6 a week) | last 3 weeks 1.7 a week | lineup value 10
9756 | Jordan Addison | WR | age 24 | MIN | market 3610 | projected 52.1 (10.4 a week) | last 3 weeks 14.7 a week | lineup value 31.4
7687 | Nahshon Wright | DB | age 28 | NYJ | market 0 | projected 44.9 (9 a week) | last 3 weeks 16.1 a week | lineup value 0.6
6291 | Donovan Wilson | DB | age 31 | FA | market 0 | projected 44.2 (8.8 a week) | last 3 weeks 0.7 a week | lineup value 5.9
5346 | Zaire Franklin | LB | age 30 | GB | market 0 | projected 41.4 (8.3 a week) | last 3 weeks 7.5 a week | lineup value 3.2
12490 | Bhayshul Tuten | RB | age 23 | JAX | market 5002 | projected 40.5 (8.1 a week) | last 3 weeks 4.9 a week | lineup value 35.5
5847 | Dexter Lawrence | DL | age 28 | CIN | market 0 | projected 38.7 (7.7 a week) | last 3 weeks 5 a week | lineup value 2.5
9479 | Darnell Washington | TE | age 25 | PIT | market 0 | projected 37.9 (7.6 a week) | last 3 weeks 8.2 a week | lineup value 17.1
7626 | Odafe Oweh | DL | age 27 | WAS | market 0 | projected 36.5 (7.3 a week) | last 3 weeks 14.4 a week | lineup value 3
6784 | Derrick Brown | DL | age 28 | CAR | market 0 | projected 34 (6.8 a week) | last 3 weeks 13.7 a week | lineup value 0
8147 | John Metchie | WR | age 26 | CAR | market 0 | projected 33.9 (6.8 a week) | last 3 weeks 0 a week | lineup value 14.8
12519 | Luther Burden | WR | age 22 | CHI | market 4906 | projected 31.4 (6.3 a week) | last 3 weeks 1.4 a week | lineup value 10.8
5036 | Justin Reid | DB | age 29 | NO | market 0 | projected 31.1 (6.2 a week) | last 3 weeks 16.5 a week | lineup value 1.4

PARTNER (partnerId 7): record 3-6, rank 10, points for 2280.9, contention window 0.23
6813 | Jonathan Taylor | RB | age 27 | IND | market 5867 | projected 105 (21 a week) | last 3 weeks 29.2 a week | lineup value 86.2
4046 | Patrick Mahomes | QB | age 31 | KC | market 5143 | projected 91.3 (18.3 a week) | last 3 weeks 21.5 a week | lineup value 91.3
8339 | Kyle Hamilton | DB | age 25 | BAL | market 0 | projected 75.3 (15.1 a week) | last 3 weeks 8 a week | lineup value 28.5
12514 | Emeka Egbuka | WR | age 24 | TB | market 4521 | projected 72.4 (14.5 a week) | last 3 weeks 5.4 a week | lineup value 48.5
6768 | Tua Tagovailoa | QB | age 28 | ATL | market 2827 | projected 65.2 (13 a week) | last 3 weeks 12 a week | lineup value 65.2
8110 | Jake Ferguson | TE | age 27 | DAL | market 3452 | projected 63.3 (12.7 a week) | last 3 weeks 14.6 a week | lineup value 44.1
7002 | Juwan Johnson | TE | age 30 | NO | market 3107 | projected 59.9 (12 a week) | last 3 weeks 16.1 a week | lineup value 40.9
6788 | Xavier McKinney | DB | age 28 | GB | market 0 | projected 57.2 (11.4 a week) | last 3 weeks 18 a week | lineup value 10.4
11739 | Evan Williams | DB | age 25 | GB | market 0 | projected 56.4 (11.3 a week) | last 3 weeks 9.2 a week | lineup value 9.6
2311 | Leonard Williams | DL | age 32 | SEA | market 0 | projected 53.5 (10.7 a week) | last 3 weeks 8.6 a week | lineup value 16.1
12568 | Jalon Walker | DL | age 22 | ATL | market 0 | projected 52.6 (10.5 a week) | last 3 weeks 11.7 a week | lineup value 15.7
7637 | Zaven Collins | DL | age 27 | ARI | market 0 | projected 48 (9.6 a week) | last 3 weeks 4.4 a week | lineup value 11.1
1479 | Keenan Allen | WR | age 34 | IND | market 2141 | projected 46.1 (9.2 a week) | last 3 weeks 14.5 a week | lineup value 24.5
7659 | Tre'von Moehrig | DB | age 27 | CAR | market 0 | projected 39.1 (7.8 a week) | last 3 weeks 16.1 a week | lineup value 10
3558 | Chris Jones | DL | age 32 | KC | market 0 | projected 38.5 (7.7 a week) | last 3 weeks 5.5 a week | lineup value 8.2
10936 | Ji'Ayir Brown | DB | age 26 | SF | market 0 | projected 38 (7.6 a week) | last 3 weeks 9.8 a week | lineup value 0.4
8112 | Drake London | WR | age 25 | ATL | market 4852 | projected 33.5 (6.7 a week) | last 3 weeks 15.7 a week | lineup value 23.8
6039 | Ty Johnson | RB | age 29 | BUF | market 0 | projected 32 (6.4 a week) | last 3 weeks 3.9 a week | lineup value 8.2
11834 | Devaughn Vele | WR | age 28 | NO | market 2274 | projected 31.5 (6.3 a week) | last 3 weeks 0.7 a week | lineup value 12.6
11734 | Tyrice Knight | LB | age 25 | SEA | market 0 | projected 31.5 (6.3 a week) | last 3 weeks 5.7 a week | lineup value 9
9486 | Dontayvion Wicks | WR | age 25 | PHI | market 2549 | projected 29.1 (5.8 a week) | last 3 weeks 0.5 a week | lineup value 5.6
3156 | Joey Bosa | DL | age 30 | FA | market 0 | projected 26.7 (5.3 a week) | last 3 weeks 11.5 a week | lineup value 0

PARTNER (partnerId 2): record 2-7, rank 12, points for 1899.2, contention window 0.02
11560 | Caleb Williams | QB | age 24 | CHI | market 7147 | projected 86.9 (17.4 a week) | last 3 weeks 19.9 a week | lineup value 86.9
7569 | Nico Collins | WR | age 27 | HOU | market 4431 | projected 80.3 (16.1 a week) | last 3 weeks 7.1 a week | lineup value 38.4
10917 | Byron Young | DL | age 28 | LAR | market 0 | projected 66.4 (13.3 a week) | last 3 weeks 5.7 a week | lineup value 25.8
12640 | Teddye Buchanan | LB | age 24 | BAL | market 0 | projected 64.3 (12.9 a week) | last 3 weeks 8.7 a week | lineup value 11.8
5846 | DK Metcalf | WR | age 28 | PIT | market 3430 | projected 63.5 (12.7 a week) | last 3 weeks 10.4 a week | lineup value 21.5
11726 | Kamren Kinchens | DB | age 24 | LAR | market 0 | projected 58.3 (11.7 a week) | last 3 weeks 6.7 a week | lineup value 5.9
10213 | Tre Tucker | WR | age 25 | LV | market 2721 | projected 54.8 (11 a week) | last 3 weeks 5 a week | lineup value 12.9
3214 | Hunter Henry | TE | age 31 | NE | market 3140 | projected 53.9 (10.8 a week) | last 3 weeks 11 a week | lineup value 19.8
12591 | Xavier Watts | DB | age 24 | ATL | market 0 | projected 52.8 (10.6 a week) | last 3 weeks 8.3 a week | lineup value 0.8
8126 | Wan'Dale Robinson | WR | age 25 | TEN | market 3421 | projected 52.6 (10.5 a week) | last 3 weeks 12.3 a week | lineup value 18.5
6711 | Jalen Thompson | DB | age 28 | DAL | market 0 | projected 52.6 (10.5 a week) | last 3 weeks 6.2 a week | lineup value 0.2
6141 | Drue Tranquill | LB | age 31 | KC | market 0 | projected 49.7 (9.9 a week) | last 3 weeks 5.3 a week | lineup value 7.4
8167 | Christian Watson | WR | age 27 | GB | market 3674 | projected 49.7 (9.9 a week) | last 3 weeks 6.8 a week | lineup value 7.9
5871 | Zach Allen | DL | age 29 | DEN | market 0 | projected 46.1 (9.2 a week) | last 3 weeks 17.1 a week | lineup value 12.4
7058 | Jaylinn Hawkins | DB | age 29 | BAL | market 0 | projected 43.6 (8.7 a week) | last 3 weeks 7.5 a week | lineup value 1.8
8131 | Isaiah Likely | TE | age 26 | NYG | market 3471 | projected 43.4 (8.7 a week) | last 3 weeks 5.6 a week | lineup value 2.3
9506 | Sean Tucker | RB | age 24 | TB | market 3377 | projected 43.1 (8.6 a week) | last 3 weeks 4.8 a week | lineup value 9.8
10933 | DeMarvion Overshown | LB | age 26 | DAL | market 0 | projected 41.3 (8.3 a week) | last 3 weeks 0 a week | lineup value 1.9
7666 | Jevón Holland | DB | age 26 | NYG | market 0 | projected 39.2 (7.8 a week) | last 3 weeks 0 a week | lineup value 0
4988 | Nick Chubb | RB | age 30 | FA | market 2220 | projected 38 (7.6 a week) | last 3 weeks 7.7 a week | lineup value 3.2
8311 | Terrel Bernard | LB | age 27 | BUF | market 0 | projected 37.9 (7.6 a week) | last 3 weeks 3.3 a week | lineup value 6.1
11571 | Isaiah Davis | RB | age 24 | NYJ | market 0 | projected 37.8 (7.6 a week) | last 3 weeks 8.3 a week | lineup value 3.3

CANDIDATE DEALS (from a rules-based finder; points are the finder projections for the rest of the season):
c1 | partnerId 14 | I give Kobie Turner + Devin Lloyd (10916,8329) | I get Marcus Mariota (2307) | my points 50.1 | their points 14.3 | likelihood 0.76
c2 | partnerId 12 | I give Michael Carter + Noah Fant (7607,5857) | I get Joe Flacco (19) | my points 30.8 | their points 7.6 | likelihood 0.76
c3 | partnerId 8 | I give Greg Rousseau + Kobie Turner (7627,10916) | I get Cedric Gray (11742) | my points 9.4 | their points 8 | likelihood 0.77
c4 | partnerId 1 | I give Kyler Murray (5849) | I get Sam Darnold + Daniel Jones (4943,5870) | my points 143.9 | their points -111.3 | likelihood 0.94
c5 | partnerId 11 | I give Kyler Murray (5849) | I get Matthew Stafford + Jameson Williams (421,8148) | my points 106.7 | their points -94.4 | likelihood 0.95
c6 | partnerId 10 | I give George Kittle (4217) | I get Geno Smith + Max Brosmer (1373,12775) | my points 57.3 | their points 23.8 | likelihood 0.95
c7 | partnerId 13 | I give Kyler Murray (5849) | I get Tyler Shough + Andrew Van Ginkel (12545,6183) | my points 72.5 | their points -27.1 | likelihood 0.86
c8 | partnerId 7 | I give Kyler Murray (5849) | I get Tua Tagovailoa + Emeka Egbuka (6768,12514) | my points 88.2 | their points -113.7 | likelihood 0.73
c9 | partnerId 2 | I give Kyler Murray (5849) | I get Nico Collins + DK Metcalf (7569,5846) | my points 38.8 | their points -61.4 | likelihood 0.91

Pick the best trades for my team.
