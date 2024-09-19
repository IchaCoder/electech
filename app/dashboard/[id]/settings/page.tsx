import { GetEvent } from "@/app/actions/event/get";
import Settings from "@/components/dashboard/settings";
import { notFound } from "next/navigation";
import React from "react";

type Props = {
  params: {
    id: string;
  };
};

const SettingsPage = async ({ params }: Props) => {
  const { data, message } = await GetEvent(params.id);
  if (message === "not-found") {
    notFound();
  }
  return <Settings event={data} />;
};

export default SettingsPage;
