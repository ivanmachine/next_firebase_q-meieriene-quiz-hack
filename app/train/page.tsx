import TrainPanel from "@/components/train/TrainPanel";

export default function page() {
  return (
    <main className={`container`}>
      <h1>Train</h1>
      <section className={`ui__wrapper`}>
        <TrainPanel />
      </section>
    </main>
  );
}
