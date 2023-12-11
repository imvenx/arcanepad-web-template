import { ArcaneBaseEvent } from "arcanepad-web-sdk"

export class AttackedEvent extends ArcaneBaseEvent {
  damage: number
  constructor(damage: number) {
    super('Attacked')
    this.damage = damage
  }
}
