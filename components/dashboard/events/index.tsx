"use client";
import AdminDashboard from "./admin";
import VoterDashboard from "./user";

type Props = {};

const Events = (props: Props) => {
  return (
    <>
      {/* <AdminDashboard /> */}
      <VoterDashboard />
    </>
  );
};

export default Events;
