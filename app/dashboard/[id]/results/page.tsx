import { GetEvent } from "@/app/actions/event/get";
import Results from "@/components/dashboard/results";
import { notFound } from "next/navigation";
import React from "react";

type Props = {
  params: {
    id: string;
  };
};

const ResultsPage = async ({ params }: Props) => {
  const { data, message } = await GetEvent(params.id);
  if (message === "not-found") {
    notFound();
  }

  return <Results data={data} />;
};

export default ResultsPage;
