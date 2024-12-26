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
import HTextarea from '../form/HTextarea';
import { TProject, TSkill } from '@/types';
import TTextEditor from '../form/TextEditor/TTextEditor';
import { X } from 'lucide-react';
import HMSelect from '../form/HMSelect';
import { useFetchAllSkillsQuery } from '@/redux/features/skills/skills.api';

type TCreateProduct = {
  title: string;
  open: boolean;
  setOpen: (key: boolean) => void;
  onSubmit: (data: FieldValues) => void;
  project?: TProject | undefined;
};

const CreateProduct = ({
  title,
  open,
  setOpen,
  onSubmit,
  project,
}: TCreateProduct) => {
  const formData = {
    title: project?.title,
    description: project?.description,
    overview: project?.overview,
    live: project?.links?.live,
    client: project?.links?.client,
    server: project?.links?.server,
    image: project?.image,
    skills: project?.skills?.map(skill=>(skill?._id)),
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
            <HForm onSubmit={onSubmit} defaultValues={project ? formData : {}}>
              <div className="space-y-5">
                <div>
                  <div className="space-y-5">
                    <HInput
                      label="Project Title"
                      placeholder="Project title"
                      name="title"
                    />
                    <HMSelect
                      isDisabled={isLoading}
                      name="skills"
                      label="Skills"
                      options={skillOptions}
                    />
                    <HInput
                      label="Client"
                      placeholder="Client GitHub repository"
                      type="text"
                      name="client"
                    />
                    <HInput
                      label="Server"
                      placeholder="Server GitHub repository"
                      type="text"
                      name="server"
                    />
                    <HInput
                      label="Live"
                      placeholder="Live site link"
                      type="text"
                      name="live"
                    />
                    <HTextarea
                      label="Description"
                      name="description"
                      placeholder="Project short description"
                    />
                    <TTextEditor name="overview" />
                    <HFile name="image" label="Project Image" />
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

export default CreateProduct;
