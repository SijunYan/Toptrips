import classes from "./MainNavigation.module.css";
import Link from "next/link";

function MainNavigation() {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>React/Nextjs Toptrips</div>
      <nav>
        <ul>
          <li>
            <Link href="/">All Toptrips</Link>
          </li>
          <li>
            <Link href="/new-toptrip">Add New Trip</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
