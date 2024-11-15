import { motion } from "framer-motion";
import { LoadingPageHeader } from "./LoadingPageHeader";

type PageHeaderProps = {
  title: string;
  desc: string;
};

function PageHeader(props: PageHeaderProps) {
  const { title, desc } = props;

  return (
    <motion.div className="space-y-0.5" layoutId="page_header">
      <motion.h2
        className="animate-in fade-in text-3xl font-bold tracking-tight"
        layoutId="page_header_title"
      >
        {title}
      </motion.h2>
      <motion.p className="text-muted-foreground" layoutId="page_header_desc">
        {desc}
      </motion.p>
    </motion.div>
  );
}

PageHeader.Loading = LoadingPageHeader;

export { PageHeader };
