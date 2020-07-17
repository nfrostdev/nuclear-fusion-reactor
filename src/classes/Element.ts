export default class Element {
  unlocked: boolean
  number: number
  symbol: string
  name: string
  weight: number
  color: string
  count: number
  generatorPurchased: boolean

  constructor(number: number, symbol: string, name: string, weight: number, color: string) {
    this.number = number
    this.symbol = symbol
    this.name = name
    this.weight = weight
    this.color = color
    this.count = 0
    // The first element will be unlocked and have a generator.
    this.generatorPurchased = this.number === 1
    this.unlocked = this.number === 1
  }

  purchaseGenerator() {
    this.generatorPurchased = true
  }

  unlock() {
    this.unlocked = true
  }
}
