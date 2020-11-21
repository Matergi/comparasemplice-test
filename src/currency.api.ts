type Exange = {
  currency: string,
  value: number,
}

const exanges: Array<Exange> = [
  {
    currency: "€",
    value: 3,
  },
  {
    currency: "£",
    value: 2,
  },
  {
    currency: "$",
    value: 1,
  }
]

export default (amount: number, from: string, to: string): number => {
  const exangeFrom = exanges.find(exange => exange.currency === from);
  const exangeTo = exanges.find(exange => exange.currency === to);

  if (!exangeFrom || !exangeTo) {
    return -1;
  }

  return (amount / exangeFrom.value) * exangeTo.value
}