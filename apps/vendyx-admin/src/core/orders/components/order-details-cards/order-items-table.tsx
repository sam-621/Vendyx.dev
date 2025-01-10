import { type FC } from 'react';

import { type CommonOrderFragment } from '@/api/types';
import { ImagePlaceholder } from '@/shared/components/placeholders/image-placeholder';
import { OrderStatusBadge } from '@/shared/components/status-badges/order-status-badge';
import { Badge } from '@/shared/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/shared/components/ui/table';
import { formatPrice } from '@/shared/utils/formatters';
import { cn } from '@/shared/utils/theme';

export const OrderItemsTable: FC<Props> = ({ order }) => {
  const lines = order.lines.items;
  const { shipment } = order;

  return (
    <Card>
      <CardHeader className="flex items-center flex-row justify-between space-y-0">
        <CardTitle>Products</CardTitle>
        <OrderStatusBadge status={order.state} />
      </CardHeader>

      <CardContent>
        <Table>
          <TableCaption>Order breakdown.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-max text-nowrap">Product</TableHead>
              <TableHead className="w-max text-nowrap">Unit price</TableHead>
              <TableHead className="w-max text-nowrap">Quantity</TableHead>
              <TableHead className="w-max text-nowrap">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {lines.map(line => {
              const productImage = line.productVariant.product.assets.items[0]?.source;
              const variantImage = line.productVariant.asset?.source;

              const itemImage = variantImage ?? productImage;

              return (
                <TableRow key={line.id}>
                  <TableCell className="flex items-center gap-2 w-max">
                    {itemImage ? (
                      <img
                        src={itemImage}
                        alt={line.productVariant.product.name}
                        className="h-12 w-12 object-cover rounded-md"
                      />
                    ) : (
                      <ImagePlaceholder initial={line.productVariant.product.name} />
                    )}
                    <div
                      className={cn(
                        'flex flex-col justify-between',
                        line.productVariant.optionValues.length && 'h-12'
                      )}
                    >
                      <span className="text-nowrap">{line.productVariant.product.name}</span>
                      {Boolean(line.productVariant.optionValues?.length) && (
                        <Badge variant="secondary" className="py-0 px-1 w-fit text-xs">
                          {line.productVariant.optionValues?.map(v => v.name).join(' / ')}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{formatPrice(line.unitPrice)}</TableCell>
                  <TableCell>{line.quantity}</TableCell>
                  <TableCell>{formatPrice(line.linePrice)}</TableCell>
                </TableRow>
              );
            })}

            <TableRow className="border-transparent">
              <TableCell>Subtotal</TableCell>
              <TableCell>
                {order.totalQuantity} {order.totalQuantity === 1 ? 'Product' : 'Products'}
              </TableCell>
              <TableCell></TableCell>
              <TableCell>{formatPrice(order.subtotal)}</TableCell>
            </TableRow>

            <TableRow className="border-transparent">
              <TableCell>Shipment</TableCell>
              <TableCell>{shipment?.method ?? ''}</TableCell>
              <TableCell></TableCell>
              <TableCell>{formatPrice(shipment?.amount ?? 0)}</TableCell>
            </TableRow>

            <TableRow className="border-transparent">
              <TableCell className="font-semibold">Total</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell className="font-semibold">{formatPrice(order.total)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

type Props = {
  order: CommonOrderFragment;
};