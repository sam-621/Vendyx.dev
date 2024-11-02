'use client';

import { type FC } from 'react';

import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

import { type CommonTotalSalesMetricsFragment } from '@/api/types';
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/lib/shared/components';
import { formatPrice } from '@/lib/shared/utils';

// const data2 = [
//   {
//     key: 'Jan',
//     value: Math.floor(Math.random() * 5000) + 1000
//   },
//   {
//     key: 'Feb',
//     value: Math.floor(Math.random() * 5000) + 1000
//   },
//   {
//     key: 'Mar',
//     value: Math.floor(Math.random() * 5000) + 1000
//   },
//   {
//     key: 'Apr',
//     value: Math.floor(Math.random() * 5000) + 1000
//   },
//   {
//     key: 'May',
//     value: Math.floor(Math.random() * 5000) + 1000
//   },
//   {
//     key: 'Jun',
//     value: Math.floor(Math.random() * 5000) + 1000
//   },
//   {
//     key: 'Jul',
//     value: Math.floor(Math.random() * 5000) + 1000
//   },
//   {
//     key: 'Aug',
//     value: Math.floor(Math.random() * 5000) + 1000
//   },
//   {
//     key: 'Sep',
//     value: Math.floor(Math.random() * 5000) + 1000
//   },
//   {
//     key: 'Oct',
//     value: Math.floor(Math.random() * 5000) + 1000
//   },
//   {
//     key: 'Nov',
//     value: Math.floor(Math.random() * 5000) + 1000
//   },
//   {
//     key: 'Dec',
//     value: Math.floor(Math.random() * 5000) + 1000
//   }
// ];

const chartConfig = {
  value: {
    label: 'total',
    color: 'hsl(var(--chart-1))'
  }
} satisfies ChartConfig;

export const TotalSalesChart: FC<Props> = ({ data }) => {
  return (
    <ChartContainer config={chartConfig} className="h-[300px]">
      <AreaChart
        accessibilityLayer
        data={data.metrics}
        margin={{
          left: 12,
          right: 12
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="key"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          interval="preserveStartEnd"
        />
        <ChartTooltip
          cursor={false}
          content={
            <ChartTooltipContent
              indicator="line"
              valueFormatter={value => formatPrice(Number(value))}
            />
          }
        />
        <Area
          dataKey="value"
          type="natural"
          fill="var(--color-value)"
          fillOpacity={0.4}
          stroke="var(--color-value)"
        />
      </AreaChart>
    </ChartContainer>
  );
};

type Props = {
  data: CommonTotalSalesMetricsFragment;
};