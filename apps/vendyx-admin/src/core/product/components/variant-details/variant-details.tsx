import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';

import { OptionsListing } from '../option-details/options-listing';
import { VariantsListing } from './variant-listing/variants-listing';

export const VariantDetails = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Variant</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col p-0">
        <div className="px-6 pb-4">
          <OptionsListing />
        </div>
        <VariantsListing />
      </CardContent>
    </Card>
  );
};
