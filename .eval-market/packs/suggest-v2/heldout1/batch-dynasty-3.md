You are answering fantasy football trade-advice cases. For each case below, follow the SYSTEM text, read the DATA, and write your JSON answer to the reply file named for that case.
Rules: write only the JSON object (no markdown fence, no commentary) to each reply file. Do not read any other file on disk. Do not look at any directory named truth or any file outside the reply paths. Work each case independently.

=========== CASE 1180209456973922304-w10-r4 ===========
REPLY FILE: /Users/anik/workspace/chrome/sleeper/.eval-market/replies/suggest-v2/heldout1/1180209456973922304-w10-r4.json
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
Lineup slots: QB, RB, RB, WR, WR, WR, TE, FLEX, FLEX, FLEX, SUPER_FLEX, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN. Superflex: yes. Tight end premium: yes. Points per reception: 1.
Columns: id | name | position | age | team | market value | projected points for the rest of the regular season (and per week) | points per week over the last three weeks played | lineup value (points my lineup loses if this player is removed).

MY TEAM (partnerId me): record 6-3, rank 4, points for 1693.3, contention window 0.82
9221 | Jahmyr Gibbs | RB | age 24 | DET | market 6458 | projected 122.7 (24.5 a week) | last 3 weeks 14.7 a week | lineup value 62.2
3294 | Dak Prescott | QB | age 33 | DAL | market 5216 | projected 101.3 (20.3 a week) | last 3 weeks 19.1 a week | lineup value 101.3
7569 | Nico Collins | WR | age 27 | HOU | market 4454 | projected 89.7 (17.9 a week) | last 3 weeks 7.7 a week | lineup value 29.6
12527 | Ashton Jeanty | RB | age 22 | LV | market 5444 | projected 87.6 (17.5 a week) | last 3 weeks 8.5 a week | lineup value 27
9997 | Zay Flowers | WR | age 26 | BAL | market 4224 | projected 82.4 (16.5 a week) | last 3 weeks 9.1 a week | lineup value 22.3
12512 | Quinshon Judkins | RB | age 22 | CLE | market 4550 | projected 81.1 (16.2 a week) | last 3 weeks 10.5 a week | lineup value 20.5
5001 | Dalton Schultz | TE | age 30 | HOU | market 3143 | projected 73.7 (14.7 a week) | last 3 weeks 18.8 a week | lineup value 13.1
8148 | Jameson Williams | WR | age 25 | DET | market 4123 | projected 70.5 (14.1 a week) | last 3 weeks 5.7 a week | lineup value 10.4
5012 | Mark Andrews | TE | age 31 | BAL | market 3055 | projected 70 (14 a week) | last 3 weeks 9.6 a week | lineup value 9.4
7564 | Ja'Marr Chase | WR | age 26 | CIN | market 5777 | projected 64.5 (12.9 a week) | last 3 weeks 27 a week | lineup value 24.4
5872 | Deebo Samuel | WR | age 30 | SF | market 2695 | projected 58.8 (11.8 a week) | last 3 weeks 4.6 a week | lineup value 7.9
11603 | AJ Barner | TE | age 24 | SEA | market 3457 | projected 57.7 (11.5 a week) | last 3 weeks 6 a week | lineup value 1.5
11597 | Theo Johnson | TE | age 25 | NYG | market 3171 | projected 53.2 (10.6 a week) | last 3 weeks 14 a week | lineup value 6.8
10444 | Cedric Tillman | WR | age 26 | NO | market 0 | projected 41.6 (8.3 a week) | last 3 weeks 0 a week | lineup value 0
8408 | Jordan Mason | RB | age 27 | MIN | market 3186 | projected 41.2 (8.2 a week) | last 3 weeks 6.4 a week | lineup value 0
8132 | Tyler Allgeier | RB | age 26 | ARI | market 3213 | projected 40.5 (8.1 a week) | last 3 weeks 4.1 a week | lineup value 0
6130 | Devin Singletary | RB | age 29 | NYG | market 0 | projected 38 (7.6 a week) | last 3 weeks 4.1 a week | lineup value 0
8147 | John Metchie | WR | age 26 | CAR | market 0 | projected 37.3 (7.5 a week) | last 3 weeks 0 a week | lineup value 0
11600 | Ja'Tavion Sanders | TE | age 23 | CAR | market 0 | projected 36.2 (7.2 a week) | last 3 weeks 3.5 a week | lineup value 0
6039 | Ty Johnson | RB | age 29 | BUF | market 0 | projected 32.1 (6.4 a week) | last 3 weeks 3.6 a week | lineup value 0
11625 | Adonai Mitchell | WR | age 24 | NYJ | market 3003 | projected 30.6 (6.1 a week) | last 3 weeks 1.2 a week | lineup value 0
6853 | Van Jefferson | WR | age 30 | WAS | market 0 | projected 24.8 (5 a week) | last 3 weeks 4.6 a week | lineup value 0
5185 | Allen Lazard | WR | age 30 | FA | market 1584 | projected 12.8 (2.6 a week) | last 3 weeks 1.8 a week | lineup value 0
9497 | Jalin Hyatt | WR | age 25 | NYG | market 0 | projected 8.6 (1.7 a week) | last 3 weeks 0 a week | lineup value 0
11643 | Jaylen Wright | RB | age 23 | MIA | market 2798 | projected 7.6 (1.5 a week) | last 3 weeks 1.3 a week | lineup value 0
12520 | Xavier Restrepo | WR | age 24 | TEN | market 0 | projected 0.8 (0.2 a week) | last 3 weeks 0 a week | lineup value 0
12505 | Jalen Royals | WR | age 23 | KC | market 0 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0
11619 | Ja'Lynn Polk | WR | age 24 | FA | market 0 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0
12670 | KeAndre Lambert-Smith | WR | age 24 | LAC | market 0 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0
10857 | Stetson Bennett | QB | age 28 | LAR | market 0 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0

PARTNER (partnerId 12): record 7-2, rank 1, points for 1850.4, contention window 1
4984 | Josh Allen | QB | age 30 | BUF | market 7333 | projected 143 (28.6 a week) | last 3 weeks 18.8 a week | lineup value 34.8
4892 | Baker Mayfield | QB | age 31 | TB | market 4670 | projected 115.9 (23.2 a week) | last 3 weeks 6.1 a week | lineup value 7.7
4034 | Christian McCaffrey | RB | age 30 | SF | market 4644 | projected 103.2 (20.6 a week) | last 3 weeks 29.6 a week | lineup value 51.8
3257 | Jacoby Brissett | QB | age 33 | ARI | market 3018 | projected 102.6 (20.5 a week) | last 3 weeks 17.7 a week | lineup value 0
6813 | Jonathan Taylor | RB | age 27 | IND | market 5084 | projected 101.1 (20.2 a week) | last 3 weeks 27.7 a week | lineup value 50.6
4866 | Saquon Barkley | RB | age 29 | PHI | market 4361 | projected 92.1 (18.4 a week) | last 3 weeks 13.4 a week | lineup value 28.3
1466 | Travis Kelce | TE | age 37 | KC | market 2847 | projected 69.7 (13.9 a week) | last 3 weeks 19.3 a week | lineup value 17.8
12498 | Mason Taylor | TE | age 22 | NYJ | market 3623 | projected 67.6 (13.5 a week) | last 3 weeks 9.9 a week | lineup value 3.7
2307 | Marcus Mariota | QB | age 32 | WAS | market 0 | projected 64.9 (13 a week) | last 3 weeks 5.2 a week | lineup value 0.6
5844 | T.J. Hockenson | TE | age 29 | MIN | market 2924 | projected 64 (12.8 a week) | last 3 weeks 11.6 a week | lineup value 2.7
10213 | Tre Tucker | WR | age 25 | LV | market 2706 | projected 60.6 (12.1 a week) | last 3 weeks 5.4 a week | lineup value 29.5
12489 | RJ Harvey | RB | age 25 | DEN | market 3785 | projected 55.1 (11 a week) | last 3 weeks 16.1 a week | lineup value 5.6
4144 | Jonnu Smith | TE | age 31 | GB | market 0 | projected 50.5 (10.1 a week) | last 3 weeks 9.9 a week | lineup value 0.3
4066 | Evan Engram | TE | age 32 | DEN | market 0 | projected 50.3 (10.1 a week) | last 3 weeks 9.1 a week | lineup value 0.7
4098 | Kareem Hunt | RB | age 30 | FA | market 1819 | projected 49.4 (9.9 a week) | last 3 weeks 11.2 a week | lineup value 1.7
12485 | Tez Johnson | WR | age 24 | TB | market 0 | projected 45.7 (9.1 a week) | last 3 weeks 8.8 a week | lineup value 14.6
9480 | Brenton Strange | TE | age 25 | JAX | market 3617 | projected 44.7 (8.9 a week) | last 3 weeks 0 a week | lineup value 6.1
2374 | Tyler Lockett | WR | age 33 | FA | market 2520 | projected 38.3 (7.7 a week) | last 3 weeks 1.3 a week | lineup value 8
11571 | Isaiah Davis | RB | age 24 | NYJ | market 0 | projected 37.8 (7.6 a week) | last 3 weeks 8 a week | lineup value 0
2306 | Jameis Winston | QB | age 32 | NYG | market 0 | projected 36.8 (7.4 a week) | last 3 weeks 0 a week | lineup value 0
1426 | DeAndre Hopkins | WR | age 33 | FA | market 1499 | projected 30.8 (6.2 a week) | last 3 weeks 0.9 a week | lineup value 0.2
4993 | Mike Gesicki | TE | age 31 | CIN | market 1186 | projected 29.2 (5.8 a week) | last 3 weeks 0 a week | lineup value 0

PARTNER (partnerId 6): record 4-5, rank 7, points for 1696.1, contention window 0.44
11604 | Brock Bowers | TE | age 23 | LV | market 5492 | projected 122.7 (24.5 a week) | last 3 weeks 18.8 a week | lineup value 82.4
3163 | Jared Goff | QB | age 32 | DET | market 4902 | projected 113.9 (22.8 a week) | last 3 weeks 12.3 a week | lineup value 11
11560 | Caleb Williams | QB | age 24 | CHI | market 7254 | projected 98 (19.6 a week) | last 3 weeks 21.4 a week | lineup value 0.5
6797 | Justin Herbert | QB | age 28 | LAC | market 6042 | projected 97.7 (19.5 a week) | last 3 weeks 34.7 a week | lineup value 14
2133 | Davante Adams | WR | age 33 | LAR | market 3346 | projected 85.7 (17.1 a week) | last 3 weeks 16.9 a week | lineup value 44.3
8137 | George Pickens | WR | age 25 | DAL | market 4805 | projected 72 (14.4 a week) | last 3 weeks 14.8 a week | lineup value 39.5
1339 | Zach Ertz | TE | age 35 | PHI | market 0 | projected 61.8 (12.4 a week) | last 3 weeks 12.9 a week | lineup value 26.5
12522 | Cam Ward | QB | age 24 | TEN | market 4737 | projected 59.8 (12 a week) | last 3 weeks 11.8 a week | lineup value 0
9756 | Jordan Addison | WR | age 24 | MIN | market 3604 | projected 57.8 (11.6 a week) | last 3 weeks 14.8 a week | lineup value 16.9
4983 | DJ Moore | WR | age 29 | BUF | market 3675 | projected 54.3 (10.9 a week) | last 3 weeks 15.7 a week | lineup value 12.9
12508 | Jaxson Dart | QB | age 23 | NYG | market 6729 | projected 49.9 (10 a week) | last 3 weeks 29.9 a week | lineup value 5.1
11627 | Troy Franklin | WR | age 23 | DEN | market 3002 | projected 44.1 (8.8 a week) | last 3 weeks 16.5 a week | lineup value 8.8
9508 | Tyjae Spears | RB | age 25 | TEN | market 3006 | projected 41.7 (8.3 a week) | last 3 weeks 11.5 a week | lineup value 25.7
9500 | Josh Downs | WR | age 25 | IND | market 3326 | projected 41.4 (8.3 a week) | last 3 weeks 10 a week | lineup value 7.1
9506 | Sean Tucker | RB | age 24 | TB | market 2879 | projected 40.8 (8.2 a week) | last 3 weeks 4.1 a week | lineup value 23.4
19 | Joe Flacco | QB | age 41 | CIN | market 0 | projected 36.6 (7.3 a week) | last 3 weeks 33.9 a week | lineup value 0
3200 | Sterling Shepard | WR | age 33 | NYJ | market 1649 | projected 30.7 (6.1 a week) | last 3 weeks 3.3 a week | lineup value 0
6943 | Gabe Davis | WR | age 26 | FA | market 1803 | projected 26.4 (5.3 a week) | last 3 weeks 0 a week | lineup value 0
11631 | Brian Thomas | WR | age 24 | JAX | market 3962 | projected 26.2 (5.2 a week) | last 3 weeks 5.1 a week | lineup value 6.9
8154 | Brian Robinson | RB | age 27 | ATL | market 3332 | projected 17 (3.4 a week) | last 3 weeks 5.3 a week | lineup value 1.5
6960 | Tyler Johnson | WR | age 28 | FA | market 1890 | projected 16.5 (3.3 a week) | last 3 weeks 8.5 a week | lineup value 0
5985 | Foster Moreau | TE | age 29 | HOU | market 0 | projected 15.1 (3 a week) | last 3 weeks 0 a week | lineup value 0

PARTNER (partnerId 11): record 5-4, rank 6, points for 1760.1, contention window 0.56
4881 | Lamar Jackson | QB | age 29 | BAL | market 7406 | projected 138.5 (27.7 a week) | last 3 weeks 11.3 a week | lineup value 53.8
421 | Matthew Stafford | QB | age 38 | LAR | market 4384 | projected 112.3 (22.5 a week) | last 3 weeks 24.1 a week | lineup value 27.6
3198 | Derrick Henry | RB | age 32 | BAL | market 4242 | projected 95.8 (19.2 a week) | last 3 weeks 11.3 a week | lineup value 59.5
5850 | Josh Jacobs | RB | age 28 | GB | market 4061 | projected 82.5 (16.5 a week) | last 3 weeks 18 a week | lineup value 52.3
12514 | Emeka Egbuka | WR | age 24 | TB | market 4544 | projected 80.9 (16.2 a week) | last 3 weeks 5.7 a week | lineup value 44.5
6768 | Tua Tagovailoa | QB | age 28 | ATL | market 3069 | projected 78.7 (15.7 a week) | last 3 weeks 14.4 a week | lineup value 0.1
8110 | Jake Ferguson | TE | age 27 | DAL | market 3381 | projected 67.3 (13.5 a week) | last 3 weeks 14.2 a week | lineup value 43.4
2449 | Stefon Diggs | WR | age 32 | WAS | market 2781 | projected 65 (13 a week) | last 3 weeks 12.7 a week | lineup value 35
7567 | Kenny Gainwell | RB | age 27 | TB | market 3126 | projected 59 (11.8 a week) | last 3 weeks 5.3 a week | lineup value 23.9
8121 | Romeo Doubs | WR | age 26 | NE | market 3157 | projected 58.3 (11.7 a week) | last 3 weeks 13.8 a week | lineup value 22
12534 | Kyle Monangai | RB | age 24 | CHI | market 3888 | projected 47.1 (9.4 a week) | last 3 weeks 15.4 a week | lineup value 10.7
8125 | Calvin Austin | WR | age 27 | NYG | market 0 | projected 42.4 (8.5 a week) | last 3 weeks 6.1 a week | lineup value 6
12521 | Elijah Arroyo | TE | age 23 | SEA | market 0 | projected 30.9 (6.2 a week) | last 3 weeks 7.9 a week | lineup value 0
8143 | Jerome Ford | RB | age 27 | ARI | market 0 | projected 28.1 (5.6 a week) | last 3 weeks 1.4 a week | lineup value 0.3
4035 | Alvin Kamara | RB | age 31 | NO | market 2598 | projected 27.7 (5.5 a week) | last 3 weeks 4.6 a week | lineup value 11.3
9494 | Marvin Mims | WR | age 24 | DEN | market 2735 | projected 18.9 (3.8 a week) | last 3 weeks 6.3 a week | lineup value 0.8
8119 | Jahan Dotson | WR | age 26 | ATL | market 0 | projected 17.8 (3.6 a week) | last 3 weeks 3.7 a week | lineup value 0
12535 | Isaac TeSlaa | WR | age 24 | DET | market 2775 | projected 16.3 (3.3 a week) | last 3 weeks 0 a week | lineup value 0
8146 | Garrett Wilson | WR | age 26 | NYJ | market 4218 | projected 16.2 (3.2 a week) | last 3 weeks 0 a week | lineup value 6
7587 | Dyami Brown | WR | age 26 | WAS | market 0 | projected 16 (3.2 a week) | last 3 weeks 4.6 a week | lineup value 0
3271 | Tyler Higbee | TE | age 33 | LAR | market 0 | projected 13.4 (2.7 a week) | last 3 weeks 7.3 a week | lineup value 0.4
5995 | Justice Hill | RB | age 28 | BAL | market 2016 | projected 10.5 (2.1 a week) | last 3 weeks 1.3 a week | lineup value 0

PARTNER (partnerId 10): record 7-2, rank 2, points for 1752.2, contention window 1
6904 | Jalen Hurts | QB | age 28 | PHI | market 6251 | projected 133.1 (26.6 a week) | last 3 weeks 21.4 a week | lineup value 46.9
1373 | Geno Smith | QB | age 36 | NYJ | market 2674 | projected 97.9 (19.6 a week) | last 3 weeks 12.8 a week | lineup value 11.8
8228 | Jaylen Warren | RB | age 27 | PIT | market 3662 | projected 80.2 (16 a week) | last 3 weeks 16.3 a week | lineup value 41.4
7543 | Travis Etienne | RB | age 27 | NO | market 3949 | projected 76.5 (15.3 a week) | last 3 weeks 8.6 a week | lineup value 37.6
8134 | Khalil Shakir | WR | age 26 | BUF | market 3129 | projected 68.7 (13.7 a week) | last 3 weeks 11.1 a week | lineup value 25.8
8183 | Brock Purdy | QB | age 26 | SF | market 5660 | projected 67.5 (13.5 a week) | last 3 weeks 0 a week | lineup value 8.1
7002 | Juwan Johnson | TE | age 30 | NO | market 3095 | projected 64.5 (12.9 a week) | last 3 weeks 16.8 a week | lineup value 31.7
6819 | Michael Pittman | WR | age 29 | PIT | market 2984 | projected 56.1 (11.2 a week) | last 3 weeks 22.8 a week | lineup value 21.5
5045 | Courtland Sutton | WR | age 31 | DEN | market 3191 | projected 56 (11.2 a week) | last 3 weeks 13.1 a week | lineup value 21.3
4039 | Cooper Kupp | WR | age 33 | SEA | market 2099 | projected 48.4 (9.7 a week) | last 3 weeks 1.2 a week | lineup value 5.5
12540 | Chimere Dike | WR | age 24 | TEN | market 2854 | projected 38 (7.6 a week) | last 3 weeks 14.2 a week | lineup value 3
4177 | Mack Hollins | WR | age 33 | NE | market 0 | projected 36.8 (7.4 a week) | last 3 weeks 1.1 a week | lineup value 4.1
11834 | Devaughn Vele | WR | age 28 | NO | market 2262 | projected 34.8 (7 a week) | last 3 weeks 0.8 a week | lineup value 1.2
11584 | Bucky Irving | RB | age 24 | TB | market 4452 | projected 34.1 (6.8 a week) | last 3 weeks 0 a week | lineup value 15.3
5857 | Noah Fant | TE | age 28 | NO | market 0 | projected 33.2 (6.6 a week) | last 3 weeks 14.2 a week | lineup value 7
12486 | Dillon Gabriel | QB | age 25 | CLE | market 0 | projected 33.2 (6.6 a week) | last 3 weeks 7.9 a week | lineup value 0
12533 | Jacory Croskey-Merritt | RB | age 25 | WAS | market 3369 | projected 32.6 (6.5 a week) | last 3 weeks 4.2 a week | lineup value 4.1
10236 | Dalton Kincaid | TE | age 26 | BUF | market 3748 | projected 29.1 (5.8 a week) | last 3 weeks 11.1 a week | lineup value 11.8
6826 | Cole Kmet | TE | age 27 | CHI | market 0 | projected 27 (5.4 a week) | last 3 weeks 2.4 a week | lineup value 0
12469 | Dylan Sampson | RB | age 22 | CLE | market 3283 | projected 23.4 (4.7 a week) | last 3 weeks 3.7 a week | lineup value 0
12483 | Jack Bech | WR | age 23 | LV | market 2708 | projected 20.7 (4.1 a week) | last 3 weeks 1.1 a week | lineup value 0
8225 | Daniel Bellinger | TE | age 26 | TEN | market 0 | projected 20.1 (4 a week) | last 3 weeks 1.5 a week | lineup value 0

PARTNER (partnerId 8): record 7-2, rank 3, points for 1727.9, contention window 0.95
9488 | Jaxon Smith-Njigba | WR | age 24 | SEA | market 5847 | projected 118.9 (23.8 a week) | last 3 weeks 17 a week | lineup value 67.3
9493 | Puka Nacua | WR | age 25 | LAR | market 5727 | projected 115.8 (23.2 a week) | last 3 weeks 7.8 a week | lineup value 64.2
6804 | Jordan Love | QB | age 27 | GB | market 5312 | projected 103.6 (20.7 a week) | last 3 weeks 20 a week | lineup value 25.3
4943 | Sam Darnold | QB | age 29 | SEA | market 4507 | projected 101.6 (20.3 a week) | last 3 weeks 15.9 a week | lineup value 23.3
7553 | Kyle Pitts | TE | age 26 | ATL | market 3933 | projected 78.9 (15.8 a week) | last 3 weeks 19.1 a week | lineup value 26.3
4217 | George Kittle | TE | age 33 | SF | market 3134 | projected 78 (15.6 a week) | last 3 weeks 10 a week | lineup value 35.1
12506 | Harold Fannin | TE | age 22 | CLE | market 4656 | projected 75 (15 a week) | last 3 weeks 12.3 a week | lineup value 22.5
9224 | Chase Brown | RB | age 26 | CIN | market 4619 | projected 73 (14.6 a week) | last 3 weeks 20.2 a week | lineup value 31.8
6790 | D'Andre Swift | RB | age 27 | CHI | market 3731 | projected 68.6 (13.7 a week) | last 3 weeks 12.7 a week | lineup value 20.6
11647 | Kimani Vidal | RB | age 25 | LAC | market 2886 | projected 59.4 (11.9 a week) | last 3 weeks 10.9 a week | lineup value 21
827 | Tyrod Taylor | QB | age 37 | GB | market 0 | projected 57.7 (11.5 a week) | last 3 weeks 1.4 a week | lineup value 0.4
8167 | Christian Watson | WR | age 27 | GB | market 3711 | projected 55.8 (11.2 a week) | last 3 weeks 7.1 a week | lineup value 7
8676 | Rashid Shaheed | WR | age 28 | SEA | market 2717 | projected 49 (9.8 a week) | last 3 weeks 12.3 a week | lineup value 0.9
12476 | Devin Neal | RB | age 23 | WAS | market 2858 | projected 40.8 (8.2 a week) | last 3 weeks 2.1 a week | lineup value 6.2
5967 | Tony Pollard | RB | age 29 | TEN | market 3311 | projected 38.3 (7.7 a week) | last 3 weeks 9.7 a week | lineup value 0
6149 | Darius Slayton | WR | age 29 | IND | market 0 | projected 32.1 (6.4 a week) | last 3 weeks 5.5 a week | lineup value 2.2
4381 | Taysom Hill | TE | age 35 | FA | market 1561 | projected 29.9 (6 a week) | last 3 weeks 3.9 a week | lineup value 0
10231 | Elijah Higgins | TE | age 25 | ARI | market 0 | projected 28.1 (5.6 a week) | last 3 weeks 0 a week | lineup value 0
11628 | Marvin Harrison | WR | age 24 | HOU | market 3954 | projected 27.3 (5.5 a week) | last 3 weeks 10.7 a week | lineup value 3.9
2749 | Raheem Mostert | RB | age 33 | FA | market 1184 | projected 20.4 (4.1 a week) | last 3 weeks 1.3 a week | lineup value 0
12495 | Ollie Gordon | RB | age 22 | MIA | market 0 | projected 19.1 (3.8 a week) | last 3 weeks 6.5 a week | lineup value 0
6869 | Adam Trautman | TE | age 29 | DEN | market 0 | projected 15 (3 a week) | last 3 weeks 2.3 a week | lineup value 0

CANDIDATE DEALS (from a rules-based finder; points are the finder projections for the rest of the season):
c1 | partnerId 12 | I give John Metchie (8147) | I get Marcus Mariota + Jameis Winston (2307,2306) | my points 45.6 | their points 7.8 | likelihood 0.8
c2 | partnerId 6 | I give Devin Singletary + Ty Johnson (6130,6039) | I get Joe Flacco (19) | my points 12.3 | their points 16.6 | likelihood 0.76
c3 | partnerId 12 | I give Deebo Samuel + John Metchie (5872,8147) | I get Jacoby Brissett + Marcus Mariota (3257,2307) | my points 54.9 | their points 34.1 | likelihood 0.65
c4 | partnerId 12 | I give Nico Collins + Deebo Samuel (7569,5872) | I get Baker Mayfield + Marcus Mariota (4892,2307) | my points 35.9 | their points 57.5 | likelihood 0.73
c5 | partnerId 12 | I give Nico Collins + Jameson Williams (7569,8148) | I get Baker Mayfield + Jacoby Brissett (4892,3257) | my points 27.5 | their points 53.7 | likelihood 0.75
c6 | partnerId 11 | I give Mark Andrews + Deebo Samuel (5012,5872) | I get Tua Tagovailoa (6768) | my points 21.3 | their points 53.4 | likelihood 0.75
c7 | partnerId 10 | I give Dalton Schultz (5001) | I get Geno Smith + Dillon Gabriel (1373,12486) | my points 41.4 | their points 14.4 | likelihood 0.95
c8 | partnerId 11 | I give Mark Andrews + Jameson Williams (5012,8148) | I get Tua Tagovailoa + Garrett Wilson (6768,8146) | my points 24.3 | their points 51.5 | likelihood 0.72
c9 | partnerId 10 | I give Ashton Jeanty + Zay Flowers (12527,9997) | I get Geno Smith + Brock Purdy (1373,8183) | my points 6.8 | their points 29.1 | likelihood 0.75
c10 | partnerId 8 | I give Nico Collins + Deebo Samuel (7569,5872) | I get Sam Darnold (4943) | my points 10.7 | their points 19.6 | likelihood 0.72
c11 | partnerId 10 | I give Jahmyr Gibbs + Dalton Schultz (9221,5001) | I get Brock Purdy + Jalen Hurts (8183,6904) | my points 9.2 | their points 20.3 | likelihood 0.66

Pick the best trades for my team.

=========== CASE 1180209456973922304-w10-r8 ===========
REPLY FILE: /Users/anik/workspace/chrome/sleeper/.eval-market/replies/suggest-v2/heldout1/1180209456973922304-w10-r8.json
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
Lineup slots: QB, RB, RB, WR, WR, WR, TE, FLEX, FLEX, FLEX, SUPER_FLEX, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN. Superflex: yes. Tight end premium: yes. Points per reception: 1.
Columns: id | name | position | age | team | market value | projected points for the rest of the regular season (and per week) | points per week over the last three weeks played | lineup value (points my lineup loses if this player is removed).

MY TEAM (partnerId me): record 7-2, rank 3, points for 1727.9, contention window 0.95
9488 | Jaxon Smith-Njigba | WR | age 24 | SEA | market 5847 | projected 118.9 (23.8 a week) | last 3 weeks 17 a week | lineup value 67.3
9493 | Puka Nacua | WR | age 25 | LAR | market 5727 | projected 115.8 (23.2 a week) | last 3 weeks 7.8 a week | lineup value 64.2
6804 | Jordan Love | QB | age 27 | GB | market 5312 | projected 103.6 (20.7 a week) | last 3 weeks 20 a week | lineup value 25.3
4943 | Sam Darnold | QB | age 29 | SEA | market 4507 | projected 101.6 (20.3 a week) | last 3 weeks 15.9 a week | lineup value 23.3
7553 | Kyle Pitts | TE | age 26 | ATL | market 3933 | projected 78.9 (15.8 a week) | last 3 weeks 19.1 a week | lineup value 26.3
4217 | George Kittle | TE | age 33 | SF | market 3134 | projected 78 (15.6 a week) | last 3 weeks 10 a week | lineup value 35.1
12506 | Harold Fannin | TE | age 22 | CLE | market 4656 | projected 75 (15 a week) | last 3 weeks 12.3 a week | lineup value 22.5
9224 | Chase Brown | RB | age 26 | CIN | market 4619 | projected 73 (14.6 a week) | last 3 weeks 20.2 a week | lineup value 31.8
6790 | D'Andre Swift | RB | age 27 | CHI | market 3731 | projected 68.6 (13.7 a week) | last 3 weeks 12.7 a week | lineup value 20.6
11647 | Kimani Vidal | RB | age 25 | LAC | market 2886 | projected 59.4 (11.9 a week) | last 3 weeks 10.9 a week | lineup value 21
827 | Tyrod Taylor | QB | age 37 | GB | market 0 | projected 57.7 (11.5 a week) | last 3 weeks 1.4 a week | lineup value 0.4
8167 | Christian Watson | WR | age 27 | GB | market 3711 | projected 55.8 (11.2 a week) | last 3 weeks 7.1 a week | lineup value 7
8676 | Rashid Shaheed | WR | age 28 | SEA | market 2717 | projected 49 (9.8 a week) | last 3 weeks 12.3 a week | lineup value 0.9
12476 | Devin Neal | RB | age 23 | WAS | market 2858 | projected 40.8 (8.2 a week) | last 3 weeks 2.1 a week | lineup value 6.2
5967 | Tony Pollard | RB | age 29 | TEN | market 3311 | projected 38.3 (7.7 a week) | last 3 weeks 9.7 a week | lineup value 0
6149 | Darius Slayton | WR | age 29 | IND | market 0 | projected 32.1 (6.4 a week) | last 3 weeks 5.5 a week | lineup value 2.2
4381 | Taysom Hill | TE | age 35 | FA | market 1561 | projected 29.9 (6 a week) | last 3 weeks 3.9 a week | lineup value 0
10231 | Elijah Higgins | TE | age 25 | ARI | market 0 | projected 28.1 (5.6 a week) | last 3 weeks 0 a week | lineup value 0
11628 | Marvin Harrison | WR | age 24 | HOU | market 3954 | projected 27.3 (5.5 a week) | last 3 weeks 10.7 a week | lineup value 3.9
2749 | Raheem Mostert | RB | age 33 | FA | market 1184 | projected 20.4 (4.1 a week) | last 3 weeks 1.3 a week | lineup value 0
12495 | Ollie Gordon | RB | age 22 | MIA | market 0 | projected 19.1 (3.8 a week) | last 3 weeks 6.5 a week | lineup value 0
6869 | Adam Trautman | TE | age 29 | DEN | market 0 | projected 15 (3 a week) | last 3 weeks 2.3 a week | lineup value 0
8205 | Isiah Pacheco | RB | age 27 | DET | market 2611 | projected 14.9 (3 a week) | last 3 weeks 6.7 a week | lineup value 0
3202 | Austin Hooper | TE | age 31 | ATL | market 1238 | projected 13.5 (2.7 a week) | last 3 weeks 4.1 a week | lineup value 0
5096 | Ray-Ray McCloud | WR | age 29 | FA | market 0 | projected 9.6 (1.9 a week) | last 3 weeks 0.5 a week | lineup value 0
1689 | Adam Thielen | WR | age 35 | FA | market 2169 | projected 8 (1.6 a week) | last 3 weeks 0.8 a week | lineup value 0
11599 | Cade Stover | TE | age 26 | HOU | market 0 | projected 7.9 (1.6 a week) | last 3 weeks 0 a week | lineup value 0
12482 | Savion Williams | WR | age 24 | GB | market 0 | projected 7.2 (1.4 a week) | last 3 weeks 3.1 a week | lineup value 0
8698 | Jake Tonges | TE | age 27 | SF | market 2671 | projected 6.1 (1.2 a week) | last 3 weeks 2.7 a week | lineup value 0
5938 | Lil'Jordan Humphrey | WR | age 28 | DEN | market 0 | projected 5.4 (1.1 a week) | last 3 weeks 0 a week | lineup value 0

PARTNER (partnerId 4): record 6-3, rank 4, points for 1693.3, contention window 0.82
9221 | Jahmyr Gibbs | RB | age 24 | DET | market 6458 | projected 122.7 (24.5 a week) | last 3 weeks 14.7 a week | lineup value 62.2
3294 | Dak Prescott | QB | age 33 | DAL | market 5216 | projected 101.3 (20.3 a week) | last 3 weeks 19.1 a week | lineup value 101.3
7569 | Nico Collins | WR | age 27 | HOU | market 4454 | projected 89.7 (17.9 a week) | last 3 weeks 7.7 a week | lineup value 29.6
12527 | Ashton Jeanty | RB | age 22 | LV | market 5444 | projected 87.6 (17.5 a week) | last 3 weeks 8.5 a week | lineup value 27
9997 | Zay Flowers | WR | age 26 | BAL | market 4224 | projected 82.4 (16.5 a week) | last 3 weeks 9.1 a week | lineup value 22.3
12512 | Quinshon Judkins | RB | age 22 | CLE | market 4550 | projected 81.1 (16.2 a week) | last 3 weeks 10.5 a week | lineup value 20.5
5001 | Dalton Schultz | TE | age 30 | HOU | market 3143 | projected 73.7 (14.7 a week) | last 3 weeks 18.8 a week | lineup value 13.1
8148 | Jameson Williams | WR | age 25 | DET | market 4123 | projected 70.5 (14.1 a week) | last 3 weeks 5.7 a week | lineup value 10.4
5012 | Mark Andrews | TE | age 31 | BAL | market 3055 | projected 70 (14 a week) | last 3 weeks 9.6 a week | lineup value 9.4
7564 | Ja'Marr Chase | WR | age 26 | CIN | market 5777 | projected 64.5 (12.9 a week) | last 3 weeks 27 a week | lineup value 24.4
5872 | Deebo Samuel | WR | age 30 | SF | market 2695 | projected 58.8 (11.8 a week) | last 3 weeks 4.6 a week | lineup value 7.9
11603 | AJ Barner | TE | age 24 | SEA | market 3457 | projected 57.7 (11.5 a week) | last 3 weeks 6 a week | lineup value 1.5
11597 | Theo Johnson | TE | age 25 | NYG | market 3171 | projected 53.2 (10.6 a week) | last 3 weeks 14 a week | lineup value 6.8
10444 | Cedric Tillman | WR | age 26 | NO | market 0 | projected 41.6 (8.3 a week) | last 3 weeks 0 a week | lineup value 0
8408 | Jordan Mason | RB | age 27 | MIN | market 3186 | projected 41.2 (8.2 a week) | last 3 weeks 6.4 a week | lineup value 0
8132 | Tyler Allgeier | RB | age 26 | ARI | market 3213 | projected 40.5 (8.1 a week) | last 3 weeks 4.1 a week | lineup value 0
6130 | Devin Singletary | RB | age 29 | NYG | market 0 | projected 38 (7.6 a week) | last 3 weeks 4.1 a week | lineup value 0
8147 | John Metchie | WR | age 26 | CAR | market 0 | projected 37.3 (7.5 a week) | last 3 weeks 0 a week | lineup value 0
11600 | Ja'Tavion Sanders | TE | age 23 | CAR | market 0 | projected 36.2 (7.2 a week) | last 3 weeks 3.5 a week | lineup value 0
6039 | Ty Johnson | RB | age 29 | BUF | market 0 | projected 32.1 (6.4 a week) | last 3 weeks 3.6 a week | lineup value 0
11625 | Adonai Mitchell | WR | age 24 | NYJ | market 3003 | projected 30.6 (6.1 a week) | last 3 weeks 1.2 a week | lineup value 0
6853 | Van Jefferson | WR | age 30 | WAS | market 0 | projected 24.8 (5 a week) | last 3 weeks 4.6 a week | lineup value 0

PARTNER (partnerId 12): record 7-2, rank 1, points for 1850.4, contention window 1
4984 | Josh Allen | QB | age 30 | BUF | market 7333 | projected 143 (28.6 a week) | last 3 weeks 18.8 a week | lineup value 34.8
4892 | Baker Mayfield | QB | age 31 | TB | market 4670 | projected 115.9 (23.2 a week) | last 3 weeks 6.1 a week | lineup value 7.7
4034 | Christian McCaffrey | RB | age 30 | SF | market 4644 | projected 103.2 (20.6 a week) | last 3 weeks 29.6 a week | lineup value 51.8
3257 | Jacoby Brissett | QB | age 33 | ARI | market 3018 | projected 102.6 (20.5 a week) | last 3 weeks 17.7 a week | lineup value 0
6813 | Jonathan Taylor | RB | age 27 | IND | market 5084 | projected 101.1 (20.2 a week) | last 3 weeks 27.7 a week | lineup value 50.6
4866 | Saquon Barkley | RB | age 29 | PHI | market 4361 | projected 92.1 (18.4 a week) | last 3 weeks 13.4 a week | lineup value 28.3
1466 | Travis Kelce | TE | age 37 | KC | market 2847 | projected 69.7 (13.9 a week) | last 3 weeks 19.3 a week | lineup value 17.8
12498 | Mason Taylor | TE | age 22 | NYJ | market 3623 | projected 67.6 (13.5 a week) | last 3 weeks 9.9 a week | lineup value 3.7
2307 | Marcus Mariota | QB | age 32 | WAS | market 0 | projected 64.9 (13 a week) | last 3 weeks 5.2 a week | lineup value 0.6
5844 | T.J. Hockenson | TE | age 29 | MIN | market 2924 | projected 64 (12.8 a week) | last 3 weeks 11.6 a week | lineup value 2.7
10213 | Tre Tucker | WR | age 25 | LV | market 2706 | projected 60.6 (12.1 a week) | last 3 weeks 5.4 a week | lineup value 29.5
12489 | RJ Harvey | RB | age 25 | DEN | market 3785 | projected 55.1 (11 a week) | last 3 weeks 16.1 a week | lineup value 5.6
4144 | Jonnu Smith | TE | age 31 | GB | market 0 | projected 50.5 (10.1 a week) | last 3 weeks 9.9 a week | lineup value 0.3
4066 | Evan Engram | TE | age 32 | DEN | market 0 | projected 50.3 (10.1 a week) | last 3 weeks 9.1 a week | lineup value 0.7
4098 | Kareem Hunt | RB | age 30 | FA | market 1819 | projected 49.4 (9.9 a week) | last 3 weeks 11.2 a week | lineup value 1.7
12485 | Tez Johnson | WR | age 24 | TB | market 0 | projected 45.7 (9.1 a week) | last 3 weeks 8.8 a week | lineup value 14.6
9480 | Brenton Strange | TE | age 25 | JAX | market 3617 | projected 44.7 (8.9 a week) | last 3 weeks 0 a week | lineup value 6.1
2374 | Tyler Lockett | WR | age 33 | FA | market 2520 | projected 38.3 (7.7 a week) | last 3 weeks 1.3 a week | lineup value 8
11571 | Isaiah Davis | RB | age 24 | NYJ | market 0 | projected 37.8 (7.6 a week) | last 3 weeks 8 a week | lineup value 0
2306 | Jameis Winston | QB | age 32 | NYG | market 0 | projected 36.8 (7.4 a week) | last 3 weeks 0 a week | lineup value 0
1426 | DeAndre Hopkins | WR | age 33 | FA | market 1499 | projected 30.8 (6.2 a week) | last 3 weeks 0.9 a week | lineup value 0.2
4993 | Mike Gesicki | TE | age 31 | CIN | market 1186 | projected 29.2 (5.8 a week) | last 3 weeks 0 a week | lineup value 0

PARTNER (partnerId 2): record 3-6, rank 8, points for 1686.4, contention window 0.31
7547 | Amon-Ra St. Brown | WR | age 26 | DET | market 5272 | projected 108.8 (21.8 a week) | last 3 weeks 13.4 a week | lineup value 65.9
8138 | James Cook | RB | age 27 | BUF | market 5061 | projected 103.5 (20.7 a week) | last 3 weeks 16.8 a week | lineup value 61
5859 | A.J. Brown | WR | age 29 | NE | market 4321 | projected 84.4 (16.9 a week) | last 3 weeks 9.5 a week | lineup value 41.5
5870 | Daniel Jones | QB | age 29 | IND | market 3990 | projected 83.5 (16.7 a week) | last 3 weeks 24.9 a week | lineup value 29.5
5022 | Dallas Goedert | TE | age 31 | PHI | market 3087 | projected 81.4 (16.3 a week) | last 3 weeks 9.5 a week | lineup value 40.5
8136 | Rachaad White | RB | age 27 | WAS | market 2768 | projected 58.8 (11.8 a week) | last 3 weeks 6 a week | lineup value 17.9
8122 | Zonovan Knight | RB | age 25 | ARI | market 0 | projected 58.5 (11.7 a week) | last 3 weeks 6 a week | lineup value 16
1166 | Kirk Cousins | QB | age 38 | LV | market 2332 | projected 54 (10.8 a week) | last 3 weeks 2.4 a week | lineup value 0
11620 | Rome Odunze | WR | age 24 | CHI | market 4074 | projected 53.5 (10.7 a week) | last 3 weeks 8.6 a week | lineup value 17.5
1479 | Keenan Allen | WR | age 34 | IND | market 2126 | projected 50.9 (10.2 a week) | last 3 weeks 15.5 a week | lineup value 17.3
5906 | Dawson Knox | TE | age 29 | BUF | market 0 | projected 48.1 (9.6 a week) | last 3 weeks 2.9 a week | lineup value 7.3
6770 | Joe Burrow | QB | age 29 | CIN | market 6524 | projected 43.1 (8.6 a week) | last 3 weeks 0 a week | lineup value 7.3
9479 | Darnell Washington | TE | age 25 | PIT | market 0 | projected 40.7 (8.1 a week) | last 3 weeks 8.5 a week | lineup value 3.5
8112 | Drake London | WR | age 25 | ATL | market 4882 | projected 37.5 (7.5 a week) | last 3 weeks 16.3 a week | lineup value 19.1
4950 | Christian Kirk | WR | age 29 | SF | market 2210 | projected 34.7 (6.9 a week) | last 3 weeks 2.4 a week | lineup value 1.8
9486 | Dontayvion Wicks | WR | age 25 | PHI | market 2548 | projected 32.4 (6.5 a week) | last 3 weeks 0.5 a week | lineup value 0
11626 | Xavier Legette | WR | age 25 | CAR | market 0 | projected 31.8 (6.4 a week) | last 3 weeks 10.8 a week | lineup value 0
5970 | Greg Dortch | WR | age 28 | BUF | market 0 | projected 31 (6.2 a week) | last 3 weeks 1.1 a week | lineup value 0.4
9511 | Keaton Mitchell | RB | age 24 | LAC | market 2933 | projected 28.4 (5.7 a week) | last 3 weeks 2.6 a week | lineup value 0
11637 | Keon Coleman | WR | age 23 | BUF | market 2741 | projected 22.4 (4.5 a week) | last 3 weeks 3.6 a week | lineup value 1.9
10218 | Xavier Hutchinson | WR | age 26 | HOU | market 0 | projected 21.8 (4.4 a week) | last 3 weeks 9.1 a week | lineup value 0
8917 | KaVontae Turpin | WR | age 30 | DAL | market 1169 | projected 20.5 (4.1 a week) | last 3 weeks 2.4 a week | lineup value 0

CANDIDATE DEALS (from a rules-based finder; points are the finder projections for the rest of the season):
c1 | partnerId 4 | I give Sam Darnold (4943) | I get Nico Collins + Deebo Samuel (7569,5872) | my points 19.6 | their points 10.7 | likelihood 0.63
c2 | partnerId 12 | I give Christian Watson (8167) | I get Jacoby Brissett + Mason Taylor (3257,12498) | my points 8.5 | their points 15 | likelihood 0.83
c3 | partnerId 12 | I give Rashid Shaheed + Darius Slayton (8676,6149) | I get Marcus Mariota + T.J. Hockenson (2307,5844) | my points 9.9 | their points 12.2 | likelihood 0.48
c4 | partnerId 2 | I give Tony Pollard + Taysom Hill (5967,4381) | I get Dallas Goedert + Rachaad White (5022,8136) | my points 25.4 | their points -52.5 | likelihood 0.62
c5 | partnerId 2 | I give Tony Pollard + Isiah Pacheco (5967,8205) | I get Dallas Goedert (5022) | my points 20.1 | their points -35.4 | likelihood 0.65

Pick the best trades for my team.

=========== CASE 1180209456973922304-w4-r12 ===========
REPLY FILE: /Users/anik/workspace/chrome/sleeper/.eval-market/replies/suggest-v2/heldout1/1180209456973922304-w4-r12.json
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
Lineup slots: QB, RB, RB, WR, WR, WR, TE, FLEX, FLEX, FLEX, SUPER_FLEX, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN. Superflex: yes. Tight end premium: yes. Points per reception: 1.
Columns: id | name | position | age | team | market value | projected points for the rest of the regular season (and per week) | points per week over the last three weeks played | lineup value (points my lineup loses if this player is removed).

MY TEAM (partnerId me): record 2-1, rank 2, points for 606.2, contention window 1
4984 | Josh Allen | QB | age 30 | BUF | market 7339 | projected 283.1 (25.7 a week) | last 3 weeks 28.3 a week | lineup value 143.7
4034 | Christian McCaffrey | RB | age 30 | SF | market 4645 | projected 265.4 (24.1 a week) | last 3 weeks 25 a week | lineup value 146.1
6813 | Jonathan Taylor | RB | age 27 | IND | market 5107 | projected 243.7 (22.2 a week) | last 3 weeks 26.1 a week | lineup value 125.3
4892 | Baker Mayfield | QB | age 31 | TB | market 4667 | projected 233.6 (21.2 a week) | last 3 weeks 24.7 a week | lineup value 81.6
4866 | Saquon Barkley | RB | age 29 | PHI | market 4360 | projected 191.3 (17.4 a week) | last 3 weeks 15.9 a week | lineup value 67.1
1466 | Travis Kelce | TE | age 37 | KC | market 2851 | projected 166.1 (15.1 a week) | last 3 weeks 13.6 a week | lineup value 46.3
5844 | T.J. Hockenson | TE | age 29 | MIN | market 2933 | projected 131.1 (11.9 a week) | last 3 weeks 10.9 a week | lineup value 13.1
12498 | Mason Taylor | TE | age 22 | NYJ | market 3630 | projected 127.3 (11.6 a week) | last 3 weeks 5.7 a week | lineup value 6.3
4066 | Evan Engram | TE | age 32 | DEN | market 0 | projected 120.2 (10.9 a week) | last 3 weeks 3.9 a week | lineup value 7.5
10213 | Tre Tucker | WR | age 25 | LV | market 2708 | projected 117.5 (10.7 a week) | last 3 weeks 20.2 a week | lineup value 65.7
4144 | Jonnu Smith | TE | age 31 | GB | market 0 | projected 115.3 (10.5 a week) | last 3 weeks 12.3 a week | lineup value 8.1
12489 | RJ Harvey | RB | age 25 | DEN | market 3776 | projected 106.5 (9.7 a week) | last 3 weeks 5.5 a week | lineup value 5.7
4098 | Kareem Hunt | RB | age 30 | FA | market 1821 | projected 104.3 (9.5 a week) | last 3 weeks 7.5 a week | lineup value 7.3
9480 | Brenton Strange | TE | age 25 | JAX | market 3607 | projected 71 (6.5 a week) | last 3 weeks 13.8 a week | lineup value 9.7
3161 | Carson Wentz | QB | age 33 | MIN | market 0 | projected 70.9 (6.4 a week) | last 3 weeks 6.4 a week | lineup value 4.6
11571 | Isaiah Davis | RB | age 24 | NYJ | market 0 | projected 66.8 (6.1 a week) | last 3 weeks 1.2 a week | lineup value 0
1426 | DeAndre Hopkins | WR | age 33 | FA | market 1498 | projected 56.2 (5.1 a week) | last 3 weeks 9.6 a week | lineup value 7.3
2374 | Tyler Lockett | WR | age 33 | FA | market 2518 | projected 50.7 (4.6 a week) | last 3 weeks 3.7 a week | lineup value 10.9
4993 | Mike Gesicki | TE | age 31 | CIN | market 1187 | projected 49.8 (4.5 a week) | last 3 weeks 4.8 a week | lineup value 0
12503 | Isaiah Bond | WR | age 22 | CLE | market 0 | projected 47.1 (4.3 a week) | last 3 weeks 2.6 a week | lineup value 14.3
11623 | Jordan Whittington | WR | age 26 | LAR | market 0 | projected 47 (4.3 a week) | last 3 weeks 3.5 a week | lineup value 4.6
11630 | Roman Wilson | WR | age 25 | PIT | market 0 | projected 43.2 (3.9 a week) | last 3 weeks 0.6 a week | lineup value 0.7
8117 | Jalen Tolbert | WR | age 27 | MIA | market 0 | projected 40.4 (3.7 a week) | last 3 weeks 4.3 a week | lineup value 15.5
11575 | Ray Davis | RB | age 26 | BUF | market 2578 | projected 37 (3.4 a week) | last 3 weeks 1.3 a week | lineup value 0
2306 | Jameis Winston | QB | age 32 | NYG | market 0 | projected 36.8 (3.3 a week) | last 3 weeks 0 a week | lineup value 0
12547 | Kyle Williams | WR | age 23 | NE | market 2802 | projected 28.6 (2.6 a week) | last 3 weeks 1.4 a week | lineup value 0.9
12539 | Arian Smith | WR | age 25 | NYJ | market 0 | projected 26.7 (2.4 a week) | last 3 weeks 1.2 a week | lineup value 4.6
11617 | Malachi Corley | WR | age 24 | CLE | market 2386 | projected 13.9 (1.3 a week) | last 3 weeks 0 a week | lineup value 0
12542 | Efton Chism | WR | age 24 | NE | market 0 | projected 3.6 (0.3 a week) | last 3 weeks 0 a week | lineup value 0
13150 | Darius Cooper | WR | age 24 | PHI | market 0 | projected 0.7 (0.1 a week) | last 3 weeks 0 a week | lineup value 0

PARTNER (partnerId 11): record 2-1, rank 4, points for 591.6, contention window 0.82
421 | Matthew Stafford | QB | age 38 | LAR | market 4279 | projected 210.1 (19.1 a week) | last 3 weeks 18.9 a week | lineup value 66.5
6768 | Tua Tagovailoa | QB | age 28 | ATL | market 3066 | projected 194.9 (17.7 a week) | last 3 weeks 17 a week | lineup value 57.4
3198 | Derrick Henry | RB | age 32 | BAL | market 4253 | projected 193.6 (17.6 a week) | last 3 weeks 14.6 a week | lineup value 116.8
4881 | Lamar Jackson | QB | age 29 | BAL | market 7397 | projected 193.2 (17.6 a week) | last 3 weeks 34.1 a week | lineup value 70.8
5850 | Josh Jacobs | RB | age 28 | GB | market 4077 | projected 183.5 (16.7 a week) | last 3 weeks 14.4 a week | lineup value 109.6
8110 | Jake Ferguson | TE | age 27 | DAL | market 3398 | projected 179.4 (16.3 a week) | last 3 weeks 24.6 a week | lineup value 121.4
12514 | Emeka Egbuka | WR | age 24 | TB | market 4530 | projected 166.2 (15.1 a week) | last 3 weeks 17.5 a week | lineup value 89.9
2449 | Stefon Diggs | WR | age 32 | WAS | market 2784 | projected 150.6 (13.7 a week) | last 3 weeks 8.6 a week | lineup value 71.9
8121 | Romeo Doubs | WR | age 26 | NE | market 3157 | projected 116.5 (10.6 a week) | last 3 weeks 8.8 a week | lineup value 36.4
4035 | Alvin Kamara | RB | age 31 | NO | market 2574 | projected 114.9 (10.4 a week) | last 3 weeks 13 a week | lineup value 49.8
7567 | Kenny Gainwell | RB | age 27 | TB | market 3129 | projected 114.9 (10.4 a week) | last 3 weeks 7.8 a week | lineup value 36
12534 | Kyle Monangai | RB | age 24 | CHI | market 3902 | projected 83.9 (7.6 a week) | last 3 weeks 3.6 a week | lineup value 19.4
8125 | Calvin Austin | WR | age 27 | NYG | market 0 | projected 73 (6.6 a week) | last 3 weeks 11.1 a week | lineup value 9.1
8146 | Garrett Wilson | WR | age 26 | NYJ | market 4224 | projected 66.5 (6 a week) | last 3 weeks 19.3 a week | lineup value 33.2
9494 | Marvin Mims | WR | age 24 | DEN | market 2740 | projected 61.3 (5.6 a week) | last 3 weeks 4.8 a week | lineup value 5.5
12521 | Elijah Arroyo | TE | age 23 | SEA | market 0 | projected 58.6 (5.3 a week) | last 3 weeks 3.4 a week | lineup value 0
8143 | Jerome Ford | RB | age 27 | ARI | market 0 | projected 58.1 (5.3 a week) | last 3 weeks 5.7 a week | lineup value 0.3
5995 | Justice Hill | RB | age 28 | BAL | market 2042 | projected 47.1 (4.3 a week) | last 3 weeks 4.5 a week | lineup value 2.8
7587 | Dyami Brown | WR | age 26 | WAS | market 0 | projected 46.2 (4.2 a week) | last 3 weeks 10.4 a week | lineup value 1.8
3271 | Tyler Higbee | TE | age 33 | LAR | market 0 | projected 42.8 (3.9 a week) | last 3 weeks 4.1 a week | lineup value 2.7
12535 | Isaac TeSlaa | WR | age 24 | DET | market 2769 | projected 40.1 (3.6 a week) | last 3 weeks 4.2 a week | lineup value 0
8119 | Jahan Dotson | WR | age 26 | ATL | market 0 | projected 37.1 (3.4 a week) | last 3 weeks 4.1 a week | lineup value 0

PARTNER (partnerId 4): record 2-1, rank 5, points for 555.2, contention window 0.69
3294 | Dak Prescott | QB | age 33 | DAL | market 5156 | projected 240.9 (21.9 a week) | last 3 weeks 17.1 a week | lineup value 240.9
9221 | Jahmyr Gibbs | RB | age 24 | DET | market 6440 | projected 231.7 (21.1 a week) | last 3 weeks 21.3 a week | lineup value 119.1
7564 | Ja'Marr Chase | WR | age 26 | CIN | market 5782 | projected 182.5 (16.6 a week) | last 3 weeks 17.6 a week | lineup value 82.4
12527 | Ashton Jeanty | RB | age 22 | LV | market 5469 | projected 179.7 (16.3 a week) | last 3 weeks 9.2 a week | lineup value 67.1
12512 | Quinshon Judkins | RB | age 22 | CLE | market 4545 | projected 164.8 (15 a week) | last 3 weeks 9.5 a week | lineup value 54.3
9997 | Zay Flowers | WR | age 26 | BAL | market 4218 | projected 164.1 (14.9 a week) | last 3 weeks 16.1 a week | lineup value 50.5
7569 | Nico Collins | WR | age 27 | HOU | market 4454 | projected 160.3 (14.6 a week) | last 3 weeks 14.3 a week | lineup value 55.7
5001 | Dalton Schultz | TE | age 30 | HOU | market 3138 | projected 138.7 (12.6 a week) | last 3 weeks 11 a week | lineup value 26.1
5872 | Deebo Samuel | WR | age 30 | SF | market 2700 | projected 135.4 (12.3 a week) | last 3 weeks 15.3 a week | lineup value 31
8148 | Jameson Williams | WR | age 25 | DET | market 4133 | projected 135 (12.3 a week) | last 3 weeks 11 a week | lineup value 22.5
5012 | Mark Andrews | TE | age 31 | BAL | market 3058 | projected 134.9 (12.3 a week) | last 3 weeks 12.9 a week | lineup value 22.8
11597 | Theo Johnson | TE | age 25 | NYG | market 3169 | projected 121.3 (11 a week) | last 3 weeks 5.9 a week | lineup value 20.3
8408 | Jordan Mason | RB | age 27 | MIN | market 3175 | projected 115.3 (10.5 a week) | last 3 weeks 13.5 a week | lineup value 22.4
11603 | AJ Barner | TE | age 24 | SEA | market 3460 | projected 107.7 (9.8 a week) | last 3 weeks 6.8 a week | lineup value 7.9
8132 | Tyler Allgeier | RB | age 26 | ARI | market 3261 | projected 81.4 (7.4 a week) | last 3 weeks 6.8 a week | lineup value 1.6
6130 | Devin Singletary | RB | age 29 | NYG | market 0 | projected 63.3 (5.8 a week) | last 3 weeks 1 a week | lineup value 0
11600 | Ja'Tavion Sanders | TE | age 23 | CAR | market 0 | projected 62.7 (5.7 a week) | last 3 weeks 10.8 a week | lineup value 1.4
6039 | Ty Johnson | RB | age 29 | BUF | market 0 | projected 58.9 (5.4 a week) | last 3 weeks 2.3 a week | lineup value 0
10444 | Cedric Tillman | WR | age 26 | NO | market 0 | projected 51.9 (4.7 a week) | last 3 weeks 11.1 a week | lineup value 0
6853 | Van Jefferson | WR | age 30 | WAS | market 0 | projected 49.2 (4.5 a week) | last 3 weeks 1.8 a week | lineup value 0
11625 | Adonai Mitchell | WR | age 24 | NYJ | market 3011 | projected 46.1 (4.2 a week) | last 3 weeks 2.8 a week | lineup value 0
8147 | John Metchie | WR | age 26 | CAR | market 0 | projected 44.3 (4 a week) | last 3 weeks 1 a week | lineup value 0

PARTNER (partnerId 9): record 0-3, rank 11, points for 459.9, contention window 0
7523 | Trevor Lawrence | QB | age 27 | JAX | market 5680 | projected 198.6 (18.1 a week) | last 3 weeks 16.8 a week | lineup value 102.3
9228 | Bryce Young | QB | age 25 | CAR | market 4449 | projected 170 (15.5 a week) | last 3 weeks 17.6 a week | lineup value 81.8
8144 | Chris Olave | WR | age 26 | NO | market 4434 | projected 165.6 (15.1 a week) | last 3 weeks 14 a week | lineup value 82.7
6786 | CeeDee Lamb | WR | age 27 | DAL | market 4952 | projected 150 (13.6 a week) | last 3 weeks 13.6 a week | lineup value 89.5
7049 | Jauan Jennings | WR | age 29 | MIN | market 2839 | projected 114.1 (10.4 a week) | last 3 weeks 8.1 a week | lineup value 36.4
6783 | Jerry Jeudy | WR | age 27 | CLE | market 2734 | projected 109.5 (10 a week) | last 3 weeks 8.4 a week | lineup value 28.7
7090 | Darnell Mooney | WR | age 28 | NYG | market 2397 | projected 99.2 (9 a week) | last 3 weeks 4.5 a week | lineup value 20.6
10232 | Michael Wilson | WR | age 26 | ARI | market 3644 | projected 95.5 (8.7 a week) | last 3 weeks 3.9 a week | lineup value 16.4
7600 | Pat Freiermuth | TE | age 27 | PIT | market 2313 | projected 91.4 (8.3 a week) | last 3 weeks 7.1 a week | lineup value 10
8131 | Isaiah Likely | TE | age 26 | NYG | market 3435 | projected 87.8 (8 a week) | last 3 weeks 0 a week | lineup value 12.4
9484 | Tucker Kraft | TE | age 25 | GB | market 4141 | projected 86.8 (7.9 a week) | last 3 weeks 17.5 a week | lineup value 48.5
4988 | Nick Chubb | RB | age 30 | FA | market 1870 | projected 85.5 (7.8 a week) | last 3 weeks 10 a week | lineup value 28.4
9487 | Parker Washington | WR | age 24 | JAX | market 4000 | projected 78.9 (7.2 a week) | last 3 weeks 7.1 a week | lineup value 6.3
4219 | Jeremy McNichols | RB | age 30 | WAS | market 0 | projected 70.9 (6.4 a week) | last 3 weeks 5.8 a week | lineup value 10.2
10219 | Chris Rodriguez | RB | age 27 | JAX | market 2800 | projected 70.3 (6.4 a week) | last 3 weeks 1.4 a week | lineup value 10.1
10226 | Andrei Iosivas | WR | age 27 | CIN | market 0 | projected 68 (6.2 a week) | last 3 weeks 0.8 a week | lineup value 0.2
6271 | Olamide Zaccheaus | WR | age 29 | ATL | market 0 | projected 64.9 (5.9 a week) | last 3 weeks 6.7 a week | lineup value 0.4
7496 | Nick Westbrook-Ikhine | WR | age 29 | IND | market 0 | projected 56.6 (5.1 a week) | last 3 weeks 2.1 a week | lineup value 0.3
12507 | Omarion Hampton | RB | age 23 | LAC | market 5284 | projected 51.9 (4.7 a week) | last 3 weeks 13.2 a week | lineup value 29.5
11199 | Emari Demercado | RB | age 27 | DAL | market 0 | projected 50.6 (4.6 a week) | last 3 weeks 0 a week | lineup value 10.9
12524 | Shedeur Sanders | QB | age 24 | CLE | market 3417 | projected 48.7 (4.4 a week) | last 3 weeks 0 a week | lineup value 10.7
12492 | Pat Bryant | WR | age 23 | DEN | market 3001 | projected 44.9 (4.1 a week) | last 3 weeks 1.4 a week | lineup value 0.6

PARTNER (partnerId 2): record 2-1, rank 3, points for 595.7, contention window 0.95
7547 | Amon-Ra St. Brown | WR | age 26 | DET | market 5272 | projected 212.1 (19.3 a week) | last 3 weeks 23.9 a week | lineup value 136.1
5870 | Daniel Jones | QB | age 29 | IND | market 3971 | projected 211.5 (19.2 a week) | last 3 weeks 25.1 a week | lineup value 151.3
8138 | James Cook | RB | age 27 | BUF | market 5025 | projected 204 (18.5 a week) | last 3 weeks 23.8 a week | lineup value 147.3
5022 | Dallas Goedert | TE | age 31 | PHI | market 3094 | projected 154 (14 a week) | last 3 weeks 10.1 a week | lineup value 91.6
5859 | A.J. Brown | WR | age 29 | NE | market 4331 | projected 145.8 (13.3 a week) | last 3 weeks 11.1 a week | lineup value 76.4
8136 | Rachaad White | RB | age 27 | WAS | market 2783 | projected 145.1 (13.2 a week) | last 3 weeks 6.9 a week | lineup value 87.3
1479 | Keenan Allen | WR | age 34 | IND | market 2129 | projected 138.7 (12.6 a week) | last 3 weeks 19.6 a week | lineup value 64.5
11620 | Rome Odunze | WR | age 24 | CHI | market 4071 | projected 130.9 (11.9 a week) | last 3 weeks 21.6 a week | lineup value 62.2
8112 | Drake London | WR | age 25 | ATL | market 4895 | projected 104.5 (9.5 a week) | last 3 weeks 10.5 a week | lineup value 58.3
12481 | Cam Skattebo | RB | age 24 | NYG | market 4259 | projected 83.5 (7.6 a week) | last 3 weeks 14.4 a week | lineup value 52.6
11637 | Keon Coleman | WR | age 23 | BUF | market 2745 | projected 79.5 (7.2 a week) | last 3 weeks 12.6 a week | lineup value 21.8
5906 | Dawson Knox | TE | age 29 | BUF | market 0 | projected 75.6 (6.9 a week) | last 3 weeks 4.2 a week | lineup value 11.8
1166 | Kirk Cousins | QB | age 38 | LV | market 2309 | projected 71.1 (6.5 a week) | last 3 weeks 0.4 a week | lineup value 10.9
11626 | Xavier Legette | WR | age 25 | CAR | market 0 | projected 68.8 (6.3 a week) | last 3 weeks 1.6 a week | lineup value 3.9
9479 | Darnell Washington | TE | age 25 | PIT | market 0 | projected 68.4 (6.2 a week) | last 3 weeks 0.7 a week | lineup value 8.9
4950 | Christian Kirk | WR | age 29 | SF | market 2214 | projected 64.4 (5.9 a week) | last 3 weeks 2 a week | lineup value 8.2
12641 | Jaylin Lane | WR | age 24 | WAS | market 0 | projected 54.1 (4.9 a week) | last 3 weeks 3.5 a week | lineup value 3.5
9486 | Dontayvion Wicks | WR | age 25 | PHI | market 2550 | projected 52.7 (4.8 a week) | last 3 weeks 6.4 a week | lineup value 0
5970 | Greg Dortch | WR | age 28 | BUF | market 0 | projected 51.8 (4.7 a week) | last 3 weeks 1.9 a week | lineup value 3.4
8917 | KaVontae Turpin | WR | age 30 | DAL | market 1171 | projected 47.9 (4.4 a week) | last 3 weeks 10.2 a week | lineup value 0
2197 | Brandin Cooks | WR | age 33 | SF | market 0 | projected 46 (4.2 a week) | last 3 weeks 5.6 a week | lineup value 0
6770 | Joe Burrow | QB | age 29 | CIN | market 6519 | projected 43.1 (3.9 a week) | last 3 weeks 6.6 a week | lineup value 7.3

PARTNER (partnerId 10): record 3-0, rank 1, points for 644.3, contention window 1
6904 | Jalen Hurts | QB | age 28 | PHI | market 6176 | projected 250.9 (22.8 a week) | last 3 weeks 24.7 a week | lineup value 71
1373 | Geno Smith | QB | age 36 | NYJ | market 2665 | projected 194.8 (17.7 a week) | last 3 weeks 20 a week | lineup value 22.8
7002 | Juwan Johnson | TE | age 30 | NO | market 3089 | projected 152.3 (13.8 a week) | last 3 weeks 21.3 a week | lineup value 64.3
7543 | Travis Etienne | RB | age 27 | NO | market 3965 | projected 147.4 (13.4 a week) | last 3 weeks 16.4 a week | lineup value 67.9
5045 | Courtland Sutton | WR | age 31 | DEN | market 3186 | projected 145.7 (13.2 a week) | last 3 weeks 15.1 a week | lineup value 59.6
6819 | Michael Pittman | WR | age 29 | PIT | market 2990 | projected 144 (13.1 a week) | last 3 weeks 16.5 a week | lineup value 54.7
8228 | Jaylen Warren | RB | age 27 | PIT | market 3652 | projected 140.8 (12.8 a week) | last 3 weeks 16.1 a week | lineup value 71.9
8134 | Khalil Shakir | WR | age 26 | BUF | market 3134 | projected 132.6 (12.1 a week) | last 3 weeks 10.1 a week | lineup value 49.2
12533 | Jacory Croskey-Merritt | RB | age 25 | WAS | market 3355 | projected 115.4 (10.5 a week) | last 3 weeks 9.1 a week | lineup value 41.6
7527 | Mac Jones | QB | age 28 | SF | market 1897 | projected 104.1 (9.5 a week) | last 3 weeks 14.8 a week | lineup value 6.3
12486 | Dillon Gabriel | QB | age 25 | CLE | market 0 | projected 101.1 (9.2 a week) | last 3 weeks 2.3 a week | lineup value 0.4
4039 | Cooper Kupp | WR | age 33 | SEA | market 2096 | projected 96.5 (8.8 a week) | last 3 weeks 8.7 a week | lineup value 20.2
8183 | Brock Purdy | QB | age 26 | SF | market 5643 | projected 91.2 (8.3 a week) | last 3 weeks 7.6 a week | lineup value 11.3
11562 | Spencer Rattler | QB | age 26 | NO | market 0 | projected 89.7 (8.2 a week) | last 3 weeks 18.3 a week | lineup value 0.5
10236 | Dalton Kincaid | TE | age 26 | BUF | market 3744 | projected 88.4 (8 a week) | last 3 weeks 18.2 a week | lineup value 35.7
5857 | Noah Fant | TE | age 28 | NO | market 0 | projected 83.6 (7.6 a week) | last 3 weeks 12.3 a week | lineup value 15.7
12540 | Chimere Dike | WR | age 24 | TEN | market 2848 | projected 71.8 (6.5 a week) | last 3 weeks 2.4 a week | lineup value 7.8
6826 | Cole Kmet | TE | age 27 | CHI | market 0 | projected 60.9 (5.5 a week) | last 3 weeks 7.3 a week | lineup value 0.1
12501 | Matthew Golden | WR | age 23 | GB | market 3547 | projected 58.1 (5.3 a week) | last 3 weeks 5.2 a week | lineup value 1.6
11584 | Bucky Irving | RB | age 24 | TB | market 4426 | projected 55.5 (5 a week) | last 3 weeks 16.2 a week | lineup value 27.6
11834 | Devaughn Vele | WR | age 28 | NO | market 2259 | projected 49.3 (4.5 a week) | last 3 weeks 3.3 a week | lineup value 1.6
12483 | Jack Bech | WR | age 23 | LV | market 2710 | projected 48.1 (4.4 a week) | last 3 weeks 1.9 a week | lineup value 0

CANDIDATE DEALS (from a rules-based finder; points are the finder projections for the rest of the season):
c1 | partnerId 11 | I give Evan Engram (4066) | I get Calvin Austin + Dyami Brown (8125,7587) | my points 23.5 | their points 28.4 | likelihood 0.78
c2 | partnerId 11 | I give Jonnu Smith (4144) | I get Calvin Austin (8125) | my points 18.8 | their points 26.1 | likelihood 0.78
c3 | partnerId 4 | I give Carson Wentz + Jameis Winston (3161,2306) | I get Cedric Tillman (10444) | my points 11.7 | their points 34.9 | likelihood 0.77
c4 | partnerId 9 | I give Jordan James + Jimmy Garoppolo (12467,1837) | I get Jerry Jeudy + Darnell Mooney (6783,7090) | my points 70.8 | their points -53.1 | likelihood 0.88
c5 | partnerId 2 | I give Travis Kelce + Evan Engram (1466,4066) | I get Keenan Allen + Keon Coleman (1479,11637) | my points 35.3 | their points 42.4 | likelihood 0.85
c6 | partnerId 10 | I give Travis Kelce + T.J. Hockenson (1466,5844) | I get Michael Pittman + Chimere Dike (6819,12540) | my points 23.7 | their points 46.1 | likelihood 0.77
c7 | partnerId 11 | I give Evan Engram + Travis Kelce (4066,1466) | I get Stefon Diggs + Calvin Austin (2449,8125) | my points 39.7 | their points 30.1 | likelihood 0.82
c8 | partnerId 10 | I give Mason Taylor + Travis Kelce (12498,1466) | I get Courtland Sutton + Matthew Golden (5045,12501) | my points 29.9 | their points 43.6 | likelihood 0.83
c9 | partnerId 2 | I give Saquon Barkley + Evan Engram (4866,4066) | I get Rome Odunze + Keenan Allen (11620,1479) | my points 53.9 | their points 32.9 | likelihood 0.89
c10 | partnerId 9 | I give Jordan James (12467) | I get Darnell Mooney (7090) | my points 44 | their points -20.6 | likelihood 0.77
c11 | partnerId 10 | I give Mason Taylor + T.J. Hockenson (12498,5844) | I get Courtland Sutton + Chimere Dike (5045,12540) | my points 68.5 | their points 8.9 | likelihood 0.95
c12 | partnerId 2 | I give Saquon Barkley + Travis Kelce (4866,1466) | I get Rome Odunze + A.J. Brown (11620,5859) | my points 22.8 | their points 64.1 | likelihood 0.78

Pick the best trades for my team.

=========== CASE 1180209456973922304-w7-r8 ===========
REPLY FILE: /Users/anik/workspace/chrome/sleeper/.eval-market/replies/suggest-v2/heldout1/1180209456973922304-w7-r8.json
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
Lineup slots: QB, RB, RB, WR, WR, WR, TE, FLEX, FLEX, FLEX, SUPER_FLEX, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN. Superflex: yes. Tight end premium: yes. Points per reception: 1.
Columns: id | name | position | age | team | market value | projected points for the rest of the regular season (and per week) | points per week over the last three weeks played | lineup value (points my lineup loses if this player is removed).

MY TEAM (partnerId me): record 5-1, rank 2, points for 1149.2, contention window 1
9488 | Jaxon Smith-Njigba | WR | age 24 | SEA | market 5849 | projected 166.7 (20.8 a week) | last 3 weeks 24.6 a week | lineup value 102.6
6804 | Jordan Love | QB | age 27 | GB | market 5307 | projected 166.1 (20.8 a week) | last 3 weeks 17.1 a week | lineup value 65.6
4943 | Sam Darnold | QB | age 29 | SEA | market 4513 | projected 143.2 (17.9 a week) | last 3 weeks 26.4 a week | lineup value 42.6
4217 | George Kittle | TE | age 33 | SF | market 3139 | projected 139.7 (17.5 a week) | last 3 weeks 0 a week | lineup value 63.2
9493 | Puka Nacua | WR | age 25 | LAR | market 5728 | projected 139.6 (17.4 a week) | last 3 weeks 22.8 a week | lineup value 78
7553 | Kyle Pitts | TE | age 26 | ATL | market 3943 | projected 121.1 (15.1 a week) | last 3 weeks 10.6 a week | lineup value 35
9224 | Chase Brown | RB | age 26 | CIN | market 4609 | projected 115.7 (14.5 a week) | last 3 weeks 10.6 a week | lineup value 40.9
11647 | Kimani Vidal | RB | age 25 | LAC | market 2891 | projected 106.8 (13.4 a week) | last 3 weeks 9 a week | lineup value 34.8
12506 | Harold Fannin | TE | age 22 | CLE | market 4656 | projected 103.8 (13 a week) | last 3 weeks 15.1 a week | lineup value 27.8
6790 | D'Andre Swift | RB | age 27 | CHI | market 3739 | projected 96.3 (12 a week) | last 3 weeks 14.8 a week | lineup value 24.8
8676 | Rashid Shaheed | WR | age 28 | SEA | market 2718 | projected 88 (11 a week) | last 3 weeks 12.9 a week | lineup value 25.4
5967 | Tony Pollard | RB | age 29 | TEN | market 3313 | projected 71.9 (9 a week) | last 3 weeks 11.3 a week | lineup value 0
8167 | Christian Watson | WR | age 27 | GB | market 3715 | projected 68.6 (8.6 a week) | last 3 weeks 0 a week | lineup value 8.3
827 | Tyrod Taylor | QB | age 37 | GB | market 0 | projected 57.7 (7.2 a week) | last 3 weeks 0 a week | lineup value 0.4
11628 | Marvin Harrison | WR | age 24 | HOU | market 3948 | projected 56.7 (7.1 a week) | last 3 weeks 13.1 a week | lineup value 20.8
12476 | Devin Neal | RB | age 23 | WAS | market 2861 | projected 53 (6.6 a week) | last 3 weeks 0 a week | lineup value 6.2
6149 | Darius Slayton | WR | age 29 | IND | market 0 | projected 52.4 (6.5 a week) | last 3 weeks 4.1 a week | lineup value 10.5
4381 | Taysom Hill | TE | age 35 | FA | market 1555 | projected 47.5 (5.9 a week) | last 3 weeks 2.3 a week | lineup value 0
8205 | Isiah Pacheco | RB | age 27 | DET | market 2633 | projected 35.5 (4.4 a week) | last 3 weeks 10.1 a week | lineup value 0.2
12495 | Ollie Gordon | RB | age 22 | MIA | market 0 | projected 34.6 (4.3 a week) | last 3 weeks 0.8 a week | lineup value 0
2749 | Raheem Mostert | RB | age 33 | FA | market 1189 | projected 30.4 (3.8 a week) | last 3 weeks 0.7 a week | lineup value 0
6869 | Adam Trautman | TE | age 29 | DEN | market 0 | projected 24.5 (3.1 a week) | last 3 weeks 3.6 a week | lineup value 0
5096 | Ray-Ray McCloud | WR | age 29 | FA | market 0 | projected 15.1 (1.9 a week) | last 3 weeks 0.1 a week | lineup value 0
8698 | Jake Tonges | TE | age 27 | SF | market 2687 | projected 14.7 (1.8 a week) | last 3 weeks 20.3 a week | lineup value 0
1689 | Adam Thielen | WR | age 35 | FA | market 2182 | projected 13.6 (1.7 a week) | last 3 weeks 1.2 a week | lineup value 0
12482 | Savion Williams | WR | age 24 | GB | market 0 | projected 11.9 (1.5 a week) | last 3 weeks 1.9 a week | lineup value 0
11599 | Cade Stover | TE | age 26 | HOU | market 0 | projected 7.9 (1 a week) | last 3 weeks 0 a week | lineup value 0
7608 | Khalil Herbert | RB | age 28 | ATL | market 0 | projected 0.9 (0.1 a week) | last 3 weeks 0 a week | lineup value 0
1352 | Robert Woods | WR | age 33 | FA | market 0 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0
4029 | Dalvin Cook | RB | age 29 | FA | market 0 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0

PARTNER (partnerId 4): record 5-1, rank 1, points for 1188.8, contention window 1
3294 | Dak Prescott | QB | age 33 | DAL | market 5194 | projected 172.6 (21.6 a week) | last 3 weeks 34 a week | lineup value 172.6
9221 | Jahmyr Gibbs | RB | age 24 | DET | market 6446 | projected 166.2 (20.8 a week) | last 3 weeks 14.9 a week | lineup value 87.5
7564 | Ja'Marr Chase | WR | age 26 | CIN | market 5782 | projected 130 (16.2 a week) | last 3 weeks 21 a week | lineup value 63.7
12527 | Ashton Jeanty | RB | age 22 | LV | market 5451 | projected 126.1 (15.8 a week) | last 3 weeks 23 a week | lineup value 47.4
7569 | Nico Collins | WR | age 27 | HOU | market 4451 | projected 125.3 (15.7 a week) | last 3 weeks 9.6 a week | lineup value 46.6
9997 | Zay Flowers | WR | age 26 | BAL | market 4222 | projected 116.5 (14.6 a week) | last 3 weeks 12.3 a week | lineup value 36.6
5001 | Dalton Schultz | TE | age 30 | HOU | market 3140 | projected 114.8 (14.4 a week) | last 3 weeks 10.1 a week | lineup value 26.1
12512 | Quinshon Judkins | RB | age 22 | CLE | market 4554 | projected 114.4 (14.3 a week) | last 3 weeks 14.5 a week | lineup value 37.8
5012 | Mark Andrews | TE | age 31 | BAL | market 3056 | projected 96.9 (12.1 a week) | last 3 weeks 11.9 a week | lineup value 16.6
8148 | Jameson Williams | WR | age 25 | DET | market 4129 | projected 95.4 (11.9 a week) | last 3 weeks 9.4 a week | lineup value 16.7
11597 | Theo Johnson | TE | age 25 | NYG | market 3168 | projected 91 (11.4 a week) | last 3 weeks 16.2 a week | lineup value 16.5
5872 | Deebo Samuel | WR | age 30 | SF | market 2694 | projected 88.6 (11.1 a week) | last 3 weeks 17 a week | lineup value 18
11603 | AJ Barner | TE | age 24 | SEA | market 3462 | projected 81.1 (10.1 a week) | last 3 weeks 20.2 a week | lineup value 4.4
8408 | Jordan Mason | RB | age 27 | MIN | market 3178 | projected 79.1 (9.9 a week) | last 3 weeks 8.3 a week | lineup value 12.1
8132 | Tyler Allgeier | RB | age 26 | ARI | market 3246 | projected 65.6 (8.2 a week) | last 3 weeks 7.6 a week | lineup value 1.6
11600 | Ja'Tavion Sanders | TE | age 23 | CAR | market 0 | projected 62.7 (7.8 a week) | last 3 weeks 0 a week | lineup value 1.4
6130 | Devin Singletary | RB | age 29 | NYG | market 0 | projected 47.7 (6 a week) | last 3 weeks 2.7 a week | lineup value 0
6853 | Van Jefferson | WR | age 30 | WAS | market 0 | projected 44.7 (5.6 a week) | last 3 weeks 4.8 a week | lineup value 0
6039 | Ty Johnson | RB | age 29 | BUF | market 0 | projected 44.2 (5.5 a week) | last 3 weeks 1.2 a week | lineup value 0
10444 | Cedric Tillman | WR | age 26 | NO | market 0 | projected 41.6 (5.2 a week) | last 3 weeks 0.6 a week | lineup value 0
8147 | John Metchie | WR | age 26 | CAR | market 0 | projected 41.4 (5.2 a week) | last 3 weeks 1.1 a week | lineup value 0
11625 | Adonai Mitchell | WR | age 24 | NYJ | market 3010 | projected 36.1 (4.5 a week) | last 3 weeks 3.6 a week | lineup value 0

PARTNER (partnerId 2): record 2-4, rank 8, points for 1158.8, contention window 0.31
7547 | Amon-Ra St. Brown | WR | age 26 | DET | market 5272 | projected 152 (19 a week) | last 3 weeks 20.1 a week | lineup value 94.1
5870 | Daniel Jones | QB | age 29 | IND | market 3976 | projected 147.8 (18.5 a week) | last 3 weeks 21.1 a week | lineup value 87.6
8138 | James Cook | RB | age 27 | BUF | market 5044 | projected 143.6 (18 a week) | last 3 weeks 13.1 a week | lineup value 91.4
5022 | Dallas Goedert | TE | age 31 | PHI | market 3089 | projected 112.2 (14 a week) | last 3 weeks 24.8 a week | lineup value 56.7
11620 | Rome Odunze | WR | age 24 | CHI | market 4072 | projected 99.7 (12.5 a week) | last 3 weeks 7.8 a week | lineup value 42.5
8136 | Rachaad White | RB | age 27 | WAS | market 2781 | projected 99.7 (12.5 a week) | last 3 weeks 17.6 a week | lineup value 44.2
5859 | A.J. Brown | WR | age 29 | NE | market 4325 | projected 98.7 (12.3 a week) | last 3 weeks 9.3 a week | lineup value 47.5
1479 | Keenan Allen | WR | age 34 | IND | market 2126 | projected 94.3 (11.8 a week) | last 3 weeks 9.3 a week | lineup value 39.5
8122 | Zonovan Knight | RB | age 25 | ARI | market 0 | projected 81.9 (10.2 a week) | last 3 weeks 0 a week | lineup value 27.7
8112 | Drake London | WR | age 25 | ATL | market 4891 | projected 72.9 (9.1 a week) | last 3 weeks 19.7 a week | lineup value 39.6
1166 | Kirk Cousins | QB | age 38 | LV | market 2310 | projected 71.1 (8.9 a week) | last 3 weeks 0 a week | lineup value 10.9
9479 | Darnell Washington | TE | age 25 | PIT | market 0 | projected 62.5 (7.8 a week) | last 3 weeks 7 a week | lineup value 4.1
5906 | Dawson Knox | TE | age 29 | BUF | market 0 | projected 62.1 (7.8 a week) | last 3 weeks 5.2 a week | lineup value 8.3
11626 | Xavier Legette | WR | age 25 | CAR | market 0 | projected 53.6 (6.7 a week) | last 3 weeks 4.9 a week | lineup value 3.9
11637 | Keon Coleman | WR | age 23 | BUF | market 2740 | projected 43.7 (5.5 a week) | last 3 weeks 7.8 a week | lineup value 10.4
6770 | Joe Burrow | QB | age 29 | CIN | market 6523 | projected 43.1 (5.4 a week) | last 3 weeks 0 a week | lineup value 7.3
4950 | Christian Kirk | WR | age 29 | SF | market 2211 | projected 42.9 (5.4 a week) | last 3 weeks 5.4 a week | lineup value 3.4
5970 | Greg Dortch | WR | age 28 | BUF | market 0 | projected 38 (4.8 a week) | last 3 weeks 7.2 a week | lineup value 0.4
8917 | KaVontae Turpin | WR | age 30 | DAL | market 1172 | projected 37.5 (4.7 a week) | last 3 weeks 2.4 a week | lineup value 0
12641 | Jaylin Lane | WR | age 24 | WAS | market 0 | projected 36 (4.5 a week) | last 3 weeks 4.2 a week | lineup value 0.4
9486 | Dontayvion Wicks | WR | age 25 | PHI | market 2548 | projected 35.8 (4.5 a week) | last 3 weeks 2.6 a week | lineup value 0
9511 | Keaton Mitchell | RB | age 24 | LAC | market 2930 | projected 33.6 (4.2 a week) | last 3 weeks 0.9 a week | lineup value 0

CANDIDATE DEALS (from a rules-based finder; points are the finder projections for the rest of the season):
c1 | partnerId 4 | I give Tyrod Taylor (827) | I get Van Jefferson + John Metchie (6853,8147) | my points 5.1 | their points 18.8 | likelihood 0.8
c2 | partnerId 4 | I give Tyrod Taylor + Taysom Hill (827,4381) | I get Allen Lazard + John Metchie (5185,8147) | my points 5.6 | their points 18.8 | likelihood 0.77
c3 | partnerId 2 | I give Tony Pollard + Isiah Pacheco (5967,8205) | I get Dallas Goedert + Rachaad White (5022,8136) | my points 45.3 | their points -79.7 | likelihood 0.61
c4 | partnerId 4 | I give Tyrod Taylor + Tony Pollard (827,5967) | I get Allen Lazard + AJ Barner (5185,11603) | my points 9.6 | their points 22.1 | likelihood 0.6
c5 | partnerId 4 | I give Sam Darnold (4943) | I get Deebo Samuel + Zay Flowers (5872,9997) | my points 23.4 | their points 11.2 | likelihood 0.87
c6 | partnerId 2 | I give Tony Pollard + Taysom Hill (5967,4381) | I get Dallas Goedert (5022) | my points 26.5 | their points -39.9 | likelihood 0.67

Pick the best trades for my team.

=========== CASE 1180213817211871232-w10-r1 ===========
REPLY FILE: /Users/anik/workspace/chrome/sleeper/.eval-market/replies/suggest-v2/heldout1/1180213817211871232-w10-r1.json
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
Lineup slots: QB, RB, RB, WR, WR, WR, TE, TE, FLEX, FLEX, SUPER_FLEX, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN. Superflex: yes. Tight end premium: yes. Points per reception: 1.
Columns: id | name | position | age | team | market value | projected points for the rest of the regular season (and per week) | points per week over the last three weeks played | lineup value (points my lineup loses if this player is removed).

MY TEAM (partnerId me): record 5-4, rank 5, points for 1401.5, contention window 0.58
11560 | Caleb Williams | QB | age 24 | CHI | market 7867 | projected 95.7 (19.1 a week) | last 3 weeks 21.1 a week | lineup value 34.8
11604 | Brock Bowers | TE | age 23 | LV | market 5520 | projected 90 (18 a week) | last 3 weeks 15.4 a week | lineup value 43.7
11565 | J.J. McCarthy | QB | age 23 | NYG | market 3922 | projected 77.9 (15.6 a week) | last 3 weeks 8 a week | lineup value 25.8
12527 | Ashton Jeanty | RB | age 22 | LV | market 5362 | projected 77.7 (15.5 a week) | last 3 weeks 8.1 a week | lineup value 32.9
6794 | Justin Jefferson | WR | age 27 | MIN | market 4810 | projected 75.8 (15.2 a week) | last 3 weeks 14.7 a week | lineup value 29.1
10229 | Rashee Rice | WR | age 26 | KC | market 4412 | projected 70.4 (14.1 a week) | last 3 weeks 22.4 a week | lineup value 33.7
7588 | Javonte Williams | RB | age 26 | DAL | market 4046 | projected 67.7 (13.5 a week) | last 3 weeks 15 a week | lineup value 33
5947 | Jakobi Meyers | WR | age 29 | JAX | market 3294 | projected 54.8 (11 a week) | last 3 weeks 2.1 a week | lineup value 8.9
11647 | Kimani Vidal | RB | age 25 | LAC | market 2823 | projected 52.4 (10.5 a week) | last 3 weeks 10.1 a week | lineup value 14.4
9756 | Jordan Addison | WR | age 24 | MIN | market 3609 | projected 52.2 (10.4 a week) | last 3 weeks 13.9 a week | lineup value 6.5
12493 | Oronde Gadsden | TE | age 23 | LAC | market 4188 | projected 50 (10 a week) | last 3 weeks 21.4 a week | lineup value 11.9
12524 | Shedeur Sanders | QB | age 24 | CLE | market 3795 | projected 48.7 (9.7 a week) | last 3 weeks 0 a week | lineup value 6.9
12517 | Colston Loveland | TE | age 22 | CHI | market 5259 | projected 47.4 (9.5 a week) | last 3 weeks 15 a week | lineup value 1.1
11603 | AJ Barner | TE | age 24 | SEA | market 3505 | projected 43.3 (8.7 a week) | last 3 weeks 4.8 a week | lineup value 1.6
12485 | Tez Johnson | WR | age 24 | TB | market 0 | projected 41.3 (8.3 a week) | last 3 weeks 8.4 a week | lineup value 0.1
8125 | Calvin Austin | WR | age 27 | NYG | market 0 | projected 38.1 (7.6 a week) | last 3 weeks 5.8 a week | lineup value 0
9500 | Josh Downs | WR | age 25 | IND | market 3341 | projected 37.5 (7.5 a week) | last 3 weeks 9.9 a week | lineup value 1
11610 | Malik Washington | WR | age 25 | MIA | market 2748 | projected 35.3 (7.1 a week) | last 3 weeks 9.9 a week | lineup value 0
11586 | Blake Corum | RB | age 25 | LAR | market 3587 | projected 33.9 (6.8 a week) | last 3 weeks 3.7 a week | lineup value 0
11646 | Jalen Coker | WR | age 24 | CAR | market 3260 | projected 30.3 (6.1 a week) | last 3 weeks 2.8 a week | lineup value 0
9486 | Dontayvion Wicks | WR | age 25 | PHI | market 2545 | projected 29.1 (5.8 a week) | last 3 weeks 0.5 a week | lineup value 0
4037 | Chris Godwin | WR | age 30 | TB | market 3089 | projected 27.1 (5.4 a week) | last 3 weeks 0 a week | lineup value 1.8
12521 | Elijah Arroyo | TE | age 23 | SEA | market 0 | projected 22.8 (4.6 a week) | last 3 weeks 6.5 a week | lineup value 0
12469 | Dylan Sampson | RB | age 22 | CLE | market 3284 | projected 21.1 (4.2 a week) | last 3 weeks 3.5 a week | lineup value 0
11566 | Jayden Daniels | QB | age 25 | WAS | market 7510 | projected 20.6 (4.1 a week) | last 3 weeks 12.3 a week | lineup value 1.6
11637 | Keon Coleman | WR | age 23 | BUF | market 2736 | projected 20.1 (4 a week) | last 3 weeks 3.2 a week | lineup value 0
2505 | Darren Waller | TE | age 34 | CAR | market 1413 | projected 17.8 (3.6 a week) | last 3 weeks 0 a week | lineup value 0
9482 | Michael Mayer | TE | age 25 | LV | market 0 | projected 17.5 (3.5 a week) | last 3 weeks 2.9 a week | lineup value 0
7594 | Chuba Hubbard | RB | age 27 | CAR | market 3372 | projected 16.2 (3.2 a week) | last 3 weeks 6.2 a week | lineup value 0
6806 | J.K. Dobbins | RB | age 27 | DEN | market 3352 | projected 11.5 (2.3 a week) | last 3 weeks 10 a week | lineup value 1.4

PARTNER (partnerId 8): record 8-1, rank 1, points for 1719.9, contention window 1
4881 | Lamar Jackson | QB | age 29 | BAL | market 8005 | projected 134.8 (27 a week) | last 3 weeks 11.2 a week | lineup value 24.4
4892 | Baker Mayfield | QB | age 31 | TB | market 5123 | projected 114.5 (22.9 a week) | last 3 weeks 6.4 a week | lineup value 4.1
9509 | Bijan Robinson | RB | age 24 | ATL | market 6371 | projected 102.4 (20.5 a week) | last 3 weeks 15.2 a week | lineup value 55.9
4943 | Sam Darnold | QB | age 29 | SEA | market 4996 | projected 101.4 (20.3 a week) | last 3 weeks 16.3 a week | lineup value 0
8130 | Trey McBride | TE | age 26 | ARI | market 4873 | projected 95.8 (19.2 a week) | last 3 weeks 16.6 a week | lineup value 73.2
11563 | Bo Nix | QB | age 26 | DEN | market 6623 | projected 91.5 (18.3 a week) | last 3 weeks 33.4 a week | lineup value 1.3
2133 | Davante Adams | WR | age 33 | LAR | market 3369 | projected 77.7 (15.5 a week) | last 3 weeks 16.5 a week | lineup value 31.9
5859 | A.J. Brown | WR | age 29 | NE | market 4304 | projected 75.7 (15.1 a week) | last 3 weeks 9.4 a week | lineup value 29.9
8150 | Kyren Williams | RB | age 26 | LAR | market 4560 | projected 72.4 (14.5 a week) | last 3 weeks 8.6 a week | lineup value 25.9
8137 | George Pickens | WR | age 25 | DAL | market 4756 | projected 64.1 (12.8 a week) | last 3 weeks 13.6 a week | lineup value 26.4
5892 | David Montgomery | RB | age 29 | HOU | market 3469 | projected 55.6 (11.1 a week) | last 3 weeks 6 a week | lineup value 9
7567 | Kenny Gainwell | RB | age 27 | TB | market 3137 | projected 53.3 (10.7 a week) | last 3 weeks 5.1 a week | lineup value 6.7
8121 | Romeo Doubs | WR | age 26 | NE | market 3164 | projected 52.6 (10.5 a week) | last 3 weeks 12.9 a week | lineup value 7.1
8110 | Jake Ferguson | TE | age 27 | DAL | market 3458 | projected 49 (9.8 a week) | last 3 weeks 11.3 a week | lineup value 26.4
10444 | Cedric Tillman | WR | age 26 | NO | market 0 | projected 37.7 (7.5 a week) | last 3 weeks 0 a week | lineup value 0
9506 | Sean Tucker | RB | age 24 | TB | market 2839 | projected 36.3 (7.3 a week) | last 3 weeks 3.9 a week | lineup value 0
2374 | Tyler Lockett | WR | age 33 | FA | market 2515 | projected 34.5 (6.9 a week) | last 3 weeks 1.3 a week | lineup value 0
6039 | Ty Johnson | RB | age 29 | BUF | market 0 | projected 28.5 (5.7 a week) | last 3 weeks 3.5 a week | lineup value 0
5970 | Greg Dortch | WR | age 28 | BUF | market 0 | projected 28.2 (5.6 a week) | last 3 weeks 1.1 a week | lineup value 0
3200 | Sterling Shepard | WR | age 33 | NYJ | market 1654 | projected 27.7 (5.5 a week) | last 3 weeks 3.4 a week | lineup value 0
6943 | Gabe Davis | WR | age 26 | FA | market 1795 | projected 23.7 (4.7 a week) | last 3 weeks 0 a week | lineup value 0
4993 | Mike Gesicki | TE | age 31 | CIN | market 1196 | projected 21.2 (4.2 a week) | last 3 weeks 0 a week | lineup value 0

PARTNER (partnerId 2): record 6-3, rank 3, points for 1453.2, contention window 0.89
6904 | Jalen Hurts | QB | age 28 | PHI | market 6787 | projected 130.1 (26 a week) | last 3 weeks 21.1 a week | lineup value 14.4
3257 | Jacoby Brissett | QB | age 33 | ARI | market 3344 | projected 102.4 (20.5 a week) | last 3 weeks 17.9 a week | lineup value 0
11564 | Drake Maye | QB | age 24 | NE | market 8664 | projected 101.8 (20.4 a week) | last 3 weeks 27.6 a week | lineup value 6.7
6797 | Justin Herbert | QB | age 28 | LAC | market 6571 | projected 95.7 (19.1 a week) | last 3 weeks 33.6 a week | lineup value 1.6
12514 | Emeka Egbuka | WR | age 24 | TB | market 4514 | projected 72.4 (14.5 a week) | last 3 weeks 5.4 a week | lineup value 24.3
8228 | Jaylen Warren | RB | age 27 | PIT | market 3541 | projected 69.8 (14 a week) | last 3 weeks 15.3 a week | lineup value 24.3
12474 | Woody Marks | RB | age 25 | HOU | market 3151 | projected 65.8 (13.2 a week) | last 3 weeks 10.1 a week | lineup value 20.3
2307 | Marcus Mariota | QB | age 32 | WAS | market 0 | projected 64.1 (12.8 a week) | last 3 weeks 5.1 a week | lineup value 0
8144 | Chris Olave | WR | age 26 | NO | market 4411 | projected 63.2 (12.6 a week) | last 3 weeks 16.5 a week | lineup value 24.8
5022 | Dallas Goedert | TE | age 31 | PHI | market 3124 | projected 60.9 (12.2 a week) | last 3 weeks 8 a week | lineup value 14
12526 | Tetairoa McMillan | WR | age 23 | CAR | market 4715 | projected 54 (10.8 a week) | last 3 weeks 10.6 a week | lineup value 16.5
12498 | Mason Taylor | TE | age 22 | NYJ | market 3671 | projected 48.6 (9.7 a week) | last 3 weeks 7.5 a week | lineup value 1.7
4098 | Kareem Hunt | RB | age 30 | FA | market 1818 | projected 44.5 (8.9 a week) | last 3 weeks 10.5 a week | lineup value 5.1
4039 | Cooper Kupp | WR | age 33 | SEA | market 2094 | projected 43.5 (8.7 a week) | last 3 weeks 1.1 a week | lineup value 0
6801 | Tee Higgins | WR | age 27 | CIN | market 4108 | projected 43.5 (8.7 a week) | last 3 weeks 22 a week | lineup value 13.8
11627 | Troy Franklin | WR | age 23 | DEN | market 3025 | projected 40 (8 a week) | last 3 weeks 16 a week | lineup value 3.5
9508 | Tyjae Spears | RB | age 25 | TEN | market 2995 | projected 37.4 (7.5 a week) | last 3 weeks 11.1 a week | lineup value 0
4066 | Evan Engram | TE | age 32 | DEN | market 0 | projected 36.4 (7.3 a week) | last 3 weeks 6.3 a week | lineup value 0.5
11571 | Isaiah Davis | RB | age 24 | NYJ | market 0 | projected 33.3 (6.7 a week) | last 3 weeks 7.7 a week | lineup value 0
12486 | Dillon Gabriel | QB | age 25 | CLE | market 0 | projected 32.8 (6.6 a week) | last 3 weeks 7.8 a week | lineup value 0
9480 | Brenton Strange | TE | age 25 | JAX | market 3619 | projected 32.3 (6.5 a week) | last 3 weeks 0 a week | lineup value 3.7
12519 | Luther Burden | WR | age 22 | CHI | market 4867 | projected 31.2 (6.2 a week) | last 3 weeks 1.3 a week | lineup value 0

CANDIDATE DEALS (from a rules-based finder; points are the finder projections for the rest of the season):
c1 | partnerId 8 | I give Oronde Gadsden + Justin Jefferson (12493,6794) | I get Baker Mayfield + Sam Darnold (4892,4943) | my points -16.8 | their points 34 | likelihood 0.66
c2 | partnerId 8 | I give Justin Jefferson (6794) | I get Baker Mayfield + Sean Tucker (4892,9506) | my points -2.9 | their points 20.1 | likelihood 0.54
c3 | partnerId 8 | I give Colston Loveland (12517) | I get Baker Mayfield + Mason Rudolph (4892,4972) | my points 22.2 | their points 6.3 | likelihood 0.67
c4 | partnerId 8 | I give Rashee Rice (10229) | I get Sam Darnold + Sean Tucker (4943,9506) | my points -20.6 | their points 26.9 | likelihood 0.45
c5 | partnerId 2 | I give Kimani Vidal (11647) | I get Marcus Mariota + Tyjae Spears (2307,9508) | my points -4.9 | their points 11.7 | likelihood 0.49

Pick the best trades for my team.

=========== CASE 1180213817211871232-w7-r9 ===========
REPLY FILE: /Users/anik/workspace/chrome/sleeper/.eval-market/replies/suggest-v2/heldout1/1180213817211871232-w7-r9.json
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
Lineup slots: QB, RB, RB, WR, WR, WR, TE, TE, FLEX, FLEX, SUPER_FLEX, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN. Superflex: yes. Tight end premium: yes. Points per reception: 1.
Columns: id | name | position | age | team | market value | projected points for the rest of the regular season (and per week) | points per week over the last three weeks played | lineup value (points my lineup loses if this player is removed).

MY TEAM (partnerId me): record 4-2, rank 4, points for 988.1, contention window 0.73
3294 | Dak Prescott | QB | age 33 | DAL | market 5741 | projected 171.8 (21.5 a week) | last 3 weeks 33.9 a week | lineup value 56
7547 | Amon-Ra St. Brown | WR | age 26 | DET | market 5286 | projected 137.3 (17.2 a week) | last 3 weeks 19.2 a week | lineup value 90.5
1373 | Geno Smith | QB | age 36 | NYJ | market 2928 | projected 133.7 (16.7 a week) | last 3 weeks 12.1 a week | lineup value 18.1
7569 | Nico Collins | WR | age 27 | HOU | market 4419 | projected 112 (14 a week) | last 3 weeks 9.3 a week | lineup value 65.3
9228 | Bryce Young | QB | age 25 | CAR | market 4898 | projected 109.4 (13.7 a week) | last 3 weeks 18.6 a week | lineup value 11.9
12512 | Quinshon Judkins | RB | age 22 | CLE | market 4406 | projected 99.7 (12.5 a week) | last 3 weeks 13 a week | lineup value 47.4
7021 | Rico Dowdle | RB | age 28 | PIT | market 3278 | projected 98.5 (12.3 a week) | last 3 weeks 23.4 a week | lineup value 42.2
6819 | Michael Pittman | WR | age 29 | PIT | market 2986 | projected 91.7 (11.5 a week) | last 3 weeks 11.3 a week | lineup value 44
3214 | Hunter Henry | TE | age 31 | NE | market 3149 | projected 77.2 (9.7 a week) | last 3 weeks 8.7 a week | lineup value 27.6
5844 | T.J. Hockenson | TE | age 29 | MIN | market 2958 | projected 75.2 (9.4 a week) | last 3 weeks 6.7 a week | lineup value 22.9
8122 | Zonovan Knight | RB | age 25 | ARI | market 0 | projected 73.5 (9.2 a week) | last 3 weeks 4.1 a week | lineup value 20.8
5967 | Tony Pollard | RB | age 29 | TEN | market 3194 | projected 62.4 (7.8 a week) | last 3 weeks 11 a week | lineup value 9.4
827 | Tyrod Taylor | QB | age 37 | GB | market 0 | projected 57.1 (7.1 a week) | last 3 weeks 0 a week | lineup value 4.8
7600 | Pat Freiermuth | TE | age 27 | PIT | market 2343 | projected 53.2 (6.7 a week) | last 3 weeks 0.8 a week | lineup value 3.4
6149 | Darius Slayton | WR | age 29 | IND | market 0 | projected 46.4 (5.8 a week) | last 3 weeks 4.2 a week | lineup value 6
7571 | Rashod Bateman | WR | age 26 | BAL | market 2467 | projected 40.4 (5.1 a week) | last 3 weeks 1.7 a week | lineup value 4
1426 | DeAndre Hopkins | WR | age 33 | FA | market 1498 | projected 38 (4.7 a week) | last 3 weeks 3.5 a week | lineup value 0
3161 | Carson Wentz | QB | age 33 | MIN | market 0 | projected 34.6 (4.3 a week) | last 3 weeks 14.6 a week | lineup value 9.6
12536 | Jaylin Noel | WR | age 24 | HOU | market 2755 | projected 30.3 (3.8 a week) | last 3 weeks 3.6 a week | lineup value 0.1
12481 | Cam Skattebo | RB | age 24 | NYG | market 4230 | projected 29 (3.6 a week) | last 3 weeks 19.8 a week | lineup value 12.4
3271 | Tyler Higbee | TE | age 33 | LAR | market 0 | projected 22.1 (2.8 a week) | last 3 weeks 6.7 a week | lineup value 0
7828 | Noah Gray | TE | age 27 | KC | market 0 | projected 17.5 (2.2 a week) | last 3 weeks 2.1 a week | lineup value 0
7670 | Joshua Palmer | WR | age 27 | BUF | market 0 | projected 14.6 (1.8 a week) | last 3 weeks 6 a week | lineup value 0.6
9757 | Kendre Miller | RB | age 24 | NO | market 2616 | projected 6.7 (0.8 a week) | last 3 weeks 7.5 a week | lineup value 0
8230 | Ty Chandler | RB | age 28 | NO | market 0 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0
8159 | Desmond Ridder | QB | age 26 | FA | market 0 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0
7568 | Brevin Jordan | TE | age 26 | HOU | market 0 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0
9229 | Anthony Richardson | QB | age 24 | IND | market 0 | projected 0 (0 a week) | last 3 weeks 0.8 a week | lineup value 0
11632 | Malik Nabers | WR | age 23 | NYG | market 5024 | projected 0 (0 a week) | last 3 weeks 1.3 a week | lineup value 0
11589 | Trey Benson | RB | age 24 | ARI | market 3171 | projected 0 (0 a week) | last 3 weeks 3.5 a week | lineup value 0

PARTNER (partnerId 6): record 1-5, rank 9, points for 852.4, contention window 0
9488 | Jaxon Smith-Njigba | WR | age 24 | SEA | market 5779 | projected 148.4 (18.6 a week) | last 3 weeks 23.5 a week | lineup value 91.5
5870 | Daniel Jones | QB | age 29 | IND | market 4367 | projected 146.3 (18.3 a week) | last 3 weeks 20.8 a week | lineup value 80.5
12508 | Jaxson Dart | QB | age 23 | NYG | market 7234 | projected 108.7 (13.6 a week) | last 3 weeks 23.3 a week | lineup value 42.9
9224 | Chase Brown | RB | age 26 | CIN | market 4521 | projected 102.2 (12.8 a week) | last 3 weeks 10.3 a week | lineup value 57.9
12518 | Tyler Warren | TE | age 24 | IND | market 4607 | projected 98.3 (12.3 a week) | last 3 weeks 18.3 a week | lineup value 49.5
11635 | Ladd McConkey | WR | age 24 | LAC | market 4588 | projected 98 (12.2 a week) | last 3 weeks 13.3 a week | lineup value 43.9
8136 | Rachaad White | RB | age 27 | WAS | market 2769 | projected 89.5 (11.2 a week) | last 3 weeks 16.4 a week | lineup value 47.2
11620 | Rome Odunze | WR | age 24 | CHI | market 4051 | projected 89.4 (11.2 a week) | last 3 weeks 7.4 a week | lineup value 35.5
4983 | DJ Moore | WR | age 29 | BUF | market 3640 | projected 83.4 (10.4 a week) | last 3 weeks 5.3 a week | lineup value 22.3
12506 | Harold Fannin | TE | age 22 | CLE | market 4694 | projected 75.4 (9.4 a week) | last 3 weeks 11.4 a week | lineup value 22.7
11559 | Michael Penix | QB | age 26 | ATL | market 3546 | projected 70.5 (8.8 a week) | last 3 weeks 13.4 a week | lineup value 18.6
8111 | Cade Otton | TE | age 27 | TB | market 2957 | projected 68.3 (8.5 a week) | last 3 weeks 9.7 a week | lineup value 15.5
12534 | Kyle Monangai | RB | age 24 | CHI | market 3805 | projected 65.8 (8.2 a week) | last 3 weeks 2.4 a week | lineup value 17.5
11628 | Marvin Harrison | WR | age 24 | HOU | market 3914 | projected 50.7 (6.3 a week) | last 3 weeks 12.5 a week | lineup value 13.7
12490 | Bhayshul Tuten | RB | age 23 | JAX | market 4237 | projected 47 (5.9 a week) | last 3 weeks 3.4 a week | lineup value 1.5
9481 | Luke Musgrave | TE | age 26 | GB | market 0 | projected 38.4 (4.8 a week) | last 3 weeks 1.3 a week | lineup value 2.7
12492 | Pat Bryant | WR | age 23 | DEN | market 3006 | projected 34.8 (4.4 a week) | last 3 weeks 1.4 a week | lineup value 0.7
11623 | Jordan Whittington | WR | age 26 | LAR | market 0 | projected 32.5 (4.1 a week) | last 3 weeks 4.1 a week | lineup value 0
11625 | Adonai Mitchell | WR | age 24 | NYJ | market 2982 | projected 32.2 (4 a week) | last 3 weeks 3.9 a week | lineup value 2.9
12495 | Ollie Gordon | RB | age 22 | MIA | market 0 | projected 30.9 (3.9 a week) | last 3 weeks 0.7 a week | lineup value 0
9511 | Keaton Mitchell | RB | age 24 | LAC | market 2863 | projected 29.5 (3.7 a week) | last 3 weeks 0.8 a week | lineup value 0
11370 | Chris Brooks | RB | age 26 | GB | market 1204 | projected 20.1 (2.5 a week) | last 3 weeks 0.4 a week | lineup value 0

PARTNER (partnerId 7): record 2-4, rank 7, points for 981.7, contention window 0.27
4034 | Christian McCaffrey | RB | age 30 | SF | market 4603 | projected 165.7 (20.7 a week) | last 3 weeks 26 a week | lineup value 104.7
3163 | Jared Goff | QB | age 32 | DET | market 5427 | projected 158.8 (19.8 a week) | last 3 weeks 21.9 a week | lineup value 82.1
9221 | Jahmyr Gibbs | RB | age 24 | DET | market 6369 | projected 147.9 (18.5 a week) | last 3 weeks 14 a week | lineup value 79.7
4217 | George Kittle | TE | age 33 | SF | market 3136 | projected 104.6 (13.1 a week) | last 3 weeks 0 a week | lineup value 37.9
2449 | Stefon Diggs | WR | age 32 | WAS | market 2778 | projected 99.9 (12.5 a week) | last 3 weeks 15.5 a week | lineup value 29.5
1466 | Travis Kelce | TE | age 37 | KC | market 2861 | projected 88.1 (11 a week) | last 3 weeks 15.7 a week | lineup value 21.2
8151 | Kenneth Walker | RB | age 25 | KC | market 4575 | projected 81.8 (10.2 a week) | last 3 weeks 8.8 a week | lineup value 13.5
1339 | Zach Ertz | TE | age 35 | PHI | market 0 | projected 79.5 (9.9 a week) | last 3 weeks 8.1 a week | lineup value 13.4
7090 | Darnell Mooney | WR | age 28 | NYG | market 2370 | projected 78.3 (9.8 a week) | last 3 weeks 0.8 a week | lineup value 4.7
7049 | Jauan Jennings | WR | age 29 | MIN | market 2829 | projected 77 (9.6 a week) | last 3 weeks 2.7 a week | lineup value 7.8
11624 | Xavier Worthy | WR | age 23 | KC | market 3485 | projected 76.5 (9.6 a week) | last 3 weeks 12.9 a week | lineup value 8
10213 | Tre Tucker | WR | age 25 | LV | market 2693 | projected 74.9 (9.4 a week) | last 3 weeks 9.1 a week | lineup value 8.2
1166 | Kirk Cousins | QB | age 38 | LV | market 2583 | projected 71.6 (8.9 a week) | last 3 weeks 0 a week | lineup value 15
7527 | Mac Jones | QB | age 28 | SF | market 2109 | projected 68.9 (8.6 a week) | last 3 weeks 13.1 a week | lineup value 28.4
6783 | Jerry Jeudy | WR | age 27 | CLE | market 2693 | projected 62 (7.8 a week) | last 3 weeks 6.9 a week | lineup value 2
9487 | Parker Washington | WR | age 24 | JAX | market 4008 | projected 53 (6.6 a week) | last 3 weeks 6.8 a week | lineup value 2.4
5857 | Noah Fant | TE | age 28 | NO | market 0 | projected 50.8 (6.3 a week) | last 3 weeks 2.6 a week | lineup value 0
6271 | Olamide Zaccheaus | WR | age 29 | ATL | market 0 | projected 47.3 (5.9 a week) | last 3 weeks 4.6 a week | lineup value 0
4454 | Kendrick Bourne | WR | age 31 | ARI | market 0 | projected 47 (5.9 a week) | last 3 weeks 15.4 a week | lineup value 2.4
9504 | Kayshon Boutte | WR | age 24 | HOU | market 2955 | projected 46 (5.7 a week) | last 3 weeks 12.1 a week | lineup value 0
9479 | Darnell Washington | TE | age 25 | PIT | market 0 | projected 45.8 (5.7 a week) | last 3 weeks 5.2 a week | lineup value 0
12502 | Gunnar Helm | TE | age 24 | TEN | market 3235 | projected 44.5 (5.6 a week) | last 3 weeks 5 a week | lineup value 0

PARTNER (partnerId 3): record 2-4, rank 8, points for 879.8, contention window 0.11
4046 | Patrick Mahomes | QB | age 31 | KC | market 5859 | projected 183.7 (23 a week) | last 3 weeks 34.2 a week | lineup value 63.4
96 | Aaron Rodgers | QB | age 42 | PIT | market 3250 | projected 144.2 (18 a week) | last 3 weeks 12.1 a week | lineup value 43.2
8138 | James Cook | RB | age 27 | BUF | market 4903 | projected 125.8 (15.7 a week) | last 3 weeks 12 a week | lineup value 59.3
8155 | Breece Hall | RB | age 25 | NYJ | market 4269 | projected 103.1 (12.9 a week) | last 3 weeks 13.5 a week | lineup value 34.4
7526 | Jaylen Waddle | WR | age 27 | DEN | market 3992 | projected 102.7 (12.8 a week) | last 3 weeks 15.5 a week | lineup value 47.1
7525 | DeVonta Smith | WR | age 27 | PHI | market 4150 | projected 101.5 (12.7 a week) | last 3 weeks 11.1 a week | lineup value 51.8
12529 | TreVeyon Henderson | RB | age 23 | NE | market 4326 | projected 91.2 (11.4 a week) | last 3 weeks 7.3 a week | lineup value 23.7
19 | Joe Flacco | QB | age 41 | CIN | market 0 | projected 90.6 (11.3 a week) | last 3 weeks 9 a week | lineup value 0
6790 | D'Andre Swift | RB | age 27 | CHI | market 3662 | projected 85 (10.6 a week) | last 3 weeks 13.8 a week | lineup value 16.3
8676 | Rashid Shaheed | WR | age 28 | SEA | market 2695 | projected 78.6 (9.8 a week) | last 3 weeks 12.5 a week | lineup value 21.6
12533 | Jacory Croskey-Merritt | RB | age 25 | WAS | market 3256 | projected 69.1 (8.6 a week) | last 3 weeks 14.2 a week | lineup value 13.3
8183 | Brock Purdy | QB | age 26 | SF | market 6195 | projected 66.6 (8.3 a week) | last 3 weeks 8.2 a week | lineup value 5.6
11655 | Tyrone Tracy | RB | age 26 | NYG | market 2987 | projected 65.3 (8.2 a week) | last 3 weeks 0.2 a week | lineup value 6.9
11435 | Emanuel Wilson | RB | age 27 | SEA | market 2490 | projected 54.8 (6.9 a week) | last 3 weeks 4.3 a week | lineup value 2.1
12499 | Elic Ayomanor | WR | age 23 | TEN | market 2906 | projected 52.2 (6.5 a week) | last 3 weeks 5.3 a week | lineup value 4.1
8210 | Chig Okonkwo | TE | age 27 | WAS | market 3055 | projected 49.9 (6.2 a week) | last 3 weeks 7.8 a week | lineup value 22.2
5906 | Dawson Knox | TE | age 29 | BUF | market 0 | projected 46.3 (5.8 a week) | last 3 weeks 3.1 a week | lineup value 18.7
12501 | Matthew Golden | WR | age 23 | GB | market 3522 | projected 33.6 (4.2 a week) | last 3 weeks 8.2 a week | lineup value 0
9494 | Marvin Mims | WR | age 24 | DEN | market 2742 | projected 33.2 (4.1 a week) | last 3 weeks 9.7 a week | lineup value 0
12641 | Jaylin Lane | WR | age 24 | WAS | market 0 | projected 32.3 (4 a week) | last 3 weeks 3.9 a week | lineup value 0
11638 | Ricky Pearsall | WR | age 26 | SF | market 2206 | projected 31.5 (3.9 a week) | last 3 weeks 2.9 a week | lineup value 12.8
8205 | Isiah Pacheco | RB | age 27 | DET | market 2557 | projected 31 (3.9 a week) | last 3 weeks 9.2 a week | lineup value 0

PARTNER (partnerId 1): record 3-3, rank 6, points for 915.1, contention window 0.42
11560 | Caleb Williams | QB | age 24 | CHI | market 7854 | projected 156.8 (19.6 a week) | last 3 weeks 12.2 a week | lineup value 66.9
6794 | Justin Jefferson | WR | age 27 | MIN | market 4807 | projected 124.7 (15.6 a week) | last 3 weeks 14 a week | lineup value 49.3
10229 | Rashee Rice | WR | age 26 | KC | market 4410 | projected 122.6 (15.3 a week) | last 3 weeks 0 a week | lineup value 57.3
7588 | Javonte Williams | RB | age 26 | DAL | market 4041 | projected 119 (14.9 a week) | last 3 weeks 18.1 a week | lineup value 53.3
12527 | Ashton Jeanty | RB | age 22 | LV | market 5356 | projected 111.6 (14 a week) | last 3 weeks 22.3 a week | lineup value 45.5
11604 | Brock Bowers | TE | age 23 | LV | market 5519 | projected 105 (13.1 a week) | last 3 weeks 3.6 a week | lineup value 49.6
11565 | J.J. McCarthy | QB | age 23 | NYG | market 3934 | projected 97 (12.1 a week) | last 3 weeks 0 a week | lineup value 25.8
11647 | Kimani Vidal | RB | age 25 | LAC | market 2822 | projected 93.9 (11.7 a week) | last 3 weeks 7.6 a week | lineup value 25
9756 | Jordan Addison | WR | age 24 | MIN | market 3607 | projected 86 (10.8 a week) | last 3 weeks 10.2 a week | lineup value 11.7
12493 | Oronde Gadsden | TE | age 23 | LAC | market 4186 | projected 83.8 (10.5 a week) | last 3 weeks 7.1 a week | lineup value 27.5
12517 | Colston Loveland | TE | age 22 | CHI | market 5254 | projected 68.7 (8.6 a week) | last 3 weeks 1.2 a week | lineup value 9.9
11566 | Jayden Daniels | QB | age 25 | WAS | market 7517 | projected 68.5 (8.6 a week) | last 3 weeks 16.3 a week | lineup value 20.7
5947 | Jakobi Meyers | WR | age 29 | JAX | market 3292 | projected 66.3 (8.3 a week) | last 3 weeks 7.4 a week | lineup value 8.9
11603 | AJ Barner | TE | age 24 | SEA | market 3506 | projected 60.9 (7.6 a week) | last 3 weeks 16.6 a week | lineup value 1.6
11610 | Malik Washington | WR | age 25 | MIA | market 2750 | projected 59 (7.4 a week) | last 3 weeks 4.8 a week | lineup value 0
12485 | Tez Johnson | WR | age 24 | TB | market 0 | projected 58.4 (7.3 a week) | last 3 weeks 0 a week | lineup value 0
9500 | Josh Downs | WR | age 25 | IND | market 3338 | projected 56.1 (7 a week) | last 3 weeks 11.3 a week | lineup value 1
8125 | Calvin Austin | WR | age 27 | NYG | market 0 | projected 56 (7 a week) | last 3 weeks 1.1 a week | lineup value 0
6806 | J.K. Dobbins | RB | age 27 | DEN | market 3347 | projected 52.4 (6.5 a week) | last 3 weeks 10.3 a week | lineup value 11.3
12524 | Shedeur Sanders | QB | age 24 | CLE | market 3794 | projected 48.7 (6.1 a week) | last 3 weeks 0 a week | lineup value 6.9
11646 | Jalen Coker | WR | age 24 | CAR | market 3256 | projected 48.5 (6.1 a week) | last 3 weeks 0 a week | lineup value 0
7594 | Chuba Hubbard | RB | age 27 | CAR | market 3359 | projected 43.4 (5.4 a week) | last 3 weeks 3.3 a week | lineup value 0.5

CANDIDATE DEALS (from a rules-based finder; points are the finder projections for the rest of the season):
c1 | partnerId 6 | I give Malik Nabers (11632) | I get Chase Brown + Tyler Warren (9224,12518) | my points 77.4 | their points -109 | likelihood 0.88
c2 | partnerId 6 | I give Kendre Miller + Malik Nabers (9757,11632) | I get Tyler Warren + Ladd McConkey (12518,11635) | my points 74.8 | their points -97.4 | likelihood 0.88
c3 | partnerId 6 | I give Malik Nabers + Trey Benson (11632,11589) | I get Chase Brown + Ladd McConkey (9224,11635) | my points 72.8 | their points -101.9 | likelihood 0.89
c4 | partnerId 7 | I give DeAndre Hopkins + Malik Nabers (1426,11632) | I get Christian McCaffrey + George Kittle (4034,4217) | my points 139.8 | their points -144.2 | likelihood 0.75
c5 | partnerId 7 | I give Kendre Miller + Malik Nabers (9757,11632) | I get Christian McCaffrey + Stefon Diggs (4034,2449) | my points 131.3 | their points -135.7 | likelihood 0.76
c6 | partnerId 7 | I give Malik Nabers (11632) | I get Christian McCaffrey + Travis Kelce (4034,1466) | my points 127.7 | their points -127.5 | likelihood 0.76
c7 | partnerId 3 | I give DeAndre Hopkins + Malik Nabers (1426,11632) | I get Jaylen Waddle + Breece Hall (7526,8155) | my points 77.1 | their points -82.4 | likelihood 0.94
c8 | partnerId 1 | I give DeAndre Hopkins + Malik Nabers (1426,11632) | I get Rashee Rice + Kimani Vidal (10229,11647) | my points 89.2 | their points -85.5 | likelihood 0.68
c9 | partnerId 1 | I give Kendre Miller + Malik Nabers (9757,11632) | I get Javonte Williams + Oronde Gadsden (7588,12493) | my points 78.7 | their points -81.4 | likelihood 0.78
c10 | partnerId 1 | I give Malik Nabers (11632) | I get Rashee Rice + Oronde Gadsden (10229,12493) | my points 86.5 | their points -85.6 | likelihood 0.63

Pick the best trades for my team.
