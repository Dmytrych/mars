import HomeMenu from "@/features/home/components/pages/HomeMenu";

const buttons = [
  {
    label: "Calendar",
    href: "/trainer/calendar",
  },
  {
    label: "Clients",
    href: "/trainer/clients",
  },
  {
    label: "Connection Requests",
    href: "/trainer/connection-requests",
  },
]

export default function TrainerHomePage() {
  return (
    <HomeMenu buttons={buttons}/>
  );
}
