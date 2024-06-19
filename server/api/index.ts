import { Nitro } from 'nitropack'
import mongoose from 'mongoose'
export default async (_nitroApp: Nitro) => {
  const config = useRuntimeConfig()
  console.log(config.mongoURI)
  try {
    await mongoose.connect(config.mongoURI, {

    })

    console.log('MongoDB connected')
  }
  catch (err) {
    console.log(err)
  }
}
