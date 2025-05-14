
// This is a redirect file - we import the functions from the hooks directory
// and re-export them for compatibility with existing code

import { useToast, toast } from "@/hooks/use-toast";

export { useToast, toast };
