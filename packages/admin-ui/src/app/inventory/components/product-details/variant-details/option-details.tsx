import { type FC } from 'react';

import { Button, Input, Label } from '@vendyx/theme';
import { Trash2Icon } from 'lucide-react';

import { FormInput } from '@/app/components';

import { type OptionState, OptionValueState } from './use-manage-variants';

export const OptionDetails: FC<Props> = ({ option, removeOption, updateOption, updateValues }) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-end gap-4">
        <FormInput
          label="Option"
          placeholder="Size"
          defaultValue={option.name}
          onChange={e => updateOption(e.target.value)}
        />
        <Button type="button" variant="ghost" size="icon" onClick={removeOption}>
          <Trash2Icon size={16} />
        </Button>
      </div>
      <div className="flex flex-col gap-2">
        <Label>Values</Label>
        {option.values.map((v, i) => (
          <Input
            key={v.id}
            defaultValue={v.value}
            placeholder="S"
            onChange={e => {
              const content = e.target.value;
              const isTheLastOption = i === option.values.length - 1;

              const newState: OptionValueState[] = option.values.map(value =>
                value.id === v.id ? { ...v, value: content } : value
              );

              if (isTheLastOption && content) {
                newState.push(new OptionValueState());
              }

              if (isTheLastOption && !content) {
                newState.pop();
              }

              updateValues(option.id, newState);
            }}
          />
        ))}
      </div>
      <div>
        <Button variant="outline">Done</Button>
      </div>
    </div>
  );
};

type Props = {
  option: OptionState;
  removeOption: () => void;
  updateOption: (name: string) => void;
  updateValues: (optionId: string, newOptionValues: OptionValueState[]) => void;
};
