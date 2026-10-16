You are answering fantasy football trade-advice cases. For each case below, follow the SYSTEM text, read the DATA, and write your JSON answer to the reply file named for that case.
Rules: write only the JSON object (no markdown fence, no commentary) to each reply file. Do not read any other file on disk. Do not look at any directory named truth or any file outside the reply paths. Work each case independently.

=========== CASE 1048366950373543936-w10-r4 ===========
REPLY FILE: /Users/anik/workspace/chrome/sleeper/.eval-market/replies/suggest-v2/heldout1/1048366950373543936-w10-r4.json
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
League: dynasty, 10 teams, week 10, 5 regular season weeks left, playoffs start week 15
Lineup slots: QB, RB, RB, WR, WR, TE, FLEX, FLEX, SUPER_FLEX, K, DEF, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN. Superflex: yes. Tight end premium: no. Points per reception: 1.
Columns: id | name | position | age | team | market value | projected points for the rest of the regular season (and per week) | points per week over the last three weeks played | lineup value (points my lineup loses if this player is removed).

MY TEAM (partnerId me): record 6-3, rank 3, points for 1371.4, contention window 0.89
4881 | Lamar Jackson | QB | age 29 | BAL | market 6311 | projected 85.1 (17 a week) | last 3 weeks 27.4 a week | lineup value 27
5859 | A.J. Brown | WR | age 29 | NE | market 4313 | projected 83.5 (16.7 a week) | last 3 weeks 13 a week | lineup value 24.1
9493 | Puka Nacua | WR | age 25 | LAR | market 5685 | projected 81.1 (16.2 a week) | last 3 weeks 6.7 a week | lineup value 21.6
4943 | Sam Darnold | QB | age 29 | SEA | market 3772 | projected 79.1 (15.8 a week) | last 3 weeks 17.8 a week | lineup value 11.2
9224 | Chase Brown | RB | age 26 | CIN | market 4506 | projected 67.5 (13.5 a week) | last 3 weeks 15.1 a week | lineup value 28.4
5892 | David Montgomery | RB | age 29 | HOU | market 3467 | projected 66.9 (13.4 a week) | last 3 weeks 11.8 a week | lineup value 27
6813 | Jonathan Taylor | RB | age 27 | IND | market 5009 | projected 61.3 (12.3 a week) | last 3 weeks 9.2 a week | lineup value 21.4
96 | Aaron Rodgers | QB | age 42 | PIT | market 2575 | projected 59.3 (11.9 a week) | last 3 weeks 16.9 a week | lineup value 4.6
9997 | Zay Flowers | WR | age 26 | BAL | market 4183 | projected 55.8 (11.2 a week) | last 3 weeks 17.4 a week | lineup value 6.2
11564 | Drake Maye | QB | age 24 | NE | market 6666 | projected 55.4 (11.1 a week) | last 3 weeks 16 a week | lineup value 0
8130 | Trey McBride | TE | age 26 | ARI | market 4876 | projected 52.2 (10.4 a week) | last 3 weeks 14.7 a week | lineup value 9.8
7569 | Nico Collins | WR | age 27 | HOU | market 4424 | projected 50.7 (10.1 a week) | last 3 weeks 0 a week | lineup value 13.5
6783 | Jerry Jeudy | WR | age 27 | CLE | market 2695 | projected 44.2 (8.8 a week) | last 3 weeks 10 a week | lineup value 3.1
8111 | Cade Otton | TE | age 27 | TB | market 2958 | projected 42.7 (8.5 a week) | last 3 weeks 16.9 a week | lineup value 0.2
5012 | Mark Andrews | TE | age 31 | BAL | market 3109 | projected 37.1 (7.4 a week) | last 3 weeks 13.1 a week | lineup value 9.5
11626 | Xavier Legette | WR | age 25 | CAR | market 0 | projected 36.5 (7.3 a week) | last 3 weeks 10.1 a week | lineup value 0
3451 | Ka'imi Fairbairn | K | age 32 | HOU | market 0 | projected 33.7 (6.7 a week) | last 3 weeks 10 a week | lineup value 33.7
LAC | Los Angeles Chargers | DEF | age ? | LAC | market 0 | projected 33.5 (6.7 a week) | last 3 weeks 10.3 a week | lineup value 33.5
10232 | Michael Wilson | WR | age 26 | ARI | market 3633 | projected 26.9 (5.4 a week) | last 3 weeks 5.5 a week | lineup value 0
11640 | Jermaine Burton | WR | age 24 | FA | market 2046 | projected 11 (2.2 a week) | last 3 weeks 1.7 a week | lineup value 0
5987 | Alexander Mattison | RB | age 27 | FA | market 1371 | projected 8.5 (1.7 a week) | last 3 weeks 4.3 a week | lineup value 0
11617 | Malachi Corley | WR | age 24 | CLE | market 2383 | projected 6.3 (1.3 a week) | last 3 weeks -0.1 a week | lineup value 0
8207 | Tyler Goodson | RB | age 25 | DAL | market 0 | projected 3.6 (0.7 a week) | last 3 weeks 0 a week | lineup value 0
11645 | Javon Baker | WR | age 23 | FA | market 0 | projected 2.7 (0.5 a week) | last 3 weeks 0 a week | lineup value 0
11562 | Spencer Rattler | QB | age 26 | NO | market 0 | projected 0 (0 a week) | last 3 weeks 4.2 a week | lineup value 0

PARTNER (partnerId 3): record 4-5, rank 8, points for 1306.1, contention window 0.11
11566 | Jayden Daniels | QB | age 25 | WAS | market 6174 | projected 76.8 (15.4 a week) | last 3 weeks 15.8 a week | lineup value 38.9
6770 | Joe Burrow | QB | age 29 | CIN | market 5735 | projected 75.5 (15.1 a week) | last 3 weeks 19 a week | lineup value 33.5
9509 | Bijan Robinson | RB | age 24 | ATL | market 6364 | projected 70.3 (14.1 a week) | last 3 weeks 22.8 a week | lineup value 41.6
8112 | Drake London | WR | age 25 | ATL | market 4866 | projected 62.3 (12.5 a week) | last 3 weeks 12.1 a week | lineup value 30.4
2306 | Jameis Winston | QB | age 32 | NYG | market 0 | projected 56.4 (11.3 a week) | last 3 weeks 11.2 a week | lineup value 19.1
8134 | Khalil Shakir | WR | age 26 | BUF | market 3139 | projected 53.7 (10.7 a week) | last 3 weeks 14.8 a week | lineup value 21.8
11628 | Marvin Harrison | WR | age 24 | HOU | market 3920 | projected 50.2 (10 a week) | last 3 weeks 10.5 a week | lineup value 22.7
KC | Kansas City Chiefs | DEF | age ? | KC | market 0 | projected 40.5 (8.1 a week) | last 3 weeks 3.7 a week | lineup value 40.5
8154 | Brian Robinson | RB | age 27 | ATL | market 3187 | projected 37.5 (7.5 a week) | last 3 weeks 7.2 a week | lineup value 22
1264 | Justin Tucker | K | age 35 | FA | market 0 | projected 37.1 (7.4 a week) | last 3 weeks 10 a week | lineup value 37.1
10859 | Sam LaPorta | TE | age 25 | DET | market 4256 | projected 36.4 (7.3 a week) | last 3 weeks 8.4 a week | lineup value 27.1
2309 | Amari Cooper | WR | age 31 | FA | market 2259 | projected 34.1 (6.8 a week) | last 3 weeks 6 a week | lineup value 9.9
7571 | Rashod Bateman | WR | age 26 | BAL | market 2468 | projected 32.6 (6.5 a week) | last 3 weeks 10.5 a week | lineup value 6.2
8132 | Tyler Allgeier | RB | age 26 | ARI | market 3195 | projected 27.3 (5.5 a week) | last 3 weeks 5.5 a week | lineup value 0
11625 | Adonai Mitchell | WR | age 24 | NYJ | market 2979 | projected 27.2 (5.4 a week) | last 3 weeks 3.4 a week | lineup value 2
9487 | Parker Washington | WR | age 24 | JAX | market 4014 | projected 26.9 (5.4 a week) | last 3 weeks 2.4 a week | lineup value 0.5
9225 | Tank Bigsby | RB | age 24 | PHI | market 2864 | projected 23.5 (4.7 a week) | last 3 weeks 12.2 a week | lineup value 2.1
8131 | Isaiah Likely | TE | age 26 | NYG | market 3474 | projected 18.9 (3.8 a week) | last 3 weeks 4.1 a week | lineup value 9.6
11579 | Audric Estime | RB | age 23 | CLE | market 2634 | projected 18.7 (3.7 a week) | last 3 weeks 1.6 a week | lineup value 4.4
11650 | Luke McCaffrey | WR | age 25 | WAS | market 0 | projected 13.7 (2.7 a week) | last 3 weeks 0 a week | lineup value 0
11592 | Erick All | TE | age 26 | CIN | market 0 | projected 0 (0 a week) | last 3 weeks 3.2 a week | lineup value 0
4950 | Christian Kirk | WR | age 29 | SF | market 2207 | projected 0 (0 a week) | last 3 weeks 3.8 a week | lineup value 0

PARTNER (partnerId 1): record 4-5, rank 6, points for 1354, contention window 0.42
4035 | Alvin Kamara | RB | age 31 | NO | market 2512 | projected 80.2 (16 a week) | last 3 weeks 18 a week | lineup value 37.3
4034 | Christian McCaffrey | RB | age 30 | SF | market 4591 | projected 79.8 (16 a week) | last 3 weeks 0 a week | lineup value 37.5
4039 | Cooper Kupp | WR | age 33 | SEA | market 2093 | projected 75.3 (15.1 a week) | last 3 weeks 12.5 a week | lineup value 22.5
9758 | C.J. Stroud | QB | age 25 | HOU | market 4449 | projected 65.5 (13.1 a week) | last 3 weeks 9.8 a week | lineup value 31.8
1373 | Geno Smith | QB | age 36 | NYJ | market 2403 | projected 62.5 (12.5 a week) | last 3 weeks 16 a week | lineup value 27.4
7049 | Jauan Jennings | WR | age 29 | MIN | market 2834 | projected 61.5 (12.3 a week) | last 3 weeks 0 a week | lineup value 8.8
5872 | Deebo Samuel | WR | age 30 | SF | market 2703 | projected 61.3 (12.3 a week) | last 3 weeks 4.2 a week | lineup value 8.5
7021 | Rico Dowdle | RB | age 28 | PIT | market 3263 | projected 61 (12.2 a week) | last 3 weeks 7.2 a week | lineup value 8.3
8138 | James Cook | RB | age 27 | BUF | market 4892 | projected 54.1 (10.8 a week) | last 3 weeks 16.5 a week | lineup value 11.3
4217 | George Kittle | TE | age 33 | SF | market 3141 | projected 53.9 (10.8 a week) | last 3 weeks 13.3 a week | lineup value 27.5
4988 | Nick Chubb | RB | age 30 | FA | market 1805 | projected 43 (8.6 a week) | last 3 weeks 6.6 a week | lineup value 0.4
8259 | Cameron Dicker | K | age 26 | LAC | market 0 | projected 41.4 (8.3 a week) | last 3 weeks 10 a week | lineup value 1.3
1945 | Chris Boswell | K | age 35 | PIT | market 0 | projected 40.5 (8.1 a week) | last 3 weeks 9.3 a week | lineup value 0.5
8117 | Jalen Tolbert | WR | age 27 | MIA | market 0 | projected 35 (7 a week) | last 3 weeks 6.1 a week | lineup value 0
9484 | Tucker Kraft | TE | age 25 | GB | market 4150 | projected 34.9 (7 a week) | last 3 weeks 12.2 a week | lineup value 8.5
SF | San Francisco 49ers | DEF | age ? | SF | market 0 | projected 33.8 (6.8 a week) | last 3 weeks 4.3 a week | lineup value 3.5
CHI | Chicago Bears | DEF | age ? | CHI | market 0 | projected 32.7 (6.5 a week) | last 3 weeks 4 a week | lineup value 2.4
10444 | Cedric Tillman | WR | age 26 | NO | market 0 | projected 21.4 (4.3 a week) | last 3 weeks 16.1 a week | lineup value 0
11651 | Isaac Guerendo | RB | age 26 | SF | market 0 | projected 18.8 (3.8 a week) | last 3 weeks 7 a week | lineup value 3.8
11575 | Ray Davis | RB | age 26 | BUF | market 2524 | projected 18.5 (3.7 a week) | last 3 weeks 10.5 a week | lineup value 0
11646 | Jalen Coker | WR | age 24 | CAR | market 3254 | projected 6.6 (1.3 a week) | last 3 weeks 2.5 a week | lineup value 0
7591 | Justin Fields | QB | age 27 | KC | market 1909 | projected 3.9 (0.8 a week) | last 3 weeks 0 a week | lineup value 0

PARTNER (partnerId 2): record 4-5, rank 7, points for 1318.8, contention window 0.27
6794 | Justin Jefferson | WR | age 27 | MIN | market 4818 | projected 85.8 (17.2 a week) | last 3 weeks 20.8 a week | lineup value 32.6
9221 | Jahmyr Gibbs | RB | age 24 | DET | market 6371 | projected 79.4 (15.9 a week) | last 3 weeks 22.3 a week | lineup value 36.7
4199 | Aaron Jones | RB | age 31 | MIN | market 2803 | projected 73.2 (14.6 a week) | last 3 weeks 14.8 a week | lineup value 30.6
8183 | Brock Purdy | QB | age 26 | SF | market 5092 | projected 71.6 (14.3 a week) | last 3 weeks 14.4 a week | lineup value 33.7
5927 | Terry McLaurin | WR | age 31 | WAS | market 3390 | projected 59.3 (11.9 a week) | last 3 weeks 16.4 a week | lineup value 11.5
11632 | Malik Nabers | WR | age 23 | NYG | market 5024 | projected 58.7 (11.7 a week) | last 3 weeks 12.4 a week | lineup value 16.9
2133 | Davante Adams | WR | age 33 | LAR | market 3374 | projected 55.1 (11 a week) | last 3 weeks 12.5 a week | lineup value 11.9
8137 | George Pickens | WR | age 25 | DAL | market 4766 | projected 52.9 (10.6 a week) | last 3 weeks 11.2 a week | lineup value 5.5
9229 | Anthony Richardson | QB | age 24 | IND | market 0 | projected 45.1 (9 a week) | last 3 weeks 6.8 a week | lineup value 20.9
9500 | Josh Downs | WR | age 25 | IND | market 3347 | projected 37.9 (7.6 a week) | last 3 weeks 11.8 a week | lineup value 3
5001 | Dalton Schultz | TE | age 30 | HOU | market 3165 | projected 34.7 (6.9 a week) | last 3 weeks 6 a week | lineup value 8.4
7553 | Kyle Pitts | TE | age 26 | ATL | market 3952 | projected 34.7 (6.9 a week) | last 3 weeks 13.6 a week | lineup value 8.4
2374 | Tyler Lockett | WR | age 33 | FA | market 2520 | projected 33.1 (6.6 a week) | last 3 weeks 8.6 a week | lineup value 1.8
4663 | Austin Ekeler | RB | age 31 | WAS | market 0 | projected 31.3 (6.3 a week) | last 3 weeks 9.7 a week | lineup value 0
7839 | Evan McPherson | K | age 27 | CIN | market 0 | projected 25.4 (5.1 a week) | last 3 weeks 6 a week | lineup value 25.4
CIN | Cincinnati Bengals | DEF | age ? | CIN | market 0 | projected 25.1 (5 a week) | last 3 weeks 7.7 a week | lineup value 25.1
6130 | Devin Singletary | RB | age 29 | NYG | market 0 | projected 22 (4.4 a week) | last 3 weeks 3.6 a week | lineup value 0.3
11627 | Troy Franklin | WR | age 23 | DEN | market 3022 | projected 20.7 (4.1 a week) | last 3 weeks 4.9 a week | lineup value 0
10235 | Roschon Johnson | RB | age 25 | CHI | market 0 | projected 18.5 (3.7 a week) | last 3 weeks 3.6 a week | lineup value 0
11583 | Jonathon Brooks | RB | age 23 | CAR | market 3587 | projected 15.5 (3.1 a week) | last 3 weeks 0 a week | lineup value 0
19 | Joe Flacco | QB | age 41 | CIN | market 0 | projected 13.8 (2.8 a week) | last 3 weeks 1 a week | lineup value 0.2
11435 | Emanuel Wilson | RB | age 27 | SEA | market 2473 | projected 12.4 (2.5 a week) | last 3 weeks 4.4 a week | lineup value 0

CANDIDATE DEALS (from a rules-based finder; points are the finder projections for the rest of the season):
c1 | partnerId 3 | I give Drake Maye (11564) | I get Jayden Daniels + Drake London (11566,8112) | my points 27.2 | their points -51.1 | likelihood 0.83
c2 | partnerId 1 | I give Cade Otton (8111) | I get Alvin Kamara (4035) | my points 30.3 | their points -32.8 | likelihood 0.74
c3 | partnerId 1 | I give Cade Otton + Malachi Corley (8111,11617) | I get Alvin Kamara + Isaac Guerendo (4035,11651) | my points 31.6 | their points -37.1 | likelihood 0.7
c4 | partnerId 2 | I give Cade Otton + Drake Maye (8111,11564) | I get Jahmyr Gibbs + Aaron Jones (9221,4199) | my points 18.7 | their points -71.7 | likelihood 0.59
c5 | partnerId 1 | I give Malachi Corley (11617) | I get Cooper Kupp + Isaac Guerendo (4039,11651) | my points 13 | their points -27.7 | likelihood 0.64

Pick the best trades for my team.

=========== CASE 1048366950373543936-w4-r2 ===========
REPLY FILE: /Users/anik/workspace/chrome/sleeper/.eval-market/replies/suggest-v2/heldout1/1048366950373543936-w4-r2.json
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
Lineup slots: QB, RB, RB, WR, WR, TE, FLEX, FLEX, SUPER_FLEX, K, DEF, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN. Superflex: yes. Tight end premium: no. Points per reception: 1.
Columns: id | name | position | age | team | market value | projected points for the rest of the regular season (and per week) | points per week over the last three weeks played | lineup value (points my lineup loses if this player is removed).

MY TEAM (partnerId me): record 2-1, rank 2, points for 462.8, contention window 1
6794 | Justin Jefferson | WR | age 27 | MIN | market 4818 | projected 175.6 (16 a week) | last 3 weeks 19.8 a week | lineup value 60.4
8183 | Brock Purdy | QB | age 26 | SF | market 5087 | projected 160.3 (14.6 a week) | last 3 weeks 16.7 a week | lineup value 87.1
9221 | Jahmyr Gibbs | RB | age 24 | DET | market 6368 | projected 155.8 (14.2 a week) | last 3 weeks 17.1 a week | lineup value 53.3
4199 | Aaron Jones | RB | age 31 | MIN | market 2805 | projected 148.3 (13.5 a week) | last 3 weeks 18.2 a week | lineup value 46
5927 | Terry McLaurin | WR | age 31 | WAS | market 3391 | projected 142.4 (12.9 a week) | last 3 weeks 10.6 a week | lineup value 24.2
11632 | Malik Nabers | WR | age 23 | NYG | market 5025 | projected 122.6 (11.1 a week) | last 3 weeks 22.8 a week | lineup value 28.1
8137 | George Pickens | WR | age 25 | DAL | market 4768 | projected 117.1 (10.6 a week) | last 3 weeks 9.7 a week | lineup value 11.5
2374 | Tyler Lockett | WR | age 33 | FA | market 2519 | projected 99.7 (9.1 a week) | last 3 weeks 8.9 a week | lineup value 3.4
9500 | Josh Downs | WR | age 25 | IND | market 3345 | projected 99.4 (9 a week) | last 3 weeks 1.7 a week | lineup value 4.2
2133 | Davante Adams | WR | age 33 | LAR | market 3374 | projected 97.7 (8.9 a week) | last 3 weeks 15 a week | lineup value 16
9229 | Anthony Richardson | QB | age 24 | IND | market 0 | projected 94.6 (8.6 a week) | last 3 weeks 13.7 a week | lineup value 19.1
7553 | Kyle Pitts | TE | age 26 | ATL | market 3953 | projected 86.9 (7.9 a week) | last 3 weeks 8.2 a week | lineup value 10.1
5001 | Dalton Schultz | TE | age 30 | HOU | market 3164 | projected 86.2 (7.8 a week) | last 3 weeks 3.9 a week | lineup value 9.3
8408 | Jordan Mason | RB | age 27 | MIN | market 3076 | projected 84.6 (7.7 a week) | last 3 weeks 16.8 a week | lineup value 16.2
4663 | Austin Ekeler | RB | age 31 | WAS | market 0 | projected 84.1 (7.6 a week) | last 3 weeks 11.8 a week | lineup value 3.4
7839 | Evan McPherson | K | age 27 | CIN | market 0 | projected 79.1 (7.2 a week) | last 3 weeks 9.7 a week | lineup value 79.1
6011 | Gardner Minshew | QB | age 30 | ARI | market 0 | projected 69.1 (6.3 a week) | last 3 weeks 12.6 a week | lineup value 14.6
DAL | Dallas Cowboys | DEF | age ? | DAL | market 0 | projected 64.2 (5.8 a week) | last 3 weeks 6 a week | lineup value 64.2
6130 | Devin Singletary | RB | age 29 | NYG | market 0 | projected 59.4 (5.4 a week) | last 3 weeks 14.2 a week | lineup value 0.8
10235 | Roschon Johnson | RB | age 25 | CHI | market 0 | projected 48.2 (4.4 a week) | last 3 weeks 3.4 a week | lineup value 0
11627 | Troy Franklin | WR | age 23 | DEN | market 3022 | projected 48.2 (4.4 a week) | last 3 weeks 1 a week | lineup value 0
11435 | Emanuel Wilson | RB | age 27 | SEA | market 2478 | projected 44.4 (4 a week) | last 3 weeks 8.1 a week | lineup value 0
11650 | Luke McCaffrey | WR | age 25 | WAS | market 0 | projected 41.8 (3.8 a week) | last 3 weeks 4.1 a week | lineup value 0
11583 | Jonathon Brooks | RB | age 23 | CAR | market 3587 | projected 15.5 (1.4 a week) | last 3 weeks 0 a week | lineup value 0

PARTNER (partnerId 1): record 0-3, rank 9, points for 412.2, contention window 0
9758 | C.J. Stroud | QB | age 25 | HOU | market 4455 | projected 170 (15.5 a week) | last 3 weeks 14.3 a week | lineup value 69
1373 | Geno Smith | QB | age 36 | NYJ | market 2413 | projected 160.2 (14.6 a week) | last 3 weeks 15.7 a week | lineup value 57.8
5872 | Deebo Samuel | WR | age 30 | SF | market 2702 | projected 128.7 (11.7 a week) | last 3 weeks 12.2 a week | lineup value 32.4
8138 | James Cook | RB | age 27 | BUF | market 4893 | projected 120.3 (10.9 a week) | last 3 weeks 20.2 a week | lineup value 52.4
4217 | George Kittle | TE | age 33 | SF | market 3141 | projected 115.1 (10.5 a week) | last 3 weeks 9.5 a week | lineup value 46.6
4039 | Cooper Kupp | WR | age 33 | SEA | market 2094 | projected 105.1 (9.6 a week) | last 3 weeks 13.2 a week | lineup value 44.1
7021 | Rico Dowdle | RB | age 28 | PIT | market 3263 | projected 102.4 (9.3 a week) | last 3 weeks 7.6 a week | lineup value 33.4
7049 | Jauan Jennings | WR | age 29 | MIN | market 2834 | projected 88.2 (8 a week) | last 3 weeks 17.4 a week | lineup value 12.7
9484 | Tucker Kraft | TE | age 25 | GB | market 4153 | projected 87.3 (7.9 a week) | last 3 weeks 0 a week | lineup value 18.7
4034 | Christian McCaffrey | RB | age 30 | SF | market 4591 | projected 79.8 (7.3 a week) | last 3 weeks 0 a week | lineup value 40
8117 | Jalen Tolbert | WR | age 27 | MIA | market 0 | projected 78.4 (7.1 a week) | last 3 weeks 4.4 a week | lineup value 5.9
3286 | Demarcus Robinson | WR | age 32 | SF | market 0 | projected 77.5 (7 a week) | last 3 weeks 3.7 a week | lineup value 4.8
2449 | Stefon Diggs | WR | age 32 | WAS | market 2786 | projected 74 (6.7 a week) | last 3 weeks 16.5 a week | lineup value 26.5
4988 | Nick Chubb | RB | age 30 | FA | market 1806 | projected 73.9 (6.7 a week) | last 3 weeks 0 a week | lineup value 21.4
SF | San Francisco 49ers | DEF | age ? | SF | market 0 | projected 70.7 (6.4 a week) | last 3 weeks 6.7 a week | lineup value 70.7
4037 | Chris Godwin | WR | age 30 | TB | market 3084 | projected 59.7 (5.4 a week) | last 3 weeks 21.4 a week | lineup value 20.9
10937 | Jake Moody | K | age 26 | FA | market 0 | projected 58.7 (5.3 a week) | last 3 weeks 12 a week | lineup value 58.7
7591 | Justin Fields | QB | age 27 | KC | market 1718 | projected 55.6 (5.1 a week) | last 3 weeks 13.9 a week | lineup value 0.9
6803 | Brandon Aiyuk | WR | age 28 | SF | market 2489 | projected 53.3 (4.8 a week) | last 3 weeks 7.6 a week | lineup value 14.5
6938 | Cam Akers | RB | age 26 | FA | market 0 | projected 43.1 (3.9 a week) | last 3 weeks 3.3 a week | lineup value 0
11575 | Ray Davis | RB | age 26 | BUF | market 2518 | projected 41.5 (3.8 a week) | last 3 weeks 5.6 a week | lineup value 1.3
5248 | Gus Edwards | RB | age 29 | FA | market 2770 | projected 40.7 (3.7 a week) | last 3 weeks 3.5 a week | lineup value 0

PARTNER (partnerId 8): record 0-3, rank 10, points for 325.7, contention window 0
6797 | Justin Herbert | QB | age 28 | LAC | market 5194 | projected 159.7 (14.5 a week) | last 3 weeks 10.1 a week | lineup value 37.7
8155 | Breece Hall | RB | age 25 | NYJ | market 4264 | projected 153.8 (14 a week) | last 3 weeks 20.3 a week | lineup value 69
5850 | Josh Jacobs | RB | age 28 | GB | market 4035 | projected 143.7 (13.1 a week) | last 3 weeks 10.4 a week | lineup value 49
4137 | James Conner | RB | age 31 | ARI | market 2741 | projected 133.8 (12.2 a week) | last 3 weeks 14.1 a week | lineup value 36.2
6768 | Tua Tagovailoa | QB | age 28 | ATL | market 2680 | projected 110.9 (10.1 a week) | last 3 weeks 8 a week | lineup value 9.2
9756 | Jordan Addison | WR | age 24 | MIN | market 3607 | projected 107.7 (9.8 a week) | last 3 weeks 2.2 a week | lineup value 9.3
1479 | Keenan Allen | WR | age 34 | IND | market 2144 | projected 107.4 (9.8 a week) | last 3 weeks 2.3 a week | lineup value 12.5
7526 | Jaylen Waddle | WR | age 27 | DEN | market 4006 | projected 107 (9.7 a week) | last 3 weeks 10.4 a week | lineup value 7.8
1234 | Russell Wilson | QB | age 37 | FA | market 2040 | projected 102.1 (9.3 a week) | last 3 weeks 0 a week | lineup value 3.3
11584 | Bucky Irving | RB | age 24 | TB | market 4310 | projected 101.8 (9.3 a week) | last 3 weeks 7.7 a week | lineup value 13.3
6819 | Michael Pittman | WR | age 29 | PIT | market 2989 | projected 98.5 (9 a week) | last 3 weeks 6.6 a week | lineup value 12
11624 | Xavier Worthy | WR | age 23 | KC | market 3491 | projected 95.8 (8.7 a week) | last 3 weeks 10 a week | lineup value 2
2028 | Derek Carr | QB | age 34 | FA | market 2501 | projected 89.1 (8.1 a week) | last 3 weeks 17 a week | lineup value 15
4666 | Younghoe Koo | K | age 31 | FA | market 0 | projected 88.7 (8.1 a week) | last 3 weeks 7 a week | lineup value 88.7
HOU | Houston Texans | DEF | age ? | HOU | market 0 | projected 75.3 (6.8 a week) | last 3 weeks 7.7 a week | lineup value 75.3
10236 | Dalton Kincaid | TE | age 26 | BUF | market 3772 | projected 71.9 (6.5 a week) | last 3 weeks 7.5 a week | lineup value 34.5
9754 | Quentin Johnston | WR | age 25 | LAC | market 3434 | projected 70.4 (6.4 a week) | last 3 weeks 13.8 a week | lineup value 1.5
5995 | Justice Hill | RB | age 28 | BAL | market 2040 | projected 66.1 (6 a week) | last 3 weeks 4.2 a week | lineup value 0
2749 | Raheem Mostert | RB | age 33 | FA | market 1171 | projected 58.4 (5.3 a week) | last 3 weeks 1.3 a week | lineup value 0
3225 | Tyler Boyd | WR | age 30 | FA | market 1966 | projected 50.2 (4.6 a week) | last 3 weeks 5.2 a week | lineup value 0
11600 | Ja'Tavion Sanders | TE | age 23 | CAR | market 0 | projected 49.8 (4.5 a week) | last 3 weeks 1.4 a week | lineup value 11.3
1689 | Adam Thielen | WR | age 35 | FA | market 2214 | projected 30.1 (2.7 a week) | last 3 weeks 8.3 a week | lineup value 0.8

PARTNER (partnerId 5): record 2-1, rank 6, points for 358.1, contention window 0.42
6904 | Jalen Hurts | QB | age 28 | PHI | market 5579 | projected 201.4 (18.3 a week) | last 3 weeks 17.1 a week | lineup value 48.4
4943 | Sam Darnold | QB | age 29 | SEA | market 3828 | projected 159.9 (14.5 a week) | last 3 weeks 19.3 a week | lineup value 8.1
1166 | Kirk Cousins | QB | age 38 | LV | market 2031 | projected 149.1 (13.6 a week) | last 3 weeks 11.6 a week | lineup value 0.2
11560 | Caleb Williams | QB | age 24 | CHI | market 6029 | projected 148.7 (13.5 a week) | last 3 weeks 10.6 a week | lineup value 0.8
1466 | Travis Kelce | TE | age 37 | KC | market 2868 | projected 144.8 (13.2 a week) | last 3 weeks 5 a week | lineup value 69.9
8146 | Garrett Wilson | WR | age 26 | NYJ | market 4218 | projected 143.5 (13 a week) | last 3 weeks 12.2 a week | lineup value 44
8151 | Kenneth Walker | RB | age 25 | KC | market 4556 | projected 135 (12.3 a week) | last 3 weeks 6.3 a week | lineup value 36.5
4018 | Joe Mixon | RB | age 30 | FA | market 2254 | projected 134.4 (12.2 a week) | last 3 weeks 11.6 a week | lineup value 45.4
7594 | Chuba Hubbard | RB | age 27 | CAR | market 3351 | projected 130.8 (11.9 a week) | last 3 weeks 13.6 a week | lineup value 35.2
9488 | Jaxon Smith-Njigba | WR | age 24 | SEA | market 5792 | projected 129.2 (11.7 a week) | last 3 weeks 11.5 a week | lineup value 28.1
5045 | Courtland Sutton | WR | age 31 | DEN | market 3182 | projected 119.7 (10.9 a week) | last 3 weeks 8.4 a week | lineup value 11.7
1426 | DeAndre Hopkins | WR | age 33 | FA | market 1502 | projected 107.2 (9.7 a week) | last 3 weeks 7.7 a week | lineup value 13.2
7611 | Rhamondre Stevenson | RB | age 28 | NE | market 3354 | projected 105.2 (9.6 a week) | last 3 weeks 13 a week | lineup value 6.2
5870 | Daniel Jones | QB | age 29 | IND | market 3493 | projected 105 (9.5 a week) | last 3 weeks 14.2 a week | lineup value 0.3
8167 | Christian Watson | WR | age 27 | GB | market 3663 | projected 81.4 (7.4 a week) | last 3 weeks 6.3 a week | lineup value 6.5
3214 | Hunter Henry | TE | age 31 | NE | market 3148 | projected 78.8 (7.2 a week) | last 3 weeks 8.5 a week | lineup value 6.5
LAC | Los Angeles Chargers | DEF | age ? | LAC | market 0 | projected 71.2 (6.5 a week) | last 3 weeks 5.3 a week | lineup value 71.2
6943 | Gabe Davis | WR | age 26 | FA | market 1797 | projected 61.2 (5.6 a week) | last 3 weeks 6.8 a week | lineup value 0
4227 | Harrison Butker | K | age 31 | KC | market 0 | projected 55 (5 a week) | last 3 weeks 10.3 a week | lineup value 55
11637 | Keon Coleman | WR | age 23 | BUF | market 2741 | projected 49.8 (4.5 a week) | last 3 weeks 6.2 a week | lineup value 0.2
3164 | Ezekiel Elliott | RB | age 29 | FA | market 2715 | projected 36.2 (3.3 a week) | last 3 weeks 6.8 a week | lineup value 2.5
7066 | K.J. Osborn | WR | age 29 | TEN | market 1351 | projected 11.6 (1.1 a week) | last 3 weeks 2.3 a week | lineup value 0

PARTNER (partnerId 9): record 3-0, rank 1, points for 424.5, contention window 1
6804 | Jordan Love | QB | age 27 | GB | market 4628 | projected 173.4 (15.8 a week) | last 3 weeks 5.5 a week | lineup value 39.1
7547 | Amon-Ra St. Brown | WR | age 26 | DET | market 5297 | projected 172.2 (15.7 a week) | last 3 weeks 15.9 a week | lineup value 73.9
8150 | Kyren Williams | RB | age 26 | LAR | market 4549 | projected 163.8 (14.9 a week) | last 3 weeks 20.4 a week | lineup value 100.5
3163 | Jared Goff | QB | age 32 | DET | market 4205 | projected 157.7 (14.3 a week) | last 3 weeks 11.6 a week | lineup value 21.8
3321 | Tyreek Hill | WR | age 31 | FA | market 2521 | projected 148.3 (13.5 a week) | last 3 weeks 13.2 a week | lineup value 52.1
11563 | Bo Nix | QB | age 26 | DEN | market 4993 | projected 142.9 (13 a week) | last 3 weeks 12.9 a week | lineup value 11.1
4983 | DJ Moore | WR | age 29 | BUF | market 3645 | projected 126.7 (11.5 a week) | last 3 weeks 12.2 a week | lineup value 27.5
11631 | Brian Thomas | WR | age 24 | JAX | market 3925 | projected 121.1 (11 a week) | last 3 weeks 12 a week | lineup value 25.2
2216 | Mike Evans | WR | age 33 | SF | market 3189 | projected 94.6 (8.6 a week) | last 3 weeks 11.3 a week | lineup value 26
7543 | Travis Etienne | RB | age 27 | NO | market 3836 | projected 89.4 (8.1 a week) | last 3 weeks 13.1 a week | lineup value 34.3
8110 | Jake Ferguson | TE | age 27 | DAL | market 3459 | projected 83.6 (7.6 a week) | last 3 weeks 6.7 a week | lineup value 11.7
11539 | Jake Bates | K | age 27 | DET | market 0 | projected 80.9 (7.4 a week) | last 3 weeks 6.3 a week | lineup value 80.9
6826 | Cole Kmet | TE | age 27 | CHI | market 0 | projected 77.2 (7 a week) | last 3 weeks 11.3 a week | lineup value 0
9753 | Zach Charbonnet | RB | age 25 | SEA | market 3181 | projected 71.7 (6.5 a week) | last 3 weeks 18.6 a week | lineup value 13.6
10226 | Andrei Iosivas | WR | age 27 | CIN | market 0 | projected 67.1 (6.1 a week) | last 3 weeks 12.2 a week | lineup value 0
CLE | Cleveland Browns | DEF | age ? | CLE | market 0 | projected 65.7 (6 a week) | last 3 weeks 7 a week | lineup value 65.7
5022 | Dallas Goedert | TE | age 31 | PHI | market 3128 | projected 59.8 (5.4 a week) | last 3 weeks 13.6 a week | lineup value 5.9
4147 | Samaje Perine | RB | age 31 | CIN | market 0 | projected 46.2 (4.2 a week) | last 3 weeks 3.4 a week | lineup value 0
11618 | Jalen McMillan | WR | age 24 | TB | market 2954 | projected 45.8 (4.2 a week) | last 3 weeks 5 a week | lineup value 0
8205 | Isiah Pacheco | RB | age 27 | DET | market 2549 | projected 20.3 (1.8 a week) | last 3 weeks 10.6 a week | lineup value 0
4111 | D'Onta Foreman | RB | age 28 | FA | market 1906 | projected 18.4 (1.7 a week) | last 3 weeks 0.2 a week | lineup value 0
10229 | Rashee Rice | WR | age 26 | KC | market 4415 | projected 17.1 (1.6 a week) | last 3 weeks 21.6 a week | lineup value 4.5

PARTNER (partnerId 7): record 2-1, rank 5, points for 401.4, contention window 0.58
5849 | Kyler Murray | QB | age 29 | MIN | market 4173 | projected 178 (16.2 a week) | last 3 weeks 19.2 a week | lineup value 100.6
7564 | Ja'Marr Chase | WR | age 26 | CIN | market 5779 | projected 176.6 (16.1 a week) | last 3 weeks 16.5 a week | lineup value 66.4
9226 | De'Von Achane | RB | age 25 | MIA | market 4984 | projected 164.3 (14.9 a week) | last 3 weeks 20.4 a week | lineup value 56
5967 | Tony Pollard | RB | age 29 | TEN | market 3193 | projected 130.1 (11.8 a week) | last 3 weeks 13.2 a week | lineup value 20.5
6790 | D'Andre Swift | RB | age 27 | CHI | market 3665 | projected 121.2 (11 a week) | last 3 weeks 6.5 a week | lineup value 15.1
7090 | Darnell Mooney | WR | age 28 | NYG | market 2374 | projected 111.4 (10.1 a week) | last 3 weeks 11.6 a week | lineup value 1.6
8126 | Wan'Dale Robinson | WR | age 25 | TEN | market 3408 | projected 110.4 (10 a week) | last 3 weeks 11.6 a week | lineup value 7.2
6806 | J.K. Dobbins | RB | age 27 | DEN | market 3328 | projected 104.7 (9.5 a week) | last 3 weeks 17.1 a week | lineup value 16.1
7523 | Trevor Lawrence | QB | age 27 | JAX | market 4944 | projected 103.5 (9.4 a week) | last 3 weeks 11.3 a week | lineup value 26.1
11620 | Rome Odunze | WR | age 24 | CHI | market 4055 | projected 98.4 (8.9 a week) | last 3 weeks 10.3 a week | lineup value 1.6
7525 | DeVonta Smith | WR | age 27 | PHI | market 4163 | projected 93.3 (8.5 a week) | last 3 weeks 17 a week | lineup value 14
4033 | David Njoku | TE | age 30 | LAC | market 2853 | projected 89.3 (8.1 a week) | last 3 weeks 2.8 a week | lineup value 12.3
9501 | DeMario Douglas | WR | age 25 | NE | market 0 | projected 88.1 (8 a week) | last 3 weeks 6 a week | lineup value 0.6
4066 | Evan Engram | TE | age 32 | DEN | market 0 | projected 86.9 (7.9 a week) | last 3 weeks 0.5 a week | lineup value 13.1
7042 | Tyler Bass | K | age 29 | BUF | market 0 | projected 83.7 (7.6 a week) | last 3 weeks 9.3 a week | lineup value 83.6
7596 | Elijah Moore | WR | age 26 | PHI | market 0 | projected 72.7 (6.6 a week) | last 3 weeks 6 a week | lineup value 0
NYJ | New York Jets | DEF | age ? | NYJ | market 0 | projected 72.7 (6.6 a week) | last 3 weeks 10.3 a week | lineup value 72.7
8142 | Alec Pierce | WR | age 26 | IND | market 3409 | projected 69.9 (6.4 a week) | last 3 weeks 1.8 a week | lineup value 0
8228 | Jaylen Warren | RB | age 27 | PIT | market 3535 | projected 64.5 (5.9 a week) | last 3 weeks 4.4 a week | lineup value 0.7
8143 | Jerome Ford | RB | age 27 | ARI | market 0 | projected 64.2 (5.8 a week) | last 3 weeks 12.1 a week | lineup value 1.6
6845 | Zack Moss | RB | age 27 | FA | market 1889 | projected 53.2 (4.8 a week) | last 3 weeks 13.5 a week | lineup value 2.2
11589 | Trey Benson | RB | age 24 | ARI | market 3161 | projected 33.7 (3.1 a week) | last 3 weeks 2.1 a week | lineup value 0

CANDIDATE DEALS (from a rules-based finder; points are the finder projections for the rest of the season):
c1 | partnerId 1 | I give Tyler Lockett (2374) | I get Geno Smith + Cooper Kupp (1373,4039) | my points 48.6 | their points -87.8 | likelihood 0.86
c2 | partnerId 1 | I give Jonathon Brooks (11583) | I get George Kittle + Geno Smith (4217,1373) | my points 70.6 | their points -108.6 | likelihood 0.95
c3 | partnerId 8 | I give Emanuel Wilson + Troy Franklin (11435,11627) | I get James Conner + Tua Tagovailoa (4137,6768) | my points 38.9 | their points -45.4 | likelihood 0.94
c4 | partnerId 5 | I give Devin Singletary + Tyler Lockett (6130,2374) | I get Kirk Cousins + Joe Mixon (1166,4018) | my points 48.7 | their points -35 | likelihood 0.71
c5 | partnerId 9 | I give Austin Ekeler + Josh Downs (4663,9500) | I get Isiah Pacheco + Jake Ferguson (8205,8110) | my points 12.8 | their points 15.1 | likelihood 0.51
c6 | partnerId 5 | I give Emanuel Wilson + Tyler Lockett (11435,2374) | I get Joe Mixon (4018) | my points 28.5 | their points -40.8 | likelihood 0.69
c7 | partnerId 7 | I give Jonathon Brooks + Josh Downs (11583,9500) | I get Evan Engram + Tony Pollard (4066,5967) | my points 32.3 | their points -26.7 | likelihood 0.74
c8 | partnerId 7 | I give Jonathon Brooks + Devin Singletary (11583,6130) | I get David Njoku + Tony Pollard (4033,5967) | my points 31.2 | their points -32.3 | likelihood 0.69
c9 | partnerId 7 | I give Troy Franklin + Devin Singletary (11627,6130) | I get David Njoku + Darnell Mooney (4033,7090) | my points 20.1 | their points -14.2 | likelihood 0.56

Pick the best trades for my team.

=========== CASE 1048366950373543936-w7-r2 ===========
REPLY FILE: /Users/anik/workspace/chrome/sleeper/.eval-market/replies/suggest-v2/heldout1/1048366950373543936-w7-r2.json
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
Lineup slots: QB, RB, RB, WR, WR, TE, FLEX, FLEX, SUPER_FLEX, K, DEF, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN. Superflex: yes. Tight end premium: no. Points per reception: 1.
Columns: id | name | position | age | team | market value | projected points for the rest of the regular season (and per week) | points per week over the last three weeks played | lineup value (points my lineup loses if this player is removed).

MY TEAM (partnerId me): record 3-3, rank 5, points for 871.2, contention window 0.58
6794 | Justin Jefferson | WR | age 27 | MIN | market 4819 | projected 140.7 (17.6 a week) | last 3 weeks 11.9 a week | lineup value 46.1
9221 | Jahmyr Gibbs | RB | age 24 | DET | market 6368 | projected 125.3 (15.7 a week) | last 3 weeks 10.6 a week | lineup value 44
4199 | Aaron Jones | RB | age 31 | MIN | market 2805 | projected 120.4 (15.1 a week) | last 3 weeks 8.1 a week | lineup value 39.1
8183 | Brock Purdy | QB | age 26 | SF | market 5091 | projected 106.8 (13.3 a week) | last 3 weeks 17.3 a week | lineup value 41.8
11632 | Malik Nabers | WR | age 23 | NYG | market 5024 | projected 106.7 (13.3 a week) | last 3 weeks 7.7 a week | lineup value 23.4
5927 | Terry McLaurin | WR | age 31 | WAS | market 3390 | projected 104.3 (13 a week) | last 3 weeks 18.3 a week | lineup value 15.1
2133 | Davante Adams | WR | age 33 | LAR | market 3374 | projected 97.7 (12.2 a week) | last 3 weeks 0 a week | lineup value 14.8
8137 | George Pickens | WR | age 25 | DAL | market 4767 | projected 78.7 (9.8 a week) | last 3 weeks 10.1 a week | lineup value 3.7
9229 | Anthony Richardson | QB | age 24 | IND | market 0 | projected 77 (9.6 a week) | last 3 weeks 1.7 a week | lineup value 13.8
9500 | Josh Downs | WR | age 25 | IND | market 3345 | projected 71.3 (8.9 a week) | last 3 weeks 19.2 a week | lineup value 1.4
2374 | Tyler Lockett | WR | age 33 | FA | market 2518 | projected 69.9 (8.7 a week) | last 3 weeks 13 a week | lineup value 1.8
4663 | Austin Ekeler | RB | age 31 | WAS | market 0 | projected 63.3 (7.9 a week) | last 3 weeks 7.5 a week | lineup value 0
7553 | Kyle Pitts | TE | age 26 | ATL | market 3954 | projected 61.9 (7.7 a week) | last 3 weeks 8.6 a week | lineup value 8.9
5001 | Dalton Schultz | TE | age 30 | HOU | market 3164 | projected 61.7 (7.7 a week) | last 3 weeks 6.8 a week | lineup value 8.7
7839 | Evan McPherson | K | age 27 | CIN | market 0 | projected 51.4 (6.4 a week) | last 3 weeks 7 a week | lineup value 51.3
6130 | Devin Singletary | RB | age 29 | NYG | market 0 | projected 46.5 (5.8 a week) | last 3 weeks 1.6 a week | lineup value 0.3
6011 | Gardner Minshew | QB | age 30 | ARI | market 0 | projected 46.2 (5.8 a week) | last 3 weeks 4.2 a week | lineup value 0
DAL | Dallas Cowboys | DEF | age ? | DAL | market 0 | projected 43.3 (5.4 a week) | last 3 weeks 4.3 a week | lineup value 43.3
11627 | Troy Franklin | WR | age 23 | DEN | market 3023 | projected 40.6 (5.1 a week) | last 3 weeks 5.5 a week | lineup value 0
8408 | Jordan Mason | RB | age 27 | MIN | market 3080 | projected 38.7 (4.8 a week) | last 3 weeks 14 a week | lineup value 0
10235 | Roschon Johnson | RB | age 25 | CHI | market 0 | projected 29.4 (3.7 a week) | last 3 weeks 9.5 a week | lineup value 0
19 | Joe Flacco | QB | age 41 | CIN | market 0 | projected 28.6 (3.6 a week) | last 3 weeks 13.4 a week | lineup value 2.3
11435 | Emanuel Wilson | RB | age 27 | SEA | market 2477 | projected 23.6 (3 a week) | last 3 weeks 4.5 a week | lineup value 0
11583 | Jonathon Brooks | RB | age 23 | CAR | market 3587 | projected 15.5 (1.9 a week) | last 3 weeks 0 a week | lineup value 0

PARTNER (partnerId 9): record 5-1, rank 1, points for 896.6, contention window 1
7547 | Amon-Ra St. Brown | WR | age 26 | DET | market 5296 | projected 136.6 (17.1 a week) | last 3 weeks 11.5 a week | lineup value 58.4
8150 | Kyren Williams | RB | age 26 | LAR | market 4550 | projected 132.2 (16.5 a week) | last 3 weeks 12 a week | lineup value 64
3163 | Jared Goff | QB | age 32 | DET | market 4211 | projected 124.4 (15.5 a week) | last 3 weeks 17.4 a week | lineup value 14
3321 | Tyreek Hill | WR | age 31 | FA | market 2521 | projected 122.2 (15.3 a week) | last 3 weeks 7 a week | lineup value 44
6804 | Jordan Love | QB | age 27 | GB | market 4636 | projected 121.5 (15.2 a week) | last 3 weeks 23.2 a week | lineup value 20.9
11563 | Bo Nix | QB | age 26 | DEN | market 5022 | projected 106.2 (13.3 a week) | last 3 weeks 16.9 a week | lineup value 8.1
4098 | Kareem Hunt | RB | age 30 | FA | market 1816 | projected 98.2 (12.3 a week) | last 3 weeks 6.2 a week | lineup value 33.4
4983 | DJ Moore | WR | age 29 | BUF | market 3645 | projected 87.1 (10.9 a week) | last 3 weeks 14.9 a week | lineup value 16
11631 | Brian Thomas | WR | age 24 | JAX | market 3925 | projected 87 (10.9 a week) | last 3 weeks 16.9 a week | lineup value 16
MIN | Minnesota Vikings | DEF | age ? | MIN | market 0 | projected 61.4 (7.7 a week) | last 3 weeks 5.7 a week | lineup value 61.4
1945 | Chris Boswell | K | age 35 | PIT | market 0 | projected 55.4 (6.9 a week) | last 3 weeks 10.3 a week | lineup value 55.4
2216 | Mike Evans | WR | age 33 | SF | market 3187 | projected 55.2 (6.9 a week) | last 3 weeks 17.3 a week | lineup value 17.5
6826 | Cole Kmet | TE | age 27 | CHI | market 0 | projected 54.2 (6.8 a week) | last 3 weeks 13 a week | lineup value 0
9753 | Zach Charbonnet | RB | age 25 | SEA | market 3180 | projected 50.6 (6.3 a week) | last 3 weeks 7 a week | lineup value 2
7543 | Travis Etienne | RB | age 27 | NO | market 3835 | projected 50.4 (6.3 a week) | last 3 weeks 6.3 a week | lineup value 2.4
8110 | Jake Ferguson | TE | age 27 | DAL | market 3457 | projected 50.2 (6.3 a week) | last 3 weeks 9.7 a week | lineup value 5.7
10226 | Andrei Iosivas | WR | age 27 | CIN | market 0 | projected 44.7 (5.6 a week) | last 3 weeks 4.8 a week | lineup value 0
11618 | Jalen McMillan | WR | age 24 | TB | market 2954 | projected 41 (5.1 a week) | last 3 weeks 0 a week | lineup value 0
5022 | Dallas Goedert | TE | age 31 | PHI | market 3128 | projected 39.1 (4.9 a week) | last 3 weeks 4.4 a week | lineup value 5.8
4147 | Samaje Perine | RB | age 31 | CIN | market 0 | projected 30.8 (3.9 a week) | last 3 weeks 3.6 a week | lineup value 0
6938 | Cam Akers | RB | age 26 | FA | market 0 | projected 26.3 (3.3 a week) | last 3 weeks 6 a week | lineup value 0
8205 | Isiah Pacheco | RB | age 27 | DET | market 2549 | projected 20.3 (2.5 a week) | last 3 weeks 0 a week | lineup value 0

PARTNER (partnerId 4): record 4-2, rank 2, points for 891.2, contention window 1
4881 | Lamar Jackson | QB | age 29 | BAL | market 6312 | projected 150.2 (18.8 a week) | last 3 weeks 25.3 a week | lineup value 45.8
5859 | A.J. Brown | WR | age 29 | NE | market 4313 | projected 133.7 (16.7 a week) | last 3 weeks 7.9 a week | lineup value 50.5
4943 | Sam Darnold | QB | age 29 | SEA | market 3814 | projected 129.1 (16.1 a week) | last 3 weeks 8.3 a week | lineup value 18
9493 | Puka Nacua | WR | age 25 | LAR | market 5685 | projected 106.9 (13.4 a week) | last 3 weeks 0 a week | lineup value 33.1
96 | Aaron Rodgers | QB | age 42 | PIT | market 2580 | projected 105.7 (13.2 a week) | last 3 weeks 13.7 a week | lineup value 7.9
5892 | David Montgomery | RB | age 29 | HOU | market 3466 | projected 104.6 (13.1 a week) | last 3 weeks 12 a week | lineup value 34.4
9224 | Chase Brown | RB | age 26 | CIN | market 4507 | projected 103.9 (13 a week) | last 3 weeks 18 a week | lineup value 37.7
9997 | Zay Flowers | WR | age 26 | BAL | market 4182 | projected 97.1 (12.1 a week) | last 3 weeks 14.5 a week | lineup value 20.5
11564 | Drake Maye | QB | age 24 | NE | market 6680 | projected 95.1 (11.9 a week) | last 3 weeks 6.5 a week | lineup value 0
6813 | Jonathan Taylor | RB | age 27 | IND | market 5010 | projected 91.1 (11.4 a week) | last 3 weeks 6.6 a week | lineup value 29.9
8130 | Trey McBride | TE | age 26 | ARI | market 4875 | projected 89.6 (11.2 a week) | last 3 weeks 9.6 a week | lineup value 37.5
6783 | Jerry Jeudy | WR | age 27 | CLE | market 2695 | projected 76.9 (9.6 a week) | last 3 weeks 6.8 a week | lineup value 8.7
11626 | Xavier Legette | WR | age 25 | CAR | market 0 | projected 63.5 (7.9 a week) | last 3 weeks 10.9 a week | lineup value 3.3
5012 | Mark Andrews | TE | age 31 | BAL | market 3108 | projected 61.6 (7.7 a week) | last 3 weeks 8.4 a week | lineup value 9.5
3451 | Ka'imi Fairbairn | K | age 32 | HOU | market 0 | projected 58.7 (7.3 a week) | last 3 weeks 11 a week | lineup value 58.7
LAC | Los Angeles Chargers | DEF | age ? | LAC | market 0 | projected 57.2 (7.1 a week) | last 3 weeks 2.7 a week | lineup value 57.1
10232 | Michael Wilson | WR | age 26 | ARI | market 3634 | projected 52.6 (6.6 a week) | last 3 weeks 9.2 a week | lineup value 0
7569 | Nico Collins | WR | age 27 | HOU | market 4424 | projected 50.7 (6.3 a week) | last 3 weeks 16.3 a week | lineup value 14.1
7562 | Tutu Atwell | WR | age 27 | LAR | market 0 | projected 35.7 (4.5 a week) | last 3 weeks 8.2 a week | lineup value 0.9
6945 | Antonio Gibson | RB | age 27 | FA | market 1425 | projected 34.6 (4.3 a week) | last 3 weeks 8.3 a week | lineup value 0
11562 | Spencer Rattler | QB | age 26 | NO | market 0 | projected 22.3 (2.8 a week) | last 3 weeks 4.1 a week | lineup value 0
7593 | Trey Sermon | RB | age 27 | ATL | market 0 | projected 21.5 (2.7 a week) | last 3 weeks 7.1 a week | lineup value 0

CANDIDATE DEALS (from a rules-based finder; points are the finder projections for the rest of the season):
c1 | partnerId 9 | I give Terry McLaurin + Kyle Pitts (5927,7553) | I get Cole Kmet + Rashee Rice (6826,10229) | my points -14.8 | their points 27.5 | likelihood 0.4
c2 | partnerId 9 | I give Aaron Jones (4199) | I get Isiah Pacheco + Zach Charbonnet (8205,9753) | my points -22.8 | their points 24 | likelihood 0.43
c3 | partnerId 4 | I give Davante Adams + Jordan Mason (2133,8408) | I get Michael Wilson (10232) | my points -14.1 | their points 21.5 | likelihood 0.51
c4 | partnerId 4 | I give Terry McLaurin (5927) | I get Michael Wilson + Malachi Corley (10232,11617) | my points -14.1 | their points 18.2 | likelihood 0.47
c5 | partnerId 4 | I give Davante Adams (2133) | I get Michael Wilson + Jermaine Burton (10232,11640) | my points -13.6 | their points 16.3 | likelihood 0.41

Pick the best trades for my team.

=========== CASE 1093978338437214208-w4-r9 ===========
REPLY FILE: /Users/anik/workspace/chrome/sleeper/.eval-market/replies/suggest-v2/heldout1/1093978338437214208-w4-r9.json
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
Lineup slots: QB, RB, RB, WR, WR, WR, TE, FLEX, FLEX, SUPER_FLEX, BN, BN, BN, BN, BN, BN, BN, BN. Superflex: yes. Tight end premium: no. Points per reception: 1.
Columns: id | name | position | age | team | market value | projected points for the rest of the regular season (and per week) | points per week over the last three weeks played | lineup value (points my lineup loses if this player is removed).

MY TEAM (partnerId me): record 3-0, rank 2, points for 398.3, contention window 1
6904 | Jalen Hurts | QB | age 28 | PHI | market 5767 | projected 208.2 (18.9 a week) | last 3 weeks 18.4 a week | lineup value 139.9
8112 | Drake London | WR | age 25 | ATL | market 4866 | projected 155.2 (14.1 a week) | last 3 weeks 13.2 a week | lineup value 64.2
10222 | Jayden Reed | WR | age 26 | GB | market 3355 | projected 132.3 (12 a week) | last 3 weeks 16.9 a week | lineup value 43
7594 | Chuba Hubbard | RB | age 27 | CAR | market 3351 | projected 130.8 (11.9 a week) | last 3 weeks 13.6 a week | lineup value 44
7528 | Najee Harris | RB | age 28 | NYG | market 2343 | projected 118.3 (10.8 a week) | last 3 weeks 10.3 a week | lineup value 28.9
8137 | George Pickens | WR | age 25 | DAL | market 4768 | projected 117.1 (10.6 a week) | last 3 weeks 9.7 a week | lineup value 33.9
7090 | Darnell Mooney | WR | age 28 | NYG | market 2374 | projected 111.4 (10.1 a week) | last 3 weeks 11.6 a week | lineup value 20.5
8126 | Wan'Dale Robinson | WR | age 25 | TEN | market 3408 | projected 110.4 (10 a week) | last 3 weeks 11.6 a week | lineup value 25.3
1479 | Keenan Allen | WR | age 34 | IND | market 2144 | projected 107.4 (9.8 a week) | last 3 weeks 2.3 a week | lineup value 15.1
6813 | Jonathan Taylor | RB | age 27 | IND | market 5011 | projected 106 (9.6 a week) | last 3 weeks 17.6 a week | lineup value 43.4
9999 | Will Levis | QB | age 27 | NYJ | market 0 | projected 94.2 (8.6 a week) | last 3 weeks 12.3 a week | lineup value 25.8
4033 | David Njoku | TE | age 30 | LAC | market 2853 | projected 89.3 (8.1 a week) | last 3 weeks 2.8 a week | lineup value 26.3
7600 | Pat Freiermuth | TE | age 27 | PIT | market 2349 | projected 77.7 (7.1 a week) | last 3 weeks 7.3 a week | lineup value 10.9
11576 | Braelon Allen | RB | age 22 | NYJ | market 3227 | projected 73.8 (6.7 a week) | last 3 weeks 10.7 a week | lineup value 2.6
11638 | Ricky Pearsall | WR | age 26 | SF | market 2208 | projected 49.9 (4.5 a week) | last 3 weeks 0 a week | lineup value 0.4
8210 | Chig Okonkwo | TE | age 27 | WAS | market 3055 | projected 48.4 (4.4 a week) | last 3 weeks 5.9 a week | lineup value 0
8205 | Isiah Pacheco | RB | age 27 | DET | market 2549 | projected 20.3 (1.8 a week) | last 3 weeks 10.6 a week | lineup value 0.5
11567 | Jordan Travis | QB | age 24 | FA | market 2353 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0
9227 | Israel Abanikanda | RB | age 24 | DAL | market 0 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0
9220 | Evan Hull | RB | age 25 | ARI | market 0 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0

PARTNER (partnerId 2): record 0-3, rank 11, points for 372.1, contention window 0
9758 | C.J. Stroud | QB | age 25 | HOU | market 4638 | projected 177 (16.1 a week) | last 3 weeks 14.9 a week | lineup value 87.4
9226 | De'Von Achane | RB | age 25 | MIA | market 4984 | projected 164.3 (14.9 a week) | last 3 weeks 20.4 a week | lineup value 74.3
421 | Matthew Stafford | QB | age 38 | LAR | market 3763 | projected 154.6 (14.1 a week) | last 3 weeks 11.7 a week | lineup value 65
3321 | Tyreek Hill | WR | age 31 | FA | market 2521 | projected 148.3 (13.5 a week) | last 3 weeks 13.2 a week | lineup value 48.8
5927 | Terry McLaurin | WR | age 31 | WAS | market 3391 | projected 142.4 (12.9 a week) | last 3 weeks 10.6 a week | lineup value 49.7
5967 | Tony Pollard | RB | age 29 | TEN | market 3193 | projected 130.1 (11.8 a week) | last 3 weeks 13.2 a week | lineup value 37
6790 | D'Andre Swift | RB | age 27 | CHI | market 3665 | projected 121.2 (11 a week) | last 3 weeks 6.5 a week | lineup value 32.1
9493 | Puka Nacua | WR | age 25 | LAR | market 5685 | projected 106.9 (9.7 a week) | last 3 weeks 2.7 a week | lineup value 26.4
4039 | Cooper Kupp | WR | age 33 | SEA | market 2094 | projected 105.1 (9.6 a week) | last 3 weeks 13.2 a week | lineup value 24.6
2133 | Davante Adams | WR | age 33 | LAR | market 3374 | projected 97.7 (8.9 a week) | last 3 weeks 15 a week | lineup value 21.1
2216 | Mike Evans | WR | age 33 | SF | market 3189 | projected 94.6 (8.6 a week) | last 3 weeks 11.3 a week | lineup value 37.9
11626 | Xavier Legette | WR | age 25 | CAR | market 0 | projected 88.8 (8.1 a week) | last 3 weeks 4.6 a week | lineup value 11.8
4066 | Evan Engram | TE | age 32 | DEN | market 0 | projected 86.9 (7.9 a week) | last 3 weeks 0.5 a week | lineup value 27.8
4993 | Mike Gesicki | TE | age 31 | CIN | market 1195 | projected 62.4 (5.7 a week) | last 3 weeks 2.9 a week | lineup value 4.4
5857 | Noah Fant | TE | age 28 | NO | market 0 | projected 51 (4.6 a week) | last 3 weeks 5.8 a week | lineup value 6.5
7587 | Dyami Brown | WR | age 26 | WAS | market 0 | projected 34 (3.1 a week) | last 3 weeks 2.4 a week | lineup value 0.2
6960 | Tyler Johnson | WR | age 28 | FA | market 1879 | projected 32.4 (2.9 a week) | last 3 weeks 3 a week | lineup value 0
11647 | Kimani Vidal | RB | age 25 | LAC | market 2811 | projected 24.4 (2.2 a week) | last 3 weeks 0 a week | lineup value 0
7891 | Brock Wright | TE | age 27 | DET | market 0 | projected 20.9 (1.9 a week) | last 3 weeks 0 a week | lineup value 0.6
11596 | Ben Sinnott | TE | age 24 | WAS | market 0 | projected 12.5 (1.1 a week) | last 3 weeks 0 a week | lineup value 0

PARTNER (partnerId 8): record 1-2, rank 10, points for 343.8, contention window 0.05
7564 | Ja'Marr Chase | WR | age 26 | CIN | market 5779 | projected 176.6 (16.1 a week) | last 3 weeks 16.5 a week | lineup value 105.4
96 | Aaron Rodgers | QB | age 42 | PIT | market 2662 | projected 155.3 (14.1 a week) | last 3 weeks 15.3 a week | lineup value 70.3
5850 | Josh Jacobs | RB | age 28 | GB | market 4035 | projected 143.7 (13.1 a week) | last 3 weeks 10.4 a week | lineup value 70.6
9488 | Jaxon Smith-Njigba | WR | age 24 | SEA | market 5792 | projected 129.2 (11.7 a week) | last 3 weeks 11.5 a week | lineup value 49.8
11564 | Drake Maye | QB | age 24 | NE | market 7036 | projected 113.2 (10.3 a week) | last 3 weeks 0.7 a week | lineup value 29.1
4981 | Calvin Ridley | WR | age 31 | TEN | market 2282 | projected 107.9 (9.8 a week) | last 3 weeks 11.5 a week | lineup value 35.8
7021 | Rico Dowdle | RB | age 28 | PIT | market 3263 | projected 102.4 (9.3 a week) | last 3 weeks 7.6 a week | lineup value 35.4
9229 | Anthony Richardson | QB | age 24 | IND | market 0 | projected 100.2 (9.1 a week) | last 3 weeks 15.7 a week | lineup value 25.7
11620 | Rome Odunze | WR | age 24 | CHI | market 4055 | projected 98.4 (8.9 a week) | last 3 weeks 10.3 a week | lineup value 23.3
11624 | Xavier Worthy | WR | age 23 | KC | market 3491 | projected 95.8 (8.7 a week) | last 3 weeks 10 a week | lineup value 26.1
5001 | Dalton Schultz | TE | age 30 | HOU | market 3164 | projected 86.2 (7.8 a week) | last 3 weeks 3.9 a week | lineup value 86.2
7571 | Rashod Bateman | WR | age 26 | BAL | market 2470 | projected 79.8 (7.3 a week) | last 3 weeks 8.7 a week | lineup value 12.3
4988 | Nick Chubb | RB | age 30 | FA | market 1806 | projected 73.9 (6.7 a week) | last 3 weeks 0 a week | lineup value 25.9
8143 | Jerome Ford | RB | age 27 | ARI | market 0 | projected 64.2 (5.8 a week) | last 3 weeks 12.1 a week | lineup value 6
10225 | Jonathan Mingo | WR | age 25 | DAL | market 0 | projected 35.7 (3.2 a week) | last 3 weeks 3.5 a week | lineup value 0
8676 | Rashid Shaheed | WR | age 28 | SEA | market 2691 | projected 33.2 (3 a week) | last 3 weeks 12.4 a week | lineup value 8
7608 | Khalil Herbert | RB | age 28 | ATL | market 0 | projected 15.9 (1.4 a week) | last 3 weeks 3.3 a week | lineup value 1.1
9757 | Kendre Miller | RB | age 24 | NO | market 2605 | projected 10.7 (1 a week) | last 3 weeks 0 a week | lineup value 0

PARTNER (partnerId 6): record 2-1, rank 3, points for 435.5, contention window 0.95
5849 | Kyler Murray | QB | age 29 | MIN | market 4329 | projected 184.7 (16.8 a week) | last 3 weeks 19.5 a week | lineup value 51.9
6794 | Justin Jefferson | WR | age 27 | MIN | market 4818 | projected 175.6 (16 a week) | last 3 weeks 19.8 a week | lineup value 114.1
1373 | Geno Smith | QB | age 36 | NYJ | market 2525 | projected 167.6 (15.2 a week) | last 3 weeks 16.7 a week | lineup value 35.8
8183 | Brock Purdy | QB | age 26 | SF | market 5282 | projected 166.4 (15.1 a week) | last 3 weeks 17 a week | lineup value 37.8
8138 | James Cook | RB | age 27 | BUF | market 4893 | projected 120.3 (10.9 a week) | last 3 weeks 20.2 a week | lineup value 71.5
4217 | George Kittle | TE | age 33 | SF | market 3141 | projected 115.1 (10.5 a week) | last 3 weeks 9.5 a week | lineup value 67.5
8134 | Khalil Shakir | WR | age 26 | BUF | market 3139 | projected 111.8 (10.2 a week) | last 3 weeks 14.3 a week | lineup value 53.7
5846 | DK Metcalf | WR | age 28 | PIT | market 3437 | projected 110.2 (10 a week) | last 3 weeks 18.4 a week | lineup value 59.8
1426 | DeAndre Hopkins | WR | age 33 | FA | market 1502 | projected 107.2 (9.7 a week) | last 3 weeks 7.7 a week | lineup value 44.6
11635 | Ladd McConkey | WR | age 24 | LAC | market 4601 | projected 106.5 (9.7 a week) | last 3 weeks 9 a week | lineup value 48.9
8110 | Jake Ferguson | TE | age 27 | DAL | market 3459 | projected 83.6 (7.6 a week) | last 3 weeks 6.7 a week | lineup value 37.8
6130 | Devin Singletary | RB | age 29 | NYG | market 0 | projected 59.4 (5.4 a week) | last 3 weeks 14.2 a week | lineup value 19.5
4068 | Mike Williams | WR | age 30 | FA | market 1701 | projected 56.6 (5.1 a week) | last 3 weeks 3.1 a week | lineup value 1.3
5938 | Lil'Jordan Humphrey | WR | age 28 | DEN | market 0 | projected 51.4 (4.7 a week) | last 3 weeks 0 a week | lineup value 1
8180 | Jalen Nailor | WR | age 27 | LV | market 2615 | projected 50.1 (4.6 a week) | last 3 weeks 4.1 a week | lineup value 1.3
4147 | Samaje Perine | RB | age 31 | CIN | market 0 | projected 46.2 (4.2 a week) | last 3 weeks 2.3 a week | lineup value 4.7
8230 | Ty Chandler | RB | age 28 | NO | market 0 | projected 38.2 (3.5 a week) | last 3 weeks 5.6 a week | lineup value 1.9
11599 | Cade Stover | TE | age 26 | HOU | market 0 | projected 27.7 (2.5 a week) | last 3 weeks 0.9 a week | lineup value 0
8139 | Zamir White | RB | age 27 | NO | market 0 | projected 25.5 (2.3 a week) | last 3 weeks 4.9 a week | lineup value 1.3
11629 | Devontez Walker | WR | age 25 | BAL | market 0 | projected 1 (0.1 a week) | last 3 weeks 0 a week | lineup value 0
11557 | Joe Milton | QB | age 26 | DAL | market 0 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0

PARTNER (partnerId 11): record 1-2, rank 9, points for 347, contention window 0.18
4943 | Sam Darnold | QB | age 29 | SEA | market 4046 | projected 169 (15.4 a week) | last 3 weeks 19.9 a week | lineup value 66.5
6786 | CeeDee Lamb | WR | age 27 | DAL | market 4922 | projected 167.9 (15.3 a week) | last 3 weeks 13.8 a week | lineup value 89.1
1166 | Kirk Cousins | QB | age 38 | LV | market 2126 | projected 156.1 (14.2 a week) | last 3 weeks 12.6 a week | lineup value 46.5
8155 | Breece Hall | RB | age 25 | NYJ | market 4264 | projected 153.8 (14 a week) | last 3 weeks 20.3 a week | lineup value 83.9
7611 | Rhamondre Stevenson | RB | age 28 | NE | market 3354 | projected 105.2 (9.6 a week) | last 3 weeks 13 a week | lineup value 37
5947 | Jakobi Meyers | WR | age 29 | JAX | market 3291 | projected 103.5 (9.4 a week) | last 3 weeks 12.5 a week | lineup value 39.4
6801 | Tee Higgins | WR | age 27 | CIN | market 4120 | projected 98.4 (8.9 a week) | last 3 weeks 2.3 a week | lineup value 41.9
3294 | Dak Prescott | QB | age 33 | DAL | market 4692 | projected 89.5 (8.1 a week) | last 3 weeks 18.7 a week | lineup value 20
10859 | Sam LaPorta | TE | age 25 | DET | market 4253 | projected 83.9 (7.6 a week) | last 3 weeks 5.8 a week | lineup value 83.9
8167 | Christian Watson | WR | age 27 | GB | market 3663 | projected 81.4 (7.4 a week) | last 3 weeks 6.3 a week | lineup value 12.2
8117 | Jalen Tolbert | WR | age 27 | MIA | market 0 | projected 78.4 (7.1 a week) | last 3 weeks 5.1 a week | lineup value 5.8
9754 | Quentin Johnston | WR | age 25 | LAC | market 3434 | projected 70.4 (6.4 a week) | last 3 weeks 13.8 a week | lineup value 9.3
8132 | Tyler Allgeier | RB | age 26 | ARI | market 3196 | projected 68.1 (6.2 a week) | last 3 weeks 4.3 a week | lineup value 3.4
8228 | Jaylen Warren | RB | age 27 | PIT | market 3535 | projected 64.5 (5.9 a week) | last 3 weeks 4.4 a week | lineup value 14.5
2749 | Raheem Mostert | RB | age 33 | FA | market 1171 | projected 58.4 (5.3 a week) | last 3 weeks 1.3 a week | lineup value 5.3
4950 | Christian Kirk | WR | age 29 | SF | market 2209 | projected 58.3 (5.3 a week) | last 3 weeks 6.9 a week | lineup value 18.1
11625 | Adonai Mitchell | WR | age 24 | NYJ | market 2980 | projected 54.6 (5 a week) | last 3 weeks 1.7 a week | lineup value 0.6
3164 | Ezekiel Elliott | RB | age 29 | FA | market 2715 | projected 36.2 (3.3 a week) | last 3 weeks 6.8 a week | lineup value 0
11623 | Jordan Whittington | WR | age 26 | LAR | market 0 | projected 32 (2.9 a week) | last 3 weeks 3.3 a week | lineup value 2.2
2197 | Brandin Cooks | WR | age 33 | SF | market 0 | projected 24.5 (2.2 a week) | last 3 weeks 7.2 a week | lineup value 0
11565 | J.J. McCarthy | QB | age 23 | NYG | market 3918 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0

PARTNER (partnerId 3): record 1-2, rank 8, points for 367.4, contention window 0.31
4984 | Josh Allen | QB | age 30 | BUF | market 6723 | projected 217.7 (19.8 a week) | last 3 weeks 24 a week | lineup value 109.2
3163 | Jared Goff | QB | age 32 | DET | market 4372 | projected 164 (14.9 a week) | last 3 weeks 12.9 a week | lineup value 63.2
4137 | James Conner | RB | age 31 | ARI | market 2741 | projected 133.8 (12.2 a week) | last 3 weeks 14.1 a week | lineup value 65.8
5892 | David Montgomery | RB | age 29 | HOU | market 3466 | projected 129.7 (11.8 a week) | last 3 weeks 18.2 a week | lineup value 63.2
4983 | DJ Moore | WR | age 29 | BUF | market 3645 | projected 126.7 (11.5 a week) | last 3 weeks 12.2 a week | lineup value 57.6
9756 | Jordan Addison | WR | age 24 | MIN | market 3607 | projected 107.7 (9.8 a week) | last 3 weeks 2.2 a week | lineup value 39.8
2028 | Derek Carr | QB | age 34 | FA | market 2635 | projected 93.9 (8.5 a week) | last 3 weeks 17.7 a week | lineup value 5.2
7543 | Travis Etienne | RB | age 27 | NO | market 3836 | projected 89.4 (8.1 a week) | last 3 weeks 13.1 a week | lineup value 33.9
10232 | Michael Wilson | WR | age 26 | ARI | market 3635 | projected 80 (7.3 a week) | last 3 weeks 9 a week | lineup value 12.1
4034 | Christian McCaffrey | RB | age 30 | SF | market 4591 | projected 79.8 (7.3 a week) | last 3 weeks 0 a week | lineup value 53.4
3286 | Demarcus Robinson | WR | age 32 | SF | market 0 | projected 77.5 (7 a week) | last 3 weeks 3.7 a week | lineup value 9.7
8121 | Romeo Doubs | WR | age 26 | NE | market 3165 | projected 69.8 (6.3 a week) | last 3 weeks 7 a week | lineup value 20.6
5995 | Justice Hill | RB | age 28 | BAL | market 2040 | projected 66.1 (6 a week) | last 3 weeks 4.2 a week | lineup value 0.7
5022 | Dallas Goedert | TE | age 31 | PHI | market 3128 | projected 59.8 (5.4 a week) | last 3 weeks 13.6 a week | lineup value 59.8
3225 | Tyler Boyd | WR | age 30 | FA | market 1966 | projected 50.2 (4.6 a week) | last 3 weeks 5.2 a week | lineup value 0.2
11637 | Keon Coleman | WR | age 23 | BUF | market 2741 | projected 49.8 (4.5 a week) | last 3 weeks 6.2 a week | lineup value 6.1
11643 | Jaylen Wright | RB | age 23 | MIA | market 2770 | projected 30.2 (2.7 a week) | last 3 weeks 0.7 a week | lineup value 0
4171 | Josh Reynolds | WR | age 31 | FA | market 1293 | projected 12.2 (1.1 a week) | last 3 weeks 1.9 a week | lineup value 0

PARTNER (partnerId 5): record 1-2, rank 7, points for 388.5, contention window 0.44
4046 | Patrick Mahomes | QB | age 31 | KC | market 4842 | projected 181.8 (16.5 a week) | last 3 weeks 16.2 a week | lineup value 71.2
6804 | Jordan Love | QB | age 27 | GB | market 4822 | projected 180.7 (16.4 a week) | last 3 weeks 5.8 a week | lineup value 72.6
3198 | Derrick Henry | RB | age 32 | BAL | market 4136 | projected 166.5 (15.1 a week) | last 3 weeks 19.2 a week | lineup value 97.8
9221 | Jahmyr Gibbs | RB | age 24 | DET | market 6368 | projected 155.8 (14.2 a week) | last 3 weeks 17.1 a week | lineup value 84.9
1466 | Travis Kelce | TE | age 37 | KC | market 2868 | projected 144.8 (13.2 a week) | last 3 weeks 5 a week | lineup value 73.6
9997 | Zay Flowers | WR | age 26 | BAL | market 4181 | projected 136.7 (12.4 a week) | last 3 weeks 12.8 a week | lineup value 82.2
5045 | Courtland Sutton | WR | age 31 | DEN | market 3182 | projected 119.7 (10.9 a week) | last 3 weeks 8.4 a week | lineup value 65.2
4098 | Kareem Hunt | RB | age 30 | FA | market 1816 | projected 113.8 (10.3 a week) | last 3 weeks 0 a week | lineup value 44.2
6819 | Michael Pittman | WR | age 29 | PIT | market 2989 | projected 98.5 (9 a week) | last 3 weeks 6.6 a week | lineup value 46.5
3214 | Hunter Henry | TE | age 31 | NE | market 3148 | projected 78.8 (7.2 a week) | last 3 weeks 8.5 a week | lineup value 2.8
1339 | Zach Ertz | TE | age 35 | PHI | market 0 | projected 77.6 (7.1 a week) | last 3 weeks 2.9 a week | lineup value 2
4037 | Chris Godwin | WR | age 30 | TB | market 3084 | projected 59.7 (5.4 a week) | last 3 weeks 21.4 a week | lineup value 30.4
7591 | Justin Fields | QB | age 27 | KC | market 1786 | projected 57.9 (5.3 a week) | last 3 weeks 14.2 a week | lineup value 12.8
7562 | Tutu Atwell | WR | age 27 | LAR | market 0 | projected 53.1 (4.8 a week) | last 3 weeks 0 a week | lineup value 6.1
11650 | Luke McCaffrey | WR | age 25 | WAS | market 0 | projected 41.8 (3.8 a week) | last 3 weeks 4.1 a week | lineup value 2.2
5248 | Gus Edwards | RB | age 29 | FA | market 2770 | projected 40.7 (3.7 a week) | last 3 weeks 3.5 a week | lineup value 6.6
7527 | Mac Jones | QB | age 28 | SF | market 1655 | projected 36.6 (3.3 a week) | last 3 weeks -0.4 a week | lineup value 4.2
11651 | Isaac Guerendo | RB | age 26 | SF | market 0 | projected 32.3 (2.9 a week) | last 3 weeks 0.6 a week | lineup value 10.9
11586 | Blake Corum | RB | age 25 | LAR | market 3537 | projected 24.1 (2.2 a week) | last 3 weeks 0.9 a week | lineup value 0
11645 | Javon Baker | WR | age 23 | FA | market 0 | projected 5 (0.5 a week) | last 3 weeks 0 a week | lineup value 0
11559 | Michael Penix | QB | age 26 | ATL | market 3465 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0
5848 | Marquise Brown | WR | age 29 | PHI | market 0 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0

PARTNER (partnerId 7): record 2-1, rank 6, points for 393.4, contention window 0.56
11566 | Jayden Daniels | QB | age 25 | WAS | market 6413 | projected 202.3 (18.4 a week) | last 3 weeks 23.2 a week | lineup value 82
9509 | Bijan Robinson | RB | age 24 | ATL | market 6366 | projected 170.8 (15.5 a week) | last 3 weeks 15.2 a week | lineup value 106.8
4892 | Baker Mayfield | QB | age 31 | TB | market 4187 | projected 168.4 (15.3 a week) | last 3 weeks 19.7 a week | lineup value 55.2
4018 | Joe Mixon | RB | age 30 | FA | market 2254 | projected 134.4 (12.2 a week) | last 3 weeks 11.6 a week | lineup value 80.7
5872 | Deebo Samuel | WR | age 30 | SF | market 2702 | projected 128.7 (11.7 a week) | last 3 weeks 12.2 a week | lineup value 62.8
6768 | Tua Tagovailoa | QB | age 28 | ATL | market 2803 | projected 115.9 (10.5 a week) | last 3 weeks 9 a week | lineup value 28.5
7526 | Jaylen Waddle | WR | age 27 | DEN | market 4006 | projected 107 (9.7 a week) | last 3 weeks 10.4 a week | lineup value 43.3
9500 | Josh Downs | WR | age 25 | IND | market 3345 | projected 99.4 (9 a week) | last 3 weeks 1.7 a week | lineup value 33.5
9501 | DeMario Douglas | WR | age 25 | NE | market 0 | projected 88.1 (8 a week) | last 3 weeks 6 a week | lineup value 19.7
8408 | Jordan Mason | RB | age 27 | MIN | market 3076 | projected 84.6 (7.7 a week) | last 3 weeks 16.8 a week | lineup value 31.4
5012 | Mark Andrews | TE | age 31 | BAL | market 3107 | projected 82.7 (7.5 a week) | last 3 weeks 4.2 a week | lineup value 28.6
7670 | Joshua Palmer | WR | age 27 | BUF | market 0 | projected 73.7 (6.7 a week) | last 3 weeks 2.5 a week | lineup value 12.7
8131 | Isaiah Likely | TE | age 26 | NYG | market 3475 | projected 56.3 (5.1 a week) | last 3 weeks 10.7 a week | lineup value 2.1
11439 | Jaleel McLaughlin | RB | age 26 | CLE | market 0 | projected 55.5 (5 a week) | last 3 weeks 4.9 a week | lineup value 0
6803 | Brandon Aiyuk | WR | age 28 | SF | market 2489 | projected 53.3 (4.8 a week) | last 3 weeks 7.6 a week | lineup value 20.5
6938 | Cam Akers | RB | age 26 | FA | market 0 | projected 43.1 (3.9 a week) | last 3 weeks 3.3 a week | lineup value 7.5
11575 | Ray Davis | RB | age 26 | BUF | market 2518 | projected 41.5 (3.8 a week) | last 3 weeks 5.6 a week | lineup value 4.3
5185 | Allen Lazard | WR | age 30 | FA | market 1595 | projected 37.1 (3.4 a week) | last 3 weeks 5.6 a week | lineup value 7.3
11592 | Erick All | TE | age 26 | CIN | market 0 | projected 28.6 (2.6 a week) | last 3 weeks 4.5 a week | lineup value 0
11579 | Audric Estime | RB | age 23 | CLE | market 2636 | projected 26.1 (2.4 a week) | last 3 weeks 0.5 a week | lineup value 0.3
10229 | Rashee Rice | WR | age 26 | KC | market 4415 | projected 17.1 (1.6 a week) | last 3 weeks 21.6 a week | lineup value 9.5
11617 | Malachi Corley | WR | age 24 | CLE | market 2390 | projected 7.8 (0.7 a week) | last 3 weeks 0.5 a week | lineup value 0

CANDIDATE DEALS (from a rules-based finder; points are the finder projections for the rest of the season):
c1 | partnerId 2 | I give Jordan Travis + Chig Okonkwo (11567,8210) | I get Tyreek Hill + Cooper Kupp (3321,4039) | my points 75.6 | their points -88.3 | likelihood 0.95
c2 | partnerId 8 | I give Jordan Travis + Chig Okonkwo (11567,8210) | I get Aaron Rodgers + Anthony Richardson (96,9229) | my points 56 | their points -122.4 | likelihood 0.94
c3 | partnerId 6 | I give Najee Harris + Isiah Pacheco (7528,8205) | I get Geno Smith (1373) | my points 28.4 | their points 25.6 | likelihood 0.81
c4 | partnerId 11 | I give Jordan Travis (11567) | I get Kirk Cousins (1166) | my points 48.8 | their points -46.5 | likelihood 0.93
c5 | partnerId 3 | I give Chig Okonkwo + Isiah Pacheco (8210,8205) | I get James Conner + Derek Carr (4137,2028) | my points 50.4 | their points -44.1 | likelihood 0.82
c6 | partnerId 5 | I give Ricky Pearsall + Braelon Allen (11638,11576) | I get Travis Kelce + Justin Fields (1466,7591) | my points 77 | their points -68.1 | likelihood 0.63
c7 | partnerId 3 | I give Chig Okonkwo + Ricky Pearsall (8210,11638) | I get James Conner (4137) | my points 30.9 | their points -37.9 | likelihood 0.82
c8 | partnerId 7 | I give Isiah Pacheco + Chig Okonkwo (8205,8210) | I get Tua Tagovailoa (6768) | my points 31.3 | their points -9.1 | likelihood 0.71
c9 | partnerId 6 | I give Jonathan Taylor + Braelon Allen (6813,11576) | I get Brock Purdy (8183) | my points 6.4 | their points 41.1 | likelihood 0.56
c10 | partnerId 5 | I give Chig Okonkwo + Braelon Allen (8210,11576) | I get Travis Kelce (1466) | my points 52.8 | their points -62.5 | likelihood 0.66
c11 | partnerId 7 | I give Isiah Pacheco + Braelon Allen (8205,11576) | I get Tua Tagovailoa + Brandon Aiyuk (6768,6803) | my points 39.7 | their points -25.9 | likelihood 0.78

Pick the best trades for my team.

=========== CASE 1093978338437214208-w7-r1 ===========
REPLY FILE: /Users/anik/workspace/chrome/sleeper/.eval-market/replies/suggest-v2/heldout1/1093978338437214208-w7-r1.json
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
Lineup slots: QB, RB, RB, WR, WR, WR, TE, FLEX, FLEX, SUPER_FLEX, BN, BN, BN, BN, BN, BN, BN, BN. Superflex: yes. Tight end premium: no. Points per reception: 1.
Columns: id | name | position | age | team | market value | projected points for the rest of the regular season (and per week) | points per week over the last three weeks played | lineup value (points my lineup loses if this player is removed).

MY TEAM (partnerId me): record 4-2, rank 5, points for 789.9, contention window 0.69
6797 | Justin Herbert | QB | age 28 | LAC | market 5411 | projected 135.3 (16.9 a week) | last 3 weeks 8.3 a week | lineup value 67.8
6770 | Joe Burrow | QB | age 29 | CIN | market 5953 | projected 134.1 (16.8 a week) | last 3 weeks 24 a week | lineup value 66.6
11604 | Brock Bowers | TE | age 23 | LV | market 5530 | projected 93.6 (11.7 a week) | last 3 weeks 15 a week | lineup value 54.1
7526 | Jaylen Waddle | WR | age 27 | DEN | market 4006 | projected 87.6 (10.9 a week) | last 3 weeks 5.4 a week | lineup value 26.3
11635 | Ladd McConkey | WR | age 24 | LAC | market 4601 | projected 87.4 (10.9 a week) | last 3 weeks 8.7 a week | lineup value 35.3
11631 | Brian Thomas | WR | age 24 | JAX | market 3925 | projected 87 (10.9 a week) | last 3 weeks 16.9 a week | lineup value 27.5
11584 | Bucky Irving | RB | age 24 | TB | market 4311 | projected 73 (9.1 a week) | last 3 weeks 12.2 a week | lineup value 64.2
8148 | Jameson Williams | WR | age 25 | DET | market 4097 | projected 64.4 (8.1 a week) | last 3 weeks 11.2 a week | lineup value 20.5
7049 | Jauan Jennings | WR | age 29 | MIN | market 2834 | projected 61.5 (7.7 a week) | last 3 weeks 6.6 a week | lineup value 24.8
5844 | T.J. Hockenson | TE | age 29 | MIN | market 2958 | projected 60.8 (7.6 a week) | last 3 weeks 0 a week | lineup value 21.3
9486 | Dontayvion Wicks | WR | age 25 | PHI | market 2556 | projected 54 (6.7 a week) | last 3 weeks 10.2 a week | lineup value 4
10226 | Andrei Iosivas | WR | age 27 | CIN | market 0 | projected 44.7 (5.6 a week) | last 3 weeks 4.8 a week | lineup value 0
5987 | Alexander Mattison | RB | age 27 | FA | market 1372 | projected 38.7 (4.8 a week) | last 3 weeks 11.2 a week | lineup value 31.5
8144 | Chris Olave | WR | age 26 | NO | market 4410 | projected 29.2 (3.7 a week) | last 3 weeks 6.4 a week | lineup value 11.9
11562 | Spencer Rattler | QB | age 26 | NO | market 0 | projected 24.3 (3 a week) | last 3 weeks 4.8 a week | lineup value 0
11583 | Jonathon Brooks | RB | age 23 | CAR | market 3587 | projected 15.5 (1.9 a week) | last 3 weeks 0 a week | lineup value 13.7
11640 | Jermaine Burton | WR | age 24 | FA | market 2046 | projected 14.4 (1.8 a week) | last 3 weeks 0 a week | lineup value 0
11582 | Carson Steele | RB | age 23 | PHI | market 0 | projected 12.1 (1.5 a week) | last 3 weeks 0.3 a week | lineup value 3.2
11621 | Brenden Rice | WR | age 24 | FA | market 0 | projected 1.2 (0.2 a week) | last 3 weeks 0 a week | lineup value 0
10229 | Rashee Rice | WR | age 26 | KC | market 4415 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0
11630 | Roman Wilson | WR | age 25 | PIT | market 0 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0
6111 | Jake Browning | QB | age 30 | LAC | market 0 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0

PARTNER (partnerId 10): record 4-2, rank 3, points for 880.3, contention window 0.95
4866 | Saquon Barkley | RB | age 29 | PHI | market 4230 | projected 142.4 (17.8 a week) | last 3 weeks 7 a week | lineup value 80.8
4035 | Alvin Kamara | RB | age 31 | NO | market 2512 | projected 134.9 (16.9 a week) | last 3 weeks 18.3 a week | lineup value 79.5
5859 | A.J. Brown | WR | age 29 | NE | market 4313 | projected 133.7 (16.7 a week) | last 3 weeks 7.9 a week | lineup value 73.9
11560 | Caleb Williams | QB | age 24 | CHI | market 6409 | projected 110.1 (13.8 a week) | last 3 weeks 21.6 a week | lineup value 63
11632 | Malik Nabers | WR | age 23 | NYG | market 5024 | projected 106.7 (13.3 a week) | last 3 weeks 7.7 a week | lineup value 53
9228 | Bryce Young | QB | age 25 | CAR | market 3892 | projected 73.3 (9.2 a week) | last 3 weeks 1 a week | lineup value 26.2
8136 | Rachaad White | RB | age 27 | WAS | market 2757 | projected 73.2 (9.1 a week) | last 3 weeks 6.7 a week | lineup value 17.8
2374 | Tyler Lockett | WR | age 33 | FA | market 2518 | projected 69.9 (8.7 a week) | last 3 weeks 13 a week | lineup value 17.2
4663 | Austin Ekeler | RB | age 31 | WAS | market 0 | projected 63.3 (7.9 a week) | last 3 weeks 7.5 a week | lineup value 17.2
5096 | Ray-Ray McCloud | WR | age 29 | FA | market 0 | projected 60.4 (7.5 a week) | last 3 weeks 9.4 a week | lineup value 7.3
7596 | Elijah Moore | WR | age 26 | PHI | market 0 | projected 56.3 (7 a week) | last 3 weeks 2.5 a week | lineup value 4.8
6826 | Cole Kmet | TE | age 27 | CHI | market 0 | projected 54.2 (6.8 a week) | last 3 weeks 13 a week | lineup value 19.5
11627 | Troy Franklin | WR | age 23 | DEN | market 3023 | projected 40.6 (5.1 a week) | last 3 weeks 5.5 a week | lineup value 0
11600 | Ja'Tavion Sanders | TE | age 23 | CAR | market 0 | projected 40.5 (5.1 a week) | last 3 weeks 5.9 a week | lineup value 5.8
4082 | Curtis Samuel | WR | age 29 | FA | market 1443 | projected 34.6 (4.3 a week) | last 3 weeks 3.9 a week | lineup value 0
2449 | Stefon Diggs | WR | age 32 | WAS | market 2787 | projected 30.4 (3.8 a week) | last 3 weeks 17.5 a week | lineup value 12.8
9508 | Tyjae Spears | RB | age 25 | TEN | market 2977 | projected 29.7 (3.7 a week) | last 3 weeks 4.9 a week | lineup value 1.9
6938 | Cam Akers | RB | age 26 | FA | market 0 | projected 26.3 (3.3 a week) | last 3 weeks 6 a week | lineup value 0
11616 | Jacob Cowing | WR | age 25 | SF | market 0 | projected 7.5 (0.9 a week) | last 3 weeks 0 a week | lineup value 0
11574 | Dylan Laube | RB | age 26 | LV | market 0 | projected 5.7 (0.7 a week) | last 3 weeks -0.7 a week | lineup value 0
11581 | MarShawn Lloyd | RB | age 25 | GB | market 3214 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0

PARTNER (partnerId 7): record 3-3, rank 6, points for 855.9, contention window 0.56
11566 | Jayden Daniels | QB | age 25 | WAS | market 6421 | projected 143 (17.9 a week) | last 3 weeks 22.2 a week | lineup value 39.8
4018 | Joe Mixon | RB | age 30 | FA | market 2254 | projected 122 (15.3 a week) | last 3 weeks 9.1 a week | lineup value 76.4
9509 | Bijan Robinson | RB | age 24 | ATL | market 6366 | projected 121.2 (15.1 a week) | last 3 weeks 15.9 a week | lineup value 79.5
4892 | Baker Mayfield | QB | age 31 | TB | market 4180 | projected 120.2 (15 a week) | last 3 weeks 27.1 a week | lineup value 24.1
6768 | Tua Tagovailoa | QB | age 28 | ATL | market 2803 | projected 115.9 (14.5 a week) | last 3 weeks 0 a week | lineup value 28.5
5872 | Deebo Samuel | WR | age 30 | SF | market 2703 | projected 88.7 (11.1 a week) | last 3 weeks 11.3 a week | lineup value 45.3
4217 | George Kittle | TE | age 33 | SF | market 3142 | projected 79.9 (10 a week) | last 3 weeks 19.2 a week | lineup value 45.3
7525 | DeVonta Smith | WR | age 27 | PHI | market 4163 | projected 79.5 (9.9 a week) | last 3 weeks 5.1 a week | lineup value 40.9
9500 | Josh Downs | WR | age 25 | IND | market 3345 | projected 71.3 (8.9 a week) | last 3 weeks 19.2 a week | lineup value 26.2
9501 | DeMario Douglas | WR | age 25 | NE | market 0 | projected 68 (8.5 a week) | last 3 weeks 12.5 a week | lineup value 19.3
5012 | Mark Andrews | TE | age 31 | BAL | market 3108 | projected 61.6 (7.7 a week) | last 3 weeks 8.4 a week | lineup value 15.8
7670 | Joshua Palmer | WR | age 27 | BUF | market 0 | projected 58.5 (7.3 a week) | last 3 weeks 4.1 a week | lineup value 12.3
8408 | Jordan Mason | RB | age 27 | MIN | market 3080 | projected 38.7 (4.8 a week) | last 3 weeks 14 a week | lineup value 7.8
8131 | Isaiah Likely | TE | age 26 | NYG | market 3473 | projected 37.4 (4.7 a week) | last 3 weeks 8.2 a week | lineup value 2.3
11439 | Jaleel McLaughlin | RB | age 26 | CLE | market 0 | projected 36 (4.5 a week) | last 3 weeks 7.2 a week | lineup value 0
11575 | Ray Davis | RB | age 26 | BUF | market 2521 | projected 31 (3.9 a week) | last 3 weeks 6.9 a week | lineup value 4.3
11579 | Audric Estime | RB | age 23 | CLE | market 2636 | projected 25.1 (3.1 a week) | last 3 weeks 0.4 a week | lineup value 0.7
829 | Andy Dalton | QB | age 38 | FA | market 0 | projected 15.7 (2 a week) | last 3 weeks 12.8 a week | lineup value 0
11592 | Erick All | TE | age 26 | CIN | market 0 | projected 14.6 (1.8 a week) | last 3 weeks 4.3 a week | lineup value 0
5185 | Allen Lazard | WR | age 30 | FA | market 1596 | projected 13.5 (1.7 a week) | last 3 weeks 15.9 a week | lineup value 5.5
6803 | Brandon Aiyuk | WR | age 28 | SF | market 2488 | projected 12.4 (1.6 a week) | last 3 weeks 11.7 a week | lineup value 2.5
11617 | Malachi Corley | WR | age 24 | CLE | market 2391 | projected 6.6 (0.8 a week) | last 3 weeks 0 a week | lineup value 0

PARTNER (partnerId 8): record 2-4, rank 10, points for 683.1, contention window 0.05
7564 | Ja'Marr Chase | WR | age 26 | CIN | market 5779 | projected 126.5 (15.8 a week) | last 3 weeks 23.7 a week | lineup value 80.4
96 | Aaron Rodgers | QB | age 42 | PIT | market 2671 | projected 109.4 (13.7 a week) | last 3 weeks 15 a week | lineup value 42.3
5850 | Josh Jacobs | RB | age 28 | GB | market 4035 | projected 102.4 (12.8 a week) | last 3 weeks 13.4 a week | lineup value 54.5
11564 | Drake Maye | QB | age 24 | NE | market 7042 | projected 100.3 (12.5 a week) | last 3 weeks 7.2 a week | lineup value 24.9
9488 | Jaxon Smith-Njigba | WR | age 24 | SEA | market 5790 | projected 92 (11.5 a week) | last 3 weeks 12.2 a week | lineup value 37.8
4981 | Calvin Ridley | WR | age 31 | TEN | market 2282 | projected 86.7 (10.8 a week) | last 3 weeks 1.1 a week | lineup value 32.5
9229 | Anthony Richardson | QB | age 24 | IND | market 0 | projected 81.8 (10.2 a week) | last 3 weeks 1.7 a week | lineup value 16.3
11624 | Xavier Worthy | WR | age 23 | KC | market 3491 | projected 75.6 (9.5 a week) | last 3 weeks 9.4 a week | lineup value 22.2
4988 | Nick Chubb | RB | age 30 | FA | market 1806 | projected 73.9 (9.2 a week) | last 3 weeks 0 a week | lineup value 25.9
7021 | Rico Dowdle | RB | age 28 | PIT | market 3263 | projected 72.7 (9.1 a week) | last 3 weeks 14.3 a week | lineup value 30.9
11620 | Rome Odunze | WR | age 24 | CHI | market 4055 | projected 68.2 (8.5 a week) | last 3 weeks 5.7 a week | lineup value 18.3
5001 | Dalton Schultz | TE | age 30 | HOU | market 3164 | projected 61.7 (7.7 a week) | last 3 weeks 6.8 a week | lineup value 61.7
7571 | Rashod Bateman | WR | age 26 | BAL | market 2468 | projected 57.1 (7.1 a week) | last 3 weeks 10.1 a week | lineup value 12.3
8143 | Jerome Ford | RB | age 27 | ARI | market 0 | projected 33.1 (4.1 a week) | last 3 weeks 8.3 a week | lineup value 0
10225 | Jonathan Mingo | WR | age 25 | DAL | market 0 | projected 17.5 (2.2 a week) | last 3 weeks 4.1 a week | lineup value 0
9757 | Kendre Miller | RB | age 24 | NO | market 2605 | projected 10.7 (1.3 a week) | last 3 weeks 0 a week | lineup value 0
7608 | Khalil Herbert | RB | age 28 | ATL | market 0 | projected 9.9 (1.2 a week) | last 3 weeks 0 a week | lineup value 1
8676 | Rashid Shaheed | WR | age 28 | SEA | market 2691 | projected 0 (0 a week) | last 3 weeks 14.2 a week | lineup value 0

PARTNER (partnerId 11): record 1-5, rank 12, points for 754, contention window 0
4943 | Sam Darnold | QB | age 29 | SEA | market 4035 | projected 136.6 (17.1 a week) | last 3 weeks 8.9 a week | lineup value 65.7
6786 | CeeDee Lamb | WR | age 27 | DAL | market 4922 | projected 113 (14.1 a week) | last 3 weeks 17 a week | lineup value 59.9
1166 | Kirk Cousins | QB | age 38 | LV | market 2126 | projected 109.6 (13.7 a week) | last 3 weeks 18.8 a week | lineup value 38.8
8155 | Breece Hall | RB | age 25 | NYJ | market 4265 | projected 105.2 (13.1 a week) | last 3 weeks 10.8 a week | lineup value 55.7
7611 | Rhamondre Stevenson | RB | age 28 | NE | market 3354 | projected 83.3 (10.4 a week) | last 3 weeks 9.1 a week | lineup value 29
5947 | Jakobi Meyers | WR | age 29 | JAX | market 3291 | projected 78.6 (9.8 a week) | last 3 weeks 7.7 a week | lineup value 33
8167 | Christian Watson | WR | age 27 | GB | market 3663 | projected 65.5 (8.2 a week) | last 3 weeks 5.3 a week | lineup value 13.6
10859 | Sam LaPorta | TE | age 25 | DET | market 4254 | projected 62.9 (7.9 a week) | last 3 weeks 7.2 a week | lineup value 25.1
8228 | Jaylen Warren | RB | age 27 | PIT | market 3534 | projected 60.1 (7.5 a week) | last 3 weeks 1.6 a week | lineup value 17.1
6801 | Tee Higgins | WR | age 27 | CIN | market 4118 | projected 57.7 (7.2 a week) | last 3 weeks 18.7 a week | lineup value 26.8
9754 | Quentin Johnston | WR | age 25 | LAC | market 3434 | projected 54.3 (6.8 a week) | last 3 weeks 2.5 a week | lineup value 9.9
8117 | Jalen Tolbert | WR | age 27 | MIA | market 0 | projected 53 (6.6 a week) | last 3 weeks 11.8 a week | lineup value 3.4
2749 | Raheem Mostert | RB | age 33 | FA | market 1171 | projected 52.7 (6.6 a week) | last 3 weeks 3.9 a week | lineup value 5.1
8132 | Tyler Allgeier | RB | age 26 | ARI | market 3194 | projected 48.8 (6.1 a week) | last 3 weeks 11.8 a week | lineup value 5.5
5133 | Tyler Conklin | TE | age 31 | DET | market 0 | projected 44.3 (5.5 a week) | last 3 weeks 6.7 a week | lineup value 6.5
11625 | Adonai Mitchell | WR | age 24 | NYJ | market 2979 | projected 41.9 (5.2 a week) | last 3 weeks 4.4 a week | lineup value 0.6
3294 | Dak Prescott | QB | age 33 | DAL | market 4625 | projected 34.4 (4.3 a week) | last 3 weeks 13.4 a week | lineup value 2.2
4040 | JuJu Smith-Schuster | WR | age 29 | FA | market 1346 | projected 29 (3.6 a week) | last 3 weeks 0 a week | lineup value 1.9
4950 | Christian Kirk | WR | age 29 | SF | market 2209 | projected 20.8 (2.6 a week) | last 3 weeks 12.9 a week | lineup value 4.5
11623 | Jordan Whittington | WR | age 26 | LAR | market 0 | projected 16.8 (2.1 a week) | last 3 weeks 9.4 a week | lineup value 0
11565 | J.J. McCarthy | QB | age 23 | NYG | market 3918 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0

PARTNER (partnerId 2): record 1-5, rank 11, points for 813.9, contention window 0
9226 | De'Von Achane | RB | age 25 | MIA | market 4982 | projected 134.2 (16.8 a week) | last 3 weeks 2.9 a week | lineup value 48
421 | Matthew Stafford | QB | age 38 | LAR | market 3779 | projected 127.2 (15.9 a week) | last 3 weeks 6.4 a week | lineup value 33.4
3321 | Tyreek Hill | WR | age 31 | FA | market 2521 | projected 122.2 (15.3 a week) | last 3 weeks 7 a week | lineup value 31
9758 | C.J. Stroud | QB | age 25 | HOU | market 4629 | projected 120.5 (15.1 a week) | last 3 weeks 19.9 a week | lineup value 38.6
9493 | Puka Nacua | WR | age 25 | LAR | market 5685 | projected 106.9 (13.4 a week) | last 3 weeks 0 a week | lineup value 24.5
4039 | Cooper Kupp | WR | age 33 | SEA | market 2094 | projected 105.1 (13.1 a week) | last 3 weeks 0 a week | lineup value 22.6
5927 | Terry McLaurin | WR | age 31 | WAS | market 3390 | projected 104.3 (13 a week) | last 3 weeks 18.3 a week | lineup value 25
5967 | Tony Pollard | RB | age 29 | TEN | market 3194 | projected 103.5 (12.9 a week) | last 3 weeks 12.2 a week | lineup value 17.3
2133 | Davante Adams | WR | age 33 | LAR | market 3374 | projected 97.7 (12.2 a week) | last 3 weeks 0 a week | lineup value 18.3
6790 | D'Andre Swift | RB | age 27 | CHI | market 3666 | projected 88.3 (11 a week) | last 3 weeks 23.8 a week | lineup value 7.8
4066 | Evan Engram | TE | age 32 | DEN | market 0 | projected 77.5 (9.7 a week) | last 3 weeks 6.1 a week | lineup value 22.5
11626 | Xavier Legette | WR | age 25 | CAR | market 0 | projected 63.5 (7.9 a week) | last 3 weeks 10.9 a week | lineup value 0
9484 | Tucker Kraft | TE | age 25 | GB | market 4153 | projected 62.6 (7.8 a week) | last 3 weeks 9.4 a week | lineup value 6.1
2216 | Mike Evans | WR | age 33 | SF | market 3187 | projected 55.2 (6.9 a week) | last 3 weeks 17.3 a week | lineup value 10
6149 | Darius Slayton | WR | age 29 | IND | market 0 | projected 42.3 (5.3 a week) | last 3 weeks 12.6 a week | lineup value 0
10866 | Aidan O'Connell | QB | age 28 | LV | market 0 | projected 35.4 (4.4 a week) | last 3 weeks 4 a week | lineup value 0.5
9506 | Sean Tucker | RB | age 24 | TB | market 2804 | projected 20.1 (2.5 a week) | last 3 weeks 0 a week | lineup value 0
8139 | Zamir White | RB | age 27 | NO | market 0 | projected 18.1 (2.3 a week) | last 3 weeks 1 a week | lineup value 0
9482 | Michael Mayer | TE | age 25 | LV | market 0 | projected 10.4 (1.3 a week) | last 3 weeks 0 a week | lineup value 0
11596 | Ben Sinnott | TE | age 24 | WAS | market 0 | projected 7.9 (1 a week) | last 3 weeks 0 a week | lineup value 0

PARTNER (partnerId 3): record 2-4, rank 9, points for 742.4, contention window 0.18
4984 | Josh Allen | QB | age 30 | BUF | market 6731 | projected 155.5 (19.4 a week) | last 3 weeks 15.4 a week | lineup value 74.1
3163 | Jared Goff | QB | age 32 | DET | market 4376 | projected 129.2 (16.2 a week) | last 3 weeks 17.4 a week | lineup value 47.8
5892 | David Montgomery | RB | age 29 | HOU | market 3466 | projected 104.6 (13.1 a week) | last 3 weeks 12 a week | lineup value 50.9
4137 | James Conner | RB | age 31 | ARI | market 2741 | projected 93.5 (11.7 a week) | last 3 weeks 13 a week | lineup value 47.4
4983 | DJ Moore | WR | age 29 | BUF | market 3645 | projected 87.1 (10.9 a week) | last 3 weeks 14.9 a week | lineup value 39.4
9756 | Jordan Addison | WR | age 24 | MIN | market 3609 | projected 83.3 (10.4 a week) | last 3 weeks 9.8 a week | lineup value 29
4034 | Christian McCaffrey | RB | age 30 | SF | market 4591 | projected 79.8 (10 a week) | last 3 weeks 0 a week | lineup value 51.2
2028 | Derek Carr | QB | age 34 | FA | market 2633 | projected 67.9 (8.5 a week) | last 3 weeks 7.6 a week | lineup value 0
3286 | Demarcus Robinson | WR | age 32 | SF | market 0 | projected 60.7 (7.6 a week) | last 3 weeks 5.8 a week | lineup value 6.5
10232 | Michael Wilson | WR | age 26 | ARI | market 3634 | projected 52.6 (6.6 a week) | last 3 weeks 9.2 a week | lineup value 7.4
9504 | Kayshon Boutte | WR | age 24 | HOU | market 2967 | projected 50.6 (6.3 a week) | last 3 weeks 0 a week | lineup value 3.5
7543 | Travis Etienne | RB | age 27 | NO | market 3835 | projected 50.4 (6.3 a week) | last 3 weeks 6.3 a week | lineup value 16.5
8121 | Romeo Doubs | WR | age 26 | NE | market 3166 | projected 50 (6.3 a week) | last 3 weeks 9.3 a week | lineup value 14.4
5995 | Justice Hill | RB | age 28 | BAL | market 2038 | projected 44.8 (5.6 a week) | last 3 weeks 8.8 a week | lineup value 0
5022 | Dallas Goedert | TE | age 31 | PHI | market 3128 | projected 39.1 (4.9 a week) | last 3 weeks 4.4 a week | lineup value 31.7
3225 | Tyler Boyd | WR | age 30 | FA | market 1966 | projected 37.4 (4.7 a week) | last 3 weeks 3.3 a week | lineup value 0.2
5857 | Noah Fant | TE | age 28 | NO | market 0 | projected 30.8 (3.8 a week) | last 3 weeks 3.3 a week | lineup value 23.3
11643 | Jaylen Wright | RB | age 23 | MIA | market 2769 | projected 25.1 (3.1 a week) | last 3 weeks 3.9 a week | lineup value 0
11637 | Keon Coleman | WR | age 23 | BUF | market 2741 | projected 24.1 (3 a week) | last 3 weeks 8.5 a week | lineup value 3.5

CANDIDATE DEALS (from a rules-based finder; points are the finder projections for the rest of the season):
c1 | partnerId 10 | I give Spencer Rattler (11562) | I get Cam Akers + Dylan Laube (6938,11574) | my points 8.2 | their points 14 | likelihood 0.79
c2 | partnerId 7 | I give Andrei Iosivas (10226) | I get Jaleel McLaughlin (11439) | my points 7.4 | their points 5.9 | likelihood 0.76
c3 | partnerId 8 | I give Rashee Rice (10229) | I get Josh Jacobs + Rico Dowdle (5850,7021) | my points 87.7 | their points -95.9 | likelihood 0.92
c4 | partnerId 8 | I give Rashee Rice + Jermaine Burton (10229,11640) | I get Josh Jacobs + Nick Chubb (5850,4988) | my points 73.7 | their points -97.1 | likelihood 0.92
c5 | partnerId 11 | I give Rashee Rice (10229) | I get Rhamondre Stevenson + Sam Darnold (7611,4943) | my points 61.5 | their points -96.6 | likelihood 0.92
c6 | partnerId 2 | I give Rashee Rice (10229) | I get Tyreek Hill + D'Andre Swift (3321,6790) | my points 101.8 | their points -53.4 | likelihood 0.95
c7 | partnerId 2 | I give Rashee Rice + Jermaine Burton (10229,11640) | I get Terry McLaurin + D'Andre Swift (5927,6790) | my points 94.1 | their points -45.4 | likelihood 0.95
c8 | partnerId 8 | I give Jermaine Burton (11640) | I get Nick Chubb (4988) | my points 32.9 | their points -25.9 | likelihood 0.94
c9 | partnerId 10 | I give Spencer Rattler + Jauan Jennings (11562,7049) | I get Tyjae Spears + Rachaad White (9508,8136) | my points 17.6 | their points 20.4 | likelihood 0.65
c10 | partnerId 3 | I give Rashee Rice (10229) | I get David Montgomery + DJ Moore (5892,4983) | my points 83.3 | their points -94.3 | likelihood 0.93
c11 | partnerId 3 | I give Rashee Rice + Jermaine Burton (10229,11640) | I get David Montgomery + Travis Etienne (5892,7543) | my points 66.7 | their points -72.3 | likelihood 0.93
c12 | partnerId 3 | I give Rashee Rice + Andrei Iosivas (10229,10226) | I get James Conner + Travis Etienne (4137,7543) | my points 64.2 | their points -62.2 | likelihood 0.93

Pick the best trades for my team.

=========== CASE 1126221449154408448-w10-r11 ===========
REPLY FILE: /Users/anik/workspace/chrome/sleeper/.eval-market/replies/suggest-v2/heldout1/1126221449154408448-w10-r11.json
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

MY TEAM (partnerId me): record 3-6, rank 10, points for 1258.7, contention window 0.05
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

PARTNER (partnerId 7): record 6-3, rank 2, points for 1293.7, contention window 1
4881 | Lamar Jackson | QB | age 29 | BAL | market 6311 | projected 85.1 (17 a week) | last 3 weeks 27.4 a week | lineup value 45.8
9221 | Jahmyr Gibbs | RB | age 24 | DET | market 6371 | projected 79.4 (15.9 a week) | last 3 weeks 22.3 a week | lineup value 38.5
5967 | Tony Pollard | RB | age 29 | TEN | market 3194 | projected 62.6 (12.5 a week) | last 3 weeks 13.9 a week | lineup value 22
4983 | DJ Moore | WR | age 29 | BUF | market 3644 | projected 59.8 (12 a week) | last 3 weeks 4.2 a week | lineup value 15.2
11564 | Drake Maye | QB | age 24 | NE | market 6666 | projected 55.4 (11.1 a week) | last 3 weeks 16 a week | lineup value 16.1
1479 | Keenan Allen | WR | age 34 | IND | market 2143 | projected 53 (10.6 a week) | last 3 weeks 4.5 a week | lineup value 8.9
8137 | George Pickens | WR | age 25 | DAL | market 4766 | projected 52.9 (10.6 a week) | last 3 weeks 11.2 a week | lineup value 13.6
11631 | Brian Thomas | WR | age 24 | JAX | market 3926 | projected 48.1 (9.6 a week) | last 3 weeks 14.4 a week | lineup value 13.5
11584 | Bucky Irving | RB | age 24 | TB | market 4314 | projected 46.9 (9.4 a week) | last 3 weeks 12.8 a week | lineup value 11.2
8136 | Rachaad White | RB | age 27 | WAS | market 2753 | projected 43.8 (8.8 a week) | last 3 weeks 19.1 a week | lineup value 7.7
8259 | Cameron Dicker | K | age 26 | LAC | market 0 | projected 41.4 (8.3 a week) | last 3 weeks 10 a week | lineup value 41.4
PIT | Pittsburgh Steelers | DEF | age ? | PIT | market 0 | projected 37.2 (7.4 a week) | last 3 weeks 8.3 a week | lineup value 10.3
7553 | Kyle Pitts | TE | age 26 | ATL | market 3952 | projected 34.7 (6.9 a week) | last 3 weeks 13.6 a week | lineup value 31.4
8142 | Alec Pierce | WR | age 26 | IND | market 3409 | projected 31.9 (6.4 a week) | last 3 weeks 4.2 a week | lineup value 0
6819 | Michael Pittman | WR | age 29 | PIT | market 2989 | projected 30.1 (6 a week) | last 3 weeks 4.8 a week | lineup value 0.5
NO | New Orleans Saints | DEF | age ? | NO | market 0 | projected 27.5 (5.5 a week) | last 3 weeks 2 a week | lineup value 0.6
6938 | Cam Akers | RB | age 26 | FA | market 0 | projected 25.2 (5 a week) | last 3 weeks 2.4 a week | lineup value 0
7608 | Khalil Herbert | RB | age 28 | ATL | market 0 | projected 9.9 (2 a week) | last 3 weeks 0 a week | lineup value 0
9506 | Sean Tucker | RB | age 24 | TB | market 2804 | projected 9.5 (1.9 a week) | last 3 weeks 3.3 a week | lineup value 0
9511 | Keaton Mitchell | RB | age 24 | LAC | market 2858 | projected 7.8 (1.6 a week) | last 3 weeks 0 a week | lineup value 0
11617 | Malachi Corley | WR | age 24 | CLE | market 2383 | projected 6.3 (1.3 a week) | last 3 weeks -0.1 a week | lineup value 0
11596 | Ben Sinnott | TE | age 24 | WAS | market 0 | projected 4.5 (0.9 a week) | last 3 weeks 3.6 a week | lineup value 1.1

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

PARTNER (partnerId 2): record 6-3, rank 3, points for 1266.8, contention window 0.95
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

CANDIDATE DEALS (from a rules-based finder; points are the finder projections for the rest of the season):
c1 | partnerId 7 | I give Travis Kelce + Tua Tagovailoa (1466,6768) | I get Malachi Corley + Michael Pittman (11617,6819) | my points -89.5 | their points 66.1 | likelihood 0.74
c2 | partnerId 7 | I give Travis Kelce + DeAndre Hopkins (1466,1426) | I get Michael Pittman (6819) | my points -72.6 | their points 51.1 | likelihood 0.74
c3 | partnerId 7 | I give Travis Kelce + Najee Harris (1466,7528) | I get Keaton Mitchell + Michael Pittman (9511,6819) | my points -73.3 | their points 47.3 | likelihood 0.74
c4 | partnerId 3 | I give Travis Kelce + Tua Tagovailoa (1466,6768) | I get Juwan Johnson (7002) | my points -89.1 | their points 45.5 | likelihood 0.68
c5 | partnerId 2 | I give Travis Kelce + Tua Tagovailoa (1466,6768) | I get Theo Johnson (11597) | my points -86.7 | their points 46.2 | likelihood 0.64
c6 | partnerId 3 | I give Travis Kelce + DeAndre Hopkins (1466,1426) | I get Chris Godwin + Juwan Johnson (4037,7002) | my points -69.8 | their points 41.8 | likelihood 0.68
c7 | partnerId 3 | I give Travis Kelce + Najee Harris (1466,7528) | I get Chris Godwin (4037) | my points -75.7 | their points 41 | likelihood 0.69
c8 | partnerId 3 | I give Travis Kelce + Rhamondre Stevenson (1466,7611) | I get Chris Godwin + Daniel Jones (4037,5870) | my points -65 | their points 41.3 | likelihood 0.73
c9 | partnerId 2 | I give Travis Kelce + DeAndre Hopkins (1466,1426) | I get Theo Johnson + Rashid Shaheed (11597,8676) | my points -71.3 | their points 31.6 | likelihood 0.64

Pick the best trades for my team.
