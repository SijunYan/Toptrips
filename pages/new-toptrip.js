import NewTripForm from "../components/toptrips/NewTripForm";
import axios from "axios";
import { useRouter } from "next/router";

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

  return <NewTripForm onAddToptrip={newDataUpload}></NewTripForm>;
}
