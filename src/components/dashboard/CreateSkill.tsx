import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '../ui/button';
import HInput from '../form/HInput';
import HForm from '../form/HForm';
import { FieldValues } from 'react-hook-form';
import HFile from '../form/HFile';
import { TSkill } from '@/types';
import { X } from 'lucide-react';

type TCreateSkill = {
  title: string;
  open: boolean;
  setOpen: (key: boolean) => void;
  onSubmit: (data: FieldValues) => void;
  skill?: TSkill | undefined;
};

const CreateSkill = ({
  title,
  open,
  setOpen,
  onSubmit,
  skill,
}: TCreateSkill) => {
  const formData = {
    name: skill?.name,
    tagline: skill?.tagline,
    image: skill?.image
  };
  console.log(skill);
  return (
    <Dialog open={open}>
      <DialogContent className="max-w-screen-md">
        <DialogHeader>
          <DialogTitle className="mb-5 border-b border-b-athens-gray-100 pb-5">
            <div className="flex items-center justify-between">
              <span className="block">{title}</span>
              <Button
                onClick={() => setOpen(false)}
                size="icon"
                variant="light"
                className="rounded-md"
              >
                <X />
              </Button>
            </div>
          </DialogTitle>
          <DialogDescription>
            <HForm onSubmit={onSubmit} defaultValues={skill ? formData : {}}>
              <div className="space-y-5">
                <div>
                  <div className="space-y-5">
                    <HInput
                      label="Skill Tagline"
                      placeholder="Skill Name"
                      name="name"
                    />
                    <HInput
                      label="Skill Tagline"
                      placeholder="Skill tagline in two word"
                      name="tagline"
                    />
                    <HFile name="image" label="Skill Image" />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="bg-slate-200 text-slate-600 hover:bg-slate-200/80 active:bg-slate-200"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-red-500 hover:bg-red-400 active:bg-red-500"
                  >
                    Continue
                  </Button>
                </div>
              </div>
            </HForm>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CreateSkill;
