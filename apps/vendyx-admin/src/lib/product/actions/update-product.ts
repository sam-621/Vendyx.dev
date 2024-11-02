'use server';

import { revalidateTag } from 'next/cache';

import { OptionService, ProductService, VariantService } from '@/api/services';
import { isUUID } from '@/lib/shared/utils';

export const updateProduct = async (productId: string, input: UpdateProductInput) => {
  if (!input.variants.length) {
    throw new Error('createProduct: At least one variant is required');
  }

  const optionsToCreate = input.options?.filter(o => !isUUID(o.id));
  const optionsToUpdate = input.options?.filter(o => isUUID(o.id));

  const optionsUpdated = await updateOptions(optionsToUpdate);
  const optionsCreated = await createOptions(productId, optionsToCreate);
  await Promise.all(
    input.optionsToRemove.map(async optionId => await OptionService.remove(optionId))
  );

  const newOptions = [...optionsUpdated, ...optionsCreated];
  const newVariants = attachOptionValues(newOptions, input.variants);

  const variantsToUpdate = newVariants.filter(variant => isUUID(variant.id ?? ''));
  const variantsToCreate = newVariants.filter(variant => !isUUID(variant.id ?? ''));

  await ProductService.update(productId, {
    name: input.name,
    description: input.description,
    enabled: input.enabled
  });

  await updateVariants(variantsToUpdate);
  await createVariants(productId, variantsToCreate);

  await Promise.all(
    input.variantsToRemove.map(async variantId => await VariantService.remove(variantId))
  );

  revalidateTag(ProductService.Tags.product(productId));
};

const attachOptionValues = (
  options: UpdateProductInput['options'],
  variants: UpdateProductInput['variants']
) => {
  return variants.map(variant => {
    const variantOptionValues = variant.optionValues ?? [];

    const valuesIds = options
      .map(option => {
        const value = option.values.find(value =>
          variantOptionValues.map(variantValue => variantValue.name).includes(value.name)
        );

        return value;
      })
      .filter(Boolean);

    return {
      ...variant,
      optionValues: valuesIds.map(id => ({ id: id?.id ?? '', name: id?.name ?? '' }))
    };
  });
};

const createVariants = async (productId: string, variants: UpdateProductInput['variants']) => {
  for (const variant of variants) {
    await VariantService.create(productId, {
      salePrice: variant.salePrice,
      comparisonPrice: variant.comparisonPrice,
      costPerUnit: variant.costPerUnit,
      stock: variant.stock,
      sku: variant.sku,
      requiresShipping: variant.requiresShipping,
      optionValues: variant.optionValues?.map(value => value.id)
    });
  }
};

const createOptions = async (productId: string, input: UpdateProductInput['options']) => {
  if (!input?.length) return [];

  const options = [];
  let order = 0;

  for (const option of input) {
    const result = await OptionService.create(productId, {
      order,
      name: option.name,
      values: option.values.map((value, i) => ({ name: value.name, order: i }))
    });

    options.push(result);
    order++;
  }

  return options;
};

const updateVariants = async (variants: UpdateProductInput['variants']) => {
  for (const variant of variants) {
    await VariantService.update(variant.id, {
      salePrice: variant.salePrice,
      comparisonPrice: variant.comparisonPrice,
      costPerUnit: variant.costPerUnit,
      stock: variant.stock,
      sku: variant.sku,
      requiresShipping: variant.requiresShipping,
      optionValues: variant.optionValues?.map(value => value.id)
    });
  }
};

const updateOptions = async (options: UpdateProductInput['options']) => {
  const updatedOptions = [];

  for (const option of options) {
    const updatedOption = await OptionService.update(option.id, {
      name: option.name,
      values: option.values.map(value => ({
        id: isUUID(value.id) ? value.id : '',
        name: value.name
      }))
    });

    updatedOptions.push(updatedOption);
  }

  return updatedOptions;
};

type UpdateProductInput = {
  name: string;
  description?: string;
  enabled?: boolean;
  options: {
    id: string;
    name: string;
    values: { id: string; name: string }[];
  }[];
  variants: {
    id: string;
    salePrice: number;
    comparisonPrice?: number;
    costPerUnit?: number;
    stock?: number;
    sku?: string;
    requiresShipping?: boolean;
    optionValues?: { id: string; name: string }[];
  }[];
  variantsToRemove: string[];
  optionsToRemove: string[];
};