"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart, Sector } from "recharts";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { PieSectorDataItem } from "recharts/types/polar/Pie";
import { IParticipant } from "@/models/Category";

type Props = {
  participants: IParticipant[];
};

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Edge",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export function ResultsChart({ participants }: Props) {
  const totalVisitors = React.useMemo(() => {
    return participants.reduce((acc, curr) => acc + curr.total_votes, 0);
  }, []);

  const data = participants.map((participant, index) => ({
    name: `${participant.first_name} ${participant.last_name}`,
    total_votes: participant.total_votes,
    fill: `hsl(var(--chart-${index + 1}))`,
  }));

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Pie Chart</CardTitle>
        {/* <CardDescription>Results for SRC President in a chart</CardDescription> */}
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={data}
              activeIndex={0}
              activeShape={({ outerRadius = 0, ...props }: PieSectorDataItem) => (
                <Sector {...props} outerRadius={outerRadius + 10} />
              )}
              dataKey="total_votes"
              nameKey="name"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                        <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-3xl font-bold">
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground">
                          Voters
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">Showing total visitors for the last 6 months</div>
      </CardFooter> */}
    </Card>
  );
}
