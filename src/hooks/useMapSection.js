import { useQuery } from '@tanstack/react-query';
import { fetchMapSection } from '../queries/mapSection.queries';

export const useMapSection = () => {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ['mapSection'],
    queryFn: fetchMapSection,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 2,
  });

  return {
    mapSection: data,
    isLoading,
    error,
    isError,
  };
};

export default useMapSection;

