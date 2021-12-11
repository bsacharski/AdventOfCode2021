const rawInput = `5433566276
6376253438
8458636316
6253254525
7211137138
1411526532
5788761424
8677841514
1622331631
5876712227`;

export const input: number[][] = rawInput.split("\n").map((line) =>
  line.split("").map((char) => parseInt(char, 10))
);
