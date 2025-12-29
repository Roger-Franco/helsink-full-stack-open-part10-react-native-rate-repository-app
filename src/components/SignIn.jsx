import { View, TextInput, Pressable, StyleSheet } from 'react-native';
import Text from './Text';
import { useFormik } from 'formik';
import * as yup from 'yup';

const styles = StyleSheet.create({
  TextInput: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  Pressable: {
    margin: 12,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#0366d6',
    borderRadius: 5,
    padding: 5,
    // maxWidth: 100
  },
  buttonBlue: {
    color: 'white',
    padding: 5,
    fontWeight: 'bold',
  }
});

const initialValues = {
  username: '',
  password: '',
}



const SignIn = () => {

  const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(3, 'Username must be at least 3 characters')
    .required('Username is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
})

  const onSubmit = values => {
    console.log(values);
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit
  })



  return (
    <View>
      <TextInput
      style={[styles.TextInput, {borderColor:  formik.errors.username ? '#d73a4a' : ''} ]}
      placeholder="Username"
      value={formik.values.username}
      onChangeText={formik.handleChange('username')}
      />
      {formik.touched.username && formik.errors.username && (
        <Text style={{ color: 'red' }}>{formik.errors.username}</Text>
      )}
      <TextInput
      errorP
      style={[styles.TextInput, {borderColor:  formik.errors.password ? '#d73a4a' : ''} ]}
      placeholder="Password"
      value={formik.values.password}
      onChangeText={formik.handleChange('password')}
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={{ color: 'red' }}>{formik.errors.password}</Text>
      )}
      <Pressable style={styles.Pressable} onPress={formik.handleSubmit}>
        <Text style={styles.buttonBlue}>SignIn</Text>
      </Pressable>
    </View>
  );
};

export default SignIn;