import { QueryClient } from "@tanstack/react-query";

// Shared singleton QueryClient to avoid duplicate declarations across HMR boundaries
export const queryClient = new QueryClient();
