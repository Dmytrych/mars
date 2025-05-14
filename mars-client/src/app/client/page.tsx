import HomeMenu from "@/features/home/components/pages/HomeMenu";

const buttons = [
  {
    label: "Calendar",
    href: "/client/calendar",
  },
  {
    label: "Connection Requests",
    href: "/client/connection-requests",
  },
]

export default function ClientHomePage() {
  return (
    <HomeMenu buttons={buttons}/>
  );
}
