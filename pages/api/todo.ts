// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
import path from "path";


type Todos = {
  key: number;
  description: string
  priority: number;
  due: number; //epoch time
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Todos[]>
) {

  sqlite3.verbose();

  const dir = path.join(process.cwd(), "./");

  const db = await open({
    filename: dir + '/pages/api/todos.db',
    driver: sqlite3.Database
  });

  const query = req.query;
  const { page, limit, sort, like } = query;

  let order = sort?sort:'due';

  const items = like?
                  await db.all('select * from todos where description like \'%' + like + '%\' order by ' + order + ' desc limit 10')
                :
                  await db.all('select * from todos order by ' + order + ' desc limit 10');

  res.status(200).json(items);


}
