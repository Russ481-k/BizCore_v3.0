import { Icon, IconProps } from "@chakra-ui/react";

const defaultProps = {
  boxSize: 5,
};

function PaperIcon({ ...props }: IconProps) {
  return (
    <Icon fill="currentColor" viewBox="0 0 20 20" {...props}>
      <path d="M6.09023 5.72543C6.09023 5.37267 6.37468 5.08671 6.72556 5.08671H13.2744C13.6253 5.08671 13.9098 5.37267 13.9098 5.72543C13.9098 6.07819 13.6253 6.36416 13.2744 6.36416H6.72556C6.37468 6.36416 6.09023 6.07819 6.09023 5.72543Z" />
      <path d="M6.72556 8.03468C6.37468 8.03468 6.09023 8.32065 6.09023 8.67341C6.09023 9.02617 6.37468 9.31214 6.72556 9.31214H11.3195C11.6704 9.31214 11.9549 9.02617 11.9549 8.67341C11.9549 8.32065 11.6704 8.03468 11.3195 8.03468H6.72556Z" />
      <path d="M6.09023 11.6214C6.09023 11.2686 6.37468 10.9827 6.72556 10.9827H9.36466C9.71555 10.9827 10 11.2686 10 11.6214C10 11.9741 9.71555 12.2601 9.36466 12.2601H6.72556C6.37468 12.2601 6.09023 11.9741 6.09023 11.6214Z" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.5 4.10405C3.5 2.66587 4.65968 1.5 6.09023 1.5H13.9098C15.3403 1.5 16.5 2.66587 16.5 4.10405V12.2586C16.5 12.8499 16.2998 13.4236 15.9324 13.8853L13.0379 17.5227C12.5464 18.1404 11.8022 18.5 11.0153 18.5H6.09023C4.65968 18.5 3.5 17.3341 3.5 15.896V4.10405ZM6.09023 2.77746C5.36146 2.77746 4.77068 3.37139 4.77068 4.10405V15.896C4.77068 16.6286 5.36146 17.2225 6.09023 17.2225H10.3421V13.341C10.3421 12.7712 10.8016 12.3092 11.3684 12.3092H15.2284C15.229 12.2924 15.2293 12.2755 15.2293 12.2586V4.10405C15.2293 3.37139 14.6385 2.77746 13.9098 2.77746H6.09023ZM14.5428 13.5867H11.6128V17.0788C11.7785 16.9942 11.9267 16.8743 12.0457 16.7247L14.5428 13.5867Z"
      />
    </Icon>
  );
}

PaperIcon.defaultProps = defaultProps;

export default PaperIcon;
