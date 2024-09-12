import { GetEvent } from "@/app/actions/event/get";
import Category from "@/components/dashboard/category";
import { notFound } from "next/navigation";
import React from "react";

type Props = {
  params: { id: string };
};

const CategoryPage = async ({ params }: Props) => {
  const { data, message } = await GetEvent(params.id);
  if (message === "not-found") {
    notFound();
  }

  return <Category data={data} />;
};

export default CategoryPage;
