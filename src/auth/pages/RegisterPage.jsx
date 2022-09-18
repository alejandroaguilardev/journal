import {
	Alert,
	Button,
	Grid,
	Link,
	TextField,
	Typography,
} from "@mui/material";
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as LinkRouter } from "react-router-dom";
import { useForm } from "../../hooks";
import { startCreatingUserWithEmailPassword } from "../../store/auth";
import { AuthLayout } from "../layout/AuthLayout";

const formData = {
	email: "",
	password: "",
	displayName: "",
};

const formValidations = {
	email: [(value) => value.includes("@"), "El correo debe de tener un @"],
	password: [
		(value) => value.length >= 6,
		"El password debe de tener más de 6 letras",
	],
	displayName: [(value) => value.length >= 1, "El nombre es obligatorio"],
};

export const RegisterPage = () => {
	const dispatch = useDispatch();
	const [formSubmitted, setformSubmitted] = useState(false);

	const { status, errorMessage } = useSelector((state) => state.auth);

	const isCheckingAuthentication = useMemo(
		() => status === "checking",
		[status]
	);

	const {
		displayName,
		email,
		password,
		onInputChange,
		isFormValid,
		displayNameValid,
		emailValid,
		passwordValid,
	} = useForm(formData, formValidations);

	const onSubmit = (event) => {
		event.preventDefault();
		setformSubmitted(true);

		if (!isFormValid) return;

		dispatch(
			startCreatingUserWithEmailPassword({ email, password, displayName })
		);
	};

	return (
		<AuthLayout title="Crear Cuenta">
			<h1>FormValid {isFormValid ? "Valido" : "Incorrecto"}</h1>
			<form
				onSubmit={onSubmit}
				className="animate__animated animate__fadeIn animate_faster"
			>
				<Grid container>
					<Grid item xs={12} sx={{ mt: 2 }}>
						<TextField
							label="Nombre Completo"
							type="text"
							placeholder="Alejandro Aguilar"
							fullWidth
							name="displayName"
							value={displayName}
							onChange={onInputChange}
							error={!!displayNameValid && formSubmitted}
							helperText={displayNameValid}
						/>
					</Grid>

					<Grid item xs={12} sx={{ mt: 2 }}>
						<TextField
							label="Correo"
							type="email"
							placeholder="correo@google.com"
							fullWidth
							name="email"
							value={email}
							onChange={onInputChange}
							error={!!emailValid && formSubmitted}
							helperText={emailValid}
						/>
					</Grid>

					<Grid item xs={12} sx={{ mt: 2 }}>
						<TextField
							label="Contraseña"
							type="password"
							placeholder="Contraseña"
							fullWidth
							name="password"
							value={password}
							onChange={onInputChange}
							error={!!passwordValid && formSubmitted}
							helperText={passwordValid}
						/>
					</Grid>

					<Grid container spacing={2} item xs={12} sx={{ mb: 2, mt: 1 }}>
						<Grid item xs={12} display={!!errorMessage ? "" : "none"}>
							<Alert severity="error">{errorMessage}</Alert>
						</Grid>
						<Grid item xs={12}>
							<Button
								variant="contained"
								fullWidth
								type="submit"
								disabled={isCheckingAuthentication}
							>
								Crear Cuenta
							</Button>
						</Grid>
					</Grid>
					<Grid container direction="row" justifyContent="end">
						<Typography>¿Ya tienes cuenta? </Typography>
						<Link component={LinkRouter} color="inherit" to="/auth/login">
							Ingresar
						</Link>
					</Grid>
				</Grid>
			</form>
		</AuthLayout>
	);
};
