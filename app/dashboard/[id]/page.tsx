import { GetEvent } from "@/app/actions/event/get";
import Home from "@/components/dashboard/home";
import { notFound } from "next/navigation";

type Props = {
  params: {
    id: string;
  };
};

const EventHomePage = async ({ params }: Props) => {
  const { data, message } = await GetEvent(params.id);
  if (message === "not-found") {
    notFound();
  }

  return <Home data={data} />;
};

export default EventHomePage;
