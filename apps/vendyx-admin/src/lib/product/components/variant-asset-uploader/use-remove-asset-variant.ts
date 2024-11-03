import { useEffect, useState, useTransition } from 'react';

import { type ID } from '@/api/scalars';
import { notification } from '@/lib/shared/notifications';

import { removeVariantImage } from '../../actions/remove-variant-image';
import { useVariantContext } from '../../contexts';

export const useRemoveAssetVariant = () => {
  const { product } = useVariantContext();
  const [isLoading, startTransition] = useTransition();
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (!isLoading && isSuccess) {
      notification.success('Image removed successfully');
    }
  }, [isLoading, isSuccess]);

  const execute = (variantsIds: ID[]) => {
    if (!product?.id) {
      throw new Error('Product ID is required');
    }

    startTransition(async () => {
      await removeVariantImage(variantsIds, product?.id);
      setIsSuccess(true);
    });
  };

  return {
    isLoading,
    removeVariantImage: execute
  };
};
