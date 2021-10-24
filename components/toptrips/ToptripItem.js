import Card from "../ui/Card";
import classes from "./ToptripItem.module.css";
import { useRouter } from "next/router";

function ToptripItem(props) {
  const router = useRouter();
  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <img src={props.image} alt={props.title} />
        </div>
        <div className={classes.content}>
          <h3>{props.title}</h3>
          <address>{props.address}</address>
        </div>
        <div className={classes.actions}>
          <button
            onClick={(event) => {
              router.push(`/${props.id}`);
            }}
          >
            Show Details
          </button>
        </div>
      </Card>
    </li>
  );
}

export default ToptripItem;
