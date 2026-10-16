You are answering fantasy football trade-advice cases. For each case below, follow the SYSTEM text, read the DATA, and write your JSON answer to the reply file named for that case.
Rules: write only the JSON object (no markdown fence, no commentary) to each reply file. Do not read any other file on disk. Do not look at any directory named truth or any file outside the reply paths. Work each case independently.

=========== CASE 1180160590047531008-w10-r7 ===========
REPLY FILE: /Users/anik/workspace/chrome/sleeper/.eval-market/replies/suggest-v2/run1/1180160590047531008-w10-r7.json
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

MY TEAM (partnerId me): record 3-6, rank 10, points for 2280.9, contention window 0.23
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
6782 | Chase Young | DL | age 27 | NO | market 0 | projected 26.5 (5.3 a week) | last 3 weeks 18.2 a week | lineup value 0
4219 | Jeremy McNichols | RB | age 30 | WAS | market 0 | projected 26 (5.2 a week) | last 3 weeks 6.4 a week | lineup value 4.5
2353 | Denzel Perryman | LB | age 33 | LAC | market 0 | projected 25.7 (5.1 a week) | last 3 weeks 8 a week | lineup value 0
12614 | Shemar James | LB | age 22 | DAL | market 0 | projected 24.7 (4.9 a week) | last 3 weeks 12.8 a week | lineup value 0
6218 | E.J. Speed | LB | age 31 | HOU | market 0 | projected 22.6 (4.5 a week) | last 3 weeks 5 a week | lineup value 0
11630 | Roman Wilson | WR | age 25 | PIT | market 0 | projected 20.9 (4.2 a week) | last 3 weeks 6.8 a week | lineup value 4.6
4314 | Johnny Mundt | TE | age 31 | PHI | market 0 | projected 18.6 (3.7 a week) | last 3 weeks 1 a week | lineup value 5.9
8365 | Kyler Gordon | DB | age 26 | CHI | market 0 | projected 17.1 (3.4 a week) | last 3 weeks 5.8 a week | lineup value 0

PARTNER (partnerId 9): record 6-3, rank 5, points for 2347.9, contention window 0.77
4984 | Josh Allen | QB | age 30 | BUF | market 7163 | projected 125.7 (25.1 a week) | last 3 weeks 17.9 a week | lineup value 71.7
7547 | Amon-Ra St. Brown | WR | age 26 | DET | market 5294 | projected 98.3 (19.7 a week) | last 3 weeks 13.8 a week | lineup value 58.8
11687 | Edgerrin Cooper | LB | age 24 | GB | market 0 | projected 92.3 (18.5 a week) | last 3 weeks 10.5 a week | lineup value 29.6
3257 | Jacoby Brissett | QB | age 33 | ARI | market 2876 | projected 88 (17.6 a week) | last 3 weeks 15.6 a week | lineup value 34
12512 | Quinshon Judkins | RB | age 22 | CLE | market 5393 | projected 86.5 (17.3 a week) | last 3 weeks 12.6 a week | lineup value 48.3
5022 | Dallas Goedert | TE | age 31 | PHI | market 3120 | projected 75.8 (15.2 a week) | last 3 weeks 9.5 a week | lineup value 36.2
12578 | Carson Schwesinger | LB | age 23 | CLE | market 0 | projected 72 (14.4 a week) | last 3 weeks 8.4 a week | lineup value 9.4
12529 | TreVeyon Henderson | RB | age 23 | NE | market 5055 | projected 72 (14.4 a week) | last 3 weeks 8 a week | lineup value 39
5726 | Robert Spillane | LB | age 30 | NE | market 0 | projected 69.3 (13.9 a week) | last 3 weeks 14.9 a week | lineup value 18.8
8122 | Zonovan Knight | RB | age 25 | ARI | market 0 | projected 63.5 (12.7 a week) | last 3 weeks 6.9 a week | lineup value 25.3
11086 | Ivan Pace | LB | age 25 | MIN | market 0 | projected 60.2 (12 a week) | last 3 weeks 2.3 a week | lineup value 0.8
12517 | Colston Loveland | TE | age 22 | CHI | market 5257 | projected 59.9 (12 a week) | last 3 weeks 18.7 a week | lineup value 20.2
7526 | Jaylen Waddle | WR | age 27 | DEN | market 3996 | projected 59.8 (12 a week) | last 3 weeks 12.5 a week | lineup value 29.2
8183 | Brock Purdy | QB | age 26 | SF | market 5405 | projected 58 (11.6 a week) | last 3 weeks 0 a week | lineup value 4
12617 | Demetrius Knight | LB | age 26 | CIN | market 0 | projected 56 (11.2 a week) | last 3 weeks 12.3 a week | lineup value 5.4
10232 | Michael Wilson | WR | age 26 | ARI | market 3631 | projected 55.7 (11.1 a week) | last 3 weeks 5.4 a week | lineup value 16.2
11603 | AJ Barner | TE | age 24 | SEA | market 3556 | projected 54.5 (10.9 a week) | last 3 weeks 5.9 a week | lineup value 14.8
843 | Cameron Heyward | DL | age 37 | PIT | market 0 | projected 49.7 (9.9 a week) | last 3 weeks 10.1 a week | lineup value 38.4
11470 | Drake Thomas | LB | age 26 | SEA | market 0 | projected 48.9 (9.8 a week) | last 3 weeks 13.7 a week | lineup value 0
11017 | Dee Winters | LB | age 25 | DAL | market 0 | projected 48 (9.6 a week) | last 3 weeks 11.3 a week | lineup value 0
10903 | Quan Martin | DB | age 26 | WAS | market 0 | projected 34.9 (7 a week) | last 3 weeks 2 a week | lineup value 11
5946 | Jamel Dean | DB | age 30 | PIT | market 0 | projected 32.4 (6.5 a week) | last 3 weeks 5 a week | lineup value 8.5

PARTNER (partnerId 3): record 7-2, rank 4, points for 2476.1, contention window 0.88
9509 | Bijan Robinson | RB | age 24 | ATL | market 7440 | projected 119.5 (23.9 a week) | last 3 weeks 17.2 a week | lineup value 77
12527 | Ashton Jeanty | RB | age 22 | LV | market 6487 | projected 93.9 (18.8 a week) | last 3 weeks 9.4 a week | lineup value 51.4
6804 | Jordan Love | QB | age 27 | GB | market 5035 | projected 88.4 (17.7 a week) | last 3 weeks 17.6 a week | lineup value 88.4
10980 | SirVocea Dennis | LB | age 26 | TB | market 0 | projected 81.1 (16.2 a week) | last 3 weeks 17.4 a week | lineup value 22.6
5332 | Foyesade Oluokun | LB | age 31 | JAX | market 0 | projected 75.6 (15.1 a week) | last 3 weeks 8.3 a week | lineup value 17.1
8289 | Aidan Hutchinson | DL | age 26 | DET | market 0 | projected 68.4 (13.7 a week) | last 3 weeks 8.1 a week | lineup value 15.2
6485 | Azeez Al-Shaair | LB | age 29 | HOU | market 0 | projected 63.3 (12.7 a week) | last 3 weeks 11.3 a week | lineup value 4.8
8392 | Nick Cross | DB | age 25 | WAS | market 0 | projected 62 (12.4 a week) | last 3 weeks 11.2 a week | lineup value 19.5
8134 | Khalil Shakir | WR | age 26 | BUF | market 3136 | projected 61.9 (12.4 a week) | last 3 weeks 10.7 a week | lineup value 19.4
8136 | Rachaad White | RB | age 27 | WAS | market 3191 | projected 61 (12.2 a week) | last 3 weeks 7 a week | lineup value 21.7
11635 | Ladd McConkey | WR | age 24 | LAC | market 4589 | projected 56.1 (11.2 a week) | last 3 weeks 16 a week | lineup value 21.8
6911 | Brandon Jones | DB | age 28 | DEN | market 0 | projected 53.9 (10.8 a week) | last 3 weeks 10.8 a week | lineup value 13.2
8121 | Romeo Doubs | WR | age 26 | NE | market 3159 | projected 52.5 (10.5 a week) | last 3 weeks 12.9 a week | lineup value 10.2
7090 | Darnell Mooney | WR | age 28 | NYG | market 2367 | projected 49.7 (9.9 a week) | last 3 weeks 4.8 a week | lineup value 7.2
11728 | Jaden Hicks | DB | age 24 | KC | market 0 | projected 48.1 (9.6 a week) | last 3 weeks 3 a week | lineup value 6.6
4033 | David Njoku | TE | age 30 | LAC | market 2838 | projected 47.6 (9.5 a week) | last 3 weeks 5.9 a week | lineup value 24.2
5862 | Brian Burns | DL | age 28 | NYG | market 0 | projected 47.1 (9.4 a week) | last 3 weeks 22.8 a week | lineup value 3.4
5297 | Zach Sieler | DL | age 31 | MIA | market 0 | projected 45 (9 a week) | last 3 weeks 4.8 a week | lineup value 1.9
8132 | Tyler Allgeier | RB | age 26 | ARI | market 3906 | projected 44.2 (8.8 a week) | last 3 weeks 4.5 a week | lineup value 3.1
7672 | Ernest Jones | LB | age 26 | SEA | market 0 | projected 43.9 (8.8 a week) | last 3 weeks 11.6 a week | lineup value 6.3
8408 | Jordan Mason | RB | age 27 | MIN | market 3770 | projected 43.9 (8.8 a week) | last 3 weeks 8.3 a week | lineup value 2.3
8266 | Quay Walker | LB | age 26 | LV | market 0 | projected 43.7 (8.7 a week) | last 3 weeks 16.1 a week | lineup value 7.8

PARTNER (partnerId 5): record 5-4, rank 6, points for 2396.6, contention window 0.66
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

PARTNER (partnerId 4): record 8-1, rank 1, points for 2742.5, contention window 1
6904 | Jalen Hurts | QB | age 28 | PHI | market 6212 | projected 119 (23.8 a week) | last 3 weeks 17 a week | lineup value 72.7
8138 | James Cook | RB | age 27 | BUF | market 5810 | projected 106.9 (21.4 a week) | last 3 weeks 18.8 a week | lineup value 43
9488 | Jaxon Smith-Njigba | WR | age 24 | SEA | market 5795 | projected 106 (21.2 a week) | last 3 weeks 17.5 a week | lineup value 45.1
3198 | Derrick Henry | RB | age 32 | BAL | market 4990 | projected 101.4 (20.3 a week) | last 3 weeks 13.4 a week | lineup value 37.6
4866 | Saquon Barkley | RB | age 29 | PHI | market 5150 | projected 97.9 (19.6 a week) | last 3 weeks 15 a week | lineup value 34.1
5850 | Josh Jacobs | RB | age 28 | GB | market 4755 | projected 86.9 (17.4 a week) | last 3 weeks 20.3 a week | lineup value 35
10905 | Brian Branch | DB | age 24 | DET | market 0 | projected 85.2 (17 a week) | last 3 weeks 3.3 a week | lineup value 26.4
7588 | Javonte Williams | RB | age 26 | DAL | market 4843 | projected 81 (16.2 a week) | last 3 weeks 17.8 a week | lineup value 29.1
10880 | Jack Campbell | LB | age 26 | DET | market 0 | projected 76.2 (15.2 a week) | last 3 weeks 16.3 a week | lineup value 17.4
5859 | A.J. Brown | WR | age 29 | NE | market 4302 | projected 75.6 (15.1 a week) | last 3 weeks 9.4 a week | lineup value 14.7
8293 | Coby Bryant | DB | age 27 | CHI | market 0 | projected 74.2 (14.8 a week) | last 3 weeks 5.3 a week | lineup value 15.3
7553 | Kyle Pitts | TE | age 26 | ATL | market 3945 | projected 73.2 (14.6 a week) | last 3 weeks 18.6 a week | lineup value 18.9
8267 | Nakobe Dean | LB | age 25 | LV | market 0 | projected 69.9 (14 a week) | last 3 weeks 6.7 a week | lineup value 11
4199 | Aaron Jones | RB | age 31 | MIN | market 3391 | projected 69.5 (13.9 a week) | last 3 weeks 6.5 a week | lineup value 5.9
7648 | Nick Bolton | LB | age 26 | KC | market 0 | projected 69.2 (13.8 a week) | last 3 weeks 11 a week | lineup value 22.1
9228 | Bryce Young | QB | age 25 | CAR | market 4276 | projected 64.8 (13 a week) | last 3 weeks 5.1 a week | lineup value 18.5
3973 | Myles Garrett | DL | age 30 | LAR | market 0 | projected 61.1 (12.2 a week) | last 3 weeks 27 a week | lineup value 3.1
6888 | Antoine Winfield | DB | age 28 | TB | market 0 | projected 60.7 (12.1 a week) | last 3 weeks 11.5 a week | lineup value 1.8
10921 | Yaya Diaby | DL | age 27 | TB | market 0 | projected 59.2 (11.8 a week) | last 3 weeks 7.8 a week | lineup value 1.2
10892 | Will Anderson | DL | age 25 | HOU | market 0 | projected 57.8 (11.6 a week) | last 3 weeks 19.8 a week | lineup value 0.8
8323 | Jaquan Brisker | DB | age 27 | PIT | market 0 | projected 55.8 (11.2 a week) | last 3 weeks 12.6 a week | lineup value 0
11710 | Calen Bullock | DB | age 23 | HOU | market 0 | projected 53.1 (10.6 a week) | last 3 weeks 10.7 a week | lineup value 0

CANDIDATE DEALS (from a rules-based finder; points are the finder projections for the rest of the season):
c1 | partnerId 9 | I give Kyle Hamilton + Jake Ferguson (8339,8110) | I get Brandon Aiyuk + Dylan Sampson (6803,12469) | my points -70.4 | their points 60.3 | likelihood 0.64
c2 | partnerId 9 | I give Leonard Williams + Jake Ferguson (2311,8110) | I get Dylan Sampson (12469) | my points -58 | their points 53.4 | likelihood 0.64
c3 | partnerId 9 | I give Jalon Walker + Jake Ferguson (12568,8110) | I get Matthew Golden + Dylan Sampson (12501,12469) | my points -57.6 | their points 52.5 | likelihood 0.63
c4 | partnerId 3 | I give Jake Ferguson + Kyle Hamilton (8110,8339) | I get Tank Bigsby + Tory Horton (9225,12497) | my points -71.7 | their points 43.9 | likelihood 0.73
c5 | partnerId 5 | I give Tua Tagovailoa + Emeka Egbuka (6768,12514) | I get Kyler Murray (5849) | my points -113.7 | their points 88.2 | likelihood 0.68
c6 | partnerId 3 | I give Jake Ferguson (8110) | I get Tank Bigsby + Jaylin Noel (9225,12536) | my points -43.3 | their points 31.4 | likelihood 0.73
c7 | partnerId 4 | I give Kyle Hamilton + Jake Ferguson (8339,8110) | I get Jaylen Wright + Jonathon Brooks (11643,11583) | my points -72.5 | their points 20.6 | likelihood 0.73
c8 | partnerId 4 | I give Kyle Hamilton + Juwan Johnson (8339,7002) | I get Jaylen Wright (11643) | my points -69.4 | their points 18.3 | likelihood 0.51

Pick the best trades for my team.

=========== CASE 1180160590047531008-w4-r9 ===========
REPLY FILE: /Users/anik/workspace/chrome/sleeper/.eval-market/replies/suggest-v2/run1/1180160590047531008-w4-r9.json
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
Lineup slots: QB, QB, RB, RB, WR, WR, TE, FLEX, FLEX, FLEX, FLEX, DL, DL, LB, LB, DB, DB, IDP_FLEX, IDP_FLEX, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN. Superflex: yes. Tight end premium: yes. Points per reception: 1.
Columns: id | name | position | age | team | market value | projected points for the rest of the regular season (and per week) | points per week over the last three weeks played | lineup value (points my lineup loses if this player is removed).

MY TEAM (partnerId me): record 2-1, rank 6, points for 800, contention window 0.66
4984 | Josh Allen | QB | age 30 | BUF | market 7165 | projected 248.6 (22.6 a week) | last 3 weeks 26.1 a week | lineup value 233.4
7547 | Amon-Ra St. Brown | WR | age 26 | DET | market 5293 | projected 191.5 (17.4 a week) | last 3 weeks 23.6 a week | lineup value 125.7
11687 | Edgerrin Cooper | LB | age 24 | GB | market 0 | projected 189.4 (17.2 a week) | last 3 weeks 17.3 a week | lineup value 75.7
12512 | Quinshon Judkins | RB | age 22 | CLE | market 5390 | projected 175.8 (16 a week) | last 3 weeks 10.7 a week | lineup value 131.5
5726 | Robert Spillane | LB | age 30 | NE | market 0 | projected 168.2 (15.3 a week) | last 3 weeks 19.2 a week | lineup value 52.9
5022 | Dallas Goedert | TE | age 31 | PHI | market 3117 | projected 143.2 (13 a week) | last 3 weeks 9.9 a week | lineup value 79.9
7526 | Jaylen Waddle | WR | age 27 | DEN | market 3999 | projected 141.7 (12.9 a week) | last 3 weeks 13.9 a week | lineup value 77.2
12529 | TreVeyon Henderson | RB | age 23 | NE | market 5033 | projected 141.6 (12.9 a week) | last 3 weeks 9.5 a week | lineup value 97.3
12617 | Demetrius Knight | LB | age 26 | CIN | market 0 | projected 135.9 (12.4 a week) | last 3 weeks 12.2 a week | lineup value 24.6
12578 | Carson Schwesinger | LB | age 23 | CLE | market 0 | projected 135.4 (12.3 a week) | last 3 weeks 15 a week | lineup value 24.2
11086 | Ivan Pace | LB | age 25 | MIN | market 0 | projected 120.4 (10.9 a week) | last 3 weeks 13.7 a week | lineup value 10.9
11017 | Dee Winters | LB | age 25 | DAL | market 0 | projected 110.2 (10 a week) | last 3 weeks 14.5 a week | lineup value 0.7
11603 | AJ Barner | TE | age 24 | SEA | market 3536 | projected 101.2 (9.2 a week) | last 3 weeks 6.9 a week | lineup value 36.8
843 | Cameron Heyward | DL | age 37 | PIT | market 0 | projected 99.8 (9.1 a week) | last 3 weeks 12.8 a week | lineup value 99.8
7695 | Osa Odighizuwa | DL | age 28 | SF | market 0 | projected 92.8 (8.4 a week) | last 3 weeks 4 a week | lineup value 92.8
12517 | Colston Loveland | TE | age 22 | CHI | market 5250 | projected 92.2 (8.4 a week) | last 3 weeks 3.4 a week | lineup value 41.9
10232 | Michael Wilson | WR | age 26 | ARI | market 3633 | projected 85.7 (7.8 a week) | last 3 weeks 3.7 a week | lineup value 27.5
11562 | Spencer Rattler | QB | age 26 | NO | market 0 | projected 79.3 (7.2 a week) | last 3 weeks 16 a week | lineup value 64.2
8183 | Brock Purdy | QB | age 26 | SF | market 5411 | projected 78.7 (7.2 a week) | last 3 weeks 6.6 a week | lineup value 63.5
11720 | Marist Liufau | LB | age 25 | DAL | market 0 | projected 78.2 (7.1 a week) | last 3 weeks 1.3 a week | lineup value 0
7594 | Chuba Hubbard | RB | age 27 | CAR | market 4067 | projected 68.9 (6.3 a week) | last 3 weeks 18.3 a week | lineup value 32.3
4238 | Xavier Woods | DB | age 31 | CHI | market 0 | projected 64.2 (5.8 a week) | last 3 weeks 11.5 a week | lineup value 23.3
12668 | Marques Sigle | DB | age 24 | SF | market 0 | projected 63.8 (5.8 a week) | last 3 weeks 10 a week | lineup value 24.1
7669 | Paulson Adebo | DB | age 27 | NYG | market 0 | projected 63.1 (5.7 a week) | last 3 weeks 18.5 a week | lineup value 22.3
9494 | Marvin Mims | WR | age 24 | DEN | market 2779 | projected 55.9 (5.1 a week) | last 3 weeks 4.7 a week | lineup value 6.1
12501 | Matthew Golden | WR | age 23 | GB | market 3568 | projected 52.6 (4.8 a week) | last 3 weeks 5.4 a week | lineup value 12.9
4037 | Chris Godwin | WR | age 30 | TB | market 3092 | projected 48 (4.4 a week) | last 3 weeks 0 a week | lineup value 13.8
11638 | Ricky Pearsall | WR | age 26 | SF | market 2214 | projected 45.4 (4.1 a week) | last 3 weeks 15.3 a week | lineup value 17.2
10231 | Elijah Higgins | TE | age 25 | ARI | market 0 | projected 44.5 (4 a week) | last 3 weeks 4.5 a week | lineup value 0
12469 | Dylan Sampson | RB | age 22 | CLE | market 3739 | projected 44.4 (4 a week) | last 3 weeks 10.6 a week | lineup value 5.8

PARTNER (partnerId 4): record 3-0, rank 1, points for 935.8, contention window 1
6904 | Jalen Hurts | QB | age 28 | PHI | market 6256 | projected 228.6 (20.8 a week) | last 3 weeks 23.8 a week | lineup value 181.4
9488 | Jaxon Smith-Njigba | WR | age 24 | SEA | market 5794 | projected 204.7 (18.6 a week) | last 3 weeks 19.4 a week | lineup value 83.6
3198 | Derrick Henry | RB | age 32 | BAL | market 4982 | projected 204 (18.5 a week) | last 3 weeks 16.8 a week | lineup value 83.7
4866 | Saquon Barkley | RB | age 29 | PHI | market 5145 | projected 203 (18.5 a week) | last 3 weeks 19 a week | lineup value 82.1
7588 | Javonte Williams | RB | age 26 | DAL | market 4825 | projected 198.9 (18.1 a week) | last 3 weeks 22.7 a week | lineup value 78.2
5850 | Josh Jacobs | RB | age 28 | GB | market 4787 | projected 193.8 (17.6 a week) | last 3 weeks 17.5 a week | lineup value 84.1
7648 | Nick Bolton | LB | age 26 | KC | market 0 | projected 174.6 (15.9 a week) | last 3 weeks 16.5 a week | lineup value 61.3
10905 | Brian Branch | DB | age 24 | DET | market 0 | projected 153.2 (13.9 a week) | last 3 weeks 17.2 a week | lineup value 50.3
10880 | Jack Campbell | LB | age 26 | DET | market 0 | projected 153 (13.9 a week) | last 3 weeks 19.3 a week | lineup value 38.8
9228 | Bryce Young | QB | age 25 | CAR | market 4273 | projected 146.8 (13.3 a week) | last 3 weeks 15.3 a week | lineup value 99.6
8293 | Coby Bryant | DB | age 27 | CHI | market 0 | projected 141.4 (12.9 a week) | last 3 weeks 12.8 a week | lineup value 28.8
7553 | Kyle Pitts | TE | age 26 | ATL | market 3944 | projected 135.6 (12.3 a week) | last 3 weeks 14.5 a week | lineup value 39.5
5045 | Courtland Sutton | WR | age 31 | DEN | market 3172 | projected 130.5 (11.9 a week) | last 3 weeks 15.8 a week | lineup value 8.8
5859 | A.J. Brown | WR | age 29 | NE | market 4302 | projected 130.2 (11.8 a week) | last 3 weeks 10.8 a week | lineup value 20.7
8267 | Nakobe Dean | LB | age 25 | LV | market 0 | projected 124.4 (11.3 a week) | last 3 weeks 0 a week | lineup value 23.8
5967 | Tony Pollard | RB | age 29 | TEN | market 4019 | projected 123.8 (11.3 a week) | last 3 weeks 13.9 a week | lineup value 8.9
3973 | Myles Garrett | DL | age 30 | LAR | market 0 | projected 122.2 (11.1 a week) | last 3 weeks 24.3 a week | lineup value 10
6888 | Antoine Winfield | DB | age 28 | TB | market 0 | projected 121.3 (11 a week) | last 3 weeks 12.1 a week | lineup value 7.1
10921 | Yaya Diaby | DL | age 27 | TB | market 0 | projected 118.4 (10.8 a week) | last 3 weeks 10.6 a week | lineup value 6.2
11624 | Xavier Worthy | WR | age 23 | KC | market 3541 | projected 117.4 (10.7 a week) | last 3 weeks 0.1 a week | lineup value 3.8
10892 | Will Anderson | DL | age 25 | HOU | market 0 | projected 116.7 (10.6 a week) | last 3 weeks 19.2 a week | lineup value 6
8323 | Jaquan Brisker | DB | age 27 | PIT | market 0 | projected 113.6 (10.3 a week) | last 3 weeks 10.5 a week | lineup value 2.4

PARTNER (partnerId 10): record 3-0, rank 2, points for 852.7, contention window 1
8130 | Trey McBride | TE | age 26 | ARI | market 4874 | projected 234.5 (21.3 a week) | last 3 weeks 19.4 a week | lineup value 151.5
4892 | Baker Mayfield | QB | age 31 | TB | market 4401 | projected 198.1 (18 a week) | last 3 weeks 20.9 a week | lineup value 97.4
8155 | Breece Hall | RB | age 25 | NYJ | market 5139 | projected 176.1 (16 a week) | last 3 weeks 13 a week | lineup value 124.2
6815 | Zack Baun | LB | age 29 | PHI | market 0 | projected 168.7 (15.3 a week) | last 3 weeks 16.5 a week | lineup value 44.2
1373 | Geno Smith | QB | age 36 | NYJ | market 2552 | projected 167.8 (15.3 a week) | last 3 weeks 17.5 a week | lineup value 67.1
4070 | T.J. Watt | DL | age 32 | PIT | market 0 | projected 165.9 (15.1 a week) | last 3 weeks 18.2 a week | lineup value 62.2
4881 | Lamar Jackson | QB | age 29 | BAL | market 7042 | projected 165.4 (15 a week) | last 3 weeks 29.2 a week | lineup value 64.7
11604 | Brock Bowers | TE | age 23 | LV | market 5529 | projected 154.7 (14.1 a week) | last 3 weeks 16.6 a week | lineup value 89.3
10914 | Daiyan Henley | LB | age 26 | LAC | market 0 | projected 154 (14 a week) | last 3 weeks 22.2 a week | lineup value 28.2
8144 | Chris Olave | WR | age 26 | NO | market 4406 | projected 148 (13.5 a week) | last 3 weeks 13.2 a week | lineup value 71.1
5017 | Jessie Bates | DB | age 29 | ATL | market 0 | projected 147.8 (13.4 a week) | last 3 weeks 8 a week | lineup value 27.5
8659 | Nate Landman | LB | age 27 | LAR | market 0 | projected 145.3 (13.2 a week) | last 3 weeks 14.3 a week | lineup value 22.8
8151 | Kenneth Walker | RB | age 25 | KC | market 5529 | projected 144.8 (13.2 a week) | last 3 weeks 16.7 a week | lineup value 92.9
2449 | Stefon Diggs | WR | age 32 | WAS | market 2782 | projected 135.3 (12.3 a week) | last 3 weeks 8.7 a week | lineup value 63.5
6786 | CeeDee Lamb | WR | age 27 | DAL | market 4939 | projected 134.6 (12.2 a week) | last 3 weeks 13.4 a week | lineup value 77.7
5580 | Frankie Luvu | LB | age 30 | WAS | market 0 | projected 134.1 (12.2 a week) | last 3 weeks 7 a week | lineup value 9.3
6819 | Michael Pittman | WR | age 29 | PIT | market 2983 | projected 129.2 (11.7 a week) | last 3 weeks 15.8 a week | lineup value 52.4
7016 | Jeremy Chinn | DB | age 28 | LV | market 0 | projected 128.3 (11.7 a week) | last 3 weeks 10.5 a week | lineup value 8.4
6901 | Joshua Metellus | DB | age 28 | MIN | market 0 | projected 119.7 (10.9 a week) | last 3 weeks 11.3 a week | lineup value 1.9
6801 | Tee Higgins | WR | age 27 | CIN | market 4108 | projected 114.3 (10.4 a week) | last 3 weeks 7.8 a week | lineup value 48.6
8359 | Marcus Jones | DB | age 27 | NE | market 0 | projected 110.8 (10.1 a week) | last 3 weeks 8.5 a week | lineup value 1.2
11727 | Payton Wilson | LB | age 26 | PIT | market 0 | projected 107.8 (9.8 a week) | last 3 weeks 16.6 a week | lineup value 0

PARTNER (partnerId 5): record 2-1, rank 5, points for 810, contention window 0.77
9493 | Puka Nacua | WR | age 25 | LAR | market 5707 | projected 189.1 (17.2 a week) | last 3 weeks 24.7 a week | lineup value 123.4
8150 | Kyren Williams | RB | age 26 | LAR | market 5476 | projected 182.9 (16.6 a week) | last 3 weeks 18 a week | lineup value 139.5
7640 | Micah Parsons | DL | age 27 | GB | market 0 | projected 154.2 (14 a week) | last 3 weeks 8.6 a week | lineup value 43
6794 | Justin Jefferson | WR | age 27 | MIN | market 4806 | projected 154.1 (14 a week) | last 3 weeks 12.9 a week | lineup value 91
11705 | Tykee Smith | DB | age 25 | TB | market 0 | projected 149.8 (13.6 a week) | last 3 weeks 18.3 a week | lineup value 38.1
5991 | Maxx Crosby | DL | age 29 | LV | market 0 | projected 141.4 (12.9 a week) | last 3 weeks 15.5 a week | lineup value 28.5
1192 | Lavonte David | LB | age 36 | FA | market 0 | projected 132.6 (12.1 a week) | last 3 weeks 17.4 a week | lineup value 18.1
6790 | D'Andre Swift | RB | age 27 | CHI | market 4401 | projected 132.4 (12 a week) | last 3 weeks 14.2 a week | lineup value 90
4971 | Derwin James | DB | age 30 | LAC | market 0 | projected 131.2 (11.9 a week) | last 3 weeks 22.5 a week | lineup value 21.4
4960 | Roquan Smith | LB | age 29 | BAL | market 0 | projected 130.6 (11.9 a week) | last 3 weeks 28.8 a week | lineup value 40.4
4217 | George Kittle | TE | age 33 | SF | market 3132 | projected 128.8 (11.7 a week) | last 3 weeks 5.5 a week | lineup value 84.2
10916 | Kobie Turner | DL | age 27 | LAR | market 0 | projected 117 (10.6 a week) | last 3 weeks 7.9 a week | lineup value 4
8111 | Cade Otton | TE | age 27 | TB | market 2953 | projected 113.8 (10.3 a week) | last 3 weeks 2.8 a week | lineup value 53.5
7627 | Greg Rousseau | DL | age 26 | BUF | market 0 | projected 113.5 (10.3 a week) | last 3 weeks 5.2 a week | lineup value 3.5
4066 | Evan Engram | TE | age 32 | DEN | market 0 | projected 112.6 (10.2 a week) | last 3 weeks 3.8 a week | lineup value 52.5
5947 | Jakobi Meyers | WR | age 29 | JAX | market 3300 | projected 110 (10 a week) | last 3 weeks 13.3 a week | lineup value 44.4
11566 | Jayden Daniels | QB | age 25 | WAS | market 6969 | projected 107.2 (9.7 a week) | last 3 weeks 14.5 a week | lineup value 107.2
8364 | Trent McDuffie | DB | age 26 | LAR | market 0 | projected 105.9 (9.6 a week) | last 3 weeks 8.3 a week | lineup value 3.1
6811 | Kenneth Murray | LB | age 27 | HOU | market 0 | projected 104.2 (9.5 a week) | last 3 weeks 12.7 a week | lineup value 8.7
8329 | Devin Lloyd | LB | age 28 | CAR | market 0 | projected 98.1 (8.9 a week) | last 3 weeks 9.3 a week | lineup value 5.5
7069 | Alohi Gilman | DB | age 29 | KC | market 0 | projected 95.4 (8.7 a week) | last 3 weeks 8.3 a week | lineup value 16.5
11667 | Dallas Turner | DL | age 23 | MIN | market 0 | projected 95.1 (8.6 a week) | last 3 weeks 7.7 a week | lineup value 0

PARTNER (partnerId 7): record 2-1, rank 7, points for 791.2, contention window 0.55
6813 | Jonathan Taylor | RB | age 27 | IND | market 5885 | projected 252.6 (23 a week) | last 3 weeks 29 a week | lineup value 200.1
4046 | Patrick Mahomes | QB | age 31 | KC | market 5168 | projected 225 (20.5 a week) | last 3 weeks 22 a week | lineup value 225
8110 | Jake Ferguson | TE | age 27 | DAL | market 3453 | projected 168.5 (15.3 a week) | last 3 weeks 24.1 a week | lineup value 116.6
6768 | Tua Tagovailoa | QB | age 28 | ATL | market 2848 | projected 162.8 (14.8 a week) | last 3 weeks 13.8 a week | lineup value 162.8
12514 | Emeka Egbuka | WR | age 24 | TB | market 4524 | projected 149.2 (13.6 a week) | last 3 weeks 17.1 a week | lineup value 97
7002 | Juwan Johnson | TE | age 30 | NO | market 3106 | projected 141.6 (12.9 a week) | last 3 weeks 20.5 a week | lineup value 93.6
8339 | Kyle Hamilton | DB | age 25 | BAL | market 0 | projected 133.1 (12.1 a week) | last 3 weeks 15 a week | lineup value 51.7
1479 | Keenan Allen | WR | age 34 | IND | market 2138 | projected 125.3 (11.4 a week) | last 3 weeks 18.8 a week | lineup value 71.3
6788 | Xavier McKinney | DB | age 28 | GB | market 0 | projected 117.2 (10.7 a week) | last 3 weeks 10.3 a week | lineup value 26.5
11739 | Evan Williams | DB | age 25 | GB | market 0 | projected 115.9 (10.5 a week) | last 3 weeks 9.2 a week | lineup value 25.2
7659 | Tre'von Moehrig | DB | age 27 | CAR | market 0 | projected 115.2 (10.5 a week) | last 3 weeks 16 a week | lineup value 40.5
2311 | Leonard Williams | DL | age 32 | SEA | market 0 | projected 105.1 (9.6 a week) | last 3 weeks 11.9 a week | lineup value 25.1
3558 | Chris Jones | DL | age 32 | KC | market 0 | projected 97.3 (8.8 a week) | last 3 weeks 7.8 a week | lineup value 17.5
7637 | Zaven Collins | DL | age 27 | ARI | market 0 | projected 97 (8.8 a week) | last 3 weeks 8.8 a week | lineup value 17.9
8112 | Drake London | WR | age 25 | ATL | market 4853 | projected 93.1 (8.5 a week) | last 3 weeks 10.6 a week | lineup value 60.4
12568 | Jalon Walker | DL | age 22 | ATL | market 0 | projected 88.1 (8 a week) | last 3 weeks 6.9 a week | lineup value 23.4
5960 | T.J. Edwards | LB | age 30 | CHI | market 0 | projected 82.8 (7.5 a week) | last 3 weeks 1.3 a week | lineup value 38.9
11734 | Tyrice Knight | LB | age 25 | SEA | market 0 | projected 75.6 (6.9 a week) | last 3 weeks 10.7 a week | lineup value 15.4
10936 | Ji'Ayir Brown | DB | age 26 | SF | market 0 | projected 72.7 (6.6 a week) | last 3 weeks 2.5 a week | lineup value 6.3
4219 | Jeremy McNichols | RB | age 30 | WAS | market 0 | projected 70.8 (6.4 a week) | last 3 weeks 6 a week | lineup value 16.8
8205 | Isiah Pacheco | RB | age 27 | DET | market 3103 | projected 66.2 (6 a week) | last 3 weeks 6.5 a week | lineup value 24.6
12614 | Shemar James | LB | age 22 | DAL | market 0 | projected 64.2 (5.8 a week) | last 3 weeks 0 a week | lineup value 0

PARTNER (partnerId 3): record 2-1, rank 4, points for 810.6, contention window 0.88
9509 | Bijan Robinson | RB | age 24 | ATL | market 7435 | projected 238.2 (21.7 a week) | last 3 weeks 23.2 a week | lineup value 149.5
12527 | Ashton Jeanty | RB | age 22 | LV | market 6491 | projected 191.8 (17.4 a week) | last 3 weeks 11.7 a week | lineup value 106.5
6804 | Jordan Love | QB | age 27 | GB | market 5007 | projected 178.3 (16.2 a week) | last 3 weeks 17 a week | lineup value 178.3
8392 | Nick Cross | DB | age 25 | WAS | market 0 | projected 158.4 (14.4 a week) | last 3 weeks 15.7 a week | lineup value 53.5
10980 | SirVocea Dennis | LB | age 26 | TB | market 0 | projected 151.6 (13.8 a week) | last 3 weeks 14 a week | lineup value 40.8
8136 | Rachaad White | RB | age 27 | WAS | market 3224 | projected 151.2 (13.7 a week) | last 3 weeks 7.7 a week | lineup value 70.5
5332 | Foyesade Oluokun | LB | age 31 | JAX | market 0 | projected 150 (13.6 a week) | last 3 weeks 20.1 a week | lineup value 26.1
11635 | Ladd McConkey | WR | age 24 | LAC | market 4589 | projected 140.2 (12.7 a week) | last 3 weeks 10.4 a week | lineup value 53.1
8289 | Aidan Hutchinson | DL | age 26 | DET | market 0 | projected 137.2 (12.5 a week) | last 3 weeks 10 a week | lineup value 25.5
6911 | Brandon Jones | DB | age 28 | DEN | market 0 | projected 134.5 (12.2 a week) | last 3 weeks 16.3 a week | lineup value 29.3
6485 | Azeez Al-Shaair | LB | age 29 | HOU | market 0 | projected 127.8 (11.6 a week) | last 3 weeks 15.2 a week | lineup value 7.6
8408 | Jordan Mason | RB | age 27 | MIN | market 3738 | projected 122.1 (11.1 a week) | last 3 weeks 15.3 a week | lineup value 37.1
11728 | Jaden Hicks | DB | age 24 | KC | market 0 | projected 121.3 (11 a week) | last 3 weeks 4 a week | lineup value 10.8
8266 | Quay Walker | LB | age 26 | LV | market 0 | projected 120.2 (10.9 a week) | last 3 weeks 19 a week | lineup value 21.4
8134 | Khalil Shakir | WR | age 26 | BUF | market 3135 | projected 119.3 (10.8 a week) | last 3 weeks 9.7 a week | lineup value 32.3
5862 | Brian Burns | DL | age 28 | NYG | market 0 | projected 117.4 (10.7 a week) | last 3 weeks 25 a week | lineup value 4.8
7672 | Ernest Jones | LB | age 26 | SEA | market 0 | projected 115.1 (10.5 a week) | last 3 weeks 17.9 a week | lineup value 12.1
5297 | Zach Sieler | DL | age 31 | MIA | market 0 | projected 109.8 (10 a week) | last 3 weeks 5.7 a week | lineup value 1.9
9758 | C.J. Stroud | QB | age 25 | HOU | market 4697 | projected 106.9 (9.7 a week) | last 3 weeks 13.2 a week | lineup value 106.9
8121 | Romeo Doubs | WR | age 26 | NE | market 3160 | projected 104.8 (9.5 a week) | last 3 weeks 8.4 a week | lineup value 16.5
4033 | David Njoku | TE | age 30 | LAC | market 2843 | projected 98.2 (8.9 a week) | last 3 weeks 11.9 a week | lineup value 64.8
6783 | Jerry Jeudy | WR | age 27 | CLE | market 2697 | projected 97.2 (8.8 a week) | last 3 weeks 8.5 a week | lineup value 12.8

PARTNER (partnerId 6): record 3-0, rank 3, points for 845.3, contention window 0.98
9221 | Jahmyr Gibbs | RB | age 24 | DET | market 7255 | projected 234.7 (21.3 a week) | last 3 weeks 23.3 a week | lineup value 155.8
6797 | Justin Herbert | QB | age 28 | LAC | market 5745 | projected 206.4 (18.8 a week) | last 3 weeks 22 a week | lineup value 206.4
12518 | Tyler Warren | TE | age 24 | IND | market 4614 | projected 178.6 (16.2 a week) | last 3 weeks 16 a week | lineup value 102.4
8280 | Nik Bonitto | DL | age 27 | DEN | market 0 | projected 174.5 (15.9 a week) | last 3 weeks 18.6 a week | lineup value 90
7564 | Ja'Marr Chase | WR | age 26 | CIN | market 5801 | projected 164.7 (15 a week) | last 3 weeks 18.1 a week | lineup value 94.5
7543 | Travis Etienne | RB | age 27 | NO | market 4678 | projected 156.4 (14.2 a week) | last 3 weeks 18.8 a week | lineup value 77.5
96 | Aaron Rodgers | QB | age 42 | PIT | market 2683 | projected 150.2 (13.7 a week) | last 3 weeks 17.3 a week | lineup value 150.1
2617 | Alex Singleton | LB | age 32 | DEN | market 0 | projected 141 (12.8 a week) | last 3 weeks 13.5 a week | lineup value 64.6
1339 | Zach Ertz | TE | age 35 | PHI | market 0 | projected 140.3 (12.8 a week) | last 3 weeks 16.3 a week | lineup value 64.1
7525 | DeVonta Smith | WR | age 27 | PHI | market 4148 | projected 139.1 (12.6 a week) | last 3 weeks 11.3 a week | lineup value 64
4081 | Budda Baker | DB | age 30 | ARI | market 0 | projected 136.7 (12.4 a week) | last 3 weeks 13.5 a week | lineup value 56
12567 | Malaki Starks | DB | age 22 | BAL | market 0 | projected 132.8 (12.1 a week) | last 3 weeks 11.3 a week | lineup value 59.8
7567 | Kenny Gainwell | RB | age 27 | TB | market 3581 | projected 118.2 (10.7 a week) | last 3 weeks 9.6 a week | lineup value 44.1
11620 | Rome Odunze | WR | age 24 | CHI | market 4050 | projected 117.2 (10.7 a week) | last 3 weeks 20.9 a week | lineup value 45.9
10881 | Christian Gonzalez | DB | age 24 | NE | market 0 | projected 102.1 (9.3 a week) | last 3 weeks 0 a week | lineup value 27.3
7346 | Christian Rozeboom | LB | age 29 | TB | market 0 | projected 101.4 (9.2 a week) | last 3 weeks 12.7 a week | lineup value 33.7
10859 | Sam LaPorta | TE | age 25 | DET | market 4237 | projected 99.6 (9.1 a week) | last 3 weeks 13.3 a week | lineup value 40.9
10883 | Will McDonald | DL | age 27 | NYJ | market 0 | projected 97.9 (8.9 a week) | last 3 weeks 12.8 a week | lineup value 17
12481 | Cam Skattebo | RB | age 24 | NYG | market 4986 | projected 87.9 (8 a week) | last 3 weeks 15.2 a week | lineup value 44.4
3256 | Javon Hargrave | DL | age 33 | GB | market 0 | projected 85.3 (7.8 a week) | last 3 weeks 11.7 a week | lineup value 3
6124 | Montez Sweat | DL | age 30 | CHI | market 0 | projected 82 (7.5 a week) | last 3 weeks 10.7 a week | lineup value 1.7
10940 | Nick Herbig | DL | age 24 | PIT | market 0 | projected 80.8 (7.3 a week) | last 3 weeks 13.3 a week | lineup value 6.8

CANDIDATE DEALS (from a rules-based finder; points are the finder projections for the rest of the season):
c1 | partnerId 4 | I give Robert Spillane (5726) | I get Jaquan Brisker + Yaya Diaby (8323,10921) | my points 48.5 | their points 42.1 | likelihood 0.8
c2 | partnerId 10 | I give Edgerrin Cooper (11687) | I get Joshua Metellus + Jeremy Chinn (6901,7016) | my points 40.7 | their points 43.9 | likelihood 0.8
c3 | partnerId 10 | I give Robert Spillane (5726) | I get Joshua Metellus + Marcus Jones (6901,8359) | my points 46.1 | their points 32.7 | likelihood 0.8
c4 | partnerId 5 | I give Spencer Rattler + Dee Winters (11562,11017) | I get Derwin James + Kobie Turner (4971,10916) | my points 44 | their points 42.6 | likelihood 0.78
c5 | partnerId 4 | I give Robert Spillane + Dee Winters (5726,11017) | I get Jaquan Brisker + Calen Bullock (8323,11710) | my points 23.1 | their points 46.9 | likelihood 0.8
c6 | partnerId 5 | I give Spencer Rattler (11562) | I get Derwin James + Greg Rousseau (4971,7627) | my points 41.9 | their points 37.4 | likelihood 0.78
c7 | partnerId 4 | I give Edgerrin Cooper (11687) | I get Jaquan Brisker + Antoine Winfield (8323,6888) | my points 17.2 | their points 60.5 | likelihood 0.8
c8 | partnerId 7 | I give Demetrius Knight + Robert Spillane (12617,5726) | I get Kyle Hamilton + Xavier McKinney (8339,6788) | my points 44.9 | their points 49.2 | likelihood 0.76
c9 | partnerId 3 | I give Edgerrin Cooper + Elijah Higgins (11687,10231) | I get Jaden Hicks + Aidan Hutchinson (11728,8289) | my points 43.2 | their points 23.8 | likelihood 0.79
c10 | partnerId 5 | I give Edgerrin Cooper + Dee Winters (11687,11017) | I get Kobie Turner + Tykee Smith (10916,11705) | my points 35.1 | their points 35.5 | likelihood 0.78
c11 | partnerId 5 | I give Robert Spillane + Dee Winters (5726,11017) | I get Alohi Gilman + Kobie Turner (7069,10916) | my points 32.3 | their points 36.4 | likelihood 0.78
c12 | partnerId 6 | I give Ivan Pace (11086) | I get Greg Newsome + Javon Hargrave (7630,3256) | my points 31.9 | their points 29.5 | likelihood 0.8

Pick the best trades for my team.

=========== CASE 1180160590047531008-w7-r3 ===========
REPLY FILE: /Users/anik/workspace/chrome/sleeper/.eval-market/replies/suggest-v2/run1/1180160590047531008-w7-r3.json
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
Lineup slots: QB, QB, RB, RB, WR, WR, TE, FLEX, FLEX, FLEX, FLEX, DL, DL, LB, LB, DB, DB, IDP_FLEX, IDP_FLEX, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN. Superflex: yes. Tight end premium: yes. Points per reception: 1.
Columns: id | name | position | age | team | market value | projected points for the rest of the regular season (and per week) | points per week over the last three weeks played | lineup value (points my lineup loses if this player is removed).

MY TEAM (partnerId me): record 4-2, rank 4, points for 1701.8, contention window 0.88
9509 | Bijan Robinson | RB | age 24 | ATL | market 7431 | projected 192.9 (24.1 a week) | last 3 weeks 23.7 a week | lineup value 122.2
6804 | Jordan Love | QB | age 27 | GB | market 5025 | projected 141.5 (17.7 a week) | last 3 weeks 15.4 a week | lineup value 141.5
12527 | Ashton Jeanty | RB | age 22 | LV | market 6484 | projected 135 (16.9 a week) | last 3 weeks 25.9 a week | lineup value 74.3
10980 | SirVocea Dennis | LB | age 26 | TB | market 0 | projected 115.7 (14.5 a week) | last 3 weeks 14.3 a week | lineup value 34.1
8392 | Nick Cross | DB | age 25 | WAS | market 0 | projected 110.9 (13.9 a week) | last 3 weeks 17 a week | lineup value 32.9
5332 | Foyesade Oluokun | LB | age 31 | JAX | market 0 | projected 105.4 (13.2 a week) | last 3 weeks 18.8 a week | lineup value 21.7
8136 | Rachaad White | RB | age 27 | WAS | market 3221 | projected 103.9 (13 a week) | last 3 weeks 18.9 a week | lineup value 45.8
6485 | Azeez Al-Shaair | LB | age 29 | HOU | market 0 | projected 101.4 (12.7 a week) | last 3 weeks 5 a week | lineup value 7.6
11635 | Ladd McConkey | WR | age 24 | LAC | market 4591 | projected 97.9 (12.2 a week) | last 3 weeks 13.3 a week | lineup value 35.5
8289 | Aidan Hutchinson | DL | age 26 | DET | market 0 | projected 96.5 (12.1 a week) | last 3 weeks 23.7 a week | lineup value 19.6
6911 | Brandon Jones | DB | age 28 | DEN | market 0 | projected 94.1 (11.8 a week) | last 3 weeks 8.4 a week | lineup value 18
8266 | Quay Walker | LB | age 26 | LV | market 0 | projected 89.1 (11.1 a week) | last 3 weeks 11 a week | lineup value 17.6
8134 | Khalil Shakir | WR | age 26 | BUF | market 3136 | projected 86.5 (10.8 a week) | last 3 weeks 13.1 a week | lineup value 24.2
11728 | Jaden Hicks | DB | age 24 | KC | market 0 | projected 85.8 (10.7 a week) | last 3 weeks 4.3 a week | lineup value 8.9
8121 | Romeo Doubs | WR | age 26 | NE | market 3160 | projected 85.3 (10.7 a week) | last 3 weeks 13.4 a week | lineup value 14.9
8408 | Jordan Mason | RB | age 27 | MIN | market 3754 | projected 84 (10.5 a week) | last 3 weeks 9.5 a week | lineup value 14.5
5862 | Brian Burns | DL | age 28 | NYG | market 0 | projected 82.5 (10.3 a week) | last 3 weeks 20.1 a week | lineup value 4.7
9758 | C.J. Stroud | QB | age 25 | HOU | market 4699 | projected 78.3 (9.8 a week) | last 3 weeks 16.1 a week | lineup value 78.3
7090 | Darnell Mooney | WR | age 28 | NYG | market 2369 | projected 78.2 (9.8 a week) | last 3 weeks 0.8 a week | lineup value 8.7
5297 | Zach Sieler | DL | age 31 | MIA | market 0 | projected 76.4 (9.6 a week) | last 3 weeks 8 a week | lineup value 1.9
7672 | Ernest Jones | LB | age 26 | SEA | market 0 | projected 72.4 (9 a week) | last 3 weeks 17 a week | lineup value 9.6
8132 | Tyler Allgeier | RB | age 26 | ARI | market 3934 | projected 71.6 (8.9 a week) | last 3 weeks 9 a week | lineup value 3.8
10898 | Tuli Tuipulotu | DL | age 24 | LAC | market 0 | projected 66.2 (8.3 a week) | last 3 weeks 24.2 a week | lineup value 0
12619 | Jonas Sanker | DB | age 23 | NO | market 0 | projected 65.3 (8.2 a week) | last 3 weeks 10.6 a week | lineup value 0
6783 | Jerry Jeudy | WR | age 27 | CLE | market 2697 | projected 62.1 (7.8 a week) | last 3 weeks 6.9 a week | lineup value 2.8
12562 | Nic Scourton | DL | age 22 | CAR | market 0 | projected 59.8 (7.5 a week) | last 3 weeks 4.7 a week | lineup value 1.4
4033 | David Njoku | TE | age 30 | LAC | market 2842 | projected 59.4 (7.4 a week) | last 3 weeks 12.9 a week | lineup value 36.2
5908 | Amani Hooker | DB | age 28 | TEN | market 0 | projected 57.2 (7.1 a week) | last 3 weeks 7.7 a week | lineup value 0
9500 | Josh Downs | WR | age 25 | IND | market 3340 | projected 56.1 (7 a week) | last 3 weeks 11.3 a week | lineup value 3.3
12556 | Donovan Ezeiruaku | DL | age 23 | DAL | market 0 | projected 52.3 (6.5 a week) | last 3 weeks 8.7 a week | lineup value 0

PARTNER (partnerId 9): record 4-2, rank 6, points for 1622.2, contention window 0.66
4984 | Josh Allen | QB | age 30 | BUF | market 7161 | projected 174.8 (21.8 a week) | last 3 weeks 22.7 a week | lineup value 120.8
11687 | Edgerrin Cooper | LB | age 24 | GB | market 0 | projected 149.9 (18.7 a week) | last 3 weeks 10.5 a week | lineup value 50.7
7547 | Amon-Ra St. Brown | WR | age 26 | DET | market 5293 | projected 137.2 (17.2 a week) | last 3 weeks 19.3 a week | lineup value 82.5
12512 | Quinshon Judkins | RB | age 22 | CLE | market 5397 | projected 122 (15.2 a week) | last 3 weeks 16.7 a week | lineup value 72.1
3257 | Jacoby Brissett | QB | age 33 | ARI | market 2868 | projected 119.2 (14.9 a week) | last 3 weeks 0 a week | lineup value 65.2
5726 | Robert Spillane | LB | age 30 | NE | market 0 | projected 119.2 (14.9 a week) | last 3 weeks 16.3 a week | lineup value 32.2
12529 | TreVeyon Henderson | RB | age 23 | NE | market 5057 | projected 106.5 (13.3 a week) | last 3 weeks 8.8 a week | lineup value 55.2
5022 | Dallas Goedert | TE | age 31 | PHI | market 3119 | projected 104.5 (13.1 a week) | last 3 weeks 24.2 a week | lineup value 53.1
7526 | Jaylen Waddle | WR | age 27 | DEN | market 3996 | projected 102.6 (12.8 a week) | last 3 weeks 15.9 a week | lineup value 53.5
12578 | Carson Schwesinger | LB | age 23 | CLE | market 0 | projected 99.1 (12.4 a week) | last 3 weeks 13.7 a week | lineup value 12.2
12617 | Demetrius Knight | LB | age 26 | CIN | market 0 | projected 98.4 (12.3 a week) | last 3 weeks 16.8 a week | lineup value 11.2
11086 | Ivan Pace | LB | age 25 | MIN | market 0 | projected 96.2 (12 a week) | last 3 weeks 8.1 a week | lineup value 0.8
8122 | Zonovan Knight | RB | age 25 | ARI | market 0 | projected 89.1 (11.1 a week) | last 3 weeks 5.5 a week | lineup value 35.8
12517 | Colston Loveland | TE | age 22 | CHI | market 5251 | projected 87.2 (10.9 a week) | last 3 weeks 1.7 a week | lineup value 31.3
11017 | Dee Winters | LB | age 25 | DAL | market 0 | projected 83.1 (10.4 a week) | last 3 weeks 13 a week | lineup value 0
843 | Cameron Heyward | DL | age 37 | PIT | market 0 | projected 80.3 (10 a week) | last 3 weeks 1.7 a week | lineup value 72.7
11603 | AJ Barner | TE | age 24 | SEA | market 3547 | projected 76.3 (9.5 a week) | last 3 weeks 19.9 a week | lineup value 21.6
10232 | Michael Wilson | WR | age 26 | ARI | market 3632 | projected 68.2 (8.5 a week) | last 3 weeks 5.5 a week | lineup value 16.9
11470 | Drake Thomas | LB | age 26 | SEA | market 0 | projected 64.5 (8.1 a week) | last 3 weeks 0 a week | lineup value 0
8183 | Brock Purdy | QB | age 26 | SF | market 5406 | projected 58 (7.3 a week) | last 3 weeks 6.7 a week | lineup value 4.1
7594 | Chuba Hubbard | RB | age 27 | CAR | market 4072 | projected 52.5 (6.6 a week) | last 3 weeks 4 a week | lineup value 14.4
11842 | Tatum Bethune | LB | age 25 | SF | market 0 | projected 50.9 (6.4 a week) | last 3 weeks 0 a week | lineup value 0.4

PARTNER (partnerId 2): record 1-5, rank 12, points for 1355, contention window 0.02
11560 | Caleb Williams | QB | age 24 | CHI | market 7128 | projected 142.1 (17.8 a week) | last 3 weeks 11.7 a week | lineup value 142.1
7569 | Nico Collins | WR | age 27 | HOU | market 4426 | projected 112 (14 a week) | last 3 weeks 9.4 a week | lineup value 55
5846 | DK Metcalf | WR | age 28 | PIT | market 3431 | projected 105.8 (13.2 a week) | last 3 weeks 14.4 a week | lineup value 42.5
3214 | Hunter Henry | TE | age 31 | NE | market 3144 | projected 96.4 (12.1 a week) | last 3 weeks 10.4 a week | lineup value 41
10917 | Byron Young | DL | age 28 | LAR | market 0 | projected 92.5 (11.6 a week) | last 3 weeks 22.1 a week | lineup value 45.6
8126 | Wan'Dale Robinson | WR | age 25 | TEN | market 3419 | projected 91.2 (11.4 a week) | last 3 weeks 11.1 a week | lineup value 35.8
12640 | Teddye Buchanan | LB | age 24 | BAL | market 0 | projected 89.9 (11.2 a week) | last 3 weeks 18.1 a week | lineup value 15.2
6141 | Drue Tranquill | LB | age 31 | KC | market 0 | projected 88.6 (11.1 a week) | last 3 weeks 9.5 a week | lineup value 15.4
12591 | Xavier Watts | DB | age 24 | ATL | market 0 | projected 86.1 (10.8 a week) | last 3 weeks 7.5 a week | lineup value 3.4
11726 | Kamren Kinchens | DB | age 24 | LAR | market 0 | projected 85.5 (10.7 a week) | last 3 weeks 5.2 a week | lineup value 12.6
5871 | Zach Allen | DL | age 29 | DEN | market 0 | projected 80.5 (10.1 a week) | last 3 weeks 8 a week | lineup value 36.8
10213 | Tre Tucker | WR | age 25 | LV | market 2723 | projected 75.6 (9.5 a week) | last 3 weeks 9.3 a week | lineup value 18.6
6711 | Jalen Thompson | DB | age 28 | DAL | market 0 | projected 74.2 (9.3 a week) | last 3 weeks 9.7 a week | lineup value 1.3
7058 | Jaylinn Hawkins | DB | age 29 | BAL | market 0 | projected 68.6 (8.6 a week) | last 3 weeks 6.1 a week | lineup value 4.6
4988 | Nick Chubb | RB | age 30 | FA | market 2228 | projected 67.3 (8.4 a week) | last 3 weeks 8.4 a week | lineup value 20.1
8210 | Chig Okonkwo | TE | age 27 | WAS | market 3053 | projected 65.4 (8.2 a week) | last 3 weeks 10.6 a week | lineup value 11.1
10933 | DeMarvion Overshown | LB | age 26 | DAL | market 0 | projected 64 (8 a week) | last 3 weeks 0 a week | lineup value 2.3
8167 | Christian Watson | WR | age 27 | GB | market 3670 | projected 60.9 (7.6 a week) | last 3 weeks 0 a week | lineup value 7.9
11610 | Malik Washington | WR | age 25 | MIA | market 2843 | projected 60.9 (7.6 a week) | last 3 weeks 5 a week | lineup value 6.7
8311 | Terrel Bernard | LB | age 27 | BUF | market 0 | projected 60.8 (7.6 a week) | last 3 weeks 11.3 a week | lineup value 6.7
11700 | Dru Phillips | DB | age 24 | NYG | market 0 | projected 59.8 (7.5 a week) | last 3 weeks 12.9 a week | lineup value 0
8131 | Isaiah Likely | TE | age 26 | NYG | market 3466 | projected 56.4 (7.1 a week) | last 3 weeks 2.6 a week | lineup value 2.3

PARTNER (partnerId 8): record 2-4, rank 11, points for 1238.1, contention window 0.12
8138 | James Cook | RB | age 27 | BUF | market 5771 | projected 147.8 (18.5 a week) | last 3 weeks 15.6 a week | lineup value 107.4
5944 | Bobby Okereke | LB | age 30 | CAR | market 0 | projected 118 (14.7 a week) | last 3 weeks 10.8 a week | lineup value 64.4
11647 | Kimani Vidal | RB | age 25 | LAC | market 3409 | projected 113.3 (14.2 a week) | last 3 weeks 10 a week | lineup value 68.6
8137 | George Pickens | WR | age 25 | DAL | market 4756 | projected 105.6 (13.2 a week) | last 3 weeks 26.3 a week | lineup value 62
12508 | Jaxson Dart | QB | age 23 | NYG | market 6575 | projected 98.6 (12.3 a week) | last 3 weeks 22.3 a week | lineup value 98.6
11742 | Cedric Gray | LB | age 23 | TEN | market 0 | projected 87.2 (10.9 a week) | last 3 weeks 23 a week | lineup value 33.4
9753 | Zach Charbonnet | RB | age 25 | SEA | market 3823 | projected 81.8 (10.2 a week) | last 3 weeks 11.8 a week | lineup value 39.8
12489 | RJ Harvey | RB | age 25 | DEN | market 4356 | projected 81.6 (10.2 a week) | last 3 weeks 12.1 a week | lineup value 36.9
9754 | Quentin Johnston | WR | age 25 | LAC | market 3445 | projected 81.2 (10.2 a week) | last 3 weeks 10.3 a week | lineup value 36.5
12534 | Kyle Monangai | RB | age 24 | CHI | market 4561 | projected 78.7 (9.8 a week) | last 3 weeks 3 a week | lineup value 33.9
8286 | Dax Hill | DB | age 26 | CIN | market 0 | projected 77.8 (9.7 a week) | last 3 weeks 10.8 a week | lineup value 24.1
8385 | George Karlaftis | DL | age 25 | KC | market 0 | projected 72.8 (9.1 a week) | last 3 weeks 9.8 a week | lineup value 21.2
7600 | Pat Freiermuth | TE | age 27 | PIT | market 2338 | projected 66.8 (8.4 a week) | last 3 weeks 1 a week | lineup value 39.6
11682 | Cole Bishop | DB | age 23 | BUF | market 0 | projected 65.9 (8.2 a week) | last 3 weeks 12.6 a week | lineup value 14.9
11559 | Michael Penix | QB | age 26 | ATL | market 3111 | projected 61.8 (7.7 a week) | last 3 weeks 11.8 a week | lineup value 61.8
8269 | Jordan Davis | DL | age 26 | PHI | market 0 | projected 60.7 (7.6 a week) | last 3 weeks 6.3 a week | lineup value 14.7
4968 | Tremaine Edmunds | LB | age 28 | NYG | market 0 | projected 60.2 (7.5 a week) | last 3 weeks 11.3 a week | lineup value 22.9
6868 | DJ Wonnum | DL | age 28 | DET | market 0 | projected 59.6 (7.4 a week) | last 3 weeks 2 a week | lineup value 13.5
11656 | Nate Wiggins | DB | age 23 | BAL | market 0 | projected 59.2 (7.4 a week) | last 3 weeks 5 a week | lineup value 8.5
12499 | Elic Ayomanor | WR | age 23 | TEN | market 2910 | projected 52.2 (6.5 a week) | last 3 weeks 6 a week | lineup value 11.9
7611 | Rhamondre Stevenson | RB | age 28 | NE | market 4042 | projected 48.9 (6.1 a week) | last 3 weeks 9.1 a week | lineup value 25.2
7642 | Jaycee Horn | DB | age 26 | CAR | market 0 | projected 48.3 (6 a week) | last 3 weeks 1 a week | lineup value 3.5

PARTNER (partnerId 13): record 0-6, rank 14, points for 1175.5, contention window 0
11564 | Drake Maye | QB | age 24 | NE | market 7720 | projected 153.5 (19.2 a week) | last 3 weeks 21.9 a week | lineup value 24.4
3294 | Dak Prescott | QB | age 33 | DAL | market 4825 | projected 144.2 (18 a week) | last 3 weeks 27.9 a week | lineup value 12.1
11563 | Bo Nix | QB | age 26 | DEN | market 5806 | projected 139.3 (17.4 a week) | last 3 weeks 20.3 a week | lineup value 9.8
6807 | Patrick Queen | LB | age 27 | PIT | market 0 | projected 113.3 (14.2 a week) | last 3 weeks 15.1 a week | lineup value 43.7
6217 | Blake Cashman | LB | age 30 | MIN | market 0 | projected 110.4 (13.8 a week) | last 3 weeks 0 a week | lineup value 40.8
12506 | Harold Fannin | TE | age 22 | CLE | market 4708 | projected 97 (12.1 a week) | last 3 weeks 14.7 a week | lineup value 62.2
9756 | Jordan Addison | WR | age 24 | MIN | market 3609 | projected 85.9 (10.7 a week) | last 3 weeks 10.2 a week | lineup value 48.1
5346 | Zaire Franklin | LB | age 30 | GB | market 0 | projected 83.2 (10.4 a week) | last 3 weeks 15 a week | lineup value 22.6
6183 | Andrew Van Ginkel | DL | age 31 | MIN | market 0 | projected 82.6 (10.3 a week) | last 3 weeks 0 a week | lineup value 32.7
5872 | Deebo Samuel | WR | age 30 | SF | market 2751 | projected 81.4 (10.2 a week) | last 3 weeks 16.6 a week | lineup value 53.8
12545 | Tyler Shough | QB | age 27 | NO | market 4516 | projected 78.4 (9.8 a week) | last 3 weeks 0 a week | lineup value 0
7687 | Nahshon Wright | DB | age 28 | NYJ | market 0 | projected 72.9 (9.1 a week) | last 3 weeks 8.5 a week | lineup value 6.2
5847 | Dexter Lawrence | DL | age 28 | CIN | market 0 | projected 67.7 (8.5 a week) | last 3 weeks 8.6 a week | lineup value 12.5
5893 | C.J. Gardner-Johnson | DB | age 28 | BUF | market 0 | projected 65.5 (8.2 a week) | last 3 weeks 0 a week | lineup value 10.5
5036 | Justin Reid | DB | age 29 | NO | market 0 | projected 62.2 (7.8 a week) | last 3 weeks 3.3 a week | lineup value 10.1
6784 | Derrick Brown | DL | age 28 | CAR | market 0 | projected 59.2 (7.4 a week) | last 3 weeks 9 a week | lineup value 6.2
9479 | Darnell Washington | TE | age 25 | PIT | market 0 | projected 58.2 (7.3 a week) | last 3 weeks 6.7 a week | lineup value 20.3
4191 | Matt Milano | LB | age 31 | FA | market 0 | projected 57.9 (7.2 a week) | last 3 weeks 3 a week | lineup value 10
12490 | Bhayshul Tuten | RB | age 23 | JAX | market 5002 | projected 55.4 (6.9 a week) | last 3 weeks 4.7 a week | lineup value 50.4
6291 | Donovan Wilson | DB | age 31 | FA | market 0 | projected 55.1 (6.9 a week) | last 3 weeks 14.2 a week | lineup value 7.5
12486 | Dillon Gabriel | QB | age 25 | CLE | market 0 | projected 53.6 (6.7 a week) | last 3 weeks 8.4 a week | lineup value 0
4381 | Taysom Hill | TE | age 35 | FA | market 1749 | projected 48 (6 a week) | last 3 weeks 2.7 a week | lineup value 14.6

PARTNER (partnerId 11): record 0-6, rank 13, points for 1396.2, contention window 0
421 | Matthew Stafford | QB | age 38 | LAR | market 4006 | projected 126.7 (15.8 a week) | last 3 weeks 21.4 a week | lineup value 87.4
3233 | Kevin Byard | DB | age 33 | NE | market 0 | projected 104.6 (13.1 a week) | last 3 weeks 14.9 a week | lineup value 30.2
7841 | Jamien Sherwood | LB | age 26 | NYJ | market 0 | projected 100.9 (12.6 a week) | last 3 weeks 16.3 a week | lineup value 28.4
5894 | Germaine Pratt | LB | age 30 | IND | market 0 | projected 98.3 (12.3 a week) | last 3 weeks 10 a week | lineup value 21.7
7811 | Talanoa Hufanga | DB | age 26 | DEN | market 0 | projected 93.4 (11.7 a week) | last 3 weeks 12.6 a week | lineup value 25.2
12522 | Cam Ward | QB | age 24 | TEN | market 4565 | projected 92.6 (11.6 a week) | last 3 weeks 7.9 a week | lineup value 53.3
4144 | Jonnu Smith | TE | age 31 | GB | market 0 | projected 85.6 (10.7 a week) | last 3 weeks 4.5 a week | lineup value 61.7
8148 | Jameson Williams | WR | age 25 | DET | market 4121 | projected 85.6 (10.7 a week) | last 3 weeks 8.9 a week | lineup value 55
6860 | Akeem Davis-Gaither | LB | age 29 | IND | market 0 | projected 80.5 (10.1 a week) | last 3 weeks 9.2 a week | lineup value 9.1
6799 | Grant Delpit | DB | age 28 | CLE | market 0 | projected 80.3 (10 a week) | last 3 weeks 7.8 a week | lineup value 12.6
8676 | Rashid Shaheed | WR | age 28 | SEA | market 2708 | projected 78.9 (9.9 a week) | last 3 weeks 12.6 a week | lineup value 43.9
1052 | Demario Davis | LB | age 37 | NYJ | market 0 | projected 77.5 (9.7 a week) | last 3 weeks 14.5 a week | lineup value 0.9
6119 | Devin White | LB | age 28 | DET | market 0 | projected 73.7 (9.2 a week) | last 3 weeks 21 a week | lineup value 6.4
4035 | Alvin Kamara | RB | age 31 | NO | market 3031 | projected 73.4 (9.2 a week) | last 3 weeks 13.3 a week | lineup value 52
11435 | Emanuel Wilson | RB | age 27 | SEA | market 2953 | projected 64.9 (8.1 a week) | last 3 weeks 5 a week | lineup value 38
6806 | J.K. Dobbins | RB | age 27 | DEN | market 4036 | projected 63 (7.9 a week) | last 3 weeks 13.6 a week | lineup value 47.2
1166 | Kirk Cousins | QB | age 38 | LV | market 2170 | projected 60.1 (7.5 a week) | last 3 weeks 0 a week | lineup value 20.8
8125 | Calvin Austin | WR | age 27 | NYG | market 0 | projected 56.1 (7 a week) | last 3 weeks 1.1 a week | lineup value 24.7
3174 | Leonard Floyd | DL | age 33 | FA | market 0 | projected 52 (6.5 a week) | last 3 weeks 4.4 a week | lineup value 31.1
11686 | Javon Bullard | DB | age 24 | GB | market 0 | projected 50.6 (6.3 a week) | last 3 weeks 5 a week | lineup value 0
7921 | Christian Elliss | LB | age 27 | NE | market 0 | projected 47.4 (5.9 a week) | last 3 weeks 11.8 a week | lineup value 0
6149 | Darius Slayton | WR | age 29 | IND | market 0 | projected 46.3 (5.8 a week) | last 3 weeks 3.8 a week | lineup value 22.6

PARTNER (partnerId 1): record 2-4, rank 10, points for 1348.7, contention window 0.23
5870 | Daniel Jones | QB | age 29 | IND | market 3938 | projected 131.7 (16.5 a week) | last 3 weeks 18 a week | lineup value 66.9
10229 | Rashee Rice | WR | age 26 | KC | market 4427 | projected 122.9 (15.4 a week) | last 3 weeks 0 a week | lineup value 85
9224 | Chase Brown | RB | age 26 | CIN | market 5402 | projected 121.9 (15.2 a week) | last 3 weeks 12.1 a week | lineup value 85.4
4943 | Sam Darnold | QB | age 29 | SEA | market 4229 | projected 120.7 (15.1 a week) | last 3 weeks 21.9 a week | lineup value 55.9
10949 | Chamarri Conner | DB | age 26 | KC | market 0 | projected 107.6 (13.4 a week) | last 3 weeks 13.7 a week | lineup value 37.6
9997 | Zay Flowers | WR | age 26 | BAL | market 4205 | projected 104.3 (13 a week) | last 3 weeks 12.4 a week | lineup value 67.6
11665 | Jared Verse | DL | age 25 | CLE | market 0 | projected 92.4 (11.6 a week) | last 3 weeks 22.3 a week | lineup value 37.9
5843 | Devin Bush | LB | age 28 | CHI | market 0 | projected 92.3 (11.5 a week) | last 3 weeks 14.7 a week | lineup value 38.8
11565 | J.J. McCarthy | QB | age 23 | NYG | market 3497 | projected 86.1 (10.8 a week) | last 3 weeks 0 a week | lineup value 21.3
6333 | Keisean Nixon | DB | age 29 | GB | market 0 | projected 85.9 (10.7 a week) | last 3 weeks 8.7 a week | lineup value 5.6
11597 | Theo Johnson | TE | age 25 | NYG | market 3204 | projected 84.9 (10.6 a week) | last 3 weeks 15.9 a week | lineup value 50.9
11678 | Cooper DeJean | DB | age 23 | PHI | market 0 | projected 84.6 (10.6 a week) | last 3 weeks 10.2 a week | lineup value 13.5
12533 | Jacory Croskey-Merritt | RB | age 25 | WAS | market 3957 | projected 83.9 (10.5 a week) | last 3 weeks 16 a week | lineup value 49.2
8838 | Isaiah Pola-Mao | DB | age 27 | LV | market 0 | projected 79 (9.9 a week) | last 3 weeks 6.7 a week | lineup value 8.4
7113 | Alex Highsmith | DL | age 29 | PIT | market 0 | projected 72.2 (9 a week) | last 3 weeks 3.1 a week | lineup value 21.4
12605 | Jacob Parrish | DB | age 22 | TB | market 0 | projected 65.4 (8.2 a week) | last 3 weeks 4.5 a week | lineup value 0
12574 | Abdul Carter | DL | age 22 | NYG | market 0 | projected 64.2 (8 a week) | last 3 weeks 4 a week | lineup value 9.2
11676 | Mike Sainristil | DB | age 26 | WAS | market 0 | projected 62.4 (7.8 a week) | last 3 weeks 14.8 a week | lineup value 0
11669 | Laiatu Latu | DL | age 25 | IND | market 0 | projected 60.7 (7.6 a week) | last 3 weeks 12.5 a week | lineup value 3.7
12502 | Gunnar Helm | TE | age 24 | TEN | market 3235 | projected 58.1 (7.3 a week) | last 3 weeks 6.7 a week | lineup value 20.4
7667 | Tyson Campbell | DB | age 26 | CLE | market 0 | projected 58.1 (7.3 a week) | last 3 weeks 8.8 a week | lineup value 0.1
12566 | Jihaad Campbell | LB | age 22 | PHI | market 0 | projected 55.9 (7 a week) | last 3 weeks 14.8 a week | lineup value 6.9

CANDIDATE DEALS (from a rules-based finder; points are the finder projections for the rest of the season):
c1 | partnerId 9 | I give Brian Burns + Jaden Hicks (5862,11728) | I get Edgerrin Cooper (11687) | my points 34.4 | their points 76.4 | likelihood 0.77
c2 | partnerId 9 | I give Brian Burns + Brandon Jones (5862,6911) | I get Edgerrin Cooper + Robert Spillane (11687,5726) | my points 46.3 | their points 50.4 | likelihood 0.77
c3 | partnerId 2 | I give Tank Bigsby (9225) | I get Hunter Henry + DK Metcalf (3214,5846) | my points 69.2 | their points -87 | likelihood 0.86
c4 | partnerId 8 | I give Tank Bigsby (9225) | I get Kimani Vidal + Bobby Okereke (11647,5944) | my points 73.4 | their points -133 | likelihood 0.86
c5 | partnerId 2 | I give Tank Bigsby + Tory Horton (9225,12497) | I get Hunter Henry + Wan'Dale Robinson (3214,8126) | my points 63.3 | their points -78.6 | likelihood 0.87
c6 | partnerId 13 | I give Jalen McMillan (11618) | I get Deebo Samuel + Patrick Queen (5872,6807) | my points 32.5 | their points -97.4 | likelihood 0.9
c7 | partnerId 8 | I give Malik Willis + Tank Bigsby (8161,9225) | I get Kimani Vidal + RJ Harvey (11647,12489) | my points 64 | their points -113.7 | likelihood 0.85
c8 | partnerId 11 | I give Malik Willis (8161) | I get Matthew Stafford + Jameson Williams (421,8148) | my points 42 | their points -142.4 | likelihood 0.92
c9 | partnerId 8 | I give Tank Bigsby + Jalen McMillan (9225,11618) | I get Kimani Vidal (11647) | my points 46.3 | their points -68.6 | likelihood 0.86
c10 | partnerId 11 | I give Malik Willis + Jalen McMillan (8161,11618) | I get Matthew Stafford + J.K. Dobbins (421,6806) | my points 46.1 | their points -134.6 | likelihood 0.95
c11 | partnerId 11 | I give Tank Bigsby (9225) | I get Jonnu Smith + Alvin Kamara (4144,4035) | my points 48.1 | their points -113.9 | likelihood 0.95
c12 | partnerId 1 | I give Malik Willis + Tank Bigsby (8161,9225) | I get Zay Flowers + Theo Johnson (9997,11597) | my points 65.4 | their points -122 | likelihood 0.82

Pick the best trades for my team.

=========== CASE 1180160590047531008-w7-r7 ===========
REPLY FILE: /Users/anik/workspace/chrome/sleeper/.eval-market/replies/suggest-v2/run1/1180160590047531008-w7-r7.json
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
Lineup slots: QB, QB, RB, RB, WR, WR, TE, FLEX, FLEX, FLEX, FLEX, DL, DL, LB, LB, DB, DB, IDP_FLEX, IDP_FLEX, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN. Superflex: yes. Tight end premium: yes. Points per reception: 1.
Columns: id | name | position | age | team | market value | projected points for the rest of the regular season (and per week) | points per week over the last three weeks played | lineup value (points my lineup loses if this player is removed).

MY TEAM (partnerId me): record 3-3, rank 8, points for 1532.9, contention window 0.45
6813 | Jonathan Taylor | RB | age 27 | IND | market 5868 | projected 181.1 (22.6 a week) | last 3 weeks 27 a week | lineup value 149.4
4046 | Patrick Mahomes | QB | age 31 | KC | market 5166 | projected 161.7 (20.2 a week) | last 3 weeks 30.2 a week | lineup value 161.7
6768 | Tua Tagovailoa | QB | age 28 | ATL | market 2836 | projected 113.3 (14.2 a week) | last 3 weeks 16.3 a week | lineup value 113.3
8110 | Jake Ferguson | TE | age 27 | DAL | market 3453 | projected 112.9 (14.1 a week) | last 3 weeks 23.4 a week | lineup value 81.8
8339 | Kyle Hamilton | DB | age 25 | BAL | market 0 | projected 105.3 (13.2 a week) | last 3 weeks 6 a week | lineup value 42.8
12514 | Emeka Egbuka | WR | age 24 | TB | market 4518 | projected 102.7 (12.8 a week) | last 3 weeks 18.7 a week | lineup value 71.1
7002 | Juwan Johnson | TE | age 30 | NO | market 3108 | projected 96.1 (12 a week) | last 3 weeks 6 a week | lineup value 68.8
6788 | Xavier McKinney | DB | age 28 | GB | market 0 | projected 92.8 (11.6 a week) | last 3 weeks 5 a week | lineup value 21
11739 | Evan Williams | DB | age 25 | GB | market 0 | projected 91.7 (11.5 a week) | last 3 weeks 8 a week | lineup value 19.9
1479 | Keenan Allen | WR | age 34 | IND | market 2139 | projected 85.4 (10.7 a week) | last 3 weeks 10.7 a week | lineup value 52.1
7659 | Tre'von Moehrig | DB | age 27 | CAR | market 0 | projected 77.4 (9.7 a week) | last 3 weeks 10.7 a week | lineup value 23.3
2311 | Leonard Williams | DL | age 32 | SEA | market 0 | projected 74.1 (9.3 a week) | last 3 weeks 12.6 a week | lineup value 18.6
3558 | Chris Jones | DL | age 32 | KC | market 0 | projected 68.8 (8.6 a week) | last 3 weeks 3.8 a week | lineup value 13.5
7637 | Zaven Collins | DL | age 27 | ARI | market 0 | projected 67.7 (8.5 a week) | last 3 weeks 7 a week | lineup value 12.6
5960 | T.J. Edwards | LB | age 30 | CHI | market 0 | projected 66.4 (8.3 a week) | last 3 weeks 4.3 a week | lineup value 32.2
8112 | Drake London | WR | age 25 | ATL | market 4853 | projected 65.1 (8.1 a week) | last 3 weeks 19.6 a week | lineup value 48.2
12568 | Jalon Walker | DL | age 22 | ATL | market 0 | projected 61.4 (7.7 a week) | last 3 weeks 2.7 a week | lineup value 15.7
10936 | Ji'Ayir Brown | DB | age 26 | SF | market 0 | projected 52 (6.5 a week) | last 3 weeks 1.7 a week | lineup value 0.4
11734 | Tyrice Knight | LB | age 25 | SEA | market 0 | projected 46.8 (5.8 a week) | last 3 weeks 6.7 a week | lineup value 9
6782 | Chase Young | DL | age 27 | NO | market 0 | projected 46.6 (5.8 a week) | last 3 weeks 0.7 a week | lineup value 0.2
2353 | Denzel Perryman | LB | age 33 | LAC | market 0 | projected 45.6 (5.7 a week) | last 3 weeks 0 a week | lineup value 0
4219 | Jeremy McNichols | RB | age 30 | WAS | market 0 | projected 45.1 (5.6 a week) | last 3 weeks 3.9 a week | lineup value 11.8
6218 | E.J. Speed | LB | age 31 | HOU | market 0 | projected 44.8 (5.6 a week) | last 3 weeks 6.3 a week | lineup value 2.2
6039 | Ty Johnson | RB | age 29 | BUF | market 0 | projected 44.1 (5.5 a week) | last 3 weeks 1.5 a week | lineup value 13
12614 | Shemar James | LB | age 22 | DAL | market 0 | projected 43.8 (5.5 a week) | last 3 weeks 16.3 a week | lineup value 0
3156 | Joey Bosa | DL | age 30 | FA | market 0 | projected 40 (5 a week) | last 3 weeks 8.5 a week | lineup value 0
11834 | Devaughn Vele | WR | age 28 | NO | market 2272 | projected 38.3 (4.8 a week) | last 3 weeks 1.1 a week | lineup value 12.8
8205 | Isiah Pacheco | RB | age 27 | DET | market 3121 | projected 37.8 (4.7 a week) | last 3 weeks 10.9 a week | lineup value 16.9
12455 | Brashard Smith | RB | age 23 | KC | market 2995 | projected 32.9 (4.1 a week) | last 3 weeks 6.4 a week | lineup value 8.3
11630 | Roman Wilson | WR | age 25 | PIT | market 0 | projected 32.3 (4 a week) | last 3 weeks 0.7 a week | lineup value 7

PARTNER (partnerId 9): record 4-2, rank 6, points for 1622.2, contention window 0.66
4984 | Josh Allen | QB | age 30 | BUF | market 7161 | projected 174.8 (21.8 a week) | last 3 weeks 22.7 a week | lineup value 120.8
11687 | Edgerrin Cooper | LB | age 24 | GB | market 0 | projected 149.9 (18.7 a week) | last 3 weeks 10.5 a week | lineup value 50.7
7547 | Amon-Ra St. Brown | WR | age 26 | DET | market 5293 | projected 137.2 (17.2 a week) | last 3 weeks 19.3 a week | lineup value 82.5
12512 | Quinshon Judkins | RB | age 22 | CLE | market 5397 | projected 122 (15.2 a week) | last 3 weeks 16.7 a week | lineup value 72.1
3257 | Jacoby Brissett | QB | age 33 | ARI | market 2868 | projected 119.2 (14.9 a week) | last 3 weeks 0 a week | lineup value 65.2
5726 | Robert Spillane | LB | age 30 | NE | market 0 | projected 119.2 (14.9 a week) | last 3 weeks 16.3 a week | lineup value 32.2
12529 | TreVeyon Henderson | RB | age 23 | NE | market 5057 | projected 106.5 (13.3 a week) | last 3 weeks 8.8 a week | lineup value 55.2
5022 | Dallas Goedert | TE | age 31 | PHI | market 3119 | projected 104.5 (13.1 a week) | last 3 weeks 24.2 a week | lineup value 53.1
7526 | Jaylen Waddle | WR | age 27 | DEN | market 3996 | projected 102.6 (12.8 a week) | last 3 weeks 15.9 a week | lineup value 53.5
12578 | Carson Schwesinger | LB | age 23 | CLE | market 0 | projected 99.1 (12.4 a week) | last 3 weeks 13.7 a week | lineup value 12.2
12617 | Demetrius Knight | LB | age 26 | CIN | market 0 | projected 98.4 (12.3 a week) | last 3 weeks 16.8 a week | lineup value 11.2
11086 | Ivan Pace | LB | age 25 | MIN | market 0 | projected 96.2 (12 a week) | last 3 weeks 8.1 a week | lineup value 0.8
8122 | Zonovan Knight | RB | age 25 | ARI | market 0 | projected 89.1 (11.1 a week) | last 3 weeks 5.5 a week | lineup value 35.8
12517 | Colston Loveland | TE | age 22 | CHI | market 5251 | projected 87.2 (10.9 a week) | last 3 weeks 1.7 a week | lineup value 31.3
11017 | Dee Winters | LB | age 25 | DAL | market 0 | projected 83.1 (10.4 a week) | last 3 weeks 13 a week | lineup value 0
843 | Cameron Heyward | DL | age 37 | PIT | market 0 | projected 80.3 (10 a week) | last 3 weeks 1.7 a week | lineup value 72.7
11603 | AJ Barner | TE | age 24 | SEA | market 3547 | projected 76.3 (9.5 a week) | last 3 weeks 19.9 a week | lineup value 21.6
10232 | Michael Wilson | WR | age 26 | ARI | market 3632 | projected 68.2 (8.5 a week) | last 3 weeks 5.5 a week | lineup value 16.9
11470 | Drake Thomas | LB | age 26 | SEA | market 0 | projected 64.5 (8.1 a week) | last 3 weeks 0 a week | lineup value 0
8183 | Brock Purdy | QB | age 26 | SF | market 5406 | projected 58 (7.3 a week) | last 3 weeks 6.7 a week | lineup value 4.1
7594 | Chuba Hubbard | RB | age 27 | CAR | market 4072 | projected 52.5 (6.6 a week) | last 3 weeks 4 a week | lineup value 14.4
11842 | Tatum Bethune | LB | age 25 | SF | market 0 | projected 50.9 (6.4 a week) | last 3 weeks 0 a week | lineup value 0.4

PARTNER (partnerId 5): record 4-2, rank 5, points for 1673.1, contention window 0.77
4217 | George Kittle | TE | age 33 | SF | market 3133 | projected 128.8 (16.1 a week) | last 3 weeks 0 a week | lineup value 83.1
8150 | Kyren Williams | RB | age 26 | LAR | market 5454 | projected 128.6 (16.1 a week) | last 3 weeks 22.1 a week | lineup value 76.7
9493 | Puka Nacua | WR | age 25 | LAR | market 5709 | projected 125.2 (15.6 a week) | last 3 weeks 21.8 a week | lineup value 77.1
6794 | Justin Jefferson | WR | age 27 | MIN | market 4808 | projected 124.5 (15.6 a week) | last 3 weeks 14 a week | lineup value 72.4
7640 | Micah Parsons | DL | age 27 | GB | market 0 | projected 122 (15.2 a week) | last 3 weeks 5 a week | lineup value 33.6
4960 | Roquan Smith | LB | age 29 | BAL | market 0 | projected 114.5 (14.3 a week) | last 3 weeks 1.3 a week | lineup value 35.9
11705 | Tykee Smith | DB | age 25 | TB | market 0 | projected 109.3 (13.7 a week) | last 3 weeks 14.5 a week | lineup value 29.4
6790 | D'Andre Swift | RB | age 27 | CHI | market 4391 | projected 101.8 (12.7 a week) | last 3 weeks 15.7 a week | lineup value 57.9
5991 | Maxx Crosby | DL | age 29 | LV | market 0 | projected 96.7 (12.1 a week) | last 3 weeks 23.9 a week | lineup value 18.2
1192 | Lavonte David | LB | age 36 | FA | market 0 | projected 93.6 (11.7 a week) | last 3 weeks 16.9 a week | lineup value 13.4
4971 | Derwin James | DB | age 30 | LAC | market 0 | projected 91.5 (11.4 a week) | last 3 weeks 12.3 a week | lineup value 14.3
8111 | Cade Otton | TE | age 27 | TB | market 2954 | projected 87.2 (10.9 a week) | last 3 weeks 12.7 a week | lineup value 43.3
4066 | Evan Engram | TE | age 32 | DEN | market 0 | projected 84.7 (10.6 a week) | last 3 weeks 14.4 a week | lineup value 41.1
10916 | Kobie Turner | DL | age 27 | LAR | market 0 | projected 82.5 (10.3 a week) | last 3 weeks 4.8 a week | lineup value 3.9
11655 | Tyrone Tracy | RB | age 26 | NYG | market 3663 | projected 80 (10 a week) | last 3 weeks 0.5 a week | lineup value 35.7
7627 | Greg Rousseau | DL | age 26 | BUF | market 0 | projected 78.7 (9.8 a week) | last 3 weeks 11.7 a week | lineup value 3
11667 | Dallas Turner | DL | age 23 | MIN | market 0 | projected 77.9 (9.7 a week) | last 3 weeks 5.7 a week | lineup value 0
8364 | Trent McDuffie | DB | age 26 | LAR | market 0 | projected 74.9 (9.4 a week) | last 3 weeks 12.4 a week | lineup value 3.1
7069 | Alohi Gilman | DB | age 29 | KC | market 0 | projected 74.4 (9.3 a week) | last 3 weeks 7.8 a week | lineup value 16.5
6811 | Kenneth Murray | LB | age 27 | HOU | market 0 | projected 68.7 (8.6 a week) | last 3 weeks 10.5 a week | lineup value 7.3
5947 | Jakobi Meyers | WR | age 29 | JAX | market 3303 | projected 66.5 (8.3 a week) | last 3 weeks 7.7 a week | lineup value 18.4
5857 | Noah Fant | TE | age 28 | NO | market 0 | projected 64.8 (8.1 a week) | last 3 weeks 3.6 a week | lineup value 19.1

PARTNER (partnerId 4): record 5-1, rank 2, points for 1748.7, contention window 1
6904 | Jalen Hurts | QB | age 28 | PHI | market 6232 | projected 162.5 (20.3 a week) | last 3 weeks 21.4 a week | lineup value 147.4
5850 | Josh Jacobs | RB | age 28 | GB | market 4765 | projected 151.3 (18.9 a week) | last 3 weeks 23.9 a week | lineup value 69
9488 | Jaxon Smith-Njigba | WR | age 24 | SEA | market 5795 | projected 148.6 (18.6 a week) | last 3 weeks 23.7 a week | lineup value 67
3198 | Derrick Henry | RB | age 32 | BAL | market 4981 | projected 144.4 (18.1 a week) | last 3 weeks 14.2 a week | lineup value 63.5
7588 | Javonte Williams | RB | age 26 | DAL | market 4831 | projected 142 (17.8 a week) | last 3 weeks 21.4 a week | lineup value 60.8
4866 | Saquon Barkley | RB | age 29 | PHI | market 5145 | projected 139.5 (17.4 a week) | last 3 weeks 17.8 a week | lineup value 57.9
7648 | Nick Bolton | LB | age 26 | KC | market 0 | projected 123.4 (15.4 a week) | last 3 weeks 16.5 a week | lineup value 43.5
7553 | Kyle Pitts | TE | age 26 | ATL | market 3947 | projected 112.3 (14 a week) | last 3 weeks 10.3 a week | lineup value 39.5
10880 | Jack Campbell | LB | age 26 | DET | market 0 | projected 107.6 (13.5 a week) | last 3 weeks 19.7 a week | lineup value 26.7
8293 | Coby Bryant | DB | age 27 | CHI | market 0 | projected 102.8 (12.9 a week) | last 3 weeks 13.3 a week | lineup value 21.9
10905 | Brian Branch | DB | age 24 | DET | market 0 | projected 102.5 (12.8 a week) | last 3 weeks 10.5 a week | lineup value 32.9
9228 | Bryce Young | QB | age 25 | CAR | market 4279 | projected 95.4 (11.9 a week) | last 3 weeks 14.7 a week | lineup value 80.3
8267 | Nakobe Dean | LB | age 25 | LV | market 0 | projected 93.9 (11.7 a week) | last 3 weeks 0 a week | lineup value 15.8
10892 | Will Anderson | DL | age 25 | HOU | market 0 | projected 92.7 (11.6 a week) | last 3 weeks 3 a week | lineup value 4.2
4199 | Aaron Jones | RB | age 31 | MIN | market 3378 | projected 91.3 (11.4 a week) | last 3 weeks 0 a week | lineup value 11.5
5045 | Courtland Sutton | WR | age 31 | DEN | market 3175 | projected 90.9 (11.4 a week) | last 3 weeks 13.2 a week | lineup value 8.6
8323 | Jaquan Brisker | DB | age 27 | PIT | market 0 | projected 90.8 (11.4 a week) | last 3 weeks 7.2 a week | lineup value 2.2
5859 | A.J. Brown | WR | age 29 | NE | market 4304 | projected 88.3 (11 a week) | last 3 weeks 8.7 a week | lineup value 18.2
3973 | Myles Garrett | DL | age 30 | LAR | market 0 | projected 85.9 (10.7 a week) | last 3 weeks 5.3 a week | lineup value 5.8
6888 | Antoine Winfield | DB | age 28 | TB | market 0 | projected 85.6 (10.7 a week) | last 3 weeks 9.5 a week | lineup value 4.6
4983 | DJ Moore | WR | age 29 | BUF | market 3726 | projected 85.2 (10.7 a week) | last 3 weeks 6.1 a week | lineup value 0.9
11710 | Calen Bullock | DB | age 23 | HOU | market 0 | projected 84.9 (10.6 a week) | last 3 weeks 1.3 a week | lineup value 0

PARTNER (partnerId 3): record 4-2, rank 4, points for 1701.8, contention window 0.88
9509 | Bijan Robinson | RB | age 24 | ATL | market 7431 | projected 192.9 (24.1 a week) | last 3 weeks 23.7 a week | lineup value 122.2
6804 | Jordan Love | QB | age 27 | GB | market 5025 | projected 141.5 (17.7 a week) | last 3 weeks 15.4 a week | lineup value 141.5
12527 | Ashton Jeanty | RB | age 22 | LV | market 6484 | projected 135 (16.9 a week) | last 3 weeks 25.9 a week | lineup value 74.3
10980 | SirVocea Dennis | LB | age 26 | TB | market 0 | projected 115.7 (14.5 a week) | last 3 weeks 14.3 a week | lineup value 34.1
8392 | Nick Cross | DB | age 25 | WAS | market 0 | projected 110.9 (13.9 a week) | last 3 weeks 17 a week | lineup value 32.9
5332 | Foyesade Oluokun | LB | age 31 | JAX | market 0 | projected 105.4 (13.2 a week) | last 3 weeks 18.8 a week | lineup value 21.7
8136 | Rachaad White | RB | age 27 | WAS | market 3221 | projected 103.9 (13 a week) | last 3 weeks 18.9 a week | lineup value 45.8
6485 | Azeez Al-Shaair | LB | age 29 | HOU | market 0 | projected 101.4 (12.7 a week) | last 3 weeks 5 a week | lineup value 7.6
11635 | Ladd McConkey | WR | age 24 | LAC | market 4591 | projected 97.9 (12.2 a week) | last 3 weeks 13.3 a week | lineup value 35.5
8289 | Aidan Hutchinson | DL | age 26 | DET | market 0 | projected 96.5 (12.1 a week) | last 3 weeks 23.7 a week | lineup value 19.6
6911 | Brandon Jones | DB | age 28 | DEN | market 0 | projected 94.1 (11.8 a week) | last 3 weeks 8.4 a week | lineup value 18
8266 | Quay Walker | LB | age 26 | LV | market 0 | projected 89.1 (11.1 a week) | last 3 weeks 11 a week | lineup value 17.6
8134 | Khalil Shakir | WR | age 26 | BUF | market 3136 | projected 86.5 (10.8 a week) | last 3 weeks 13.1 a week | lineup value 24.2
11728 | Jaden Hicks | DB | age 24 | KC | market 0 | projected 85.8 (10.7 a week) | last 3 weeks 4.3 a week | lineup value 8.9
8121 | Romeo Doubs | WR | age 26 | NE | market 3160 | projected 85.3 (10.7 a week) | last 3 weeks 13.4 a week | lineup value 14.9
8408 | Jordan Mason | RB | age 27 | MIN | market 3754 | projected 84 (10.5 a week) | last 3 weeks 9.5 a week | lineup value 14.5
5862 | Brian Burns | DL | age 28 | NYG | market 0 | projected 82.5 (10.3 a week) | last 3 weeks 20.1 a week | lineup value 4.7
9758 | C.J. Stroud | QB | age 25 | HOU | market 4699 | projected 78.3 (9.8 a week) | last 3 weeks 16.1 a week | lineup value 78.3
7090 | Darnell Mooney | WR | age 28 | NYG | market 2369 | projected 78.2 (9.8 a week) | last 3 weeks 0.8 a week | lineup value 8.7
5297 | Zach Sieler | DL | age 31 | MIA | market 0 | projected 76.4 (9.6 a week) | last 3 weeks 8 a week | lineup value 1.9
7672 | Ernest Jones | LB | age 26 | SEA | market 0 | projected 72.4 (9 a week) | last 3 weeks 17 a week | lineup value 9.6
8132 | Tyler Allgeier | RB | age 26 | ARI | market 3934 | projected 71.6 (8.9 a week) | last 3 weeks 9 a week | lineup value 3.8

CANDIDATE DEALS (from a rules-based finder; points are the finder projections for the rest of the season):
c1 | partnerId 9 | I give Evan Williams + Chris Jones (11739,3558) | I get Demetrius Knight + Carson Schwesinger (12617,12578) | my points 44.5 | their points 87.1 | likelihood 0.77
c2 | partnerId 9 | I give Xavier McKinney + Chris Jones (6788,3558) | I get Ivan Pace + Carson Schwesinger (11086,12578) | my points 32 | their points 101 | likelihood 0.77
c3 | partnerId 5 | I give Mason Rudolph (4972) | I get Greg Rousseau + Michael Carter (7627,7607) | my points 15.8 | their points 8.1 | likelihood 0.78
c4 | partnerId 4 | I give T.J. Edwards + Jake Ferguson (5960,8110) | I get DJ Moore + Courtland Sutton (4983,5045) | my points -14 | their points 35.2 | likelihood 0.68
c5 | partnerId 3 | I give Juwan Johnson (7002) | I get Jerry Jeudy + Josh Downs (6783,9500) | my points -16.8 | their points 39.7 | likelihood 0.68
c6 | partnerId 4 | I give Jake Ferguson (8110) | I get DJ Moore + Jauan Jennings (4983,7049) | my points 5.2 | their points 23.5 | likelihood 0.5
c7 | partnerId 4 | I give Kyle Hamilton + Jake Ferguson (8339,8110) | I get Jauan Jennings + Marvin Harrison (7049,11628) | my points -51.6 | their points 40.8 | likelihood 0.58
c8 | partnerId 4 | I give Tua Tagovailoa (6768) | I get Jauan Jennings + Courtland Sutton (7049,5045) | my points -25.3 | their points 23.3 | likelihood 0.43

Pick the best trades for my team.

=========== CASE 1180184942900514816-w10-r9 ===========
REPLY FILE: /Users/anik/workspace/chrome/sleeper/.eval-market/replies/suggest-v2/run1/1180184942900514816-w10-r9.json
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
Lineup slots: QB, RB, RB, WR, WR, TE, FLEX, FLEX, FLEX, DEF, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN. Superflex: no. Tight end premium: no. Points per reception: 1.
Columns: id | name | position | age | team | market value | projected points for the rest of the regular season (and per week) | points per week over the last three weeks played | lineup value (points my lineup loses if this player is removed).

MY TEAM (partnerId me): record 8-1, rank 2, points for 1349.3, contention window 1
9221 | Jahmyr Gibbs | RB | age 24 | DET | market 6366 | projected 108.6 (21.7 a week) | last 3 weeks 14.2 a week | lineup value 53.3
9493 | Puka Nacua | WR | age 25 | LAR | market 5684 | projected 103.2 (20.6 a week) | last 3 weeks 7.6 a week | lineup value 47.8
3294 | Dak Prescott | QB | age 33 | DAL | market 3840 | projected 96.7 (19.3 a week) | last 3 weeks 17.8 a week | lineup value 36.5
11604 | Brock Bowers | TE | age 23 | LV | market 5530 | projected 81.9 (16.4 a week) | last 3 weeks 14.4 a week | lineup value 27.1
4866 | Saquon Barkley | RB | age 29 | PHI | market 4230 | projected 80.2 (16 a week) | last 3 weeks 12.9 a week | lineup value 24.9
5859 | A.J. Brown | WR | age 29 | NE | market 4310 | projected 75.6 (15.1 a week) | last 3 weeks 9.4 a week | lineup value 20.2
12545 | Tyler Shough | QB | age 27 | NO | market 3441 | projected 70.4 (14.1 a week) | last 3 weeks 3.7 a week | lineup value 16.1
8228 | Jaylen Warren | RB | age 27 | PIT | market 3535 | projected 69.5 (13.9 a week) | last 3 weeks 15.3 a week | lineup value 14.1
7543 | Travis Etienne | RB | age 27 | NO | market 3837 | projected 66.7 (13.3 a week) | last 3 weeks 7.7 a week | lineup value 11.4
8110 | Jake Ferguson | TE | age 27 | DAL | market 3459 | projected 44.1 (8.8 a week) | last 3 weeks 10 a week | lineup value 0
6801 | Tee Higgins | WR | age 27 | CIN | market 4114 | projected 43.4 (8.7 a week) | last 3 weeks 22 a week | lineup value 9.5
7002 | Juwan Johnson | TE | age 30 | NO | market 3114 | projected 43.2 (8.6 a week) | last 3 weeks 11.8 a week | lineup value 0.6
5844 | T.J. Hockenson | TE | age 29 | MIN | market 2958 | projected 41.8 (8.4 a week) | last 3 weeks 8 a week | lineup value 0
6770 | Joe Burrow | QB | age 29 | CIN | market 4803 | projected 41.1 (8.2 a week) | last 3 weeks 0 a week | lineup value 0
9500 | Josh Downs | WR | age 25 | IND | market 3345 | projected 37.4 (7.5 a week) | last 3 weeks 9.5 a week | lineup value 0
9508 | Tyjae Spears | RB | age 25 | TEN | market 2980 | projected 37.1 (7.4 a week) | last 3 weeks 11.1 a week | lineup value 0
8132 | Tyler Allgeier | RB | age 26 | ARI | market 3203 | projected 36.2 (7.2 a week) | last 3 weeks 3.9 a week | lineup value 0
9758 | C.J. Stroud | QB | age 25 | HOU | market 3596 | projected 35.9 (7.2 a week) | last 3 weeks 15.2 a week | lineup value 0
PHI | Philadelphia Eagles | DEF | age ? | PHI | market 0 | projected 35.2 (7 a week) | last 3 weeks 6 a week | lineup value 7
4033 | David Njoku | TE | age 30 | LAC | market 2845 | projected 33.8 (6.8 a week) | last 3 weeks 4.6 a week | lineup value 0
DEN | Denver Broncos | DEF | age ? | DEN | market 0 | projected 31.5 (6.3 a week) | last 3 weeks 5.7 a week | lineup value 3.3
9486 | Dontayvion Wicks | WR | age 25 | PHI | market 2549 | projected 29.1 (5.8 a week) | last 3 weeks 0.5 a week | lineup value 0
5927 | Terry McLaurin | WR | age 31 | WAS | market 3389 | projected 24.2 (4.8 a week) | last 3 weeks 4.8 a week | lineup value 1
10222 | Jayden Reed | WR | age 26 | GB | market 3363 | projected 7.1 (1.4 a week) | last 3 weeks 0 a week | lineup value 0
12473 | Mitchell Evans | TE | age 23 | CAR | market 0 | projected 7 (1.4 a week) | last 3 weeks 0 a week | lineup value 0
4017 | Deshaun Watson | QB | age 31 | CLE | market 1733 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0
9229 | Anthony Richardson | QB | age 24 | IND | market 0 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0

PARTNER (partnerId 8): record 2-7, rank 11, points for 1007.4, contention window 0
4892 | Baker Mayfield | QB | age 31 | TB | market 3400 | projected 109.4 (21.9 a week) | last 3 weeks 5.7 a week | lineup value 6.8
3257 | Jacoby Brissett | QB | age 33 | ARI | market 2217 | projected 97.6 (19.5 a week) | last 3 weeks 9.6 a week | lineup value 0
7525 | DeVonta Smith | WR | age 27 | PHI | market 4155 | projected 73.3 (14.7 a week) | last 3 weeks 15.9 a week | lineup value 36.2
8144 | Chris Olave | WR | age 26 | NO | market 4416 | projected 63.1 (12.6 a week) | last 3 weeks 16.5 a week | lineup value 34.4
5892 | David Montgomery | RB | age 29 | HOU | market 3463 | projected 55.3 (11.1 a week) | last 3 weeks 5.6 a week | lineup value 27
5947 | Jakobi Meyers | WR | age 29 | JAX | market 3297 | projected 54.7 (10.9 a week) | last 3 weeks 2.1 a week | lineup value 17.6
12493 | Oronde Gadsden | TE | age 23 | LAC | market 4194 | projected 45.5 (9.1 a week) | last 3 weeks 20 a week | lineup value 15.7
12485 | Tez Johnson | WR | age 24 | TB | market 0 | projected 41.2 (8.2 a week) | last 3 weeks 8.4 a week | lineup value 4.1
7591 | Justin Fields | QB | age 27 | KC | market 1384 | projected 36.9 (7.4 a week) | last 3 weeks 9 a week | lineup value 0
CLE | Cleveland Browns | DEF | age ? | CLE | market 0 | projected 36.6 (7.3 a week) | last 3 weeks 3.7 a week | lineup value 36.6
4144 | Jonnu Smith | TE | age 31 | GB | market 0 | projected 34.2 (6.8 a week) | last 3 weeks 7 a week | lineup value 6.5
8112 | Drake London | WR | age 25 | ATL | market 4857 | projected 33.5 (6.7 a week) | last 3 weeks 15.7 a week | lineup value 16.5
4066 | Evan Engram | TE | age 32 | DEN | market 0 | projected 32.8 (6.6 a week) | last 3 weeks 5.6 a week | lineup value 3
10219 | Chris Rodriguez | RB | age 27 | JAX | market 2758 | projected 30.8 (6.2 a week) | last 3 weeks 0 a week | lineup value 7.5
4988 | Nick Chubb | RB | age 30 | FA | market 1805 | projected 30.8 (6.2 a week) | last 3 weeks 4.8 a week | lineup value 2.5
6271 | Olamide Zaccheaus | WR | age 29 | ATL | market 0 | projected 30.1 (6 a week) | last 3 weeks 0 a week | lineup value 1.3
11626 | Xavier Legette | WR | age 25 | CAR | market 0 | projected 28.7 (5.7 a week) | last 3 weeks 10.4 a week | lineup value 0.3
11630 | Roman Wilson | WR | age 25 | PIT | market 0 | projected 20.9 (4.2 a week) | last 3 weeks 6.8 a week | lineup value 0
12495 | Ollie Gordon | RB | age 22 | MIA | market 0 | projected 17.1 (3.4 a week) | last 3 weeks 5.9 a week | lineup value 0
7594 | Chuba Hubbard | RB | age 27 | CAR | market 3362 | projected 16.1 (3.2 a week) | last 3 weeks 6.2 a week | lineup value 0
12541 | Dont'e Thornton | WR | age 23 | LV | market 0 | projected 10.2 (2 a week) | last 3 weeks 0 a week | lineup value 0
11596 | Ben Sinnott | TE | age 24 | WAS | market 0 | projected 2.8 (0.6 a week) | last 3 weeks 1.1 a week | lineup value 0

PARTNER (partnerId 10): record 3-6, rank 10, points for 966.2, contention window 0.05
3163 | Jared Goff | QB | age 32 | DET | market 3655 | projected 110 (22 a week) | last 3 weeks 11.9 a week | lineup value 31.9
12512 | Quinshon Judkins | RB | age 22 | CLE | market 4391 | projected 70.3 (14.1 a week) | last 3 weeks 10.4 a week | lineup value 34.6
7021 | Rico Dowdle | RB | age 28 | PIT | market 3259 | projected 64.1 (12.8 a week) | last 3 weeks 14.7 a week | lineup value 36.5
8183 | Brock Purdy | QB | age 26 | SF | market 4129 | projected 63.8 (12.8 a week) | last 3 weeks 0 a week | lineup value 1.8
8134 | Khalil Shakir | WR | age 26 | BUF | market 3138 | projected 61.9 (12.4 a week) | last 3 weeks 10.7 a week | lineup value 26.3
12489 | RJ Harvey | RB | age 25 | DEN | market 3728 | projected 48.8 (9.8 a week) | last 3 weeks 16 a week | lineup value 19.3
9753 | Zach Charbonnet | RB | age 25 | SEA | market 3186 | projected 46.7 (9.3 a week) | last 3 weeks 8.4 a week | lineup value 11.1
8142 | Alec Pierce | WR | age 26 | IND | market 3405 | projected 43.2 (8.6 a week) | last 3 weeks 13.7 a week | lineup value 13.5
8408 | Jordan Mason | RB | age 27 | MIN | market 3075 | projected 35.7 (7.1 a week) | last 3 weeks 6 a week | lineup value 0.8
11559 | Michael Penix | QB | age 26 | ATL | market 2362 | projected 33.8 (6.8 a week) | last 3 weeks 14.3 a week | lineup value 0
8131 | Isaiah Likely | TE | age 26 | NYG | market 3478 | projected 32.3 (6.5 a week) | last 3 weeks 3.9 a week | lineup value 9.2
11834 | Devaughn Vele | WR | age 28 | NO | market 2274 | projected 31.4 (6.3 a week) | last 3 weeks 0.7 a week | lineup value 2.9
4950 | Christian Kirk | WR | age 29 | SF | market 2202 | projected 31.1 (6.2 a week) | last 3 weeks 2.2 a week | lineup value 1.5
1426 | DeAndre Hopkins | WR | age 33 | FA | market 1500 | projected 27.7 (5.5 a week) | last 3 weeks 0.8 a week | lineup value 2.6
11631 | Brian Thomas | WR | age 24 | JAX | market 3928 | projected 23.3 (4.7 a week) | last 3 weeks 4.9 a week | lineup value 7.7
WAS | Washington Commanders | DEF | age ? | WAS | market 0 | projected 23.3 (4.7 a week) | last 3 weeks 2 a week | lineup value 23.3
12521 | Elijah Arroyo | TE | age 23 | SEA | market 0 | projected 20.9 (4.2 a week) | last 3 weeks 5.7 a week | lineup value 0
9482 | Michael Mayer | TE | age 25 | LV | market 0 | projected 15.8 (3.2 a week) | last 3 weeks 2.5 a week | lineup value 0.1
12536 | Jaylin Noel | WR | age 24 | HOU | market 2765 | projected 14.8 (3 a week) | last 3 weeks 7.6 a week | lineup value 0
12531 | Trevor Etienne | RB | age 22 | CAR | market 0 | projected 2.7 (0.5 a week) | last 3 weeks 0.5 a week | lineup value 0
8168 | Skyy Moore | WR | age 26 | GB | market 0 | projected 2 (0.4 a week) | last 3 weeks 1.9 a week | lineup value 0
8129 | Dameon Pierce | RB | age 26 | PHI | market 0 | projected 0.1 (0 a week) | last 3 weeks 0 a week | lineup value 0

PARTNER (partnerId 12): record 3-6, rank 9, points for 1081.9, contention window 0.18
5870 | Daniel Jones | QB | age 29 | IND | market 2895 | projected 78.5 (15.7 a week) | last 3 weeks 23.8 a week | lineup value 19.8
10229 | Rashee Rice | WR | age 26 | KC | market 4416 | projected 70.2 (14 a week) | last 3 weeks 22.4 a week | lineup value 33.2
12474 | Woody Marks | RB | age 25 | HOU | market 3142 | projected 65.4 (13.1 a week) | last 3 weeks 10.1 a week | lineup value 32.1
8148 | Jameson Williams | WR | age 25 | DET | market 4089 | projected 62.8 (12.6 a week) | last 3 weeks 5.5 a week | lineup value 15.6
11635 | Ladd McConkey | WR | age 24 | LAC | market 4595 | projected 56.1 (11.2 a week) | last 3 weeks 15.4 a week | lineup value 16.5
12526 | Tetairoa McMillan | WR | age 23 | CAR | market 4721 | projected 53.9 (10.8 a week) | last 3 weeks 10.6 a week | lineup value 15.2
8136 | Rachaad White | RB | age 27 | WAS | market 2753 | projected 52.5 (10.5 a week) | last 3 weeks 5.5 a week | lineup value 20
8126 | Wan'Dale Robinson | WR | age 25 | TEN | market 3416 | projected 52.4 (10.5 a week) | last 3 weeks 12.3 a week | lineup value 13.7
12508 | Jaxson Dart | QB | age 23 | NYG | market 4882 | projected 46.9 (9.4 a week) | last 3 weeks 29 a week | lineup value 5.2
8676 | Rashid Shaheed | WR | age 28 | SEA | market 2690 | projected 43.6 (8.7 a week) | last 3 weeks 11.4 a week | lineup value 1
11627 | Troy Franklin | WR | age 23 | DEN | market 3029 | projected 39.9 (8 a week) | last 3 weeks 16 a week | lineup value 0.4
LAR | Los Angeles Rams | DEF | age ? | LAR | market 0 | projected 37.4 (7.5 a week) | last 3 weeks 7.3 a week | lineup value 37.4
11597 | Theo Johnson | TE | age 25 | NYG | market 3213 | projected 36 (7.2 a week) | last 3 weeks 10.8 a week | lineup value 24.6
11610 | Malik Washington | WR | age 25 | MIA | market 2745 | projected 35.1 (7 a week) | last 3 weeks 9.6 a week | lineup value 0
11586 | Blake Corum | RB | age 25 | LAR | market 3566 | projected 33.6 (6.7 a week) | last 3 weeks 3.7 a week | lineup value 3.7
11571 | Isaiah Davis | RB | age 24 | NYJ | market 0 | projected 33.2 (6.6 a week) | last 3 weeks 7.7 a week | lineup value 0
12519 | Luther Burden | WR | age 22 | CHI | market 4868 | projected 31.1 (6.2 a week) | last 3 weeks 1.3 a week | lineup value 1.3
12499 | Elic Ayomanor | WR | age 23 | TEN | market 2910 | projected 22.3 (4.5 a week) | last 3 weeks 7.2 a week | lineup value 0
11566 | Jayden Daniels | QB | age 25 | WAS | market 4994 | projected 19.7 (3.9 a week) | last 3 weeks 11.7 a week | lineup value 2.7
12455 | Brashard Smith | RB | age 23 | KC | market 2691 | projected 14.8 (3 a week) | last 3 weeks 4.9 a week | lineup value 0
12487 | Terrance Ferguson | TE | age 23 | LAR | market 3479 | projected 14.8 (3 a week) | last 3 weeks 5.8 a week | lineup value 3.4
12544 | LeQuint Allen | RB | age 22 | JAX | market 0 | projected 12.4 (2.5 a week) | last 3 weeks 0.7 a week | lineup value 0

PARTNER (partnerId 2): record 4-5, rank 8, points for 996.2, contention window 0.31
4984 | Josh Allen | QB | age 30 | BUF | market 5345 | projected 135.1 (27 a week) | last 3 weeks 18.7 a week | lineup value 43.4
1373 | Geno Smith | QB | age 36 | NYJ | market 1933 | projected 91.7 (18.3 a week) | last 3 weeks 12.3 a week | lineup value 0
6794 | Justin Jefferson | WR | age 27 | MIN | market 4818 | projected 75.7 (15.1 a week) | last 3 weeks 14.7 a week | lineup value 28.6
2449 | Stefon Diggs | WR | age 32 | WAS | market 2781 | projected 58.3 (11.7 a week) | last 3 weeks 12.4 a week | lineup value 21.2
4199 | Aaron Jones | RB | age 31 | MIN | market 2797 | projected 57.2 (11.4 a week) | last 3 weeks 5.6 a week | lineup value 26.4
10213 | Tre Tucker | WR | age 25 | LV | market 2698 | projected 54.2 (10.8 a week) | last 3 weeks 5 a week | lineup value 7.1
5012 | Mark Andrews | TE | age 31 | BAL | market 3101 | projected 49.6 (9.9 a week) | last 3 weeks 7.7 a week | lineup value 2.5
5001 | Dalton Schultz | TE | age 30 | HOU | market 3164 | projected 48.5 (9.7 a week) | last 3 weeks 12.3 a week | lineup value 1.4
1479 | Keenan Allen | WR | age 34 | IND | market 2145 | projected 46.1 (9.2 a week) | last 3 weeks 14.5 a week | lineup value 8.3
4039 | Cooper Kupp | WR | age 33 | SEA | market 2095 | projected 43.4 (8.7 a week) | last 3 weeks 0.7 a week | lineup value 0
11603 | AJ Barner | TE | age 24 | SEA | market 3510 | projected 39.8 (8 a week) | last 3 weeks 4.5 a week | lineup value 0.1
9487 | Parker Washington | WR | age 24 | JAX | market 4015 | projected 39.6 (7.9 a week) | last 3 weeks 9.1 a week | lineup value 3
12476 | Devin Neal | RB | age 23 | WAS | market 2801 | projected 35.9 (7.2 a week) | last 3 weeks 2.1 a week | lineup value 5.1
ATL | Atlanta Falcons | DEF | age ? | ATL | market 0 | projected 33 (6.6 a week) | last 3 weeks 5.3 a week | lineup value 9.7
11584 | Bucky Irving | RB | age 24 | TB | market 4304 | projected 29.6 (5.9 a week) | last 3 weeks 0 a week | lineup value 9.9
IND | Indianapolis Colts | DEF | age ? | IND | market 0 | projected 26.3 (5.3 a week) | last 3 weeks 6.7 a week | lineup value 3
9501 | DeMario Douglas | WR | age 25 | NE | market 0 | projected 24.1 (4.8 a week) | last 3 weeks 10.1 a week | lineup value 0
4219 | Jeremy McNichols | RB | age 30 | WAS | market 0 | projected 23.1 (4.6 a week) | last 3 weeks 6.1 a week | lineup value 6.5
5857 | Noah Fant | TE | age 28 | NO | market 0 | projected 22.1 (4.4 a week) | last 3 weeks 3.6 a week | lineup value 0
4993 | Mike Gesicki | TE | age 31 | CIN | market 1197 | projected 19.2 (3.8 a week) | last 3 weeks 0 a week | lineup value 0
9504 | Kayshon Boutte | WR | age 24 | HOU | market 2963 | projected 18.6 (3.7 a week) | last 3 weeks 10 a week | lineup value 0.3
7611 | Rhamondre Stevenson | RB | age 28 | NE | market 3352 | projected 16 (3.2 a week) | last 3 weeks 7.6 a week | lineup value 3.2

CANDIDATE DEALS (from a rules-based finder; points are the finder projections for the rest of the season):
c1 | partnerId 8 | I give Deshaun Watson + Joe Burrow (4017,6770) | I get Chris Olave + DeVonta Smith (8144,7525) | my points 24.9 | their points -75.4 | likelihood 0.89
c2 | partnerId 10 | I give Deshaun Watson + C.J. Stroud (4017,9758) | I get Rico Dowdle + Khalil Shakir (7021,8134) | my points 17.4 | their points -65.3 | likelihood 0.93
c3 | partnerId 10 | I give Deshaun Watson + Joe Burrow (4017,6770) | I get Rico Dowdle + Quinshon Judkins (7021,12512) | my points 23.1 | their points -72.9 | likelihood 0.92
c4 | partnerId 8 | I give Joe Burrow (6770) | I get Chris Olave + Baker Mayfield (8144,4892) | my points 22.9 | their points -40.5 | likelihood 0.92
c5 | partnerId 12 | I give Jayden Reed (10222) | I get Woody Marks + Daniel Jones (12474,5870) | my points 12.2 | their points -52 | likelihood 0.84
c6 | partnerId 2 | I give Tyjae Spears + David Njoku (9508,4033) | I get Stefon Diggs + Geno Smith (2449,1373) | my points 13 | their points -17.2 | likelihood 0.68
c7 | partnerId 2 | I give Tyjae Spears (9508) | I get Stefon Diggs (2449) | my points 10.9 | their points -17.2 | likelihood 0.67
c8 | partnerId 2 | I give Tyjae Spears + Deshaun Watson (9508,4017) | I get Stefon Diggs + Devin Neal (2449,12476) | my points 11.2 | their points -22.6 | likelihood 0.63

Pick the best trades for my team.

=========== CASE 1180184942900514816-w4-r3 ===========
REPLY FILE: /Users/anik/workspace/chrome/sleeper/.eval-market/replies/suggest-v2/run1/1180184942900514816-w4-r3.json
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

MY TEAM (partnerId me): record 2-1, rank 7, points for 322, contention window 0.44
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
12535 | Isaac TeSlaa | WR | age 24 | DET | market 2785 | projected 36.2 (3.3 a week) | last 3 weeks 4.1 a week | lineup value 0
9757 | Kendre Miller | RB | age 24 | NO | market 2606 | projected 24.4 (2.2 a week) | last 3 weeks 3.3 a week | lineup value 0
12457 | Jaydon Blue | RB | age 22 | PHI | market 2773 | projected 13.7 (1.2 a week) | last 3 weeks 0 a week | lineup value 0
8135 | Treylon Burks | WR | age 26 | WAS | market 0 | projected 12.5 (1.1 a week) | last 3 weeks 0 a week | lineup value 0

PARTNER (partnerId 6): record 1-2, rank 8, points for 352.5, contention window 0.31
4046 | Patrick Mahomes | QB | age 31 | KC | market 3913 | projected 245.3 (22.3 a week) | last 3 weeks 22.4 a week | lineup value 162.6
8130 | Trey McBride | TE | age 26 | ARI | market 4880 | projected 164.7 (15 a week) | last 3 weeks 13.7 a week | lineup value 97.4
7569 | Nico Collins | WR | age 27 | HOU | market 4429 | projected 142.9 (13 a week) | last 3 weeks 14 a week | lineup value 75.7
10229 | Rashee Rice | WR | age 26 | KC | market 4417 | projected 122.3 (11.1 a week) | last 3 weeks 0 a week | lineup value 69.6
1466 | Travis Kelce | TE | age 37 | KC | market 2866 | projected 111.2 (10.1 a week) | last 3 weeks 9.8 a week | lineup value 43.8
7567 | Kenny Gainwell | RB | age 27 | TB | market 3127 | projected 103 (9.4 a week) | last 3 weeks 5.4 a week | lineup value 32
5967 | Tony Pollard | RB | age 29 | TEN | market 3191 | projected 98 (8.9 a week) | last 3 weeks 10.3 a week | lineup value 26.3
7090 | Darnell Mooney | WR | age 28 | NYG | market 2372 | projected 88.1 (8 a week) | last 3 weeks 4.1 a week | lineup value 21.3
11562 | Spencer Rattler | QB | age 26 | NO | market 0 | projected 82.7 (7.5 a week) | last 3 weeks 17.6 a week | lineup value 0
KC | Kansas City Chiefs | DEF | age ? | KC | market 0 | projected 72 (6.5 a week) | last 3 weeks 6.3 a week | lineup value 72
11655 | Tyrone Tracy | RB | age 26 | NYG | market 2982 | projected 70.5 (6.4 a week) | last 3 weeks 6.7 a week | lineup value 19.6
12540 | Chimere Dike | WR | age 24 | TEN | market 2865 | projected 64.8 (5.9 a week) | last 3 weeks 2.4 a week | lineup value 3.6
9506 | Sean Tucker | RB | age 24 | TB | market 2808 | projected 60.5 (5.5 a week) | last 3 weeks 0.1 a week | lineup value 8.8
11571 | Isaiah Davis | RB | age 24 | NYJ | market 0 | projected 58.7 (5.3 a week) | last 3 weeks 1.1 a week | lineup value 4.6
12507 | Omarion Hampton | RB | age 23 | LAC | market 5148 | projected 45.4 (4.1 a week) | last 3 weeks 12.2 a week | lineup value 21.6
12483 | Jack Bech | WR | age 23 | LV | market 2720 | projected 43.3 (3.9 a week) | last 3 weeks 1.8 a week | lineup value 6.1
4981 | Calvin Ridley | WR | age 31 | TEN | market 2279 | projected 41 (3.7 a week) | last 3 weeks 6.4 a week | lineup value 14
12492 | Pat Bryant | WR | age 23 | DEN | market 3010 | projected 40.4 (3.7 a week) | last 3 weeks 1.3 a week | lineup value 0
8119 | Jahan Dotson | WR | age 26 | ATL | market 0 | projected 33.2 (3 a week) | last 3 weeks 4 a week | lineup value 0
12482 | Savion Williams | WR | age 24 | GB | market 0 | projected 14.4 (1.3 a week) | last 3 weeks 1.1 a week | lineup value 0
3321 | Tyreek Hill | WR | age 31 | FA | market 2520 | projected 14 (1.3 a week) | last 3 weeks 13.6 a week | lineup value 4.1
6945 | Antonio Gibson | RB | age 27 | FA | market 1423 | projected 10.1 (0.9 a week) | last 3 weeks 3.6 a week | lineup value 0

PARTNER (partnerId 11): record 2-1, rank 5, points for 392.8, contention window 0.69
11564 | Drake Maye | QB | age 24 | NE | market 5679 | projected 226.1 (20.6 a week) | last 3 weeks 23.8 a week | lineup value 41.3
9488 | Jaxon Smith-Njigba | WR | age 24 | SEA | market 5789 | projected 203.9 (18.5 a week) | last 3 weeks 19.4 a week | lineup value 123.1
11560 | Caleb Williams | QB | age 24 | CHI | market 5238 | projected 188.1 (17.1 a week) | last 3 weeks 28.1 a week | lineup value 4.2
9997 | Zay Flowers | WR | age 26 | BAL | market 4182 | projected 146 (13.3 a week) | last 3 weeks 15.4 a week | lineup value 64.8
12522 | Cam Ward | QB | age 24 | TEN | market 3441 | projected 144.6 (13.1 a week) | last 3 weeks 9.4 a week | lineup value 0
7526 | Jaylen Waddle | WR | age 27 | DEN | market 4002 | projected 141.4 (12.9 a week) | last 3 weeks 13.2 a week | lineup value 59.2
9224 | Chase Brown | RB | age 26 | CIN | market 4513 | projected 140.9 (12.8 a week) | last 3 weeks 9.2 a week | lineup value 104.2
5045 | Courtland Sutton | WR | age 31 | DEN | market 3181 | projected 130.5 (11.9 a week) | last 3 weeks 14.5 a week | lineup value 48.3
6819 | Michael Pittman | WR | age 29 | PIT | market 2989 | projected 129.1 (11.7 a week) | last 3 weeks 15.8 a week | lineup value 48.1
4098 | Kareem Hunt | RB | age 30 | FA | market 1814 | projected 93.2 (8.5 a week) | last 3 weeks 6.8 a week | lineup value 56.5
SEA | Seattle Seahawks | DEF | age ? | SEA | market 0 | projected 76.6 (7 a week) | last 3 weeks 10 a week | lineup value 15.4
LAC | Los Angeles Chargers | DEF | age ? | LAC | market 0 | projected 75.1 (6.8 a week) | last 3 weeks 1 a week | lineup value 14
10859 | Sam LaPorta | TE | age 25 | DET | market 4249 | projected 73.2 (6.7 a week) | last 3 weeks 8.9 a week | lineup value 33.2
7600 | Pat Freiermuth | TE | age 27 | PIT | market 2347 | projected 61.7 (5.6 a week) | last 3 weeks 4.5 a week | lineup value 13.1
12484 | Jayden Higgins | WR | age 23 | HOU | market 3438 | projected 60.5 (5.5 a week) | last 3 weeks 3.5 a week | lineup value 1.9
9494 | Marvin Mims | WR | age 24 | DEN | market 2742 | projected 55 (5 a week) | last 3 weeks 4.7 a week | lineup value 1.2
11646 | Jalen Coker | WR | age 24 | CAR | market 3264 | projected 48.4 (4.4 a week) | last 3 weeks 0 a week | lineup value 1.7
9480 | Brenton Strange | TE | age 25 | JAX | market 3624 | projected 46.2 (4.2 a week) | last 3 weeks 8.9 a week | lineup value 11.3
12469 | Dylan Sampson | RB | age 22 | CLE | market 3281 | projected 38.9 (3.5 a week) | last 3 weeks 9.5 a week | lineup value 4
12530 | Travis Hunter | DB | age 23 | JAX | market 0 | projected 30.5 (2.8 a week) | last 3 weeks 5.9 a week | lineup value 1
12543 | Tahj Brooks | RB | age 24 | CIN | market 0 | projected 16.8 (1.5 a week) | last 3 weeks 0.6 a week | lineup value 0
6151 | Miles Sanders | RB | age 28 | FA | market 1697 | projected 5 (0.5 a week) | last 3 weeks 2.8 a week | lineup value 0

PARTNER (partnerId 9): record 2-1, rank 4, points for 399.3, contention window 0.82
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

PARTNER (partnerId 1): record 2-1, rank 3, points for 462, contention window 0.95
9509 | Bijan Robinson | RB | age 24 | ATL | market 6370 | projected 203.5 (18.5 a week) | last 3 weeks 20.1 a week | lineup value 128.4
421 | Matthew Stafford | QB | age 38 | LAR | market 3169 | projected 201.4 (18.3 a week) | last 3 weeks 18.3 a week | lineup value 17.5
6804 | Jordan Love | QB | age 27 | GB | market 3883 | projected 199 (18.1 a week) | last 3 weeks 19.3 a week | lineup value 20.7
4881 | Lamar Jackson | QB | age 29 | BAL | market 5378 | projected 181.9 (16.5 a week) | last 3 weeks 33.6 a week | lineup value 31.5
8155 | Breece Hall | RB | age 25 | NYJ | market 4262 | projected 145.6 (13.2 a week) | last 3 weeks 10.5 a week | lineup value 64.6
6786 | CeeDee Lamb | WR | age 27 | DAL | market 4921 | projected 133.7 (12.2 a week) | last 3 weeks 12.7 a week | lineup value 88.1
12529 | TreVeyon Henderson | RB | age 23 | NE | market 4326 | projected 121.4 (11 a week) | last 3 weeks 8.3 a week | lineup value 47.4
11620 | Rome Odunze | WR | age 24 | CHI | market 4056 | projected 117 (10.6 a week) | last 3 weeks 20.9 a week | lineup value 47.5
1339 | Zach Ertz | TE | age 35 | PHI | market 0 | projected 100.3 (9.1 a week) | last 3 weeks 12.3 a week | lineup value 20.6
12506 | Harold Fannin | TE | age 22 | CLE | market 4698 | projected 95.2 (8.7 a week) | last 3 weeks 9.6 a week | lineup value 13.3
11628 | Marvin Harrison | WR | age 24 | HOU | market 3923 | projected 86.3 (7.8 a week) | last 3 weeks 10.1 a week | lineup value 31.3
GB | Green Bay Packers | DEF | age ? | GB | market 0 | projected 78.5 (7.1 a week) | last 3 weeks 7.7 a week | lineup value 16.2
HOU | Houston Texans | DEF | age ? | HOU | market 0 | projected 74 (6.7 a week) | last 3 weeks 6.7 a week | lineup value 11.7
3200 | Sterling Shepard | WR | age 33 | NYJ | market 1658 | projected 66 (6 a week) | last 3 weeks 0 a week | lineup value 0.6
12517 | Colston Loveland | TE | age 22 | CHI | market 5260 | projected 65.9 (6 a week) | last 3 weeks 2.4 a week | lineup value 3.3
10219 | Chris Rodriguez | RB | age 27 | JAX | market 2759 | projected 62.2 (5.7 a week) | last 3 weeks 1.3 a week | lineup value 2.5
8146 | Garrett Wilson | WR | age 26 | NYJ | market 4217 | projected 59.6 (5.4 a week) | last 3 weeks 18.6 a week | lineup value 24.8
10236 | Dalton Kincaid | TE | age 26 | BUF | market 3770 | projected 59.4 (5.4 a week) | last 3 weeks 13.4 a week | lineup value 12
8143 | Jerome Ford | RB | age 27 | ARI | market 0 | projected 52.1 (4.7 a week) | last 3 weeks 5.6 a week | lineup value 0
12502 | Gunnar Helm | TE | age 24 | TEN | market 3243 | projected 49.3 (4.5 a week) | last 3 weeks 3.7 a week | lineup value 0
10444 | Cedric Tillman | WR | age 26 | NO | market 0 | projected 46.9 (4.3 a week) | last 3 weeks 10.7 a week | lineup value 5.5
3271 | Tyler Higbee | TE | age 33 | LAR | market 0 | projected 28.7 (2.6 a week) | last 3 weeks 0 a week | lineup value 0

CANDIDATE DEALS (from a rules-based finder; points are the finder projections for the rest of the season):
c1 | partnerId 6 | I give Isaiah Bond (12503) | I get Spencer Rattler (11562) | my points 16.2 | their points 6.8 | likelihood 0.77
c2 | partnerId 11 | I give Josh Jacobs + Kenneth Walker (5850,8151) | I get Caleb Williams (11560) | my points -85.7 | their points 113.2 | likelihood 0.47
c3 | partnerId 9 | I give Bryce Young + J.K. Dobbins (9228,6806) | I get C.J. Stroud + Juwan Johnson (9758,7002) | my points 4.7 | their points 34.5 | likelihood 0.48
c4 | partnerId 11 | I give J.K. Dobbins + George Pickens (6806,8137) | I get Caleb Williams + Jarquez Hunter (11560,11569) | my points -62.8 | their points 86.5 | likelihood 0.44
c5 | partnerId 11 | I give D'Andre Swift + George Pickens (6790,8137) | I get Caleb Williams + Miles Sanders (11560,6151) | my points -63.3 | their points 86.1 | likelihood 0.46
c6 | partnerId 1 | I give J.K. Dobbins (6806) | I get Jonathon Brooks + Chris Rodriguez (11583,10219) | my points -22.5 | their points 29 | likelihood 0.45

Pick the best trades for my team.
