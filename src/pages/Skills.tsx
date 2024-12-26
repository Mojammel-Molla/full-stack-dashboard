import AdminTitle from '@/components/dashboard/admin/AdminTitle';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { FilePen, Plus, Trash2 } from 'lucide-react';
import TableAction from '@/components/dashboard/admin/TableAction';
import { useState } from 'react';
import { toast } from 'sonner';
import { TSkill } from '@/types';
import { Button } from '@/components/ui/button';
import { useAlert } from '@/hooks/useAlert';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import {
  useCreateSkillMutation,
  useDeleteSkillMutation,
  useFetchAllSkillsQuery,
  useUpdateSkillMutation,
} from '@/redux/features/skills/skills.api';
import CreateSkill from '@/components/dashboard/CreateSkill';

const actions = [
  {
    key: 'update',
    label: 'Update',
    icon: FilePen,
  },
  {
    key: 'delete',
    label: 'Delete',
    icon: Trash2,
  },
];

const Skills = () => {
  const [skill, setSkill] = useState<TSkill | undefined>();
  const [openModal, setOpenModal] = useState(false);

  const { AlertComponent, showAlert } = useAlert();
  const { data: skills, isLoading, isFetching } = useFetchAllSkillsQuery([]);

  const [createSkill] = useCreateSkillMutation();
  const [updateSkill] = useUpdateSkillMutation();
  const [deleteSkill] = useDeleteSkillMutation();

  let modalTitle = 'Create Skill';
  if (skill) {
    modalTitle = 'Update Skill';
  }
  const handleAction = async (key: string, blog: TSkill) => {
    if (key === 'delete') {
      const isConfirmed = await showAlert(
        'Are You Sure?',
        'Blog permanently delete.'
      );
      if (isConfirmed) {
        const result = await deleteSkill(blog._id);
        if (result.data?.success) {
          toast.error('Blog Deleted.');
        }
      }
    } else if (key === 'update') {
      setSkill(blog);
      setOpenModal(true);
    }
  };

  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
    const projectData = {
      name:data?.name,
      tagline: data?.tagline
    };

    const formData = new FormData();

    formData.append('data', JSON.stringify({ ...projectData }));

    if (data.image) {
      formData.append('file', data.image);
    }

    try {
      if (skill) {
        const updatedData = await updateSkill({ formData, id: skill?._id });
        if (updatedData?.data?.success) {
          setOpenModal(false);
          toast.success('Skill Updated.');
        }
      } else if (!skill) {
        const createdData = await createSkill(formData);
        if (createdData?.data?.success) {
          setOpenModal(false);
          toast.success('Skill Created.');
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="space-y-7">
      {AlertComponent}
      <div className="flex items-center justify-between">
        <AdminTitle title="Projects" />
        <Button
          onClick={() => {
            setOpenModal(true);
            setSkill(undefined);
          }}
          type="button"
          className="bg-red-500 hover:bg-red-400 active:bg-red-500"
        >
          Create
          <Plus />
        </Button>
      </div>
      <div className="block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Skill Name</TableHead>
              <TableHead>Skill Tagline</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading || isFetching
              ? Array.from({ length: 5 }).map((_, rowIndex) => (
                  <TableRow key={rowIndex}>
                    <TableCell>
                      <div className="h-4 w-24 animate-pulse rounded bg-athens-gray-300"></div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex w-full items-center justify-end">
                        <div className="h-4 w-16 animate-pulse rounded bg-athens-gray-300"></div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex w-full items-center justify-end">
                        <div className="h-4 w-16 animate-pulse rounded bg-athens-gray-300"></div>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              : skills?.data?.map((project: TSkill) => (
                  <TableRow key={project._id}>
                    <TableCell>{project.name}</TableCell>
                    <TableCell>{project.tagline}</TableCell>
                    <TableCell className="text-right">
                      <TableAction<TSkill>
                        onClick={handleAction}
                        item={project}
                        actions={actions}
                      />
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </div>
      <CreateSkill
        onSubmit={handleSubmit}
        title={modalTitle}
        setOpen={setOpenModal}
        open={openModal}
        skill={skill}
      />
    </div>
  );
};

export default Skills;
