You are answering fantasy football trade-advice cases. For each case below, follow the SYSTEM text, read the DATA, and write your JSON answer to the reply file named for that case.
Rules: write only the JSON object (no markdown fence, no commentary) to each reply file. Do not read any other file on disk. Do not look at any directory named truth or any file outside the reply paths. Work each case independently.

=========== CASE 1180203732667707392-w10-r2 ===========
REPLY FILE: /Users/anik/workspace/chrome/sleeper/.eval-market/replies/suggest-v2/run1/1180203732667707392-w10-r2.json
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
Lineup slots: QB, RB, RB, WR, WR, WR, TE, FLEX, FLEX, FLEX, SUPER_FLEX, DL, DL, DL, LB, LB, LB, DB, DB, DB, IDP_FLEX, IDP_FLEX, IDP_FLEX, IDP_FLEX, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN. Superflex: yes. Tight end premium: no. Points per reception: 1.
Columns: id | name | position | age | team | market value | projected points for the rest of the regular season (and per week) | points per week over the last three weeks played | lineup value (points my lineup loses if this player is removed).

MY TEAM (partnerId me): record 6-3, rank 4, points for 2696.5, contention window 0.82
4892 | Baker Mayfield | QB | age 31 | TB | market 4240 | projected 94.4 (18.9 a week) | last 3 weeks 5.4 a week | lineup value 51.1
3163 | Jared Goff | QB | age 32 | DET | market 4441 | projected 92.6 (18.5 a week) | last 3 weeks 10.2 a week | lineup value 49.3
4034 | Christian McCaffrey | RB | age 30 | SF | market 4602 | projected 91.7 (18.3 a week) | last 3 weeks 27.7 a week | lineup value 75.6
6949 | Jordyn Brooks | LB | age 28 | MIA | market 0 | projected 72.7 (14.5 a week) | last 3 weeks 18.7 a week | lineup value 52.4
5726 | Robert Spillane | LB | age 30 | NE | market 0 | projected 70.9 (14.2 a week) | last 3 weeks 14 a week | lineup value 54.1
7021 | Rico Dowdle | RB | age 28 | PIT | market 3262 | projected 64.1 (12.8 a week) | last 3 weeks 15.4 a week | lineup value 47.9
8137 | George Pickens | WR | age 25 | DAL | market 4766 | projected 64 (12.8 a week) | last 3 weeks 13.6 a week | lineup value 50.9
5580 | Frankie Luvu | LB | age 30 | WAS | market 0 | projected 54.2 (10.8 a week) | last 3 weeks 12 a week | lineup value 33.9
1233 | Bobby Wagner | LB | age 35 | FA | market 0 | projected 51.8 (10.4 a week) | last 3 weeks 16.3 a week | lineup value 31.4
843 | Cameron Heyward | DL | age 37 | PIT | market 0 | projected 51.3 (10.3 a week) | last 3 weeks 11 a week | lineup value 42
6819 | Michael Pittman | WR | age 29 | PIT | market 2992 | projected 50.5 (10.1 a week) | last 3 weeks 21.6 a week | lineup value 37.8
2617 | Alex Singleton | LB | age 32 | DEN | market 0 | projected 49.1 (9.8 a week) | last 3 weeks 14.3 a week | lineup value 33.8
8343 | Boye Mafe | DL | age 27 | CIN | market 0 | projected 47.9 (9.6 a week) | last 3 weeks 2.7 a week | lineup value 38.6
11656 | Nate Wiggins | DB | age 23 | BAL | market 0 | projected 47.2 (9.4 a week) | last 3 weeks 11.3 a week | lineup value 30.4
7765 | Jonathon Cooper | DL | age 28 | DEN | market 0 | projected 46.4 (9.3 a week) | last 3 weeks 13.3 a week | lineup value 37.1
9754 | Quentin Johnston | WR | age 25 | LAC | market 3436 | projected 45 (9 a week) | last 3 weeks 8.8 a week | lineup value 28.1
7819 | Deommodore Lenoir | DB | age 27 | SF | market 0 | projected 43.2 (8.6 a week) | last 3 weeks 8.7 a week | lineup value 26.4
12484 | Jayden Higgins | WR | age 23 | HOU | market 3446 | projected 37.3 (7.5 a week) | last 3 weeks 4.9 a week | lineup value 20.8
5372 | D.J. Reed | DB | age 29 | DET | market 0 | projected 36.2 (7.2 a week) | last 3 weeks 0 a week | lineup value 31
8132 | Tyler Allgeier | RB | age 26 | ARI | market 3206 | projected 36.2 (7.2 a week) | last 3 weeks 3.9 a week | lineup value 20
11610 | Malik Washington | WR | age 25 | MIA | market 2747 | projected 35.1 (7 a week) | last 3 weeks 10.2 a week | lineup value 18.3
4033 | David Njoku | TE | age 30 | LAC | market 2847 | projected 33.8 (6.8 a week) | last 3 weeks 4.6 a week | lineup value 12.9
4066 | Evan Engram | TE | age 32 | DEN | market 0 | projected 32.8 (6.6 a week) | last 3 weeks 5.6 a week | lineup value 15.9
10897 | Tyrique Stevenson | DB | age 26 | CHI | market 0 | projected 32.3 (6.5 a week) | last 3 weeks 7.7 a week | lineup value 20.7
2306 | Jameis Winston | QB | age 32 | NYG | market 0 | projected 30.1 (6 a week) | last 3 weeks 0 a week | lineup value 0
19 | Joe Flacco | QB | age 41 | CIN | market 0 | projected 30 (6 a week) | last 3 weeks 27.7 a week | lineup value 0
5056 | Jerome Baker | LB | age 29 | FA | market 0 | projected 26.3 (5.3 a week) | last 3 weeks 5.7 a week | lineup value 7.1
2353 | Denzel Perryman | LB | age 33 | LAC | market 0 | projected 25.9 (5.2 a week) | last 3 weeks 9 a week | lineup value 5.5
10878 | Deonte Banks | DB | age 25 | NYG | market 0 | projected 25.5 (5.1 a week) | last 3 weeks 5.3 a week | lineup value 8.7
12604 | Andrew Mukuba | DB | age 23 | PHI | market 0 | projected 24.1 (4.8 a week) | last 3 weeks 5.3 a week | lineup value 12.5

PARTNER (partnerId 10): record 7-2, rank 2, points for 2569.9, contention window 1
10905 | Brian Branch | DB | age 24 | DET | market 0 | projected 89.8 (18 a week) | last 3 weeks 3.3 a week | lineup value 40.7
7569 | Nico Collins | WR | age 27 | HOU | market 4433 | projected 80.1 (16 a week) | last 3 weeks 7.1 a week | lineup value 35.6
6302 | Kaden Elliss | LB | age 31 | NO | market 0 | projected 73.1 (14.6 a week) | last 3 weeks 20 a week | lineup value 24.1
12514 | Emeka Egbuka | WR | age 24 | TB | market 4522 | projected 72.2 (14.4 a week) | last 3 weeks 5.4 a week | lineup value 27.7
8267 | Nakobe Dean | LB | age 25 | LV | market 0 | projected 71.2 (14.2 a week) | last 3 weeks 6.7 a week | lineup value 22.2
10917 | Byron Young | DL | age 28 | LAR | market 0 | projected 65.2 (13 a week) | last 3 weeks 5.7 a week | lineup value 21.2
8392 | Nick Cross | DB | age 25 | WAS | market 0 | projected 63.7 (12.7 a week) | last 3 weeks 11.7 a week | lineup value 23.4
10914 | Daiyan Henley | LB | age 26 | LAC | market 0 | projected 61.9 (12.4 a week) | last 3 weeks 9.7 a week | lineup value 22.5
10949 | Chamarri Conner | DB | age 26 | KC | market 0 | projected 61 (12.2 a week) | last 3 weeks 8.7 a week | lineup value 21.1
7715 | Cam Bynum | DB | age 28 | IND | market 0 | projected 60.6 (12.1 a week) | last 3 weeks 9.7 a week | lineup value 20.3
6860 | Akeem Davis-Gaither | LB | age 29 | IND | market 0 | projected 58.4 (11.7 a week) | last 3 weeks 9 a week | lineup value 9.4
4199 | Aaron Jones | RB | age 31 | MIN | market 2799 | projected 57.2 (11.4 a week) | last 3 weeks 5.6 a week | lineup value 27.6
10213 | Tre Tucker | WR | age 25 | LV | market 2700 | projected 54.2 (10.8 a week) | last 3 weeks 5 a week | lineup value 9.7
8121 | Romeo Doubs | WR | age 26 | NE | market 3166 | projected 52.5 (10.5 a week) | last 3 weeks 12.9 a week | lineup value 9.8
7667 | Tyson Campbell | DB | age 26 | CLE | market 0 | projected 51.8 (10.4 a week) | last 3 weeks 9.7 a week | lineup value 3.6
10970 | Henry To'oTo'o | LB | age 25 | HOU | market 0 | projected 50.7 (10.1 a week) | last 3 weeks 7.7 a week | lineup value 3.6
5045 | Courtland Sutton | WR | age 31 | DEN | market 3187 | projected 50.1 (10 a week) | last 3 weeks 12.5 a week | lineup value 12.6
11697 | Renardo Green | DB | age 25 | SF | market 0 | projected 46.4 (9.3 a week) | last 3 weeks 9.7 a week | lineup value 7.9
12493 | Oronde Gadsden | TE | age 23 | LAC | market 4197 | projected 45.5 (9.1 a week) | last 3 weeks 20 a week | lineup value 11.8
7672 | Ernest Jones | LB | age 26 | SEA | market 0 | projected 44.7 (8.9 a week) | last 3 weeks 11 a week | lineup value 14.6
5297 | Zach Sieler | DL | age 31 | MIA | market 0 | projected 44.6 (8.9 a week) | last 3 weeks 5.3 a week | lineup value 9.3
8374 | Riq Woolen | DB | age 27 | PHI | market 0 | projected 43.7 (8.7 a week) | last 3 weeks 5.7 a week | lineup value 0

PARTNER (partnerId 1): record 9-0, rank 1, points for 3082.3, contention window 1
9509 | Bijan Robinson | RB | age 24 | ATL | market 6371 | projected 102 (20.4 a week) | last 3 weeks 14.9 a week | lineup value 76
11687 | Edgerrin Cooper | LB | age 24 | GB | market 0 | projected 93.3 (18.7 a week) | last 3 weeks 11 a week | lineup value 38.9
11564 | Drake Maye | QB | age 24 | NE | market 7362 | projected 86.2 (17.2 a week) | last 3 weeks 22.6 a week | lineup value 73.4
10980 | SirVocea Dennis | LB | age 26 | TB | market 0 | projected 82.7 (16.5 a week) | last 3 weeks 16.3 a week | lineup value 28.2
11604 | Brock Bowers | TE | age 23 | LV | market 5534 | projected 81.9 (16.4 a week) | last 3 weeks 14.4 a week | lineup value 58.7
5332 | Foyesade Oluokun | LB | age 31 | JAX | market 0 | projected 77.2 (15.4 a week) | last 3 weeks 9 a week | lineup value 22.7
12578 | Carson Schwesinger | LB | age 23 | CLE | market 0 | projected 72 (14.4 a week) | last 3 weeks 8.7 a week | lineup value 17.5
7841 | Jamien Sherwood | LB | age 26 | NYJ | market 0 | projected 71.6 (14.3 a week) | last 3 weeks 14 a week | lineup value 17.1
8289 | Aidan Hutchinson | DL | age 26 | DET | market 0 | projected 70 (14 a week) | last 3 weeks 8.3 a week | lineup value 18.8
11665 | Jared Verse | DL | age 25 | CLE | market 0 | projected 66 (13.2 a week) | last 3 weeks 4.7 a week | lineup value 14.8
12640 | Teddye Buchanan | LB | age 24 | BAL | market 0 | projected 65.2 (13 a week) | last 3 weeks 8.7 a week | lineup value 10.7
7564 | Ja'Marr Chase | WR | age 26 | CIN | market 5778 | projected 57.9 (11.6 a week) | last 3 weeks 25.4 a week | lineup value 42.5
10892 | Will Anderson | DL | age 25 | HOU | market 0 | projected 56.3 (11.3 a week) | last 3 weeks 19 a week | lineup value 5.1
6911 | Brandon Jones | DB | age 28 | DEN | market 0 | projected 55.3 (11.1 a week) | last 3 weeks 12.3 a week | lineup value 18.9
5947 | Jakobi Meyers | WR | age 29 | JAX | market 3300 | projected 54.7 (10.9 a week) | last 3 weeks 2.1 a week | lineup value 28.2
11470 | Drake Thomas | LB | age 26 | SEA | market 0 | projected 49.8 (10 a week) | last 3 weeks 15.3 a week | lineup value 3.4
11682 | Cole Bishop | DB | age 23 | BUF | market 0 | projected 49.1 (9.8 a week) | last 3 weeks 3.3 a week | lineup value 8
12489 | RJ Harvey | RB | age 25 | DEN | market 3731 | projected 48.8 (9.8 a week) | last 3 weeks 16 a week | lineup value 27.5
5862 | Brian Burns | DL | age 28 | NYG | market 0 | projected 47.6 (9.5 a week) | last 3 weeks 22.3 a week | lineup value 4.8
12597 | Nick Emmanwori | DB | age 22 | SEA | market 0 | projected 40.8 (8.2 a week) | last 3 weeks 7 a week | lineup value 3.3
12566 | Jihaad Campbell | LB | age 22 | PHI | market 0 | projected 36 (7.2 a week) | last 3 weeks 3 a week | lineup value 0
12490 | Bhayshul Tuten | RB | age 23 | JAX | market 4235 | projected 34.2 (6.8 a week) | last 3 weeks 3.9 a week | lineup value 8.2

PARTNER (partnerId 12): record 6-3, rank 3, points for 2902.6, contention window 0.95
4984 | Josh Allen | QB | age 30 | BUF | market 6837 | projected 119.7 (23.9 a week) | last 3 weeks 17.3 a week | lineup value 45.3
8138 | James Cook | RB | age 27 | BUF | market 4899 | projected 89.9 (18 a week) | last 3 weeks 15.7 a week | lineup value 37.8
4046 | Patrick Mahomes | QB | age 31 | KC | market 4939 | projected 87.5 (17.5 a week) | last 3 weeks 20.9 a week | lineup value 22.5
4866 | Saquon Barkley | RB | age 29 | PHI | market 4233 | projected 80.2 (16 a week) | last 3 weeks 12.9 a week | lineup value 28.2
9997 | Zay Flowers | WR | age 26 | BAL | market 4183 | projected 73.2 (14.6 a week) | last 3 weeks 8.5 a week | lineup value 21.6
8280 | Nik Bonitto | DL | age 27 | DEN | market 0 | projected 72.7 (14.5 a week) | last 3 weeks 2.7 a week | lineup value 59.4
4118 | Alex Anzalone | LB | age 32 | TB | market 0 | projected 72.6 (14.5 a week) | last 3 weeks 6.3 a week | lineup value 54.1
6217 | Blake Cashman | LB | age 30 | MIN | market 0 | projected 71.1 (14.2 a week) | last 3 weeks 17 a week | lineup value 52.6
12512 | Quinshon Judkins | RB | age 22 | CLE | market 4394 | projected 70.3 (14.1 a week) | last 3 weeks 10.4 a week | lineup value 18.2
10229 | Rashee Rice | WR | age 26 | KC | market 4419 | projected 70.2 (14 a week) | last 3 weeks 22.4 a week | lineup value 28
1192 | Lavonte David | LB | age 36 | FA | market 0 | projected 67.8 (13.6 a week) | last 3 weeks 8.7 a week | lineup value 49.4
9228 | Bryce Young | QB | age 25 | CAR | market 4104 | projected 62 (12.4 a week) | last 3 weeks 4.8 a week | lineup value 6
5030 | Harold Landry | DL | age 30 | NE | market 0 | projected 59 (11.8 a week) | last 3 weeks 6.7 a week | lineup value 45.7
6901 | Joshua Metellus | DB | age 28 | MIN | market 0 | projected 58.5 (11.7 a week) | last 3 weeks 13.7 a week | lineup value 40
5892 | David Montgomery | RB | age 29 | HOU | market 3466 | projected 55.3 (11.1 a week) | last 3 weeks 5.6 a week | lineup value 4.8
1213 | Harrison Smith | DB | age 37 | MIN | market 0 | projected 54.8 (11 a week) | last 3 weeks 13.3 a week | lineup value 36.3
4971 | Derwin James | DB | age 30 | LAC | market 0 | projected 53.4 (10.7 a week) | last 3 weeks 8.7 a week | lineup value 34.9
7635 | Jaelan Phillips | DL | age 27 | CAR | market 0 | projected 52.9 (10.6 a week) | last 3 weeks 11 a week | lineup value 39.6
8126 | Wan'Dale Robinson | WR | age 25 | TEN | market 3419 | projected 52.4 (10.5 a week) | last 3 weeks 12.3 a week | lineup value 11.3
827 | Tyrod Taylor | QB | age 37 | GB | market 0 | projected 46.7 (9.3 a week) | last 3 weeks 1.4 a week | lineup value 0
1052 | Demario Davis | LB | age 37 | NYJ | market 0 | projected 45.9 (9.2 a week) | last 3 weeks 17 a week | lineup value 32
4098 | Kareem Hunt | RB | age 30 | FA | market 1814 | projected 44.2 (8.8 a week) | last 3 weeks 10.5 a week | lineup value 2.3

PARTNER (partnerId 8): record 4-5, rank 7, points for 2700.7, contention window 0.44
9488 | Jaxon Smith-Njigba | WR | age 24 | SEA | market 5795 | projected 105.7 (21.1 a week) | last 3 weeks 17.4 a week | lineup value 62.1
9493 | Puka Nacua | WR | age 25 | LAR | market 5688 | projected 103.2 (20.6 a week) | last 3 weeks 7.6 a week | lineup value 59.6
7547 | Amon-Ra St. Brown | WR | age 26 | DET | market 5301 | projected 98.1 (19.6 a week) | last 3 weeks 13.8 a week | lineup value 54.5
3257 | Jacoby Brissett | QB | age 33 | ARI | market 2773 | projected 84.6 (16.9 a week) | last 3 weeks 14.9 a week | lineup value 25.2
4070 | T.J. Watt | DL | age 32 | PIT | market 0 | projected 82.9 (16.6 a week) | last 3 weeks 11 a week | lineup value 50.9
8228 | Jaylen Warren | RB | age 27 | PIT | market 3538 | projected 69.5 (13.9 a week) | last 3 weeks 15.3 a week | lineup value 25.9
5944 | Bobby Okereke | LB | age 30 | CAR | market 0 | projected 68.4 (13.7 a week) | last 3 weeks 18 a week | lineup value 32.6
5843 | Devin Bush | LB | age 28 | CHI | market 0 | projected 66.3 (13.3 a week) | last 3 weeks 7.3 a week | lineup value 23.9
12474 | Woody Marks | RB | age 25 | HOU | market 3145 | projected 65.4 (13.1 a week) | last 3 weeks 10.1 a week | lineup value 21.8
6768 | Tua Tagovailoa | QB | age 28 | ATL | market 2778 | projected 63.9 (12.8 a week) | last 3 weeks 11.8 a week | lineup value 12
5846 | DK Metcalf | WR | age 28 | PIT | market 3438 | projected 63.4 (12.7 a week) | last 3 weeks 10.4 a week | lineup value 19.8
7136 | Kam Curl | DB | age 27 | LAR | market 0 | projected 62.8 (12.6 a week) | last 3 weeks 9.7 a week | lineup value 20.4
5864 | Byron Murphy | DB | age 28 | MIN | market 0 | projected 53.9 (10.8 a week) | last 3 weeks 8.3 a week | lineup value 11.5
7553 | Kyle Pitts | TE | age 26 | ATL | market 3956 | projected 52.6 (10.5 a week) | last 3 weeks 12 a week | lineup value 13.1
12522 | Cam Ward | QB | age 24 | TEN | market 4413 | projected 50 (10 a week) | last 3 weeks 10.5 a week | lineup value 4.9
8359 | Marcus Jones | DB | age 27 | NE | market 0 | projected 48.9 (9.8 a week) | last 3 weeks 13.3 a week | lineup value 13
5341 | Taron Johnson | DB | age 30 | LV | market 0 | projected 48.8 (9.8 a week) | last 3 weeks 2 a week | lineup value 15.5
8333 | Alontae Taylor | DB | age 27 | TEN | market 0 | projected 47.2 (9.4 a week) | last 3 weeks 11.7 a week | lineup value 12.3
5871 | Zach Allen | DL | age 29 | DEN | market 0 | projected 45.8 (9.2 a week) | last 3 weeks 18.7 a week | lineup value 13.8
7058 | Jaylinn Hawkins | DB | age 29 | BAL | market 0 | projected 44.3 (8.9 a week) | last 3 weeks 8 a week | lineup value 8.4
11655 | Tyrone Tracy | RB | age 26 | NYG | market 2989 | projected 42.7 (8.5 a week) | last 3 weeks 8.2 a week | lineup value 8.8
5346 | Zaire Franklin | LB | age 30 | GB | market 0 | projected 42.3 (8.5 a week) | last 3 weeks 8 a week | lineup value 7.4

CANDIDATE DEALS (from a rules-based finder; points are the finder projections for the rest of the season):
c1 | partnerId 10 | I give Jameis Winston + Joe Flacco (2306,19) | I get DeMarvion Overshown + Riq Woolen (10933,8374) | my points 37.7 | their points 22.8 | likelihood 0.8
c2 | partnerId 1 | I give Joe Flacco + Jameis Winston (19,2306) | I get Will Anderson (10892) | my points 29.8 | their points 5.4 | likelihood 0.8
c3 | partnerId 1 | I give Joe Flacco (19) | I get Brian Burns (5862) | my points 26.2 | their points 5.7 | likelihood 0.8
c4 | partnerId 12 | I give Tyrique Stevenson + Matthew Golden (10897,12501) | I get Kareem Hunt + Alec Pierce (4098,8142) | my points 19.9 | their points 13 | likelihood 0.84
c5 | partnerId 8 | I give Joe Flacco + Matthew Golden (19,12501) | I get Woody Marks (12474) | my points 40.9 | their points -18.6 | likelihood 0.74
c6 | partnerId 12 | I give Deonte Banks + Matthew Golden (10878,12501) | I get Alec Pierce (8142) | my points 10.3 | their points 5.4 | likelihood 0.71

Pick the best trades for my team.

=========== CASE 1180217158638854144-w7-r11 ===========
REPLY FILE: /Users/anik/workspace/chrome/sleeper/.eval-market/replies/suggest-v2/run1/1180217158638854144-w7-r11.json
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
Lineup slots: QB, RB, RB, WR, WR, TE, FLEX, FLEX, FLEX, SUPER_FLEX, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN. Superflex: yes. Tight end premium: yes. Points per reception: 1.
Columns: id | name | position | age | team | market value | projected points for the rest of the regular season (and per week) | points per week over the last three weeks played | lineup value (points my lineup loses if this player is removed).

MY TEAM (partnerId me): record 4-2, rank 4, points for 920.3, contention window 0.82
4881 | Lamar Jackson | QB | age 29 | BAL | market 7652 | projected 153.5 (19.2 a week) | last 3 weeks 3.9 a week | lineup value 48.1
5870 | Daniel Jones | QB | age 29 | IND | market 3968 | projected 131.5 (16.4 a week) | last 3 weeks 19.2 a week | lineup value 15.6
5850 | Josh Jacobs | RB | age 28 | GB | market 4018 | projected 126.4 (15.8 a week) | last 3 weeks 21.2 a week | lineup value 66.1
3257 | Jacoby Brissett | QB | age 33 | ARI | market 3040 | projected 125.2 (15.7 a week) | last 3 weeks 8.2 a week | lineup value 8.3
7588 | Javonte Williams | RB | age 26 | DAL | market 3998 | projected 116.5 (14.6 a week) | last 3 weeks 18.1 a week | lineup value 60.6
2133 | Davante Adams | WR | age 33 | LAR | market 3381 | projected 108.1 (13.5 a week) | last 3 weeks 12.4 a week | lineup value 53.4
11635 | Ladd McConkey | WR | age 24 | LAC | market 4609 | projected 97.4 (12.2 a week) | last 3 weeks 13.3 a week | lineup value 41
12474 | Woody Marks | RB | age 25 | HOU | market 3119 | projected 96.4 (12 a week) | last 3 weeks 10.1 a week | lineup value 35.5
7553 | Kyle Pitts | TE | age 26 | ATL | market 3965 | projected 96 (12 a week) | last 3 weeks 8.9 a week | lineup value 79
8121 | Romeo Doubs | WR | age 26 | NE | market 3164 | projected 84.7 (10.6 a week) | last 3 weeks 13.4 a week | lineup value 25.9
12545 | Tyler Shough | QB | age 27 | NO | market 4806 | projected 82.7 (10.3 a week) | last 3 weeks 0 a week | lineup value 0
8112 | Drake London | WR | age 25 | ATL | market 4873 | projected 64.8 (8.1 a week) | last 3 weeks 18.9 a week | lineup value 28.6
1166 | Kirk Cousins | QB | age 38 | LV | market 2313 | projected 63.4 (7.9 a week) | last 3 weeks 0 a week | lineup value 0.1
5967 | Tony Pollard | RB | age 29 | TEN | market 3181 | projected 61.5 (7.7 a week) | last 3 weeks 10.4 a week | lineup value 7.9
4988 | Nick Chubb | RB | age 30 | FA | market 1788 | projected 53.6 (6.7 a week) | last 3 weeks 6.8 a week | lineup value 2.1
11628 | Marvin Harrison | WR | age 24 | HOU | market 3932 | projected 50.4 (6.3 a week) | last 3 weeks 12.5 a week | lineup value 14.1
7585 | Davis Mills | QB | age 27 | HOU | market 0 | projected 42.2 (5.3 a week) | last 3 weeks 0.4 a week | lineup value 0
12492 | Pat Bryant | WR | age 23 | DEN | market 3016 | projected 34.6 (4.3 a week) | last 3 weeks 1.4 a week | lineup value 0.1
11562 | Spencer Rattler | QB | age 26 | NO | market 0 | projected 31.8 (4 a week) | last 3 weeks 14.7 a week | lineup value 3.8
12483 | Jack Bech | WR | age 23 | LV | market 2724 | projected 30.9 (3.9 a week) | last 3 weeks 1.9 a week | lineup value 0
8205 | Isiah Pacheco | RB | age 27 | DET | market 2539 | projected 30.5 (3.8 a week) | last 3 weeks 9.2 a week | lineup value 1.8
4993 | Mike Gesicki | TE | age 31 | CIN | market 1199 | projected 23.1 (2.9 a week) | last 3 weeks 2.3 a week | lineup value 6.1
11650 | Luke McCaffrey | WR | age 25 | WAS | market 0 | projected 18.3 (2.3 a week) | last 3 weeks 8.8 a week | lineup value 0
12510 | Jalen Milroe | QB | age 23 | SEA | market 0 | projected 0 (0 a week) | last 3 weeks -1 a week | lineup value 0
12516 | Kalel Mullings | RB | age 24 | TEN | market 0 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0
3321 | Tyreek Hill | WR | age 31 | FA | market 2521 | projected 0 (0 a week) | last 3 weeks 4.2 a week | lineup value 0
5854 | Drew Lock | QB | age 29 | SEA | market 0 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0
8139 | Zamir White | RB | age 27 | NO | market 0 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0

PARTNER (partnerId 2): record 2-4, rank 8, points for 623.8, contention window 0.31
12508 | Jaxson Dart | QB | age 23 | NYG | market 6831 | projected 101.5 (12.7 a week) | last 3 weeks 21.7 a week | lineup value 85.2
8155 | Breece Hall | RB | age 25 | NYJ | market 4237 | projected 101.3 (12.7 a week) | last 3 weeks 12.8 a week | lineup value 57.5
2449 | Stefon Diggs | WR | age 32 | WAS | market 2787 | projected 99.1 (12.4 a week) | last 3 weeks 15.5 a week | lineup value 45.5
8122 | Zonovan Knight | RB | age 25 | ARI | market 0 | projected 71.9 (9 a week) | last 3 weeks 7.3 a week | lineup value 26.2
11566 | Jayden Daniels | QB | age 25 | WAS | market 7139 | projected 64.4 (8 a week) | last 3 weeks 14.9 a week | lineup value 48
11627 | Troy Franklin | WR | age 23 | DEN | market 3035 | projected 63.8 (8 a week) | last 3 weeks 6.7 a week | lineup value 11.7
6783 | Jerry Jeudy | WR | age 27 | CLE | market 2702 | projected 61.6 (7.7 a week) | last 3 weeks 6.9 a week | lineup value 11.9
11610 | Malik Washington | WR | age 25 | MIA | market 2739 | projected 58.2 (7.3 a week) | last 3 weeks 4.8 a week | lineup value 5.9
8132 | Tyler Allgeier | RB | age 26 | ARI | market 3179 | projected 57.3 (7.2 a week) | last 3 weeks 7.3 a week | lineup value 6.9
9479 | Darnell Washington | TE | age 25 | PIT | market 0 | projected 49.7 (6.2 a week) | last 3 weeks 5.4 a week | lineup value 12.9
6271 | Olamide Zaccheaus | WR | age 29 | ATL | market 0 | projected 47 (5.9 a week) | last 3 weeks 4.6 a week | lineup value 2.6
4454 | Kendrick Bourne | WR | age 31 | ARI | market 0 | projected 46.7 (5.8 a week) | last 3 weeks 15.4 a week | lineup value 7.8
6149 | Darius Slayton | WR | age 29 | IND | market 0 | projected 46.1 (5.8 a week) | last 3 weeks 3.5 a week | lineup value 7.4
9504 | Kayshon Boutte | WR | age 24 | HOU | market 2971 | projected 45.8 (5.7 a week) | last 3 weeks 12.1 a week | lineup value 7.9
8147 | John Metchie | WR | age 26 | CAR | market 0 | projected 37.3 (4.7 a week) | last 3 weeks 1 a week | lineup value 9.8
6826 | Cole Kmet | TE | age 27 | CHI | market 0 | projected 32 (4 a week) | last 3 weeks 3.5 a week | lineup value 0
12536 | Jaylin Noel | WR | age 24 | HOU | market 2766 | projected 30.1 (3.8 a week) | last 3 weeks 3.6 a week | lineup value 0
12455 | Brashard Smith | RB | age 23 | KC | market 2684 | projected 29.2 (3.6 a week) | last 3 weeks 6.1 a week | lineup value 0.3
12469 | Dylan Sampson | RB | age 22 | CLE | market 3255 | projected 27.9 (3.5 a week) | last 3 weeks 1.8 a week | lineup value 0
4040 | JuJu Smith-Schuster | WR | age 29 | FA | market 1346 | projected 27.5 (3.4 a week) | last 3 weeks 8.7 a week | lineup value 0
7694 | Tommy Tremble | TE | age 26 | CAR | market 0 | projected 24.4 (3.1 a week) | last 3 weeks 9.9 a week | lineup value 0
12503 | Isaiah Bond | WR | age 22 | CLE | market 0 | projected 23.6 (2.9 a week) | last 3 weeks 5.5 a week | lineup value 0.1

PARTNER (partnerId 8): record 3-3, rank 6, points for 864, contention window 0.56
6768 | Tua Tagovailoa | QB | age 28 | ATL | market 3185 | projected 126.1 (15.8 a week) | last 3 weeks 18.7 a week | lineup value 98.5
6794 | Justin Jefferson | WR | age 27 | MIN | market 4832 | projected 124 (15.5 a week) | last 3 weeks 14 a week | lineup value 65.1
9493 | Puka Nacua | WR | age 25 | LAR | market 5702 | projected 123.9 (15.5 a week) | last 3 weeks 21.8 a week | lineup value 76
4866 | Saquon Barkley | RB | age 29 | PHI | market 4210 | projected 113.1 (14.1 a week) | last 3 weeks 14.6 a week | lineup value 61.7
5022 | Dallas Goedert | TE | age 31 | PHI | market 3128 | projected 89.9 (11.2 a week) | last 3 weeks 21.5 a week | lineup value 37.1
7002 | Juwan Johnson | TE | age 30 | NO | market 3123 | projected 82.1 (10.3 a week) | last 3 weeks 4.5 a week | lineup value 30.7
7090 | Darnell Mooney | WR | age 28 | NYG | market 2373 | projected 77.6 (9.7 a week) | last 3 weeks 0.8 a week | lineup value 18.7
10232 | Michael Wilson | WR | age 26 | ARI | market 3645 | projected 67.8 (8.5 a week) | last 3 weeks 5.5 a week | lineup value 17.3
12534 | Kyle Monangai | RB | age 24 | CHI | market 3767 | projected 64.4 (8.1 a week) | last 3 weeks 2.4 a week | lineup value 10.4
12486 | Dillon Gabriel | QB | age 25 | CLE | market 0 | projected 59 (7.4 a week) | last 3 weeks 9.6 a week | lineup value 31.4
6806 | J.K. Dobbins | RB | age 27 | DEN | market 3284 | projected 50.8 (6.4 a week) | last 3 weeks 10.3 a week | lineup value 25.9
4033 | David Njoku | TE | age 30 | LAC | market 2852 | projected 50.5 (6.3 a week) | last 3 weeks 11 a week | lineup value 8.1
11571 | Isaiah Davis | RB | age 24 | NYJ | market 0 | projected 45.6 (5.7 a week) | last 3 weeks 4 a week | lineup value 2.4
11586 | Blake Corum | RB | age 25 | LAR | market 3520 | projected 41.5 (5.2 a week) | last 3 weeks 2.4 a week | lineup value 0
10219 | Chris Rodriguez | RB | age 27 | JAX | market 2738 | projected 39 (4.9 a week) | last 3 weeks 2.2 a week | lineup value 2.8
7496 | Nick Westbrook-Ikhine | WR | age 29 | IND | market 0 | projected 38.4 (4.8 a week) | last 3 weeks 0.4 a week | lineup value 0
4950 | Christian Kirk | WR | age 29 | SF | market 2201 | projected 38.1 (4.8 a week) | last 3 weeks 5.1 a week | lineup value 1.3
1426 | DeAndre Hopkins | WR | age 33 | FA | market 1505 | projected 37.7 (4.7 a week) | last 3 weeks 3.5 a week | lineup value 0
12521 | Elijah Arroyo | TE | age 23 | SEA | market 0 | projected 34.7 (4.3 a week) | last 3 weeks 4 a week | lineup value 0.4
3269 | Chris Moore | WR | age 33 | BAL | market 0 | projected 33.8 (4.2 a week) | last 3 weeks 4.8 a week | lineup value 3.6
11584 | Bucky Irving | RB | age 24 | TB | market 4281 | projected 29.2 (3.6 a week) | last 3 weeks 8.2 a week | lineup value 11.5
9511 | Keaton Mitchell | RB | age 24 | LAC | market 2842 | projected 29 (3.6 a week) | last 3 weeks 0.8 a week | lineup value 0

PARTNER (partnerId 3): record 3-3, rank 7, points for 839, contention window 0.44
6797 | Justin Herbert | QB | age 28 | LAC | market 6253 | projected 157 (19.6 a week) | last 3 weeks 18 a week | lineup value 17.3
6804 | Jordan Love | QB | age 27 | GB | market 5523 | projected 154.1 (19.3 a week) | last 3 weeks 16.1 a week | lineup value 0.8
4892 | Baker Mayfield | QB | age 31 | TB | market 4787 | projected 150.3 (18.8 a week) | last 3 weeks 25.1 a week | lineup value 13
9221 | Jahmyr Gibbs | RB | age 24 | DET | market 6345 | projected 145.9 (18.2 a week) | last 3 weeks 14 a week | lineup value 83.9
8130 | Trey McBride | TE | age 26 | ARI | market 4893 | projected 144.4 (18 a week) | last 3 weeks 17.5 a week | lineup value 60.6
4943 | Sam Darnold | QB | age 29 | SEA | market 4688 | projected 132.6 (16.6 a week) | last 3 weeks 25.6 a week | lineup value 0.4
8144 | Chris Olave | WR | age 26 | NO | market 4424 | projected 107.1 (13.4 a week) | last 3 weeks 12.6 a week | lineup value 23.7
12514 | Emeka Egbuka | WR | age 24 | TB | market 4523 | projected 101.9 (12.7 a week) | last 3 weeks 18.6 a week | lineup value 18.9
9228 | Bryce Young | QB | age 25 | CAR | market 4535 | projected 100.2 (12.5 a week) | last 3 weeks 17.3 a week | lineup value 0
12493 | Oronde Gadsden | TE | age 23 | LAC | market 4204 | projected 90.8 (11.4 a week) | last 3 weeks 7.3 a week | lineup value 8.6
8126 | Wan'Dale Robinson | WR | age 25 | TEN | market 3412 | projected 90.2 (11.3 a week) | last 3 weeks 11 a week | lineup value 6.7
11565 | J.J. McCarthy | QB | age 23 | NYG | market 3631 | projected 88.6 (11.1 a week) | last 3 weeks 0 a week | lineup value 0
8148 | Jameson Williams | WR | age 25 | DET | market 4099 | projected 84.4 (10.6 a week) | last 3 weeks 8.8 a week | lineup value 4.1
9758 | C.J. Stroud | QB | age 25 | HOU | market 5066 | projected 83.7 (10.5 a week) | last 3 weeks 19.7 a week | lineup value 0
4983 | DJ Moore | WR | age 29 | BUF | market 3654 | projected 82.8 (10.4 a week) | last 3 weeks 5.3 a week | lineup value 0.9
12506 | Harold Fannin | TE | age 22 | CLE | market 4713 | projected 82.1 (10.3 a week) | last 3 weeks 12.5 a week | lineup value 1.9
5844 | T.J. Hockenson | TE | age 29 | MIN | market 2964 | projected 82 (10.2 a week) | last 3 weeks 7.6 a week | lineup value 0
6801 | Tee Higgins | WR | age 27 | CIN | market 4126 | projected 80.8 (10.1 a week) | last 3 weeks 9.5 a week | lineup value 8.4
9754 | Quentin Johnston | WR | age 25 | LAC | market 3414 | projected 79.8 (10 a week) | last 3 weeks 9.9 a week | lineup value 0.5
7567 | Kenny Gainwell | RB | age 27 | TB | market 3103 | projected 78.6 (9.8 a week) | last 3 weeks 13.7 a week | lineup value 16.6
7591 | Justin Fields | QB | age 27 | KC | market 1943 | projected 75.4 (9.4 a week) | last 3 weeks 21 a week | lineup value 0
4066 | Evan Engram | TE | age 32 | DEN | market 0 | projected 71.4 (8.9 a week) | last 3 weeks 12.2 a week | lineup value 0

PARTNER (partnerId 1): record 6-0, rank 1, points for 1010.4, contention window 1
4046 | Patrick Mahomes | QB | age 31 | KC | market 5652 | projected 175.3 (21.9 a week) | last 3 weeks 33.5 a week | lineup value 84.7
4034 | Christian McCaffrey | RB | age 30 | SF | market 4581 | projected 163.2 (20.4 a week) | last 3 weeks 25.7 a week | lineup value 84.6
3294 | Dak Prescott | QB | age 33 | DAL | market 5435 | projected 161 (20.1 a week) | last 3 weeks 33.5 a week | lineup value 70.4
4217 | George Kittle | TE | age 33 | SF | market 3148 | projected 112.1 (14 a week) | last 3 weeks 0 a week | lineup value 33.4
8228 | Jaylen Warren | RB | age 27 | PIT | market 3520 | projected 109.1 (13.6 a week) | last 3 weeks 2.8 a week | lineup value 22
8137 | George Pickens | WR | age 25 | DAL | market 4771 | projected 105 (13.1 a week) | last 3 weeks 26.3 a week | lineup value 27
9224 | Chase Brown | RB | age 26 | CIN | market 4486 | projected 100.4 (12.5 a week) | last 3 weeks 9.9 a week | lineup value 22.4
8110 | Jake Ferguson | TE | age 27 | DAL | market 3460 | projected 95.1 (11.9 a week) | last 3 weeks 20.6 a week | lineup value 18.3
12526 | Tetairoa McMillan | WR | age 23 | CAR | market 4732 | projected 94.3 (11.8 a week) | last 3 weeks 13.8 a week | lineup value 15.6
6819 | Michael Pittman | WR | age 29 | PIT | market 2994 | projected 91 (11.4 a week) | last 3 weeks 11.3 a week | lineup value 15.4
4199 | Aaron Jones | RB | age 31 | MIN | market 2770 | projected 74.2 (9.3 a week) | last 3 weeks 0 a week | lineup value 5.6
4144 | Jonnu Smith | TE | age 31 | GB | market 0 | projected 73.1 (9.1 a week) | last 3 weeks 3.6 a week | lineup value 0.7
4098 | Kareem Hunt | RB | age 30 | FA | market 1801 | projected 67.1 (8.4 a week) | last 3 weeks 9.6 a week | lineup value 2.4
5947 | Jakobi Meyers | WR | age 29 | JAX | market 3302 | projected 65.8 (8.2 a week) | last 3 weeks 7.4 a week | lineup value 3.1
11655 | Tyrone Tracy | RB | age 26 | NYG | market 2968 | projected 64.2 (8 a week) | last 3 weeks 0.2 a week | lineup value 2.2
8125 | Calvin Austin | WR | age 27 | NYG | market 0 | projected 55.7 (7 a week) | last 3 weeks 1.1 a week | lineup value 0
4039 | Cooper Kupp | WR | age 33 | SEA | market 2099 | projected 53.6 (6.7 a week) | last 3 weeks 10.2 a week | lineup value 0
5906 | Dawson Knox | TE | age 29 | BUF | market 0 | projected 49.9 (6.2 a week) | last 3 weeks 4.6 a week | lineup value 0
12524 | Shedeur Sanders | QB | age 24 | CLE | market 3454 | projected 43.9 (5.5 a week) | last 3 weeks 0 a week | lineup value 0
2374 | Tyler Lockett | WR | age 33 | FA | market 2521 | projected 36.2 (4.5 a week) | last 3 weeks 2.9 a week | lineup value 0
10218 | Xavier Hutchinson | WR | age 26 | HOU | market 0 | projected 33.6 (4.2 a week) | last 3 weeks 6.8 a week | lineup value 0
8917 | KaVontae Turpin | WR | age 30 | DAL | market 1156 | projected 33 (4.1 a week) | last 3 weeks 2.1 a week | lineup value 0

CANDIDATE DEALS (from a rules-based finder; points are the finder projections for the rest of the season):
c1 | partnerId 2 | I give Davis Mills + Luke McCaffrey (7585,11650) | I get John Metchie (8147) | my points 6.8 | their points 25.4 | likelihood 0.77
c2 | partnerId 2 | I give Davis Mills (7585) | I get Zonovan Knight (8122) | my points 12.1 | their points 7.7 | likelihood 0.77
c3 | partnerId 2 | I give Kirk Cousins + Pat Bryant (1166,12492) | I get Stefon Diggs + Zonovan Knight (2449,8122) | my points 36.9 | their points -33.6 | likelihood 0.7
c4 | partnerId 8 | I give Jacoby Brissett + Kirk Cousins (3257,1166) | I get Dallas Goedert + DeAndre Hopkins (5022,1426) | my points 16.4 | their points 31.2 | likelihood 0.53
c5 | partnerId 2 | I give Tyler Shough + Davis Mills (12545,7585) | I get Breece Hall + Stefon Diggs (8155,2449) | my points 56.2 | their points -35.6 | likelihood 0.88
c6 | partnerId 8 | I give Jacoby Brissett + Davis Mills (3257,7585) | I get Dallas Goedert (5022) | my points 12.4 | their points 29 | likelihood 0.52
c7 | partnerId 8 | I give Jacoby Brissett + Tyler Shough (3257,12545) | I get Saquon Barkley + Bucky Irving (4866,11584) | my points 44.8 | their points -3 | likelihood 0.79
c8 | partnerId 8 | I give Tyler Shough + Kirk Cousins (12545,1166) | I get Saquon Barkley + Michael Wilson (4866,10232) | my points 57.6 | their points -25.7 | likelihood 0.76
c9 | partnerId 3 | I give Jack Bech + Tyler Shough (12483,12545) | I get Chris Olave + Wan'Dale Robinson (8144,8126) | my points 52.2 | their points -34 | likelihood 0.64
c10 | partnerId 3 | I give Tyler Shough (12545) | I get Chris Olave + Tee Higgins (8144,6801) | my points 60.1 | their points -35.3 | likelihood 0.58
c11 | partnerId 3 | I give Tyler Shough + Tyreek Hill (12545,3321) | I get Chris Olave (8144) | my points 41.2 | their points -23.7 | likelihood 0.68
c12 | partnerId 1 | I give Davis Mills + Jack Bech (7585,12483) | I get Aaron Jones + Cooper Kupp (4199,4039) | my points 14.8 | their points 6.8 | likelihood 0.52

Pick the best trades for my team.

=========== CASE 1180238487071715328-w10-r7 ===========
REPLY FILE: /Users/anik/workspace/chrome/sleeper/.eval-market/replies/suggest-v2/run1/1180238487071715328-w10-r7.json
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
Lineup slots: QB, RB, RB, WR, WR, TE, FLEX, FLEX, K, DEF, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN. Superflex: no. Tight end premium: no. Points per reception: 0.25.
Columns: id | name | position | age | team | market value | projected points for the rest of the regular season (and per week) | points per week over the last three weeks played | lineup value (points my lineup loses if this player is removed).

MY TEAM (partnerId me): record 9-0, rank 1, points for 1186.1, contention window 1
4892 | Baker Mayfield | QB | age 31 | TB | market 3122 | projected 94.4 (18.9 a week) | last 3 weeks 5.4 a week | lineup value 12
6813 | Jonathan Taylor | RB | age 27 | IND | market 5073 | projected 85.2 (17 a week) | last 3 weeks 25 a week | lineup value 32.7
4034 | Christian McCaffrey | RB | age 30 | SF | market 4529 | projected 85 (17 a week) | last 3 weeks 25.7 a week | lineup value 30.9
1373 | Geno Smith | QB | age 36 | NYJ | market 1820 | projected 81.2 (16.2 a week) | last 3 weeks 10 a week | lineup value 1.2
7569 | Nico Collins | WR | age 27 | HOU | market 4689 | projected 79.8 (16 a week) | last 3 weeks 5.5 a week | lineup value 13.1
6786 | CeeDee Lamb | WR | age 27 | DAL | market 5151 | projected 76.3 (15.3 a week) | last 3 weeks 14 a week | lineup value 23.3
6794 | Justin Jefferson | WR | age 27 | MIN | market 5128 | projected 75.8 (15.2 a week) | last 3 weeks 11.5 a week | lineup value 10.3
5850 | Josh Jacobs | RB | age 28 | GB | market 4055 | projected 69.5 (13.9 a week) | last 3 weeks 15.4 a week | lineup value 15.6
8150 | Kyren Williams | RB | age 26 | LAR | market 4559 | projected 67.9 (13.6 a week) | last 3 weeks 8.3 a week | lineup value 2.7
12474 | Woody Marks | RB | age 25 | HOU | market 3204 | projected 62.7 (12.5 a week) | last 3 weeks 8.5 a week | lineup value 1.5
7543 | Travis Etienne | RB | age 27 | NO | market 3801 | projected 62.1 (12.4 a week) | last 3 weeks 6.5 a week | lineup value 0
BUF | Buffalo Bills | DEF | age ? | BUF | market 0 | projected 60.5 (12.1 a week) | last 3 weeks 16 a week | lineup value 14.8
11635 | Ladd McConkey | WR | age 24 | LAC | market 4791 | projected 54.9 (11 a week) | last 3 weeks 11.9 a week | lineup value 1.5
5947 | Jakobi Meyers | WR | age 29 | JAX | market 3413 | projected 53.2 (10.6 a week) | last 3 weeks 1.3 a week | lineup value 0
DEN | Denver Broncos | DEF | age ? | DEN | market 0 | projected 51.1 (10.2 a week) | last 3 weeks 15.8 a week | lineup value 5.4
8126 | Wan'Dale Robinson | WR | age 25 | TEN | market 3360 | projected 48.4 (9.7 a week) | last 3 weeks 9 a week | lineup value 0
1945 | Chris Boswell | K | age 35 | PIT | market 0 | projected 46.3 (9.3 a week) | last 3 weeks 12.7 a week | lineup value 11.4
8676 | Rashid Shaheed | WR | age 28 | SEA | market 2881 | projected 43.9 (8.8 a week) | last 3 weeks 8.6 a week | lineup value 0
7002 | Juwan Johnson | TE | age 30 | NO | market 3063 | projected 40 (8 a week) | last 3 weeks 9.9 a week | lineup value 2.4
8110 | Jake Ferguson | TE | age 27 | DAL | market 3130 | projected 37.5 (7.5 a week) | last 3 weeks 7.5 a week | lineup value 0
8125 | Calvin Austin | WR | age 27 | NYG | market 0 | projected 37.2 (7.4 a week) | last 3 weeks 4.1 a week | lineup value 0
1339 | Zach Ertz | TE | age 35 | PHI | market 0 | projected 37.1 (7.4 a week) | last 3 weeks 6.7 a week | lineup value 0
3678 | Wil Lutz | K | age 32 | DEN | market 0 | projected 35.1 (7 a week) | last 3 weeks 5.7 a week | lineup value 0.2
4066 | Evan Engram | TE | age 32 | DEN | market 0 | projected 28.4 (5.7 a week) | last 3 weeks 4.4 a week | lineup value 0
9480 | Brenton Strange | TE | age 25 | JAX | market 3509 | projected 26.6 (5.3 a week) | last 3 weeks 0 a week | lineup value 0
4037 | Chris Godwin | WR | age 30 | TB | market 3129 | projected 25.7 (5.1 a week) | last 3 weeks 0 a week | lineup value 0
11566 | Jayden Daniels | QB | age 25 | WAS | market 4679 | projected 17.3 (3.5 a week) | last 3 weeks 11.3 a week | lineup value 0
11596 | Ben Sinnott | TE | age 24 | WAS | market 0 | projected 2.5 (0.5 a week) | last 3 weeks 1 a week | lineup value 0
5119 | Jason Sanders | K | age 30 | NYJ | market 0 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0

PARTNER (partnerId 10): record 4-5, rank 9, points for 1014.1, contention window 0
6904 | Jalen Hurts | QB | age 28 | PHI | market 4295 | projected 111.4 (22.3 a week) | last 3 weeks 16.5 a week | lineup value 18.8
3163 | Jared Goff | QB | age 32 | DET | market 3270 | projected 92.6 (18.5 a week) | last 3 weeks 10.2 a week | lineup value 0
5859 | A.J. Brown | WR | age 29 | NE | market 4583 | projected 75.6 (15.1 a week) | last 3 weeks 8.7 a week | lineup value 22.1
12512 | Quinshon Judkins | RB | age 22 | CLE | market 4524 | projected 68.1 (13.6 a week) | last 3 weeks 9.6 a week | lineup value 15.5
96 | Aaron Rodgers | QB | age 42 | PIT | market 1947 | projected 67.1 (13.4 a week) | last 3 weeks 17.8 a week | lineup value 0
8228 | Jaylen Warren | RB | age 27 | PIT | market 3551 | projected 65.6 (13.1 a week) | last 3 weeks 13.8 a week | lineup value 13
8137 | George Pickens | WR | age 25 | DAL | market 5167 | projected 65.3 (13.1 a week) | last 3 weeks 11.7 a week | lineup value 23.7
HOU | Houston Texans | DEF | age ? | HOU | market 0 | projected 58.8 (11.8 a week) | last 3 weeks 21.9 a week | lineup value 6.6
8134 | Khalil Shakir | WR | age 26 | BUF | market 3164 | projected 58.6 (11.7 a week) | last 3 weeks 8.3 a week | lineup value 5.1
6790 | D'Andre Swift | RB | age 27 | CHI | market 3607 | projected 56 (11.2 a week) | last 3 weeks 11.5 a week | lineup value 3.4
PIT | Pittsburgh Steelers | DEF | age ? | PIT | market 0 | projected 53.1 (10.6 a week) | last 3 weeks 11.8 a week | lineup value 1
4217 | George Kittle | TE | age 33 | SF | market 3227 | projected 51.9 (10.4 a week) | last 3 weeks 5.6 a week | lineup value 14.4
5872 | Deebo Samuel | WR | age 30 | SF | market 2711 | projected 49.9 (10 a week) | last 3 weeks 2.7 a week | lineup value 6.1
4983 | DJ Moore | WR | age 29 | BUF | market 3719 | projected 46.3 (9.3 a week) | last 3 weeks 13 a week | lineup value 0
5095 | Daniel Carlson | K | age 31 | NO | market 0 | projected 42.4 (8.5 a week) | last 3 weeks 1.3 a week | lineup value 42.4
3214 | Hunter Henry | TE | age 31 | NE | market 3159 | projected 37.4 (7.5 a week) | last 3 weeks 7 a week | lineup value 0
12484 | Jayden Higgins | WR | age 23 | HOU | market 3474 | projected 35.4 (7.1 a week) | last 3 weeks 4 a week | lineup value 0
11559 | Michael Penix | QB | age 26 | ATL | market 2231 | projected 30 (6 a week) | last 3 weeks 11.7 a week | lineup value 0
5848 | Marquise Brown | WR | age 29 | PHI | market 0 | projected 20.9 (4.2 a week) | last 3 weeks 5.7 a week | lineup value 0
12492 | Pat Bryant | WR | age 23 | DEN | market 3118 | projected 19.8 (4 a week) | last 3 weeks 5.1 a week | lineup value 0
2505 | Darren Waller | TE | age 34 | CAR | market 1397 | projected 15.1 (3 a week) | last 3 weeks 0 a week | lineup value 7.9
7594 | Chuba Hubbard | RB | age 27 | CAR | market 3219 | projected 14.5 (2.9 a week) | last 3 weeks 5.9 a week | lineup value 0

PARTNER (partnerId 9): record 4-5, rank 7, points for 1072.5, contention window 0.27
7547 | Amon-Ra St. Brown | WR | age 26 | DET | market 5446 | projected 94.9 (19 a week) | last 3 weeks 10 a week | lineup value 49.9
421 | Matthew Stafford | QB | age 38 | LAR | market 2916 | projected 91 (18.2 a week) | last 3 weeks 18.1 a week | lineup value 0.7
4046 | Patrick Mahomes | QB | age 31 | KC | market 3636 | projected 87.5 (17.5 a week) | last 3 weeks 20.9 a week | lineup value 13.7
6804 | Jordan Love | QB | age 27 | GB | market 3583 | projected 85.2 (17 a week) | last 3 weeks 17.2 a week | lineup value 0
9226 | De'Von Achane | RB | age 25 | MIA | market 4771 | projected 81.3 (16.3 a week) | last 3 weeks 13.5 a week | lineup value 45.8
4866 | Saquon Barkley | RB | age 29 | PHI | market 4170 | projected 74.4 (14.9 a week) | last 3 weeks 11.8 a week | lineup value 35.6
BAL | Baltimore Ravens | DEF | age ? | BAL | market 0 | projected 63.6 (12.7 a week) | last 3 weeks 13.1 a week | lineup value 6.6
PHI | Philadelphia Eagles | DEF | age ? | PHI | market 0 | projected 57.3 (11.5 a week) | last 3 weeks 12.5 a week | lineup value 0.6
8151 | Kenneth Walker | RB | age 25 | KC | market 4614 | projected 55.6 (11.1 a week) | last 3 weeks 4.6 a week | lineup value 16.9
8167 | Christian Watson | WR | age 27 | GB | market 4070 | projected 51.7 (10.3 a week) | last 3 weeks 5.9 a week | lineup value 8.2
7553 | Kyle Pitts | TE | age 26 | ATL | market 3880 | projected 48.5 (9.7 a week) | last 3 weeks 8 a week | lineup value 3.6
12518 | Tyler Warren | TE | age 24 | IND | market 4548 | projected 44.9 (9 a week) | last 3 weeks 9 a week | lineup value 8.2
5001 | Dalton Schultz | TE | age 30 | HOU | market 3041 | projected 43.8 (8.8 a week) | last 3 weeks 9.7 a week | lineup value 0.8
4039 | Cooper Kupp | WR | age 33 | SEA | market 2169 | projected 42.3 (8.5 a week) | last 3 weeks 1 a week | lineup value 0
7049 | Jauan Jennings | WR | age 29 | MIN | market 2937 | projected 42.1 (8.4 a week) | last 3 weeks 7.6 a week | lineup value 5.5
DAL | Dallas Cowboys | DEF | age ? | DAL | market 0 | projected 37.9 (7.6 a week) | last 3 weeks 19.8 a week | lineup value 0
9500 | Josh Downs | WR | age 25 | IND | market 3303 | projected 34.8 (7 a week) | last 3 weeks 8.3 a week | lineup value 0
1433 | Brandon McManus | K | age 34 | FA | market 0 | projected 33.9 (6.8 a week) | last 3 weeks 4.7 a week | lineup value 33.9
11646 | Jalen Coker | WR | age 24 | CAR | market 3362 | projected 29.3 (5.9 a week) | last 3 weeks 2.5 a week | lineup value 0
6149 | Darius Slayton | WR | age 29 | IND | market 0 | projected 29.2 (5.8 a week) | last 3 weeks 4 a week | lineup value 1.9
1426 | DeAndre Hopkins | WR | age 33 | FA | market 1599 | projected 27.8 (5.6 a week) | last 3 weeks 0.7 a week | lineup value 0
12469 | Dylan Sampson | RB | age 22 | CLE | market 3097 | projected 18.6 (3.7 a week) | last 3 weeks 2.2 a week | lineup value 0

PARTNER (partnerId 3): record 4-5, rank 6, points for 1079.7, contention window 0.42
4881 | Lamar Jackson | QB | age 29 | BAL | market 4900 | projected 111.6 (22.3 a week) | last 3 weeks 8.5 a week | lineup value 8
11564 | Drake Maye | QB | age 24 | NE | market 5421 | projected 86.2 (17.2 a week) | last 3 weeks 22.6 a week | lineup value 0
8155 | Breece Hall | RB | age 25 | NYJ | market 4229 | projected 67.6 (13.5 a week) | last 3 weeks 12.5 a week | lineup value 34.7
8148 | Jameson Williams | WR | age 25 | DET | market 4483 | projected 64.7 (12.9 a week) | last 3 weeks 4.9 a week | lineup value 23.9
9224 | Chase Brown | RB | age 26 | CIN | market 4290 | projected 57.2 (11.4 a week) | last 3 weeks 16.3 a week | lineup value 28.9
12526 | Tetairoa McMillan | WR | age 23 | CAR | market 4932 | projected 52.9 (10.6 a week) | last 3 weeks 9.1 a week | lineup value 18
5022 | Dallas Goedert | TE | age 31 | PHI | market 3084 | projected 51.6 (10.3 a week) | last 3 weeks 6 a week | lineup value 18.2
9756 | Jordan Addison | WR | age 24 | MIN | market 3784 | projected 51.3 (10.3 a week) | last 3 weeks 11.9 a week | lineup value 10.5
ARI | Arizona Cardinals | DEF | age ? | ARI | market 0 | projected 48.9 (9.8 a week) | last 3 weeks 13.3 a week | lineup value 9.7
KC | Kansas City Chiefs | DEF | age ? | KC | market 0 | projected 48.2 (9.6 a week) | last 3 weeks 15 a week | lineup value 9
6819 | Michael Pittman | WR | age 29 | PIT | market 2984 | projected 47.4 (9.5 a week) | last 3 weeks 17.9 a week | lineup value 14.6
9754 | Quentin Johnston | WR | age 25 | LAC | market 3600 | projected 44.3 (8.9 a week) | last 3 weeks 7.4 a week | lineup value 11.6
8259 | Cameron Dicker | K | age 26 | LAC | market 0 | projected 38 (7.6 a week) | last 3 weeks 10.7 a week | lineup value 12.1
6770 | Joe Burrow | QB | age 29 | CIN | market 4368 | projected 35.1 (7 a week) | last 3 weeks 0 a week | lineup value 0
7839 | Evan McPherson | K | age 27 | CIN | market 0 | projected 34.6 (6.9 a week) | last 3 weeks 11.7 a week | lineup value 8.6
4144 | Jonnu Smith | TE | age 31 | GB | market 0 | projected 30.6 (6.1 a week) | last 3 weeks 5.5 a week | lineup value 0
4033 | David Njoku | TE | age 30 | LAC | market 2702 | projected 30.2 (6 a week) | last 3 weeks 3.7 a week | lineup value 0
4988 | Nick Chubb | RB | age 30 | FA | market 1815 | projected 29.1 (5.8 a week) | last 3 weeks 4.1 a week | lineup value 2.1
11626 | Xavier Legette | WR | age 25 | CAR | market 0 | projected 26.8 (5.4 a week) | last 3 weeks 8.2 a week | lineup value 0
8143 | Jerome Ford | RB | age 27 | ARI | market 0 | projected 21.4 (4.3 a week) | last 3 weeks 0.7 a week | lineup value 0
12502 | Gunnar Helm | TE | age 24 | TEN | market 2979 | projected 21.2 (4.2 a week) | last 3 weeks 5.9 a week | lineup value 0
9494 | Marvin Mims | WR | age 24 | DEN | market 2801 | projected 16.4 (3.3 a week) | last 3 weeks 4.9 a week | lineup value 0

CANDIDATE DEALS (from a rules-based finder; points are the finder projections for the rest of the season):
c1 | partnerId 10 | I give Jayden Daniels (11566) | I get Jalen Hurts + George Kittle (6904,4217) | my points 28.5 | their points -33.3 | likelihood 0.92
c2 | partnerId 10 | I give Jakobi Meyers (5947) | I get George Kittle + Darren Waller (4217,2505) | my points 12.7 | their points -22.3 | likelihood 0.88
c3 | partnerId 9 | I give Travis Etienne + Wan'Dale Robinson (7543,8126) | I get Patrick Mahomes (4046) | my points 11.4 | their points 7 | likelihood 0.64
c4 | partnerId 9 | I give Travis Etienne + Jakobi Meyers (7543,5947) | I get Patrick Mahomes + Matthew Stafford (4046,421) | my points 11.4 | their points -3.4 | likelihood 0.63
c5 | partnerId 3 | I give Kyren Williams + Ladd McConkey (8150,11635) | I get Lamar Jackson (4881) | my points 10.7 | their points 20.4 | likelihood 0.52

Pick the best trades for my team.

=========== CASE 1180244250175504384-w10-r5 ===========
REPLY FILE: /Users/anik/workspace/chrome/sleeper/.eval-market/replies/suggest-v2/run1/1180244250175504384-w10-r5.json
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
Lineup slots: QB, RB, RB, WR, WR, WR, TE, FLEX, FLEX, FLEX, SUPER_FLEX, IDP_FLEX, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN. Superflex: yes. Tight end premium: yes. Points per reception: 1.
Columns: id | name | position | age | team | market value | projected points for the rest of the regular season (and per week) | points per week over the last three weeks played | lineup value (points my lineup loses if this player is removed).

MY TEAM (partnerId me): record 6-3, rank 3, points for 1498, contention window 0.95
9226 | De'Von Achane | RB | age 25 | MIA | market 5002 | projected 93.3 (18.7 a week) | last 3 weeks 16.8 a week | lineup value 54.7
6813 | Jonathan Taylor | RB | age 27 | IND | market 4977 | projected 91.5 (18.3 a week) | last 3 weeks 26.8 a week | lineup value 52.3
3294 | Dak Prescott | QB | age 33 | DAL | market 5069 | projected 91.1 (18.2 a week) | last 3 weeks 17.4 a week | lineup value 41.1
5870 | Daniel Jones | QB | age 29 | IND | market 3904 | projected 75.5 (15.1 a week) | last 3 weeks 22.8 a week | lineup value 15.1
8150 | Kyren Williams | RB | age 26 | LAR | market 4496 | projected 73.3 (14.7 a week) | last 3 weeks 8.6 a week | lineup value 25.9
5022 | Dallas Goedert | TE | age 31 | PHI | market 3145 | projected 67.8 (13.6 a week) | last 3 weeks 8.5 a week | lineup value 20.3
12545 | Tyler Shough | QB | age 27 | NO | market 4642 | projected 67.8 (13.6 a week) | last 3 weeks 5.5 a week | lineup value 7.4
12529 | TreVeyon Henderson | RB | age 23 | NE | market 4299 | projected 63 (12.6 a week) | last 3 weeks 6.2 a week | lineup value 25.7
7564 | Ja'Marr Chase | WR | age 26 | CIN | market 5798 | projected 59.9 (12 a week) | last 3 weeks 25.4 a week | lineup value 35.6
11635 | Ladd McConkey | WR | age 24 | LAC | market 4613 | projected 58 (11.6 a week) | last 3 weeks 15.4 a week | lineup value 25.5
12517 | Colston Loveland | TE | age 22 | CHI | market 5307 | projected 53.1 (10.6 a week) | last 3 weeks 16.3 a week | lineup value 5.7
4066 | Evan Engram | TE | age 32 | DEN | market 0 | projected 41.4 (8.3 a week) | last 3 weeks 7.1 a week | lineup value 2.8
9508 | Tyjae Spears | RB | age 25 | TEN | market 2976 | projected 38.2 (7.6 a week) | last 3 weeks 11.5 a week | lineup value 2.2
11586 | Blake Corum | RB | age 25 | LAR | market 3521 | projected 34.2 (6.8 a week) | last 3 weeks 3.7 a week | lineup value 0
6130 | Devin Singletary | RB | age 29 | NYG | market 0 | projected 34.2 (6.8 a week) | last 3 weeks 3.7 a week | lineup value 0
3200 | Sterling Shepard | WR | age 33 | NYJ | market 1665 | projected 28.6 (5.7 a week) | last 3 weeks 3.1 a week | lineup value 4.2
4037 | Chris Godwin | WR | age 30 | TB | market 3109 | projected 28 (5.6 a week) | last 3 weeks 0 a week | lineup value 8.6
9501 | DeMario Douglas | WR | age 25 | NE | market 0 | projected 24.9 (5 a week) | last 3 weeks 10.8 a week | lineup value 3.9
11631 | Brian Thomas | WR | age 24 | JAX | market 3933 | projected 24.1 (4.8 a week) | last 3 weeks 4.9 a week | lineup value 6.2
4993 | Mike Gesicki | TE | age 31 | CIN | market 1212 | projected 24 (4.8 a week) | last 3 weeks 0 a week | lineup value 0
4219 | Jeremy McNichols | RB | age 30 | WAS | market 0 | projected 23.8 (4.8 a week) | last 3 weeks 6.1 a week | lineup value 0
2505 | Darren Waller | TE | age 34 | CAR | market 1422 | projected 19.8 (4 a week) | last 3 weeks 0 a week | lineup value 0
4454 | Kendrick Bourne | WR | age 31 | ARI | market 0 | projected 15.1 (3 a week) | last 3 weeks 5.4 a week | lineup value 0.3
8177 | Grant Calcaterra | TE | age 27 | PHI | market 0 | projected 10.2 (2 a week) | last 3 weeks 0 a week | lineup value 0
5995 | Justice Hill | RB | age 28 | BAL | market 2035 | projected 9.8 (2 a week) | last 3 weeks 1.2 a week | lineup value 0
8188 | Tyquan Thornton | WR | age 26 | KC | market 0 | projected 8 (1.6 a week) | last 3 weeks 1.6 a week | lineup value 0
11994 | Kameron Johnson | WR | age 24 | TB | market 0 | projected 5.6 (1.1 a week) | last 3 weeks 0 a week | lineup value 0
10885 | Lukas Van Ness | DL | age 25 | GB | market 0 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0
8364 | Trent McDuffie | DB | age 26 | LAR | market 0 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0
6872 | Kyle Dugger | DB | age 30 | CIN | market 0 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0

PARTNER (partnerId 12): record 7-2, rank 1, points for 1501.1, contention window 1
9221 | Jahmyr Gibbs | RB | age 24 | DET | market 6343 | projected 111.5 (22.3 a week) | last 3 weeks 14.5 a week | lineup value 62.6
9493 | Puka Nacua | WR | age 25 | LAR | market 5715 | projected 106.9 (21.4 a week) | last 3 weeks 7.6 a week | lineup value 58
7523 | Trevor Lawrence | QB | age 27 | JAX | market 5592 | projected 91.7 (18.3 a week) | last 3 weeks 13.6 a week | lineup value 10.8
11563 | Bo Nix | QB | age 26 | DEN | market 5894 | projected 83.6 (16.7 a week) | last 3 weeks 30.8 a week | lineup value 19.3
9997 | Zay Flowers | WR | age 26 | BAL | market 4195 | projected 75.7 (15.1 a week) | last 3 weeks 8.5 a week | lineup value 26.8
8155 | Breece Hall | RB | age 25 | NYJ | market 4232 | projected 74.1 (14.8 a week) | last 3 weeks 13.7 a week | lineup value 25.2
7588 | Javonte Williams | RB | age 26 | DAL | market 4003 | projected 68.8 (13.8 a week) | last 3 weeks 14.7 a week | lineup value 26.8
10232 | Michael Wilson | WR | age 26 | ARI | market 3656 | projected 57.6 (11.5 a week) | last 3 weeks 5.7 a week | lineup value 8.7
5872 | Deebo Samuel | WR | age 30 | SF | market 2713 | projected 54.7 (10.9 a week) | last 3 weeks 4.5 a week | lineup value 15.2
7567 | Kenny Gainwell | RB | age 27 | TB | market 3129 | projected 54.6 (10.9 a week) | last 3 weeks 4.8 a week | lineup value 5.7
8122 | Zonovan Knight | RB | age 25 | ARI | market 0 | projected 53.4 (10.7 a week) | last 3 weeks 5.4 a week | lineup value 4.5
12524 | Shedeur Sanders | QB | age 24 | CLE | market 3357 | projected 44.3 (8.9 a week) | last 3 weeks 0 a week | lineup value 0
12540 | Chimere Dike | WR | age 24 | TEN | market 2889 | projected 35.6 (7.1 a week) | last 3 weeks 13.6 a week | lineup value 0
11571 | Isaiah Davis | RB | age 24 | NYJ | market 0 | projected 34.1 (6.8 a week) | last 3 weeks 8 a week | lineup value 0
5967 | Tony Pollard | RB | age 29 | TEN | market 3180 | projected 34 (6.8 a week) | last 3 weeks 8.7 a week | lineup value 0
2306 | Jameis Winston | QB | age 32 | NYG | market 0 | projected 33.2 (6.6 a week) | last 3 weeks 0 a week | lineup value 0
19 | Joe Flacco | QB | age 41 | CIN | market 0 | projected 33.1 (6.6 a week) | last 3 weeks 31.7 a week | lineup value 0.7
12486 | Dillon Gabriel | QB | age 25 | CLE | market 0 | projected 29.9 (6 a week) | last 3 weeks 7.1 a week | lineup value 0
10236 | Dalton Kincaid | TE | age 26 | BUF | market 3793 | projected 24.1 (4.8 a week) | last 3 weeks 10 a week | lineup value 17.2
11566 | Jayden Daniels | QB | age 25 | WAS | market 6720 | projected 18.9 (3.8 a week) | last 3 weeks 11.7 a week | lineup value 1.3
9494 | Marvin Mims | WR | age 24 | DEN | market 2746 | projected 17.6 (3.5 a week) | last 3 weeks 5.9 a week | lineup value 0
12495 | Ollie Gordon | RB | age 22 | MIA | market 0 | projected 17.4 (3.5 a week) | last 3 weeks 5.9 a week | lineup value 0

PARTNER (partnerId 10): record 3-6, rank 10, points for 1161.2, contention window 0.05
4984 | Josh Allen | QB | age 30 | BUF | market 7173 | projected 129.4 (25.9 a week) | last 3 weeks 18 a week | lineup value 129.4
4866 | Saquon Barkley | RB | age 29 | PHI | market 4238 | projected 82.8 (16.6 a week) | last 3 weeks 13.2 a week | lineup value 56.3
4217 | George Kittle | TE | age 33 | SF | market 3154 | projected 64.7 (12.9 a week) | last 3 weeks 8.4 a week | lineup value 40.5
6790 | D'Andre Swift | RB | age 27 | CHI | market 3636 | projected 61.9 (12.4 a week) | last 3 weeks 12 a week | lineup value 35.3
7526 | Jaylen Waddle | WR | age 27 | DEN | market 4010 | projected 61.7 (12.3 a week) | last 3 weeks 12.9 a week | lineup value 45.5
2449 | Stefon Diggs | WR | age 32 | WAS | market 2798 | projected 60.5 (12.1 a week) | last 3 weeks 12.4 a week | lineup value 44.2
8151 | Kenneth Walker | RB | age 25 | KC | market 4505 | projected 59.5 (11.9 a week) | last 3 weeks 4.9 a week | lineup value 33
4199 | Aaron Jones | RB | age 31 | MIN | market 2784 | projected 58.7 (11.7 a week) | last 3 weeks 5.6 a week | lineup value 32.1
7090 | Darnell Mooney | WR | age 28 | NYG | market 2377 | projected 51.3 (10.3 a week) | last 3 weeks 4.8 a week | lineup value 35
1339 | Zach Ertz | TE | age 35 | PHI | market 0 | projected 51.3 (10.3 a week) | last 3 weeks 10.8 a week | lineup value 28.6
8132 | Tyler Allgeier | RB | age 26 | ARI | market 3157 | projected 36.8 (7.4 a week) | last 3 weeks 3.9 a week | lineup value 10.2
1426 | DeAndre Hopkins | WR | age 33 | FA | market 1501 | projected 28.5 (5.7 a week) | last 3 weeks 0.8 a week | lineup value 12.3
4381 | Taysom Hill | TE | age 35 | FA | market 1509 | projected 25.3 (5.1 a week) | last 3 weeks 3.2 a week | lineup value 6.5
2749 | Raheem Mostert | RB | age 33 | FA | market 1164 | projected 18.6 (3.7 a week) | last 3 weeks 1.2 a week | lineup value 0
12544 | LeQuint Allen | RB | age 22 | JAX | market 0 | projected 12.8 (2.6 a week) | last 3 weeks 1.2 a week | lineup value 0
3271 | Tyler Higbee | TE | age 33 | LAR | market 0 | projected 11.1 (2.2 a week) | last 3 weeks 6.1 a week | lineup value 0
3230 | Vonn Bell | DB | age 30 | FA | market 0 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0
6888 | Antoine Winfield | DB | age 28 | TB | market 0 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0
6611 | Andrew Dowell | LB | age 27 | FA | market 0 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0
7811 | Talanoa Hufanga | DB | age 26 | DEN | market 0 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0
8398 | Jermaine Johnson | DL | age 27 | TEN | market 0 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0
4427 | Kenny Moore | DB | age 31 | PHI | market 0 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0

PARTNER (partnerId 2): record 5-4, rank 7, points for 1373.1, contention window 0.44
4881 | Lamar Jackson | QB | age 29 | BAL | market 7102 | projected 122.8 (24.6 a week) | last 3 weeks 9.9 a week | lineup value 24.7
421 | Matthew Stafford | QB | age 38 | LAR | market 4276 | projected 101.3 (20.3 a week) | last 3 weeks 21.1 a week | lineup value 3.2
3257 | Jacoby Brissett | QB | age 33 | ARI | market 2950 | projected 92.7 (18.5 a week) | last 3 weeks 16.2 a week | lineup value 0
5850 | Josh Jacobs | RB | age 28 | GB | market 3998 | projected 75.1 (15 a week) | last 3 weeks 17.4 a week | lineup value 46.3
12506 | Harold Fannin | TE | age 22 | CLE | market 4749 | projected 61.7 (12.3 a week) | last 3 weeks 10.3 a week | lineup value 23
1466 | Travis Kelce | TE | age 37 | KC | market 2882 | projected 57.6 (11.5 a week) | last 3 weeks 16.8 a week | lineup value 26.2
5947 | Jakobi Meyers | WR | age 29 | JAX | market 3313 | projected 56.6 (11.3 a week) | last 3 weeks 2.1 a week | lineup value 20
6819 | Michael Pittman | WR | age 29 | PIT | market 3013 | projected 52.4 (10.5 a week) | last 3 weeks 21.6 a week | lineup value 23.4
1166 | Kirk Cousins | QB | age 38 | LV | market 2266 | projected 48.5 (9.7 a week) | last 3 weeks 2.4 a week | lineup value 0
3214 | Hunter Henry | TE | age 31 | NE | market 3165 | projected 48.2 (9.6 a week) | last 3 weeks 9.5 a week | lineup value 16.7
12508 | Jaxson Dart | QB | age 23 | NYG | market 6572 | projected 45 (9 a week) | last 3 weeks 27.4 a week | lineup value 4.7
12534 | Kyle Monangai | RB | age 24 | CHI | market 3743 | projected 41.9 (8.4 a week) | last 3 weeks 14.2 a week | lineup value 8.5
11627 | Troy Franklin | WR | age 23 | DEN | market 3043 | projected 41.3 (8.3 a week) | last 3 weeks 16 a week | lineup value 10.5
5906 | Dawson Knox | TE | age 29 | BUF | market 0 | projected 40 (8 a week) | last 3 weeks 2.5 a week | lineup value 3.1
11610 | Malik Washington | WR | age 25 | MIA | market 2759 | projected 36.4 (7.3 a week) | last 3 weeks 9.6 a week | lineup value 5.6
11559 | Michael Penix | QB | age 26 | ATL | market 3198 | projected 32.7 (6.5 a week) | last 3 weeks 13 a week | lineup value 0
4988 | Nick Chubb | RB | age 30 | FA | market 1785 | projected 31.4 (6.3 a week) | last 3 weeks 4.8 a week | lineup value 1.5
11626 | Xavier Legette | WR | age 25 | CAR | market 0 | projected 29.8 (6 a week) | last 3 weeks 10.4 a week | lineup value 1.7
11600 | Ja'Tavion Sanders | TE | age 23 | CAR | market 0 | projected 29.6 (5.9 a week) | last 3 weeks 2.8 a week | lineup value 0
6039 | Ty Johnson | RB | age 29 | BUF | market 0 | projected 29.1 (5.8 a week) | last 3 weeks 3.5 a week | lineup value 0.7
5848 | Marquise Brown | WR | age 29 | PHI | market 0 | projected 22.5 (4.5 a week) | last 3 weeks 6.6 a week | lineup value 0
10218 | Xavier Hutchinson | WR | age 26 | HOU | market 0 | projected 20.3 (4.1 a week) | last 3 weeks 8 a week | lineup value 0

CANDIDATE DEALS (from a rules-based finder; points are the finder projections for the rest of the season):
c1 | partnerId 12 | I give Evan Engram + Grant Calcaterra (4066,8177) | I get Jameis Winston + Dillon Gabriel (2306,12486) | my points 5.6 | their points 26 | likelihood 0.8
c2 | partnerId 12 | I give Evan Engram + Devin Singletary (4066,6130) | I get Jameis Winston (2306) | my points 5.6 | their points 24.7 | likelihood 0.8
c3 | partnerId 12 | I give Evan Engram (4066) | I get Jameis Winston + Joe Flacco (2306,19) | my points 5.6 | their points 18.5 | likelihood 0.8
c4 | partnerId 12 | I give Grant Calcaterra + Devin Singletary (8177,6130) | I get Joe Flacco + Dillon Gabriel (19,12486) | my points 6.4 | their points 7.2 | likelihood 0.8
c5 | partnerId 10 | I give Deshaun Watson (4017) | I get Darnell Mooney (7090) | my points 10.7 | their points -35 | likelihood 0.87
c6 | partnerId 2 | I give Devin Singletary + Blake Corum (6130,11586) | I get Michael Pittman + Jacoby Brissett (6819,3257) | my points 29.5 | their points -16.7 | likelihood 0.87
c7 | partnerId 2 | I give Blake Corum + Tyjae Spears (11586,9508) | I get Jacoby Brissett + Travis Kelce (3257,1466) | my points 27.9 | their points -16.1 | likelihood 0.91
c8 | partnerId 2 | I give Darren Waller + Blake Corum (2505,11586) | I get Jacoby Brissett + Jakobi Meyers (3257,5947) | my points 27 | their points -14.8 | likelihood 0.57
c9 | partnerId 2 | I give Blake Corum + Mike Gesicki (11586,4993) | I get Michael Pittman + Travis Kelce (6819,1466) | my points 32.3 | their points -46.5 | likelihood 0.68

Pick the best trades for my team.

=========== CASE 1180244250175504384-w7-r7 ===========
REPLY FILE: /Users/anik/workspace/chrome/sleeper/.eval-market/replies/suggest-v2/run1/1180244250175504384-w7-r7.json
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
Lineup slots: QB, RB, RB, WR, WR, WR, TE, FLEX, FLEX, FLEX, SUPER_FLEX, IDP_FLEX, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN. Superflex: yes. Tight end premium: yes. Points per reception: 1.
Columns: id | name | position | age | team | market value | projected points for the rest of the regular season (and per week) | points per week over the last three weeks played | lineup value (points my lineup loses if this player is removed).

MY TEAM (partnerId me): record 4-2, rank 2, points for 1041.6, contention window 1
4034 | Christian McCaffrey | RB | age 30 | SF | market 4584 | projected 169.4 (21.2 a week) | last 3 weeks 26 a week | lineup value 95.1
6904 | Jalen Hurts | QB | age 28 | PHI | market 6084 | projected 163.1 (20.4 a week) | last 3 weeks 21.8 a week | lineup value 56.5
4892 | Baker Mayfield | QB | age 31 | TB | market 4518 | projected 147.1 (18.4 a week) | last 3 weeks 24.1 a week | lineup value 40.6
3198 | Derrick Henry | RB | age 32 | BAL | market 4102 | projected 122.2 (15.3 a week) | last 3 weeks 10.4 a week | lineup value 58
2133 | Davante Adams | WR | age 33 | LAR | market 3369 | projected 111.7 (14 a week) | last 3 weeks 12.4 a week | lineup value 40.3
7021 | Rico Dowdle | RB | age 28 | PIT | market 3239 | projected 99.9 (12.5 a week) | last 3 weeks 25.1 a week | lineup value 25.7
8110 | Jake Ferguson | TE | age 27 | DAL | market 3507 | projected 99.2 (12.4 a week) | last 3 weeks 20.6 a week | lineup value 26.4
11647 | Kimani Vidal | RB | age 25 | LAC | market 2782 | projected 95 (11.9 a week) | last 3 weeks 8.6 a week | lineup value 30.8
5001 | Dalton Schultz | TE | age 30 | HOU | market 3200 | projected 94.2 (11.8 a week) | last 3 weeks 8 a week | lineup value 10.4
1479 | Keenan Allen | WR | age 34 | IND | market 2154 | projected 88.3 (11 a week) | last 3 weeks 8.7 a week | lineup value 16.3
5844 | T.J. Hockenson | TE | age 29 | MIN | market 3000 | projected 85.3 (10.7 a week) | last 3 weeks 7.6 a week | lineup value 2.4
7049 | Jauan Jennings | WR | age 29 | MIN | market 2842 | projected 79.4 (9.9 a week) | last 3 weeks 2.7 a week | lineup value 7
2307 | Marcus Mariota | QB | age 32 | WAS | market 0 | projected 77.4 (9.7 a week) | last 3 weeks 6.4 a week | lineup value 0.5
4144 | Jonnu Smith | TE | age 31 | GB | market 0 | projected 75.9 (9.5 a week) | last 3 weeks 3.6 a week | lineup value 1.9
6783 | Jerry Jeudy | WR | age 27 | CLE | market 2712 | projected 64.1 (8 a week) | last 3 weeks 6.9 a week | lineup value 0
9487 | Parker Washington | WR | age 24 | JAX | market 4029 | projected 54.7 (6.8 a week) | last 3 weeks 6.8 a week | lineup value 0.7
6149 | Darius Slayton | WR | age 29 | IND | market 0 | projected 47.8 (6 a week) | last 3 weeks 3.8 a week | lineup value 0
7594 | Chuba Hubbard | RB | age 27 | CAR | market 3338 | projected 44.2 (5.5 a week) | last 3 weeks 3.3 a week | lineup value 0
8147 | John Metchie | WR | age 26 | CAR | market 0 | projected 39 (4.9 a week) | last 3 weeks 1 a week | lineup value 1.7
2374 | Tyler Lockett | WR | age 33 | FA | market 2533 | projected 37.7 (4.7 a week) | last 3 weeks 2.9 a week | lineup value 0
5927 | Terry McLaurin | WR | age 31 | WAS | market 3398 | projected 37.4 (4.7 a week) | last 3 weeks 0 a week | lineup value 7.4
12521 | Elijah Arroyo | TE | age 23 | SEA | market 0 | projected 35.9 (4.5 a week) | last 3 weeks 4 a week | lineup value 0
11630 | Roman Wilson | WR | age 25 | PIT | market 0 | projected 33.4 (4.2 a week) | last 3 weeks 0.7 a week | lineup value 0
6960 | Tyler Johnson | WR | age 28 | FA | market 1895 | projected 22.9 (2.9 a week) | last 3 weeks 0 a week | lineup value 0
11650 | Luke McCaffrey | WR | age 25 | WAS | market 0 | projected 19 (2.4 a week) | last 3 weeks 9.1 a week | lineup value 0
11783 | Ryan Flournoy | WR | age 26 | DAL | market 2518 | projected 17 (2.1 a week) | last 3 weeks 2.1 a week | lineup value 0
4080 | Zay Jones | WR | age 31 | FA | market 0 | projected 15.7 (2 a week) | last 3 weeks 5.2 a week | lineup value 0
12497 | Tory Horton | WR | age 23 | SEA | market 2783 | projected 14.7 (1.8 a week) | last 3 weeks 5 a week | lineup value 0
1689 | Adam Thielen | WR | age 35 | FA | market 2202 | projected 12.7 (1.6 a week) | last 3 weeks 1 a week | lineup value 0
4981 | Calvin Ridley | WR | age 31 | TEN | market 2278 | projected 9.5 (1.2 a week) | last 3 weeks 9 a week | lineup value 0

PARTNER (partnerId 12): record 4-2, rank 3, points for 1012.3, contention window 0.95
9221 | Jahmyr Gibbs | RB | age 24 | DET | market 6346 | projected 151.3 (18.9 a week) | last 3 weeks 14 a week | lineup value 84.8
11563 | Bo Nix | QB | age 26 | DEN | market 5860 | projected 144.5 (18.1 a week) | last 3 weeks 20.7 a week | lineup value 30.8
9493 | Puka Nacua | WR | age 25 | LAR | market 5715 | projected 128.8 (16.1 a week) | last 3 weeks 21.8 a week | lineup value 71
7523 | Trevor Lawrence | QB | age 27 | JAX | market 5593 | projected 126.9 (15.9 a week) | last 3 weeks 20.7 a week | lineup value 10.8
7588 | Javonte Williams | RB | age 26 | DAL | market 4001 | projected 120.9 (15.1 a week) | last 3 weeks 18.4 a week | lineup value 54.3
9997 | Zay Flowers | WR | age 26 | BAL | market 4196 | projected 107 (13.4 a week) | last 3 weeks 12.1 a week | lineup value 42.3
8155 | Breece Hall | RB | age 25 | NYJ | market 4233 | projected 105 (13.1 a week) | last 3 weeks 13.2 a week | lineup value 40.4
5872 | Deebo Samuel | WR | age 30 | SF | market 2714 | projected 82.5 (10.3 a week) | last 3 weeks 16.4 a week | lineup value 27.2
7567 | Kenny Gainwell | RB | age 27 | TB | market 3120 | projected 81.9 (10.2 a week) | last 3 weeks 13.7 a week | lineup value 9.1
19 | Joe Flacco | QB | age 41 | CIN | market 0 | projected 81.9 (10.2 a week) | last 3 weeks 8 a week | lineup value 2.8
8122 | Zonovan Knight | RB | age 25 | ARI | market 0 | projected 74.4 (9.3 a week) | last 3 weeks 0 a week | lineup value 7.8
10232 | Michael Wilson | WR | age 26 | ARI | market 3657 | projected 70.5 (8.8 a week) | last 3 weeks 5.5 a week | lineup value 10.5
5967 | Tony Pollard | RB | age 29 | TEN | market 3181 | projected 63.8 (8 a week) | last 3 weeks 10.7 a week | lineup value 5.3
11566 | Jayden Daniels | QB | age 25 | WAS | market 6775 | projected 63.3 (7.9 a week) | last 3 weeks 14.6 a week | lineup value 10.5
12486 | Dillon Gabriel | QB | age 25 | CLE | market 0 | projected 57.1 (7.1 a week) | last 3 weeks 9 a week | lineup value 0
12540 | Chimere Dike | WR | age 24 | TEN | market 2892 | projected 56.3 (7 a week) | last 3 weeks 2 a week | lineup value 1.3
10236 | Dalton Kincaid | TE | age 26 | BUF | market 3797 | projected 49 (6.1 a week) | last 3 weeks 10 a week | lineup value 27.4
11571 | Isaiah Davis | RB | age 24 | NYJ | market 0 | projected 47.2 (5.9 a week) | last 3 weeks 4 a week | lineup value 0.5
10859 | Sam LaPorta | TE | age 25 | DET | market 4268 | projected 45.6 (5.7 a week) | last 3 weeks 16.7 a week | lineup value 28
12524 | Shedeur Sanders | QB | age 24 | CLE | market 3357 | projected 44.3 (5.5 a week) | last 3 weeks 0 a week | lineup value 0
9494 | Marvin Mims | WR | age 24 | DEN | market 2744 | projected 34.1 (4.3 a week) | last 3 weeks 9.7 a week | lineup value 6
2306 | Jameis Winston | QB | age 32 | NYG | market 0 | projected 33.2 (4.2 a week) | last 3 weeks 0 a week | lineup value 0

PARTNER (partnerId 10): record 2-4, rank 10, points for 808.9, contention window 0.05
4984 | Josh Allen | QB | age 30 | BUF | market 7177 | projected 180 (22.5 a week) | last 3 weeks 23.2 a week | lineup value 180
4866 | Saquon Barkley | RB | age 29 | PHI | market 4234 | projected 118 (14.7 a week) | last 3 weeks 15 a week | lineup value 80.8
4217 | George Kittle | TE | age 33 | SF | market 3152 | projected 115.8 (14.5 a week) | last 3 weeks 0 a week | lineup value 76.4
7526 | Jaylen Waddle | WR | age 27 | DEN | market 4012 | projected 105.9 (13.2 a week) | last 3 weeks 16.2 a week | lineup value 79.5
2449 | Stefon Diggs | WR | age 32 | WAS | market 2801 | projected 103.3 (12.9 a week) | last 3 weeks 15.5 a week | lineup value 77
1339 | Zach Ertz | TE | age 35 | PHI | market 0 | projected 89.4 (11.2 a week) | last 3 weeks 8.8 a week | lineup value 51.4
6790 | D'Andre Swift | RB | age 27 | CHI | market 3640 | projected 86.7 (10.8 a week) | last 3 weeks 14.2 a week | lineup value 49.5
8151 | Kenneth Walker | RB | age 25 | KC | market 4513 | projected 82.8 (10.4 a week) | last 3 weeks 8.8 a week | lineup value 46.7
7090 | Darnell Mooney | WR | age 28 | NYG | market 2380 | projected 80.7 (10.1 a week) | last 3 weeks 0.8 a week | lineup value 54.3
4199 | Aaron Jones | RB | age 31 | MIN | market 2785 | projected 77.4 (9.7 a week) | last 3 weeks 0 a week | lineup value 40.7
8132 | Tyler Allgeier | RB | age 26 | ARI | market 3163 | projected 59.1 (7.4 a week) | last 3 weeks 7.3 a week | lineup value 17.4
4381 | Taysom Hill | TE | age 35 | FA | market 1514 | projected 40.2 (5 a week) | last 3 weeks 2.3 a week | lineup value 6.8
1426 | DeAndre Hopkins | WR | age 33 | FA | market 1501 | projected 39 (4.9 a week) | last 3 weeks 3.5 a week | lineup value 12.7
2749 | Raheem Mostert | RB | age 33 | FA | market 1166 | projected 27.6 (3.5 a week) | last 3 weeks 3.4 a week | lineup value 0
3271 | Tyler Higbee | TE | age 33 | LAR | market 0 | projected 24.8 (3.1 a week) | last 3 weeks 7.2 a week | lineup value 4
12544 | LeQuint Allen | RB | age 22 | JAX | market 0 | projected 18.5 (2.3 a week) | last 3 weeks 1.3 a week | lineup value 0
12530 | Travis Hunter | DB | age 23 | JAX | market 0 | projected 8.7 (1.1 a week) | last 3 weeks 7.7 a week | lineup value 8.7
3230 | Vonn Bell | DB | age 30 | FA | market 0 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0
6888 | Antoine Winfield | DB | age 28 | TB | market 0 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0
6611 | Andrew Dowell | LB | age 27 | FA | market 0 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0
7811 | Talanoa Hufanga | DB | age 26 | DEN | market 0 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0
8398 | Jermaine Johnson | DL | age 27 | TEN | market 0 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0

PARTNER (partnerId 8): record 0-6, rank 12, points for 632.4, contention window 0
11604 | Brock Bowers | TE | age 23 | LV | market 5581 | projected 118 (14.8 a week) | last 3 weeks 4 a week | lineup value 101.6
9228 | Bryce Young | QB | age 25 | CAR | market 4350 | projected 99.7 (12.5 a week) | last 3 weeks 16.3 a week | lineup value 89.7
8136 | Rachaad White | RB | age 27 | WAS | market 2749 | projected 91.1 (11.4 a week) | last 3 weeks 16.4 a week | lineup value 69.3
12498 | Mason Taylor | TE | age 22 | NYJ | market 3726 | projected 77.9 (9.7 a week) | last 3 weeks 12.6 a week | lineup value 54.6
7591 | Justin Fields | QB | age 27 | KC | market 1880 | projected 75.7 (9.5 a week) | last 3 weeks 20.7 a week | lineup value 65.7
11655 | Tyrone Tracy | RB | age 26 | NYG | market 2977 | projected 66.8 (8.3 a week) | last 3 weeks 0.2 a week | lineup value 45
8125 | Calvin Austin | WR | age 27 | NYG | market 0 | projected 57.8 (7.2 a week) | last 3 weeks 1.1 a week | lineup value 49.1
12484 | Jayden Higgins | WR | age 23 | HOU | market 3459 | projected 54.9 (6.9 a week) | last 3 weeks 5.5 a week | lineup value 46.3
4033 | David Njoku | TE | age 30 | LAC | market 2879 | projected 52.4 (6.6 a week) | last 3 weeks 11 a week | lineup value 32.4
9479 | Darnell Washington | TE | age 25 | PIT | market 0 | projected 51.5 (6.4 a week) | last 3 weeks 5.7 a week | lineup value 28.2
9484 | Tucker Kraft | TE | age 25 | GB | market 4163 | projected 44.2 (5.5 a week) | last 3 weeks 8.8 a week | lineup value 37.2
9480 | Brenton Strange | TE | age 25 | JAX | market 3665 | projected 36.5 (4.6 a week) | last 3 weeks 5.7 a week | lineup value 26.7
8154 | Brian Robinson | RB | age 27 | ATL | market 3144 | projected 25.2 (3.1 a week) | last 3 weeks 2.4 a week | lineup value 3.4
6943 | Gabe Davis | WR | age 26 | FA | market 1794 | projected 24.3 (3 a week) | last 3 weeks 0 a week | lineup value 15.7
12547 | Kyle Williams | WR | age 23 | NE | market 2812 | projected 20.3 (2.5 a week) | last 3 weeks -0.1 a week | lineup value 13.3
12457 | Jaydon Blue | RB | age 22 | PHI | market 2743 | projected 7.4 (0.9 a week) | last 3 weeks 0.2 a week | lineup value 0.5
6820 | Clyde Edwards-Helaire | RB | age 26 | FA | market 0 | projected 2.9 (0.4 a week) | last 3 weeks 0 a week | lineup value 0.7
5086 | Marquez Valdes-Scantling | WR | age 32 | LAC | market 0 | projected 1.6 (0.2 a week) | last 3 weeks 2 a week | lineup value 0
10235 | Roschon Johnson | RB | age 25 | CHI | market 0 | projected 1.1 (0.1 a week) | last 3 weeks 0.2 a week | lineup value 0
10225 | Jonathan Mingo | WR | age 25 | DAL | market 0 | projected 1.1 (0.1 a week) | last 3 weeks 0 a week | lineup value 0
5849 | Kyler Murray | QB | age 29 | MIN | market 4796 | projected 0 (0 a week) | last 3 weeks 11.8 a week | lineup value 0
3188 | Sheldon Rankins | DL | age 32 | HOU | market 0 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0

PARTNER (partnerId 6): record 4-2, rank 5, points for 977.4, contention window 0.69
4046 | Patrick Mahomes | QB | age 31 | KC | market 5248 | projected 168.9 (21.1 a week) | last 3 weeks 31.5 a week | lineup value 48.3
3163 | Jared Goff | QB | age 32 | DET | market 4774 | projected 143.4 (17.9 a week) | last 3 weeks 19.2 a week | lineup value 28.6
7547 | Amon-Ra St. Brown | WR | age 26 | DET | market 5314 | projected 141.6 (17.7 a week) | last 3 weeks 19.2 a week | lineup value 71.9
96 | Aaron Rodgers | QB | age 42 | PIT | market 2852 | projected 129.9 (16.2 a week) | last 3 weeks 11.1 a week | lineup value 8.8
12474 | Woody Marks | RB | age 25 | HOU | market 3114 | projected 99.7 (12.5 a week) | last 3 weeks 10.1 a week | lineup value 25.3
7553 | Kyle Pitts | TE | age 26 | ATL | market 3994 | projected 99.5 (12.4 a week) | last 3 weeks 8.9 a week | lineup value 29.3
12526 | Tetairoa McMillan | WR | age 23 | CAR | market 4740 | projected 97.9 (12.2 a week) | last 3 weeks 13.8 a week | lineup value 28.1
5045 | Courtland Sutton | WR | age 31 | DEN | market 3189 | projected 93.8 (11.7 a week) | last 3 weeks 13.2 a week | lineup value 25.2
5859 | A.J. Brown | WR | age 29 | NE | market 4317 | projected 91.1 (11.4 a week) | last 3 weeks 8.7 a week | lineup value 32.3
8676 | Rashid Shaheed | WR | age 28 | SEA | market 2697 | projected 80.8 (10.1 a week) | last 3 weeks 12.8 a week | lineup value 5.4
5892 | David Montgomery | RB | age 29 | HOU | market 3434 | projected 79.9 (10 a week) | last 3 weeks 9.5 a week | lineup value 11.4
8408 | Jordan Mason | RB | age 27 | MIN | market 3032 | projected 69.7 (8.7 a week) | last 3 weeks 7.6 a week | lineup value 4.3
4035 | Alvin Kamara | RB | age 31 | NO | market 2512 | projected 62.5 (7.8 a week) | last 3 weeks 11.1 a week | lineup value 10.6
8167 | Christian Watson | WR | age 27 | GB | market 3649 | projected 62.3 (7.8 a week) | last 3 weeks 0 a week | lineup value 6.3
5857 | Noah Fant | TE | age 28 | NO | market 0 | projected 57.3 (7.2 a week) | last 3 weeks 2.9 a week | lineup value 0
4039 | Cooper Kupp | WR | age 33 | SEA | market 2105 | projected 55.7 (7 a week) | last 3 weeks 10.2 a week | lineup value 0
12499 | Elic Ayomanor | WR | age 23 | TEN | market 2923 | projected 53.9 (6.7 a week) | last 3 weeks 5.3 a week | lineup value 1.5
6806 | J.K. Dobbins | RB | age 27 | DEN | market 3300 | projected 53 (6.6 a week) | last 3 weeks 10.3 a week | lineup value 11
8131 | Isaiah Likely | TE | age 26 | NYG | market 3489 | projected 50.6 (6.3 a week) | last 3 weeks 2.1 a week | lineup value 0.1
12476 | Devin Neal | RB | age 23 | WAS | market 2785 | projected 47.7 (6 a week) | last 3 weeks 0 a week | lineup value 7.3
9506 | Sean Tucker | RB | age 24 | TB | market 2777 | projected 47.3 (5.9 a week) | last 3 weeks 3.8 a week | lineup value 1.6
9504 | Kayshon Boutte | WR | age 24 | HOU | market 2965 | projected 47.3 (5.9 a week) | last 3 weeks 12.1 a week | lineup value 0

CANDIDATE DEALS (from a rules-based finder; points are the finder projections for the rest of the season):
c1 | partnerId 12 | I give Jonnu Smith (4144) | I get Joe Flacco (19) | my points 15.7 | their points 17.3 | likelihood 0.79
c2 | partnerId 10 | I give Najee Harris + Malik Willis (7528,8161) | I get Saquon Barkley + Jaylen Waddle (4866,7526) | my points 67.6 | their points -168.2 | likelihood 0.88
c3 | partnerId 10 | I give Malik Willis (8161) | I get Saquon Barkley + George Kittle (4866,4217) | my points 69.4 | their points -168 | likelihood 0.9
c4 | partnerId 10 | I give Ryan Flournoy + Malik Willis (11783,8161) | I get Saquon Barkley + Stefon Diggs (4866,2449) | my points 64.8 | their points -158.7 | likelihood 0.9
c5 | partnerId 8 | I give Najee Harris + Malik Willis (7528,8161) | I get Bryce Young + Rachaad White (9228,8136) | my points 37.6 | their points -164.7 | likelihood 0.87
c6 | partnerId 8 | I give Malik Willis (8161) | I get Rachaad White + Tucker Kraft (8136,9484) | my points 31.5 | their points -113.1 | likelihood 0.93
c7 | partnerId 6 | I give Marcus Mariota + T.J. Hockenson (2307,5844) | I get Aaron Rodgers (96) | my points 16.5 | their points 8.2 | likelihood 0.73

Pick the best trades for my team.

=========== CASE 1180263272813436928-w10-r6 ===========
REPLY FILE: /Users/anik/workspace/chrome/sleeper/.eval-market/replies/suggest-v2/run1/1180263272813436928-w10-r6.json
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
Lineup slots: QB, RB, RB, WR, WR, TE, FLEX, FLEX, FLEX, WRRB_FLEX, WRRB_FLEX, SUPER_FLEX, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN. Superflex: yes. Tight end premium: yes. Points per reception: 1.
Columns: id | name | position | age | team | market value | projected points for the rest of the regular season (and per week) | points per week over the last three weeks played | lineup value (points my lineup loses if this player is removed).

MY TEAM (partnerId me): record 4-5, rank 6, points for 1573.3, contention window 0.42
4881 | Lamar Jackson | QB | age 29 | BAL | market 7789 | projected 131.1 (26.2 a week) | last 3 weeks 11.4 a week | lineup value 49.5
9221 | Jahmyr Gibbs | RB | age 24 | DET | market 6791 | projected 116.2 (23.2 a week) | last 3 weeks 15.7 a week | lineup value 62.4
421 | Matthew Stafford | QB | age 38 | LAR | market 4586 | projected 105.8 (21.2 a week) | last 3 weeks 24.3 a week | lineup value 24.2
8150 | Kyren Williams | RB | age 26 | LAR | market 4987 | projected 79.2 (15.8 a week) | last 3 weeks 9.9 a week | lineup value 25.4
7525 | DeVonta Smith | WR | age 27 | PHI | market 4144 | projected 73.3 (14.7 a week) | last 3 weeks 16.6 a week | lineup value 19.2
11565 | J.J. McCarthy | QB | age 23 | NYG | market 3566 | projected 70.9 (14.2 a week) | last 3 weeks 7.6 a week | lineup value 0
10229 | Rashee Rice | WR | age 26 | KC | market 4414 | projected 70.4 (14.1 a week) | last 3 weeks 22.6 a week | lineup value 26.8
5012 | Mark Andrews | TE | age 31 | BAL | market 3101 | projected 65.3 (13.1 a week) | last 3 weeks 9.4 a week | lineup value 11.4
8111 | Cade Otton | TE | age 27 | TB | market 2951 | projected 63.3 (12.7 a week) | last 3 weeks 10.8 a week | lineup value 9.4
2449 | Stefon Diggs | WR | age 32 | WAS | market 2774 | projected 58.4 (11.7 a week) | last 3 weeks 12.4 a week | lineup value 14.1
8136 | Rachaad White | RB | age 27 | WAS | market 2967 | projected 56.8 (11.4 a week) | last 3 weeks 6.3 a week | lineup value 10.7
9756 | Jordan Addison | WR | age 24 | MIN | market 3604 | projected 52.1 (10.4 a week) | last 3 weeks 14 a week | lineup value 1.9
4098 | Kareem Hunt | RB | age 30 | FA | market 1994 | projected 48.7 (9.7 a week) | last 3 weeks 11.3 a week | lineup value 5.4
11620 | Rome Odunze | WR | age 24 | CHI | market 4049 | projected 47.8 (9.6 a week) | last 3 weeks 7.8 a week | lineup value 3.6
9754 | Quentin Johnston | WR | age 25 | LAC | market 3438 | projected 45.2 (9 a week) | last 3 weeks 8.8 a week | lineup value 2.2
8142 | Alec Pierce | WR | age 26 | IND | market 3396 | projected 43.2 (8.6 a week) | last 3 weeks 13.7 a week | lineup value 1
7600 | Pat Freiermuth | TE | age 27 | PIT | market 2337 | projected 42.2 (8.4 a week) | last 3 weeks 19 a week | lineup value 0
8210 | Chig Okonkwo | TE | age 27 | WAS | market 3052 | projected 35.1 (7 a week) | last 3 weeks 6.1 a week | lineup value 0
11625 | Adonai Mitchell | WR | age 24 | NYJ | market 2981 | projected 27.3 (5.5 a week) | last 3 weeks 1.2 a week | lineup value 0.1
5927 | Terry McLaurin | WR | age 31 | WAS | market 3379 | projected 24.2 (4.8 a week) | last 3 weeks 4.8 a week | lineup value 3.6
7587 | Dyami Brown | WR | age 26 | WAS | market 0 | projected 14.4 (2.9 a week) | last 3 weeks 4.3 a week | lineup value 0
11618 | Jalen McMillan | WR | age 24 | TB | market 2954 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0
4574 | Cooper Rush | QB | age 32 | ATL | market 0 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0
6803 | Brandon Aiyuk | WR | age 28 | SF | market 2490 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0
7083 | Tyler Huntley | QB | age 28 | BAL | market 0 | projected 0 (0 a week) | last 3 weeks 6.5 a week | lineup value 0

PARTNER (partnerId 8): record 8-1, rank 1, points for 1774.9, contention window 1
4046 | Patrick Mahomes | QB | age 31 | KC | market 5603 | projected 99.6 (19.9 a week) | last 3 weeks 23.2 a week | lineup value 34.9
4034 | Christian McCaffrey | RB | age 30 | SF | market 4921 | projected 98.5 (19.7 a week) | last 3 weeks 29.7 a week | lineup value 71.8
11560 | Caleb Williams | QB | age 24 | CHI | market 7516 | projected 91.4 (18.3 a week) | last 3 weeks 20.1 a week | lineup value 26.8
6786 | CeeDee Lamb | WR | age 27 | DAL | market 4918 | projected 77.7 (15.5 a week) | last 3 weeks 18.1 a week | lineup value 46.1
8228 | Jaylen Warren | RB | age 27 | PIT | market 3899 | projected 76.9 (15.4 a week) | last 3 weeks 16.8 a week | lineup value 43.2
7588 | Javonte Williams | RB | age 26 | DAL | market 4430 | projected 74.1 (14.8 a week) | last 3 weeks 16.2 a week | lineup value 42.5
4199 | Aaron Jones | RB | age 31 | MIN | market 3089 | projected 63.4 (12.7 a week) | last 3 weeks 6.1 a week | lineup value 29.8
5846 | DK Metcalf | WR | age 28 | PIT | market 3426 | projected 63.4 (12.7 a week) | last 3 weeks 9 a week | lineup value 29.8
8110 | Jake Ferguson | TE | age 27 | DAL | market 3449 | projected 63.3 (12.7 a week) | last 3 weeks 14 a week | lineup value 35
10232 | Michael Wilson | WR | age 26 | ARI | market 3625 | projected 55.6 (11.1 a week) | last 3 weeks 5.4 a week | lineup value 22
6819 | Michael Pittman | WR | age 29 | PIT | market 2982 | projected 50.5 (10.1 a week) | last 3 weeks 21.6 a week | lineup value 26.2
12524 | Shedeur Sanders | QB | age 24 | CLE | market 3417 | projected 43.8 (8.8 a week) | last 3 weeks 0 a week | lineup value 0
8676 | Rashid Shaheed | WR | age 28 | SEA | market 2694 | projected 43.8 (8.8 a week) | last 3 weeks 11.4 a week | lineup value 10.2
8408 | Jordan Mason | RB | age 27 | MIN | market 3417 | projected 39.8 (8 a week) | last 3 weeks 7 a week | lineup value 8.8
9481 | Luke Musgrave | TE | age 26 | GB | market 0 | projected 39.5 (7.9 a week) | last 3 weeks 0 a week | lineup value 11.2
4988 | Nick Chubb | RB | age 30 | FA | market 2009 | projected 34.4 (6.9 a week) | last 3 weeks 5.9 a week | lineup value 5.9
19 | Joe Flacco | QB | age 41 | CIN | market 0 | projected 33 (6.6 a week) | last 3 weeks 32.6 a week | lineup value 0
1426 | DeAndre Hopkins | WR | age 33 | FA | market 1496 | projected 27.7 (5.5 a week) | last 3 weeks 0.8 a week | lineup value 2.4
11783 | Ryan Flournoy | WR | age 26 | DAL | market 2487 | projected 11 (2.2 a week) | last 3 weeks 3.6 a week | lineup value 0
12504 | Kaleb Johnson | RB | age 23 | GB | market 3097 | projected 7.9 (1.6 a week) | last 3 weeks 0.8 a week | lineup value 0
10871 | Luke Schoonmaker | TE | age 28 | DAL | market 0 | projected 7.6 (1.5 a week) | last 3 weeks 3.3 a week | lineup value 0
11643 | Jaylen Wright | RB | age 23 | MIA | market 3087 | projected 7.5 (1.5 a week) | last 3 weeks 1.6 a week | lineup value 0

PARTNER (partnerId 9): record 6-3, rank 4, points for 1715.7, contention window 0.73
6904 | Jalen Hurts | QB | age 28 | PHI | market 6587 | projected 126.3 (25.3 a week) | last 3 weeks 21.4 a week | lineup value 27.9
3294 | Dak Prescott | QB | age 33 | DAL | market 5414 | projected 94.7 (18.9 a week) | last 3 weeks 17.3 a week | lineup value 15.3
5850 | Josh Jacobs | RB | age 28 | GB | market 4385 | projected 80.2 (16 a week) | last 3 weeks 18.9 a week | lineup value 46.7
96 | Aaron Rodgers | QB | age 42 | PIT | market 3068 | projected 78.1 (15.6 a week) | last 3 weeks 21.2 a week | lineup value 0
5870 | Daniel Jones | QB | age 29 | IND | market 4127 | projected 77.7 (15.5 a week) | last 3 weeks 23.1 a week | lineup value 2.5
12514 | Emeka Egbuka | WR | age 24 | TB | market 4512 | projected 72.3 (14.5 a week) | last 3 weeks 5.4 a week | lineup value 25.2
7021 | Rico Dowdle | RB | age 28 | PIT | market 3590 | projected 70.8 (14.2 a week) | last 3 weeks 16.4 a week | lineup value 42.7
1466 | Travis Kelce | TE | age 37 | KC | market 2854 | projected 64.6 (12.9 a week) | last 3 weeks 18.6 a week | lineup value 27.8
12498 | Mason Taylor | TE | age 22 | NYJ | market 3663 | projected 63.3 (12.7 a week) | last 3 weeks 9.5 a week | lineup value 16.2
11635 | Ladd McConkey | WR | age 24 | LAC | market 4584 | projected 56.1 (11.2 a week) | last 3 weeks 15.4 a week | lineup value 18.1
5947 | Jakobi Meyers | WR | age 29 | JAX | market 3294 | projected 54.8 (11 a week) | last 3 weeks 2.1 a week | lineup value 8.8
10213 | Tre Tucker | WR | age 25 | LV | market 2704 | projected 54.5 (10.9 a week) | last 3 weeks 5 a week | lineup value 7.4
8121 | Romeo Doubs | WR | age 26 | NE | market 3156 | projected 52.5 (10.5 a week) | last 3 weeks 12.9 a week | lineup value 6.2
4983 | DJ Moore | WR | age 29 | BUF | market 3680 | projected 48.9 (9.8 a week) | last 3 weeks 15.1 a week | lineup value 3.1
9500 | Josh Downs | WR | age 25 | IND | market 3338 | projected 37.5 (7.5 a week) | last 3 weeks 9.5 a week | lineup value 0.5
12540 | Chimere Dike | WR | age 24 | TEN | market 2878 | projected 34.5 (6.9 a week) | last 3 weeks 2.5 a week | lineup value 0
10219 | Chris Rodriguez | RB | age 27 | JAX | market 3057 | projected 34.2 (6.8 a week) | last 3 weeks 7.2 a week | lineup value 6.5
8112 | Drake London | WR | age 25 | ATL | market 4846 | projected 33.5 (6.7 a week) | last 3 weeks 15.7 a week | lineup value 13.4
9486 | Dontayvion Wicks | WR | age 25 | PHI | market 2544 | projected 29.1 (5.8 a week) | last 3 weeks 0.5 a week | lineup value 0
4035 | Alvin Kamara | RB | age 31 | NO | market 2773 | projected 26.6 (5.3 a week) | last 3 weeks 5.1 a week | lineup value 16.3
4219 | Jeremy McNichols | RB | age 30 | WAS | market 0 | projected 24.5 (4.9 a week) | last 3 weeks 6.2 a week | lineup value 0
2505 | Darren Waller | TE | age 34 | CAR | market 1412 | projected 22.1 (4.4 a week) | last 3 weeks 0 a week | lineup value 4.2

CANDIDATE DEALS (from a rules-based finder; points are the finder projections for the rest of the season):
c1 | partnerId 8 | I give Stefon Diggs (2449) | I get Jaylen Wright + Kaleb Johnson (11643,12504) | my points -14.1 | their points 28.2 | likelihood 0.65
c2 | partnerId 8 | I give Stefon Diggs + Mark Andrews (2449,5012) | I get Jaylen Wright + Shedeur Sanders (11643,12524) | my points -28.5 | their points 45 | likelihood 0.66
c3 | partnerId 8 | I give Mark Andrews (5012) | I get Kaleb Johnson + Shedeur Sanders (12504,12524) | my points -11.4 | their points 27.2 | likelihood 0.66
c4 | partnerId 9 | I give Mark Andrews + Rachaad White (5012,8136) | I get Aaron Rodgers + Jayden Reed (96,10222) | my points -23.9 | their points 25.3 | likelihood 0.49
c5 | partnerId 9 | I give Stefon Diggs + Rachaad White (2449,8136) | I get Jayden Reed (10222) | my points -27.6 | their points 28.7 | likelihood 0.41

Pick the best trades for my team.
