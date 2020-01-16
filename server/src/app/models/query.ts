
import * as Ajv from "ajv";

const validator = new Ajv().compile({
  properties: {
    birthYear: {
      type: "number"
    },
    categories: {
      type: "array",
      items: {
        type: "string"
      }
    },
    rank: {
      type: "number",
      minimum: 1,
      maximum: 5
    },
  },
  required: ['rank', 'categories', 'birthYear']
});


interface IAppQuery {
  birthYear: number;
  categories: string[];
  rank: number;
}


export class AppQuery implements IAppQuery {

  birthYear: number;
  categories: string[];
  rank: number;

  constructor(query: IAppQuery) {
    this.birthYear = query.birthYear * 1;
    this.categories = query.categories;
    this.rank = query.rank * 1;
  }

  isValid() {
    validator(this);
    return !validator.errors;
  }
}