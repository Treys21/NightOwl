You are answering fantasy football trade-advice cases. For each case below, follow the SYSTEM text, read the DATA, and write your JSON answer to the reply file named for that case.
Rules: write only the JSON object (no markdown fence, no commentary) to each reply file. Do not read any other file on disk. Do not look at any directory named truth or any file outside the reply paths. Work each case independently.

=========== CASE 1180288364594143232-w10-r1 ===========
REPLY FILE: /Users/anik/workspace/chrome/sleeper/.eval-market/replies/suggest-v2/heldout1/1180288364594143232-w10-r1.json
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
Lineup slots: QB, RB, RB, WR, WR, WR, TE, FLEX, FLEX, FLEX, SUPER_FLEX, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN. Superflex: yes. Tight end premium: yes. Points per reception: 1.
Columns: id | name | position | age | team | market value | projected points for the rest of the regular season (and per week) | points per week over the last three weeks played | lineup value (points my lineup loses if this player is removed).

MY TEAM (partnerId me): record 1-8, rank 12, points for 1200.3, contention window 0
9493 | Puka Nacua | WR | age 25 | LAR | market 5700 | projected 102.8 (20.6 a week) | last 3 weeks 7.6 a week | lineup value 64.6
7523 | Trevor Lawrence | QB | age 27 | JAX | market 5809 | projected 91.9 (18.4 a week) | last 3 weeks 13.6 a week | lineup value 49.3
4866 | Saquon Barkley | RB | age 29 | PHI | market 4209 | projected 79.3 (15.9 a week) | last 3 weeks 12.9 a week | lineup value 41.1
9224 | Chase Brown | RB | age 26 | CIN | market 4481 | projected 63.2 (12.6 a week) | last 3 weeks 18.9 a week | lineup value 31.1
8183 | Brock Purdy | QB | age 26 | SF | market 5914 | projected 62.9 (12.6 a week) | last 3 weeks 0 a week | lineup value 28.7
7564 | Ja'Marr Chase | WR | age 26 | CIN | market 5794 | projected 57.7 (11.5 a week) | last 3 weeks 25.4 a week | lineup value 32.5
10232 | Michael Wilson | WR | age 26 | ARI | market 3643 | projected 55.3 (11.1 a week) | last 3 weeks 5.4 a week | lineup value 17.1
5844 | T.J. Hockenson | TE | age 29 | MIN | market 2961 | projected 55.1 (11 a week) | last 3 weeks 10.5 a week | lineup value 24.8
7567 | Kenny Gainwell | RB | age 27 | TB | market 3108 | projected 52.3 (10.5 a week) | last 3 weeks 4.5 a week | lineup value 14.1
11647 | Kimani Vidal | RB | age 25 | LAC | market 2787 | projected 51.2 (10.2 a week) | last 3 weeks 9.7 a week | lineup value 19.9
6783 | Jerry Jeudy | WR | age 27 | CLE | market 2696 | projected 42.1 (8.4 a week) | last 3 weeks 1.2 a week | lineup value 4.3
6770 | Joe Burrow | QB | age 29 | CIN | market 6824 | projected 40.2 (8 a week) | last 3 weeks 0 a week | lineup value 13.4
8125 | Calvin Austin | WR | age 27 | NYG | market 0 | projected 37.9 (7.6 a week) | last 3 weeks 5.8 a week | lineup value 3.1
8408 | Jordan Mason | RB | age 27 | MIN | market 3050 | projected 35.2 (7 a week) | last 3 weeks 6 a week | lineup value 1.7
11610 | Malik Washington | WR | age 25 | MIA | market 2736 | projected 34.8 (7 a week) | last 3 weeks 9.2 a week | lineup value 3.5
11571 | Isaiah Davis | RB | age 24 | NYJ | market 0 | projected 32.8 (6.6 a week) | last 3 weeks 7.7 a week | lineup value 0.6
8210 | Chig Okonkwo | TE | age 27 | WAS | market 3058 | projected 32.1 (6.4 a week) | last 3 weeks 5.6 a week | lineup value 1.8
8119 | Jahan Dotson | WR | age 26 | ATL | market 0 | projected 16 (3.2 a week) | last 3 weeks 3.7 a week | lineup value 0
12455 | Brashard Smith | RB | age 23 | KC | market 2677 | projected 14.6 (2.9 a week) | last 3 weeks 4.5 a week | lineup value 0
7670 | Joshua Palmer | WR | age 27 | BUF | market 0 | projected 14.5 (2.9 a week) | last 3 weeks 0 a week | lineup value 0
4147 | Samaje Perine | RB | age 31 | CIN | market 0 | projected 14.1 (2.8 a week) | last 3 weeks 6.9 a week | lineup value 0
8135 | Treylon Burks | WR | age 26 | WAS | market 0 | projected 12 (2.4 a week) | last 3 weeks 0.8 a week | lineup value 0
11783 | Ryan Flournoy | WR | age 26 | DAL | market 2497 | projected 11 (2.2 a week) | last 3 weeks 3.6 a week | lineup value 0
11994 | Kameron Johnson | WR | age 24 | TB | market 0 | projected 5.3 (1.1 a week) | last 3 weeks 0 a week | lineup value 0
8117 | Jalen Tolbert | WR | age 27 | MIA | market 0 | projected 2.8 (0.6 a week) | last 3 weeks 5.1 a week | lineup value 0
12531 | Trevor Etienne | RB | age 22 | CAR | market 0 | projected 2.6 (0.5 a week) | last 3 weeks 0.5 a week | lineup value 0
6820 | Clyde Edwards-Helaire | RB | age 26 | FA | market 0 | projected 2.1 (0.4 a week) | last 3 weeks 0.2 a week | lineup value 0
12520 | Xavier Restrepo | WR | age 24 | TEN | market 0 | projected 0.7 (0.1 a week) | last 3 weeks 0 a week | lineup value 0
11595 | Jared Wiley | TE | age 25 | KC | market 1487 | projected 0.5 (0.1 a week) | last 3 weeks 0 a week | lineup value 0
10216 | Kenny McIntosh | RB | age 26 | FA | market 0 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0

PARTNER (partnerId 5): record 6-3, rank 3, points for 1466.7, contention window 0.95
3163 | Jared Goff | QB | age 32 | DET | market 5204 | projected 107.8 (21.6 a week) | last 3 weeks 11.6 a week | lineup value 91.9
4034 | Christian McCaffrey | RB | age 30 | SF | market 4579 | projected 90.8 (18.2 a week) | last 3 weeks 27.7 a week | lineup value 76.6
5022 | Dallas Goedert | TE | age 31 | PHI | market 3129 | projected 70.5 (14.1 a week) | last 3 weeks 9 a week | lineup value 35.8
5846 | DK Metcalf | WR | age 28 | PIT | market 3444 | projected 63.2 (12.6 a week) | last 3 weeks 9 a week | lineup value 28.1
8144 | Chris Olave | WR | age 26 | NO | market 4425 | projected 62.8 (12.6 a week) | last 3 weeks 16.5 a week | lineup value 34.8
8126 | Wan'Dale Robinson | WR | age 25 | TEN | market 3419 | projected 52.1 (10.4 a week) | last 3 weeks 12.3 a week | lineup value 22.2
4983 | DJ Moore | WR | age 29 | BUF | market 3655 | projected 48.1 (9.6 a week) | last 3 weeks 14.9 a week | lineup value 13.1
6801 | Tee Higgins | WR | age 27 | CIN | market 4126 | projected 43.3 (8.7 a week) | last 3 weeks 22 a week | lineup value 22.2
8142 | Alec Pierce | WR | age 26 | IND | market 3415 | projected 43 (8.6 a week) | last 3 weeks 13.7 a week | lineup value 15
10444 | Cedric Tillman | WR | age 26 | NO | market 0 | projected 37.5 (7.5 a week) | last 3 weeks 0 a week | lineup value 3.3
8132 | Tyler Allgeier | RB | age 26 | ARI | market 3179 | projected 35.7 (7.1 a week) | last 3 weeks 3.9 a week | lineup value 21.5
19 | Joe Flacco | QB | age 41 | CIN | market 0 | projected 33.3 (6.7 a week) | last 3 weeks 32.7 a week | lineup value 17.4
5857 | Noah Fant | TE | age 28 | NO | market 0 | projected 28.7 (5.7 a week) | last 3 weeks 13 a week | lineup value 1.5
6149 | Darius Slayton | WR | age 29 | IND | market 0 | projected 28.3 (5.7 a week) | last 3 weeks 5.3 a week | lineup value 5.4
1426 | DeAndre Hopkins | WR | age 33 | FA | market 1504 | projected 27.6 (5.5 a week) | last 3 weeks 0.8 a week | lineup value 0
10236 | Dalton Kincaid | TE | age 26 | BUF | market 3771 | projected 25 (5 a week) | last 3 weeks 10.2 a week | lineup value 12.3
8154 | Brian Robinson | RB | age 27 | ATL | market 3115 | projected 14.2 (2.8 a week) | last 3 weeks 5 a week | lineup value 0
4082 | Curtis Samuel | WR | age 29 | FA | market 1454 | projected 9.1 (1.8 a week) | last 3 weeks 0.5 a week | lineup value 0
8129 | Dameon Pierce | RB | age 26 | PHI | market 0 | projected 0.1 (0 a week) | last 3 weeks 0 a week | lineup value 0
4663 | Austin Ekeler | RB | age 31 | WAS | market 0 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0
5849 | Kyler Murray | QB | age 29 | MIN | market 4796 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0
6011 | Gardner Minshew | QB | age 30 | ARI | market 0 | projected 0 (0 a week) | last 3 weeks -0.1 a week | lineup value 0

PARTNER (partnerId 11): record 5-4, rank 5, points for 1365.1, contention window 0.69
11604 | Brock Bowers | TE | age 23 | LV | market 5547 | projected 105.7 (21.1 a week) | last 3 weeks 17.4 a week | lineup value 73.2
1373 | Geno Smith | QB | age 36 | NYJ | market 2748 | projected 89.7 (17.9 a week) | last 3 weeks 12 a week | lineup value 13.4
6813 | Jonathan Taylor | RB | age 27 | IND | market 4989 | projected 88.5 (17.7 a week) | last 3 weeks 26.4 a week | lineup value 83
11563 | Bo Nix | QB | age 26 | DEN | market 6307 | projected 86.3 (17.3 a week) | last 3 weeks 32.4 a week | lineup value 17.3
11565 | J.J. McCarthy | QB | age 23 | NYG | market 3611 | projected 71.1 (14.2 a week) | last 3 weeks 7.3 a week | lineup value 9.5
12506 | Harold Fannin | TE | age 22 | CLE | market 4707 | projected 64.5 (12.9 a week) | last 3 weeks 11.2 a week | lineup value 32.1
12529 | TreVeyon Henderson | RB | age 23 | NE | market 4313 | projected 60.9 (12.2 a week) | last 3 weeks 5.9 a week | lineup value 55
7002 | Juwan Johnson | TE | age 30 | NO | market 3122 | projected 55.6 (11.1 a week) | last 3 weeks 15 a week | lineup value 29
12526 | Tetairoa McMillan | WR | age 23 | CAR | market 4731 | projected 53.6 (10.7 a week) | last 3 weeks 10.6 a week | lineup value 26.8
11620 | Rome Odunze | WR | age 24 | CHI | market 4059 | projected 47.5 (9.5 a week) | last 3 weeks 7.8 a week | lineup value 20.7
11597 | Theo Johnson | TE | age 25 | NYG | market 3220 | projected 46 (9.2 a week) | last 3 weeks 13 a week | lineup value 19.2
12484 | Jayden Higgins | WR | age 23 | HOU | market 3451 | projected 37.1 (7.4 a week) | last 3 weeks 4.9 a week | lineup value 7.4
11834 | Devaughn Vele | WR | age 28 | NO | market 2280 | projected 31.3 (6.3 a week) | last 3 weeks 0.7 a week | lineup value 4.7
9486 | Dontayvion Wicks | WR | age 25 | PHI | market 2554 | projected 28.9 (5.8 a week) | last 3 weeks 0.5 a week | lineup value 0.2
12521 | Elijah Arroyo | TE | age 23 | SEA | market 0 | projected 26.6 (5.3 a week) | last 3 weeks 6.9 a week | lineup value 0
8180 | Jalen Nailor | WR | age 27 | LV | market 2616 | projected 25.1 (5 a week) | last 3 weeks 2.8 a week | lineup value 0
12492 | Pat Bryant | WR | age 23 | DEN | market 3015 | projected 20.2 (4 a week) | last 3 weeks 5.9 a week | lineup value 2.1
12775 | Max Brosmer | QB | age 25 | MIN | market 0 | projected 14.8 (3 a week) | last 3 weeks 0 a week | lineup value 0
7587 | Dyami Brown | WR | age 26 | WAS | market 0 | projected 14.3 (2.9 a week) | last 3 weeks 4.3 a week | lineup value 0.3
12541 | Dont'e Thornton | WR | age 23 | LV | market 0 | projected 10.2 (2 a week) | last 3 weeks 0 a week | lineup value 0
12504 | Kaleb Johnson | RB | age 23 | GB | market 2725 | projected 6.9 (1.4 a week) | last 3 weeks 0.8 a week | lineup value 0.6
12543 | Tahj Brooks | RB | age 24 | CIN | market 0 | projected 6.3 (1.3 a week) | last 3 weeks 0 a week | lineup value 2

CANDIDATE DEALS (from a rules-based finder; points are the finder projections for the rest of the season):
c1 | partnerId 5 | I give Saquon Barkley + Chase Brown (4866,9224) | I get Curtis Samuel + Kyler Murray (4082,5849) | my points -73.5 | their points 83.3 | likelihood 0.72
c2 | partnerId 5 | I give Chase Brown + Kimani Vidal (9224,11647) | I get Kyler Murray (5849) | my points -51.9 | their points 64.9 | likelihood 0.7
c3 | partnerId 11 | I give Saquon Barkley + Chase Brown (4866,9224) | I get Malik Nabers (11632) | my points -73.5 | their points 65.5 | likelihood 0.63
c4 | partnerId 5 | I give Kimani Vidal (11647) | I get Curtis Samuel + Brian Robinson (4082,8154) | my points -19.9 | their points 30.7 | likelihood 0.64
c5 | partnerId 5 | I give Chase Brown (9224) | I get Kyler Murray + Brian Robinson (5849,8154) | my points -31.1 | their points 41.9 | likelihood 0.69
c6 | partnerId 11 | I give Chase Brown + Michael Wilson (9224,10232) | I get Trey Benson + Malik Nabers (11589,11632) | my points -49.5 | their points 55.4 | likelihood 0.55

Pick the best trades for my team.

=========== CASE 1180288364594143232-w4-r9 ===========
REPLY FILE: /Users/anik/workspace/chrome/sleeper/.eval-market/replies/suggest-v2/heldout1/1180288364594143232-w4-r9.json
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
Lineup slots: QB, RB, RB, WR, WR, WR, TE, FLEX, FLEX, FLEX, SUPER_FLEX, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN. Superflex: yes. Tight end premium: yes. Points per reception: 1.
Columns: id | name | position | age | team | market value | projected points for the rest of the regular season (and per week) | points per week over the last three weeks played | lineup value (points my lineup loses if this player is removed).

MY TEAM (partnerId me): record 2-1, rank 6, points for 386.7, contention window 0.56
5870 | Daniel Jones | QB | age 29 | IND | market 3956 | projected 187.7 (17.1 a week) | last 3 weeks 24.7 a week | lineup value 37.9
6794 | Justin Jefferson | WR | age 27 | MIN | market 4833 | projected 153.5 (14 a week) | last 3 weeks 12.8 a week | lineup value 107.7
9228 | Bryce Young | QB | age 25 | CAR | market 4507 | projected 153.4 (13.9 a week) | last 3 weeks 15.7 a week | lineup value 20.5
11635 | Ladd McConkey | WR | age 24 | LAC | market 4608 | projected 139.5 (12.7 a week) | last 3 weeks 10.4 a week | lineup value 89.5
11624 | Xavier Worthy | WR | age 23 | KC | market 3494 | projected 114.8 (10.4 a week) | last 3 weeks 0 a week | lineup value 66.8
11566 | Jayden Daniels | QB | age 25 | WAS | market 7100 | projected 108.2 (9.8 a week) | last 3 weeks 15.3 a week | lineup value 24.4
11631 | Brian Thomas | WR | age 24 | JAX | market 3940 | projected 92.4 (8.4 a week) | last 3 weeks 8.5 a week | lineup value 44.7
6806 | J.K. Dobbins | RB | age 27 | DEN | market 3287 | projected 89.4 (8.1 a week) | last 3 weeks 15.2 a week | lineup value 70.8
11628 | Marvin Harrison | WR | age 24 | HOU | market 3933 | projected 86 (7.8 a week) | last 3 weeks 10.1 a week | lineup value 38
9500 | Josh Downs | WR | age 25 | IND | market 3347 | projected 83.8 (7.6 a week) | last 3 weeks 6.6 a week | lineup value 42.2
12545 | Tyler Shough | QB | age 27 | NO | market 4806 | projected 82.7 (7.5 a week) | last 3 weeks 0 a week | lineup value 3.2
11562 | Spencer Rattler | QB | age 26 | NO | market 0 | projected 79.1 (7.2 a week) | last 3 weeks 17.3 a week | lineup value 14.7
9484 | Tucker Kraft | TE | age 25 | GB | market 4156 | projected 74.7 (6.8 a week) | last 3 weeks 16.2 a week | lineup value 54.1
11586 | Blake Corum | RB | age 25 | LAR | market 3521 | projected 54.9 (5 a week) | last 3 weeks 6.1 a week | lineup value 33.6
11600 | Ja'Tavion Sanders | TE | age 23 | CAR | market 0 | projected 53.8 (4.9 a week) | last 3 weeks 9.5 a week | lineup value 35.7
11638 | Ricky Pearsall | WR | age 26 | SF | market 2212 | projected 45 (4.1 a week) | last 3 weeks 14.6 a week | lineup value 26.8
6111 | Jake Browning | QB | age 30 | LAC | market 0 | projected 34.4 (3.1 a week) | last 3 weeks 9.9 a week | lineup value 0.5
11575 | Ray Davis | RB | age 26 | BUF | market 2482 | projected 31.7 (2.9 a week) | last 3 weeks 1.2 a week | lineup value 12.3
12530 | Travis Hunter | DB | age 23 | JAX | market 0 | projected 30.3 (2.8 a week) | last 3 weeks 5.9 a week | lineup value 4.8
2216 | Mike Evans | WR | age 33 | SF | market 3196 | projected 15.4 (1.4 a week) | last 3 weeks 11.3 a week | lineup value 7.1
11596 | Ben Sinnott | TE | age 24 | WAS | market 0 | projected 14.5 (1.3 a week) | last 3 weeks 0.8 a week | lineup value 2.5
9225 | Tank Bigsby | RB | age 24 | PHI | market 2832 | projected 12.3 (1.1 a week) | last 3 weeks 0.4 a week | lineup value 6.1
11643 | Jaylen Wright | RB | age 23 | MIA | market 2665 | projected 7.8 (0.7 a week) | last 3 weeks 0 a week | lineup value 1.9
12471 | DJ Giddens | RB | age 23 | IND | market 0 | projected 7.8 (0.7 a week) | last 3 weeks 1.5 a week | lineup value 0
11569 | Jarquez Hunter | RB | age 23 | NO | market 2334 | projected 1 (0.1 a week) | last 3 weeks 0 a week | lineup value 0
8139 | Zamir White | RB | age 27 | NO | market 0 | projected 0.7 (0.1 a week) | last 3 weeks 2.5 a week | lineup value 0
11581 | MarShawn Lloyd | RB | age 25 | GB | market 3214 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0
9229 | Anthony Richardson | QB | age 24 | IND | market 0 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0
9502 | Tank Dell | WR | age 26 | HOU | market 2581 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0
4179 | Joshua Dobbs | QB | age 31 | DET | market 0 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0

PARTNER (partnerId 4): record 2-1, rank 3, points for 484.4, contention window 0.95
9488 | Jaxon Smith-Njigba | WR | age 24 | SEA | market 5806 | projected 203.1 (18.5 a week) | last 3 weeks 18.8 a week | lineup value 110
11560 | Caleb Williams | QB | age 24 | CHI | market 7365 | projected 182 (16.5 a week) | last 3 weeks 28.1 a week | lineup value 60.2
96 | Aaron Rodgers | QB | age 42 | PIT | market 3091 | projected 171.3 (15.6 a week) | last 3 weeks 20.6 a week | lineup value 49.5
9997 | Zay Flowers | WR | age 26 | BAL | market 4189 | projected 145.2 (13.2 a week) | last 3 weeks 15.4 a week | lineup value 53.8
8155 | Breece Hall | RB | age 25 | NYJ | market 4236 | projected 143.8 (13.1 a week) | last 3 weeks 10.5 a week | lineup value 52.5
7526 | Jaylen Waddle | WR | age 27 | DEN | market 4011 | projected 140.8 (12.8 a week) | last 3 weeks 13.2 a week | lineup value 49.3
6786 | CeeDee Lamb | WR | age 27 | DAL | market 4937 | projected 133.3 (12.1 a week) | last 3 weeks 12.7 a week | lineup value 69.9
7021 | Rico Dowdle | RB | age 28 | PIT | market 3222 | projected 132.8 (12.1 a week) | last 3 weeks 5.8 a week | lineup value 41.3
8151 | Kenneth Walker | RB | age 25 | KC | market 4514 | projected 117.1 (10.6 a week) | last 3 weeks 14.1 a week | lineup value 24
8676 | Rashid Shaheed | WR | age 28 | SEA | market 2683 | projected 108.7 (9.9 a week) | last 3 weeks 10.9 a week | lineup value 9.8
4035 | Alvin Kamara | RB | age 31 | NO | market 2492 | projected 99.1 (9 a week) | last 3 weeks 11.8 a week | lineup value 22.1
9753 | Zach Charbonnet | RB | age 25 | SEA | market 3164 | projected 98.4 (8.9 a week) | last 3 weeks 3.9 a week | lineup value 5.4
11559 | Michael Penix | QB | age 26 | ATL | market 3277 | projected 97.6 (8.9 a week) | last 3 weeks 11.4 a week | lineup value 0
10859 | Sam LaPorta | TE | age 25 | DET | market 4253 | projected 92.6 (8.4 a week) | last 3 weeks 12.2 a week | lineup value 46.3
12517 | Colston Loveland | TE | age 22 | CHI | market 5260 | projected 85.2 (7.7 a week) | last 3 weeks 3.2 a week | lineup value 16.2
7600 | Pat Freiermuth | TE | age 27 | PIT | market 2346 | projected 79 (7.2 a week) | last 3 weeks 6.3 a week | lineup value 0
9487 | Parker Washington | WR | age 24 | JAX | market 4015 | projected 70.5 (6.4 a week) | last 3 weeks 6.7 a week | lineup value 3
4219 | Jeremy McNichols | RB | age 30 | WAS | market 0 | projected 62.6 (5.7 a week) | last 3 weeks 4.6 a week | lineup value 0
11626 | Xavier Legette | WR | age 25 | CAR | market 0 | projected 61.7 (5.6 a week) | last 3 weeks 1.6 a week | lineup value 0
10226 | Andrei Iosivas | WR | age 27 | CIN | market 0 | projected 60.8 (5.5 a week) | last 3 weeks 0.7 a week | lineup value 0.2
6271 | Olamide Zaccheaus | WR | age 29 | ATL | market 0 | projected 58.1 (5.3 a week) | last 3 weeks 6.3 a week | lineup value 0
9494 | Marvin Mims | WR | age 24 | DEN | market 2728 | projected 54.4 (4.9 a week) | last 3 weeks 4.3 a week | lineup value 0.1

PARTNER (partnerId 3): record 2-1, rank 2, points for 598.9, contention window 1
4984 | Josh Allen | QB | age 30 | BUF | market 7608 | projected 261.4 (23.8 a week) | last 3 weeks 27.5 a week | lineup value 96.7
9221 | Jahmyr Gibbs | RB | age 24 | DET | market 6346 | projected 203.4 (18.5 a week) | last 3 weeks 20.4 a week | lineup value 106.5
421 | Matthew Stafford | QB | age 38 | LAR | market 4532 | projected 198.2 (18 a week) | last 3 weeks 17.6 a week | lineup value 33.4
4881 | Lamar Jackson | QB | age 29 | BAL | market 7630 | projected 177.6 (16.1 a week) | last 3 weeks 33.2 a week | lineup value 33.9
7588 | Javonte Williams | RB | age 26 | DAL | market 3999 | projected 163.3 (14.8 a week) | last 3 weeks 18.9 a week | lineup value 68.3
8110 | Jake Ferguson | TE | age 27 | DAL | market 3461 | projected 154.6 (14.1 a week) | last 3 weeks 21.8 a week | lineup value 54.4
8137 | George Pickens | WR | age 25 | DAL | market 4772 | projected 152.4 (13.9 a week) | last 3 weeks 13.9 a week | lineup value 57.5
8150 | Kyren Williams | RB | age 26 | LAR | market 4526 | projected 149.7 (13.6 a week) | last 3 weeks 14.4 a week | lineup value 52.9
5045 | Courtland Sutton | WR | age 31 | DEN | market 3188 | projected 129.9 (11.8 a week) | last 3 weeks 14.5 a week | lineup value 33.4
6819 | Michael Pittman | WR | age 29 | PIT | market 2993 | projected 128.4 (11.7 a week) | last 3 weeks 15.8 a week | lineup value 33.9
5872 | Deebo Samuel | WR | age 30 | SF | market 2705 | projected 120.9 (11 a week) | last 3 weeks 15 a week | lineup value 32.9
4217 | George Kittle | TE | age 33 | SF | market 3148 | projected 120.2 (10.9 a week) | last 3 weeks 5.2 a week | lineup value 48.6
8111 | Cade Otton | TE | age 27 | TB | market 2966 | projected 105.2 (9.6 a week) | last 3 weeks 2.6 a week | lineup value 10.9
4033 | David Njoku | TE | age 30 | LAC | market 2854 | projected 90.7 (8.2 a week) | last 3 weeks 10.9 a week | lineup value 9.4
4454 | Kendrick Bourne | WR | age 31 | ARI | market 0 | projected 72.9 (6.6 a week) | last 3 weeks 0 a week | lineup value 4.8
12485 | Tez Johnson | WR | age 24 | TB | market 0 | projected 71.1 (6.5 a week) | last 3 weeks 0 a week | lineup value 1
9504 | Kayshon Boutte | WR | age 24 | HOU | market 2973 | projected 67.6 (6.1 a week) | last 3 weeks 9.9 a week | lineup value 2.3
5906 | Dawson Knox | TE | age 29 | BUF | market 0 | projected 65.3 (5.9 a week) | last 3 weeks 1.8 a week | lineup value 0
7571 | Rashod Bateman | WR | age 26 | BAL | market 2482 | projected 64.6 (5.9 a week) | last 3 weeks 7.9 a week | lineup value 0
11435 | Emanuel Wilson | RB | age 27 | SEA | market 2462 | projected 59.1 (5.4 a week) | last 3 weeks 1 a week | lineup value 2.1
12495 | Ollie Gordon | RB | age 22 | MIA | market 0 | projected 46.9 (4.3 a week) | last 3 weeks 4.5 a week | lineup value 0.6
2197 | Brandin Cooks | WR | age 33 | SF | market 0 | projected 41.2 (3.7 a week) | last 3 weeks 5.2 a week | lineup value 0

PARTNER (partnerId 10): record 2-1, rank 7, points for 378.9, contention window 0.44
6768 | Tua Tagovailoa | QB | age 28 | ATL | market 3184 | projected 180.2 (16.4 a week) | last 3 weeks 14.9 a week | lineup value 118
12518 | Tyler Warren | TE | age 24 | IND | market 4571 | projected 163.8 (14.9 a week) | last 3 weeks 14.7 a week | lineup value 109.4
5859 | A.J. Brown | WR | age 29 | NE | market 4325 | projected 129.7 (11.8 a week) | last 3 weeks 10.8 a week | lineup value 74.1
5001 | Dalton Schultz | TE | age 30 | HOU | market 3155 | projected 118.7 (10.8 a week) | last 3 weeks 9.6 a week | lineup value 65.8
6790 | D'Andre Swift | RB | age 27 | CHI | market 3647 | projected 108.7 (9.9 a week) | last 3 weeks 11.1 a week | lineup value 65.2
10213 | Tre Tucker | WR | age 25 | LV | market 2703 | projected 104.5 (9.5 a week) | last 3 weeks 19.7 a week | lineup value 48.1
7049 | Jauan Jennings | WR | age 29 | MIN | market 2833 | projected 101.4 (9.2 a week) | last 3 weeks 7.8 a week | lineup value 51.7
2307 | Marcus Mariota | QB | age 32 | WAS | market 0 | projected 96 (8.7 a week) | last 3 weeks 7.1 a week | lineup value 40.4
7090 | Darnell Mooney | WR | age 28 | NYG | market 2372 | projected 87.5 (8 a week) | last 3 weeks 4.1 a week | lineup value 34.3
4039 | Cooper Kupp | WR | age 33 | SEA | market 2100 | projected 86.1 (7.8 a week) | last 3 weeks 8.2 a week | lineup value 30.5
4199 | Aaron Jones | RB | age 31 | MIN | market 2771 | projected 74.2 (6.7 a week) | last 3 weeks 6 a week | lineup value 44.4
3200 | Sterling Shepard | WR | age 33 | NYJ | market 1658 | projected 65.6 (6 a week) | last 3 weeks 4 a week | lineup value 14.5
8143 | Jerome Ford | RB | age 27 | ARI | market 0 | projected 51.4 (4.7 a week) | last 3 weeks 5.6 a week | lineup value 6.4
827 | Tyrod Taylor | QB | age 37 | GB | market 0 | projected 50.8 (4.6 a week) | last 3 weeks 6.6 a week | lineup value 26.9
12483 | Jack Bech | WR | age 23 | LV | market 2726 | projected 43.1 (3.9 a week) | last 3 weeks 1.8 a week | lineup value 7.8
8917 | KaVontae Turpin | WR | age 30 | DAL | market 1157 | projected 42.2 (3.8 a week) | last 3 weeks 8 a week | lineup value 6.2
11625 | Adonai Mitchell | WR | age 24 | NYJ | market 2993 | projected 40.9 (3.7 a week) | last 3 weeks 2.7 a week | lineup value 4.8
12469 | Dylan Sampson | RB | age 22 | CLE | market 3264 | projected 38.4 (3.5 a week) | last 3 weeks 9.5 a week | lineup value 0
10871 | Luke Schoonmaker | TE | age 28 | DAL | market 0 | projected 23.8 (2.2 a week) | last 3 weeks 0.8 a week | lineup value 3.1
6943 | Gabe Davis | WR | age 26 | FA | market 1803 | projected 23.5 (2.1 a week) | last 3 weeks 0 a week | lineup value 0
11299 | Zavier Scott | RB | age 27 | CHI | market 0 | projected 19.9 (1.8 a week) | last 3 weeks 1.7 a week | lineup value 1.9
11633 | Jamari Thrash | WR | age 25 | LV | market 2304 | projected 19.9 (1.8 a week) | last 3 weeks 1.4 a week | lineup value 0.9

PARTNER (partnerId 5): record 2-1, rank 5, points for 467, contention window 0.69
4034 | Christian McCaffrey | RB | age 30 | SF | market 4580 | projected 233.1 (21.2 a week) | last 3 weeks 23.3 a week | lineup value 200
3163 | Jared Goff | QB | age 32 | DET | market 5161 | projected 211.9 (19.3 a week) | last 3 weeks 23.5 a week | lineup value 151.1
8144 | Chris Olave | WR | age 26 | NO | market 4424 | projected 147.2 (13.4 a week) | last 3 weeks 13.2 a week | lineup value 74.3
5022 | Dallas Goedert | TE | age 31 | PHI | market 3126 | projected 132.8 (12.1 a week) | last 3 weeks 9.2 a week | lineup value 62.6
5846 | DK Metcalf | WR | age 28 | PIT | market 3446 | projected 131.4 (11.9 a week) | last 3 weeks 11.8 a week | lineup value 55.1
8126 | Wan'Dale Robinson | WR | age 25 | TEN | market 3412 | projected 124.5 (11.3 a week) | last 3 weeks 14.4 a week | lineup value 49.9
6801 | Tee Higgins | WR | age 27 | CIN | market 4127 | projected 113.8 (10.3 a week) | last 3 weeks 7.8 a week | lineup value 47.9
19 | Joe Flacco | QB | age 41 | CIN | market 0 | projected 112.9 (10.3 a week) | last 3 weeks 9.2 a week | lineup value 55.7
4983 | DJ Moore | WR | age 29 | BUF | market 3657 | projected 105.1 (9.6 a week) | last 3 weeks 10 a week | lineup value 28.8
10236 | Dalton Kincaid | TE | age 26 | BUF | market 3769 | projected 75.9 (6.9 a week) | last 3 weeks 16.3 a week | lineup value 32.6
8142 | Alec Pierce | WR | age 26 | IND | market 3417 | projected 74.3 (6.8 a week) | last 3 weeks 8.7 a week | lineup value 16.1
5857 | Noah Fant | TE | age 28 | NO | market 0 | projected 71.9 (6.5 a week) | last 3 weeks 10.7 a week | lineup value 9.2
8132 | Tyler Allgeier | RB | age 26 | ARI | market 3175 | projected 70.6 (6.4 a week) | last 3 weeks 6.3 a week | lineup value 37.7
6149 | Darius Slayton | WR | age 29 | IND | market 0 | projected 61 (5.5 a week) | last 3 weeks 5 a week | lineup value 11
1426 | DeAndre Hopkins | WR | age 33 | FA | market 1504 | projected 50.3 (4.6 a week) | last 3 weeks 9.4 a week | lineup value 0
10444 | Cedric Tillman | WR | age 26 | NO | market 0 | projected 46.7 (4.2 a week) | last 3 weeks 10.7 a week | lineup value 3.3
5849 | Kyler Murray | QB | age 29 | MIN | market 4692 | projected 38.1 (3.5 a week) | last 3 weeks 18.1 a week | lineup value 16.8
8154 | Brian Robinson | RB | age 27 | ATL | market 3129 | projected 37.2 (3.4 a week) | last 3 weeks 3.3 a week | lineup value 4.1
4082 | Curtis Samuel | WR | age 29 | FA | market 1449 | projected 21.8 (2 a week) | last 3 weeks 0 a week | lineup value 0
8129 | Dameon Pierce | RB | age 26 | PHI | market 0 | projected 0.2 (0 a week) | last 3 weeks 0.2 a week | lineup value 0
8219 | Jelani Woods | TE | age 28 | NYJ | market 1812 | projected 0.1 (0 a week) | last 3 weeks 0 a week | lineup value 0
4663 | Austin Ekeler | RB | age 31 | WAS | market 0 | projected 0 (0 a week) | last 3 weeks 4.4 a week | lineup value 0

CANDIDATE DEALS (from a rules-based finder; points are the finder projections for the rest of the season):
c1 | partnerId 4 | I give Jake Browning + Spencer Rattler (6111,11562) | I get Jeremy McNichols + Olamide Zaccheaus (4219,6271) | my points 39.1 | their points 23.2 | likelihood 0.79
c2 | partnerId 4 | I give Jake Browning (6111) | I get Jeremy McNichols + Xavier Legette (4219,11626) | my points 47.9 | their points 17.2 | likelihood 0.79
c3 | partnerId 3 | I give Spencer Rattler (11562) | I get Dawson Knox + Tez Johnson (5906,12485) | my points 58.3 | their points 9.4 | likelihood 0.8
c4 | partnerId 4 | I give Spencer Rattler (11562) | I get Olamide Zaccheaus + Xavier Legette (6271,11626) | my points 35.5 | their points 16 | likelihood 0.79
c5 | partnerId 10 | I give Spencer Rattler (11562) | I get Jerome Ford (8143) | my points 11 | their points 27 | likelihood 0.76
c6 | partnerId 5 | I give Spencer Rattler (11562) | I get Cedric Tillman (10444) | my points 11.8 | their points 7.9 | likelihood 0.77

Pick the best trades for my team.

=========== CASE 1180288364594143232-w7-r6 ===========
REPLY FILE: /Users/anik/workspace/chrome/sleeper/.eval-market/replies/suggest-v2/heldout1/1180288364594143232-w7-r6.json
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
Lineup slots: QB, RB, RB, WR, WR, WR, TE, FLEX, FLEX, FLEX, SUPER_FLEX, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN. Superflex: yes. Tight end premium: yes. Points per reception: 1.
Columns: id | name | position | age | team | market value | projected points for the rest of the regular season (and per week) | points per week over the last three weeks played | lineup value (points my lineup loses if this player is removed).

MY TEAM (partnerId me): record 4-2, rank 3, points for 943.3, contention window 0.95
11564 | Drake Maye | QB | age 24 | NE | market 8108 | projected 159.8 (20 a week) | last 3 weeks 23.9 a week | lineup value 76.8
9226 | De'Von Achane | RB | age 25 | MIA | market 4971 | projected 150.3 (18.8 a week) | last 3 weeks 21.2 a week | lineup value 91.9
7569 | Nico Collins | WR | age 27 | HOU | market 4441 | projected 111.4 (13.9 a week) | last 3 weeks 9.3 a week | lineup value 71.9
12527 | Ashton Jeanty | RB | age 22 | LV | market 5329 | projected 109.9 (13.7 a week) | last 3 weeks 21.7 a week | lineup value 51.8
7553 | Kyle Pitts | TE | age 26 | ATL | market 3965 | projected 103.9 (13 a week) | last 3 weeks 9.6 a week | lineup value 41.8
12512 | Quinshon Judkins | RB | age 22 | CLE | market 4358 | projected 97.6 (12.2 a week) | last 3 weeks 13 a week | lineup value 39.8
12522 | Cam Ward | QB | age 24 | TEN | market 4771 | projected 95.9 (12 a week) | last 3 weeks 6.5 a week | lineup value 8.8
12498 | Mason Taylor | TE | age 22 | NYJ | market 3682 | projected 81.8 (10.2 a week) | last 3 weeks 13.9 a week | lineup value 24
5967 | Tony Pollard | RB | age 29 | TEN | market 3181 | projected 61.5 (7.7 a week) | last 3 weeks 10.4 a week | lineup value 5.7
9508 | Tyjae Spears | RB | age 25 | TEN | market 2940 | projected 60.4 (7.5 a week) | last 3 weeks 3.5 a week | lineup value 6.6
7527 | Mac Jones | QB | age 28 | SF | market 1840 | projected 59.5 (7.4 a week) | last 3 weeks 12.1 a week | lineup value 11
12499 | Elic Ayomanor | WR | age 23 | TEN | market 2915 | projected 51.8 (6.5 a week) | last 3 weeks 5.3 a week | lineup value 14.2
12476 | Devin Neal | RB | age 23 | WAS | market 2785 | projected 46 (5.8 a week) | last 3 weeks 0 a week | lineup value 4.9
12524 | Shedeur Sanders | QB | age 24 | CLE | market 3454 | projected 43.9 (5.5 a week) | last 3 weeks 0 a week | lineup value 7.1
11637 | Keon Coleman | WR | age 23 | BUF | market 2735 | projected 38.9 (4.9 a week) | last 3 weeks 7 a week | lineup value 9.4
9482 | Michael Mayer | TE | age 25 | LV | market 0 | projected 38.4 (4.8 a week) | last 3 weeks 6.6 a week | lineup value 2.9
4950 | Christian Kirk | WR | age 29 | SF | market 2201 | projected 38.1 (4.8 a week) | last 3 weeks 5.1 a week | lineup value 7.3
10218 | Xavier Hutchinson | WR | age 26 | HOU | market 0 | projected 33.6 (4.2 a week) | last 3 weeks 6.8 a week | lineup value 1
12501 | Matthew Golden | WR | age 23 | GB | market 3536 | projected 33.4 (4.2 a week) | last 3 weeks 8.2 a week | lineup value 1.8
11650 | Luke McCaffrey | WR | age 25 | WAS | market 0 | projected 18.3 (2.3 a week) | last 3 weeks 8.8 a week | lineup value 0
8146 | Garrett Wilson | WR | age 26 | NYJ | market 4221 | projected 14.5 (1.8 a week) | last 3 weeks 14.5 a week | lineup value 8.3
9497 | Jalin Hyatt | WR | age 25 | NYG | market 0 | projected 11.8 (1.5 a week) | last 3 weeks 1.6 a week | lineup value 0
12507 | Omarion Hampton | RB | age 23 | LAC | market 5109 | projected 10.4 (1.3 a week) | last 3 weeks 13.5 a week | lineup value 0
8123 | Hassan Haskins | RB | age 26 | NE | market 0 | projected 8.7 (1.1 a week) | last 3 weeks 1.9 a week | lineup value 0
7562 | Tutu Atwell | WR | age 27 | LAR | market 0 | projected 7.2 (0.9 a week) | last 3 weeks 8.3 a week | lineup value 0
10235 | Roschon Johnson | RB | age 25 | CHI | market 0 | projected 1 (0.1 a week) | last 3 weeks 0.2 a week | lineup value 0
11640 | Jermaine Burton | WR | age 24 | FA | market 2046 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0
11619 | Ja'Lynn Polk | WR | age 24 | FA | market 0 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0
11583 | Jonathon Brooks | RB | age 23 | CAR | market 3587 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0
6945 | Antonio Gibson | RB | age 27 | FA | market 1427 | projected 0 (0 a week) | last 3 weeks 3.8 a week | lineup value 0

PARTNER (partnerId 12): record 1-5, rank 12, points for 659.3, contention window 0
3257 | Jacoby Brissett | QB | age 33 | ARI | market 3040 | projected 125.2 (15.7 a week) | last 3 weeks 8.2 a week | lineup value 63.6
10229 | Rashee Rice | WR | age 26 | KC | market 4423 | projected 121.7 (15.2 a week) | last 3 weeks 0 a week | lineup value 75.4
12514 | Emeka Egbuka | WR | age 24 | TB | market 4523 | projected 101.9 (12.7 a week) | last 3 weeks 18.6 a week | lineup value 55.9
12508 | Jaxson Dart | QB | age 23 | NYG | market 6831 | projected 101.5 (12.7 a week) | last 3 weeks 21.7 a week | lineup value 30.7
12493 | Oronde Gadsden | TE | age 23 | LAC | market 4204 | projected 98.3 (12.3 a week) | last 3 weeks 8.1 a week | lineup value 52
12474 | Woody Marks | RB | age 25 | HOU | market 3119 | projected 96.4 (12 a week) | last 3 weeks 10.1 a week | lineup value 43.3
9758 | C.J. Stroud | QB | age 25 | HOU | market 5066 | projected 83.6 (10.5 a week) | last 3 weeks 19.7 a week | lineup value 7.9
11603 | AJ Barner | TE | age 24 | SEA | market 3524 | projected 70.5 (8.8 a week) | last 3 weeks 18.8 a week | lineup value 22.6
12489 | RJ Harvey | RB | age 25 | DEN | market 3705 | projected 68.8 (8.6 a week) | last 3 weeks 10.8 a week | lineup value 22.5
12534 | Kyle Monangai | RB | age 24 | CHI | market 3767 | projected 64.4 (8.1 a week) | last 3 weeks 2.4 a week | lineup value 14.4
12540 | Chimere Dike | WR | age 24 | TEN | market 2875 | projected 54 (6.7 a week) | last 3 weeks 2 a week | lineup value 10.3
12502 | Gunnar Helm | TE | age 24 | TEN | market 3249 | projected 53.4 (6.7 a week) | last 3 weeks 6.1 a week | lineup value 6.9
11646 | Jalen Coker | WR | age 24 | CAR | market 3272 | projected 48.2 (6 a week) | last 3 weeks 0 a week | lineup value 7
9506 | Sean Tucker | RB | age 24 | TB | market 2750 | projected 45.2 (5.7 a week) | last 3 weeks 3.8 a week | lineup value 6.3
12519 | Luther Burden | WR | age 22 | CHI | market 4864 | projected 42.5 (5.3 a week) | last 3 weeks 3.6 a week | lineup value 1.3
10219 | Chris Rodriguez | RB | age 27 | JAX | market 2738 | projected 39 (4.9 a week) | last 3 weeks 2.2 a week | lineup value 3
11623 | Jordan Whittington | WR | age 26 | LAR | market 0 | projected 32.2 (4 a week) | last 3 weeks 4.1 a week | lineup value 2.2
11630 | Roman Wilson | WR | age 25 | PIT | market 0 | projected 32.2 (4 a week) | last 3 weeks 0.7 a week | lineup value 0.1
3161 | Carson Wentz | QB | age 33 | MIN | market 0 | projected 31.8 (4 a week) | last 3 weeks 13.6 a week | lineup value 0
12536 | Jaylin Noel | WR | age 24 | HOU | market 2766 | projected 30.1 (3.8 a week) | last 3 weeks 3.6 a week | lineup value 2.8
11584 | Bucky Irving | RB | age 24 | TB | market 4281 | projected 29.2 (3.6 a week) | last 3 weeks 8.2 a week | lineup value 11.2
10214 | Davis Allen | TE | age 25 | LAR | market 0 | projected 22.3 (2.8 a week) | last 3 weeks 2.8 a week | lineup value 0

PARTNER (partnerId 10): record 2-4, rank 10, points for 713.1, contention window 0.05
6768 | Tua Tagovailoa | QB | age 28 | ATL | market 3185 | projected 126.1 (15.8 a week) | last 3 weeks 18.7 a week | lineup value 73.1
12518 | Tyler Warren | TE | age 24 | IND | market 4572 | projected 113.8 (14.2 a week) | last 3 weeks 20.8 a week | lineup value 75.2
5001 | Dalton Schultz | TE | age 30 | HOU | market 3154 | projected 98.3 (12.3 a week) | last 3 weeks 8.8 a week | lineup value 58
5859 | A.J. Brown | WR | age 29 | NE | market 4324 | projected 87.9 (11 a week) | last 3 weeks 8.7 a week | lineup value 48.1
6790 | D'Andre Swift | RB | age 27 | CHI | market 3648 | projected 83.8 (10.5 a week) | last 3 weeks 13.8 a week | lineup value 48.2
7090 | Darnell Mooney | WR | age 28 | NYG | market 2373 | projected 77.6 (9.7 a week) | last 3 weeks 0.8 a week | lineup value 33.6
2307 | Marcus Mariota | QB | age 32 | WAS | market 0 | projected 76.9 (9.6 a week) | last 3 weeks 6.7 a week | lineup value 30.5
7049 | Jauan Jennings | WR | age 29 | MIN | market 2832 | projected 76.3 (9.5 a week) | last 3 weeks 2.7 a week | lineup value 38.9
10213 | Tre Tucker | WR | age 25 | LV | market 2704 | projected 74.4 (9.3 a week) | last 3 weeks 9.1 a week | lineup value 33.8
4199 | Aaron Jones | RB | age 31 | MIN | market 2770 | projected 74.2 (9.3 a week) | last 3 weeks 0 a week | lineup value 44.4
4039 | Cooper Kupp | WR | age 33 | SEA | market 2099 | projected 53.6 (6.7 a week) | last 3 weeks 10.2 a week | lineup value 13.7
827 | Tyrod Taylor | QB | age 37 | GB | market 0 | projected 50.8 (6.3 a week) | last 3 weeks 0 a week | lineup value 26.9
3200 | Sterling Shepard | WR | age 33 | NYJ | market 1659 | projected 41.4 (5.2 a week) | last 3 weeks 7.7 a week | lineup value 5.1
8143 | Jerome Ford | RB | age 27 | ARI | market 0 | projected 36.3 (4.5 a week) | last 3 weeks 5 a week | lineup value 2.1
8917 | KaVontae Turpin | WR | age 30 | DAL | market 1156 | projected 33 (4.1 a week) | last 3 weeks 2.1 a week | lineup value 6.2
11625 | Adonai Mitchell | WR | age 24 | NYJ | market 2994 | projected 32 (4 a week) | last 3 weeks 3.2 a week | lineup value 4.8
12483 | Jack Bech | WR | age 23 | LV | market 2724 | projected 30.9 (3.9 a week) | last 3 weeks 1.9 a week | lineup value 5
12469 | Dylan Sampson | RB | age 22 | CLE | market 3255 | projected 27.9 (3.5 a week) | last 3 weeks 1.8 a week | lineup value 0
6943 | Gabe Davis | WR | age 26 | FA | market 1803 | projected 23.5 (2.9 a week) | last 3 weeks 0 a week | lineup value 0
7083 | Tyler Huntley | QB | age 28 | BAL | market 0 | projected 15.7 (2 a week) | last 3 weeks 2.2 a week | lineup value 0
11577 | Will Shipley | RB | age 24 | PHI | market 0 | projected 12.5 (1.6 a week) | last 3 weeks 0.5 a week | lineup value 0
10871 | Luke Schoonmaker | TE | age 28 | DAL | market 0 | projected 11.7 (1.5 a week) | last 3 weeks 3 a week | lineup value 0.9

PARTNER (partnerId 8): record 3-3, rank 8, points for 815.6, contention window 0.31
3294 | Dak Prescott | QB | age 33 | DAL | market 5435 | projected 161 (20.1 a week) | last 3 weeks 33.5 a week | lineup value 122.2
8130 | Trey McBride | TE | age 26 | ARI | market 4893 | projected 156.8 (19.6 a week) | last 3 weeks 19.2 a week | lineup value 108.4
8228 | Jaylen Warren | RB | age 27 | PIT | market 3520 | projected 109.1 (13.6 a week) | last 3 weeks 2.8 a week | lineup value 51.7
7543 | Travis Etienne | RB | age 27 | NO | market 3808 | projected 89.5 (11.2 a week) | last 3 weeks 12.6 a week | lineup value 40.2
8134 | Khalil Shakir | WR | age 26 | BUF | market 3142 | projected 85.9 (10.7 a week) | last 3 weeks 11.7 a week | lineup value 35.8
9756 | Jordan Addison | WR | age 24 | MIN | market 3615 | projected 85.3 (10.7 a week) | last 3 weeks 10.2 a week | lineup value 27.9
8121 | Romeo Doubs | WR | age 26 | NE | market 3164 | projected 84.7 (10.6 a week) | last 3 weeks 13.4 a week | lineup value 27.3
12533 | Jacory Croskey-Merritt | RB | age 25 | WAS | market 3223 | projected 67.7 (8.5 a week) | last 3 weeks 12.8 a week | lineup value 22
11655 | Tyrone Tracy | RB | age 26 | NYG | market 2968 | projected 64.2 (8 a week) | last 3 weeks 0.2 a week | lineup value 19.8
11627 | Troy Franklin | WR | age 23 | DEN | market 3035 | projected 63.8 (8 a week) | last 3 weeks 6.7 a week | lineup value 15.9
1166 | Kirk Cousins | QB | age 38 | LV | market 2313 | projected 63.4 (7.9 a week) | last 3 weeks 0 a week | lineup value 24.6
12490 | Bhayshul Tuten | RB | age 23 | JAX | market 4199 | projected 46.1 (5.8 a week) | last 3 weeks 3.4 a week | lineup value 0
9481 | Luke Musgrave | TE | age 26 | GB | market 0 | projected 45.5 (5.7 a week) | last 3 weeks 1.6 a week | lineup value 9.2
7594 | Chuba Hubbard | RB | age 27 | CAR | market 3331 | projected 42.6 (5.3 a week) | last 3 weeks 3.3 a week | lineup value 4.4
7611 | Rhamondre Stevenson | RB | age 28 | NE | market 3315 | projected 39.8 (5 a week) | last 3 weeks 6.9 a week | lineup value 8.2
6826 | Cole Kmet | TE | age 27 | CHI | market 0 | projected 34.8 (4.3 a week) | last 3 weeks 3.9 a week | lineup value 0
12641 | Jaylin Lane | WR | age 24 | WAS | market 0 | projected 32.1 (4 a week) | last 3 weeks 3.3 a week | lineup value 0.5
8205 | Isiah Pacheco | RB | age 27 | DET | market 2539 | projected 30.5 (3.8 a week) | last 3 weeks 9.2 a week | lineup value 1.8
4037 | Chris Godwin | WR | age 30 | TB | market 3092 | projected 26.9 (3.4 a week) | last 3 weeks 3.7 a week | lineup value 4.8
3271 | Tyler Higbee | TE | age 33 | LAR | market 0 | projected 25.9 (3.2 a week) | last 3 weeks 7.7 a week | lineup value 1.4
4993 | Mike Gesicki | TE | age 31 | CIN | market 1199 | projected 25.1 (3.1 a week) | last 3 weeks 2.5 a week | lineup value 2.3
12503 | Isaiah Bond | WR | age 22 | CLE | market 0 | projected 23.6 (2.9 a week) | last 3 weeks 5.5 a week | lineup value 0

PARTNER (partnerId 11): record 3-3, rank 7, points for 883.6, contention window 0.44
6813 | Jonathan Taylor | RB | age 27 | IND | market 4991 | projected 152.7 (19.1 a week) | last 3 weeks 23.3 a week | lineup value 137.2
11563 | Bo Nix | QB | age 26 | DEN | market 6255 | projected 148.8 (18.6 a week) | last 3 weeks 21.7 a week | lineup value 64.2
1373 | Geno Smith | QB | age 36 | NYJ | market 2742 | projected 123.9 (15.5 a week) | last 3 weeks 10.1 a week | lineup value 32
11604 | Brock Bowers | TE | age 23 | LV | market 5549 | projected 123.3 (15.4 a week) | last 3 weeks 4.5 a week | lineup value 84.4
12526 | Tetairoa McMillan | WR | age 23 | CAR | market 4732 | projected 94.3 (11.8 a week) | last 3 weeks 13.8 a week | lineup value 52.2
12529 | TreVeyon Henderson | RB | age 23 | NE | market 4312 | projected 90 (11.2 a week) | last 3 weeks 7.3 a week | lineup value 74
12506 | Harold Fannin | TE | age 22 | CLE | market 4713 | projected 89.3 (11.2 a week) | last 3 weeks 13.6 a week | lineup value 48
7002 | Juwan Johnson | TE | age 30 | NO | market 3123 | projected 89 (11.1 a week) | last 3 weeks 5.1 a week | lineup value 47.1
11565 | J.J. McCarthy | QB | age 23 | NYG | market 3631 | projected 88.6 (11.1 a week) | last 3 weeks 0 a week | lineup value 9.5
11620 | Rome Odunze | WR | age 24 | CHI | market 4060 | projected 88.6 (11.1 a week) | last 3 weeks 7.4 a week | lineup value 46.6
11597 | Theo Johnson | TE | age 25 | NYG | market 3218 | projected 78.7 (9.8 a week) | last 3 weeks 15 a week | lineup value 36.6
12484 | Jayden Higgins | WR | age 23 | HOU | market 3448 | projected 52.8 (6.6 a week) | last 3 weeks 5.5 a week | lineup value 11.6
11834 | Devaughn Vele | WR | age 28 | NO | market 2277 | projected 38 (4.8 a week) | last 3 weeks 1.1 a week | lineup value 4.7
8180 | Jalen Nailor | WR | age 27 | LV | market 2613 | projected 37.6 (4.7 a week) | last 3 weeks 5.5 a week | lineup value 0
12521 | Elijah Arroyo | TE | age 23 | SEA | market 0 | projected 37.4 (4.7 a week) | last 3 weeks 4.3 a week | lineup value 0.4
12492 | Pat Bryant | WR | age 23 | DEN | market 3017 | projected 34.6 (4.3 a week) | last 3 weeks 1.4 a week | lineup value 2.7
9486 | Dontayvion Wicks | WR | age 25 | PHI | market 2557 | projected 32 (4 a week) | last 3 weeks 2.5 a week | lineup value 0.2
7587 | Dyami Brown | WR | age 26 | WAS | market 0 | projected 28.8 (3.6 a week) | last 3 weeks 2.5 a week | lineup value 3.1
12481 | Cam Skattebo | RB | age 24 | NYG | market 4187 | projected 28.5 (3.6 a week) | last 3 weeks 19.1 a week | lineup value 19.6
12541 | Dont'e Thornton | WR | age 23 | LV | market 0 | projected 15.5 (1.9 a week) | last 3 weeks 0 a week | lineup value 0
12504 | Kaleb Johnson | RB | age 23 | GB | market 2716 | projected 10.7 (1.3 a week) | last 3 weeks 1.2 a week | lineup value 0.6
12543 | Tahj Brooks | RB | age 24 | CIN | market 0 | projected 9.1 (1.1 a week) | last 3 weeks 0 a week | lineup value 2

CANDIDATE DEALS (from a rules-based finder; points are the finder projections for the rest of the season):
c1 | partnerId 12 | I give Jermaine Burton + Braelon Allen (11640,11576) | I get Jacoby Brissett + Chimere Dike (3257,12540) | my points 44.7 | their points -73.9 | likelihood 0.89
c2 | partnerId 10 | I give Jermaine Burton + Jonathon Brooks (11640,11583) | I get Tua Tagovailoa + Jauan Jennings (6768,7049) | my points 53.7 | their points -113.5 | likelihood 0.94
c3 | partnerId 10 | I give Jonathon Brooks (11583) | I get Tua Tagovailoa + Dalton Schultz (6768,5001) | my points 49.1 | their points -132.9 | likelihood 0.94
c4 | partnerId 12 | I give Jermaine Burton + Jonathon Brooks (11640,11583) | I get Jacoby Brissett + Woody Marks (3257,12474) | my points 53.6 | their points -108.6 | likelihood 0.95
c5 | partnerId 10 | I give Jonathon Brooks + Antonio Gibson (11583,6945) | I get Tua Tagovailoa + Tre Tucker (6768,10213) | my points 53.4 | their points -109.1 | likelihood 0.94
c6 | partnerId 8 | I give Luke McCaffrey + Jonathon Brooks (11650,11583) | I get Khalil Shakir + Romeo Doubs (8134,8121) | my points 61.8 | their points -71.2 | likelihood 0.81
c7 | partnerId 8 | I give Jermaine Burton + Jonathon Brooks (11640,11583) | I get Khalil Shakir (8134) | my points 40.1 | their points -35.8 | likelihood 0.88
c8 | partnerId 11 | I give Omarion Hampton + Matthew Golden (12507,12501) | I get Tetairoa McMillan + J.J. McCarthy (12526,11565) | my points 66.7 | their points -44.3 | likelihood 0.6
c9 | partnerId 8 | I give Jonathon Brooks (11583) | I get Romeo Doubs (8121) | my points 29.6 | their points -27.3 | likelihood 0.88
c10 | partnerId 11 | I give Omarion Hampton + Luke McCaffrey (12507,11650) | I get Tetairoa McMillan (12526) | my points 45.7 | their points -39.8 | likelihood 0.62

Pick the best trades for my team.

=========== CASE 1180314694791503872-w7-r7 ===========
REPLY FILE: /Users/anik/workspace/chrome/sleeper/.eval-market/replies/suggest-v2/heldout1/1180314694791503872-w7-r7.json
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
Lineup slots: QB, RB, RB, WR, WR, WR, TE, FLEX, FLEX, SUPER_FLEX, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN. Superflex: yes. Tight end premium: yes. Points per reception: 1.
Columns: id | name | position | age | team | market value | projected points for the rest of the regular season (and per week) | points per week over the last three weeks played | lineup value (points my lineup loses if this player is removed).

MY TEAM (partnerId me): record 2-4, rank 11, points for 678.4, contention window 0
6768 | Tua Tagovailoa | QB | age 28 | ATL | market 3315 | projected 131.3 (16.4 a week) | last 3 weeks 19.7 a week | lineup value 46.5
1373 | Geno Smith | QB | age 36 | NYJ | market 2871 | projected 129.8 (16.2 a week) | last 3 weeks 12.1 a week | lineup value 51.6
10229 | Rashee Rice | WR | age 26 | KC | market 4420 | projected 121.7 (15.2 a week) | last 3 weeks 0 a week | lineup value 64.3
7569 | Nico Collins | WR | age 27 | HOU | market 4438 | projected 111.4 (13.9 a week) | last 3 weeks 9.3 a week | lineup value 57.9
6819 | Michael Pittman | WR | age 29 | PIT | market 2991 | projected 91 (11.4 a week) | last 3 weeks 11.3 a week | lineup value 38.5
12529 | TreVeyon Henderson | RB | age 23 | NE | market 4309 | projected 90 (11.2 a week) | last 3 weeks 7.3 a week | lineup value 38.2
9758 | C.J. Stroud | QB | age 25 | HOU | market 5277 | projected 87.2 (10.9 a week) | last 3 weeks 19.7 a week | lineup value 12.7
5844 | T.J. Hockenson | TE | age 29 | MIN | market 2962 | projected 82 (10.2 a week) | last 3 weeks 7.6 a week | lineup value 28.5
5967 | Tony Pollard | RB | age 29 | TEN | market 3179 | projected 61.5 (7.7 a week) | last 3 weeks 10.4 a week | lineup value 6.4
9508 | Tyjae Spears | RB | age 25 | TEN | market 2938 | projected 60.4 (7.5 a week) | last 3 weeks 3.5 a week | lineup value 8.1
8210 | Chig Okonkwo | TE | age 27 | WAS | market 3054 | projected 54.7 (6.8 a week) | last 3 weeks 8.8 a week | lineup value 2.8
12540 | Chimere Dike | WR | age 24 | TEN | market 2873 | projected 54 (6.7 a week) | last 3 weeks 2 a week | lineup value 2.3
12499 | Elic Ayomanor | WR | age 23 | TEN | market 2913 | projected 51.8 (6.5 a week) | last 3 weeks 5.3 a week | lineup value 5
11628 | Marvin Harrison | WR | age 24 | HOU | market 3929 | projected 50.4 (6.3 a week) | last 3 weeks 12.5 a week | lineup value 20.9
12519 | Luther Burden | WR | age 22 | CHI | market 4861 | projected 42.5 (5.3 a week) | last 3 weeks 3.6 a week | lineup value 1.5
7611 | Rhamondre Stevenson | RB | age 28 | NE | market 3312 | projected 39.8 (5 a week) | last 3 weeks 6.9 a week | lineup value 7.8
8143 | Jerome Ford | RB | age 27 | ARI | market 0 | projected 36.3 (4.5 a week) | last 3 weeks 5 a week | lineup value 2.6
2374 | Tyler Lockett | WR | age 33 | FA | market 2520 | projected 36.2 (4.5 a week) | last 3 weeks 2.9 a week | lineup value 1.4
9511 | Keaton Mitchell | RB | age 24 | LAC | market 2840 | projected 29 (3.6 a week) | last 3 weeks 0.8 a week | lineup value 0.7
4993 | Mike Gesicki | TE | age 31 | CIN | market 1199 | projected 23.1 (2.9 a week) | last 3 weeks 2.3 a week | lineup value 0.3
12541 | Dont'e Thornton | WR | age 23 | LV | market 0 | projected 15.5 (1.9 a week) | last 3 weeks 0 a week | lineup value 0
1689 | Adam Thielen | WR | age 35 | FA | market 2186 | projected 12.1 (1.5 a week) | last 3 weeks 1 a week | lineup value 0
12457 | Jaydon Blue | RB | age 22 | PHI | market 2731 | projected 7.1 (0.9 a week) | last 3 weeks 0.2 a week | lineup value 0
10235 | Roschon Johnson | RB | age 25 | CHI | market 0 | projected 1 (0.1 a week) | last 3 weeks 0.2 a week | lineup value 0
11589 | Trey Benson | RB | age 24 | ARI | market 3171 | projected 0 (0 a week) | last 3 weeks 3.5 a week | lineup value 0
5955 | Hunter Renfrow | WR | age 30 | FA | market 1328 | projected 0 (0 a week) | last 3 weeks 1.1 a week | lineup value 0

PARTNER (partnerId 6): record 4-2, rank 1, points for 972.5, contention window 1
11564 | Drake Maye | QB | age 24 | NE | market 8371 | projected 165.1 (20.6 a week) | last 3 weeks 23.9 a week | lineup value 125.3
9509 | Bijan Robinson | RB | age 24 | ATL | market 6348 | projected 163.4 (20.4 a week) | last 3 weeks 21 a week | lineup value 93.6
6794 | Justin Jefferson | WR | age 27 | MIN | market 4829 | projected 124 (15.5 a week) | last 3 weeks 14 a week | lineup value 57.3
4866 | Saquon Barkley | RB | age 29 | PHI | market 4207 | projected 113.1 (14.1 a week) | last 3 weeks 14.6 a week | lineup value 50.3
12518 | Tyler Warren | TE | age 24 | IND | market 4569 | projected 105.3 (13.2 a week) | last 3 weeks 19.5 a week | lineup value 42.3
9997 | Zay Flowers | WR | age 26 | BAL | market 4186 | projected 103 (12.9 a week) | last 3 weeks 11.4 a week | lineup value 43.7
8110 | Jake Ferguson | TE | age 27 | DAL | market 3457 | projected 95.1 (11.9 a week) | last 3 weeks 20.6 a week | lineup value 32.6
9754 | Quentin Johnston | WR | age 25 | LAC | market 3412 | projected 79.8 (10 a week) | last 3 weeks 9.9 a week | lineup value 20.6
7591 | Justin Fields | QB | age 27 | KC | market 2007 | projected 78 (9.7 a week) | last 3 weeks 21 a week | lineup value 38.3
6783 | Jerry Jeudy | WR | age 27 | CLE | market 2700 | projected 61.6 (7.7 a week) | last 3 weeks 6.9 a week | lineup value 2.8
8167 | Christian Watson | WR | age 27 | GB | market 3669 | projected 60.4 (7.5 a week) | last 3 weeks 0 a week | lineup value 9.7
8125 | Calvin Austin | WR | age 27 | NYG | market 0 | projected 55.7 (7 a week) | last 3 weeks 1.1 a week | lineup value 2.9
6806 | J.K. Dobbins | RB | age 27 | DEN | market 3282 | projected 50.8 (6.4 a week) | last 3 weeks 10.3 a week | lineup value 12.6
11571 | Isaiah Davis | RB | age 24 | NYJ | market 0 | projected 45.6 (5.7 a week) | last 3 weeks 4 a week | lineup value 0
7594 | Chuba Hubbard | RB | age 27 | CAR | market 3328 | projected 42.6 (5.3 a week) | last 3 weeks 3.3 a week | lineup value 0
9481 | Luke Musgrave | TE | age 26 | GB | market 0 | projected 41.8 (5.2 a week) | last 3 weeks 1.4 a week | lineup value 0
4381 | Taysom Hill | TE | age 35 | FA | market 1532 | projected 39.3 (4.9 a week) | last 3 weeks 2.3 a week | lineup value 0
9482 | Michael Mayer | TE | age 25 | LV | market 0 | projected 35.2 (4.4 a week) | last 3 weeks 6.2 a week | lineup value 0
9494 | Marvin Mims | WR | age 24 | DEN | market 2723 | projected 32.6 (4.1 a week) | last 3 weeks 9.4 a week | lineup value 0
11638 | Ricky Pearsall | WR | age 26 | SF | market 2210 | projected 31.2 (3.9 a week) | last 3 weeks 2.9 a week | lineup value 7.2
11584 | Bucky Irving | RB | age 24 | TB | market 4278 | projected 29.2 (3.6 a week) | last 3 weeks 8.2 a week | lineup value 12
12503 | Isaiah Bond | WR | age 22 | CLE | market 0 | projected 23.6 (2.9 a week) | last 3 weeks 5.5 a week | lineup value 0

PARTNER (partnerId 1): record 4-2, rank 2, points for 923.9, contention window 1
9221 | Jahmyr Gibbs | RB | age 24 | DET | market 6340 | projected 145.9 (18.2 a week) | last 3 weeks 14 a week | lineup value 69.3
7523 | Trevor Lawrence | QB | age 27 | JAX | market 6054 | projected 132.6 (16.6 a week) | last 3 weeks 21.7 a week | lineup value 31
3257 | Jacoby Brissett | QB | age 33 | ARI | market 3147 | projected 129.7 (16.2 a week) | last 3 weeks 8.6 a week | lineup value 28.1
5850 | Josh Jacobs | RB | age 28 | GB | market 4016 | projected 126.4 (15.8 a week) | last 3 weeks 21.2 a week | lineup value 48.7
9493 | Puka Nacua | WR | age 25 | LAR | market 5698 | projected 123.9 (15.5 a week) | last 3 weeks 21.8 a week | lineup value 68.4
12522 | Cam Ward | QB | age 24 | TEN | market 5025 | projected 101.1 (12.6 a week) | last 3 weeks 7.5 a week | lineup value 16.7
2449 | Stefon Diggs | WR | age 32 | WAS | market 2785 | projected 99.1 (12.4 a week) | last 3 weeks 15.5 a week | lineup value 33.6
1466 | Travis Kelce | TE | age 37 | KC | market 2865 | projected 95.1 (11.9 a week) | last 3 weeks 17.2 a week | lineup value 22.9
11647 | Kimani Vidal | RB | age 25 | LAC | market 2786 | projected 91.8 (11.5 a week) | last 3 weeks 7.6 a week | lineup value 15.7
1339 | Zach Ertz | TE | age 35 | PHI | market 0 | projected 86.2 (10.8 a week) | last 3 weeks 8.5 a week | lineup value 11
8121 | Romeo Doubs | WR | age 26 | NE | market 3162 | projected 84.7 (10.6 a week) | last 3 weeks 13.4 a week | lineup value 11.9
1479 | Keenan Allen | WR | age 34 | IND | market 2139 | projected 84.6 (10.6 a week) | last 3 weeks 8.4 a week | lineup value 16
6790 | D'Andre Swift | RB | age 27 | CHI | market 3645 | projected 83.8 (10.5 a week) | last 3 weeks 13.8 a week | lineup value 10.8
4098 | Kareem Hunt | RB | age 30 | FA | market 1799 | projected 67.1 (8.4 a week) | last 3 weeks 9.6 a week | lineup value 6
12534 | Kyle Monangai | RB | age 24 | CHI | market 3764 | projected 64.4 (8.1 a week) | last 3 weeks 2.4 a week | lineup value 3.5
4033 | David Njoku | TE | age 30 | LAC | market 2850 | projected 50.5 (6.3 a week) | last 3 weeks 11 a week | lineup value 4.5
6271 | Olamide Zaccheaus | WR | age 29 | ATL | market 0 | projected 47 (5.9 a week) | last 3 weeks 4.6 a week | lineup value 0
12524 | Shedeur Sanders | QB | age 24 | CLE | market 3644 | projected 46.3 (5.8 a week) | last 3 weeks 0 a week | lineup value 0
10218 | Xavier Hutchinson | WR | age 26 | HOU | market 0 | projected 33.6 (4.2 a week) | last 3 weeks 6.8 a week | lineup value 0
12501 | Matthew Golden | WR | age 23 | GB | market 3534 | projected 33.4 (4.2 a week) | last 3 weeks 8.2 a week | lineup value 0
12495 | Ollie Gordon | RB | age 22 | MIA | market 0 | projected 30.3 (3.8 a week) | last 3 weeks 0.7 a week | lineup value 0
2505 | Darren Waller | TE | age 34 | CAR | market 1416 | projected 30.3 (3.8 a week) | last 3 weeks 16.9 a week | lineup value 0

PARTNER (partnerId 12): record 4-2, rank 4, points for 889.2, contention window 0.82
6797 | Justin Herbert | QB | age 28 | LAC | market 6436 | projected 161.7 (20.2 a week) | last 3 weeks 19 a week | lineup value 103.9
9226 | De'Von Achane | RB | age 25 | MIA | market 4967 | projected 150.3 (18.8 a week) | last 3 weeks 21.2 a week | lineup value 129.2
8130 | Trey McBride | TE | age 26 | ARI | market 4890 | projected 144.4 (18 a week) | last 3 weeks 17.5 a week | lineup value 72.6
12514 | Emeka Egbuka | WR | age 24 | TB | market 4520 | projected 101.9 (12.7 a week) | last 3 weeks 18.6 a week | lineup value 52.8
5022 | Dallas Goedert | TE | age 31 | PHI | market 3126 | projected 89.9 (11.2 a week) | last 3 weeks 21.5 a week | lineup value 18.5
12545 | Tyler Shough | QB | age 27 | NO | market 5037 | projected 86.8 (10.8 a week) | last 3 weeks 0 a week | lineup value 28.9
3214 | Hunter Henry | TE | age 31 | NE | market 3148 | projected 83 (10.4 a week) | last 3 weeks 9.2 a week | lineup value 10.1
5012 | Mark Andrews | TE | age 31 | BAL | market 3102 | projected 78.9 (9.9 a week) | last 3 weeks 9.1 a week | lineup value 7.1
10213 | Tre Tucker | WR | age 25 | LV | market 2702 | projected 74.4 (9.3 a week) | last 3 weeks 9.1 a week | lineup value 19.9
4144 | Jonnu Smith | TE | age 31 | GB | market 0 | projected 73.1 (9.1 a week) | last 3 weeks 3.6 a week | lineup value 0.2
5947 | Jakobi Meyers | WR | age 29 | JAX | market 3300 | projected 65.8 (8.2 a week) | last 3 weeks 7.4 a week | lineup value 16.4
8112 | Drake London | WR | age 25 | ATL | market 4869 | projected 64.8 (8.1 a week) | last 3 weeks 18.9 a week | lineup value 34.7
9506 | Sean Tucker | RB | age 24 | TB | market 2748 | projected 45.2 (5.7 a week) | last 3 weeks 3.8 a week | lineup value 23
9484 | Tucker Kraft | TE | age 25 | GB | market 4153 | projected 42.7 (5.3 a week) | last 3 weeks 8.8 a week | lineup value 10.1
6770 | Joe Burrow | QB | age 29 | CIN | market 7060 | projected 41.6 (5.2 a week) | last 3 weeks 0 a week | lineup value 5.8
11834 | Devaughn Vele | WR | age 28 | NO | market 2276 | projected 38 (4.8 a week) | last 3 weeks 1.1 a week | lineup value 1.2
9486 | Dontayvion Wicks | WR | age 25 | PHI | market 2555 | projected 32 (4 a week) | last 3 weeks 2.5 a week | lineup value 0
2749 | Raheem Mostert | RB | age 33 | FA | market 1166 | projected 26.6 (3.3 a week) | last 3 weeks 3.4 a week | lineup value 3.8
12535 | Isaac TeSlaa | WR | age 24 | DET | market 2793 | projected 25.3 (3.2 a week) | last 3 weeks 2.7 a week | lineup value 0
12523 | Jimmy Horn | WR | age 24 | CLE | market 0 | projected 19.7 (2.5 a week) | last 3 weeks 3.9 a week | lineup value 2.9
12543 | Tahj Brooks | RB | age 24 | CIN | market 0 | projected 9.1 (1.1 a week) | last 3 weeks 0 a week | lineup value 0
10222 | Jayden Reed | WR | age 26 | GB | market 3361 | projected 7.1 (0.9 a week) | last 3 weeks 0 a week | lineup value 0

CANDIDATE DEALS (from a rules-based finder; points are the finder projections for the rest of the season):
c1 | partnerId 6 | I give Geno Smith + Michael Pittman (1373,6819) | I get MarShawn Lloyd (11581) | my points -91.1 | their points 69.6 | likelihood 0.7
c2 | partnerId 6 | I give Rashee Rice + Nico Collins (10229,7569) | I get Malik Nabers (11632) | my points -126.5 | their points 89.2 | likelihood 0.66
c3 | partnerId 6 | I give Geno Smith + Nico Collins (1373,7569) | I get Malik Nabers + Joe Mixon (11632,4018) | my points -110.9 | their points 93.6 | likelihood 0.65
c4 | partnerId 6 | I give Rashee Rice + Tua Tagovailoa (10229,6768) | I get Malik Nabers + Kendre Miller (11632,9757) | my points -111.3 | their points 91.7 | likelihood 0.65
c5 | partnerId 1 | I give Tua Tagovailoa + Michael Pittman (6768,6819) | I get Matthew Golden + Xavier Hutchinson (12501,10218) | my points -82.2 | their points 32.8 | likelihood 0.71
c6 | partnerId 12 | I give Geno Smith + Tua Tagovailoa (1373,6768) | I get Jarquez Hunter + Jonathon Brooks (11569,11583) | my points -141.4 | their points 39.7 | likelihood 0.6
c7 | partnerId 1 | I give Tua Tagovailoa + Geno Smith (6768,1373) | I get Miles Sanders + Matthew Golden (6151,12501) | my points -140.1 | their points 21.7 | likelihood 0.55

Pick the best trades for my team.

=========== CASE 1180319245030821888-w10-r4 ===========
REPLY FILE: /Users/anik/workspace/chrome/sleeper/.eval-market/replies/suggest-v2/heldout1/1180319245030821888-w10-r4.json
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
League: keeper, 10 teams, week 10, 4 regular season weeks left, playoffs start week 14
Lineup slots: QB, RB, RB, WR, WR, TE, FLEX, FLEX, BN, BN, BN, BN, BN, BN. Superflex: no. Tight end premium: yes. Points per reception: 1.
Columns: id | name | position | age | team | market value | projected points for the rest of the regular season (and per week) | points per week over the last three weeks played | lineup value (points my lineup loses if this player is removed).

MY TEAM (partnerId me): record 6-3, rank 3, points for 1061.5, contention window 0.89
9488 | Jaxon Smith-Njigba | WR | age 24 | SEA | market 5794 | projected 85.2 (21.3 a week) | last 3 weeks 16.1 a week | lineup value 60.8
3163 | Jared Goff | QB | age 32 | DET | market 3078 | projected 73.1 (18.3 a week) | last 3 weeks 10.2 a week | lineup value 39.8
3198 | Derrick Henry | RB | age 32 | BAL | market 4139 | projected 67.5 (16.9 a week) | last 3 weeks 10.7 a week | lineup value 47.7
6786 | CeeDee Lamb | WR | age 27 | DAL | market 4920 | projected 57.6 (14.4 a week) | last 3 weeks 17.7 a week | lineup value 35.6
8134 | Khalil Shakir | WR | age 26 | BUF | market 3141 | projected 49.3 (12.3 a week) | last 3 weeks 11 a week | lineup value 24.9
9224 | Chase Brown | RB | age 26 | CIN | market 4509 | projected 48.1 (12 a week) | last 3 weeks 18.9 a week | lineup value 30.7
8110 | Jake Ferguson | TE | age 27 | DAL | market 3463 | projected 40.2 (10 a week) | last 3 weeks 12 a week | lineup value 40.2
5045 | Courtland Sutton | WR | age 31 | DEN | market 3185 | projected 38 (9.5 a week) | last 3 weeks 12.5 a week | lineup value 22.2
7591 | Justin Fields | QB | age 27 | KC | market 1247 | projected 33.2 (8.3 a week) | last 3 weeks 8.3 a week | lineup value 0
9500 | Josh Downs | WR | age 25 | IND | market 3347 | projected 28.8 (7.2 a week) | last 3 weeks 9.5 a week | lineup value 8.5
7594 | Chuba Hubbard | RB | age 27 | CAR | market 3365 | projected 16.1 (4 a week) | last 3 weeks 6.2 a week | lineup value 3
4037 | Chris Godwin | WR | age 30 | TB | market 3096 | projected 16 (4 a week) | last 3 weeks 0 a week | lineup value 0
8154 | Brian Robinson | RB | age 27 | ATL | market 3193 | projected 14.6 (3.7 a week) | last 3 weeks 5 a week | lineup value 0
8205 | Isiah Pacheco | RB | age 27 | DET | market 2551 | projected 8.1 (2 a week) | last 3 weeks 6.1 a week | lineup value 0

PARTNER (partnerId 8): record 4-5, rank 7, points for 891.3, contention window 0.27
9221 | Jahmyr Gibbs | RB | age 24 | DET | market 6370 | projected 84.6 (21.1 a week) | last 3 weeks 14.5 a week | lineup value 61.3
4217 | George Kittle | TE | age 33 | SF | market 3144 | projected 62.9 (15.7 a week) | last 3 weeks 8.4 a week | lineup value 36.4
5870 | Daniel Jones | QB | age 29 | IND | market 2579 | projected 55 (13.7 a week) | last 3 weeks 20.8 a week | lineup value 37.3
6790 | D'Andre Swift | RB | age 27 | CHI | market 3666 | projected 49.5 (12.4 a week) | last 3 weeks 12 a week | lineup value 26.2
8148 | Jameson Williams | WR | age 25 | DET | market 4093 | projected 48.7 (12.2 a week) | last 3 weeks 5.5 a week | lineup value 11.5
8144 | Chris Olave | WR | age 26 | NO | market 4420 | projected 47.5 (11.9 a week) | last 3 weeks 16.5 a week | lineup value 17.5
1466 | Travis Kelce | TE | age 37 | KC | market 2865 | projected 42.6 (10.7 a week) | last 3 weeks 16.5 a week | lineup value 16.1
6819 | Michael Pittman | WR | age 29 | PIT | market 2992 | projected 39.4 (9.9 a week) | last 3 weeks 21.6 a week | lineup value 9.4
8112 | Drake London | WR | age 25 | ATL | market 4861 | projected 33.5 (8.4 a week) | last 3 weeks 15.7 a week | lineup value 15.6
11638 | Ricky Pearsall | WR | age 26 | SF | market 2210 | projected 31.4 (7.9 a week) | last 3 weeks 0 a week | lineup value 4.9
12533 | Jacory Croskey-Merritt | RB | age 25 | WAS | market 3244 | projected 22.9 (5.7 a week) | last 3 weeks 3.9 a week | lineup value 0
6770 | Joe Burrow | QB | age 29 | CIN | market 4140 | projected 17.7 (4.4 a week) | last 3 weeks 0 a week | lineup value 0
4454 | Kendrick Bourne | WR | age 31 | ARI | market 0 | projected 14.6 (3.6 a week) | last 3 weeks 5.4 a week | lineup value 0
6806 | J.K. Dobbins | RB | age 27 | DEN | market 3332 | projected 11.4 (2.8 a week) | last 3 weeks 10 a week | lineup value 0.7
11566 | Jayden Daniels | QB | age 25 | WAS | market 4933 | projected 0 (0 a week) | last 3 weeks 11.3 a week | lineup value 0
11589 | Trey Benson | RB | age 24 | ARI | market 3171 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0

PARTNER (partnerId 6): record 4-5, rank 6, points for 1055.7, contention window 0.42
11604 | Brock Bowers | TE | age 23 | LV | market 5535 | projected 80 (20 a week) | last 3 weeks 16.4 a week | lineup value 80
4892 | Baker Mayfield | QB | age 31 | TB | market 2937 | projected 75 (18.8 a week) | last 3 weeks 5.4 a week | lineup value 8.4
8138 | James Cook | RB | age 27 | BUF | market 4900 | projected 71.4 (17.9 a week) | last 3 weeks 16 a week | lineup value 35.4
9226 | De'Von Achane | RB | age 25 | MIA | market 4985 | projected 67.5 (16.9 a week) | last 3 weeks 16.5 a week | lineup value 31.5
6804 | Jordan Love | QB | age 27 | GB | market 3370 | projected 66.6 (16.7 a week) | last 3 weeks 17.2 a week | lineup value 0
8150 | Kyren Williams | RB | age 26 | LAR | market 4554 | projected 57.6 (14.4 a week) | last 3 weeks 8.6 a week | lineup value 21.6
5846 | DK Metcalf | WR | age 28 | PIT | market 3439 | projected 50.9 (12.7 a week) | last 3 weeks 9 a week | lineup value 25.3
11647 | Kimani Vidal | RB | age 25 | LAC | market 2813 | projected 42.9 (10.7 a week) | last 3 weeks 1 a week | lineup value 6.9
5872 | Deebo Samuel | WR | age 30 | SF | market 2702 | projected 40 (10 a week) | last 3 weeks 4.5 a week | lineup value 14.4
12489 | RJ Harvey | RB | age 25 | DEN | market 3729 | projected 36 (9 a week) | last 3 weeks 16 a week | lineup value 0
4039 | Cooper Kupp | WR | age 33 | SEA | market 2097 | projected 34.9 (8.7 a week) | last 3 weeks 1.1 a week | lineup value 9.3
12534 | Kyle Monangai | RB | age 24 | CHI | market 3796 | projected 31.5 (7.9 a week) | last 3 weeks 8.4 a week | lineup value 6.9
12530 | Travis Hunter | DB | age 23 | JAX | market 0 | projected 0 (0 a week) | last 3 weeks 8 a week | lineup value 0
4663 | Austin Ekeler | RB | age 31 | WAS | market 0 | projected 0 (0 a week) | last 3 weeks 0 a week | lineup value 0
9484 | Tucker Kraft | TE | age 25 | GB | market 4154 | projected 0 (0 a week) | last 3 weeks 20.4 a week | lineup value 0

CANDIDATE DEALS (from a rules-based finder; points are the finder projections for the rest of the season):
c1 | partnerId 8 | I give Justin Fields + Josh Downs (7591,9500) | I get George Kittle + Michael Pittman (4217,6819) | my points 34.1 | their points -31.1 | likelihood 0.66
c2 | partnerId 8 | I give Justin Fields + Chuba Hubbard (7591,7594) | I get George Kittle + Travis Kelce (4217,1466) | my points 31.2 | their points -63.7 | likelihood 0.67
c3 | partnerId 8 | I give Brian Robinson + Chuba Hubbard (8154,7594) | I get George Kittle (4217) | my points 23.9 | their points -36.4 | likelihood 0.7
c4 | partnerId 6 | I give Chris Godwin (4037) | I get Kimani Vidal + Deebo Samuel (11647,5872) | my points 18.4 | their points -12.7 | likelihood 0.72
c5 | partnerId 6 | I give Chris Godwin + Justin Fields (4037,7591) | I get Kimani Vidal (11647) | my points 13.4 | their points 1.7 | likelihood 0.82

Pick the best trades for my team.

=========== CASE 1180319245030821888-w4-r7 ===========
REPLY FILE: /Users/anik/workspace/chrome/sleeper/.eval-market/replies/suggest-v2/heldout1/1180319245030821888-w4-r7.json
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
League: keeper, 10 teams, week 4, 10 regular season weeks left, playoffs start week 14
Lineup slots: QB, RB, RB, WR, WR, TE, FLEX, FLEX, BN, BN, BN, BN, BN, BN. Superflex: no. Tight end premium: yes. Points per reception: 1.
Columns: id | name | position | age | team | market value | projected points for the rest of the regular season (and per week) | points per week over the last three weeks played | lineup value (points my lineup loses if this player is removed).

MY TEAM (partnerId me): record 2-1, rank 4, points for 354.1, contention window 0.73
4034 | Christian McCaffrey | RB | age 30 | SF | market 4598 | projected 235.6 (23.6 a week) | last 3 weeks 23.3 a week | lineup value 141.4
7547 | Amon-Ra St. Brown | WR | age 26 | DET | market 5303 | projected 174.3 (17.4 a week) | last 3 weeks 22.8 a week | lineup value 60.4
12526 | Tetairoa McMillan | WR | age 23 | CAR | market 4722 | projected 139.2 (13.9 a week) | last 3 weeks 11.9 a week | lineup value 14.2
2133 | Davante Adams | WR | age 33 | LAR | market 3376 | projected 136.5 (13.6 a week) | last 3 weeks 15.4 a week | lineup value 22.6
8126 | Wan'Dale Robinson | WR | age 25 | TEN | market 3412 | projected 125.3 (12.5 a week) | last 3 weeks 1.2 a week | lineup value 4
1479 | Keenan Allen | WR | age 34 | IND | market 2142 | projected 114.9 (11.5 a week) | last 3 weeks 6.5 a week | lineup value 4.7
8228 | Jaylen Warren | RB | age 27 | PIT | market 3538 | projected 110.2 (11 a week) | last 3 weeks 14.8 a week | lineup value 29.5
1339 | Zach Ertz | TE | age 35 | PHI | market 0 | projected 107.7 (10.8 a week) | last 3 weeks 2.8 a week | lineup value 21.3
5012 | Mark Andrews | TE | age 31 | BAL | market 3101 | projected 97.9 (9.8 a week) | last 3 weeks 11.3 a week | lineup value 11.5
8408 | Jordan Mason | RB | age 27 | MIN | market 3074 | projected 92 (9.2 a week) | last 3 weeks 7.9 a week | lineup value 18.8
9758 | C.J. Stroud | QB | age 25 | HOU | market 3145 | projected 87.7 (8.8 a week) | last 3 weeks 12.4 a week | lineup value 57.5
8183 | Brock Purdy | QB | age 26 | SF | market 3619 | projected 75.7 (7.6 a week) | last 3 weeks 6.3 a week | lineup value 45.5
4199 | Aaron Jones | RB | age 31 | MIN | market 2798 | projected 63.1 (6.3 a week) | last 3 weeks 6 a week | lineup value 0.3
11584 | Bucky Irving | RB | age 24 | TB | market 4308 | projected 33 (3.3 a week) | last 3 weeks 15.5 a week | lineup value 6.5
5927 | Terry McLaurin | WR | age 31 | WAS | market 3394 | projected 23.5 (2.3 a week) | last 3 weeks 8.3 a week | lineup value 0.9

PARTNER (partnerId 4): record 3-0, rank 1, points for 374.3, contention window 1
9488 | Jaxon Smith-Njigba | WR | age 24 | SEA | market 5791 | projected 183.4 (18.3 a week) | last 3 weeks 19.4 a week | lineup value 119.3
3163 | Jared Goff | QB | age 32 | DET | market 3062 | projected 163.2 (16.3 a week) | last 3 weeks 19.5 a week | lineup value 58.5
3198 | Derrick Henry | RB | age 32 | BAL | market 4138 | projected 152.5 (15.3 a week) | last 3 weeks 14.1 a week | lineup value 89.2
8110 | Jake Ferguson | TE | age 27 | DAL | market 3464 | projected 128.9 (12.9 a week) | last 3 weeks 19.6 a week | lineup value 128.9
7591 | Justin Fields | QB | age 27 | KC | market 1243 | projected 126.4 (12.6 a week) | last 3 weeks 11.2 a week | lineup value 21.6
9224 | Chase Brown | RB | age 26 | CIN | market 4514 | projected 125 (12.5 a week) | last 3 weeks 9.2 a week | lineup value 60.9
5045 | Courtland Sutton | WR | age 31 | DEN | market 3181 | projected 118.4 (11.8 a week) | last 3 weeks 14.8 a week | lineup value 52.9
6786 | CeeDee Lamb | WR | age 27 | DAL | market 4923 | projected 113.8 (11.4 a week) | last 3 weeks 12.7 a week | lineup value 69
8134 | Khalil Shakir | WR | age 26 | BUF | market 3140 | projected 106.5 (10.7 a week) | last 3 weeks 9.7 a week | lineup value 35.7
9500 | Josh Downs | WR | age 25 | IND | market 3345 | projected 75.7 (7.6 a week) | last 3 weeks 6.6 a week | lineup value 10
7594 | Chuba Hubbard | RB | age 27 | CAR | market 3356 | projected 56.7 (5.7 a week) | last 3 weeks 15.4 a week | lineup value 12.9
8205 | Isiah Pacheco | RB | age 27 | DET | market 2550 | projected 49.4 (4.9 a week) | last 3 weeks 4.8 a week | lineup value 4.6
8154 | Brian Robinson | RB | age 27 | ATL | market 3196 | projected 38.2 (3.8 a week) | last 3 weeks 3.3 a week | lineup value 0
4037 | Chris Godwin | WR | age 30 | TB | market 3092 | projected 36.7 (3.7 a week) | last 3 weeks 0 a week | lineup value 2.2

PARTNER (partnerId 6): record 1-2, rank 6, points for 370, contention window 0.42
9226 | De'Von Achane | RB | age 25 | MIA | market 4990 | projected 192.9 (19.3 a week) | last 3 weeks 19.6 a week | lineup value 133.5
4892 | Baker Mayfield | QB | age 31 | TB | market 2939 | projected 171 (17.1 a week) | last 3 weeks 20.1 a week | lineup value 35.5
8138 | James Cook | RB | age 27 | BUF | market 4896 | projected 159.7 (16 a week) | last 3 weeks 22.8 a week | lineup value 100.4
6804 | Jordan Love | QB | age 27 | GB | market 3362 | projected 153.8 (15.4 a week) | last 3 weeks 16.3 a week | lineup value 18.3
8150 | Kyren Williams | RB | age 26 | LAR | market 4554 | projected 137.2 (13.7 a week) | last 3 weeks 14.4 a week | lineup value 77.8
5846 | DK Metcalf | WR | age 28 | PIT | market 3439 | projected 119.4 (11.9 a week) | last 3 weeks 11.8 a week | lineup value 69.6
11604 | Brock Bowers | TE | age 23 | LV | market 5532 | projected 114.7 (11.5 a week) | last 3 weeks 13.6 a week | lineup value 97.1
5872 | Deebo Samuel | WR | age 30 | SF | market 2701 | projected 108.6 (10.9 a week) | last 3 weeks 15 a week | lineup value 51.5
12489 | RJ Harvey | RB | age 25 | DEN | market 3728 | projected 81.6 (8.2 a week) | last 3 weeks 5.3 a week | lineup value 27
4039 | Cooper Kupp | WR | age 33 | SEA | market 2099 | projected 78.1 (7.8 a week) | last 3 weeks 8.2 a week | lineup value 25.4
9484 | Tucker Kraft | TE | age 25 | GB | market 4154 | projected 70 (7 a week) | last 3 weeks 15.2 a week | lineup value 52.5
1426 | DeAndre Hopkins | WR | age 33 | FA | market 1501 | projected 46.1 (4.6 a week) | last 3 weeks 9.4 a week | lineup value 13.3
12530 | Travis Hunter | DB | age 23 | JAX | market 0 | projected 30.5 (3 a week) | last 3 weeks 5.9 a week | lineup value 8.4
4663 | Austin Ekeler | RB | age 31 | WAS | market 0 | projected 0 (0 a week) | last 3 weeks 4.4 a week | lineup value 0

PARTNER (partnerId 8): record 1-2, rank 7, points for 312.5, contention window 0.27
9221 | Jahmyr Gibbs | RB | age 24 | DET | market 6368 | projected 181.3 (18.1 a week) | last 3 weeks 20.4 a week | lineup value 99.3
8144 | Chris Olave | WR | age 26 | NO | market 4417 | projected 132.2 (13.2 a week) | last 3 weeks 13.2 a week | lineup value 39.6
1466 | Travis Kelce | TE | age 37 | KC | market 2868 | projected 119.4 (11.9 a week) | last 3 weeks 11.5 a week | lineup value 19.9
6819 | Michael Pittman | WR | age 29 | PIT | market 2991 | projected 118 (11.8 a week) | last 3 weeks 9.1 a week | lineup value 26
4217 | George Kittle | TE | age 33 | SF | market 3142 | projected 112.5 (11.3 a week) | last 3 weeks 4.8 a week | lineup value 32
8148 | Jameson Williams | WR | age 25 | DET | market 4095 | projected 105.8 (10.6 a week) | last 3 weeks 10.6 a week | lineup value 7.7
12506 | Harold Fannin | TE | age 22 | CLE | market 4700 | projected 102.1 (10.2 a week) | last 3 weeks 6.4 a week | lineup value 3.7
6790 | D'Andre Swift | RB | age 27 | CHI | market 3662 | projected 98.9 (9.9 a week) | last 3 weeks 11.4 a week | lineup value 26.3
12533 | Jacory Croskey-Merritt | RB | age 25 | WAS | market 3249 | projected 94.8 (9.5 a week) | last 3 weeks 3.9 a week | lineup value 7
8112 | Drake London | WR | age 25 | ATL | market 4861 | projected 93 (9.3 a week) | last 3 weeks 10 a week | lineup value 21.6
6806 | J.K. Dobbins | RB | age 27 | DEN | market 3333 | projected 91.3 (9.1 a week) | last 3 weeks 15.2 a week | lineup value 10.6
11566 | Jayden Daniels | QB | age 25 | WAS | market 4497 | projected 81.9 (8.2 a week) | last 3 weeks 13.3 a week | lineup value 66.4
11638 | Ricky Pearsall | WR | age 26 | SF | market 2209 | projected 45.2 (4.5 a week) | last 3 weeks 14.6 a week | lineup value 2
6111 | Jake Browning | QB | age 30 | LAC | market 0 | projected 30.9 (3.1 a week) | last 3 weeks 2.6 a week | lineup value 15.4
6770 | Joe Burrow | QB | age 29 | CIN | market 4139 | projected 17.7 (1.8 a week) | last 3 weeks 5.3 a week | lineup value 17.7
11589 | Trey Benson | RB | age 24 | ARI | market 3168 | projected 14 (1.4 a week) | last 3 weeks 2.8 a week | lineup value 0.9

CANDIDATE DEALS (from a rules-based finder; points are the finder projections for the rest of the season):
c1 | partnerId 4 | I give Davante Adams (2133) | I get Justin Fields + Josh Downs (7591,9500) | my points 27.6 | their points 20 | likelihood 0.76
c2 | partnerId 6 | I give Keenan Allen + Mark Andrews (1479,5012) | I get Baker Mayfield (4892) | my points 41.2 | their points 12.5 | likelihood 0.68
c3 | partnerId 4 | I give Davante Adams + Keenan Allen (2133,1479) | I get Justin Fields + Chuba Hubbard (7591,7594) | my points 15.5 | their points 22.2 | likelihood 0.77
c4 | partnerId 4 | I give Wan'Dale Robinson + Keenan Allen (8126,1479) | I get Justin Fields + Brian Robinson (7591,8154) | my points 33.9 | their points 9 | likelihood 0.85
c5 | partnerId 6 | I give Wan'Dale Robinson + Terry McLaurin (8126,5927) | I get Jordan Love (6804) | my points 37.4 | their points 20.5 | likelihood 0.56
c6 | partnerId 8 | I give Mark Andrews + Tetairoa McMillan (5012,12526) | I get Jayden Daniels + George Kittle (11566,4217) | my points 53.5 | their points -77.6 | likelihood 0.62
c7 | partnerId 8 | I give Terry McLaurin (5927) | I get George Kittle + Travis Kelce (4217,1466) | my points 37.8 | their points -67.5 | likelihood 0.73
c8 | partnerId 8 | I give Aaron Jones + Terry McLaurin (4199,5927) | I get George Kittle + Jacory Croskey-Merritt (4217,12533) | my points 32.8 | their points -36.1 | likelihood 0.59

Pick the best trades for my team.
