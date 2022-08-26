import type { NextApiRequest, NextApiResponse } from "next"

const hello = (req: NextApiRequest, res: NextApiResponse) => {
    res.status(200).send("Hello")
}

export default hello
