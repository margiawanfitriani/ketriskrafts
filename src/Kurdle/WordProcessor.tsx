import * as fs from 'fs';
import * as path from 'path';
import { parse } from 'csv-parse';

(() => {
  const csvFilePath = path.resolve(__dirname, './Words.csv');

  const headers = ['name'];

  const fileContent = fs.readFileSync(csvFilePath, { encoding: 'utf-8' });

  parse(
    fileContent,
    {
      delimiter: ',',
      columns: headers,
    },
    (error, result: Word[]) => {
      if (error) {
        console.error(error);
      }

      console.log('Result', result);
    },
  );
})();
