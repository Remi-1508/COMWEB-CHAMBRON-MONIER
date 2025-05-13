import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import {
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Box,
    Typography,
    Alert
} from '@mui/material';
import { UserRoles } from '../../models/User.js';
// Schéma de validation du formulaire
const validationSchema = Yup.object({
    username: Yup.string().required('Identifiant requis'),
    password: Yup.string().required('Mot de passe requis'),
    role: Yup.string().oneOf(Object.values(UserRoles), 'Rôle invalide').required('Rôlerequis')
});
export const LoginForm = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
            role: UserRoles.STUDENT
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                const user = await login(values.username, values.password);
                
                // Redirige en fonction du rôle
                if (user.role === UserRoles.STUDENT) {
                    navigate('/student/dashboard');
                } else if (user.role === UserRoles.TEACHER) {
                    navigate('/teacher/dashboard');
                }
            } catch (err) {
                setError('Échec de la connexion. Vérifiez vos identifiants.');
            }
        }
    });
    return (
        <Box component="form" onSubmit={formik.handleSubmit} sx={{ width: '100%',
            maxWidth: 400, mt: 3 }}>
            <Typography variant="h5" component="h1" gutterBottom>
            Connexion
            </Typography>
            
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            
            <TextField
            fullWidth
            id="username"
            name="username"
            label="Identifiant"
            value={formik.values.username}
            onChange={formik.handleChange}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
            margin="normal"
            />
            
            <TextField
            fullWidth
            id="password"
            name="password"
            label="Mot de passe"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            margin="normal"
            />
            
            <FormControl fullWidth margin="normal">
            <InputLabel id="role-label">Je suis</InputLabel>
            <Select
            labelId="role-label"
            id="role"
            name="role"
            value={formik.values.role}
            onChange={formik.handleChange}
            error={formik.touched.role && Boolean(formik.errors.role)}
            >
            <MenuItem value={UserRoles.STUDENT}>Élève</MenuItem>
            <MenuItem value={UserRoles.TEACHER}>Enseignant</MenuItem>
            </Select>
            </FormControl>
            
            <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3, mb: 2 }}
            >
            Se connecter
            </Button>
            </Box>
        );
    };
