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
import HTextarea from '../form/HTextarea';
import { TExperience, TSkill } from '@/types';
import { X } from 'lucide-react';
import HMSelect from '../form/HMSelect';
import { useFetchAllSkillsQuery } from '@/redux/features/skills/skills.api';

type TCreateExperience = {
  title: string;
  open: boolean;
  setOpen: (key: boolean) => void;
  onSubmit: (data: FieldValues) => void;
  experience?: TExperience | undefined;
};

const CreateExperience = ({
  title,
  open,
  setOpen,
  onSubmit,
  experience,
}: TCreateExperience) => {
  const formData = {
    designation: experience?.designation,
    company: experience?.company,
    startDate: experience?.startDate,
    endDate: experience?.endDate,
    description: experience?.description,
    technologies: experience?.technologies?.map((skill) => skill?._id),
  };
  const { data: skills, isLoading } = useFetchAllSkillsQuery([]);
  const skillOptions = skills?.data?.map((skill: TSkill) => ({
    value: skill?._id,
    label: skill?.name,
  }));

  if (isLoading) {
    return;
  }

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
            <HForm
              onSubmit={onSubmit}
              defaultValues={experience ? formData : {}}
            >
              <div className="space-y-5">
                <div>
                  <div className="space-y-5">
                    <HInput
                      label="Company"
                      placeholder="Company Name"
                      name="company"
                    />
                    <HInput
                      label="Designation"
                      placeholder="Designation"
                      name="designation"
                    />
                    <HMSelect
                      isDisabled={isLoading}
                      name="technologies"
                      label="Technologies"
                      options={skillOptions}
                    />
                    <HInput
                      label="Start Date"
                      name="startDate"
                      placeholder="Job Start Date"
                    />
                    <HInput
                      label="End Date"
                      name="endDate"
                      placeholder="Job End Date"
                    />
                    <HTextarea
                      label="Description"
                      name="description"
                      placeholder="Job Description"
                    />
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

export default CreateExperience;
