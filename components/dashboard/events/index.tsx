"use client";
import { useConditionalFetchData } from "@/hooks/useFetchData";
import AdminDashboard from "./admin";
import VoterDashboard from "./user";
import { getTokenFromLocalStorage } from "@/lib/helpers";
import { IEvent } from "@/models/Event";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/user.context";
import { Skeleton, Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const Events = () => {
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();
  const { error, loading, user } = useUser();

  const { data: adminEvents, isLoading: isLoadingAdminEvents } = useConditionalFetchData<IEvent[]>({
    endpoint: `events?user_id=${user?._id}`,
    token: token!,
  });

  const { data: userEvents, isLoading } = useConditionalFetchData<IEvent[]>({
    endpoint: `events/user`,
    token: token!,
  });

  useEffect(() => {
    const token = getTokenFromLocalStorage()!;
    setToken(token);
  }, []);

  if (loading) {
    return (
      <Stack>
        <Skeleton height="20px" width="full" />
        <Skeleton height="20px" width="full" />
        <Skeleton height="20px" width="full" />
        <Skeleton height="20px" width="full" />
        <Skeleton height="20px" width="full" />
        <Skeleton height="20px" width="full" />
      </Stack>
    );
  }

  if (error === "Token expired") {
    router.push("/login");
  }

  return (
    <>
      {user?.role === "admin" ? (
        <AdminDashboard data={adminEvents!} isLoading={isLoadingAdminEvents} />
      ) : (
        <VoterDashboard data={userEvents!} isLoading={isLoading} />
      )}
    </>
  );
};

export default Events;
