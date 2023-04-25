interface PartySizeOption {
  value: number;
  label: string;
}

export const partySize: PartySizeOption[] = [];

for (let i = 0; i < 10; i++) {
  partySize.push({
    value: i + 1,
    label: i === 0 ? `${i + 1} person` : `${i + 1} people`
  });
}
