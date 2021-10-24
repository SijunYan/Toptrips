import ToptripItem from "./ToptripItem";
import classes from "./ToptripList.module.css";

function ToptripList(props) {
  return (
    <ul className={classes.list}>
      {props.toptrips.map((trip) => (
        <ToptripItem
          key={trip.id}
          id={trip.id}
          image={trip.image}
          title={trip.title}
          address={trip.address}
        />
      ))}
    </ul>
  );
}

export default ToptripList;
