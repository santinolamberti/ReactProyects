import { NextApiRequest, NextApiResponse } from "next";
import { ERROR_METHOD_NOT_ALLOWED } from "dh-marvel/services/checkout/checkout.errors";
import { getComics } from "dh-marvel/services/marvel/marvel.service";

export default async function  handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const offset = req.query.offset
    const limit = req.query.limit
    const response = await getComics(Number(offset), Number(limit))
    res.status(200).send({ response: response.data });
    return;
  } else {
    res.status(405).json(ERROR_METHOD_NOT_ALLOWED);
    return;
  }
}
