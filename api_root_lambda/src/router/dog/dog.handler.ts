import { RequestHandler } from 'express';

import * as factsData from '../../constant/dogfacts';
import randomInt from '../../util/randomInt';

const dogRouteHandler: RequestHandler = (_, res) => {
  const randomFact = factsData.data[randomInt(factsData.data.length)].fact;

  res.status(200).json({
    fact: randomFact,
  });
};

export default dogRouteHandler;
