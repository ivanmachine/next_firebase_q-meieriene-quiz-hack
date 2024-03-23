import Link from "next/link";
import s from "./Navbar.module.scss";

export default function Navbar() {
  return (
    <header className={`${s.header}`}>
      <div className={`${s.content__wrapper} container`}>
        <Link href={"/"}>
          <h2 className={s.q__meieri__header}>Q meieriene hack</h2>
        </Link>
        <nav className={`${s.nav__links}`}>
          <Link href="/login">
            <p>Login</p>
          </Link>
          <Link href="/database">
            <p>Database data</p>
          </Link>
          <Link href="/database_tools">
            <p>Database tools</p>
          </Link>
          <Link href="/about">
            <p>About</p>
          </Link>
        </nav>
      </div>
    </header>
  );
}
