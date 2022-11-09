import { Icon, IconProps, useStyleConfig } from "@chakra-ui/react";
import { IconType } from "react-icons";
import { FaSlack, FaUser } from "react-icons/fa";
import { BiArrowBack } from "react-icons/bi";

const iconFactory = (icon: IconType) => {
  const IconFactory = (props: IconProps) => {
    const styles = useStyleConfig("Icon");
    return <Icon __css={styles} as={icon} {...props} />;
  };
  return IconFactory
};

export const SlackIcon = iconFactory(FaSlack);
export const ArrowBack = iconFactory(BiArrowBack);
