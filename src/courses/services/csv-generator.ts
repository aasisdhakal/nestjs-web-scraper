import { Injectable } from '@nestjs/common';
import { Parser } from 'json2csv';

@Injectable()
export class CsvGenerator {
  convertJsonToCsv(data: Record<string, string>[]): string {
    const fields = ['title', 'description', 'provider', 'rating', 'duration'];
    const opts = { fields };
    try {
      const parser = new Parser(opts);
      return parser.parse(data);
    } catch (err) {
      console.error(err);
    }
  }
}
