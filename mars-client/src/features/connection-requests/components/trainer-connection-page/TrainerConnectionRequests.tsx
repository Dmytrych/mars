import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import PendingTrainerRequests
  from "@/features/connection-requests/components/trainer-connection-page/PendingTrainerRequests";
import {Suspense} from "react";
import HistoryTrainerRequests
  from "@/features/connection-requests/components/trainer-connection-page/HistoryTrainerRequests";

const TrainerConnectionRequests = () => {
  return (
    <Tabs defaultValue="pending" className="w-full">
      <TabsList className="w-full">
        <TabsTrigger value="pending">Pending</TabsTrigger>
        <TabsTrigger value="history">History</TabsTrigger>
      </TabsList>
      <TabsContent value="pending">
        <Suspense>
          <PendingTrainerRequests/>
        </Suspense>
      </TabsContent>
      <TabsContent value="history">
        <Suspense>
          <HistoryTrainerRequests/>
        </Suspense>
      </TabsContent>
    </Tabs>
  )
}

export default TrainerConnectionRequests
