import Head from "next/head";
import ToptripList from "../components/toptrips/ToptripList";
import styles from "../styles/Home.module.css";
import Layout from "../components/layout/Layout";
import { MongoClient } from "mongodb";

export default function Home(props) {
  return <ToptripList toptrips={props.data} />;
}

export async function getStaticProps({ params }) {
  const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.fib6l.mongodb.net/toptripsDB?retryWrites=true&w=majority`;
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await client.connect();
  const database = client.db("toptripsDB");
  const toptrips = database.collection("toptrips");
  const result = await toptrips.find().toArray();
  await client.close();

  const returnData = result.map((item) => ({
    title: item.title,
    image: item.image,
    address: item.address,
    description: item.description,
    id: item._id.toString(),
  }));

  return {
    props: { data: returnData },
    revalidate: 300,
  };
}
