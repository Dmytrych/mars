import { getAuthenticatedAppForUser } from "@/common/firebase/serverApp";
import { redirect } from "next/navigation";

const HomePage = async () => {
  const { user } = await getAuthenticatedAppForUser()
  let data = "test"

  if (!user) {
    redirect('/auth/login')
  }

  // const projectsResponse = await getProjects(session);

  return (
    <div className="flex justify-center">
      {data}
      {/* <div className="w-2/3">
        { projectsResponse.success ? (
          <ProjectListEditor projects={projectsResponse.data}/>
        ) : (
          <div>Error fetching the data</div>
        )}
      </div> */}
    </div>
  );
}

export default HomePage;
