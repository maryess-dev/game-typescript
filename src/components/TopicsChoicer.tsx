import { useNavigate } from "react-router";
import { topics } from "../api/mocks/topics";

export const TopicsChoicer = () => {
  const navigate = useNavigate();

  return (
    <section className="grid grid-cols-1 gap-7 p-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {topics.map((t) => (
        <div
          key={t.id}
          className="flex min-h-72 flex-col overflow-hidden rounded-lg bg-[#373428] text-white"
        >
          <div className="aspect-6/3 w-full h-24 bg-[#242219] rounded-3xl p-2">
            {t.imageSrc ? (
              <img
                src={t.imageSrc}
                alt={t.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center px-4 text-center text-sm text-white/50">
                Нет изображения
              </div>
            )}
          </div>

          <div className="flex flex-1 flex-col gap-3 p-4">
            <span className="text-base font-semibold leading-snug">
              {t.name}
            </span>
            {t.description && (
              <p className="text-sm leading-5 text-white/70">{t.description}</p>
            )}
          </div>

          <button
            onClick={() => {
              navigate("/game");
            }}
            className="mx-4 mb-4 rounded-md bg-[#7BCD62] px-4 py-2 text-center font-medium text-[#241f1f] transition hover:bg-red-200 cursor-pointer"
          >
            Start Game
          </button>
        </div>
      ))}
    </section>
  );
};
