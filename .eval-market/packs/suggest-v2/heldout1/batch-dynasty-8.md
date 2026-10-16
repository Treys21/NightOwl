You are answering fantasy football trade-advice cases. For each case below, follow the SYSTEM text, read the DATA, and write your JSON answer to the reply file named for that case.
Rules: write only the JSON object (no markdown fence, no commentary) to each reply file. Do not read any other file on disk. Do not look at any directory named truth or any file outside the reply paths. Work each case independently.

=========== CASE 1180995252055453696-w10-r7 ===========
REPLY FILE: /Users/anik/workspace/chrome/sleeper/.eval-market/replies/suggest-v2/heldout1/1180995252055453696-w10-r7.json
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

MY TEAM (partnerId me): record 5-4, rank 5, points for 1033.1, contention window 0.58
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

PARTNER (partnerId 8): record 8-1, rank 1, points for 1254, contention window 1
9493 | Puka Nacua | WR | age 25 | LAR | market 5709 | projected 102.8 (20.6 a week) | last 3 weeks 7.6 a week | lineup value 56.4
4034 | Christian McCaffrey | RB | age 30 | SF | market 4587 | projected 90.8 (18.2 a week) | last 3 weeks 27.7 a week | lineup value 54.1
6786 | CeeDee Lamb | WR | age 27 | DAL | market 4940 | projected 77.2 (15.4 a week) | last 3 weeks 17.4 a week | lineup value 38.6
7588 | Javonte Williams | RB | age 26 | DAL | market 4006 | projected 66.3 (13.3 a week) | last 3 weeks 14.3 a week | lineup value 29.5
12526 | Tetairoa McMillan | WR | age 23 | CAR | market 4738 | projected 53.6 (10.7 a week) | last 3 weeks 10.6 a week | lineup value 15.2
4217 | George Kittle | TE | age 33 | SF | market 3153 | projected 53.4 (10.7 a week) | last 3 weeks 7.1 a week | lineup value 18.7
8121 | Romeo Doubs | WR | age 26 | NE | market 3167 | projected 52.1 (10.4 a week) | last 3 weeks 12.9 a week | lineup value 5.9
9753 | Zach Charbonnet | RB | age 25 | SEA | market 3170 | projected 46.1 (9.2 a week) | last 3 weeks 8.4 a week | lineup value 2.6
12498 | Mason Taylor | TE | age 22 | NYJ | market 3688 | projected 43.4 (8.7 a week) | last 3 weeks 6.8 a week | lineup value 8.6
10444 | Cedric Tillman | WR | age 26 | NO | market 0 | projected 37.5 (7.5 a week) | last 3 weeks 0 a week | lineup value 0
9508 | Tyjae Spears | RB | age 25 | TEN | market 2948 | projected 36.4 (7.3 a week) | last 3 weeks 11.1 a week | lineup value 0.9
8408 | Jordan Mason | RB | age 27 | MIN | market 3055 | projected 35.2 (7 a week) | last 3 weeks 6 a week | lineup value 0
8112 | Drake London | WR | age 25 | ATL | market 4879 | projected 33.3 (6.7 a week) | last 3 weeks 15.7 a week | lineup value 14.8
7591 | Justin Fields | QB | age 27 | KC | market 1210 | projected 32 (6.4 a week) | last 3 weeks 8.3 a week | lineup value 18.2
19 | Joe Flacco | QB | age 41 | CIN | market 0 | projected 28.9 (5.8 a week) | last 3 weeks 18.7 a week | lineup value 15.1
11566 | Jayden Daniels | QB | age 25 | WAS | market 4320 | projected 16.9 (3.4 a week) | last 3 weeks 11 a week | lineup value 16.9
12504 | Kaleb Johnson | RB | age 23 | GB | market 2730 | projected 6.9 (1.4 a week) | last 3 weeks 0.8 a week | lineup value 0
12481 | Cam Skattebo | RB | age 24 | NYG | market 4223 | projected 0 (0 a week) | last 3 weeks 9.5 a week | lineup value 0

PARTNER (partnerId 5): record 6-3, rank 3, points for 1073.4, contention window 0.89
4881 | Lamar Jackson | QB | age 29 | BAL | market 4518 | projected 108.6 (21.7 a week) | last 3 weeks 8.5 a week | lineup value 36.6
9226 | De'Von Achane | RB | age 25 | MIA | market 4972 | projected 89.3 (17.9 a week) | last 3 weeks 16.5 a week | lineup value 59.8
3198 | Derrick Henry | RB | age 32 | BAL | market 4121 | projected 82.9 (16.6 a week) | last 3 weeks 10.7 a week | lineup value 46.7
7525 | DeVonta Smith | WR | age 27 | PHI | market 4172 | projected 73 (14.6 a week) | last 3 weeks 15.9 a week | lineup value 23.5
8137 | George Pickens | WR | age 25 | DAL | market 4780 | projected 63.7 (12.7 a week) | last 3 weeks 13 a week | lineup value 22.5
6768 | Tua Tagovailoa | QB | age 28 | ATL | market 1876 | projected 61.8 (12.4 a week) | last 3 weeks 10.8 a week | lineup value 0
9756 | Jordan Addison | WR | age 24 | MIN | market 3620 | projected 51.7 (10.3 a week) | last 3 weeks 13.9 a week | lineup value 3.9
12506 | Harold Fannin | TE | age 22 | CLE | market 4714 | projected 49.2 (9.8 a week) | last 3 weeks 8.7 a week | lineup value 12
1466 | Travis Kelce | TE | age 37 | KC | market 2869 | projected 46.8 (9.4 a week) | last 3 weeks 14.3 a week | lineup value 9.6
9754 | Quentin Johnston | WR | age 25 | LAC | market 3422 | projected 44.5 (8.9 a week) | last 3 weeks 8.8 a week | lineup value 5.2
6801 | Tee Higgins | WR | age 27 | CIN | market 4133 | projected 43.3 (8.7 a week) | last 3 weeks 22 a week | lineup value 11.5
7049 | Jauan Jennings | WR | age 29 | MIN | market 2834 | projected 42.8 (8.6 a week) | last 3 weeks 9.9 a week | lineup value 3.9
6783 | Jerry Jeudy | WR | age 27 | CLE | market 2700 | projected 42.1 (8.4 a week) | last 3 weeks 1.2 a week | lineup value 0
12508 | Jaxson Dart | QB | age 23 | NYG | market 4270 | projected 40.7 (8.1 a week) | last 3 weeks 25.4 a week | lineup value 0
9506 | Sean Tucker | RB | age 24 | TB | market 2756 | projected 34.8 (7 a week) | last 3 weeks 3.6 a week | lineup value 4.4
11586 | Blake Corum | RB | age 25 | LAR | market 3523 | projected 32.9 (6.6 a week) | last 3 weeks 3.7 a week | lineup value 0
11589 | Trey Benson | RB | age 24 | ARI | market 3171 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0
12497 | Tory Horton | WR | age 23 | SEA | market 2792 | projected 0 (0 a week) | last 3 weeks 6.9 a week | lineup value 0

CANDIDATE DEALS (from a rules-based finder; points are the finder projections for the rest of the season):
c1 | partnerId 8 | I give Jalen Hurts (6904) | I get Cam Skattebo + George Kittle (12481,4217) | my points 13.4 | their points 26.1 | likelihood 0.71
c2 | partnerId 8 | I give Sam Darnold + Travis Etienne (4943,7543) | I get Mason Taylor + Cam Skattebo (12498,12481) | my points 5.1 | their points 23 | likelihood 0.48
c3 | partnerId 5 | I give Josh Jacobs + Sam LaPorta (5850,10859) | I get Harold Fannin + Jerry Jeudy (12506,6783) | my points -9.3 | their points 31.6 | likelihood 0.59
c4 | partnerId 5 | I give Josh Jacobs (5850) | I get Travis Kelce + Jaxson Dart (1466,12508) | my points 1.6 | their points 21 | likelihood 0.56
c5 | partnerId 8 | I give Sam Darnold (4943) | I get Jordan Mason (8408) | my points 0 | their points 18.2 | likelihood 0.61

Pick the best trades for my team.

=========== CASE 1180995252055453696-w4-r3 ===========
REPLY FILE: /Users/anik/workspace/chrome/sleeper/.eval-market/replies/suggest-v2/heldout1/1180995252055453696-w4-r3.json
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
Lineup slots: QB, RB, RB, WR, WR, TE, FLEX, FLEX, BN, BN, BN, BN, BN, BN, BN, BN, BN. Superflex: no. Tight end premium: no. Points per reception: 1.
Columns: id | name | position | age | team | market value | projected points for the rest of the regular season (and per week) | points per week over the last three weeks played | lineup value (points my lineup loses if this player is removed).

MY TEAM (partnerId me): record 1-2, rank 7, points for 294.5, contention window 0.27
11564 | Drake Maye | QB | age 24 | NE | market 4926 | projected 194.5 (17.7 a week) | last 3 weeks 20.4 a week | lineup value 160.3
4866 | Saquon Barkley | RB | age 29 | PHI | market 4219 | projected 164.6 (15 a week) | last 3 weeks 15.1 a week | lineup value 65.9
8150 | Kyren Williams | RB | age 26 | LAR | market 4534 | projected 149.7 (13.6 a week) | last 3 weeks 14.4 a week | lineup value 51.3
8144 | Chris Olave | WR | age 26 | NO | market 4432 | projected 147.2 (13.4 a week) | last 3 weeks 13.2 a week | lineup value 52.4
8155 | Breece Hall | RB | age 25 | NYJ | market 4244 | projected 143.8 (13.1 a week) | last 3 weeks 10.5 a week | lineup value 45.1
7526 | Jaylen Waddle | WR | age 27 | DEN | market 4018 | projected 140.8 (12.8 a week) | last 3 weeks 13.2 a week | lineup value 47
8126 | Wan'Dale Robinson | WR | age 25 | TEN | market 3418 | projected 124.5 (11.3 a week) | last 3 weeks 14.4 a week | lineup value 30.6
5892 | David Montgomery | RB | age 29 | HOU | market 3455 | projected 112.6 (10.2 a week) | last 3 weeks 16.9 a week | lineup value 15
5012 | Mark Andrews | TE | age 31 | BAL | market 3111 | projected 94.4 (8.6 a week) | last 3 weeks 10 a week | lineup value 21.5
4039 | Cooper Kupp | WR | age 33 | SEA | market 2104 | projected 86.1 (7.8 a week) | last 3 weeks 8.2 a week | lineup value 0
12517 | Colston Loveland | TE | age 22 | CHI | market 5269 | projected 65.4 (5.9 a week) | last 3 weeks 2.4 a week | lineup value 4.8
12495 | Ollie Gordon | RB | age 22 | MIA | market 0 | projected 46.9 (4.3 a week) | last 3 weeks 4.5 a week | lineup value 0
2505 | Darren Waller | TE | age 34 | CAR | market 1420 | projected 46.5 (4.2 a week) | last 3 weeks 0 a week | lineup value 5.2
5849 | Kyler Murray | QB | age 29 | MIN | market 2938 | projected 34.4 (3.1 a week) | last 3 weeks 15.8 a week | lineup value 0.2
5955 | Hunter Renfrow | WR | age 30 | FA | market 1336 | projected 23 (2.1 a week) | last 3 weeks 0.9 a week | lineup value 0
2216 | Mike Evans | WR | age 33 | SF | market 3201 | projected 15.4 (1.4 a week) | last 3 weeks 11.3 a week | lineup value 3.2
6803 | Brandon Aiyuk | WR | age 28 | SF | market 2490 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0
7528 | Najee Harris | RB | age 28 | NYG | market 2342 | projected 0 (0 a week) | last 3 weeks 3.9 a week | lineup value 0

PARTNER (partnerId 1): record 3-0, rank 2, points for 397.4, contention window 1
4984 | Josh Allen | QB | age 30 | BUF | market 4666 | projected 230.9 (21 a week) | last 3 weeks 24.2 a week | lineup value 79.7
9221 | Jahmyr Gibbs | RB | age 24 | DET | market 6357 | projected 203.4 (18.5 a week) | last 3 weeks 20.4 a week | lineup value 111.7
9488 | Jaxon Smith-Njigba | WR | age 24 | SEA | market 5816 | projected 203.1 (18.5 a week) | last 3 weeks 18.8 a week | lineup value 96.2
6804 | Jordan Love | QB | age 27 | GB | market 3308 | projected 168.1 (15.3 a week) | last 3 weeks 16.3 a week | lineup value 16.9
8130 | Trey McBride | TE | age 26 | ARI | market 4903 | projected 164.1 (14.9 a week) | last 3 weeks 13.7 a week | lineup value 74.3
6819 | Michael Pittman | WR | age 29 | PIT | market 2998 | projected 128.4 (11.7 a week) | last 3 weeks 15.8 a week | lineup value 23.5
5872 | Deebo Samuel | WR | age 30 | SF | market 2710 | projected 120.9 (11 a week) | last 3 weeks 15 a week | lineup value 26.4
8228 | Jaylen Warren | RB | age 27 | PIT | market 3526 | projected 120.9 (11 a week) | last 3 weeks 14.8 a week | lineup value 27.1
6790 | D'Andre Swift | RB | age 27 | CHI | market 3654 | projected 108.7 (9.9 a week) | last 3 weeks 11.1 a week | lineup value 20.7
8676 | Rashid Shaheed | WR | age 28 | SEA | market 2688 | projected 108.7 (9.9 a week) | last 3 weeks 10.9 a week | lineup value 4.6
1339 | Zach Ertz | TE | age 35 | PHI | market 0 | projected 99.8 (9.1 a week) | last 3 weeks 12.3 a week | lineup value 10
12499 | Elic Ayomanor | WR | age 23 | TEN | market 2923 | projected 81.1 (7.4 a week) | last 3 weeks 9.8 a week | lineup value 2.6
11655 | Tyrone Tracy | RB | age 26 | NYG | market 2973 | projected 69.7 (6.3 a week) | last 3 weeks 6.7 a week | lineup value 4.5
8146 | Garrett Wilson | WR | age 26 | NYJ | market 4235 | projected 59.3 (5.4 a week) | last 3 weeks 18.3 a week | lineup value 13.4
12519 | Luther Burden | WR | age 22 | CHI | market 4872 | projected 54.1 (4.9 a week) | last 3 weeks 7.3 a week | lineup value 0
5995 | Justice Hill | RB | age 28 | BAL | market 2004 | projected 41.1 (3.7 a week) | last 3 weeks 0 a week | lineup value 6.7
4981 | Calvin Ridley | WR | age 31 | TEN | market 2288 | projected 40.8 (3.7 a week) | last 3 weeks 6.4 a week | lineup value 0

PARTNER (partnerId 8): record 3-0, rank 1, points for 416, contention window 1
4034 | Christian McCaffrey | RB | age 30 | SF | market 4588 | projected 233.1 (21.2 a week) | last 3 weeks 23.3 a week | lineup value 126.9
9493 | Puka Nacua | WR | age 25 | LAR | market 5713 | projected 187.2 (17 a week) | last 3 weeks 24.5 a week | lineup value 103.2
7588 | Javonte Williams | RB | age 26 | DAL | market 4006 | projected 163.3 (14.8 a week) | last 3 weeks 18.9 a week | lineup value 56.9
7523 | Trevor Lawrence | QB | age 27 | JAX | market 3562 | projected 159.9 (14.5 a week) | last 3 weeks 2.9 a week | lineup value 36.1
12526 | Tetairoa McMillan | WR | age 23 | CAR | market 4740 | projected 138.6 (12.6 a week) | last 3 weeks 11.9 a week | lineup value 38.3
6786 | CeeDee Lamb | WR | age 27 | DAL | market 4946 | projected 133.3 (12.1 a week) | last 3 weeks 12.7 a week | lineup value 57.2
7591 | Justin Fields | QB | age 27 | KC | market 1208 | projected 121.7 (11.1 a week) | last 3 weeks 10.5 a week | lineup value 22.3
8121 | Romeo Doubs | WR | age 26 | NE | market 3171 | projected 104 (9.5 a week) | last 3 weeks 8.4 a week | lineup value 5.9
8408 | Jordan Mason | RB | age 27 | MIN | market 3056 | projected 98.7 (9 a week) | last 3 weeks 12.6 a week | lineup value 7.5
9753 | Zach Charbonnet | RB | age 25 | SEA | market 3169 | projected 98.4 (8.9 a week) | last 3 weeks 3.9 a week | lineup value 2.6
11566 | Jayden Daniels | QB | age 25 | WAS | market 4406 | projected 96.8 (8.8 a week) | last 3 weeks 13.3 a week | lineup value 10.3
4217 | George Kittle | TE | age 33 | SF | market 3154 | projected 95.8 (8.7 a week) | last 3 weeks 4.2 a week | lineup value 60.9
8112 | Drake London | WR | age 25 | ATL | market 4882 | projected 92.6 (8.4 a week) | last 3 weeks 9.6 a week | lineup value 23.3
9508 | Tyjae Spears | RB | age 25 | TEN | market 2949 | projected 74.1 (6.7 a week) | last 3 weeks 0 a week | lineup value 0.9
12481 | Cam Skattebo | RB | age 24 | NYG | market 4201 | projected 73.3 (6.7 a week) | last 3 weeks 9 a week | lineup value 14.7
9484 | Tucker Kraft | TE | age 25 | GB | market 4164 | projected 59.6 (5.4 a week) | last 3 weeks 13.4 a week | lineup value 24.6
10444 | Cedric Tillman | WR | age 26 | NO | market 0 | projected 46.7 (4.2 a week) | last 3 weeks 10.7 a week | lineup value 0
12504 | Kaleb Johnson | RB | age 23 | GB | market 2730 | projected 17.9 (1.6 a week) | last 3 weeks -0.4 a week | lineup value 0

CANDIDATE DEALS (from a rules-based finder; points are the finder projections for the rest of the season):
c1 | partnerId 1 | I give Saquon Barkley + Chris Olave (4866,8144) | I get Luther Burden + Rashid Shaheed (12519,8676) | my points -109.3 | their points 78.1 | likelihood 0.69
c2 | partnerId 1 | I give Saquon Barkley + Breece Hall (4866,8155) | I get Luther Burden + Tyrone Tracy (12519,11655) | my points -103.5 | their points 73.4 | likelihood 0.62
c3 | partnerId 8 | I give Saquon Barkley + Mark Andrews (4866,5012) | I get Tyjae Spears + Jayden Daniels (9508,11566) | my points -55.6 | their points 53.2 | likelihood 0.74
c4 | partnerId 1 | I give Saquon Barkley + Jaylen Waddle (4866,7526) | I get Luther Burden + Elic Ayomanor (12519,12499) | my points -108.9 | their points 73.4 | likelihood 0.59
c5 | partnerId 8 | I give Saquon Barkley + Darren Waller (4866,2505) | I get Jordan Mason + Jayden Daniels (8408,11566) | my points -30.6 | their points 48.7 | likelihood 0.73
c6 | partnerId 8 | I give Saquon Barkley (4866) | I get Kaleb Johnson + Jayden Daniels (12504,11566) | my points -42.8 | their points 35.2 | likelihood 0.6

Pick the best trades for my team.

=========== CASE 1180995252055453696-w4-r5 ===========
REPLY FILE: /Users/anik/workspace/chrome/sleeper/.eval-market/replies/suggest-v2/heldout1/1180995252055453696-w4-r5.json
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
Lineup slots: QB, RB, RB, WR, WR, TE, FLEX, FLEX, BN, BN, BN, BN, BN, BN, BN, BN, BN. Superflex: no. Tight end premium: no. Points per reception: 1.
Columns: id | name | position | age | team | market value | projected points for the rest of the regular season (and per week) | points per week over the last three weeks played | lineup value (points my lineup loses if this player is removed).

MY TEAM (partnerId me): record 2-1, rank 3, points for 331.4, contention window 0.89
9226 | De'Von Achane | RB | age 25 | MIA | market 4981 | projected 213.5 (19.4 a week) | last 3 weeks 19.6 a week | lineup value 160.4
3198 | Derrick Henry | RB | age 32 | BAL | market 4124 | projected 167 (15.2 a week) | last 3 weeks 13.1 a week | lineup value 113.9
8137 | George Pickens | WR | age 25 | DAL | market 4781 | projected 152.4 (13.9 a week) | last 3 weeks 13.9 a week | lineup value 42.5
4881 | Lamar Jackson | QB | age 29 | BAL | market 4523 | projected 151.6 (13.8 a week) | last 3 weeks 27.2 a week | lineup value 151.6
7525 | DeVonta Smith | WR | age 27 | PHI | market 4174 | projected 138.4 (12.6 a week) | last 3 weeks 11.3 a week | lineup value 30.5
6801 | Tee Higgins | WR | age 27 | CIN | market 4135 | projected 113.8 (10.3 a week) | last 3 weeks 7.8 a week | lineup value 14.6
1466 | Travis Kelce | TE | age 37 | KC | market 2874 | projected 110.6 (10.1 a week) | last 3 weeks 9.8 a week | lineup value 27.8
9754 | Quentin Johnston | WR | age 25 | LAC | market 3418 | projected 105.8 (9.6 a week) | last 3 weeks 10.3 a week | lineup value 8
9756 | Jordan Addison | WR | age 24 | MIN | market 3620 | projected 104.8 (9.5 a week) | last 3 weeks 0 a week | lineup value 3.6
7049 | Jauan Jennings | WR | age 29 | MIN | market 2838 | projected 101.4 (9.2 a week) | last 3 weeks 7.8 a week | lineup value 4.9
6783 | Jerry Jeudy | WR | age 27 | CLE | market 2710 | projected 96.5 (8.8 a week) | last 3 weeks 7.8 a week | lineup value 0.7
12506 | Harold Fannin | TE | age 22 | CLE | market 4717 | projected 94.7 (8.6 a week) | last 3 weeks 5.1 a week | lineup value 12
8125 | Calvin Austin | WR | age 27 | NYG | market 0 | projected 65.4 (5.9 a week) | last 3 weeks 10.9 a week | lineup value 0
11586 | Blake Corum | RB | age 25 | LAR | market 3527 | projected 54.9 (5 a week) | last 3 weeks 6.1 a week | lineup value 10.3
12497 | Tory Horton | WR | age 23 | SEA | market 2798 | projected 34 (3.1 a week) | last 3 weeks 0 a week | lineup value 0
12541 | Dont'e Thornton | WR | age 23 | LV | market 0 | projected 34 (3.1 a week) | last 3 weeks 4.8 a week | lineup value 0
11589 | Trey Benson | RB | age 24 | ARI | market 3142 | projected 13.8 (1.3 a week) | last 3 weeks 8.3 a week | lineup value 1.4
4018 | Joe Mixon | RB | age 30 | FA | market 2254 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0

PARTNER (partnerId 9): record 1-2, rank 8, points for 294.4, contention window 0.11
3294 | Dak Prescott | QB | age 33 | DAL | market 3191 | projected 191.4 (17.4 a week) | last 3 weeks 14.7 a week | lineup value 33
7547 | Amon-Ra St. Brown | WR | age 26 | DET | market 5327 | projected 190.6 (17.3 a week) | last 3 weeks 22.8 a week | lineup value 118.9
3163 | Jared Goff | QB | age 32 | DET | market 3014 | projected 178.3 (16.2 a week) | last 3 weeks 19.2 a week | lineup value 19.9
9224 | Chase Brown | RB | age 26 | CIN | market 4495 | projected 139.2 (12.7 a week) | last 3 weeks 8.9 a week | lineup value 59.6
8136 | Rachaad White | RB | age 27 | WAS | market 2729 | projected 126.6 (11.5 a week) | last 3 weeks 6.5 a week | lineup value 51.8
12529 | TreVeyon Henderson | RB | age 23 | NE | market 4323 | projected 120.3 (10.9 a week) | last 3 weeks 8.3 a week | lineup value 43.3
4983 | DJ Moore | WR | age 29 | BUF | market 3663 | projected 105.1 (9.6 a week) | last 3 weeks 10 a week | lineup value 27.8
7553 | Kyle Pitts | TE | age 26 | ATL | market 3972 | projected 96.9 (8.8 a week) | last 3 weeks 9.5 a week | lineup value 29.2
12489 | RJ Harvey | RB | age 25 | DEN | market 3713 | projected 93.1 (8.5 a week) | last 3 weeks 5.3 a week | lineup value 17
7090 | Darnell Mooney | WR | age 28 | NYG | market 2377 | projected 87.5 (8 a week) | last 3 weeks 4.1 a week | lineup value 18.8
4033 | David Njoku | TE | age 30 | LAC | market 2859 | projected 69.2 (6.3 a week) | last 3 weeks 7.9 a week | lineup value 3.3
10219 | Chris Rodriguez | RB | age 27 | JAX | market 2747 | projected 61.4 (5.6 a week) | last 3 weeks 0 a week | lineup value 0
9480 | Brenton Strange | TE | age 25 | JAX | market 3638 | projected 46 (4.2 a week) | last 3 weeks 8.9 a week | lineup value 0.8
12469 | Dylan Sampson | RB | age 22 | CLE | market 3270 | projected 38.4 (3.5 a week) | last 3 weeks 9.5 a week | lineup value 0
5927 | Terry McLaurin | WR | age 31 | WAS | market 3406 | projected 36.1 (3.3 a week) | last 3 weeks 8.3 a week | lineup value 9.1
12530 | Travis Hunter | DB | age 23 | JAX | market 0 | projected 30.3 (2.8 a week) | last 3 weeks 5.9 a week | lineup value 8.1
11632 | Malik Nabers | WR | age 23 | NYG | market 5045 | projected 15.4 (1.4 a week) | last 3 weeks 17.7 a week | lineup value 6.6

PARTNER (partnerId 10): record 1-2, rank 9, points for 285.9, contention window 0
5870 | Daniel Jones | QB | age 29 | IND | market 2453 | projected 167.6 (15.2 a week) | last 3 weeks 12.9 a week | lineup value 23.7
11560 | Caleb Williams | QB | age 24 | CHI | market 4536 | projected 161.5 (14.7 a week) | last 3 weeks 23.8 a week | lineup value 17.5
12514 | Emeka Egbuka | WR | age 24 | TB | market 4534 | projected 147.9 (13.4 a week) | last 3 weeks 17 a week | lineup value 48.8
7569 | Nico Collins | WR | age 27 | HOU | market 4450 | projected 142.4 (12.9 a week) | last 3 weeks 13.7 a week | lineup value 58.3
12512 | Quinshon Judkins | RB | age 22 | CLE | market 4366 | projected 140.8 (12.8 a week) | last 3 weeks 8.9 a week | lineup value 57.1
5045 | Courtland Sutton | WR | age 31 | DEN | market 3194 | projected 129.9 (11.8 a week) | last 3 weeks 14.5 a week | lineup value 37.2
8151 | Kenneth Walker | RB | age 25 | KC | market 4522 | projected 117.1 (10.6 a week) | last 3 weeks 14.1 a week | lineup value 35.4
11624 | Xavier Worthy | WR | age 23 | KC | market 3501 | projected 114.8 (10.4 a week) | last 3 weeks 0 a week | lineup value 22.7
5022 | Dallas Goedert | TE | age 31 | PHI | market 3132 | projected 103.4 (9.4 a week) | last 3 weeks 7.2 a week | lineup value 18.8
3214 | Hunter Henry | TE | age 31 | NE | market 3153 | projected 100 (9.1 a week) | last 3 weeks 0 a week | lineup value 15.4
12533 | Jacory Croskey-Merritt | RB | age 25 | WAS | market 3231 | projected 98.8 (9 a week) | last 3 weeks 8.7 a week | lineup value 25.6
9500 | Josh Downs | WR | age 25 | IND | market 3353 | projected 83.8 (7.6 a week) | last 3 weeks 6.6 a week | lineup value 6.5
11584 | Bucky Irving | RB | age 24 | TB | market 4290 | projected 47.8 (4.3 a week) | last 3 weeks 15.5 a week | lineup value 15.9
7670 | Joshua Palmer | WR | age 27 | BUF | market 0 | projected 34.8 (3.2 a week) | last 3 weeks 2.7 a week | lineup value 0
6770 | Joe Burrow | QB | age 29 | CIN | market 4036 | projected 34.2 (3.1 a week) | last 3 weeks 5.3 a week | lineup value 1.9
11575 | Ray Davis | RB | age 26 | BUF | market 2486 | projected 31.7 (2.9 a week) | last 3 weeks 1.2 a week | lineup value 0
8188 | Tyquan Thornton | WR | age 26 | KC | market 0 | projected 30.6 (2.8 a week) | last 3 weeks 0 a week | lineup value 0
11576 | Braelon Allen | RB | age 22 | NYJ | market 3185 | projected 3.7 (0.3 a week) | last 3 weeks 4.9 a week | lineup value 0

PARTNER (partnerId 8): record 3-0, rank 1, points for 416, contention window 1
4034 | Christian McCaffrey | RB | age 30 | SF | market 4588 | projected 233.1 (21.2 a week) | last 3 weeks 23.3 a week | lineup value 126.9
9493 | Puka Nacua | WR | age 25 | LAR | market 5713 | projected 187.2 (17 a week) | last 3 weeks 24.5 a week | lineup value 103.2
7588 | Javonte Williams | RB | age 26 | DAL | market 4006 | projected 163.3 (14.8 a week) | last 3 weeks 18.9 a week | lineup value 56.9
7523 | Trevor Lawrence | QB | age 27 | JAX | market 3562 | projected 159.9 (14.5 a week) | last 3 weeks 2.9 a week | lineup value 36.1
12526 | Tetairoa McMillan | WR | age 23 | CAR | market 4740 | projected 138.6 (12.6 a week) | last 3 weeks 11.9 a week | lineup value 38.3
6786 | CeeDee Lamb | WR | age 27 | DAL | market 4946 | projected 133.3 (12.1 a week) | last 3 weeks 12.7 a week | lineup value 57.2
7591 | Justin Fields | QB | age 27 | KC | market 1208 | projected 121.7 (11.1 a week) | last 3 weeks 10.5 a week | lineup value 22.3
8121 | Romeo Doubs | WR | age 26 | NE | market 3171 | projected 104 (9.5 a week) | last 3 weeks 8.4 a week | lineup value 5.9
8408 | Jordan Mason | RB | age 27 | MIN | market 3056 | projected 98.7 (9 a week) | last 3 weeks 12.6 a week | lineup value 7.5
9753 | Zach Charbonnet | RB | age 25 | SEA | market 3169 | projected 98.4 (8.9 a week) | last 3 weeks 3.9 a week | lineup value 2.6
11566 | Jayden Daniels | QB | age 25 | WAS | market 4406 | projected 96.8 (8.8 a week) | last 3 weeks 13.3 a week | lineup value 10.3
4217 | George Kittle | TE | age 33 | SF | market 3154 | projected 95.8 (8.7 a week) | last 3 weeks 4.2 a week | lineup value 60.9
8112 | Drake London | WR | age 25 | ATL | market 4882 | projected 92.6 (8.4 a week) | last 3 weeks 9.6 a week | lineup value 23.3
9508 | Tyjae Spears | RB | age 25 | TEN | market 2949 | projected 74.1 (6.7 a week) | last 3 weeks 0 a week | lineup value 0.9
12481 | Cam Skattebo | RB | age 24 | NYG | market 4201 | projected 73.3 (6.7 a week) | last 3 weeks 9 a week | lineup value 14.7
9484 | Tucker Kraft | TE | age 25 | GB | market 4164 | projected 59.6 (5.4 a week) | last 3 weeks 13.4 a week | lineup value 24.6
10444 | Cedric Tillman | WR | age 26 | NO | market 0 | projected 46.7 (4.2 a week) | last 3 weeks 10.7 a week | lineup value 0
12504 | Kaleb Johnson | RB | age 23 | GB | market 2730 | projected 17.9 (1.6 a week) | last 3 weeks -0.4 a week | lineup value 0

PARTNER (partnerId 2): record 1-2, rank 6, points for 325.1, contention window 0.42
4046 | Patrick Mahomes | QB | age 31 | KC | market 3406 | projected 211.6 (19.2 a week) | last 3 weeks 20.1 a week | lineup value 38.7
6797 | Justin Herbert | QB | age 28 | LAC | market 3780 | projected 193.9 (17.6 a week) | last 3 weeks 20.1 a week | lineup value 20.9
7564 | Ja'Marr Chase | WR | age 26 | CIN | market 5808 | projected 163.1 (14.8 a week) | last 3 weeks 16.3 a week | lineup value 61.3
2133 | Davante Adams | WR | age 33 | LAR | market 3388 | projected 151.1 (13.7 a week) | last 3 weeks 15.4 a week | lineup value 43.3
7021 | Rico Dowdle | RB | age 28 | PIT | market 3228 | projected 132.8 (12.1 a week) | last 3 weeks 5.8 a week | lineup value 46.8
5859 | A.J. Brown | WR | age 29 | NE | market 4333 | projected 129.7 (11.8 a week) | last 3 weeks 10.8 a week | lineup value 32.2
1479 | Keenan Allen | WR | age 34 | IND | market 2143 | projected 124.2 (11.3 a week) | last 3 weeks 18.8 a week | lineup value 13.2
10229 | Rashee Rice | WR | age 26 | KC | market 4432 | projected 121.7 (11.1 a week) | last 3 weeks 0 a week | lineup value 49.6
11604 | Brock Bowers | TE | age 23 | LV | market 5557 | projected 110.3 (10 a week) | last 3 weeks 11.3 a week | lineup value 59.3
4035 | Alvin Kamara | RB | age 31 | NO | market 2497 | projected 99.1 (9 a week) | last 3 weeks 11.8 a week | lineup value 16.2
5967 | Tony Pollard | RB | age 29 | TEN | market 3186 | projected 97.1 (8.8 a week) | last 3 weeks 10 a week | lineup value 17.3
6806 | J.K. Dobbins | RB | age 27 | DEN | market 3293 | projected 89.4 (8.1 a week) | last 3 weeks 15.2 a week | lineup value 13
4144 | Jonnu Smith | TE | age 31 | GB | market 0 | projected 77.4 (7 a week) | last 3 weeks 7.8 a week | lineup value 26.4
4950 | Christian Kirk | WR | age 29 | SF | market 2207 | projected 57.1 (5.2 a week) | last 3 weeks 1.8 a week | lineup value 0
12501 | Matthew Golden | WR | age 23 | GB | market 3546 | projected 51.6 (4.7 a week) | last 3 weeks 5.1 a week | lineup value 0
8143 | Jerome Ford | RB | age 27 | ARI | market 0 | projected 51.4 (4.7 a week) | last 3 weeks 5.6 a week | lineup value 6
4137 | James Conner | RB | age 31 | ARI | market 2739 | projected 0 (0 a week) | last 3 weeks 10.8 a week | lineup value 0

PARTNER (partnerId 1): record 3-0, rank 2, points for 397.4, contention window 1
4984 | Josh Allen | QB | age 30 | BUF | market 4666 | projected 230.9 (21 a week) | last 3 weeks 24.2 a week | lineup value 79.7
9221 | Jahmyr Gibbs | RB | age 24 | DET | market 6357 | projected 203.4 (18.5 a week) | last 3 weeks 20.4 a week | lineup value 111.7
9488 | Jaxon Smith-Njigba | WR | age 24 | SEA | market 5816 | projected 203.1 (18.5 a week) | last 3 weeks 18.8 a week | lineup value 96.2
6804 | Jordan Love | QB | age 27 | GB | market 3308 | projected 168.1 (15.3 a week) | last 3 weeks 16.3 a week | lineup value 16.9
8130 | Trey McBride | TE | age 26 | ARI | market 4903 | projected 164.1 (14.9 a week) | last 3 weeks 13.7 a week | lineup value 74.3
6819 | Michael Pittman | WR | age 29 | PIT | market 2998 | projected 128.4 (11.7 a week) | last 3 weeks 15.8 a week | lineup value 23.5
5872 | Deebo Samuel | WR | age 30 | SF | market 2710 | projected 120.9 (11 a week) | last 3 weeks 15 a week | lineup value 26.4
8228 | Jaylen Warren | RB | age 27 | PIT | market 3526 | projected 120.9 (11 a week) | last 3 weeks 14.8 a week | lineup value 27.1
6790 | D'Andre Swift | RB | age 27 | CHI | market 3654 | projected 108.7 (9.9 a week) | last 3 weeks 11.1 a week | lineup value 20.7
8676 | Rashid Shaheed | WR | age 28 | SEA | market 2688 | projected 108.7 (9.9 a week) | last 3 weeks 10.9 a week | lineup value 4.6
1339 | Zach Ertz | TE | age 35 | PHI | market 0 | projected 99.8 (9.1 a week) | last 3 weeks 12.3 a week | lineup value 10
12499 | Elic Ayomanor | WR | age 23 | TEN | market 2923 | projected 81.1 (7.4 a week) | last 3 weeks 9.8 a week | lineup value 2.6
11655 | Tyrone Tracy | RB | age 26 | NYG | market 2973 | projected 69.7 (6.3 a week) | last 3 weeks 6.7 a week | lineup value 4.5
8146 | Garrett Wilson | WR | age 26 | NYJ | market 4235 | projected 59.3 (5.4 a week) | last 3 weeks 18.3 a week | lineup value 13.4
12519 | Luther Burden | WR | age 22 | CHI | market 4872 | projected 54.1 (4.9 a week) | last 3 weeks 7.3 a week | lineup value 0
5995 | Justice Hill | RB | age 28 | BAL | market 2004 | projected 41.1 (3.7 a week) | last 3 weeks 0 a week | lineup value 6.7
4981 | Calvin Ridley | WR | age 31 | TEN | market 2288 | projected 40.8 (3.7 a week) | last 3 weeks 6.4 a week | lineup value 0

CANDIDATE DEALS (from a rules-based finder; points are the finder projections for the rest of the season):
c1 | partnerId 9 | I give Joe Mixon + Jordan Addison (4018,9756) | I get Dak Prescott + Rachaad White (3294,8136) | my points 114.7 | their points -62.1 | likelihood 0.94
c2 | partnerId 9 | I give Joe Mixon + Trey Benson (4018,11589) | I get Jared Goff + Rachaad White (3163,8136) | my points 91.7 | their points -67.5 | likelihood 0.79
c3 | partnerId 9 | I give Jordan Addison (9756) | I get Dak Prescott + Jared Goff (3294,3163) | my points 72.6 | their points -191.1 | likelihood 0.94
c4 | partnerId 10 | I give Joe Mixon + Jordan Addison (4018,9756) | I get Daniel Jones + Courtland Sutton (5870,5045) | my points 80 | their points -44.1 | likelihood 0.95
c5 | partnerId 10 | I give Joe Mixon + Jerry Jeudy (4018,6783) | I get Daniel Jones (5870) | my points 66.6 | their points -23.2 | likelihood 0.94
c6 | partnerId 8 | I give Harold Fannin + Jerry Jeudy (12506,6783) | I get Jayden Daniels + Jordan Mason (11566,8408) | my points 65.9 | their points 5.2 | likelihood 0.78
c7 | partnerId 8 | I give Harold Fannin (12506) | I get Jayden Daniels + Zach Charbonnet (11566,9753) | my points 60.3 | their points 7.4 | likelihood 0.8
c8 | partnerId 8 | I give Harold Fannin + Joe Mixon (12506,4018) | I get Jayden Daniels + Tyjae Spears (11566,9508) | my points 55.4 | their points 9.1 | likelihood 0.82
c9 | partnerId 2 | I give Trey Benson + Jordan Addison (11589,9756) | I get Patrick Mahomes (4046) | my points 81.4 | their points -34.8 | likelihood 0.58
c10 | partnerId 2 | I give Jerry Jeudy + Jordan Addison (6783,9756) | I get Davante Adams (2133) | my points 34.6 | their points -33.9 | likelihood 0.6
c11 | partnerId 1 | I give George Pickens (8137) | I get Jordan Love + Luther Burden (6804,12519) | my points 7 | their points 20.2 | likelihood 0.53

Pick the best trades for my team.

=========== CASE 1180995252055453696-w7-r1 ===========
REPLY FILE: /Users/anik/workspace/chrome/sleeper/.eval-market/replies/suggest-v2/heldout1/1180995252055453696-w7-r1.json
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
Lineup slots: QB, RB, RB, WR, WR, TE, FLEX, FLEX, BN, BN, BN, BN, BN, BN, BN, BN, BN. Superflex: no. Tight end premium: no. Points per reception: 1.
Columns: id | name | position | age | team | market value | projected points for the rest of the regular season (and per week) | points per week over the last three weeks played | lineup value (points my lineup loses if this player is removed).

MY TEAM (partnerId me): record 6-0, rank 2, points for 802.4, contention window 1
4984 | Josh Allen | QB | age 30 | BUF | market 4664 | projected 162.6 (20.3 a week) | last 3 weeks 20.2 a week | lineup value 46.3
9488 | Jaxon Smith-Njigba | WR | age 24 | SEA | market 5816 | projected 147.6 (18.5 a week) | last 3 weeks 23.5 a week | lineup value 73.1
9221 | Jahmyr Gibbs | RB | age 24 | DET | market 6354 | projected 145.9 (18.2 a week) | last 3 weeks 14 a week | lineup value 70.2
6804 | Jordan Love | QB | age 27 | GB | market 3312 | projected 133.2 (16.7 a week) | last 3 weeks 13.7 a week | lineup value 17
8130 | Trey McBride | TE | age 26 | ARI | market 4900 | projected 119.5 (14.9 a week) | last 3 weeks 14.2 a week | lineup value 57.4
8228 | Jaylen Warren | RB | age 27 | PIT | market 3524 | projected 109.1 (13.6 a week) | last 3 weeks 2.8 a week | lineup value 33.4
6819 | Michael Pittman | WR | age 29 | PIT | market 2998 | projected 91 (11.4 a week) | last 3 weeks 11.3 a week | lineup value 20.6
6790 | D'Andre Swift | RB | age 27 | CHI | market 3652 | projected 83.8 (10.5 a week) | last 3 weeks 13.8 a week | lineup value 19.1
5872 | Deebo Samuel | WR | age 30 | SF | market 2708 | projected 79.3 (9.9 a week) | last 3 weeks 16 a week | lineup value 19.4
8676 | Rashid Shaheed | WR | age 28 | SEA | market 2685 | projected 77.4 (9.7 a week) | last 3 weeks 12.5 a week | lineup value 6.8
8122 | Zonovan Knight | RB | age 25 | ARI | market 0 | projected 71.9 (9 a week) | last 3 weeks 0 a week | lineup value 4.4
1339 | Zach Ertz | TE | age 35 | PHI | market 0 | projected 71.9 (9 a week) | last 3 weeks 7.1 a week | lineup value 9.8
12499 | Elic Ayomanor | WR | age 23 | TEN | market 2919 | projected 51.8 (6.5 a week) | last 3 weeks 5.3 a week | lineup value 4.8
12519 | Luther Burden | WR | age 22 | CHI | market 4871 | projected 42.5 (5.3 a week) | last 3 weeks 3.6 a week | lineup value 0
7607 | Michael Carter | RB | age 27 | TEN | market 0 | projected 36.5 (4.6 a week) | last 3 weeks 8.9 a week | lineup value 0
8146 | Garrett Wilson | WR | age 26 | NYJ | market 4227 | projected 14.5 (1.8 a week) | last 3 weeks 14.5 a week | lineup value 1.7
4981 | Calvin Ridley | WR | age 31 | TEN | market 2288 | projected 9.2 (1.2 a week) | last 3 weeks 8.6 a week | lineup value 0
9757 | Kendre Miller | RB | age 24 | NO | market 2592 | projected 6.6 (0.8 a week) | last 3 weeks 3.4 a week | lineup value 0

PARTNER (partnerId 9): record 1-5, rank 10, points for 569.7, contention window 0
3294 | Dak Prescott | QB | age 33 | DAL | market 3199 | projected 136.6 (17.1 a week) | last 3 weeks 26.9 a week | lineup value 29.7
7547 | Amon-Ra St. Brown | WR | age 26 | DET | market 5321 | projected 136.6 (17.1 a week) | last 3 weeks 18.9 a week | lineup value 71.8
3163 | Jared Goff | QB | age 32 | DET | market 3020 | projected 126 (15.8 a week) | last 3 weeks 16.6 a week | lineup value 19.1
9224 | Chase Brown | RB | age 26 | CIN | market 4492 | projected 100.4 (12.5 a week) | last 3 weeks 9.9 a week | lineup value 43.5
12529 | TreVeyon Henderson | RB | age 23 | NE | market 4317 | projected 90 (11.2 a week) | last 3 weeks 7.3 a week | lineup value 30.2
8136 | Rachaad White | RB | age 27 | WAS | market 2727 | projected 87 (10.9 a week) | last 3 weeks 16.4 a week | lineup value 33.3
4983 | DJ Moore | WR | age 29 | BUF | market 3659 | projected 82.8 (10.4 a week) | last 3 weeks 5.3 a week | lineup value 11.9
7553 | Kyle Pitts | TE | age 26 | ATL | market 3971 | projected 80 (10 a week) | last 3 weeks 7.6 a week | lineup value 19.7
7090 | Darnell Mooney | WR | age 28 | NYG | market 2376 | projected 77.6 (9.7 a week) | last 3 weeks 0.8 a week | lineup value 5.6
12489 | RJ Harvey | RB | age 25 | DEN | market 3710 | projected 68.8 (8.6 a week) | last 3 weeks 10.8 a week | lineup value 12.8
11627 | Troy Franklin | WR | age 23 | DEN | market 3039 | projected 63.8 (8 a week) | last 3 weeks 3.5 a week | lineup value 2.2
11646 | Jalen Coker | WR | age 24 | CAR | market 3276 | projected 48.2 (6 a week) | last 3 weeks 0 a week | lineup value 0
6149 | Darius Slayton | WR | age 29 | IND | market 0 | projected 46.1 (5.8 a week) | last 3 weeks 1 a week | lineup value 2.2
4033 | David Njoku | TE | age 30 | LAC | market 2855 | projected 41.8 (5.2 a week) | last 3 weeks 9.2 a week | lineup value 0
9484 | Tucker Kraft | TE | age 25 | GB | market 4161 | projected 36.6 (4.6 a week) | last 3 weeks 7.6 a week | lineup value 9.9
5927 | Terry McLaurin | WR | age 31 | WAS | market 3404 | projected 36.1 (4.5 a week) | last 3 weeks 0 a week | lineup value 8
12455 | Brashard Smith | RB | age 23 | KC | market 2687 | projected 29.2 (3.6 a week) | last 3 weeks 3.9 a week | lineup value 0
12530 | Travis Hunter | DB | age 23 | JAX | market 0 | projected 8.3 (1 a week) | last 3 weeks 7 a week | lineup value 0

PARTNER (partnerId 10): record 2-4, rank 8, points for 596, contention window 0.11
11560 | Caleb Williams | QB | age 24 | CHI | market 4527 | projected 128.9 (16.1 a week) | last 3 weeks 10.2 a week | lineup value 17.5
5870 | Daniel Jones | QB | age 29 | IND | market 2450 | projected 117.1 (14.6 a week) | last 3 weeks 16.8 a week | lineup value 5.7
7569 | Nico Collins | WR | age 27 | HOU | market 4447 | projected 111.4 (13.9 a week) | last 3 weeks 9.3 a week | lineup value 35.6
12514 | Emeka Egbuka | WR | age 24 | TB | market 4529 | projected 101.9 (12.7 a week) | last 3 weeks 18.6 a week | lineup value 26.5
12512 | Quinshon Judkins | RB | age 22 | CLE | market 4364 | projected 97.6 (12.2 a week) | last 3 weeks 13 a week | lineup value 23.1
11647 | Kimani Vidal | RB | age 25 | LAC | market 2792 | projected 91.8 (11.5 a week) | last 3 weeks 7.6 a week | lineup value 20.6
5045 | Courtland Sutton | WR | age 31 | DEN | market 3194 | projected 90.5 (11.3 a week) | last 3 weeks 13.2 a week | lineup value 15.3
8151 | Kenneth Walker | RB | age 25 | KC | market 4520 | projected 79.9 (10 a week) | last 3 weeks 8.8 a week | lineup value 4.9
11624 | Xavier Worthy | WR | age 23 | KC | market 3497 | projected 75.9 (9.5 a week) | last 3 weeks 12.9 a week | lineup value 4.7
5022 | Dallas Goedert | TE | age 31 | PHI | market 3132 | projected 75.8 (9.5 a week) | last 3 weeks 18.9 a week | lineup value 17.3
3214 | Hunter Henry | TE | age 31 | NE | market 3154 | projected 70 (8.8 a week) | last 3 weeks 8.1 a week | lineup value 11.5
12533 | Jacory Croskey-Merritt | RB | age 25 | WAS | market 3227 | projected 67.7 (8.5 a week) | last 3 weeks 12.8 a week | lineup value 8.9
8167 | Christian Watson | WR | age 27 | GB | market 3676 | projected 60.4 (7.5 a week) | last 3 weeks 0 a week | lineup value 0.2
9500 | Josh Downs | WR | age 25 | IND | market 3351 | projected 55.7 (7 a week) | last 3 weeks 11.3 a week | lineup value 0
11435 | Emanuel Wilson | RB | age 27 | SEA | market 2465 | projected 53.6 (6.7 a week) | last 3 weeks 0.6 a week | lineup value 4
9504 | Kayshon Boutte | WR | age 24 | HOU | market 2975 | projected 45.8 (5.7 a week) | last 3 weeks 0 a week | lineup value 0
6770 | Joe Burrow | QB | age 29 | CIN | market 4034 | projected 34.2 (4.3 a week) | last 3 weeks 0 a week | lineup value 1.9
11584 | Bucky Irving | RB | age 24 | TB | market 4286 | projected 29.2 (3.6 a week) | last 3 weeks 8.2 a week | lineup value 4.7

PARTNER (partnerId 2): record 2-4, rank 7, points for 677.4, contention window 0.27
4046 | Patrick Mahomes | QB | age 31 | KC | market 3409 | projected 152.5 (19.1 a week) | last 3 weeks 28.5 a week | lineup value 36.3
6797 | Justin Herbert | QB | age 28 | LAC | market 3769 | projected 136.4 (17.1 a week) | last 3 weeks 16.3 a week | lineup value 20.3
10229 | Rashee Rice | WR | age 26 | KC | market 4429 | projected 121.7 (15.2 a week) | last 3 weeks 0 a week | lineup value 50.7
7564 | Ja'Marr Chase | WR | age 26 | CIN | market 5806 | projected 116.2 (14.5 a week) | last 3 weeks 20.5 a week | lineup value 50.6
2133 | Davante Adams | WR | age 33 | LAR | market 3386 | projected 108.1 (13.5 a week) | last 3 weeks 12.4 a week | lineup value 37.5
7021 | Rico Dowdle | RB | age 28 | PIT | market 3226 | projected 95.8 (12 a week) | last 3 weeks 23.1 a week | lineup value 40.8
11604 | Brock Bowers | TE | age 23 | LV | market 5556 | projected 95.2 (11.9 a week) | last 3 weeks 3.2 a week | lineup value 89.9
5859 | A.J. Brown | WR | age 29 | NE | market 4330 | projected 87.9 (11 a week) | last 3 weeks 8.7 a week | lineup value 27.6
1479 | Keenan Allen | WR | age 34 | IND | market 2143 | projected 84.6 (10.6 a week) | last 3 weeks 8.4 a week | lineup value 9.7
5967 | Tony Pollard | RB | age 29 | TEN | market 3186 | projected 61.5 (7.7 a week) | last 3 weeks 10.4 a week | lineup value 18.1
4035 | Alvin Kamara | RB | age 31 | NO | market 2495 | projected 59.8 (7.5 a week) | last 3 weeks 11.1 a week | lineup value 14
6806 | J.K. Dobbins | RB | age 27 | DEN | market 3289 | projected 50.8 (6.4 a week) | last 3 weeks 10.3 a week | lineup value 10.5
4950 | Christian Kirk | WR | age 29 | SF | market 2204 | projected 38.1 (4.8 a week) | last 3 weeks 5.1 a week | lineup value 0
8143 | Jerome Ford | RB | age 27 | ARI | market 0 | projected 36.3 (4.5 a week) | last 3 weeks 5 a week | lineup value 6
12501 | Matthew Golden | WR | age 23 | GB | market 3541 | projected 33.4 (4.2 a week) | last 3 weeks 8.2 a week | lineup value 0
8698 | Jake Tonges | TE | age 27 | SF | market 2722 | projected 9.9 (1.2 a week) | last 3 weeks 3.9 a week | lineup value 4.6
12457 | Jaydon Blue | RB | age 22 | PHI | market 2737 | projected 7.1 (0.9 a week) | last 3 weeks 0.2 a week | lineup value 0

PARTNER (partnerId 6): record 1-5, rank 9, points for 575.9, contention window 0
11563 | Bo Nix | QB | age 26 | DEN | market 3766 | projected 129.1 (16.1 a week) | last 3 weeks 19.3 a week | lineup value 55.5
12527 | Ashton Jeanty | RB | age 22 | LV | market 5336 | projected 109.9 (13.7 a week) | last 3 weeks 21.7 a week | lineup value 46.4
11635 | Ladd McConkey | WR | age 24 | LAC | market 4615 | projected 97.4 (12.2 a week) | last 3 weeks 13.3 a week | lineup value 59.1
12474 | Woody Marks | RB | age 25 | HOU | market 3123 | projected 96.4 (12 a week) | last 3 weeks 10.1 a week | lineup value 25.2
7567 | Kenny Gainwell | RB | age 27 | TB | market 3107 | projected 78.6 (9.8 a week) | last 3 weeks 13.7 a week | lineup value 8.3
8110 | Jake Ferguson | TE | age 27 | DAL | market 3464 | projected 77.9 (9.7 a week) | last 3 weeks 17.7 a week | lineup value 21.2
4199 | Aaron Jones | RB | age 31 | MIN | market 2774 | projected 74.2 (9.3 a week) | last 3 weeks 0 a week | lineup value 11.5
9758 | C.J. Stroud | QB | age 25 | HOU | market 3092 | projected 73.6 (9.2 a week) | last 3 weeks 15.7 a week | lineup value 0
5844 | T.J. Hockenson | TE | age 29 | MIN | market 2968 | projected 67.3 (8.4 a week) | last 3 weeks 5.9 a week | lineup value 10.6
11628 | Marvin Harrison | WR | age 24 | HOU | market 3937 | projected 50.4 (6.3 a week) | last 3 weeks 12.5 a week | lineup value 23.1
11631 | Brian Thomas | WR | age 24 | JAX | market 3943 | projected 50.3 (6.3 a week) | last 3 weeks 15.2 a week | lineup value 12
12490 | Bhayshul Tuten | RB | age 23 | JAX | market 4205 | projected 46.1 (5.8 a week) | last 3 weeks 3.4 a week | lineup value 0
11638 | Ricky Pearsall | WR | age 26 | SF | market 2215 | projected 31.2 (3.9 a week) | last 3 weeks 2.9 a week | lineup value 23.3
8205 | Isiah Pacheco | RB | age 27 | DET | market 2542 | projected 30.5 (3.8 a week) | last 3 weeks 9.2 a week | lineup value 2.2
4037 | Chris Godwin | WR | age 30 | TB | market 3097 | projected 26.9 (3.4 a week) | last 3 weeks 3.7 a week | lineup value 8.6
8154 | Brian Robinson | RB | age 27 | ATL | market 3120 | projected 24.1 (3 a week) | last 3 weeks 2.4 a week | lineup value 0
11199 | Emari Demercado | RB | age 27 | DAL | market 0 | projected 21.7 (2.7 a week) | last 3 weeks 1.7 a week | lineup value 2.5
8123 | Hassan Haskins | RB | age 26 | NE | market 0 | projected 8.7 (1.1 a week) | last 3 weeks 1.1 a week | lineup value 0

PARTNER (partnerId 7): record 2-4, rank 6, points for 694.2, contention window 0.42
6904 | Jalen Hurts | QB | age 28 | PHI | market 3969 | projected 147.9 (18.5 a week) | last 3 weeks 19.8 a week | lineup value 93
5850 | Josh Jacobs | RB | age 28 | GB | market 4024 | projected 126.4 (15.8 a week) | last 3 weeks 21.2 a week | lineup value 62.6
6794 | Justin Jefferson | WR | age 27 | MIN | market 4839 | projected 124 (15.5 a week) | last 3 weeks 14 a week | lineup value 50.9
9997 | Zay Flowers | WR | age 26 | BAL | market 4195 | projected 103 (12.9 a week) | last 3 weeks 11.4 a week | lineup value 36.4
2449 | Stefon Diggs | WR | age 32 | WAS | market 2790 | projected 99.1 (12.4 a week) | last 3 weeks 15.5 a week | lineup value 33
7543 | Travis Etienne | RB | age 27 | NO | market 3813 | projected 89.5 (11.2 a week) | last 3 weeks 12.6 a week | lineup value 27.3
8134 | Khalil Shakir | WR | age 26 | BUF | market 3146 | projected 85.9 (10.7 a week) | last 3 weeks 11.7 a week | lineup value 19.3
4098 | Kareem Hunt | RB | age 30 | FA | market 1803 | projected 67.1 (8.4 a week) | last 3 weeks 9.6 a week | lineup value 8.2
8183 | Brock Purdy | QB | age 26 | SF | market 3580 | projected 54.9 (6.9 a week) | last 3 weeks 6.2 a week | lineup value 0
4988 | Nick Chubb | RB | age 30 | FA | market 1791 | projected 53.6 (6.7 a week) | last 3 weeks 6.8 a week | lineup value 0
11626 | Xavier Legette | WR | age 25 | CAR | market 0 | projected 48.1 (6 a week) | last 3 weeks 4.4 a week | lineup value 0
7594 | Chuba Hubbard | RB | age 27 | CAR | market 3336 | projected 42.6 (5.3 a week) | last 3 weeks 3.3 a week | lineup value 1.3
3200 | Sterling Shepard | WR | age 33 | NYJ | market 1661 | projected 41.4 (5.2 a week) | last 3 weeks 2.4 a week | lineup value 0
7571 | Rashod Bateman | WR | age 26 | BAL | market 2484 | projected 40.2 (5 a week) | last 3 weeks 1.7 a week | lineup value 0
10236 | Dalton Kincaid | TE | age 26 | BUF | market 3776 | projected 39.8 (5 a week) | last 3 weeks 8.9 a week | lineup value 19.3
7611 | Rhamondre Stevenson | RB | age 28 | NE | market 3319 | projected 39.8 (5 a week) | last 3 weeks 6.9 a week | lineup value 5.7
10859 | Sam LaPorta | TE | age 25 | DET | market 4257 | projected 37.4 (4.7 a week) | last 3 weeks 14.5 a week | lineup value 16.9
3321 | Tyreek Hill | WR | age 31 | FA | market 2521 | projected 0 (0 a week) | last 3 weeks 4.2 a week | lineup value 0

CANDIDATE DEALS (from a rules-based finder; points are the finder projections for the rest of the season):
c1 | partnerId 9 | I give Luther Burden (12519) | I get Chase Brown + Rachaad White (9224,8136) | my points 38.7 | their points -87.4 | likelihood 0.92
c2 | partnerId 10 | I give Luther Burden (12519) | I get Nico Collins + Emeka Egbuka (7569,12514) | my points 47.1 | their points -67.4 | likelihood 0.79
c3 | partnerId 9 | I give Luther Burden + Kendre Miller (12519,9757) | I get Chase Brown + TreVeyon Henderson (9224,12529) | my points 32.9 | their points -85.7 | likelihood 0.88
c4 | partnerId 10 | I give Luther Burden + Calvin Ridley (12519,4981) | I get Nico Collins + Quinshon Judkins (7569,12512) | my points 42.9 | their points -63 | likelihood 0.86
c5 | partnerId 2 | I give Luther Burden + Zonovan Knight (12519,8122) | I get Rashee Rice + Davante Adams (10229,2133) | my points 63.6 | their points -77.4 | likelihood 0.79
c6 | partnerId 10 | I give Luther Burden + Kendre Miller (12519,9757) | I get Nico Collins + Kimani Vidal (7569,11647) | my points 40 | their points -58.4 | likelihood 0.92
c7 | partnerId 2 | I give Luther Burden + Elic Ayomanor (12519,12499) | I get Rashee Rice + Rico Dowdle (10229,7021) | my points 56 | their points -91.3 | likelihood 0.79
c8 | partnerId 2 | I give Luther Burden + Garrett Wilson (12519,8146) | I get Rashee Rice + A.J. Brown (10229,5859) | my points 56.3 | their points -83.5 | likelihood 0.77
c9 | partnerId 6 | I give Kendre Miller + Luther Burden (9757,12519) | I get Ladd McConkey + Woody Marks (11635,12474) | my points 24 | their points -76.7 | likelihood 0.88
c10 | partnerId 6 | I give Luther Burden (12519) | I get Ladd McConkey + Marvin Harrison (11635,11628) | my points 18.2 | their points -82.8 | likelihood 0.86
c11 | partnerId 7 | I give Luther Burden + Zach Ertz (12519,1339) | I get Josh Jacobs + Zay Flowers (5850,9997) | my points 52.8 | their points -73.8 | likelihood 0.72
c12 | partnerId 7 | I give Luther Burden + Zonovan Knight (12519,8122) | I get Josh Jacobs + Stefon Diggs (5850,2449) | my points 57.5 | their points -87.6 | likelihood 0.82

Pick the best trades for my team.

=========== CASE 1180995252055453696-w7-r8 ===========
REPLY FILE: /Users/anik/workspace/chrome/sleeper/.eval-market/replies/suggest-v2/heldout1/1180995252055453696-w7-r8.json
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
Lineup slots: QB, RB, RB, WR, WR, TE, FLEX, FLEX, BN, BN, BN, BN, BN, BN, BN, BN, BN. Superflex: no. Tight end premium: no. Points per reception: 1.
Columns: id | name | position | age | team | market value | projected points for the rest of the regular season (and per week) | points per week over the last three weeks played | lineup value (points my lineup loses if this player is removed).

MY TEAM (partnerId me): record 6-0, rank 1, points for 857.8, contention window 1
4034 | Christian McCaffrey | RB | age 30 | SF | market 4587 | projected 163.2 (20.4 a week) | last 3 weeks 25.7 a week | lineup value 91.4
6786 | CeeDee Lamb | WR | age 27 | DAL | market 4944 | projected 133.3 (16.7 a week) | last 3 weeks 0 a week | lineup value 59.5
9493 | Puka Nacua | WR | age 25 | LAR | market 5709 | projected 123.9 (15.5 a week) | last 3 weeks 21.8 a week | lineup value 66.5
7588 | Javonte Williams | RB | age 26 | DAL | market 4003 | projected 116.5 (14.6 a week) | last 3 weeks 18.1 a week | lineup value 44.5
7523 | Trevor Lawrence | QB | age 27 | JAX | market 3578 | projected 112.9 (14.1 a week) | last 3 weeks 19 a week | lineup value 36.1
4217 | George Kittle | TE | age 33 | SF | market 3152 | projected 95.8 (12 a week) | last 3 weeks 0 a week | lineup value 43.2
12526 | Tetairoa McMillan | WR | age 23 | CAR | market 4738 | projected 94.3 (11.8 a week) | last 3 weeks 13.8 a week | lineup value 20.7
8121 | Romeo Doubs | WR | age 26 | NE | market 3168 | projected 84.7 (10.6 a week) | last 3 weeks 13.4 a week | lineup value 6
8408 | Jordan Mason | RB | age 27 | MIN | market 3054 | projected 67.6 (8.5 a week) | last 3 weeks 6.9 a week | lineup value 0
7591 | Justin Fields | QB | age 27 | KC | market 1208 | projected 67.6 (8.5 a week) | last 3 weeks 19 a week | lineup value 19.7
9753 | Zach Charbonnet | RB | age 25 | SEA | market 3171 | projected 67.1 (8.4 a week) | last 3 weeks 9.6 a week | lineup value 2.6
8112 | Drake London | WR | age 25 | ATL | market 4879 | projected 64.8 (8.1 a week) | last 3 weeks 18.9 a week | lineup value 22
12498 | Mason Taylor | TE | age 22 | NYJ | market 3687 | projected 61.2 (7.7 a week) | last 3 weeks 0.4 a week | lineup value 8.6
9508 | Tyjae Spears | RB | age 25 | TEN | market 2944 | projected 60.4 (7.5 a week) | last 3 weeks 3.5 a week | lineup value 0.9
11566 | Jayden Daniels | QB | age 25 | WAS | market 4390 | projected 57 (7.1 a week) | last 3 weeks 12.6 a week | lineup value 6.7
10444 | Cedric Tillman | WR | age 26 | NO | market 0 | projected 37.5 (4.7 a week) | last 3 weeks 0.5 a week | lineup value 0
12481 | Cam Skattebo | RB | age 24 | NYG | market 4193 | projected 28.5 (3.6 a week) | last 3 weeks 19.1 a week | lineup value 4.3
12504 | Kaleb Johnson | RB | age 23 | GB | market 2719 | projected 10.7 (1.3 a week) | last 3 weeks 1.2 a week | lineup value 0

PARTNER (partnerId 9): record 1-5, rank 10, points for 569.7, contention window 0
3294 | Dak Prescott | QB | age 33 | DAL | market 3199 | projected 136.6 (17.1 a week) | last 3 weeks 26.9 a week | lineup value 29.7
7547 | Amon-Ra St. Brown | WR | age 26 | DET | market 5321 | projected 136.6 (17.1 a week) | last 3 weeks 18.9 a week | lineup value 71.8
3163 | Jared Goff | QB | age 32 | DET | market 3020 | projected 126 (15.8 a week) | last 3 weeks 16.6 a week | lineup value 19.1
9224 | Chase Brown | RB | age 26 | CIN | market 4492 | projected 100.4 (12.5 a week) | last 3 weeks 9.9 a week | lineup value 43.5
12529 | TreVeyon Henderson | RB | age 23 | NE | market 4317 | projected 90 (11.2 a week) | last 3 weeks 7.3 a week | lineup value 30.2
8136 | Rachaad White | RB | age 27 | WAS | market 2727 | projected 87 (10.9 a week) | last 3 weeks 16.4 a week | lineup value 33.3
4983 | DJ Moore | WR | age 29 | BUF | market 3659 | projected 82.8 (10.4 a week) | last 3 weeks 5.3 a week | lineup value 11.9
7553 | Kyle Pitts | TE | age 26 | ATL | market 3971 | projected 80 (10 a week) | last 3 weeks 7.6 a week | lineup value 19.7
7090 | Darnell Mooney | WR | age 28 | NYG | market 2376 | projected 77.6 (9.7 a week) | last 3 weeks 0.8 a week | lineup value 5.6
12489 | RJ Harvey | RB | age 25 | DEN | market 3710 | projected 68.8 (8.6 a week) | last 3 weeks 10.8 a week | lineup value 12.8
11627 | Troy Franklin | WR | age 23 | DEN | market 3039 | projected 63.8 (8 a week) | last 3 weeks 3.5 a week | lineup value 2.2
11646 | Jalen Coker | WR | age 24 | CAR | market 3276 | projected 48.2 (6 a week) | last 3 weeks 0 a week | lineup value 0
6149 | Darius Slayton | WR | age 29 | IND | market 0 | projected 46.1 (5.8 a week) | last 3 weeks 1 a week | lineup value 2.2
4033 | David Njoku | TE | age 30 | LAC | market 2855 | projected 41.8 (5.2 a week) | last 3 weeks 9.2 a week | lineup value 0
9484 | Tucker Kraft | TE | age 25 | GB | market 4161 | projected 36.6 (4.6 a week) | last 3 weeks 7.6 a week | lineup value 9.9
5927 | Terry McLaurin | WR | age 31 | WAS | market 3404 | projected 36.1 (4.5 a week) | last 3 weeks 0 a week | lineup value 8
12455 | Brashard Smith | RB | age 23 | KC | market 2687 | projected 29.2 (3.6 a week) | last 3 weeks 3.9 a week | lineup value 0
12530 | Travis Hunter | DB | age 23 | JAX | market 0 | projected 8.3 (1 a week) | last 3 weeks 7 a week | lineup value 0

PARTNER (partnerId 2): record 2-4, rank 7, points for 677.4, contention window 0.27
4046 | Patrick Mahomes | QB | age 31 | KC | market 3409 | projected 152.5 (19.1 a week) | last 3 weeks 28.5 a week | lineup value 36.3
6797 | Justin Herbert | QB | age 28 | LAC | market 3769 | projected 136.4 (17.1 a week) | last 3 weeks 16.3 a week | lineup value 20.3
10229 | Rashee Rice | WR | age 26 | KC | market 4429 | projected 121.7 (15.2 a week) | last 3 weeks 0 a week | lineup value 50.7
7564 | Ja'Marr Chase | WR | age 26 | CIN | market 5806 | projected 116.2 (14.5 a week) | last 3 weeks 20.5 a week | lineup value 50.6
2133 | Davante Adams | WR | age 33 | LAR | market 3386 | projected 108.1 (13.5 a week) | last 3 weeks 12.4 a week | lineup value 37.5
7021 | Rico Dowdle | RB | age 28 | PIT | market 3226 | projected 95.8 (12 a week) | last 3 weeks 23.1 a week | lineup value 40.8
11604 | Brock Bowers | TE | age 23 | LV | market 5556 | projected 95.2 (11.9 a week) | last 3 weeks 3.2 a week | lineup value 89.9
5859 | A.J. Brown | WR | age 29 | NE | market 4330 | projected 87.9 (11 a week) | last 3 weeks 8.7 a week | lineup value 27.6
1479 | Keenan Allen | WR | age 34 | IND | market 2143 | projected 84.6 (10.6 a week) | last 3 weeks 8.4 a week | lineup value 9.7
5967 | Tony Pollard | RB | age 29 | TEN | market 3186 | projected 61.5 (7.7 a week) | last 3 weeks 10.4 a week | lineup value 18.1
4035 | Alvin Kamara | RB | age 31 | NO | market 2495 | projected 59.8 (7.5 a week) | last 3 weeks 11.1 a week | lineup value 14
6806 | J.K. Dobbins | RB | age 27 | DEN | market 3289 | projected 50.8 (6.4 a week) | last 3 weeks 10.3 a week | lineup value 10.5
4950 | Christian Kirk | WR | age 29 | SF | market 2204 | projected 38.1 (4.8 a week) | last 3 weeks 5.1 a week | lineup value 0
8143 | Jerome Ford | RB | age 27 | ARI | market 0 | projected 36.3 (4.5 a week) | last 3 weeks 5 a week | lineup value 6
12501 | Matthew Golden | WR | age 23 | GB | market 3541 | projected 33.4 (4.2 a week) | last 3 weeks 8.2 a week | lineup value 0
8698 | Jake Tonges | TE | age 27 | SF | market 2722 | projected 9.9 (1.2 a week) | last 3 weeks 3.9 a week | lineup value 4.6
12457 | Jaydon Blue | RB | age 22 | PHI | market 2737 | projected 7.1 (0.9 a week) | last 3 weeks 0.2 a week | lineup value 0

PARTNER (partnerId 7): record 2-4, rank 6, points for 694.2, contention window 0.42
6904 | Jalen Hurts | QB | age 28 | PHI | market 3969 | projected 147.9 (18.5 a week) | last 3 weeks 19.8 a week | lineup value 93
5850 | Josh Jacobs | RB | age 28 | GB | market 4024 | projected 126.4 (15.8 a week) | last 3 weeks 21.2 a week | lineup value 62.6
6794 | Justin Jefferson | WR | age 27 | MIN | market 4839 | projected 124 (15.5 a week) | last 3 weeks 14 a week | lineup value 50.9
9997 | Zay Flowers | WR | age 26 | BAL | market 4195 | projected 103 (12.9 a week) | last 3 weeks 11.4 a week | lineup value 36.4
2449 | Stefon Diggs | WR | age 32 | WAS | market 2790 | projected 99.1 (12.4 a week) | last 3 weeks 15.5 a week | lineup value 33
7543 | Travis Etienne | RB | age 27 | NO | market 3813 | projected 89.5 (11.2 a week) | last 3 weeks 12.6 a week | lineup value 27.3
8134 | Khalil Shakir | WR | age 26 | BUF | market 3146 | projected 85.9 (10.7 a week) | last 3 weeks 11.7 a week | lineup value 19.3
4098 | Kareem Hunt | RB | age 30 | FA | market 1803 | projected 67.1 (8.4 a week) | last 3 weeks 9.6 a week | lineup value 8.2
8183 | Brock Purdy | QB | age 26 | SF | market 3580 | projected 54.9 (6.9 a week) | last 3 weeks 6.2 a week | lineup value 0
4988 | Nick Chubb | RB | age 30 | FA | market 1791 | projected 53.6 (6.7 a week) | last 3 weeks 6.8 a week | lineup value 0
11626 | Xavier Legette | WR | age 25 | CAR | market 0 | projected 48.1 (6 a week) | last 3 weeks 4.4 a week | lineup value 0
7594 | Chuba Hubbard | RB | age 27 | CAR | market 3336 | projected 42.6 (5.3 a week) | last 3 weeks 3.3 a week | lineup value 1.3
3200 | Sterling Shepard | WR | age 33 | NYJ | market 1661 | projected 41.4 (5.2 a week) | last 3 weeks 2.4 a week | lineup value 0
7571 | Rashod Bateman | WR | age 26 | BAL | market 2484 | projected 40.2 (5 a week) | last 3 weeks 1.7 a week | lineup value 0
10236 | Dalton Kincaid | TE | age 26 | BUF | market 3776 | projected 39.8 (5 a week) | last 3 weeks 8.9 a week | lineup value 19.3
7611 | Rhamondre Stevenson | RB | age 28 | NE | market 3319 | projected 39.8 (5 a week) | last 3 weeks 6.9 a week | lineup value 5.7
10859 | Sam LaPorta | TE | age 25 | DET | market 4257 | projected 37.4 (4.7 a week) | last 3 weeks 14.5 a week | lineup value 16.9
3321 | Tyreek Hill | WR | age 31 | FA | market 2521 | projected 0 (0 a week) | last 3 weeks 4.2 a week | lineup value 0

PARTNER (partnerId 10): record 2-4, rank 8, points for 596, contention window 0.11
11560 | Caleb Williams | QB | age 24 | CHI | market 4527 | projected 128.9 (16.1 a week) | last 3 weeks 10.2 a week | lineup value 17.5
5870 | Daniel Jones | QB | age 29 | IND | market 2450 | projected 117.1 (14.6 a week) | last 3 weeks 16.8 a week | lineup value 5.7
7569 | Nico Collins | WR | age 27 | HOU | market 4447 | projected 111.4 (13.9 a week) | last 3 weeks 9.3 a week | lineup value 35.6
12514 | Emeka Egbuka | WR | age 24 | TB | market 4529 | projected 101.9 (12.7 a week) | last 3 weeks 18.6 a week | lineup value 26.5
12512 | Quinshon Judkins | RB | age 22 | CLE | market 4364 | projected 97.6 (12.2 a week) | last 3 weeks 13 a week | lineup value 23.1
11647 | Kimani Vidal | RB | age 25 | LAC | market 2792 | projected 91.8 (11.5 a week) | last 3 weeks 7.6 a week | lineup value 20.6
5045 | Courtland Sutton | WR | age 31 | DEN | market 3194 | projected 90.5 (11.3 a week) | last 3 weeks 13.2 a week | lineup value 15.3
8151 | Kenneth Walker | RB | age 25 | KC | market 4520 | projected 79.9 (10 a week) | last 3 weeks 8.8 a week | lineup value 4.9
11624 | Xavier Worthy | WR | age 23 | KC | market 3497 | projected 75.9 (9.5 a week) | last 3 weeks 12.9 a week | lineup value 4.7
5022 | Dallas Goedert | TE | age 31 | PHI | market 3132 | projected 75.8 (9.5 a week) | last 3 weeks 18.9 a week | lineup value 17.3
3214 | Hunter Henry | TE | age 31 | NE | market 3154 | projected 70 (8.8 a week) | last 3 weeks 8.1 a week | lineup value 11.5
12533 | Jacory Croskey-Merritt | RB | age 25 | WAS | market 3227 | projected 67.7 (8.5 a week) | last 3 weeks 12.8 a week | lineup value 8.9
8167 | Christian Watson | WR | age 27 | GB | market 3676 | projected 60.4 (7.5 a week) | last 3 weeks 0 a week | lineup value 0.2
9500 | Josh Downs | WR | age 25 | IND | market 3351 | projected 55.7 (7 a week) | last 3 weeks 11.3 a week | lineup value 0
11435 | Emanuel Wilson | RB | age 27 | SEA | market 2465 | projected 53.6 (6.7 a week) | last 3 weeks 0.6 a week | lineup value 4
9504 | Kayshon Boutte | WR | age 24 | HOU | market 2975 | projected 45.8 (5.7 a week) | last 3 weeks 0 a week | lineup value 0
6770 | Joe Burrow | QB | age 29 | CIN | market 4034 | projected 34.2 (4.3 a week) | last 3 weeks 0 a week | lineup value 1.9
11584 | Bucky Irving | RB | age 24 | TB | market 4286 | projected 29.2 (3.6 a week) | last 3 weeks 8.2 a week | lineup value 4.7

PARTNER (partnerId 3): record 3-3, rank 5, points for 633.1, contention window 0.58
11564 | Drake Maye | QB | age 24 | NE | market 4954 | projected 140.7 (17.6 a week) | last 3 weeks 20.5 a week | lineup value 140.7
4866 | Saquon Barkley | RB | age 29 | PHI | market 4216 | projected 113.1 (14.1 a week) | last 3 weeks 14.6 a week | lineup value 46
8144 | Chris Olave | WR | age 26 | NO | market 4430 | projected 107.1 (13.4 a week) | last 3 weeks 12.9 a week | lineup value 44
8150 | Kyren Williams | RB | age 26 | LAR | market 4531 | projected 105.8 (13.2 a week) | last 3 weeks 18.7 a week | lineup value 41.1
7526 | Jaylen Waddle | WR | age 27 | DEN | market 4014 | projected 102 (12.8 a week) | last 3 weeks 15.5 a week | lineup value 39.8
8155 | Breece Hall | RB | age 25 | NYJ | market 4242 | projected 101.3 (12.7 a week) | last 3 weeks 12.8 a week | lineup value 34.2
8126 | Wan'Dale Robinson | WR | age 25 | TEN | market 3417 | projected 90.2 (11.3 a week) | last 3 weeks 11 a week | lineup value 27.2
5892 | David Montgomery | RB | age 29 | HOU | market 3453 | projected 77.4 (9.7 a week) | last 3 weeks 9.2 a week | lineup value 13.6
5012 | Mark Andrews | TE | age 31 | BAL | market 3109 | projected 67.9 (8.5 a week) | last 3 weeks 6.9 a week | lineup value 13.4
12517 | Colston Loveland | TE | age 22 | CHI | market 5265 | projected 61.9 (7.7 a week) | last 3 weeks 1 a week | lineup value 2.7
4039 | Cooper Kupp | WR | age 33 | SEA | market 2102 | projected 53.6 (6.7 a week) | last 3 weeks 10.2 a week | lineup value 0
11571 | Isaiah Davis | RB | age 24 | NYJ | market 0 | projected 45.6 (5.7 a week) | last 3 weeks 2.5 a week | lineup value 0
12495 | Ollie Gordon | RB | age 22 | MIA | market 0 | projected 30.3 (3.8 a week) | last 3 weeks 0.7 a week | lineup value 0
2505 | Darren Waller | TE | age 34 | CAR | market 1420 | projected 25.6 (3.2 a week) | last 3 weeks 15.2 a week | lineup value 4.8
12503 | Isaiah Bond | WR | age 22 | CLE | market 0 | projected 23.6 (2.9 a week) | last 3 weeks 1 a week | lineup value 0
2216 | Mike Evans | WR | age 33 | SF | market 3200 | projected 15.4 (1.9 a week) | last 3 weeks 0 a week | lineup value 3.2
6803 | Brandon Aiyuk | WR | age 28 | SF | market 2490 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0
5849 | Kyler Murray | QB | age 29 | MIN | market 3322 | projected 0 (0 a week) | last 3 weeks 10.8 a week | lineup value 0

CANDIDATE DEALS (from a rules-based finder; points are the finder projections for the rest of the season):
c1 | partnerId 9 | I give Kaleb Johnson + Zach Charbonnet (12504,9753) | I get Rachaad White + Jared Goff (8136,3163) | my points 24 | their points -46.8 | likelihood 0.87
c2 | partnerId 2 | I give Kaleb Johnson + Cam Skattebo (12504,12481) | I get Patrick Mahomes + Davante Adams (4046,2133) | my points 50.6 | their points -69.3 | likelihood 0.92
c3 | partnerId 7 | I give Jayden Daniels + Mason Taylor (11566,12498) | I get Josh Jacobs + Brock Purdy (5850,8183) | my points 37.4 | their points -12.6 | likelihood 0.74
c4 | partnerId 7 | I give Jordan Mason + Jayden Daniels (8408,11566) | I get Josh Jacobs (5850) | my points 40 | their points -33.9 | likelihood 0.68
c5 | partnerId 10 | I give Tyjae Spears (9508) | I get Kimani Vidal (11647) | my points 13 | their points -20.1 | likelihood 0.74
c6 | partnerId 7 | I give Jayden Daniels + Cam Skattebo (11566,12481) | I get Josh Jacobs + Stefon Diggs (5850,2449) | my points 44.9 | their points -69.4 | likelihood 0.64
c7 | partnerId 3 | I give Jayden Daniels + Cam Skattebo (11566,12481) | I get Saquon Barkley (4866) | my points 25.6 | their points -17 | likelihood 0.57

Pick the best trades for my team.

=========== CASE 1181049419897057280-w10-r5 ===========
REPLY FILE: /Users/anik/workspace/chrome/sleeper/.eval-market/replies/suggest-v2/heldout1/1181049419897057280-w10-r5.json
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
Lineup slots: QB, RB, RB, WR, WR, WR, TE, FLEX, FLEX, FLEX, SUPER_FLEX, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN. Superflex: yes. Tight end premium: yes. Points per reception: 1.
Columns: id | name | position | age | team | market value | projected points for the rest of the regular season (and per week) | points per week over the last three weeks played | lineup value (points my lineup loses if this player is removed).

MY TEAM (partnerId me): record 5-4, rank 4, points for 1343.2, contention window 0.82
8130 | Trey McBride | TE | age 26 | ARI | market 4880 | projected 104.6 (20.9 a week) | last 3 weeks 17.8 a week | lineup value 61.8
3198 | Derrick Henry | RB | age 32 | BAL | market 4135 | projected 83.9 (16.8 a week) | last 3 weeks 10.7 a week | lineup value 41.3
8150 | Kyren Williams | RB | age 26 | LAR | market 4550 | projected 72.1 (14.4 a week) | last 3 weeks 8.6 a week | lineup value 29.5
7588 | Javonte Williams | RB | age 26 | DAL | market 4033 | projected 67.3 (13.5 a week) | last 3 weeks 14.7 a week | lineup value 30.2
12506 | Harold Fannin | TE | age 22 | CLE | market 4697 | projected 59.6 (11.9 a week) | last 3 weeks 10.3 a week | lineup value 16.8
8111 | Cade Otton | TE | age 27 | TB | market 2960 | projected 54 (10.8 a week) | last 3 weeks 9 a week | lineup value 11.2
12526 | Tetairoa McMillan | WR | age 23 | CAR | market 4721 | projected 53.9 (10.8 a week) | last 3 weeks 10.6 a week | lineup value 18.9
8121 | Romeo Doubs | WR | age 26 | NE | market 3164 | projected 52.5 (10.5 a week) | last 3 weeks 12.9 a week | lineup value 9.7
9756 | Jordan Addison | WR | age 24 | MIN | market 3611 | projected 52 (10.4 a week) | last 3 weeks 13.9 a week | lineup value 11.4
6819 | Michael Pittman | WR | age 29 | PIT | market 2990 | projected 50.5 (10.1 a week) | last 3 weeks 21.6 a week | lineup value 16.1
7090 | Darnell Mooney | WR | age 28 | NYG | market 2370 | projected 49.6 (9.9 a week) | last 3 weeks 4.8 a week | lineup value 6.8
12508 | Jaxson Dart | QB | age 23 | NYG | market 7047 | projected 46.9 (9.4 a week) | last 3 weeks 29 a week | lineup value 36.4
6770 | Joe Burrow | QB | age 29 | CIN | market 6932 | projected 41.1 (8.2 a week) | last 3 weeks 0 a week | lineup value 30.5
9508 | Tyjae Spears | RB | age 25 | TEN | market 2980 | projected 37.1 (7.4 a week) | last 3 weeks 11.1 a week | lineup value 2.1
6039 | Ty Johnson | RB | age 29 | BUF | market 0 | projected 28.3 (5.7 a week) | last 3 weeks 3.5 a week | lineup value 0
10231 | Elijah Higgins | TE | age 25 | ARI | market 0 | projected 22.2 (4.4 a week) | last 3 weeks 3.1 a week | lineup value 0
11630 | Roman Wilson | WR | age 25 | PIT | market 0 | projected 20.9 (4.2 a week) | last 3 weeks 6.8 a week | lineup value 0
9482 | Michael Mayer | TE | age 25 | LV | market 0 | projected 19.1 (3.8 a week) | last 3 weeks 3.2 a week | lineup value 0
7891 | Brock Wright | TE | age 27 | DET | market 0 | projected 18.5 (3.7 a week) | last 3 weeks 3.1 a week | lineup value 0
12495 | Ollie Gordon | RB | age 22 | MIA | market 0 | projected 17.1 (3.4 a week) | last 3 weeks 5.9 a week | lineup value 0
7594 | Chuba Hubbard | RB | age 27 | CAR | market 3362 | projected 16.1 (3.2 a week) | last 3 weeks 6.2 a week | lineup value 0
8135 | Treylon Burks | WR | age 26 | WAS | market 0 | projected 12 (2.4 a week) | last 3 weeks 0.8 a week | lineup value 0
5409 | Tanner Hudson | TE | age 31 | CIN | market 0 | projected 10.3 (2.1 a week) | last 3 weeks 3.2 a week | lineup value 0
5113 | Cedrick Wilson | WR | age 30 | FA | market 0 | projected 7.5 (1.5 a week) | last 3 weeks 1 a week | lineup value 0
5008 | Durham Smythe | TE | age 31 | BAL | market 0 | projected 2.2 (0.4 a week) | last 3 weeks 0 a week | lineup value 0
4017 | Deshaun Watson | QB | age 31 | CLE | market 2502 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0
4663 | Austin Ekeler | RB | age 31 | WAS | market 0 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0
5248 | Gus Edwards | RB | age 29 | FA | market 2773 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0
5849 | Kyler Murray | QB | age 29 | MIN | market 4796 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0
5987 | Alexander Mattison | RB | age 27 | FA | market 1374 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0

PARTNER (partnerId 4): record 4-5, rank 5, points for 1394.5, contention window 0.69
4943 | Sam Darnold | QB | age 29 | SEA | market 4770 | projected 96.5 (19.3 a week) | last 3 weeks 15.3 a week | lineup value 14.6
4034 | Christian McCaffrey | RB | age 30 | SF | market 4598 | projected 91.7 (18.3 a week) | last 3 weeks 27.7 a week | lineup value 71.6
11563 | Bo Nix | QB | age 26 | DEN | market 6390 | projected 88 (17.6 a week) | last 3 weeks 32.8 a week | lineup value 11.2
96 | Aaron Rodgers | QB | age 42 | PIT | market 3150 | projected 80 (16 a week) | last 3 weeks 21.8 a week | lineup value 3.7
2133 | Davante Adams | WR | age 33 | LAR | market 3373 | projected 77.6 (15.5 a week) | last 3 weeks 16.5 a week | lineup value 56.6
7525 | DeVonta Smith | WR | age 27 | PHI | market 4155 | projected 73.3 (14.7 a week) | last 3 weeks 15.9 a week | lineup value 52.3
5012 | Mark Andrews | TE | age 31 | BAL | market 3101 | projected 57.4 (11.5 a week) | last 3 weeks 8.5 a week | lineup value 31.2
827 | Tyrod Taylor | QB | age 37 | GB | market 0 | projected 53.6 (10.7 a week) | last 3 weeks 0.7 a week | lineup value 10.6
5045 | Courtland Sutton | WR | age 31 | DEN | market 3184 | projected 50.1 (10 a week) | last 3 weeks 12.5 a week | lineup value 29.2
8131 | Isaiah Likely | TE | age 26 | NYG | market 3478 | projected 37.9 (7.6 a week) | last 3 weeks 4.8 a week | lineup value 11.7
9500 | Josh Downs | WR | age 25 | IND | market 3345 | projected 37.4 (7.5 a week) | last 3 weeks 9.5 a week | lineup value 20.5
12490 | Bhayshul Tuten | RB | age 23 | JAX | market 4232 | projected 34.2 (6.8 a week) | last 3 weeks 3.9 a week | lineup value 12.4
4381 | Taysom Hill | TE | age 35 | FA | market 1529 | projected 24.9 (5 a week) | last 3 weeks 3.2 a week | lineup value 4.4
9511 | Keaton Mitchell | RB | age 24 | LAC | market 2859 | projected 24.8 (5 a week) | last 3 weeks 2.4 a week | lineup value 4.6
5927 | Terry McLaurin | WR | age 31 | WAS | market 3389 | projected 24.2 (4.8 a week) | last 3 weeks 4.8 a week | lineup value 10.6
9494 | Marvin Mims | WR | age 24 | DEN | market 2740 | projected 17 (3.4 a week) | last 3 weeks 5.9 a week | lineup value 3.8
7611 | Rhamondre Stevenson | RB | age 28 | NE | market 3352 | projected 16 (3.2 a week) | last 3 weeks 7.6 a week | lineup value 3.2
8154 | Brian Robinson | RB | age 27 | ATL | market 3190 | projected 14.6 (2.9 a week) | last 3 weeks 5 a week | lineup value 0
7828 | Noah Gray | TE | age 27 | KC | market 0 | projected 8.9 (1.8 a week) | last 3 weeks 3.2 a week | lineup value 0
2359 | Ameer Abdullah | RB | age 33 | JAX | market 0 | projected 7.9 (1.6 a week) | last 3 weeks 2.3 a week | lineup value 0
11558 | Sam Hartman | QB | age 27 | WAS | market 0 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0
11616 | Jacob Cowing | WR | age 25 | SF | market 0 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0

PARTNER (partnerId 1): record 9-0, rank 1, points for 1680.1, contention window 1
4892 | Baker Mayfield | QB | age 31 | TB | market 4907 | projected 109.4 (21.9 a week) | last 3 weeks 5.7 a week | lineup value 33.5
421 | Matthew Stafford | QB | age 38 | LAR | market 4704 | projected 108.2 (21.6 a week) | last 3 weeks 24.1 a week | lineup value 32.4
7547 | Amon-Ra St. Brown | WR | age 26 | DET | market 5297 | projected 98.1 (19.6 a week) | last 3 weeks 13.1 a week | lineup value 57
9226 | De'Von Achane | RB | age 25 | MIA | market 4983 | projected 90.3 (18.1 a week) | last 3 weeks 16.5 a week | lineup value 57.2
6813 | Jonathan Taylor | RB | age 27 | IND | market 5003 | projected 89.3 (17.9 a week) | last 3 weeks 26.4 a week | lineup value 56.6
5846 | DK Metcalf | WR | age 28 | PIT | market 3435 | projected 63.4 (12.7 a week) | last 3 weeks 9 a week | lineup value 22.3
7564 | Ja'Marr Chase | WR | age 26 | CIN | market 5774 | projected 57.9 (11.6 a week) | last 3 weeks 25.4 a week | lineup value 32.5
1466 | Travis Kelce | TE | age 37 | KC | market 2861 | projected 55.8 (11.2 a week) | last 3 weeks 16.5 a week | lineup value 22.5
5892 | David Montgomery | RB | age 29 | HOU | market 3463 | projected 55.3 (11.1 a week) | last 3 weeks 5.6 a week | lineup value 14.2
7002 | Juwan Johnson | TE | age 30 | NO | market 3114 | projected 51.6 (10.3 a week) | last 3 weeks 13.9 a week | lineup value 21.4
1166 | Kirk Cousins | QB | age 38 | LV | market 2457 | projected 51 (10.2 a week) | last 3 weeks 2.4 a week | lineup value 0
9753 | Zach Charbonnet | RB | age 25 | SEA | market 3186 | projected 46.7 (9.3 a week) | last 3 weeks 8.4 a week | lineup value 6.2
9754 | Quentin Johnston | WR | age 25 | LAC | market 3434 | projected 45 (9 a week) | last 3 weeks 8.8 a week | lineup value 11.9
4039 | Cooper Kupp | WR | age 33 | SEA | market 2095 | projected 43.4 (8.7 a week) | last 3 weeks 0.7 a week | lineup value 2.3
10444 | Cedric Tillman | WR | age 26 | NO | market 0 | projected 37.6 (7.5 a week) | last 3 weeks 0 a week | lineup value 0
2306 | Jameis Winston | QB | age 32 | NYG | market 0 | projected 34.4 (6.9 a week) | last 3 weeks 0 a week | lineup value 0
2374 | Tyler Lockett | WR | age 33 | FA | market 2518 | projected 34.4 (6.9 a week) | last 3 weeks 1.3 a week | lineup value 0
9479 | Darnell Washington | TE | age 25 | PIT | market 0 | projected 32.5 (6.5 a week) | last 3 weeks 3.4 a week | lineup value 0
8210 | Chig Okonkwo | TE | age 27 | WAS | market 3059 | projected 29.5 (5.9 a week) | last 3 weeks 5.1 a week | lineup value 0
11626 | Xavier Legette | WR | age 25 | CAR | market 0 | projected 28.7 (5.7 a week) | last 3 weeks 10.4 a week | lineup value 0
5970 | Greg Dortch | WR | age 28 | BUF | market 0 | projected 28.1 (5.6 a week) | last 3 weeks 1.1 a week | lineup value 0.9
11577 | Will Shipley | RB | age 24 | PHI | market 0 | projected 7.8 (1.6 a week) | last 3 weeks 0.6 a week | lineup value 0

PARTNER (partnerId 7): record 3-6, rank 11, points for 1313.9, contention window 0
4881 | Lamar Jackson | QB | age 29 | BAL | market 7786 | projected 130.7 (26.1 a week) | last 3 weeks 11.2 a week | lineup value 60.5
3294 | Dak Prescott | QB | age 33 | DAL | market 5543 | projected 96.7 (19.3 a week) | last 3 weeks 17.8 a week | lineup value 46.1
7543 | Travis Etienne | RB | age 27 | NO | market 3837 | projected 66.7 (13.3 a week) | last 3 weeks 7.7 a week | lineup value 42.7
2307 | Marcus Mariota | QB | age 32 | WAS | market 0 | projected 60.5 (12.1 a week) | last 3 weeks 5.7 a week | lineup value 0
7526 | Jaylen Waddle | WR | age 27 | DEN | market 4000 | projected 59.8 (12 a week) | last 3 weeks 12.5 a week | lineup value 25.8
11635 | Ladd McConkey | WR | age 24 | LAC | market 4595 | projected 56.1 (11.2 a week) | last 3 weeks 15.4 a week | lineup value 22
12493 | Oronde Gadsden | TE | age 23 | LAC | market 4194 | projected 54.3 (10.9 a week) | last 3 weeks 22.8 a week | lineup value 20.3
5872 | Deebo Samuel | WR | age 30 | SF | market 2700 | projected 52.9 (10.6 a week) | last 3 weeks 4.5 a week | lineup value 18.8
4098 | Kareem Hunt | RB | age 30 | FA | market 1813 | projected 44.2 (8.8 a week) | last 3 weeks 10.5 a week | lineup value 20.9
11597 | Theo Johnson | TE | age 25 | NYG | market 3213 | projected 42.8 (8.6 a week) | last 3 weeks 12.3 a week | lineup value 16.6
12485 | Tez Johnson | WR | age 24 | TB | market 0 | projected 41.2 (8.2 a week) | last 3 weeks 8.4 a week | lineup value 7.2
7591 | Justin Fields | QB | age 27 | KC | market 1998 | projected 36.9 (7.4 a week) | last 3 weeks 9 a week | lineup value 0.4
12540 | Chimere Dike | WR | age 24 | TEN | market 2866 | projected 34.3 (6.9 a week) | last 3 weeks 13.6 a week | lineup value 8.5
10219 | Chris Rodriguez | RB | age 27 | JAX | market 2758 | projected 30.8 (6.2 a week) | last 3 weeks 6.6 a week | lineup value 7.4
1426 | DeAndre Hopkins | WR | age 33 | FA | market 1500 | projected 27.7 (5.5 a week) | last 3 weeks 0.8 a week | lineup value 5.7
11628 | Marvin Harrison | WR | age 24 | HOU | market 3922 | projected 24.3 (4.9 a week) | last 3 weeks 10.1 a week | lineup value 5.8
7571 | Rashod Bateman | WR | age 26 | BAL | market 2473 | projected 24 (4.8 a week) | last 3 weeks 5.5 a week | lineup value 0
10236 | Dalton Kincaid | TE | age 26 | BUF | market 3769 | projected 23.4 (4.7 a week) | last 3 weeks 9.6 a week | lineup value 5.4
12492 | Pat Bryant | WR | age 23 | DEN | market 3009 | projected 20.3 (4.1 a week) | last 3 weeks 5.9 a week | lineup value 0
8119 | Jahan Dotson | WR | age 26 | ATL | market 0 | projected 16 (3.2 a week) | last 3 weeks 3.7 a week | lineup value 2.3
12535 | Isaac TeSlaa | WR | age 24 | DET | market 2791 | projected 14.7 (2.9 a week) | last 3 weeks 0 a week | lineup value 0
7670 | Joshua Palmer | WR | age 27 | BUF | market 0 | projected 14.6 (2.9 a week) | last 3 weeks 0 a week | lineup value 5.1

PARTNER (partnerId 2): record 4-5, rank 9, points for 1131.1, contention window 0.18
4984 | Josh Allen | QB | age 30 | BUF | market 7714 | projected 135.1 (27 a week) | last 3 weeks 18.7 a week | lineup value 135.1
6786 | CeeDee Lamb | WR | age 27 | DAL | market 4916 | projected 77.4 (15.5 a week) | last 3 weeks 17.4 a week | lineup value 58.1
12514 | Emeka Egbuka | WR | age 24 | TB | market 4519 | projected 72.2 (14.4 a week) | last 3 weeks 5.4 a week | lineup value 47.2
5001 | Dalton Schultz | TE | age 30 | HOU | market 3164 | projected 58.5 (11.7 a week) | last 3 weeks 15.1 a week | lineup value 33.5
12518 | Tyler Warren | TE | age 24 | IND | market 4596 | projected 57.5 (11.5 a week) | last 3 weeks 13.4 a week | lineup value 38.3
10213 | Tre Tucker | WR | age 25 | LV | market 2698 | projected 54.2 (10.8 a week) | last 3 weeks 5 a week | lineup value 29.2
8167 | Christian Watson | WR | age 27 | GB | market 3659 | projected 49.4 (9.9 a week) | last 3 weeks 6.8 a week | lineup value 24.4
12502 | Gunnar Helm | TE | age 24 | TEN | market 3237 | projected 30 (6 a week) | last 3 weeks 8 a week | lineup value 10.6
12521 | Elijah Arroyo | TE | age 23 | SEA | market 0 | projected 24.7 (4.9 a week) | last 3 weeks 6.7 a week | lineup value 0
8917 | KaVontae Turpin | WR | age 30 | DAL | market 1158 | projected 18.2 (3.6 a week) | last 3 weeks 2.3 a week | lineup value 0.1
3269 | Chris Moore | WR | age 33 | BAL | market 0 | projected 16.6 (3.3 a week) | last 3 weeks 2.6 a week | lineup value 2.6
8172 | Greg Dulcich | TE | age 26 | MIA | market 2425 | projected 16.3 (3.3 a week) | last 3 weeks 0 a week | lineup value 1.4
8225 | Daniel Bellinger | TE | age 26 | TEN | market 0 | projected 16 (3.2 a week) | last 3 weeks 1.2 a week | lineup value 0.2
4040 | JuJu Smith-Schuster | WR | age 29 | FA | market 1345 | projected 15.4 (3.1 a week) | last 3 weeks 4.2 a week | lineup value 0
7694 | Tommy Tremble | TE | age 26 | CAR | market 0 | projected 14.6 (2.9 a week) | last 3 weeks 1.1 a week | lineup value 0
7587 | Dyami Brown | WR | age 26 | WAS | market 0 | projected 14.3 (2.9 a week) | last 3 weeks 4.3 a week | lineup value 0.9
8205 | Isiah Pacheco | RB | age 27 | DET | market 2550 | projected 13 (2.6 a week) | last 3 weeks 6.1 a week | lineup value 13
12523 | Jimmy Horn | WR | age 24 | CLE | market 0 | projected 10.9 (2.2 a week) | last 3 weeks 1.7 a week | lineup value 0
5995 | Justice Hill | RB | age 28 | BAL | market 2025 | projected 9.5 (1.9 a week) | last 3 weeks 1.2 a week | lineup value 9.5
12539 | Arian Smith | WR | age 25 | NYJ | market 0 | projected 7 (1.4 a week) | last 3 weeks 1.4 a week | lineup value 0
7596 | Elijah Moore | WR | age 26 | PHI | market 0 | projected 7 (1.4 a week) | last 3 weeks 2.1 a week | lineup value 0
8117 | Jalen Tolbert | WR | age 27 | MIA | market 0 | projected 2.8 (0.6 a week) | last 3 weeks 5.1 a week | lineup value 0

CANDIDATE DEALS (from a rules-based finder; points are the finder projections for the rest of the season):
c1 | partnerId 4 | I give Tyjae Spears + Romeo Doubs (9508,8121) | I get Aaron Rodgers (96) | my points 33.9 | their points 26.2 | likelihood 0.78
c2 | partnerId 4 | I give Romeo Doubs + Cade Otton (8121,8111) | I get Aaron Rodgers + Tyrod Taylor (96,827) | my points 39 | their points 20.8 | likelihood 0.78
c3 | partnerId 1 | I give Trey McBride (8130) | I get Jameis Winston + Matthew Stafford (2306,421) | my points 27.9 | their points 20.1 | likelihood 0.85
c4 | partnerId 7 | I give Deshaun Watson + Kyler Murray (4017,5849) | I get Marcus Mariota + Ladd McConkey (2307,11635) | my points 47.1 | their points -22 | likelihood 0.77
c5 | partnerId 1 | I give Trey McBride + Romeo Doubs (8130,8121) | I get Jameis Winston + Baker Mayfield (2306,4892) | my points 18.3 | their points 26.3 | likelihood 0.79
c6 | partnerId 7 | I give Gus Edwards + Kyler Murray (5248,5849) | I get Justin Fields + Ladd McConkey (7591,11635) | my points 43.1 | their points -22.4 | likelihood 0.78
c7 | partnerId 4 | I give Romeo Doubs + Kyren Williams (8121,8150) | I get Sam Darnold + Tyrod Taylor (4943,827) | my points 28.7 | their points 29.8 | likelihood 0.55
c8 | partnerId 1 | I give Michael Pittman (6819) | I get Jameis Winston + Kirk Cousins (2306,1166) | my points 32.6 | their points 14.6 | likelihood 0.95
c9 | partnerId 4 | I give Javonte Williams + Kyren Williams (7588,8150) | I get Sam Darnold + Aaron Rodgers (4943,96) | my points 12.4 | their points 38.9 | likelihood 0.7
c10 | partnerId 7 | I give Kyler Murray (5849) | I get Jaylen Waddle + Marcus Mariota (7526,2307) | my points 50.9 | their points -25.8 | likelihood 0.95
c11 | partnerId 2 | I give Deshaun Watson + Kyler Murray (4017,5849) | I get Emeka Egbuka + Dalton Schultz (12514,5001) | my points 28.1 | their points -84.4 | likelihood 0.83
c12 | partnerId 2 | I give Gus Edwards + Kyler Murray (5248,5849) | I get Emeka Egbuka + Christian Watson (12514,8167) | my points 25.8 | their points -75.3 | likelihood 0.79

Pick the best trades for my team.
