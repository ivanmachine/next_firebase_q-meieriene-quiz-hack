import s from "./page.module.scss";

export default function page() {
  return (
    <main className={`${s.hack__wrapper} container`}>
      <h1>Hack</h1>
      <div className={` ui__wrapper`}></div>
    </main>
  );
}
