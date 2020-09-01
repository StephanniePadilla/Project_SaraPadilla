export class Measurement {
  _id: string;
  name: string;
  description: string;
  state: {type: String, enum: ['available', 'NA']};
  resistances:[];

  constructor(name: string, description: string, state: { type: String; enum: ["available", "NA"] }, resistances: []) {
    this.name = name;
    this.description = description;
    this.state = state;
    this.resistances = resistances;
  }
}
