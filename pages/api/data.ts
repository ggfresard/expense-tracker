import type { NextApiRequest, NextApiResponse } from 'next'
import { getCMRData } from '../../lib/services/falabella'

const data = async (req: NextApiRequest, res: NextApiResponse) => {
  const method = req.method
  if (method === 'GET') {
    const APIKEY = process.env.APIKEY
    if (APIKEY === undefined || APIKEY !== req.headers['legab-key'])
      return res.status(401).send('Unauthorized')

    const data = await getCMRData().catch((error) => {
      console.log(error)
      return res.status(500).send('Internal Server Error')
    })
    return res.status(200).json(data)
  }

  return res.status(405).send('Method not allowed')
}

export default data
