'use client';
import { useState } from 'react';

import { PricingTable } from '@/core/subscription/components/pricing/pricing-table';
import { Label } from '@/shared/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/shared/components/ui/radio-group';

export const Pricing = () => {
  const [isAnnually, setIsAnnually] = useState(false);

  return (
    <section className="py-32">
      <div className="container">
        <div className="mx-auto flex max-w-screen-xl flex-col gap-6">
          <h2 className="text-pretty text-4xl font-bold lg:text-6xl">Pricing</h2>
          <div className="flex flex-col justify-between gap-10 md:flex-row">
            <p className="max-w-screen-md text-muted-foreground lg:text-xl">
              Choose the plan that fits your needs. With the option to switch between monthly and
              yearly billing, you can find the best plan for you.
            </p>
            <div className="flex h-11 w-fit shrink-0 items-center rounded-md bg-muted p-1 text-lg">
              <RadioGroup
                defaultValue="monthly"
                className="h-full grid-cols-2"
                onValueChange={value => {
                  setIsAnnually(value === 'annually');
                }}
              >
                <div className='h-full rounded-md transition-all has-[button[data-state="checked"]]:bg-white'>
                  <RadioGroupItem value="monthly" id="monthly" className="peer sr-only" />
                  <Label
                    htmlFor="monthly"
                    className="flex h-full cursor-pointer items-center justify-center px-7 font-semibold text-muted-foreground peer-data-[state=checked]:text-primary"
                  >
                    Monthly
                  </Label>
                </div>
                <div className='h-full rounded-md transition-all has-[button[data-state="checked"]]:bg-white'>
                  <RadioGroupItem value="annually" id="annually" className="peer sr-only" />
                  <Label
                    htmlFor="annually"
                    className="flex h-full cursor-pointer items-center justify-center gap-1 px-7 font-semibold text-muted-foreground peer-data-[state=checked]:text-primary"
                  >
                    Yearly
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          <div className="flex w-full flex-col items-stretch gap-6 md:flex-row">
            <PricingTable
              title="Basic"
              price={isAnnually ? `$${Math.round((19 * 10) / 12)}` : '$19'}
              recurrence="Per month"
              features={[
                'Up to 50 products',
                '1 payment gateway integrations',
                '24/7 support via email, chat, and calls',
                'Onboarding and personalized consulting'
              ]}
              buttonText="Choose BASIC"
            />

            <PricingTable
              title="Essential"
              price={isAnnually ? `$${Math.round((59 * 10) / 12)}` : '$59'}
              recurrence="Per month"
              features={[
                'Up to 500 active products',
                'Unlimited payment gateway integrations',
                '24/7 support via email, chat, and calls',
                'Onboarding and personalized consulting'
              ]}
              buttonText="Choose ESSENTIAL"
              isFeatured
            />

            <PricingTable
              title="Enterprise"
              price="Custom"
              recurrence="Contact sales"
              features={[
                'Unlimited active products',
                'Unlimited payment gateway integrations',
                '24/7 support via email, chat, and calls',
                'Onboarding and personalized consulting'
              ]}
              buttonText="Choose BUSINESS"
            />
          </div>

          {/* <div className="flex w-full flex-col rounded-lg border p-6 text-left">
            <Badge className="mb-8 block w-fit">Starter</Badge>
            <span className="text-4xl font-medium">Free</span>
            <Separator className="my-6" />
            <div className="flex h-full flex-col justify-between gap-20">
              <ul className="space-y-4 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Check className="size-4" />
                  <span>Up to 10 products</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="size-4" />
                  <span>1 payment gateway integration</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="size-4" />
                  <span>2% fee transaction</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="size-4" />
                  <span>24/7 support via email, chat, and calls.</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="size-4" />
                  <span>Onboarding and personalized consulting.</span>
                </li>
              </ul>
              <Button className="w-full">Start free</Button>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
};
