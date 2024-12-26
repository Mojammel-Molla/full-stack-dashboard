import Select from 'react-select';
import { Controller, useFormContext } from 'react-hook-form';
import { Label } from '../ui/label';

const HMSelect = ({
  name,
  options,
  label,
  isDisabled = false,
}: {
  name: string;
  options: { value: string; label: string }[];
  label?: string;
  isDisabled?: boolean;
}) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const defaultValue = field.value?.length
          ? field.value.map((value: string) =>
              options.find((op) => op.value === value)
            )
          : [];
            console.log(defaultValue);
        return (
          <div className="space-y-2">
            {label && <Label htmlFor={name}>{label}</Label>}

            <Select
              isDisabled={isDisabled}
              isMulti
              {...field}
              options={options}
              onChange={(selectedOptions) =>
                field.onChange(
                  selectedOptions?.map((option) => option.value) || []
                )
              }
              value={defaultValue}
            />
          </div>
        );
      }}
    />
  );
};

export default HMSelect;
