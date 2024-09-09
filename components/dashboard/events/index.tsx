"use client";
import { useConditionalFetchData } from "@/hooks/useFetchData";
import AdminDashboard from "./admin";
import VoterDashboard from "./user";
import { getTokenFromLocalStorage } from "@/lib/helpers";
import { IEvent } from "@/models/Event";

type Props = {};

const Events = (props: Props) => {
  const token = getTokenFromLocalStorage()!;

  const { data: events, isLoading, error } = useConditionalFetchData<IEvent[]>({ endpoint: "/events", token });
  console.log(events);

  return (
    <>
      <AdminDashboard data={events!} isLoading={isLoading} />
      {/* <VoterDashboard /> */}
    </>
  );
};

export default Events;
