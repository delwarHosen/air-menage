import { StyleSheet, Text } from "react-native";

export const FONT_MAP = {
  regular: "SyneRegular",
  medium: "SyneMedium",
  semiBold: "SyneSemiBold",
  bold: "SyneBold",
};

const FONT_SIZE = {
  h1: 30,
  h2: 28,
  h3: 24,
  h4: 20,
  h5: 18,
  h6: 16,
  body1: 16,
  body2: 14,
  caption: 12,
  button: 18,
};

const LINE_HEIGHT = {
  h1: 40,
  h2: 36,
  h3: 32,
  h4: 28,
  body1: 24,
  body2: 20,
  caption: 16,
  button: 20,
};

const Typography = ({
  variant = "body1",
  weight = "regular",
  color = "#1E293B",
  align = "left",
  children,
  style,
  ...props
}) => {
  return (
    <Text
      {...props}
      style={[
        {
          fontSize: FONT_SIZE[variant],
          lineHeight: LINE_HEIGHT[variant],
          fontFamily: FONT_MAP[weight] || "SyneRegular",
          color,
          textAlign: align,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {},
});

export const H1 = props => <Typography variant="h1" weight="bold" {...props} />;
export const H2 = props => <Typography variant="h2" weight="bold" {...props} />;
export const H3 = props => <Typography variant="h3" weight="bold" {...props} />;
export const H4 = props => <Typography variant="h4" weight="semiBold" {...props} />;
export const H5 = props => <Typography variant="h5" weight="semiBold" {...props} />;
export const H6 = props => <Typography variant="h6" weight="semiBold" {...props} />;
export const Body1 = props => <Typography variant="body1" weight="semiBold" {...props} />;
export const Body2 = props => <Typography variant="body2" weight="semiBold" {...props} />;
export const Caption = props => <Typography variant="caption" {...props} />;
export const ButtonText = props => (
  <Typography variant="button" weight="semiBold" {...props} />
);

export default Typography;
