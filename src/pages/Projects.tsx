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
import {
  useCreateProjectMutation,
  useDeleteProjectMutation,
  useFetchAllProjectsQuery,
  useUpdateProjectMutation,
} from '@/redux/features/project/project.api';
import { TProject } from '@/types';
import { Button } from '@/components/ui/button';
import { useAlert } from '@/hooks/useAlert';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import CreateProduct from '@/components/dashboard/CreateProduct';

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

const Projects = () => {
  const [project, setProject] = useState<TProject | undefined>();
  const [openModal, setOpenModal] = useState(false);

  const { AlertComponent, showAlert } = useAlert();
  const {
    data: projects,
    isLoading,
    isFetching,
  } = useFetchAllProjectsQuery([]);

  const [createProject] = useCreateProjectMutation();
  const [updateProject] = useUpdateProjectMutation();
  const [deleteProject] = useDeleteProjectMutation();

  let modalTitle = 'Create Product';
  if (project) {
    modalTitle = 'Update Product';
  }
  const handleAction = async (key: string, project: TProject) => {
    if (key === 'delete') {
      const isConfirmed = await showAlert(
        'Are You Sure?',
        'Project permanently delete.'
      );
      if (isConfirmed) {
        const result = await deleteProject(project._id);
        if (result.data?.success) {
          toast.error('Project Deleted.');
        }
      }
    } else if (key === 'update') {
      setProject(project);
      setOpenModal(true);
    }
  };

  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
    const projectData = {
      title: data?.title,
      links: { live: data?.live, server: data?.server, client: data?.client },
      description: data?.description,
      overview: data?.overview,
      skills: data?.skills,
    };

    const formData = new FormData();

    formData.append('data', JSON.stringify({ ...projectData }));

    if (data.image) {
      formData.append('file', data.image);
    }

    try {
      if (project) {
        const updatedData = await updateProject({ formData, id: project?._id });
        if (updatedData?.data?.success) {
          setOpenModal(false);
          toast.success('Product Updated.');
        }
        console.log('update project');
      } else if (!project) {
        const createdData = await createProject(formData);
        if (createdData?.data?.success) {
          setOpenModal(false);
          toast.success('Product Created.');
        }
        console.log('Create Project');
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
            setProject(undefined);
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
              <TableHead>Project Name</TableHead>
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
                  </TableRow>
                ))
              : projects?.data?.map((project: TProject) => (
                  <TableRow key={project._id}>
                    <TableCell>{project.title}</TableCell>
                    <TableCell className="text-right">
                      <TableAction<TProject>
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
      <CreateProduct
        onSubmit={handleSubmit}
        title={modalTitle}
        setOpen={setOpenModal}
        open={openModal}
        project={project}
      />
    </div>
  );
};

export default Projects;
