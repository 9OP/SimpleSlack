import { Icon, IconProps, useStyleConfig } from "@chakra-ui/react";
import { IconType } from "react-icons";
import { FaSlack, FaUser } from "react-icons/fa";

const iconFactory = (icon: IconType) => {
  return (props: IconProps) => {
    const styles = useStyleConfig("Icon");
    return <Icon __css={styles} as={icon} {...props} />;
  };
};

export const SlackIcon = iconFactory(FaSlack);
export const MemberIcon = iconFactory(FaUser);
