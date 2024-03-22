import { Icon, IconProps } from "@chakra-ui/react";

const defaultProps = {
  boxSize: 5,
};

function UpdateIcon({ ...props }: IconProps) {
  return (
    <Icon fill="none" viewBox="0 0 20 20" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.0675 6.34382L17.4471 7.406C16.7562 4.76204 14.7063 2.5493 11.8747 1.77917C7.66434 0.634026 3.31975 3.11244 2.17201 7.31693C2.09929 7.58332 2.25635 7.85803 2.52282 7.9305C2.78928 8.00297 3.06424 7.84577 3.13696 7.57937C4.13886 3.90913 7.93246 1.74328 11.6114 2.74388C14.1031 3.42157 15.9029 5.37805 16.4929 7.71212L15.3635 7.05492C15.1249 6.91603 14.8185 6.99674 14.6792 7.23519C14.5399 7.47364 14.6205 7.77954 14.8592 7.91843L16.8265 9.06328C17.1607 9.25773 17.5896 9.14474 17.7846 8.8109L18.9318 6.84679C19.071 6.60834 18.9905 6.30244 18.7518 6.16355C18.5131 6.02466 18.2067 6.10537 18.0675 6.34382ZM1.92289 13.3274L2.56116 12.322C3.15674 14.9845 5.12149 17.2658 7.91824 18.1387C12.0833 19.4387 16.5168 17.1225 17.8197 12.9634C17.9023 12.6998 17.7555 12.4195 17.4919 12.3372C17.2283 12.255 16.9477 12.4019 16.8652 12.6654C15.7278 16.2961 11.8565 18.3203 8.21718 17.1844C5.73782 16.4106 4.00601 14.3696 3.51459 11.9976L4.65135 12.7167C4.8847 12.8643 5.19387 12.795 5.34189 12.5618C5.48991 12.3287 5.42073 12.02 5.18737 11.8724L3.26383 10.6556C2.93713 10.449 2.50429 10.546 2.29707 10.8724L1.07783 12.7928C0.929816 13.0259 0.998996 13.3346 1.23235 13.4822C1.46571 13.6298 1.77488 13.5605 1.92289 13.3274Z"
        fill="currentColor"
      />
    </Icon>
  );
}

UpdateIcon.defaultProps = defaultProps;

export default UpdateIcon;
