import { Fragment } from "react";
import Card from "../ui/Card";
import classes from "./ToptripDetails.module.css";

export default function ToptripDetails(props) {
  return (
    <Card>
      <div className={classes.detail}>
        <h1>{props.data.title}</h1>
        <p>{props.data.address}</p>
        <img src={props.data.image} />
        <p>{props.data.description}</p>
      </div>
    </Card>
  );
}
