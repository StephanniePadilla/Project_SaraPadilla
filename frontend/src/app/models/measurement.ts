export class Measurement {
  _id: string;
  name: string;
  description: string;
  state: {type: String, enum: ['available', 'Performed']};
  resistances:[];

  constructor(name: string, description: string, state: { type: String; enum: ["available", "Performed"] }, resistances: []) {
    this.name = name;
    this.description = description;
    this.state = state;
    this.resistances = resistances;
  }
}
