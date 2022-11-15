import connectMongo from "lib/utils/connectMongo";
import User from "lib/models/user.model";
import type { NextApiRequest, NextApiResponse } from "next";

import { getSession } from "next-auth/react";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  if (!session || session.user?.role === "user") {
    res.status(401).json({ message: "You are not authorized" });
  } else {
    try {
      await connectMongo();
      const queryPerPage = parseInt(req.query.perPage as string);
      const queryPage = parseInt(req.query.page as string);
      const result = await User.paginate(
        {},
        {
          page: queryPage,
          limit: queryPerPage,
        }
      );

      res.status(200).json(result);
    } catch (error) {
      res.json({ error });
    }
  }
}
