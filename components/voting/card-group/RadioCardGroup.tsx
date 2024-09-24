import {
  Box,
  BoxProps,
  Circle,
  createIcon,
  Icon,
  Stack,
  StackProps,
  useId,
  useRadio,
  useRadioGroup,
  UseRadioProps,
  useStyleConfig,
} from "@chakra-ui/react";
import { Children, cloneElement, isValidElement, ReactElement, useMemo } from "react";

interface RadioCardGroupProps<T> extends Omit<StackProps, "onChange"> {
  name?: string;
  value?: T;
  defaultValue?: string;
  onChange?: (value: T) => void;
}

export const RadioCardGroup = <T extends string>(props: RadioCardGroupProps<T>) => {
  const { children, name, defaultValue, value, onChange, ...rest } = props;
  const { getRootProps, getRadioProps } = useRadioGroup({
    name,
    defaultValue,
    value,
    onChange,
  });

  const cards = useMemo(
    () =>
      Children.toArray(children)
        .filter<ReactElement<RadioCardProps>>(isValidElement)
        .map((card) => {
          return cloneElement(card, {
            radioProps: getRadioProps({
              value: card.props.value,
            }),
          });
        }),
    [children, getRadioProps]
  );

  return <Stack {...getRootProps(rest)}>{cards}</Stack>;
};

interface RadioCardProps extends BoxProps {
  value: string;
  radioProps?: UseRadioProps;
}

export const RadioCard = (props: RadioCardProps) => {
  const { radioProps, children, ...rest } = props;
  const { getInputProps, getCheckboxProps, getLabelProps, state } = useRadio(radioProps);
  const id = useId(undefined, "radio-button");

  const styles = useStyleConfig("RadioCard", props);
  const inputProps = getInputProps();
  const checkboxProps = getCheckboxProps();
  const labelProps = getLabelProps();
  return (
    <Box
      as="label"
      cursor="pointer"
      {...labelProps}
      shadow={"md"}
      p={12}
      pr={"2.5rem"}
      width={"max-content"}
      bgColor={"white"}
      borderRadius={"xl"}
      borderColor={state.isChecked ? "blue.600" : "gray.200"}
      borderWidth={3}
    >
      <input {...inputProps} aria-labelledby={id} />
      <Box sx={styles} {...checkboxProps} {...rest}>
        <Stack direction="row">
          <Box>{children}</Box>
          {state.isChecked ? (
            <Circle bg="blue.600" size="6">
              <Icon as={CheckIcon} boxSize="2.5" color="white" />
            </Circle>
          ) : (
            <Circle borderWidth="2px" size="6" />
          )}
        </Stack>
      </Box>
    </Box>
  );
};

export const CheckIcon = createIcon({
  displayName: "CheckIcon",
  viewBox: "0 0 12 10",
  path: (
    <polyline fill="none" strokeWidth="2px" stroke="currentColor" strokeDasharray="16px" points="1.5 6 4.5 9 10.5 1" />
  ),
});
