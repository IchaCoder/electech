"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";

export default function RestrictedPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   if (!isAuthenticated()) {
  //     router.push("/login");
  //   } else {
  //     setLoading(false);
  //   }
  // }, [router]);

  // if (loading) {
  //   return <div className="flex justify-center items-center h-screen">Loading...</div>;
  // }

  return (
    <div className="flex justify-center items-center h-screen bg-background">
      <Card className="max-w-[450px]">
        <CardHeader>
          <CardTitle>Restricted Page</CardTitle>
          <CardDescription>You cannot access this event.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-2">This Elections is locked to an organization</p>
          <Alert>
            <InfoIcon className="h-4 w-4" />
            <AlertTitle>How to access this page</AlertTitle>
            <AlertDescription>
              <ul className="list-disc list-inside space-y-1">
                <li>Ensure you are logged in with a valid account</li>
                <li>Check if your email account is within the organization "@gmail.com"</li>
                <li>Make sure your account is verified</li>
                <li>Contact your administrator if the issue persists</li>
              </ul>
            </AlertDescription>
          </Alert>
        </CardContent>
        <CardFooter>
          <Button onClick={() => router.push("/")} className="w-full bg- bg-[rgba(97,153,203,1)]">
            Back to Home
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
