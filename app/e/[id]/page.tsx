import { GetEvent } from "@/app/actions/event/get";
import Voting from "@/components/voting";
import { notFound } from "next/navigation";
import React from "react";

type Props = {
  params: {
    id: string;
  };
};

const VotingPage = async ({ params }: Props) => {
  const { data, message } = await GetEvent(params.id);
  if (message === "not-found") {
    notFound();
  }

  return <Voting data={data} />;
};

export default VotingPage;
