import { Pressable, View, Text, StyleSheet } from 'react-native';

import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';

import * as yup from 'yup';

import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-native';

import {CREATE_USER} from '../graphql/mutations';



const styles = StyleSheet.create({
    signUpButton: {
        backgroundColor: 'lightpink',
        padding: 15,
        marginTop: 8,
        marginBottom: 10,
        marginLeft: 15,
        marginRight: 15,
        borderRadius: 5,
    },
    signUpButtonText: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 24,
        color: 'white'
    }
});


const validationSchema = yup.object().shape({ 
    username: yup
        .string()
        .min(5, 'Username must be at least 5 characters long')
        .max(30, 'Username must be max 30 characters long')
        .required('Username is required'),
    password: yup
        .string()
        .min(5, 'Password must be at least 5 characters long')
        .max(50, 'Password must be max 50 characters long')
        .required('Password is required'),
    passwordConfirmation: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Passwords must be same')
        .required('Password confirmation is required')
});


const SignUpFormContainer = ({ onSubmit }) => { 

    return (
        <View>
            <FormikTextInput name="username" placeholder="Username" />
            <FormikTextInput name="password" placeholder="Password" secureTextEntry />
            <FormikTextInput name="passwordConfirmation" placeholder="Password confirmation" secureTextEntry />
            <Pressable onPress={onSubmit}>
                <View style={styles.signUpButton}>
                    <Text style={styles.signUpButtonText}>Sign up</Text>
                </View>
            </Pressable>
        </View>
    );
}

const SignUpForm = () => { 

    const [createUser] = useMutation(CREATE_USER); 
    const navigate = useNavigate(); 

    const onSubmit = async (values) => { 
            
        const { username, password } = values; 
        console.log('username', username);
        console.log('password', password)


        try {
            const {data} = await createUser({ variables: { user: { username, password } } }); 
            if (data) {
                navigate('/'); 
            }
        } catch (err) {
                console.log(err);
        }
    }


    return (
        <View>
            <Formik initialValues={{ username: '', password: '', passwordConfirmation: '' }} onSubmit={onSubmit} validationSchema={validationSchema}>
                {({ handleSubmit }) => <SignUpFormContainer onSubmit={handleSubmit} />}
            </Formik>
        </View>
    );
}


export default SignUpForm; 