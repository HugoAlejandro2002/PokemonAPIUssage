export function getRandomPokemonNumbers(): number[] {
    const numbers = new Set<number>();
    while (numbers.size < 3) {
      const randomNumber = Math.floor(Math.random() * 150) + 1;
      numbers.add(randomNumber);
    }
    return Array.from(numbers);
  }