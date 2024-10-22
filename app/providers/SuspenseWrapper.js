import Loader from "@/components/tamplates/Loader";
import { Suspense } from "react"

const SuspenseWrapper = ({ children }) => {
    return <Suspense fallback={<Loader />}>{children}</Suspense>;
  };
  export default SuspenseWrapper