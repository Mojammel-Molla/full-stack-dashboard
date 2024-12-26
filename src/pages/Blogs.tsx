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
import { TBlog } from '@/types';
import { Button } from '@/components/ui/button';
import { useAlert } from '@/hooks/useAlert';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import {
  useCreateBlogMutation,
  useDeleteBlogMutation,
  useFetchAllBlogsQuery,
  useUpdateBlogMutation,
} from '@/redux/features/blog/blog.api';
import CreateBlog from '@/components/dashboard/CreateBlog';

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

const Blogs = () => {
  const [blog, setBlog] = useState<TBlog | undefined>();
  const [openModal, setOpenModal] = useState(false);

  const { AlertComponent, showAlert } = useAlert();
  const { data: blogs, isLoading, isFetching } = useFetchAllBlogsQuery([]);

  const [createBlog] = useCreateBlogMutation();
  const [updateBlog] = useUpdateBlogMutation();
  const [deleteBlog] = useDeleteBlogMutation();

  let modalTitle = 'Create Blog';
  if (blog) {
    modalTitle = 'Update Blog';
  }
  const handleAction = async (key: string, blog: TBlog) => {
    if (key === 'delete') {
      const isConfirmed = await showAlert(
        'Are You Sure?',
        'Blog permanently delete.'
      );
      if (isConfirmed) {
        const result = await deleteBlog(blog._id);
        if (result.data?.success) {
          toast.error('Blog Deleted.');
        }
      }
    } else if (key === 'update') {
      setBlog(blog);
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
      if (blog) {
        const updatedData = await updateBlog({ formData, id: blog?._id });
        if (updatedData?.data?.success) {
          setOpenModal(false);
          toast.success('Blog Updated.');
        }
        
      } else if (!blog) {
        const createdData = await createBlog(formData);
        if (createdData?.data?.success) {
          setOpenModal(false);
          toast.success('Blog Created.');
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
            setBlog(undefined);
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
              : blogs?.data?.map((project: TBlog) => (
                  <TableRow key={project._id}>
                    <TableCell>{project.title}</TableCell>
                    <TableCell className="text-right">
                      <TableAction<TBlog>
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
      <CreateBlog
        onSubmit={handleSubmit}
        title={modalTitle}
        setOpen={setOpenModal}
        open={openModal}
        blog={blog}
      />
    </div>
  );
};

export default Blogs;
