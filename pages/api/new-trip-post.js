import { MongoClient } from "mongodb";

export default function handler(req, res) {
  if (req.method === "POST") {
    const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.fib6l.mongodb.net/toptripsDB?retryWrites=true&w=majority`;
    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    async function run() {
      try {
        await client.connect();
        const database = client.db("toptripsDB");
        const toptrips = database.collection("toptrips");
        const result = await toptrips.insertOne(req.body);
        console.log(
          `A document was inserted with the _id: ${result.insertedId}`
        );
      } finally {
        await client.close();
      }
    }
    run().catch(console.dir);
    res.status(200).json({ message: "data inserted!" });
  }
}
