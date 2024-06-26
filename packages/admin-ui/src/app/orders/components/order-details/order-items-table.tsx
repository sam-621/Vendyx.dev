import { type FC } from 'react';

import { getFormattedPrice } from '@ebloc/common';
import {
  Badge,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@ebloc/theme';

import { OrderStatusBadge } from '@/lib/components';
import { DEFAULT_PRODUCT_IMAGE } from '@/lib/constants';
import { type CommonOrderFragment } from '@/lib/ebloc/codegen/graphql';

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
          <Table>
            <TableCaption>Order breakdown.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>SKU</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Unit price</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {lines.map(line => (
                <TableRow key={line.id}>
                  <TableCell>{line.productVariant.sku}</TableCell>
                  <TableCell className="flex items-center gap-2 w-full">
                    <img
                      src={
                        line.productVariant.product.assets.items[0]?.source ?? DEFAULT_PRODUCT_IMAGE
                      }
                      className="h-12 w-12 object-cover rounded-md"
                    />
                    <div className="flex flex-col justify-between h-12">
                      <span>{line.productVariant.product.name}</span>
                      <Badge variant="secondary" className="py-0 text-xs">
                        {line.productVariant.optionValues?.map(v => v.value).join(' / ')}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>{getFormattedPrice(line.unitPrice)}</TableCell>
                  <TableCell>{line.quantity}</TableCell>
                  <TableCell>{getFormattedPrice(line.linePrice)}</TableCell>
                </TableRow>
              ))}

              <TableRow className="border-transparent">
                <TableCell>Subtotal</TableCell>
                <TableCell>{order.totalQuantity} Products</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>{getFormattedPrice(order.subtotal)}</TableCell>
              </TableRow>

              <TableRow className="border-transparent">
                <TableCell>Shipment</TableCell>
                <TableCell>{shipment?.method.name ?? ''}</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>{getFormattedPrice(shipment?.amount ?? 0)}</TableCell>
              </TableRow>

              <TableRow className="border-transparent">
                <TableCell className="font-semibold">Total</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell className="font-semibold">{getFormattedPrice(order.total)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Table>
      </CardContent>
    </Card>
  );
};

type Props = {
  order: CommonOrderFragment;
};
