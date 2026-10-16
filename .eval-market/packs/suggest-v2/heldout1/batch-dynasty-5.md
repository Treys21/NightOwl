You are answering fantasy football trade-advice cases. For each case below, follow the SYSTEM text, read the DATA, and write your JSON answer to the reply file named for that case.
Rules: write only the JSON object (no markdown fence, no commentary) to each reply file. Do not read any other file on disk. Do not look at any directory named truth or any file outside the reply paths. Work each case independently.

=========== CASE 1180333216832114688-w4-r1 ===========
REPLY FILE: /Users/anik/workspace/chrome/sleeper/.eval-market/replies/suggest-v2/heldout1/1180333216832114688-w4-r1.json
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
Lineup slots: QB, RB, RB, WR, WR, TE, FLEX, FLEX, FLEX, SUPER_FLEX, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN. Superflex: yes. Tight end premium: yes. Points per reception: 1.
Columns: id | name | position | age | team | market value | projected points for the rest of the regular season (and per week) | points per week over the last three weeks played | lineup value (points my lineup loses if this player is removed).

MY TEAM (partnerId me): record 3-0, rank 1, points for 455.5, contention window 1
4034 | Christian McCaffrey | RB | age 30 | SF | market 4580 | projected 233.1 (21.2 a week) | last 3 weeks 23.3 a week | lineup value 142.9
6813 | Jonathan Taylor | RB | age 27 | IND | market 4990 | projected 212.1 (19.3 a week) | last 3 weeks 25 a week | lineup value 122.4
96 | Aaron Rodgers | QB | age 42 | PIT | market 3091 | projected 171.3 (15.6 a week) | last 3 weeks 20.6 a week | lineup value 126.7
7588 | Javonte Williams | RB | age 26 | DAL | market 3999 | projected 163.3 (14.8 a week) | last 3 weeks 18.9 a week | lineup value 71.3
7564 | Ja'Marr Chase | WR | age 26 | CIN | market 5798 | projected 163.1 (14.8 a week) | last 3 weeks 16.3 a week | lineup value 79.5
1466 | Travis Kelce | TE | age 37 | KC | market 2869 | projected 132 (12 a week) | last 3 weeks 11.5 a week | lineup value 47.9
6819 | Michael Pittman | WR | age 29 | PIT | market 2993 | projected 128.4 (11.7 a week) | last 3 weeks 15.8 a week | lineup value 38.7
5022 | Dallas Goedert | TE | age 31 | PHI | market 3126 | projected 123 (11.2 a week) | last 3 weeks 8.6 a week | lineup value 38.9
8676 | Rashid Shaheed | WR | age 28 | SEA | market 2683 | projected 108.7 (9.9 a week) | last 3 weeks 10.9 a week | lineup value 13.5
8121 | Romeo Doubs | WR | age 26 | NE | market 3165 | projected 104 (9.5 a week) | last 3 weeks 8.4 a week | lineup value 13.8
11647 | Kimani Vidal | RB | age 25 | LAC | market 2787 | projected 99.9 (9.1 a week) | last 3 weeks 0 a week | lineup value 28.9
4039 | Cooper Kupp | WR | age 33 | SEA | market 2100 | projected 86.1 (7.8 a week) | last 3 weeks 8.2 a week | lineup value 10
8183 | Brock Purdy | QB | age 26 | SF | market 5909 | projected 85.1 (7.7 a week) | last 3 weeks 6.9 a week | lineup value 48.2
10226 | Andrei Iosivas | WR | age 27 | CIN | market 0 | projected 60.8 (5.5 a week) | last 3 weeks 0.7 a week | lineup value 1.8
2197 | Brandin Cooks | WR | age 33 | SF | market 0 | projected 41.2 (3.7 a week) | last 3 weeks 5.2 a week | lineup value 0.5
7587 | Dyami Brown | WR | age 26 | WAS | market 0 | projected 41.1 (3.7 a week) | last 3 weeks 9.7 a week | lineup value 0
6770 | Joe Burrow | QB | age 29 | CIN | market 6826 | projected 40.2 (3.7 a week) | last 3 weeks 6.6 a week | lineup value 14
6943 | Gabe Davis | WR | age 26 | FA | market 1803 | projected 23.5 (2.1 a week) | last 3 weeks 0 a week | lineup value 0
2216 | Mike Evans | WR | age 33 | SF | market 3196 | projected 15.4 (1.4 a week) | last 3 weeks 11.3 a week | lineup value 4
7562 | Tutu Atwell | WR | age 27 | LAR | market 0 | projected 13.7 (1.2 a week) | last 3 weeks 0.5 a week | lineup value 0
11729 | Sione Vaki | RB | age 25 | DET | market 0 | projected 0.7 (0.1 a week) | last 3 weeks 0 a week | lineup value 0
1837 | Jimmy Garoppolo | QB | age 34 | FA | market 2892 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0
4137 | James Conner | RB | age 31 | ARI | market 2739 | projected 0 (0 a week) | last 3 weeks 10.8 a week | lineup value 0
4179 | Joshua Dobbs | QB | age 31 | DET | market 0 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0
7561 | Elijah Mitchell | RB | age 28 | FA | market 0 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0
7601 | Rondale Moore | WR | age 25 | FA | market 0 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0
8230 | Ty Chandler | RB | age 28 | NO | market 0 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0

PARTNER (partnerId 2): record 1-2, rank 11, points for 363.1, contention window 0
4943 | Sam Darnold | QB | age 29 | SEA | market 4690 | projected 188.5 (17.1 a week) | last 3 weeks 15 a week | lineup value 48.4
1373 | Geno Smith | QB | age 36 | NYJ | market 2742 | projected 178.5 (16.2 a week) | last 3 weeks 18.2 a week | lineup value 38.4
8155 | Breece Hall | RB | age 25 | NYJ | market 4236 | projected 143.8 (13.1 a week) | last 3 weeks 10.5 a week | lineup value 83
6786 | CeeDee Lamb | WR | age 27 | DAL | market 4937 | projected 133.3 (12.1 a week) | last 3 weeks 12.7 a week | lineup value 81.8
5859 | A.J. Brown | WR | age 29 | NE | market 4325 | projected 129.7 (11.8 a week) | last 3 weeks 10.8 a week | lineup value 61.2
10229 | Rashee Rice | WR | age 26 | KC | market 4424 | projected 121.7 (11.1 a week) | last 3 weeks 0 a week | lineup value 70.2
7553 | Kyle Pitts | TE | age 26 | ATL | market 3965 | projected 116 (10.5 a week) | last 3 weeks 12 a week | lineup value 45
5844 | T.J. Hockenson | TE | age 29 | MIN | market 2964 | projected 103.4 (9.4 a week) | last 3 weeks 9 a week | lineup value 29
11559 | Michael Penix | QB | age 26 | ATL | market 3277 | projected 97.6 (8.9 a week) | last 3 weeks 11.4 a week | lineup value 0.1
12486 | Dillon Gabriel | QB | age 25 | CLE | market 0 | projected 93.9 (8.5 a week) | last 3 weeks 2.3 a week | lineup value 14.7
12489 | RJ Harvey | RB | age 25 | DEN | market 3706 | projected 93.1 (8.5 a week) | last 3 weeks 5.3 a week | lineup value 36.7
8210 | Chig Okonkwo | TE | age 27 | WAS | market 3056 | projected 81.2 (7.4 a week) | last 3 weeks 10 a week | lineup value 10.2
7611 | Rhamondre Stevenson | RB | age 28 | NE | market 3318 | projected 68.9 (6.3 a week) | last 3 weeks 9.5 a week | lineup value 19
4950 | Christian Kirk | WR | age 29 | SF | market 2203 | projected 57.1 (5.2 a week) | last 3 weeks 1.8 a week | lineup value 7.3
7594 | Chuba Hubbard | RB | age 27 | CAR | market 3333 | projected 56 (5.1 a week) | last 3 weeks 15.4 a week | lineup value 12
2505 | Darren Waller | TE | age 34 | CAR | market 1417 | projected 55.4 (5 a week) | last 3 weeks 0 a week | lineup value 11.6
9479 | Darnell Washington | TE | age 25 | PIT | market 0 | projected 54.4 (4.9 a week) | last 3 weeks 0.7 a week | lineup value 0
1426 | DeAndre Hopkins | WR | age 33 | FA | market 1504 | projected 50.3 (4.6 a week) | last 3 weeks 9.4 a week | lineup value 0
10444 | Cedric Tillman | WR | age 26 | NO | market 0 | projected 46.7 (4.2 a week) | last 3 weeks 10.7 a week | lineup value 2.6
2374 | Tyler Lockett | WR | age 33 | FA | market 2522 | projected 45.3 (4.1 a week) | last 3 weeks 3.5 a week | lineup value 0
2749 | Raheem Mostert | RB | age 33 | FA | market 1168 | projected 36.7 (3.3 a week) | last 3 weeks 0 a week | lineup value 0
8117 | Jalen Tolbert | WR | age 27 | MIA | market 0 | projected 36.3 (3.3 a week) | last 3 weeks 4 a week | lineup value 3.2

PARTNER (partnerId 10): record 2-1, rank 4, points for 385, contention window 0.82
6904 | Jalen Hurts | QB | age 28 | PHI | market 6377 | projected 230.8 (21 a week) | last 3 weeks 23 a week | lineup value 117.9
9509 | Bijan Robinson | RB | age 24 | ATL | market 6354 | projected 201.6 (18.3 a week) | last 3 weeks 20.1 a week | lineup value 128
7591 | Justin Fields | QB | age 27 | KC | market 1922 | projected 134.5 (12.2 a week) | last 3 weeks 11.2 a week | lineup value 32.5
12474 | Woody Marks | RB | age 25 | HOU | market 3119 | projected 114.1 (10.4 a week) | last 3 weeks 3.7 a week | lineup value 41
6801 | Tee Higgins | WR | age 27 | CIN | market 4127 | projected 113.8 (10.3 a week) | last 3 weeks 7.8 a week | lineup value 68.7
4217 | George Kittle | TE | age 33 | SF | market 3148 | projected 112.1 (10.2 a week) | last 3 weeks 4.8 a week | lineup value 58.4
5012 | Mark Andrews | TE | age 31 | BAL | market 3105 | projected 109.6 (10 a week) | last 3 weeks 11.3 a week | lineup value 37.1
12498 | Mason Taylor | TE | age 22 | NYJ | market 3681 | projected 100.3 (9.1 a week) | last 3 weeks 4.4 a week | lineup value 27.1
8408 | Jordan Mason | RB | age 27 | MIN | market 3050 | projected 98.7 (9 a week) | last 3 weeks 12.6 a week | lineup value 31.8
11628 | Marvin Harrison | WR | age 24 | HOU | market 3933 | projected 86 (7.8 a week) | last 3 weeks 10.1 a week | lineup value 48.3
11562 | Spencer Rattler | QB | age 26 | NO | market 0 | projected 79.1 (7.2 a week) | last 3 weeks 17.3 a week | lineup value 0
8132 | Tyler Allgeier | RB | age 26 | ARI | market 3175 | projected 70.6 (6.4 a week) | last 3 weeks 6.3 a week | lineup value 1.4
12540 | Chimere Dike | WR | age 24 | TEN | market 2871 | projected 64.5 (5.9 a week) | last 3 weeks 2.4 a week | lineup value 21.4
12502 | Gunnar Helm | TE | age 24 | TEN | market 3251 | projected 60.2 (5.5 a week) | last 3 weeks 4.7 a week | lineup value 2.1
8146 | Garrett Wilson | WR | age 26 | NYJ | market 4227 | projected 59.3 (5.4 a week) | last 3 weeks 18.3 a week | lineup value 39.4
11435 | Emanuel Wilson | RB | age 27 | SEA | market 2462 | projected 59.1 (5.4 a week) | last 3 weeks 1 a week | lineup value 4.1
9506 | Sean Tucker | RB | age 24 | TB | market 2749 | projected 58.8 (5.3 a week) | last 3 weeks 0.1 a week | lineup value 0.7
4037 | Chris Godwin | WR | age 30 | TB | market 3092 | projected 47.5 (4.3 a week) | last 3 weeks 0 a week | lineup value 12.3
12495 | Ollie Gordon | RB | age 22 | MIA | market 0 | projected 46.9 (4.3 a week) | last 3 weeks 4.5 a week | lineup value 0
9482 | Michael Mayer | TE | age 25 | LV | market 0 | projected 43.8 (4 a week) | last 3 weeks 4.6 a week | lineup value 6.8
2306 | Jameis Winston | QB | age 32 | NYG | market 0 | projected 33.5 (3 a week) | last 3 weeks 0 a week | lineup value 6.1
9511 | Keaton Mitchell | RB | age 24 | LAC | market 2842 | projected 32.7 (3 a week) | last 3 weeks 0 a week | lineup value 0

CANDIDATE DEALS (from a rules-based finder; points are the finder projections for the rest of the season):
c1 | partnerId 2 | I give Jimmy Garoppolo (1837) | I get Geno Smith + Dillon Gabriel (1373,12486) | my points 69.1 | their points -63.4 | likelihood 0.88
c2 | partnerId 2 | I give Jimmy Garoppolo + James Conner (1837,4137) | I get Geno Smith (1373) | my points 59 | their points -38.4 | likelihood 0.88
c3 | partnerId 10 | I give Rashid Shaheed + Gabe Davis (8676,6943) | I get Spencer Rattler + Sean Tucker (11562,9506) | my points 20 | their points 22.5 | likelihood 0.6
c4 | partnerId 10 | I give Rashid Shaheed + Dyami Brown (8676,7587) | I get Spencer Rattler + Emanuel Wilson (11562,11435) | my points 21.3 | their points 19.5 | likelihood 0.91
c5 | partnerId 10 | I give Romeo Doubs + Rashid Shaheed (8121,8676) | I get Justin Fields + Sean Tucker (7591,9506) | my points 34.1 | their points 5.5 | likelihood 0.93

Pick the best trades for my team.

=========== CASE 1180349643808837632-w7-r11 ===========
REPLY FILE: /Users/anik/workspace/chrome/sleeper/.eval-market/replies/suggest-v2/heldout1/1180349643808837632-w7-r11.json
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
Lineup slots: QB, RB, RB, WR, WR, TE, FLEX, FLEX, FLEX, SUPER_FLEX, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN. Superflex: yes. Tight end premium: no. Points per reception: 1.
Columns: id | name | position | age | team | market value | projected points for the rest of the regular season (and per week) | points per week over the last three weeks played | lineup value (points my lineup loses if this player is removed).

MY TEAM (partnerId me): record 3-3, rank 4, points for 836.7, contention window 0.82
3294 | Dak Prescott | QB | age 33 | DAL | market 4706 | projected 140.3 (17.5 a week) | last 3 weeks 27.2 a week | lineup value 27.6
6804 | Jordan Love | QB | age 27 | GB | market 4863 | projected 136.6 (17.1 a week) | last 3 weeks 14.1 a week | lineup value 10.4
6786 | CeeDee Lamb | WR | age 27 | DAL | market 4922 | projected 133.7 (16.7 a week) | last 3 weeks 0 a week | lineup value 90
7523 | Trevor Lawrence | QB | age 27 | JAX | market 5310 | projected 117 (14.6 a week) | last 3 weeks 19.4 a week | lineup value 5
7569 | Nico Collins | WR | age 27 | HOU | market 4429 | projected 111.8 (14 a week) | last 3 weeks 9.3 a week | lineup value 66.7
8150 | Kyren Williams | RB | age 26 | LAR | market 4552 | projected 107.1 (13.4 a week) | last 3 weeks 19.4 a week | lineup value 61.9
12514 | Emeka Egbuka | WR | age 24 | TB | market 4519 | projected 102.4 (12.8 a week) | last 3 weeks 18.6 a week | lineup value 57.2
8408 | Jordan Mason | RB | age 27 | MIN | market 3074 | projected 68.6 (8.6 a week) | last 3 weeks 7.6 a week | lineup value 18.9
12506 | Harold Fannin | TE | age 22 | CLE | market 4703 | projected 68.1 (8.5 a week) | last 3 weeks 10.3 a week | lineup value 25
7527 | Mac Jones | QB | age 28 | SF | market 1746 | projected 56.8 (7.1 a week) | last 3 weeks 11.8 a week | lineup value 0
11628 | Marvin Harrison | WR | age 24 | HOU | market 3923 | projected 50.6 (6.3 a week) | last 3 weeks 12.5 a week | lineup value 24.8
9506 | Sean Tucker | RB | age 24 | TB | market 2811 | projected 46.5 (5.8 a week) | last 3 weeks 3.8 a week | lineup value 5.8
11586 | Blake Corum | RB | age 25 | LAR | market 3569 | projected 42.4 (5.3 a week) | last 3 weeks 2.4 a week | lineup value 3
3200 | Sterling Shepard | WR | age 33 | NYJ | market 1659 | projected 41.7 (5.2 a week) | last 3 weeks 7.7 a week | lineup value 3.6
4219 | Jeremy McNichols | RB | age 30 | WAS | market 0 | projected 40.8 (5.1 a week) | last 3 weeks 3.5 a week | lineup value 0.6
12502 | Gunnar Helm | TE | age 24 | TEN | market 3242 | projected 39.9 (5 a week) | last 3 weeks 4.4 a week | lineup value 1
10859 | Sam LaPorta | TE | age 25 | DET | market 4248 | projected 37.6 (4.7 a week) | last 3 weeks 14.5 a week | lineup value 19.4
4147 | Samaje Perine | RB | age 31 | CIN | market 0 | projected 35.4 (4.4 a week) | last 3 weeks 3.5 a week | lineup value 6.9
8917 | KaVontae Turpin | WR | age 30 | DAL | market 1161 | projected 33.4 (4.2 a week) | last 3 weeks 2.1 a week | lineup value 0
11630 | Roman Wilson | WR | age 25 | PIT | market 0 | projected 32.3 (4 a week) | last 3 weeks 0.7 a week | lineup value 0.2
12509 | Tre' Harris | WR | age 24 | LAC | market 2826 | projected 19.9 (2.5 a week) | last 3 weeks 2.2 a week | lineup value 0
12539 | Arian Smith | WR | age 25 | NYJ | market 0 | projected 18.8 (2.4 a week) | last 3 weeks 0.8 a week | lineup value 1.5
11783 | Ryan Flournoy | WR | age 26 | DAL | market 2500 | projected 16.4 (2 a week) | last 3 weeks 2.1 a week | lineup value 0
12504 | Kaleb Johnson | RB | age 23 | GB | market 2731 | projected 10.9 (1.4 a week) | last 3 weeks 1.2 a week | lineup value 0
11596 | Ben Sinnott | TE | age 24 | WAS | market 0 | projected 6.4 (0.8 a week) | last 3 weeks 0 a week | lineup value 0
10235 | Roschon Johnson | RB | age 25 | CHI | market 0 | projected 1 (0.1 a week) | last 3 weeks 0.2 a week | lineup value 0
11595 | Jared Wiley | TE | age 25 | KC | market 1478 | projected 0.4 (0 a week) | last 3 weeks 0 a week | lineup value 0
12670 | KeAndre Lambert-Smith | WR | age 24 | LAC | market 0 | projected 0.2 (0 a week) | last 3 weeks 0.4 a week | lineup value 0
12500 | Quinn Ewers | QB | age 23 | JAX | market 0 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0
11581 | MarShawn Lloyd | RB | age 25 | GB | market 3214 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0

PARTNER (partnerId 4): record 1-5, rank 12, points for 630.3, contention window 0
8126 | Wan'Dale Robinson | WR | age 25 | TEN | market 3412 | projected 90.8 (11.4 a week) | last 3 weeks 11 a week | lineup value 30.6
8136 | Rachaad White | RB | age 27 | WAS | market 2758 | projected 88.7 (11.1 a week) | last 3 weeks 16.4 a week | lineup value 47.1
8121 | Romeo Doubs | WR | age 26 | NE | market 3167 | projected 85.3 (10.7 a week) | last 3 weeks 13.4 a week | lineup value 17.3
9754 | Quentin Johnston | WR | age 25 | LAC | market 3434 | projected 80.8 (10.1 a week) | last 3 weeks 10.2 a week | lineup value 22.1
8110 | Jake Ferguson | TE | age 27 | DAL | market 3462 | projected 78.5 (9.8 a week) | last 3 weeks 17.7 a week | lineup value 19.5
5001 | Dalton Schultz | TE | age 30 | HOU | market 3165 | projected 75.3 (9.4 a week) | last 3 weeks 6.3 a week | lineup value 7.7
12545 | Tyler Shough | QB | age 27 | NO | market 4341 | projected 75.2 (9.4 a week) | last 3 weeks 0 a week | lineup value 21.2
7002 | Juwan Johnson | TE | age 30 | NO | market 3116 | projected 68.7 (8.6 a week) | last 3 weeks 3.7 a week | lineup value 8.1
10232 | Michael Wilson | WR | age 26 | ARI | market 3638 | projected 68.1 (8.5 a week) | last 3 weeks 5.5 a week | lineup value 14.8
11655 | Tyrone Tracy | RB | age 26 | NYG | market 2984 | projected 65 (8.1 a week) | last 3 weeks 0.2 a week | lineup value 29.1
11597 | Theo Johnson | TE | age 25 | NYG | market 3213 | projected 61.2 (7.6 a week) | last 3 weeks 12.2 a week | lineup value 2.4
11566 | Jayden Daniels | QB | age 25 | WAS | market 6447 | projected 58.5 (7.3 a week) | last 3 weeks 13.3 a week | lineup value 24.8
11435 | Emanuel Wilson | RB | age 27 | SEA | market 2484 | projected 54.4 (6.8 a week) | last 3 weeks 4.3 a week | lineup value 14.4
12486 | Dillon Gabriel | QB | age 25 | CLE | market 0 | projected 51.9 (6.5 a week) | last 3 weeks 8.3 a week | lineup value 35
11626 | Xavier Legette | WR | age 25 | CAR | market 0 | projected 48.5 (6.1 a week) | last 3 weeks 4.7 a week | lineup value 0
827 | Tyrod Taylor | QB | age 37 | GB | market 0 | projected 46.7 (5.8 a week) | last 3 weeks 0 a week | lineup value 10.7
5857 | Noah Fant | TE | age 28 | NO | market 0 | projected 45.9 (5.7 a week) | last 3 weeks 2.2 a week | lineup value 0
7571 | Rashod Bateman | WR | age 26 | BAL | market 2474 | projected 40.4 (5 a week) | last 3 weeks 1.7 a week | lineup value 0
11834 | Devaughn Vele | WR | age 28 | NO | market 2273 | projected 38.2 (4.8 a week) | last 3 weeks 1.1 a week | lineup value 1.8
8143 | Jerome Ford | RB | age 27 | ARI | market 0 | projected 36.8 (4.6 a week) | last 3 weeks 5 a week | lineup value 2.8
12521 | Elijah Arroyo | TE | age 23 | SEA | market 0 | projected 29.4 (3.7 a week) | last 3 weeks 3.3 a week | lineup value 0
7535 | Hunter Long | TE | age 28 | ARI | market 0 | projected 13.2 (1.6 a week) | last 3 weeks 1.3 a week | lineup value 0

PARTNER (partnerId 8): record 3-3, rank 7, points for 661.1, contention window 0.44
6794 | Justin Jefferson | WR | age 27 | MIN | market 4819 | projected 124.5 (15.6 a week) | last 3 weeks 14 a week | lineup value 62.6
96 | Aaron Rodgers | QB | age 42 | PIT | market 2635 | projected 116.5 (14.6 a week) | last 3 weeks 10.1 a week | lineup value 30.9
6768 | Tua Tagovailoa | QB | age 28 | ATL | market 2779 | projected 110.7 (13.8 a week) | last 3 weeks 16 a week | lineup value 25.1
9997 | Zay Flowers | WR | age 26 | BAL | market 4184 | projected 103.5 (12.9 a week) | last 3 weeks 11.7 a week | lineup value 45.8
8155 | Breece Hall | RB | age 25 | NYJ | market 4263 | projected 102.6 (12.8 a week) | last 3 weeks 13.2 a week | lineup value 46.6
7021 | Rico Dowdle | RB | age 28 | PIT | market 3264 | projected 97.7 (12.2 a week) | last 3 weeks 23.4 a week | lineup value 41.4
7543 | Travis Etienne | RB | age 27 | NO | market 3839 | projected 90.8 (11.3 a week) | last 3 weeks 12.6 a week | lineup value 34.1
12522 | Cam Ward | QB | age 24 | TEN | market 4390 | projected 88.8 (11.1 a week) | last 3 weeks 7.5 a week | lineup value 12.4
8142 | Alec Pierce | WR | age 26 | IND | market 3409 | projected 67.4 (8.4 a week) | last 3 weeks 2.3 a week | lineup value 12.4
5967 | Tony Pollard | RB | age 29 | TEN | market 3193 | projected 62.1 (7.8 a week) | last 3 weeks 10.7 a week | lineup value 7.5
8111 | Cade Otton | TE | age 27 | TB | market 2962 | projected 61.8 (7.7 a week) | last 3 weeks 8.7 a week | lineup value 28.5
4035 | Alvin Kamara | RB | age 31 | NO | market 2509 | projected 60.6 (7.6 a week) | last 3 weeks 11.1 a week | lineup value 20.1
8125 | Calvin Austin | WR | age 27 | NYG | market 0 | projected 55.9 (7 a week) | last 3 weeks 1.1 a week | lineup value 3.8
12484 | Jayden Higgins | WR | age 23 | HOU | market 3441 | projected 53 (6.6 a week) | last 3 weeks 5.5 a week | lineup value 1.6
12476 | Devin Neal | RB | age 23 | WAS | market 2803 | projected 46.6 (5.8 a week) | last 3 weeks 0 a week | lineup value 7.5
4381 | Taysom Hill | TE | age 35 | FA | market 1531 | projected 36.3 (4.5 a week) | last 3 weeks 2.3 a week | lineup value 2.9
12495 | Ollie Gordon | RB | age 22 | MIA | market 0 | projected 30.7 (3.8 a week) | last 3 weeks 0.7 a week | lineup value 0
12469 | Dylan Sampson | RB | age 22 | CLE | market 3275 | projected 28.2 (3.5 a week) | last 3 weeks 1.8 a week | lineup value 0
10871 | Luke Schoonmaker | TE | age 28 | DAL | market 0 | projected 9 (1.1 a week) | last 3 weeks 2 a week | lineup value 0
10222 | Jayden Reed | WR | age 26 | GB | market 3365 | projected 7.1 (0.9 a week) | last 3 weeks 0 a week | lineup value 0
9757 | Kendre Miller | RB | age 24 | NO | market 2611 | projected 6.7 (0.8 a week) | last 3 weeks 7.5 a week | lineup value 0
11815 | Cornelius Johnson | WR | age 25 | FA | market 0 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0

PARTNER (partnerId 12): record 1-5, rank 11, points for 794.2, contention window 0
9493 | Puka Nacua | WR | age 25 | LAR | market 5687 | projected 124.3 (15.5 a week) | last 3 weeks 21.8 a week | lineup value 79.7
4943 | Sam Darnold | QB | age 29 | SEA | market 4142 | projected 117.9 (14.7 a week) | last 3 weeks 21.6 a week | lineup value 63.9
4866 | Saquon Barkley | RB | age 29 | PHI | market 4232 | projected 114.4 (14.3 a week) | last 3 weeks 14.6 a week | lineup value 60.5
2133 | Davante Adams | WR | age 33 | LAR | market 3375 | projected 108.6 (13.6 a week) | last 3 weeks 12.4 a week | lineup value 56.6
6790 | D'Andre Swift | RB | age 27 | CHI | market 3661 | projected 84.6 (10.6 a week) | last 3 weeks 13.8 a week | lineup value 30.7
7553 | Kyle Pitts | TE | age 26 | ATL | market 3958 | projected 80.4 (10 a week) | last 3 weeks 7.6 a week | lineup value 27.9
5872 | Deebo Samuel | WR | age 30 | SF | market 2701 | projected 79.7 (10 a week) | last 3 weeks 16.4 a week | lineup value 35.3
2307 | Marcus Mariota | QB | age 32 | WAS | market 0 | projected 70.9 (8.9 a week) | last 3 weeks 5.7 a week | lineup value 31.1
12533 | Jacory Croskey-Merritt | RB | age 25 | WAS | market 3249 | projected 68.7 (8.6 a week) | last 3 weeks 13.5 a week | lineup value 21.6
4098 | Kareem Hunt | RB | age 30 | FA | market 1815 | projected 68.1 (8.5 a week) | last 3 weeks 9.6 a week | lineup value 19.9
4039 | Cooper Kupp | WR | age 33 | SEA | market 2097 | projected 53.9 (6.7 a week) | last 3 weeks 10.2 a week | lineup value 7.5
11646 | Jalen Coker | WR | age 24 | CAR | market 3265 | projected 48.4 (6 a week) | last 3 weeks 0 a week | lineup value 2.3
4033 | David Njoku | TE | age 30 | LAC | market 2849 | projected 42 (5.3 a week) | last 3 weeks 9.2 a week | lineup value 0.7
11637 | Keon Coleman | WR | age 23 | BUF | market 2736 | projected 39.2 (4.9 a week) | last 3 weeks 7.3 a week | lineup value 6.4
6770 | Joe Burrow | QB | age 29 | CIN | market 5931 | projected 35.1 (4.4 a week) | last 3 weeks 0 a week | lineup value 12.4
9494 | Marvin Mims | WR | age 24 | DEN | market 2739 | projected 33 (4.1 a week) | last 3 weeks 9.7 a week | lineup value 1.1
12641 | Jaylin Lane | WR | age 24 | WAS | market 0 | projected 32.3 (4 a week) | last 3 weeks 3.9 a week | lineup value 0.5
8205 | Isiah Pacheco | RB | age 27 | DET | market 2554 | projected 30.9 (3.9 a week) | last 3 weeks 9.2 a week | lineup value 3
2306 | Jameis Winston | QB | age 32 | NYG | market 0 | projected 30.1 (3.8 a week) | last 3 weeks 0 a week | lineup value 7.3
5995 | Justice Hill | RB | age 28 | BAL | market 2033 | projected 23.7 (3 a week) | last 3 weeks 13.4 a week | lineup value 1.1
3271 | Tyler Higbee | TE | age 33 | LAR | market 0 | projected 20.1 (2.5 a week) | last 3 weeks 6.2 a week | lineup value 0
11577 | Will Shipley | RB | age 24 | PHI | market 0 | projected 12.7 (1.6 a week) | last 3 weeks 0.5 a week | lineup value 0

PARTNER (partnerId 9): record 3-3, rank 6, points for 738.1, contention window 0.56
9226 | De'Von Achane | RB | age 25 | MIA | market 4989 | projected 151.8 (19 a week) | last 3 weeks 21.6 a week | lineup value 96.5
4881 | Lamar Jackson | QB | age 29 | BAL | market 6661 | projected 134.5 (16.8 a week) | last 3 weeks 3.9 a week | lineup value 82.5
421 | Matthew Stafford | QB | age 38 | LAR | market 3939 | projected 124.3 (15.5 a week) | last 3 weeks 20.8 a week | lineup value 65
9224 | Chase Brown | RB | age 26 | CIN | market 4515 | projected 101.7 (12.7 a week) | last 3 weeks 10.3 a week | lineup value 52.5
7525 | DeVonta Smith | WR | age 27 | PHI | market 4159 | projected 101.3 (12.7 a week) | last 3 weeks 11.1 a week | lineup value 44.3
11647 | Kimani Vidal | RB | age 25 | LAC | market 2814 | projected 93.3 (11.7 a week) | last 3 weeks 8.6 a week | lineup value 37.9
5859 | A.J. Brown | WR | age 29 | NE | market 4314 | projected 88.3 (11 a week) | last 3 weeks 8.7 a week | lineup value 37.1
1466 | Travis Kelce | TE | age 37 | KC | market 2865 | projected 80.3 (10 a week) | last 3 weeks 14.2 a week | lineup value 39.8
7090 | Darnell Mooney | WR | age 28 | NYG | market 2373 | projected 78.1 (9.8 a week) | last 3 weeks 0.8 a week | lineup value 13.1
10213 | Tre Tucker | WR | age 25 | LV | market 2699 | projected 74.8 (9.3 a week) | last 3 weeks 9.1 a week | lineup value 15.5
11627 | Troy Franklin | WR | age 23 | DEN | market 3030 | projected 64.1 (8 a week) | last 3 weeks 7 a week | lineup value 7.3
6271 | Olamide Zaccheaus | WR | age 29 | ATL | market 0 | projected 47.2 (5.9 a week) | last 3 weeks 4.6 a week | lineup value 0
11571 | Isaiah Davis | RB | age 24 | NYJ | market 0 | projected 46 (5.8 a week) | last 3 weeks 4 a week | lineup value 9
10236 | Dalton Kincaid | TE | age 26 | BUF | market 3771 | projected 40.1 (5 a week) | last 3 weeks 8.9 a week | lineup value 9.7
7496 | Nick Westbrook-Ikhine | WR | age 29 | IND | market 0 | projected 38.6 (4.8 a week) | last 3 weeks 0.4 a week | lineup value 0
4950 | Christian Kirk | WR | age 29 | SF | market 2202 | projected 38.4 (4.8 a week) | last 3 weeks 5.1 a week | lineup value 0.1
1426 | DeAndre Hopkins | WR | age 33 | FA | market 1501 | projected 37.9 (4.7 a week) | last 3 weeks 3.5 a week | lineup value 1.1
8180 | Jalen Nailor | WR | age 27 | LV | market 2608 | projected 37.8 (4.7 a week) | last 3 weeks 5.5 a week | lineup value 0
9481 | Luke Musgrave | TE | age 26 | GB | market 0 | projected 34.7 (4.3 a week) | last 3 weeks 1.1 a week | lineup value 0
9486 | Dontayvion Wicks | WR | age 25 | PHI | market 2552 | projected 32.1 (4 a week) | last 3 weeks 2.5 a week | lineup value 0
11562 | Spencer Rattler | QB | age 26 | NO | market 0 | projected 30.1 (3.8 a week) | last 3 weeks 13.7 a week | lineup value 22.9
8119 | Jahan Dotson | WR | age 26 | ATL | market 0 | projected 23.8 (3 a week) | last 3 weeks 2 a week | lineup value 0

PARTNER (partnerId 7): record 6-0, rank 1, points for 959.3, contention window 1
9488 | Jaxon Smith-Njigba | WR | age 24 | SEA | market 5793 | projected 148.2 (18.5 a week) | last 3 weeks 23.5 a week | lineup value 69.8
7547 | Amon-Ra St. Brown | WR | age 26 | DET | market 5299 | projected 137 (17.1 a week) | last 3 weeks 19.2 a week | lineup value 58.7
4892 | Baker Mayfield | QB | age 31 | TB | market 4239 | projected 134 (16.7 a week) | last 3 weeks 22.1 a week | lineup value 62
3163 | Jared Goff | QB | age 32 | DET | market 4431 | projected 129.1 (16.1 a week) | last 3 weeks 16.9 a week | lineup value 43.6
12527 | Ashton Jeanty | RB | age 22 | LV | market 5352 | projected 111.1 (13.9 a week) | last 3 weeks 22 a week | lineup value 41.9
7526 | Jaylen Waddle | WR | age 27 | DEN | market 4001 | projected 102.5 (12.8 a week) | last 3 weeks 15.5 a week | lineup value 19.9
2449 | Stefon Diggs | WR | age 32 | WAS | market 2783 | projected 99.7 (12.5 a week) | last 3 weeks 15.5 a week | lineup value 21.8
12512 | Quinshon Judkins | RB | age 22 | CLE | market 4396 | projected 99.1 (12.4 a week) | last 3 weeks 13 a week | lineup value 29.9
12518 | Tyler Warren | TE | age 24 | IND | market 4601 | projected 89.3 (11.2 a week) | last 3 weeks 17 a week | lineup value 16.6
1479 | Keenan Allen | WR | age 34 | IND | market 2144 | projected 85.3 (10.7 a week) | last 3 weeks 8.7 a week | lineup value 3.9
5022 | Dallas Goedert | TE | age 31 | PHI | market 3126 | projected 76.3 (9.5 a week) | last 3 weeks 18.9 a week | lineup value 8
12493 | Oronde Gadsden | TE | age 23 | LAC | market 4195 | projected 76.1 (9.5 a week) | last 3 weeks 5.9 a week | lineup value 1.2
12489 | RJ Harvey | RB | age 25 | DEN | market 3729 | projected 69.7 (8.7 a week) | last 3 weeks 10.8 a week | lineup value 6.1
11559 | Michael Penix | QB | age 26 | ATL | market 3004 | projected 59.5 (7.4 a week) | last 3 weeks 11.4 a week | lineup value 1.3
12540 | Chimere Dike | WR | age 24 | TEN | market 2870 | projected 54.2 (6.8 a week) | last 3 weeks 2 a week | lineup value 3.8
4454 | Kendrick Bourne | WR | age 31 | ARI | market 0 | projected 46.9 (5.9 a week) | last 3 weeks 6.4 a week | lineup value 0
9484 | Tucker Kraft | TE | age 25 | GB | market 4152 | projected 36.8 (4.6 a week) | last 3 weeks 7.6 a week | lineup value 3.1
12455 | Brashard Smith | RB | age 23 | KC | market 2698 | projected 29.5 (3.7 a week) | last 3 weeks 6.1 a week | lineup value 0.2
12481 | Cam Skattebo | RB | age 24 | NYG | market 4221 | projected 28.9 (3.6 a week) | last 3 weeks 19.5 a week | lineup value 8.7
12535 | Isaac TeSlaa | WR | age 24 | DET | market 2788 | projected 25.4 (3.2 a week) | last 3 weeks 2.7 a week | lineup value 0
8154 | Brian Robinson | RB | age 27 | ATL | market 3188 | projected 24.8 (3.1 a week) | last 3 weeks 2.4 a week | lineup value 0
11199 | Emari Demercado | RB | age 27 | DAL | market 0 | projected 22 (2.7 a week) | last 3 weeks 5.4 a week | lineup value 0

CANDIDATE DEALS (from a rules-based finder; points are the finder projections for the rest of the season):
c1 | partnerId 4 | I give MarShawn Lloyd (11581) | I get Rachaad White + Tyrone Tracy (8136,11655) | my points 61.1 | their points -84.1 | likelihood 0.91
c2 | partnerId 8 | I give Trevor Lawrence (7523) | I get Zay Flowers + Breece Hall (9997,8155) | my points 98.6 | their points -84.7 | likelihood 0.84
c3 | partnerId 12 | I give MarShawn Lloyd (11581) | I get Deebo Samuel (5872) | my points 38.4 | their points -35.3 | likelihood 0.95
c4 | partnerId 8 | I give Trevor Lawrence + Jared Wiley (7523,11595) | I get Breece Hall + Rico Dowdle (8155,7021) | my points 89.6 | their points -81.9 | likelihood 0.89
c5 | partnerId 8 | I give Trevor Lawrence + MarShawn Lloyd (7523,11581) | I get Breece Hall + Travis Etienne (8155,7543) | my points 81.1 | their points -75.5 | likelihood 0.89
c6 | partnerId 9 | I give Mac Jones + MarShawn Lloyd (7527,11581) | I get Kimani Vidal (11647) | my points 42.6 | their points -30 | likelihood 0.68
c7 | partnerId 7 | I give Dak Prescott + Mac Jones (3294,7527) | I get Oronde Gadsden + Tyler Warren (12493,12518) | my points 21 | their points 7 | likelihood 0.56
c8 | partnerId 8 | I give Mac Jones + Trevor Lawrence (7527,7523) | I get Justin Jefferson + Alvin Kamara (6794,4035) | my points 74.6 | their points -72.3 | likelihood 0.61

Pick the best trades for my team.

=========== CASE 1180349643808837632-w7-r4 ===========
REPLY FILE: /Users/anik/workspace/chrome/sleeper/.eval-market/replies/suggest-v2/heldout1/1180349643808837632-w7-r4.json
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
Lineup slots: QB, RB, RB, WR, WR, TE, FLEX, FLEX, FLEX, SUPER_FLEX, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN. Superflex: yes. Tight end premium: no. Points per reception: 1.
Columns: id | name | position | age | team | market value | projected points for the rest of the regular season (and per week) | points per week over the last three weeks played | lineup value (points my lineup loses if this player is removed).

MY TEAM (partnerId me): record 1-5, rank 12, points for 630.3, contention window 0
8126 | Wan'Dale Robinson | WR | age 25 | TEN | market 3412 | projected 90.8 (11.4 a week) | last 3 weeks 11 a week | lineup value 30.6
8136 | Rachaad White | RB | age 27 | WAS | market 2758 | projected 88.7 (11.1 a week) | last 3 weeks 16.4 a week | lineup value 47.1
8121 | Romeo Doubs | WR | age 26 | NE | market 3167 | projected 85.3 (10.7 a week) | last 3 weeks 13.4 a week | lineup value 17.3
9754 | Quentin Johnston | WR | age 25 | LAC | market 3434 | projected 80.8 (10.1 a week) | last 3 weeks 10.2 a week | lineup value 22.1
8110 | Jake Ferguson | TE | age 27 | DAL | market 3462 | projected 78.5 (9.8 a week) | last 3 weeks 17.7 a week | lineup value 19.5
5001 | Dalton Schultz | TE | age 30 | HOU | market 3165 | projected 75.3 (9.4 a week) | last 3 weeks 6.3 a week | lineup value 7.7
12545 | Tyler Shough | QB | age 27 | NO | market 4341 | projected 75.2 (9.4 a week) | last 3 weeks 0 a week | lineup value 21.2
7002 | Juwan Johnson | TE | age 30 | NO | market 3116 | projected 68.7 (8.6 a week) | last 3 weeks 3.7 a week | lineup value 8.1
10232 | Michael Wilson | WR | age 26 | ARI | market 3638 | projected 68.1 (8.5 a week) | last 3 weeks 5.5 a week | lineup value 14.8
11655 | Tyrone Tracy | RB | age 26 | NYG | market 2984 | projected 65 (8.1 a week) | last 3 weeks 0.2 a week | lineup value 29.1
11597 | Theo Johnson | TE | age 25 | NYG | market 3213 | projected 61.2 (7.6 a week) | last 3 weeks 12.2 a week | lineup value 2.4
11566 | Jayden Daniels | QB | age 25 | WAS | market 6447 | projected 58.5 (7.3 a week) | last 3 weeks 13.3 a week | lineup value 24.8
11435 | Emanuel Wilson | RB | age 27 | SEA | market 2484 | projected 54.4 (6.8 a week) | last 3 weeks 4.3 a week | lineup value 14.4
12486 | Dillon Gabriel | QB | age 25 | CLE | market 0 | projected 51.9 (6.5 a week) | last 3 weeks 8.3 a week | lineup value 35
11626 | Xavier Legette | WR | age 25 | CAR | market 0 | projected 48.5 (6.1 a week) | last 3 weeks 4.7 a week | lineup value 0
827 | Tyrod Taylor | QB | age 37 | GB | market 0 | projected 46.7 (5.8 a week) | last 3 weeks 0 a week | lineup value 10.7
5857 | Noah Fant | TE | age 28 | NO | market 0 | projected 45.9 (5.7 a week) | last 3 weeks 2.2 a week | lineup value 0
7571 | Rashod Bateman | WR | age 26 | BAL | market 2474 | projected 40.4 (5 a week) | last 3 weeks 1.7 a week | lineup value 0
11834 | Devaughn Vele | WR | age 28 | NO | market 2273 | projected 38.2 (4.8 a week) | last 3 weeks 1.1 a week | lineup value 1.8
8143 | Jerome Ford | RB | age 27 | ARI | market 0 | projected 36.8 (4.6 a week) | last 3 weeks 5 a week | lineup value 2.8
12521 | Elijah Arroyo | TE | age 23 | SEA | market 0 | projected 29.4 (3.7 a week) | last 3 weeks 3.3 a week | lineup value 0
7535 | Hunter Long | TE | age 28 | ARI | market 0 | projected 13.2 (1.6 a week) | last 3 weeks 1.3 a week | lineup value 0
8698 | Jake Tonges | TE | age 27 | SF | market 2717 | projected 10 (1.2 a week) | last 3 weeks 14.6 a week | lineup value 0
8123 | Hassan Haskins | RB | age 26 | NE | market 0 | projected 8.8 (1.1 a week) | last 3 weeks 1.9 a week | lineup value 2.4
4171 | Josh Reynolds | WR | age 31 | FA | market 1295 | projected 7.8 (1 a week) | last 3 weeks 4.5 a week | lineup value 0
8168 | Skyy Moore | WR | age 26 | GB | market 0 | projected 7.6 (0.9 a week) | last 3 weeks 0 a week | lineup value 0
12718 | Konata Mumpfield | WR | age 23 | LAR | market 0 | projected 3.4 (0.4 a week) | last 3 weeks 0.6 a week | lineup value 0
12510 | Jalen Milroe | QB | age 23 | SEA | market 0 | projected 0 (0 a week) | last 3 weeks -0.7 a week | lineup value 0
12511 | Will Howard | QB | age 25 | PIT | market 0 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0
12688 | Cam Miller | QB | age 25 | FA | market 0 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0

PARTNER (partnerId 11): record 3-3, rank 4, points for 836.7, contention window 0.82
3294 | Dak Prescott | QB | age 33 | DAL | market 4706 | projected 140.3 (17.5 a week) | last 3 weeks 27.2 a week | lineup value 27.6
6804 | Jordan Love | QB | age 27 | GB | market 4863 | projected 136.6 (17.1 a week) | last 3 weeks 14.1 a week | lineup value 10.4
6786 | CeeDee Lamb | WR | age 27 | DAL | market 4922 | projected 133.7 (16.7 a week) | last 3 weeks 0 a week | lineup value 90
7523 | Trevor Lawrence | QB | age 27 | JAX | market 5310 | projected 117 (14.6 a week) | last 3 weeks 19.4 a week | lineup value 5
7569 | Nico Collins | WR | age 27 | HOU | market 4429 | projected 111.8 (14 a week) | last 3 weeks 9.3 a week | lineup value 66.7
8150 | Kyren Williams | RB | age 26 | LAR | market 4552 | projected 107.1 (13.4 a week) | last 3 weeks 19.4 a week | lineup value 61.9
12514 | Emeka Egbuka | WR | age 24 | TB | market 4519 | projected 102.4 (12.8 a week) | last 3 weeks 18.6 a week | lineup value 57.2
8408 | Jordan Mason | RB | age 27 | MIN | market 3074 | projected 68.6 (8.6 a week) | last 3 weeks 7.6 a week | lineup value 18.9
12506 | Harold Fannin | TE | age 22 | CLE | market 4703 | projected 68.1 (8.5 a week) | last 3 weeks 10.3 a week | lineup value 25
7527 | Mac Jones | QB | age 28 | SF | market 1746 | projected 56.8 (7.1 a week) | last 3 weeks 11.8 a week | lineup value 0
11628 | Marvin Harrison | WR | age 24 | HOU | market 3923 | projected 50.6 (6.3 a week) | last 3 weeks 12.5 a week | lineup value 24.8
9506 | Sean Tucker | RB | age 24 | TB | market 2811 | projected 46.5 (5.8 a week) | last 3 weeks 3.8 a week | lineup value 5.8
11586 | Blake Corum | RB | age 25 | LAR | market 3569 | projected 42.4 (5.3 a week) | last 3 weeks 2.4 a week | lineup value 3
3200 | Sterling Shepard | WR | age 33 | NYJ | market 1659 | projected 41.7 (5.2 a week) | last 3 weeks 7.7 a week | lineup value 3.6
4219 | Jeremy McNichols | RB | age 30 | WAS | market 0 | projected 40.8 (5.1 a week) | last 3 weeks 3.5 a week | lineup value 0.6
12502 | Gunnar Helm | TE | age 24 | TEN | market 3242 | projected 39.9 (5 a week) | last 3 weeks 4.4 a week | lineup value 1
10859 | Sam LaPorta | TE | age 25 | DET | market 4248 | projected 37.6 (4.7 a week) | last 3 weeks 14.5 a week | lineup value 19.4
4147 | Samaje Perine | RB | age 31 | CIN | market 0 | projected 35.4 (4.4 a week) | last 3 weeks 3.5 a week | lineup value 6.9
8917 | KaVontae Turpin | WR | age 30 | DAL | market 1161 | projected 33.4 (4.2 a week) | last 3 weeks 2.1 a week | lineup value 0
11630 | Roman Wilson | WR | age 25 | PIT | market 0 | projected 32.3 (4 a week) | last 3 weeks 0.7 a week | lineup value 0.2
12509 | Tre' Harris | WR | age 24 | LAC | market 2826 | projected 19.9 (2.5 a week) | last 3 weeks 2.2 a week | lineup value 0
12539 | Arian Smith | WR | age 25 | NYJ | market 0 | projected 18.8 (2.4 a week) | last 3 weeks 0.8 a week | lineup value 1.5

PARTNER (partnerId 5): record 5-1, rank 2, points for 920.6, contention window 1
6813 | Jonathan Taylor | RB | age 27 | IND | market 5008 | projected 154.2 (19.3 a week) | last 3 weeks 23.3 a week | lineup value 87.7
9221 | Jahmyr Gibbs | RB | age 24 | DET | market 6367 | projected 147.3 (18.4 a week) | last 3 weeks 14 a week | lineup value 79.8
11560 | Caleb Williams | QB | age 24 | CHI | market 6728 | projected 133.7 (16.7 a week) | last 3 weeks 10.9 a week | lineup value 20.5
5870 | Daniel Jones | QB | age 29 | IND | market 3718 | projected 124 (15.5 a week) | last 3 weeks 17.5 a week | lineup value 19.7
8137 | George Pickens | WR | age 25 | DAL | market 4762 | projected 105.5 (13.2 a week) | last 3 weeks 26.3 a week | lineup value 39.6
11604 | Brock Bowers | TE | age 23 | LV | market 5533 | projected 95.5 (11.9 a week) | last 3 weeks 3.2 a week | lineup value 38.8
6819 | Michael Pittman | WR | age 29 | PIT | market 2991 | projected 91.5 (11.4 a week) | last 3 weeks 11.3 a week | lineup value 25.6
9228 | Bryce Young | QB | age 25 | CAR | market 4107 | projected 91.3 (11.4 a week) | last 3 weeks 14.3 a week | lineup value 7
11620 | Rome Odunze | WR | age 24 | CHI | market 4058 | projected 89.2 (11.1 a week) | last 3 weeks 7.4 a week | lineup value 22.8
8151 | Kenneth Walker | RB | age 25 | KC | market 4561 | projected 81.2 (10.2 a week) | last 3 weeks 8.8 a week | lineup value 13.9
7567 | Kenny Gainwell | RB | age 27 | TB | market 3127 | projected 79.7 (10 a week) | last 3 weeks 13.7 a week | lineup value 6.4
5012 | Mark Andrews | TE | age 31 | BAL | market 3103 | projected 68.3 (8.5 a week) | last 3 weeks 6.9 a week | lineup value 7.2
9508 | Tyjae Spears | RB | age 25 | TEN | market 2979 | projected 61.6 (7.7 a week) | last 3 weeks 3.5 a week | lineup value 0.7
11610 | Malik Washington | WR | age 25 | MIA | market 2749 | projected 58.8 (7.3 a week) | last 3 weeks 4.8 a week | lineup value 0.4
12485 | Tez Johnson | WR | age 24 | TB | market 0 | projected 58.2 (7.3 a week) | last 3 weeks 7.9 a week | lineup value 3.3
8132 | Tyler Allgeier | RB | age 26 | ARI | market 3207 | projected 58.2 (7.3 a week) | last 3 weeks 7.3 a week | lineup value 0
1166 | Kirk Cousins | QB | age 38 | LV | market 2103 | projected 58.1 (7.3 a week) | last 3 weeks 0 a week | lineup value 0
5848 | Marquise Brown | WR | age 29 | PHI | market 0 | projected 41.6 (5.2 a week) | last 3 weeks 14 a week | lineup value 0
9479 | Darnell Washington | TE | age 25 | PIT | market 0 | projected 41.6 (5.2 a week) | last 3 weeks 0 a week | lineup value 4.9
7611 | Rhamondre Stevenson | RB | age 28 | NE | market 3349 | projected 40.4 (5.1 a week) | last 3 weeks 7.2 a week | lineup value 5.7
9501 | DeMario Douglas | WR | age 25 | NE | market 0 | projected 37.9 (4.7 a week) | last 3 weeks 6.6 a week | lineup value 0
2374 | Tyler Lockett | WR | age 33 | FA | market 2518 | projected 36.4 (4.5 a week) | last 3 weeks 2.9 a week | lineup value 0

PARTNER (partnerId 7): record 6-0, rank 1, points for 959.3, contention window 1
9488 | Jaxon Smith-Njigba | WR | age 24 | SEA | market 5793 | projected 148.2 (18.5 a week) | last 3 weeks 23.5 a week | lineup value 69.8
7547 | Amon-Ra St. Brown | WR | age 26 | DET | market 5299 | projected 137 (17.1 a week) | last 3 weeks 19.2 a week | lineup value 58.7
4892 | Baker Mayfield | QB | age 31 | TB | market 4239 | projected 134 (16.7 a week) | last 3 weeks 22.1 a week | lineup value 62
3163 | Jared Goff | QB | age 32 | DET | market 4431 | projected 129.1 (16.1 a week) | last 3 weeks 16.9 a week | lineup value 43.6
12527 | Ashton Jeanty | RB | age 22 | LV | market 5352 | projected 111.1 (13.9 a week) | last 3 weeks 22 a week | lineup value 41.9
7526 | Jaylen Waddle | WR | age 27 | DEN | market 4001 | projected 102.5 (12.8 a week) | last 3 weeks 15.5 a week | lineup value 19.9
2449 | Stefon Diggs | WR | age 32 | WAS | market 2783 | projected 99.7 (12.5 a week) | last 3 weeks 15.5 a week | lineup value 21.8
12512 | Quinshon Judkins | RB | age 22 | CLE | market 4396 | projected 99.1 (12.4 a week) | last 3 weeks 13 a week | lineup value 29.9
12518 | Tyler Warren | TE | age 24 | IND | market 4601 | projected 89.3 (11.2 a week) | last 3 weeks 17 a week | lineup value 16.6
1479 | Keenan Allen | WR | age 34 | IND | market 2144 | projected 85.3 (10.7 a week) | last 3 weeks 8.7 a week | lineup value 3.9
5022 | Dallas Goedert | TE | age 31 | PHI | market 3126 | projected 76.3 (9.5 a week) | last 3 weeks 18.9 a week | lineup value 8
12493 | Oronde Gadsden | TE | age 23 | LAC | market 4195 | projected 76.1 (9.5 a week) | last 3 weeks 5.9 a week | lineup value 1.2
12489 | RJ Harvey | RB | age 25 | DEN | market 3729 | projected 69.7 (8.7 a week) | last 3 weeks 10.8 a week | lineup value 6.1
11559 | Michael Penix | QB | age 26 | ATL | market 3004 | projected 59.5 (7.4 a week) | last 3 weeks 11.4 a week | lineup value 1.3
12540 | Chimere Dike | WR | age 24 | TEN | market 2870 | projected 54.2 (6.8 a week) | last 3 weeks 2 a week | lineup value 3.8
4454 | Kendrick Bourne | WR | age 31 | ARI | market 0 | projected 46.9 (5.9 a week) | last 3 weeks 6.4 a week | lineup value 0
9484 | Tucker Kraft | TE | age 25 | GB | market 4152 | projected 36.8 (4.6 a week) | last 3 weeks 7.6 a week | lineup value 3.1
12455 | Brashard Smith | RB | age 23 | KC | market 2698 | projected 29.5 (3.7 a week) | last 3 weeks 6.1 a week | lineup value 0.2
12481 | Cam Skattebo | RB | age 24 | NYG | market 4221 | projected 28.9 (3.6 a week) | last 3 weeks 19.5 a week | lineup value 8.7
12535 | Isaac TeSlaa | WR | age 24 | DET | market 2788 | projected 25.4 (3.2 a week) | last 3 weeks 2.7 a week | lineup value 0
8154 | Brian Robinson | RB | age 27 | ATL | market 3188 | projected 24.8 (3.1 a week) | last 3 weeks 2.4 a week | lineup value 0
11199 | Emari Demercado | RB | age 27 | DAL | market 0 | projected 22 (2.7 a week) | last 3 weeks 5.4 a week | lineup value 0

CANDIDATE DEALS (from a rules-based finder; points are the finder projections for the rest of the season):
c1 | partnerId 11 | I give Rachaad White + Tyrone Tracy (8136,11655) | I get MarShawn Lloyd (11581) | my points -84.1 | their points 61.1 | likelihood 0.67
c2 | partnerId 5 | I give Rachaad White + Wan'Dale Robinson (8136,8126) | I get Deshaun Watson + Jonathon Brooks (4017,11583) | my points -78.3 | their points 46.7 | likelihood 0.73
c3 | partnerId 5 | I give Rachaad White + Quentin Johnston (8136,9754) | I get Brandon Aiyuk + Jonathon Brooks (6803,11583) | my points -69.2 | their points 38.3 | likelihood 0.74
c4 | partnerId 7 | I give Rachaad White + Tyrone Tracy (8136,11655) | I get Brian Robinson (8154) | my points -80.2 | their points 23.7 | likelihood 0.63
c5 | partnerId 7 | I give Rachaad White + Emanuel Wilson (8136,11435) | I get Jalen McMillan (11618) | my points -72.9 | their points 21.6 | likelihood 0.61
c6 | partnerId 5 | I give Rachaad White + Romeo Doubs (8136,8121) | I get Jonathon Brooks (11583) | my points -65 | their points 34.9 | likelihood 0.56
c7 | partnerId 7 | I give Rachaad White + Dillon Gabriel (8136,12486) | I get Jalen McMillan + Isaac TeSlaa (11618,12535) | my points -82.1 | their points 18.7 | likelihood 0.55

Pick the best trades for my team.

=========== CASE 1180361412023083008-w10-r14 ===========
REPLY FILE: /Users/anik/workspace/chrome/sleeper/.eval-market/replies/suggest-v2/heldout1/1180361412023083008-w10-r14.json
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
Lineup slots: QB, RB, RB, WR, WR, TE, FLEX, FLEX, K, DEF, IDP_FLEX, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN. Superflex: no. Tight end premium: yes. Points per reception: 1.
Columns: id | name | position | age | team | market value | projected points for the rest of the regular season (and per week) | points per week over the last three weeks played | lineup value (points my lineup loses if this player is removed).

MY TEAM (partnerId me): record 5-4, rank 7, points for 1439.6, contention window 0.55
4034 | Christian McCaffrey | RB | age 30 | SF | market 4560 | projected 93.2 (18.6 a week) | last 3 weeks 28.9 a week | lineup value 72.9
8339 | Kyle Hamilton | DB | age 25 | BAL | market 0 | projected 89.3 (17.9 a week) | last 3 weeks 9.1 a week | lineup value 8.6
6797 | Justin Herbert | QB | age 28 | LAC | market 3757 | projected 80.6 (16.1 a week) | last 3 weeks 29.1 a week | lineup value 49.5
9997 | Zay Flowers | WR | age 26 | BAL | market 4196 | projected 75.3 (15.1 a week) | last 3 weeks 8.5 a week | lineup value 55
5991 | Maxx Crosby | DL | age 29 | LV | market 0 | projected 71.5 (14.3 a week) | last 3 weeks 9.6 a week | lineup value 0
6901 | Joshua Metellus | DB | age 28 | MIN | market 0 | projected 67.9 (13.6 a week) | last 3 weeks 15.2 a week | lineup value 0
5894 | Germaine Pratt | LB | age 30 | IND | market 0 | projected 65.1 (13 a week) | last 3 weeks 14 a week | lineup value 0
8323 | Jaquan Brisker | DB | age 27 | PIT | market 0 | projected 64.4 (12.9 a week) | last 3 weeks 14 a week | lineup value 0
7021 | Rico Dowdle | RB | age 28 | PIT | market 3189 | projected 64.2 (12.8 a week) | last 3 weeks 17.9 a week | lineup value 44
2449 | Stefon Diggs | WR | age 32 | WAS | market 2799 | projected 60.2 (12 a week) | last 3 weeks 13.1 a week | lineup value 39.9
11539 | Jake Bates | K | age 27 | DET | market 0 | projected 56.6 (11.3 a week) | last 3 weeks 4.8 a week | lineup value 56.6
12568 | Jalon Walker | DL | age 22 | ATL | market 0 | projected 56.3 (11.3 a week) | last 3 weeks 12.6 a week | lineup value 0
5892 | David Montgomery | RB | age 29 | HOU | market 3416 | projected 55.9 (11.2 a week) | last 3 weeks 5.3 a week | lineup value 35.6
8110 | Jake Ferguson | TE | age 27 | DAL | market 3500 | projected 55.4 (11.1 a week) | last 3 weeks 13.1 a week | lineup value 38.2
TB | Tampa Bay Buccaneers | DEF | age ? | TB | market 0 | projected 47 (9.4 a week) | last 3 weeks 16.5 a week | lineup value 47
4033 | David Njoku | TE | age 30 | LAC | market 2874 | projected 41.9 (8.4 a week) | last 3 weeks 5.5 a week | lineup value 24.8
7591 | Justin Fields | QB | age 27 | KC | market 1141 | projected 31.2 (6.2 a week) | last 3 weeks 8.3 a week | lineup value 0
11584 | Bucky Irving | RB | age 24 | TB | market 4252 | projected 29.9 (6 a week) | last 3 weeks 0 a week | lineup value 21.8
9494 | Marvin Mims | WR | age 24 | DEN | market 3832 | projected 27.4 (5.5 a week) | last 3 weeks 15.7 a week | lineup value 10
12536 | Jaylin Noel | WR | age 24 | HOU | market 2786 | projected 15.3 (3.1 a week) | last 3 weeks 12.8 a week | lineup value 4.3
10235 | Roschon Johnson | RB | age 25 | CHI | market 0 | projected 0.6 (0.1 a week) | last 3 weeks 0.4 a week | lineup value 0

PARTNER (partnerId 13): record 5-4, rank 6, points for 1459.8, contention window 0.66
8130 | Trey McBride | TE | age 26 | ARI | market 4939 | projected 107.8 (21.6 a week) | last 3 weeks 18.7 a week | lineup value 61.7
9493 | Puka Nacua | WR | age 25 | LAR | market 5725 | projected 106.5 (21.3 a week) | last 3 weeks 7.6 a week | lineup value 50.5
6302 | Kaden Elliss | LB | age 31 | NO | market 0 | projected 79.9 (16 a week) | last 3 weeks 22.9 a week | lineup value 29.5
2133 | Davante Adams | WR | age 33 | LAR | market 3370 | projected 79.4 (15.9 a week) | last 3 weeks 16.5 a week | lineup value 23.5
10229 | Rashee Rice | WR | age 26 | KC | market 4435 | projected 72.3 (14.5 a week) | last 3 weeks 22.3 a week | lineup value 27.7
11565 | J.J. McCarthy | QB | age 23 | NYG | market 2132 | projected 62.5 (12.5 a week) | last 3 weeks 5.1 a week | lineup value 34.7
12529 | TreVeyon Henderson | RB | age 23 | NE | market 4282 | projected 62.4 (12.5 a week) | last 3 weeks 9.6 a week | lineup value 20.7
12493 | Oronde Gadsden | TE | age 23 | LAC | market 4234 | projected 55.8 (11.2 a week) | last 3 weeks 13.1 a week | lineup value 9.7
8122 | Zonovan Knight | RB | age 25 | ARI | market 0 | projected 52.6 (10.5 a week) | last 3 weeks 2.2 a week | lineup value 3.7
5862 | Brian Burns | DL | age 28 | NYG | market 0 | projected 50.5 (10.1 a week) | last 3 weeks 18.4 a week | lineup value 0
12489 | RJ Harvey | RB | age 25 | DEN | market 3689 | projected 49.4 (9.9 a week) | last 3 weeks 22.3 a week | lineup value 8.6
12485 | Tez Johnson | WR | age 24 | TB | market 0 | projected 47.1 (9.4 a week) | last 3 weeks 3.1 a week | lineup value 0
9753 | Zach Charbonnet | RB | age 25 | SEA | market 3121 | projected 46.9 (9.4 a week) | last 3 weeks 1.9 a week | lineup value 1.2
8259 | Cameron Dicker | K | age 26 | LAC | market 0 | projected 45.1 (9 a week) | last 3 weeks 12.5 a week | lineup value 45.1
NE | New England Patriots | DEF | age ? | NE | market 0 | projected 42 (8.4 a week) | last 3 weeks 16.6 a week | lineup value 42
12534 | Kyle Monangai | RB | age 24 | CHI | market 3712 | projected 41.3 (8.3 a week) | last 3 weeks 8.9 a week | lineup value 0
19 | Joe Flacco | QB | age 41 | CIN | market 0 | projected 29.3 (5.9 a week) | last 3 weeks 22.3 a week | lineup value 1.5
4037 | Chris Godwin | WR | age 30 | TB | market 3107 | projected 27.9 (5.6 a week) | last 3 weeks 0 a week | lineup value 0
11628 | Marvin Harrison | WR | age 24 | HOU | market 3930 | projected 24.9 (5 a week) | last 3 weeks 10.1 a week | lineup value 0.9
9504 | Kayshon Boutte | WR | age 24 | HOU | market 2968 | projected 19.1 (3.8 a week) | last 3 weeks 10 a week | lineup value 0
6806 | J.K. Dobbins | RB | age 27 | DEN | market 3239 | projected 11.3 (2.3 a week) | last 3 weeks 10.5 a week | lineup value 1.1

PARTNER (partnerId 3): record 7-2, rank 2, points for 1521.4, contention window 1
4984 | Josh Allen | QB | age 30 | BUF | market 4773 | projected 123.6 (24.7 a week) | last 3 weeks 19.5 a week | lineup value 11
4881 | Lamar Jackson | QB | age 29 | BAL | market 4535 | projected 112.6 (22.5 a week) | last 3 weeks 8.5 a week | lineup value 0
11687 | Edgerrin Cooper | LB | age 24 | GB | market 0 | projected 103.7 (20.7 a week) | last 3 weeks 12.7 a week | lineup value 10.3
3163 | Jared Goff | QB | age 32 | DET | market 3067 | projected 94.6 (18.9 a week) | last 3 weeks 9.7 a week | lineup value 0
11705 | Tykee Smith | DB | age 25 | TB | market 0 | projected 92.3 (18.5 a week) | last 3 weeks 5.8 a week | lineup value 0
6813 | Jonathan Taylor | RB | age 27 | IND | market 4957 | projected 90.7 (18.1 a week) | last 3 weeks 29.1 a week | lineup value 74.7
4070 | T.J. Watt | DL | age 32 | PIT | market 0 | projected 84.9 (17 a week) | last 3 weeks 11.7 a week | lineup value 0
8267 | Nakobe Dean | LB | age 25 | LV | market 0 | projected 80.4 (16.1 a week) | last 3 weeks 7.8 a week | lineup value 0
11665 | Jared Verse | DL | age 25 | CLE | market 0 | projected 70.5 (14.1 a week) | last 3 weeks 4.4 a week | lineup value 0
7588 | Javonte Williams | RB | age 26 | DAL | market 3967 | projected 67.8 (13.6 a week) | last 3 weeks 14.8 a week | lineup value 51.9
7543 | Travis Etienne | RB | age 27 | NO | market 3786 | projected 67.4 (13.5 a week) | last 3 weeks 7.5 a week | lineup value 51.5
1233 | Bobby Wagner | LB | age 35 | FA | market 0 | projected 60.1 (12 a week) | last 3 weeks 18.9 a week | lineup value 0
12518 | Tyler Warren | TE | age 24 | IND | market 4602 | projected 58.8 (11.8 a week) | last 3 weeks 14.8 a week | lineup value 45.7
1945 | Chris Boswell | K | age 35 | PIT | market 0 | projected 55.2 (11 a week) | last 3 weeks 15 a week | lineup value 55.2
HOU | Houston Texans | DEF | age ? | HOU | market 0 | projected 49.8 (10 a week) | last 3 weeks 5.1 a week | lineup value 49.8
10933 | DeMarvion Overshown | LB | age 26 | DAL | market 0 | projected 46.5 (9.3 a week) | last 3 weeks 0 a week | lineup value 0
6801 | Tee Higgins | WR | age 27 | CIN | market 4117 | projected 44.5 (8.9 a week) | last 3 weeks 24.5 a week | lineup value 28.6
9500 | Josh Downs | WR | age 25 | IND | market 3834 | projected 44 (8.8 a week) | last 3 weeks 10.7 a week | lineup value 28
11624 | Xavier Worthy | WR | age 23 | KC | market 3575 | projected 43.6 (8.7 a week) | last 3 weeks 8.8 a week | lineup value 27.7
5857 | Noah Fant | TE | age 28 | NO | market 0 | projected 27.4 (5.5 a week) | last 3 weeks 7.5 a week | lineup value 14.3
4035 | Alvin Kamara | RB | age 31 | NO | market 2482 | projected 24.3 (4.9 a week) | last 3 weeks 4.8 a week | lineup value 13.3
3172 | DeForest Buckner | DL | age 32 | IND | market 0 | projected 0 (0 a week) | last 3 weeks 18.1 a week | lineup value 0

PARTNER (partnerId 2): record 7-2, rank 3, points for 1416.1, contention window 0.98
7547 | Amon-Ra St. Brown | WR | age 26 | DET | market 5322 | projected 101 (20.2 a week) | last 3 weeks 13.9 a week | lineup value 69.6
4892 | Baker Mayfield | QB | age 31 | TB | market 2817 | projected 92.8 (18.6 a week) | last 3 weeks 3.7 a week | lineup value 10.7
9226 | De'Von Achane | RB | age 25 | MIA | market 4979 | projected 92.4 (18.5 a week) | last 3 weeks 17.8 a week | lineup value 60.7
4081 | Budda Baker | DB | age 30 | ARI | market 0 | projected 79.6 (15.9 a week) | last 3 weeks 9.9 a week | lineup value 2.3
12527 | Ashton Jeanty | RB | age 22 | LV | market 5313 | projected 78.7 (15.7 a week) | last 3 weeks 8.1 a week | lineup value 42.4
10917 | Byron Young | DL | age 28 | LAR | market 0 | projected 69.7 (13.9 a week) | last 3 weeks 5.4 a week | lineup value 0
6788 | Xavier McKinney | DB | age 28 | GB | market 0 | projected 69.4 (13.9 a week) | last 3 weeks 21.1 a week | lineup value 0
7553 | Kyle Pitts | TE | age 26 | ATL | market 3994 | projected 64.7 (12.9 a week) | last 3 weeks 16.7 a week | lineup value 20.3
7526 | Jaylen Waddle | WR | age 27 | DEN | market 4014 | projected 61.5 (12.3 a week) | last 3 weeks 13.5 a week | lineup value 30.1
5580 | Frankie Luvu | LB | age 30 | WAS | market 0 | projected 60 (12 a week) | last 3 weeks 13.3 a week | lineup value 0.7
12545 | Tyler Shough | QB | age 27 | NO | market 2828 | projected 59.3 (11.9 a week) | last 3 weeks 3.7 a week | lineup value 0
8183 | Brock Purdy | QB | age 26 | SF | market 3572 | projected 56.6 (11.3 a week) | last 3 weeks 0 a week | lineup value 4.3
12498 | Mason Taylor | TE | age 22 | NYJ | market 3731 | projected 55.2 (11 a week) | last 3 weeks 9.3 a week | lineup value 10.8
7672 | Ernest Jones | LB | age 26 | SEA | market 0 | projected 52.3 (10.5 a week) | last 3 weeks 14 a week | lineup value 4.5
GB | Green Bay Packers | DEF | age ? | GB | market 0 | projected 50.9 (10.2 a week) | last 3 weeks 10 a week | lineup value 50.9
8142 | Alec Pierce | WR | age 26 | IND | market 3406 | projected 44.3 (8.9 a week) | last 3 weeks 7.1 a week | lineup value 12.9
3678 | Wil Lutz | K | age 32 | DEN | market 0 | projected 41.2 (8.2 a week) | last 3 weeks 6.6 a week | lineup value 41.2
8132 | Tyler Allgeier | RB | age 26 | ARI | market 3130 | projected 36.2 (7.2 a week) | last 3 weeks 3.9 a week | lineup value 3.2
6130 | Devin Singletary | RB | age 29 | NYG | market 0 | projected 33.8 (6.8 a week) | last 3 weeks 2.4 a week | lineup value 4.1
4988 | Nick Chubb | RB | age 30 | FA | market 1768 | projected 30.9 (6.2 a week) | last 3 weeks 5.6 a week | lineup value 0
5927 | Terry McLaurin | WR | age 31 | WAS | market 3398 | projected 24.8 (5 a week) | last 3 weeks 4.8 a week | lineup value 2.9
4018 | Joe Mixon | RB | age 30 | FA | market 2254 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0

PARTNER (partnerId 9): record 6-3, rank 5, points for 1333.5, contention window 0.77
10980 | SirVocea Dennis | LB | age 26 | TB | market 0 | projected 93.9 (18.8 a week) | last 3 weeks 19 a week | lineup value 7.3
5017 | Jessie Bates | DB | age 29 | ATL | market 0 | projected 86.8 (17.4 a week) | last 3 weeks 14.1 a week | lineup value 1.8
4866 | Saquon Barkley | RB | age 29 | PHI | market 4213 | projected 81.9 (16.4 a week) | last 3 weeks 15.4 a week | lineup value 47.5
7640 | Micah Parsons | DL | age 27 | GB | market 0 | projected 76 (15.2 a week) | last 3 weeks 20.3 a week | lineup value 0
10914 | Daiyan Henley | LB | age 26 | LAC | market 0 | projected 70.9 (14.2 a week) | last 3 weeks 10.8 a week | lineup value 0
96 | Aaron Rodgers | QB | age 42 | PIT | market 1772 | projected 66.6 (13.3 a week) | last 3 weeks 20.4 a week | lineup value 35.5
8137 | George Pickens | WR | age 25 | DAL | market 4768 | projected 65.7 (13.1 a week) | last 3 weeks 13.3 a week | lineup value 20
8134 | Khalil Shakir | WR | age 26 | BUF | market 3223 | projected 65.1 (13 a week) | last 3 weeks 14.2 a week | lineup value 8.9
10213 | Tre Tucker | WR | age 25 | LV | market 3018 | projected 62.1 (12.4 a week) | last 3 weeks 5 a week | lineup value 6
7564 | Ja'Marr Chase | WR | age 26 | CIN | market 5812 | projected 59.7 (11.9 a week) | last 3 weeks 26.4 a week | lineup value 25
7567 | Kenny Gainwell | RB | age 27 | TB | market 3106 | projected 53.9 (10.8 a week) | last 3 weeks 16.3 a week | lineup value 19.5
8121 | Romeo Doubs | WR | age 26 | NE | market 3167 | projected 53.8 (10.8 a week) | last 3 weeks 14.4 a week | lineup value 2.4
4983 | DJ Moore | WR | age 29 | BUF | market 3666 | projected 49.8 (10 a week) | last 3 weeks 14.6 a week | lineup value 0.2
11597 | Theo Johnson | TE | age 25 | NYG | market 3240 | projected 44 (8.8 a week) | last 3 weeks 14 a week | lineup value 44
KC | Kansas City Chiefs | DEF | age ? | KC | market 0 | projected 40.8 (8.2 a week) | last 3 weeks 11 a week | lineup value 40.8
11435 | Emanuel Wilson | RB | age 27 | SEA | market 2441 | projected 38 (7.6 a week) | last 3 weeks 1.7 a week | lineup value 3.6
12574 | Abdul Carter | DL | age 22 | NYG | market 0 | projected 37.2 (7.4 a week) | last 3 weeks 5.8 a week | lineup value 0
8112 | Drake London | WR | age 25 | ATL | market 4874 | projected 34.4 (6.9 a week) | last 3 weeks 16.5 a week | lineup value 11.8
9758 | C.J. Stroud | QB | age 25 | HOU | market 3034 | projected 31 (6.2 a week) | last 3 weeks 15.7 a week | lineup value 0
5230 | Michael Badgley | K | age 30 | FA | market 0 | projected 28.3 (5.7 a week) | last 3 weeks 9.7 a week | lineup value 28.3
11674 | Tyler Nubin | DB | age 25 | NYG | market 0 | projected 28.2 (5.6 a week) | last 3 weeks 11.3 a week | lineup value 0

CANDIDATE DEALS (from a rules-based finder; points are the finder projections for the rest of the season):
c1 | partnerId 13 | I give Kyle Hamilton (8339) | I get Tez Johnson + Joe Flacco (12485,19) | my points 20.9 | their points 7.8 | likelihood 0.77
c2 | partnerId 13 | I give Kyle Hamilton + Germaine Pratt (8339,5894) | I get Tez Johnson + Zonovan Knight (12485,8122) | my points 5.8 | their points 5.7 | likelihood 0.77
c3 | partnerId 3 | I give David Njoku (4033) | I get Jared Goff + Tykee Smith (3163,11705) | my points -0.4 | their points 19.4 | likelihood 0.7
c4 | partnerId 2 | I give Rico Dowdle + Kyle Hamilton (7021,8339) | I get Brock Purdy + Tyler Allgeier (8183,8132) | my points -16.5 | their points 27.8 | likelihood 0.61
c5 | partnerId 2 | I give Rico Dowdle + Germaine Pratt (7021,5894) | I get Brock Purdy + Nick Chubb (8183,4988) | my points -11.4 | their points 23.8 | likelihood 0.53
c6 | partnerId 2 | I give Stefon Diggs + Germaine Pratt (2449,5894) | I get Tyler Shough + Tyler Allgeier (12545,8132) | my points -13.9 | their points 24 | likelihood 0.61
c7 | partnerId 9 | I give Christian McCaffrey + Justin Fields (4034,7591) | I get Tre Tucker + Drake London (10213,8112) | my points -12.4 | their points 32.9 | likelihood 0.53
c8 | partnerId 2 | I give Rico Dowdle (7021) | I get Brock Purdy + Terry McLaurin (8183,5927) | my points -8.7 | their points 20.1 | likelihood 0.43
c9 | partnerId 9 | I give Christian McCaffrey (4034) | I get Khalil Shakir + Drake London (8134,8112) | my points -9.5 | their points 29.3 | likelihood 0.48

Pick the best trades for my team.

=========== CASE 1180361412023083008-w10-r4 ===========
REPLY FILE: /Users/anik/workspace/chrome/sleeper/.eval-market/replies/suggest-v2/heldout1/1180361412023083008-w10-r4.json
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
Lineup slots: QB, RB, RB, WR, WR, TE, FLEX, FLEX, K, DEF, IDP_FLEX, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN. Superflex: no. Tight end premium: yes. Points per reception: 1.
Columns: id | name | position | age | team | market value | projected points for the rest of the regular season (and per week) | points per week over the last three weeks played | lineup value (points my lineup loses if this player is removed).

MY TEAM (partnerId me): record 3-6, rank 10, points for 1247.6, contention window 0.23
5332 | Foyesade Oluokun | LB | age 31 | JAX | market 0 | projected 88 (17.6 a week) | last 3 weeks 10.3 a week | lineup value 2.7
6804 | Jordan Love | QB | age 27 | GB | market 3379 | projected 87.5 (17.5 a week) | last 3 weeks 19.6 a week | lineup value 57.8
5944 | Bobby Okereke | LB | age 30 | CAR | market 0 | projected 78.1 (15.6 a week) | last 3 weeks 20.8 a week | lineup value 7.2
6794 | Justin Jefferson | WR | age 27 | MIN | market 4838 | projected 77.9 (15.6 a week) | last 3 weeks 15 a week | lineup value 48.4
7525 | DeVonta Smith | WR | age 27 | PHI | market 4174 | projected 75.4 (15.1 a week) | last 3 weeks 18.4 a week | lineup value 46
8150 | Kyren Williams | RB | age 26 | LAR | market 4466 | projected 72.5 (14.5 a week) | last 3 weeks 9.1 a week | lineup value 44.3
6888 | Antoine Winfield | DB | age 28 | TB | market 0 | projected 70 (14 a week) | last 3 weeks 13.4 a week | lineup value 0
3973 | Myles Garrett | DL | age 30 | LAR | market 0 | projected 60.1 (12 a week) | last 3 weeks 26.5 a week | lineup value 0
1466 | Travis Kelce | TE | age 37 | KC | market 2882 | projected 57.3 (11.5 a week) | last 3 weeks 19.1 a week | lineup value 28.7
17 | Matt Prater | K | age 41 | FA | market 0 | projected 52.6 (10.5 a week) | last 3 weeks 4.9 a week | lineup value 52.6
DET | Detroit Lions | DEF | age ? | DET | market 0 | projected 49.8 (10 a week) | last 3 weeks 9.5 a week | lineup value 5.1
ATL | Atlanta Falcons | DEF | age ? | ATL | market 0 | projected 49.6 (9.9 a week) | last 3 weeks 11.2 a week | lineup value 4.8
5346 | Zaire Franklin | LB | age 30 | GB | market 0 | projected 48.6 (9.7 a week) | last 3 weeks 8.6 a week | lineup value 0
4098 | Kareem Hunt | RB | age 30 | FA | market 1778 | projected 44.4 (8.9 a week) | last 3 weeks 9.9 a week | lineup value 16.2
11571 | Isaiah Davis | RB | age 24 | NYJ | market 0 | projected 33.7 (6.7 a week) | last 3 weeks 6.5 a week | lineup value 6.5
8210 | Chig Okonkwo | TE | age 27 | WAS | market 3105 | projected 30.4 (6.1 a week) | last 3 weeks 6.3 a week | lineup value 1.8
11559 | Michael Penix | QB | age 26 | ATL | market 2028 | projected 29.8 (6 a week) | last 3 weeks 11.9 a week | lineup value 0
11626 | Xavier Legette | WR | age 25 | CAR | market 0 | projected 29.6 (5.9 a week) | last 3 weeks 2.3 a week | lineup value 7.3
7571 | Rashod Bateman | WR | age 26 | BAL | market 2472 | projected 24.5 (4.9 a week) | last 3 weeks 5.5 a week | lineup value 10
11631 | Brian Thomas | WR | age 24 | JAX | market 3939 | projected 24 (4.8 a week) | last 3 weeks 4.9 a week | lineup value 9.5
7670 | Joshua Palmer | WR | age 27 | BUF | market 0 | projected 15 (3 a week) | last 3 weeks 0 a week | lineup value 0.4
12507 | Omarion Hampton | RB | age 23 | LAC | market 5048 | projected 10.6 (2.1 a week) | last 3 weeks 0 a week | lineup value 3.4
7042 | Tyler Bass | K | age 29 | BUF | market 0 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0

PARTNER (partnerId 12): record 6-3, rank 4, points for 1409.4, contention window 0.88
11604 | Brock Bowers | TE | age 23 | LV | market 5591 | projected 100.8 (20.2 a week) | last 3 weeks 17.9 a week | lineup value 70.1
10880 | Jack Campbell | LB | age 26 | DET | market 0 | projected 89.2 (17.8 a week) | last 3 weeks 18.4 a week | lineup value 12
5850 | Josh Jacobs | RB | age 28 | GB | market 3979 | projected 74.4 (14.9 a week) | last 3 weeks 17.6 a week | lineup value 38.3
12640 | Teddye Buchanan | LB | age 24 | BAL | market 0 | projected 74.2 (14.8 a week) | last 3 weeks 10.1 a week | lineup value 0
8289 | Aidan Hutchinson | DL | age 26 | DET | market 0 | projected 69.6 (13.9 a week) | last 3 weeks 8 a week | lineup value 0
8144 | Chris Olave | WR | age 26 | NO | market 4446 | projected 65.1 (13 a week) | last 3 weeks 17.6 a week | lineup value 34.4
5030 | Harold Landry | DL | age 30 | NE | market 0 | projected 62.7 (12.5 a week) | last 3 weeks 7.5 a week | lineup value 0
8676 | Rashid Shaheed | WR | age 28 | SEA | market 3686 | projected 61.2 (12.2 a week) | last 3 weeks 14.9 a week | lineup value 23.8
8151 | Kenneth Walker | RB | age 25 | KC | market 4455 | projected 58.5 (11.7 a week) | last 3 weeks 4.9 a week | lineup value 22.5
9228 | Bryce Young | QB | age 25 | CAR | market 2589 | projected 57.9 (11.6 a week) | last 3 weeks 4.3 a week | lineup value 57.9
LAR | Los Angeles Rams | DEF | age ? | LAR | market 0 | projected 54.3 (10.9 a week) | last 3 weeks 9.9 a week | lineup value 9.5
9756 | Jordan Addison | WR | age 24 | MIN | market 3615 | projected 53.4 (10.7 a week) | last 3 weeks 15.2 a week | lineup value 17.5
11647 | Kimani Vidal | RB | age 25 | LAC | market 2754 | projected 52.2 (10.4 a week) | last 3 weeks 10.2 a week | lineup value 16.2
9754 | Quentin Johnston | WR | age 25 | LAC | market 3417 | projected 45.9 (9.2 a week) | last 3 weeks 8.8 a week | lineup value 8.5
PIT | Pittsburgh Steelers | DEF | age ? | PIT | market 0 | projected 44.8 (9 a week) | last 3 weeks 9.3 a week | lineup value 0
1433 | Brandon McManus | K | age 34 | FA | market 0 | projected 40 (8 a week) | last 3 weeks 2.8 a week | lineup value 40
8408 | Jordan Mason | RB | age 27 | MIN | market 3007 | projected 35.8 (7.2 a week) | last 3 weeks 6.4 a week | lineup value 6.2
12519 | Luther Burden | WR | age 22 | CHI | market 4901 | projected 32.1 (6.4 a week) | last 3 weeks 1.3 a week | lineup value 7.2
10236 | Dalton Kincaid | TE | age 26 | BUF | market 3790 | projected 24 (4.8 a week) | last 3 weeks 11.4 a week | lineup value 2.8
2505 | Darren Waller | TE | age 34 | CAR | market 1426 | projected 19.7 (3.9 a week) | last 3 weeks 0 a week | lineup value 0.2
11632 | Malik Nabers | WR | age 23 | NYG | market 5024 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0
12185 | Spencer Shrader | K | age 27 | IND | market 0 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0

PARTNER (partnerId 9): record 6-3, rank 5, points for 1333.5, contention window 0.77
10980 | SirVocea Dennis | LB | age 26 | TB | market 0 | projected 93.9 (18.8 a week) | last 3 weeks 19 a week | lineup value 7.3
5017 | Jessie Bates | DB | age 29 | ATL | market 0 | projected 86.8 (17.4 a week) | last 3 weeks 14.1 a week | lineup value 1.8
4866 | Saquon Barkley | RB | age 29 | PHI | market 4213 | projected 81.9 (16.4 a week) | last 3 weeks 15.4 a week | lineup value 47.5
7640 | Micah Parsons | DL | age 27 | GB | market 0 | projected 76 (15.2 a week) | last 3 weeks 20.3 a week | lineup value 0
10914 | Daiyan Henley | LB | age 26 | LAC | market 0 | projected 70.9 (14.2 a week) | last 3 weeks 10.8 a week | lineup value 0
96 | Aaron Rodgers | QB | age 42 | PIT | market 1772 | projected 66.6 (13.3 a week) | last 3 weeks 20.4 a week | lineup value 35.5
8137 | George Pickens | WR | age 25 | DAL | market 4768 | projected 65.7 (13.1 a week) | last 3 weeks 13.3 a week | lineup value 20
8134 | Khalil Shakir | WR | age 26 | BUF | market 3223 | projected 65.1 (13 a week) | last 3 weeks 14.2 a week | lineup value 8.9
10213 | Tre Tucker | WR | age 25 | LV | market 3018 | projected 62.1 (12.4 a week) | last 3 weeks 5 a week | lineup value 6
7564 | Ja'Marr Chase | WR | age 26 | CIN | market 5812 | projected 59.7 (11.9 a week) | last 3 weeks 26.4 a week | lineup value 25
7567 | Kenny Gainwell | RB | age 27 | TB | market 3106 | projected 53.9 (10.8 a week) | last 3 weeks 16.3 a week | lineup value 19.5
8121 | Romeo Doubs | WR | age 26 | NE | market 3167 | projected 53.8 (10.8 a week) | last 3 weeks 14.4 a week | lineup value 2.4
4983 | DJ Moore | WR | age 29 | BUF | market 3666 | projected 49.8 (10 a week) | last 3 weeks 14.6 a week | lineup value 0.2
11597 | Theo Johnson | TE | age 25 | NYG | market 3240 | projected 44 (8.8 a week) | last 3 weeks 14 a week | lineup value 44
KC | Kansas City Chiefs | DEF | age ? | KC | market 0 | projected 40.8 (8.2 a week) | last 3 weeks 11 a week | lineup value 40.8
11435 | Emanuel Wilson | RB | age 27 | SEA | market 2441 | projected 38 (7.6 a week) | last 3 weeks 1.7 a week | lineup value 3.6
12574 | Abdul Carter | DL | age 22 | NYG | market 0 | projected 37.2 (7.4 a week) | last 3 weeks 5.8 a week | lineup value 0
8112 | Drake London | WR | age 25 | ATL | market 4874 | projected 34.4 (6.9 a week) | last 3 weeks 16.5 a week | lineup value 11.8
9758 | C.J. Stroud | QB | age 25 | HOU | market 3034 | projected 31 (6.2 a week) | last 3 weeks 15.7 a week | lineup value 0
5230 | Michael Badgley | K | age 30 | FA | market 0 | projected 28.3 (5.7 a week) | last 3 weeks 9.7 a week | lineup value 28.3
11674 | Tyler Nubin | DB | age 25 | NYG | market 0 | projected 28.2 (5.6 a week) | last 3 weeks 11.3 a week | lineup value 0

PARTNER (partnerId 13): record 5-4, rank 6, points for 1459.8, contention window 0.66
8130 | Trey McBride | TE | age 26 | ARI | market 4939 | projected 107.8 (21.6 a week) | last 3 weeks 18.7 a week | lineup value 61.7
9493 | Puka Nacua | WR | age 25 | LAR | market 5725 | projected 106.5 (21.3 a week) | last 3 weeks 7.6 a week | lineup value 50.5
6302 | Kaden Elliss | LB | age 31 | NO | market 0 | projected 79.9 (16 a week) | last 3 weeks 22.9 a week | lineup value 29.5
2133 | Davante Adams | WR | age 33 | LAR | market 3370 | projected 79.4 (15.9 a week) | last 3 weeks 16.5 a week | lineup value 23.5
10229 | Rashee Rice | WR | age 26 | KC | market 4435 | projected 72.3 (14.5 a week) | last 3 weeks 22.3 a week | lineup value 27.7
11565 | J.J. McCarthy | QB | age 23 | NYG | market 2132 | projected 62.5 (12.5 a week) | last 3 weeks 5.1 a week | lineup value 34.7
12529 | TreVeyon Henderson | RB | age 23 | NE | market 4282 | projected 62.4 (12.5 a week) | last 3 weeks 9.6 a week | lineup value 20.7
12493 | Oronde Gadsden | TE | age 23 | LAC | market 4234 | projected 55.8 (11.2 a week) | last 3 weeks 13.1 a week | lineup value 9.7
8122 | Zonovan Knight | RB | age 25 | ARI | market 0 | projected 52.6 (10.5 a week) | last 3 weeks 2.2 a week | lineup value 3.7
5862 | Brian Burns | DL | age 28 | NYG | market 0 | projected 50.5 (10.1 a week) | last 3 weeks 18.4 a week | lineup value 0
12489 | RJ Harvey | RB | age 25 | DEN | market 3689 | projected 49.4 (9.9 a week) | last 3 weeks 22.3 a week | lineup value 8.6
12485 | Tez Johnson | WR | age 24 | TB | market 0 | projected 47.1 (9.4 a week) | last 3 weeks 3.1 a week | lineup value 0
9753 | Zach Charbonnet | RB | age 25 | SEA | market 3121 | projected 46.9 (9.4 a week) | last 3 weeks 1.9 a week | lineup value 1.2
8259 | Cameron Dicker | K | age 26 | LAC | market 0 | projected 45.1 (9 a week) | last 3 weeks 12.5 a week | lineup value 45.1
NE | New England Patriots | DEF | age ? | NE | market 0 | projected 42 (8.4 a week) | last 3 weeks 16.6 a week | lineup value 42
12534 | Kyle Monangai | RB | age 24 | CHI | market 3712 | projected 41.3 (8.3 a week) | last 3 weeks 8.9 a week | lineup value 0
19 | Joe Flacco | QB | age 41 | CIN | market 0 | projected 29.3 (5.9 a week) | last 3 weeks 22.3 a week | lineup value 1.5
4037 | Chris Godwin | WR | age 30 | TB | market 3107 | projected 27.9 (5.6 a week) | last 3 weeks 0 a week | lineup value 0
11628 | Marvin Harrison | WR | age 24 | HOU | market 3930 | projected 24.9 (5 a week) | last 3 weeks 10.1 a week | lineup value 0.9
9504 | Kayshon Boutte | WR | age 24 | HOU | market 2968 | projected 19.1 (3.8 a week) | last 3 weeks 10 a week | lineup value 0
6806 | J.K. Dobbins | RB | age 27 | DEN | market 3239 | projected 11.3 (2.3 a week) | last 3 weeks 10.5 a week | lineup value 1.1

PARTNER (partnerId 8): record 7-2, rank 1, points for 1537.6, contention window 1
9221 | Jahmyr Gibbs | RB | age 24 | DET | market 6318 | projected 110.5 (22.1 a week) | last 3 weeks 16.9 a week | lineup value 53.5
9488 | Jaxon Smith-Njigba | WR | age 24 | SEA | market 5814 | projected 108.7 (21.7 a week) | last 3 weeks 18.6 a week | lineup value 51.7
6815 | Zack Baun | LB | age 29 | PHI | market 0 | projected 96.2 (19.2 a week) | last 3 weeks 15.3 a week | lineup value 0
421 | Matthew Stafford | QB | age 38 | LAR | market 2701 | projected 91.9 (18.4 a week) | last 3 weeks 19 a week | lineup value 14.9
6949 | Jordyn Brooks | LB | age 28 | MIA | market 0 | projected 83 (16.6 a week) | last 3 weeks 21.4 a week | lineup value 5.4
7648 | Nick Bolton | LB | age 26 | KC | market 0 | projected 79 (15.8 a week) | last 3 weeks 12.5 a week | lineup value 0.1
11560 | Caleb Williams | QB | age 24 | CHI | market 4292 | projected 77 (15.4 a week) | last 3 weeks 21.8 a week | lineup value 0
12512 | Quinshon Judkins | RB | age 22 | CLE | market 4298 | projected 70.5 (14.1 a week) | last 3 weeks 11.4 a week | lineup value 13.5
5022 | Dallas Goedert | TE | age 31 | PHI | market 3145 | projected 67.5 (13.5 a week) | last 3 weeks 8.5 a week | lineup value 11.8
8148 | Jameson Williams | WR | age 25 | DET | market 4081 | projected 64.2 (12.8 a week) | last 3 weeks 6.3 a week | lineup value 7.3
6790 | D'Andre Swift | RB | age 27 | CHI | market 3621 | projected 61.3 (12.3 a week) | last 3 weeks 12.5 a week | lineup value 4.3
5012 | Mark Andrews | TE | age 31 | BAL | market 3105 | projected 58.6 (11.7 a week) | last 3 weeks 8.9 a week | lineup value 3
5947 | Jakobi Meyers | WR | age 29 | JAX | market 3312 | projected 56.3 (11.3 a week) | last 3 weeks 2.1 a week | lineup value 0.8
12711 | Tyler Loop | K | age 25 | BAL | market 0 | projected 52.3 (10.5 a week) | last 3 weeks 6.7 a week | lineup value 52.3
9487 | Parker Washington | WR | age 24 | JAX | market 4712 | projected 47.6 (9.5 a week) | last 3 weeks 5.9 a week | lineup value 1.6
11610 | Malik Washington | WR | age 25 | MIA | market 3339 | projected 43.8 (8.8 a week) | last 3 weeks 21.5 a week | lineup value 0
LAC | Los Angeles Chargers | DEF | age ? | LAC | market 0 | projected 42.3 (8.5 a week) | last 3 weeks 3.5 a week | lineup value 42.3
12533 | Jacory Croskey-Merritt | RB | age 25 | WAS | market 3166 | projected 28.2 (5.6 a week) | last 3 weeks 3.9 a week | lineup value 0
7669 | Paulson Adebo | DB | age 27 | NYG | market 0 | projected 19.3 (3.9 a week) | last 3 weeks 0 a week | lineup value 0
8146 | Garrett Wilson | WR | age 26 | NYJ | market 4235 | projected 15 (3 a week) | last 3 weeks 0 a week | lineup value 3.9
9484 | Tucker Kraft | TE | age 25 | GB | market 4154 | projected 0 (0 a week) | last 3 weeks 22.8 a week | lineup value 0
5816 | Nick Bosa | DL | age 28 | SF | market 0 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0

CANDIDATE DEALS (from a rules-based finder; points are the finder projections for the rest of the season):
c1 | partnerId 12 | I give Jordan Love + Travis Kelce (6804,1466) | I get Dalton Kincaid (10236) | my points -69.2 | their points 47 | likelihood 0.64
c2 | partnerId 9 | I give Travis Kelce + Jordan Love (1466,6804) | I get DJ Moore (4983) | my points -77.5 | their points 46.3 | likelihood 0.66
c3 | partnerId 12 | I give Jordan Love + Kyren Williams (6804,8150) | I get Malik Nabers + Jordan Mason (11632,8408) | my points -92.8 | their points 53.7 | likelihood 0.64
c4 | partnerId 12 | I give Jordan Love + Justin Jefferson (6804,6794) | I get Malik Nabers + Dalton Kincaid (11632,10236) | my points -89.4 | their points 56.3 | likelihood 0.73
c5 | partnerId 12 | I give Jordan Love + Kareem Hunt (6804,4098) | I get Darren Waller + Dalton Kincaid (2505,10236) | my points -55.8 | their points 36.5 | likelihood 0.64
c6 | partnerId 13 | I give Jordan Love + Bobby Okereke (6804,5944) | I get Kyle Monangai + Tez Johnson (12534,12485) | my points -52.9 | their points 38.3 | likelihood 0.49
c7 | partnerId 9 | I give Jordan Love + Chig Okonkwo (6804,8210) | I get C.J. Stroud + DJ Moore (9758,4983) | my points -19.6 | their points 28.5 | likelihood 0.53
c8 | partnerId 9 | I give Travis Kelce + Bobby Okereke (1466,5944) | I get C.J. Stroud (9758) | my points -35.9 | their points 27.4 | likelihood 0.7
c9 | partnerId 8 | I give DeVonta Smith + Jordan Love (7525,6804) | I get Caleb Williams + Tucker Kraft (11560,9484) | my points -56.5 | their points 17 | likelihood 0.58
c10 | partnerId 13 | I give Jordan Love + Foyesade Oluokun (6804,5332) | I get Kyle Monangai (12534) | my points -57.1 | their points 32.8 | likelihood 0.42
c11 | partnerId 13 | I give Jordan Love + Travis Kelce (6804,1466) | I get Kayshon Boutte + Kyle Monangai (9504,12534) | my points -79.9 | their points 30.4 | likelihood 0.39

Pick the best trades for my team.

=========== CASE 1180361412023083008-w4-r4 ===========
REPLY FILE: /Users/anik/workspace/chrome/sleeper/.eval-market/replies/suggest-v2/heldout1/1180361412023083008-w4-r4.json
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
Lineup slots: QB, RB, RB, WR, WR, TE, FLEX, FLEX, K, DEF, IDP_FLEX, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN. Superflex: no. Tight end premium: yes. Points per reception: 1.
Columns: id | name | position | age | team | market value | projected points for the rest of the regular season (and per week) | points per week over the last three weeks played | lineup value (points my lineup loses if this player is removed).

MY TEAM (partnerId me): record 0-3, rank 13, points for 349.7, contention window 0
5944 | Bobby Okereke | LB | age 30 | CAR | market 0 | projected 190.7 (17.3 a week) | last 3 weeks 20.7 a week | lineup value 10.7
6804 | Jordan Love | QB | age 27 | GB | market 3370 | projected 177.1 (16.1 a week) | last 3 weeks 16.8 a week | lineup value 88.1
5332 | Foyesade Oluokun | LB | age 31 | JAX | market 0 | projected 174.6 (15.9 a week) | last 3 weeks 22.8 a week | lineup value 2.7
6794 | Justin Jefferson | WR | age 27 | MIN | market 4835 | projected 158.5 (14.4 a week) | last 3 weeks 13.1 a week | lineup value 117.6
5346 | Zaire Franklin | LB | age 30 | GB | market 0 | projected 154.4 (14 a week) | last 3 weeks 11.5 a week | lineup value 3.3
8150 | Kyren Williams | RB | age 26 | LAR | market 4465 | projected 152.4 (13.9 a week) | last 3 weeks 14.5 a week | lineup value 152.4
7525 | DeVonta Smith | WR | age 27 | PHI | market 4178 | projected 143.2 (13 a week) | last 3 weeks 11.3 a week | lineup value 102.4
6888 | Antoine Winfield | DB | age 28 | TB | market 0 | projected 139.9 (12.7 a week) | last 3 weeks 13 a week | lineup value 0
1466 | Travis Kelce | TE | age 37 | KC | market 2888 | projected 136.2 (12.4 a week) | last 3 weeks 12.9 a week | lineup value 95.4
3973 | Myles Garrett | DL | age 30 | LAR | market 0 | projected 120 (10.9 a week) | last 3 weeks 24.5 a week | lineup value 0
DET | Detroit Lions | DEF | age ? | DET | market 0 | projected 103.7 (9.4 a week) | last 3 weeks 11.3 a week | lineup value 23
ATL | Atlanta Falcons | DEF | age ? | ATL | market 0 | projected 98.1 (8.9 a week) | last 3 weeks 1.1 a week | lineup value 17.4
11631 | Brian Thomas | WR | age 24 | JAX | market 3943 | projected 95.4 (8.7 a week) | last 3 weeks 9.6 a week | lineup value 64.7
11559 | Michael Penix | QB | age 26 | ATL | market 2004 | projected 89 (8.1 a week) | last 3 weeks 13.7 a week | lineup value 0
11734 | Tyrice Knight | LB | age 25 | SEA | market 0 | projected 86.9 (7.9 a week) | last 3 weeks 12.7 a week | lineup value 0
8210 | Chig Okonkwo | TE | age 27 | WAS | market 3099 | projected 84.3 (7.7 a week) | last 3 weeks 5.4 a week | lineup value 43.4
1433 | Brandon McManus | K | age 34 | FA | market 0 | projected 71.9 (6.5 a week) | last 3 weeks 1.2 a week | lineup value 71.9
8180 | Jalen Nailor | WR | age 27 | LV | market 2610 | projected 47.1 (4.3 a week) | last 3 weeks 2.2 a week | lineup value 12.6
12507 | Omarion Hampton | RB | age 23 | LAC | market 5053 | projected 45.6 (4.1 a week) | last 3 weeks 14 a week | lineup value 45.6
7670 | Joshua Palmer | WR | age 27 | BUF | market 0 | projected 35.9 (3.3 a week) | last 3 weeks 6.4 a week | lineup value 11.1
7042 | Tyler Bass | K | age 29 | BUF | market 0 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0

PARTNER (partnerId 12): record 3-0, rank 1, points for 517.9, contention window 1
10880 | Jack Campbell | LB | age 26 | DET | market 0 | projected 179 (16.3 a week) | last 3 weeks 22.3 a week | lineup value 27.1
5850 | Josh Jacobs | RB | age 28 | GB | market 3977 | projected 164.6 (15 a week) | last 3 weeks 13.3 a week | lineup value 104.7
8144 | Chris Olave | WR | age 26 | NO | market 4452 | projected 152.8 (13.9 a week) | last 3 weeks 13.2 a week | lineup value 69
5030 | Harold Landry | DL | age 30 | NE | market 0 | projected 152.4 (13.9 a week) | last 3 weeks 21.7 a week | lineup value 2.6
8676 | Rashid Shaheed | WR | age 28 | SEA | market 3516 | projected 147 (13.4 a week) | last 3 weeks 16.3 a week | lineup value 57.5
8289 | Aidan Hutchinson | DL | age 26 | DET | market 0 | projected 139.7 (12.7 a week) | last 3 weeks 9.8 a week | lineup value 0
11604 | Brock Bowers | TE | age 23 | LV | market 5590 | projected 136.5 (12.4 a week) | last 3 weeks 16.8 a week | lineup value 72.5
9228 | Bryce Young | QB | age 25 | CAR | market 2585 | projected 131 (11.9 a week) | last 3 weeks 15.1 a week | lineup value 131
5862 | Brian Burns | DL | age 28 | NYG | market 0 | projected 125.9 (11.4 a week) | last 3 weeks 26.9 a week | lineup value 0
8151 | Kenneth Walker | RB | age 25 | KC | market 4465 | projected 119.5 (10.9 a week) | last 3 weeks 14.6 a week | lineup value 59.6
9754 | Quentin Johnston | WR | age 25 | LAC | market 3413 | projected 109.2 (9.9 a week) | last 3 weeks 21.3 a week | lineup value 24.8
1945 | Chris Boswell | K | age 35 | PIT | market 0 | projected 108.4 (9.9 a week) | last 3 weeks 11.3 a week | lineup value 108.4
9756 | Jordan Addison | WR | age 24 | MIN | market 3612 | projected 108.1 (9.8 a week) | last 3 weeks 0 a week | lineup value 22
8408 | Jordan Mason | RB | age 27 | MIN | market 3003 | projected 100.3 (9.1 a week) | last 3 weeks 13.1 a week | lineup value 40.4
PIT | Pittsburgh Steelers | DEF | age ? | PIT | market 0 | projected 96.7 (8.8 a week) | last 3 weeks 12.7 a week | lineup value 96.7
10236 | Dalton Kincaid | TE | age 26 | BUF | market 3793 | projected 72.6 (6.6 a week) | last 3 weeks 16.6 a week | lineup value 18.7
8290 | Sauce Gardner | DB | age 25 | IND | market 0 | projected 67.1 (6.1 a week) | last 3 weeks 9.7 a week | lineup value 0
2505 | Darren Waller | TE | age 34 | CAR | market 1426 | projected 57.2 (5.2 a week) | last 3 weeks 0 a week | lineup value 21
12519 | Luther Burden | WR | age 22 | CHI | market 4893 | projected 56.2 (5.1 a week) | last 3 weeks 21.6 a week | lineup value 8.4
12521 | Elijah Arroyo | TE | age 23 | SEA | market 0 | projected 48.1 (4.4 a week) | last 3 weeks 3 a week | lineup value 4
11632 | Malik Nabers | WR | age 23 | NYG | market 5055 | projected 15.9 (1.4 a week) | last 3 weeks 20.7 a week | lineup value 3.1

PARTNER (partnerId 11): record 2-1, rank 5, points for 459.3, contention window 0.77
9509 | Bijan Robinson | RB | age 24 | ATL | market 6320 | projected 207 (18.8 a week) | last 3 weeks 23.3 a week | lineup value 114.5
8392 | Nick Cross | DB | age 25 | WAS | market 0 | projected 189.9 (17.3 a week) | last 3 weeks 18.1 a week | lineup value 42.5
5870 | Daniel Jones | QB | age 29 | IND | market 2385 | projected 168.5 (15.3 a week) | last 3 weeks 6 a week | lineup value 26
6911 | Brandon Jones | DB | age 28 | DEN | market 0 | projected 162.8 (14.8 a week) | last 3 weeks 19.5 a week | lineup value 15.4
4943 | Sam Darnold | QB | age 29 | SEA | market 2708 | projected 162.1 (14.7 a week) | last 3 weeks 15.2 a week | lineup value 19.6
7569 | Nico Collins | WR | age 27 | HOU | market 4445 | projected 147.1 (13.4 a week) | last 3 weeks 16.2 a week | lineup value 67.6
9224 | Chase Brown | RB | age 26 | CIN | market 4463 | projected 142.9 (13 a week) | last 3 weeks 9.6 a week | lineup value 50.4
7002 | Juwan Johnson | TE | age 30 | NO | market 3150 | projected 124.8 (11.3 a week) | last 3 weeks 12 a week | lineup value 35.8
8228 | Jaylen Warren | RB | age 27 | PIT | market 3485 | projected 123.5 (11.2 a week) | last 3 weeks 15.3 a week | lineup value 43.4
3214 | Hunter Henry | TE | age 31 | NE | market 3165 | projected 122.5 (11.1 a week) | last 3 weeks 17.6 a week | lineup value 33.4
11620 | Rome Odunze | WR | age 24 | CHI | market 4058 | projected 120 (10.9 a week) | last 3 weeks 21.4 a week | lineup value 23
SEA | Seattle Seahawks | DEF | age ? | SEA | market 0 | projected 109.7 (10 a week) | last 3 weeks 16.6 a week | lineup value 109.7
17 | Matt Prater | K | age 41 | FA | market 0 | projected 107.2 (9.7 a week) | last 3 weeks 2.4 a week | lineup value 107.2
7049 | Jauan Jennings | WR | age 29 | MIN | market 2839 | projected 104.9 (9.5 a week) | last 3 weeks 8.8 a week | lineup value 9.2
11627 | Troy Franklin | WR | age 23 | DEN | market 3046 | projected 94.3 (8.6 a week) | last 3 weeks 0.9 a week | lineup value 20.2
4129 | Jourdan Lewis | DB | age 31 | JAX | market 0 | projected 75.4 (6.9 a week) | last 3 weeks 7.7 a week | lineup value 0
12481 | Cam Skattebo | RB | age 24 | NYG | market 4161 | projected 75 (6.8 a week) | last 3 weeks 13.8 a week | lineup value 27.3
7611 | Rhamondre Stevenson | RB | age 28 | NE | market 3301 | projected 70.7 (6.4 a week) | last 3 weeks 10 a week | lineup value 9.6
12501 | Matthew Golden | WR | age 23 | GB | market 3553 | projected 53.5 (4.9 a week) | last 3 weeks 6.2 a week | lineup value 4.9
4135 | Trey Hendrickson | DL | age 31 | BAL | market 0 | projected 53.2 (4.8 a week) | last 3 weeks 12.4 a week | lineup value 0
12510 | Jalen Milroe | QB | age 23 | SEA | market 0 | projected 0 (0 a week) | last 3 weeks 0.1 a week | lineup value 0

CANDIDATE DEALS (from a rules-based finder; points are the finder projections for the rest of the season):
c1 | partnerId 12 | I give Kyren Williams + Jordan Love (8150,6804) | I get Luther Burden (12519) | my points -232.2 | their points 116.5 | likelihood 0.67
c2 | partnerId 12 | I give Kyren Williams + Justin Jefferson (8150,6794) | I get Malik Nabers + Luther Burden (11632,12519) | my points -243.3 | their points 100.4 | likelihood 0.72
c3 | partnerId 12 | I give Kyren Williams + DeVonta Smith (8150,7525) | I get Elijah Arroyo + Luther Burden (12521,12519) | my points -221.5 | their points 95.9 | likelihood 0.69
c4 | partnerId 12 | I give Justin Jefferson + Jordan Love (6794,6804) | I get Malik Nabers + Elijah Arroyo (11632,12521) | my points -184.9 | their points 107.5 | likelihood 0.74
c5 | partnerId 11 | I give Travis Kelce + Jordan Love (1466,6804) | I get Matthew Golden (12501) | my points -152.1 | their points 35.3 | likelihood 0.48

Pick the best trades for my team.
