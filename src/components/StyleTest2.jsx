import theme from '../theme';
import Text from './Text';

const StyleTest2 = () => {
  return (
    <>
      <Text>Simple text</Text>
      <Text style={{ paddingBottom: 10 }}>Text with custom style</Text>
      <Text fontWeight="bold" fontSize="subheading">
        Bold subheading
      </Text>
      <Text color="textSecondary">Text with secondary color</Text>
      <Text color="primary">Text with primary color</Text>
      <Text>Text with primary color text</Text>
      <Text style={{ fontWeight: theme.fontWeights.bold}}>Text with primary color fontWeight2</Text>
    </>
  );
};

export default StyleTest2;