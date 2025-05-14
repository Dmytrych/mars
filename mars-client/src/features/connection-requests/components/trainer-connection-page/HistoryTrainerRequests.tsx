import ConnectionRequestCard
  from "@/features/connection-requests/components/trainer-connection-page/ConnectionRequestCard";

const HistoryTrainerRequests = () => {
  return (
    <div className="flex flex-col gap-1">
      <ConnectionRequestCard userName="Test" variant='accepted'/>
      <ConnectionRequestCard userName="Test" variant='accepted'/>
      <ConnectionRequestCard userName="Test" variant='accepted'/>
      <ConnectionRequestCard userName="Test" variant='rejected'/>
    </div>
  )
}

export default HistoryTrainerRequests;
