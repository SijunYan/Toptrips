import NewTripForm from "../components/toptrips/NewTripForm";
import axios from "axios";
import { useRouter } from "next/router";
import { Fragment } from "react";
import Head from "next/head";

export default function NewToptrip() {
  const router = useRouter();
  function newDataUpload(toptripData) {
    console.log(toptripData);
    axios
      .post("/api/new-trip-post", toptripData)
      .then(function (response) {
        console.log(response.data.message);
      })
      .catch(function (error) {
        console.log(error);
      });
    router.replace("/");
  }

  return (
    <Fragment>
      <Head>
        <title>Create new trip</title>
        <meta name="description" content="Creact a new trip" />
        <meta name="keywords" content="Trip, travel, Australia" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <NewTripForm onAddToptrip={newDataUpload}></NewTripForm>
    </Fragment>
  );
}
