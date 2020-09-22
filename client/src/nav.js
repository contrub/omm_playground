import history from "./history";

export default function nav(loc) {
  console.log(loc)
  history.push(loc);
}
