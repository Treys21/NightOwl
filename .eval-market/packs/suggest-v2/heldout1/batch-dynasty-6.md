You are answering fantasy football trade-advice cases. For each case below, follow the SYSTEM text, read the DATA, and write your JSON answer to the reply file named for that case.
Rules: write only the JSON object (no markdown fence, no commentary) to each reply file. Do not read any other file on disk. Do not look at any directory named truth or any file outside the reply paths. Work each case independently.

=========== CASE 1180361412023083008-w7-r8 ===========
REPLY FILE: /Users/anik/workspace/chrome/sleeper/.eval-market/replies/suggest-v2/heldout1/1180361412023083008-w7-r8.json
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
Lineup slots: QB, RB, RB, WR, WR, TE, FLEX, FLEX, K, DEF, IDP_FLEX, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN. Superflex: no. Tight end premium: yes. Points per reception: 1.
Columns: id | name | position | age | team | market value | projected points for the rest of the regular season (and per week) | points per week over the last three weeks played | lineup value (points my lineup loses if this player is removed).

MY TEAM (partnerId me): record 4-2, rank 5, points for 1017.8, contention window 0.77
9488 | Jaxon Smith-Njigba | WR | age 24 | SEA | market 5812 | projected 152.4 (19.1 a week) | last 3 weeks 26.8 a week | lineup value 101
9221 | Jahmyr Gibbs | RB | age 24 | DET | market 6319 | projected 149.9 (18.7 a week) | last 3 weeks 14 a week | lineup value 95.3
6949 | Jordyn Brooks | LB | age 28 | MIA | market 0 | projected 141.1 (17.6 a week) | last 3 weeks 28.9 a week | lineup value 5.4
7648 | Nick Bolton | LB | age 26 | KC | market 0 | projected 141 (17.6 a week) | last 3 weeks 14.9 a week | lineup value 2.8
6815 | Zack Baun | LB | age 29 | PHI | market 0 | projected 135.2 (16.9 a week) | last 3 weeks 23.2 a week | lineup value 0
421 | Matthew Stafford | QB | age 38 | LAR | market 2691 | projected 125.6 (15.7 a week) | last 3 weeks 23.6 a week | lineup value 7.9
11560 | Caleb Williams | QB | age 24 | CHI | market 4259 | projected 125.3 (15.7 a week) | last 3 weeks 12.4 a week | lineup value 14.8
7523 | Trevor Lawrence | QB | age 27 | JAX | market 3563 | projected 116.1 (14.5 a week) | last 3 weeks 18.2 a week | lineup value 0.2
12512 | Quinshon Judkins | RB | age 22 | CLE | market 4301 | projected 99.4 (12.4 a week) | last 3 weeks 13.6 a week | lineup value 33.8
5022 | Dallas Goedert | TE | age 31 | PHI | market 3145 | projected 92.7 (11.6 a week) | last 3 weeks 23.7 a week | lineup value 27.1
8148 | Jameson Williams | WR | age 25 | DET | market 4084 | projected 86.8 (10.8 a week) | last 3 weeks 8.8 a week | lineup value 35.4
6790 | D'Andre Swift | RB | age 27 | CHI | market 3623 | projected 85.9 (10.7 a week) | last 3 weeks 16.3 a week | lineup value 20.2
5012 | Mark Andrews | TE | age 31 | BAL | market 3106 | projected 81 (10.1 a week) | last 3 weeks 12.3 a week | lineup value 27.2
11610 | Malik Washington | WR | age 25 | MIA | market 3353 | projected 73.5 (9.2 a week) | last 3 weeks 22.6 a week | lineup value 22.3
BUF | Buffalo Bills | DEF | age ? | BUF | market 0 | projected 71.8 (9 a week) | last 3 weeks 8.7 a week | lineup value 22.2
12533 | Jacory Croskey-Merritt | RB | age 25 | WAS | market 3175 | projected 68.8 (8.6 a week) | last 3 weeks 13.3 a week | lineup value 17.8
1433 | Brandon McManus | K | age 34 | FA | market 0 | projected 61.3 (7.7 a week) | last 3 weeks 4 a week | lineup value 61.2
LV | Las Vegas Raiders | DEF | age ? | LV | market 0 | projected 56.7 (7.1 a week) | last 3 weeks 9.1 a week | lineup value 7.2
9484 | Tucker Kraft | TE | age 25 | GB | market 4162 | projected 44 (5.5 a week) | last 3 weeks 9.7 a week | lineup value 21.1
8146 | Garrett Wilson | WR | age 26 | NYJ | market 4235 | projected 15 (1.9 a week) | last 3 weeks 14.5 a week | lineup value 4
12530 | Travis Hunter | DB | age 23 | JAX | market 0 | projected 8.7 (1.1 a week) | last 3 weeks 12.6 a week | lineup value 0
5816 | Nick Bosa | DL | age 28 | SF | market 0 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0

PARTNER (partnerId 10): record 2-4, rank 12, points for 701.1, contention window 0.02
4046 | Patrick Mahomes | QB | age 31 | KC | market 3418 | projected 157.9 (19.7 a week) | last 3 weeks 30 a week | lineup value 78.8
3233 | Kevin Byard | DB | age 33 | NE | market 0 | projected 123.6 (15.4 a week) | last 3 weeks 18.2 a week | lineup value 31.4
4217 | George Kittle | TE | age 33 | SF | market 3155 | projected 115.3 (14.4 a week) | last 3 weeks 0 a week | lineup value 40.2
2617 | Alex Singleton | LB | age 32 | DEN | market 0 | projected 112.6 (14.1 a week) | last 3 weeks 18.8 a week | lineup value 20.5
12526 | Tetairoa McMillan | WR | age 23 | CAR | market 4745 | projected 97.5 (12.2 a week) | last 3 weeks 13.8 a week | lineup value 19.6
8126 | Wan'Dale Robinson | WR | age 25 | TEN | market 3464 | projected 94.5 (11.8 a week) | last 3 weeks 11 a week | lineup value 16.6
5001 | Dalton Schultz | TE | age 30 | HOU | market 3187 | projected 93.5 (11.7 a week) | last 3 weeks 5.4 a week | lineup value 18.5
5045 | Courtland Sutton | WR | age 31 | DEN | market 3192 | projected 93.5 (11.7 a week) | last 3 weeks 13.2 a week | lineup value 25.5
8111 | Cade Otton | TE | age 27 | TB | market 2994 | projected 76.7 (9.6 a week) | last 3 weeks 6.5 a week | lineup value 11.3
6650 | Chase McLaughlin | K | age 30 | TB | market 0 | projected 73.7 (9.2 a week) | last 3 weeks 13.5 a week | lineup value 73.7
IND | Indianapolis Colts | DEF | age ? | IND | market 0 | projected 71.2 (8.9 a week) | last 3 weeks 11.3 a week | lineup value 71.2
6783 | Jerry Jeudy | WR | age 27 | CLE | market 2714 | projected 63.8 (8 a week) | last 3 weeks 6.9 a week | lineup value 9.6
9508 | Tyjae Spears | RB | age 25 | TEN | market 2935 | projected 62.2 (7.8 a week) | last 3 weeks 4.2 a week | lineup value 59.4
12486 | Dillon Gabriel | QB | age 25 | CLE | market 0 | projected 48.9 (6.1 a week) | last 3 weeks 7 a week | lineup value 13.2
4454 | Kendrick Bourne | WR | age 31 | ARI | market 0 | projected 48.2 (6 a week) | last 3 weeks 7.6 a week | lineup value 1
6149 | Darius Slayton | WR | age 29 | IND | market 0 | projected 47.6 (5.9 a week) | last 3 weeks 1 a week | lineup value 0
11637 | Keon Coleman | WR | age 23 | BUF | market 2736 | projected 40.2 (5 a week) | last 3 weeks 7.7 a week | lineup value 6.7
7607 | Michael Carter | RB | age 27 | TEN | market 0 | projected 37.8 (4.7 a week) | last 3 weeks 8.9 a week | lineup value 35
6770 | Joe Burrow | QB | age 29 | CIN | market 3936 | projected 34.5 (4.3 a week) | last 3 weeks 0 a week | lineup value 0
3161 | Carson Wentz | QB | age 33 | MIN | market 0 | projected 32.3 (4 a week) | last 3 weeks 4.7 a week | lineup value 0
2216 | Mike Evans | WR | age 33 | SF | market 3188 | projected 15.9 (2 a week) | last 3 weeks 0 a week | lineup value 3
8698 | Jake Tonges | TE | age 27 | SF | market 2733 | projected 12.2 (1.5 a week) | last 3 weeks 5.9 a week | lineup value 0

PARTNER (partnerId 1): record 1-5, rank 13, points for 803, contention window 0
6904 | Jalen Hurts | QB | age 28 | PHI | market 3854 | projected 148.3 (18.5 a week) | last 3 weeks 19.8 a week | lineup value 78.5
6786 | CeeDee Lamb | WR | age 27 | DAL | market 4948 | projected 137.8 (17.2 a week) | last 3 weeks 0 a week | lineup value 90.3
5846 | DK Metcalf | WR | age 28 | PIT | market 3438 | projected 108.4 (13.6 a week) | last 3 weeks 16.9 a week | lineup value 50.3
12474 | Woody Marks | RB | age 25 | HOU | market 3088 | projected 98.4 (12.3 a week) | last 3 weeks 10.3 a week | lineup value 50.6
11533 | Brandon Aubrey | K | age 31 | DAL | market 0 | projected 88.4 (11 a week) | last 3 weeks 8.7 a week | lineup value 88.4
12508 | Jaxson Dart | QB | age 23 | NYG | market 3970 | projected 87.9 (11 a week) | last 3 weeks 18.7 a week | lineup value 18
1479 | Keenan Allen | WR | age 34 | IND | market 2148 | projected 87.6 (11 a week) | last 3 weeks 10.7 a week | lineup value 33.4
12506 | Harold Fannin | TE | age 22 | CLE | market 4761 | projected 85 (10.6 a week) | last 3 weeks 13.6 a week | lineup value 65.4
5912 | Carl Granderson | DL | age 29 | NO | market 0 | projected 74.6 (9.3 a week) | last 3 weeks 11.8 a week | lineup value 34.2
8125 | Calvin Austin | WR | age 27 | NYG | market 0 | projected 70.1 (8.8 a week) | last 3 weeks 1.7 a week | lineup value 21
JAX | Jacksonville Jaguars | DEF | age ? | JAX | market 0 | projected 69.9 (8.7 a week) | last 3 weeks 14.1 a week | lineup value 69.9
11655 | Tyrone Tracy | RB | age 26 | NYG | market 2958 | projected 66 (8.3 a week) | last 3 weeks 0.2 a week | lineup value 22.7
7133 | Isaiah Rodgers | DB | age 28 | MIN | market 0 | projected 46.8 (5.9 a week) | last 3 weeks 5.4 a week | lineup value 6.4
10859 | Sam LaPorta | TE | age 25 | DET | market 4267 | projected 45.4 (5.7 a week) | last 3 weeks 18.9 a week | lineup value 25.8
12483 | Jack Bech | WR | age 23 | LV | market 2868 | projected 33.6 (4.2 a week) | last 3 weeks 1.9 a week | lineup value 0
11638 | Ricky Pearsall | WR | age 26 | SF | market 2259 | projected 32.9 (4.1 a week) | last 3 weeks 2.9 a week | lineup value 9.5
8205 | Isiah Pacheco | RB | age 27 | DET | market 2518 | projected 31.2 (3.9 a week) | last 3 weeks 9.2 a week | lineup value 9.3
12469 | Dylan Sampson | RB | age 22 | CLE | market 3261 | projected 28.8 (3.6 a week) | last 3 weeks 10.1 a week | lineup value 0
11199 | Emari Demercado | RB | age 27 | DAL | market 0 | projected 22.1 (2.8 a week) | last 3 weeks 2.1 a week | lineup value 0
12504 | Kaleb Johnson | RB | age 23 | GB | market 2686 | projected 11 (1.4 a week) | last 3 weeks 1.2 a week | lineup value 0
11570 | Rasheen Ali | RB | age 25 | BAL | market 0 | projected 5 (0.6 a week) | last 3 weeks 6.5 a week | lineup value 0
11618 | Jalen McMillan | WR | age 24 | TB | market 2954 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0

PARTNER (partnerId 13): record 2-4, rank 9, points for 910.2, contention window 0.34
8130 | Trey McBride | TE | age 26 | ARI | market 4940 | projected 149.3 (18.7 a week) | last 3 weeks 19.6 a week | lineup value 149.3
6302 | Kaden Elliss | LB | age 31 | NO | market 0 | projected 130.2 (16.3 a week) | last 3 weeks 8.4 a week | lineup value 15
9493 | Puka Nacua | WR | age 25 | LAR | market 5724 | projected 128.3 (16 a week) | last 3 weeks 22.3 a week | lineup value 63.6
10229 | Rashee Rice | WR | age 26 | KC | market 4437 | projected 125.9 (15.7 a week) | last 3 weeks 0 a week | lineup value 60.9
6485 | Azeez Al-Shaair | LB | age 29 | HOU | market 0 | projected 115.2 (14.4 a week) | last 3 weeks 6.4 a week | lineup value 0
1373 | Geno Smith | QB | age 36 | NYJ | market 1660 | projected 111.6 (14 a week) | last 3 weeks 9.9 a week | lineup value 8.4
2133 | Davante Adams | WR | age 33 | LAR | market 3371 | projected 111.2 (13.9 a week) | last 3 weeks 12.4 a week | lineup value 36.6
12529 | TreVeyon Henderson | RB | age 23 | NE | market 4289 | projected 92.3 (11.5 a week) | last 3 weeks 10.2 a week | lineup value 37.4
8136 | Rachaad White | RB | age 27 | WAS | market 2712 | projected 89.4 (11.2 a week) | last 3 weeks 16.4 a week | lineup value 41.8
12522 | Cam Ward | QB | age 24 | TEN | market 2802 | projected 83.9 (10.5 a week) | last 3 weeks 2.2 a week | lineup value 12.4
8259 | Cameron Dicker | K | age 26 | LAC | market 0 | projected 80.1 (10 a week) | last 3 weeks 11.7 a week | lineup value 80.1
11565 | J.J. McCarthy | QB | age 23 | NYG | market 2154 | projected 78.3 (9.8 a week) | last 3 weeks 0 a week | lineup value 0.1
NE | New England Patriots | DEF | age ? | NE | market 0 | projected 76.9 (9.6 a week) | last 3 weeks 2.2 a week | lineup value 16.8
12489 | RJ Harvey | RB | age 25 | DEN | market 3692 | projected 70.7 (8.8 a week) | last 3 weeks 20.2 a week | lineup value 22.3
MIN | Minnesota Vikings | DEF | age ? | MIN | market 0 | projected 70.1 (8.8 a week) | last 3 weeks 4.1 a week | lineup value 9.9
5947 | Jakobi Meyers | WR | age 29 | JAX | market 3311 | projected 68.1 (8.5 a week) | last 3 weeks 7.8 a week | lineup value 3.5
11628 | Marvin Harrison | WR | age 24 | HOU | market 3932 | projected 52 (6.5 a week) | last 3 weeks 12.9 a week | lineup value 9.6
6806 | J.K. Dobbins | RB | age 27 | DEN | market 3252 | projected 51.9 (6.5 a week) | last 3 weeks 10.8 a week | lineup value 18.4
7594 | Chuba Hubbard | RB | age 27 | CAR | market 3313 | projected 43.7 (5.5 a week) | last 3 weeks 3.3 a week | lineup value 3.4
4037 | Chris Godwin | WR | age 30 | TB | market 3107 | projected 27.9 (3.5 a week) | last 3 weeks 3.7 a week | lineup value 0
9757 | Kendre Miller | RB | age 24 | NO | market 2563 | projected 6.7 (0.8 a week) | last 3 weeks 4.6 a week | lineup value 0

PARTNER (partnerId 11): record 3-3, rank 6, points for 909.2, contention window 0.66
9509 | Bijan Robinson | RB | age 24 | ATL | market 6325 | projected 167.8 (21 a week) | last 3 weeks 24.5 a week | lineup value 88.9
8392 | Nick Cross | DB | age 25 | WAS | market 0 | projected 132.9 (16.6 a week) | last 3 weeks 19.7 a week | lineup value 34.3
5870 | Daniel Jones | QB | age 29 | IND | market 2391 | projected 118 (14.8 a week) | last 3 weeks 18.5 a week | lineup value 22.8
7569 | Nico Collins | WR | age 27 | HOU | market 4444 | projected 115 (14.4 a week) | last 3 weeks 9.3 a week | lineup value 44.7
4943 | Sam Darnold | QB | age 29 | SEA | market 2705 | projected 114 (14.2 a week) | last 3 weeks 25.8 a week | lineup value 18.8
6911 | Brandon Jones | DB | age 28 | DEN | market 0 | projected 114 (14.2 a week) | last 3 weeks 10 a week | lineup value 15.4
8228 | Jaylen Warren | RB | age 27 | PIT | market 3485 | projected 111.4 (13.9 a week) | last 3 weeks 2.8 a week | lineup value 32.5
9224 | Chase Brown | RB | age 26 | CIN | market 4470 | projected 103.2 (12.9 a week) | last 3 weeks 9.9 a week | lineup value 30.9
11620 | Rome Odunze | WR | age 24 | CHI | market 4057 | projected 91.4 (11.4 a week) | last 3 weeks 7.4 a week | lineup value 15.9
3214 | Hunter Henry | TE | age 31 | NE | market 3166 | projected 85.5 (10.7 a week) | last 3 weeks 10.2 a week | lineup value 19.8
7002 | Juwan Johnson | TE | age 30 | NO | market 3148 | projected 84.9 (10.6 a week) | last 3 weeks 5.2 a week | lineup value 19.1
SEA | Seattle Seahawks | DEF | age ? | SEA | market 0 | projected 79.1 (9.9 a week) | last 3 weeks 13.1 a week | lineup value 79.1
7049 | Jauan Jennings | WR | age 29 | MIN | market 2838 | projected 78.8 (9.9 a week) | last 3 weeks 2.7 a week | lineup value 4.8
17 | Matt Prater | K | age 41 | FA | market 0 | projected 74.2 (9.3 a week) | last 3 weeks 7 a week | lineup value 74.2
11627 | Troy Franklin | WR | age 23 | DEN | market 3046 | projected 66 (8.3 a week) | last 3 weeks 6.7 a week | lineup value 5.8
9506 | Sean Tucker | RB | age 24 | TB | market 2716 | projected 46 (5.8 a week) | last 3 weeks 12.3 a week | lineup value 0
4129 | Jourdan Lewis | DB | age 31 | JAX | market 0 | projected 43.2 (5.4 a week) | last 3 weeks 5.3 a week | lineup value 0
7611 | Rhamondre Stevenson | RB | age 28 | NE | market 3299 | projected 40.8 (5.1 a week) | last 3 weeks 9.5 a week | lineup value 0.5
12501 | Matthew Golden | WR | age 23 | GB | market 3551 | projected 34.6 (4.3 a week) | last 3 weeks 9.4 a week | lineup value 1.7
12481 | Cam Skattebo | RB | age 24 | NYG | market 4159 | projected 29.2 (3.6 a week) | last 3 weeks 19.5 a week | lineup value 4.8
12510 | Jalen Milroe | QB | age 23 | SEA | market 0 | projected 0 (0 a week) | last 3 weeks -1 a week | lineup value 0

CANDIDATE DEALS (from a rules-based finder; points are the finder projections for the rest of the season):
c1 | partnerId 10 | I give Trevor Lawrence (7523) | I get George Kittle + Courtland Sutton (4217,5045) | my points 55.9 | their points -70.4 | likelihood 0.95
c2 | partnerId 1 | I give Garrett Wilson (8146) | I get Jalen Hurts + DK Metcalf (6904,5846) | my points 50.2 | their points -124.5 | likelihood 0.93
c3 | partnerId 13 | I give Zack Baun + Trevor Lawrence (6815,7523) | I get Davante Adams (2133) | my points 31.8 | their points -7.6 | likelihood 0.64
c4 | partnerId 13 | I give Zack Baun + Garrett Wilson (6815,8146) | I get Davante Adams + Marvin Harrison (2133,11628) | my points 33 | their points -37.9 | likelihood 0.66
c5 | partnerId 11 | I give Nick Bolton + Trevor Lawrence (7648,7523) | I get Jauan Jennings + Matthew Golden (7049,12501) | my points 9.5 | their points 7.4 | likelihood 0.49
c6 | partnerId 11 | I give Zack Baun + Trevor Lawrence (6815,7523) | I get Matthew Golden + Rhamondre Stevenson (12501,7611) | my points 9.4 | their points 7.8 | likelihood 0.48

Pick the best trades for my team.

=========== CASE 1180438228581883904-w4-r3 ===========
REPLY FILE: /Users/anik/workspace/chrome/sleeper/.eval-market/replies/suggest-v2/heldout1/1180438228581883904-w4-r3.json
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
League: dynasty, 14 teams, week 4, 11 regular season weeks left, playoffs start week 15
Lineup slots: QB, RB, RB, WR, WR, WR, TE, FLEX, FLEX, FLEX, FLEX, SUPER_FLEX, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN. Superflex: yes. Tight end premium: yes. Points per reception: 1.
Columns: id | name | position | age | team | market value | projected points for the rest of the regular season (and per week) | points per week over the last three weeks played | lineup value (points my lineup loses if this player is removed).

MY TEAM (partnerId me): record 3-0, rank 3, points for 588, contention window 0.98
4046 | Patrick Mahomes | QB | age 31 | KC | market 4580 | projected 234.4 (21.3 a week) | last 3 weeks 22.4 a week | lineup value 83.9
6797 | Justin Herbert | QB | age 28 | LAC | market 5070 | projected 214.1 (19.5 a week) | last 3 weeks 23.8 a week | lineup value 51.4
12518 | Tyler Warren | TE | age 24 | IND | market 4626 | projected 176.9 (16.1 a week) | last 3 weeks 15.1 a week | lineup value 116.2
11635 | Ladd McConkey | WR | age 24 | LAC | market 4672 | projected 167.8 (15.3 a week) | last 3 weeks 11.4 a week | lineup value 106.4
8110 | Jake Ferguson | TE | age 27 | DAL | market 3436 | projected 162.2 (14.7 a week) | last 3 weeks 20.3 a week | lineup value 103
96 | Aaron Rodgers | QB | age 42 | PIT | market 2410 | projected 158.5 (14.4 a week) | last 3 weeks 18.6 a week | lineup value 3.1
5045 | Courtland Sutton | WR | age 31 | DEN | market 3216 | projected 155.5 (14.1 a week) | last 3 weeks 16.7 a week | lineup value 94.1
1479 | Keenan Allen | WR | age 34 | IND | market 2143 | projected 147.6 (13.4 a week) | last 3 weeks 20 a week | lineup value 86.2
12474 | Woody Marks | RB | age 25 | HOU | market 3102 | projected 134.7 (12.2 a week) | last 3 weeks 3.8 a week | lineup value 80.1
4098 | Kareem Hunt | RB | age 30 | FA | market 1752 | projected 106.1 (9.6 a week) | last 3 weeks 7.2 a week | lineup value 50
6806 | J.K. Dobbins | RB | age 27 | DEN | market 3260 | projected 105.3 (9.6 a week) | last 3 weeks 16.1 a week | lineup value 59.9
9500 | Josh Downs | WR | age 25 | IND | market 3377 | projected 100.4 (9.1 a week) | last 3 weeks 7.3 a week | lineup value 45.7
7600 | Pat Freiermuth | TE | age 27 | PIT | market 2328 | projected 83.9 (7.6 a week) | last 3 weeks 6 a week | lineup value 27.2
12545 | Tyler Shough | QB | age 27 | NO | market 3808 | projected 77.8 (7.1 a week) | last 3 weeks 0 a week | lineup value 14.8
11584 | Bucky Irving | RB | age 24 | TB | market 4291 | projected 56.8 (5.2 a week) | last 3 weeks 16.3 a week | lineup value 34.9
12495 | Ollie Gordon | RB | age 22 | MIA | market 0 | projected 54.5 (5 a week) | last 3 weeks 4.8 a week | lineup value 1.3
11623 | Jordan Whittington | WR | age 26 | LAR | market 0 | projected 50.2 (4.6 a week) | last 3 weeks 3.8 a week | lineup value 9.9
12535 | Isaac TeSlaa | WR | age 24 | DET | market 2787 | projected 42.7 (3.9 a week) | last 3 weeks 4.2 a week | lineup value 0
7670 | Joshua Palmer | WR | age 27 | BUF | market 0 | projected 42 (3.8 a week) | last 3 weeks 7 a week | lineup value 13.8
8119 | Jahan Dotson | WR | age 26 | ATL | market 0 | projected 39.7 (3.6 a week) | last 3 weeks 4.5 a week | lineup value 2.9
7596 | Elijah Moore | WR | age 26 | PHI | market 0 | projected 15.3 (1.4 a week) | last 3 weeks 6.7 a week | lineup value 1.1
11617 | Malachi Corley | WR | age 24 | CLE | market 2387 | projected 14.7 (1.3 a week) | last 3 weeks 0 a week | lineup value 0
6945 | Antonio Gibson | RB | age 27 | FA | market 1424 | projected 12 (1.1 a week) | last 3 weeks 3.6 a week | lineup value 0
11640 | Jermaine Burton | WR | age 24 | FA | market 2046 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0
12467 | Jordan James | RB | age 22 | SF | market 2519 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0
5937 | Diontae Johnson | WR | age 29 | FA | market 1980 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0
6011 | Gardner Minshew | QB | age 30 | ARI | market 0 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0

PARTNER (partnerId 8): record 2-1, rank 4, points for 611.8, contention window 0.88
9221 | Jahmyr Gibbs | RB | age 24 | DET | market 6257 | projected 237.9 (21.6 a week) | last 3 weeks 21.7 a week | lineup value 169.9
8130 | Trey McBride | TE | age 26 | ARI | market 4918 | projected 230.4 (20.9 a week) | last 3 weeks 17.6 a week | lineup value 173.5
4892 | Baker Mayfield | QB | age 31 | TB | market 3853 | projected 203.8 (18.5 a week) | last 3 weeks 22.1 a week | lineup value 191.5
7564 | Ja'Marr Chase | WR | age 26 | CIN | market 5838 | projected 194.9 (17.7 a week) | last 3 weeks 18 a week | lineup value 130.3
6794 | Justin Jefferson | WR | age 27 | MIN | market 4924 | projected 185.6 (16.9 a week) | last 3 weeks 13.7 a week | lineup value 118.3
8155 | Breece Hall | RB | age 25 | NYJ | market 4288 | projected 172.7 (15.7 a week) | last 3 weeks 12 a week | lineup value 109.5
9754 | Quentin Johnston | WR | age 25 | LAC | market 3432 | projected 126.2 (11.5 a week) | last 3 weeks 20.2 a week | lineup value 63.8
5967 | Tony Pollard | RB | age 29 | TEN | market 3209 | projected 116.2 (10.6 a week) | last 3 weeks 11.1 a week | lineup value 46.7
4039 | Cooper Kupp | WR | age 33 | SEA | market 2115 | projected 102.9 (9.4 a week) | last 3 weeks 8.9 a week | lineup value 42.9
8142 | Alec Pierce | WR | age 26 | IND | market 3528 | projected 91.1 (8.3 a week) | last 3 weeks 9.9 a week | lineup value 41.2
9508 | Tyjae Spears | RB | age 25 | TEN | market 2915 | projected 87 (7.9 a week) | last 3 weeks 0 a week | lineup value 23.1
11655 | Tyrone Tracy | RB | age 26 | NYG | market 3004 | projected 83.7 (7.6 a week) | last 3 weeks 7.3 a week | lineup value 37.4
10236 | Dalton Kincaid | TE | age 26 | BUF | market 3779 | projected 81.5 (7.4 a week) | last 3 weeks 15.9 a week | lineup value 46.3
12540 | Chimere Dike | WR | age 24 | TEN | market 2874 | projected 76.6 (7 a week) | last 3 weeks 2.4 a week | lineup value 14.2
9481 | Luke Musgrave | TE | age 26 | GB | market 0 | projected 54.7 (5 a week) | last 3 weeks 2.9 a week | lineup value 10.7
12455 | Brashard Smith | RB | age 23 | KC | market 2671 | projected 44.7 (4.1 a week) | last 3 weeks 0.6 a week | lineup value 3.2
5849 | Kyler Murray | QB | age 29 | MIN | market 3956 | projected 38.2 (3.5 a week) | last 3 weeks 17.6 a week | lineup value 25.8
9757 | Kendre Miller | RB | age 24 | NO | market 2609 | projected 28.7 (2.6 a week) | last 3 weeks 3.4 a week | lineup value 5
9497 | Jalin Hyatt | WR | age 25 | NYG | market 0 | projected 25.6 (2.3 a week) | last 3 weeks 0 a week | lineup value 0
2216 | Mike Evans | WR | age 33 | SF | market 3225 | projected 18.5 (1.7 a week) | last 3 weeks 12.4 a week | lineup value 10.6
7842 | Luke Farrell | TE | age 29 | SF | market 0 | projected 17 (1.5 a week) | last 3 weeks 3.5 a week | lineup value 0
3321 | Tyreek Hill | WR | age 31 | FA | market 2554 | projected 16.8 (1.5 a week) | last 3 weeks 15.6 a week | lineup value 11.1

PARTNER (partnerId 7): record 3-0, rank 1, points for 624.8, contention window 1
8138 | James Cook | RB | age 27 | BUF | market 4816 | projected 206.7 (18.8 a week) | last 3 weeks 25.2 a week | lineup value 129.6
7588 | Javonte Williams | RB | age 26 | DAL | market 3937 | projected 190.8 (17.3 a week) | last 3 weeks 20 a week | lineup value 114.6
5870 | Daniel Jones | QB | age 29 | IND | market 3260 | projected 183.5 (16.7 a week) | last 3 weeks 25.5 a week | lineup value 129
7569 | Nico Collins | WR | age 27 | HOU | market 4502 | projected 171.3 (15.6 a week) | last 3 weeks 15.4 a week | lineup value 99.2
7526 | Jaylen Waddle | WR | age 27 | DEN | market 4077 | projected 169.8 (15.4 a week) | last 3 weeks 13.9 a week | lineup value 93.3
5846 | DK Metcalf | WR | age 28 | PIT | market 3474 | projected 157.2 (14.3 a week) | last 3 weeks 12.4 a week | lineup value 81.5
5859 | A.J. Brown | WR | age 29 | NE | market 4372 | projected 155.6 (14.1 a week) | last 3 weeks 11.6 a week | lineup value 85.9
7543 | Travis Etienne | RB | age 27 | NO | market 3829 | projected 150.4 (13.7 a week) | last 3 weeks 17.1 a week | lineup value 72.1
8408 | Jordan Mason | RB | age 27 | MIN | market 3028 | projected 116.3 (10.6 a week) | last 3 weeks 13.8 a week | lineup value 41.3
4066 | Evan Engram | TE | age 32 | DEN | market 0 | projected 108.9 (9.9 a week) | last 3 weeks 3.3 a week | lineup value 39.7
9758 | C.J. Stroud | QB | age 25 | HOU | market 4070 | projected 108.9 (9.9 a week) | last 3 weeks 13.4 a week | lineup value 54.4
8210 | Chig Okonkwo | TE | age 27 | WAS | market 3095 | projected 94.5 (8.6 a week) | last 3 weeks 10.6 a week | lineup value 20.9
9487 | Parker Washington | WR | age 24 | JAX | market 4031 | projected 84 (7.6 a week) | last 3 weeks 7.6 a week | lineup value 16.8
10226 | Andrei Iosivas | WR | age 27 | CIN | market 0 | projected 72.4 (6.6 a week) | last 3 weeks 0.9 a week | lineup value 6.3
4177 | Mack Hollins | WR | age 33 | NE | market 0 | projected 72 (6.5 a week) | last 3 weeks 5.5 a week | lineup value 6.6
9506 | Sean Tucker | RB | age 24 | TB | market 2725 | projected 69.2 (6.3 a week) | last 3 weeks 0.1 a week | lineup value 9.3
9501 | DeMario Douglas | WR | age 25 | NE | market 0 | projected 59.1 (5.4 a week) | last 3 weeks 4.2 a week | lineup value 1.9
6826 | Cole Kmet | TE | age 27 | CHI | market 0 | projected 55.3 (5 a week) | last 3 weeks 6.7 a week | lineup value 2.8
4040 | JuJu Smith-Schuster | WR | age 29 | FA | market 1353 | projected 52.7 (4.8 a week) | last 3 weeks 7.6 a week | lineup value 1.2
12541 | Dont'e Thornton | WR | age 23 | LV | market 0 | projected 40.9 (3.7 a week) | last 3 weeks 5.3 a week | lineup value 0.8
8225 | Daniel Bellinger | TE | age 26 | TEN | market 0 | projected 38.6 (3.5 a week) | last 3 weeks 1.8 a week | lineup value 0
5985 | Foster Moreau | TE | age 29 | HOU | market 0 | projected 23.5 (2.1 a week) | last 3 weeks 0 a week | lineup value 0

PARTNER (partnerId 14): record 1-2, rank 9, points for 515, contention window 0.34
6813 | Jonathan Taylor | RB | age 27 | IND | market 4947 | projected 249.6 (22.7 a week) | last 3 weeks 28.6 a week | lineup value 183.3
5850 | Josh Jacobs | RB | age 28 | GB | market 3932 | projected 187.1 (17 a week) | last 3 weeks 14.1 a week | lineup value 125.1
421 | Matthew Stafford | QB | age 38 | LAR | market 3548 | projected 184.1 (16.7 a week) | last 3 weeks 16.9 a week | lineup value 76
12529 | TreVeyon Henderson | RB | age 23 | NE | market 4306 | projected 142.4 (12.9 a week) | last 3 weeks 8.8 a week | lineup value 75.8
1339 | Zach Ertz | TE | age 35 | PHI | market 0 | projected 137 (12.5 a week) | last 3 weeks 14.7 a week | lineup value 70.2
6801 | Tee Higgins | WR | age 27 | CIN | market 4140 | projected 135.5 (12.3 a week) | last 3 weeks 8.9 a week | lineup value 78.3
12533 | Jacory Croskey-Merritt | RB | age 25 | WAS | market 3211 | projected 116.7 (10.6 a week) | last 3 weeks 9.4 a week | lineup value 52.4
7090 | Darnell Mooney | WR | age 28 | NYG | market 2423 | projected 106 (9.6 a week) | last 3 weeks 4.6 a week | lineup value 46.5
4033 | David Njoku | TE | age 30 | LAC | market 2844 | projected 96.2 (8.7 a week) | last 3 weeks 10.4 a week | lineup value 39.4
11559 | Michael Penix | QB | age 26 | ATL | market 2625 | projected 92.8 (8.4 a week) | last 3 weeks 11.5 a week | lineup value 35
5906 | Dawson Knox | TE | age 29 | BUF | market 0 | projected 70.2 (6.4 a week) | last 3 weeks 3.7 a week | lineup value 9
12502 | Gunnar Helm | TE | age 24 | TEN | market 3256 | projected 69.5 (6.3 a week) | last 3 weeks 5.1 a week | lineup value 7.5
4950 | Christian Kirk | WR | age 29 | SF | market 2237 | projected 68.8 (6.3 a week) | last 3 weeks 2.1 a week | lineup value 22.9
7594 | Chuba Hubbard | RB | age 27 | CAR | market 3315 | projected 66.1 (6 a week) | last 3 weeks 16.4 a week | lineup value 17.9
12519 | Luther Burden | WR | age 22 | CHI | market 4911 | projected 64.9 (5.9 a week) | last 3 weeks 8.9 a week | lineup value 7.9
6130 | Devin Singletary | RB | age 29 | NYG | market 0 | projected 64.3 (5.8 a week) | last 3 weeks 1 a week | lineup value 12.3
1166 | Kirk Cousins | QB | age 38 | LV | market 1866 | projected 60.7 (5.5 a week) | last 3 weeks 0.4 a week | lineup value 14.7
5927 | Terry McLaurin | WR | age 31 | WAS | market 3410 | projected 43 (3.9 a week) | last 3 weeks 9.6 a week | lineup value 20.4
11650 | Luke McCaffrey | WR | age 25 | WAS | market 0 | projected 41 (3.7 a week) | last 3 weeks 7.3 a week | lineup value 6.5
6770 | Joe Burrow | QB | age 29 | CIN | market 5393 | projected 37.7 (3.4 a week) | last 3 weeks 6 a week | lineup value 7.1
12530 | Travis Hunter | DB | age 23 | JAX | market 0 | projected 36.2 (3.3 a week) | last 3 weeks 6.1 a week | lineup value 12.1
6111 | Jake Browning | QB | age 30 | LAC | market 0 | projected 32.4 (2.9 a week) | last 3 weeks 1.7 a week | lineup value 12.1

PARTNER (partnerId 5): record 2-1, rank 7, points for 529.4, contention window 0.55
7547 | Amon-Ra St. Brown | WR | age 26 | DET | market 5317 | projected 226.1 (20.6 a week) | last 3 weeks 24.6 a week | lineup value 173.3
3198 | Derrick Henry | RB | age 32 | BAL | market 4079 | projected 196.3 (17.8 a week) | last 3 weeks 14.9 a week | lineup value 137.2
6804 | Jordan Love | QB | age 27 | GB | market 4414 | projected 184.8 (16.8 a week) | last 3 weeks 18.6 a week | lineup value 129.6
5872 | Deebo Samuel | WR | age 30 | SF | market 2713 | projected 143.8 (13.1 a week) | last 3 weeks 15.4 a week | lineup value 96.4
8151 | Kenneth Walker | RB | age 25 | KC | market 4479 | projected 137.8 (12.5 a week) | last 3 weeks 15.2 a week | lineup value 76.6
5892 | David Montgomery | RB | age 29 | HOU | market 3370 | projected 130.6 (11.9 a week) | last 3 weeks 18.5 a week | lineup value 69.4
4035 | Alvin Kamara | RB | age 31 | NO | market 2505 | projected 118.2 (10.7 a week) | last 3 weeks 12.8 a week | lineup value 72.7
11597 | Theo Johnson | TE | age 25 | NYG | market 3201 | projected 111.4 (10.1 a week) | last 3 weeks 5 a week | lineup value 77.2
4454 | Kendrick Bourne | WR | age 31 | ARI | market 0 | projected 88.2 (8 a week) | last 3 weeks 2.8 a week | lineup value 42.6
4988 | Nick Chubb | RB | age 30 | FA | market 1789 | projected 86.5 (7.9 a week) | last 3 weeks 10 a week | lineup value 27.7
11565 | J.J. McCarthy | QB | age 23 | NYG | market 2947 | projected 85.3 (7.8 a week) | last 3 weeks 7.8 a week | lineup value 36.7
4219 | Jeremy McNichols | RB | age 30 | WAS | market 0 | projected 73.2 (6.7 a week) | last 3 weeks 5.8 a week | lineup value 15.6
11586 | Blake Corum | RB | age 25 | LAR | market 3509 | projected 65 (5.9 a week) | last 3 weeks 6.7 a week | lineup value 8
1426 | DeAndre Hopkins | WR | age 33 | FA | market 1507 | projected 59.8 (5.4 a week) | last 3 weeks 10 a week | lineup value 13.8
12476 | Devin Neal | RB | age 23 | WAS | market 2766 | projected 55.6 (5.1 a week) | last 3 weeks 0.3 a week | lineup value 17.7
4147 | Samaje Perine | RB | age 31 | CIN | market 0 | projected 54 (4.9 a week) | last 3 weeks 0.9 a week | lineup value 12.7
12483 | Jack Bech | WR | age 23 | LV | market 2745 | projected 51.5 (4.7 a week) | last 3 weeks 2 a week | lineup value 7
9482 | Michael Mayer | TE | age 25 | LV | market 0 | projected 50.5 (4.6 a week) | last 3 weeks 5 a week | lineup value 16.3
12524 | Shedeur Sanders | QB | age 24 | CLE | market 2733 | projected 41.2 (3.7 a week) | last 3 weeks 0 a week | lineup value 7.1
6960 | Tyler Johnson | WR | age 28 | FA | market 1910 | projected 33.7 (3.1 a week) | last 3 weeks 2 a week | lineup value 0
5185 | Allen Lazard | WR | age 30 | FA | market 1600 | projected 30.8 (2.8 a week) | last 3 weeks 3.1 a week | lineup value 6.2
4351 | Tim Patrick | WR | age 32 | NYJ | market 0 | projected 27.5 (2.5 a week) | last 3 weeks 1 a week | lineup value 5.1

PARTNER (partnerId 12): record 3-0, rank 2, points for 606.4, contention window 1
9488 | Jaxon Smith-Njigba | WR | age 24 | SEA | market 5905 | projected 245.2 (22.3 a week) | last 3 weeks 22 a week | lineup value 182
9509 | Bijan Robinson | RB | age 24 | ATL | market 6366 | projected 239.7 (21.8 a week) | last 3 weeks 23 a week | lineup value 183.1
3163 | Jared Goff | QB | age 32 | DET | market 4036 | projected 196.6 (17.9 a week) | last 3 weeks 22.6 a week | lineup value 34
8144 | Chris Olave | WR | age 26 | NO | market 4498 | projected 177.5 (16.1 a week) | last 3 weeks 14.3 a week | lineup value 119.1
7523 | Trevor Lawrence | QB | age 27 | JAX | market 4675 | projected 172.9 (15.7 a week) | last 3 weeks 14.4 a week | lineup value 10.2
6768 | Tua Tagovailoa | QB | age 28 | ATL | market 2498 | projected 167.8 (15.3 a week) | last 3 weeks 14 a week | lineup value 20.4
8228 | Jaylen Warren | RB | age 27 | PIT | market 3525 | projected 143.6 (13.1 a week) | last 3 weeks 16.5 a week | lineup value 93.2
8676 | Rashid Shaheed | WR | age 28 | SEA | market 2729 | projected 131.2 (11.9 a week) | last 3 weeks 11.5 a week | lineup value 68
10213 | Tre Tucker | WR | age 25 | LV | market 2729 | projected 125.2 (11.4 a week) | last 3 weeks 21.6 a week | lineup value 62.1
7049 | Jauan Jennings | WR | age 29 | MIN | market 2864 | projected 121.6 (11.1 a week) | last 3 weeks 8.9 a week | lineup value 65.2
12498 | Mason Taylor | TE | age 22 | NYJ | market 3684 | projected 115.7 (10.5 a week) | last 3 weeks 4.8 a week | lineup value 71.9
8146 | Garrett Wilson | WR | age 26 | NYJ | market 4274 | projected 71.2 (6.5 a week) | last 3 weeks 19.2 a week | lineup value 45.3
10219 | Chris Rodriguez | RB | age 27 | JAX | market 2663 | projected 70.7 (6.4 a week) | last 3 weeks 1.4 a week | lineup value 26.7
11435 | Emanuel Wilson | RB | age 27 | SEA | market 2451 | projected 69.8 (6.3 a week) | last 3 weeks 1.1 a week | lineup value 20
9480 | Brenton Strange | TE | age 25 | JAX | market 3666 | projected 65 (5.9 a week) | last 3 weeks 11.9 a week | lineup value 31.7
5970 | Greg Dortch | WR | age 28 | BUF | market 0 | projected 55.1 (5 a week) | last 3 weeks 1.9 a week | lineup value 6.3
5995 | Justice Hill | RB | age 28 | BAL | market 1991 | projected 48.5 (4.4 a week) | last 3 weeks 4.2 a week | lineup value 11.4
8154 | Brian Robinson | RB | age 27 | ATL | market 3113 | projected 43.9 (4 a week) | last 3 weeks 3.4 a week | lineup value 3.7
12497 | Tory Horton | WR | age 23 | SEA | market 2796 | projected 40.4 (3.7 a week) | last 3 weeks 9.8 a week | lineup value 7.9
10871 | Luke Schoonmaker | TE | age 28 | DAL | market 0 | projected 25.2 (2.3 a week) | last 3 weeks 0.7 a week | lineup value 3
4972 | Mason Rudolph | QB | age 31 | PIT | market 0 | projected 15.3 (1.4 a week) | last 3 weeks 0.2 a week | lineup value 0
5010 | Will Dissly | TE | age 29 | FA | market 1441 | projected 6.6 (0.6 a week) | last 3 weeks 2 a week | lineup value 0

CANDIDATE DEALS (from a rules-based finder; points are the finder projections for the rest of the season):
c1 | partnerId 8 | I give Aaron Rodgers + Isaac TeSlaa (96,12535) | I get Tyjae Spears (9508) | my points 24.8 | their points 73.5 | likelihood 0.72
c2 | partnerId 7 | I give Aaron Rodgers + Jordan James (96,12467) | I get DeMario Douglas + Sean Tucker (9501,9506) | my points 21.8 | their points 39.5 | likelihood 0.66
c3 | partnerId 14 | I give Isaac TeSlaa + Antonio Gibson (12535,6945) | I get Zach Ertz + Darnell Mooney (1339,7090) | my points 96.4 | their points -118.8 | likelihood 0.76
c4 | partnerId 7 | I give Aaron Rodgers (96) | I get Sean Tucker (9506) | my points 14.7 | their points 41.8 | likelihood 0.54
c5 | partnerId 5 | I give Aaron Rodgers + Isaac TeSlaa (96,12535) | I get Alvin Kamara (4035) | my points 59.1 | their points -14.9 | likelihood 0.77
c6 | partnerId 8 | I give Justin Herbert + Tyler Shough (6797,12545) | I get Justin Jefferson + Chimere Dike (6794,12540) | my points 54.9 | their points 13.4 | likelihood 0.67
c7 | partnerId 14 | I give Malachi Corley + Isaac TeSlaa (11617,12535) | I get Darnell Mooney (7090) | my points 45.9 | their points -46.5 | likelihood 0.87
c8 | partnerId 12 | I give Aaron Rodgers + Isaac TeSlaa (96,12535) | I get Greg Dortch + Jimmy Garoppolo (5970,1837) | my points 11.2 | their points 16.5 | likelihood 0.51

Pick the best trades for my team.

=========== CASE 1180438228581883904-w7-r12 ===========
REPLY FILE: /Users/anik/workspace/chrome/sleeper/.eval-market/replies/suggest-v2/heldout1/1180438228581883904-w7-r12.json
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
League: dynasty, 14 teams, week 7, 8 regular season weeks left, playoffs start week 15
Lineup slots: QB, RB, RB, WR, WR, WR, TE, FLEX, FLEX, FLEX, FLEX, SUPER_FLEX, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN. Superflex: yes. Tight end premium: yes. Points per reception: 1.
Columns: id | name | position | age | team | market value | projected points for the rest of the regular season (and per week) | points per week over the last three weeks played | lineup value (points my lineup loses if this player is removed).

MY TEAM (partnerId me): record 4-2, rank 4, points for 1207.1, contention window 0.88
9509 | Bijan Robinson | RB | age 24 | ATL | market 6372 | projected 194.5 (24.3 a week) | last 3 weeks 24.7 a week | lineup value 151.2
9488 | Jaxon Smith-Njigba | WR | age 24 | SEA | market 5911 | projected 178.3 (22.3 a week) | last 3 weeks 27.1 a week | lineup value 135.3
3163 | Jared Goff | QB | age 32 | DET | market 4049 | projected 139.1 (17.4 a week) | last 3 weeks 18.6 a week | lineup value 26.2
8228 | Jaylen Warren | RB | age 27 | PIT | market 3523 | projected 129.6 (16.2 a week) | last 3 weeks 3.1 a week | lineup value 86.3
8144 | Chris Olave | WR | age 26 | NO | market 4490 | projected 129.1 (16.1 a week) | last 3 weeks 13.7 a week | lineup value 90.8
7523 | Trevor Lawrence | QB | age 27 | JAX | market 4702 | projected 122.1 (15.3 a week) | last 3 weeks 21 a week | lineup value 9.2
6768 | Tua Tagovailoa | QB | age 28 | ATL | market 2489 | projected 117 (14.6 a week) | last 3 weeks 17.7 a week | lineup value 19.3
8676 | Rashid Shaheed | WR | age 28 | SEA | market 2726 | projected 93.4 (11.7 a week) | last 3 weeks 14.4 a week | lineup value 50.4
7049 | Jauan Jennings | WR | age 29 | MIN | market 2859 | projected 91.4 (11.4 a week) | last 3 weeks 3 a week | lineup value 50.1
10213 | Tre Tucker | WR | age 25 | LV | market 2725 | projected 89 (11.1 a week) | last 3 weeks 9.8 a week | lineup value 46.1
12498 | Mason Taylor | TE | age 22 | NYJ | market 3679 | projected 86.3 (10.8 a week) | last 3 weeks 13.7 a week | lineup value 61.3
11435 | Emanuel Wilson | RB | age 27 | SEA | market 2451 | projected 63.4 (7.9 a week) | last 3 weeks 4.8 a week | lineup value 20
10219 | Chris Rodriguez | RB | age 27 | JAX | market 2667 | projected 45.1 (5.6 a week) | last 3 weeks 2.7 a week | lineup value 19.3
9480 | Brenton Strange | TE | age 25 | JAX | market 3671 | projected 41 (5.1 a week) | last 3 weeks 6.1 a week | lineup value 20.8
5970 | Greg Dortch | WR | age 28 | BUF | market 0 | projected 40.4 (5.1 a week) | last 3 weeks 7.2 a week | lineup value 6.3
8154 | Brian Robinson | RB | age 27 | ATL | market 3116 | projected 28.6 (3.6 a week) | last 3 weeks 2.5 a week | lineup value 3.7
5995 | Justice Hill | RB | age 28 | BAL | market 1986 | projected 27.3 (3.4 a week) | last 3 weeks 14.7 a week | lineup value 8.4
8146 | Garrett Wilson | WR | age 26 | NYJ | market 4258 | projected 17.4 (2.2 a week) | last 3 weeks 15.2 a week | lineup value 11.7
12497 | Tory Horton | WR | age 23 | SEA | market 2788 | projected 16.9 (2.1 a week) | last 3 weeks 5.1 a week | lineup value 4.5
4972 | Mason Rudolph | QB | age 31 | PIT | market 0 | projected 15.3 (1.9 a week) | last 3 weeks 0 a week | lineup value 0
10871 | Luke Schoonmaker | TE | age 28 | DAL | market 0 | projected 12.3 (1.5 a week) | last 3 weeks 2.6 a week | lineup value 3
8207 | Tyler Goodson | RB | age 25 | DAL | market 0 | projected 4.6 (0.6 a week) | last 3 weeks 0.3 a week | lineup value 0
5010 | Will Dissly | TE | age 29 | FA | market 1451 | projected 3 (0.4 a week) | last 3 weeks 1.7 a week | lineup value 0
11581 | MarShawn Lloyd | RB | age 25 | GB | market 3214 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0
1837 | Jimmy Garoppolo | QB | age 34 | FA | market 2892 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0
8162 | Sam Howell | QB | age 26 | DAL | market 0 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0
4574 | Cooper Rush | QB | age 32 | ATL | market 0 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0

PARTNER (partnerId 1): record 5-1, rank 2, points for 1119.4, contention window 1
9226 | De'Von Achane | RB | age 25 | MIA | market 4945 | projected 177.5 (22.2 a week) | last 3 weeks 23.2 a week | lineup value 137
11564 | Drake Maye | QB | age 24 | NE | market 6644 | projected 155.4 (19.4 a week) | last 3 weeks 23.5 a week | lineup value 78.9
8150 | Kyren Williams | RB | age 26 | LAR | market 4449 | projected 123.4 (15.4 a week) | last 3 weeks 20.1 a week | lineup value 77.2
9224 | Chase Brown | RB | age 26 | CIN | market 4467 | projected 118.6 (14.8 a week) | last 3 weeks 10.3 a week | lineup value 78.1
3257 | Jacoby Brissett | QB | age 33 | ARI | market 2424 | projected 118.5 (14.8 a week) | last 3 weeks 8.2 a week | lineup value 59
7553 | Kyle Pitts | TE | age 26 | ATL | market 3994 | projected 111.6 (13.9 a week) | last 3 weeks 9.4 a week | lineup value 59.2
12499 | Elic Ayomanor | WR | age 23 | TEN | market 2925 | projected 61.7 (7.7 a week) | last 3 weeks 6 a week | lineup value 20.7
11628 | Marvin Harrison | WR | age 24 | HOU | market 3984 | projected 60.6 (7.6 a week) | last 3 weeks 13.7 a week | lineup value 33.5
11631 | Brian Thomas | WR | age 24 | JAX | market 3999 | projected 60.6 (7.6 a week) | last 3 weeks 16.3 a week | lineup value 32.2
9479 | Darnell Washington | TE | age 25 | PIT | market 0 | projected 57.4 (7.2 a week) | last 3 weeks 0 a week | lineup value 7.3
11626 | Xavier Legette | WR | age 25 | CAR | market 0 | projected 57.1 (7.1 a week) | last 3 weeks 4.6 a week | lineup value 16
11600 | Ja'Tavion Sanders | TE | age 23 | CAR | market 0 | projected 56.9 (7.1 a week) | last 3 weeks 0 a week | lineup value 9.8
7527 | Mac Jones | QB | age 28 | SF | market 1468 | projected 56.3 (7 a week) | last 3 weeks 13.1 a week | lineup value 0
12490 | Bhayshul Tuten | RB | age 23 | JAX | market 4117 | projected 53.7 (6.7 a week) | last 3 weeks 3.5 a week | lineup value 8
5848 | Marquise Brown | WR | age 29 | PHI | market 0 | projected 49.1 (6.1 a week) | last 3 weeks 14.7 a week | lineup value 6.4
4381 | Taysom Hill | TE | age 35 | FA | market 1507 | projected 45.3 (5.7 a week) | last 3 weeks 2.3 a week | lineup value 5.1
10444 | Cedric Tillman | WR | age 26 | NO | market 0 | projected 44.3 (5.5 a week) | last 3 weeks 0.7 a week | lineup value 17
12521 | Elijah Arroyo | TE | age 23 | SEA | market 0 | projected 40.3 (5 a week) | last 3 weeks 4.4 a week | lineup value 0.8
12536 | Jaylin Noel | WR | age 24 | HOU | market 2777 | projected 35.9 (4.5 a week) | last 3 weeks 3.6 a week | lineup value 3.3
11562 | Spencer Rattler | QB | age 26 | NO | market 0 | projected 31 (3.9 a week) | last 3 weeks 16.3 a week | lineup value 1.5
12503 | Isaiah Bond | WR | age 22 | CLE | market 0 | projected 28.3 (3.5 a week) | last 3 weeks 6 a week | lineup value 1.9
12523 | Jimmy Horn | WR | age 24 | CLE | market 0 | projected 23.4 (2.9 a week) | last 3 weeks 4.3 a week | lineup value 0

PARTNER (partnerId 11): record 2-4, rank 11, points for 959.8, contention window 0.12
4881 | Lamar Jackson | QB | age 29 | BAL | market 6253 | projected 148.9 (18.6 a week) | last 3 weeks 3.8 a week | lineup value 84.2
4866 | Saquon Barkley | RB | age 29 | PHI | market 4228 | projected 134.8 (16.9 a week) | last 3 weeks 15.9 a week | lineup value 104
2133 | Davante Adams | WR | age 33 | LAR | market 3364 | projected 127.7 (16 a week) | last 3 weeks 13.4 a week | lineup value 95.1
8121 | Romeo Doubs | WR | age 26 | NE | market 3171 | projected 100.7 (12.6 a week) | last 3 weeks 14.1 a week | lineup value 65.8
9228 | Bryce Young | QB | age 25 | CAR | market 3652 | projected 95.8 (12 a week) | last 3 weeks 15.3 a week | lineup value 18.5
7567 | Kenny Gainwell | RB | age 27 | TB | market 3037 | projected 91.3 (11.4 a week) | last 3 weeks 14.3 a week | lineup value 56.9
5012 | Mark Andrews | TE | age 31 | BAL | market 3057 | projected 90.3 (11.3 a week) | last 3 weeks 9.9 a week | lineup value 66.9
8112 | Drake London | WR | age 25 | ATL | market 4944 | projected 78 (9.8 a week) | last 3 weeks 21 a week | lineup value 55.6
19 | Joe Flacco | QB | age 41 | CIN | market 0 | projected 76.3 (9.5 a week) | last 3 weeks 7 a week | lineup value 4.1
12485 | Tez Johnson | WR | age 24 | TB | market 0 | projected 68.9 (8.6 a week) | last 3 weeks 8.8 a week | lineup value 38
6271 | Olamide Zaccheaus | WR | age 29 | ATL | market 0 | projected 55.7 (7 a week) | last 3 weeks 5 a week | lineup value 20.8
12486 | Dillon Gabriel | QB | age 25 | CLE | market 0 | projected 55.3 (6.9 a week) | last 3 weeks 9 a week | lineup value 0
7571 | Rashod Bateman | WR | age 26 | BAL | market 2473 | projected 47.6 (6 a week) | last 3 weeks 1.9 a week | lineup value 24.1
11637 | Keon Coleman | WR | age 23 | BUF | market 2755 | projected 46.5 (5.8 a week) | last 3 weeks 7.7 a week | lineup value 23
7587 | Dyami Brown | WR | age 26 | WAS | market 0 | projected 34.6 (4.3 a week) | last 3 weeks 2.7 a week | lineup value 11.8
9511 | Keaton Mitchell | RB | age 24 | LAC | market 2831 | projected 34.3 (4.3 a week) | last 3 weeks 0.9 a week | lineup value 8.2
11199 | Emari Demercado | RB | age 27 | DAL | market 0 | projected 25.7 (3.2 a week) | last 3 weeks 5.4 a week | lineup value 7.2
12487 | Terrance Ferguson | TE | age 23 | LAR | market 3505 | projected 24.5 (3.1 a week) | last 3 weeks 1.3 a week | lineup value 4.7
11370 | Chris Brooks | RB | age 26 | GB | market 1190 | projected 23.3 (2.9 a week) | last 3 weeks 0.4 a week | lineup value 5.4
6869 | Adam Trautman | TE | age 29 | DEN | market 0 | projected 22.5 (2.8 a week) | last 3 weeks 3.2 a week | lineup value 0.3
11575 | Ray Davis | RB | age 26 | BUF | market 2460 | projected 19.6 (2.5 a week) | last 3 weeks 3.6 a week | lineup value 3.7
829 | Andy Dalton | QB | age 38 | FA | market 0 | projected 14.6 (1.8 a week) | last 3 weeks 2.4 a week | lineup value 0.9

PARTNER (partnerId 6): record 0-6, rank 14, points for 719, contention window 0
12512 | Quinshon Judkins | RB | age 22 | CLE | market 4347 | projected 115.6 (14.4 a week) | last 3 weeks 14.9 a week | lineup value 103.3
6790 | D'Andre Swift | RB | age 27 | CHI | market 3620 | projected 98.7 (12.3 a week) | last 3 weeks 16.2 a week | lineup value 86.4
12508 | Jaxson Dart | QB | age 23 | NYG | market 5553 | projected 98 (12.2 a week) | last 3 weeks 21.3 a week | lineup value 92.4
11627 | Troy Franklin | WR | age 23 | DEN | market 3024 | projected 75.4 (9.4 a week) | last 3 weeks 7.4 a week | lineup value 58.8
6783 | Jerry Jeudy | WR | age 27 | CLE | market 2767 | projected 74.9 (9.4 a week) | last 3 weeks 7.7 a week | lineup value 60.3
8125 | Calvin Austin | WR | age 27 | NYG | market 0 | projected 66.2 (8.3 a week) | last 3 weeks 1.2 a week | lineup value 53.1
11566 | Jayden Daniels | QB | age 25 | WAS | market 5959 | projected 63.8 (8 a week) | last 3 weeks 14.3 a week | lineup value 58.2
7496 | Nick Westbrook-Ikhine | WR | age 29 | IND | market 0 | projected 45.3 (5.7 a week) | last 3 weeks 0.4 a week | lineup value 28.7
11834 | Devaughn Vele | WR | age 28 | NO | market 2279 | projected 45.2 (5.6 a week) | last 3 weeks 1.2 a week | lineup value 31.9
12492 | Pat Bryant | WR | age 23 | DEN | market 3032 | projected 41.3 (5.2 a week) | last 3 weeks 1.6 a week | lineup value 25.1
12501 | Matthew Golden | WR | age 23 | GB | market 3588 | projected 40.3 (5 a week) | last 3 weeks 9.3 a week | lineup value 26
4993 | Mike Gesicki | TE | age 31 | CIN | market 1199 | projected 26.7 (3.3 a week) | last 3 weeks 2.4 a week | lineup value 21.9
8208 | Tyler Badie | RB | age 26 | DEN | market 0 | projected 23.5 (2.9 a week) | last 3 weeks 1.8 a week | lineup value 11.7
7828 | Noah Gray | TE | age 27 | KC | market 0 | projected 21.7 (2.7 a week) | last 3 weeks 2.5 a week | lineup value 9.9
7535 | Hunter Long | TE | age 28 | ARI | market 0 | projected 18.2 (2.3 a week) | last 3 weeks 1.8 a week | lineup value 10.5
11439 | Jaleel McLaughlin | RB | age 26 | CLE | market 0 | projected 16.8 (2.1 a week) | last 3 weeks 0 a week | lineup value 7.2
5096 | Ray-Ray McCloud | WR | age 29 | FA | market 0 | projected 15.8 (2 a week) | last 3 weeks 0.1 a week | lineup value 10.4
7562 | Tutu Atwell | WR | age 27 | LAR | market 0 | projected 8.8 (1.1 a week) | last 3 weeks 9.6 a week | lineup value 5.3
5133 | Tyler Conklin | TE | age 31 | DET | market 0 | projected 8 (1 a week) | last 3 weeks 2.7 a week | lineup value 2.3
11629 | Devontez Walker | WR | age 25 | BAL | market 0 | projected 7.6 (0.9 a week) | last 3 weeks 0 a week | lineup value 1.9
4234 | Noah Brown | WR | age 30 | FA | market 0 | projected 3.9 (0.5 a week) | last 3 weeks 0 a week | lineup value 0
10225 | Jonathan Mingo | WR | age 25 | DAL | market 0 | projected 1.3 (0.2 a week) | last 3 weeks 0 a week | lineup value 1.3

PARTNER (partnerId 5): record 3-3, rank 10, points for 997.2, contention window 0.23
7547 | Amon-Ra St. Brown | WR | age 26 | DET | market 5310 | projected 161.9 (20.2 a week) | last 3 weeks 20.4 a week | lineup value 125.2
6804 | Jordan Love | QB | age 27 | GB | market 4422 | projected 146.5 (18.3 a week) | last 3 weeks 15.7 a week | lineup value 91.4
3198 | Derrick Henry | RB | age 32 | BAL | market 4073 | projected 138.9 (17.4 a week) | last 3 weeks 11.6 a week | lineup value 95.8
8151 | Kenneth Walker | RB | age 25 | KC | market 4489 | projected 94.3 (11.8 a week) | last 3 weeks 9.4 a week | lineup value 49.1
5872 | Deebo Samuel | WR | age 30 | SF | market 2708 | projected 94.2 (11.8 a week) | last 3 weeks 16.9 a week | lineup value 62.8
5892 | David Montgomery | RB | age 29 | HOU | market 3378 | projected 89.9 (11.2 a week) | last 3 weeks 10.2 a week | lineup value 44.8
11565 | J.J. McCarthy | QB | age 23 | NYG | market 2946 | projected 85.3 (10.7 a week) | last 3 weeks 0 a week | lineup value 36.8
11597 | Theo Johnson | TE | age 25 | NYG | market 3195 | projected 83.6 (10.5 a week) | last 3 weeks 14.4 a week | lineup value 54.6
4035 | Alvin Kamara | RB | age 31 | NO | market 2509 | projected 71.5 (8.9 a week) | last 3 weeks 11.9 a week | lineup value 42
4988 | Nick Chubb | RB | age 30 | FA | market 1790 | projected 63.6 (8 a week) | last 3 weeks 7.1 a week | lineup value 15.8
4454 | Kendrick Bourne | WR | age 31 | ARI | market 0 | projected 56.5 (7.1 a week) | last 3 weeks 18.2 a week | lineup value 27
12476 | Devin Neal | RB | age 23 | WAS | market 2766 | projected 54.2 (6.8 a week) | last 3 weeks 0 a week | lineup value 17.7
11586 | Blake Corum | RB | age 25 | LAR | market 3503 | projected 49.1 (6.1 a week) | last 3 weeks 2.7 a week | lineup value 7.9
4219 | Jeremy McNichols | RB | age 30 | WAS | market 0 | projected 47.3 (5.9 a week) | last 3 weeks 4 a week | lineup value 5.8
1426 | DeAndre Hopkins | WR | age 33 | FA | market 1506 | projected 44.8 (5.6 a week) | last 3 weeks 4 a week | lineup value 12.8
12524 | Shedeur Sanders | QB | age 24 | CLE | market 2732 | projected 41.2 (5.2 a week) | last 3 weeks 0 a week | lineup value 7.1
4147 | Samaje Perine | RB | age 31 | CIN | market 0 | projected 40.8 (5.1 a week) | last 3 weeks 4.1 a week | lineup value 12.7
9482 | Michael Mayer | TE | age 25 | LV | market 0 | projected 40.5 (5.1 a week) | last 3 weeks 6.4 a week | lineup value 11.4
12483 | Jack Bech | WR | age 23 | LV | market 2743 | projected 36.9 (4.6 a week) | last 3 weeks 2.3 a week | lineup value 6.6
5185 | Allen Lazard | WR | age 30 | FA | market 1600 | projected 28.6 (3.6 a week) | last 3 weeks 1 a week | lineup value 6.2
6960 | Tyler Johnson | WR | age 28 | FA | market 1912 | projected 26.5 (3.3 a week) | last 3 weeks 0 a week | lineup value 0
4351 | Tim Patrick | WR | age 32 | NYJ | market 0 | projected 25.9 (3.2 a week) | last 3 weeks 3.5 a week | lineup value 5.1

PARTNER (partnerId 14): record 3-3, rank 9, points for 1065.6, contention window 0.34
6813 | Jonathan Taylor | RB | age 27 | IND | market 4926 | projected 178.9 (22.4 a week) | last 3 weeks 24.9 a week | lineup value 131.4
5850 | Josh Jacobs | RB | age 28 | GB | market 3926 | projected 146.6 (18.3 a week) | last 3 weeks 22.5 a week | lineup value 96.4
421 | Matthew Stafford | QB | age 38 | LAR | market 3596 | projected 133.8 (16.7 a week) | last 3 weeks 23.8 a week | lineup value 67.8
12529 | TreVeyon Henderson | RB | age 23 | NE | market 4308 | projected 106.7 (13.3 a week) | last 3 weeks 7.6 a week | lineup value 58.4
1339 | Zach Ertz | TE | age 35 | PHI | market 0 | projected 98.5 (12.3 a week) | last 3 weeks 8.8 a week | lineup value 50.9
6801 | Tee Higgins | WR | age 27 | CIN | market 4129 | projected 96 (12 a week) | last 3 weeks 10.5 a week | lineup value 56
7090 | Darnell Mooney | WR | age 28 | NYG | market 2422 | projected 94 (11.7 a week) | last 3 weeks 1 a week | lineup value 39.5
12533 | Jacory Croskey-Merritt | RB | age 25 | WAS | market 3210 | projected 80 (10 a week) | last 3 weeks 14.4 a week | lineup value 30.1
11559 | Michael Penix | QB | age 26 | ATL | market 2632 | projected 61.5 (7.7 a week) | last 3 weeks 13.2 a week | lineup value 30.3
1166 | Kirk Cousins | QB | age 38 | LV | market 1866 | projected 60.7 (7.6 a week) | last 3 weeks 0 a week | lineup value 25.9
4033 | David Njoku | TE | age 30 | LAC | market 2837 | projected 58 (7.3 a week) | last 3 weeks 11.3 a week | lineup value 20.9
5906 | Dawson Knox | TE | age 29 | BUF | market 0 | projected 57.7 (7.2 a week) | last 3 weeks 4.8 a week | lineup value 14.4
12502 | Gunnar Helm | TE | age 24 | TEN | market 3253 | projected 56.3 (7 a week) | last 3 weeks 5.8 a week | lineup value 13.2
12519 | Luther Burden | WR | age 22 | CHI | market 4914 | projected 51 (6.4 a week) | last 3 weeks 3.7 a week | lineup value 11.4
7594 | Chuba Hubbard | RB | age 27 | CAR | market 3315 | projected 50.3 (6.3 a week) | last 3 weeks 3.7 a week | lineup value 8.8
6130 | Devin Singletary | RB | age 29 | NYG | market 0 | projected 48.5 (6.1 a week) | last 3 weeks 2.7 a week | lineup value 12.8
4950 | Christian Kirk | WR | age 29 | SF | market 2230 | projected 45.8 (5.7 a week) | last 3 weeks 5.8 a week | lineup value 7.3
5927 | Terry McLaurin | WR | age 31 | WAS | market 3409 | projected 43 (5.4 a week) | last 3 weeks 0 a week | lineup value 23.9
3269 | Chris Moore | WR | age 33 | BAL | market 0 | projected 40.6 (5.1 a week) | last 3 weeks 4.8 a week | lineup value 3.3
6770 | Joe Burrow | QB | age 29 | CIN | market 5392 | projected 37.7 (4.7 a week) | last 3 weeks 0 a week | lineup value 7.1
2197 | Brandin Cooks | WR | age 33 | SF | market 0 | projected 33.4 (4.2 a week) | last 3 weeks 1.7 a week | lineup value 0
12547 | Kyle Williams | WR | age 23 | NE | market 2830 | projected 23.4 (2.9 a week) | last 3 weeks -0.1 a week | lineup value 0

PARTNER (partnerId 10): record 0-6, rank 13, points for 824.5, contention window 0
12527 | Ashton Jeanty | RB | age 22 | LV | market 5284 | projected 129.4 (16.2 a week) | last 3 weeks 24 a week | lineup value 120.1
12526 | Tetairoa McMillan | WR | age 23 | CAR | market 4792 | projected 113.3 (14.2 a week) | last 3 weeks 14.7 a week | lineup value 102.9
9756 | Jordan Addison | WR | age 24 | MIN | market 3622 | projected 101.5 (12.7 a week) | last 3 weeks 11.3 a week | lineup value 91.1
12506 | Harold Fannin | TE | age 22 | CLE | market 4712 | projected 94.8 (11.9 a week) | last 3 weeks 13.1 a week | lineup value 84.4
12517 | Colston Loveland | TE | age 22 | CHI | market 5281 | projected 86.2 (10.8 a week) | last 3 weeks 1.5 a week | lineup value 75.8
9753 | Zach Charbonnet | RB | age 25 | SEA | market 3081 | projected 77.5 (9.7 a week) | last 3 weeks 10.1 a week | lineup value 68.3
11646 | Jalen Coker | WR | age 24 | CAR | market 3320 | projected 58 (7.3 a week) | last 3 weeks 0 a week | lineup value 47.7
11571 | Isaiah Davis | RB | age 24 | NYJ | market 0 | projected 54 (6.7 a week) | last 3 weeks 4.4 a week | lineup value 43.6
6039 | Ty Johnson | RB | age 29 | BUF | market 0 | projected 45.7 (5.7 a week) | last 3 weeks 1.2 a week | lineup value 38.2
8147 | John Metchie | WR | age 26 | CAR | market 0 | projected 44.2 (5.5 a week) | last 3 weeks 1.1 a week | lineup value 36
11630 | Roman Wilson | WR | age 25 | PIT | market 0 | projected 38.1 (4.8 a week) | last 3 weeks 0.9 a week | lineup value 27.7
12481 | Cam Skattebo | RB | age 24 | NYG | market 4078 | projected 32.9 (4.1 a week) | last 3 weeks 20.8 a week | lineup value 28.9
3161 | Carson Wentz | QB | age 33 | MIN | market 0 | projected 30.1 (3.8 a week) | last 3 weeks 13.4 a week | lineup value 30.1
11633 | Jamari Thrash | WR | age 25 | LV | market 2312 | projected 12.1 (1.5 a week) | last 3 weeks 2.3 a week | lineup value 4.6
11596 | Ben Sinnott | TE | age 24 | WAS | market 0 | projected 8.8 (1.1 a week) | last 3 weeks 0 a week | lineup value 1.9
11570 | Rasheen Ali | RB | age 25 | BAL | market 0 | projected 5.7 (0.7 a week) | last 3 weeks 0 a week | lineup value 3.3
12634 | Jordan Watkins | WR | age 24 | SF | market 0 | projected 4.6 (0.6 a week) | last 3 weeks 0 a week | lineup value 2.8
10235 | Roschon Johnson | RB | age 25 | CHI | market 0 | projected 1.2 (0.2 a week) | last 3 weeks 0.2 a week | lineup value 0
11256 | Tyson Bagent | QB | age 26 | CHI | market 0 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0
11576 | Braelon Allen | RB | age 22 | NYJ | market 3225 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0
11632 | Malik Nabers | WR | age 23 | NYG | market 5024 | projected 0 (0 a week) | last 3 weeks 1.5 a week | lineup value 0
12470 | Riley Leonard | QB | age 24 | IND | market 0 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0

PARTNER (partnerId 7): record 6-0, rank 1, points for 1211.2, contention window 1
9493 | Puka Nacua | WR | age 25 | LAR | market 5794 | projected 149.4 (18.7 a week) | last 3 weeks 23.6 a week | lineup value 86.1
8138 | James Cook | RB | age 27 | BUF | market 4829 | projected 145.5 (18.2 a week) | last 3 weeks 13.5 a week | lineup value 76.9
7588 | Javonte Williams | RB | age 26 | DAL | market 3931 | projected 135.9 (17 a week) | last 3 weeks 19.7 a week | lineup value 69.1
7569 | Nico Collins | WR | age 27 | HOU | market 4492 | projected 133.7 (16.7 a week) | last 3 weeks 9.8 a week | lineup value 63.4
5870 | Daniel Jones | QB | age 29 | IND | market 3254 | projected 128 (16 a week) | last 3 weeks 18.1 a week | lineup value 85.2
5846 | DK Metcalf | WR | age 28 | PIT | market 3469 | projected 125.8 (15.7 a week) | last 3 weeks 16.5 a week | lineup value 50.2
7526 | Jaylen Waddle | WR | age 27 | DEN | market 4069 | projected 122.9 (15.4 a week) | last 3 weeks 18.3 a week | lineup value 59.3
7543 | Travis Etienne | RB | age 27 | NO | market 3820 | projected 106.5 (13.3 a week) | last 3 weeks 14.3 a week | lineup value 36.2
5859 | A.J. Brown | WR | age 29 | NE | market 4359 | projected 105.2 (13.2 a week) | last 3 weeks 9.5 a week | lineup value 44.6
8122 | Zonovan Knight | RB | age 25 | ARI | market 0 | projected 83 (10.4 a week) | last 3 weeks 4.4 a week | lineup value 12.7
4066 | Evan Engram | TE | age 32 | DEN | market 0 | projected 82 (10.2 a week) | last 3 weeks 12.8 a week | lineup value 23.7
9758 | C.J. Stroud | QB | age 25 | HOU | market 4079 | projected 79.9 (10 a week) | last 3 weeks 18.4 a week | lineup value 37.1
8408 | Jordan Mason | RB | age 27 | MIN | market 3028 | projected 79.7 (10 a week) | last 3 weeks 7.6 a week | lineup value 16.4
8210 | Chig Okonkwo | TE | age 27 | WAS | market 3097 | projected 63.7 (8 a week) | last 3 weeks 9.4 a week | lineup value 8.3
9487 | Parker Washington | WR | age 24 | JAX | market 4036 | projected 62.7 (7.8 a week) | last 3 weeks 6.7 a week | lineup value 4.8
4177 | Mack Hollins | WR | age 33 | NE | market 0 | projected 57 (7.1 a week) | last 3 weeks 4.3 a week | lineup value 0.2
8131 | Isaiah Likely | TE | age 26 | NYG | market 3443 | projected 56.3 (7 a week) | last 3 weeks 1.9 a week | lineup value 0
10226 | Andrei Iosivas | WR | age 27 | CIN | market 0 | projected 54.8 (6.8 a week) | last 3 weeks 6.7 a week | lineup value 1.1
9506 | Sean Tucker | RB | age 24 | TB | market 2720 | projected 53.1 (6.6 a week) | last 3 weeks 3.9 a week | lineup value 1.8
9501 | DeMario Douglas | WR | age 25 | NE | market 0 | projected 45.1 (5.6 a week) | last 3 weeks 7.7 a week | lineup value 0.5
6826 | Cole Kmet | TE | age 27 | CHI | market 0 | projected 37 (4.6 a week) | last 3 weeks 3.8 a week | lineup value 0
4040 | JuJu Smith-Schuster | WR | age 29 | FA | market 1347 | projected 32.7 (4.1 a week) | last 3 weeks 9.3 a week | lineup value 0

PARTNER (partnerId 8): record 3-3, rank 7, points for 1178, contention window 0.55
9221 | Jahmyr Gibbs | RB | age 24 | DET | market 6257 | projected 170.7 (21.3 a week) | last 3 weeks 14.9 a week | lineup value 117.9
8130 | Trey McBride | TE | age 26 | ARI | market 4908 | projected 167.2 (20.9 a week) | last 3 weeks 18.6 a week | lineup value 124.1
6794 | Justin Jefferson | WR | age 27 | MIN | market 4915 | projected 149.7 (18.7 a week) | last 3 weeks 15.9 a week | lineup value 93.6
4892 | Baker Mayfield | QB | age 31 | TB | market 3839 | projected 143.1 (17.9 a week) | last 3 weeks 26.6 a week | lineup value 143.1
7564 | Ja'Marr Chase | WR | age 26 | CIN | market 5832 | projected 138.7 (17.3 a week) | last 3 weeks 22.5 a week | lineup value 90.4
8155 | Breece Hall | RB | age 25 | NYJ | market 4291 | projected 121.8 (15.2 a week) | last 3 weeks 14.7 a week | lineup value 73.8
9754 | Quentin Johnston | WR | age 25 | LAC | market 3426 | projected 95 (11.9 a week) | last 3 weeks 10.4 a week | lineup value 43.9
8142 | Alec Pierce | WR | age 26 | IND | market 3526 | projected 82.2 (10.3 a week) | last 3 weeks 2.5 a week | lineup value 35.3
11655 | Tyrone Tracy | RB | age 26 | NYG | market 3007 | projected 77.2 (9.6 a week) | last 3 weeks 0.2 a week | lineup value 33.9
5967 | Tony Pollard | RB | age 29 | TEN | market 3209 | projected 73.7 (9.2 a week) | last 3 weeks 11 a week | lineup value 20.4
9508 | Tyjae Spears | RB | age 25 | TEN | market 2910 | projected 70.9 (8.9 a week) | last 3 weeks 3.7 a week | lineup value 17.6
12540 | Chimere Dike | WR | age 24 | TEN | market 2877 | projected 64.1 (8 a week) | last 3 weeks 2.2 a week | lineup value 14.2
4039 | Cooper Kupp | WR | age 33 | SEA | market 2116 | projected 64.1 (8 a week) | last 3 weeks 10.9 a week | lineup value 19.3
10236 | Dalton Kincaid | TE | age 26 | BUF | market 3776 | projected 54.8 (6.8 a week) | last 3 weeks 11 a week | lineup value 30.9
9481 | Luke Musgrave | TE | age 26 | GB | market 0 | projected 48.4 (6.1 a week) | last 3 weeks 1.4 a week | lineup value 9.7
12455 | Brashard Smith | RB | age 23 | KC | market 2669 | projected 34.4 (4.3 a week) | last 3 weeks 6.5 a week | lineup value 2.3
2216 | Mike Evans | WR | age 33 | SF | market 3225 | projected 18.5 (2.3 a week) | last 3 weeks 0 a week | lineup value 10.5
4080 | Zay Jones | WR | age 31 | FA | market 0 | projected 18.1 (2.3 a week) | last 3 weeks 0 a week | lineup value 3.2
9497 | Jalin Hyatt | WR | age 25 | NYG | market 0 | projected 14.2 (1.8 a week) | last 3 weeks 1.7 a week | lineup value 0
9225 | Tank Bigsby | RB | age 24 | PHI | market 2839 | projected 13.8 (1.7 a week) | last 3 weeks 0 a week | lineup value 0
4171 | Josh Reynolds | WR | age 31 | FA | market 1320 | projected 9.4 (1.2 a week) | last 3 weeks 4.8 a week | lineup value 1.4
9757 | Kendre Miller | RB | age 24 | NO | market 2621 | projected 7.9 (1 a week) | last 3 weeks 8.2 a week | lineup value 0

PARTNER (partnerId 4): record 1-5, rank 12, points for 842, contention window 0.02
11560 | Caleb Williams | QB | age 24 | CHI | market 6068 | projected 142.3 (17.8 a week) | last 3 weeks 11.7 a week | lineup value 110.8
11604 | Brock Bowers | TE | age 23 | LV | market 5559 | projected 131.9 (16.5 a week) | last 3 weeks 4.3 a week | lineup value 104.3
8126 | Wan'Dale Robinson | WR | age 25 | TEN | market 3421 | projected 107.4 (13.4 a week) | last 3 weeks 11.3 a week | lineup value 75.8
11620 | Rome Odunze | WR | age 24 | CHI | market 4097 | projected 106.2 (13.3 a week) | last 3 weeks 8 a week | lineup value 74.6
12522 | Cam Ward | QB | age 24 | TEN | market 3805 | projected 90.8 (11.4 a week) | last 3 weeks 6.6 a week | lineup value 59.3
12534 | Kyle Monangai | RB | age 24 | CHI | market 3732 | projected 75.7 (9.5 a week) | last 3 weeks 2.5 a week | lineup value 43.3
11603 | AJ Barner | TE | age 24 | SEA | market 3475 | projected 75 (9.4 a week) | last 3 weeks 18.5 a week | lineup value 47.4
11610 | Malik Washington | WR | age 25 | MIA | market 2726 | projected 68.7 (8.6 a week) | last 3 weeks 5 a week | lineup value 37.9
8132 | Tyler Allgeier | RB | age 26 | ARI | market 3088 | projected 66.1 (8.3 a week) | last 3 weeks 7.6 a week | lineup value 33.4
12484 | Jayden Higgins | WR | age 23 | HOU | market 3450 | projected 62.7 (7.8 a week) | last 3 weeks 5.6 a week | lineup value 27.5
9504 | Kayshon Boutte | WR | age 24 | HOU | market 3008 | projected 55 (6.9 a week) | last 3 weeks 13 a week | lineup value 31.5
11625 | Adonai Mitchell | WR | age 24 | NYJ | market 3041 | projected 38.6 (4.8 a week) | last 3 weeks 3.7 a week | lineup value 13.7
12641 | Jaylin Lane | WR | age 24 | WAS | market 0 | projected 38.4 (4.8 a week) | last 3 weeks 3.6 a week | lineup value 14.6
9486 | Dontayvion Wicks | WR | age 25 | PHI | market 2572 | projected 38.2 (4.8 a week) | last 3 weeks 2.7 a week | lineup value 10.4
12469 | Dylan Sampson | RB | age 22 | CLE | market 3215 | projected 32.7 (4.1 a week) | last 3 weeks 1.9 a week | lineup value 3.6
12509 | Tre' Harris | WR | age 24 | LAC | market 2823 | projected 23.4 (2.9 a week) | last 3 weeks 2.4 a week | lineup value 0
12544 | LeQuint Allen | RB | age 22 | JAX | market 0 | projected 21 (2.6 a week) | last 3 weeks 1.3 a week | lineup value 0
8117 | Jalen Tolbert | WR | age 27 | MIA | market 0 | projected 12.3 (1.5 a week) | last 3 weeks 4.2 a week | lineup value 0
12507 | Omarion Hampton | RB | age 23 | LAC | market 5079 | projected 12.2 (1.5 a week) | last 3 weeks 15.6 a week | lineup value 8.6
12457 | Jaydon Blue | RB | age 22 | PHI | market 2712 | projected 8.4 (1.1 a week) | last 3 weeks 0.2 a week | lineup value 0.9
11643 | Jaylen Wright | RB | age 23 | MIA | market 2674 | projected 8.2 (1 a week) | last 3 weeks 0 a week | lineup value 0
12531 | Trevor Etienne | RB | age 22 | CAR | market 0 | projected 5.1 (0.6 a week) | last 3 weeks 3.5 a week | lineup value 0

CANDIDATE DEALS (from a rules-based finder; points are the finder projections for the rest of the season):
c1 | partnerId 1 | I give Greg Dortch (5970) | I get Spencer Rattler + Elijah Arroyo (11562,12521) | my points 14.8 | their points 5.8 | likelihood 0.8
c2 | partnerId 11 | I give MarShawn Lloyd (11581) | I get Mark Andrews + Kenny Gainwell (5012,7567) | my points 72.6 | their points -127.2 | likelihood 0.86
c3 | partnerId 6 | I give MarShawn Lloyd (11581) | I get Troy Franklin + Jerry Jeudy (11627,6783) | my points 48.3 | their points -123.9 | likelihood 0.89
c4 | partnerId 6 | I give Jimmy Garoppolo (1837) | I get Jerry Jeudy + Calvin Austin (6783,8125) | my points 40.1 | their points -115.9 | likelihood 0.86
c5 | partnerId 5 | I give Jimmy Garoppolo (1837) | I get Deebo Samuel + Alvin Kamara (5872,4035) | my points 85.3 | their points -106.8 | likelihood 0.76
c6 | partnerId 5 | I give Jimmy Garoppolo + Will Dissly (1837,5010) | I get Deebo Samuel (5872) | my points 56.4 | their points -62.6 | likelihood 0.74
c7 | partnerId 14 | I give Jimmy Garoppolo (1837) | I get Zach Ertz + Darnell Mooney (1339,7090) | my points 87.6 | their points -93.8 | likelihood 0.85
c8 | partnerId 10 | I give MarShawn Lloyd (11581) | I get Zach Charbonnet (9753) | my points 25.5 | their points -68.2 | likelihood 0.86
c9 | partnerId 7 | I give Jared Goff (3163) | I get Isaiah Likely + Travis Etienne (8131,7543) | my points 38.6 | their points 18.7 | likelihood 0.88
c10 | partnerId 8 | I give Jared Goff + MarShawn Lloyd (3163,11581) | I get Quentin Johnston + Dalton Kincaid (9754,10236) | my points 54.4 | their points 15.4 | likelihood 0.77
c11 | partnerId 7 | I give Jared Goff + Mason Rudolph (3163,4972) | I get Chig Okonkwo + Travis Etienne (8210,7543) | my points 43.3 | their points 10.3 | likelihood 0.82
c12 | partnerId 4 | I give Jimmy Garoppolo (1837) | I get Malik Washington (11610) | my points 25.3 | their points -37.9 | likelihood 0.88

Pick the best trades for my team.

=========== CASE 1180653166811602944-w4-r10 ===========
REPLY FILE: /Users/anik/workspace/chrome/sleeper/.eval-market/replies/suggest-v2/heldout1/1180653166811602944-w4-r10.json
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
Lineup slots: QB, RB, RB, WR, WR, TE, FLEX, WRRB_FLEX, SUPER_FLEX, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN. Superflex: yes. Tight end premium: no. Points per reception: 1.
Columns: id | name | position | age | team | market value | projected points for the rest of the regular season (and per week) | points per week over the last three weeks played | lineup value (points my lineup loses if this player is removed).

MY TEAM (partnerId me): record 3-0, rank 1, points for 429.2, contention window 1
4034 | Christian McCaffrey | RB | age 30 | SF | market 4588 | projected 233.1 (21.2 a week) | last 3 weeks 23.3 a week | lineup value 141.4
6904 | Jalen Hurts | QB | age 28 | PHI | market 5740 | projected 207.4 (18.9 a week) | last 3 weeks 21 a week | lineup value 49.8
11564 | Drake Maye | QB | age 24 | NE | market 7110 | projected 194.5 (17.7 a week) | last 3 weeks 20.4 a week | lineup value 35.7
8138 | James Cook | RB | age 27 | BUF | market 4874 | projected 176 (16 a week) | last 3 weeks 22.5 a week | lineup value 83
6804 | Jordan Love | QB | age 27 | GB | market 4775 | projected 168.1 (15.3 a week) | last 3 weeks 16.3 a week | lineup value 17.6
7588 | Javonte Williams | RB | age 26 | DAL | market 4006 | projected 163.3 (14.8 a week) | last 3 weeks 18.9 a week | lineup value 70.7
12526 | Tetairoa McMillan | WR | age 23 | CAR | market 4740 | projected 138.6 (12.6 a week) | last 3 weeks 11.9 a week | lineup value 48.8
10229 | Rashee Rice | WR | age 26 | KC | market 4432 | projected 121.7 (11.1 a week) | last 3 weeks 0 a week | lineup value 59.1
7002 | Juwan Johnson | TE | age 30 | NO | market 3128 | projected 100.3 (9.1 a week) | last 3 weeks 9 a week | lineup value 17.7
9753 | Zach Charbonnet | RB | age 25 | SEA | market 3169 | projected 98.4 (8.9 a week) | last 3 weeks 3.9 a week | lineup value 9.6
4217 | George Kittle | TE | age 33 | SF | market 3154 | projected 95.8 (8.7 a week) | last 3 weeks 4.2 a week | lineup value 31.3
11627 | Troy Franklin | WR | age 23 | DEN | market 3039 | projected 91 (8.3 a week) | last 3 weeks 11.7 a week | lineup value 4.6
11597 | Theo Johnson | TE | age 25 | NYG | market 3224 | projected 80.8 (7.3 a week) | last 3 weeks 3.6 a week | lineup value 0.3
8183 | Brock Purdy | QB | age 26 | SF | market 5182 | projected 74.5 (6.8 a week) | last 3 weeks 6.3 a week | lineup value 1.9
9508 | Tyjae Spears | RB | age 25 | TEN | market 2949 | projected 74.1 (6.7 a week) | last 3 weeks 0 a week | lineup value 0.4
8132 | Tyler Allgeier | RB | age 26 | ARI | market 3181 | projected 70.6 (6.4 a week) | last 3 weeks 6.3 a week | lineup value 0
11626 | Xavier Legette | WR | age 25 | CAR | market 0 | projected 61.7 (5.6 a week) | last 3 weeks 1.6 a week | lineup value 0
8167 | Christian Watson | WR | age 27 | GB | market 3678 | projected 60.4 (5.5 a week) | last 3 weeks 0 a week | lineup value 3.8
12484 | Jayden Higgins | WR | age 23 | HOU | market 3452 | projected 60.2 (5.5 a week) | last 3 weeks 3.5 a week | lineup value 1.3
12502 | Gunnar Helm | TE | age 24 | TEN | market 3257 | projected 49.1 (4.5 a week) | last 3 weeks 3.7 a week | lineup value 0
4981 | Calvin Ridley | WR | age 31 | TEN | market 2288 | projected 40.8 (3.7 a week) | last 3 weeks 6.4 a week | lineup value 3.5
12492 | Pat Bryant | WR | age 23 | DEN | market 3022 | projected 40.2 (3.7 a week) | last 3 weeks 1.3 a week | lineup value 0
6826 | Cole Kmet | TE | age 27 | CHI | market 0 | projected 39.6 (3.6 a week) | last 3 weeks 5.7 a week | lineup value 0
12497 | Tory Horton | WR | age 23 | SEA | market 2798 | projected 34 (3.1 a week) | last 3 weeks 9.8 a week | lineup value 0
11575 | Ray Davis | RB | age 26 | BUF | market 2486 | projected 31.7 (2.9 a week) | last 3 weeks 1.2 a week | lineup value 0
8188 | Tyquan Thornton | WR | age 26 | KC | market 0 | projected 30.6 (2.8 a week) | last 3 weeks 0 a week | lineup value 0
12504 | Kaleb Johnson | RB | age 23 | GB | market 2730 | projected 17.9 (1.6 a week) | last 3 weeks -0.4 a week | lineup value 0
3321 | Tyreek Hill | WR | age 31 | FA | market 2532 | projected 14 (1.3 a week) | last 3 weeks 13.6 a week | lineup value 3.5
12467 | Jordan James | RB | age 22 | SF | market 2519 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0

PARTNER (partnerId 9): record 1-2, rank 8, points for 258.8, contention window 0.11
4943 | Sam Darnold | QB | age 29 | SEA | market 4056 | projected 162.7 (14.8 a week) | last 3 weeks 13 a week | lineup value 119.6
9997 | Zay Flowers | WR | age 26 | BAL | market 4197 | projected 145.2 (13.2 a week) | last 3 weeks 15.4 a week | lineup value 39.7
6819 | Michael Pittman | WR | age 29 | PIT | market 2998 | projected 128.4 (11.7 a week) | last 3 weeks 15.8 a week | lineup value 22.7
5872 | Deebo Samuel | WR | age 30 | SF | market 2710 | projected 120.9 (11 a week) | last 3 weeks 15 a week | lineup value 25.2
8134 | Khalil Shakir | WR | age 26 | BUF | market 3147 | projected 118.4 (10.8 a week) | last 3 weeks 9.7 a week | lineup value 14
8110 | Jake Ferguson | TE | age 27 | DAL | market 3467 | projected 115.6 (10.5 a week) | last 3 weeks 15.1 a week | lineup value 12.5
11624 | Xavier Worthy | WR | age 23 | KC | market 3501 | projected 114.8 (10.4 a week) | last 3 weeks 0 a week | lineup value 9.5
1466 | Travis Kelce | TE | age 37 | KC | market 2874 | projected 110.6 (10.1 a week) | last 3 weeks 9.8 a week | lineup value 7.4
6783 | Jerry Jeudy | WR | age 27 | CLE | market 2710 | projected 96.5 (8.8 a week) | last 3 weeks 7.8 a week | lineup value 1.3
5012 | Mark Andrews | TE | age 31 | BAL | market 3111 | projected 94.4 (8.6 a week) | last 3 weeks 10 a week | lineup value 1.2
9500 | Josh Downs | WR | age 25 | IND | market 3353 | projected 83.8 (7.6 a week) | last 3 weeks 6.6 a week | lineup value 1.2
11610 | Malik Washington | WR | age 25 | MIA | market 2743 | projected 80.2 (7.3 a week) | last 3 weeks 6.9 a week | lineup value 0
4144 | Jonnu Smith | TE | age 31 | GB | market 0 | projected 77.4 (7 a week) | last 3 weeks 7.8 a week | lineup value 0
4988 | Nick Chubb | RB | age 30 | FA | market 1793 | projected 72.9 (6.6 a week) | last 3 weeks 9.4 a week | lineup value 49.5
11562 | Spencer Rattler | QB | age 26 | NO | market 0 | projected 71.5 (6.5 a week) | last 3 weeks 15 a week | lineup value 28.4
12476 | Devin Neal | RB | age 23 | WAS | market 2789 | projected 47.1 (4.3 a week) | last 3 weeks 0.3 a week | lineup value 23.7
12495 | Ollie Gordon | RB | age 22 | MIA | market 0 | projected 46.9 (4.3 a week) | last 3 weeks 4.5 a week | lineup value 23.5
11625 | Adonai Mitchell | WR | age 24 | NYJ | market 2999 | projected 40.9 (3.7 a week) | last 3 weeks 2.7 a week | lineup value 0
2216 | Mike Evans | WR | age 33 | SF | market 3201 | projected 15.4 (1.4 a week) | last 3 weeks 11.3 a week | lineup value 6
12511 | Will Howard | QB | age 25 | PIT | market 0 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0
4018 | Joe Mixon | RB | age 30 | FA | market 2254 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0
4663 | Austin Ekeler | RB | age 31 | WAS | market 0 | projected 0 (0 a week) | last 3 weeks 4.4 a week | lineup value 0

PARTNER (partnerId 7): record 2-1, rank 5, points for 395.5, contention window 0.58
6797 | Justin Herbert | QB | age 28 | LAC | market 5456 | projected 193.9 (17.6 a week) | last 3 weeks 20.1 a week | lineup value 72.7
7547 | Amon-Ra St. Brown | WR | age 26 | DET | market 5327 | projected 190.6 (17.3 a week) | last 3 weeks 22.8 a week | lineup value 56.5
3198 | Derrick Henry | RB | age 32 | BAL | market 4124 | projected 167 (15.2 a week) | last 3 weeks 13.1 a week | lineup value 34.1
4866 | Saquon Barkley | RB | age 29 | PHI | market 4219 | projected 164.6 (15 a week) | last 3 weeks 15.1 a week | lineup value 31.3
7564 | Ja'Marr Chase | WR | age 26 | CIN | market 5808 | projected 163.1 (14.8 a week) | last 3 weeks 16.3 a week | lineup value 41
6794 | Justin Jefferson | WR | age 27 | MIN | market 4841 | projected 153.5 (14 a week) | last 3 weeks 12.8 a week | lineup value 20.4
6786 | CeeDee Lamb | WR | age 27 | DAL | market 4946 | projected 133.3 (12.1 a week) | last 3 weeks 12.7 a week | lineup value 40.5
7021 | Rico Dowdle | RB | age 28 | PIT | market 3228 | projected 132.8 (12.1 a week) | last 3 weeks 5.8 a week | lineup value 12.3
5859 | A.J. Brown | WR | age 29 | NE | market 4333 | projected 129.7 (11.8 a week) | last 3 weeks 10.8 a week | lineup value 9.4
8228 | Jaylen Warren | RB | age 27 | PIT | market 3526 | projected 120.9 (11 a week) | last 3 weeks 14.8 a week | lineup value 5.8
5947 | Jakobi Meyers | WR | age 29 | JAX | market 3307 | projected 109 (9.9 a week) | last 3 weeks 13.3 a week | lineup value 1.2
5022 | Dallas Goedert | TE | age 31 | PHI | market 3132 | projected 103.4 (9.4 a week) | last 3 weeks 7.2 a week | lineup value 12.2
6806 | J.K. Dobbins | RB | age 27 | DEN | market 3293 | projected 89.4 (8.1 a week) | last 3 weeks 15.2 a week | lineup value 2.3
5844 | T.J. Hockenson | TE | age 29 | MIN | market 2969 | projected 85.1 (7.7 a week) | last 3 weeks 7.5 a week | lineup value 0
7527 | Mac Jones | QB | age 28 | SF | market 1643 | projected 80.2 (7.3 a week) | last 3 weeks 11.3 a week | lineup value 3.7
10859 | Sam LaPorta | TE | age 25 | DET | market 4261 | projected 72.8 (6.6 a week) | last 3 weeks 8.9 a week | lineup value 15.5
9504 | Kayshon Boutte | WR | age 24 | HOU | market 2978 | projected 67.6 (6.1 a week) | last 3 weeks 4.5 a week | lineup value 0
12490 | Bhayshul Tuten | RB | age 23 | JAX | market 4211 | projected 65.5 (6 a week) | last 3 weeks 8.2 a week | lineup value 0
12517 | Colston Loveland | TE | age 22 | CHI | market 5269 | projected 65.4 (5.9 a week) | last 3 weeks 2.4 a week | lineup value 0
4950 | Christian Kirk | WR | age 29 | SF | market 2207 | projected 57.1 (5.2 a week) | last 3 weeks 1.8 a week | lineup value 0
3161 | Carson Wentz | QB | age 33 | MIN | market 0 | projected 57 (5.2 a week) | last 3 weeks 0 a week | lineup value 1.5
7594 | Chuba Hubbard | RB | age 27 | CAR | market 3340 | projected 56 (5.1 a week) | last 3 weeks 15.4 a week | lineup value 0

PARTNER (partnerId 3): record 1-2, rank 6, points for 383.6, contention window 0.42
9509 | Bijan Robinson | RB | age 24 | ATL | market 6365 | projected 201.6 (18.3 a week) | last 3 weeks 20.1 a week | lineup value 78.1
5870 | Daniel Jones | QB | age 29 | IND | market 3540 | projected 167.6 (15.2 a week) | last 3 weeks 22.7 a week | lineup value 31.3
11560 | Caleb Williams | QB | age 24 | CHI | market 6547 | projected 161.5 (14.7 a week) | last 3 weeks 23.8 a week | lineup value 21.5
8155 | Breece Hall | RB | age 25 | NYJ | market 4244 | projected 143.8 (13.1 a week) | last 3 weeks 10.5 a week | lineup value 25.6
9224 | Chase Brown | RB | age 26 | CIN | market 4495 | projected 139.2 (12.7 a week) | last 3 weeks 8.9 a week | lineup value 18.3
9228 | Bryce Young | QB | age 25 | CAR | market 3983 | projected 135.3 (12.3 a week) | last 3 weeks 14 a week | lineup value 8.7
5846 | DK Metcalf | WR | age 28 | PIT | market 3453 | projected 131.4 (11.9 a week) | last 3 weeks 11.8 a week | lineup value 19.4
12518 | Tyler Warren | TE | age 24 | IND | market 4579 | projected 126.7 (11.5 a week) | last 3 weeks 11.2 a week | lineup value 26
12529 | TreVeyon Henderson | RB | age 23 | NE | market 4323 | projected 120.3 (10.9 a week) | last 3 weeks 8.3 a week | lineup value 9
11620 | Rome Odunze | WR | age 24 | CHI | market 4067 | projected 116.3 (10.6 a week) | last 3 weeks 20.9 a week | lineup value 9.9
12474 | Woody Marks | RB | age 25 | HOU | market 3124 | projected 114.1 (10.4 a week) | last 3 weeks 3.7 a week | lineup value 3.7
7553 | Kyle Pitts | TE | age 26 | ATL | market 3972 | projected 96.9 (8.8 a week) | last 3 weeks 9.5 a week | lineup value 11
8112 | Drake London | WR | age 25 | ATL | market 4882 | projected 92.6 (8.4 a week) | last 3 weeks 9.6 a week | lineup value 14.9
11631 | Brian Thomas | WR | age 24 | JAX | market 3947 | projected 92.4 (8.4 a week) | last 3 weeks 8.5 a week | lineup value 12.8
11637 | Keon Coleman | WR | age 23 | BUF | market 2742 | projected 70.6 (6.4 a week) | last 3 weeks 11.9 a week | lineup value 0.8
11655 | Tyrone Tracy | RB | age 26 | NYG | market 2973 | projected 69.7 (6.3 a week) | last 3 weeks 6.7 a week | lineup value 0.2
9484 | Tucker Kraft | TE | age 25 | GB | market 4164 | projected 59.6 (5.4 a week) | last 3 weeks 13.4 a week | lineup value 0.2
8146 | Garrett Wilson | WR | age 26 | NYJ | market 4235 | projected 59.3 (5.4 a week) | last 3 weeks 18.3 a week | lineup value 10.6
11435 | Emanuel Wilson | RB | age 27 | SEA | market 2467 | projected 59.1 (5.4 a week) | last 3 weeks 1 a week | lineup value 0
9494 | Marvin Mims | WR | age 24 | DEN | market 2732 | projected 54.4 (4.9 a week) | last 3 weeks 4.3 a week | lineup value 0
11646 | Jalen Coker | WR | age 24 | CAR | market 3278 | projected 48.2 (4.4 a week) | last 3 weeks 0 a week | lineup value 0
5955 | Hunter Renfrow | WR | age 30 | FA | market 1336 | projected 23 (2.1 a week) | last 3 weeks 0.9 a week | lineup value 0

PARTNER (partnerId 1): record 0-3, rank 9, points for 327.7, contention window 0
9221 | Jahmyr Gibbs | RB | age 24 | DET | market 6357 | projected 203.4 (18.5 a week) | last 3 weeks 20.4 a week | lineup value 107.2
3294 | Dak Prescott | QB | age 33 | DAL | market 4606 | projected 191.4 (17.4 a week) | last 3 weeks 14.7 a week | lineup value 96.9
11563 | Bo Nix | QB | age 26 | DEN | market 5420 | projected 179.8 (16.3 a week) | last 3 weeks 14.2 a week | lineup value 85.4
8144 | Chris Olave | WR | age 26 | NO | market 4432 | projected 147.2 (13.4 a week) | last 3 weeks 13.2 a week | lineup value 46
11635 | Ladd McConkey | WR | age 24 | LAC | market 4617 | projected 139.5 (12.7 a week) | last 3 weeks 10.4 a week | lineup value 37.2
8676 | Rashid Shaheed | WR | age 28 | SEA | market 2688 | projected 108.7 (9.9 a week) | last 3 weeks 10.9 a week | lineup value 2.8
9756 | Jordan Addison | WR | age 24 | MIN | market 3620 | projected 104.8 (9.5 a week) | last 3 weeks 0 a week | lineup value 10
7049 | Jauan Jennings | WR | age 29 | MIN | market 2838 | projected 101.4 (9.2 a week) | last 3 weeks 7.8 a week | lineup value 12.5
8408 | Jordan Mason | RB | age 27 | MIN | market 3056 | projected 98.7 (9 a week) | last 3 weeks 12.6 a week | lineup value 12.4
12489 | RJ Harvey | RB | age 25 | DEN | market 3713 | projected 93.1 (8.5 a week) | last 3 weeks 5.3 a week | lineup value 11
4098 | Kareem Hunt | RB | age 30 | FA | market 1804 | projected 91.9 (8.4 a week) | last 3 weeks 6.5 a week | lineup value 9.2
12481 | Cam Skattebo | RB | age 24 | NYG | market 4201 | projected 73.3 (6.7 a week) | last 3 weeks 13.6 a week | lineup value 19.8
7611 | Rhamondre Stevenson | RB | age 28 | NE | market 3324 | projected 68.9 (6.3 a week) | last 3 weeks 9.5 a week | lineup value 1.9
4219 | Jeremy McNichols | RB | age 30 | WAS | market 0 | projected 62.6 (5.7 a week) | last 3 weeks 5.4 a week | lineup value 0
4037 | Chris Godwin | WR | age 30 | TB | market 3097 | projected 47.5 (4.3 a week) | last 3 weeks 0 a week | lineup value 1.8
9480 | Brenton Strange | TE | age 25 | JAX | market 3638 | projected 46 (4.2 a week) | last 3 weeks 8.9 a week | lineup value 40.9
4040 | JuJu Smith-Schuster | WR | age 29 | FA | market 1349 | projected 44.2 (4 a week) | last 3 weeks 3.7 a week | lineup value 0
2197 | Brandin Cooks | WR | age 33 | SF | market 0 | projected 41.2 (3.7 a week) | last 3 weeks 5.2 a week | lineup value 0
11630 | Roman Wilson | WR | age 25 | PIT | market 0 | projected 38.9 (3.5 a week) | last 3 weeks 0.6 a week | lineup value 0
5927 | Terry McLaurin | WR | age 31 | WAS | market 3406 | projected 36.1 (3.3 a week) | last 3 weeks 8.3 a week | lineup value 4.4
4351 | Tim Patrick | WR | age 32 | NYJ | market 0 | projected 23.1 (2.1 a week) | last 3 weeks 0.9 a week | lineup value 0
12457 | Jaydon Blue | RB | age 22 | PHI | market 2754 | projected 13.5 (1.2 a week) | last 3 weeks 0 a week | lineup value 0

CANDIDATE DEALS (from a rules-based finder; points are the finder projections for the rest of the season):
c1 | partnerId 9 | I give Gunnar Helm (12502) | I get Deebo Samuel + Michael Pittman (5872,6819) | my points 46.7 | their points -53.3 | likelihood 0.91
c2 | partnerId 7 | I give Brock Purdy (8183) | I get Saquon Barkley + A.J. Brown (4866,5859) | my points 87.1 | their points -16 | likelihood 0.91
c3 | partnerId 7 | I give Brock Purdy + Ray Davis (8183,11575) | I get Derrick Henry + A.J. Brown (3198,5859) | my points 88.5 | their points -18.8 | likelihood 0.91
c4 | partnerId 7 | I give Brock Purdy + Tory Horton (8183,12497) | I get Saquon Barkley + Derrick Henry (4866,3198) | my points 91 | their points -44.8 | likelihood 0.88
c5 | partnerId 9 | I give Pat Bryant (12492) | I get Deebo Samuel (5872) | my points 29.8 | their points -25.2 | likelihood 0.94
c6 | partnerId 3 | I give Brock Purdy + Pat Bryant (8183,12492) | I get Breece Hall + Tyler Warren (8155,12518) | my points 58.7 | their points -45.9 | likelihood 0.75
c7 | partnerId 3 | I give Brock Purdy (8183) | I get Breece Hall + Chase Brown (8155,9224) | my points 59.9 | their points -47.7 | likelihood 0.8
c8 | partnerId 1 | I give Pat Bryant + Tyler Allgeier (12492,8132) | I get Jordan Mason (8408) | my points 17.3 | their points -12.4 | likelihood 0.69

Pick the best trades for my team.

=========== CASE 1180663903803871232-w10-r1 ===========
REPLY FILE: /Users/anik/workspace/chrome/sleeper/.eval-market/replies/suggest-v2/heldout1/1180663903803871232-w10-r1.json
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
League: keeper, 14 teams, week 10, 5 regular season weeks left, playoffs start week 15
Lineup slots: QB, RB, WR, WR, TE, FLEX, FLEX, K, DEF, BN, BN, BN, BN, BN, BN, BN, BN. Superflex: no. Tight end premium: no. Points per reception: 1.
Columns: id | name | position | age | team | market value | projected points for the rest of the regular season (and per week) | points per week over the last three weeks played | lineup value (points my lineup loses if this player is removed).

MY TEAM (partnerId me): record 8-1, rank 1, points for 1215.1, contention window 1
4046 | Patrick Mahomes | QB | age 31 | KC | market 4324 | projected 110.6 (22.1 a week) | last 3 weeks 26.7 a week | lineup value 6.5
9221 | Jahmyr Gibbs | RB | age 24 | DET | market 6366 | projected 108.6 (21.7 a week) | last 3 weeks 14.2 a week | lineup value 50.9
3294 | Dak Prescott | QB | age 33 | DAL | market 4263 | projected 107.3 (21.5 a week) | last 3 weeks 20.1 a week | lineup value 3.2
7569 | Nico Collins | WR | age 27 | HOU | market 4429 | projected 80.1 (16 a week) | last 3 weeks 7.1 a week | lineup value 22.4
12545 | Tyler Shough | QB | age 27 | NO | market 3874 | projected 79.3 (15.9 a week) | last 3 weeks 4.3 a week | lineup value 18
8150 | Kyren Williams | RB | age 26 | LAR | market 4550 | projected 72.1 (14.4 a week) | last 3 weeks 8.6 a week | lineup value 14.3
5846 | DK Metcalf | WR | age 28 | PIT | market 3435 | projected 63.4 (12.7 a week) | last 3 weeks 9 a week | lineup value 5.7
8148 | Jameson Williams | WR | age 25 | DET | market 4089 | projected 62.8 (12.6 a week) | last 3 weeks 5.5 a week | lineup value 5
DEN | Denver Broncos | DEF | age ? | DEN | market 0 | projected 55.3 (11.1 a week) | last 3 weeks 10 a week | lineup value 21.6
7567 | Kenny Gainwell | RB | age 27 | TB | market 3129 | projected 53 (10.6 a week) | last 3 weeks 4.8 a week | lineup value 0.7
4983 | DJ Moore | WR | age 29 | BUF | market 3647 | projected 48.3 (9.7 a week) | last 3 weeks 14.9 a week | lineup value 0
3678 | Wil Lutz | K | age 32 | DEN | market 0 | projected 46.9 (9.4 a week) | last 3 weeks 9.2 a week | lineup value 46.9
MIN | Minnesota Vikings | DEF | age ? | MIN | market 0 | projected 43.8 (8.8 a week) | last 3 weeks 6.7 a week | lineup value 10
5844 | T.J. Hockenson | TE | age 29 | MIN | market 2958 | projected 41.8 (8.4 a week) | last 3 weeks 8 a week | lineup value 7.6
4144 | Jonnu Smith | TE | age 31 | GB | market 0 | projected 34.2 (6.8 a week) | last 3 weeks 1.2 a week | lineup value 0
11646 | Jalen Coker | WR | age 24 | CAR | market 3266 | projected 30.2 (6 a week) | last 3 weeks 2.8 a week | lineup value 0
5927 | Terry McLaurin | WR | age 31 | WAS | market 3389 | projected 24.2 (4.8 a week) | last 3 weeks 4.8 a week | lineup value 0.3
4035 | Alvin Kamara | RB | age 31 | NO | market 2506 | projected 23.9 (4.8 a week) | last 3 weeks 4.4 a week | lineup value 0.4
9484 | Tucker Kraft | TE | age 25 | GB | market 4154 | projected 0 (0 a week) | last 3 weeks 18 a week | lineup value 0

PARTNER (partnerId 2): record 1-8, rank 14, points for 812.8, contention window 0
1373 | Geno Smith | QB | age 36 | NYJ | market 2176 | projected 103.2 (20.6 a week) | last 3 weeks 12.4 a week | lineup value 103.2
8228 | Jaylen Warren | RB | age 27 | PIT | market 3535 | projected 69.5 (13.9 a week) | last 3 weeks 15.3 a week | lineup value 16.5
12474 | Woody Marks | RB | age 25 | HOU | market 3142 | projected 65.4 (13.1 a week) | last 3 weeks 10.1 a week | lineup value 12.5
7021 | Rico Dowdle | RB | age 28 | PIT | market 3260 | projected 64.1 (12.8 a week) | last 3 weeks 14.7 a week | lineup value 19.2
4199 | Aaron Jones | RB | age 31 | MIN | market 2797 | projected 57.2 (11.4 a week) | last 3 weeks 5.6 a week | lineup value 4.3
9756 | Jordan Addison | WR | age 24 | MIN | market 3611 | projected 52 (10.4 a week) | last 3 weeks 13.9 a week | lineup value 11.1
PHI | Philadelphia Eagles | DEF | age ? | PHI | market 0 | projected 49.4 (9.9 a week) | last 3 weeks 9 a week | lineup value 21.4
6783 | Jerry Jeudy | WR | age 27 | CLE | market 2690 | projected 42.3 (8.5 a week) | last 3 weeks 1.2 a week | lineup value 1.3
9487 | Parker Washington | WR | age 24 | JAX | market 4015 | projected 39.6 (7.9 a week) | last 3 weeks 5.7 a week | lineup value 6.6
10444 | Cedric Tillman | WR | age 26 | NO | market 0 | projected 37.6 (7.5 a week) | last 3 weeks 0 a week | lineup value 0
PIT | Pittsburgh Steelers | DEF | age ? | PIT | market 0 | projected 36.3 (7.3 a week) | last 3 weeks 7.7 a week | lineup value 8.3
4066 | Evan Engram | TE | age 32 | DEN | market 0 | projected 32.8 (6.6 a week) | last 3 weeks 5.6 a week | lineup value 4.1
7600 | Pat Freiermuth | TE | age 27 | PIT | market 2344 | projected 30.8 (6.2 a week) | last 3 weeks 0 a week | lineup value 6.4
3200 | Sterling Shepard | WR | age 33 | NYJ | market 1655 | projected 27.6 (5.5 a week) | last 3 weeks 3.1 a week | lineup value 0
9511 | Keaton Mitchell | RB | age 24 | LAC | market 2859 | projected 24.8 (5 a week) | last 3 weeks 0.9 a week | lineup value 0
9501 | DeMario Douglas | WR | age 25 | NE | market 0 | projected 24.1 (4.8 a week) | last 3 weeks 10.1 a week | lineup value 0
12469 | Dylan Sampson | RB | age 22 | CLE | market 3278 | projected 21 (4.2 a week) | last 3 weeks 0 a week | lineup value 0
9494 | Marvin Mims | WR | age 24 | DEN | market 2740 | projected 17 (3.4 a week) | last 3 weeks 5.9 a week | lineup value 0
2505 | Darren Waller | TE | age 34 | CAR | market 1416 | projected 16.3 (3.3 a week) | last 3 weeks 0 a week | lineup value 0.4
2216 | Mike Evans | WR | age 33 | SF | market 3188 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0

PARTNER (partnerId 10): record 4-5, rank 11, points for 1090.2, contention window 0.12
4892 | Baker Mayfield | QB | age 31 | TB | market 3770 | projected 121.3 (24.3 a week) | last 3 weeks 7 a week | lineup value 0.6
421 | Matthew Stafford | QB | age 38 | LAR | market 3626 | projected 120.4 (24.1 a week) | last 3 weeks 25.6 a week | lineup value 2
10213 | Tre Tucker | WR | age 25 | LV | market 2698 | projected 54.2 (10.8 a week) | last 3 weeks 5 a week | lineup value 26.5
12508 | Jaxson Dart | QB | age 23 | NYG | market 5347 | projected 51.3 (10.3 a week) | last 3 weeks 31.3 a week | lineup value 1.7
5001 | Dalton Schultz | TE | age 30 | HOU | market 3164 | projected 48.5 (9.7 a week) | last 3 weeks 12.3 a week | lineup value 26.3
ATL | Atlanta Falcons | DEF | age ? | ATL | market 0 | projected 47.4 (9.5 a week) | last 3 weeks 10 a week | lineup value 16.4
NYJ | New York Jets | DEF | age ? | NYJ | market 0 | projected 47.3 (9.5 a week) | last 3 weeks 4.3 a week | lineup value 16.3
8110 | Jake Ferguson | TE | age 27 | DAL | market 3459 | projected 44.1 (8.8 a week) | last 3 weeks 10 a week | lineup value 21.9
4039 | Cooper Kupp | WR | age 33 | SEA | market 2095 | projected 43.4 (8.7 a week) | last 3 weeks 0.7 a week | lineup value 15.7
19 | Joe Flacco | QB | age 41 | CIN | market 0 | projected 38.9 (7.8 a week) | last 3 weeks 36.4 a week | lineup value 0
8125 | Calvin Austin | WR | age 27 | NYG | market 0 | projected 38.1 (7.6 a week) | last 3 weeks 5.8 a week | lineup value 10.3
11638 | Ricky Pearsall | WR | age 26 | SF | market 2208 | projected 31.4 (6.3 a week) | last 3 weeks 0 a week | lineup value 9.2
7594 | Chuba Hubbard | RB | age 27 | CAR | market 3362 | projected 16.1 (3.2 a week) | last 3 weeks 6.2 a week | lineup value 1.7
7611 | Rhamondre Stevenson | RB | age 28 | NE | market 3352 | projected 16 (3.2 a week) | last 3 weeks 7.6 a week | lineup value 9.1
8146 | Garrett Wilson | WR | age 26 | NYJ | market 4209 | projected 14.6 (2.9 a week) | last 3 weeks 0 a week | lineup value 9
6806 | J.K. Dobbins | RB | age 27 | DEN | market 3330 | projected 11.4 (2.3 a week) | last 3 weeks 10 a week | lineup value 5.8
12412 | Terrell Jennings | RB | age 25 | FA | market 0 | projected 8.8 (1.8 a week) | last 3 weeks 3.8 a week | lineup value 0

PARTNER (partnerId 7): record 5-4, rank 8, points for 1127.6, contention window 0.45
8138 | James Cook | RB | age 27 | BUF | market 4896 | projected 89.9 (18 a week) | last 3 weeks 15.7 a week | lineup value 40
12512 | Quinshon Judkins | RB | age 22 | CLE | market 4391 | projected 70.3 (14.1 a week) | last 3 weeks 10.4 a week | lineup value 20.3
10229 | Rashee Rice | WR | age 26 | KC | market 4416 | projected 70.2 (14 a week) | last 3 weeks 22.4 a week | lineup value 32.2
2307 | Marcus Mariota | QB | age 32 | WAS | market 0 | projected 67.2 (13.4 a week) | last 3 weeks 5.1 a week | lineup value 7.2
CLE | Cleveland Browns | DEF | age ? | CLE | market 0 | projected 67.1 (13.4 a week) | last 3 weeks 14 a week | lineup value 25.9
5045 | Courtland Sutton | WR | age 31 | DEN | market 3184 | projected 50.1 (10 a week) | last 3 weeks 12.5 a week | lineup value 10.2
6770 | Joe Burrow | QB | age 29 | CIN | market 5351 | projected 45.8 (9.2 a week) | last 3 weeks 0 a week | lineup value 4.3
12493 | Oronde Gadsden | TE | age 23 | LAC | market 4194 | projected 45.5 (9.1 a week) | last 3 weeks 20 a week | lineup value 10.1
8676 | Rashid Shaheed | WR | age 28 | SEA | market 2690 | projected 43.6 (8.7 a week) | last 3 weeks 11.4 a week | lineup value 0
SF | San Francisco 49ers | DEF | age ? | SF | market 0 | projected 43.2 (8.6 a week) | last 3 weeks 8.7 a week | lineup value 1.9
9758 | C.J. Stroud | QB | age 25 | HOU | market 4047 | projected 40.4 (8.1 a week) | last 3 weeks 17.3 a week | lineup value 0
11627 | Troy Franklin | WR | age 23 | DEN | market 3029 | projected 39.9 (8 a week) | last 3 weeks 16 a week | lineup value 0
11559 | Michael Penix | QB | age 26 | ATL | market 2672 | projected 38.3 (7.7 a week) | last 3 weeks 15.9 a week | lineup value 0
12476 | Devin Neal | RB | age 23 | WAS | market 2801 | projected 35.9 (7.2 a week) | last 3 weeks 2.1 a week | lineup value 3.7
4033 | David Njoku | TE | age 30 | LAC | market 2845 | projected 33.8 (6.8 a week) | last 3 weeks 4.6 a week | lineup value 0
6130 | Devin Singletary | RB | age 29 | NYG | market 0 | projected 33.6 (6.7 a week) | last 3 weeks 2.4 a week | lineup value 0.1
8112 | Drake London | WR | age 25 | ATL | market 4857 | projected 33.5 (6.7 a week) | last 3 weeks 15.7 a week | lineup value 13.1
9480 | Brenton Strange | TE | age 25 | JAX | market 3623 | projected 29.2 (5.8 a week) | last 3 weeks 0 a week | lineup value 1.7
6149 | Darius Slayton | WR | age 29 | IND | market 0 | projected 28.4 (5.7 a week) | last 3 weeks 5.3 a week | lineup value 1.5
5189 | Eddy Pineiro | K | age 31 | SF | market 0 | projected 23.2 (4.6 a week) | last 3 weeks 6.2 a week | lineup value 23.2

PARTNER (partnerId 9): record 5-4, rank 7, points for 1143.7, contention window 0.55
3163 | Jared Goff | QB | age 32 | DET | market 4076 | projected 122.7 (24.5 a week) | last 3 weeks 13.7 a week | lineup value 35.3
9509 | Bijan Robinson | RB | age 24 | ATL | market 6366 | projected 102 (20.4 a week) | last 3 weeks 14.9 a week | lineup value 46.4
5870 | Daniel Jones | QB | age 29 | IND | market 3235 | projected 87.7 (17.5 a week) | last 3 weeks 26.8 a week | lineup value 0.3
2133 | Davante Adams | WR | age 33 | LAR | market 3373 | projected 77.6 (15.5 a week) | last 3 weeks 16.5 a week | lineup value 21.9
9997 | Zay Flowers | WR | age 26 | BAL | market 4180 | projected 73.2 (14.6 a week) | last 3 weeks 8.5 a week | lineup value 17.6
LAR | Los Angeles Rams | DEF | age ? | LAR | market 0 | projected 60.9 (12.2 a week) | last 3 weeks 10 a week | lineup value 60.9
5892 | David Montgomery | RB | age 29 | HOU | market 3463 | projected 55.3 (11.1 a week) | last 3 weeks 5.6 a week | lineup value 2.2
8126 | Wan'Dale Robinson | WR | age 25 | TEN | market 3416 | projected 52.4 (10.5 a week) | last 3 weeks 12.3 a week | lineup value 6.4
11647 | Kimani Vidal | RB | age 25 | LAC | market 2813 | projected 52 (10.4 a week) | last 3 weeks 10.1 a week | lineup value 7.5
7090 | Darnell Mooney | WR | age 28 | NYG | market 2370 | projected 49.6 (9.9 a week) | last 3 weeks 4.8 a week | lineup value 0.1
12485 | Tez Johnson | WR | age 24 | TB | market 0 | projected 41.2 (8.2 a week) | last 3 weeks 8.4 a week | lineup value 0
11834 | Devaughn Vele | WR | age 28 | NO | market 2274 | projected 31.4 (6.3 a week) | last 3 weeks 0 a week | lineup value 0
4381 | Taysom Hill | TE | age 35 | FA | market 1529 | projected 23.1 (4.6 a week) | last 3 weeks 2.7 a week | lineup value 16.6
11637 | Keon Coleman | WR | age 23 | BUF | market 2736 | projected 20.1 (4 a week) | last 3 weeks 3.2 a week | lineup value 0
4147 | Samaje Perine | RB | age 31 | CIN | market 0 | projected 14.6 (2.9 a week) | last 3 weeks 0.2 a week | lineup value 0
10859 | Sam LaPorta | TE | age 25 | DET | market 4254 | projected 13 (2.6 a week) | last 3 weeks 8.7 a week | lineup value 6.5
12481 | Cam Skattebo | RB | age 24 | NYG | market 4223 | projected 0 (0 a week) | last 3 weeks 9.5 a week | lineup value 0
11789 | Joshua Karty | K | age 24 | FA | market 0 | projected 0 (0 a week) | last 3 weeks 5.3 a week | lineup value 0

PARTNER (partnerId 5): record 6-3, rank 3, points for 1232.4, contention window 0.98
6904 | Jalen Hurts | QB | age 28 | PHI | market 4958 | projected 136.8 (27.4 a week) | last 3 weeks 22.8 a week | lineup value 31.2
7523 | Trevor Lawrence | QB | age 27 | JAX | market 4592 | projected 105.6 (21.1 a week) | last 3 weeks 15.3 a week | lineup value 0
8130 | Trey McBride | TE | age 26 | ARI | market 4880 | projected 86.8 (17.4 a week) | last 3 weeks 15.3 a week | lineup value 48.6
9228 | Bryce Young | QB | age 25 | CAR | market 3582 | projected 78.2 (15.6 a week) | last 3 weeks 6 a week | lineup value 0
8134 | Khalil Shakir | WR | age 26 | BUF | market 3138 | projected 61.9 (12.4 a week) | last 3 weeks 10.7 a week | lineup value 15.3
11786 | Cam Little | K | age 23 | JAX | market 0 | projected 60.5 (12.1 a week) | last 3 weeks 7 a week | lineup value 60.5
7564 | Ja'Marr Chase | WR | age 26 | CIN | market 5774 | projected 57.9 (11.6 a week) | last 3 weeks 25.4 a week | lineup value 28.9
5947 | Jakobi Meyers | WR | age 29 | JAX | market 3297 | projected 54.7 (10.9 a week) | last 3 weeks 2.1 a week | lineup value 8.1
8136 | Rachaad White | RB | age 27 | WAS | market 2753 | projected 52.5 (10.5 a week) | last 3 weeks 5.5 a week | lineup value 12.8
JAX | Jacksonville Jaguars | DEF | age ? | JAX | market 0 | projected 51.9 (10.4 a week) | last 3 weeks 2.7 a week | lineup value 17
NE | New England Patriots | DEF | age ? | NE | market 0 | projected 46.6 (9.3 a week) | last 3 weeks 18.3 a week | lineup value 11.8
7049 | Jauan Jennings | WR | age 29 | MIN | market 2831 | projected 43.1 (8.6 a week) | last 3 weeks 9.9 a week | lineup value 5.5
11655 | Tyrone Tracy | RB | age 26 | NYG | market 2987 | projected 42.7 (8.5 a week) | last 3 weeks 8.2 a week | lineup value 4.7
1339 | Zach Ertz | TE | age 35 | PHI | market 0 | projected 41.5 (8.3 a week) | last 3 weeks 7.1 a week | lineup value 3.3
12486 | Dillon Gabriel | QB | age 25 | CLE | market 0 | projected 35 (7 a week) | last 3 weeks 8 a week | lineup value 0
5967 | Tony Pollard | RB | age 29 | TEN | market 3190 | projected 33.1 (6.6 a week) | last 3 weeks 8.7 a week | lineup value 0
11584 | Bucky Irving | RB | age 24 | TB | market 4304 | projected 29.6 (5.9 a week) | last 3 weeks 0 a week | lineup value 11.2
9225 | Tank Bigsby | RB | age 24 | PHI | market 2885 | projected 11.2 (2.2 a week) | last 3 weeks 0 a week | lineup value 0
12530 | Travis Hunter | DB | age 23 | JAX | market 0 | projected 0 (0 a week) | last 3 weeks 8 a week | lineup value 0

CANDIDATE DEALS (from a rules-based finder; points are the finder projections for the rest of the season):
c1 | partnerId 2 | I give Jalen Coker + Terry McLaurin (11646,5927) | I get Geno Smith + Rico Dowdle (1373,7021) | my points 17.1 | their points -115.7 | likelihood 0.86
c2 | partnerId 10 | I give DJ Moore (4983) | I get Jake Ferguson + Dalton Schultz (8110,5001) | my points 11.8 | their points -53 | likelihood 0.86
c3 | partnerId 10 | I give Tucker Kraft (9484) | I get Jake Ferguson + Baker Mayfield (8110,4892) | my points 18.9 | their points -22.6 | likelihood 0.9
c4 | partnerId 7 | I give Dak Prescott + Alvin Kamara (3294,4035) | I get Oronde Gadsden + Marcus Mariota (12493,2307) | my points 12 | their points 28.8 | likelihood 0.63
c5 | partnerId 9 | I give Jonnu Smith + Terry McLaurin (4144,5927) | I get Daniel Jones + Kimani Vidal (5870,11647) | my points 12.5 | their points 5.6 | likelihood 0.66
c6 | partnerId 10 | I give Jalen Coker + DJ Moore (11646,4983) | I get Jake Ferguson + Tre Tucker (8110,10213) | my points 11.7 | their points -26.1 | likelihood 0.79
c7 | partnerId 5 | I give Alvin Kamara + Kenny Gainwell (4035,7567) | I get Zach Ertz + Tony Pollard (1339,5967) | my points 6.7 | their points 7.2 | likelihood 0.56
c8 | partnerId 9 | I give Jonnu Smith + DJ Moore (4144,4983) | I get Davante Adams + Daniel Jones (2133,5870) | my points 22.2 | their points -10 | likelihood 0.62
c9 | partnerId 7 | I give Dak Prescott + Kenny Gainwell (3294,7567) | I get Oronde Gadsden + Brenton Strange (12493,9480) | my points 9.2 | their points 19.9 | likelihood 0.56
c10 | partnerId 9 | I give DJ Moore + Alvin Kamara (4983,4035) | I get Daniel Jones + Wan'Dale Robinson (5870,8126) | my points 11.2 | their points -2.5 | likelihood 0.64
c11 | partnerId 9 | I give Jonnu Smith + Jalen Coker (4144,11646) | I get Daniel Jones (5870) | my points 5.9 | their points 10 | likelihood 0.56

Pick the best trades for my team.

=========== CASE 1180663903803871232-w4-r3 ===========
REPLY FILE: /Users/anik/workspace/chrome/sleeper/.eval-market/replies/suggest-v2/heldout1/1180663903803871232-w4-r3.json
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
League: keeper, 14 teams, week 4, 11 regular season weeks left, playoffs start week 15
Lineup slots: QB, RB, WR, WR, TE, FLEX, FLEX, K, DEF, BN, BN, BN, BN, BN, BN, BN, BN. Superflex: no. Tight end premium: no. Points per reception: 1.
Columns: id | name | position | age | team | market value | projected points for the rest of the regular season (and per week) | points per week over the last three weeks played | lineup value (points my lineup loses if this player is removed).

MY TEAM (partnerId me): record 2-1, rank 6, points for 357.9, contention window 0.66
4943 | Sam Darnold | QB | age 29 | SEA | market 3723 | projected 217.5 (19.8 a week) | last 3 weeks 9.9 a week | lineup value 14.4
1373 | Geno Smith | QB | age 36 | NYJ | market 2179 | projected 206.1 (18.7 a week) | last 3 weeks 21 a week | lineup value 3.3
6794 | Justin Jefferson | WR | age 27 | MIN | market 4816 | projected 154 (14 a week) | last 3 weeks 12.8 a week | lineup value 76.9
8155 | Breece Hall | RB | age 25 | NYJ | market 4261 | projected 145.6 (13.2 a week) | last 3 weeks 10.5 a week | lineup value 67.5
7526 | Jaylen Waddle | WR | age 27 | DEN | market 4001 | projected 141.4 (12.9 a week) | last 3 weeks 13.2 a week | lineup value 64.9
6819 | Michael Pittman | WR | age 29 | PIT | market 2989 | projected 129.1 (11.7 a week) | last 3 weeks 15.8 a week | lineup value 51.8
12529 | TreVeyon Henderson | RB | age 23 | NE | market 4325 | projected 121.4 (11 a week) | last 3 weeks 8.3 a week | lineup value 47.7
11604 | Brock Bowers | TE | age 23 | LV | market 5529 | projected 110.7 (10.1 a week) | last 3 weeks 11.3 a week | lineup value 51
BUF | Buffalo Bills | DEF | age ? | BUF | market 0 | projected 110.2 (10 a week) | last 3 weeks 10.7 a week | lineup value 37.9
11565 | J.J. McCarthy | QB | age 23 | NYG | market 2854 | projected 101.2 (9.2 a week) | last 3 weeks 10.7 a week | lineup value 0
KC | Kansas City Chiefs | DEF | age ? | KC | market 0 | projected 96.5 (8.8 a week) | last 3 weeks 11.7 a week | lineup value 24.2
5001 | Dalton Schultz | TE | age 30 | HOU | market 3163 | projected 90.9 (8.3 a week) | last 3 weeks 4.9 a week | lineup value 10.9
11597 | Theo Johnson | TE | age 25 | NYG | market 3211 | projected 81.1 (7.4 a week) | last 3 weeks 3.6 a week | lineup value 9.3
9486 | Dontayvion Wicks | WR | age 25 | PHI | market 2552 | projected 47.3 (4.3 a week) | last 3 weeks 1.4 a week | lineup value 1.1
12469 | Dylan Sampson | RB | age 22 | CLE | market 3280 | projected 38.9 (3.5 a week) | last 3 weeks 9.5 a week | lineup value 0
12497 | Tory Horton | WR | age 23 | SEA | market 2785 | projected 34.1 (3.1 a week) | last 3 weeks 7.8 a week | lineup value 0.2
12547 | Kyle Williams | WR | age 23 | NE | market 2800 | projected 25.7 (2.3 a week) | last 3 weeks 1.3 a week | lineup value 0
11589 | Trey Benson | RB | age 24 | ARI | market 3166 | projected 14 (1.3 a week) | last 3 weeks 8.3 a week | lineup value 4.3
11583 | Jonathon Brooks | RB | age 23 | CAR | market 3587 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0

PARTNER (partnerId 9): record 1-2, rank 10, points for 368.1, contention window 0.23
3163 | Jared Goff | QB | age 32 | DET | market 4050 | projected 241.7 (22 a week) | last 3 weeks 26.4 a week | lineup value 22.8
5870 | Daniel Jones | QB | age 29 | IND | market 3196 | projected 220.4 (20 a week) | last 3 weeks 16 a week | lineup value 1.2
9509 | Bijan Robinson | RB | age 24 | ATL | market 6368 | projected 203.5 (18.5 a week) | last 3 weeks 20.1 a week | lineup value 101.3
7591 | Justin Fields | QB | age 27 | KC | market 1501 | projected 152.7 (13.9 a week) | last 3 weeks 12.7 a week | lineup value 0.4
2133 | Davante Adams | WR | age 33 | LAR | market 3374 | projected 151.8 (13.8 a week) | last 3 weeks 15.4 a week | lineup value 49.1
9997 | Zay Flowers | WR | age 26 | BAL | market 4181 | projected 146 (13.3 a week) | last 3 weeks 15.4 a week | lineup value 41
LAR | Los Angeles Rams | DEF | age ? | LAR | market 0 | projected 126.8 (11.5 a week) | last 3 weeks 16 a week | lineup value 62.2
8126 | Wan'Dale Robinson | WR | age 25 | TEN | market 3410 | projected 125.3 (11.4 a week) | last 3 weeks 14.4 a week | lineup value 23
5892 | David Montgomery | RB | age 29 | HOU | market 3462 | projected 113.8 (10.3 a week) | last 3 weeks 16.9 a week | lineup value 11.6
10955 | Chad Ryland | K | age 27 | ARI | market 0 | projected 107.4 (9.8 a week) | last 3 weeks 11.3 a week | lineup value 107.4
4098 | Kareem Hunt | RB | age 30 | FA | market 1814 | projected 93.2 (8.5 a week) | last 3 weeks 6.8 a week | lineup value 2.8
7090 | Darnell Mooney | WR | age 28 | NYG | market 2372 | projected 88.1 (8 a week) | last 3 weeks 4.1 a week | lineup value 3.1
12481 | Cam Skattebo | RB | age 24 | NYG | market 4225 | projected 74.3 (6.8 a week) | last 3 weeks 13.6 a week | lineup value 24.2
10859 | Sam LaPorta | TE | age 25 | DET | market 4248 | projected 73.2 (6.7 a week) | last 3 weeks 8.9 a week | lineup value 73.2
ARI | Arizona Cardinals | DEF | age ? | ARI | market 0 | projected 71.2 (6.5 a week) | last 3 weeks 11.7 a week | lineup value 6.6
11637 | Keon Coleman | WR | age 23 | BUF | market 2736 | projected 71.1 (6.5 a week) | last 3 weeks 11.9 a week | lineup value 0
8117 | Jalen Tolbert | WR | age 27 | MIA | market 0 | projected 36.5 (3.3 a week) | last 3 weeks 0 a week | lineup value 0

PARTNER (partnerId 1): record 3-0, rank 1, points for 431.1, contention window 1
4046 | Patrick Mahomes | QB | age 31 | KC | market 4307 | projected 270 (24.5 a week) | last 3 weeks 24.6 a week | lineup value 18.6
3294 | Dak Prescott | QB | age 33 | DAL | market 4229 | projected 255.8 (23.3 a week) | last 3 weeks 18.7 a week | lineup value 4.4
9221 | Jahmyr Gibbs | RB | age 24 | DET | market 6365 | projected 205.4 (18.7 a week) | last 3 weeks 20.4 a week | lineup value 94.1
8150 | Kyren Williams | RB | age 26 | LAR | market 4551 | projected 151.6 (13.8 a week) | last 3 weeks 14.4 a week | lineup value 40.3
7569 | Nico Collins | WR | age 27 | HOU | market 4427 | projected 142.9 (13 a week) | last 3 weeks 14 a week | lineup value 46.3
5846 | DK Metcalf | WR | age 28 | PIT | market 3436 | projected 131.9 (12 a week) | last 3 weeks 11.8 a week | lineup value 20.3
DEN | Denver Broncos | DEF | age ? | DEN | market 0 | projected 127.6 (11.6 a week) | last 3 weeks 11.3 a week | lineup value 48.6
8148 | Jameson Williams | WR | age 25 | DET | market 4092 | projected 119.9 (10.9 a week) | last 3 weeks 10.6 a week | lineup value 14.6
4983 | DJ Moore | WR | age 29 | BUF | market 3647 | projected 105.5 (9.6 a week) | last 3 weeks 10.3 a week | lineup value 3.7
7567 | Kenny Gainwell | RB | age 27 | TB | market 3126 | projected 103 (9.4 a week) | last 3 weeks 5.4 a week | lineup value 0.7
4035 | Alvin Kamara | RB | age 31 | NO | market 2508 | projected 100.5 (9.1 a week) | last 3 weeks 12.1 a week | lineup value 15.8
MIN | Minnesota Vikings | DEF | age ? | MIN | market 0 | projected 95.5 (8.7 a week) | last 3 weeks 20.3 a week | lineup value 16.5
5844 | T.J. Hockenson | TE | age 29 | MIN | market 2961 | projected 85.6 (7.8 a week) | last 3 weeks 7.5 a week | lineup value 13.6
8131 | Isaiah Likely | TE | age 26 | NYG | market 3475 | projected 60.7 (5.5 a week) | last 3 weeks 0 a week | lineup value 0
9484 | Tucker Kraft | TE | age 25 | GB | market 4151 | projected 59.9 (5.4 a week) | last 3 weeks 13.4 a week | lineup value 18.8
11646 | Jalen Coker | WR | age 24 | CAR | market 3263 | projected 48.4 (4.4 a week) | last 3 weeks 0 a week | lineup value 0
5927 | Terry McLaurin | WR | age 31 | WAS | market 3391 | projected 36.3 (3.3 a week) | last 3 weeks 8.3 a week | lineup value 4.5
1689 | Adam Thielen | WR | age 35 | FA | market 2197 | projected 17.8 (1.6 a week) | last 3 weeks 2.2 a week | lineup value 0

PARTNER (partnerId 4): record 1-2, rank 7, points for 397.8, contention window 0.55
6813 | Jonathan Taylor | RB | age 27 | IND | market 5006 | projected 214.3 (19.5 a week) | last 3 weeks 25 a week | lineup value 95.5
11560 | Caleb Williams | QB | age 24 | CHI | market 5824 | projected 209.2 (19 a week) | last 3 weeks 30.5 a week | lineup value 209.2
5850 | Josh Jacobs | RB | age 28 | GB | market 4033 | projected 162.8 (14.8 a week) | last 3 weeks 13.6 a week | lineup value 53.4
2449 | Stefon Diggs | WR | age 32 | WAS | market 2782 | projected 135 (12.3 a week) | last 3 weeks 8.1 a week | lineup value 18.7
5859 | A.J. Brown | WR | age 29 | NE | market 4312 | projected 130.2 (11.8 a week) | last 3 weeks 10.8 a week | lineup value 26.8
1479 | Keenan Allen | WR | age 34 | IND | market 2142 | projected 125.2 (11.4 a week) | last 3 weeks 18.8 a week | lineup value 7.4
7839 | Evan McPherson | K | age 27 | CIN | market 0 | projected 117.4 (10.7 a week) | last 3 weeks 2.2 a week | lineup value 117.4
6801 | Tee Higgins | WR | age 27 | CIN | market 4115 | projected 114.3 (10.4 a week) | last 3 weeks 7.8 a week | lineup value 14.2
6790 | D'Andre Swift | RB | age 27 | CHI | market 3659 | projected 109.9 (10 a week) | last 3 weeks 11.4 a week | lineup value 5.5
3214 | Hunter Henry | TE | age 31 | NE | market 3148 | projected 100.7 (9.2 a week) | last 3 weeks 13.8 a week | lineup value 65.7
12533 | Jacory Croskey-Merritt | RB | age 25 | WAS | market 3247 | projected 100.1 (9.1 a week) | last 3 weeks 8.7 a week | lineup value 3.7
8408 | Jordan Mason | RB | age 27 | MIN | market 3072 | projected 100.1 (9.1 a week) | last 3 weeks 12.6 a week | lineup value 7.5
CHI | Chicago Bears | DEF | age ? | CHI | market 0 | projected 69.8 (6.3 a week) | last 3 weeks 0 a week | lineup value 69.8
9504 | Kayshon Boutte | WR | age 24 | HOU | market 2963 | projected 67.8 (6.2 a week) | last 3 weeks 4.5 a week | lineup value 0
12501 | Matthew Golden | WR | age 23 | GB | market 3530 | projected 51.9 (4.7 a week) | last 3 weeks 5.1 a week | lineup value 0
9480 | Brenton Strange | TE | age 25 | JAX | market 3623 | projected 46.2 (4.2 a week) | last 3 weeks 8.9 a week | lineup value 11.2
1234 | Russell Wilson | QB | age 37 | FA | market 1666 | projected 0 (0 a week) | last 3 weeks 20.1 a week | lineup value 0

CANDIDATE DEALS (from a rules-based finder; points are the finder projections for the rest of the season):
c1 | partnerId 9 | I give Jonathon Brooks + Dylan Sampson (11583,12469) | I get Davante Adams + Daniel Jones (2133,5870) | my points 79.6 | their points -50.3 | likelihood 0.71
c2 | partnerId 9 | I give J.J. McCarthy + Jonathon Brooks (11565,11583) | I get Davante Adams + Justin Fields (2133,7591) | my points 78.1 | their points -49.5 | likelihood 0.71
c3 | partnerId 1 | I give J.J. McCarthy + Dalton Schultz (11565,5001) | I get Kenny Gainwell + Jalen Coker (7567,11646) | my points 5.8 | their points 28.1 | likelihood 0.67
c4 | partnerId 4 | I give Geno Smith (1373) | I get Keenan Allen (1479) | my points 23 | their points 17.6 | likelihood 0.62
c5 | partnerId 9 | I give Jonathon Brooks + Kyle Williams (11583,12547) | I get Davante Adams + Wan'Dale Robinson (2133,8126) | my points 56.1 | their points -85.3 | likelihood 0.65
c6 | partnerId 4 | I give Geno Smith + J.J. McCarthy (1373,11565) | I get Stefon Diggs (2449) | my points 31.2 | their points 7.1 | likelihood 0.56
c7 | partnerId 1 | I give J.J. McCarthy + Jonathon Brooks (11565,11583) | I get DJ Moore (4983) | my points 13.9 | their points 17 | likelihood 0.58
c8 | partnerId 4 | I give Geno Smith + Dylan Sampson (1373,12469) | I get Keenan Allen + Jacory Croskey-Merritt (1479,12533) | my points 29.7 | their points 10.5 | likelihood 0.51
c9 | partnerId 1 | I give Geno Smith + Jonathon Brooks (1373,11583) | I get Kenny Gainwell + DJ Moore (7567,4983) | my points 15.2 | their points 12.2 | likelihood 0.51

Pick the best trades for my team.
