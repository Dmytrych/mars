import { Button } from "@/components/ui/button";
import {Card, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";

interface ConnectionRequest {
  userName: string;
  variant?: "pending" | "accepted" | "rejected";
}

const ConnectionRequestCard = ({userName, variant = "pending"}: ConnectionRequest) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{userName}</CardTitle>
      </CardHeader>
      {variant === "pending" && (
        <CardFooter className="w-full flex justify-between">
          <Button variant="outline">Decline</Button>
          <Button>Accept</Button>
        </CardFooter>
      )}
    </Card>
  )
}

export default ConnectionRequestCard
