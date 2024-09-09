import { GetEvent } from "@/app/actions/event/get";
import Home from "@/components/dashboard/home";

type Props = {
  params: {
    id: string;
  };
};

const EventHomePage = async ({ params }: Props) => {
  const { status, data, message } = await GetEvent(params.id);
  console.log(data.title);

  return <Home />;
};

export default EventHomePage;
