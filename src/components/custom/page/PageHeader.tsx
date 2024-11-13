import { motion } from "framer-motion";

type PageHeaderProps = {
  title: string;
  desc: string;
};

const PageHeader = ({ title, desc }: PageHeaderProps) => {
  return (
    <motion.div className="space-y-0.5" layoutId="page_header">
      <motion.h2
        className="animate-in slide-in-from-top fade-in text-3xl font-bold tracking-tight"
        layoutId="page_header_title"
      >
        {title}
      </motion.h2>
      <motion.p className="text-muted-foreground" layoutId="page_header_desc">
        {desc}
      </motion.p>
    </motion.div>
  );
};

export { PageHeader };
