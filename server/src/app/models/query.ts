
import * as Ajv from "ajv";

const validator = new Ajv().compile({
  properties: {
    year: {
      type: "number",
      maximum: new Date().getFullYear()
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
  required: ['rank', 'categories', 'year']
});


interface IAppQuery {
  year: number;
  categories: string;
  rank: number;
}


export class AppQuery {

  year: number;
  categories: string[];
  rank: number;

  constructor(query: IAppQuery) {
    this.year = query.year && query.year * 1;
    this.categories = query.categories && (query.categories || "").split(",");
    this.rank = query.rank && query.rank * 1;
  }

  isValid() {
    validator(this);
    return !validator.errors;
  }
}