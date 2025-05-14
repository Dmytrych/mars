import ConnectionRequestCard
  from "@/features/connection-requests/components/trainer-connection-page/ConnectionRequestCard";

const PendingTrainerRequests = () => {
  return (
    <div className="flex flex-col gap-1">
      <ConnectionRequestCard userName="Test"/>
      <ConnectionRequestCard userName="Test"/>
      <ConnectionRequestCard userName="Test"/>
      <ConnectionRequestCard userName="Test"/>
    </div>
  )
}

export default PendingTrainerRequests;
