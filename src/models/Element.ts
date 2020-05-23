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
    this.generatorPurchased = false
    // This element will be unlocked by default if it is the first one.
    this.unlocked = this.number === 1
  }
}
