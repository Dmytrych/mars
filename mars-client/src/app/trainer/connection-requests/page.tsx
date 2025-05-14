import TrainerConnectionRequests
  from "@/features/connection-requests/components/trainer-connection-page/TrainerConnectionRequests";

export default function HomePage() {
  return (
    <div className="flex flex-row justify-center mt-10">
      <div className="flex flex-col max-w-[400px] flex-grow">
        <TrainerConnectionRequests/>
      </div>
    </div>
  );
}
