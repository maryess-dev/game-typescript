import { TopicsChoicer } from "../components/TopicsChoicer";

export const MainPage = () => {
  return (
    <div className="h-screen px-16 py-8">
      <div className="bg-[#AFBD90] mx-26 p-14 text-center border-4 border-[#373428] rounded-2xl">
        <div>
          <p></p>
        </div>
        <span className="text-5xl font-bold">Learning English</span>
      </div>
      <TopicsChoicer />
    </div>
  );
};
