import { baseApi } from '@/redux/base.api';
import { TQueries } from '@/types/api.types';

const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchAllBlogs: builder.query({
      query: (queries: TQueries) => {
        const params = new URLSearchParams();
        if (queries?.length) {
          queries?.map((query) => params.append(query.name, query.value));
        }

        return {
          url: '/blogs',
          method: 'GET',
          params,
        };
      },
      providesTags: ['blogs'],
    }),
    fetchBlogById: builder.query({
      query: (id: string) => {
        return {
          url: `/blogs/${id}`,
          method: 'GET',
        };
      },
      providesTags: (_, __, id) => [{ type: 'blogs', id }],
    }),
    createBlog: builder.mutation({
      query: (BlogData) => {
        return {
          url: '/blogs',
          method: 'POST',
          body: BlogData,
        };
      },
      invalidatesTags: ['blogs'],
    }),
    updateBlog: builder.mutation({
      query: ({ formData, id }) => {
        return {
          url: `/blogs/${id}`,
          method: 'PUT',
          body: formData,
        };
      },
      invalidatesTags: ['blogs'],
    }),
    deleteBlog: builder.mutation({
      query: (id) => {
        return {
          url: `/blogs/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['blogs'],
    }),
  }),
});

export const {
  useFetchAllBlogsQuery,
  useFetchBlogByIdQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation
} = blogApi;