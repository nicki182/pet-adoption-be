import * as yup from 'yup'
const UserValidation = yup.object().shape({
    email: yup.string().email().required('Email is required'),
    password: yup.string().required('Password is required'),
    name: yup.string().nullable().optional(),
    phoneNumber: yup.string().nullable().optional(),
    access_token: yup.string().nullable().required('Access token is required'),
    refresh_token: yup.string().nullable().required('Refresh token is required'),
})
const SessionValidation = yup.object().shape({
    access_token: yup.string().nullable().required('Access token is required'),
    refresh_token: yup.string().nullable().required('Refresh token is required'),
});

export {
    UserValidation,
    SessionValidation
}