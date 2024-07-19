"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../Components/ui/card"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "../Components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../Components/ui/select"

const chartConfig = {
  responseTime: {
    label: "Response Time",
    color: "hsl(var(--chart-6))",
  },
  avgResponseTime: {
    label: "Avg Response Time",
    color: "hsl(var(--chart-4))",
  },
}

function Dashboard2({ logDetails }) {
  const [timeRange, setTimeRange] = React.useState("today")

  // Transform the logs data to the required format
  const chartData = logDetails.logs.map(log => ({
    timestamp: log.timestamp, // Use the full timestamp
    responseTime: log.responseTime, // Original response time
  }))

  const filteredData = chartData.filter((item) => {
    const timestamp = new Date(item.timestamp)
    const now = new Date()
    let daysToSubtract = 0

    if (timeRange === "7d") {
      daysToSubtract = 7
    } else if (timeRange === "30d") {
      daysToSubtract = 30
    }

    // Adjusting the time for filtering
    const startTime = new Date()
    if (timeRange === "today") {
      startTime.setHours(0, 0, 0, 0)
    } else {
      startTime.setDate(now.getDate() - daysToSubtract)
    }

    return timestamp >= startTime
  })

  // Calculate average response times for the selected range
  const avgResponseTime = filteredData.length
    ? filteredData.reduce((sum, data) => sum + data.responseTime, 0) / filteredData.length
    : 0;

  // Calculate all-time average response times
  const allTimeAvgResponseTime = chartData.length
    ? chartData.reduce((sum, data) => sum + data.responseTime, 0) / chartData.length
    : 0;

  // Create data for chart showing both response time and average response time
  const chartDataWithAvg = filteredData.map(item => ({
    timestamp: item.timestamp,
    responseTime: item.responseTime,
    avgResponseTime: avgResponseTime, // Constant average for all data points
  }))

  return (
    <div>
      <Card className="dark">
        <CardHeader className="flex items-center gap-2 space-y-0 py-5 sm:flex-row">
          <div className="grid flex-1 gap-1 text-center sm:text-left">
            <CardTitle className='text-3xl hover:subpixel-antialiased'>Response Time Chart</CardTitle>
            <CardDescription>
              Showing response times for the selected range
            </CardDescription>
          </div>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="w-[160px] rounded-lg sm:ml-auto "
              aria-label="Select a value"
            >
              <SelectValue placeholder="Select Time Range" />
            </SelectTrigger>
            <SelectContent className="dark rounded-xl">
              <SelectItem value="today" className=" rounded-lg">
                Today
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                Last 7 days
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                Last 30 days
              </SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6 dark">
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[250px] w-full dark"
          >
            <AreaChart data={chartDataWithAvg}>
              <defs>
                <linearGradient id="fillResponseTime" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-responseTime)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-responseTime)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
                <linearGradient id="fillAvgResponseTime" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-avgResponseTime)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-avgResponseTime)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="timestamp"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value) => {
                  const date = new Date(value)
                  return date.toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                }}
              />
              <YAxis />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    labelFormatter={(value) => {
                      return new Date(value).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    }}
                    indicator="dot"
                  />
                }
              />
              <Area
                dataKey="responseTime"
                type="natural"
                fill="url(#fillResponseTime)"
                stroke="var(--color-responseTime)"
                stackId="a"
              />
              <Area
                dataKey="avgResponseTime"
                type="natural"
                fill="url(#fillAvgResponseTime)"
                stroke="var(--color-avgResponseTime)"
                stackId="a"
              />
              <ChartLegend content={<ChartLegendContent />} />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card className="dark mt-4">
        <CardHeader>
          <CardTitle className='text-2xl hover:subpixel-antialiased'>All-Time Average Response Times</CardTitle>
        </CardHeader>
        <CardContent className="px-6 py-4">
          <div className="flex justify-between">
            <div>
              <CardDescription>Average Response Time</CardDescription>
              <p>{allTimeAvgResponseTime.toFixed(2)} ms</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Dashboard2