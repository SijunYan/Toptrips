import { useRouter } from "next/router";
import Head from "next/head";
import ToptripDetails from "../components/toptrips/ToptripDetails";
import { MongoClient, ObjectId } from "mongodb";
import { Fragment } from "react";

export default function ToptripDetailsPage(props) {
  const router = useRouter();
  const id = router.query.tripId;
  return (
    <Fragment>
      <Head>
        <title>{props.data.title}</title>
        <meta name="description" content={`Detail about ${props.data.title}`} />
        <meta name="keywords" content="Trip, travel, Australia" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <ToptripDetails data={props.data}></ToptripDetails>
    </Fragment>
  );
}

export async function getStaticPaths() {
  const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.fib6l.mongodb.net/toptripsDB?retryWrites=true&w=majority`;
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await client.connect();
  const database = client.db("toptripsDB");
  const toptrips = database.collection("toptrips");
  const result = await toptrips.find({}, { _id: 1 }).toArray();
  await client.close();

  const paths = result.map((item) => ({
    params: { tripId: item._id.toString() },
  }));
  console.log(paths);

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
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
  const result = await toptrips.findOne({ _id: ObjectId(params.tripId) });
  await client.close();
  console.log(result);

  return {
    props: {
      data: {
        title: result.title,
        image: result.image,
        address: result.address,
        description: result.description,
        id: result._id.toString(),
      },
    },
    revalidate: 300,
  };
}
