import VideoCard from "../shared/VideoCard";

export default function CategoryRow({ title, films }) {
  return (
    <section className="space-y-3 px-6">
      <h2 className="text-xl font-semibold text-white">{title}</h2>
      <div className="flex gap-4 overflow-x-auto overflow-y-visible pb-4">
        {films.map((f) => (
          <VideoCard key={f.id} film={f} />
        ))}
      </div>
    </section>
  );
}
