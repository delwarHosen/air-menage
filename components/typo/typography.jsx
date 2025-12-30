import { StyleSheet, Text } from "react-native";

const Typography = ({
  variant = "body1",
  weight = "regular",
  color = "#1E293B",
  align = "left",
  children,
  style,
  ...props
}) => {
  const styles = StyleSheet.create({
    text: {
      fontSize: 
        variant === "h1" ? 32 : 
        variant === "h2" ? 28 : 
        variant === "h3" ? 24 : 
        variant === "h4" ? 20 : 
        variant === "body2" ? 14 : 
        variant === "caption" ? 12 : 16,
      fontWeight: 
        weight === "bold" ? "700" : 
        weight === "semiBold" ? "600" : 
        weight === "medium" ? "500" : "400",
      lineHeight: 
        variant.startsWith("h") ? 32 : 24,
      color,
      textAlign: align,
    },
  });

  return (
    <Text style={[styles.text, style]} {...props}>
      {children}
    </Text>
  );
};

export const H1 = props => <Typography variant="h1" weight="bold" {...props} />;
export const H2 = props => <Typography variant="h2" weight="bold" {...props} />;
export const H3 = props => <Typography variant="h3" weight="bold" {...props} />;
export const H4 = props => <Typography variant="h4" weight="semiBold" {...props} />;
export const Body1 = props => <Typography variant="body1" {...props} />;
export const Body2 = props => <Typography variant="body2" {...props} />;
export const Caption = props => <Typography variant="caption" {...props} />;
export const ButtonText = props => <Typography variant="button" weight="semiBold" {...props} />;

export default Typography;