export class Resistance {
  _id: string;
  name: string;
  value: number;
  description: String;
  assigned: boolean;


  constructor(name: string, value: number, description: String, assigned: boolean) {
    this.name = name;
    this.value = value;
    this.description = description;
    this.assigned = assigned;
  }
}
