import instance from '@/utils/_api/axios';

export const useTodo = () => {
  const fetchTodo = async (id: number) => {
    const { data } = await instance.get(`https://jsonplaceholder.typicode.com/todos/${id}`);

    if (!data) {
      throw new Error('Network response was not ok');
    }

    return data;
  };

  return {
    fetchTodo,
  };
};
