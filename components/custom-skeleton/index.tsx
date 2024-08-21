import { SkeletonText, SkeletonTextProps } from "@chakra-ui/react";
import type { FC } from "react";

interface CustomSkeletonProps extends SkeletonTextProps {
  noOfLines?: number;
}

/** Custom Skeleton Component
 * @prop noOfLines - The number of lines to show
 * @prop props - The extra props to pass to the SkeletonText component
 */
const CustomSkeleton: FC<CustomSkeletonProps> = (props) => {
  const { noOfLines } = props;
  return <SkeletonText mt="4" spacing="4" skeletonHeight="4" w={"100%"} {...props} noOfLines={noOfLines || 4} />;
};
export default CustomSkeleton;
