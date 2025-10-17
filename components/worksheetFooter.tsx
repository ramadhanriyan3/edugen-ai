interface WorksheetFooterProps {
  title: string;
  authorLabel: string;
  createdAtLabel: string;
}

const WorksheetFooter = ({
  title,
  authorLabel,
  createdAtLabel,
}: WorksheetFooterProps) => {
  return (
    <div className="relative bg-white p-2">
      <p className="text-sm truncate max-w-[calc(100%-25px)] ">{title}</p>
      <p className="text-xs text-muted-foreground transition-opacity truncate">
        {authorLabel}, {createdAtLabel}
      </p>
    </div>
  );
};

export default WorksheetFooter;
