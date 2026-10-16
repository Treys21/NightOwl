You are answering fantasy football trade-advice cases. For each case below, follow the SYSTEM text, read the DATA, and write your JSON answer to the reply file named for that case.
Rules: write only the JSON object (no markdown fence, no commentary) to each reply file. Do not read any other file on disk. Do not look at any directory named truth or any file outside the reply paths. Work each case independently.

=========== CASE 1048386748260241408-w7-r10 ===========
REPLY FILE: /Users/anik/workspace/chrome/sleeper/.eval-market/replies/suggest-v2/run1/1048386748260241408-w7-r10.json
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
Lineup slots: QB, RB, RB, WR, WR, TE, FLEX, SUPER_FLEX, K, DEF, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN. Superflex: yes. Tight end premium: no. Points per reception: 1.
Columns: id | name | position | age | team | market value | projected points for the rest of the regular season (and per week) | points per week over the last three weeks played | lineup value (points my lineup loses if this player is removed).

MY TEAM (partnerId me): record 0-6, rank 12, points for 524.5, contention window 0
6797 | Justin Herbert | QB | age 28 | LAC | market 5194 | projected 129.9 (16.2 a week) | last 3 weeks 8.3 a week | lineup value 26.6
9221 | Jahmyr Gibbs | RB | age 24 | DET | market 6368 | projected 125.3 (15.7 a week) | last 3 weeks 10.6 a week | lineup value 108.7
96 | Aaron Rodgers | QB | age 42 | PIT | market 2580 | projected 105.7 (13.2 a week) | last 3 weeks 13.7 a week | lineup value 11.7
1234 | Russell Wilson | QB | age 37 | FA | market 2040 | projected 102.1 (12.8 a week) | last 3 weeks 0 a week | lineup value 7.5
5045 | Courtland Sutton | WR | age 31 | DEN | market 3182 | projected 86.9 (10.9 a week) | last 3 weeks 11.8 a week | lineup value 39.2
1479 | Keenan Allen | WR | age 34 | IND | market 2143 | projected 73.1 (9.1 a week) | last 3 weeks 10.8 a week | lineup value 29.6
4663 | Austin Ekeler | RB | age 31 | WAS | market 0 | projected 63.3 (7.9 a week) | last 3 weeks 7.5 a week | lineup value 46.7
5844 | T.J. Hockenson | TE | age 29 | MIN | market 2958 | projected 60.8 (7.6 a week) | last 3 weeks 0 a week | lineup value 53.3
9754 | Quentin Johnston | WR | age 25 | LAC | market 3434 | projected 54.3 (6.8 a week) | last 3 weeks 2.5 a week | lineup value 15.6
7839 | Evan McPherson | K | age 27 | CIN | market 0 | projected 51.4 (6.4 a week) | last 3 weeks 7 a week | lineup value 51.3
8121 | Romeo Doubs | WR | age 26 | NE | market 3166 | projected 50 (6.3 a week) | last 3 weeks 9.3 a week | lineup value 13.2
SF | San Francisco 49ers | DEF | age ? | SF | market 0 | projected 47.5 (5.9 a week) | last 3 weeks 15.3 a week | lineup value 47.5
4082 | Curtis Samuel | WR | age 29 | FA | market 1443 | projected 34.6 (4.3 a week) | last 3 weeks 3.9 a week | lineup value 5.5
11650 | Luke McCaffrey | WR | age 25 | WAS | market 0 | projected 28.1 (3.5 a week) | last 3 weeks 3 a week | lineup value 0
6151 | Miles Sanders | RB | age 28 | FA | market 1689 | projected 13.4 (1.7 a week) | last 3 weeks 5.1 a week | lineup value 0
6803 | Brandon Aiyuk | WR | age 28 | SF | market 2488 | projected 12.4 (1.6 a week) | last 3 weeks 11.7 a week | lineup value 7
7608 | Khalil Herbert | RB | age 28 | ATL | market 0 | projected 9.9 (1.2 a week) | last 3 weeks 0 a week | lineup value 5.7
4089 | Gerald Everett | TE | age 30 | FA | market 0 | projected 8.8 (1.1 a week) | last 3 weeks 1.4 a week | lineup value 1.2
11559 | Michael Penix | QB | age 26 | ATL | market 3465 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0
6136 | Jarrett Stidham | QB | age 30 | DEN | market 2378 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0

PARTNER (partnerId 5): record 4-2, rank 4, points for 771.5, contention window 0.82
6794 | Justin Jefferson | WR | age 27 | MIN | market 4819 | projected 140.7 (17.6 a week) | last 3 weeks 11.9 a week | lineup value 62.8
5859 | A.J. Brown | WR | age 29 | NE | market 4313 | projected 133.7 (16.7 a week) | last 3 weeks 7.9 a week | lineup value 55.8
421 | Matthew Stafford | QB | age 38 | LAR | market 3576 | projected 120.4 (15 a week) | last 3 weeks 5.8 a week | lineup value 97.2
5927 | Terry McLaurin | WR | age 31 | WAS | market 3390 | projected 104.3 (13 a week) | last 3 weeks 18.3 a week | lineup value 34.2
4137 | James Conner | RB | age 31 | ARI | market 2741 | projected 93.5 (11.7 a week) | last 3 weeks 13 a week | lineup value 28.6
6813 | Jonathan Taylor | RB | age 27 | IND | market 5010 | projected 91.1 (11.4 a week) | last 3 weeks 6.6 a week | lineup value 31.4
7611 | Rhamondre Stevenson | RB | age 28 | NE | market 3354 | projected 83.3 (10.4 a week) | last 3 weeks 9.1 a week | lineup value 16.2
4217 | George Kittle | TE | age 33 | SF | market 3142 | projected 79.9 (10 a week) | last 3 weeks 19.2 a week | lineup value 29.9
11620 | Rome Odunze | WR | age 24 | CHI | market 4055 | projected 68.2 (8.5 a week) | last 3 weeks 5.7 a week | lineup value 2.5
5001 | Dalton Schultz | TE | age 30 | HOU | market 3164 | projected 61.7 (7.7 a week) | last 3 weeks 6.8 a week | lineup value 10.2
5096 | Ray-Ray McCloud | WR | age 29 | FA | market 0 | projected 60.4 (7.5 a week) | last 3 weeks 9.4 a week | lineup value 1.2
7042 | Tyler Bass | K | age 29 | BUF | market 0 | projected 59.6 (7.4 a week) | last 3 weeks 3.7 a week | lineup value 59.6
7596 | Elijah Moore | WR | age 26 | PHI | market 0 | projected 56.3 (7 a week) | last 3 weeks 2.5 a week | lineup value 0.6
MIA | Miami Dolphins | DEF | age ? | MIA | market 0 | projected 56.3 (7 a week) | last 3 weeks 2.7 a week | lineup value 13.9
8132 | Tyler Allgeier | RB | age 26 | ARI | market 3194 | projected 48.8 (6.1 a week) | last 3 weeks 11.8 a week | lineup value 0.8
SEA | Seattle Seahawks | DEF | age ? | SEA | market 0 | projected 44.1 (5.5 a week) | last 3 weeks 5 a week | lineup value 1.8
11600 | Ja'Tavion Sanders | TE | age 23 | CAR | market 0 | projected 40.5 (5.1 a week) | last 3 weeks 5.9 a week | lineup value 0
6943 | Gabe Davis | WR | age 26 | FA | market 1798 | projected 34.5 (4.3 a week) | last 3 weeks 9 a week | lineup value 0
3294 | Dak Prescott | QB | age 33 | DAL | market 4414 | projected 32.8 (4.1 a week) | last 3 weeks 12.1 a week | lineup value 9.7
11589 | Trey Benson | RB | age 24 | ARI | market 3158 | projected 24.5 (3.1 a week) | last 3 weeks 2.5 a week | lineup value 0
10219 | Chris Rodriguez | RB | age 27 | JAX | market 2758 | projected 7.2 (0.9 a week) | last 3 weeks 0 a week | lineup value 0
4951 | DJ Chark | WR | age 28 | FA | market 0 | projected 3.6 (0.4 a week) | last 3 weeks 0 a week | lineup value 0

PARTNER (partnerId 6): record 4-2, rank 3, points for 774, contention window 0.95
7564 | Ja'Marr Chase | WR | age 26 | CIN | market 5779 | projected 126.5 (15.8 a week) | last 3 weeks 23.7 a week | lineup value 47.4
8183 | Brock Purdy | QB | age 26 | SF | market 5091 | projected 106.8 (13.3 a week) | last 3 weeks 17.3 a week | lineup value 48.8
5967 | Tony Pollard | RB | age 29 | TEN | market 3194 | projected 103.5 (12.9 a week) | last 3 weeks 12.2 a week | lineup value 47.6
1426 | DeAndre Hopkins | WR | age 33 | FA | market 1502 | projected 89.9 (11.2 a week) | last 3 weeks 4.8 a week | lineup value 3.9
10222 | Jayden Reed | WR | age 26 | GB | market 3355 | projected 89.2 (11.2 a week) | last 3 weeks 18.5 a week | lineup value 11.4
5872 | Deebo Samuel | WR | age 30 | SF | market 2703 | projected 88.7 (11.1 a week) | last 3 weeks 11.3 a week | lineup value 10.4
4034 | Christian McCaffrey | RB | age 30 | SF | market 4591 | projected 79.8 (10 a week) | last 3 weeks 0 a week | lineup value 35.6
7588 | Javonte Williams | RB | age 26 | DAL | market 4031 | projected 75.2 (9.4 a week) | last 3 weeks 10.2 a week | lineup value 24.4
7021 | Rico Dowdle | RB | age 28 | PIT | market 3263 | projected 72.7 (9.1 a week) | last 3 weeks 14.3 a week | lineup value 18
9500 | Josh Downs | WR | age 25 | IND | market 3345 | projected 71.3 (8.9 a week) | last 3 weeks 19.2 a week | lineup value 4.8
9228 | Bryce Young | QB | age 25 | CAR | market 3624 | projected 68.3 (8.5 a week) | last 3 weeks 1 a week | lineup value 11.8
2028 | Derek Carr | QB | age 34 | FA | market 2498 | projected 64.5 (8.1 a week) | last 3 weeks 6.9 a week | lineup value 4.1
2309 | Amari Cooper | WR | age 31 | FA | market 2260 | projected 60.3 (7.5 a week) | last 3 weeks 8.6 a week | lineup value 5.5
DEN | Denver Broncos | DEF | age ? | DEN | market 0 | projected 53.6 (6.7 a week) | last 3 weeks 10.7 a week | lineup value 53.6
8110 | Jake Ferguson | TE | age 27 | DAL | market 3457 | projected 50.2 (6.3 a week) | last 3 weeks 9.7 a week | lineup value 24.6
10937 | Jake Moody | K | age 26 | FA | market 0 | projected 40.9 (5.1 a week) | last 3 weeks 7 a week | lineup value 40.9
11597 | Theo Johnson | TE | age 25 | NYG | market 3208 | projected 32.2 (4 a week) | last 3 weeks 5.8 a week | lineup value 5.9
5857 | Noah Fant | TE | age 28 | NO | market 0 | projected 30.8 (3.8 a week) | last 3 weeks 7.4 a week | lineup value 3.5
10229 | Rashee Rice | WR | age 26 | KC | market 4415 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0
11565 | J.J. McCarthy | QB | age 23 | NYG | market 3918 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0

CANDIDATE DEALS (from a rules-based finder; points are the finder projections for the rest of the season):
c1 | partnerId 5 | I give Aaron Rodgers + Russell Wilson (96,1234) | I get Chris Rodriguez + Elijah Moore (10219,7596) | my points -58.6 | their points 30.4 | likelihood 0.67
c2 | partnerId 6 | I give T.J. Hockenson + Aaron Rodgers (5844,96) | I get Theo Johnson (11597) | my points -38.8 | their points 28.1 | likelihood 0.61
c3 | partnerId 5 | I give Aaron Rodgers + Austin Ekeler (96,4663) | I get Chris Rodriguez (10219) | my points -57.8 | their points 25.3 | likelihood 0.58
c4 | partnerId 5 | I give Aaron Rodgers + T.J. Hockenson (96,5844) | I get Trey Benson (11589) | my points -61.5 | their points 28.5 | likelihood 0.58
c5 | partnerId 6 | I give Aaron Rodgers + Courtland Sutton (96,5045) | I get Josh Downs (9500) | my points -21.1 | their points 16.9 | likelihood 0.52

Pick the best trades for my team.

=========== CASE 1048386748260241408-w7-r5 ===========
REPLY FILE: /Users/anik/workspace/chrome/sleeper/.eval-market/replies/suggest-v2/run1/1048386748260241408-w7-r5.json
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
Lineup slots: QB, RB, RB, WR, WR, TE, FLEX, SUPER_FLEX, K, DEF, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN. Superflex: yes. Tight end premium: no. Points per reception: 1.
Columns: id | name | position | age | team | market value | projected points for the rest of the regular season (and per week) | points per week over the last three weeks played | lineup value (points my lineup loses if this player is removed).

MY TEAM (partnerId me): record 4-2, rank 4, points for 771.5, contention window 0.82
6794 | Justin Jefferson | WR | age 27 | MIN | market 4819 | projected 140.7 (17.6 a week) | last 3 weeks 11.9 a week | lineup value 62.8
5859 | A.J. Brown | WR | age 29 | NE | market 4313 | projected 133.7 (16.7 a week) | last 3 weeks 7.9 a week | lineup value 55.8
421 | Matthew Stafford | QB | age 38 | LAR | market 3576 | projected 120.4 (15 a week) | last 3 weeks 5.8 a week | lineup value 97.2
5927 | Terry McLaurin | WR | age 31 | WAS | market 3390 | projected 104.3 (13 a week) | last 3 weeks 18.3 a week | lineup value 34.2
4137 | James Conner | RB | age 31 | ARI | market 2741 | projected 93.5 (11.7 a week) | last 3 weeks 13 a week | lineup value 28.6
6813 | Jonathan Taylor | RB | age 27 | IND | market 5010 | projected 91.1 (11.4 a week) | last 3 weeks 6.6 a week | lineup value 31.4
7611 | Rhamondre Stevenson | RB | age 28 | NE | market 3354 | projected 83.3 (10.4 a week) | last 3 weeks 9.1 a week | lineup value 16.2
4217 | George Kittle | TE | age 33 | SF | market 3142 | projected 79.9 (10 a week) | last 3 weeks 19.2 a week | lineup value 29.9
11620 | Rome Odunze | WR | age 24 | CHI | market 4055 | projected 68.2 (8.5 a week) | last 3 weeks 5.7 a week | lineup value 2.5
5001 | Dalton Schultz | TE | age 30 | HOU | market 3164 | projected 61.7 (7.7 a week) | last 3 weeks 6.8 a week | lineup value 10.2
5096 | Ray-Ray McCloud | WR | age 29 | FA | market 0 | projected 60.4 (7.5 a week) | last 3 weeks 9.4 a week | lineup value 1.2
7042 | Tyler Bass | K | age 29 | BUF | market 0 | projected 59.6 (7.4 a week) | last 3 weeks 3.7 a week | lineup value 59.6
7596 | Elijah Moore | WR | age 26 | PHI | market 0 | projected 56.3 (7 a week) | last 3 weeks 2.5 a week | lineup value 0.6
MIA | Miami Dolphins | DEF | age ? | MIA | market 0 | projected 56.3 (7 a week) | last 3 weeks 2.7 a week | lineup value 13.9
8132 | Tyler Allgeier | RB | age 26 | ARI | market 3194 | projected 48.8 (6.1 a week) | last 3 weeks 11.8 a week | lineup value 0.8
SEA | Seattle Seahawks | DEF | age ? | SEA | market 0 | projected 44.1 (5.5 a week) | last 3 weeks 5 a week | lineup value 1.8
11600 | Ja'Tavion Sanders | TE | age 23 | CAR | market 0 | projected 40.5 (5.1 a week) | last 3 weeks 5.9 a week | lineup value 0
6943 | Gabe Davis | WR | age 26 | FA | market 1798 | projected 34.5 (4.3 a week) | last 3 weeks 9 a week | lineup value 0
3294 | Dak Prescott | QB | age 33 | DAL | market 4414 | projected 32.8 (4.1 a week) | last 3 weeks 12.1 a week | lineup value 9.7
11589 | Trey Benson | RB | age 24 | ARI | market 3158 | projected 24.5 (3.1 a week) | last 3 weeks 2.5 a week | lineup value 0
10219 | Chris Rodriguez | RB | age 27 | JAX | market 2758 | projected 7.2 (0.9 a week) | last 3 weeks 0 a week | lineup value 0
4951 | DJ Chark | WR | age 28 | FA | market 0 | projected 3.6 (0.4 a week) | last 3 weeks 0 a week | lineup value 0
6820 | Clyde Edwards-Helaire | RB | age 26 | FA | market 0 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0
8160 | Kenny Pickett | QB | age 28 | CAR | market 0 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0

PARTNER (partnerId 10): record 0-6, rank 12, points for 524.5, contention window 0
6797 | Justin Herbert | QB | age 28 | LAC | market 5194 | projected 129.9 (16.2 a week) | last 3 weeks 8.3 a week | lineup value 26.6
9221 | Jahmyr Gibbs | RB | age 24 | DET | market 6368 | projected 125.3 (15.7 a week) | last 3 weeks 10.6 a week | lineup value 108.7
96 | Aaron Rodgers | QB | age 42 | PIT | market 2580 | projected 105.7 (13.2 a week) | last 3 weeks 13.7 a week | lineup value 11.7
1234 | Russell Wilson | QB | age 37 | FA | market 2040 | projected 102.1 (12.8 a week) | last 3 weeks 0 a week | lineup value 7.5
5045 | Courtland Sutton | WR | age 31 | DEN | market 3182 | projected 86.9 (10.9 a week) | last 3 weeks 11.8 a week | lineup value 39.2
1479 | Keenan Allen | WR | age 34 | IND | market 2143 | projected 73.1 (9.1 a week) | last 3 weeks 10.8 a week | lineup value 29.6
4663 | Austin Ekeler | RB | age 31 | WAS | market 0 | projected 63.3 (7.9 a week) | last 3 weeks 7.5 a week | lineup value 46.7
5844 | T.J. Hockenson | TE | age 29 | MIN | market 2958 | projected 60.8 (7.6 a week) | last 3 weeks 0 a week | lineup value 53.3
9754 | Quentin Johnston | WR | age 25 | LAC | market 3434 | projected 54.3 (6.8 a week) | last 3 weeks 2.5 a week | lineup value 15.6
7839 | Evan McPherson | K | age 27 | CIN | market 0 | projected 51.4 (6.4 a week) | last 3 weeks 7 a week | lineup value 51.3
8121 | Romeo Doubs | WR | age 26 | NE | market 3166 | projected 50 (6.3 a week) | last 3 weeks 9.3 a week | lineup value 13.2
SF | San Francisco 49ers | DEF | age ? | SF | market 0 | projected 47.5 (5.9 a week) | last 3 weeks 15.3 a week | lineup value 47.5
4082 | Curtis Samuel | WR | age 29 | FA | market 1443 | projected 34.6 (4.3 a week) | last 3 weeks 3.9 a week | lineup value 5.5
11650 | Luke McCaffrey | WR | age 25 | WAS | market 0 | projected 28.1 (3.5 a week) | last 3 weeks 3 a week | lineup value 0
6151 | Miles Sanders | RB | age 28 | FA | market 1689 | projected 13.4 (1.7 a week) | last 3 weeks 5.1 a week | lineup value 0
6803 | Brandon Aiyuk | WR | age 28 | SF | market 2488 | projected 12.4 (1.6 a week) | last 3 weeks 11.7 a week | lineup value 7
7608 | Khalil Herbert | RB | age 28 | ATL | market 0 | projected 9.9 (1.2 a week) | last 3 weeks 0 a week | lineup value 5.7
4089 | Gerald Everett | TE | age 30 | FA | market 0 | projected 8.8 (1.1 a week) | last 3 weeks 1.4 a week | lineup value 1.2
11559 | Michael Penix | QB | age 26 | ATL | market 3465 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0
6136 | Jarrett Stidham | QB | age 30 | DEN | market 2378 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0

PARTNER (partnerId 7): record 2-4, rank 10, points for 756.7, contention window 0.05
4892 | Baker Mayfield | QB | age 31 | TB | market 3990 | projected 114.7 (14.3 a week) | last 3 weeks 26.1 a week | lineup value 51.5
6768 | Tua Tagovailoa | QB | age 28 | ATL | market 2680 | projected 110.9 (13.9 a week) | last 3 weeks 0 a week | lineup value 52.2
4039 | Cooper Kupp | WR | age 33 | SEA | market 2094 | projected 105.1 (13.1 a week) | last 3 weeks 0 a week | lineup value 39.6
11604 | Brock Bowers | TE | age 23 | LV | market 5530 | projected 93.6 (11.7 a week) | last 3 weeks 15 a week | lineup value 47.3
6790 | D'Andre Swift | RB | age 27 | CHI | market 3666 | projected 88.3 (11 a week) | last 3 weeks 23.8 a week | lineup value 65.9
7526 | Jaylen Waddle | WR | age 27 | DEN | market 4006 | projected 87.6 (10.9 a week) | last 3 weeks 5.4 a week | lineup value 18.9
11631 | Brian Thomas | WR | age 24 | JAX | market 3925 | projected 87 (10.9 a week) | last 3 weeks 16.9 a week | lineup value 23.3
5947 | Jakobi Meyers | WR | age 29 | JAX | market 3291 | projected 78.6 (9.8 a week) | last 3 weeks 7.7 a week | lineup value 18.4
4195 | Jake Elliott | K | age 31 | PHI | market 0 | projected 66.8 (8.3 a week) | last 3 weeks 3.7 a week | lineup value 13.2
6826 | Cole Kmet | TE | age 27 | CHI | market 0 | projected 54.2 (6.8 a week) | last 3 weeks 13 a week | lineup value 8
1348 | Dustin Hopkins | K | age 34 | FA | market 0 | projected 53.6 (6.7 a week) | last 3 weeks 6.7 a week | lineup value 0
10213 | Tre Tucker | WR | age 25 | LV | market 2694 | projected 53.2 (6.6 a week) | last 3 weeks 6.7 a week | lineup value 4.7
BUF | Buffalo Bills | DEF | age ? | BUF | market 0 | projected 52 (6.5 a week) | last 3 weeks 4.7 a week | lineup value 52
8180 | Jalen Nailor | WR | age 27 | LV | market 2615 | projected 41.6 (5.2 a week) | last 3 weeks 0.7 a week | lineup value 0
6945 | Antonio Gibson | RB | age 27 | FA | market 1425 | projected 34.6 (4.3 a week) | last 3 weeks 8.3 a week | lineup value 10
4147 | Samaje Perine | RB | age 31 | CIN | market 0 | projected 30.8 (3.9 a week) | last 3 weeks 3.6 a week | lineup value 7.5
8144 | Chris Olave | WR | age 26 | NO | market 4410 | projected 29.2 (3.7 a week) | last 3 weeks 6.4 a week | lineup value 3
11562 | Spencer Rattler | QB | age 26 | NO | market 0 | projected 22.3 (2.8 a week) | last 3 weeks 4.1 a week | lineup value 7
4718 | Dare Ogunbowale | RB | age 32 | HOU | market 0 | projected 20.7 (2.6 a week) | last 3 weeks 5.5 a week | lineup value 0
11630 | Roman Wilson | WR | age 25 | PIT | market 0 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0
5848 | Marquise Brown | WR | age 29 | PHI | market 0 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0
9220 | Evan Hull | RB | age 25 | ARI | market 0 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0

PARTNER (partnerId 9): record 3-3, rank 6, points for 864.1, contention window 0.56
7547 | Amon-Ra St. Brown | WR | age 26 | DET | market 5296 | projected 136.6 (17.1 a week) | last 3 weeks 11.5 a week | lineup value 66.3
4018 | Joe Mixon | RB | age 30 | FA | market 2254 | projected 122 (15.3 a week) | last 3 weeks 9.1 a week | lineup value 51.6
3198 | Derrick Henry | RB | age 32 | BAL | market 4136 | projected 120.7 (15.1 a week) | last 3 weeks 25.9 a week | lineup value 50.4
1466 | Travis Kelce | TE | age 37 | KC | market 2868 | projected 119.1 (14.9 a week) | last 3 weeks 10.6 a week | lineup value 61.8
1373 | Geno Smith | QB | age 36 | NYJ | market 2403 | projected 111.3 (13.9 a week) | last 3 weeks 18.9 a week | lineup value 38.5
8151 | Kenneth Walker | RB | age 25 | KC | market 4558 | projected 95.9 (12 a week) | last 3 weeks 23 a week | lineup value 32.1
11564 | Drake Maye | QB | age 24 | NE | market 6680 | projected 95.1 (11.9 a week) | last 3 weeks 6.5 a week | lineup value 24.1
6819 | Michael Pittman | WR | age 29 | PIT | market 2989 | projected 63.9 (8 a week) | last 3 weeks 14.8 a week | lineup value 6.6
10859 | Sam LaPorta | TE | age 25 | DET | market 4254 | projected 62.9 (7.9 a week) | last 3 weeks 7.2 a week | lineup value 5.6
MIN | Minnesota Vikings | DEF | age ? | MIN | market 0 | projected 61.4 (7.7 a week) | last 3 weeks 8.7 a week | lineup value 61.4
11533 | Brandon Aubrey | K | age 31 | DAL | market 0 | projected 61.2 (7.7 a week) | last 3 weeks 10.3 a week | lineup value 61.2
7523 | Trevor Lawrence | QB | age 27 | JAX | market 4998 | projected 59 (7.4 a week) | last 3 weeks 17.7 a week | lineup value 3.4
8117 | Jalen Tolbert | WR | age 27 | MIA | market 0 | projected 53 (6.6 a week) | last 3 weeks 4.6 a week | lineup value 2.1
11576 | Braelon Allen | RB | age 22 | NYJ | market 3227 | projected 51.7 (6.5 a week) | last 3 weeks 3.4 a week | lineup value 4.9
11638 | Ricky Pearsall | WR | age 26 | SF | market 2208 | projected 49.9 (6.2 a week) | last 3 weeks 0 a week | lineup value 3.2
10226 | Andrei Iosivas | WR | age 27 | CIN | market 0 | projected 44.7 (5.6 a week) | last 3 weeks 4.8 a week | lineup value 0
8408 | Jordan Mason | RB | age 27 | MIN | market 3080 | projected 38.7 (4.8 a week) | last 3 weeks 14 a week | lineup value 0
8143 | Jerome Ford | RB | age 27 | ARI | market 0 | projected 33.1 (4.1 a week) | last 3 weeks 8.3 a week | lineup value 0
1689 | Adam Thielen | WR | age 35 | FA | market 2214 | projected 30.1 (3.8 a week) | last 3 weeks 0 a week | lineup value 4.5
9508 | Tyjae Spears | RB | age 25 | TEN | market 2977 | projected 29.7 (3.7 a week) | last 3 weeks 4.9 a week | lineup value 0.2
6938 | Cam Akers | RB | age 26 | FA | market 0 | projected 26.3 (3.3 a week) | last 3 weeks 6 a week | lineup value 0
4037 | Chris Godwin | WR | age 30 | TB | market 3086 | projected 16 (2 a week) | last 3 weeks 20 a week | lineup value 4.8

CANDIDATE DEALS (from a rules-based finder; points are the finder projections for the rest of the season):
c1 | partnerId 10 | I give Chris Rodriguez (10219) | I get Aaron Rodgers + Russell Wilson (96,1234) | my points 30.4 | their points -73.4 | likelihood 0.9
c2 | partnerId 10 | I give Chris Rodriguez + Gabe Davis (10219,6943) | I get Aaron Rodgers + Austin Ekeler (96,4663) | my points 25.3 | their points -57.5 | likelihood 0.9
c3 | partnerId 10 | I give Trey Benson (11589) | I get Aaron Rodgers + T.J. Hockenson (96,5844) | my points 28.5 | their points -61.5 | likelihood 0.89
c4 | partnerId 7 | I give Trey Benson (11589) | I get Tua Tagovailoa + Cooper Kupp (6768,4039) | my points 35.3 | their points -98.3 | likelihood 0.94
c5 | partnerId 9 | I give Elijah Moore + Chris Rodriguez (7596,10219) | I get Joe Mixon (4018) | my points 41.6 | their points -49.7 | likelihood 0.62

Pick the best trades for my team.

=========== CASE 1180092558252679168-w10-r5 ===========
REPLY FILE: /Users/anik/workspace/chrome/sleeper/.eval-market/replies/suggest-v2/run1/1180092558252679168-w10-r5.json
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
Lineup slots: QB, RB, RB, WR, WR, TE, FLEX, FLEX, DEF, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN. Superflex: no. Tight end premium: no. Points per reception: 1.
Columns: id | name | position | age | team | market value | projected points for the rest of the regular season (and per week) | points per week over the last three weeks played | lineup value (points my lineup loses if this player is removed).

MY TEAM (partnerId me): record 7-2, rank 2, points for 1047.3, contention window 1
9509 | Bijan Robinson | RB | age 24 | ATL | market 6371 | projected 102 (20.4 a week) | last 3 weeks 14.9 a week | lineup value 45.4
2133 | Davante Adams | WR | age 33 | LAR | market 3376 | projected 77.6 (15.5 a week) | last 3 weeks 16.5 a week | lineup value 20.8
7588 | Javonte Williams | RB | age 26 | DAL | market 4036 | projected 67.3 (13.5 a week) | last 3 weeks 14.7 a week | lineup value 19.9
6790 | D'Andre Swift | RB | age 27 | CHI | market 3664 | projected 60.5 (12.1 a week) | last 3 weeks 12 a week | lineup value 3.8
8126 | Wan'Dale Robinson | WR | age 25 | TEN | market 3419 | projected 52.4 (10.5 a week) | last 3 weeks 12.3 a week | lineup value 6.6
6819 | Michael Pittman | WR | age 29 | PIT | market 2992 | projected 50.5 (10.1 a week) | last 3 weeks 21.6 a week | lineup value 6.6
12489 | RJ Harvey | RB | age 25 | DEN | market 3731 | projected 48.8 (9.8 a week) | last 3 weeks 16 a week | lineup value 4.9
11620 | Rome Odunze | WR | age 24 | CHI | market 4058 | projected 47.8 (9.6 a week) | last 3 weeks 7.8 a week | lineup value 1.9
4098 | Kareem Hunt | RB | age 30 | FA | market 1814 | projected 44.2 (8.8 a week) | last 3 weeks 10.5 a week | lineup value 0.3
8142 | Alec Pierce | WR | age 26 | IND | market 3408 | projected 43.2 (8.6 a week) | last 3 weeks 13.7 a week | lineup value 0
12517 | Colston Loveland | TE | age 22 | CHI | market 5266 | projected 43.1 (8.6 a week) | last 3 weeks 14 a week | lineup value 14.5
11435 | Emanuel Wilson | RB | age 27 | SEA | market 2487 | projected 37.8 (7.6 a week) | last 3 weeks 5.6 a week | lineup value 1.8
9758 | C.J. Stroud | QB | age 25 | HOU | market 3161 | projected 31.5 (6.3 a week) | last 3 weeks 13.9 a week | lineup value 31.5
11638 | Ricky Pearsall | WR | age 26 | SF | market 2210 | projected 31.4 (6.3 a week) | last 3 weeks 0 a week | lineup value 0
11559 | Michael Penix | QB | age 26 | ATL | market 2099 | projected 30 (6 a week) | last 3 weeks 11.7 a week | lineup value 30
9486 | Dontayvion Wicks | WR | age 25 | PHI | market 2551 | projected 29.1 (5.8 a week) | last 3 weeks 0.5 a week | lineup value 0
3200 | Sterling Shepard | WR | age 33 | NYJ | market 1656 | projected 27.6 (5.5 a week) | last 3 weeks 3.1 a week | lineup value 0
12521 | Elijah Arroyo | TE | age 23 | SEA | market 0 | projected 20.9 (4.2 a week) | last 3 weeks 5.7 a week | lineup value 0
NYG | New York Giants | DEF | age ? | NYG | market 0 | projected 19.8 (4 a week) | last 3 weeks 1.7 a week | lineup value 19.8
4993 | Mike Gesicki | TE | age 31 | CIN | market 1198 | projected 19.2 (3.8 a week) | last 3 weeks 0 a week | lineup value 0
12641 | Jaylin Lane | WR | age 24 | WAS | market 0 | projected 16.2 (3.2 a week) | last 3 weeks 4.6 a week | lineup value 0
12501 | Matthew Golden | WR | age 23 | GB | market 3516 | projected 8.9 (1.8 a week) | last 3 weeks 4.7 a week | lineup value 0
10222 | Jayden Reed | WR | age 26 | GB | market 3366 | projected 7.1 (1.4 a week) | last 3 weeks 0 a week | lineup value 0
11581 | MarShawn Lloyd | RB | age 25 | GB | market 3214 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0
11592 | Erick All | TE | age 26 | CIN | market 0 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0
11616 | Jacob Cowing | WR | age 25 | SF | market 0 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0
12500 | Quinn Ewers | QB | age 23 | JAX | market 0 | projected 0 (0 a week) | last 3 weeks 0.7 a week | lineup value 0
9484 | Tucker Kraft | TE | age 25 | GB | market 4154 | projected 0 (0 a week) | last 3 weeks 18 a week | lineup value 0

PARTNER (partnerId 9): record 7-2, rank 1, points for 1181, contention window 1
6904 | Jalen Hurts | QB | age 28 | PHI | market 4041 | projected 111.4 (22.3 a week) | last 3 weeks 16.5 a week | lineup value 6.7
4034 | Christian McCaffrey | RB | age 30 | SF | market 4602 | projected 91.7 (18.3 a week) | last 3 weeks 27.7 a week | lineup value 58.1
11564 | Drake Maye | QB | age 24 | NE | market 5101 | projected 86.2 (17.2 a week) | last 3 weeks 22.6 a week | lineup value 0
4866 | Saquon Barkley | RB | age 29 | PHI | market 4233 | projected 80.2 (16 a week) | last 3 weeks 12.9 a week | lineup value 38.5
11563 | Bo Nix | QB | age 26 | DEN | market 3842 | projected 76.3 (15.3 a week) | last 3 weeks 28.1 a week | lineup value 0
8228 | Jaylen Warren | RB | age 27 | PIT | market 3538 | projected 69.5 (13.9 a week) | last 3 weeks 15.3 a week | lineup value 27.8
5846 | DK Metcalf | WR | age 28 | PIT | market 3438 | projected 63.4 (12.7 a week) | last 3 weeks 9 a week | lineup value 29.1
5022 | Dallas Goedert | TE | age 31 | PHI | market 3128 | projected 55.7 (11.1 a week) | last 3 weeks 7.5 a week | lineup value 18.7
9754 | Quentin Johnston | WR | age 25 | LAC | market 3436 | projected 45 (9 a week) | last 3 weeks 8.8 a week | lineup value 16.2
8110 | Jake Ferguson | TE | age 27 | DAL | market 3462 | projected 44.1 (8.8 a week) | last 3 weeks 10 a week | lineup value 9
8132 | Tyler Allgeier | RB | age 26 | ARI | market 3206 | projected 36.2 (7.2 a week) | last 3 weeks 3.9 a week | lineup value 0
8408 | Jordan Mason | RB | age 27 | MIN | market 3077 | projected 35.7 (7.1 a week) | last 3 weeks 6 a week | lineup value 1.3
12490 | Bhayshul Tuten | RB | age 23 | JAX | market 4235 | projected 34.2 (6.8 a week) | last 3 weeks 3.9 a week | lineup value 0
7591 | Justin Fields | QB | age 27 | KC | market 1247 | projected 33.2 (6.6 a week) | last 3 weeks 8.3 a week | lineup value 0
TB | Tampa Bay Buccaneers | DEF | age ? | TB | market 0 | projected 32.3 (6.5 a week) | last 3 weeks 12.3 a week | lineup value 6
LAC | Los Angeles Chargers | DEF | age ? | LAC | market 0 | projected 29.5 (5.9 a week) | last 3 weeks 5 a week | lineup value 3.2
9480 | Brenton Strange | TE | age 25 | JAX | market 3626 | projected 29.2 (5.8 a week) | last 3 weeks 0 a week | lineup value 2.9
9511 | Keaton Mitchell | RB | age 24 | LAC | market 2861 | projected 24.8 (5 a week) | last 3 weeks 2.4 a week | lineup value 0
5848 | Marquise Brown | WR | age 29 | PHI | market 0 | projected 21.8 (4.4 a week) | last 3 weeks 6.2 a week | lineup value 0
12492 | Pat Bryant | WR | age 23 | DEN | market 3011 | projected 20.3 (4.1 a week) | last 3 weeks 5.9 a week | lineup value 0
9504 | Kayshon Boutte | WR | age 24 | HOU | market 2965 | projected 18.6 (3.7 a week) | last 3 weeks 10 a week | lineup value 4.1
9494 | Marvin Mims | WR | age 24 | DEN | market 2742 | projected 17 (3.4 a week) | last 3 weeks 5.9 a week | lineup value 0

PARTNER (partnerId 12): record 3-6, rank 10, points for 912, contention window 0.05
4984 | Josh Allen | QB | age 30 | BUF | market 4738 | projected 119.7 (23.9 a week) | last 3 weeks 17.3 a week | lineup value 37.5
3198 | Derrick Henry | RB | age 32 | BAL | market 4139 | projected 83.9 (16.8 a week) | last 3 weeks 10.7 a week | lineup value 39.8
3294 | Dak Prescott | QB | age 33 | DAL | market 3266 | projected 82.2 (16.4 a week) | last 3 weeks 16.1 a week | lineup value 0
5859 | A.J. Brown | WR | age 29 | NE | market 4313 | projected 75.6 (15.1 a week) | last 3 weeks 9.4 a week | lineup value 19.7
10229 | Rashee Rice | WR | age 26 | KC | market 4419 | projected 70.2 (14 a week) | last 3 weeks 22.4 a week | lineup value 26.7
7021 | Rico Dowdle | RB | age 28 | PIT | market 3262 | projected 64.1 (12.8 a week) | last 3 weeks 14.7 a week | lineup value 24
2449 | Stefon Diggs | WR | age 32 | WAS | market 2783 | projected 58.3 (11.7 a week) | last 3 weeks 12.4 a week | lineup value 12.2
8136 | Rachaad White | RB | age 27 | WAS | market 2755 | projected 52.5 (10.5 a week) | last 3 weeks 5.5 a week | lineup value 8.5
9756 | Jordan Addison | WR | age 24 | MIN | market 3614 | projected 52 (10.4 a week) | last 3 weeks 13.9 a week | lineup value 0
12518 | Tyler Warren | TE | age 24 | IND | market 4599 | projected 48.2 (9.6 a week) | last 3 weeks 11.3 a week | lineup value 16.6
1466 | Travis Kelce | TE | age 37 | KC | market 2864 | projected 47.1 (9.4 a week) | last 3 weeks 14.3 a week | lineup value 15.4
1479 | Keenan Allen | WR | age 34 | IND | market 2147 | projected 46.1 (9.2 a week) | last 3 weeks 14.5 a week | lineup value 1.3
6783 | Jerry Jeudy | WR | age 27 | CLE | market 2692 | projected 42.3 (8.5 a week) | last 3 weeks 1.2 a week | lineup value 0
9500 | Josh Downs | WR | age 25 | IND | market 3347 | projected 37.4 (7.5 a week) | last 3 weeks 9.5 a week | lineup value 0
12519 | Luther Burden | WR | age 22 | CHI | market 4872 | projected 31.1 (6.2 a week) | last 3 weeks 1.3 a week | lineup value 0
2306 | Jameis Winston | QB | age 32 | NYG | market 0 | projected 30.1 (6 a week) | last 3 weeks 0 a week | lineup value 0
SF | San Francisco 49ers | DEF | age ? | SF | market 0 | projected 28.4 (5.7 a week) | last 3 weeks 4.3 a week | lineup value 28.4
12495 | Ollie Gordon | RB | age 22 | MIA | market 0 | projected 17.1 (3.4 a week) | last 3 weeks 5.9 a week | lineup value 0
6806 | J.K. Dobbins | RB | age 27 | DEN | market 3332 | projected 11.4 (2.3 a week) | last 3 weeks 10 a week | lineup value 0
11575 | Ray Davis | RB | age 26 | BUF | market 2498 | projected 8.7 (1.7 a week) | last 3 weeks 0.5 a week | lineup value 0
7596 | Elijah Moore | WR | age 26 | PHI | market 0 | projected 7 (1.4 a week) | last 3 weeks 2.1 a week | lineup value 0
10235 | Roschon Johnson | RB | age 25 | CHI | market 0 | projected 0.6 (0.1 a week) | last 3 weeks 0.4 a week | lineup value 0

PARTNER (partnerId 1): record 4-5, rank 9, points for 799.8, contention window 0.18
4881 | Lamar Jackson | QB | age 29 | BAL | market 4610 | projected 111.6 (22.3 a week) | last 3 weeks 8.5 a week | lineup value 19.1
3163 | Jared Goff | QB | age 32 | DET | market 3077 | projected 92.6 (18.5 a week) | last 3 weeks 10.2 a week | lineup value 0
6794 | Justin Jefferson | WR | age 27 | MIN | market 4821 | projected 75.7 (15.1 a week) | last 3 weeks 14.7 a week | lineup value 41.3
7543 | Travis Etienne | RB | age 27 | NO | market 3840 | projected 66.7 (13.3 a week) | last 3 weeks 7.7 a week | lineup value 66.7
4983 | DJ Moore | WR | age 29 | BUF | market 3649 | projected 48.3 (9.7 a week) | last 3 weeks 14.3 a week | lineup value 13.9
1339 | Zach Ertz | TE | age 35 | PHI | market 0 | projected 41.5 (8.3 a week) | last 3 weeks 9 a week | lineup value 13.6
9508 | Tyjae Spears | RB | age 25 | TEN | market 2982 | projected 37.1 (7.4 a week) | last 3 weeks 11.1 a week | lineup value 37.1
PHI | Philadelphia Eagles | DEF | age ? | PHI | market 0 | projected 35.2 (7 a week) | last 3 weeks 6 a week | lineup value 0.3
11610 | Malik Washington | WR | age 25 | MIA | market 2747 | projected 35.1 (7 a week) | last 3 weeks 9.6 a week | lineup value 7.3
4144 | Jonnu Smith | TE | age 31 | GB | market 0 | projected 34.2 (6.8 a week) | last 3 weeks 7 a week | lineup value 0.8
4033 | David Njoku | TE | age 30 | LAC | market 2847 | projected 33.8 (6.8 a week) | last 3 weeks 4.6 a week | lineup value 2
PIT | Pittsburgh Steelers | DEF | age ? | PIT | market 0 | projected 31.7 (6.3 a week) | last 3 weeks 6 a week | lineup value 0.3
10226 | Andrei Iosivas | WR | age 27 | CIN | market 0 | projected 30.1 (6 a week) | last 3 weeks 8.6 a week | lineup value 5.6
1426 | DeAndre Hopkins | WR | age 33 | FA | market 1502 | projected 27.7 (5.5 a week) | last 3 weeks 0.8 a week | lineup value 1
MIA | Miami Dolphins | DEF | age ? | MIA | market 0 | projected 26.9 (5.4 a week) | last 3 weeks 3.3 a week | lineup value 0.4
11623 | Jordan Whittington | WR | age 26 | LAR | market 0 | projected 19 (3.8 a week) | last 3 weeks 1 a week | lineup value 0
3286 | Demarcus Robinson | WR | age 32 | SF | market 0 | projected 9.4 (1.9 a week) | last 3 weeks 1.5 a week | lineup value 0
11562 | Spencer Rattler | QB | age 26 | NO | market 0 | projected 0 (0 a week) | last 3 weeks 5.7 a week | lineup value 0
12481 | Cam Skattebo | RB | age 24 | NYG | market 4223 | projected 0 (0 a week) | last 3 weeks 9.5 a week | lineup value 0
12510 | Jalen Milroe | QB | age 23 | SEA | market 0 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0
4018 | Joe Mixon | RB | age 30 | FA | market 2254 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0
4663 | Austin Ekeler | RB | age 31 | WAS | market 0 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0

PARTNER (partnerId 10): record 4-5, rank 8, points for 813.5, contention window 0.31
4892 | Baker Mayfield | QB | age 31 | TB | market 2938 | projected 94.4 (18.9 a week) | last 3 weeks 5.4 a week | lineup value 10.2
11604 | Brock Bowers | TE | age 23 | LV | market 5534 | projected 81.9 (16.4 a week) | last 3 weeks 14.4 a week | lineup value 39.8
11560 | Caleb Williams | QB | age 24 | CHI | market 4678 | projected 81.8 (16.4 a week) | last 3 weeks 19.1 a week | lineup value 0
12512 | Quinshon Judkins | RB | age 22 | CLE | market 4394 | projected 70.3 (14.1 a week) | last 3 weeks 10.4 a week | lineup value 27.6
96 | Aaron Rodgers | QB | age 42 | PIT | market 1832 | projected 67.1 (13.4 a week) | last 3 weeks 17.8 a week | lineup value 0
11565 | J.J. McCarthy | QB | age 23 | NYG | market 2286 | projected 65.3 (13.1 a week) | last 3 weeks 6.6 a week | lineup value 0.3
9224 | Chase Brown | RB | age 26 | CIN | market 4513 | projected 64 (12.8 a week) | last 3 weeks 18.9 a week | lineup value 28.4
8148 | Jameson Williams | WR | age 25 | DET | market 4092 | projected 62.8 (12.6 a week) | last 3 weeks 5.5 a week | lineup value 19.5
7090 | Darnell Mooney | WR | age 28 | NYG | market 2372 | projected 49.6 (9.9 a week) | last 3 weeks 4.8 a week | lineup value 6.4
11624 | Xavier Worthy | WR | age 23 | KC | market 3487 | projected 41.5 (8.3 a week) | last 3 weeks 8 a week | lineup value 5.9
10444 | Cedric Tillman | WR | age 26 | NO | market 0 | projected 37.6 (7.5 a week) | last 3 weeks 0 a week | lineup value 0
BUF | Buffalo Bills | DEF | age ? | BUF | market 0 | projected 36.9 (7.4 a week) | last 3 weeks 8 a week | lineup value 3.2
11597 | Theo Johnson | TE | age 25 | NYG | market 3215 | projected 36 (7.2 a week) | last 3 weeks 10.8 a week | lineup value 2.4
12476 | Devin Neal | RB | age 23 | WAS | market 2803 | projected 35.9 (7.2 a week) | last 3 weeks 2.1 a week | lineup value 6.2
HOU | Houston Texans | DEF | age ? | HOU | market 0 | projected 35.3 (7.1 a week) | last 3 weeks 10.7 a week | lineup value 1.7
6130 | Devin Singletary | RB | age 29 | NYG | market 0 | projected 33.6 (6.7 a week) | last 3 weeks 3.7 a week | lineup value 2.4
4988 | Nick Chubb | RB | age 30 | FA | market 1806 | projected 30.8 (6.2 a week) | last 3 weeks 4.8 a week | lineup value 0
11625 | Adonai Mitchell | WR | age 24 | NYJ | market 2987 | projected 27.3 (5.5 a week) | last 3 weeks 1.2 a week | lineup value 0.3
2505 | Darren Waller | TE | age 34 | CAR | market 1417 | projected 16.3 (3.3 a week) | last 3 weeks 0 a week | lineup value 0
4454 | Kendrick Bourne | WR | age 31 | ARI | market 0 | projected 14.6 (2.9 a week) | last 3 weeks 5.4 a week | lineup value 0.6
12509 | Tre' Harris | WR | age 24 | LAC | market 2835 | projected 13.4 (2.7 a week) | last 3 weeks 5.6 a week | lineup value 0
11589 | Trey Benson | RB | age 24 | ARI | market 3171 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0

PARTNER (partnerId 2): record 4-5, rank 7, points for 1011.5, contention window 0.44
9488 | Jaxon Smith-Njigba | WR | age 24 | SEA | market 5795 | projected 105.7 (21.1 a week) | last 3 weeks 16.1 a week | lineup value 62.6
7523 | Trevor Lawrence | QB | age 27 | JAX | market 3680 | projected 84.5 (16.9 a week) | last 3 weeks 13.3 a week | lineup value 23.6
7525 | DeVonta Smith | WR | age 27 | PHI | market 4158 | projected 73.3 (14.7 a week) | last 3 weeks 15.9 a week | lineup value 30.2
12529 | TreVeyon Henderson | RB | age 23 | NE | market 4328 | projected 61.5 (12.3 a week) | last 3 weeks 6.2 a week | lineup value 26.2
8151 | Kenneth Walker | RB | age 25 | KC | market 4558 | projected 58.4 (11.7 a week) | last 3 weeks 4.9 a week | lineup value 23.1
7564 | Ja'Marr Chase | WR | age 26 | CIN | market 5778 | projected 57.9 (11.6 a week) | last 3 weeks 25.4 a week | lineup value 33.4
9753 | Zach Charbonnet | RB | age 25 | SEA | market 3189 | projected 46.7 (9.3 a week) | last 3 weeks 8.4 a week | lineup value 11.4
8111 | Cade Otton | TE | age 27 | TB | market 2962 | projected 44.7 (8.9 a week) | last 3 weeks 7.2 a week | lineup value 5.6
8676 | Rashid Shaheed | WR | age 28 | SEA | market 2692 | projected 43.6 (8.7 a week) | last 3 weeks 11.4 a week | lineup value 0.8
SEA | Seattle Seahawks | DEF | age ? | SEA | market 0 | projected 41 (8.2 a week) | last 3 weeks 6 a week | lineup value 3.7
11603 | AJ Barner | TE | age 24 | SEA | market 3513 | projected 39.8 (8 a week) | last 3 weeks 4.5 a week | lineup value 2.2
LAR | Los Angeles Rams | DEF | age ? | LAR | market 0 | projected 37.4 (7.5 a week) | last 3 weeks 3.3 a week | lineup value 0.1
6770 | Joe Burrow | QB | age 29 | CIN | market 4110 | projected 35.1 (7 a week) | last 3 weeks 0 a week | lineup value 1.2
4950 | Christian Kirk | WR | age 29 | SF | market 2204 | projected 31.1 (6.2 a week) | last 3 weeks 2.2 a week | lineup value 0
11626 | Xavier Legette | WR | age 25 | CAR | market 0 | projected 28.7 (5.7 a week) | last 3 weeks 10.4 a week | lineup value 0
12486 | Dillon Gabriel | QB | age 25 | CLE | market 0 | projected 27 (5.4 a week) | last 3 weeks 6.5 a week | lineup value 0
4035 | Alvin Kamara | RB | age 31 | NO | market 2508 | projected 23.9 (4.8 a week) | last 3 weeks 4.4 a week | lineup value 5.3
8210 | Chig Okonkwo | TE | age 27 | WAS | market 3061 | projected 23.9 (4.8 a week) | last 3 weeks 4.1 a week | lineup value 0
6943 | Gabe Davis | WR | age 26 | FA | market 1799 | projected 23.6 (4.7 a week) | last 3 weeks 0 a week | lineup value 0
DAL | Dallas Cowboys | DEF | age ? | DAL | market 0 | projected 20.6 (4.1 a week) | last 3 weeks 3.7 a week | lineup value 0
12483 | Jack Bech | WR | age 23 | LV | market 2717 | projected 18.7 (3.7 a week) | last 3 weeks 1.1 a week | lineup value 0
7611 | Rhamondre Stevenson | RB | age 28 | NE | market 3355 | projected 16 (3.2 a week) | last 3 weeks 7.6 a week | lineup value 0

CANDIDATE DEALS (from a rules-based finder; points are the finder projections for the rest of the season):
c1 | partnerId 9 | I give Davante Adams + Rome Odunze (2133,11620) | I get Jalen Hurts + Jake Ferguson (6904,8110) | my points 35.6 | their points 22.6 | likelihood 0.8
c2 | partnerId 9 | I give Michael Pittman + Javonte Williams (6819,7588) | I get Jalen Hurts + Justin Fields (6904,7591) | my points 23.2 | their points 29.9 | likelihood 0.8
c3 | partnerId 12 | I give Matthew Golden (12501) | I get Dak Prescott + Rico Dowdle (3294,7021) | my points 48 | their points -24 | likelihood 0.89
c4 | partnerId 9 | I give D'Andre Swift + Javonte Williams (6790,7588) | I get Jalen Hurts + Brenton Strange (6904,9480) | my points 28.4 | their points 23.4 | likelihood 0.8
c5 | partnerId 1 | I give Matthew Golden (12501) | I get Jared Goff + Zach Ertz (3163,1339) | my points 37.6 | their points -13.6 | likelihood 0.93
c6 | partnerId 1 | I give MarShawn Lloyd (11581) | I get Jared Goff + Tyjae Spears (3163,9508) | my points 31 | their points -37.1 | likelihood 0.71
c7 | partnerId 10 | I give Ricky Pearsall + Jayden Reed (11638,10222) | I get Baker Mayfield + J.J. McCarthy (4892,11565) | my points 33.2 | their points -4.7 | likelihood 0.92
c8 | partnerId 12 | I give Jayden Reed + Matthew Golden (10222,12501) | I get Dak Prescott (3294) | my points 35 | their points 0 | likelihood 0.78
c9 | partnerId 10 | I give Ricky Pearsall + Alec Pierce (11638,8142) | I get Baker Mayfield + Aaron Rodgers (4892,96) | my points 32.9 | their points -0.2 | likelihood 0.92
c10 | partnerId 9 | I give Davante Adams + Javonte Williams (2133,7588) | I get Jalen Hurts + Bo Nix (6904,11563) | my points 8.1 | their points 26 | likelihood 0.78
c11 | partnerId 1 | I give Matthew Golden + Sterling Shepard (12501,3200) | I get Jared Goff (3163) | my points 31 | their points 0 | likelihood 0.93
c12 | partnerId 2 | I give Kareem Hunt + Rome Odunze (4098,11620) | I get Trevor Lawrence (7523) | my points 20.9 | their points -8.9 | likelihood 0.77

Pick the best trades for my team.

=========== CASE 1180092558252679168-w4-r11 ===========
REPLY FILE: /Users/anik/workspace/chrome/sleeper/.eval-market/replies/suggest-v2/run1/1180092558252679168-w4-r11.json
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
Lineup slots: QB, RB, RB, WR, WR, TE, FLEX, FLEX, DEF, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN. Superflex: no. Tight end premium: no. Points per reception: 1.
Columns: id | name | position | age | team | market value | projected points for the rest of the regular season (and per week) | points per week over the last three weeks played | lineup value (points my lineup loses if this player is removed).

MY TEAM (partnerId me): record 1-2, rank 6, points for 383.3, contention window 0.56
9226 | De'Von Achane | RB | age 25 | MIA | market 4990 | projected 215.6 (19.6 a week) | last 3 weeks 19.6 a week | lineup value 167.3
7547 | Amon-Ra St. Brown | WR | age 26 | DET | market 5302 | projected 191.2 (17.4 a week) | last 3 weeks 22.8 a week | lineup value 96.9
12514 | Emeka Egbuka | WR | age 24 | TB | market 4520 | projected 148.6 (13.5 a week) | last 3 weeks 17 a week | lineup value 58.9
9228 | Bryce Young | QB | age 25 | CAR | market 2841 | projected 140.5 (12.8 a week) | last 3 weeks 14.7 a week | lineup value 109
5045 | Courtland Sutton | WR | age 31 | DEN | market 3182 | projected 130.5 (11.9 a week) | last 3 weeks 14.5 a week | lineup value 34.2
5872 | Deebo Samuel | WR | age 30 | SF | market 2701 | projected 121.5 (11 a week) | last 3 weeks 15 a week | lineup value 31.3
7553 | Kyle Pitts | TE | age 26 | ATL | market 3956 | projected 97.3 (8.8 a week) | last 3 weeks 9.5 a week | lineup value 59
11628 | Marvin Harrison | WR | age 24 | HOU | market 3924 | projected 86.3 (7.8 a week) | last 3 weeks 10.1 a week | lineup value 10.8
DET | Detroit Lions | DEF | age ? | DET | market 0 | projected 74.5 (6.8 a week) | last 3 weeks 6.3 a week | lineup value 16.1
11655 | Tyrone Tracy | RB | age 26 | NYG | market 2983 | projected 70.5 (6.4 a week) | last 3 weeks 6.7 a week | lineup value 41.3
CLE | Cleveland Browns | DEF | age ? | CLE | market 0 | projected 67.6 (6.1 a week) | last 3 weeks 6 a week | lineup value 9.2
12540 | Chimere Dike | WR | age 24 | TEN | market 2866 | projected 64.8 (5.9 a week) | last 3 weeks 2.4 a week | lineup value 8.3
8143 | Jerome Ford | RB | age 27 | ARI | market 0 | projected 52.1 (4.7 a week) | last 3 weeks 5.6 a week | lineup value 5.2
12507 | Omarion Hampton | RB | age 23 | LAC | market 5150 | projected 45.4 (4.1 a week) | last 3 weeks 12.2 a week | lineup value 28.2
6826 | Cole Kmet | TE | age 27 | CHI | market 0 | projected 40.2 (3.7 a week) | last 3 weeks 5.7 a week | lineup value 2
5849 | Kyler Murray | QB | age 29 | MIN | market 3005 | projected 35.5 (3.2 a week) | last 3 weeks 15.8 a week | lineup value 4
12541 | Dont'e Thornton | WR | age 23 | LV | market 0 | projected 34.2 (3.1 a week) | last 3 weeks 4.8 a week | lineup value 0
12547 | Kyle Williams | WR | age 23 | NE | market 2802 | projected 25.7 (2.3 a week) | last 3 weeks 1.3 a week | lineup value 0
9757 | Kendre Miller | RB | age 24 | NO | market 2607 | projected 24.4 (2.2 a week) | last 3 weeks 3.3 a week | lineup value 2.6
4082 | Curtis Samuel | WR | age 29 | FA | market 1447 | projected 21.9 (2 a week) | last 3 weeks 0 a week | lineup value 0
1689 | Adam Thielen | WR | age 35 | FA | market 2198 | projected 17.8 (1.6 a week) | last 3 weeks 2.2 a week | lineup value 0
11599 | Cade Stover | TE | age 26 | HOU | market 0 | projected 5.3 (0.5 a week) | last 3 weeks 2.1 a week | lineup value 0
12505 | Jalen Royals | WR | age 23 | KC | market 0 | projected 5.1 (0.5 a week) | last 3 weeks 0 a week | lineup value 0
12496 | Tai Felton | WR | age 23 | MIN | market 0 | projected 2.4 (0.2 a week) | last 3 weeks 0.6 a week | lineup value 0

PARTNER (partnerId 9): record 2-1, rank 3, points for 387.9, contention window 0.95
4034 | Christian McCaffrey | RB | age 30 | SF | market 4598 | projected 235.6 (21.4 a week) | last 3 weeks 23.3 a week | lineup value 147
6904 | Jalen Hurts | QB | age 28 | PHI | market 4045 | projected 212.7 (19.3 a week) | last 3 weeks 21.6 a week | lineup value 11.6
11564 | Drake Maye | QB | age 24 | NE | market 5048 | projected 201 (18.3 a week) | last 3 weeks 21.1 a week | lineup value 3.2
11563 | Bo Nix | QB | age 26 | DEN | market 3813 | projected 184.1 (16.7 a week) | last 3 weeks 14.5 a week | lineup value 0
4866 | Saquon Barkley | RB | age 29 | PHI | market 4232 | projected 166.5 (15.1 a week) | last 3 weeks 15.1 a week | lineup value 76.5
5846 | DK Metcalf | WR | age 28 | PIT | market 3438 | projected 131.9 (12 a week) | last 3 weeks 11.8 a week | lineup value 54
7591 | Justin Fields | QB | age 27 | KC | market 1243 | projected 126.4 (11.5 a week) | last 3 weeks 11.2 a week | lineup value 0.5
8228 | Jaylen Warren | RB | age 27 | PIT | market 3538 | projected 122.3 (11.1 a week) | last 3 weeks 14.8 a week | lineup value 43.9
8110 | Jake Ferguson | TE | age 27 | DAL | market 3463 | projected 116.5 (10.6 a week) | last 3 weeks 15.1 a week | lineup value 33.5
9754 | Quentin Johnston | WR | age 25 | LAC | market 3432 | projected 107.1 (9.7 a week) | last 3 weeks 18.6 a week | lineup value 34.1
5022 | Dallas Goedert | TE | age 31 | PHI | market 3125 | projected 104 (9.5 a week) | last 3 weeks 7.2 a week | lineup value 21
8408 | Jordan Mason | RB | age 27 | MIN | market 3074 | projected 100.1 (9.1 a week) | last 3 weeks 12.6 a week | lineup value 17.8
LAC | Los Angeles Chargers | DEF | age ? | LAC | market 0 | projected 75.1 (6.8 a week) | last 3 weeks 6 a week | lineup value 17.2
8132 | Tyler Allgeier | RB | age 26 | ARI | market 3204 | projected 71.7 (6.5 a week) | last 3 weeks 6.3 a week | lineup value 0
5848 | Marquise Brown | WR | age 29 | PHI | market 0 | projected 68 (6.2 a week) | last 3 weeks 12 a week | lineup value 2.2
9504 | Kayshon Boutte | WR | age 24 | HOU | market 2965 | projected 67.8 (6.2 a week) | last 3 weeks 4.5 a week | lineup value 7.6
12490 | Bhayshul Tuten | RB | age 23 | JAX | market 4233 | projected 66.4 (6 a week) | last 3 weeks 8.2 a week | lineup value 0
TB | Tampa Bay Buccaneers | DEF | age ? | TB | market 0 | projected 64 (5.8 a week) | last 3 weeks 7 a week | lineup value 6
9494 | Marvin Mims | WR | age 24 | DEN | market 2743 | projected 55 (5 a week) | last 3 weeks 4.7 a week | lineup value 0
9480 | Brenton Strange | TE | age 25 | JAX | market 3625 | projected 46.2 (4.2 a week) | last 3 weeks 8.9 a week | lineup value 3
12492 | Pat Bryant | WR | age 23 | DEN | market 3011 | projected 40.4 (3.7 a week) | last 3 weeks 1.3 a week | lineup value 0
9511 | Keaton Mitchell | RB | age 24 | LAC | market 2858 | projected 33.1 (3 a week) | last 3 weeks 0 a week | lineup value 0

PARTNER (partnerId 6): record 2-1, rank 4, points for 373.2, contention window 0.82
6813 | Jonathan Taylor | RB | age 27 | IND | market 5008 | projected 214.3 (19.5 a week) | last 3 weeks 25 a week | lineup value 115.4
9221 | Jahmyr Gibbs | RB | age 24 | DET | market 6368 | projected 205.4 (18.7 a week) | last 3 weeks 20.4 a week | lineup value 107.6
6797 | Justin Herbert | QB | age 28 | LAC | market 3827 | projected 197.9 (18 a week) | last 3 weeks 20.8 a week | lineup value 32.9
8138 | James Cook | RB | age 27 | BUF | market 4896 | projected 178.2 (16.2 a week) | last 3 weeks 22.8 a week | lineup value 80.7
6768 | Tua Tagovailoa | QB | age 28 | ATL | market 1932 | projected 158.9 (14.4 a week) | last 3 weeks 13.6 a week | lineup value 0
8121 | Romeo Doubs | WR | age 26 | NE | market 3168 | projected 104.8 (9.5 a week) | last 3 weeks 8.4 a week | lineup value 19.5
7049 | Jauan Jennings | WR | age 29 | MIN | market 2833 | projected 102.1 (9.3 a week) | last 3 weeks 7.8 a week | lineup value 22.8
5967 | Tony Pollard | RB | age 29 | TEN | market 3192 | projected 98 (8.9 a week) | last 3 weeks 10.3 a week | lineup value 7.7
4217 | George Kittle | TE | age 33 | SF | market 3142 | projected 96.3 (8.8 a week) | last 3 weeks 4.2 a week | lineup value 29.1
12506 | Harold Fannin | TE | age 22 | CLE | market 4699 | projected 95.2 (8.7 a week) | last 3 weeks 9.6 a week | lineup value 3.1
5012 | Mark Andrews | TE | age 31 | BAL | market 3103 | projected 94.9 (8.6 a week) | last 3 weeks 10 a week | lineup value 2.2
11631 | Brian Thomas | WR | age 24 | JAX | market 3929 | projected 92.7 (8.4 a week) | last 3 weeks 8.5 a week | lineup value 26.6
8183 | Brock Purdy | QB | age 26 | SF | market 3619 | projected 75.7 (6.9 a week) | last 3 weeks 6.3 a week | lineup value 21.5
12534 | Kyle Monangai | RB | age 24 | CHI | market 3799 | projected 73.2 (6.7 a week) | last 3 weeks 3.2 a week | lineup value 4.6
CHI | Chicago Bears | DEF | age ? | CHI | market 0 | projected 63.3 (5.8 a week) | last 3 weeks 6.3 a week | lineup value 63.3
12484 | Jayden Higgins | WR | age 23 | HOU | market 3439 | projected 60.5 (5.5 a week) | last 3 weeks 3.5 a week | lineup value 2
9506 | Sean Tucker | RB | age 24 | TB | market 2809 | projected 60.5 (5.5 a week) | last 3 weeks 0.1 a week | lineup value 1.3
4981 | Calvin Ridley | WR | age 31 | TEN | market 2280 | projected 41 (3.7 a week) | last 3 weeks 6.4 a week | lineup value 3.7
12469 | Dylan Sampson | RB | age 22 | CLE | market 3282 | projected 38.9 (3.5 a week) | last 3 weeks 9.5 a week | lineup value 0
8154 | Brian Robinson | RB | age 27 | ATL | market 3196 | projected 38.2 (3.5 a week) | last 3 weeks 3.3 a week | lineup value 0
7670 | Joshua Palmer | WR | age 27 | BUF | market 0 | projected 34.9 (3.2 a week) | last 3 weeks 6.4 a week | lineup value 0
12530 | Travis Hunter | DB | age 23 | JAX | market 0 | projected 30.5 (2.8 a week) | last 3 weeks 5.9 a week | lineup value 0

CANDIDATE DEALS (from a rules-based finder; points are the finder projections for the rest of the season):
c1 | partnerId 9 | I give Deebo Samuel + Marvin Harrison (5872,11628) | I get Jalen Hurts + Tyler Allgeier (6904,8132) | my points 23.1 | their points 35.9 | likelihood 0.66
c2 | partnerId 9 | I give Courtland Sutton + Marvin Harrison (5045,11628) | I get Jalen Hurts + Brenton Strange (6904,9480) | my points 23.6 | their points 31 | likelihood 0.59
c3 | partnerId 6 | I give Deebo Samuel (5872) | I get Tua Tagovailoa + Sean Tucker (6768,9506) | my points 11.8 | their points 26.8 | likelihood 0.58
c4 | partnerId 6 | I give Courtland Sutton (5045) | I get Tua Tagovailoa + Tony Pollard (6768,5967) | my points 20.7 | their points 24 | likelihood 0.67
c5 | partnerId 6 | I give Emeka Egbuka (12514) | I get Tua Tagovailoa + Harold Fannin (6768,12506) | my points 6.6 | their points 42.4 | likelihood 0.56
c6 | partnerId 9 | I give Emeka Egbuka + Deebo Samuel (12514,5872) | I get Bo Nix + Drake Maye (11563,11564) | my points -43.5 | their points 52.3 | likelihood 0.39

Pick the best trades for my team.

=========== CASE 1180092558252679168-w4-r5 ===========
REPLY FILE: /Users/anik/workspace/chrome/sleeper/.eval-market/replies/suggest-v2/run1/1180092558252679168-w4-r5.json
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
Lineup slots: QB, RB, RB, WR, WR, TE, FLEX, FLEX, DEF, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN. Superflex: no. Tight end premium: no. Points per reception: 1.
Columns: id | name | position | age | team | market value | projected points for the rest of the regular season (and per week) | points per week over the last three weeks played | lineup value (points my lineup loses if this player is removed).

MY TEAM (partnerId me): record 3-0, rank 1, points for 352, contention window 1
9509 | Bijan Robinson | RB | age 24 | ATL | market 6372 | projected 203.5 (18.5 a week) | last 3 weeks 20.1 a week | lineup value 90.9
7588 | Javonte Williams | RB | age 26 | DAL | market 4032 | projected 165.7 (15.1 a week) | last 3 weeks 19.2 a week | lineup value 57.1
2133 | Davante Adams | WR | age 33 | LAR | market 3375 | projected 151.8 (13.8 a week) | last 3 weeks 15.4 a week | lineup value 41.7
6819 | Michael Pittman | WR | age 29 | PIT | market 2990 | projected 129.1 (11.7 a week) | last 3 weeks 15.8 a week | lineup value 23.9
8126 | Wan'Dale Robinson | WR | age 25 | TEN | market 3412 | projected 125.3 (11.4 a week) | last 3 weeks 14.4 a week | lineup value 20.7
11620 | Rome Odunze | WR | age 24 | CHI | market 4058 | projected 117 (10.6 a week) | last 3 weeks 20.9 a week | lineup value 15.1
6790 | D'Andre Swift | RB | age 27 | CHI | market 3661 | projected 109.9 (10 a week) | last 3 weeks 11.4 a week | lineup value 9
9758 | C.J. Stroud | QB | age 25 | HOU | market 3150 | projected 103.2 (9.4 a week) | last 3 weeks 12.4 a week | lineup value 59.9
12489 | RJ Harvey | RB | age 25 | DEN | market 3729 | projected 94.3 (8.6 a week) | last 3 weeks 5.3 a week | lineup value 9.2
4098 | Kareem Hunt | RB | age 30 | FA | market 1815 | projected 93.2 (8.5 a week) | last 3 weeks 5.3 a week | lineup value 3.7
11559 | Michael Penix | QB | age 26 | ATL | market 2077 | projected 89.9 (8.2 a week) | last 3 weeks 11.7 a week | lineup value 46.6
GB | Green Bay Packers | DEF | age ? | GB | market 0 | projected 78.5 (7.1 a week) | last 3 weeks 7.7 a week | lineup value 78.5
8142 | Alec Pierce | WR | age 26 | IND | market 3408 | projected 74.6 (6.8 a week) | last 3 weeks 8.7 a week | lineup value 0
12517 | Colston Loveland | TE | age 22 | CHI | market 5262 | projected 65.9 (6 a week) | last 3 weeks 2.4 a week | lineup value 15.3
11435 | Emanuel Wilson | RB | age 27 | SEA | market 2485 | projected 60 (5.5 a week) | last 3 weeks 1 a week | lineup value 1.8
9484 | Tucker Kraft | TE | age 25 | GB | market 4154 | projected 59.9 (5.4 a week) | last 3 weeks 13.4 a week | lineup value 33.7
12501 | Matthew Golden | WR | age 23 | GB | market 3532 | projected 51.9 (4.7 a week) | last 3 weeks 5.1 a week | lineup value 0
12641 | Jaylin Lane | WR | age 24 | WAS | market 0 | projected 48.5 (4.4 a week) | last 3 weeks 3.4 a week | lineup value 0
9486 | Dontayvion Wicks | WR | age 25 | PHI | market 2553 | projected 47.3 (4.3 a week) | last 3 weeks 5.8 a week | lineup value 0
11638 | Ricky Pearsall | WR | age 26 | SF | market 2209 | projected 45.2 (4.1 a week) | last 3 weeks 14.6 a week | lineup value 1.2
12521 | Elijah Arroyo | TE | age 23 | SEA | market 0 | projected 39.4 (3.6 a week) | last 3 weeks 2.3 a week | lineup value 3.3
9481 | Luke Musgrave | TE | age 26 | GB | market 0 | projected 39.2 (3.6 a week) | last 3 weeks 0 a week | lineup value 0
10222 | Jayden Reed | WR | age 26 | GB | market 3365 | projected 7.1 (0.6 a week) | last 3 weeks 4.5 a week | lineup value 0
11581 | MarShawn Lloyd | RB | age 25 | GB | market 3214 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0
11592 | Erick All | TE | age 26 | CIN | market 0 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0
11616 | Jacob Cowing | WR | age 25 | SF | market 0 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0
12500 | Quinn Ewers | QB | age 23 | JAX | market 0 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0

PARTNER (partnerId 1): record 1-2, rank 11, points for 274.4, contention window 0
3163 | Jared Goff | QB | age 32 | DET | market 3063 | projected 182.7 (16.6 a week) | last 3 weeks 19.5 a week | lineup value 7.3
4881 | Lamar Jackson | QB | age 29 | BAL | market 4613 | projected 155.9 (14.2 a week) | last 3 weeks 27.6 a week | lineup value 27
6794 | Justin Jefferson | WR | age 27 | MIN | market 4819 | projected 154 (14 a week) | last 3 weeks 12.8 a week | lineup value 85.9
7543 | Travis Etienne | RB | age 27 | NO | market 3838 | projected 127.9 (11.6 a week) | last 3 weeks 15.7 a week | lineup value 101.1
4983 | DJ Moore | WR | age 29 | BUF | market 3649 | projected 105.5 (9.6 a week) | last 3 weeks 10.3 a week | lineup value 38.8
1339 | Zach Ertz | TE | age 35 | PHI | market 0 | projected 100.3 (9.1 a week) | last 3 weeks 12.3 a week | lineup value 31.7
11610 | Malik Washington | WR | age 25 | MIA | market 2748 | projected 81 (7.4 a week) | last 3 weeks 6.9 a week | lineup value 14.1
4144 | Jonnu Smith | TE | age 31 | GB | market 0 | projected 77.9 (7.1 a week) | last 3 weeks 8.2 a week | lineup value 10.8
PHI | Philadelphia Eagles | DEF | age ? | PHI | market 0 | projected 76.5 (7 a week) | last 3 weeks 7.7 a week | lineup value 4.1
9508 | Tyjae Spears | RB | age 25 | TEN | market 2983 | projected 75.5 (6.9 a week) | last 3 weeks 0 a week | lineup value 54.6
11562 | Spencer Rattler | QB | age 26 | NO | market 0 | projected 75.1 (6.8 a week) | last 3 weeks 15.3 a week | lineup value 14.2
12481 | Cam Skattebo | RB | age 24 | NYG | market 4227 | projected 74.3 (6.8 a week) | last 3 weeks 13.6 a week | lineup value 47.5
4033 | David Njoku | TE | age 30 | LAC | market 2852 | projected 69.6 (6.3 a week) | last 3 weeks 7.9 a week | lineup value 9.4
PIT | Pittsburgh Steelers | DEF | age ? | PIT | market 0 | projected 68.9 (6.3 a week) | last 3 weeks 9 a week | lineup value 3.1
MIA | Miami Dolphins | DEF | age ? | MIA | market 0 | projected 65.1 (5.9 a week) | last 3 weeks 3 a week | lineup value 0.9
10226 | Andrei Iosivas | WR | age 27 | CIN | market 0 | projected 61.1 (5.6 a week) | last 3 weeks 0.7 a week | lineup value 5.6
1426 | DeAndre Hopkins | WR | age 33 | FA | market 1500 | projected 50.5 (4.6 a week) | last 3 weeks 9.4 a week | lineup value 1
11623 | Jordan Whittington | WR | age 26 | LAR | market 0 | projected 41.9 (3.8 a week) | last 3 weeks 3.4 a week | lineup value 1.9
3286 | Demarcus Robinson | WR | age 32 | SF | market 0 | projected 34.7 (3.2 a week) | last 3 weeks 0 a week | lineup value 0.7
6945 | Antonio Gibson | RB | age 27 | FA | market 1424 | projected 10.1 (0.9 a week) | last 3 weeks 3.6 a week | lineup value 0
12510 | Jalen Milroe | QB | age 23 | SEA | market 0 | projected 0 (0 a week) | last 3 weeks 0.1 a week | lineup value 0
4018 | Joe Mixon | RB | age 30 | FA | market 2254 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0

PARTNER (partnerId 9): record 2-1, rank 3, points for 387.9, contention window 0.95
4034 | Christian McCaffrey | RB | age 30 | SF | market 4598 | projected 235.6 (21.4 a week) | last 3 weeks 23.3 a week | lineup value 147
6904 | Jalen Hurts | QB | age 28 | PHI | market 4045 | projected 212.7 (19.3 a week) | last 3 weeks 21.6 a week | lineup value 11.6
11564 | Drake Maye | QB | age 24 | NE | market 5048 | projected 201 (18.3 a week) | last 3 weeks 21.1 a week | lineup value 3.2
11563 | Bo Nix | QB | age 26 | DEN | market 3813 | projected 184.1 (16.7 a week) | last 3 weeks 14.5 a week | lineup value 0
4866 | Saquon Barkley | RB | age 29 | PHI | market 4232 | projected 166.5 (15.1 a week) | last 3 weeks 15.1 a week | lineup value 76.5
5846 | DK Metcalf | WR | age 28 | PIT | market 3438 | projected 131.9 (12 a week) | last 3 weeks 11.8 a week | lineup value 54
7591 | Justin Fields | QB | age 27 | KC | market 1243 | projected 126.4 (11.5 a week) | last 3 weeks 11.2 a week | lineup value 0.5
8228 | Jaylen Warren | RB | age 27 | PIT | market 3538 | projected 122.3 (11.1 a week) | last 3 weeks 14.8 a week | lineup value 43.9
8110 | Jake Ferguson | TE | age 27 | DAL | market 3463 | projected 116.5 (10.6 a week) | last 3 weeks 15.1 a week | lineup value 33.5
9754 | Quentin Johnston | WR | age 25 | LAC | market 3432 | projected 107.1 (9.7 a week) | last 3 weeks 18.6 a week | lineup value 34.1
5022 | Dallas Goedert | TE | age 31 | PHI | market 3125 | projected 104 (9.5 a week) | last 3 weeks 7.2 a week | lineup value 21
8408 | Jordan Mason | RB | age 27 | MIN | market 3074 | projected 100.1 (9.1 a week) | last 3 weeks 12.6 a week | lineup value 17.8
LAC | Los Angeles Chargers | DEF | age ? | LAC | market 0 | projected 75.1 (6.8 a week) | last 3 weeks 6 a week | lineup value 17.2
8132 | Tyler Allgeier | RB | age 26 | ARI | market 3204 | projected 71.7 (6.5 a week) | last 3 weeks 6.3 a week | lineup value 0
5848 | Marquise Brown | WR | age 29 | PHI | market 0 | projected 68 (6.2 a week) | last 3 weeks 12 a week | lineup value 2.2
9504 | Kayshon Boutte | WR | age 24 | HOU | market 2965 | projected 67.8 (6.2 a week) | last 3 weeks 4.5 a week | lineup value 7.6
12490 | Bhayshul Tuten | RB | age 23 | JAX | market 4233 | projected 66.4 (6 a week) | last 3 weeks 8.2 a week | lineup value 0
TB | Tampa Bay Buccaneers | DEF | age ? | TB | market 0 | projected 64 (5.8 a week) | last 3 weeks 7 a week | lineup value 6
9494 | Marvin Mims | WR | age 24 | DEN | market 2743 | projected 55 (5 a week) | last 3 weeks 4.7 a week | lineup value 0
9480 | Brenton Strange | TE | age 25 | JAX | market 3625 | projected 46.2 (4.2 a week) | last 3 weeks 8.9 a week | lineup value 3
12492 | Pat Bryant | WR | age 23 | DEN | market 3011 | projected 40.4 (3.7 a week) | last 3 weeks 1.3 a week | lineup value 0
9511 | Keaton Mitchell | RB | age 24 | LAC | market 2858 | projected 33.1 (3 a week) | last 3 weeks 0 a week | lineup value 0

PARTNER (partnerId 10): record 1-2, rank 9, points for 302.7, contention window 0.18
4892 | Baker Mayfield | QB | age 31 | TB | market 2939 | projected 190.4 (17.3 a week) | last 3 weeks 20.1 a week | lineup value 38.1
11560 | Caleb Williams | QB | age 24 | CHI | market 4669 | projected 167.6 (15.2 a week) | last 3 weeks 23.8 a week | lineup value 0.6
96 | Aaron Rodgers | QB | age 42 | PIT | market 1826 | projected 147 (13.4 a week) | last 3 weeks 16.9 a week | lineup value 0
12512 | Quinshon Judkins | RB | age 22 | CLE | market 4395 | projected 142.9 (13 a week) | last 3 weeks 8.9 a week | lineup value 78.8
9224 | Chase Brown | RB | age 26 | CIN | market 4515 | projected 140.9 (12.8 a week) | last 3 weeks 9.2 a week | lineup value 78.1
8148 | Jameson Williams | WR | age 25 | DET | market 4094 | projected 119.9 (10.9 a week) | last 3 weeks 10.6 a week | lineup value 51.8
11624 | Xavier Worthy | WR | age 23 | KC | market 3492 | projected 115.4 (10.5 a week) | last 3 weeks 0 a week | lineup value 52.6
11604 | Brock Bowers | TE | age 23 | LV | market 5532 | projected 110.7 (10.1 a week) | last 3 weeks 11.3 a week | lineup value 66
7090 | Darnell Mooney | WR | age 28 | NYG | market 2373 | projected 88.1 (8 a week) | last 3 weeks 4.1 a week | lineup value 24
11565 | J.J. McCarthy | QB | age 23 | NYG | market 2294 | projected 81.3 (7.4 a week) | last 3 weeks 9.3 a week | lineup value 0.3
11597 | Theo Johnson | TE | age 25 | NYG | market 3212 | projected 81.1 (7.4 a week) | last 3 weeks 3.6 a week | lineup value 36.4
BUF | Buffalo Bills | DEF | age ? | BUF | market 0 | projected 75.8 (6.9 a week) | last 3 weeks 5.7 a week | lineup value 12
4988 | Nick Chubb | RB | age 30 | FA | market 1807 | projected 74.1 (6.7 a week) | last 3 weeks 9.4 a week | lineup value 17.2
HOU | Houston Texans | DEF | age ? | HOU | market 0 | projected 74 (6.7 a week) | last 3 weeks 6.7 a week | lineup value 10.1
6130 | Devin Singletary | RB | age 29 | NYG | market 0 | projected 55.7 (5.1 a week) | last 3 weeks 1 a week | lineup value 4.4
12476 | Devin Neal | RB | age 23 | WAS | market 2802 | projected 47.8 (4.3 a week) | last 3 weeks 0.3 a week | lineup value 8.7
10444 | Cedric Tillman | WR | age 26 | NO | market 0 | projected 46.9 (4.3 a week) | last 3 weeks 10.7 a week | lineup value 0.6
11625 | Adonai Mitchell | WR | age 24 | NYJ | market 2987 | projected 41 (3.7 a week) | last 3 weeks 2.7 a week | lineup value 0.3
12509 | Tre' Harris | WR | age 24 | LAC | market 2833 | projected 32.3 (2.9 a week) | last 3 weeks 2.5 a week | lineup value 6.1
11632 | Malik Nabers | WR | age 23 | NYG | market 5024 | projected 15.5 (1.4 a week) | last 3 weeks 17.7 a week | lineup value 4.2
11589 | Trey Benson | RB | age 24 | ARI | market 3168 | projected 14 (1.3 a week) | last 3 weeks 8.3 a week | lineup value 2.8
11618 | Jalen McMillan | WR | age 24 | TB | market 2954 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0

PARTNER (partnerId 3): record 0-3, rank 12, points for 350.8, contention window 0
5870 | Daniel Jones | QB | age 29 | IND | market 2579 | projected 177.8 (16.2 a week) | last 3 weeks 22.7 a week | lineup value 22.8
421 | Matthew Stafford | QB | age 38 | LAR | market 2707 | projected 172 (15.6 a week) | last 3 weeks 15.6 a week | lineup value 20.3
8130 | Trey McBride | TE | age 26 | ARI | market 4882 | projected 164.7 (15 a week) | last 3 weeks 13.7 a week | lineup value 74.2
8137 | George Pickens | WR | age 25 | DAL | market 4764 | projected 153 (13.9 a week) | last 3 weeks 13.9 a week | lineup value 37.2
8150 | Kyren Williams | RB | age 26 | LAR | market 4553 | projected 151.6 (13.8 a week) | last 3 weeks 14.4 a week | lineup value 65.3
11635 | Ladd McConkey | WR | age 24 | LAC | market 4598 | projected 140 (12.7 a week) | last 3 weeks 10.4 a week | lineup value 25.9
12526 | Tetairoa McMillan | WR | age 23 | CAR | market 4722 | projected 139.2 (12.7 a week) | last 3 weeks 11.9 a week | lineup value 25.1
8134 | Khalil Shakir | WR | age 26 | BUF | market 3139 | projected 119.1 (10.8 a week) | last 3 weeks 9.7 a week | lineup value 7.2
6801 | Tee Higgins | WR | age 27 | CIN | market 4118 | projected 114.3 (10.4 a week) | last 3 weeks 7.8 a week | lineup value 11.9
5947 | Jakobi Meyers | WR | age 29 | JAX | market 3296 | projected 109.5 (10 a week) | last 3 weeks 13.3 a week | lineup value 7.4
3214 | Hunter Henry | TE | age 31 | NE | market 3150 | projected 100.7 (9.2 a week) | last 3 weeks 13.8 a week | lineup value 4.4
12533 | Jacory Croskey-Merritt | RB | age 25 | WAS | market 3248 | projected 100.1 (9.1 a week) | last 3 weeks 8.7 a week | lineup value 22
11566 | Jayden Daniels | QB | age 25 | WAS | market 4480 | projected 99.2 (9 a week) | last 3 weeks 13.3 a week | lineup value 11.1
4199 | Aaron Jones | RB | age 31 | MIN | market 2799 | projected 75.4 (6.9 a week) | last 3 weeks 6 a week | lineup value 12.8
BAL | Baltimore Ravens | DEF | age ? | BAL | market 0 | projected 72.3 (6.6 a week) | last 3 weeks 3.3 a week | lineup value 14.3
11637 | Keon Coleman | WR | age 23 | BUF | market 2738 | projected 71.1 (6.5 a week) | last 3 weeks 11.9 a week | lineup value 0
IND | Indianapolis Colts | DEF | age ? | IND | market 0 | projected 70.8 (6.4 a week) | last 3 weeks 5 a week | lineup value 12.9
10219 | Chris Rodriguez | RB | age 27 | JAX | market 2760 | projected 62.2 (5.7 a week) | last 3 weeks 1.3 a week | lineup value 0
7594 | Chuba Hubbard | RB | age 27 | CAR | market 3356 | projected 56.7 (5.2 a week) | last 3 weeks 15.4 a week | lineup value 6
11586 | Blake Corum | RB | age 25 | LAR | market 3570 | projected 56 (5.1 a week) | last 3 weeks 6.1 a week | lineup value 0
11600 | Ja'Tavion Sanders | TE | age 23 | CAR | market 0 | projected 40.4 (3.7 a week) | last 3 weeks 6.7 a week | lineup value 0
12535 | Isaac TeSlaa | WR | age 24 | DET | market 2786 | projected 36.2 (3.3 a week) | last 3 weeks 4.1 a week | lineup value 0

PARTNER (partnerId 8): record 1-2, rank 10, points for 281.7, contention window 0.05
4046 | Patrick Mahomes | QB | age 31 | KC | market 3429 | projected 214.9 (19.5 a week) | last 3 weeks 20.8 a week | lineup value 53.4
5850 | Josh Jacobs | RB | age 28 | GB | market 4035 | projected 162.8 (14.8 a week) | last 3 weeks 13.6 a week | lineup value 139.5
1373 | Geno Smith | QB | age 36 | NYJ | market 1715 | projected 162.1 (14.7 a week) | last 3 weeks 16.9 a week | lineup value 2.8
7526 | Jaylen Waddle | WR | age 27 | DEN | market 4003 | projected 141.4 (12.9 a week) | last 3 weeks 13.2 a week | lineup value 83.1
6786 | CeeDee Lamb | WR | age 27 | DAL | market 4922 | projected 133.7 (12.2 a week) | last 3 weeks 12.7 a week | lineup value 89.3
5001 | Dalton Schultz | TE | age 30 | HOU | market 3165 | projected 90.9 (8.3 a week) | last 3 weeks 6.9 a week | lineup value 30.1
4039 | Cooper Kupp | WR | age 33 | SEA | market 2098 | projected 86.6 (7.9 a week) | last 3 weeks 8.2 a week | lineup value 29.6
7527 | Mac Jones | QB | age 28 | SF | market 1215 | projected 86.3 (7.8 a week) | last 3 weeks 12 a week | lineup value 0
4066 | Evan Engram | TE | age 32 | DEN | market 0 | projected 77.9 (7.1 a week) | last 3 weeks 2.4 a week | lineup value 19.5
KC | Kansas City Chiefs | DEF | age ? | KC | market 0 | projected 72 (6.5 a week) | last 3 weeks 6.3 a week | lineup value 72
9487 | Parker Washington | WR | age 24 | JAX | market 4010 | projected 70.9 (6.4 a week) | last 3 weeks 6.7 a week | lineup value 18.8
4219 | Jeremy McNichols | RB | age 30 | WAS | market 0 | projected 63.3 (5.8 a week) | last 3 weeks 4.6 a week | lineup value 39.9
1166 | Kirk Cousins | QB | age 38 | LV | market 1457 | projected 58.1 (5.3 a week) | last 3 weeks 0.4 a week | lineup value 0
12502 | Gunnar Helm | TE | age 24 | TEN | market 3244 | projected 49.3 (4.5 a week) | last 3 weeks 3.7 a week | lineup value 2.5
4037 | Chris Godwin | WR | age 30 | TB | market 3091 | projected 47.8 (4.3 a week) | last 3 weeks 0 a week | lineup value 13.3
8180 | Jalen Nailor | WR | age 27 | LV | market 2605 | projected 45.8 (4.2 a week) | last 3 weeks 2.2 a week | lineup value 0
8698 | Jake Tonges | TE | age 27 | SF | market 2714 | projected 29.7 (2.7 a week) | last 3 weeks 1.4 a week | lineup value 4.4
7828 | Noah Gray | TE | age 27 | KC | market 0 | projected 25.5 (2.3 a week) | last 3 weeks 2.4 a week | lineup value 0
12504 | Kaleb Johnson | RB | age 23 | GB | market 2740 | projected 18.1 (1.6 a week) | last 3 weeks 0 a week | lineup value 1.9
5096 | Ray-Ray McCloud | WR | age 29 | FA | market 0 | projected 18.1 (1.6 a week) | last 3 weeks 4 a week | lineup value 0
12457 | Jaydon Blue | RB | age 22 | PHI | market 2774 | projected 13.7 (1.2 a week) | last 3 weeks 0 a week | lineup value 1.9
11595 | Jared Wiley | TE | age 25 | KC | market 1478 | projected 0.4 (0 a week) | last 3 weeks 0 a week | lineup value 0

PARTNER (partnerId 12): record 1-2, rank 7, points for 331.7, contention window 0.44
4984 | Josh Allen | QB | age 30 | BUF | market 4737 | projected 236.4 (21.5 a week) | last 3 weeks 24.5 a week | lineup value 59.5
3294 | Dak Prescott | QB | age 33 | DAL | market 3251 | projected 196.6 (17.9 a week) | last 3 weeks 15 a week | lineup value 19.7
3198 | Derrick Henry | RB | age 32 | BAL | market 4137 | projected 168.9 (15.4 a week) | last 3 weeks 14.1 a week | lineup value 70.9
7021 | Rico Dowdle | RB | age 28 | PIT | market 3264 | projected 135.4 (12.3 a week) | last 3 weeks 5.8 a week | lineup value 30.4
2449 | Stefon Diggs | WR | age 32 | WAS | market 2784 | projected 135 (12.3 a week) | last 3 weeks 8.1 a week | lineup value 20
5859 | A.J. Brown | WR | age 29 | NE | market 4314 | projected 130.2 (11.8 a week) | last 3 weeks 10.8 a week | lineup value 28.8
8136 | Rachaad White | RB | age 27 | WAS | market 2759 | projected 129 (11.7 a week) | last 3 weeks 6.5 a week | lineup value 31.4
12518 | Tyler Warren | TE | age 24 | IND | market 4600 | projected 128.3 (11.7 a week) | last 3 weeks 11.2 a week | lineup value 32.9
1479 | Keenan Allen | WR | age 34 | IND | market 2143 | projected 125.2 (11.4 a week) | last 3 weeks 18.8 a week | lineup value 11
10229 | Rashee Rice | WR | age 26 | KC | market 4418 | projected 122.3 (11.1 a week) | last 3 weeks 0 a week | lineup value 43.7
1466 | Travis Kelce | TE | age 37 | KC | market 2867 | projected 111.2 (10.1 a week) | last 3 weeks 9.8 a week | lineup value 15.8
9756 | Jordan Addison | WR | age 24 | MIN | market 3611 | projected 105.4 (9.6 a week) | last 3 weeks 0 a week | lineup value 0
6783 | Jerry Jeudy | WR | age 27 | CLE | market 2700 | projected 97 (8.8 a week) | last 3 weeks 7.8 a week | lineup value 2.2
6806 | J.K. Dobbins | RB | age 27 | DEN | market 3332 | projected 91.3 (8.3 a week) | last 3 weeks 15.2 a week | lineup value 14.7
9500 | Josh Downs | WR | age 25 | IND | market 3345 | projected 84.3 (7.7 a week) | last 3 weeks 6.6 a week | lineup value 0
SF | San Francisco 49ers | DEF | age ? | SF | market 0 | projected 66.4 (6 a week) | last 3 weeks 8 a week | lineup value 66.4
12519 | Luther Burden | WR | age 22 | CHI | market 4867 | projected 54.5 (5 a week) | last 3 weeks 7.3 a week | lineup value 0
12495 | Ollie Gordon | RB | age 22 | MIA | market 0 | projected 47.5 (4.3 a week) | last 3 weeks 4.5 a week | lineup value 0
11575 | Ray Davis | RB | age 26 | BUF | market 2516 | projected 32.4 (2.9 a week) | last 3 weeks 1.2 a week | lineup value 0
2306 | Jameis Winston | QB | age 32 | NYG | market 0 | projected 30.1 (2.7 a week) | last 3 weeks 0 a week | lineup value 0
7596 | Elijah Moore | WR | age 26 | PHI | market 0 | projected 12.9 (1.2 a week) | last 3 weeks 6.3 a week | lineup value 0
10235 | Roschon Johnson | RB | age 25 | CHI | market 0 | projected 2.4 (0.2 a week) | last 3 weeks 0 a week | lineup value 0

CANDIDATE DEALS (from a rules-based finder; points are the finder projections for the rest of the season):
c1 | partnerId 1 | I give MarShawn Lloyd (11581) | I get Jared Goff + Tyjae Spears (3163,9508) | my points 47.7 | their points -61.9 | likelihood 0.87
c2 | partnerId 1 | I give Jayden Reed (10222) | I get Jared Goff + Zach Ertz (3163,1339) | my points 60.4 | their points -37.5 | likelihood 0.93
c3 | partnerId 9 | I give Rome Odunze + D'Andre Swift (11620,6790) | I get Jalen Hurts + Brenton Strange (6904,9480) | my points 54.9 | their points 24.9 | likelihood 0.71
c4 | partnerId 10 | I give MarShawn Lloyd (11581) | I get Baker Mayfield + J.J. McCarthy (4892,11565) | my points 56.9 | their points -38.9 | likelihood 0.86
c5 | partnerId 10 | I give MarShawn Lloyd + Luke Musgrave (11581,9481) | I get Baker Mayfield (4892) | my points 55.5 | their points -37.5 | likelihood 0.86
c6 | partnerId 3 | I give MarShawn Lloyd (11581) | I get Daniel Jones + Matthew Stafford (5870,421) | my points 50.9 | their points -97.2 | likelihood 0.95
c7 | partnerId 9 | I give Rome Odunze + Alec Pierce (11620,8142) | I get Jalen Hurts + Justin Fields (6904,7591) | my points 62.2 | their points 17 | likelihood 0.65
c8 | partnerId 8 | I give Jayden Reed (10222) | I get Geno Smith + Dalton Schultz (1373,5001) | my points 38.8 | their points -32.9 | likelihood 0.82
c9 | partnerId 1 | I give MarShawn Lloyd + Jayden Reed (11581,10222) | I get Jared Goff (3163) | my points 47.7 | their points -6.5 | likelihood 0.89
c10 | partnerId 12 | I give Alec Pierce + Matthew Golden (8142,12501) | I get Dak Prescott + Travis Kelce (3294,1466) | my points 81.5 | their points -33.5 | likelihood 0.68
c11 | partnerId 12 | I give Jayden Reed + Matthew Golden (10222,12501) | I get Dak Prescott (3294) | my points 61.2 | their points -19.7 | likelihood 0.72
c12 | partnerId 12 | I give MarShawn Lloyd + Matthew Golden (11581,12501) | I get Dak Prescott + Rachaad White (3294,8136) | my points 91.7 | their points -51.1 | likelihood 0.61

Pick the best trades for my team.

=========== CASE 1180092558252679168-w7-r1 ===========
REPLY FILE: /Users/anik/workspace/chrome/sleeper/.eval-market/replies/suggest-v2/run1/1180092558252679168-w7-r1.json
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

MY TEAM (partnerId me): record 3-3, rank 7, points for 568.5, contention window 0.44
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
6945 | Antonio Gibson | RB | age 27 | FA | market 1427 | projected 0 (0 a week) | last 3 weeks 4.1 a week | lineup value 0

PARTNER (partnerId 5): record 5-1, rank 1, points for 706.6, contention window 1
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

PARTNER (partnerId 7): record 4-2, rank 3, points for 714.1, contention window 0.95
9493 | Puka Nacua | WR | age 25 | LAR | market 5687 | projected 124.3 (15.5 a week) | last 3 weeks 21.8 a week | lineup value 60.8
7569 | Nico Collins | WR | age 27 | HOU | market 4429 | projected 111.8 (14 a week) | last 3 weeks 9.3 a week | lineup value 40.2
12527 | Ashton Jeanty | RB | age 22 | LV | market 5352 | projected 111.1 (13.9 a week) | last 3 weeks 22 a week | lineup value 39.8
12474 | Woody Marks | RB | age 25 | HOU | market 3141 | projected 97.7 (12.2 a week) | last 3 weeks 10.1 a week | lineup value 25.8
12508 | Jaxson Dart | QB | age 23 | NYG | market 4278 | projected 92.4 (11.5 a week) | last 3 weeks 20.3 a week | lineup value 40.3
12522 | Cam Ward | QB | age 24 | TEN | market 3041 | projected 88.8 (11.1 a week) | last 3 weeks 7.5 a week | lineup value 36.7
12493 | Oronde Gadsden | TE | age 23 | LAC | market 4195 | projected 76.1 (9.5 a week) | last 3 weeks 5.9 a week | lineup value 18.1
10213 | Tre Tucker | WR | age 25 | LV | market 2699 | projected 74.8 (9.3 a week) | last 3 weeks 9.1 a week | lineup value 4.5
8122 | Zonovan Knight | RB | age 25 | ARI | market 0 | projected 73 (9.1 a week) | last 3 weeks 4.1 a week | lineup value 4.6
7002 | Juwan Johnson | TE | age 30 | NO | market 3116 | projected 68.7 (8.6 a week) | last 3 weeks 3.7 a week | lineup value 12.1
10232 | Michael Wilson | WR | age 26 | ARI | market 3638 | projected 68.1 (8.5 a week) | last 3 weeks 5.5 a week | lineup value 6.6
5844 | T.J. Hockenson | TE | age 29 | MIN | market 2963 | projected 67.7 (8.5 a week) | last 3 weeks 5.9 a week | lineup value 8.3
8112 | Drake London | WR | age 25 | ATL | market 4860 | projected 65 (8.1 a week) | last 3 weeks 18.9 a week | lineup value 25.9
GB | Green Bay Packers | DEF | age ? | GB | market 0 | projected 61.2 (7.7 a week) | last 3 weeks -0.3 a week | lineup value 12.7
DEN | Denver Broncos | DEF | age ? | DEN | market 0 | projected 54 (6.8 a week) | last 3 weeks 10 a week | lineup value 5.5
11646 | Jalen Coker | WR | age 24 | CAR | market 3265 | projected 48.4 (6 a week) | last 3 weeks 0 a week | lineup value 3.9
11584 | Bucky Irving | RB | age 24 | TB | market 4306 | projected 29.6 (3.7 a week) | last 3 weeks 8.5 a week | lineup value 7.3
12455 | Brashard Smith | RB | age 23 | KC | market 2698 | projected 29.5 (3.7 a week) | last 3 weeks 6.1 a week | lineup value 4.1
12503 | Isaiah Bond | WR | age 22 | CLE | market 0 | projected 23.7 (3 a week) | last 3 weeks 5.5 a week | lineup value 5.8
11199 | Emari Demercado | RB | age 27 | DAL | market 0 | projected 22 (2.7 a week) | last 3 weeks 2.1 a week | lineup value 0
8146 | Garrett Wilson | WR | age 26 | NYJ | market 4212 | projected 14.6 (1.8 a week) | last 3 weeks 14.5 a week | lineup value 3.6
12497 | Tory Horton | WR | age 23 | SEA | market 2786 | projected 14.3 (1.8 a week) | last 3 weeks 5 a week | lineup value 0

PARTNER (partnerId 11): record 3-3, rank 5, points for 778.5, contention window 0.69
9226 | De'Von Achane | RB | age 25 | MIA | market 4989 | projected 151.8 (19 a week) | last 3 weeks 21.6 a week | lineup value 120.3
7547 | Amon-Ra St. Brown | WR | age 26 | DET | market 5299 | projected 137 (17.1 a week) | last 3 weeks 19.2 a week | lineup value 78.4
12514 | Emeka Egbuka | WR | age 24 | TB | market 4519 | projected 102.4 (12.8 a week) | last 3 weeks 18.6 a week | lineup value 48.4
9228 | Bryce Young | QB | age 25 | CAR | market 2845 | projected 91.3 (11.4 a week) | last 3 weeks 14.3 a week | lineup value 91.3
5045 | Courtland Sutton | WR | age 31 | DEN | market 3183 | projected 90.9 (11.4 a week) | last 3 weeks 13.2 a week | lineup value 30.3
7553 | Kyle Pitts | TE | age 26 | ATL | market 3958 | projected 80.4 (10 a week) | last 3 weeks 7.6 a week | lineup value 55.3
5872 | Deebo Samuel | WR | age 30 | SF | market 2701 | projected 79.7 (10 a week) | last 3 weeks 16.4 a week | lineup value 25.2
11655 | Tyrone Tracy | RB | age 26 | NYG | market 2984 | projected 65 (8.1 a week) | last 3 weeks 0.2 a week | lineup value 41.3
12540 | Chimere Dike | WR | age 24 | TEN | market 2870 | projected 54.2 (6.8 a week) | last 3 weeks 2 a week | lineup value 8.3
11628 | Marvin Harrison | WR | age 24 | HOU | market 3923 | projected 50.6 (6.3 a week) | last 3 weeks 12.5 a week | lineup value 10.8
DET | Detroit Lions | DEF | age ? | DET | market 0 | projected 50.3 (6.3 a week) | last 3 weeks 11.7 a week | lineup value 9.9
CLE | Cleveland Browns | DEF | age ? | CLE | market 0 | projected 49.6 (6.2 a week) | last 3 weeks 3.7 a week | lineup value 9.2
8143 | Jerome Ford | RB | age 27 | ARI | market 0 | projected 36.8 (4.6 a week) | last 3 weeks 5 a week | lineup value 5.2
6826 | Cole Kmet | TE | age 27 | CHI | market 0 | projected 27 (3.4 a week) | last 3 weeks 2.9 a week | lineup value 2
12547 | Kyle Williams | WR | age 23 | NE | market 2803 | projected 19.7 (2.5 a week) | last 3 weeks -0.1 a week | lineup value 0
4082 | Curtis Samuel | WR | age 29 | FA | market 1447 | projected 17.5 (2.2 a week) | last 3 weeks 4.2 a week | lineup value 0
12541 | Dont'e Thornton | WR | age 23 | LV | market 0 | projected 15.6 (1.9 a week) | last 3 weeks 0 a week | lineup value 0
1689 | Adam Thielen | WR | age 35 | FA | market 2194 | projected 12.3 (1.5 a week) | last 3 weeks 1 a week | lineup value 0
12507 | Omarion Hampton | RB | age 23 | LAC | market 5141 | projected 10.5 (1.3 a week) | last 3 weeks 13.5 a week | lineup value 4.4
9757 | Kendre Miller | RB | age 24 | NO | market 2611 | projected 6.7 (0.8 a week) | last 3 weeks 7.5 a week | lineup value 0.5
11599 | Cade Stover | TE | age 26 | HOU | market 0 | projected 5.3 (0.7 a week) | last 3 weeks 0 a week | lineup value 0
12496 | Tai Felton | WR | age 23 | MIN | market 0 | projected 1.6 (0.2 a week) | last 3 weeks 0 a week | lineup value 0

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

CANDIDATE DEALS (from a rules-based finder; points are the finder projections for the rest of the season):
c1 | partnerId 5 | I give Jared Goff + Zach Ertz (3163,1339) | I get Kareem Hunt + Alec Pierce (4098,8142) | my points 5.4 | their points 45 | likelihood 0.65
c2 | partnerId 5 | I give Jared Goff (3163) | I get Kareem Hunt + Jayden Reed (4098,10222) | my points 14.2 | their points 37.7 | likelihood 0.67
c3 | partnerId 5 | I give Jared Goff + Joe Mixon (3163,4018) | I get Alec Pierce + Ricky Pearsall (8142,11638) | my points 16.8 | their points 38 | likelihood 0.65
c4 | partnerId 7 | I give Jared Goff + Malik Washington (3163,11610) | I get Zonovan Knight + Braelon Allen (8122,11576) | my points 18.5 | their points 21.9 | likelihood 0.61
c5 | partnerId 7 | I give Jared Goff + DeAndre Hopkins (3163,1426) | I get Tre Tucker + Braelon Allen (10213,11576) | my points 15.9 | their points 20 | likelihood 0.58
c6 | partnerId 7 | I give Jared Goff (3163) | I get Emari Demercado + Braelon Allen (11199,11576) | my points 9.5 | their points 22.6 | likelihood 0.62
c7 | partnerId 11 | I give Jared Goff + David Njoku (3163,4033) | I get Adam Thielen + Kyler Murray (1689,5849) | my points -4.4 | their points 42.4 | likelihood 0.54
c8 | partnerId 11 | I give Jared Goff + Andrei Iosivas (3163,10226) | I get Kyler Murray (5849) | my points -7.8 | their points 43.4 | likelihood 0.55
c9 | partnerId 11 | I give Jared Goff (3163) | I get Kyle Williams + Kyler Murray (12547,5849) | my points -2.2 | their points 37.8 | likelihood 0.48
c10 | partnerId 10 | I give Lamar Jackson + Cam Skattebo (4881,12481) | I get Devin Singletary + Malik Nabers (6130,11632) | my points -33.6 | their points 31.8 | likelihood 0.43

Pick the best trades for my team.
