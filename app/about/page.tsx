import Image from "next/image";
import s from "./page.module.scss";
import scoreboard from "@public/scoreboard.jpg";
import Link from "next/link";

export default function page() {
  return (
    <main className={`container ${s.aboutPage}`}>
      <Link
        href={
          "https://github.com/ivanmachine/next_firebase_q-meieriene-quiz-hack"
        }
      >
        <p>GitHub repo</p>
      </Link>
      <h1>Om</h1>
      <h2>Hva er dette?</h2>
      <p>
        Dette er en nettside som jeg brukte til å få perfekt score på
        q-meieriene sin påskequiz.
      </p>
      <Image src={scoreboard} alt="scoreboard" width={1000} height={1000} />
      <h2>Hvorfor?</h2>
      <p>
        Jeg er interesert i nettverk, og sikkerhet, og ville løse en gøy oppgave
      </p>
      <h2>Hvordan?</h2>
      <p>Prosessen er delt i tre steg</p>
      <ol>
        <li>Jeg trener databasen</li>
        <li>Jeg fullfører quizzen</li>
        <li>Jeg registrerer svaret</li>
      </ol>
    </main>
  );
}
