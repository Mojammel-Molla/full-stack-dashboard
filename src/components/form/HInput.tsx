import { useFormContext } from 'react-hook-form';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

type THInput = {
  name: string;
  label?: string;
  type?: 'text' | 'email' | 'password' | 'number';
  placeholder: string;
  disabled?: boolean;
  required?: boolean;
};

const HInput = ({
  name,
  type = 'text',
  label,
  placeholder,
  disabled = false,
  required = false,
}: THInput) => {
  const { register } = useFormContext();
  return (
    <div className="space-y-2">
      {label && <Label htmlFor={name}>{label}</Label>}
      <Input
        {...register(name)}
        required={required}
        disabled={disabled}
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className="h-12 px-4 text-athens-gray-950 outline-none !ring-0 focus:ring-0"
      />
    </div>
  );
};

export default HInput;
