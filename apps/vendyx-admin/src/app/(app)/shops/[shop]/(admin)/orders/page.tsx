import { Suspense } from 'react';

import { OrderState } from '@/api/types';
import { OrdersTable } from '@/lib/orders/components';
import {
  AdminPageLayout,
  type DataTableSearchParams,
  DataTableSkeleton,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/lib/shared/components';

export default function OrdersPage({ searchParams }: Props) {
  return (
    <AdminPageLayout title="Orders">
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="paid">Paid</TabsTrigger>
          <TabsTrigger value="sent">Sent</TabsTrigger>
          <TabsTrigger value="complete">Complete</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <Suspense fallback={<DataTableSkeleton />}>
            <OrdersTable {...searchParams} />
          </Suspense>
        </TabsContent>

        <TabsContent value="paid">
          <Suspense fallback={<DataTableSkeleton />}>
            <OrdersTable state={OrderState.PaymentAuthorized} {...searchParams} />
          </Suspense>
        </TabsContent>

        <TabsContent value="sent">
          <Suspense fallback={<DataTableSkeleton />}>
            <OrdersTable state={OrderState.Shipped} {...searchParams} />
          </Suspense>
        </TabsContent>

        <TabsContent value="complete">
          <Suspense fallback={<DataTableSkeleton />}>
            <OrdersTable state={OrderState.Delivered} {...searchParams} />
          </Suspense>
        </TabsContent>

        <TabsContent value="cancelled">
          <Suspense fallback={<DataTableSkeleton />}>
            <OrdersTable state={OrderState.Canceled} {...searchParams} />
          </Suspense>
        </TabsContent>
      </Tabs>
    </AdminPageLayout>
  );
}

type Props = {
  searchParams: DataTableSearchParams;
};