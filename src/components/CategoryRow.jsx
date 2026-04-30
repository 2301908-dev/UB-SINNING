import VideoCard from "./VideoCard";

export default function CategoryRow({ title, films }) {
  return (
    <section className="px-6 space-y-3">
      <h2 className="text-xl text-slate-900 font-semibold">{title}</h2>
      <div className="flex gap-4 overflow-x-auto overflow-y-visible pb-4">
        {films.map((f) => (
          <VideoCard key={f.id} film={f} />
        ))}
      </div>
    </section>
  );
}
