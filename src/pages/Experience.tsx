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
import { TExperience } from '@/types';
import { Button } from '@/components/ui/button';
import { useAlert } from '@/hooks/useAlert';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import {
  useCreateExperienceMutation,
  useDeleteExperienceMutation,
  useFetchAllExperienceQuery,
  useUpdateExperienceMutation,
} from '@/redux/features/experience/experience.api';
import CreateExperience from '@/components/dashboard/CreateExperience';

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

const Experiences = () => {
  const [experience, setExperience] = useState<TExperience | undefined>();
  const [openModal, setOpenModal] = useState(false);

  const { AlertComponent, showAlert } = useAlert();
  const {
    data: experiences,
    isLoading,
    isFetching,
  } = useFetchAllExperienceQuery([]);

  const [createExperience] = useCreateExperienceMutation();
  const [updateExperience] = useUpdateExperienceMutation();
  const [deleteExperience] = useDeleteExperienceMutation();

  let modalTitle = 'Create Experience';
  if (experience) {
    modalTitle = 'Update Experience';
  }
  const handleAction = async (key: string, experience: TExperience) => {
    if (key === 'delete') {
      const isConfirmed = await showAlert(
        'Are You Sure?',
        'Experience permanently delete.'
      );
      if (isConfirmed) {
        const result = await deleteExperience(experience._id);
        if (result.data?.success) {
          toast.error('Experience Deleted.');
        }
      }
    } else if (key === 'update') {
      setExperience(experience);
      setOpenModal(true);
    }
  };

  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
    const experienceData = {
      designation: data?.designation,
      company: data?.company,
      startDate: data?.startDate,
      endDate: data?.endDate,
      description: data?.description,
      technologies: data?.technologies,
    };
    console.log(experienceData);
    try { 
      if (experience) {
        const updatedData = await updateExperience({
          data: experienceData,
          id: experience?._id,
        });
        if (updatedData?.data?.success) {
          setOpenModal(false);
          toast.success('Experience Updated.');
        }
      } else if (!experience) {
        const createdData = await createExperience(experienceData);
        if (createdData?.data?.success) {
          setOpenModal(false);
          toast.success('Experience Created.');
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
        <AdminTitle title="Experiences" />
        <Button
          onClick={() => {
            setOpenModal(true);
            setExperience(undefined);
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
              <TableHead>Designation</TableHead>
              <TableHead>Company</TableHead>
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
              : experiences?.data?.map((experience: TExperience) => (
                  <TableRow key={experience._id}>
                    <TableCell>{experience.company}</TableCell>
                    <TableCell>{experience.designation}</TableCell>
                    <TableCell className="text-right">
                      <TableAction<TExperience>
                        onClick={handleAction}
                        item={experience}
                        actions={actions}
                      />
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </div>
      <CreateExperience
        onSubmit={handleSubmit}
        title={modalTitle}
        setOpen={setOpenModal}
        open={openModal}
        experience={experience}
      />
    </div>
  );
};

export default Experiences;
